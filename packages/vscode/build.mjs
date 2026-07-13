import { build } from "esbuild";

const common = {
  bundle: true,
  platform: "node",
  target: "node18",
  logLevel: "info",
};

await Promise.all([
  build({
    ...common,
    entryPoints: ["src/vscode/extension.ts"],
    outfile: "dist/extension.js",
    format: "cjs",
    external: ["vscode"],
  }),
  build({
    ...common,
    entryPoints: ["src/vscode/webview.ts"],
    outfile: "dist/webview.js",
    format: "iife",
    external: ["vscode"],
  }),
  build({
    ...common,
    entryPoints: ["src/ui/style.css"],
    outfile: "dist/webview.css",
    loader: { ".css": "css" },
    external: ["vscode"],
  }),
]);

console.log("build ok");
