export type AccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

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
  type: "artist";
  uri: string;
};
