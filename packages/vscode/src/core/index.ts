import type { FileSystem } from "./fs.ts";
import { basename } from "./fs.ts";
import type { ProjectDocs, Adr } from "./model.ts";
import { discover, listAdrFiles } from "./discovery.ts";
import { parseRoadmap } from "./roadmap-parser.ts";
import { parseAdr, buildAdrTree } from "./adr-parser.ts";

function firstHeading(src: string): string | undefined {
  const m = /^#\s+(.+)$/m.exec(src);
  return m ? m[1]!.trim() : undefined;
}

export async function loadProjectDocs(fs: FileSystem, root: string): Promise<ProjectDocs> {
  const found = await discover(fs, root);
  const docs: ProjectDocs = { others: [] };

  if (found.roadmap) {
    docs.roadmap = parseRoadmap(await fs.readFile(found.roadmap), "roadmap", basename(found.roadmap));
  }
  if (found.changelog) {
    docs.changelog = parseRoadmap(await fs.readFile(found.changelog), "changelog", basename(found.changelog));
  }
  if (found.adrDir) {
    const files = await listAdrFiles(fs, found.adrDir);
    const adrs: Adr[] = [];
    for (const f of files) {
      adrs.push(parseAdr(basename(f), await fs.readFile(f)));
    }
    docs.adrs = buildAdrTree(adrs);
  }

  const adrPrefix = found.adrDir ? found.adrDir + "/" : null;
  const special = new Set([found.roadmap, found.changelog].filter(Boolean) as string[]);
  for (const path of found.markdownFiles) {
    if (special.has(path)) continue;
    if (adrPrefix && path.startsWith(adrPrefix)) continue;
    const raw = await fs.readFile(path);
    docs.others.push({
      name: basename(path),
      path,
      title: firstHeading(raw) ?? basename(path),
      raw,
    });
  }

  return docs;
}

export * from "./model.ts";
export * from "./semver.ts";
export * from "./fs.ts";
export * from "./discovery.ts";
export { parseRoadmap } from "./roadmap-parser.ts";
export { parseAdr, buildAdrTree, normalizeStatus } from "./adr-parser.ts";

import type { ViewData } from "../ui/render.ts";

function toRoadmapView(title: string, doc: ProjectDocs["roadmap"]): ViewData {
  if (!doc) throw new Error("documento de roadmap ausente");
  return { kind: "roadmap", title, orphans: doc.orphans, versions: doc.versions };
}

function toAdrsView(doc: ProjectDocs["adrs"]): ViewData {
  if (!doc) throw new Error("documento de ADRs ausente");
  return {
    kind: "adrs",
    title: "ADRs",
    tree: [...doc.byStatus.entries()].map(([status, adrs]) => ({
      status,
      adrs: adrs.map((a) => ({ id: a.id, title: a.title, date: a.date ?? "", sections: a.sections })),
    })),
  };
}

function toGenericView(g: ProjectDocs["others"][number]): ViewData {
  return { kind: "generic", title: g.title, raw: g.raw };
}

export function toViewData(docs: ProjectDocs, key: "roadmap" | "changelog" | "adrs" | string): ViewData {
  if (key === "roadmap") return toRoadmapView(docs.roadmap?.path ?? "ROADMAP", docs.roadmap);
  if (key === "changelog") return toRoadmapView(docs.changelog?.path ?? "CHANGELOG", docs.changelog);
  if (key === "adrs") return toAdrsView(docs.adrs);
  const g = docs.others.find((o) => o.path === key || o.name === key);
  if (g) return toGenericView(g);
  throw new Error("chave de documento desconhecida: " + key);
}
