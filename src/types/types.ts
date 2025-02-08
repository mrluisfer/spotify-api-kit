export type AccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export interface RefreshToken extends AccessToken {
  refresh_token: string;
  scope: string;
}

/**
 * The base-62 identifier found at the end of the Spotify URI (see above) for an artist, track, album, playlist, etc. Unlike a Spotify URI, a Spotify ID does not clearly identify the type of resource; that information is provided elsewhere in the call.
 *
 * @example: 6rqhFgbbKwnb9MLmUQDhG6
 */
export type SpotifyId = string;

export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type AlbumImage = {
  url: string;
  width: number;
  height: number;
};

export type Album = {
  album_type: 'album' | 'single' | 'compilation';
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  total_tracks: number;
  type: 'album';
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
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
};

export type SpotifyPlayingTrack = {
  timestamp: number;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      resuming: boolean;
    };
  };
  is_playing: boolean;
};

export type SpotifyScopes = {
  Images: 'ugc-image-upload';
  SpotifyConnect:
    | 'user-read-playback-state'
    | 'user-modify-playback-state'
    | 'user-read-currently-playing';
  Playback: 'app-remote-control' | 'streaming';
  Playlists:
    | 'playlist-read-private'
    | 'playlist-read-collaborative'
    | 'playlist-modify-private'
    | 'playlist-modify-public';
  Follow: 'user-follow-modify' | 'user-follow-read';
  ListeningHistory:
    | 'user-read-playback-position'
    | 'user-top-read'
    | 'user-read-recently-played';
  Library: 'user-library-modify' | 'user-library-read';
  Users: 'user-read-email' | 'user-read-private';
  OpenAccess:
    | 'user-soa-link'
    | 'user-soa-unlink'
    | 'soa-manage-entitlements'
    | 'soa-manage-partner'
    | 'soa-create-partner';
};
