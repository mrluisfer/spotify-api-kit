import type { PlayingTrack } from "../types/index.js";
import { ApiErrors } from "../utils/errors.js";
import { BaseService } from "./base-service.js";

export class PlayerService extends BaseService {
	public async getCurrentPlayingTrack() {
		const response = await this.get<PlayingTrack>(
			"/me/player/currently-playing",
		);
		console.log({ response });
		if (!response) {
			throw new Error(ApiErrors.FetchData);
		}
		return response;
	}
}
