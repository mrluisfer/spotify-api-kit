import { CLIENT_ID, CLIENT_SECRET } from '../../utils/constants';
import { SpotifyClient } from '../../SpotifyClient';

describe('player service', () => {
  let spotifyClient: SpotifyClient;
  beforeEach(() => {
    SpotifyClient.init(CLIENT_ID!, CLIENT_SECRET!);
    spotifyClient = SpotifyClient.getInstance();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get current playing track', async () => {
    const result = await spotifyClient.player.getCurrentPlayingTrack();
    console.log(result);
  });
});
