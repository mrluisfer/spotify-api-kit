import { SpotifyClient } from "../../client.js";
import { CLIENT_ID, CLIENT_SECRET } from "../credentials.js";

describe("player service", () => {
	let spotifyClient: SpotifyClient;

	beforeEach(() => {
		spotifyClient = new SpotifyClient({
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
		});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should get current playing track", async () => {
		const result = await spotifyClient.player.getCurrentPlayingTrack();
		console.log({ result });
	});
});
