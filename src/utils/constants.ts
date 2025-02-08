import * as dotenv from '@dotenvx/dotenvx';
dotenv.config();

export const API_URL = 'https://api.spotify.com/v1';
export const API_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export const SPOTIFY_ARTIST_ID = '2jku7tDXc6XoB6MO2hFuqg';
export const SPOTIFY_TRACK_ID = '3azJifCSqg9fRij2yKIbWz';

const env = process
  ? process.env
  : {
      SPOTIFY_CLIENT_ID: '',
      SPOTIFY_CLIENT_SECRET: ''
    };
export const CLIENT_ID = env?.SPOTIFY_CLIENT_ID || '';
export const CLIENT_SECRET = env?.SPOTIFY_CLIENT_SECRET || '';
