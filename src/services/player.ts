import type { SpotifyClient } from "../SpotifyClient";
import type { PlayingTrack } from "../types";
import { ApiErrors } from "../utils/errors";

export class PlayerService {
	private spotifyClient: SpotifyClient;

	constructor(spotifyClient: SpotifyClient) {
		this.spotifyClient = spotifyClient;
	}

	public async getCurrentPlayingTrack() {
		const response = await this.spotifyClient.fetchFromSpotify<PlayingTrack>(
			"/me/player/currently-playing",
		);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}
		return response;
	}
}
