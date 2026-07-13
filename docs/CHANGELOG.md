Histórico de versões. Formato Keep a Changelog (keepachangelog.com); versionamento SemVer (semver.org).

# Changelog

Todas as versões significativas documentadas aqui. O formato segue [Keep a Changelog](https://keepachangelog.com) e o versionamento [SemVer](https://semver.org).

## [Unreleased]

### Changed
- PRD/ARCHITECTURE: esclarecem que MinimalDocs é um **gerador de projetos** e `seed/` é a semente copiável (não executada no próprio repo).
- **ADR 0001 ativa:** `PRD.md` vira âncora mínima (problema/público/não-objetivos/objetivo inicial); `ARCHITECTURE.md`/`DESIGN.md` tornam-se *views renderizadas* de ADRs (`architecture`/`design`). Aplicado em `AGENTS.md` (raiz+seed) e `seed/SCAFFOLD.md`.
- Novos ADRs: 0002 (estrutura de artefatos) e 0003 (camadas de leitura/apresentação).

## [0.1.0] - 2026-07-13

### Added
- Scaffold inicial: `AGENTS.md`, `README.md`, `docs/` (PRD, ARCHITECTURE, DESIGN, ROADMAP, CHANGELOG), `docs/adr/` (índice + template Nygard), `history/`, `assets/`, `.editorconfig`, `.gitignore`.
- `LICENSE` MIT; convenções baseline (ADR Nygard, Keep a Changelog, SemVer, Conventional Commits, wikilinks Obsidian).
