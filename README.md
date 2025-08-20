# Spotify API Kit

A modern, type-safe TypeScript wrapper for the Spotify Web API, designed for secure Node.js backend applications.

[![npm version](https://badge.fury.io/js/spotify-api-kit.svg)](https://badge.fury.io/js/spotify-api-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Overview

The **Spotify API Kit** serves as a robust intermediary layer between Node.js applications and the Spotify Web API, providing a simplified, type-safe interface for accessing Spotify's music data and services. This library prioritizes security by handling authentication and API calls on the backend, keeping sensitive credentials away from client-side code.

### Architecture Flow

```md
[Frontend Client]
       ↓
[Your API Endpoint] (e.g., /api/spotify/search)
       ↓
[Spotify API Kit] → [Spotify Web API]
       ↓
[Cleaned Response] → [Your Frontend]
```

## Key Features

- **🔒 Type Safety**: Comprehensive TypeScript definitions for all Spotify API responses
- **🔐 Secure Authentication**: Built-in OAuth 2.0 client credentials flow with automatic token management
- **🏗️ Service-Oriented Architecture**: Modular service classes for different API domains
- **⚡ Modern Standards**: Full ESM and CommonJS support with Node.js 22+ compatibility
- **🧪 Battle-Tested**: Comprehensive test suite with Jest and quality assurance tools
- **📦 Zero Dependencies**: Lightweight implementation with minimal external dependencies

## Installation

```bash
npm install spotify-api-kit
# or
yarn add spotify-api-kit
# or
pnpm install spotify-api-kit
```

## Quick Start

### 1. Set Up Spotify Developer Application

1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Note your `Client ID` and `Client Secret`

### 2. Initialize the Client

```typescript
import { SpotifyClient } from "spotify-api-kit";

const spotify = new SpotifyClient(
  process.env.SPOTIFY_CLIENT_ID!,
  process.env.SPOTIFY_CLIENT_SECRET!
);
```

### 3. Basic Usage Examples

**Search for Artists:**

```typescript
const results = await spotify.search.search("Daft Punk", "artist");
console.log(results.artists.items[0].name); // "Daft Punk"
```

**Fetch Track Information:**

```typescript
const track = await spotify.tracks.getTrack("7ouMYWpwJ422jRcDASZB7P");
console.log(`Track: ${track.name} by ${track.artists.map(a => a.name).join(", ")}`);
```

**Get Playlist Details:**

```typescript
const playlist = await spotify.playlists.getPlaylist("37i9dQZF1DXcBWIGoYBM5M");
console.log(`Playlist: ${playlist.name} (${playlist.tracks.total} tracks)`);
```

## API Reference

### Core Services

The SpotifyClient provides access to several specialized service classes:

```typescript
class SpotifyClient {
  artists: ArtistsService;      // Artist-related operations
  tracks: TracksService;        // Track management
  player: PlayerService;        // Playback control
  playlists: PlaylistsService;  // Playlist operations
  search: SearchService;        // Search functionality
}
```

### Service Methods

#### ArtistsService

```typescript
await spotify.artists.getArtist(artistId);
await spotify.artists.getArtistAlbums(artistId);
await spotify.artists.getArtistTopTracks(artistId);
```

#### TracksService

```typescript
await spotify.tracks.getTrack(trackId);
await spotify.tracks.getSeveralTracks(trackIds);
await spotify.tracks.getTrackFeatures(trackId);
```

#### SearchService

```typescript
await spotify.search.search(query, type); // type: 'artist' | 'track' | 'album' | 'playlist'
```

#### PlaylistsService

```typescript
await spotify.playlists.getPlaylist(playlistId);
await spotify.playlists.getPlaylistTracks(playlistId);
```

## Project Structure

```md
src/
├── SpotifyClient.ts      # Main client class
├── services/             # Service layer implementations
│   ├── ArtistsService.ts
│   ├── TracksService.ts
│   ├── PlayerService.ts
│   ├── PlaylistsService.ts
│   └── SearchService.ts
├── types/               # TypeScript type definitions
├── constants/           # API endpoints and configuration
├── utils/              # Utility functions and error handling
└── index.ts            # Package entry point
```

## Development

### Prerequisites

- Node.js 22+
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Build package
npm run build
```

### Quality Assurance

This project maintains high code quality through:

- **ESLint**: TypeScript-specific linting rules
- **Prettier**: Consistent code formatting
- **Biome**: Additional formatting and linting
- **Jest**: Comprehensive test coverage
- **Husky**: Pre-commit hooks for code quality
- **lint-staged**: Staged file linting

## Error Handling

The library provides comprehensive error handling for common scenarios:

```typescript
try {
  const track = await spotify.tracks.getTrack("invalid-id");
} catch (error) {
  if (error.status === 404) {
    console.log("Track not found");
  } else if (error.status === 401) {
    console.log("Authentication failed");
  }
}
```

## Security Considerations

- **Never expose credentials**: Always use environment variables for client secrets
- **Backend-only**: This library is designed for server-side use only
- **Token management**: Automatic token refresh and caching handled internally
- **HTTPS only**: All requests are made over secure connections

## Example Response

```typescript
// Example playlist response structure
{
  collaborative: false,
  description: "Curated indie rock playlist for coding sessions",
  external_urls: {
    spotify: "https://open.spotify.com/playlist/49spccWMHTuffh4NQiR4RN"
  },
  followers: {
    href: null,
    total: 9
  },
  id: "49spccWMHTuffh4NQiR4RN",
  images: [{
    height: null,
    url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d3ab77ccc0b00f72d49336c0",
    width: null
  }],
  name: "Indie Rock Essentials",
  owner: {
    display_name: "Music Curator",
    external_urls: {
      spotify: "https://open.spotify.com/user/musiccurator"
    },
    id: "musiccurator",
    type: "user"
  },
  public: true,
  tracks: {
    href: "https://api.spotify.com/v1/playlists/49spccWMHTuffh4NQiR4RN/tracks",
    items: [
      // Track objects...
    ],
    total: 1274
  },
  type: "playlist"
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Roadmap

- [ ] Support for user authentication flows
- [ ] Playlist modification operations
- [ ] Advanced search filters
- [ ] Rate limiting and retry mechanisms
- [ ] WebSocket support for real-time updates
- [ ] Improved error handling and logging
- [ ] Several improvements...

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/mrluisfer/spotify-api-kit/docs)
- 🐛 [Issue Tracker](https://github.com/mrluisfer/spotify-api-kit/issues)
- 💬 [Discussions](https://github.com/mrluisfer/spotify-api-kit/discussions)

---

**Built with ❤️ by [Luis Alvarez](https://github.com/mrluisfer)**

*Making Spotify integration simple, secure, and type-safe.*
