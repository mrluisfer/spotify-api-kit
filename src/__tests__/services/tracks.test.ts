import { SpotifyClient } from "../../SpotifyClient";
import { severalTracksMock, trackMock } from "../../__mocks__/track.mock";
import {
	CLIENT_ID,
	CLIENT_SECRET,
	SPOTIFY_TRACK_ID,
} from "../../utils/constants";

const SPOTIFY_TRACK_ID_2 = "7ouMYWpwJ422jRcDASZB7P";
describe("tracks service", () => {
	let spotifyClient: SpotifyClient;

	beforeEach(() => {
		spotifyClient = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should get track", async () => {
		const result = await spotifyClient.tracks.getTrack(SPOTIFY_TRACK_ID);
		expect(result.id).toEqual(trackMock.id);
	});

	it("should get several tracks", async () => {
		const ids = [SPOTIFY_TRACK_ID, SPOTIFY_TRACK_ID_2];
		const result = await spotifyClient.tracks.getSeveralTracks(ids);
		expect(result.tracks).toHaveLength(2);
	});

	it("should be the same several tracks as the response", async () => {
		const ids = [SPOTIFY_TRACK_ID, SPOTIFY_TRACK_ID_2];
		const result = await spotifyClient.tracks.getSeveralTracks(ids);
		expect(result.tracks[0].id).toEqual(severalTracksMock.tracks[0].id);
		expect(result.tracks[1].id).toEqual(severalTracksMock.tracks[1].id);
	});
});
