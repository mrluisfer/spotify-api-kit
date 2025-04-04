import { availableMarkets } from "./availableMarkets.mock";

export const currentPlayingTrack = {
	timestamp: 1738980021249,
	context: {
		external_urls: {
			spotify: "https://open.spotify.com/collection/tracks",
		},
		href: "https://api.spotify.com/v1/me/tracks",
		type: "collection",
		uri: "spotify:user:lolesuncrak:collection",
	},
	progress_ms: 4430,
	item: {
		album: {
			album_type: "album",
			artists: [
				{
					external_urls: {
						spotify: "https://open.spotify.com/artist/2Cy7KBSkqu7otJfuMTWT7Y",
					},
					href: "https://api.spotify.com/v1/artists/2Cy7KBSkqu7otJfuMTWT7Y",
					id: "2Cy7KBSkqu7otJfuMTWT7Y",
					name: "Camilo Sesto",
					type: "artist",
					uri: "spotify:artist:2Cy7KBSkqu7otJfuMTWT7Y",
				},
			],
			available_markets: availableMarkets,
			external_urls: {
				spotify: "https://open.spotify.com/album/4AxRFDkSlRWzCpyaO107UJ",
			},
			href: "https://api.spotify.com/v1/albums/4AxRFDkSlRWzCpyaO107UJ",
			id: "4AxRFDkSlRWzCpyaO107UJ",
			images: [
				{
					height: 640,
					url: "https://i.scdn.co/image/ab67616d0000b2737c212ea9e502480127a718ad",
					width: 640,
				},
				{
					height: 300,
					url: "https://i.scdn.co/image/ab67616d00001e027c212ea9e502480127a718ad",
					width: 300,
				},
				{
					height: 64,
					url: "https://i.scdn.co/image/ab67616d000048517c212ea9e502480127a718ad",
					width: 64,
				},
			],
			name: "Camilo",
			release_date: "1974-01-02",
			release_date_precision: "day",
			total_tracks: 10,
			type: "album",
			uri: "spotify:album:4AxRFDkSlRWzCpyaO107UJ",
		},
		artists: [
			{
				external_urls: {
					spotify: "https://open.spotify.com/artist/2Cy7KBSkqu7otJfuMTWT7Y",
				},
				href: "https://api.spotify.com/v1/artists/2Cy7KBSkqu7otJfuMTWT7Y",
				id: "2Cy7KBSkqu7otJfuMTWT7Y",
				name: "Camilo Sesto",
				type: "artist",
				uri: "spotify:artist:2Cy7KBSkqu7otJfuMTWT7Y",
			},
		],
		available_markets: availableMarkets,
		disc_number: 1,
		duration_ms: 249666,
		explicit: false,
		external_ids: {
			isrc: "ES5027400016",
		},
		external_urls: {
			spotify: "https://open.spotify.com/track/1Y7q2zwCBjt9zgIHZ0Ku7J",
		},
		href: "https://api.spotify.com/v1/tracks/1Y7q2zwCBjt9zgIHZ0Ku7J",
		id: "1Y7q2zwCBjt9zgIHZ0Ku7J",
		is_local: false,
		name: "¿Quieres Ser Mi Amante?",
		popularity: 67,
		preview_url: null,
		track_number: 1,
		type: "track",
		uri: "spotify:track:1Y7q2zwCBjt9zgIHZ0Ku7J",
	},
	currently_playing_type: "track",
	actions: {
		disallows: {
			resuming: true,
		},
	},
	is_playing: true,
};
