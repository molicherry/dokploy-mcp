/**
 * Dokploy Smart Skill - Type Definitions
 * 
 * 智能分类路由 + 工作流引擎的类型定义
 */

// ========== 路由相关类型 ==========

export type RoutingStrategy = 
  | 'exact-workflow'
  | 'cross-category-workflow'
  | 'single-category'
  | 'subcategory'
  | 'multi-category'
  | 'mcp-tools'
  | 'clarify';

export interface RouteResult {
  strategy: RoutingStrategy;
  confidence: number;
  message?: string;
  
  // 工作流相关
  workflow?: string;
  
  // 分类相关
  category?: string;
  categories?: string[];
  subcategory?: string;
  
  // 工具相关
  tools?: string[];
  tokenEstimate: number;
  
  // 澄清选项
  options?: ClarifyOption[];
}

export interface ClarifyOption {
  category: string;
  name: string;
  description: string;
}

// ========== 分类相关类型 ==========

export interface CategoryConfig {
  name: string;
  tools: number;
  tokens: number;
  keywords: string[];
  tools_list?: string[];
  workflows?: string[];
  subcategories?: Record<string, string[]>;
  engines?: Record<string, EngineConfig>;
  providers?: string[];
}

export interface EngineConfig {
  tools: number;
  tokens: number;
  keywords: string[];
}

// ========== 工作流相关类型 ==========

export interface WorkflowConfig {
  name: string;
  categories: string[];
  tokens: number;
  keywords: string[];
  description?: string;
}

export interface WorkflowStep {
  name: string;
  tool: string;
  input?: Record<string, any>;
  output?: string;
  condition?: string;
  retry?: {
    count: number;
    delay: number;
  };
}

export interface WorkflowDefinition {
  name: string;
  description: string;
  input: Record<string, WorkflowInputParam>;
  output: string[];
  steps: WorkflowStep[];
  onError?: {
    rollback?: string[];
    notify?: boolean;
  };
}

export interface WorkflowInputParam {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required?: boolean;
  default?: any;
  enum?: string[];
}

// ========== 工作流执行相关类型 ==========

export interface WorkflowContext {
  workflowId: string;
  input: Record<string, any>;
  state: WorkflowState;
  stepIndex: number;
  createdResources: CreatedResource[];
}

export interface WorkflowState {
  [key: string]: any;
}

export interface CreatedResource {
  type: string;
  id: string;
  name?: string;
}

export interface WorkflowExecutionResult {
  success: boolean;
  output?: Record<string, any>;
  error?: WorkflowError;
  stepsCompleted: number;
  stepsTotal: number;
}

export interface WorkflowError {
  step: string;
  message: string;
  code: string;
  details?: any;
}

// ========== MCP 客户端类型 ==========

export interface McpToolCall {
  name: string;
  arguments: Record<string, any>;
}

export interface McpToolResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface McpClientConfig {
  baseUrl: string;
  apiKey: string;
}

// ========== Skill 配置类型 ==========

export interface SkillConfig {
  mcpClient: McpClientConfig;
  maxRetries: number;
  retryDelay: number;
  enableRollback: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

// ========== 用户请求类型 ==========

export interface UserRequest {
  message: string;
  context?: {
    projectId?: string;
    environmentId?: string;
    previousActions?: string[];
  };
}

export interface SkillResponse {
  success: boolean;
  message: string;
  data?: any;
  suggestions?: string[];
  requiresInput?: boolean;
  inputPrompt?: string;
}
