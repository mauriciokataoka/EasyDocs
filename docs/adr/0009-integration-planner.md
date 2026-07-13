Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0009 — Integração do visualizador (Planner) no EasyDocs

- Status: accepted
- Domínio: architecture

## Contexto
O EasyDocs nasceu como gerador de documentação orientada a agente; o projeto Planner (v0.2.0) já implementava o visualizador (plugin VSCode), cujas specs foram trazidas via ADRs 0004–0006. Falta unificar os dois repositórios num só, decidindo estrutura, versionamento e forma de importar o código.

## Decisão
- **Estrutura:** monorepo com o gerador na raiz e a extensão em `packages/vscode/`. O código do plugin conserva seu `src/` interno (`packages/vscode/src/{core,ui,vscode}`); o `AGENTS.md` aninhado em `packages/vscode/` tem precedência sobre o da raiz (spec agents.md).
- **Versionamento:** **unificado** — um único número SemVer para o produto. O estado combinado herda `0.2.0` (o visualizador já estava nessa versão); o `CHANGELOG` vira único, fundindo generator (0.1.0) e viewer (0.2.0). O `package.json` da extensão espelha a mesma tag.
- **Import:** **cópia do código final** do Planner em `packages/vscode/`, sem preservar o histórico git separado (conteúdo tratado como fornecido agora). Exclui `CLAUDE.md` (config privada), `node_modules/`, `dist/`, `.git`.

## Consequências
- Repo único: gerador (raiz) + visualizador (`packages/vscode/`).
- Histórico do Planner não preservado como branch; a partir daqui tudo é commitado no EasyDocs.
- `docs(example)/` (fixture dos testes do core) é mantido em `packages/vscode/` para os testes automatizados.
- Encerra os itens I0 de fusão do ROADMAP.
