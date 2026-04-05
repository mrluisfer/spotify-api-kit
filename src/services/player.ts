import type {
	PlaybackState,
	PlayingTrack,
	RecentlyPlayed,
	SpotifyQueue,
} from "../types/index.js";
import { BaseService } from "./base-service.js";

export class PlayerService extends BaseService {
	/**
	 * Get the object currently being played on the user's Spotify account.
	 * Requires `user-read-currently-playing` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
	 */
	public async getCurrentPlayingTrack(market?: string): Promise<PlayingTrack> {
		const query = market ? `?market=${market}` : "";
		return this.get<PlayingTrack>(`/me/player/currently-playing${query}`);
	}

	/**
	 * Get information about the user's current playback state.
	 * Requires `user-read-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
	 */
	public async getPlaybackState(market?: string): Promise<PlaybackState> {
		const query = market ? `?market=${market}` : "";
		return this.get<PlaybackState>(`/me/player${query}`);
	}

	/**
	 * Get tracks from the current user's recently played tracks.
	 * Requires `user-read-recently-played` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-recently-played
	 */
	public async getRecentlyPlayed(
		options: { limit?: number; after?: number; before?: number } = {},
	): Promise<RecentlyPlayed> {
		const params = new URLSearchParams();
		if (options.limit) params.set("limit", String(options.limit));
		if (options.after) params.set("after", String(options.after));
		if (options.before) params.set("before", String(options.before));
		const query = params.toString();
		return this.get<RecentlyPlayed>(
			`/me/player/recently-played${query ? `?${query}` : ""}`,
		);
	}

	/**
	 * Get the list of objects that make up the user's queue.
	 * Requires `user-read-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-queue
	 */
	public async getQueue(): Promise<SpotifyQueue> {
		return this.get<SpotifyQueue>("/me/player/queue");
	}

	/**
	 * Get information about a user's available devices.
	 * Requires `user-read-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices
	 */
	public async getAvailableDevices(): Promise<{
		devices: import("../types/index.js").SpotifyDevice[];
	}> {
		return this.get("/me/player/devices");
	}

	/**
	 * Start or resume playback on the user's active device.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
	 */
	public async play(
		options: {
			device_id?: string;
			context_uri?: string;
			uris?: string[];
			offset?: { position?: number; uri?: string };
			position_ms?: number;
		} = {},
	): Promise<void> {
		const { device_id, ...body } = options;
		const query = device_id ? `?device_id=${device_id}` : "";
		return this.put(`/me/player/play${query}`, body);
	}

	/**
	 * Pause playback on the user's active device.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
	 */
	public async pause(device_id?: string): Promise<void> {
		const query = device_id ? `?device_id=${device_id}` : "";
		return this.put(`/me/player/pause${query}`);
	}

	/**
	 * Skip to the next track in the user's queue.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
	 */
	public async skipToNext(device_id?: string): Promise<void> {
		const query = device_id ? `?device_id=${device_id}` : "";
		return this.post(`/me/player/next${query}`);
	}

	/**
	 * Skip to the previous track in the user's queue.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
	 */
	public async skipToPrevious(device_id?: string): Promise<void> {
		const query = device_id ? `?device_id=${device_id}` : "";
		return this.post(`/me/player/previous${query}`);
	}

	/**
	 * Set the volume for the user's current playback device.
	 * Requires `user-modify-playback-state` scope.
	 * @param volumePercent 0-100
	 * @link https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback
	 */
	public async setVolume(
		volumePercent: number,
		device_id?: string,
	): Promise<void> {
		const params = new URLSearchParams({
			volume_percent: String(volumePercent),
		});
		if (device_id) params.set("device_id", device_id);
		return this.put(`/me/player/volume?${params.toString()}`);
	}

	/**
	 * Toggle shuffle on or off for user's playback.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback
	 */
	public async setShuffle(state: boolean, device_id?: string): Promise<void> {
		const params = new URLSearchParams({ state: String(state) });
		if (device_id) params.set("device_id", device_id);
		return this.put(`/me/player/shuffle?${params.toString()}`);
	}

	/**
	 * Set the repeat mode for the user's playback.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback
	 */
	public async setRepeat(
		state: "track" | "context" | "off",
		device_id?: string,
	): Promise<void> {
		const params = new URLSearchParams({ state });
		if (device_id) params.set("device_id", device_id);
		return this.put(`/me/player/repeat?${params.toString()}`);
	}

	/**
	 * Seeks to the given position in the user's currently playing track.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track
	 */
	public async seek(positionMs: number, device_id?: string): Promise<void> {
		const params = new URLSearchParams({
			position_ms: String(positionMs),
		});
		if (device_id) params.set("device_id", device_id);
		return this.put(`/me/player/seek?${params.toString()}`);
	}

	/**
	 * Add an item to the end of the user's current playback queue.
	 * Requires `user-modify-playback-state` scope.
	 * @link https://developer.spotify.com/documentation/web-api/reference/add-to-queue
	 */
	public async addToQueue(uri: string, device_id?: string): Promise<void> {
		const params = new URLSearchParams({ uri });
		if (device_id) params.set("device_id", device_id);
		return this.post(`/me/player/queue?${params.toString()}`);
	}
}
