import * as vscode from "vscode";
import type { FileSystem, DirEntry } from "../core/fs.ts";

export class VSCodeFS implements FileSystem {
  async readFile(path: string): Promise<string> {
    const bytes = await vscode.workspace.fs.readFile(vscode.Uri.file(path));
    return new TextDecoder().decode(bytes);
  }

  async readDir(path: string): Promise<DirEntry[]> {
    const entries = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
    return entries.map(([name, type]) => ({
      name,
      path: path.replace(/\/$/, "") + "/" + name,
      isDirectory: (type & 2) !== 0,
    }));
  }
}
