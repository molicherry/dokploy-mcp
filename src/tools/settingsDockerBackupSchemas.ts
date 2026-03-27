import { z } from "zod";

export const SettingsReloadServerSchema = z.object({});

export const SettingsCleanRedisSchema = z.object({});

export const SettingsReloadRedisSchema = z.object({});

export const SettingsReloadTraefikSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsToggleDashboardSchema = z.object({
  enableDashboard: z.boolean().optional().describe("Enable or disable dashboard"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsCleanUnusedImagesSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsCleanUnusedVolumesSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsCleanStoppedContainersSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsCleanDockerBuilderSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsCleanDockerPruneSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsCleanAllSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsCleanMonitoringSchema = z.object({});

export const SettingsSaveSSHPrivateKeySchema = z.object({
  sshPrivateKey: z.string().min(1).describe("SSH private key content"),
});

export const SettingsCleanSSHPrivateKeySchema = z.object({});

export const SettingsAssignDomainServerSchema = z.object({
  host: z.string().min(1).describe("Domain host"),
  certificateType: z.enum(["letsencrypt", "none", "custom"]).describe("Certificate type"),
  letsEncryptEmail: z.string().email().optional().describe("Let's Encrypt email"),
  https: z.boolean().optional().describe("Enable HTTPS"),
});

export const SettingsUpdateDockerCleanupSchema = z.object({
  enableDockerCleanup: z.boolean().describe("Enable or disable Docker cleanup"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const SettingsReadTraefikConfigSchema = z.object({});

export const SettingsUpdateTraefikConfigSchema = z.object({
  traefikConfig: z.string().min(1).describe("Traefik configuration content"),
});

export const SettingsReadWebServerTraefikConfigSchema = z.object({});

export const SettingsUpdateWebServerTraefikConfigSchema = z.object({
  traefikConfig: z.string().min(1).describe("Traefik configuration content"),
});

export const DockerGetContainersSchema = z.object({
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DockerRestartContainerSchema = z.object({
  containerId: z.string().regex(/^[a-zA-Z0-9.\-_]+$/).min(1).describe("Container ID to restart"),
});

export const DockerGetConfigSchema = z.object({
  containerId: z.string().regex(/^[a-zA-Z0-9.\-_]+$/).min(1).describe("Container ID"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DockerGetContainersByAppNameMatchSchema = z.object({
  appName: z.string().regex(/^[a-zA-Z0-9.\-_]+$/).min(1).describe("Application name"),
  appType: z.enum(["stack", "docker-compose"]).optional().describe("Application type"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DockerGetContainersByAppLabelSchema = z.object({
  appName: z.string().regex(/^[a-zA-Z0-9.\-_]+$/).min(1).describe("Application name"),
  type: z.enum(["standalone", "swarm"]).describe("Container type"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DockerGetStackContainersByAppNameSchema = z.object({
  appName: z.string().regex(/^[a-zA-Z0-9.\-_]+$/).min(1).describe("Application name"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const DockerGetServiceContainersByAppNameSchema = z.object({
  appName: z.string().regex(/^[a-zA-Z0-9.\-_]+$/).min(1).describe("Application name"),
  serverId: z.string().optional().describe("Optional server ID"),
});

export const BackupCreateSchema = z.object({
  schedule: z.string().min(1).describe("Cron schedule expression"),
  prefix: z.string().min(1).describe("Backup file prefix"),
  destinationId: z.string().min(1).describe("Destination ID for backup storage"),
  database: z.string().min(1).describe("Database name to backup"),
  databaseType: z.enum(["postgres", "mariadb", "mysql", "mongo", "web-server"]).describe("Type of database"),
  enabled: z.boolean().optional().describe("Enable the backup schedule"),
  keepLatestCount: z.number().optional().describe("Number of backups to keep"),
  postgresId: z.string().optional().describe("PostgreSQL database ID"),
  mysqlId: z.string().optional().describe("MySQL database ID"),
  mariadbId: z.string().optional().describe("MariaDB database ID"),
  mongoId: z.string().optional().describe("MongoDB database ID"),
  composeId: z.string().optional().describe("Compose service ID"),
  serviceName: z.string().optional().describe("Service name for compose backup"),
});

export const BackupOneSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup to retrieve"),
});

export const BackupUpdateSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup to update"),
  schedule: z.string().min(1).describe("Cron schedule expression"),
  enabled: z.boolean().optional().describe("Enable the backup schedule"),
  prefix: z.string().min(1).describe("Backup file prefix"),
  destinationId: z.string().min(1).describe("Destination ID"),
  database: z.string().min(1).describe("Database name"),
  keepLatestCount: z.number().optional().describe("Number of backups to keep"),
  serviceName: z.string().optional().describe("Service name"),
  databaseType: z.enum(["postgres", "mariadb", "mysql", "mongo", "web-server"]).describe("Type of database"),
});

export const BackupRemoveSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup to remove"),
});

export const BackupManualBackupPostgresSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup configuration"),
});

export const BackupManualBackupMySqlSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup configuration"),
});

export const BackupManualBackupMariadbSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup configuration"),
});

export const BackupManualBackupComposeSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup configuration"),
});

export const BackupManualBackupMongoSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup configuration"),
});

export const BackupManualBackupWebServerSchema = z.object({
  backupId: z.string().min(1).describe("ID of the backup configuration"),
});

export const BackupListBackupFilesSchema = z.object({
  destinationId: z.string().min(1).describe("Destination ID"),
  search: z.string().min(1).describe("Search term"),
  serverId: z.string().optional().describe("Optional server ID"),
});
