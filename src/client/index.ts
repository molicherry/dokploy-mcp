import type { DokployConfig, ApiResponse } from "../types/index.js";

export class DokployClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: DokployConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.apiKey = config.apiKey;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | undefined>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}/api${endpoint}`);
    
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = (await response.json()) as ApiResponse<T>;
      if (data.result?.error) {
        throw new Error(`${data.result.error.code}: ${data.result.error.message}`);
      }
      return data.result?.data as T;
    }

    return null as T;
  }

  async get<T>(
    endpoint: string,
    queryParams?: Record<string, unknown>
  ): Promise<T> {
    const safeParams: Record<string, string | number | boolean | undefined> = {};
    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          safeParams[key] = value;
        } else if (value !== undefined && value !== null) {
          safeParams[key] = String(value);
        }
      }
    }
    return this.request<T>("GET", endpoint, undefined, safeParams);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", endpoint, body);
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", endpoint, body);
  }

  async delete<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>("DELETE", endpoint, body);
  }
}
