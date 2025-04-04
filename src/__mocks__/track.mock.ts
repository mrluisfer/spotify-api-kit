import type { SpotifySeveralTracks, SpotifyTrack } from "../types";
import { availableMarkets } from "./availableMarkets.mock";

export const trackMock: SpotifyTrack = {
	album: {
		album_type: "album",
		artists: [
			{
				external_urls: {
					spotify: "https://open.spotify.com/artist/2jku7tDXc6XoB6MO2hFuqg",
				},
				href: "https://api.spotify.com/v1/artists/2jku7tDXc6XoB6MO2hFuqg",
				id: "2jku7tDXc6XoB6MO2hFuqg",
				name: "Tory Lanez",
				type: "artist",
				uri: "spotify:artist:2jku7tDXc6XoB6MO2hFuqg",
			},
		],
		available_markets: availableMarkets,
		external_urls: {
			spotify: "https://open.spotify.com/album/5Gm2XKBgnlzd6qTi7LE1z2",
		},
		href: "https://api.spotify.com/v1/albums/5Gm2XKBgnlzd6qTi7LE1z2",
		id: "5Gm2XKBgnlzd6qTi7LE1z2",
		images: [
			{
				url: "https://i.scdn.co/image/ab67616d0000b2730c5f23cbf0b1ab7e37d0dc67",
				width: 640,
				height: 640,
			},
			{
				url: "https://i.scdn.co/image/ab67616d00001e020c5f23cbf0b1ab7e37d0dc67",
				width: 300,
				height: 300,
			},
			{
				url: "https://i.scdn.co/image/ab67616d000048510c5f23cbf0b1ab7e37d0dc67",
				width: 64,
				height: 64,
			},
		],
		name: "Alone At Prom",
		release_date: "2021-12-10",
		release_date_precision: "day",
		total_tracks: 11,
		type: "album",
		uri: "spotify:album:5Gm2XKBgnlzd6qTi7LE1z2",
	},
	artists: [
		{
			external_urls: {
				spotify: "https://open.spotify.com/artist/2jku7tDXc6XoB6MO2hFuqg",
			},
			href: "https://api.spotify.com/v1/artists/2jku7tDXc6XoB6MO2hFuqg",
			id: "2jku7tDXc6XoB6MO2hFuqg",
			name: "Tory Lanez",
			type: "artist",
			uri: "spotify:artist:2jku7tDXc6XoB6MO2hFuqg",
		},
	],
	available_markets: availableMarkets,
	disc_number: 1,
	duration_ms: 226466,
	explicit: false,
	external_ids: {
		isrc: "QZTGW2100275",
	},
	external_urls: {
		spotify: "https://open.spotify.com/track/3azJifCSqg9fRij2yKIbWz",
	},
	href: "https://api.spotify.com/v1/tracks/3azJifCSqg9fRij2yKIbWz",
	id: "3azJifCSqg9fRij2yKIbWz",
	is_local: false,
	name: "The Color Violet",
	popularity: 83,
	preview_url: null,
	track_number: 4,
	type: "track",
	uri: "spotify:track:3azJifCSqg9fRij2yKIbWz",
};

export const severalTracksMock: SpotifySeveralTracks = {
	tracks: [
		trackMock,
		{
			album: {
				album_type: "album",
				artists: [
					{
						external_urls: {
							spotify: "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI",
						},
						href: "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
						id: "12Chz98pHFMPJEknJQMWvI",
						name: "Muse",
						type: "artist",
						uri: "spotify:artist:12Chz98pHFMPJEknJQMWvI",
					},
				],
				available_markets: availableMarkets,
				external_urls: {
					spotify: "https://open.spotify.com/album/0lw68yx3MhKflWFqCsGkIs",
				},
				href: "https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs",
				id: "0lw68yx3MhKflWFqCsGkIs",
				images: [
					{
						url: "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
						width: 640,
						height: 640,
					},
					{
						url: "https://i.scdn.co/image/ab67616d00001e0228933b808bfb4cbbd0385400",
						width: 300,
						height: 300,
					},
					{
						url: "https://i.scdn.co/image/ab67616d0000485128933b808bfb4cbbd0385400",
						width: 64,
						height: 64,
					},
				],
				name: "Black Holes and Revelations",
				release_date: "2006-06-19",
				release_date_precision: "day",
				total_tracks: 12,
				type: "album",
				uri: "spotify:album:0lw68yx3MhKflWFqCsGkIs",
			},
			artists: [
				{
					external_urls: {
						spotify: "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI",
					},
					href: "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
					id: "12Chz98pHFMPJEknJQMWvI",
					name: "Muse",
					type: "artist",
					uri: "spotify:artist:12Chz98pHFMPJEknJQMWvI",
				},
			],
			available_markets: availableMarkets,
			disc_number: 1,
			duration_ms: 366213,
			explicit: false,
			external_ids: {
				isrc: "GBAHT0500600",
			},
			external_urls: {
				spotify: "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P",
			},
			href: "https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P",
			id: "7ouMYWpwJ422jRcDASZB7P",
			is_local: false,
			name: "Knights of Cydonia",
			popularity: 65,
			preview_url: null,
			track_number: 11,
			type: "track",
			uri: "spotify:track:7ouMYWpwJ422jRcDASZB7P",
		},
	],
};
