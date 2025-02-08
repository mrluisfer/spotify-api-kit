import { ApiErrors } from '../utils/errors';
import { type SpotifyArtist, type SpotifyId } from '../types/types';
import { SpotifyClient } from '../SpotifyClient';

export class ArtistsService {
  // reference: https://developer.spotify.com/documentation/web-api/reference/get-an-artist
  public async getArtist(id: SpotifyId) {
    const spotifyClient = SpotifyClient.getInstance();
    const response = await spotifyClient.fetchFromSpotify<SpotifyArtist>(
      `/artists/${id}`
    );
    if (!response) {
      throw new Error(ApiErrors.FetchData);
    }
    return response;
  }
}
