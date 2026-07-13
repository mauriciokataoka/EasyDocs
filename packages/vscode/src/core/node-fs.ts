import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import type { DirEntry, FileSystem } from "./fs.ts";

export function nodeFs(): FileSystem {
  return {
    async readFile(path) {
      return readFile(path, "utf8");
    },
    async readDir(path) {
      const entries = await readdir(path, { withFileTypes: true });
      return entries.map<DirEntry>((e) => ({
        name: e.name,
        path: join(path, e.name),
        isDirectory: e.isDirectory(),
      }));
    },
  };
}
