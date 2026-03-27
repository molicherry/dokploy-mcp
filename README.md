# Dokploy MCP Server with Smart Skill

A comprehensive Model Context Protocol (MCP) server for Dokploy with **Smart Skill routing** - providing intelligent tool categorization for 80-97% token savings while maintaining access to all 265+ API endpoints.

## Features

- **Smart Skill Routing**: Intelligent categorization reduces token usage by 80-97%
- **265+ API Endpoints**: Complete coverage of all Dokploy APIs
- **15 Smart Categories**: Project, Application, Database, Compose, Domain, Server, Docker, Deployment, Settings, User, Notification, Backup, SSH, Registry, Security
- **3 Pre-built Workflows**: deploy_application, create_database, debug_service
- **Token Optimized**: Initial connection only exposes 22 high-level tools (~800 tokens vs 40,000)
- **Type-Safe**: Full TypeScript support
- **Easy Integration**: Works with Claude, Cursor, and any MCP-compatible client

## Smart Skill Architecture

### Token Savings

| Metric | Traditional | Smart Skill | Savings |
|--------|-------------|-------------|---------|
| Initial Tools | 265 | 22 | 92% |
| Initial Tokens | ~40,000 | ~800 | 98% |
| Runtime Peak | 40,000 | ~5,000 | 87% |
| Avg per Request | 40,000 | ~1,200 | 97% |

### How It Works

1. **Initial Connection**: Only 22 Skill-level tools are exposed
2. **Intent Recognition**: Natural language requests are routed to appropriate categories
3. **Dynamic Loading**: Only relevant tools are loaded for each request
4. **Workflow Support**: Complex multi-step operations use pre-built workflows

### Available Skill Tools

#### Smart Routing
- `dokploy_smart_route` - Main entry point for natural language requests
- `dokploy_discover` - List all categories and workflows

#### Pre-built Workflows
- `dokploy_deploy_application` - Full app deployment (project → app → deploy → domain)
- `dokploy_create_database` - Database creation with connection info
- `dokploy_debug_service` - Service diagnostics and auto-repair

#### Category Routers (15 categories)
- `dokploy_project` - Project management
- `dokploy_application` - Application lifecycle
- `dokploy_database` - Database operations (PostgreSQL, MySQL, MariaDB, MongoDB, Redis)
- `dokploy_compose` - Docker Compose management
- `dokploy_domain` - Domain, SSL, port, redirect configuration
- `dokploy_server` - Server and cluster management
- `dokploy_docker` - Docker container operations
- `dokploy_deployment` - Deployment history and monitoring
- `dokploy_settings` - System settings and maintenance
- `dokploy_user` - User management and permissions
- `dokploy_notification` - Notifications (Slack, Telegram, Discord, Email)
- `dokploy_backup` - Backup and restore operations
- `dokploy_ssh` - SSH key management
- `dokploy_registry` - Docker registry management
- `dokploy_security` - Basic auth and certificates

## Installation

### Option 1: Use with npx (Recommended)

```bash
npx -y dokploy-mcp
```

### Option 2: Clone and Build

```bash
git clone https://github.com/yourusername/dokploy-mcp.git
cd dokploy-mcp
npm install
npm run build
```

## Configuration

### Environment Variables

```bash
export DOKPLOY_URL="https://your-dokploy-instance.com"
export DOKPLOY_API_KEY="your-api-key"
```

**Get your API key from Dokploy:** Settings → Profile → API/CLI Section

### MCP Client Configuration

#### Claude Desktop

Add to your Claude Desktop configuration:

**macOS:**
```bash
~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%/Claude/claude_desktop_config.json
```

**Linux:**
```bash
~/.config/Claude/claude_desktop_config.json
```

**Configuration:**
```json
{
  "mcpServers": {
    "dokploy": {
      "command": "npx",
      "args": ["-y", "dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-instance.com",
        "DOKPLOY_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### Cursor

Add to Cursor Settings → MCP:

```json
{
  "mcpServers": {
    "dokploy": {
      "command": "npx",
      "args": ["-y", "dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-instance.com",
        "DOKPLOY_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Usage Examples

### Using Smart Route (Recommended)

Simply describe what you want to do in natural language:

```
"Deploy my Next.js app from GitHub to production"
"Create a PostgreSQL database for my app"
"Debug why my application is not running"
"List all my projects"
"Set up a custom domain with SSL"
```

### Using Pre-built Workflows

#### Deploy Application
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

#### Create Database
```json
{
  "type": "postgres",
  "name": "my-db",
  "appName": "my-db-app",
  "environmentId": "env-id",
  "databasePassword": "secure-password"
}
```

#### Debug Service
```json
{
  "identifier": "my-app",
  "action": "auto"
}
```

### Using Category Routers

Each category router accepts an `action` parameter:

```json
// Project operations
{
  "action": "create",
  "name": "New Project",
  "description": "My new project"
}

// Application operations
{
  "action": "deploy",
  "applicationId": "app-id"
}

// Database operations
{
  "engine": "postgres",
  "action": "create",
  "name": "my-database"
}
```

## Architecture

```
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

## Supported Modules (265+ Tools)

| Module | Tools | Description |
|--------|-------|-------------|
| Project | 5 | Create, read, update, delete projects |
| Application | 26 | Deploy, manage, and configure applications |
| Database | 60 | PostgreSQL, MySQL, MariaDB, MongoDB, Redis |
| Compose | 17 | Docker Compose and Stack management |
| Domain | 22 | Domain, SSL, port, redirect configuration |
| Server | 16 | Multi-server and cluster management |
| Docker | 7 | Docker container operations |
| Deployment | 10 | Deployments, rollbacks, monitoring |
| Settings | 26 | System settings, cleanup, Traefik |
| User | 23 | User management, permissions, API keys |
| Notification | 15 | Slack, Telegram, Discord, Email |
| Backup | 24 | Database and volume backups |
| SSH | 6 | SSH key management |
| Registry | 6 | Docker registry management |
| Security | 9 | Basic auth, certificates |

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Test
npm test
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/yourusername/dokploy-mcp/issues) page.

---

**Note**: This MCP server requires a running Dokploy instance. Learn more about Dokploy at [dokploy.com](https://dokploy.com).
