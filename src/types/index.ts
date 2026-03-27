export interface DokployConfig {
  baseUrl: string;
  apiKey: string;
}

export interface ApiResponse<T = unknown> {
  result?: {
    data?: T;
    error?: {
      message: string;
      code: string;
    };
  };
}

export interface Project {
  projectId: string;
  name: string;
  description: string | null;
  createdAt: string;
  adminId: string;
  applications: Application[];
  mariadb: any[];
  mongo: any[];
  mysql: any[];
  postgres: any[];
  redis: any[];
  compose: any[];
}

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export interface UpdateProjectInput {
  projectId: string;
  name: string;
  description?: string;
}

export interface Application {
  applicationId: string;
  name: string;
  appName: string;
  description: string | null;
  env: string | null;
  buildArgs: string | null;
  memoryReservation: string | null;
  memoryLimit: string | null;
  cpuReservation: string | null;
  cpuLimit: string | null;
  title: string | null;
  enabled: boolean | null;
  subtitle: string | null;
  command: string | null;
  refreshToken: string | null;
  sourceType: string | null;
  repository: string | null;
  owner: string | null;
  branch: string | null;
  buildPath: string | null;
  autoDeploy: boolean | null;
  gitlabProjectId: number | null;
  gitlabRepository: string | null;
  gitlabOwner: string | null;
  gitlabBranch: string | null;
  gitlabPathNamespace: string | null;
  bitbucketRepository: string | null;
  bitbucketOwner: string | null;
  bitbucketBranch: string | null;
  customGitUrl: string | null;
  customGitBranch: string | null;
  customGitSSHKeyId: string | null;
  dockerImage: string | null;
  dockerfile: string | null;
  registryUrl: string | null;
  registryId: string | null;
  applicationStatus: string;
  buildType: string | null;
  createdAt: string;
  projectId: string;
}

export interface CreateApplicationInput {
  name: string;
  environmentId: string;
  appName?: string;
  description?: string;
  serverId?: string;
}

export interface DeployApplicationInput {
  applicationId: string;
  title?: string;
  description?: string;
}

export interface SaveEnvironmentInput {
  applicationId: string;
  env?: string;
  buildArgs?: string;
}

export interface SaveBuildTypeInput {
  applicationId: string;
  buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
  dockerfile?: string;
  dockerContextPath?: string;
  dockerBuildStage?: string;
  publishDirectory?: string;
  isStaticSpa?: boolean;
  herokuVersion?: string;
  railpackVersion?: string;
}

export interface SaveGithubProviderInput {
  applicationId: string;
  repository: string;
  owner: string;
  branch: string;
  buildPath: string;
  githubId?: string;
  enableSubmodules?: boolean;
  watchPaths?: string[];
  triggerType?: "push" | "tag";
}

export interface SaveGitlabProviderInput {
  applicationId: string;
  gitlabRepository: string;
  gitlabOwner: string;
  gitlabBranch: string;
  gitlabBuildPath: string;
  gitlabId?: string;
  gitlabProjectId?: number;
  gitlabPathNamespace?: string;
  enableSubmodules?: boolean;
  watchPaths?: string[];
}

export interface SaveBitbucketProviderInput {
  applicationId: string;
  bitbucketRepository: string;
  bitbucketOwner: string;
  bitbucketBranch: string;
  bitbucketBuildPath: string;
  bitbucketId?: string;
  enableSubmodules?: boolean;
  watchPaths?: string;
}

export interface SaveGiteaProviderInput {
  applicationId: string;
  giteaRepository: string;
  giteaOwner: string;
  giteaBranch: string;
  giteaBuildPath: string;
  giteaId?: string;
  enableSubmodules?: boolean;
  watchPaths?: string[];
}

export interface SaveGitProviderInput {
  applicationId: string;
  customGitUrl: string;
  customGitBranch: string;
  customGitBuildPath: string;
  customGitSSHKeyId?: string;
  enableSubmodules?: boolean;
  watchPaths?: string[];
}

export interface SaveDockerProviderInput {
  applicationId: string;
  dockerImage: string;
  registryUrl?: string;
  username?: string;
  password?: string;
}

