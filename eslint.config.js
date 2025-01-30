// @ts-check
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImportX from "eslint-plugin-import-x";
import pluginNode from "eslint-plugin-n";
import perfectionist from "eslint-plugin-perfectionist";
import { configs as tsConfigs, config as typedConfig } from "typescript-eslint";

export default [
  { ignores: ["node_modules", "dist", "build", "docs", "coverage"] },
  pluginJs.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      node: {
        tryExtensions: [".ts", ".d.ts", "/index.ts", "/index.d.ts"],
      },
    },
  },
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  ...typedConfig({
    extends: [
      ...tsConfigs.strictTypeChecked,
      ...tsConfigs.stylisticTypeChecked,
    ],
    files: ["src/**/*.ts", "tests/**/*.ts"],
  }),
  ...typedConfig({
    extends: [perfectionist.configs["recommended-natural"]],
    files: ["src/**/*.ts", "tests/**/*.ts"],
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
            ["object", "unknown"],
          ],
          internalPattern: ["~/**", "@/**"],
        },
      ],
    },
  }),
  pluginNode.configs["flat/recommended-module"],
  {
    rules: {
      "n/no-missing-import": [
        "error",
        {
          allowModules: ["eslint-config-prettier"],
        },
      ],
    },
  },
  eslintConfigPrettier,
];
