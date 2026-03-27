import { z } from "zod";

export const ServerCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the server"),
  ipAddress: z.string().min(1).describe("IP address or hostname of the server"),
  port: z.number().describe("SSH port number (typically 22)"),
  username: z.string().min(1).describe("SSH username"),
  sshKeyId: z.string().optional().describe("Optional SSH key ID"),
  description: z.string().optional().describe("Optional description of the server"),
});

export const ServerOneSchema = z.object({
  serverId: z.string().min(1).describe("ID of the server to retrieve"),
});

export const ServerUpdateSchema = z.object({
  serverId: z.string().min(1).describe("ID of the server to update"),
  name: z.string().min(1).describe("New name for the server"),
  ipAddress: z.string().min(1).describe("New IP address"),
  port: z.number().describe("New SSH port"),
  username: z.string().min(1).describe("New SSH username"),
  sshKeyId: z.string().optional().describe("New SSH key ID"),
  description: z.string().optional().describe("New description"),
});

export const ServerRemoveSchema = z.object({
  serverId: z.string().min(1).describe("ID of the server to remove"),
});

export const ServerSetupSchema = z.object({
  serverId: z.string().min(1).describe("ID of the server to setup"),
});

export const ServerValidateSchema = z.object({
  serverId: z.string().min(1).describe("ID of the server to validate"),
});

export const NotificationCreateSlackSchema = z.object({
  name: z.string().min(1).describe("Name of the notification"),
  webhookUrl: z.string().min(1).describe("Slack webhook URL"),
  channel: z.string().min(1).describe("Slack channel"),
  appBuildError: z.boolean().optional().describe("Notify on app build errors"),
  appDeploy: z.boolean().optional().describe("Notify on app deployments"),
  databaseBackup: z.boolean().optional().describe("Notify on database backups"),
  dockerCleanup: z.boolean().optional().describe("Notify on Docker cleanup"),
  dokployRestart: z.boolean().optional().describe("Notify on Dokploy restart"),
  serverThreshold: z.boolean().optional().describe("Notify on server threshold alerts"),
  volumeBackup: z.boolean().optional().describe("Notify on volume backups"),
});

export const NotificationCreateTelegramSchema = z.object({
  name: z.string().min(1).describe("Name of the notification"),
  botToken: z.string().min(1).describe("Telegram bot token"),
  chatId: z.string().min(1).describe("Telegram chat ID"),
  messageThreadId: z.string().optional().describe("Telegram message thread ID"),
  appBuildError: z.boolean().optional().describe("Notify on app build errors"),
  appDeploy: z.boolean().optional().describe("Notify on app deployments"),
  databaseBackup: z.boolean().optional().describe("Notify on database backups"),
  dockerCleanup: z.boolean().optional().describe("Notify on Docker cleanup"),
  dokployRestart: z.boolean().optional().describe("Notify on Dokploy restart"),
  serverThreshold: z.boolean().optional().describe("Notify on server threshold alerts"),
  volumeBackup: z.boolean().optional().describe("Notify on volume backups"),
});

export const NotificationCreateDiscordSchema = z.object({
  name: z.string().min(1).describe("Name of the notification"),
  webhookUrl: z.string().min(1).describe("Discord webhook URL"),
  decoration: z.boolean().optional().describe("Enable decoration"),
  appBuildError: z.boolean().optional().describe("Notify on app build errors"),
  appDeploy: z.boolean().optional().describe("Notify on app deployments"),
  databaseBackup: z.boolean().optional().describe("Notify on database backups"),
  dockerCleanup: z.boolean().optional().describe("Notify on Docker cleanup"),
  dokployRestart: z.boolean().optional().describe("Notify on Dokploy restart"),
  serverThreshold: z.boolean().optional().describe("Notify on server threshold alerts"),
  volumeBackup: z.boolean().optional().describe("Notify on volume backups"),
});

export const NotificationCreateEmailSchema = z.object({
  name: z.string().min(1).describe("Name of the notification"),
  smtpServer: z.string().min(1).describe("SMTP server address"),
  smtpPort: z.number().min(1).describe("SMTP port"),
  username: z.string().min(1).describe("SMTP username"),
  password: z.string().min(1).describe("SMTP password"),
  fromAddress: z.string().min(1).describe("From email address"),
  toAddresses: z.array(z.string().min(1)).min(1).describe("Array of recipient email addresses"),
  appBuildError: z.boolean().optional().describe("Notify on app build errors"),
  appDeploy: z.boolean().optional().describe("Notify on app deployments"),
  databaseBackup: z.boolean().optional().describe("Notify on database backups"),
  dockerCleanup: z.boolean().optional().describe("Notify on Docker cleanup"),
  dokployRestart: z.boolean().optional().describe("Notify on Dokploy restart"),
  serverThreshold: z.boolean().optional().describe("Notify on server threshold alerts"),
  volumeBackup: z.boolean().optional().describe("Notify on volume backups"),
});

export const NotificationOneSchema = z.object({
  notificationId: z.string().min(1).describe("ID of the notification to retrieve"),
});

export const NotificationRemoveSchema = z.object({
  notificationId: z.string().min(1).describe("ID of the notification to remove"),
});

export const NotificationTestSlackSchema = z.object({
  webhookUrl: z.string().min(1).describe("Slack webhook URL"),
  channel: z.string().min(1).describe("Slack channel"),
});

export const NotificationTestTelegramSchema = z.object({
  botToken: z.string().min(1).describe("Telegram bot token"),
  chatId: z.string().min(1).describe("Telegram chat ID"),
  messageThreadId: z.string().optional().describe("Telegram message thread ID"),
});

export const NotificationTestDiscordSchema = z.object({
  webhookUrl: z.string().min(1).describe("Discord webhook URL"),
  decoration: z.boolean().optional().describe("Enable decoration"),
});

export const NotificationTestEmailSchema = z.object({
  smtpServer: z.string().min(1).describe("SMTP server"),
  smtpPort: z.number().min(1).describe("SMTP port"),
  username: z.string().min(1).describe("SMTP username"),
  password: z.string().min(1).describe("SMTP password"),
  fromAddress: z.string().min(1).describe("From address"),
  toAddresses: z.array(z.string().min(1)).min(1).describe("To addresses"),
});
