import { z } from "zod";

export const ScheduleCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the schedule"),
  cronExpression: z.string().min(1).describe("Cron expression (e.g., '0 0 * * *' for daily at midnight)"),
  command: z.string().min(1).describe("Command to execute"),
  scheduleType: z.enum(["application", "compose", "server", "dokploy-server"]).describe("Type of schedule"),
  shellType: z.enum(["bash", "sh"]).optional().describe("Shell type (bash or sh)"),
  script: z.string().optional().describe("Script content"),
  enabled: z.boolean().optional().describe("Enable the schedule"),
  timezone: z.string().optional().describe("Timezone for the schedule"),
  appName: z.string().optional().describe("Application name"),
  serviceName: z.string().optional().describe("Service name"),
  applicationId: z.string().optional().describe("Application ID"),
  composeId: z.string().optional().describe("Compose service ID"),
  serverId: z.string().optional().describe("Server ID"),
});

export const ScheduleUpdateSchema = z.object({
  scheduleId: z.string().min(1).describe("ID of the schedule to update"),
  name: z.string().min(1).describe("New name for the schedule"),
  cronExpression: z.string().min(1).describe("New cron expression"),
  command: z.string().min(1).describe("New command"),
  scheduleType: z.enum(["application", "compose", "server", "dokploy-server"]).describe("Type of schedule"),
  shellType: z.enum(["bash", "sh"]).optional().describe("Shell type"),
  script: z.string().optional().describe("Script content"),
  enabled: z.boolean().optional().describe("Enable the schedule"),
  timezone: z.string().optional().describe("Timezone"),
  appName: z.string().optional().describe("Application name"),
  serviceName: z.string().optional().describe("Service name"),
  applicationId: z.string().optional().describe("Application ID"),
  composeId: z.string().optional().describe("Compose service ID"),
  serverId: z.string().optional().describe("Server ID"),
});

export const ScheduleDeleteSchema = z.object({
  scheduleId: z.string().min(1).describe("ID of the schedule to delete"),
});

export const ScheduleListSchema = z.object({
  id: z.string().min(1).describe("ID of the resource"),
  scheduleType: z.enum(["application", "compose", "server", "dokploy-server"]).describe("Type of schedule"),
});

export const ScheduleOneSchema = z.object({
  scheduleId: z.string().min(1).describe("ID of the schedule to retrieve"),
});

export const ScheduleRunManuallySchema = z.object({
  scheduleId: z.string().min(1).describe("ID of the schedule to run"),
});

export const RegistryCreateSchema = z.object({
  registryName: z.string().min(1).describe("Name of the registry"),
  registryUrl: z.string().min(1).describe("Registry URL"),
  username: z.string().min(1).describe("Registry username"),
  password: z.string().min(1).describe("Registry password"),
});

export const RegistryOneSchema = z.object({
  registryId: z.string().min(1).describe("ID of the registry to retrieve"),
});

export const RegistryRemoveSchema = z.object({
  registryId: z.string().min(1).describe("ID of the registry to remove"),
});

export const RegistryUpdateSchema = z.object({
  registryId: z.string().min(1).describe("ID of the registry to update"),
  registryName: z.string().min(1).describe("New registry name"),
  registryUrl: z.string().min(1).describe("New registry URL"),
  username: z.string().min(1).describe("New username"),
  password: z.string().min(1).describe("New password"),
});

