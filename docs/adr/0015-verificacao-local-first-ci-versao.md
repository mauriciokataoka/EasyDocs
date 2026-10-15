Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Alternativas · Consequências*.

# ADR 0015 — Verificação local-first, política de CI e fonte única de versão

- Status: accepted
- Domínio: protocol

## Contexto
O dono estourou a cota gratuita de GitHub Actions em 2026-09 por excesso de automação. No ArchiveGuard, `.github/workflows/check.yml` roda em **todo push**, com `macos-latest` na matriz (minuto de macOS custa 10× no plano gratuito de repositório privado) e falhou três execuções seguidas. O EasyDocs é a base de projetos futuros, em geral **web**, e não deve propagar esse custo.

## Decisão
1. **Portão local:** todo projeto tem **um** comando de verificação (padrão `node scripts/check.mjs`, ou `npm run check` quando há `package.json`) que o agente executa antes de concluir mudança de código. `.githooks/pre-push` o roda (ativar: `git config core.hooksPath .githooks`). Custo zero.
2. **O `check` genérico (`scripts/check.mjs` nos projetos gerados; no EasyDocs vive em `seed/scripts/check.mjs`, sem dependências)** valida: links Markdown relativos e âncoras; ausência de `[[wikilinks]]`; status de ADR válido e coerente com o `INDEX`; IDs `R-NNN` únicos (ROADMAP × `docs/history/roadmap`); versões dos `package.json` iguais ao topo do `CHANGELOG`. Cada projeto o estende com seus testes.
3. **Sem workflow de CI por padrão.** CI só quando justificada (release/publicação, mais de um colaborador, checagem que exige outro SO) e então **mínima**: `pull_request` + `main` (nunca todo push); `ubuntu-latest` apenas; `concurrency: cancel-in-progress`; `timeout-minutes`; `paths-ignore` para docs; `workflow_dispatch` para rodar à mão; macOS/Windows só via `workflow_dispatch`.
4. **Versão e push automáticos** (emenda de 2026-10-15; o dono não aprova tag nem push): uma fonte de verdade (tag `vX.Y.Z` + topo do `CHANGELOG`; manifestos espelham). `scripts/release.mjs` (`npm run release`) roda o `check`, calcula o bump pelos Conventional Commits desde a última tag (`fix`→patch, `feat`→minor, `!`/`BREAKING`→major; só docs/chore/test/refactor ⇒ sem release), move `[Unreleased]`, espelha manifestos, commita `chore(release)`, cria a tag annotated e dá push da branch e da tag. Push nunca usa `--force`. O `check` falha se um `package.json` divergir do `CHANGELOG` e avisa se a tag não existir.

## Alternativas
- **CI como portão principal:** gasta minutos, atrasa o feedback e já falhou sem ser pega localmente. Rejeitada.
- **`sync-version` do ArchiveGuard (só espelha):** o `release.mjs` já espelha os manifestos ao versionar e o `check` valida. Rejeitada.
- **Validar tags `@ADR/@PRD` no check:** depende da [ADR 0012](0012-validacao-automatica-tags.md) (proposed); não incluso.

## Consequências
- Feedback imediato e gratuito; falhas como as 3 do ArchiveGuard seriam pegas antes do push.
- O hook depende de cada clone ativá-lo (`core.hooksPath` é local).
- Sem CI, ninguém além do dono exercita o `check`; revisitar se surgirem colaboradores.
