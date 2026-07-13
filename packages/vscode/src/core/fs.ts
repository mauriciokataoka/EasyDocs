export interface DirEntry {
  name: string;
  path: string;
  isDirectory: boolean;
}

export interface FileSystem {
  readFile(path: string): Promise<string>;
  readDir(path: string): Promise<DirEntry[]>;
}

export function basename(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? path;
}

export function joinPath(...parts: string[]): string {
  return parts
    .filter((p) => p !== "")
    .join("/")
    .replace(/\/+/g, "/");
}
