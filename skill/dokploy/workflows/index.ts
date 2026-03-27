import type { WorkflowDefinition, WorkflowInputParam } from '../types.js';

export const deployApplicationWorkflow: WorkflowDefinition = {
  name: 'deploy_application',
  description: '完整的应用部署工作流：创建项目 → 创建应用 → 配置源码 → 设置环境 → 部署 → 配置域名',
  
  input: {
    projectName: {
      type: 'string',
      description: '项目名称（不存在则自动创建）',
      required: true,
    },
    appName: {
      type: 'string',
      description: '应用名称',
      required: true,
    },
    environmentId: {
      type: 'string',
      description: '环境ID（可选，默认使用项目默认环境）',
      required: false,
    },
    sourceType: {
      type: 'string',
      description: '源码类型',
      required: true,
      enum: ['github', 'gitlab', 'bitbucket', 'gitea', 'git', 'docker'],
    },
    repository: {
      type: 'string',
      description: '仓库地址或名称',
      required: true,
    },
    owner: {
      type: 'string',
      description: '仓库所有者（GitHub/GitLab等）',
      required: false,
    },
    branch: {
      type: 'string',
      description: '分支名',
      required: false,
      default: 'main',
    },
    buildPath: {
      type: 'string',
      description: '构建路径',
      required: false,
      default: '/',
    },
    buildType: {
      type: 'string',
      description: '构建类型',
      required: false,
      enum: ['dockerfile', 'nixpacks', 'static', 'railpack', 'heroku_buildpacks'],
      default: 'nixpacks',
    },
    envVars: {
      type: 'string',
      description: '环境变量（格式：KEY=value\nKEY2=value2）',
      required: false,
    },
    domain: {
      type: 'string',
      description: '自定义域名（可选）',
      required: false,
    },
  },
  
  output: [
    'projectId',
    'applicationId',
    'appName',
    'deploymentId',
    'url',
  ],
  
  steps: [
    {
      name: 'find_or_create_project',
      tool: 'project_all',
      output: 'projects',
    },
    {
      name: 'check_project_exists',
      tool: 'conditional_project_create',
      condition: '!projects.find(p => p.name === projectName)',
      input: {
        name: '${projectName}',
      },
      output: 'createdProject',
    },
    {
      name: 'set_project_id',
      tool: 'state_set',
      input: {
        projectId: '${createdProject?.projectId || projects.find(p => p.name === projectName).projectId}',
      },
    },
    {
      name: 'create_application',
      tool: 'application_create',
      input: {
        name: '${appName}',
        environmentId: '${environmentId}',
      },
      output: 'application',
    },
    {
      name: 'save_app_state',
      tool: 'state_set',
      input: {
        applicationId: '${application.applicationId}',
        appName: '${application.appName}',
      },
    },
    {
      name: 'configure_github_provider',
      tool: 'application_save_github_provider',
      condition: 'sourceType === "github"',
      input: {
        applicationId: '${applicationId}',
        repository: '${repository}',
        owner: '${owner}',
        branch: '${branch}',
        buildPath: '${buildPath}',
      },
    },
    {
      name: 'configure_gitlab_provider',
      tool: 'application_save_gitlab_provider',
      condition: 'sourceType === "gitlab"',
      input: {
        applicationId: '${applicationId}',
        gitlabRepository: '${repository}',
        gitlabOwner: '${owner}',
        gitlabBranch: '${branch}',
        gitlabBuildPath: '${buildPath}',
      },
    },
    {
      name: 'configure_docker_provider',
      tool: 'application_save_docker_provider',
      condition: 'sourceType === "docker"',
      input: {
        applicationId: '${applicationId}',
        dockerImage: '${repository}',
      },
    },
    {
      name: 'save_build_type',
      tool: 'application_save_build_type',
      input: {
        applicationId: '${applicationId}',
        buildType: '${buildType}',
      },
    },
    {
      name: 'save_environment',
      tool: 'application_save_environment',
      condition: 'envVars',
      input: {
        applicationId: '${applicationId}',
        env: '${envVars}',
      },
    },
    {
      name: 'deploy_application',
      tool: 'application_deploy',
      input: {
        applicationId: '${applicationId}',
        title: 'Initial deployment',
        description: 'Deployed via workflow',
      },
      output: 'deployment',
    },
    {
      name: 'save_deployment_id',
      tool: 'state_set',
      input: {
        deploymentId: '${deployment.deploymentId}',
      },
    },
    {
      name: 'create_domain',
      tool: 'domain_create',
      condition: 'domain',
      input: {
        host: '${domain}',
        applicationId: '${applicationId}',
        https: true,
      },
      output: 'createdDomain',
    },
    {
      name: 'set_final_url',
      tool: 'state_set',
      input: {
        url: '${domain ? "https://" + domain : "http://" + appName + ".your-dokploy.com"}',
      },
    },
  ],
  
  onError: {
    rollback: ['delete_application', 'delete_project_if_created'],
    notify: true,
  },
};

