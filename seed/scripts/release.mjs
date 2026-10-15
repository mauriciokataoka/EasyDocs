#!/usr/bin/env node
// Release automático SemVer (ADR 0015). Sem dependências; Node >= 18.
// Uso: node scripts/release.mjs [--bump major|minor|patch] [--no-push]
// Calcula o bump pelos Conventional Commits desde a última tag vX.Y.Z, move [Unreleased]
// do CHANGELOG, espelha os package.json, commita, cria a tag annotated e dá push.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : undefined; };
const git = (...a) => execFileSync("git", a, { cwd: root, encoding: "utf8" }).trim();
const die = (m) => { console.error(`✘ release: ${m}`); process.exit(1); };

const branch = git("branch", "--show-current");
if (!["main", "master"].includes(branch)) die(`rode na main (branch atual: ${branch}) — código entra na main antes do release.`);
if (git("status", "--porcelain")) die("working tree suja — commite antes (o release só usa commits).");

const pkg = path.join(root, "package.json");
const hasNpmCheck = fs.existsSync(pkg) && JSON.parse(fs.readFileSync(pkg, "utf8")).scripts?.check;
execFileSync(hasNpmCheck ? "npm" : "node", hasNpmCheck ? ["run", "check"] : ["scripts/check.mjs"], { cwd: root, stdio: "inherit" });

let tag = "";
try { tag = execFileSync("git", ["describe", "--tags", "--abbrev=0", "--match", "v[0-9]*"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { /* sem tag: base 0.0.0 */ }
const [maj, min, pat] = (tag.slice(1) || "0.0.0").split(".").map(Number);

let bump = arg("--bump");
if (!bump) {
  const log = git("log", tag ? `${tag}..HEAD` : "HEAD", "--format=%s%n%b%x00").split("\0").filter((c) => c.trim());
  for (const c of log) {
    const m = /^(\w+)(\([^)]*\))?(!)?:/.exec(c);
    if (!m || /^chore\(release\)/.test(c)) continue;
    if (m[3] || /^BREAKING[ -]CHANGE/m.test(c)) bump = "major";
    else if (m[1] === "feat" && bump !== "major") bump = "minor";
    else if (m[1] === "fix" && !bump) bump = "patch";
  }
}
if (!bump) { console.log("sem release: nenhum feat/fix/breaking desde a última tag."); process.exit(0); }
const next = !tag ? "0.1.0" : bump === "major" ? `${maj + 1}.0.0` : bump === "minor" ? `${maj}.${min + 1}.0` : `${maj}.${min}.${pat + 1}`;

const cl = path.join(root, "docs/CHANGELOG.md");
const text = fs.readFileSync(cl, "utf8");
if (!text.includes("## [Unreleased]")) die("CHANGELOG sem seção [Unreleased].");
const d = new Date();
const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
fs.writeFileSync(cl, text.replace("## [Unreleased]", `## [Unreleased]\n\n## [${next}] - ${date}`));

const manifests = [pkg, ...(fs.existsSync(path.join(root, "packages")) ? fs.readdirSync(path.join(root, "packages")).map((n) => path.join(root, "packages", n, "package.json")) : [])];
for (const m of manifests.filter(fs.existsSync)) {
  const j = JSON.parse(fs.readFileSync(m, "utf8"));
  if (!("version" in j)) continue;
  j.version = next;
  fs.writeFileSync(m, JSON.stringify(j, null, 2) + "\n");
  const lock = path.join(path.dirname(m), "package-lock.json");
  if (fs.existsSync(lock)) {
    const l = JSON.parse(fs.readFileSync(lock, "utf8"));
    l.version = next;
    if (l.packages?.[""]) l.packages[""].version = next;
    fs.writeFileSync(lock, JSON.stringify(l, null, 2) + "\n");
  }
}

git("add", "-A");
git("commit", "-m", `chore(release): v${next}`);
git("tag", "-a", `v${next}`, "-m", `Release ${next}`);
console.log(`✔ v${next} (${bump}) commitado e tagueado`);
if (!process.argv.includes("--no-push")) {
  git("push", "origin", "HEAD");
  git("push", "origin", `v${next}`);
  console.log("✔ push da branch e da tag");
}
