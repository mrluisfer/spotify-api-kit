import { SpotifyClient } from "../../SpotifyClient.js";
import { artistMock } from "../../__mocks__/artist.mock.js";
import { SPOTIFY_ARTIST_ID } from "../../utils/constants.js";
import { CLIENT_ID, CLIENT_SECRET } from "../credentials.js";

describe("artists service", () => {
	let spotifyClient: SpotifyClient;

	beforeEach(() => {
		spotifyClient = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should get artist", async () => {
		const result = await spotifyClient.artists.getArtist(SPOTIFY_ARTIST_ID);
		expect(result.id).toEqual(artistMock.id);
	});
});
