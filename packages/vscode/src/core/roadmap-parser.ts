import type { Feature, RoadmapDoc, VersionGroup } from "./model.ts";
import { parseSemVer } from "./semver.ts";
import { splitByHeadings, topLevelBullets, stripInline, type Section } from "./markdown.ts";

const DATE_RE = /(\d{4}-\d{2}-\d{2})/;
const STATUS_EMOJI = ["✅", "🔄", "🔲", "🔴", "🟡", "🟢", "🔵", "⚠️", "📢", "🗑️"];

function headingIsVersion(text: string): boolean {
  const head = text.replace(/^\[/, "").trim();
  if (/^unreleased/i.test(head)) return true;
  const token = head.split(/[\s\]—–-]/)[0] ?? "";
  return /^v?\d+\.\d+/.test(token);
}

function detectStatus(title: string): string | undefined {
  for (const e of STATUS_EMOJI) if (title.includes(e)) return e;
  return undefined;
}

function extractFeatures(section: Section): Feature[] {
  const features: Feature[] = [];
  const groups = splitByHeadings(section.lines.join("\n"), 3);
  for (const g of groups) {
    const group = g.heading ? stripInline(g.heading.text) : undefined;
    const bullets = topLevelBullets(g.lines, section.startLine + 1 + g.startLine);
    for (const b of bullets) {
      if (!b.title.trim()) continue;
      features.push({
        id: `L${b.line}`,
        title: b.title,
        body: b.body.trim(),
        status: detectStatus(b.title),
        group,
        line: b.line,
      });
    }
  }
  return features;
}

export function parseRoadmap(src: string, kind: "roadmap" | "changelog", fallbackTitle = "", path = ""): RoadmapDoc {
  const h1 = splitByHeadings(src, 1).find((s) => s.heading);
  const title = h1?.heading?.text ?? fallbackTitle;

  const sections = splitByHeadings(src, 2).filter((s) => s.heading);
  const versions: VersionGroup[] = [];
  const orphans: Feature[] = [];

  for (const s of sections) {
    const text = s.heading!.text;
    const features = extractFeatures(s);
    if (headingIsVersion(text)) {
      versions.push({
        version: parseSemVer(text),
        label: stripInline(text),
        date: DATE_RE.exec(text)?.[1],
        features,
        line: s.heading!.line,
      });
    } else {
      for (const f of features) orphans.push({ ...f, group: f.group ?? stripInline(text) });
    }
  }

  return { kind, title, path, versions, orphans };
}