export interface PostgresDatabase {
  postgresId: string;
  name: string;
  appName: string;
  description: string | null;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  dockerImage: string;
  command: string | null;
  env: string | null;
  memoryReservation: string | null;
  memoryLimit: string | null;
  cpuReservation: string | null;
  cpuLimit: string | null;
  externalPort: number | null;
  applicationStatus: string;
  createdAt: string;
  projectId: string;
}

export interface MySqlDatabase {
  mysqlId: string;
  name: string;
  appName: string;
  description: string | null;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  databaseRootPassword: string;
  dockerImage: string;
  command: string | null;
  env: string | null;
  memoryReservation: string | null;
  memoryLimit: string | null;
  cpuReservation: string | null;
  cpuLimit: string | null;
  externalPort: number | null;
  applicationStatus: string;
  createdAt: string;
  projectId: string;
}

export interface MongoDatabase {
  mongoId: string;
  name: string;
  appName: string;
  description: string | null;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  dockerImage: string;
  command: string | null;
  env: string | null;
  memoryReservation: string | null;
  memoryLimit: string | null;
  cpuReservation: string | null;
  cpuLimit: string | null;
  externalPort: number | null;
  applicationStatus: string;
  createdAt: string;
  projectId: string;
}

export interface RedisDatabase {
  redisId: string;
  name: string;
  appName: string;
  description: string | null;
  databasePassword: string;
  dockerImage: string;
  command: string | null;
  env: string | null;
  memoryReservation: string | null;
  memoryLimit: string | null;
  cpuReservation: string | null;
  cpuLimit: string | null;
  externalPort: number | null;
  applicationStatus: string;
  createdAt: string;
  projectId: string;
}

export interface CreatePostgresInput {
  name: string;
  appName: string;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  environmentId: string;
  description?: string;
  dockerImage?: string;
  serverId?: string;
}

export interface CreateMySqlInput {
  name: string;
  appName: string;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  databaseRootPassword: string;
  environmentId: string;
  description?: string;
  dockerImage?: string;
  serverId?: string;
}

export interface CreateMongoInput {
  name: string;
  appName: string;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  environmentId: string;
  description?: string;
  dockerImage?: string;
  serverId?: string;
}

export interface CreateRedisInput {
  name: string;
  appName: string;
  databasePassword: string;
  environmentId: string;
  description?: string;
  dockerImage?: string;
  serverId?: string;
}

export interface Compose {
  composeId: string;
  name: string;
  appName: string;
  description: string | null;
  env: string | null;
  composeFile: string | null;
  composeType: "docker-compose" | "stack";
  sourceType: string | null;
  repository: string | null;
  owner: string | null;
  branch: string | null;
  autoDeploy: boolean | null;
  gitlabProjectId: number | null;
  gitlabRepository: string | null;
  gitlabOwner: string | null;
  gitlabBranch: string | null;
  gitlabPathNamespace: string | null;
  bitbucketRepository: string | null;
  bitbucketOwner: string | null;
  bitbucketBranch: string | null;
  customGitUrl: string | null;
  customGitBranch: string | null;
  customGitSSHKeyId: string | null;
  command: string | null;
  composeStatus: string;
  createdAt: string;
  projectId: string;
  environmentId: string;
}

export interface CreateComposeInput {
  name: string;
  environmentId: string;
  appName?: string;
  description?: string;
  composeType?: "docker-compose" | "stack";
  composeFile?: string;
  serverId?: string;
}

export interface DeployComposeInput {
  composeId: string;
  title?: string;
  description?: string;
}

export interface Domain {
  domainId: string;
  host: string;
  https: boolean;
  port: number | null;
  path: string | null;
  certificateType: "letsencrypt" | "none" | "custom";
  customCertResolver: string | null;
  applicationId: string | null;
  composeId: string | null;
  previewDeploymentId: string | null;
  serviceName: string | null;
  stripPath: boolean;
  internalPath: string | null;
  createdAt: string;
}