export const PortCreateSchema = z.object({
  publishedPort: z.number().describe("Published port number"),
  targetPort: z.number().describe("Target port number"),
  publishMode: z.enum(["ingress", "host"]).optional().describe("Publish mode (ingress or host)"),
  protocol: z.enum(["tcp", "udp"]).optional().describe("Protocol (tcp or udp)"),
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const PortOneSchema = z.object({
  portId: z.string().min(1).describe("ID of the port to retrieve"),
});

export const PortDeleteSchema = z.object({
  portId: z.string().min(1).describe("ID of the port to delete"),
});

export const PortUpdateSchema = z.object({
  portId: z.string().min(1).describe("ID of the port to update"),
  publishedPort: z.number().describe("New published port"),
  targetPort: z.number().describe("New target port"),
  publishMode: z.enum(["ingress", "host"]).optional().describe("Publish mode"),
  protocol: z.enum(["tcp", "udp"]).optional().describe("Protocol"),
});

export const MountCreateSchema = z.object({
  type: z.string().min(1).describe("Mount type (e.g., bind, volume)"),
  source: z.string().min(1).describe("Source path"),
  destination: z.string().min(1).describe("Destination path"),
  readOnly: z.boolean().optional().describe("Mount as read-only"),
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const MountOneSchema = z.object({
  mountId: z.string().min(1).describe("ID of the mount to retrieve"),
});

export const MountDeleteSchema = z.object({
  mountId: z.string().min(1).describe("ID of the mount to delete"),
});

export const RedirectCreateSchema = z.object({
  regex: z.string().min(1).describe("Regex pattern to match"),
  replacement: z.string().min(1).describe("Replacement string"),
  permanent: z.boolean().describe("Whether this is a permanent redirect (301)"),
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const RedirectOneSchema = z.object({
  redirectId: z.string().min(1).describe("ID of the redirect to retrieve"),
});

export const RedirectDeleteSchema = z.object({
  redirectId: z.string().min(1).describe("ID of the redirect to delete"),
});

export const RedirectUpdateSchema = z.object({
  redirectId: z.string().min(1).describe("ID of the redirect to update"),
  regex: z.string().min(1).describe("New regex pattern"),
  replacement: z.string().min(1).describe("New replacement string"),
  permanent: z.boolean().describe("Whether this is a permanent redirect"),
});

export const SecurityCreateSchema = z.object({
  username: z.string().min(1).describe("Username for HTTP Basic Auth"),
  password: z.string().min(1).describe("Password for HTTP Basic Auth"),
  applicationId: z.string().min(1).describe("ID of the application"),
});

export const SecurityOneSchema = z.object({
  securityId: z.string().min(1).describe("ID of the security config to retrieve"),
});

export const SecurityDeleteSchema = z.object({
  securityId: z.string().min(1).describe("ID of the security config to delete"),
});

export const SecurityUpdateSchema = z.object({
  securityId: z.string().min(1).describe("ID of the security config to update"),
  username: z.string().min(1).describe("New username"),
  password: z.string().min(1).describe("New password"),
});

export const DestinationCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the destination"),
  provider: z.string().min(1).describe("Provider (e.g., s3)"),
  accessKey: z.string().min(1).describe("Access key"),
  bucket: z.string().min(1).describe("Bucket name"),
  region: z.string().min(1).describe("Region"),
  endpoint: z.string().min(1).describe("Endpoint URL"),
  secretAccessKey: z.string().min(1).describe("Secret access key"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DestinationOneSchema = z.object({
  destinationId: z.string().min(1).describe("ID of the destination to retrieve"),
});

export const DestinationRemoveSchema = z.object({
  destinationId: z.string().min(1).describe("ID of the destination to remove"),
});

export const DestinationUpdateSchema = z.object({
  destinationId: z.string().min(1).describe("ID of the destination to update"),
  name: z.string().min(1).describe("New name"),
  provider: z.string().min(1).describe("New provider"),
  accessKey: z.string().min(1).describe("New access key"),
  bucket: z.string().min(1).describe("New bucket name"),
  region: z.string().min(1).describe("New region"),
  endpoint: z.string().min(1).describe("New endpoint"),
  secretAccessKey: z.string().min(1).describe("New secret access key"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DestinationTestConnectionSchema = z.object({
  name: z.string().min(1).describe("Name of the destination"),
  provider: z.string().min(1).describe("Provider"),
  accessKey: z.string().min(1).describe("Access key"),
  bucket: z.string().min(1).describe("Bucket name"),
  region: z.string().min(1).describe("Region"),
  endpoint: z.string().min(1).describe("Endpoint URL"),
  secretAccessKey: z.string().min(1).describe("Secret access key"),
});

export const SwarmGetNodesSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SwarmGetNodeInfoSchema = z.object({
  nodeId: z.string().min(1).describe("ID of the node"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SwarmGetNodeAppsSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});
