import { ApiErrors } from "../utils/errors";
import { type SpotifyArtist, type SpotifyId } from "../types/types";
import { SpotifyClient } from "../SpotifyClient";

export class ArtistsService {
  private spotifyClient: SpotifyClient;

  constructor(spotifyClient: SpotifyClient) {
    this.spotifyClient = spotifyClient;
  }

  // reference: https://developer.spotify.com/documentation/web-api/reference/get-an-artist
  public async getArtist(id: SpotifyId) {
    const response = await this.spotifyClient.fetchFromSpotify<SpotifyArtist>(`/artists/${id}`);
    if (!response) {
      throw new Error(ApiErrors.FetchData);
    }
    return response;
  }
}
