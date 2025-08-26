import "dotenv/config";
export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";

// Logging only whether CLIENT_ID and CLIENT_SECRET are set, and providing a masked preview for debugging
console.log({
  CLIENT_ID: CLIENT_ID ? CLIENT_ID.substring(0, 4) + '***' : '(not set)',
  CLIENT_SECRET: CLIENT_SECRET ? CLIENT_SECRET.substring(0, 4) + '***' : '(not set)'
});
