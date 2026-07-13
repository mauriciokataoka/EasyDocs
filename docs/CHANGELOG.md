Histórico de versões. Formato Keep a Changelog (keepachangelog.com); versionamento SemVer (semver.org).

# Changelog

Todas as versões significativas documentadas aqui. O formato segue [Keep a Changelog](https://keepachangelog.com) e o versionamento [SemVer](https://semver.org).

## [Unreleased]

### Changed
- PRD/ARCHITECTURE: esclarecem que MinimalDocs é um **gerador de projetos** e `seed/` é a semente copiável (não executada no próprio repo).
- **ADR 0001 ativa:** `PRD.md` vira âncora mínima; `ARCHITECTURE`/`DESIGN` são **views virtuais** (plugin, sem arquivo físico) montadas de ADRs por domínio. Aplicado em `AGENTS.md` (raiz+seed), `seed/SCAFFOLD.md`; stubs físicos removidos.
- Novos ADRs: 0002 (estrutura de artefatos) e 0003 (camadas de leitura/apresentação).

### Added
- **ADRs 0004/0005/0006** trazem as especificações do projeto Planner (EasyDocs): produto visualizador, arquitetura do núcleo compartilhado + plugin VSCode, e experiência de visualização (SemVer/cards/busca/pastas virtuais `decisions`/`Project`/`architecture`/`design`).
- `seed/SCAFFOLD.md`: seção de convenções agora cita a spec **AGENTS.md** (https://agents.md), alinhada a ADR/Changelog/SemVer.
- `seed/AGENTS.md` reescrito no estilo "conciso porém desambiguado" (ADR 0007): linguagem natural, sem setas `->`, glossário de siglas, regras DEVE/DEVERIA, exemplos pontuais.

## [0.1.0] - 2026-07-13

### Added
- Scaffold inicial: `AGENTS.md`, `README.md`, `docs/` (PRD, ARCHITECTURE, DESIGN, ROADMAP, CHANGELOG), `docs/adr/` (índice + template Nygard), `history/`, `assets/`, `.editorconfig`, `.gitignore`.
- `LICENSE` MIT; convenções baseline (ADR Nygard, Keep a Changelog, SemVer, Conventional Commits, wikilinks Obsidian).
