import { SpotifyClient } from "./client.js";

export { ClientContext, SpotifyClient, SpotifyClientConfig } from "./client.js";
export * from "./types/index.js";

export { AlbumsService } from "./services/albums.js";
export { ArtistsService } from "./services/artists.js";
export { BaseService } from "./services/base-service.js";
export { PlayerService } from "./services/player.js";
export { PlaylistsService } from "./services/playlists.js";
export { SearchService } from "./services/search.js";
export { TracksService } from "./services/tracks.js";
export { UserService } from "./services/user.js";

export default SpotifyClient;
