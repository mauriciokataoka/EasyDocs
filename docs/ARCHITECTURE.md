Arquitetura técnica: componentes, dados, integrações. Otimizado p/ agente.

# ARCHITECTURE — MinimalDocs

## Visão geral
MinimalDocs não tem runtime. É um conjunto de arquivos estáticos que definem e operam um fluxo de documentação dirigido por agente.

## Componentes (artefatos)
- **`AGENTS.md`** (raiz) — protocolo canônico do agente; fonte de verdade para comportamento.
- **`SCAFFOLD.md`** (raiz, efêmero) — inicializador; cria a estrutura em `docs/` e se auto-apaga.
- **`README.md`** (raiz) — entrada p/ humano; aponta para `docs/`.
- **`seed/`** — o entregável do gerador: arquivos originais/inaalterados (`AGENTS.md` + `SCAFFOLD.md`) copiados para um projeto novo. **Não executar aqui**; só no destino.
- **`docs/`** — docs canônicas: `PRD`, `ARCHITECTURE`, `DESIGN`, `ROADMAP`, `CHANGELOG`.
- **`docs/adr/`** — ADRs Nygard indexados (`INDEX.md` + `NNNN-*.md`).
- **`history/`** — arquivado off-graph (`INDEX.md`).
- **`assets/`** — mídias/refs (sem doc).

## Fluxo de dados
1. Agente lê `AGENTS.md` → retoma via `[[ROADMAP]]` + `docs/adr/`.
2. Se `SCAFFOLD.md` existir e a pasta só tiver os dois arquivos-base, executa-o 1× (cria `docs/`, commita, auto-apaga).
3. Iterações registram decisões em ADRs e pendências no `ROADMAP`; `CHANGELOG` reflete releases SemVer.

## Convenções (referências)
- ADR: https://adr.github.io (formato Nygard).
- Changelog: https://keepachangelog.com; SemVer: https://semver.org.
- Commits: https://www.conventionalcommits.org.
- Wikilinks (`[[...]]`) entre docs de agente (grafo Obsidian); `README` usa links padrão.
