import { SpotifyPlaylist } from "../types";
import { availableMarkets } from "./availableMarkets.mock";

export const playlistMock: SpotifyPlaylist = {
  collaborative: false,
  description: "Stop thinking and have a good time listening to the best songs in the world ✨",
  external_urls: {
    spotify: "https://open.spotify.com/playlist/49spccWMHTuffh4NQiR4RN",
  },
  followers: {
    href: null,
    total: 9,
  },
  href: "https://api.spotify.com/v1/playlists/49spccWMHTuffh4NQiR4RN?locale=en-US%2Cen%3Bq%3D0.9%2Ces%3Bq%3D0.8",
  id: "49spccWMHTuffh4NQiR4RN",
  images: [
    {
      height: null,
      url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d3ab77ccc0b00f72d49336c0",
      width: null,
    },
  ],
  name: "Rolitas chidoris 👉👈",
  owner: {
    display_name: "Luis Alvarez",
    external_urls: {
      spotify: "https://open.spotify.com/user/lolesuncrak",
    },
    href: "https://api.spotify.com/v1/users/lolesuncrak",
    id: "lolesuncrak",
    type: "user",
    uri: "spotify:user:lolesuncrak",
  },
  primary_color: null,
  public: true,
  snapshot_id: "AAAFck9R9Z7Kme/lGkbTctRqWBV39IDA",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/49spccWMHTuffh4NQiR4RN/tracks?offset=0&limit=100&locale=en-US,en;q%3D0.9,es;q%3D0.8",
    items: [
      {
        added_at: "2021-08-18T04:37:12Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/lolesuncrak",
          },
          href: "https://api.spotify.com/v1/users/lolesuncrak",
          id: "lolesuncrak",
          type: "user",
          uri: "spotify:user:lolesuncrak",
        },
        is_local: false,
        track: {
          album: {
            album_type: "album",
            total_tracks: 11,
            available_markets: availableMarkets,
            external_urls: {
              spotify: "https://open.spotify.com/album/4xkM0BwLM9H2IUcbYzpcBI",
            },
            href: "https://api.spotify.com/v1/albums/4xkM0BwLM9H2IUcbYzpcBI",
            id: "4xkM0BwLM9H2IUcbYzpcBI",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e028265a736a1eb838ad5a0b921",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d000048518265a736a1eb838ad5a0b921",
                height: 64,
                width: 64,
              },
            ],
            name: "I Love You.",
            release_date: "2013-04-22",
            release_date_precision: "day",
            type: "album",
            uri: "spotify:album:4xkM0BwLM9H2IUcbYzpcBI",
            artists: [
              {
                external_urls: {
                  spotify: "https://open.spotify.com/artist/77SW9BnxLY8rJ0RciFqkHh",
                },
                href: "https://api.spotify.com/v1/artists/77SW9BnxLY8rJ0RciFqkHh",
                id: "77SW9BnxLY8rJ0RciFqkHh",
                name: "The Neighbourhood",
                type: "artist",
                uri: "spotify:artist:77SW9BnxLY8rJ0RciFqkHh",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "https://open.spotify.com/artist/77SW9BnxLY8rJ0RciFqkHh",
              },
              href: "https://api.spotify.com/v1/artists/77SW9BnxLY8rJ0RciFqkHh",
              id: "77SW9BnxLY8rJ0RciFqkHh",
              name: "The Neighbourhood",
              type: "artist",
              uri: "spotify:artist:77SW9BnxLY8rJ0RciFqkHh",
            },
          ],
          available_markets: availableMarkets,
          disc_number: 1,
          duration_ms: 240400,
          explicit: false,
          external_ids: {
            isrc: "USSM11300080",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
          },
          href: "https://api.spotify.com/v1/tracks/2QjOHCTQ1Jl3zawyYOpxh6",
          id: "2QjOHCTQ1Jl3zawyYOpxh6",
          name: "Sweater Weather",
          popularity: 89,
          preview_url: null,
          track_number: 4,
          type: "track",
          uri: "spotify:track:2QjOHCTQ1Jl3zawyYOpxh6",
          is_local: false,
          episode: false,
          track: true,
        },
        primary_color: null,
        video_thumbnail: {
          url: null,
        },
      },
    ],
    limit: 100,
    next: "https://api.spotify.com/v1/playlists/49spccWMHTuffh4NQiR4RN/tracks?offset=100&limit=100&locale=en-US,en;q%3D0.9,es;q%3D0.8",
    offset: 0,
    previous: null,
    total: 1274,
  },
  type: "playlist",
  uri: "spotify:playlist:49spccWMHTuffh4NQiR4RN",
};
