import { ApiErrors } from "../utils/errors";
import { type SpotifyArtist, type SpotifyId } from "../types";
import { SpotifyClient } from "../SpotifyClient";

export async function getArtist(id: SpotifyId) {
  const spotifyClient = SpotifyClient.getInstance();
  const response = await spotifyClient.fetchFromSpotify<SpotifyArtist>(
    `/artists/${id}`,
  );
  if (!response) {
    throw new Error(ApiErrors.FetchData);
  }

  return response;
}
