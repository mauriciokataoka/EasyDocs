# R-010 — Decidir ARCHITECTURE/DESIGN: views virtuais × arquivos materializados

**Estado final:** concluído em 2026-10-15 (decisão do dono; implementação em R-013)

## Texto original (preservado)
- **R-010 — Decidir ARCHITECTURE/DESIGN: views virtuais × arquivos materializados** · Estado: aguardando decisão do dono
  **Contexto:** a [ADR 0001](adr/0001-collapse-docs-into-adrs.md) mantém views virtuais (só o plugin do viewer as montaria — **nunca foi implementado**, e o viewer está congelado); hoje esses dois documentos não existem em lugar nenhum e um agente reconstrói o estado atual a partir das ADRs. **Opções:** manter a ideia; gerar `ARCHITECTURE.md`/`DESIGN.md` por script a partir das ADRs (recomendação do agente: dá arquivo real, ADRs seguem como fonte); arquivos reais como módulo opcional no seed. **Validação:** ADR com a decisão.

## Resultado
O dono decidiu "por script" em 2026-10-15: os arquivos são gerados a partir das ADRs. Registrado na [ADR 0018](../../adr/0018-views-geradas-por-script.md); implementação no item R-013.

## Evidências
- ADR 0018 `accepted`; `npm run check` aprovado em 2026-10-15.

## Limitações
- Nada implementado ainda; hoje ARCHITECTURE/DESIGN continuam inexistentes até o R-013.
