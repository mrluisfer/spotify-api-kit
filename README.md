<p align="center">
  <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/01/Spotify_Logo_RGB_Green.png" width="280" alt="Spotify API Kit" />
</p>

<h1 align="center">spotify-api-kit</h1>

<p align="center">
  <strong>A modern, type-safe TypeScript wrapper for the Spotify Web API</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/spotify-api-kit"><img src="https://img.shields.io/npm/v/spotify-api-kit?style=flat-square&color=1DB954" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/spotify-api-kit"><img src="https://img.shields.io/npm/dm/spotify-api-kit?style=flat-square&color=1DB954" alt="npm downloads" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" /></a>
</p>

<p align="center">
  <a href="#installation">Installation</a> &nbsp;&bull;&nbsp;
  <a href="#quick-start">Quick Start</a> &nbsp;&bull;&nbsp;
  <a href="#services">Services</a> &nbsp;&bull;&nbsp;
  <a href="#api-reference">API Reference</a> &nbsp;&bull;&nbsp;
  <a href="#contributing">Contributing</a>
</p>

---

## Why spotify-api-kit?

- **Full type safety** — Every response is typed with comprehensive TypeScript interfaces
- **Automatic auth** — OAuth 2.0 client credentials + user auth with token refresh, handled for you
- **Service-oriented** — Clean, modular services for each Spotify API domain
- **Dual module** — ESM and CommonJS out of the box
- **Testable** — Inject a custom `fetch` implementation for easy mocking

---

## Installation

```bash
npm install spotify-api-kit
```

```bash
# or with your preferred package manager
yarn add spotify-api-kit
pnpm add spotify-api-kit
```

> Requires **Node.js 22** or later.

---

## Quick Start

### 1. Get your credentials

Create an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and grab your **Client ID** and **Client Secret**.

### 2. Initialize

```typescript
import { SpotifyClient } from "spotify-api-kit";

const spotify = new SpotifyClient({
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
});

// Or load directly from env vars
const spotify = SpotifyClient.fromEnv();
```

### 3. Use it

```typescript
// Search for an artist
const results = await spotify.search.search("Daft Punk", "artist");
console.log(results.artists.items[0].name);

// Get a track
const track = await spotify.tracks.getTrack("7ouMYWpwJ422jRcDASZB7P");
console.log(`${track.name} by ${track.artists.map(a => a.name).join(", ")}`);

// Browse new releases
const releases = await spotify.albums.getNewReleases();
```

---

## Architecture

```
Your App ──> SpotifyClient ──> Spotify Web API
                 │
                 ├── AlbumsService
                 ├── ArtistsService
                 ├── TracksService
                 ├── PlayerService
                 ├── PlaylistsService
                 ├── SearchService
                 └── UserService
```

`SpotifyClient` manages authentication and lazily instantiates service classes, passing them a shared context with a valid access token, base URL, and fetch implementation.

---

## Services

### Albums

```typescript
spotify.albums.getAlbum(id, market?)
spotify.albums.getSeveralAlbums(ids, market?)
spotify.albums.getAlbumTracks(id, market?, limit?, offset?)
spotify.albums.getNewReleases(country?, limit?, offset?)
spotify.albums.checkSavedAlbums(ids)
spotify.albums.saveAlbums(ids)
spotify.albums.removeSavedAlbums(ids)
```

### Artists

```typescript
spotify.artists.getArtist(id)
spotify.artists.getSeveralArtists(ids)
spotify.artists.getArtistAlbums(id, options?)
spotify.artists.getTopTracks(id, market?)
spotify.artists.getRelatedArtists(id)
```

### Tracks

```typescript
spotify.tracks.getTrack(id, market?)
spotify.tracks.getSeveralTracks(ids, market?)
spotify.tracks.getAudioFeatures(id)
spotify.tracks.getSeveralAudioFeatures(ids)
spotify.tracks.checkSavedTracks(ids)
spotify.tracks.saveTracks(ids)
spotify.tracks.removeSavedTracks(ids)
spotify.tracks.getRecommendations(options)
```

