import { SpotifyClient } from "../client.js";
import { API_TOKEN_URL, API_URL } from "../utils/constants.js";
import { CLIENT_ID, CLIENT_SECRET } from "./credentials.js";

const okJson = (data: unknown, init: Partial<Response> = {}) =>
	new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" },
		...init,
	});

describe("SpotifyClient (public API)", () => {
	let spotify: SpotifyClient;
	let fetchMock: jest.Mock;

	beforeEach(() => {
		fetchMock = jest.fn(async (url: string, init?: RequestInit) => {
			if (url === API_TOKEN_URL && init?.method === "POST") {
				return okJson({
					access_token: "mock-access-token",
					token_type: "Bearer",
					expires_in: 3600,
				});
			}

			if (url.startsWith(`${API_URL}/search`)) {
				const auth = (init?.headers as Record<string, string>)?.Authorization;
				if (auth !== "Bearer mock-access-token") {
					return new Response("Unauthorized", { status: 401 });
				}
				return okJson({
					tracks: { items: [{ name: "Fake Track" }] },
					artists: { items: [{ name: "Fake Artist" }] },
					albums: { items: [{ name: "Fake Album" }] },
					playlists: { items: [{ name: "Fake Playlist" }] },
				});
			}

			if (url === `${API_URL}/artists/test-id`) {
				const auth = (init?.headers as Record<string, string>)?.Authorization;
				if (auth !== "Bearer mock-access-token") {
					return new Response("Unauthorized", { status: 401 });
				}
				return okJson({ name: "Test Artist" });
			}

			return new Response("Not Found", { status: 404 });
		});

		spotify = new SpotifyClient({
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			fetchImpl: fetchMock,
			clock: () => 1700000000000,
			tokenSkewMs: 0,
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("Perform a search with the public `search` service using a valid token.", async () => {
		const result = await spotify.search.search("test", "track");

		expect(fetchMock).toHaveBeenNthCalledWith(
			1,
			API_TOKEN_URL,
			expect.objectContaining({
				method: "POST",
				headers: expect.any(Object),
				body: expect.any(String),
			}),
		);

		// biome-ignore lint/style/noNonNullAssertion: Forbidden non-null assertion
		const lastCall = fetchMock.mock.calls.at(-1)!;
		const lastUrl = lastCall[0] as string;
		const lastInit = lastCall[1] as RequestInit;

		expect(lastUrl.startsWith(`${API_URL}/search`)).toBe(true);
		expect(lastInit).toEqual(
			expect.objectContaining({
				method: "GET",
				headers: expect.objectContaining({
					Authorization: "Bearer mock-access-token",
				}),
			}),
		);

		expect(result).toEqual({
			tracks: { items: [{ name: "Fake Track" }] },
			artists: { items: [{ name: "Fake Artist" }] },
			albums: { items: [{ name: "Fake Album" }] },
			playlists: { items: [{ name: "Fake Playlist" }] },
		});
	});

	it("should get an artist by ID", async () => {
		const artist = await spotify.get<{ name: string }>("/artists/test-id");

		expect(fetchMock).toHaveBeenCalledWith(
			`${API_URL}/artists/test-id`,
			expect.objectContaining({
				method: "GET",
				headers: expect.objectContaining({
					Authorization: "Bearer mock-access-token",
				}),
			}),
		);

		expect(artist).toEqual({ name: "Test Artist" });
	});
});
