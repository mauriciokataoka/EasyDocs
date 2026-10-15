Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0003 — Camadas de leitura e apresentação

- Status: accepted (parcialmente superseded pela [ADR 0013](0013-links-markdown-relativos.md): wikilinks e Obsidian não se aplicam mais)
- Domínio: design

## Contexto
A documentação serve a três leitores diferentes (humano, agente, decisor) ePrecisa de navegação de baixo atrito sem duplicar conteúdo.

## Decisão
- **Camadas de leitura:** (1) Humano — `README.md` na raiz, sem jargão; (2) Agente — `docs/` densas, ligadas por links Markdown relativos (ADR 0013); (3) Decisões — `docs/adr/` com status visível no índice.
- **Regras de apresentação:** toda doc de agente inicia com *itálico* de introdução (origem do padrão); `history/` fica off-graph; nomes kebab-case; versão espelhada em tag `vX.Y.Z` e topo do `CHANGELOG`.
- **Interação com o agente:** resposta enxuta no chat; o que altera doc vira tópico documentado em detalhe antes de responder (persistência imediata).

## Consequências
- Navegação por grafo reduz tempo de retomada.
- Consistência visual entre docs de agente.
- `history/` fora do grafo mantém o foco no estado atual.
