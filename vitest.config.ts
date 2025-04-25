import { resolve } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
      "~": resolve(import.meta.dirname, "tests"),
    },
  },
  test: {
    clearMocks: true,
    coverage: {
      enabled: true,
      include: ["src/**/*.ts"],
      reporter: ["text", "text-summary", "json", "html", "cobertura"],
      reportOnFailure: true,
    },
    globals: true,
    mockReset: true,
    outputFile: {
      junit: "./coverage/junit-report.xml",
    },
    passWithNoTests: true,
    reporters: ["default", "junit"],
    restoreMocks: true,
    typecheck: {
      checker: "tsc",
      tsconfig: "./tests/tsconfig.json",
    },
  },
});
