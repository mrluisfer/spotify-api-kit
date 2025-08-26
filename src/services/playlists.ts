import type { SpotifyId, SpotifyPlaylist } from "../types/index.js";
import { BaseService } from "./base-service.js";

export class PlaylistsService extends BaseService {
	/**
	 * Get a playlist owned by a Spotify user.
	 */
	public async getPlaylist(id: SpotifyId) {
		const response = await this.get<SpotifyPlaylist>(`/playlists/${id}`);
		if (!response) {
			throw new Error("Failed to fetch playlist");
		}

		return response;
	}
}
