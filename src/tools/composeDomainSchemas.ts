import { z } from "zod";

export const ComposeCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the compose service"),
  environmentId: z.string().min(1).describe("ID of the environment where the compose will be created"),
  appName: z.string().regex(/^[a-zA-Z0-9._-]+$/).min(1).max(63).optional().describe("Optional app name"),
  description: z.string().optional().describe("Optional description"),
  composeType: z.enum(["docker-compose", "stack"]).optional().describe("Type of compose (docker-compose or stack)"),
  composeFile: z.string().optional().describe("Docker Compose file content"),
  serverId: z.string().optional().describe("Optional server ID for deployment"),
});

export const ComposeOneSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service to retrieve"),
});

export const ComposeDeleteSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service to delete"),
  deleteVolumes: z.boolean().describe("Whether to delete associated volumes"),
});

export const ComposeDeploySchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service to deploy"),
  title: z.string().optional().describe("Optional deployment title"),
  description: z.string().optional().describe("Optional deployment description"),
});

export const ComposeRedeploySchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service to redeploy"),
  title: z.string().optional().describe("Optional deployment title"),
  description: z.string().optional().describe("Optional deployment description"),
});

export const ComposeStartSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service to start"),
});

export const ComposeStopSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service to stop"),
});

export const ComposeCleanQueuesSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
});

export const ComposeKillBuildSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
});

export const ComposeLoadServicesSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
  type: z.enum(["fetch", "cache"]).optional().describe("Type of load (fetch or cache)"),
});

export const ComposeLoadMountsByServiceSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
  serviceName: z.string().min(1).describe("Name of the service"),
});

export const ComposeFetchSourceTypeSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
});

export const ComposeRandomizeSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
  suffix: z.string().optional().describe("Optional suffix for randomization"),
});

export const ComposeIsolatedDeploymentSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
  suffix: z.string().optional().describe("Optional suffix for isolated deployment"),
});

export const ComposeGetConvertedSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
});

export const ComposeGetDefaultCommandSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
});

export const ComposeUpdateSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service to update"),
  name: z.string().min(1).optional().describe("New name for the compose"),
  appName: z.string().regex(/^[a-zA-Z0-9._-]+$/).min(1).max(63).optional().describe("New app name"),
  description: z.string().optional().describe("New description"),
  env: z.string().optional().describe("Environment variables"),
  composeFile: z.string().optional().describe("Docker Compose file content"),
  refreshToken: z.string().optional().describe("Refresh token"),
  sourceType: z.enum(["git", "github", "gitlab", "bitbucket", "gitea", "raw"]).optional().describe("Source type"),
  composeType: z.enum(["docker-compose", "stack"]).optional().describe("Compose type"),
  repository: z.string().optional().describe("Repository URL"),
  owner: z.string().optional().describe("Repository owner"),
  branch: z.string().optional().describe("Git branch"),
  autoDeploy: z.boolean().optional().describe("Enable auto-deploy"),
  command: z.string().optional().describe("Custom command"),
  enableSubmodules: z.boolean().optional().describe("Enable git submodules"),
  composePath: z.string().optional().describe("Path to compose file"),
  suffix: z.string().optional().describe("Suffix for deployment"),
  randomize: z.boolean().optional().describe("Randomize deployment"),
  isolatedDeployment: z.boolean().optional().describe("Isolated deployment"),
  isolatedDeploymentsVolume: z.boolean().optional().describe("Isolated deployments volume"),
  triggerType: z.enum(["push", "tag"]).optional().describe("Trigger type"),
  composeStatus: z.enum(["idle", "running", "done", "error"]).optional().describe("Compose status"),
  environmentId: z.string().optional().describe("Environment ID"),
  watchPaths: z.array(z.string()).optional().describe("Paths to watch"),
  githubId: z.string().optional().describe("GitHub integration ID"),
  gitlabId: z.string().optional().describe("GitLab integration ID"),
  bitbucketId: z.string().optional().describe("Bitbucket integration ID"),
  giteaId: z.string().optional().describe("Gitea integration ID"),
});

export const DomainCreateSchema = z.object({
  host: z.string().min(1).describe("Domain host (e.g., example.com)"),
  https: z.boolean().describe("Whether to enable HTTPS"),
  certificateType: z.enum(["letsencrypt", "none", "custom"]).describe("SSL certificate type"),
  stripPath: z.boolean().describe("Whether to strip path prefix when forwarding"),
  applicationId: z.string().optional().describe("ID of the application to associate"),
  composeId: z.string().optional().describe("ID of the compose service to associate"),
  previewDeploymentId: z.string().optional().describe("ID of the preview deployment"),
  serviceName: z.string().optional().describe("Service name within compose"),
  port: z.number().optional().describe("Port number"),
  path: z.string().optional().describe("Path for routing"),
  internalPath: z.string().optional().describe("Internal path for routing"),
  customCertResolver: z.string().optional().describe("Custom certificate resolver"),
});

export const DomainOneSchema = z.object({
  domainId: z.string().min(1).describe("ID of the domain to retrieve"),
});

export const DomainUpdateSchema = z.object({
  domainId: z.string().min(1).describe("ID of the domain to update"),
  host: z.string().min(1).describe("Domain host"),
  https: z.boolean().describe("Whether to enable HTTPS"),
  certificateType: z.enum(["letsencrypt", "none", "custom"]).describe("SSL certificate type"),
  stripPath: z.boolean().describe("Whether to strip path prefix"),
  serviceName: z.string().optional().describe("Service name"),
  port: z.number().optional().describe("Port number"),
  path: z.string().optional().describe("Path"),
  internalPath: z.string().optional().describe("Internal path"),
  customCertResolver: z.string().optional().describe("Custom certificate resolver"),
});

export const DomainDeleteSchema = z.object({
  domainId: z.string().min(1).describe("ID of the domain to delete"),
});

export const DomainValidateSchema = z.object({
  domain: z.string().min(1).describe("Domain name to validate"),
  serverIp: z.string().optional().describe("Optional server IP to validate against"),
});

export const DomainGenerateSchema = z.object({
  appName: z.string().min(1).describe("Application name to generate domain for"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DomainCanGenerateTraefikMeSchema = z.object({
  serverId: z.string().min(1).describe("Server ID to check"),
});

export const DeploymentAllSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const DeploymentAllByComposeSchema = z.object({
  composeId: z.string().min(1).describe("ID of the compose service"),
});

export const DeploymentAllByServerSchema = z.object({
  serverId: z.string().min(1).describe("ID of the server"),
});

export const DeploymentAllByTypeSchema = z.object({
  id: z.string().min(1).describe("ID of the resource"),
  type: z.enum(["application", "compose", "server", "schedule", "previewDeployment", "backup", "volumeBackup"]).describe("Type of resource"),
});

export const DeploymentKillProcessSchema = z.object({
  deploymentId: z.string().min(1).describe("ID of the deployment to kill"),
});
