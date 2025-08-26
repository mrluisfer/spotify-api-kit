import type { Artist, SpotifyId } from "../types/index.js";
import { ApiErrors } from "../utils/errors.js";
import { BaseService } from "./base-service.js";

export class ArtistsService extends BaseService {
	// reference: https://developer.spotify.com/documentation/web-api/reference/get-an-artist
	public async getArtist(id: SpotifyId) {
		const response = await this.get<Artist>(`/artists/${id}`);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}
		return response;
	}

	// reference: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
	public async getTopTracks(id: SpotifyId, market = "US") {
		const response = await this.get(
			`/artists/${id}/top-tracks?market=${market}`,
		);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}
		return response;
	}
}
