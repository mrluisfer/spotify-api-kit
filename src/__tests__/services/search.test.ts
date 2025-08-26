// tests/search/search.service.test.ts
import { SpotifyClient } from "../../client.js";

const API_TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

const okJson = (data: unknown, init: Partial<Response> = {}) =>
	new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" },
		...init,
	});

const notOk = (status = 500) =>
	new Response(JSON.stringify({ error: "error" }), {
		status,
		headers: { "Content-Type": "application/json" },
	});

describe("search service (with injected fetch)", () => {
	let client: SpotifyClient;
	let fetchMock: jest.Mock;

	beforeEach(() => {
		fetchMock = jest.fn(async (url: string, init?: RequestInit) => {
			if (url === API_TOKEN_URL && init?.method === "POST") {
				return okJson({
					access_token: "mock_access_token",
					token_type: "Bearer",
					expires_in: 3600,
				});
			}

			// /v1/search
			if (url.startsWith(`${API_URL}/search`)) {
				const q = new URL(url).searchParams.get("q") ?? "";
				const type = new URL(url).searchParams.get("type") ?? "";

				const basePaging = {
					href: url,
					items: [],
					limit: 20,
					next: null,
					offset: 0,
					previous: null,
					total: 1,
				};

				if (type.includes("artist")) {
					return okJson({
						artists: {
							...basePaging,
							items: [{ id: "artist_1", name: `Artist for ${q}` }],
						},
					});
				}
				if (type.includes("album")) {
					return okJson({
						albums: {
							...basePaging,
							items: [{ id: "album_1", name: `Album for ${q}` }],
						},
					});
				}
				if (type.includes("track")) {
					return okJson({
						tracks: {
							...basePaging,
							items: [{ id: "track_1", name: `Track for ${q}` }],
						},
					});
				}
				if (type.includes("playlist")) {
					return okJson({
						playlists: {
							...basePaging,
							items: [{ id: "playlist_1", name: `Playlist for ${q}` }],
						},
					});
				}

				return notOk(400);
			}

			return notOk(404);
		});

		client = new SpotifyClient({
			clientId: "dummy",
			clientSecret: "dummy",
			fetchImpl: fetchMock,
			clock: () => 1700000000000,
			tokenSkewMs: 0,
		});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should return a search result (smoke)", async () => {
		const query = "Promises by Calvin Harris";
		const type = "track";
		await client.search.search(query, type);
		expect(fetchMock).toHaveBeenCalled();
	});

	it("should search for artists", async () => {
		const query = "The Beatles";
		const type = "artist";
		const response = await client.search.search(query, type);

		expect(response).toBeDefined();
		expect(response?.artists?.items.length).toBeGreaterThan(0);
		expect(response?.artists?.items[0].id).toBe("artist_1");
	});

	it("should search for albums", async () => {
		const query = "Abbey Road";
		const type = "album";
		const response = await client.search.search(query, type);

		expect(response).toBeDefined();
		expect(response?.albums?.items.length).toBeGreaterThan(0);
		expect(response?.albums?.items[0].id).toBe("album_1");
	});

	it("should search for tracks", async () => {
		const query = "Hey Jude";
		const type = "track";
		const response = await client.search.search(query, type);

		expect(response).toBeDefined();
		expect(response.tracks?.items.length).toBeGreaterThan(0);
		expect(response?.tracks?.items[0].id).toBe("track_1");
	});

	it("should search for playlists", async () => {
		const query = "Chill Vibes";
		const type = "playlist";
		const response = await client.search.search(query, type);

		expect(response).toBeDefined();
		expect(response.playlists?.items.length).toBeGreaterThan(0);
		expect(response?.playlists?.items[0].id).toBe("playlist_1");
	});
});
