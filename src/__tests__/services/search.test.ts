import { SearchService } from "../../services/search.js";
import { SpotifyClient } from "../../spotifyClient.js";
import { CLIENT_ID, CLIENT_SECRET } from "../credentials.js";

describe("search service", () => {
	let searchService: SearchService;
	let spotifyClient: SpotifyClient;

	beforeEach(() => {
		spotifyClient = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);
		searchService = new SearchService(spotifyClient);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should return a search result", async () => {
		const query = "Promises by Calvin Harris";
		const type = "track";
		await searchService.search(query, type);
	});

	it("should search for artists", async () => {
		const query = "The Beatles";
		const type = "artist";
		const response = await searchService.search(query, type);
		expect(response).toBeDefined();
		expect(response?.artists?.items.length).toBeGreaterThan(0);
	});

	it("should search for albums", async () => {
		const query = "Abbey Road";
		const type = "album";
		const response = await searchService.search(query, type);
		expect(response).toBeDefined();
		expect(response?.albums?.items.length).toBeGreaterThan(0);
	});

	it("should search for tracks", async () => {
		const query = "Hey Jude";
		const type = "track";
		const response = await searchService.search(query, type);
		expect(response).toBeDefined();
		expect(response.tracks?.items.length).toBeGreaterThan(0);
	});

	it("should search for playlists", async () => {
		const query = "Chill Vibes";
		const type = "playlist";
		const response = await searchService.search(query, type);
		expect(response).toBeDefined();
		expect(response.playlists?.items.length).toBeGreaterThan(0);
	});
});
