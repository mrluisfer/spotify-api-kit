import { ApiErrors } from "./utils/errors";
import { API_TOKEN_URL, API_URL } from "./utils/constants";
import { type AccessToken } from "./types";

export class SpotifyClient {
  public accessToken: AccessToken | undefined;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private static instance: SpotifyClient;
  private auth: AccessToken | null = null;

  // This will be provided by the user
  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  init(clientId: string, clientSecret: string) {
    SpotifyClient.instance ||= new SpotifyClient(clientId, clientSecret);

    return SpotifyClient.instance;
  }

  getInstance() {
    if (!SpotifyClient.instance) {
      throw new Error(ApiErrors.InstanceNotInitialized);
    }

    return SpotifyClient.instance;
  }

  public async getAccessToken(): Promise<AccessToken> {
    const response = await fetch(API_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }).toString(),
    });

    if (!response) {
      throw new Error(ApiErrors.AccessToken);
    }

    const data: AccessToken = await response.json();
    if (!data) {
      throw new Error(ApiErrors.AccessToken);
    }

    this.auth = data;
    return data;
  }

  async getValidAccessToken() {
    if (
      !this.accessToken ||
      new Date().getTime() > this.accessToken.expires_in
    ) {
      this.accessToken = await this.getAccessToken();
      return this.accessToken.access_token;
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
}
