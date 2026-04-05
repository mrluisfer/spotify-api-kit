# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

spotify-api-kit is a TypeScript wrapper for the Spotify Web API, published to npm. It supports both ESM and CJS (`"type": "module"`). Requires Node.js 22+.

## Commands

- **Build:** `npm run build` (uses tsup, outputs to `dist/`)
- **Test:** `npm test` (Jest with ts-jest)
- **Single test:** `npx jest path/to/file.test.ts --verbose`
- **Test with coverage:** `npm run test:coverage`
- **Lint:** `npm run lint` (ESLint)
- **Format/lint staged:** handled automatically by Husky + lint-staged using Biome

## Architecture

**Entry point:** `src/index.ts` re-exports from `src/client.ts`.

**SpotifyClient** (`src/client.ts`) is the main class. It:
- Accepts config (clientId, clientSecret, optional fetch impl/clock for testing)
- Manages OAuth token lifecycle (client credentials flow + optional user auth with refresh tokens)
- Lazily instantiates service classes, passing them a `ClientContext` (provides `getValidAccessToken()`, `baseUrl`, `fetch`)

**Services** (`src/services/`) extend `BaseService` which provides an authenticated `get<T>()` helper. Each service maps to a Spotify API domain:
- `ArtistsService`, `TracksService`, `PlayerService`, `PlaylistsService`, `SearchService`, `UserService`

**Types** (`src/types/`) — TypeScript interfaces for Spotify API responses.

**Tests** (`src/__tests__/`) use Jest with mock data from `src/__mocks__/`. Tests inject a fake `fetch` via `SpotifyClientConfig.fetchImpl` to avoid real API calls.

## Code Style

- Biome is the primary formatter (tab indentation, double quotes)
- lint-staged runs Biome on pre-commit via Husky
- ESLint with xo-typescript config for linting rules
