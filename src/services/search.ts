import type { SpotifySearchResponse } from "../types/index.js";
import { BaseService } from "./base-service.js";

type SearchType =
	| "artist"
	| "album"
	| "track"
	| "playlist"
	| "show"
	| "episode";

export class SearchService extends BaseService {
	/**
	 * Search for artists, albums, tracks, playlists, shows, or episodes.
	 * Supports searching for multiple types at once by passing an array.
	 * @param query The search query.
	 * @param type The type(s) of item to search for.
	 * @param options Optional parameters: limit, offset, market, include_external.
	 * @link https://developer.spotify.com/documentation/web-api/reference/search
	 */
	public async search(
		query: string,
		type: SearchType | SearchType[],
		options: {
			limit?: number;
			offset?: number;
			market?: string;
			include_external?: "audio";
		} = {},
	): Promise<SpotifySearchResponse> {
		const params = new URLSearchParams({
			q: query,
			type: Array.isArray(type) ? type.join(",") : type,
		});
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		if (options.market) params.set("market", options.market);
		if (options.include_external) {
			params.set("include_external", options.include_external);
		}

		return this.get<SpotifySearchResponse>(`/search?${params.toString()}`);
	}
}
