import { SpotifyClient } from "../SpotifyClient";
import { API_URL, CLIENT_ID, CLIENT_SECRET } from "../utils/constants";

describe("SpotifyClient", () => {
  let spotify: SpotifyClient;

  beforeEach(() => {
    spotify = SpotifyClient.init(CLIENT_ID!, CLIENT_SECRET!);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize a single instance", () => {
    const client2 = SpotifyClient.init("another-client-id", "another-client-secret");
    expect(client2).toBe(spotify);
  });

  it("should fetch a new access token", async () => {
    const mockTokenResponse = {
      access_token: "mock-access-token",
      expires_in: Date.now() + 3600 * 1000,
    };

    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(mockTokenResponse),
      } as Response),
    );

    const token = await spotify.getAccessToken();
    expect(token).toEqual(mockTokenResponse);
  });

  it("should fetch a new access token if the current one is expired", async () => {
    (spotify as SpotifyClient).accessToken = {
      access_token: "expired-token",
      expires_in: Date.now() - 1000,
      token_type: "Bearer",
    };

    const mockTokenResponse = {
      access_token: "new-token",
      expires_in: Date.now() + 3600 * 1000,
    };

    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(mockTokenResponse),
      } as Response),
    );

    const token = await spotify.getValidAccessToken();
    expect(token).toBe("new-token");
  });

  it("should reuse an existing valid access token", async () => {
    spotify.accessToken = {
      access_token: "existing-token",
      expires_in: Date.now() + 5000,
      token_type: "Bearer",
    };

    const token = await spotify.getValidAccessToken();
    expect(token).toBe("existing-token");
  });

  it("should fetch data from Spotify API with a valid token", async () => {
    jest.spyOn(spotify, "getValidAccessToken").mockResolvedValue("mock-access-token");

    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve({ name: "Test Artist" }),
      } as Response),
    );

    const response = await spotify.fetchFromSpotify("/artists/test-id");
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/artists/test-id`, {
      method: "GET",
      headers: { Authorization: "Bearer mock-access-token" },
    });
    expect(response).toEqual({ name: "Test Artist" });
  });
});
