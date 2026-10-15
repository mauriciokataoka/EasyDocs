Afazeres/pendências do projeto: somente trabalho aberto, com IDs permanentes (ADR 0014).

# ROADMAP — EasyDocs

> Só trabalho **aberto**. Concluído (check + demonstração + revisão independente por agente) vai íntegro p/ [docs/history/roadmap](history/roadmap/INDEX.md). A posição do card gera a versão (ADR 0008); o ID `R-NNN` é a identidade e nunca muda. Formato e critérios em [AGENTS.md](../AGENTS.md). ADR `proposed` aguardando o dono: [0012](adr/0012-validacao-automatica-tags.md). Viewer congelado: [ADR 0017](adr/0017-congelar-viewer.md). ROADMAP anterior: [arquivo](history/roadmap/2026-10-roadmap-checklist-inicial.md).

## v0.4.0 — Método e seed
- **R-008 — Validar tags `@ADR/@PRD/@ROADMAP` no `check`** · Estado: planejado
  **Objetivo:** tornar enforceável a regra de rastreabilidade ([ADR 0012](adr/0012-validacao-automatica-tags.md), `proposed`). **Dependências:** o dono ratificar a ADR 0012; hoje o código de `packages/vscode` não tem tags.
  **Validação:** `check` falha em entidade pública sem tag.
- **R-013 — Gerar `ARCHITECTURE.md` e `DESIGN.md` por script (`scripts/views.mjs`)** · Estado: planejado
  **Objetivo:** implementar a decisão da [ADR 0018](adr/0018-views-geradas-por-script.md): dois arquivos gerados a partir das ADRs, para um agente ler o estado atual de arquitetura e de design sem abrir ADR por ADR.
  **Escopo:** script Node sem dependências (`seed/scripts/views.mjs`) que lê `docs/adr/*.md`, filtra `Status: accepted` e `Domínio: architecture` (→ `docs/ARCHITECTURE.md`) ou `design` (→ `docs/DESIGN.md`), ordena por número e emite, por ADR, um `##` com o título, o texto de **Decisão** e **Consequências** e o link para a ADR de origem; cabeçalho "gerado por scripts/views.mjs — não edite"; integrar ao `check` (falha se o arquivo estiver desatualizado: regenera em memória e compara); atualizar o Mapa e a seção ADRs do `AGENTS.md` (raiz e seed, I2: aprovado em princípio pelo dono) e o `SCAFFOLD` (gerar os arquivos no scaffold).
  **Fora de escopo:** PRD (continua âncora à mão); resumir ou reescrever texto das ADRs; viewer/plugin.
  **Dependências:** ADRs com `Domínio` preenchido e válido (por isso o seed lista os domínios). **Riscos:** ADR sem domínio ou com status fora do padrão some das views — o `check` já valida status; avisar quando o domínio faltar. Cuidado com o conflito com o parser de ADR do viewer (congelado, sem impacto).
  **Validação:** teste de regressão do script (ADRs de exemplo → saída esperada; ADR `proposed`/`superseded` fora; arquivo desatualizado reprova no `check`); gerar para este repositório e conferir que as ADRs `architecture`/`design` aceitas aparecem.
## Congelado
> Adiado por decisão do dono em 2026-10-15; reativar só por decisão dele. Viewer: [ADR 0017](adr/0017-congelar-viewer.md) ("não estou vendo necessidade mais"). BDD: só faria sentido com o viewer estável.
- **R-002 — Atribuir versão a feature órfã pela posição** · Estado: congelado
  **Objetivo:** feature sem versão explícita recebe a versão da sua posição no doc ([ADR 0006](adr/0006-viewer-experience-design.md), [ADR 0008](adr/0008-roadmap-semver-reorder.md)).
  **Escopo:** `packages/vscode/src/core` (parser/modelo). **Validação:** teste do core com fixture de órfãs.
- **R-003 — Busca por versão + treeview** · Estado: congelado
  **Objetivo:** localizar cards por versão e navegar em árvore ([ADR 0006](adr/0006-viewer-experience-design.md)).
  **Escopo:** UI do webview e painel da Activity Bar. **Validação:** manual no Extension Development Host (F5) + nota de campo.
- **R-004 — Render de doc único (painel/aba do VSCode)** · Estado: congelado
  **Objetivo:** abrir um único doc estruturado em painel/aba. **Escopo:** extensão + webview. **Validação:** manual em F5 + nota de campo.
- **R-005 — ROADMAP: cards arrastáveis + auto-renumeração de versão** · Estado: congelado
  **Objetivo:** reordenar por arraste e recalcular a versão pela posição (algoritmo da [ADR 0008](adr/0008-roadmap-semver-reorder.md)), com write-back que preserva a formatação ([ADR 0010](adr/0010-writer-roundtrip-ast.md)).
  **Escopo:** UI + writer. **Riscos:** corromper o `.md`; o novo formato de item (bullet `**R-NNN — …**` + linhas indentadas) deve sobreviver ao roundtrip e o ID não pode mudar.
  **Validação:** testes do core de roundtrip com este ROADMAP como fixture + F5.
- **R-006 — Comando/menu de contexto (opcional)** · Estado: congelado
  **Objetivo:** atalho de contexto para abrir a visão estruturada. **Escopo:** manifesto da extensão. **Validação:** manual em F5.
- **R-011 — Módulo BDD opcional no seed** · Estado: congelado
  **Objetivo:** cenários Dado/Quando/Então ligados a testes, só para projetos em que comportamento observável importa. 
