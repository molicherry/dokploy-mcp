import type {
  UserRequest,
  SkillResponse,
  SkillConfig,
  RouteResult,
  WorkflowDefinition,
  WorkflowExecutionResult,
} from './types.js';
import { CategoryRouter, categoryMap, crossCategoryWorkflows } from './utils/category-router.js';
import { WorkflowEngine } from './utils/workflow-engine.js';
import { McpClient } from './utils/mcp-client.js';
import { workflows } from './workflows/index.js';

export class DokploySkill {
  private router: CategoryRouter;
  private workflowEngine: WorkflowEngine;
  private mcpClient: McpClient;
  private config: SkillConfig;

  constructor(config: SkillConfig) {
    this.config = config;
    this.mcpClient = new McpClient(config.mcpClient);
    this.router = new CategoryRouter();
    this.workflowEngine = new WorkflowEngine(
      (name, args) => this.mcpClient.callTool(name, args),
      config.enableRollback
    );
  }

  async handle(request: UserRequest): Promise<SkillResponse> {
    try {
      const route = this.router.route(request.message);
      
      switch (route.strategy) {
        case 'cross-category-workflow':
          return this.handleWorkflow(route, request);
          
        case 'single-category':
        case 'subcategory':
          return this.handleSingleCategory(route, request);
          
        case 'multi-category':
          return this.handleMultiCategory(route, request);
          
        case 'clarify':
          return {
            success: true,
            message: route.message || '请提供更多详细信息',
            requiresInput: true,
            inputPrompt: route.message,
            suggestions: route.options?.map(o => `${o.name}: ${o.description}`),
          };
          
        default:
          return {
            success: false,
            message: '无法识别请求意图',
          };
      }
    } catch (error) {
      return {
        success: false,
        message: `处理请求时出错: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  private async handleWorkflow(
    route: RouteResult,
    request: UserRequest
  ): Promise<SkillResponse> {
    const workflowName = route.workflow!;
    const workflow = workflows[workflowName];
    
    if (!workflow) {
      return {
        success: false,
        message: `工作流 ${workflowName} 未找到`,
      };
    }

    const missingParams = this.checkMissingParams(workflow, request.context || {});
    if (missingParams.length > 0) {
      return {
        success: true,
        message: `执行工作流需要以下参数：`,
        requiresInput: true,
        inputPrompt: `请提供: ${missingParams.join(', ')}`,
        data: { workflow: workflowName, requiredParams: missingParams },
      };
    }

    const input = this.buildWorkflowInput(workflow, request);
    const result = await this.workflowEngine.execute(workflow, input);

    return this.formatWorkflowResult(result, workflow);
  }

  private async handleSingleCategory(
    route: RouteResult,
    request: UserRequest
  ): Promise<SkillResponse> {
    const category = route.category!;
    const config = categoryMap[category];
    
    return {
      success: true,
      message: `已识别为${config.name}操作`,
      data: {
        category,
        subcategory: route.subcategory,
        availableTools: route.tools,
        tokenEstimate: route.tokenEstimate,
        suggestedWorkflows: config.workflows,
      },
      suggestions: [
        `可用的工具: ${route.tools?.slice(0, 5).join(', ')}${(route.tools?.length || 0) > 5 ? '...' : ''}`,
        `建议工作流: ${config.workflows?.join(', ')}`,
      ],
    };
  }

  private async handleMultiCategory(
    route: RouteResult,
    request: UserRequest
  ): Promise<SkillResponse> {
    const categories = route.categories!;
    const categoryNames = categories.map(c => categoryMap[c].name);
    
    return {
      success: true,
      message: `检测到涉及多个领域的操作：${categoryNames.join('、')}`,
      data: {
        categories,
        availableTools: route.tools,
        tokenEstimate: route.tokenEstimate,
      },
      suggestions: [
        '这是一个复杂操作，建议使用预定义工作流',
        `涉及分类: ${categoryNames.join(', ')}`,
      ],
    };
  }

  private checkMissingParams(
    workflow: WorkflowDefinition,
    context: Record<string, any>
  ): string[] {
    const missing: string[] = [];
    
    for (const [key, param] of Object.entries(workflow.input)) {
      if (param.required && !context[key]) {
        missing.push(`${key} (${param.description})`);
      }
    }
    
    return missing;
  }

  private buildWorkflowInput(
    workflow: WorkflowDefinition,
    request: UserRequest
  ): Record<string, any> {
    const input: Record<string, any> = {};
    const context = request.context || {};
    
    for (const [key, param] of Object.entries(workflow.input)) {
      input[key] = (context as Record<string, any>)[key] ?? param.default;
    }
    
    return input;
  }

  private formatWorkflowResult(
    result: WorkflowExecutionResult,
    workflow: WorkflowDefinition
  ): SkillResponse {
    if (result.success) {
      return {
        success: true,
        message: `工作流 "${workflow.name}" 执行成功`,
        data: result.output,
      };
    } else {
      return {
        success: false,
        message: `工作流执行失败: ${result.error?.message}`,
        data: {
          failedStep: result.error?.step,
          stepsCompleted: result.stepsCompleted,
          stepsTotal: result.stepsTotal,
        },
      };
    }
  }

  getAvailableWorkflows(): string[] {
    return Object.keys(workflows);
  }

  getWorkflow(name: string): WorkflowDefinition | undefined {
    return workflows[name];
  }

  getCategories(): string[] {
    return Object.keys(categoryMap);
  }

  getCategoryInfo(category: string) {
    return categoryMap[category];
  }
}

export { CategoryRouter, WorkflowEngine, McpClient };
export * from './types.js';
export * from './workflows/index.js';
