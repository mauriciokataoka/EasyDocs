import type { FileSystem } from "./fs.ts";
import { basename } from "./fs.ts";

export interface Discovered {
  roadmap?: string;
  changelog?: string;
  adrDir?: string;
  markdownFiles: string[];
}

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "history",
]);

const ADR_DIR_NAMES = new Set(["adr", "adrs", "gdd", "gdds"]);

function matchDoc(name: string): "roadmap" | "changelog" | null {
  const lower = name.toLowerCase();
  if (lower === "roadmap.md") return "roadmap";
  if (lower === "changelog.md") return "changelog";
  return null;
}

export async function discover(
  fs: FileSystem,
  root: string,
  maxDepth = 6,
): Promise<Discovered> {
  const found: Discovered = { markdownFiles: [] };
  const docDepth: Partial<Record<"roadmap" | "changelog", number>> = {};

  async function walk(dir: string, depth: number): Promise<void> {
    if (depth > maxDepth) return;
    let entries;
    try {
      entries = await fs.readDir(dir);
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory) {
        if (IGNORE_DIRS.has(e.name)) continue;
        if (ADR_DIR_NAMES.has(e.name.toLowerCase()) && !found.adrDir) {
          found.adrDir = e.path;
        }
        await walk(e.path, depth + 1);
      } else if (e.name.toLowerCase().endsWith(".md")) {
        found.markdownFiles.push(e.path);
        const kind = matchDoc(e.name);
        if (kind && (docDepth[kind] === undefined || depth < docDepth[kind]!)) {
          found[kind] = e.path;
          docDepth[kind] = depth;
        }
      }
    }
  }

  await walk(root, 0);
  found.markdownFiles.sort();
  return found;
}

export async function listAdrFiles(fs: FileSystem, adrDir: string): Promise<string[]> {
  const entries = await fs.readDir(adrDir);
  return entries
    .filter((e) => !e.isDirectory && e.name.toLowerCase().endsWith(".md"))
    .filter((e) => basename(e.name).toLowerCase() !== "readme.md")
    .map((e) => e.path)
    .sort();
}
