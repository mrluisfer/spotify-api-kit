import { SpotifyClient } from "../../SpotifyClient";
import { artistMock } from "../../__mocks__/artist.mock";
import {
	CLIENT_ID,
	CLIENT_SECRET,
	SPOTIFY_ARTIST_ID,
} from "../../utils/constants";

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
