import { Buffer as DependencyBuffer } from "buffer";
import { ArtistsService } from "./services/artists.js";
import { PlayerService } from "./services/player.js";
import { PlaylistsService } from "./services/playlists.js";
import { SearchService } from "./services/search.js";
import { TracksService } from "./services/tracks.js";
import type { AccessToken, RefreshToken } from "./types/index.js";
import { API_TOKEN_URL, API_URL } from "./utils/constants.js";
import { ApiErrors } from "./utils/errors.js";

export class SpotifyClient {
	private accessToken: AccessToken | undefined;

	private readonly clientId: string;
	private readonly clientSecret: string;
	private readonly credentials: string;
	private static instance: SpotifyClient | null;

	// TODO: Verify if this is the correct way to initialize the services, or use other pattern
	public readonly artists: ArtistsService;
	public readonly player: PlayerService;
	public readonly tracks: TracksService;
	public readonly playlists: PlaylistsService;
	public readonly search: SearchService;

	// This will be provided by the user
	constructor(clientId: string, clientSecret: string, credentials?: string) {
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.credentials =
			credentials ||
			DependencyBuffer.from(`${clientId}:${clientSecret}`).toString("base64");

		this.artists = new ArtistsService(this);
		this.player = new PlayerService(this);
		this.tracks = new TracksService(this);
		this.playlists = new PlaylistsService(this);
		this.search = new SearchService(this);
	}

	public static init(clientId: string, clientSecret: string) {
		SpotifyClient.instance ||= new SpotifyClient(clientId, clientSecret);

		return SpotifyClient.instance;
	}

	public static getInstance() {
		if (!SpotifyClient.instance) {
			throw new Error(ApiErrors.InstanceNotInitialized);
		}

		return SpotifyClient.instance;
	}

	static resetInstance() {
		SpotifyClient.instance = null;
	}

	private async requestToken(
		bodyParams: Record<string, string>,
		errorType: string,
	) {
		const response = await fetch(API_TOKEN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${this.credentials}`,
			},
			body: new URLSearchParams(bodyParams).toString(),
		});

		if (!response.ok) {
			throw new Error(errorType);
		}

		return response.json();
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

	private async getRefreshToken(): Promise<RefreshToken> {
		const data = await this.requestToken(
			{
				grant_type: "refresh_token",
				refresh_token: this.accessToken?.access_token || "",
				client_id: this.clientId,
			},
			ApiErrors.RefreshToken,
		);

		this.accessToken = {
			access_token: data.access_token,
			token_type: data.token_type,
			expires_in: data.expires_in,
		};

		return data;
	}

	private async getValidAccessToken() {
		if (!this.accessToken) {
			this.accessToken = await this.getAccessToken();
			return this.accessToken.access_token;
		}
		if (new Date().getTime() > this.accessToken.expires_in) {
			return (await this.getRefreshToken()).access_token;
		}

		return this.accessToken.access_token;
	}

	public async fetchFromSpotify<T>(endpoint: string, manualToken?: string) {
		const token = manualToken || (await this.getValidAccessToken());
		const formattedEndpoint = endpoint.startsWith("/")
			? endpoint
			: `/${endpoint}`;

		const response = await fetch(`${API_URL}${formattedEndpoint}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}

		return (await response.json()) as T;
	}

	public async getSpotifyCredentials() {
		return {
			clientId: this.clientId,
			clientSecret: this.clientSecret,
			credentials: this.credentials,
		};
	}
}
