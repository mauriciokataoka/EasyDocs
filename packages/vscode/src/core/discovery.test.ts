import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { nodeFs } from "./node-fs.ts";
import { discover } from "./discovery.ts";
import { loadProjectDocs } from "./index.ts";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = join(here, "..", "..", "docs(example)");

test("discover: acha ROADMAP, CHANGELOG e adr/", async () => {
  const found = await discover(nodeFs(), fixture);
  assert.ok(found.roadmap?.endsWith("ROADMAP.md"), "roadmap");
  assert.ok(found.changelog?.endsWith("CHANGELOG.md"), "changelog");
  assert.ok(found.adrDir?.endsWith("adr"), "adrDir");
});

test("loadProjectDocs: carrega tudo", async () => {
  const docs = await loadProjectDocs(nodeFs(), fixture);
  assert.ok((docs.roadmap?.versions.length ?? 0) >= 8);
  assert.ok((docs.changelog?.versions.length ?? 0) >= 5);
  assert.ok((docs.adrs?.all.length ?? 0) >= 20, `adrs: ${docs.adrs?.all.length}`);
  assert.ok(docs.adrs?.byStatus.has("Accepted"));
});

test("loadProjectDocs: inclui docs genéricos, sem ADRs nem os 3 especiais", async () => {
  const docs = await loadProjectDocs(nodeFs(), fixture);
  const names = docs.others.map((o) => o.name);
  assert.ok(names.length > 0, "esperava docs genéricos");
  assert.ok(names.includes("GAME-DESIGN.md") || names.includes("ARCHITECTURE.md"), `nomes: ${names.join(",")}`);
  assert.ok(!names.includes("ROADMAP.md"), "ROADMAP não deve virar genérico");
  assert.ok(!names.includes("CHANGELOG.md"), "CHANGELOG não deve virar genérico");
  assert.ok(!names.some((n) => /^\d{3}-/.test(n)), "ADRs não devem virar genéricos");
});
