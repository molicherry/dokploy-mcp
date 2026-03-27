# Dokploy MCP Server

A comprehensive Model Context Protocol (MCP) server for Dokploy, supporting 200+ API endpoints across all Dokploy modules.

## Features

- **Complete API Coverage**: Supports all major Dokploy API endpoints
- **Modular Design**: Organized by functional modules (Projects, Applications, Databases, etc.)
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Easy Integration**: Works with any MCP-compatible client

## Supported Modules

| Module | Endpoints | Description |
|--------|-----------|-------------|
| Project | 5 | Create, read, update, delete projects |
| Application | 20+ | Deploy, manage, and configure applications |
| PostgreSQL | 10 | Manage PostgreSQL databases |
| MySQL | 10 | Manage MySQL databases |
| MongoDB | 10 | Manage MongoDB databases |
| Redis | 10 | Manage Redis databases |
| Compose | 15+ | Docker Compose and Stack management |
| Domain | 8 | Domain and SSL configuration |
| Deployment | 6 | View and manage deployments |
| Server | 10 | Multi-server management |
| Notification | 20+ | Slack, Telegram, Discord, Email notifications |
| User & Auth | 15+ | User management and authentication |
| Settings | 30+ | System settings and maintenance |
| Docker | 10 | Docker container management |
| Backup | 12+ | Database and volume backups |
| Schedule | 7 | Cron job scheduling |
| SSH Keys | 6 | SSH key management |
| Registry | 5 | Docker registry management |
| Security | 4 | HTTP Basic Auth |
| Swarm | 3 | Docker Swarm management |

## Installation

```bash
npm install
npm run build
```

## Configuration

Set the following environment variables:

```bash
export DOKPLOY_URL="https://your-dokploy-instance.com"
export DOKPLOY_API_KEY="your-api-key"
```

Get your API key from Dokploy: Settings → Profile → API/CLI Section

## Usage with Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "dokploy": {
      "command": "node",
      "args": ["/path/to/dokploy-mcp/dist/index.js"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-instance.com",
        "DOKPLOY_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Available Tools

### Project Management

- `project_create` - Create a new project
- `project_one` - Get project by ID
- `project_all` - List all projects
- `project_update` - Update project
- `project_remove` - Delete project

### Application Management

- `application_create` - Create application
- `application_one` - Get application
- `application_delete` - Delete application
- `application_deploy` - Deploy application
- `application_redeploy` - Redeploy application
- `application_start` - Start application
- `application_stop` - Stop application
- `application_save_environment` - Set environment variables
- `application_save_build_type` - Configure build type (dockerfile, nixpacks, etc.)
- `application_save_github_provider` - Connect GitHub repository
- `application_save_gitlab_provider` - Connect GitLab repository
- `application_save_docker_provider` - Use Docker image

### Database Management

#### PostgreSQL
- `postgres_create` - Create PostgreSQL database
- `postgres_one` - Get database info
- `postgres_deploy` - Deploy database
- `postgres_start` - Start database
- `postgres_stop` - Stop database
- `postgres_remove` - Remove database

#### MySQL
- `mysql_create` - Create MySQL database
- `mysql_one` - Get database info
- `mysql_deploy` - Deploy database
- `mysql_start` - Start database
- `mysql_stop` - Stop database
- `mysql_remove` - Remove database

#### MongoDB
- `mongo_create` - Create MongoDB database
- `mongo_one` - Get database info
- `mongo_deploy` - Deploy database
- `mongo_start` - Start database
- `mongo_stop` - Stop database
- `mongo_remove` - Remove database

#### Redis
- `redis_create` - Create Redis database
- `redis_one` - Get database info
- `redis_deploy` - Deploy database
- `redis_start` - Start database
- `redis_stop` - Stop database
- `redis_remove` - Remove database

### Docker Compose

- `compose_create` - Create compose service
- `compose_one` - Get compose service
- `compose_deploy` - Deploy compose
- `compose_start` - Start compose
- `compose_stop` - Stop compose
- `compose_delete` - Delete compose

### Domain Management

- `domain_create` - Create domain
- `domain_one` - Get domain
- `domain_delete` - Delete domain

### Server Management

- `server_create` - Add server
- `server_one` - Get server
- `server_all` - List servers
- `server_setup` - Setup server

### Docker Operations

- `docker_get_containers` - List containers
- `docker_restart_container` - Restart container
- `docker_get_config` - Get container config

### System Settings

- `settings_clean_all` - Clean all unused Docker resources
- `settings_reload_traefik` - Reload Traefik
- `settings_update_traefik_config` - Update Traefik config

## Example Usage

### Create a Project

```json
{
  "name": "project_create",
  "arguments": {
    "name": "My Project",
    "description": "Production applications"
  }
}
```

### Deploy an Application

```json
{
  "name": "application_create",
  "arguments": {
    "name": "My App",
    "environmentId": "env_123",
    "description": "Web application"
  }
}
```

```json
{
  "name": "application_save_github_provider",
  "arguments": {
    "applicationId": "app_123",
    "repository": "my-app",
    "owner": "myorg",
    "branch": "main",
    "buildPath": "/"
  }
}
```

```json
{
  "name": "application_deploy",
  "arguments": {
    "applicationId": "app_123",
    "title": "Production deployment",
    "description": "Deploying version 1.0.0"
  }
}
```

### Create a Database

```json
{
  "name": "postgres_create",
  "arguments": {
    "name": "Production DB",
    "appName": "postgres-prod",
    "databaseName": "myapp",
    "databaseUser": "myapp",
    "databasePassword": "secure-password",
    "environmentId": "env_123"
  }
}
```

## API Reference

For complete API documentation, visit your Dokploy instance:
- Swagger UI: `https://your-dokploy-instance.com/swagger`
- API Base: `https://your-dokploy-instance.com/api`

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

## License

MIT
