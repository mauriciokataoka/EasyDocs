Histórico de versões. Formato Keep a Changelog (keepachangelog.com); versionamento SemVer (semver.org).

# Changelog

Todas as versões significativas documentadas aqui. O formato segue [Keep a Changelog](https://keepachangelog.com) e o versionamento [SemVer](https://semver.org).

## [Unreleased]

## [0.3.2] - 2026-10-15

## [0.3.1] - 2026-10-15

### Changed
- **Regras novas no `AGENTS.md` (raiz e seed):** docs direto na `main`, código sempre em branch; nunca commitar segredos; estado `congelado`. Release só roda na `main`; primeiro release = `0.1.0`.
- **Viewer (`packages/vscode`) congelado** ([ADR 0017](adr/0017-congelar-viewer.md)); ADR 0011 superseded pela 0015.
- **`seed/SCAFFOLD.md`** atualizado: guarda aceita `scripts/`, `.githooks/`, `.vscode/`; ADR `INDEX`; ROADMAP semeado no novo formato; `release.mjs`.

## [0.3.0] - 2026-10-15

### Changed
- **Metodologia importada da documentação do ArchiveGuard, generalizada (ADRs 0013–0016):** `AGENTS.md` (raiz e `seed/`) reescrito como fonte normativa única; ROADMAP passa a conter só trabalho aberto, com IDs `R-NNN` permanentes, estados e critérios de pronto "conforme aplicável"; concluídos vão íntegros para `docs/history/roadmap/`; evidência honesta e testes de regressão como regra.
- **Fim dos wikilinks/Obsidian (ADR 0013):** links Markdown relativos com âncora, IDs estáveis em texto; ADR 0003 superada nessa parte.
- **`history/` movido para `docs/history/`** (espelha a estrutura dos projetos gerados); índice do roadmap arquivado ganha coluna de palavras-chave.
- **Tag e push deixam de exigir aval do dono; conclusão deixa de exigir aceite do dono** — passa a exigir `check` + demonstração + revisão independente por agente (ADR 0014, emendada). **ADR 0007 (estilo verboso) aceita.**
- **Status de ADR padronizado** (`proposed | accepted | superseded | deprecated`; `active` abolido); modelo de ADR ganha `Alternativas`.

### Added
- **Release automático** (`seed/scripts/release.mjs`, `npm run release`): bump SemVer pelos Conventional Commits, `[Unreleased]`→versão, espelho de manifestos, commit `chore(release)`, tag annotated e push, sem aprovação do dono (ADR 0015, emendada).
- `docs/field-notes/` (evidências datadas e imutáveis).
- `check` local: `seed/scripts/check.mjs` (links, âncoras, wikilinks, ADRs × INDEX, IDs únicos, versão × CHANGELOG), `npm run check`, hook `.githooks/pre-push` (`npm run hooks`). Política de CI mínima/opt-in (ADR 0015); nenhum workflow criado.

## [0.2.0] - 2026-07-13

### Added
- **Integração do visualizador (ADR 0009):** código do projeto Planner copiado em `packages/vscode/` (extensão VSCode); monorepo com gerador na raiz + plugin. Versionamento **unificado** (produto combinado em `0.2.0`).
- **ADR 0008 (proposed):** mapeamento ROADMAP ↔ SemVer por posição — cards arrastáveis reordenam e reenumeram a versão automaticamente; features órfãs recebem versão pela posição (especifica a regra subjacente à ADR 0006).
- **Fix (viewer):** F5 agora builda via `preLaunchTask` (`tasks.json`) — `dist/` é gitignorado e o webview o lê em runtime, então sem build o editor quebrava ao abrir.
- **`docs/adr/INDEX.md` criado** — faltava, embora referenciado por `AGENTS.md` e ADR 0001; indexa os ADRs 0001–0008.
- **ROADMAP:** seção "Visualizador (herdado do Planner)" com as tarefas de implementação do plugin VSCode trazidas do Planner (writer roundtrip, órfãs por posição, busca por versão/treeview, arraste+auto-renumeração SemVer, build esbuild, custom editor, painel, testes, VSIX).
- **PRD:** âncora do visualizador (problema de reordenar prioridades + não-objetivos: sem edição livre, sem multi-usuário, sem nuvem).

### Changed
- PRD/ARCHITECTURE: esclarecem que EasyDocs é um **gerador de projetos** e `seed/` é a semente copiável (não executada no próprio repo).
- **ADR 0001 ativa:** `PRD.md` vira âncora mínima; `ARCHITECTURE`/`DESIGN` são **views virtuais** (plugin, sem arquivo físico) montadas de ADRs por domínio. Aplicado em `AGENTS.md` (raiz+seed), `seed/SCAFFOLD.md`; stubs físicos removidos.
- Novos ADRs: 0002 (estrutura de artefatos) e 0003 (camadas de leitura/apresentação).

### Added
- **ADRs 0004/0005/0006** trazem as especificações do projeto Planner (EasyDocs): produto visualizador, arquitetura do núcleo compartilhado + plugin VSCode, e experiência de visualização (SemVer/cards/busca/pastas virtuais `decisions`/`Project`/`architecture`/`design`).
- `seed/SCAFFOLD.md`: seção de convenções agora cita a spec **AGENTS.md** (https://agents.md), alinhada a ADR/Changelog/SemVer.
- `seed/AGENTS.md` reescrito no estilo "conciso porém desambiguado" (ADR 0007): linguagem natural, sem setas `->`, glossário de siglas, regras DEVE/DEVERIA, exemplos pontuais.
- `docs/CONFORMANCE.md`: roteiro de validação cross-modelo do `seed/AGENTS.md` (tarefa fixa + critérios C1–C7).

## [0.1.0] - 2026-07-13

### Added
- Scaffold inicial: `AGENTS.md`, `README.md`, `docs/` (PRD, ARCHITECTURE, DESIGN, ROADMAP, CHANGELOG), `docs/adr/` (índice + template Nygard), `docs/history/`, `assets/`, `.editorconfig`, `.gitignore`.
- `LICENSE` MIT; convenções baseline (ADR Nygard, Keep a Changelog, SemVer, Conventional Commits, wikilinks Obsidian).
