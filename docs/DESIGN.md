View gerada por `scripts/views.mjs` a partir das ADRs aceitas do domínio `design`. Não edite: altere a ADR e rode `node scripts/views.mjs`.

# DESIGN

## ADR 0003 — Camadas de leitura e apresentação

Fonte: [ADR 0003](adr/0003-reading-layers-presentation.md)

**Decisão**

- **Camadas de leitura:** (1) Humano — `README.md` na raiz, sem jargão; (2) Agente — `docs/` densas, ligadas por links Markdown relativos (ADR 0013); (3) Decisões — `docs/adr/` com status visível no índice.
- **Regras de apresentação:** toda doc de agente inicia com *itálico* de introdução (origem do padrão); `docs/history/` fica off-graph; nomes kebab-case; versão espelhada em tag `vX.Y.Z` e topo do `CHANGELOG`.
- **Interação com o agente:** resposta enxuta no chat; o que altera doc vira tópico documentado em detalhe antes de responder (persistência imediata).

**Consequências**

- Navegação por grafo reduz tempo de retomada.
- Consistência visual entre docs de agente.
- `docs/history/` fora do grafo mantém o foco no estado atual.

## ADR 0006 — Experiência de visualização (design do viewer)

Fonte: [ADR 0006](adr/0006-viewer-experience-design.md)

**Decisão**

- **Descoberta:** varre recursivamente a pasta atrás de `ROADMAP.md`, `CHANGELOG.md` e pasta de ADRs (`adr/` ou `gdd/`).
- **Organização por SemVer:** pastas colapsáveis por versão; cada item vira um **card**.
- **Busca:** por texto, por versão, ou navegando o **treeview**.
- **Features órfãs:** itens sem versão aparecem destacados; recebem versão pela **posição (ordem)** no doc.
- **ROADMAP:** cards **arrastáveis**; reordenar recalcula a numeração de versão automaticamente.
- **CHANGELOG:** implementações em pastas colapsáveis; cada feature em card separado (espelha o ROADMAP, porém read-oriented).
- **ADRs:** árvore de 4 níveis — raiz → status → cada ADR → itens internos; expostas também como **pastas virtuais** `decisions` / `Project` / `architecture` / `design` (ver ADR 0001).
- **Shell único (plugin VSCode):** a visualização vive no customEditor/webview do VSCode; a casca HTML foi descartada — o objetivo de leitura rápida é atingido pelo plugin.

**Consequências**

- Navegação por versão/cards reduz tempo de localização.
- ROADMAP editável por arraste aproxima doc de quadro visual.
- Pastas virtuais ligam diretamente ao modelo de ADRs tagueados por domínio.

## ADR 0008 — Mapeamento ROADMAP ↔ SemVer por posição (arraste reordena)

Fonte: [ADR 0008](adr/0008-roadmap-semver-reorder.md)

**Decisão**

Algoritmo de mapeamento ordem→SemVer:

- **Regra de major/minor**: usuário arrasta o card para outra seção major → decide o major. Se mantiver sob o mesmo major → só altera o minor.
- **Tratamento de subitens**: opção híbrida — subitens são permitidos (hierarquia preservada), mas apenas itens de nível superior têm versão SemVer. Subitens não têm versão própria (são detalhes de implementação do item pai) e podem ser reordenados sem afetar o versionamento.
- **Algoritmo determinístico**:
  1. ROADMAP é uma lista de seções major (v0.1, v0.2, v0.3...)
  2. Cada seção major contém cards minor ordenados (v0.2.1, v0.2.2, v0.2.3...)
  3. Cards podem ter subitens (sem versão)
  4. Ao arrastar:
     - Entre seções major → recalcula major + minor do card
     - Dentro da mesma seção → recalcula só minor do card
  5. Write-back persiste a nova numeração no `.md` (ADR 0005)
- **Features órfãs** (sem versão explícita) recebem a versão correspondente à sua **posição/ordem** no documento.

**Consequências**

- O ROADMAP deixa de ser só uma lista e vira um quadro visual editável por arraste, com versionamento sempre consistente.
- Acopla a **ordem das tarefas à SemVer**, justificando a presença de versão no ROADMAP (não é decoração: é a posição que gera o número).
- Exige um **writer roundtrip** confiável (ADR 0005) para não corromper a formatação do `.md` ao reenumerar.
- Mantém o `CHANGELOG` como espelho read-oriented das mesmas versões (ADR 0006).

## ADR 0013 — Links Markdown relativos e referências por ID (fim dos wikilinks)

Fonte: [ADR 0013](adr/0013-links-markdown-relativos.md)

**Decisão**

Três formas de referência, cada uma com um uso:
1. **Link Markdown relativo** entre documentos: `[ADR-0008](adr/adr/0008-nome.md)`; com **âncora** para seção: `[R-018](adr/ROADMAP.md#r-018--titulo)`.
2. **Link para código com linha**, quando útil: `[inventory.rs](src/inventory.rs#L497)` (complementa as tags `@ADR/@PRD/@ROADMAP` do código).
3. **ID estável em texto** (`R-018`, `ADR-0008`, `BDD-001`) para menção curta; o ID é permanente e nunca reutilizado, de modo que sobrevive a renomeação de arquivo mesmo sem link.
Links externos só em `http(s)`. Nenhum `[[ ]]`. O `scripts/check.mjs` valida links relativos e âncoras ([ADR 0015](adr/0015-verificacao-local-first-ci-versao.md)).

**Consequências**

- Navegação funciona em GitHub, VSCode, viewer e agentes sem plugin.
- Perde-se a robustez a renomeação dos wikilinks; mitigada por IDs estáveis (forma 3) e pela validação de links no `check`.
- Migração (executada em 2026-10-15): converter `[[ ]]` em `docs/`, `README`, `seed/`, `AGENTS.md` (raiz e seed); remover a regra "Formato Obsidian"; checar se `packages/vscode` depende de `[[ ]]`. Alterar o `AGENTS.md` é I2 (aprovado pelo dono em 2026-10-15).
