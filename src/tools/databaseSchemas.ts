import { z } from "zod";

export const PostgresCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the PostgreSQL database"),
  appName: z.string().min(1).describe("App name for the database"),
  databaseName: z.string().min(1).describe("Name of the database to create"),
  databaseUser: z.string().min(1).describe("Username for database access"),
  databasePassword: z.string().min(1).describe("Password for database access"),
  environmentId: z.string().min(1).describe("ID of the environment where the database will be created"),
  description: z.string().optional().describe("Optional description for the database"),
  dockerImage: z.string().optional().describe("Docker image to use (default: postgres:15)"),
  serverId: z.string().optional().describe("Optional server ID for deployment"),
});

export const PostgresOneSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database to retrieve"),
});

export const PostgresUpdateSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database to update"),
  name: z.string().min(1).optional().describe("New name for the database"),
  description: z.string().optional().describe("New description for the database"),
  databaseName: z.string().min(1).optional().describe("New database name"),
  databaseUser: z.string().min(1).optional().describe("New database username"),
  databasePassword: z.string().optional().describe("New database password"),
  dockerImage: z.string().optional().describe("New Docker image"),
  command: z.string().optional().describe("Custom command to run"),
  env: z.string().optional().describe("Environment variables"),
  memoryReservation: z.string().optional().describe("Memory reservation"),
  memoryLimit: z.string().optional().describe("Memory limit"),
  cpuReservation: z.string().optional().describe("CPU reservation"),
  cpuLimit: z.string().optional().describe("CPU limit"),
  externalPort: z.number().optional().describe("External port"),
  applicationStatus: z.enum(["idle", "running", "done", "error"]).optional().describe("Application status"),
});

export const PostgresRemoveSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database to remove"),
});

export const PostgresDeploySchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database to deploy"),
});

export const PostgresStartSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database to start"),
});

export const PostgresStopSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database to stop"),
});

export const PostgresSaveEnvironmentSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database"),
  env: z.string().optional().describe("Environment variables"),
});

export const PostgresSaveExternalPortSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database"),
  externalPort: z.number().nullable().describe("External port number (null to disable)"),
});

export const PostgresReloadSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database"),
  appName: z.string().min(1).describe("App name for the database"),
});

export const PostgresRebuildSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database to rebuild"),
});

export const PostgresChangeStatusSchema = z.object({
  postgresId: z.string().min(1).describe("ID of the PostgreSQL database"),
  applicationStatus: z.enum(["idle", "running", "done", "error"]).describe("New status for the database"),
});

export const MySqlCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the MySQL database"),
  appName: z.string().min(1).describe("App name for the database"),
  databaseName: z.string().min(1).describe("Name of the database to create"),
  databaseUser: z.string().min(1).describe("Username for database access"),
  databasePassword: z.string().min(1).describe("Password for database access"),
  databaseRootPassword: z.string().min(1).describe("Root password for MySQL"),
  environmentId: z.string().min(1).describe("ID of the environment where the database will be created"),
  description: z.string().optional().describe("Optional description for the database"),
  dockerImage: z.string().optional().describe("Docker image to use (default: mysql:8)"),
  serverId: z.string().optional().describe("Optional server ID for deployment"),
});

export const MySqlOneSchema = z.object({
  mysqlId: z.string().min(1).describe("ID of the MySQL database to retrieve"),
});

export const MySqlRemoveSchema = z.object({
  mysqlId: z.string().min(1).describe("ID of the MySQL database to remove"),
});

export const MySqlDeploySchema = z.object({
  mysqlId: z.string().min(1).describe("ID of the MySQL database to deploy"),
});

export const MySqlStartSchema = z.object({
  mysqlId: z.string().min(1).describe("ID of the MySQL database to start"),
});

export const MySqlStopSchema = z.object({
  mysqlId: z.string().min(1).describe("ID of the MySQL database to stop"),
});

export const MySqlSaveEnvironmentSchema = z.object({
  mysqlId: z.string().min(1).describe("ID of the MySQL database"),
  env: z.string().optional().describe("Environment variables"),
});

export const MySqlSaveExternalPortSchema = z.object({
  mysqlId: z.string().min(1).describe("ID of the MySQL database"),
  externalPort: z.number().nullable().describe("External port number (null to disable)"),
});

export const MongoCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the MongoDB database"),
  appName: z.string().min(1).describe("App name for the database"),
  databaseName: z.string().min(1).describe("Name of the database to create"),
  databaseUser: z.string().min(1).describe("Username for database access"),
  databasePassword: z.string().min(1).describe("Password for database access"),
  environmentId: z.string().min(1).describe("ID of the environment where the database will be created"),
  description: z.string().optional().describe("Optional description for the database"),
  dockerImage: z.string().optional().describe("Docker image to use"),
  serverId: z.string().optional().describe("Optional server ID for deployment"),
});

export const MongoOneSchema = z.object({
  mongoId: z.string().min(1).describe("ID of the MongoDB database to retrieve"),
});

export const MongoRemoveSchema = z.object({
  mongoId: z.string().min(1).describe("ID of the MongoDB database to remove"),
});

export const MongoDeploySchema = z.object({
  mongoId: z.string().min(1).describe("ID of the MongoDB database to deploy"),
});

export const MongoStartSchema = z.object({
  mongoId: z.string().min(1).describe("ID of the MongoDB database to start"),
});

export const MongoStopSchema = z.object({
  mongoId: z.string().min(1).describe("ID of the MongoDB database to stop"),
});

export const RedisCreateSchema = z.object({
  name: z.string().min(1).describe("Name of the Redis database"),
  appName: z.string().min(1).describe("App name for the database"),
  databasePassword: z.string().min(1).describe("Password for database access"),
  environmentId: z.string().min(1).describe("ID of the environment where the database will be created"),
  description: z.string().optional().describe("Optional description for the database"),
  dockerImage: z.string().optional().describe("Docker image to use (default: redis:7)"),
  serverId: z.string().optional().describe("Optional server ID for deployment"),
});

export const RedisOneSchema = z.object({
  redisId: z.string().min(1).describe("ID of the Redis database to retrieve"),
});

export const RedisRemoveSchema = z.object({
  redisId: z.string().min(1).describe("ID of the Redis database to remove"),
});

export const RedisDeploySchema = z.object({
  redisId: z.string().min(1).describe("ID of the Redis database to deploy"),
});

export const RedisStartSchema = z.object({
  redisId: z.string().min(1).describe("ID of the Redis database to start"),
});

export const RedisStopSchema = z.object({
  redisId: z.string().min(1).describe("ID of the Redis database to stop"),
});
