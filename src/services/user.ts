import type {
	Artist,
	CursorPaginatedResponse,
	PaginatedResponse,
	SavedAlbum,
	SavedTrack,
	SpotifyId,
	SpotifyTrack,
	SpotifyUserProfile,
} from "../types/index.js";
import { BaseService } from "./base-service.js";

export class UserService extends BaseService {
	/**
	 * Get detailed profile information about the current user.
	 * Requires `user-read-private` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
	 */
	public async me(): Promise<SpotifyUserProfile> {
		return this.get<SpotifyUserProfile>("/me");
	}

	/**
	 * Get public profile information about a Spotify user.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-users-profile
	 */
	public async getProfile(userId: SpotifyId): Promise<SpotifyUserProfile> {
		return this.get<SpotifyUserProfile>(`/users/${userId}`);
	}

	/**
	 * Get the current user's top artists or tracks.
	 * Requires `user-top-read` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
	 */
	public async getTopItems<T extends "artists" | "tracks">(
		type: T,
		options: {
			time_range?: "short_term" | "medium_term" | "long_term";
			limit?: number;
			offset?: number;
		} = {},
	): Promise<PaginatedResponse<T extends "artists" ? Artist : SpotifyTrack>> {
		const params = new URLSearchParams();
		if (options.time_range) params.set("time_range", options.time_range);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/me/top/${type}${query ? `?${query}` : ""}`);
	}

	/**
	 * Get the current user's saved tracks.
	 * Requires `user-library-read` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
	 */
	public async getSavedTracks(
		options: { market?: string; limit?: number; offset?: number } = {},
	): Promise<PaginatedResponse<SavedTrack>> {
		const params = new URLSearchParams();
		if (options.market) params.set("market", options.market);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/me/tracks${query ? `?${query}` : ""}`);
	}

	/**
	 * Get the current user's saved albums.
	 * Requires `user-library-read` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
	 */
	public async getSavedAlbums(
		options: { market?: string; limit?: number; offset?: number } = {},
	): Promise<PaginatedResponse<SavedAlbum>> {
		const params = new URLSearchParams();
		if (options.market) params.set("market", options.market);
		if (options.limit) params.set("limit", String(options.limit));
		if (options.offset) params.set("offset", String(options.offset));
		const query = params.toString();
		return this.get(`/me/albums${query ? `?${query}` : ""}`);
	}

	/**
	 * Get the current user's followed artists.
	 * Requires `user-follow-read` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-followed
	 */
	public async getFollowedArtists(
		options: { limit?: number; after?: string } = {},
	): Promise<{ artists: CursorPaginatedResponse<Artist> }> {
		const params = new URLSearchParams({ type: "artist" });
		if (options.limit) params.set("limit", String(options.limit));
		if (options.after) params.set("after", options.after);
		return this.get(`/me/following?${params.toString()}`);
	}

	/**
	 * Add the current user as a follower of one or more artists.
	 * Requires `user-follow-modify` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
	 */
	public async followArtists(ids: SpotifyId[]): Promise<void> {
		return this.put("/me/following?type=artist", { ids });
	}

	/**
	 * Remove the current user as a follower of one or more artists.
	 * Requires `user-follow-modify` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
	 */
	public async unfollowArtists(ids: SpotifyId[]): Promise<void> {
		return this.del("/me/following?type=artist", { ids });
	}

	/**
	 * Check if the current user follows one or more artists.
	 * Requires `user-follow-read` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
	 */
	public async checkFollowingArtists(ids: SpotifyId[]): Promise<boolean[]> {
		return this.get<boolean[]>(
			`/me/following/contains?type=artist&ids=${ids.join(",")}`,
		);
	}
}
