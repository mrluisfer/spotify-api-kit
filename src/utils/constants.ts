import * as dotenv from "@dotenvx/dotenvx";

dotenv.config();

export const API_URL = "https://api.spotify.com/v1";
export const API_TOKEN_URL = "https://accounts.spotify.com/api/token";

export const SPOTIFY_ARTIST_ID = "2jku7tDXc6XoB6MO2hFuqg";

export const CLIENT_ID =
  process.env.SPOTIFY_CLIENT_ID || "330524c072e14717ab5e29e8b417c42d";
export const CLIENT_SECRET =
  process.env.SPOTIFY_CLIENT_SECRET || "d4e3a238109a4ed18d1a20d382ce0a1c";
