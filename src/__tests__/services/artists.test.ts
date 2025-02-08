import { artistMock } from "../../__mocks__/artist.mock";
import { SpotifyClient } from "../../SpotifyClient";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  SPOTIFY_ARTIST_ID,
} from "../../utils/constants";

describe("artists service", () => {
  let spotifyClient: SpotifyClient;

  beforeEach(() => {
    SpotifyClient.init(CLIENT_ID!, CLIENT_SECRET!);
    spotifyClient = SpotifyClient.getInstance();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get artist", async () => {
    const result = await spotifyClient.artists.getArtist(SPOTIFY_ARTIST_ID);
    expect(result.id).toEqual(artistMock.id);
  });
});
