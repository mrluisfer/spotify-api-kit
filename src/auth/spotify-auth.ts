import { API_TOKEN_URL } from "../utils/constants.js";

export class SpotifyAuth {
	constructor(
		private clientId: string,
		private clientSecret: string,
		private fetchImpl: typeof fetch = fetch,
	) {}

	buildAuthorizeUrl(params: {
		redirectUri: string;
		scope: string | string[];
		state: string;
		show_dialog?: boolean;
	}) {
		const scope = Array.isArray(params.scope)
			? params.scope.join(" ")
			: params.scope;
		const qs = new URLSearchParams({
			response_type: "code",
			client_id: this.clientId,
			redirect_uri: params.redirectUri,
			scope,
			state: params.state,
			...(params.show_dialog ? { show_dialog: "true" } : {}),
		});
		return `https://accounts.spotify.com/authorize?${qs.toString()}`;
	}

	async exchangeCodeForTokens(code: string, redirectUri: string) {
		const basic = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
			"base64",
		);
		const res = await this.fetchImpl(API_TOKEN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${basic}`,
			},
			body: new URLSearchParams({
				grant_type: "authorization_code",
				code,
				redirect_uri: redirectUri,
			}).toString(),
		});

		if (!res.ok) {
			const txt = await res.text();
			throw new Error(`Failed to exchange code: ${res.status} ${txt}`);
		}
		return res.json(); // { access_token, refresh_token, expires_in, token_type, scope }
	}
}
