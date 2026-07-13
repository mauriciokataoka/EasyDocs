import type { Feature, Adr, AdrSection, VersionGroup } from "../core/model.ts";
import { renderMarkdown } from "./markdown-view.ts";

export interface RoadmapView {
  kind: "roadmap";
  title: string;
  orphans: Feature[];
  versions: VersionGroup[];
}

export interface AdrsView {
  kind: "adrs";
  title: string;
  tree: { status: string; adrs: Array<{ id: string; title: string; date: string; sections: AdrSection[] }> }[];
}

export interface GenericView {
  kind: "generic";
  title: string;
  raw: string;
}

export type ViewData = RoadmapView | AdrsView | GenericView;

function el(tag: string, cls?: string, text?: string): HTMLElement {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function featureCard(f: Feature): HTMLElement {
  const card = el("div", "card");
  card.dataset.text = (f.title + " " + f.body + " " + (f.group ?? "")).toLowerCase();
  const head = el("div", "card-head");
  if (f.status) head.appendChild(el("span", "badge", f.status));
  head.appendChild(el("span", "card-title", f.title));
  card.appendChild(head);
  if (f.group) card.appendChild(el("div", "card-group", f.group));
  if (f.body) card.appendChild(el("div", "card-body", f.body));
  return card;
}

function sectionCard(s: AdrSection): HTMLElement {
  const card = el("div", "card");
  card.dataset.text = (s.heading + " " + s.body).toLowerCase();
  card.appendChild(el("div", "card-title", s.heading));
  card.appendChild(el("div", "card-body", s.body));
  return card;
}

function collapsible(title: string, meta: string, count: number, open: boolean, extraCls?: string): { root: HTMLElement; body: HTMLElement } {
  const root = el("div", "group" + (extraCls ? " " + extraCls : ""));
  const head = el("div", "group-head");
  head.appendChild(el("span", "chevron", open ? "▾" : "▸"));
  head.appendChild(el("span", "group-title", title));
  if (meta) head.appendChild(el("span", "group-meta", meta));
  head.appendChild(el("span", "group-count", String(count)));
  const body = el("div", "group-body");
  body.style.display = open ? "block" : "none";
  head.addEventListener("click", () => {
    const showing = body.style.display !== "none";
    body.style.display = showing ? "none" : "block";
    head.querySelector(".chevron")!.textContent = showing ? "▸" : "▾";
  });
  root.appendChild(head);
  root.appendChild(body);
  return { root, body };
}

function renderRoadmap(doc: RoadmapView): HTMLElement {
  const wrap = el("div", "doc");
  if (doc.orphans.length) {
    const { root, body } = collapsible("Órfãs (sem versão)", "", doc.orphans.length, false, "orphans");
    doc.orphans.forEach((f) => body.appendChild(featureCard(f)));
    wrap.appendChild(root);
  }
  doc.versions.forEach((v, i) => {
    const { root, body } = collapsible(v.label, v.date ?? "", v.features.length, i === 0);
    v.features.forEach((f) => body.appendChild(featureCard(f)));
    wrap.appendChild(root);
  });
  return wrap;
}

function renderAdrs(view: AdrsView): HTMLElement {
  const wrap = el("div", "doc");
  for (const bucket of view.tree) {
    const { root, body } = collapsible(bucket.status, "", bucket.adrs.length, true);
    bucket.adrs.forEach((adr) => {
      const { root: aRoot, body: aBody } = collapsible(`${adr.id} — ${adr.title}`, adr.date ?? "", adr.sections.length, false);
      aRoot.classList.add("adr");
      adr.sections.forEach((s) => aBody.appendChild(sectionCard(s)));
      body.appendChild(aRoot);
    });
    wrap.appendChild(root);
  }
  return wrap;
}

function renderGeneric(doc: GenericView): HTMLElement {
  const wrap = el("div", "doc");
  const card = el("div", "card");
  card.dataset.text = doc.raw.toLowerCase();
  card.appendChild(renderMarkdown(doc.raw));
  wrap.appendChild(card);
  return wrap;
}

export function renderDoc(container: HTMLElement, vd: ViewData): void {
  container.innerHTML = "";
  const header = el("div", "toolbar");
  const search = el("input", "search") as HTMLInputElement;
  search.type = "search";
  search.placeholder = "Buscar por texto…";
  header.appendChild(search);
  container.appendChild(header);

  const title = el("div", "doc-title", vd.title);
  container.appendChild(title);

  const content = el("div", "content");
  if (vd.kind === "roadmap") content.appendChild(renderRoadmap(vd));
  else if (vd.kind === "adrs") content.appendChild(renderAdrs(vd));
  else content.appendChild(renderGeneric(vd));
  container.appendChild(content);

  if (!content.children.length) content.appendChild(el("div", "empty", "Documento vazio."));

  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    content.querySelectorAll<HTMLElement>(".card").forEach((c) => {
      c.style.display = !q || (c.dataset.text ?? "").includes(q) ? "" : "none";
    });
    content.querySelectorAll<HTMLElement>(".group").forEach((g) => {
      const body = g.querySelector<HTMLElement>(".group-body");
      if (!body) return;
      const anyVisible = [...body.querySelectorAll<HTMLElement>(".card")].some((c) => c.style.display !== "none");
      g.style.display = !q || anyVisible ? "" : "none";
    });
  });
}
