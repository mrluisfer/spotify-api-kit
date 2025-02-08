import { SpotifyId, SpotifyTrack } from "../types";
import { SpotifyClient } from "../SpotifyClient";
import { ApiErrors } from "../utils/errors";

// reference: https://developer.spotify.com/documentation/web-api/reference/get-track
export async function getTrack(id: SpotifyId) {
  const spotifyClient = SpotifyClient.getInstance();
  const response = await spotifyClient.fetchFromSpotify<SpotifyTrack>(
    `/tracks/${id}`,
  );
  if (!response) {
    throw new Error(ApiErrors.FetchData);
  }

  return response;
}
