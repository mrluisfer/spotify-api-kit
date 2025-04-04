# Spotify API Kit

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=plastic)](https://github.com/prettier/prettier)
[![code linting: eslint](https://img.shields.io/badge/code_linting-eslint-493D9E.svg?style=plastic)](https://github.com/prettier/prettier)

in progress...

## Usage

The recommended way to use this library is by calling the SpotifyAPI class, a wrapper around the Spotify Web API. To keep your credentials secure, it interacts with your backend instead of calling Spotify directly from the frontend.

```bash
[Frontend]
   |
   |-> Your wrapper calls your backend (e.g., /api/spotify/search)
              |
              |-> Your backend handles the clientId/clientSecret securely
              |-> Requests an access token from Spotify
              |-> Calls the appropriate Spotify API endpoint
              |-> Returns clean, simplified data back to the frontend
```
