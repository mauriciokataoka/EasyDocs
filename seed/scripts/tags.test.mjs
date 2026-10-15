// @ADR-0012
// Regressão do tags.mjs: entidade pública sem tag reprova; tag acima ou no cabeçalho aprova; referência inexistente reprova.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

test("tags: sem tag falha; com tag (acima/cabeçalho) passa; ID inexistente falha", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tags-"));
  fs.mkdirSync(path.join(dir, "src"), { recursive: true });
  fs.mkdirSync(path.join(dir, "docs/adr"), { recursive: true });
  fs.writeFileSync(path.join(dir, "docs/adr/0001-x.md"), "# ADR\n");
  fs.writeFileSync(path.join(dir, "docs/ROADMAP.md"), "- **R-004 — x**\n");
  const put = (name, text) => fs.writeFileSync(path.join(dir, "src", name), text);
  const run = () => spawnSync("node", [new URL("tags.mjs", import.meta.url).pathname], { cwd: dir, encoding: "utf8" }).status;
  put("a.ts", "export function f() {}\n");
  assert.equal(run(), 1); // sem tag
  put("a.ts", "// @ROADMAP R-004\nexport function f() {}\n");
  assert.equal(run(), 0); // tag acima / cabeçalho
  put("a.ts", "// @ADR-0099\nexport function f() {}\n");
  assert.equal(run(), 1); // ADR inexistente
  put("a.ts", "// @ROADMAP R-00\nexport function f() {}\n");
  assert.equal(run(), 1); // R-00 não pode casar por substring com R-004
  put("a.ts", "const x = 1;\n"); // sem entidade pública
  put("b.py", "def g():\n    pass\n");
  assert.equal(run(), 1); // python sem tag
  put("b.py", "# @ADR-0001\ndef g():\n    pass\n");
  assert.equal(run(), 0);
  fs.rmSync(dir, { recursive: true, force: true });
});
