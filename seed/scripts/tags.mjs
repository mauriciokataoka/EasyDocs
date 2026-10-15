#!/usr/bin/env node
// @ADR-0012
// Valida a rastreabilidade código↔docs: toda entidade pública precisa de @ADR-NNNN, @PRD ou @ROADMAP R-NNN
// (acima dela ou no cabeçalho do arquivo, que cobre o módulo). Sem dependências; Node >= 18.
// Config opcional `.taglintrc` (JSON): { "include": ["src"], "exclude": ["gerado"] }  — padrão: include ["src"].
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const cfg = { include: ["src"], exclude: [], ...(fs.existsSync(path.join(root, ".taglintrc")) ? JSON.parse(fs.readFileSync(path.join(root, ".taglintrc"), "utf8")) : {}) };
const PUBLIC = [
  [/\.(?:[cm]?[jt]sx?)$/, /^\s*export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|class|const|let|var|interface|type|enum)\b/],
  [/\.py$/, /^(?:async\s+def|def|class)\s+[A-Za-z]/],
  [/\.go$/, /^(?:func\s+(?:\([^)]*\)\s*)?[A-Z]|type\s+[A-Z])/],
  [/\.rs$/, /^\s*pub(?:\([^)]*\))?\s+(?:async\s+)?(?:fn|struct|enum|trait|mod|const|type)\b/],
];
const TAG = /@(?:ADR-\d{4}|PRD|ROADMAP)\b/;
const COMMENTISH = /^\s*(?:$|\/\/|\/\*|\*|#|@|"""|''')/;
const errors = [];

const adrIds = fs.existsSync(path.join(root, "docs/adr")) ? new Set(fs.readdirSync(path.join(root, "docs/adr")).map((n) => /^\d{4}/.exec(n)?.[0]).filter(Boolean)) : null;
const roadmapText = ["docs/ROADMAP.md", ...(fs.existsSync(path.join(root, "docs/history/roadmap")) ? fs.readdirSync(path.join(root, "docs/history/roadmap")).map((n) => `docs/history/roadmap/${n}`) : [])]
  .filter((f) => fs.existsSync(path.join(root, f))).map((f) => fs.readFileSync(path.join(root, f), "utf8")).join("\n");

function files(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (cfg.exclude.some((x) => path.relative(root, p).startsWith(x)) || ["node_modules", ".git", "dist", "build"].includes(e.name)) continue;
    if (e.isDirectory()) files(p, out);
    else if (e.isFile() && !/(\.|_)(test|spec)\b|^test_/.test(e.name)) out.push(p);
  }
  return out;
}

for (const f of cfg.include.flatMap((d) => files(path.join(root, d)))) {
  const rule = PUBLIC.find(([ext]) => ext.test(f));
  if (!rule) continue;
  const lines = fs.readFileSync(f, "utf8").split("\n");
  const rel = path.relative(root, f);
  // referências inexistentes
  lines.forEach((l, i) => {
    for (const m of l.matchAll(/@ADR-(\d{4})\b/g)) if (adrIds && !adrIds.has(m[1])) errors.push(`${rel}:${i + 1}: @ADR-${m[1]} não existe em docs/adr/`);
    for (const m of l.matchAll(/@ROADMAP\s+(R-\d+)\b/g)) if (!new RegExp(`(^|[^\\w-])${m[1]}(?!\\d)`).test(roadmapText)) errors.push(`${rel}:${i + 1}: ${m[1]} não existe no ROADMAP nem em docs/history/roadmap/`);
  });
  if (lines.slice(0, 15).some((l) => TAG.test(l))) continue; // cabeçalho cobre o módulo
  lines.forEach((l, i) => {
    if (!rule[1].test(l)) return;
    let j = i - 1;
    const above = [];
    while (j >= 0 && i - j <= 8 && COMMENTISH.test(lines[j])) above.push(lines[j--]);
    const below = f.endsWith(".py") ? lines.slice(i + 1, i + 5) : [];
    if (![...above, ...below].some((x) => TAG.test(x))) errors.push(`${rel}:${i + 1}: entidade pública sem @ADR/@PRD/@ROADMAP: ${l.trim().slice(0, 60)}`);
  });
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
