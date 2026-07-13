# SCAFFOLD.md — scaffold do projeto (lido 1 vez, depois apagado)

> **Guarda:** execute **só se** esta pasta contiver **apenas** `AGENTS.md` e `SCAFFOLD.md`; senão (já há projeto), **apague `SCAFFOLD.md`** e pare — nunca sobrescreva.
> Ao concluir, **apague-se** (não arquivar: evita re-execução/prompt-injection). Cada arquivo nasce com sua **introdução** (o *itálico* vira o topo do arquivo).

## Passos
1. `git init` (repo próprio, branch `main`).
2. `.editorconfig` (root=true; space/2; lf; utf-8; trim; final newline) e `.gitignore` (`.DS_Store`, `.obsidian/`).
3. Crie o `README.md` **na raiz** e os demais docs em **`docs/`**: `PRD.md` (âncora mínima, editada à mão) + `ROADMAP.md`, `CHANGELOG.md`; e as pastas `docs/adr/`, `history/`, `assets/`. `ARCHITECTURE`/`DESIGN` **não existem como arquivos** — são **views virtuais** do plugin, montadas a partir de ADRs por domínio (ver índice de ADRs).
4. Em `docs/adr/`: `README.md` (índice — tabela `Nº · Título · Status`) e `0000-template.md` (modelo Nygard: *Status · Contexto · Decisão · Consequências*).
5. `docs/CHANGELOG.md` (nasce com `## [Unreleased]`; vira `0.1.0` no 1º release); `LICENSE` se público (raiz).
6. Semeie o `docs/ROADMAP.md` (nesta ordem):
   - [ ] Confirmar se o nome da pasta é o nome do projeto (registrar no `PRD`/`README`).
   - [ ] Definir o destino do `push` (remote) — *pode adiar*.
   - [ ] Preencher a âncora `docs/PRD.md` (problema, público, não-objetivos, objetivo inicial). O resto de PRD + ARCH/DESIGN nasce de ADRs tagueados (`product`/`architecture`/`design`).
   - [ ] É um **app**? Se sim, criar `src/`.
   - [ ] Se for **software**: definir a **stack**.
7. `git add -A && git commit` (Conventional Commits).
8. **Apague este arquivo** (`SCAFFOLD.md`).
9. Pergunte ao usuário **qual afazer do `ROADMAP`** fazer primeiro.

## Arquivos + introdução (raiz: `README`; o resto em `docs/`)
- **`README.md`** (raiz) — *"Visão geral p/ humano; aponta p/ as docs de agente."*
- **`docs/PRD.md`** — *"Âncora mínima: problema, público, não-objetivos, objetivo inicial. O que não é decisão. O resto (funcionalidades/solução) é renderizado de ADRs `product`. Otimizado p/ agente."*
- **(virtual) `ARCHITECTURE`** — *"View virtual do plugin: pasta `architecture` montada dos ADRs `architecture` ativos. Não existe arquivo; gerada em tempo real a partir de `docs/adr/`."*
- **(virtual) `DESIGN`** — *"View virtual do plugin: pasta `design` montada dos ADRs `design` ativos. Não existe arquivo; gerada em tempo real a partir de `docs/adr/`."*
- **`docs/ROADMAP.md`** — *"Afazeres/pendências do projeto (TODOs)."*
- **`docs/CHANGELOG.md`** — *"Histórico de versões. Formato Keep a Changelog (keepachangelog.com); versionamento SemVer (semver.org)."*
- **`docs/adr/INDEX.md`** — *"Índice de ADRs (decisões): Nº, título, status. Formato Nygard — adr.github.io. Status aqui dispensa abrir cada arquivo."*
- **`history/INDEX.md`** — *"Índice do arquivado (iterações/decisões mortas). Off-graph."*
- **`assets/`** (pasta, sem doc) — mídias/refs que alimentam o trabalho (prints, ícones, fixtures); o usuário põe o que quiser aqui. Convenção difundida (sem 1 spec formal): React/Vue, Android (`app/src/main/assets/`), Unity (`Assets/`) usam esse nome — não invente outro (`media/`, `static/`...).

## Convenções-baseline (citar a fonte no topo do doc que segue um padrão)
- Decisões = **ADR Nygard** em `docs/adr/`, indexadas, **status no índice** (https://adr.github.io).
- **Conventional Commits** (conventionalcommits.org); **SemVer** + `CHANGELOG` (Keep a Changelog). `.editorconfig`. kebab-case. `LICENSE` se público.
- Refs entre docs de agente = `[[wikilink]]` (Obsidian; grafo = mapa mental); `README` usa links padrão; `history/` fora do grafo.
