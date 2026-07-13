UX/UI e interação. Otimizado p/ agente.

# DESIGN — MinimalDocs

## Princípio
Documentação é a interface entre humano, agente e projeto. O design privilegia **baixo atrito de leitura/retomada** e **grafo navegável**.

## Camadas de leitura
- **Humano (raiz):** `README.md` com visão geral e ponteiros — sem jargão de agente.
- **Agente (docs/):** docs densas e objetivas, com `[[wikilinks]]` formando mapa mental.
- **Decisões (docs/adr/):** status visível no índice, para não abrir cada arquivo.

## Regras de apresentação
- Toda doc de agente começa com *itálico* de introdução (origem do padrão).
- `history/` fica fora do grafo (off-graph) — contexto morto não polui a navegação.
- Nomes kebab-case; versão espelhada em tag `vX.Y.Z` e topo do `CHANGELOG`.

## Interação com o agente
Resposta enxuta no chat: o definitivo vai direto; o que altera doc vira tópico documentado em detalhe antes de responder. Nada se perde se a conversa for abandonada.
