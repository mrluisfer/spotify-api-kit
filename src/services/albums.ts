import type {
	Album,
	NewReleases,
	PaginatedResponse,
	SpotifyId,
	SpotifyTrack,
} from "../types/index.js";
import { BaseService } from "./base-service.js";

export class AlbumsService extends BaseService {
	/**
	 * Get Spotify catalog information for a single album.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-an-album
	 */
	public async getAlbum(id: SpotifyId, market?: string): Promise<Album> {
		const query = market ? `?market=${market}` : "";
		return this.get<Album>(`/albums/${id}${query}`);
	}

	/**
	 * Get Spotify catalog information for multiple albums.
	 * Maximum: 20 IDs.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
	 */
	public async getSeveralAlbums(
		ids: SpotifyId[],
		market?: string,
	): Promise<{ albums: Album[] }> {
		const params = new URLSearchParams({ ids: ids.join(",") });
		if (market) params.set("market", market);
		return this.get<{ albums: Album[] }>(`/albums?${params.toString()}`);
	}

	/**
	 * Get Spotify catalog information about an album's tracks.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
	 */
	public async getAlbumTracks(
		id: SpotifyId,
		options: { market?: string; limit?: number; offset?: number } = {},
	): Promise<PaginatedResponse<SpotifyTrack>> {
		const params = new URLSearchParams();
		if (options.market) params.set("market", options.market);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get<PaginatedResponse<SpotifyTrack>>(
			`/albums/${id}/tracks${query ? `?${query}` : ""}`,
		);
	}

	/**
	 * Get a list of new album releases featured in Spotify.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-new-releases
	 */
	public async getNewReleases(options: {
		limit?: number;
		offset?: number;
	} = {}): Promise<NewReleases> {
		const params = new URLSearchParams();
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get<NewReleases>(
			`/browse/new-releases${query ? `?${query}` : ""}`,
		);
	}

	/**
	 * Check if one or more albums is already saved in the current user's library.
	 * Requires `user-library-read` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
	 */
	public async checkSavedAlbums(ids: SpotifyId[]): Promise<boolean[]> {
		return this.get<boolean[]>(
			`/me/albums/contains?ids=${ids.join(",")}`,
		);
	}

	/**
	 * Save one or more albums to the current user's library.
	 * Requires `user-library-modify` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/save-albums-user
	 */
	public async saveAlbums(ids: SpotifyId[]): Promise<void> {
		return this.put("/me/albums", { ids });
	}

	/**
	 * Remove one or more albums from the current user's library.
	 * Requires `user-library-modify` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
	 */
	public async removeSavedAlbums(ids: SpotifyId[]): Promise<void> {
		return this.del("/me/albums", { ids });
	}
}
