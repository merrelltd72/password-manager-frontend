import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: { js, pluginReact, pluginJest },
    extends: [
      "plugin:js/recommended",
      "plugin:react/recommended",
      "plugin:jest/recommended",
    ],
    rules: {
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    settings: { react: { version: "latest" } },
  },
]);
