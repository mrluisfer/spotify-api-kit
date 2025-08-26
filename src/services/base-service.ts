// src/services/base-service.ts
import type { ClientContext } from "../client.js";

export abstract class BaseService {
	protected ctx: ClientContext;
	constructor(ctx: ClientContext) {
		this.ctx = ctx;
	}

	protected async get<T>(path: string) {
		return this.ctx
			.fetch(
				path.startsWith("/")
					? `${this.ctx.baseUrl}${path}`
					: `${this.ctx.baseUrl}/${path}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${await this.ctx.getValidAccessToken()}`,
					},
				},
			)
			.then(async (r) => {
				if (!r.ok) throw new Error(`Request failed: ${r.status}`);
				return (await r.json()) as T;
			});
	}
}
