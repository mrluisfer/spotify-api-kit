// src/services/base-service.ts
import type { ClientContext } from "../client.js";

export abstract class BaseService {
	protected ctx: ClientContext;
	constructor(ctx: ClientContext) {
		this.ctx = ctx;
	}

	private buildUrl(path: string) {
		return path.startsWith("/")
			? `${this.ctx.baseUrl}${path}`
			: `${this.ctx.baseUrl}/${path}`;
	}

	private async authHeaders(): Promise<Record<string, string>> {
		return {
			Authorization: `Bearer ${await this.ctx.getValidAccessToken()}`,
		};
	}

	private async request<T>(
		method: string,
		path: string,
		body?: unknown,
	): Promise<T> {
		const headers: Record<string, string> = await this.authHeaders();
		if (body !== undefined) {
			headers["Content-Type"] = "application/json";
		}

		const res = await this.ctx.fetch(this.buildUrl(path), {
			method,
			headers,
			...(body !== undefined ? { body: JSON.stringify(body) } : {}),
		});

		if (!res.ok) throw new Error(`Request failed: ${res.status}`);

		if (res.status === 204) return undefined as T;
		return (await res.json()) as T;
	}

	protected async get<T>(path: string): Promise<T> {
		return this.request<T>("GET", path);
	}

	protected async post<T>(path: string, body?: unknown): Promise<T> {
		return this.request<T>("POST", path, body);
	}

	protected async put<T>(path: string, body?: unknown): Promise<T> {
		return this.request<T>("PUT", path, body);
	}

	protected async del<T>(path: string, body?: unknown): Promise<T> {
		return this.request<T>("DELETE", path, body);
	}
}
