import type { SpotifyClient } from "../SpotifyClient";
import type { SpotifyId, SpotifyPlaylist } from "../types";

export class PlaylistsService {
	private spotifyClient: SpotifyClient;

	constructor(spotifyClient: SpotifyClient) {
		this.spotifyClient = spotifyClient;
	}

	/**
	 * Get a playlist owned by a Spotify user.
	 */
	public async getPlaylist(id: SpotifyId) {
		const response = await this.spotifyClient.fetchFromSpotify<SpotifyPlaylist>(
			`/playlists/${id}`,
		);
		if (!response) {
			throw new Error("Failed to fetch playlist");
		}

		return response;
	}
}
