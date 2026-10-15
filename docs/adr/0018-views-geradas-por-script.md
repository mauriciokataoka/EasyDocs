Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Alternativas · Consequências*.

# ADR 0018 — ARCHITECTURE e DESIGN geradas por script a partir das ADRs

- Status: accepted
- Domínio: architecture

## Contexto
A [ADR 0001](0001-collapse-docs-into-adrs.md) tornou `ARCHITECTURE` e `DESIGN` "views virtuais" montadas pelo plugin do viewer a partir das ADRs por domínio. O plugin nunca implementou isso e foi congelado ([ADR 0017](0017-congelar-viewer.md)); hoje esses dois documentos não existem em lugar nenhum, e um agente tem de reconstruir o estado atual lendo ADR por ADR. Em 2026-10-15 o dono decidiu: "por script".

## Decisão
- `docs/ARCHITECTURE.md` e `docs/DESIGN.md` passam a ser **arquivos gerados** por um script sem dependências (`scripts/views.mjs`), a partir das ADRs com status `accepted` dos domínios `architecture` e `design` (cada seção = título, Decisão e Consequências da ADR, em ordem numérica, com link para a ADR de origem).
- Os arquivos são **somente leitura** (cabeçalho "gerado — não edite"); a fonte é sempre a ADR. O `check` falha se estiverem desatualizados (regenera em memória e compara).
- ADRs `superseded`/`deprecated`/`proposed` não entram.
- Implementação: item R-013 do ROADMAP. A parte "views virtuais do plugin" da ADR 0001 fica superada; o restante da 0001 (PRD âncora, decisões em ADR) segue válido.

## Alternativas
- **Manter views virtuais (plugin):** nunca implementadas; viewer congelado. Rejeitada.
- **Arquivos escritos à mão:** divergem das ADRs (o problema que a 0001 queria evitar). Rejeitada.
- **Módulo opcional no seed:** o script já é opcional por natureza (projeto pequeno pode não usá-lo); decisão de incluir no seed fica no R-013.

## Consequências
- Qualquer agente lê o estado atual em um arquivo, sem plugin.
- Um arquivo gerado a mais para manter sincronizado (o `check` garante).
- ADRs mal tagueadas por domínio ficam de fora das views: o domínio da ADR passa a importar.
