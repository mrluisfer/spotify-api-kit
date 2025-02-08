// Definition of the AccessToken interface that contains the token and expiration time
export interface AccessToken {
  access_token: string;
  expires_in: number; // Expiration time in milliseconds
}

// Enum for API error messages
export enum ApiErrors {
  InstanceNotInitialized = "Spotify Client instance is not initialized",
  AccessToken = "Error while obtaining access token",
  FetchData = "Error fetching data from Spotify",
}

// Declaration of the SpotifyClient class
export declare class SpotifyClient {
  public accessToken: AccessToken | undefined;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private static instance: SpotifyClient;
  private auth: AccessToken | null;

  // Constructor of the class, with parameters required for authentication
  constructor(clientId: string, clientSecret: string);

  // Static method to initialize a SpotifyClient instance
  public static init(clientId: string, clientSecret: string): SpotifyClient;

  // Static method to get the unique instance of SpotifyClient
  public static getInstance(): SpotifyClient;

  // Method to get an AccessToken from Spotify
  public getAccessToken(): Promise<AccessToken>;

  // Method to get a valid AccessToken, or generate a new one if it has expired
  public getValidAccessToken(): Promise<string>;

  // Method to make GET requests to the Spotify API
  public fetchFromSpotify<T>(
    endpoint: string,
    manualToken?: string,
  ): Promise<T>;
}
