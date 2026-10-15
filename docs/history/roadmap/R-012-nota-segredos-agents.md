# R-012 — Nota de "sem build/segredos" no `AGENTS.md` (spec agents.md)

**Estado final:** concluído em 2026-10-15

## Texto original (preservado)
- **R-012 — Nota de "sem build/segredos" no `AGENTS.md` (spec agents.md)** · Estado: aguardando aprovação do dono (I2)
  **Objetivo:** alinhar às seções recomendadas da spec [agents.md](https://agents.md). **Validação:** aprovação explícita antes de editar o `AGENTS.md`.

## Resultado
O dono aprovou (I2) em 2026-10-15 a linha sobre segredos. Foi adicionada ao `AGENTS.md` (raiz e `seed/`) em "Comportamento / Operação": nunca commitar chaves, tokens, senhas, `.env` ou credenciais. As demais seções recomendadas pela spec (verificação, commits, CI) já estavam cobertas pela ADR 0015. O dono disse "comentar"; interpretei como "commitar" (transcrição de voz) e a regra cobre também comentários, docs e exemplos.

## Evidências
- `AGENTS.md` e `seed/AGENTS.md` com a regra; `npm run check` aprovado em 2026-10-15.

## Limitações
- Sem verificação automática de segredos (ex.: varredura no `check`); a regra é só instrução ao agente.
