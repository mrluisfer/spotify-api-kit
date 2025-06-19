import { SpotifyClient } from "../../SpotifyClient.js";
import { CLIENT_ID, CLIENT_SECRET } from "../credentials.js";

describe("player service", () => {
	let spotifyClient: SpotifyClient;

	beforeEach(() => {
		spotifyClient = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should get current playing track", async () => {
		const result = await spotifyClient.player.getCurrentPlayingTrack();
		console.log(result);
	});
});
