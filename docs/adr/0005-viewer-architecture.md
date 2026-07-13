Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0005 — Arquitetura do visualizador (núcleo compartilhado + cascas)

- Status: active
- Domínio: architecture

## Contexto
O visualizador precisa rodar tanto no VSCode quanto em HTML sem duplicar lógica de parsing/apresentação.

## Decisão
- **Núcleo compartilhado** (`src/core`): parsers e modelo — `discovery` (varre a pasta), `roadmap-parser`, `adr-parser`, `semver`, `markdown`, `fs`/`node-fs` (abstração de sistema de arquivos), `model` (tipos), `index`.
- **UI** (`src/ui`): `render`, `markdown-view`, `style.css` (apresentação independente de casca).
- **VSCode host** (`src/vscode`): `extension` (entrypoint/customEditor), `webview`, `host-fs` (implementação de fs para o VSCode).
- **Build:** `esbuild` (`build.mjs`) gera `dist/extension.js` (cjs, external vscode), `dist/webview.js` (iife) e `dist/webview.css`.
- **Pontos de entrada VSCode:** customEditor `easydocs.structuredView` para `ROADMAP.md`/`CHANGELOG.md`; view `easydocsView` no explorer; comando `easydocs.showAdrs`.
- **Corpus de teste:** `docs(example)/` — doc real de projeto externo ("Mega Word Challenge": ROADMAP/CHANGELOG SemVer + 28 ADRs + history) usada como fixture.
- **Integração neste repo:** o pacote da extensão vive em `packages/vscode/` (a integrar; histórico via subtree do projeto Planner).

## Consequências
- Lógica de parsing única, reusada pelas duas cascas.
- HTML e VSCode compartilham o mesmo modelo de dados.
- `node-fs`/`host-fs` isola acesso a arquivos para suportar ambos os ambientes.
- Código existente (Planner) **não validado em execução** — decidir *reaproveitar vs reescrever* no momento de implementar (ver ROADMAP).
