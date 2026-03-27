# Dokploy Smart Skill

智能分类路由 + 工作流引擎 for Dokploy MCP Server

## 特性

- **智能分类路由**: 根据用户意图自动选择相关工具分类，避免加载全部 265 个工具
- **工作流引擎**: 支持复杂的多步骤工作流，自动处理步骤间的依赖和状态传递
- **Token 优化**: 相比原生 MCP 节省 80-97% 的 Token 消耗
- **智能降级**: 从工作流 → 分类 → 子分类 → 单个工具，逐级降级
- **自动回滚**: 工作流失败时自动清理已创建的资源

## 安装

```bash
npm install @dokploy/smart-skill
```

## 使用

```typescript
import { DokploySkill } from '@dokploy/smart-skill';

const skill = new DokploySkill({
  mcpClient: {
    baseUrl: 'https://your-dokploy.com',
    apiKey: 'your-api-key',
  },
  enableRollback: true,
});

// 处理用户请求
const result = await skill.handle({
  message: '部署应用到生产环境',
  context: {
    projectName: 'My Project',
    appName: 'My App',
    sourceType: 'github',
    repository: 'my-repo',
  },
});

console.log(result);
```

## 架构

```
用户请求
    │
    ▼
┌─────────────────┐
│  意图分类器      │ ← 分析请求，选择策略
│  (CategoryRouter)│
└────────┬────────┘
         │
    ┌────┴────┬────────┬────────┐
    ▼         ▼        ▼        ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│Workflow│ │Category│ │Subcat │ │MCP    │
│工作流   │ │分类    │ │子分类 │ │工具   │
└────┬───┘ └───┬───┘ └───┬───┘ └───┬───┘
     │         │         │         │
     └─────────┴────┬────┴─────────┘
                    ▼
           ┌─────────────┐
           │  工作流引擎   │
           │ (WorkflowEngine)
           └─────────────┘
```

## 分类映射

| 分类 | 工具数 | Token 估算 | 关键词 |
|------|--------|-----------|--------|
| project | 5 | 400 | 项目、project |
| application | 26 | 2000 | 应用、部署、github |
| database | 60 | 5000 | 数据库、postgres、mysql |
| compose | 17 | 1200 | compose、编排 |
| domain | 22 | 1500 | 域名、SSL、证书 |
| server | 16 | 1200 | 服务器、节点、集群 |
| docker | 7 | 500 | 容器、docker |
| deployment | 10 | 800 | 部署记录、回滚 |
| settings | 26 | 1800 | 设置、维护、定时任务 |
| user | 23 | 1600 | 用户、权限、认证 |
| notification | 15 | 1000 | 通知、告警、slack |
| backup | 24 | 1800 | 备份、恢复、回滚 |
| ssh | 6 | 400 | SSH、密钥 |
| registry | 6 | 400 | 镜像仓库 |
| security | 9 | 600 | 安全、认证 |

## 预定义工作流

### 1. deploy_application

完整应用部署工作流：创建项目 → 创建应用 → 配置源码 → 部署 → 配置域名

```typescript
const result = await skill.handle({
  message: '部署应用到生产环境',
  context: {
    projectName: 'My Project',
    appName: 'My App',
    sourceType: 'github',
    repository: 'my-repo',
    owner: 'myorg',
    branch: 'main',
    domain: 'myapp.example.com',
  },
});
```

### 2. create_database

创建数据库并返回连接信息

```typescript
const result = await skill.handle({
  message: '创建 PostgreSQL 数据库',
  context: {
    type: 'postgres',
    name: 'Production DB',
    appName: 'postgres-prod',
    environmentId: 'env_xxx',
    databasePassword: 'secure-password',
  },
});
```

### 3. debug_service

诊断服务问题并自动修复

```typescript
const result = await skill.handle({
  message: '调试 myapp 应用',
  context: {
    identifier: 'myapp',
    action: 'auto',
  },
});
```

## Token 优化效果

| 查询类型 | 原生 MCP | Smart Skill | 节省 |
|---------|---------|-------------|------|
| 单分类查询 | 40k | 1k | **97.5%** |
| 子分类查询 | 40k | 0.5k | **98.8%** |
| 双分类组合 | 40k | 3.5k | **91%** |
| 工作流执行 | 40k | 4k | **90%** |

## API

### DokploySkill

主类，处理用户请求并协调路由和工作流执行。

#### Constructor

```typescript
new DokploySkill(config: SkillConfig)
```

#### Methods

- `handle(request: UserRequest): Promise<SkillResponse>` - 处理用户请求
- `getAvailableWorkflows(): string[]` - 获取可用工作流列表
- `getWorkflow(name: string): WorkflowDefinition | undefined` - 获取工作流定义
- `getCategories(): string[]` - 获取所有分类
- `getCategoryInfo(category: string): CategoryConfig` - 获取分类信息

### CategoryRouter

智能分类路由器，根据用户输入选择最优策略。

```typescript
const router = new CategoryRouter();
const result = router.route('部署应用到生产环境');
// result.strategy: 'cross-category-workflow'
// result.workflow: 'full_deploy'
```

### WorkflowEngine

工作流执行引擎，处理多步骤工作流的执行、状态管理和错误回滚。

```typescript
const engine = new WorkflowEngine(mcpCaller, enableRollback);
const result = await engine.execute(workflowDefinition, input);
```

## License

MIT
