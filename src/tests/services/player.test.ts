import { CLIENT_ID, CLIENT_SECRET } from "../../utils/constants";
import { SpotifyClient } from "../../SpotifyClient";
import { getCurrentPlayingTrack } from "../../services/player";

describe("player service", () => {
  beforeEach(() => {
    SpotifyClient.init(CLIENT_ID!, CLIENT_SECRET!);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get current playing track", async () => {
    const result = await getCurrentPlayingTrack();
    console.log(result);
  });
});
