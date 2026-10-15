# R-001 — Release da metodologia (v0.3.0) e tags faltantes

**Estado final:** concluído em 2026-10-15

## Texto original (preservado)
- **R-001 — Release da metodologia (v0.3.0) e tags faltantes** · Estado: pronto para revisão
  **Objetivo:** fechar a adoção da metodologia (ADRs 0013–0016) como release e regularizar as tags.
  **Escopo:** mover `[Unreleased]` do [CHANGELOG](CHANGELOG.md) para `[0.3.0]`; alinhar `packages/vscode/package.json` (ADR 0011); criar tag annotated `v0.2.0` (hoje só existe `v0.1.0`; o `check` avisa) e `v0.3.0`.
  **Validação:** `npm run release` conclui sem erro; `git tag -l` lista v0.1.0, v0.2.0 e v0.3.0; tags e branch no remoto; `npm run check` sem avisos.

## Resultado
Release `v0.3.0` criado pelo `npm run release` (bump `minor` calculado pelos commits desde `v0.2.0`). A tag `v0.2.0`, que nunca existira, foi criada retroativamente no commit `6f061fc` (o que introduziu a seção `[0.2.0]` do CHANGELOG). Tags `v0.1.0`, `v0.2.0` e `v0.3.0` enviadas ao remoto, junto da branch `main`.

## Evidências (2026-10-15, macOS local, revisão `c766e44`)
- `npm run release`: `check` das docs aprovado (30 arquivos `.md`), 7 testes do viewer aprovados / 0 falhas; commit `chore(release): v0.3.0`; tag annotated; push da branch (`9d89b73..c766e44`) e da tag aprovados — **aprovado**.
- `git ls-remote --tags origin`: lista `v0.1.0`, `v0.2.0`, `v0.3.0` — **aprovado**.
- `packages/vscode/package.json` em `0.3.0`, igual ao topo do CHANGELOG (o `check` valida) — **aprovado**.
- O script `release.mjs` foi testado antes em repositório descartável com remoto local (docs → sem release; fix → patch; `feat!` → major) — **aprovado**.

## Limitações
- Revisão independente por agente: não aplicável (tarefa mecânica verificável por comandos; regra da ADR 0014).
- `package-lock.json` do viewer não foi relido após o bump (o script o atualiza; `npm ci` não foi reexecutado).
