// Regressão: INDEX de ADR com link na 1ª coluna (`[ADR-0001](x.md)`) é aceito; status divergente é rejeitado.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const run = (index) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "chk-"));
  fs.mkdirSync(path.join(dir, "docs/adr"), { recursive: true });
  fs.writeFileSync(path.join(dir, "docs/adr/0001-x.md"), "# ADR\n\n- Status: accepted\n");
  fs.writeFileSync(path.join(dir, "docs/adr/INDEX.md"), index);
  const r = spawnSync("node", [new URL("check.mjs", import.meta.url).pathname], { cwd: dir });
  fs.rmSync(dir, { recursive: true, force: true });
  return r.status;
};

test("check: INDEX com link, número puro e status divergente", () => {
  assert.equal(run("| [ADR-0001](0001-x.md) | t | protocol | accepted |\n"), 0);
  assert.equal(run("| 0001 | t | protocol | accepted |\n"), 0);
  assert.equal(run("| 0001 | t | protocol | proposed |\n"), 1);
});
