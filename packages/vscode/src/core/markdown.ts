export interface Heading {
  level: number;
  text: string;
  line: number;
}

export interface Section {
  heading: Heading | null;
  startLine: number;
  endLine: number;
  lines: string[];
}

const HEADING_RE = /^(#{1,6})\s+(.*)$/;

export function splitByHeadings(src: string, level: number): Section[] {
  const lines = src.split("\n");
  const sections: Section[] = [];
  let current: Section = { heading: null, startLine: 0, endLine: lines.length, lines: [] };

  const push = (endLine: number) => {
    current.endLine = endLine;
    sections.push(current);
  };

  lines.forEach((line, i) => {
    const m = HEADING_RE.exec(line);
    if (m && m[1]!.length === level) {
      push(i);
      current = {
        heading: { level, text: m[2]!.trim(), line: i },
        startLine: i,
        endLine: lines.length,
        lines: [],
      };
    } else {
      current.lines.push(line);
    }
  });
  push(lines.length);
  return sections.filter((s, i) => i === 0 ? s.lines.some((l) => l.trim()) : true);
}

export interface Bullet {
  title: string;
  body: string;
  line: number;
}

const BULLET_RE = /^(\s*)[-*+]\s+(.*)$/;

export function topLevelBullets(lines: string[], baseLine: number): Bullet[] {
  const bullets: Bullet[] = [];
  let cur: Bullet | null = null;
  let baseIndent = -1;

  lines.forEach((line, i) => {
    const m = BULLET_RE.exec(line);
    if (m && (baseIndent === -1 || m[1]!.length <= baseIndent)) {
      if (baseIndent === -1) baseIndent = m[1]!.length;
      if (m[1]!.length === baseIndent) {
        if (cur) bullets.push(cur);
        cur = { title: stripInline(m[2]!), body: "", line: baseLine + i };
        return;
      }
    }
    if (cur) cur.body += (cur.body ? "\n" : "") + line;
  });
  if (cur) bullets.push(cur);
  return bullets;
}

export function stripInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}
