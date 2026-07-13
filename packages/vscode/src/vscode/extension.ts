import * as vscode from "vscode";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";
import { loadProjectDocs, toViewData } from "../core/index.ts";
import { VSCodeFS } from "./host-fs.ts";
import type { ViewData } from "../ui/render.ts";

const require = createRequire(__filename);
const __dirname = dirname(require.resolve("./extension.js"));

function readDist(name: string): string {
  return readFileSync(join(__dirname, name), "utf8");
}

export function webviewHtml(nonce: string): string {
  const style = readDist("webview.css");
  const script = readDist("webview.js");
  const csp = "default-src 'none'; img-src https: data:; style-src 'unsafe-inline'; script-src 'nonce-" + nonce + "';";
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<style>${style}</style></head>
<body><div class="app" id="app"></div>
<script nonce="${nonce}">${script}</script></body></html>`;
}

function nonce(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

class VSCodeStructuredEditor {
  private panels = new Map<string, vscode.WebviewPanel>();
  public readonly viewType = "easydocs.structuredView";

  async resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel): Promise<void> {
    const key = document.fileName.endsWith("CHANGELOG.md") ? "changelog" : "roadmap";
    const root = projectRoot(document.uri);
    try {
      const docs = await loadProjectDocs(new VSCodeFS(), root);
      webviewPanel.webview.html = webviewHtml(nonce());
      webviewPanel.webview.postMessage({ type: "doc", key, view: toViewData(docs, key) } as any);
    } catch (e) {
      vscode.window.showErrorMessage("EasyDocs: falha ao carregar " + key + " — " + (e as Error).message);
    }
    webviewPanel.webview.onDidReceiveMessage((m) => {
      if (m && m.type === "open") vscode.commands.executeCommand("vscode.open", vscode.Uri.file(m.path));
    });
  }
}

function projectRoot(uri: vscode.Uri): string {
  const folder = vscode.workspace.getWorkspaceFolder(uri);
  return folder ? folder.uri.fsPath : dirname(uri.fsPath);
}

class EasyDocsTreeProvider implements vscode.TreeDataProvider<EasyDocsNode> {
  async getChildren(element?: EasyDocsNode): Promise<EasyDocsNode[]> {
    if (!element) {
      const folder = vscode.workspace.workspaceFolders?.[0];
      if (!folder) return [];
      const root = folder.uri.fsPath;
      try {
        const docs = await loadProjectDocs(new VSCodeFS(), root);
        const nodes: EasyDocsNode[] = [];
        if (docs.roadmap) nodes.push(new EasyDocsNode("Roadmap", "roadmap", vscode.TreeItemCollapsibleState.None, docs.roadmap.path));
        if (docs.changelog) nodes.push(new EasyDocsNode("Changelog", "changelog", vscode.TreeItemCollapsibleState.None, docs.changelog.path));
        if (docs.adrs) {
          const adrNode = new EasyDocsNode("ADRs", "adrs", vscode.TreeItemCollapsibleState.Collapsed, "");
          nodes.push(adrNode);
        }
        return nodes;
      } catch {
        return [];
      }
    }
    if (element.kind === "adrs") {
      const docs = await loadProjectDocs(new VSCodeFS(), projectRoot(vscode.workspace.workspaceFolders![0].uri));
      if (!docs.adrs) return [];
      return [...docs.adrs.byStatus.entries()].map(([status, adrs]) =>
        new EasyDocsNode(status, "adrStatus", vscode.TreeItemCollapsibleState.Collapsed, "", undefined, status)
      );
    }
    if (element.kind === "adrStatus") {
      const docs = await loadProjectDocs(new VSCodeFS(), projectRoot(vscode.workspace.workspaceFolders![0].uri));
      const status = element.detail!;
      const adrs = docs.adrs?.byStatus.get(status) ?? [];
      return adrs.map((a) =>
        new EasyDocsNode(`${a.id} — ${a.title}`, "adr", vscode.TreeItemCollapsibleState.None, "", { type: "adrs", view: toViewData(docs, "adrs") as ViewData }, status)
      );
    }
    return [];
  }

  getTreeItem(element: EasyDocsNode): vscode.TreeItem {
    const item = new vscode.TreeItem(element.label, element.collapsibleState);
    if (element.kind === "roadmap" || element.kind === "changelog") {
      item.command = { command: "vscode.open", title: "Abrir", arguments: [vscode.Uri.file(element.path!)] };
    } else if (element.kind === "adr") {
      item.command = { command: "easydocs.showAdrs", title: "Ver ADRs", arguments: [element.payload] };
    } else if (element.kind === "adrs") {
      item.command = { command: "easydocs.showAdrs", title: "Ver ADRs", arguments: [{ type: "adrs", view: undefined }] };
    }
    return item;
  }
}

class EasyDocsNode {
  constructor(
    public readonly label: string,
    public readonly kind: "roadmap" | "changelog" | "adrs" | "adrStatus" | "adr",
    public readonly collapsibleState: number,
    public readonly path?: string,
    public readonly payload?: any,
    public readonly detail?: string,
  ) {}
}

let adrPanel: vscode.WebviewPanel | undefined;

export function activate(ctx: vscode.ExtensionContext): void {
  console.log("[EasyDocs] activate() chamado");
  const editor = new VSCodeStructuredEditor();
  ctx.subscriptions.push(
    vscode.window.registerCustomEditorProvider(editor.viewType, editor, { supportsMultipleEditorsPerDocument: false }),
  );

  const tree = new EasyDocsTreeProvider();
  ctx.subscriptions.push(vscode.window.registerTreeDataProvider("easydocsView", tree));

  ctx.subscriptions.push(
    vscode.commands.registerCommand("easydocs.showAdrs", async (arg?: any) => {
      const folder = vscode.workspace.workspaceFolders?.[0];
      if (!folder) return;
      let view: ViewData | undefined = arg?.view;
      if (!view) {
        const docs = await loadProjectDocs(new VSCodeFS(), folder.uri.fsPath);
        if (!docs.adrs) { vscode.window.showErrorMessage("EasyDocs: nenhuma pasta adr/ encontrada."); return; }
        view = toViewData(docs, "adrs");
      }
      if (!adrPanel) {
        adrPanel = vscode.window.createWebviewPanel("easydocs.adrs", "EasyDocs — ADRs", vscode.ViewColumn.Beside, { enableScripts: true });
        adrPanel.webview.html = webviewHtml(nonce());
        adrPanel.onDidDispose(() => { adrPanel = undefined; });
      }
      adrPanel.webview.postMessage({ type: "doc", key: "adrs", view } as any);
      adrPanel.reveal(vscode.ViewColumn.Beside, true);
    }),
  );
}

export function deactivate(): void {
  adrPanel?.dispose();
}
