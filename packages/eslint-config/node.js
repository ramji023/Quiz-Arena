// packages/eslint/node.js
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginSecurity from "eslint-plugin-security";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * A shared ESLint configuration for Node.js + Express + TypeScript apps.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,                       // Inherit base rules (Turbo + TS + Prettier)
  js.configs.recommended,              // Core JS linting
  eslintConfigPrettier,                // Disable conflicting Prettier rules
  ...tseslint.configs.recommended,     // TypeScript linting rules
  pluginSecurity.configs.recommended,  // Adds basic Node security checks
  {
    languageOptions: {
      globals: {
        ...globals.node,               // Node global variables
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
  },
  {
    rules: {
      "no-console": "off",             // Allow console logs in backend
      "@typescript-eslint/no-var-requires": "off", // CommonJS support
      "security/detect-object-injection": "off",   // Too strict for most Express apps
    },
  },
  {
    ignores: [
      "dist/**", 
      "build/**", 
      "node_modules/**"
    ],
  },
];
