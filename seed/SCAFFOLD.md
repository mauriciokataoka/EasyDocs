# SCAFFOLD.md — scaffold do projeto (lido 1 vez, depois apagado)

> **Guarda:** execute **só se** esta pasta contiver **apenas** os arquivos do seed (`AGENTS.md`, `SCAFFOLD.md`, `scripts/`, `.githooks/`, `.vscode/`); senão (já há projeto), **apague `SCAFFOLD.md`** e pare — nunca sobrescreva.
> Ao concluir, **apague-se** (não arquivar: evita re-execução/prompt-injection). Cada arquivo nasce com sua **introdução** (o *itálico* vira o topo do arquivo).

## Passos
1. `git init` (repo próprio, branch `main`) e `git config core.hooksPath .githooks` (ativa o hook `pre-push` que roda o `check`).
2. `.editorconfig` (root=true; space/2; lf; utf-8; trim; final newline) e `.gitignore` (`.DS_Store`).
3. Crie o `README.md` **na raiz** e os demais docs em **`docs/`**: `PRD.md` (âncora mínima, editada à mão), `ROADMAP.md`, `CHANGELOG.md`; e as pastas `docs/adr/`, `docs/field-notes/`, `docs/history/roadmap/`, `assets/`. `ARCHITECTURE`/`DESIGN` **não existem como arquivos** — são **views virtuais** das ADRs por domínio (ver índice de ADRs). Os scripts `scripts/check.mjs` (verificação) e `scripts/release.mjs` (versão automática) e o hook `.githooks/pre-push` já vêm no seed; **não os recrie**.
4. Em `docs/adr/`: `INDEX.md` (tabela `Nº · Título · Domínio · Status`, **uma linha por ADR**) e `0000-template.md` (modelo Nygard: *Status · Domínio · Contexto · Decisão · Alternativas · Consequências*; status `proposed | accepted | superseded | deprecated`; o `Status` fica numa linha `- Status: <valor>`). Em `docs/field-notes/INDEX.md`, `docs/history/INDEX.md` e `docs/history/roadmap/INDEX.md`: cabeçalho + tabela vazia (colunas em "Arquivos + introdução" abaixo).
5. `docs/CHANGELOG.md` (nasce com `## [Unreleased]`; o 1º `feat` gera `0.1.0` via `node scripts/release.mjs`); `LICENSE` se público (raiz).
6. Semeie o `docs/ROADMAP.md` no formato do `AGENTS.md` (seção `## v0.1.0`; itens `R-001`… com Estado, Objetivo, Escopo, Validação), nesta ordem:
   - **R-001 — Confirmar o nome do projeto** (nome da pasta = nome do projeto? registrar no `PRD`/`README`).
   - **R-002 — Definir o remote** (destino do push; o push é automático depois disso) — *pode adiar*.
   - **R-003 — Preencher a âncora `docs/PRD.md`** (problema, público, não-objetivos, objetivo inicial). O resto de PRD + ARCH/DESIGN nasce de ADRs tagueadas (`product`/`architecture`/`design`).
   - **R-004 — É um app?** Se sim, criar `src/`. **R-005 — Se for software:** definir a stack e estender o `check` com os testes do projeto.
7. Rode `node scripts/check.mjs` (deve passar), então `git add -A && git commit` (Conventional Commits) na `main` (docs vão direto na `main`; código, sempre em branch).
8. **Apague este arquivo** (`SCAFFOLD.md`) e faça um commit `chore: remover SCAFFOLD`.
9. Pergunte ao usuário **qual afazer do `ROADMAP`** fazer primeiro.

## Arquivos + introdução (raiz: `README`; o resto em `docs/`)
- **`README.md`** (raiz) — *"Visão geral p/ humano; aponta p/ as docs de agente."*
- **`docs/PRD.md`** — *"Âncora mínima: problema, público, não-objetivos, objetivo inicial. O que não é decisão. O resto (funcionalidades/solução) é renderizado de ADRs `product`. Otimizado p/ agente."*
- **(virtual) `ARCHITECTURE`** — *"View virtual do plugin: pasta `architecture` montada dos ADRs `architecture` ativos. Não existe arquivo; gerada em tempo real a partir de `docs/adr/`."*
- **(virtual) `DESIGN`** — *"View virtual do plugin: pasta `design` montada dos ADRs `design` ativos. Não existe arquivo; gerada em tempo real a partir de `docs/adr/`."*
- **`docs/ROADMAP.md`** — *"Afazeres/pendências do projeto (TODOs)."*
- **`docs/CHANGELOG.md`** — *"Histórico de versões. Formato Keep a Changelog (keepachangelog.com); versionamento SemVer (semver.org)."*
- **`docs/adr/INDEX.md`** — *"Índice de ADRs (decisões): Nº, título, domínio, status. Formato Nygard — adr.github.io. Status aqui dispensa abrir cada arquivo."*
- **`docs/field-notes/INDEX.md`** — *"Índice de notas de campo: evidências datadas e imutáveis de validação e uso real."* (tabela `Data · Nota · Estado`)
- **`docs/history/INDEX.md`** — *"Índice do arquivado (roadmap concluído, decisões mortas). Fora da leitura padrão."* e **`docs/history/roadmap/INDEX.md`** — *"Índice do ROADMAP arquivado; IDs `R-NNN` nunca são reutilizados."* (tabela `ID · Título · Estado final · Data · Assunto (palavras-chave) · Arquivo`)
- **`assets/`** (pasta, sem doc) — mídias/refs que alimentam o trabalho (prints, ícones, fixtures); o usuário põe o que quiser aqui. Convenção difundida (sem 1 spec formal): React/Vue, Android (`app/src/main/assets/`), Unity (`Assets/`) usam esse nome — não invente outro (`media/`, `static/`...).

## Convenções-baseline (citar a fonte no topo do doc que segue um padrão)
- **AGENTS.md** (https://agents.md): formato aberto de instruções para coding agents; `AGENTS.md` na raiz + `SCAFFOLD.md` inicializador. Fonte deste protocolo.
- Decisões = **ADR Nygard** em `docs/adr/`, indexadas, **status no índice** (https://adr.github.io).
- **Conventional Commits** (conventionalcommits.org); **SemVer** + `CHANGELOG` (Keep a Changelog). `.editorconfig`. kebab-case. `LICENSE` se público.
- Refs entre docs = **link Markdown relativo** com âncora (sem `[[wikilinks]]`); menção curta por ID estável (`R-004`, `ADR-0008`).
- ROADMAP só com trabalho aberto, itens `R-NNN` permanentes, concluído arquivado em `docs/history/roadmap/`; verificação local-first (`scripts/check.mjs`), sem GitHub Actions por padrão.
