# R-008 — Validar tags `@ADR/@PRD/@ROADMAP` no `check`

**Estado final:** concluído em 2026-10-15

## Texto original (preservado)
- **R-008 — Validar tags `@ADR/@PRD/@ROADMAP` no `check`** · Estado: planejado
  **Objetivo:** tornar enforceável a regra de rastreabilidade ([ADR 0012](adr/0012-validacao-automatica-tags.md), `proposed`). **Dependências:** o dono ratificar a ADR 0012; hoje o código de `packages/vscode` não tem tags.
  **Validação:** `check` falha em entidade pública sem tag.

## Resultado
Dono aceitou a [ADR 0012](../../adr/0012-validacao-automatica-tags.md) e pediu a implementação. `seed/scripts/tags.mjs` roda dentro do `check`: tag no cabeçalho cobre o módulo, senão acima da entidade; valida que `@ADR-NNNN` e `@ROADMAP R-NNN` existem; escopo padrão `src/` (`.taglintrc`). Cabeçalhos `@ADR-…` adicionados aos scripts do seed.

## Evidências
- Revisão independente (subagente Sonnet, 2026-10-15): sem falhas graves; 10 achados menores. Corrigidos: referência `@ROADMAP` casando por substring (agora exige o ID inteiro), crash com symlink quebrado, `views.mjs` sem `docs/`, `status === null` ignorado no `check`. Não corrigidos (limitações): `## ` dentro de bloco de código na "Decisão" corta a seção; link com título `[t](x.md "tt")` não é reescrito; ADR com `**Status:**` em negrito ou domínio fora do conjunto some da view sem aviso; cobertura parcial de TS (`export abstract class`, `export declare`, `export namespace`, `export default () =>`) e Rust (`pub fn` na linha de `impl`); pastas `build`/`dist`/`node_modules` ignoradas em qualquer nível; o cabeçalho da view cita `node scripts/views.mjs` (no EasyDocs é `npm run views`).
- `npm run check` aprovado (6 testes de scripts + 7 do viewer), views geradas para este repositório.

## Limitações
Ver a lista de "não corrigidos" em [R-013](R-013-views-por-script-implementacao.md).
