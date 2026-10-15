#!/usr/bin/env node
// Verificação genérica das docs (ADR 0015). Sem dependências; Node >= 18.
// Uso: node scripts/check.mjs [--ignore dir1,dir2]   (executar na raiz do projeto)
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const ignoreArg = process.argv.indexOf("--ignore");
const SKIP = new Set(["node_modules", ".git", "dist", "build", ".next", "docs(example)",
  ...(ignoreArg > 0 ? process.argv[ignoreArg + 1].split(",") : [])]);
const STATUS = new Set(["proposed", "accepted", "superseded", "deprecated"]);
const errors = [];
const warns = [];
const rel = (p) => path.relative(root, p) || ".";
const fail = (f, m) => errors.push(`${rel(f)}: ${m}`);

// history/ preserva texto original: só os INDEX.md são verificados.
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP.has(e.name)) walk(p, out);
    } else if (e.name.endsWith(".md")) {
      const archived = rel(p).split(path.sep)[0] === "history" && e.name !== "INDEX.md";
      if (!archived) out.push(p);
    }
  }
  return out;
}

const stripCode = (s) => s.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
const slug = (h) => h.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "")
  .toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s/g, "-");
const anchorCache = new Map();
function anchors(file) {
  if (!anchorCache.has(file)) {
    const seen = new Map();
    const set = new Set();
    for (const m of stripCode(fs.readFileSync(file, "utf8")).matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)) {
      const s = slug(m[1]);
      const n = seen.get(s) ?? 0;
      seen.set(s, n + 1);
      set.add(n ? `${s}-${n}` : s);
    }
    anchorCache.set(file, set);
  }
  return anchorCache.get(file);
}

// 1. Links relativos, âncoras e wikilinks
const files = walk(root);
for (const f of files) {
  const text = stripCode(fs.readFileSync(f, "utf8"));
  if (/\[\[[^\]\n]+\]\]/.test(text)) fail(f, "contém [[wikilink]] (use link Markdown relativo — ADR 0013)");
  for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const href = decodeURIComponent(m[1]);
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) continue;
    const [p, frag = ""] = href.split("#");
    const target = p ? path.resolve(path.dirname(f), p) : f;
    if (!fs.existsSync(target)) { fail(f, `link quebrado → ${href}`); continue; }
    if (frag && !/^L\d+/.test(frag) && target.endsWith(".md") && !anchors(target).has(frag)) {
      fail(f, `âncora inexistente → ${href}`);
    }
  }
}

// 2. ADRs: status válido e coerente com o INDEX
const adrDir = path.join(root, "docs/adr");
if (fs.existsSync(path.join(adrDir, "INDEX.md"))) {
  const index = fs.readFileSync(path.join(adrDir, "INDEX.md"), "utf8");
  const rows = new Map([...index.matchAll(/^\|\s*(\d{4})\s*\|.*\|\s*([a-z]+)\s*\|\s*$/gm)].map((m) => [m[1], m[2]]));
  const adrs = fs.readdirSync(adrDir).filter((n) => /^\d{4}-.+\.md$/.test(n) && !n.startsWith("0000-"));
  for (const n of adrs) {
    const f = path.join(adrDir, n);
    const id = n.slice(0, 4);
    const st = /^-\s*Status:\s*([a-z]+)/im.exec(fs.readFileSync(f, "utf8"))?.[1]?.toLowerCase();
    if (!st || !STATUS.has(st)) fail(f, `Status ausente ou inválido (${[...STATUS].join(" | ")})`);
    else if (!rows.has(id)) fail(f, "ADR não consta no INDEX.md");
    else if (rows.get(id) !== st) fail(f, `status '${st}' difere do INDEX.md ('${rows.get(id)}')`);
    rows.delete(id);
  }
  for (const id of rows.keys()) fail(path.join(adrDir, "INDEX.md"), `linha ${id} sem arquivo`);
}

// 3. IDs R-NNN únicos (ROADMAP × history/roadmap)
const roadmap = path.join(root, "docs/ROADMAP.md");
const ids = new Map();
const addId = (id, where) => ids.set(id, [...(ids.get(id) ?? []), where]);
if (fs.existsSync(roadmap)) {
  for (const m of stripCode(fs.readFileSync(roadmap, "utf8")).matchAll(/^\s*[-*]\s+\*\*(R-\d+)\b/gm)) addId(m[1], "ROADMAP");
}
const hist = path.join(root, "history/roadmap");
if (fs.existsSync(hist)) {
  for (const n of fs.readdirSync(hist)) {
    const m = /^(R-\d+)-.+\.md$/.exec(n);
    if (m) addId(m[1], `history/roadmap/${n}`);
  }
}
for (const [id, where] of ids) if (where.length > 1) fail(roadmap, `${id} duplicado (${where.join(", ")}) — IDs nunca são reutilizados`);

// 4. Versão: package.json × topo do CHANGELOG; tag ausente = aviso
const changelog = path.join(root, "docs/CHANGELOG.md");
const top = fs.existsSync(changelog) ? /^## \[(\d+\.\d+\.\d+)\]/m.exec(fs.readFileSync(changelog, "utf8"))?.[1] : undefined;
if (top) {
  const manifests = [path.join(root, "package.json")];
  const pk = path.join(root, "packages");
  if (fs.existsSync(pk)) for (const d of fs.readdirSync(pk)) manifests.push(path.join(pk, d, "package.json"));
  for (const m of manifests.filter(fs.existsSync)) {
    const v = JSON.parse(fs.readFileSync(m, "utf8")).version;
    if (v && v !== top) fail(m, `versão ${v} difere do topo do CHANGELOG (${top})`);
  }
  try {
    if (!execSync(`git tag --list v${top}`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim()) {
      warns.push(`tag v${top} não existe (criar no release: git tag -a v${top} -m "Release ${top}")`);
    }
  } catch { /* sem git: ignora */ }
}

for (const w of warns) console.warn(`aviso: ${w}`);
if (errors.length) {
  console.error(errors.map((e) => `erro: ${e}`).join("\n"));
  console.error(`\n✘ check das docs falhou (${errors.length})`);
  process.exit(1);
}
console.log(`✔ check das docs ok (${files.length} arquivos .md)`);
