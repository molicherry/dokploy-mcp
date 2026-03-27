import { z } from "zod";

export const ProjectCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the project"),
  description: z.string().optional().describe("Optional description of the project"),
});

export const ProjectOneSchema = z.object({
  projectId: z.string().min(1).describe("ID of the project to retrieve"),
});

export const ProjectUpdateSchema = z.object({
  projectId: z.string().min(1).describe("ID of the project to update"),
  name: z.string().min(1).describe("New name for the project"),
  description: z.string().optional().describe("New description for the project"),
});

export const ProjectRemoveSchema = z.object({
  projectId: z.string().min(1).describe("ID of the project to remove"),
});

export const ApplicationCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the application"),
  environmentId: z.string().min(1).describe("ID of the environment where the application will be created"),
  appName: z.string().regex(/^[a-zA-Z0-9._-]+$/).min(1).max(63).optional().describe("Optional app name (alphanumeric, dots, dashes, underscores)"),
  description: z.string().optional().describe("Optional description of the application"),
  serverId: z.string().optional().describe("Optional server ID for deployment"),
});

export const ApplicationOneSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to retrieve"),
});

export const ApplicationDeleteSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to delete"),
});

export const ApplicationDeploySchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to deploy"),
  title: z.string().optional().describe("Optional deployment title"),
  description: z.string().optional().describe("Optional deployment description"),
});

export const ApplicationRedeploySchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to redeploy"),
  title: z.string().optional().describe("Optional deployment title"),
  description: z.string().optional().describe("Optional deployment description"),
});

export const ApplicationStartSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to start"),
});

export const ApplicationStopSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to stop"),
});

export const ApplicationReloadSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to reload"),
  appName: z.string().regex(/^[a-zA-Z0-9._-]+$/).min(1).max(63).describe("App name for the application"),
});

export const ApplicationSaveEnvironmentSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  env: z.string().optional().describe("Environment variables as a string (e.g., KEY=value\\nKEY2=value2)"),
  buildArgs: z.string().optional().describe("Build arguments as a string"),
});

export const ApplicationSaveBuildTypeSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  buildType: z.enum(["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"]).describe("Build type for the application"),
  dockerfile: z.string().optional().describe("Dockerfile content or path (required for dockerfile build type)"),
  dockerContextPath: z.string().optional().describe("Docker context path"),
  dockerBuildStage: z.string().optional().describe("Docker build stage"),
  publishDirectory: z.string().optional().describe("Directory to publish for static builds"),
  isStaticSpa: z.boolean().optional().describe("Whether the application is a static SPA"),
  herokuVersion: z.string().optional().describe("Heroku version for heroku_buildpacks"),
  railpackVersion: z.string().optional().describe("Railpack version for railpack"),
});

export const ApplicationSaveGithubProviderSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  repository: z.string().min(1).describe("GitHub repository name"),
  owner: z.string().min(1).describe("GitHub repository owner"),
  branch: z.string().min(1).describe("Git branch to use"),
  buildPath: z.string().min(1).describe("Path within the repository to build from"),
  githubId: z.string().optional().describe("GitHub integration ID"),
  enableSubmodules: z.boolean().optional().describe("Whether to enable git submodules"),
  watchPaths: z.array(z.string()).optional().describe("Array of paths to watch for changes"),
  triggerType: z.enum(["push", "tag"]).optional().describe("Trigger type for deployments"),
});

export const ApplicationSaveGitlabProviderSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  gitlabRepository: z.string().min(1).describe("GitLab repository name"),
  gitlabOwner: z.string().min(1).describe("GitLab repository owner"),
  gitlabBranch: z.string().min(1).describe("Git branch to use"),
  gitlabBuildPath: z.string().min(1).describe("Path within the repository to build from"),
  gitlabId: z.string().optional().describe("GitLab integration ID"),
  gitlabProjectId: z.number().optional().describe("GitLab project ID"),
  gitlabPathNamespace: z.string().optional().describe("GitLab path namespace"),
  enableSubmodules: z.boolean().optional().describe("Whether to enable git submodules"),
  watchPaths: z.array(z.string()).optional().describe("Array of paths to watch for changes"),
});

export const ApplicationSaveBitbucketProviderSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  bitbucketRepository: z.string().min(1).describe("Bitbucket repository name"),
  bitbucketOwner: z.string().min(1).describe("Bitbucket repository owner"),
  bitbucketBranch: z.string().min(1).describe("Git branch to use"),
  bitbucketBuildPath: z.string().min(1).describe("Path within the repository to build from"),
  bitbucketId: z.string().optional().describe("Bitbucket integration ID"),
  enableSubmodules: z.boolean().optional().describe("Whether to enable git submodules"),
  watchPaths: z.string().optional().describe("Paths to watch for changes"),
});

export const ApplicationSaveGiteaProviderSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  giteaRepository: z.string().min(1).describe("Gitea repository name"),
  giteaOwner: z.string().min(1).describe("Gitea repository owner"),
  giteaBranch: z.string().min(1).describe("Git branch to use"),
  giteaBuildPath: z.string().min(1).describe("Path within the repository to build from"),
  giteaId: z.string().optional().describe("Gitea integration ID"),
  enableSubmodules: z.boolean().optional().describe("Whether to enable git submodules"),
  watchPaths: z.array(z.string()).optional().describe("Array of paths to watch for changes"),
});

export const ApplicationSaveGitProviderSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  customGitUrl: z.string().min(1).describe("Custom Git repository URL"),
  customGitBranch: z.string().min(1).describe("Git branch to use"),
  customGitBuildPath: z.string().min(1).describe("Path within the repository to build from"),
  customGitSSHKeyId: z.string().optional().describe("SSH key ID for Git authentication"),
  enableSubmodules: z.boolean().optional().describe("Whether to enable git submodules"),
  watchPaths: z.array(z.string()).optional().describe("Array of paths to watch for changes"),
});

export const ApplicationSaveDockerProviderSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  dockerImage: z.string().min(1).describe("Docker image to use"),
  registryUrl: z.string().optional().describe("Docker registry URL"),
  username: z.string().optional().describe("Username for registry authentication"),
  password: z.string().optional().describe("Password for registry authentication"),
});

export const ApplicationUpdateTraefikConfigSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
  traefikConfig: z.string().min(1).describe("Traefik configuration content"),
});

export const ApplicationReadTraefikConfigSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const ApplicationReadMonitoringSchema = z.object({
  appName: z.string().min(1).describe("App name of the application"),
});

export const ApplicationMoveSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application to move"),
  targetEnvironmentId: z.string().min(1).describe("ID of the destination environment"),
});

export const ApplicationRefreshTokenSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const ApplicationCancelDeploymentSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const ApplicationCleanQueuesSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const ApplicationMarkRunningSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const ApplicationDisconnectGitProviderSchema = z.object({
  applicationId: z.string().min(1).describe("ID of the application"),
});