export const createDatabaseWorkflow: WorkflowDefinition = {
  name: 'create_database',
  description: '创建数据库并返回连接信息',
  
  input: {
    type: {
      type: 'string',
      description: '数据库类型',
      required: true,
      enum: ['postgres', 'mysql', 'mariadb', 'mongo', 'redis'],
    },
    name: {
      type: 'string',
      description: '服务名称',
      required: true,
    },
    appName: {
      type: 'string',
      description: '应用名称',
      required: true,
    },
    environmentId: {
      type: 'string',
      description: '环境ID',
      required: true,
    },
    databaseName: {
      type: 'string',
      description: '数据库名',
      required: false,
    },
    databaseUser: {
      type: 'string',
      description: '数据库用户',
      required: false,
    },
    databasePassword: {
      type: 'string',
      description: '数据库密码',
      required: true,
    },
    externalPort: {
      type: 'number',
      description: '外部端口（可选）',
      required: false,
    },
  },
  
  output: [
    'resourceId',
    'appName',
    'connectionString',
  ],
  
  steps: [
    {
      name: 'create_database',
      tool: 'dynamic_database_create',
      input: {
        name: '${name}',
        appName: '${appName}',
        databaseName: '${databaseName || name}',
        databaseUser: '${databaseUser || "admin"}',
        databasePassword: '${databasePassword}',
        environmentId: '${environmentId}',
      },
      output: 'database',
    },
    {
      name: 'save_database_id',
      tool: 'state_set',
      input: {
        resourceId: '${database.postgresId || database.mysqlId || database.mongoId || database.redisId}',
        appName: '${database.appName}',
      },
    },
    {
      name: 'set_external_port',
      tool: 'dynamic_save_external_port',
      condition: 'externalPort',
      input: {
        externalPort: '${externalPort}',
      },
    },
    {
      name: 'deploy_database',
      tool: 'dynamic_database_deploy',
      input: {},
    },
    {
      name: 'get_database_info',
      tool: 'dynamic_database_one',
      output: 'dbInfo',
    },
    {
      name: 'generate_connection_string',
      tool: 'state_set',
      input: {
        connectionString: '${generateConnectionString(dbInfo, type)}',
      },
    },
  ],
};

export const debugServiceWorkflow: WorkflowDefinition = {
  name: 'debug_service',
  description: '诊断服务问题：检查状态 → 查看日志 → 自动修复',
  
  input: {
    identifier: {
      type: 'string',
      description: '应用名、ID或域名',
      required: true,
    },
    action: {
      type: 'string',
      description: '修复动作',
      required: false,
      enum: ['auto', 'restart', 'redeploy', 'rollback'],
      default: 'auto',
    },
  },
  
  output: [
    'diagnosis',
    'actions',
    'status',
  ],
  
  steps: [
    {
      name: 'find_application',
      tool: 'application_all',
      output: 'applications',
    },
    {
      name: 'match_application',
      tool: 'state_set',
      input: {
        matchedApp: '${applications.find(a => a.appName === identifier || a.name === identifier)}',
      },
    },
    {
      name: 'get_app_details',
      tool: 'application_one',
      condition: 'matchedApp',
      input: {
        applicationId: '${matchedApp.applicationId}',
      },
      output: 'appDetails',
    },
    {
      name: 'get_deployments',
      tool: 'deployment_all',
      condition: 'matchedApp',
      input: {
        applicationId: '${matchedApp.applicationId}',
      },
      output: 'deployments',
    },
    {
      name: 'find_containers',
      tool: 'docker_get_containers_by_app_name_match',
      condition: 'matchedApp',
      input: {
        appName: '${matchedApp.appName}',
      },
      output: 'containers',
    },
    {
      name: 'analyze_status',
      tool: 'state_set',
      input: {
        diagnosis: '${analyzeServiceHealth(appDetails, deployments, containers)}',
      },
    },
    {
      name: 'auto_restart',
      tool: 'application_reload',
      condition: 'action === "auto" && diagnosis.recommendation === "restart"',
      input: {
        applicationId: '${matchedApp.applicationId}',
        appName: '${matchedApp.appName}',
      },
    },
    {
      name: 'auto_redeploy',
      tool: 'application_redeploy',
      condition: 'action === "auto" && diagnosis.recommendation === "redeploy"',
      input: {
        applicationId: '${matchedApp.applicationId}',
      },
    },
    {
      name: 'verify_fix',
      tool: 'application_one',
      condition: 'matchedApp',
      input: {
        applicationId: '${matchedApp.applicationId}',
      },
      output: 'finalStatus',
    },
  ],
};

function generateConnectionString(dbInfo: any, type: string): string {
  const host = dbInfo.externalHost || dbInfo.internalHost || 'localhost';
  const port = dbInfo.externalPort || dbInfo.internalPort;
  
  switch (type) {
    case 'postgres':
      return `postgresql://${dbInfo.databaseUser}:${dbInfo.databasePassword}@${host}:${port}/${dbInfo.databaseName}`;
    case 'mysql':
    case 'mariadb':
      return `mysql://${dbInfo.databaseUser}:${dbInfo.databasePassword}@${host}:${port}/${dbInfo.databaseName}`;
    case 'mongo':
      return `mongodb://${dbInfo.databaseUser}:${dbInfo.databasePassword}@${host}:${port}/${dbInfo.databaseName}`;
    case 'redis':
      return `redis://:${dbInfo.databasePassword}@${host}:${port}`;
    default:
      return '';
  }
}

function analyzeServiceHealth(appDetails: any, deployments: any[], containers: any[]): any {
  const latestDeployment = deployments?.[0];
  const hasRunningContainer = containers?.some(c => c.state === 'running');
  
  if (!hasRunningContainer && latestDeployment?.status === 'error') {
    return {
      status: 'failed',
      reason: 'Deployment failed, no running containers',
      recommendation: 'redeploy',
    };
  }
  
  if (!hasRunningContainer) {
    return {
      status: 'stopped',
      reason: 'No running containers',
      recommendation: 'restart',
    };
  }
  
  return {
    status: 'healthy',
    reason: 'Service is running',
    recommendation: 'none',
  };
}

export const workflows: Record<string, WorkflowDefinition> = {
  deploy_application: deployApplicationWorkflow,
  create_database: createDatabaseWorkflow,
  debug_service: debugServiceWorkflow,
};
