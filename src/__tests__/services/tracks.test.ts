import { SpotifyClient } from "../../SpotifyClient";
import { CLIENT_ID, CLIENT_SECRET, SPOTIFY_TRACK_ID } from "../../utils/constants";
import { trackMock } from "../../__mocks__/track.mock";

describe("tracks service", () => {
  let spotifyClient: SpotifyClient;
  beforeEach(() => {
    SpotifyClient.init(CLIENT_ID!, CLIENT_SECRET!);
    spotifyClient = SpotifyClient.getInstance();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get track", async () => {
    const result = await spotifyClient.tracks.getTrack(SPOTIFY_TRACK_ID);
    expect(result.id).toEqual(trackMock.id);
  });
});
