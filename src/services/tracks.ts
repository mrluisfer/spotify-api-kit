import { SpotifyId, SpotifyTrack } from '../types';
import { SpotifyClient } from '../SpotifyClient';
import { ApiErrors } from '../utils/errors';

export class TracksService {
  private spotifyClient: SpotifyClient;

  constructor(spotifyClient: SpotifyClient) {
    this.spotifyClient = spotifyClient;
  }

  // reference: https://developer.spotify.com/documentation/web-api/reference/get-track
  public async getTrack(id: SpotifyId) {
    const response = await this.spotifyClient.fetchFromSpotify<SpotifyTrack>(`/tracks/${id}`);
    if (!response) {
      throw new Error(ApiErrors.FetchData);
    }

    return response;
  }
}