export interface CreateDomainInput {
  host: string;
  https: boolean;
  certificateType: "letsencrypt" | "none" | "custom";
  stripPath: boolean;
  applicationId?: string;
  composeId?: string;
  previewDeploymentId?: string;
  serviceName?: string;
  port?: number;
  path?: string;
  internalPath?: string;
  customCertResolver?: string;
}

export interface Deployment {
  deploymentId: string;
  status: string;
  title: string | null;
  description: string | null;
  logPath: string | null;
  errorMessage: string | null;
  applicationId: string | null;
  composeId: string | null;
  serverId: string | null;
  createdAt: string;
}

export interface Server {
  serverId: string;
  name: string;
  description: string | null;
  ipAddress: string;
  port: number;
  username: string;
  sshKeyId: string | null;
  isSwarmManager: boolean;
  createdAt: string;
}

export interface CreateServerInput {
  name: string;
  ipAddress: string;
  port: number;
  username: string;
  sshKeyId?: string;
  description?: string;
}

export interface UpdateServerInput {
  serverId: string;
  name: string;
  ipAddress: string;
  port: number;
  username: string;
  sshKeyId?: string;
  description?: string;
}

export interface Notification {
  notificationId: string;
  name: string;
  appBuildError: boolean;
  appDeploy: boolean;
  databaseBackup: boolean;
  dockerCleanup: boolean;
  dokployRestart: boolean;
  serverThreshold: boolean;
  volumeBackup: boolean;
  createdAt: string;
}

export interface CreateSlackNotificationInput {
  name: string;
  webhookUrl: string;
  channel: string;
  appBuildError?: boolean;
  appDeploy?: boolean;
  databaseBackup?: boolean;
  dockerCleanup?: boolean;
  dokployRestart?: boolean;
  serverThreshold?: boolean;
  volumeBackup?: boolean;
}

export interface CreateTelegramNotificationInput {
  name: string;
  botToken: string;
  chatId: string;
  messageThreadId?: string;
  appBuildError?: boolean;
  appDeploy?: boolean;
  databaseBackup?: boolean;
  dockerCleanup?: boolean;
  dokployRestart?: boolean;
  serverThreshold?: boolean;
  volumeBackup?: boolean;
}

export interface CreateDiscordNotificationInput {
  name: string;
  webhookUrl: string;
  decoration?: boolean;
  appBuildError?: boolean;
  appDeploy?: boolean;
  databaseBackup?: boolean;
  dockerCleanup?: boolean;
  dokployRestart?: boolean;
  serverThreshold?: boolean;
  volumeBackup?: boolean;
}

