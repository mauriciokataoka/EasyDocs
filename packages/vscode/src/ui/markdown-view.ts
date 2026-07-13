function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

export function renderMarkdown(src: string): HTMLElement {
  const root = document.createElement("div");
  root.className = "md";
  const lines = src.split("\n");
  let i = 0;
  let list: HTMLElement | null = null;

  const closeList = () => { list = null; };

  while (i < lines.length) {
    const line = lines[i]!;

    const fence = /^```(.*)$/.exec(line);
    if (fence) {
      closeList();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i]!)) buf.push(lines[i++]!);
      i++;
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = buf.join("\n");
      pre.appendChild(code);
      root.appendChild(pre);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      closeList();
      const h = document.createElement("h" + heading[1]!.length);
      h.innerHTML = inline(heading[2]!);
      root.appendChild(h);
      i++;
      continue;
    }

    const li = /^\s*[-*+]\s+(.*)$/.exec(line);
    if (li) {
      if (!list) {
        list = document.createElement("ul");
        root.appendChild(list);
      }
      const item = document.createElement("li");
      item.innerHTML = inline(li[1]!);
      list.appendChild(item);
      i++;
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      closeList();
      const bq = document.createElement("blockquote");
      bq.innerHTML = inline(quote[1]!);
      root.appendChild(bq);
      i++;
      continue;
    }

    if (!line.trim()) {
      closeList();
      i++;
      continue;
    }

    closeList();
    const p = document.createElement("p");
    const buf = [line];
    i++;
    while (i < lines.length && lines[i]!.trim() && !/^(#{1,6}\s|```|>\s?|\s*[-*+]\s)/.test(lines[i]!)) {
      buf.push(lines[i++]!);
    }
    p.innerHTML = inline(buf.join(" "));
    root.appendChild(p);
  }

  return root;
}
