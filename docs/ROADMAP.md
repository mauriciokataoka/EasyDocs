Afazeres/pendências do projeto: somente trabalho aberto, com IDs permanentes (ADR 0014).

# ROADMAP — EasyDocs

> Só trabalho **aberto**. Concluído (check + demonstração + revisão independente por agente) vai íntegro p/ [docs/history/roadmap](history/roadmap/INDEX.md). A posição do card gera a versão (ADR 0008); o ID `R-NNN` é a identidade e nunca muda. Formato e critérios em [AGENTS.md](../AGENTS.md). ADR `proposed` aguardando o dono: [0012](adr/0012-validacao-automatica-tags.md). ROADMAP anterior: [arquivo](history/roadmap/2026-10-roadmap-checklist-inicial.md).

## v0.3.0 — Metodologia importada + viewer
- **R-001 — Release da metodologia (v0.3.0) e tags faltantes** · Estado: pronto para revisão
  **Objetivo:** fechar a adoção da metodologia (ADRs 0013–0016) como release e regularizar as tags.
  **Escopo:** mover `[Unreleased]` do [CHANGELOG](CHANGELOG.md) para `[0.3.0]`; alinhar `packages/vscode/package.json` (ADR 0011); criar tag annotated `v0.2.0` (hoje só existe `v0.1.0`; o `check` avisa) e `v0.3.0`.
  **Validação:** `npm run release` conclui sem erro; `git tag -l` lista v0.1.0, v0.2.0 e v0.3.0; tags e branch no remoto; `npm run check` sem avisos.
- **R-002 — Atribuir versão a feature órfã pela posição** · Estado: planejado
  **Objetivo:** feature sem versão explícita recebe a versão da sua posição no doc ([ADR 0006](adr/0006-viewer-experience-design.md), [ADR 0008](adr/0008-roadmap-semver-reorder.md)).
  **Escopo:** `packages/vscode/src/core` (parser/modelo). **Validação:** teste do core com fixture de órfãs.
- **R-003 — Busca por versão + treeview** · Estado: planejado
  **Objetivo:** localizar cards por versão e navegar em árvore ([ADR 0006](adr/0006-viewer-experience-design.md)).
  **Escopo:** UI do webview e painel da Activity Bar. **Validação:** manual no Extension Development Host (F5) + nota de campo.
- **R-004 — Render de doc único (painel/aba do VSCode)** · Estado: planejado
  **Objetivo:** abrir um único doc estruturado em painel/aba. **Escopo:** extensão + webview. **Validação:** manual em F5 + nota de campo.
- **R-005 — ROADMAP: cards arrastáveis + auto-renumeração de versão** · Estado: planejado
  **Objetivo:** reordenar por arraste e recalcular a versão pela posição (algoritmo da [ADR 0008](adr/0008-roadmap-semver-reorder.md)), com write-back que preserva a formatação ([ADR 0010](adr/0010-writer-roundtrip-ast.md)).
  **Escopo:** UI + writer. **Riscos:** corromper o `.md`; o novo formato de item (bullet `**R-NNN — …**` + linhas indentadas) deve sobreviver ao roundtrip e o ID não pode mudar.
  **Validação:** testes do core de roundtrip com este ROADMAP como fixture + F5.
- **R-006 — Comando/menu de contexto (opcional)** · Estado: planejado
  **Objetivo:** atalho de contexto para abrir a visão estruturada. **Escopo:** manifesto da extensão. **Validação:** manual em F5.

## v0.4.0 — Método e seed
- **R-007 — Reexecutar a conformância com o `seed/AGENTS.md` novo** · Estado: planejado
  **Objetivo:** o seed mudou bastante (ROADMAP com IDs, pronto/evidência, revisão por agente, check, release automático); validar em ≥2 modelos pelo [roteiro](CONFORMANCE.md) e acrescentar critérios para as regras novas (ex.: não reutilizar ID; registrar evidência com resultado).
  **Escopo:** rodar o roteiro e registrar em [field-notes](field-notes/INDEX.md). **Validação:** matriz preenchida em nota de campo.
- **R-008 — Validar tags `@ADR/@PRD/@ROADMAP` no `check`** · Estado: planejado
  **Objetivo:** tornar enforceável a regra de rastreabilidade ([ADR 0012](adr/0012-validacao-automatica-tags.md), `proposed`). **Dependências:** o dono ratificar a ADR 0012; hoje o código de `packages/vscode` não tem tags.
  **Validação:** `check` falha em entidade pública sem tag.
- **R-010 — Decidir ARCHITECTURE/DESIGN: views virtuais × arquivos materializados** · Estado: aguardando decisão do dono
  **Contexto:** a [ADR 0001](adr/0001-collapse-docs-into-adrs.md) mantém views virtuais (só o plugin as monta); sem o plugin, um agente reconstrói o estado atual a partir das ADRs. **Opções:** manter; gerar `ARCHITECTURE.md` por script; módulo opcional no seed. **Validação:** ADR com a decisão.
- **R-011 — Módulo BDD opcional no seed** · Estado: adiado
  **Objetivo:** cenários Dado/Quando/Então ligados a testes, só para projetos em que comportamento observável importa. **Adiado até** o viewer estabilizar.
- **R-012 — Nota de "sem build/segredos" no `AGENTS.md` (spec agents.md)** · Estado: aguardando aprovação do dono (I2)
  **Objetivo:** alinhar às seções recomendadas da spec [agents.md](https://agents.md). **Validação:** aprovação explícita antes de editar o `AGENTS.md`.
