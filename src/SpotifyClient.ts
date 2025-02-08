import { ApiErrors } from './utils/errors';
import { API_TOKEN_URL, API_URL } from './utils/constants';
import { RefreshToken, type AccessToken } from './types/types';
import { ArtistsService } from './services/artists';
import { PlayerService } from './services/player';
import { TracksService } from './services/tracks';

export class SpotifyClient {
  public accessToken: AccessToken | undefined;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private static instance: SpotifyClient;

  public artists: ArtistsService;
  public player: PlayerService;
  public tracks: TracksService;

  // This will be provided by the user
  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;

    this.artists = new ArtistsService();
    this.player = new PlayerService();
    this.tracks = new TracksService();
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

  public async getRefreshToken() {
    const response = await fetch(API_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.accessToken?.access_token || '',
        client_id: this.clientId
      }).toString()
    });

    if (!response) {
      throw new Error(ApiErrors.RefreshToken);
    }
    const data: RefreshToken = await response.json();
    if (!data) {
      throw new Error(ApiErrors.RefreshToken);
    }
    this.accessToken = {
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in
    };
    return data;
  }

  public async getAccessToken(): Promise<AccessToken> {
    const response = await fetch(API_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: 'user-read-email user-read-currently-playing'
      }).toString()
    });

    if (!response) {
      throw new Error(ApiErrors.AccessToken);
    }

    const data: AccessToken = await response.json();
    console.log({ data });
    if (!data) {
      throw new Error(ApiErrors.AccessToken);
    }

    return data;
  }

  async getValidAccessToken() {
    if (!this.accessToken) {
      this.accessToken = await this.getAccessToken();
      return this.accessToken.access_token;
    } else if (new Date().getTime() > this.accessToken.expires_in) {
      return (await this.getRefreshToken()).access_token;
    }

    return this.accessToken.access_token;
  }

  public async fetchFromSpotify<T>(endpoint: string, manualToken?: string) {
    const token = manualToken || (await this.getValidAccessToken());
    const formattedEndpoint = endpoint.startsWith('/')
      ? endpoint
      : `/${endpoint}`;

    console.log({ token });
    const response = await fetch(`${API_URL}${formattedEndpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response) {
      throw new Error(ApiErrors.FetchData);
    }

    return (await response.json()) as T;
  }
}
