import type { SpotifyClient } from "../spotifyClient.js";
import type { SpotifySearchResponse } from "../types/index.js";

export class SearchService {
	private spotifyClient: SpotifyClient;

	constructor(spotifyClient: SpotifyClient) {
		this.spotifyClient = spotifyClient;
	}

	/**
	 * Search for artists, albums, tracks, or playlists.
	 * @param query The search query.
	 * @param type The type of item to search for (artist, album, track, playlist).
	 * @param limit The maximum number of items to return (optional).
	 * @param offset The index of the first item to return (optional).
	 * @param market The market to search in (optional) - e.g., "US", "GB". You can read more about it here: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
	 */
	public async search(
		query: string,
		type: "artist" | "album" | "track" | "playlist",
		limit?: number,
		offset?: number,
		market?: string,
	) {
		const response: SpotifySearchResponse =
			await this.spotifyClient.fetchFromSpotify(
				`/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit || 20}&offset=${offset || 0}&market=${market || ""}`,
			);

		if (!response) {
			throw new Error("Failed to fetch search results");
		}

		return response;
	}
}
