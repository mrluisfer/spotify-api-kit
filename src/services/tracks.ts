import type {
	AudioFeatures,
	SeveralAudioFeatures,
	SpotifyId,
	SpotifySeveralTracks,
	SpotifyTrack,
} from "../types/index.js";
import { BaseService } from "./base-service.js";

export class TracksService extends BaseService {
	/**
	 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-track
	 */
	public async getTrack(id: SpotifyId, market?: string): Promise<SpotifyTrack> {
		const query = market ? `?market=${market}` : "";
		return this.get<SpotifyTrack>(`/tracks/${id}${query}`);
	}

	/**
	 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
	 * Maximum: 50 IDs.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
	 */
	public async getSeveralTracks(
		ids: SpotifyId[],
		market?: string,
	): Promise<SpotifySeveralTracks> {
		const params = new URLSearchParams({ ids: ids.join(",") });
		if (market) params.set("market", market);
		return this.get<SpotifySeveralTracks>(`/tracks?${params.toString()}`);
	}

	/**
	 * Get audio feature information for a single track.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-audio-features
	 */
	public async getAudioFeatures(id: SpotifyId): Promise<AudioFeatures> {
		return this.get<AudioFeatures>(`/audio-features/${id}`);
	}

	/**
	 * Get audio features for multiple tracks. Maximum: 100 IDs.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
	 */
	public async getSeveralAudioFeatures(
		ids: SpotifyId[],
	): Promise<SeveralAudioFeatures> {
		return this.get<SeveralAudioFeatures>(
			`/audio-features?ids=${ids.join(",")}`,
		);
	}

	/**
	 * Check if one or more tracks is already saved in the current user's library.
	 * Requires `user-library-read` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
	 */
	public async checkSavedTracks(ids: SpotifyId[]): Promise<boolean[]> {
		return this.get<boolean[]>(`/me/tracks/contains?ids=${ids.join(",")}`);
	}

	/**
	 * Save one or more tracks to the current user's library.
	 * Requires `user-library-modify` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
	 */
	public async saveTracks(ids: SpotifyId[]): Promise<void> {
		return this.put("/me/tracks", { ids });
	}

	/**
	 * Remove one or more tracks from the current user's library.
	 * Requires `user-library-modify` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
	 */
	public async removeSavedTracks(ids: SpotifyId[]): Promise<void> {
		return this.del("/me/tracks", { ids });
	}

	/**
	 * Get recommendations based on seed artists, tracks, and genres.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-recommendations
	 */
	public async getRecommendations(options: {
		seed_artists?: SpotifyId[];
		seed_genres?: string[];
		seed_tracks?: SpotifyId[];
		limit?: number;
		market?: string;
		[key: string]: unknown;
	}): Promise<{ tracks: SpotifyTrack[]; seeds: unknown[] }> {
		const params = new URLSearchParams();
		if (options.seed_artists?.length) {
			params.set("seed_artists", options.seed_artists.join(","));
		}
		if (options.seed_genres?.length) {
			params.set("seed_genres", options.seed_genres.join(","));
		}
		if (options.seed_tracks?.length) {
			params.set("seed_tracks", options.seed_tracks.join(","));
		}
		if (options.limit) params.set("limit", String(options.limit));
		if (options.market) params.set("market", options.market);

		// Tuneable attributes (min_*, max_*, target_*)
		for (const [key, value] of Object.entries(options)) {
			if (
				key.startsWith("min_") ||
				key.startsWith("max_") ||
				key.startsWith("target_")
			) {
				params.set(key, String(value));
			}
		}

		return this.get(`/recommendations?${params.toString()}`);
	}
}
