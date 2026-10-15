// Regressão do views.mjs: só ADR accepted do domínio; links reescritos; --check detecta view desatualizada (inclusive pelo check.mjs).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const script = (n) => new URL(n, import.meta.url).pathname;

test("views: filtra por status/domínio, reescreve links e detecta desatualização", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "views-"));
  const adr = (id, status, domain, extra = "") => fs.writeFileSync(path.join(dir, `docs/adr/${id}-x.md`),
    `# ADR ${id} — Título ${id}\n\n- Status: ${status}\n- Domínio: ${domain}\n\n## Contexto\nc\n\n## Decisão\nDecide ${id} ${extra}\n\n## Consequências\nCons ${id}\n`);
  fs.mkdirSync(path.join(dir, "docs/adr"), { recursive: true });
  adr("0001", "accepted", "architecture", "ver [outra](0002-x.md)");
  adr("0002", "proposed", "architecture");
  adr("0003", "superseded", "architecture");
  adr("0004", "accepted", "design");
  fs.writeFileSync(path.join(dir, "docs/adr/INDEX.md"), "| 0001 | t | architecture | accepted |\n| 0002 | t | architecture | proposed |\n| 0003 | t | architecture | superseded |\n| 0004 | t | design | accepted |\n");
  const run = (...a) => spawnSync("node", a, { cwd: dir, encoding: "utf8" });
  assert.equal(run(script("views.mjs"), "--check").status, 1); // ainda não existem
  assert.equal(run(script("views.mjs")).status, 0);
  const arch = fs.readFileSync(path.join(dir, "docs/ARCHITECTURE.md"), "utf8");
  assert.match(arch, /ADR 0001 — Título 0001/);
  assert.match(arch, /\]\(adr\/0002-x\.md\)/); // link rebaseado
  assert.doesNotMatch(arch, /0002 —|0003 —/); // proposed/superseded fora
  assert.match(fs.readFileSync(path.join(dir, "docs/DESIGN.md"), "utf8"), /ADR 0004/);
  assert.equal(run(script("views.mjs"), "--check").status, 0);
  assert.equal(run(script("check.mjs")).status, 1 - 1); // check completo ok
  adr("0001", "accepted", "architecture", "mudou");
  assert.equal(run(script("check.mjs")).status, 1); // view desatualizada reprova o check
  fs.rmSync(dir, { recursive: true, force: true });
});
