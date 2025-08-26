import type { ClientContext } from "../client.js";

export class UserService {
	constructor(private ctx: ClientContext) {}
	async me<T>() {
		const clientGet = async (endpoint: string) => {
			const token = await this.ctx.getValidAccessToken();
			const url = endpoint.startsWith("/")
				? `${this.ctx.baseUrl}${endpoint}`
				: `${this.ctx.baseUrl}/${endpoint}`;
			const res = await this.ctx.fetch(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) throw new Error("Failed to fetch /me");
			return res.json() as Promise<T>;
		};
		return clientGet("/me");
	}
}
