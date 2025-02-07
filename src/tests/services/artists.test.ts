import { artistMock } from "../../__mocks__/artist.mock";
import { getArtist } from "../../services/artists";
import { SpotifyClient } from "../../SpotifyClient";
import { CLIENT_ID, CLIENT_SECRET, SPOTIFY_ARTIST_ID } from "../../utils/constants";

describe("artists service", () => {
  let spotify: SpotifyClient;

  beforeEach(() => {
    spotify = SpotifyClient.init(CLIENT_ID!, CLIENT_SECRET!);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get artist", async () => {
    // (fetchFromSpotify as jest.Mock).mockResolvedValue(artistMock);

    const result = await getArtist(SPOTIFY_ARTIST_ID);
    expect(result.id).toEqual(artistMock.id);
  });
});