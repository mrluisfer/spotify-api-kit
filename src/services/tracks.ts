import type { SpotifyClient } from "../SpotifyClient";
import type { SpotifyId, SpotifySeveralTracks, SpotifyTrack } from "../types";
import { ApiErrors } from "../utils/errors";

export class TracksService {
	private spotifyClient: SpotifyClient;

	constructor(spotifyClient: SpotifyClient) {
		this.spotifyClient = spotifyClient;
	}

	/**
	 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-track
	 */
	public async getTrack(id: SpotifyId) {
		const response = await this.spotifyClient.fetchFromSpotify<SpotifyTrack>(
			`/tracks/${id}`,
		);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}

		return response;
	}

	/**
	 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
	 */
	public async getSeveralTracks(ids: Array<SpotifyId>) {
		/**
		 * A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
		 * @example tracks = "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"
		 */
		const tracks = ids.join(",");

		const response =
			await this.spotifyClient.fetchFromSpotify<SpotifySeveralTracks>(
				`/tracks?ids=${tracks}`,
			);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}

		return response;
	}
}
