Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Alternativas · Consequências*.

# ADR 0013 — Links Markdown relativos e referências por ID (fim dos wikilinks)

- Status: accepted
- Domínio: design
- Supersede parcialmente: [ADR 0003](0003-reading-layers-presentation.md) na parte de `[[wikilinks]]`/Obsidian.

## Contexto
A ADR 0003 adotou `[[wikilinks]]` para formar um "mapa mental" navegável no Obsidian. Na prática o dono **não usa o Obsidian** (decisão de 2026-10-15: "se mostrou inútil"). Sem ele, `[[x]]` só tem sentido para quem conhece a convenção: GitHub, VSCode, o viewer do EasyDocs e as ferramentas dos agentes não o resolvem como link. O ArchiveGuard, que reformulou sua documentação em 2026-10, já proíbe wikilinks em seu `AGENTS.md` ("Use links Markdown comuns, não wikilinks") e usa três formas de referência, com bom resultado.

## Decisão
Três formas de referência, cada uma com um uso:
1. **Link Markdown relativo** entre documentos: `[ADR-0008](adr/0008-nome.md)`; com **âncora** para seção: `[R-018](ROADMAP.md#r-018--titulo)`.
2. **Link para código com linha**, quando útil: `[inventory.rs](../src/inventory.rs#L497)` (complementa as tags `@ADR/@PRD/@ROADMAP` do código).
3. **ID estável em texto** (`R-018`, `ADR-0008`, `BDD-001`) para menção curta; o ID é permanente e nunca reutilizado, de modo que sobrevive a renomeação de arquivo mesmo sem link.
Links externos só em `http(s)`. Nenhum `[[ ]]`. O `scripts/check.mjs` valida links relativos e âncoras ([ADR 0015](0015-verificacao-local-first-ci-versao.md)).

## Alternativas
- **Manter wikilinks:** vantagem real = não quebram ao mover arquivo; rejeitado porque o único consumidor era o Obsidian, que não será usado.
- **Wikilinks + links padrão:** duas convenções = redundância; contraria "regras claras em um lugar só".

## Consequências
- Navegação funciona em GitHub, VSCode, viewer e agentes sem plugin.
- Perde-se a robustez a renomeação dos wikilinks; mitigada por IDs estáveis (forma 3) e pela validação de links no `check`.
- Migração (executada em 2026-10-15): converter `[[ ]]` em `docs/`, `README`, `seed/`, `AGENTS.md` (raiz e seed); remover a regra "Formato Obsidian"; checar se `packages/vscode` depende de `[[ ]]`. Alterar o `AGENTS.md` é I2 (aprovado pelo dono em 2026-10-15).
