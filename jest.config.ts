import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.test.ts"],
	extensionsToTreatAsEsm: [".ts"],
	clearMocks: true,
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
	coverageDirectory: "coverage",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	verbose: true,
	collectCoverage: true,
};

export default jestConfig;
