import "dotenv/config";
export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";

console.log({
	CLIENT_ID,
	CLIENT_SECRET,
});
