import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import { flatConfigs as eslintPluginImportX } from "eslint-plugin-import-x";
import pluginNode from "eslint-plugin-n";
import perfectionist from "eslint-plugin-perfectionist";
import {
  config as extendConfig,
  configs as tsConfigs,
} from "typescript-eslint";

export default [
  { ignores: ["node_modules", "dist", "build", "docs", "coverage"] },
  pluginJs.configs.recommended,
  pluginNode.configs["flat/recommended-module"],
  eslintPluginImportX.recommended,
  eslintPluginImportX.typescript,
  perfectionist.configs["recommended-natural"],
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
  {
    rules: {
      "n/no-missing-import": [
        "error",
        {
          allowModules: ["eslint-config-prettier"],
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            ["object", "unknown"],
          ],
          internalPattern: [/^([~@]\/|#)/.source],
        },
      ],
    },
  },
  ...extendConfig({
    extends: [
      ...tsConfigs.strictTypeChecked,
      ...tsConfigs.stylisticTypeChecked,
    ],
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
    },
    settings: {
      node: {
        tryExtensions: [".ts", ".d.ts", "/index.ts", "/index.d.ts"],
      },
    },
  }),
  eslintConfigPrettier,
];
