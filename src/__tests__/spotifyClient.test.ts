import { SpotifyClient } from "../spotifyClient.js";
import { API_URL } from "../utils/constants.js";
import { CLIENT_ID, CLIENT_SECRET } from "./credentials.js";

describe("SpotifyClient", () => {
	let spotify: SpotifyClient;

	beforeEach(() => {
		spotify = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should reset the singleton instance", () => {
		SpotifyClient.resetInstance();
		expect(() => SpotifyClient.getInstance()).toThrow();
		spotify = SpotifyClient.init(CLIENT_ID, CLIENT_SECRET);
	});

	it("should fetch data from Spotify API with a valid token", async () => {
		jest
			.spyOn(
				spotify as unknown as { getValidAccessToken: () => Promise<string> },
				"getValidAccessToken",
			)
			.mockResolvedValue("mock-access-token");

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

	it("should call the search service successfully", async () => {
		jest
			.spyOn(spotify, "fetchFromSpotify")
			.mockResolvedValue({ tracks: { items: [{ name: "Fake Track" }] } });

		const result = await spotify.search.search("test", "track");
		expect(result).toEqual({ tracks: { items: [{ name: "Fake Track" }] } });
	});

	it("should reset the singleton instance", () => {
		SpotifyClient.resetInstance();
		expect(() => SpotifyClient.getInstance()).toThrow();
		spotify = SpotifyClient.init(CLIENT_ID, CLIENT_SECRET);
	});
});
