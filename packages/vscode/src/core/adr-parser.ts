import type { Adr, AdrSection, AdrTree } from "./model.ts";
import { splitByHeadings, stripInline } from "./markdown.ts";

const STATUS_RE = /status\*{0,2}\s*[:：]\s*\*{0,2}\s*([^\n*]+)/i;
const DATE_LINE_RE = /data\*{0,2}\s*[:：]\s*\*{0,2}\s*([^\n*]+)/i;

export function parseAdr(file: string, src: string): Adr {
  const h1 = splitByHeadings(src, 1).find((s) => s.heading);
  const title = h1?.heading ? stripInline(h1.heading.text) : file;

  const statusMatch = STATUS_RE.exec(src);
  const status = statusMatch ? normalizeStatus(stripInline(statusMatch[1]!)) : "Unknown";
  const dateMatch = DATE_LINE_RE.exec(src);

  const sections: AdrSection[] = splitByHeadings(src, 2)
    .filter((s) => s.heading)
    .map((s) => ({
      heading: stripInline(s.heading!.text),
      body: s.lines.join("\n").trim(),
      line: s.heading!.line,
    }));

  const idMatch = /(\d+)/.exec(file);
  return {
    id: idMatch ? idMatch[1]! : file,
    title,
    status,
    date: dateMatch ? stripInline(dateMatch[1]!) : undefined,
    sections,
    file,
  };
}

export function normalizeStatus(raw: string): string {
  const s = raw.toLowerCase();
  if (s.startsWith("accept")) return "Accepted";
  if (s.startsWith("propos")) return "Proposed";
  if (s.startsWith("deprecat")) return "Deprecated";
  if (s.startsWith("supersed")) return "Superseded";
  return raw.split(/[\s(—–-]/)[0] || raw;
}

export function buildAdrTree(adrs: Adr[]): AdrTree {
  const byStatus = new Map<string, Adr[]>();
  for (const adr of adrs) {
    const list = byStatus.get(adr.status) ?? [];
    list.push(adr);
    byStatus.set(adr.status, list);
  }
  return { byStatus, all: adrs };
}
