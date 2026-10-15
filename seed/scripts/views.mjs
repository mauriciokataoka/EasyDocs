#!/usr/bin/env node
// @ADR-0018
// Gera docs/ARCHITECTURE.md e docs/DESIGN.md a partir das ADRs aceitas (ADR 0018). Sem dependências; Node >= 18.
// Uso: node scripts/views.mjs [--check]   (na raiz do projeto; --check só verifica se estão atualizados)
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docs = path.join(root, "docs");
const adrDir = path.join(docs, "adr");
const VIEWS = { architecture: "ARCHITECTURE.md", design: "DESIGN.md" };

const section = (text, name) => new RegExp(`^## ${name}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m").exec(text)?.[1].trim() ?? "";
// links relativos das ADRs (relativos a docs/adr/) passam a valer a partir de docs/
const rebase = (md) => md.replace(/\]\(([^)\s#]+)(#[^)\s]*)?\)/g, (m, p, h = "") =>
  /^([a-z][a-z0-9+.-]*:|\/)/i.test(p) ? m : `](${path.relative(docs, path.resolve(adrDir, p)).split(path.sep).join("/")}${h})`);

const adrs = fs.existsSync(adrDir)
  ? fs.readdirSync(adrDir).filter((n) => /^\d{4}-.+\.md$/.test(n) && !n.startsWith("0000-")).sort().map((n) => {
      const text = fs.readFileSync(path.join(adrDir, n), "utf8");
      return {
        n, id: n.slice(0, 4),
        title: (/^# (?:ADR[ -]?\d+\s*[—–-]\s*)?(.+)$/m.exec(text)?.[1] ?? n).trim(),
        status: /^-\s*Status:\s*([a-z]+)/im.exec(text)?.[1]?.toLowerCase(),
        domain: /^-\s*Dom[ií]nio:\s*([a-z]+)/im.exec(text)?.[1]?.toLowerCase(),
        decisao: section(text, "Decisão"), consequencias: section(text, "Consequências"),
      };
    })
  : [];

const render = (domain) => {
  const items = adrs.filter((a) => a.status === "accepted" && a.domain === domain);
  const body = items.length
    ? items.map((a) => `## ADR ${a.id} — ${a.title}\n\nFonte: [ADR ${a.id}](adr/${a.n})\n\n**Decisão**\n\n${rebase(a.decisao)}\n\n**Consequências**\n\n${rebase(a.consequencias)}\n`).join("\n")
    : "_Nenhuma ADR aceita neste domínio ainda._\n";
  return `View gerada por \`scripts/views.mjs\` a partir das ADRs aceitas do domínio \`${domain}\`. Não edite: altere a ADR e rode \`node scripts/views.mjs\`.\n\n# ${VIEWS[domain].replace(".md", "")}\n\n${body}`;
};

let stale = 0;
for (const [domain, file] of Object.entries(VIEWS)) {
  const out = path.join(docs, file);
  const next = render(domain);
  const cur = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : null;
  if (cur === next) continue;
  if (process.argv.includes("--check")) { console.error(`${path.relative(root, out)} desatualizado — rode: node scripts/views.mjs`); stale = 1; }
  else { fs.mkdirSync(docs, { recursive: true }); fs.writeFileSync(out, next); console.log(`gerado ${path.relative(root, out)}`); }
}
process.exit(stale);
