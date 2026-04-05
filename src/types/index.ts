export type AccessToken = {
	access_token: string;
	token_type: string;
	expires_in: number;
};

export interface RefreshToken extends AccessToken {
	refresh_token: string;
	scope: string;
}

export type SpotifyId = string;

export type ExternalUrls = {
	spotify: string;
};

export type Followers = {
	href: string | null;
	total: number;
};

export type Image = {
	url: string;
	height: number | null;
	width: number | null;
};

export type Artist = {
	external_urls: ExternalUrls;
	href: string;
	id: SpotifyId;
	name: string;
	type: "artist";
	uri: string;
	followers?: Followers;
	genres?: string[];
	images?: Image[];
	popularity?: number;
};

export type Album = {
	album_type: "album" | "single" | "compilation";
	artists: Artist[];
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: SpotifyId;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: "year" | "month" | "day";
	total_tracks: number;
	type: "album";
	uri: string;
};

export type ExternalIds = {
	isrc: string;
};

export type SpotifyTrack = {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls;
	href: string;
	id: SpotifyId;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	type: "track";
	uri: string;
};

export type SpotifySeveralTracks = {
	tracks: SpotifyTrack[];
};

export type Context = {
	external_urls: ExternalUrls;
	href: string;
	type: string;
	uri: string;
};

export type PlayingTrack = SpotifyTrack & {
	currently_playing_type: string;
	actions: {
		disallows: {
			resuming: boolean;
		};
	};
	is_playing: boolean;
	progress_ms: number;
	timestamp: number;
	context: Context;
};

export type SpotifyPlaylist = {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: SpotifyId;
	images: (Image & { height: number | null; width: number | null })[];
	name: string;
	owner: {
		display_name: string;
		external_urls: ExternalUrls;
		href: string;
		id: SpotifyId;
		type: string;
		uri: string;
	};
	primary_color: string | null;
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		items: {
			added_at: string;
			added_by: {
				external_urls: ExternalUrls;
				href: string;
				id: SpotifyId;
				type: string;
				uri: string;
			};
			is_local: boolean;
			track: SpotifyTrack & {
				episode: boolean;
				track: boolean;
			};
			primary_color: string | null;
			video_thumbnail: {
				url: string | null;
			};
		}[];
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
	};
	type: string;
	uri: string;
};

export type PaginatedResponse<T> = {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: T[];
};

export type CursorPaginatedResponse<T> = {
	href: string;
	limit: number;
	next: string | null;
	cursors: { after: string | null; before?: string | null };
	total?: number;
	items: T[];
};

export type SpotifySearchResponse = {
	tracks?: PaginatedResponse<SpotifyTrack>;
	artists?: PaginatedResponse<Artist>;
	albums?: PaginatedResponse<Album>;
	playlists?: PaginatedResponse<SpotifyPlaylist>;
};

// ---- Audio Features ----

export type AudioFeatures = {
	acousticness: number;
	analysis_url: string;
	danceability: number;
	duration_ms: number;
	energy: number;
	id: SpotifyId;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	track_href: string;
	type: "audio_features";
	uri: string;
	valence: number;
};

export type SeveralAudioFeatures = {
	audio_features: AudioFeatures[];
};

// ---- User Profile ----

export type SpotifyUserProfile = {
	country?: string;
	display_name: string | null;
	email?: string;
	explicit_content?: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: SpotifyId;
	images: Image[];
	product?: string;
	type: "user";
	uri: string;
};

// ---- Saved Items ----

export type SavedTrack = {
	added_at: string;
	track: SpotifyTrack;
};

export type SavedAlbum = {
	added_at: string;
	album: Album & {
		tracks: PaginatedResponse<SpotifyTrack>;
	};
};

// ---- Player / Playback ----

export type SpotifyDevice = {
	id: string | null;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number | null;
	supports_volume: boolean;
};

export type PlaybackState = {
	device: SpotifyDevice;
	repeat_state: "off" | "track" | "context";
	shuffle_state: boolean;
	context: Context | null;
	timestamp: number;
	progress_ms: number | null;
	is_playing: boolean;
	item: SpotifyTrack | null;
	currently_playing_type: "track" | "episode" | "ad" | "unknown";
};

export type SpotifyQueue = {
	currently_playing: SpotifyTrack | null;
	queue: SpotifyTrack[];
};

export type PlayHistory = {
	track: SpotifyTrack;
	played_at: string;
	context: Context | null;
};

export type RecentlyPlayed = CursorPaginatedResponse<PlayHistory>;

// ---- Categories / Browse ----

export type SpotifyCategory = {
	href: string;
	icons: Image[];
	id: string;
	name: string;
};

export type FeaturedPlaylists = {
	message: string;
	playlists: PaginatedResponse<SpotifyPlaylist>;
};

export type NewReleases = {
	albums: PaginatedResponse<Album>;
};
