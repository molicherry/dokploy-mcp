import { z } from "zod";

export const UserAllSchema = z.object({});

export const UserOneSchema = z.object({
  userId: z.string().min(1).describe("ID of the user to retrieve"),
});

export const UserGetSchema = z.object({});

export const UserUpdateSchema = z.object({
  id: z.string().min(1).describe("ID of the user to update"),
  email: z.string().email().optional().describe("New email address"),
  password: z.string().optional().describe("New password"),
  currentPassword: z.string().optional().describe("Current password (required when changing password)"),
  name: z.string().optional().describe("New name"),
  image: z.string().optional().describe("New profile image URL"),
  twoFactorEnabled: z.boolean().optional().describe("Enable/disable 2FA"),
});

export const UserRemoveSchema = z.object({
  userId: z.string().min(1).describe("ID of the user to remove"),
});

export const UserAssignPermissionsSchema = z.object({
  id: z.string().min(1).describe("ID of the user"),
  accessedProjects: z.array(z.string()).optional().describe("Array of project IDs the user can access"),
  accessedEnvironments: z.array(z.string()).optional().describe("Array of environment IDs the user can access"),
  accessedServices: z.array(z.string()).optional().describe("Array of service IDs the user can access"),
  canCreateProjects: z.boolean().optional().describe("Allow creating projects"),
  canCreateServices: z.boolean().optional().describe("Allow creating services"),
  canDeleteProjects: z.boolean().optional().describe("Allow deleting projects"),
  canDeleteServices: z.boolean().optional().describe("Allow deleting services"),
  canAccessToDocker: z.boolean().optional().describe("Allow Docker access"),
  canAccessToTraefikFiles: z.boolean().optional().describe("Allow Traefik files access"),
  canAccessToAPI: z.boolean().optional().describe("Allow API access"),
  canAccessToSSHKeys: z.boolean().optional().describe("Allow SSH keys access"),
  canAccessToGitProviders: z.boolean().optional().describe("Allow Git providers access"),
  canDeleteEnvironments: z.boolean().optional().describe("Allow deleting environments"),
  canCreateEnvironments: z.boolean().optional().describe("Allow creating environments"),
});

export const UserGenerateTokenSchema = z.object({});

export const UserDeleteApiKeySchema = z.object({
  apiKeyId: z.string().min(1).describe("ID of the API key to delete"),
});

export const UserCreateApiKeySchema = z.object({
  name: z.string().min(1).describe("Name of the API key"),
  prefix: z.string().optional().describe("Prefix for the API key"),
  expiresIn: z.number().optional().describe("Expiration time in seconds"),
  metadata: z.record(z.any()).describe("Metadata for the API key"),
  rateLimitEnabled: z.boolean().optional().describe("Enable rate limiting"),
  rateLimitTimeWindow: z.number().optional().describe("Rate limit time window in seconds"),
  rateLimitMax: z.number().optional().describe("Maximum requests per time window"),
  remaining: z.number().optional().describe("Remaining requests"),
  refillAmount: z.number().optional().describe("Refill amount"),
  refillInterval: z.number().optional().describe("Refill interval in seconds"),
});

export const UserGetInvitationsSchema = z.object({});

export const UserSendInvitationSchema = z.object({
  email: z.string().email().describe("Email address to send invitation to"),
});

export const UserGetBackupsSchema = z.object({});

export const UserGetServerMetricsSchema = z.object({});

export const UserGetContainerMetricsSchema = z.object({
  url: z.string().min(1).describe("Metrics URL"),
  token: z.string().min(1).describe("Metrics token"),
  appName: z.string().min(1).describe("Application name"),
  dataPoints: z.string().min(1).describe("Data points"),
});

export const AuthCreateAdminSchema = z.object({
  email: z.string().email().describe("Admin email address"),
  password: z.string().min(8).describe("Admin password (minimum 8 characters)"),
});

export const AuthCreateUserSchema = z.object({
  email: z.string().email().describe("User email address"),
  password: z.string().min(8).describe("User password (minimum 8 characters)"),
});

export const AuthGetSchema = z.object({});

export const AuthGenerateTokenSchema = z.object({});

export const SSHKeyCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the SSH key"),
  publicKey: z.string().min(1).describe("SSH public key"),
  privateKey: z.string().min(1).describe("SSH private key"),
  description: z.string().optional().describe("Optional description"),
  organizationId: z.string().min(1).describe("Organization ID"),
});

export const SSHKeyOneSchema = z.object({
  sshKeyId: z.string().min(1).describe("ID of the SSH key to retrieve"),
});

export const SSHKeyRemoveSchema = z.object({
  sshKeyId: z.string().min(1).describe("ID of the SSH key to remove"),
});

export const SSHKeyGenerateSchema = z.object({
  type: z.enum(["rsa", "ed25519"]).optional().describe("Type of SSH key to generate"),
});

export const SSHKeyUpdateSchema = z.object({
  sshKeyId: z.string().min(1).describe("ID of the SSH key to update"),
  name: z.string().min(1).optional().describe("New name"),
  description: z.string().optional().describe("New description"),
});
