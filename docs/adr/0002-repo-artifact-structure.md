Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0002 — Estrutura de artefatos do repositório (MinimalDocs)

- Status: active
- Domínio: architecture

## Contexto
O repositório não tem runtime; precisa de um conjunto estável de artefatos estáticos e de um fluxo reproduzível que o agente操作流程 (ler → inicializar → decidir → versionar).

## Decisão
Adotar a estrutura de pastas:
- `AGENTS.md` (raiz) — protocolo canônico do agente; fonte de verdade.
- `SCAFFOLD.md` (raiz, efêmero) — inicializador; cria `docs/` e se auto-apaga.
- `README.md` (raiz) — entrada p/ humano.
- `seed/` — entregável do gerador (cópia inalterada de `AGENTS.md`+`SCAFFOLD.md`); **não executar aqui**, só no projeto destino.
- `docs/` — `PRD` (âncora), `ROADMAP`, `CHANGELOG`, `adr/`.
- `docs/adr/` — ADRs Nygard indexados.
- `history/` — arquivado off-graph.
- `assets/` — mídias/refs.

Fluxo: agente lê `AGENTS.md` → retoma via `ROADMAP`+`adr/`; se `SCAFFOLD.md` existir e a pasta só tiver os dois arquivos-base, executa 1×; iterações viram ADRs/`ROADMAP`; `CHANGELOG` reflete releases SemVer.

Convenções: ADR Nygard (adr.github.io), Keep a Changelog + SemVer, Conventional Commits, wikilinks Obsidian.

## Consequências
- Estrutura previsível e agnóstica a stack.
- `seed/` desacoplado permite reuso como template.
- `history/` fora do grafo evita poluição de navegação.
