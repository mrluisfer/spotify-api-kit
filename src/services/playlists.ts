import type {
	FeaturedPlaylists,
	PaginatedResponse,
	SpotifyCategory,
	SpotifyId,
	SpotifyPlaylist,
} from "../types/index.js";
import { BaseService } from "./base-service.js";

export class PlaylistsService extends BaseService {
	/**
	 * Get a playlist owned by a Spotify user.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-playlist
	 */
	public async getPlaylist(
		id: SpotifyId,
		market?: string,
	): Promise<SpotifyPlaylist> {
		const query = market ? `?market=${market}` : "";
		return this.get<SpotifyPlaylist>(`/playlists/${id}${query}`);
	}

	/**
	 * Get full details of the items of a playlist.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
	 */
	public async getPlaylistTracks(
		id: SpotifyId,
		options: { market?: string; limit?: number; offset?: number } = {},
	): Promise<PaginatedResponse<SpotifyPlaylist["tracks"]["items"][number]>> {
		const params = new URLSearchParams();
		if (options.market) params.set("market", options.market);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/playlists/${id}/tracks${query ? `?${query}` : ""}`);
	}

	/**
	 * Get a list of the playlists owned or followed by the current user.
	 * Requires `playlist-read-private` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
	 */
	public async getCurrentUserPlaylists(
		options: { limit?: number; offset?: number } = {},
	): Promise<PaginatedResponse<SpotifyPlaylist>> {
		const params = new URLSearchParams();
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/me/playlists${query ? `?${query}` : ""}`);
	}

	/**
	 * Get a list of the playlists owned or followed by a Spotify user.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
	 */
	public async getUserPlaylists(
		userId: SpotifyId,
		options: { limit?: number; offset?: number } = {},
	): Promise<PaginatedResponse<SpotifyPlaylist>> {
		const params = new URLSearchParams();
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/users/${userId}/playlists${query ? `?${query}` : ""}`);
	}

	/**
	 * Get a list of Spotify featured playlists.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
	 */
	public async getFeaturedPlaylists(
		options: { locale?: string; limit?: number; offset?: number } = {},
	): Promise<FeaturedPlaylists> {
		const params = new URLSearchParams();
		if (options.locale) params.set("locale", options.locale);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/browse/featured-playlists${query ? `?${query}` : ""}`);
	}

	/**
	 * Get a list of Spotify playlists tagged with a particular category.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
	 */
	public async getCategoryPlaylists(
		categoryId: string,
		options: { limit?: number; offset?: number } = {},
	): Promise<FeaturedPlaylists> {
		const params = new URLSearchParams();
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(
			`/browse/categories/${categoryId}/playlists${query ? `?${query}` : ""}`,
		);
	}

	/**
	 * Get a single category used to tag items in Spotify.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-a-category
	 */
	public async getCategory(
		categoryId: string,
		locale?: string,
	): Promise<SpotifyCategory> {
		const query = locale ? `?locale=${locale}` : "";
		return this.get(`/browse/categories/${categoryId}${query}`);
	}

	/**
	 * Get a list of categories used to tag items in Spotify.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-categories
	 */
	public async getCategories(
		options: { locale?: string; limit?: number; offset?: number } = {},
	): Promise<{ categories: PaginatedResponse<SpotifyCategory> }> {
		const params = new URLSearchParams();
		if (options.locale) params.set("locale", options.locale);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/browse/categories${query ? `?${query}` : ""}`);
	}
}
