import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseRoadmap } from "./roadmap-parser.ts";
import { parseAdr, buildAdrTree } from "./adr-parser.ts";
import { parseSemVer, compareSemVer } from "./semver.ts";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = join(here, "..", "..", "docs(example)");
const read = (p: string) => readFileSync(join(fixture, p), "utf8");

test("semver parse/compare", () => {
  assert.deepEqual(parseSemVer("v5.3.0")?.raw, "v5.3.0");
  assert.equal(parseSemVer("## v5.2")?.minor, 2);
  assert.ok(compareSemVer(parseSemVer("v5.4.0")!, parseSemVer("v5.3.0")!) > 0);
});

test("roadmap: encontra versões e features", () => {
  const doc = parseRoadmap(read("ROADMAP.md"), "roadmap");
  const labels = doc.versions.map((v) => v.label);
  assert.ok(doc.versions.length >= 8, `poucas versões: ${doc.versions.length}`);
  assert.ok(labels.some((l) => l.includes("v5.4")), "faltou v5.4");
  assert.ok(labels.some((l) => l.includes("v6.0")), "faltou v6.0");
  const withFeatures = doc.versions.filter((v) => v.features.length > 0);
  assert.ok(withFeatures.length > 0, "nenhuma versão com features");
  assert.ok(doc.orphans.length > 0, "esperava features órfãs");
});

test("changelog: keep-a-changelog", () => {
  const doc = parseRoadmap(read("CHANGELOG.md"), "changelog");
  const labels = doc.versions.map((v) => v.label);
  assert.ok(labels.some((l) => /unreleased/i.test(l)), "faltou Unreleased");
  assert.ok(labels.some((l) => l.includes("v5.4.0")), "faltou v5.4.0");
  const v54 = doc.versions.find((v) => v.label.includes("v5.4.0"));
  assert.equal(v54?.date, "2026-07-12");
  assert.ok((v54?.features.length ?? 0) > 0, "v5.4.0 sem features");
});

test("adr: parse individual + árvore por status", () => {
  const adr = parseAdr("026-contador-social-dicas-limitadas.md", read("adr/026-contador-social-dicas-limitadas.md"));
  assert.equal(adr.id, "026");
  assert.equal(adr.status, "Accepted");
  assert.equal(adr.date, "2026-07-10");
  assert.ok(adr.sections.some((s) => s.heading === "Contexto"));
  assert.ok(adr.sections.some((s) => s.heading === "Decisão"));

  const proposed = parseAdr("025-x.md", read("adr/025-monetizacao-creditos-prepagos.md"));
  const tree = buildAdrTree([adr, proposed]);
  assert.deepEqual([...tree.byStatus.keys()].sort(), ["Accepted", "Proposed"]);
});
