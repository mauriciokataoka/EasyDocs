import type { SemVer } from "./model.ts";

const SEMVER_RE = /v?(\d+)\.(\d+)(?:\.(\d+))?/;

export function parseSemVer(input: string): SemVer | null {
  const m = SEMVER_RE.exec(input.trim());
  if (!m) return null;
  return {
    major: Number(m[1]),
    minor: Number(m[2]),
    patch: m[3] !== undefined ? Number(m[3]) : 0,
    raw: m[0],
  };
}

export function compareSemVer(a: SemVer, b: SemVer): number {
  return a.major - b.major || a.minor - b.minor || a.patch - b.patch;
}

export function formatSemVer(v: SemVer): string {
  return `${v.major}.${v.minor}.${v.patch}`;
}
