import { SpotifyClient } from "../../SpotifyClient";
import { playlistMock } from "../../__mocks__/playlist.mock";
import { CLIENT_ID, CLIENT_SECRET } from "../../utils/constants";

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
