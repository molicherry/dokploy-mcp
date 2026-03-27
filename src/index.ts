#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { DokployClient } from "./client/index.js";
import { DokploySkill } from "./skill/index.js";
import { categoryMap, crossCategoryWorkflows } from "./skill/utils/category-router.js";
import { workflows } from "./skill/workflows/index.js";
import { createTools, type ToolDefinition } from "./tools.js";

const DOKPLOY_URL = process.env.DOKPLOY_URL || "http://localhost:3000";
const DOKPLOY_API_KEY = process.env.DOKPLOY_API_KEY || "";

if (!DOKPLOY_API_KEY) {
  console.error("Error: DOKPLOY_API_KEY environment variable is required");
  process.exit(1);
}

const client = new DokployClient({
  baseUrl: DOKPLOY_URL,
  apiKey: DOKPLOY_API_KEY,
});

const server = new Server(
  {
    name: "dokploy-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const allToolDefinitions: ToolDefinition[] = createTools(client);

const skillTools = [
  {
    name: "dokploy_smart_route",
    description: "智能路由：根据自然语言描述自动识别意图并执行相应操作。这是主要的入口工具。",
    inputSchema: {
      type: "object",
      properties: {
        request: {
          type: "string",
          description: "自然语言描述您想执行的操作，例如：'部署一个 Next.js 应用到生产环境'、'创建 PostgreSQL 数据库'、'查看所有项目'",
        },
        context: {
          type: "object",
          description: "可选的上下文信息，如 projectId, environmentId 等",
        },
      },
      required: ["request"],
    },
  },
  {
    name: "dokploy_deploy_application",
    description: "完整应用部署工作流：自动创建项目、应用、配置源码、设置环境变量、部署、配置域名",
    inputSchema: {
      type: "object",
      properties: {
        projectName: { type: "string", description: "项目名称（不存在则自动创建）" },
        appName: { type: "string", description: "应用名称" },
        environmentId: { type: "string", description: "环境ID（可选）" },
        sourceType: { type: "string", enum: ["github", "gitlab", "bitbucket", "gitea", "git", "docker"], description: "源码类型" },
        repository: { type: "string", description: "仓库地址或名称" },
        owner: { type: "string", description: "仓库所有者" },
        branch: { type: "string", description: "分支名", default: "main" },
        buildPath: { type: "string", description: "构建路径", default: "/" },
        buildType: { type: "string", enum: ["dockerfile", "nixpacks", "static", "railpack", "heroku_buildpacks"], description: "构建类型", default: "nixpacks" },
        envVars: { type: "string", description: "环境变量（格式：KEY=value\\nKEY2=value2）" },
        domain: { type: "string", description: "自定义域名（可选）" },
      },
      required: ["projectName", "appName", "sourceType", "repository"],
    },
  },
  {
    name: "dokploy_create_database",
    description: "创建数据库工作流：创建数据库服务并返回连接信息",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["postgres", "mysql", "mariadb", "mongo", "redis"], description: "数据库类型" },
        name: { type: "string", description: "服务名称" },
        appName: { type: "string", description: "应用名称" },
        environmentId: { type: "string", description: "环境ID" },
        databaseName: { type: "string", description: "数据库名" },
        databaseUser: { type: "string", description: "数据库用户" },
        databasePassword: { type: "string", description: "数据库密码" },
        externalPort: { type: "number", description: "外部端口（可选）" },
      },
      required: ["type", "name", "appName", "environmentId", "databasePassword"],
    },
  },
  {
    name: "dokploy_debug_service",
    description: "诊断服务工作流：检查状态、查看日志、自动修复",
    inputSchema: {
      type: "object",
      properties: {
        identifier: { type: "string", description: "应用名、ID或域名" },
        action: { type: "string", enum: ["auto", "restart", "redeploy", "rollback"], description: "修复动作", default: "auto" },
      },
      required: ["identifier"],
    },
  },
  {
    name: "dokploy_project",
    description: "项目管理：创建、查看、更新、删除项目",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "list", "update", "delete"], description: "操作类型" },
        projectId: { type: "string", description: "项目ID（get/update/delete时需要）" },
        name: { type: "string", description: "项目名称（create/update时需要）" },
        description: { type: "string", description: "项目描述" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_application",
    description: "应用管理：部署、启动、停止、配置应用",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "list", "update", "delete", "deploy", "start", "stop", "reload"], description: "操作类型" },
        applicationId: { type: "string", description: "应用ID" },
        name: { type: "string", description: "应用名称" },
        environmentId: { type: "string", description: "环境ID" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_database",
    description: "数据库管理：创建和管理 PostgreSQL、MySQL、MariaDB、MongoDB、Redis",
    inputSchema: {
      type: "object",
      properties: {
        engine: { type: "string", enum: ["postgres", "mysql", "mariadb", "mongo", "redis"], description: "数据库引擎" },
        action: { type: "string", enum: ["create", "get", "list", "update", "delete", "deploy", "start", "stop"], description: "操作类型" },
        databaseId: { type: "string", description: "数据库ID" },
        name: { type: "string", description: "服务名称" },
        appName: { type: "string", description: "应用名称" },
        environmentId: { type: "string", description: "环境ID" },
        databaseName: { type: "string", description: "数据库名" },
        databaseUser: { type: "string", description: "数据库用户" },
        databasePassword: { type: "string", description: "数据库密码" },
      },
      required: ["engine", "action"],
    },
  },
  {
    name: "dokploy_compose",
    description: "Docker Compose：管理多容器应用",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "list", "update", "delete", "deploy", "start", "stop"], description: "操作类型" },
        composeId: { type: "string", description: "Compose ID" },
        name: { type: "string", description: "Compose 名称" },
        environmentId: { type: "string", description: "环境ID" },
        composeFile: { type: "string", description: "docker-compose.yml 内容" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_domain",
    description: "域名与网络：配置域名、SSL证书、端口、重定向",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create_domain", "get_domain", "delete_domain", "create_port", "create_redirect", "validate"], description: "操作类型" },
        host: { type: "string", description: "域名" },
        applicationId: { type: "string", description: "应用ID" },
        composeId: { type: "string", description: "Compose ID" },
        https: { type: "boolean", description: "启用HTTPS" },
        certificateType: { type: "string", enum: ["letsencrypt", "none", "custom"], description: "证书类型" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_server",
    description: "服务器管理：添加、配置、管理服务器和集群",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "list", "update", "delete", "setup", "validate"], description: "操作类型" },
        serverId: { type: "string", description: "服务器ID" },
        name: { type: "string", description: "服务器名称" },
        ipAddress: { type: "string", description: "IP地址" },
        port: { type: "number", description: "SSH端口" },
        username: { type: "string", description: "SSH用户名" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_docker",
    description: "Docker 操作：查看和管理容器",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["list_containers", "restart", "get_config", "get_logs"], description: "操作类型" },
        containerId: { type: "string", description: "容器ID" },
        appName: { type: "string", description: "应用名称" },
        serverId: { type: "string", description: "服务器ID" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_deployment",
    description: "部署与监控：查看部署历史、回滚、监控",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["list", "get", "kill", "rollback", "monitor"], description: "操作类型" },
        applicationId: { type: "string", description: "应用ID" },
        deploymentId: { type: "string", description: "部署ID" },
        rollbackId: { type: "string", description: "回滚ID" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_settings",
    description: "系统设置：维护、清理、Traefik配置、定时任务",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["cleanup", "reload_traefik", "get_config", "update_config", "schedule"], description: "操作类型" },
        serverId: { type: "string", description: "服务器ID" },
        traefikConfig: { type: "string", description: "Traefik配置内容" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_user",
    description: "用户与权限：管理用户、API密钥、组织",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["list", "get", "create", "update", "delete", "assign_permissions", "create_api_key"], description: "操作类型" },
        userId: { type: "string", description: "用户ID" },
        email: { type: "string", description: "邮箱" },
        password: { type: "string", description: "密码" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_notification",
    description: "通知告警：配置 Slack、Telegram、Discord、邮件通知",
    inputSchema: {
      type: "object",
      properties: {
        provider: { type: "string", enum: ["slack", "telegram", "discord", "email"], description: "通知提供商" },
        action: { type: "string", enum: ["create", "get", "list", "update", "delete", "test"], description: "操作类型" },
        name: { type: "string", description: "通知名称" },
        webhookUrl: { type: "string", description: "Webhook URL" },
      },
      required: ["provider", "action"],
    },
  },
  {
    name: "dokploy_backup",
    description: "备份恢复：配置备份、执行备份、管理存储目的地",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "list", "delete", "run", "create_destination", "restore"], description: "操作类型" },
        backupId: { type: "string", description: "备份ID" },
        destinationId: { type: "string", description: "目的地ID" },
        schedule: { type: "string", description: "Cron表达式" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_ssh",
    description: "SSH 密钥：生成和管理 SSH 密钥",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "list", "delete", "generate"], description: "操作类型" },
        sshKeyId: { type: "string", description: "SSH密钥ID" },
        name: { type: "string", description: "密钥名称" },
        publicKey: { type: "string", description: "公钥内容" },
        privateKey: { type: "string", description: "私钥内容" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_registry",
    description: "镜像仓库：管理 Docker 镜像仓库",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "list", "update", "delete", "test"], description: "操作类型" },
        registryId: { type: "string", description: "仓库ID" },
        name: { type: "string", description: "仓库名称" },
        registryUrl: { type: "string", description: "仓库URL" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_security",
    description: "安全认证：配置 Basic Auth、证书",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create_auth", "get_auth", "delete_auth", "create_cert", "renew_cert"], description: "操作类型" },
        applicationId: { type: "string", description: "应用ID" },
        username: { type: "string", description: "用户名" },
        password: { type: "string", description: "密码" },
      },
      required: ["action"],
    },
  },
  {
    name: "dokploy_discover",
    description: "发现可用工具：列出所有分类和工作流",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "特定分类（可选）" },
        workflow: { type: "string", description: "特定工作流（可选）" },
      },
    },
  },
];

