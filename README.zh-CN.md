# Dokploy MCP Server with Smart Skill

一个面向 Dokploy 的 Model Context Protocol (MCP) Server，内置 **Smart Skill 智能路由层**，在保留全部 265+ Dokploy API 能力的同时，将初始工具暴露数量大幅降低，从而节省 80%–97% 的 token。

- npm：[`@molicherry/dokploy-mcp`](https://www.npmjs.com/package/@molicherry/dokploy-mcp)
- GitHub：[`molicherry/dokploy-mcp`](https://github.com/molicherry/dokploy-mcp)
- 英文文档：[`README.md`](./README.md)

## 功能特性

- **Smart Skill 智能路由**：通过分类和工作流将 token 消耗降低 80%–97%
- **265+ API 接口覆盖**：覆盖 Dokploy 的完整核心能力
- **15 个智能分类**：Project、Application、Database、Compose、Domain、Server、Docker、Deployment、Settings、User、Notification、Backup、SSH、Registry、Security
- **3 个预置工作流**：`deploy_application`、`create_database`、`debug_service`
- **Token 优化**：初始连接只暴露约 22 个高层工具，而不是 265 个底层工具
- **TypeScript 类型安全**：完整 TypeScript 实现
- **易于集成**：兼容 Claude、Cursor 和其他 MCP 客户端

## Smart Skill 架构说明

### Token 节省效果

| 指标 | 传统方式 | Smart Skill | 节省 |
|------|----------|-------------|------|
| 初始工具数 | 265 | 22 | 92% |
| 初始 Tokens | ~40,000 | ~800 | 98% |
| 运行时峰值 | 40,000 | ~5,000 | 87% |
| 平均每次请求 | 40,000 | ~1,200 | 97% |

### 工作方式

1. **初始连接**：只向客户端暴露约 22 个 Skill 层工具
2. **意图识别**：将自然语言请求路由到合适的分类
3. **按需加载**：只为当前请求加载相关工具
4. **工作流支持**：复杂操作通过预置工作流完成

## 可用 Skill 工具

### 智能路由
- `dokploy_smart_route`：自然语言请求主入口
- `dokploy_discover`：列出所有分类和工作流

### 预置工作流
- `dokploy_deploy_application`：完整应用部署（项目 → 应用 → 部署 → 域名）
- `dokploy_create_database`：创建数据库并返回连接信息
- `dokploy_debug_service`：服务诊断与自动修复

### 分类路由（15 类）
- `dokploy_project`：项目管理
- `dokploy_application`：应用生命周期管理
- `dokploy_database`：数据库操作（PostgreSQL、MySQL、MariaDB、MongoDB、Redis）
- `dokploy_compose`：Docker Compose 管理
- `dokploy_domain`：域名、SSL、端口、重定向配置
- `dokploy_server`：服务器与集群管理
- `dokploy_docker`：Docker 容器操作
- `dokploy_deployment`：部署历史与监控
- `dokploy_settings`：系统设置与维护
- `dokploy_user`：用户管理与权限
- `dokploy_notification`：通知集成（Slack、Telegram、Discord、Email）
- `dokploy_backup`：备份与恢复
- `dokploy_ssh`：SSH Key 管理
- `dokploy_registry`：Docker Registry 管理
- `dokploy_security`：基础认证与证书管理

## 安装方式

### 方式 1：直接通过 npx 使用（推荐）

```bash
npx -y @molicherry/dokploy-mcp
```

### 方式 2：克隆仓库后本地构建

```bash
git clone https://github.com/molicherry/dokploy-mcp.git
cd dokploy-mcp
npm install
npm run build
```

## 配置

### 环境变量

```bash
export DOKPLOY_URL="https://your-dokploy-instance.com"
export DOKPLOY_API_KEY="your-api-key"
```

**获取 Dokploy API Key：** Dokploy 后台 `Settings → Profile → API/CLI`

### MCP 客户端配置

#### Claude Desktop

请将下面配置加入 Claude Desktop 配置文件。

**macOS：**
```bash
~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows：**
```bash
%APPDATA%/Claude/claude_desktop_config.json
```

**Linux：**
```bash
~/.config/Claude/claude_desktop_config.json
```

**配置示例：**
```json
{
  "mcpServers": {
    "dokploy": {
      "command": "npx",
      "args": ["-y", "@molicherry/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-instance.com",
        "DOKPLOY_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### Cursor

在 Cursor Settings → MCP 中加入：

```json
{
  "mcpServers": {
    "dokploy": {
      "command": "npx",
      "args": ["-y", "@molicherry/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-instance.com",
        "DOKPLOY_API_KEY": "your-api-key"
      }
    }
  }
}
```

## 使用示例

### 使用 Smart Route（推荐）

你可以直接用自然语言描述操作目标，例如：

```text
"Deploy my Next.js app from GitHub to production"
"Create a PostgreSQL database for my app"
"Debug why my application is not running"
"List all my projects"
"Set up a custom domain with SSL"
```

### 使用预置工作流

#### 部署应用
```json
{
  "projectName": "my-project",
  "appName": "my-app",
  "sourceType": "github",
  "repository": "myrepo/myapp",
  "owner": "myusername",
  "branch": "main",
  "buildType": "nixpacks",
  "domain": "app.example.com"
}
```

#### 创建数据库
```json
{
  "type": "postgres",
  "name": "my-db",
  "appName": "my-db-app",
  "environmentId": "env-id",
  "databasePassword": "secure-password"
}
```

#### 调试服务
```json
{
  "identifier": "my-app",
  "action": "auto"
}
```

### 使用分类路由

每个分类路由都接受一个 `action` 参数，例如：

```json
// 项目操作
{
  "action": "create",
  "name": "New Project",
  "description": "My new project"
}

// 应用操作
{
  "action": "deploy",
  "applicationId": "app-id"
}

// 数据库操作
{
  "engine": "postgres",
  "action": "create",
  "name": "my-database"
}
```

## 架构图

```text
┌─────────────────────────────────────────────────────────────┐
│                    MCP Client (Claude/Cursor)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Dokploy MCP Server                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Skill Layer (22 tools exposed)                      │   │
│  │  ├─ dokploy_smart_route                             │   │
│  │  ├─ dokploy_deploy_application                      │   │
│  │  ├─ dokploy_create_database                         │   │
│  │  ├─ dokploy_debug_service                           │   │
│  │  ├─ dokploy_project                                 │   │
│  │  ├─ dokploy_application                             │   │
│  │  ├─ dokploy_database                                │   │
│  │  ├─ ... (15 categories)                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Category Router                                     │   │
│  │  ├─ Intent Recognition                              │   │
│  │  ├─ Tool Selection                                  │   │
│  │  └─ Workflow Execution                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Tool Layer (265 tools, dynamically loaded)          │   │
│  │  ├─ project_create, project_one, ...                │   │
│  │  ├─ application_create, application_deploy, ...     │   │
│  │  ├─ postgres_create, mysql_create, ...              │   │
│  │  └─ ... (all 265 tools)                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Dokploy API Client                                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Dokploy API Server                      │
└─────────────────────────────────────────────────────────────┘
```

## 支持的模块（265+ 工具）

| 模块 | 工具数量 | 说明 |
|------|----------|------|
| Project | 5 | 项目的增删改查 |
| Application | 26 | 应用部署、管理与配置 |
| Database | 60 | PostgreSQL、MySQL、MariaDB、MongoDB、Redis |
| Compose | 17 | Docker Compose 与 Stack 管理 |
| Domain | 22 | 域名、SSL、端口、重定向 |
| Server | 16 | 多服务器与集群管理 |
| Docker | 7 | Docker 容器操作 |
| Deployment | 10 | 部署、回滚、监控 |
| Settings | 26 | 系统设置、清理、Traefik |
| User | 23 | 用户、权限、API Key 管理 |
| Notification | 15 | Slack、Telegram、Discord、Email 通知 |
| Backup | 24 | 数据库与卷备份 |
| SSH | 6 | SSH Key 管理 |
| Registry | 6 | Docker Registry 管理 |
| Security | 9 | Basic Auth、证书 |

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 监听模式
npm run dev
```

当前 `package.json` 中没有单独的 `npm test` 脚本，修改后可使用 `npm run build` 作为基础验证步骤。

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request。

## 支持

如需反馈问题或提出功能请求，请使用 GitHub Issues：

- https://github.com/molicherry/dokploy-mcp/issues

---

**注意**：本 MCP Server 需要一个可用的 Dokploy 实例。Dokploy 官网：<https://dokploy.com>
