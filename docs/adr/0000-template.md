Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0000 — Template de ADR (Nygard)

- Status: active

## Contexto
Projetos precisam registrar decisões de forma rastreável. O formato Nygard (Status · Contexto · Decisão · Consequências) é leve e difundido (adr.github.io).

## Decisão
Adotar ADRs Nygard em `docs/adr/`, indexados em `docs/adr/INDEX.md` com status visível. ADR 0000 é o próprio modelo.

## Consequências
- Decisões ficam versionadas junto do código.
- O índice permite saber o estado sem abrir cada arquivo.
- Decisões mortas vão para `history/` (off-graph), mantendo o grafo limpo.
