import { playlistMock } from "../../__mocks__/playlist.mock.js";
import { SpotifyClient } from "../../spotifyClient.js";
import { CLIENT_ID, CLIENT_SECRET } from "../credentials.js";

describe("playlists service", () => {
	let spotifyClient: SpotifyClient;

	beforeEach(() => {
		spotifyClient = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should get playlist", async () => {
		const result = await spotifyClient.playlists.getPlaylist(playlistMock.id);
		expect(result.id).toEqual(playlistMock.id);
		expect(result.description).toEqual(playlistMock.description);
	});
});
