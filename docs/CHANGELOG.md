Histórico de versões. Formato Keep a Changelog (keepachangelog.com); versionamento SemVer (semver.org).

# Changelog

Todas as versões significativas documentadas aqui. O formato segue [Keep a Changelog](https://keepachangelog.com) e o versionamento [SemVer](https://semver.org).

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
- Scaffold inicial: `AGENTS.md`, `README.md`, `docs/` (PRD, ARCHITECTURE, DESIGN, ROADMAP, CHANGELOG), `docs/adr/` (índice + template Nygard), `history/`, `assets/`, `.editorconfig`, `.gitignore`.
- `LICENSE` MIT; convenções baseline (ADR Nygard, Keep a Changelog, SemVer, Conventional Commits, wikilinks Obsidian).
