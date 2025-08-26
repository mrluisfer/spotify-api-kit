// src/client.ts
import { Buffer as DependencyBuffer } from "buffer";
import { ArtistsService } from "./services/artists.js";
import { PlayerService } from "./services/player.js";
import { PlaylistsService } from "./services/playlists.js";
import { SearchService } from "./services/search.js";
import { TracksService } from "./services/tracks.js";
import type { PersistedUserAuth, UserTokens } from "./types/auth/types.js";
import type { AccessToken } from "./types/index.js";
import { API_TOKEN_URL, API_URL } from "./utils/constants.js";
import { ApiErrors } from "./utils/errors.js";

export type SpotifyClientConfig = {
	clientId: string;
	clientSecret: string;
	credentialsBase64?: string;
	baseUrl?: string;
	fetchImpl?: typeof fetch;
	clock?: () => number;
	tokenSkewMs?: number;
};

export type ClientContext = {
	getValidAccessToken: () => Promise<string>;
	baseUrl: string;
	fetch: typeof fetch;
};

export class SpotifyClient {
	private access?: { token: string; tokenType: string; expiresAt: number };
	private readonly clientId: string;
	private readonly clientSecret: string;
	private readonly credentials: string;
	private readonly baseUrl: string;
	private readonly fetch: typeof fetch;
	private readonly clock: () => number;
	private readonly tokenSkewMs: number;

	// lazy services
	private _artists?: ArtistsService;
	private _player?: PlayerService;
	private _tracks?: TracksService;
	private _playlists?: PlaylistsService;
	private _search?: SearchService;

	private userAuth?: PersistedUserAuth;

	constructor(cfg: SpotifyClientConfig) {
		this.clientId = cfg.clientId;
		this.clientSecret = cfg.clientSecret;
		this.credentials =
			cfg.credentialsBase64 ??
			DependencyBuffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString(
				"base64",
			);

		this.baseUrl = cfg.baseUrl ?? API_URL;
		this.fetch = cfg.fetchImpl ?? fetch;
		this.clock = cfg.clock ?? (() => Date.now());
		this.tokenSkewMs = cfg.tokenSkewMs ?? 10_000; // 10s
	}

	get artists() {
		if (!this._artists) {
			this._artists = new ArtistsService(this.ctx);
		}
		return this._artists;
	}
	get player() {
		if (!this._player) {
			this._player = new PlayerService(this.ctx);
		}
		return this._player;
	}
	get tracks() {
		if (!this._tracks) {
			this._tracks = new TracksService(this.ctx);
		}
		return this._tracks;
	}
	get playlists() {
		if (!this._playlists) {
			this._playlists = new PlaylistsService(this.ctx);
		}
		return this._playlists;
	}
	get search() {
		if (!this._search) {
			this._search = new SearchService(this.ctx);
		}
		return this._search;
	}

	private get ctx(): ClientContext {
		return {
			getValidAccessToken: () => this.getValidAccessToken(),
			baseUrl: this.baseUrl,
			fetch: this.fetch,
		};
	}

	// ---- Auth ----
	private async requestToken(body: Record<string, string>, errorType: string) {
		const res = await this.fetch(API_TOKEN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${this.credentials}`,
			},
			body: new URLSearchParams(body).toString(),
		});
		if (!res.ok) throw new Error(errorType);
		return res.json();
	}

	private async getAccessToken(): Promise<AccessToken> {
		return this.requestToken(
			{
				grant_type: "client_credentials",
				client_id: this.clientId,
				client_secret: this.clientSecret,
			},
			ApiErrors.AccessToken,
		);
	}

	public setUserAuth(tokens: UserTokens, now = this.clock()) {
		this.userAuth = {
			token: tokens.access_token,
			tokenType: tokens.token_type,
			expiresAt: now + tokens.expires_in * 1000,
			refreshToken: tokens.refresh_token,
			scope: tokens.scope,
		};
	}

	private async refreshUserAuth(_redirectUri?: string) {
		if (!this.userAuth?.refreshToken) {
			throw new Error("No refresh token available");
		}

		const res = await this.fetch(API_TOKEN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${this.credentials}`, // app confidential
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: this.userAuth.refreshToken,
			}).toString(),
		});

		if (!res.ok) throw new Error("Failed to refresh user token");
		const data = (await res.json()) as UserTokens;

		this.userAuth = {
			token: data.access_token,
			tokenType: data.token_type,
			expiresAt: this.clock() + data.expires_in * 1000,
			refreshToken: data.refresh_token || this.userAuth.refreshToken,
			scope: data.scope ?? this.userAuth.scope,
		};
	}

	/** logout */
	public clearUserAuth() {
		this.userAuth = undefined;
	}

	/**
	 * !Note: in Client Credentials flow there is no real refresh_token.
	 * If you need a refresh_token, you should use Authorization Code flow.
	 * @returns
	 */
	private async refreshAccessToken(): Promise<AccessToken> {
		// client_credentials (simple).
		return this.getAccessToken();
	}

	private async getValidAccessToken() {
		const now = this.clock();

		if (this.userAuth) {
			if (now + this.tokenSkewMs >= this.userAuth.expiresAt) {
				await this.refreshUserAuth();
			}
			return this.userAuth.token;
		}

		if (!this.access || now + this.tokenSkewMs >= this.access.expiresAt) {
			const data = await this.getAccessToken();
			this.access = {
				token: data.access_token,
				tokenType: data.token_type,
				expiresAt: now + data.expires_in * 1000,
			};
		}
		return this.access.token;
	}

	private async legacy_getValidAccessToken() {
		const now = this.clock();
		if (!this.access || now + this.tokenSkewMs >= this.access.expiresAt) {
			const data = await this.getAccessToken();
			// data.expires_in -> seconds
			this.access = {
				token: data.access_token,
				tokenType: data.token_type,
				expiresAt: now + data.expires_in * 1000,
			};
		}
		return this.access.token;
	}

	// ---- Fetch helper (GET simple) ----
	public async get<T>(endpoint: string, manualToken?: string): Promise<T> {
		const token = manualToken ?? (await this.getValidAccessToken());
		const url = endpoint.startsWith("/")
			? `${this.baseUrl}${endpoint}`
			: `${this.baseUrl}/${endpoint}`;

		const res = await this.fetch(url, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (!res.ok) {
			// 401 → try refreshing token
			if (res.status === 401 && !manualToken) {
				const refreshed = await this.refreshAccessToken();
				this.access = {
					token: refreshed.access_token,
					tokenType: refreshed.token_type,
					expiresAt: this.clock() + refreshed.expires_in * 1000,
				};
				const retry = await this.fetch(url, {
					method: "GET",
					headers: { Authorization: `Bearer ${this.access.token}` },
				});
				if (!retry.ok) throw new Error(ApiErrors.FetchData);
				return retry.json() as Promise<T>;
			}
			throw new Error(ApiErrors.FetchData);
		}
		return res.json() as Promise<T>;
	}

	public getCredentials() {
		return {
			clientId: this.clientId,
			clientSecret: this.clientSecret,
			credentials: this.credentials,
		};
	}

	static fromEnv(env = process.env) {
		const clientId = env.SPOTIFY_CLIENT_ID ?? "";
		const clientSecret = env.SPOTIFY_CLIENT_SECRET ?? "";
		if (!clientId || !clientSecret)
			throw new Error("Missing SPOTIFY_CLIENT_ID/SECRET");
		return new SpotifyClient({ clientId, clientSecret });
	}
}

export default SpotifyClient;
