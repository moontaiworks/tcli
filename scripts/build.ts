import path from "node:path";

import { build, type BuildOptions } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

import packageJson from "../package.json" assert { type: "json" };

const __dirname = new URL("..", import.meta.url).pathname;

const baseConfig = {
  bundle: true,
  entryPoints: [path.join(__dirname, "src/index.js")],
  minify: true,
  platform: "node",
  sourcemap: true,
  target: "es6",
} satisfies BuildOptions;

const builds: Promise<unknown>[] = [
  build({
    ...baseConfig,
    format: "cjs",
    outfile: "dist/index.cjs",
    plugins: [nodeExternalsPlugin()],
  }),
  build({
    ...baseConfig,
    format: "esm",
    outfile: "dist/index.mjs",
    plugins: [nodeExternalsPlugin()],
  }),
];

if (process.argv.includes("--iife")) {
  const globalName = packageJson.name.split("/").pop()?.replace("-", "_");
  if (!globalName) throw new Error("No name being parsed.");

  builds.push(
    build({
      ...baseConfig,
      format: "iife",
      globalName,
      outfile: "dist/index.iife.js",
    }),
  );
}

await Promise.all(builds);
