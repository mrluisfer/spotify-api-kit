import { SpotifyClient } from "../../SpotifyClient";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  SPOTIFY_TRACK_ID,
} from "../../utils/constants";
import { getTrack } from "../../services/tracks";
import { trackMock } from "../../__mocks__/track.mock";

describe("tracks service", () => {
  beforeEach(() => {
    SpotifyClient.init(CLIENT_ID!, CLIENT_SECRET!);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get track", async () => {
    const result = await getTrack(SPOTIFY_TRACK_ID);
    expect(result.id).toEqual(trackMock.id);
  });
});