export interface CreateEmailNotificationInput {
  name: string;
  smtpServer: string;
  smtpPort: number;
  username: string;
  password: string;
  fromAddress: string;
  toAddresses: string[];
  appBuildError?: boolean;
  appDeploy?: boolean;
  databaseBackup?: boolean;
  dockerCleanup?: boolean;
  dokployRestart?: boolean;
  serverThreshold?: boolean;
  volumeBackup?: boolean;
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  image: string | null;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateUserInput {
  id: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  name?: string;
  image?: string;
  twoFactorEnabled?: boolean;
}

export interface AssignPermissionsInput {
  id: string;
  accessedProjects?: string[];
  accessedEnvironments?: string[];
  accessedServices?: string[];
  canCreateProjects?: boolean;
  canCreateServices?: boolean;
  canDeleteProjects?: boolean;
  canDeleteServices?: boolean;
  canAccessToDocker?: boolean;
  canAccessToTraefikFiles?: boolean;
  canAccessToAPI?: boolean;
  canAccessToSSHKeys?: boolean;
  canAccessToGitProviders?: boolean;
  canDeleteEnvironments?: boolean;
  canCreateEnvironments?: boolean;
}

export interface SSHKey {
  sshKeyId: string;
  name: string;
  description: string | null;
  publicKey: string;
  privateKey: string;
  createdAt: string;
  lastUsedAt: string | null;
}

export interface CreateSSHKeyInput {
  name: string;
  publicKey: string;
  privateKey: string;
  description?: string;
  organizationId: string;
}

export interface Backup {
  backupId: string;
  name: string;
  schedule: string;
  enabled: boolean;
  prefix: string;
  destinationId: string;
  database: string;
  databaseType: "postgres" | "mariadb" | "mysql" | "mongo" | "web-server";
  keepLatestCount: number | null;
  postgresId: string | null;
  mysqlId: string | null;
  mariadbId: string | null;
  mongoId: string | null;
  composeId: string | null;
  serviceName: string | null;
  createdAt: string;
}

export interface CreateBackupInput {
  schedule: string;
  prefix: string;
  destinationId: string;
  database: string;
  databaseType: "postgres" | "mariadb" | "mysql" | "mongo" | "web-server";
  enabled?: boolean;
  keepLatestCount?: number;
  postgresId?: string;
  mysqlId?: string;
  mariadbId?: string;
  mongoId?: string;
  composeId?: string;
  serviceName?: string;
}

export interface Schedule {
  scheduleId: string;
  name: string;
  cronExpression: string;
  command: string;
  script: string | null;
  shellType: "bash" | "sh";
  scheduleType: "application" | "compose" | "server" | "dokploy-server";
  enabled: boolean;
  timezone: string | null;
  appName: string | null;
  serviceName: string | null;
  applicationId: string | null;
  composeId: string | null;
  serverId: string | null;
  createdAt: string;
}

export interface CreateScheduleInput {
  name: string;
  cronExpression: string;
  command: string;
  scheduleType: "application" | "compose" | "server" | "dokploy-server";
  shellType?: "bash" | "sh";
  script?: string;
  enabled?: boolean;
  timezone?: string;
  appName?: string;
  serviceName?: string;
  applicationId?: string;
  composeId?: string;
  serverId?: string;
}

export interface DockerContainer {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: Array<{
    IP?: string;
    PrivatePort: number;
    PublicPort?: number;
    Type: string;
  }>;
  Labels: Record<string, string>;
  State: string;
  Status: string;
}

export interface Registry {
  registryId: string;
  registryName: string;
  registryUrl: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface CreateRegistryInput {
  registryName: string;
  registryUrl: string;
  username: string;
  password: string;
}

export interface Port {
  portId: string;
  publishedPort: number;
  targetPort: number;
  publishMode: "ingress" | "host";
  protocol: "tcp" | "udp";
  applicationId: string;
}

export interface CreatePortInput {
  publishedPort: number;
  targetPort: number;
  publishMode?: "ingress" | "host";
  protocol?: "tcp" | "udp";
  applicationId: string;
}

export interface Mount {
  mountId: string;
  type: string;
  source: string;
  destination: string;
  readOnly: boolean;
  applicationId: string;
}

export interface CreateMountInput {
  type: string;
  source: string;
  destination: string;
  readOnly?: boolean;
  applicationId: string;
}

export interface Redirect {
  redirectId: string;
  regex: string;
  replacement: string;
  permanent: boolean;
  applicationId: string;
}

export interface CreateRedirectInput {
  regex: string;
  replacement: string;
  permanent: boolean;
  applicationId: string;
}

export interface Security {
  securityId: string;
  username: string;
  password: string;
  applicationId: string;
}

export interface CreateSecurityInput {
  username: string;
  password: string;
  applicationId: string;
}

export interface Certificate {
  certificateId: string;
  certificateData: string;
  privateKey: string;
  certificatePath: string;
  autoRenew: boolean;
  domain: string;
  expiresAt: string;
  createdAt: string;
}

export interface Destination {
  destinationId: string;
  name: string;
  provider: string;
  accessKey: string;
  bucket: string;
  region: string;
  endpoint: string;
  secretAccessKey: string;
  createdAt: string;
}

export interface CreateDestinationInput {
  name: string;
  provider: string;
  accessKey: string;
  bucket: string;
  region: string;
  endpoint: string;
  secretAccessKey: string;
  serverId?: string;
}

export interface SwarmNode {
  ID: string;
  Description: {
    Hostname: string;
    Platform: {
      Architecture: string;
      OS: string;
    };
    Resources: {
      NanoCPUs: number;
      MemoryBytes: number;
    };
  };
  Status: {
    State: string;
    Addr: string;
  };
  ManagerStatus?: {
    Leader: boolean;
    Reachability: string;
    Addr: string;
  };
}
