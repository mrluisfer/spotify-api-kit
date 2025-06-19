import "dotenv/config";
export const CLIENT_ID = process.env.CLIENT_ID || "test-client-id";
export const CLIENT_SECRET = process.env.CLIENT_SECRET || "test-client-secret";

console.log({
	CLIENT_ID,
	CLIENT_SECRET,
});
