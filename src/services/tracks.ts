import type {
	SpotifyId,
	SpotifySeveralTracks,
	SpotifyTrack,
} from "../types/index.js";
import { ApiErrors } from "../utils/errors.js";
import { BaseService } from "./base-service.js";

export class TracksService extends BaseService {
	/**
	 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-track
	 */
	public async getTrack(id: SpotifyId) {
		const response = await this.get<SpotifyTrack>(`/tracks/${id}`);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}

		return response;
	}

	/**
	 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
	 * @example ids = "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"
	 */
	public async getSeveralTracks(ids: Array<SpotifyId>) {
		/**
		 * A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
		 */
		const tracks = ids.join(",");

		const response = await this.get<SpotifySeveralTracks>(
			`/tracks?ids=${tracks}`,
		);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}

		return response;
	}
}