### Player

```typescript
spotify.player.getCurrentPlayingTrack(market?)
spotify.player.getPlaybackState(market?)
spotify.player.getRecentlyPlayed(limit?, after?, before?)
spotify.player.getQueue()
spotify.player.getAvailableDevices()
spotify.player.play(options?)
spotify.player.pause(device_id?)
spotify.player.skipToNext(device_id?)
spotify.player.skipToPrevious(device_id?)
spotify.player.setVolume(volumePercent, device_id?)
spotify.player.setShuffle(state, device_id?)
spotify.player.setRepeat(state, device_id?)
spotify.player.seek(positionMs, device_id?)
spotify.player.addToQueue(uri, device_id?)
```

### Playlists

```typescript
spotify.playlists.getPlaylist(id, market?)
spotify.playlists.getPlaylistTracks(id, market?, limit?, offset?)
spotify.playlists.getCurrentUserPlaylists(limit?, offset?)
spotify.playlists.getUserPlaylists(userId, limit?, offset?)
spotify.playlists.getFeaturedPlaylists(options?)
spotify.playlists.getCategoryPlaylists(categoryId, options?)
spotify.playlists.getCategory(categoryId, options?)
spotify.playlists.getCategories(options?)
```

### Search

```typescript
spotify.search.search(query, type, market?, limit?, offset?)
```

### User

```typescript
spotify.user.me()
spotify.user.getProfile(userId)
spotify.user.getTopItems(type, options?)
spotify.user.getSavedTracks(limit?, offset?, market?)
spotify.user.getSavedAlbums(limit?, offset?, market?)
spotify.user.getFollowedArtists(limit?, after?)
spotify.user.followArtists(ids)
spotify.user.unfollowArtists(ids)
spotify.user.checkFollowingArtists(ids)
```

---

## API Reference

### `SpotifyClient`

| Option | Type | Description |
|---|---|---|
| `clientId` | `string` | Your Spotify app Client ID |
| `clientSecret` | `string` | Your Spotify app Client Secret |
| `credentialsBase64?` | `string` | Pre-encoded credentials (optional) |
| `baseUrl?` | `string` | Override API base URL |
| `fetchImpl?` | `typeof fetch` | Custom fetch for testing |
| `clock?` | `() => number` | Custom clock for testing |
| `tokenSkewMs?` | `number` | Token refresh skew (default: 10s) |

### User Authentication

For endpoints that require user authorization (player, user profile, saved items):

```typescript
// After completing the OAuth Authorization Code flow
spotify.setUserAuth({
  access_token: "...",
  token_type: "Bearer",
  expires_in: 3600,
  refresh_token: "...",
  scope: "user-read-private user-read-email",
});

// Token refresh is handled automatically
const me = await spotify.user.me();

// Clear user session
spotify.clearUserAuth();
```

---

## Error Handling

```typescript
try {
  const track = await spotify.tracks.getTrack("invalid-id");
} catch (error) {
  // Errors include status codes from the Spotify API
  console.error(error.message);
}
```

---

## Development

```bash
npm install          # Install dependencies
npm test             # Run tests
npm run test:coverage # Tests with coverage
npm run lint         # ESLint
npm run build        # Build with tsup
```

### Tooling

| Tool | Purpose |
|---|---|
| **tsup** | Build (ESM + CJS) |
| **Jest** + ts-jest | Testing |
| **ESLint** | Linting (xo-typescript config) |
| **Biome** | Formatting (tabs, double quotes) |
| **Husky** + lint-staged | Pre-commit quality gates |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

[MIT](LICENSE) &copy; [Luis Alvarez](https://github.com/mrluisfer)

---

<p align="center">
  <a href="https://github.com/mrluisfer/spotify-api-kit/issues">Report a bug</a> &nbsp;&bull;&nbsp;
  <a href="https://github.com/mrluisfer/spotify-api-kit/discussions">Discussions</a> &nbsp;&bull;&nbsp;
  <a href="https://www.npmjs.com/package/spotify-api-kit">npm</a>
</p>
