import type { SpotifyClient } from "../SpotifyClient";
import type { Artist, SpotifyId } from "../types";
import { ApiErrors } from "../utils/errors";

export class ArtistsService {
	private spotifyClient: SpotifyClient;

	constructor(spotifyClient: SpotifyClient) {
		this.spotifyClient = spotifyClient;
	}

	// reference: https://developer.spotify.com/documentation/web-api/reference/get-an-artist
	public async getArtist(id: SpotifyId) {
		const response = await this.spotifyClient.fetchFromSpotify<Artist>(
			`/artists/${id}`,
		);
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}
		return response;
	}
}
