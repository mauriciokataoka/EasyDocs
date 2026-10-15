# R-007 — Reexecutar a conformância com o `seed/AGENTS.md` novo

**Estado final:** concluído em 2026-10-15 (com ressalva: DeepSeek e Kimi na variante de 2 arquivos não executados por indisponibilidade do provedor)

## Texto original (preservado)
- **R-007 — Reexecutar a conformância com o `seed/AGENTS.md` novo** · Estado: planejado
  **Objetivo:** o seed mudou bastante (ROADMAP com IDs, pronto/evidência, revisão por agente, check, release automático); validar em ≥2 modelos pelo [roteiro](CONFORMANCE.md) e acrescentar critérios para as regras novas (ex.: não reutilizar ID; registrar evidência com resultado).
  **Escopo:** rodar o roteiro e registrar em [field-notes](field-notes/INDEX.md). **Validação:** matriz preenchida em nota de campo.

## Resultado
Roteiro executado em 11 configurações de modelo/agente e na variante de 2 arquivos; 8 ambiguidades corrigidas no seed e no `check`. Detalhes: [nota de campo](../../field-notes/2026-10-15-conformancia-seed.md).

## Evidências
- [Nota de campo](../../field-notes/2026-10-15-conformancia-seed.md): matriz por modelo (aprovado / falhou / não executado) e causas.
- Rodada de confirmação pós-correção (Opus, Haiku, Muse, Codex): domínios válidos, `src/` aceito, `check` ok exceto links quebrados de âncora (corrigidos depois na regra).

## Limitações
- Amostra pequena e não determinística; a matriz de `docs/CONFORMANCE.md` não foi preenchida (critérios C1–C7 estendidos na nota).
