// Regressão: o bump deve considerar TODOS os commits desde a última tag (não só o mais recente).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

test("release: feat antigo + fix recente => minor", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "rel-"));
  const sh = (c, ...a) => execFileSync(c, a, { cwd: dir, encoding: "utf8", env: { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t" } });
  fs.mkdirSync(path.join(dir, "scripts"));
  fs.mkdirSync(path.join(dir, "docs"));
  for (const f of ["check.mjs", "release.mjs"]) fs.copyFileSync(new URL(f, import.meta.url), path.join(dir, "scripts", f));
  fs.writeFileSync(path.join(dir, "docs/CHANGELOG.md"), "# CL\n\n## [Unreleased]\n\n- x\n\n## [0.1.0] - 2026-01-01\n");
  sh("git", "init", "-q", "-b", "main");
  sh("git", "add", "-A"); sh("git", "commit", "-qm", "chore: base"); sh("git", "tag", "-a", "v0.1.0", "-m", "r");
  for (const m of ["feat: a", "fix: b", "docs: c"]) { fs.appendFileSync(path.join(dir, "f"), m); sh("git", "add", "-A"); sh("git", "commit", "-qm", m); }
  sh("node", "scripts/release.mjs", "--no-push");
  assert.match(sh("git", "tag", "-l"), /v0\.2\.0/);
  fs.rmSync(dir, { recursive: true, force: true });
});
