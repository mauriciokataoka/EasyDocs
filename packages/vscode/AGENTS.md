# AGENTS.md — packages/vscode (viewer)

> Segue [agents.md](https://agents.md). Sem regras próprias duplicadas: **todas as regras normativas estão em [AGENTS.md](../../AGENTS.md)** (raiz), que vale aqui (ADR 0016). Este arquivo existe só para marcar o escopo do pacote.

- **Escopo:** extensão VSCode + webview + núcleo (`src/core`) do visualizador de ROADMAP/CHANGELOG/ADRs ([ADR 0005](../../docs/adr/0005-viewer-architecture.md), [ADR 0009](../../docs/adr/0009-integration-planner.md)).
- **Verificação:** `npm test` (núcleo, `node --test`) e `npm run build`; o `check` da raiz roda os testes. F5 exige build prévio (`preLaunchTask`).
- **Versão:** unificada com o repositório ([ADR 0011](../../docs/adr/0011-versionamento-unificado-viewer-dita.md)); `package.json` deve igualar o topo do [CHANGELOG](../../docs/CHANGELOG.md).
- **Fixture local:** `docs(example)/` não é versionada.