const skill = new DokploySkill(
  {
    mcpClient: {
      baseUrl: DOKPLOY_URL,
      apiKey: DOKPLOY_API_KEY,
    },
    enableRollback: true,
  },
  async (name: string, args: any) => {
    const tool = allToolDefinitions.find((t) => t.name === name);
    if (!tool) {
      return { success: false, error: `Tool not found: ${name}` };
    }
    try {
      const result = await tool.handler(args);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
);

const tools = skillTools.map(({ name, description, inputSchema }) => ({
  name,
  description,
  inputSchema,
}));

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    return {
      content: [{ type: "text", text: "Error: No arguments provided" }],
      isError: true,
    };
  }

  try {
    let result: any;

    switch (name) {
      case "dokploy_smart_route": {
        const response = await skill.handle({
          message: String(args.request || ""),
          context: args.context as { projectId?: string; environmentId?: string; previousActions?: string[] },
        });
        result = response;
        break;
      }

      case "dokploy_deploy_application": {
        const response = await skill.handle({
          message: `deploy application ${args.appName} in project ${args.projectName}`,
          context: args as Record<string, any>,
        });
        result = response;
        break;
      }

      case "dokploy_create_database": {
        const response = await skill.handle({
          message: `create ${args.engine} database ${args.name}`,
          context: args as Record<string, any>,
        });
        result = response;
        break;
      }

      case "dokploy_debug_service": {
        const response = await skill.handle({
          message: `debug service ${args.identifier}`,
          context: args as Record<string, any>,
        });
        result = response;
        break;
      }

      case "dokploy_discover": {
        result = {
          categories: Object.entries(categoryMap).map(([key, config]) => ({
            id: key,
            name: config.name,
            tools: config.tools,
            tokens: config.tokens,
          })),
          workflows: Object.entries(workflows).map(([key, workflow]) => ({
            id: key,
            name: workflow.name,
            description: workflow.description,
          })),
          crossCategoryWorkflows: Object.entries(crossCategoryWorkflows).map(([key, config]) => ({
            id: key,
            name: config.name,
            categories: config.categories,
            tokens: config.tokens,
          })),
        };
        break;
      }

      case "dokploy_project":
      case "dokploy_application":
      case "dokploy_database":
      case "dokploy_compose":
      case "dokploy_domain":
      case "dokploy_server":
      case "dokploy_docker":
      case "dokploy_deployment":
      case "dokploy_settings":
      case "dokploy_user":
      case "dokploy_notification":
      case "dokploy_backup":
      case "dokploy_ssh":
      case "dokploy_registry":
      case "dokploy_security": {
        const category = name.replace("dokploy_", "");
        const response = await skill.handle({
          message: `${category} ${args.action}`,
          context: args as Record<string, any>,
        });
        result = response;
        break;
      }

      default:
        return {
          content: [{ type: "text", text: `Error: Unknown tool: ${name}` }],
          isError: true,
        };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
