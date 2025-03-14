import { SpotifyClient } from "../SpotifyClient";
import { ApiErrors } from "../utils/errors";
import { PlayingTrack } from "../types";

export class PlayerService {
  private spotifyClient: SpotifyClient;

  constructor(spotifyClient: SpotifyClient) {
    this.spotifyClient = spotifyClient;
  }

  public async getCurrentPlayingTrack() {
    const response = await this.spotifyClient.fetchFromSpotify<PlayingTrack>(
      `/me/player/currently-playing`,
    );
    if (!response) {
      throw new Error(ApiErrors.FetchData);
    }
    return response;
  }
}
