import type { McpToolCall, McpToolResult, McpClientConfig } from '../types.js';

export class McpClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: McpClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.apiKey = config.apiKey;
  }

  async callTool(name: string, args: Record<string, any>): Promise<McpToolResult> {
    try {
      const endpoint = this.mapToolToEndpoint(name);
      const method = this.getHttpMethod(name);
      
      const url = new URL(`${this.baseUrl}/api${endpoint}`);
      
      if (method === 'GET' && Object.keys(args).length > 0) {
        Object.entries(args).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: method !== 'GET' ? JSON.stringify(args) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `HTTP ${response.status}: ${errorText || response.statusText}`,
        };
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json() as { result?: { error?: { code: string; message: string }; data?: any } };
        if (data.result?.error) {
          return {
            success: false,
            error: `${data.result.error.code}: ${data.result.error.message}`,
          };
        }
        return {
          success: true,
          data: data.result?.data,
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private mapToolToEndpoint(toolName: string): string {
    return `/${toolName.replace(/_/g, '.')}`;
  }

  private getHttpMethod(toolName: string): string {
    if (toolName.includes('_one') || toolName.includes('_all')) {
      return 'GET';
    }
    return 'POST';
  }
}
