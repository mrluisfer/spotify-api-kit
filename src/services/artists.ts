import type {
	Album,
	Artist,
	PaginatedResponse,
	SpotifyId,
} from "../types/index.js";
import { BaseService } from "./base-service.js";

export class ArtistsService extends BaseService {
	/**
	 * Get Spotify catalog information for a single artist.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-an-artist
	 */
	public async getArtist(id: SpotifyId): Promise<Artist> {
		return this.get<Artist>(`/artists/${id}`);
	}

	/**
	 * Get Spotify catalog information for several artists based on their Spotify IDs.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
	 */
	public async getSeveralArtists(
		ids: SpotifyId[],
	): Promise<{ artists: Artist[] }> {
		return this.get<{ artists: Artist[] }>(`/artists?ids=${ids.join(",")}`);
	}

	/**
	 * Get Spotify catalog information about an artist's albums.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
	 */
	public async getArtistAlbums(
		id: SpotifyId,
		options: {
			include_groups?: ("album" | "single" | "appears_on" | "compilation")[];
			market?: string;
			limit?: number;
			offset?: number;
		} = {},
	): Promise<PaginatedResponse<Album>> {
		const params = new URLSearchParams();
		if (options.include_groups?.length) {
			params.set("include_groups", options.include_groups.join(","));
		}
		if (options.market) params.set("market", options.market);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));

		const query = params.toString();
		return this.get<PaginatedResponse<Album>>(
			`/artists/${id}/albums${query ? `?${query}` : ""}`,
		);
	}

	/**
	 * Get an artist's top tracks.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
	 */
	public async getTopTracks(id: SpotifyId, market = "US") {
		return this.get(`/artists/${id}/top-tracks?market=${market}`);
	}

	/**
	 * Get Spotify catalog information about artists similar to a given artist.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
	 */
	public async getRelatedArtists(
		id: SpotifyId,
	): Promise<{ artists: Artist[] }> {
		return this.get<{ artists: Artist[] }>(`/artists/${id}/related-artists`);
	}
}
