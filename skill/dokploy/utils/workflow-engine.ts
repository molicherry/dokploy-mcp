import type {
  WorkflowDefinition,
  WorkflowContext,
  WorkflowExecutionResult,
  WorkflowStep,
  CreatedResource,
  WorkflowError,
  McpToolResult,
} from '../types.js';

export type McpToolCaller = (name: string, args: Record<string, any>) => Promise<McpToolResult>;

export class WorkflowEngine {
  private mcpCaller: McpToolCaller;
  private enableRollback: boolean;

  constructor(mcpCaller: McpToolCaller, enableRollback: boolean = true) {
    this.mcpCaller = mcpCaller;
    this.enableRollback = enableRollback;
  }

  async execute(
    workflow: WorkflowDefinition,
    input: Record<string, any>
  ): Promise<WorkflowExecutionResult> {
    const context: WorkflowContext = {
      workflowId: this.generateId(),
      input,
      state: { ...input },
      stepIndex: 0,
      createdResources: [],
    };

    try {
      for (let i = 0; i < workflow.steps.length; i++) {
        const step = workflow.steps[i];
        context.stepIndex = i;
        
        if (step.condition && !this.evaluateCondition(step.condition, context.state)) {
          continue;
        }

        await this.executeStep(step, context);
      }

      return {
        success: true,
        output: this.extractOutput(context.state, workflow.output),
        stepsCompleted: workflow.steps.length,
        stepsTotal: workflow.steps.length,
      };
    } catch (error) {
      const workflowError: WorkflowError = {
        step: workflow.steps[context.stepIndex]?.name || 'unknown',
        message: error instanceof Error ? error.message : String(error),
        code: 'EXECUTION_ERROR',
      };

      if (this.enableRollback && workflow.onError?.rollback) {
        await this.rollback(context, workflow.onError.rollback);
      }

      return {
        success: false,
        error: workflowError,
        stepsCompleted: context.stepIndex,
        stepsTotal: workflow.steps.length,
      };
    }
  }

  private async executeStep(step: WorkflowStep, context: WorkflowContext): Promise<void> {
    const maxRetries = step.retry?.count || 1;
    const retryDelay = step.retry?.delay || 0;
    
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const input = this.resolveInput(step.input, context.state);
        const result = await this.mcpCaller(step.tool, input);
        
        if (!result.success) {
          throw new Error(result.error || `Tool ${step.tool} failed`);
        }

        if (step.output) {
          context.state[step.output] = result.data;
        }

        if (result.data?.id || result.data?.applicationId || result.data?.projectId) {
          this.trackCreatedResource(step, result.data, context.createdResources);
        }

        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxRetries - 1 && retryDelay > 0) {
          await this.sleep(retryDelay);
        }
      }
    }
    
    throw lastError;
  }

  private resolveInput(
    input: Record<string, any> | undefined,
    state: Record<string, any>
  ): Record<string, any> {
    if (!input) return {};
    
    const resolved: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === 'string' && value.startsWith('${') && value.endsWith('}')) {
        const varName = value.slice(2, -1);
        resolved[key] = state[varName];
      } else if (typeof value === 'string' && value.includes('${')) {
        resolved[key] = value.replace(/\$\{([^}]+)\}/g, (match, varName) => {
          return state[varName] !== undefined ? state[varName] : match;
        });
      } else {
        resolved[key] = value;
      }
    }
    
    return resolved;
  }

  private evaluateCondition(condition: string, state: Record<string, any>): boolean {
    try {
      const fn = new Function('state', `with(state) { return ${condition}; }`);
      return fn(state);
    } catch {
      return false;
    }
  }

  private trackCreatedResource(
    step: WorkflowStep,
    data: any,
    resources: CreatedResource[]
  ): void {
    const idFields = ['id', 'applicationId', 'projectId', 'postgresId', 'mysqlId', 'composeId', 'serverId'];
    
    for (const field of idFields) {
      if (data[field]) {
        resources.push({
          type: step.tool.replace(/\.(create|deploy).*$/, ''),
          id: data[field],
          name: data.name || data.appName,
        });
        break;
      }
    }
  }

  private async rollback(context: WorkflowContext, rollbackSteps: string[]): Promise<void> {
    for (const resource of [...context.createdResources].reverse()) {
      try {
        const deleteTool = this.findDeleteTool(resource.type);
        if (deleteTool) {
          await this.mcpCaller(deleteTool, { [`${resource.type}Id`]: resource.id });
        }
      } catch {
      }
    }
  }

  private findDeleteTool(type: string): string | null {
    const deleteToolMap: Record<string, string> = {
      project: 'project_remove',
      application: 'application_delete',
      postgres: 'postgres_remove',
      mysql: 'mysql_remove',
      compose: 'compose_delete',
      server: 'server_remove',
    };
    return deleteToolMap[type] || null;
  }

  private extractOutput(
    state: Record<string, any>,
    outputFields: string[]
  ): Record<string, any> {
    const output: Record<string, any> = {};
    for (const field of outputFields) {
      if (state[field] !== undefined) {
        output[field] = state[field];
      }
    }
    return output;
  }

  private generateId(): string {
    return `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
