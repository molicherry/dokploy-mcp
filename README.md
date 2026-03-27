# Dokploy MCP Server

A comprehensive Model Context Protocol (MCP) server for Dokploy, supporting 200+ API endpoints across all Dokploy modules.

## Features

- **Complete API Coverage**: Supports all major Dokploy API endpoints
- **Modular Design**: Organized by functional modules (Projects, Applications, Databases, etc.)
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Easy Integration**: Works with any MCP-compatible client (Claude, Cursor, etc.)

## Supported Modules

| Module | Endpoints | Description |
|--------|-----------|-------------|
| Project | 5 | Create, read, update, delete projects |
| Application | 20+ | Deploy, manage, and configure applications |
| PostgreSQL | 10 | Manage PostgreSQL databases |
| MySQL | 10 | Manage MySQL databases |
| MongoDB | 10 | Manage MongoDB databases |
| Redis | 10 | Manage Redis databases |
| MariaDB | 10 | Manage MariaDB databases |
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

### Option 1: Use with npx (Recommended)

```bash
npx -y @yourname/dokploy-mcp
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

Set the following environment variables:

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
      "args": ["-y", "@yourname/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-instance.com",
        "DOKPLOY_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### Cursor

Add to Cursor's MCP settings:

**macOS:**
```bash
~/.cursor/mcp.json
```

**Configuration:**
```json
{
  "mcpServers": {
    "dokploy": {
      "command": "npx",
      "args": ["-y", "@yourname/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-instance.com",
        "DOKPLOY_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### Local Development

If you cloned the repository:

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

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `project_create` | Create a new project | `name` (string) | `description` (string) |
| `project_one` | Get project by ID | `projectId` (string) | - |
| `project_all` | List all projects | - | - |
| `project_update` | Update project | `projectId` (string), `name` (string) | `description` (string) |
| `project_remove` | Delete project | `projectId` (string) | - |

### Application Management

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `application_create` | Create application | `name` (string), `environmentId` (string) | `appName`, `description`, `serverId` |
| `application_one` | Get application | `applicationId` (string) | - |
| `application_delete` | Delete application | `applicationId` (string) | - |
| `application_deploy` | Deploy application | `applicationId` (string) | `title`, `description` |
| `application_redeploy` | Redeploy application | `applicationId` (string) | `title`, `description` |
| `application_start` | Start application | `applicationId` (string) | - |
| `application_stop` | Stop application | `applicationId` (string) | - |
| `application_reload` | Reload application | `applicationId` (string), `appName` (string) | - |
| `application_save_environment` | Set environment variables | `applicationId` (string) | `env` (string), `buildArgs` (string) |
| `application_save_build_type` | Configure build type | `applicationId` (string), `buildType` (enum) | `dockerfile`, `dockerContextPath`, `publishDirectory`, etc. |
| `application_save_github_provider` | Connect GitHub repository | `applicationId`, `repository`, `owner`, `branch`, `buildPath` | `githubId`, `enableSubmodules`, `watchPaths` |
| `application_save_gitlab_provider` | Connect GitLab repository | `applicationId`, `gitlabRepository`, `gitlabOwner`, `gitlabBranch`, `gitlabBuildPath` | `gitlabId`, `enableSubmodules` |
| `application_save_bitbucket_provider` | Connect Bitbucket repository | `applicationId`, `bitbucketRepository`, `bitbucketOwner`, `bitbucketBranch`, `bitbucketBuildPath` | `bitbucketId` |
| `application_save_gitea_provider` | Connect Gitea repository | `applicationId`, `giteaRepository`, `giteaOwner`, `giteaBranch`, `giteaBuildPath` | `giteaId` |
| `application_save_git_provider` | Connect custom Git repository | `applicationId`, `customGitUrl`, `customGitBranch`, `customGitBuildPath` | `customGitSSHKeyId` |
| `application_save_docker_provider` | Use Docker image | `applicationId` (string), `dockerImage` (string) | `registryUrl`, `username`, `password` |
| `application_update` | Update application | `applicationId` (string) | All application fields |

**Build Type Options:**
- `dockerfile` - Use custom Dockerfile
- `heroku_buildpacks` - Heroku buildpacks
- `paketo_buildpacks` - Paketo buildpacks
- `nixpacks` - Nixpacks (default)
- `static` - Static site
- `railpack` - Railpack

### Database Management

#### PostgreSQL

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `postgres_create` | Create PostgreSQL database | `name`, `appName`, `databaseName`, `databaseUser`, `databasePassword`, `environmentId` | `description`, `dockerImage`, `serverId` |
| `postgres_one` | Get database info | `postgresId` (string) | - |
| `postgres_update` | Update database | `postgresId` (string) | All database fields |
| `postgres_remove` | Remove database | `postgresId` (string) | - |
| `postgres_deploy` | Deploy database | `postgresId` (string) | - |
| `postgres_start` | Start database | `postgresId` (string) | - |
| `postgres_stop` | Stop database | `postgresId` (string) | - |
| `postgres_save_environment` | Save environment variables | `postgresId` (string) | `env` (string) |
| `postgres_save_external_port` | Set external port | `postgresId` (string), `externalPort` (number/null) | - |
| `postgres_reload` | Reload database | `postgresId` (string), `appName` (string) | - |
| `postgres_rebuild` | Rebuild database | `postgresId` (string) | - |
| `postgres_change_status` | Change status | `postgresId` (string), `applicationStatus` (enum) | - |

#### MySQL

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `mysql_create` | Create MySQL database | `name`, `appName`, `databaseName`, `databaseUser`, `databasePassword`, `databaseRootPassword`, `environmentId` | `description`, `dockerImage`, `serverId` |
| `mysql_one` | Get database info | `mysqlId` (string) | - |
| `mysql_update` | Update database | `mysqlId` (string) | All database fields |
| `mysql_remove` | Remove database | `mysqlId` (string) | - |
| `mysql_deploy` | Deploy database | `mysqlId` (string) | - |
| `mysql_start` | Start database | `mysqlId` (string) | - |
| `mysql_stop` | Stop database | `mysqlId` (string) | - |
| `mysql_save_environment` | Save environment variables | `mysqlId` (string) | `env` (string) |
| `mysql_save_external_port` | Set external port | `mysqlId` (string), `externalPort` (number/null) | - |
| `mysql_reload` | Reload database | `mysqlId` (string), `appName` (string) | - |
| `mysql_rebuild` | Rebuild database | `mysqlId` (string) | - |
| `mysql_change_status` | Change status | `mysqlId` (string), `applicationStatus` (enum) | - |

#### MongoDB

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `mongo_create` | Create MongoDB database | `name`, `appName`, `databaseName`, `databaseUser`, `databasePassword`, `environmentId` | `description`, `dockerImage`, `serverId` |
| `mongo_one` | Get database info | `mongoId` (string) | - |
| `mongo_update` | Update database | `mongoId` (string) | All database fields |
| `mongo_remove` | Remove database | `mongoId` (string) | - |
| `mongo_deploy` | Deploy database | `mongoId` (string) | - |
| `mongo_start` | Start database | `mongoId` (string) | - |
| `mongo_stop` | Stop database | `mongoId` (string) | - |
| `mongo_save_environment` | Save environment variables | `mongoId` (string) | `env` (string) |
| `mongo_save_external_port` | Set external port | `mongoId` (string), `externalPort` (number/null) | - |
| `mongo_reload` | Reload database | `mongoId` (string), `appName` (string) | - |
| `mongo_rebuild` | Rebuild database | `mongoId` (string) | - |
| `mongo_change_status` | Change status | `mongoId` (string), `applicationStatus` (enum) | - |

#### Redis

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `redis_create` | Create Redis database | `name`, `appName`, `databasePassword`, `environmentId` | `description`, `dockerImage`, `serverId` |
| `redis_one` | Get database info | `redisId` (string) | - |
| `redis_update` | Update database | `redisId` (string) | All database fields |
| `redis_remove` | Remove database | `redisId` (string) | - |
| `redis_deploy` | Deploy database | `redisId` (string) | - |
| `redis_start` | Start database | `redisId` (string) | - |
| `redis_stop` | Stop database | `redisId` (string) | - |
| `redis_save_environment` | Save environment variables | `redisId` (string) | `env` (string) |
| `redis_save_external_port` | Set external port | `redisId` (string), `externalPort` (number/null) | - |
| `redis_reload` | Reload database | `redisId` (string), `appName` (string) | - |
| `redis_rebuild` | Rebuild database | `redisId` (string) | - |
| `redis_change_status` | Change status | `redisId` (string), `applicationStatus` (enum) | - |

#### MariaDB

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `mariadb_create` | Create MariaDB database | `name`, `databaseName`, `databaseUser`, `databasePassword`, `environmentId` | `appName`, `description`, `dockerImage`, `serverId` |
| `mariadb_one` | Get database info | `mariadbId` (string) | - |
| `mariadb_update` | Update database | `mariadbId` (string) | All database fields |
| `mariadb_remove` | Remove database | `mariadbId` (string) | - |
| `mariadb_deploy` | Deploy database | `mariadbId` (string) | - |
| `mariadb_start` | Start database | `mariadbId` (string) | - |
| `mariadb_stop` | Stop database | `mariadbId` (string) | - |
| `mariadb_save_environment` | Save environment variables | `mariadbId` (string) | `env` (string) |
| `mariadb_save_external_port` | Set external port | `mariadbId` (string), `externalPort` (number/null) | - |
| `mariadb_reload` | Reload database | `mariadbId` (string), `appName` (string) | - |
| `mariadb_rebuild` | Rebuild database | `mariadbId` (string) | - |
| `mariadb_change_status` | Change status | `mariadbId` (string), `applicationStatus` (enum) | - |

### Docker Compose

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `compose_create` | Create compose service | `name`, `environmentId` | `appName`, `description`, `composeType`, `composeFile`, `serverId` |
| `compose_one` | Get compose service | `composeId` (string) | - |
| `compose_update` | Update compose service | `composeId` (string) | All compose fields |
| `compose_delete` | Delete compose service | `composeId` (string) | - |
| `compose_deploy` | Deploy compose | `composeId` (string) | - |
| `compose_start` | Start compose | `composeId` (string) | - |
| `compose_stop` | Stop compose | `composeId` (string) | - |
| `compose_save_environment` | Save environment variables | `composeId` (string) | `env` (string) |
| `compose_save_compose_file` | Update compose file | `composeId` (string), `composeFile` (string) | - |

**Compose Type Options:**
- `docker-compose` - Docker Compose
- `stack` - Docker Stack

### Domain Management

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `domain_create` | Create domain | `host`, `applicationId` | `path`, `port`, `https`, `certificateType` |
| `domain_one` | Get domain | `domainId` (string) | - |
| `domain_delete` | Delete domain | `domainId` (string) | - |
| `domain_update` | Update domain | `domainId` (string) | `host`, `path`, `port`, `https` |
| `domain_generate_certificate` | Generate SSL certificate | `domainId` (string) | - |

### Server Management

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `server_create` | Add server | `name`, `ipAddress`, `port`, `username` | `description`, `sshKeyId` |
| `server_one` | Get server | `serverId` (string) | - |
| `server_all` | List all servers | - | - |
| `server_update` | Update server | `serverId` (string) | All server fields |
| `server_remove` | Remove server | `serverId` (string) | - |
| `server_setup` | Setup server | `serverId` (string) | - |
| `server_check_status` | Check server status | `serverId` (string) | - |

### Docker Operations

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `docker_get_containers` | List containers | - | `serverId` |
| `docker_get_container_logs` | Get container logs | `containerId` (string) | `tail`, `since`, `until` |
| `docker_restart_container` | Restart container | `containerId` (string) | - |
| `docker_stop_container` | Stop container | `containerId` (string) | - |
| `docker_start_container` | Start container | `containerId` (string) | - |
| `docker_remove_container` | Remove container | `containerId` (string) | - |
| `docker_get_config` | Get container config | `containerId` (string) | - |

### System Settings

| Tool | Description | Required Parameters | Optional Parameters |
|------|-------------|---------------------|---------------------|
| `settings_clean_all` | Clean unused Docker resources | - | - |
| `settings_reload_traefik` | Reload Traefik | - | - |
| `settings_update_traefik_config` | Update Traefik config | `traefikConfig` (string) | - |
| `settings_read_traefik_config` | Read Traefik config | - | - |

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

### Deploy an Application from GitHub

**Step 1: Create the application**
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

**Step 2: Connect GitHub repository**
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

**Step 3: Deploy**
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

### Create a PostgreSQL Database

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

### Create a Docker Compose Service

```json
{
  "name": "compose_create",
  "arguments": {
    "name": "My Stack",
    "environmentId": "env_123",
    "composeType": "docker-compose",
    "composeFile": "version: '3.8'\nservices:\n  web:\n    image: nginx:latest\n    ports:\n      - '80:80'"
  }
}
```

## Security Best Practices

1. **Use Limited API Keys**: Create API keys with only necessary permissions
2. **Environment Variables**: Never commit API keys to version control
3. **Read-Only for Testing**: Use read-only keys when exploring/testing
4. **Rotate Keys Regularly**: Periodically regenerate API keys
5. **Monitor Access**: Review Dokploy audit logs regularly

## API Reference

For complete API documentation, visit your Dokploy instance:
- **Swagger UI**: `https://your-dokploy-instance.com/swagger`
- **API Base**: `https://your-dokploy-instance.com/api`

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

## Troubleshooting

### MCP Server not connecting

1. Verify environment variables are set correctly
2. Check that the API key has necessary permissions
3. Ensure Dokploy URL is accessible from your machine
4. Check MCP client logs for error messages

### API Errors

- `401 Unauthorized`: Check your API key
- `404 Not Found`: Resource may not exist
- `500 Internal Error`: Check Dokploy server logs

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/dokploy-mcp/issues)
- **Dokploy Docs**: [https://docs.dokploy.com](https://docs.dokploy.com)
