export type UserTokens = {
	access_token: string;
	refresh_token: string;
	token_type: "Bearer";
	scope?: string;
	expires_in: number; // seconds
};

export type PersistedUserAuth = {
	token: string;
	tokenType: string;
	expiresAt: number; // ms epoch
	refreshToken: string;
	scope?: string;
};
