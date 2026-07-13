import { renderDoc } from "../ui/render.ts";
import type { ViewData } from "../ui/render.ts";

const app = document.getElementById("app")!;

window.addEventListener("message", (e) => {
  const m = e.data;
  if (m && m.type === "doc" && m.view) {
    renderDoc(app, m.view as ViewData);
  }
});

export {};
