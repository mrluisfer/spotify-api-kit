import xo from "eslint-config-xo";
import xoTs from "eslint-config-xo-typescript";
import globals from "globals";

export default [
  ...xo,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  },
  ...xoTs.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
];
