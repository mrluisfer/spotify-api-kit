import { SpotifyClient } from '../SpotifyClient';
import { ApiErrors } from '../utils/errors';
import { SpotifyPlayingTrack } from '../types/types';

export class PlayerService {
  public async getCurrentPlayingTrack() {
    const spotifyClient = SpotifyClient.getInstance();
    const response = await spotifyClient.fetchFromSpotify<SpotifyPlayingTrack>(
      `/me/player/currently-playing`
    );
    if (!response) {
      throw new Error(ApiErrors.FetchData);
    }
    return response;
  }
}
