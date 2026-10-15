View gerada por `scripts/views.mjs` a partir das ADRs aceitas do domínio `architecture`. Não edite: altere a ADR e rode `node scripts/views.mjs`.

# ARCHITECTURE

## ADR 0002 — Estrutura de artefatos do repositório (EasyDocs)

Fonte: [ADR 0002](adr/0002-repo-artifact-structure.md)

**Decisão**

Adotar a estrutura de pastas:
- `AGENTS.md` (raiz) — protocolo canônico do agente; fonte de verdade.
- `SCAFFOLD.md` (raiz, efêmero) — inicializador; cria `docs/` e se auto-apaga.
- `README.md` (raiz) — entrada p/ humano.
- `seed/` — entregável do gerador (cópia inalterada de `AGENTS.md`+`SCAFFOLD.md`); **não executar aqui**, só no projeto destino.
- `docs/` — `PRD` (âncora), `ROADMAP`, `CHANGELOG`, `adr/`.
- `docs/adr/` — ADRs Nygard indexados.
- `docs/history/` — arquivado off-graph.
- `assets/` — mídias/refs.

Fluxo: agente lê `AGENTS.md` → retoma via `ROADMAP`+`adr/`; se `SCAFFOLD.md` existir e a pasta só tiver os dois arquivos-base, executa 1×; iterações viram ADRs/`ROADMAP`; `CHANGELOG` reflete releases SemVer.

Convenções: ADR Nygard (adr.github.io), Keep a Changelog + SemVer, Conventional Commits, links Markdown relativos (ADR 0013).

**Consequências**

- Estrutura previsível e agnóstica a stack.
- `seed/` desacoplado permite reuso como template.
- `docs/history/` fora do grafo evita poluição de navegação.

## ADR 0005 — Arquitetura do visualizador (núcleo compartilhado + cascas)

Fonte: [ADR 0005](adr/0005-viewer-architecture.md)

**Decisão**

- **Núcleo compartilhado** (`src/core`): parsers e modelo — `discovery` (varre a pasta), `roadmap-parser`, `adr-parser`, `semver`, `markdown`, `fs`/`node-fs` (abstração de sistema de arquivos), `model` (tipos), `index`.
- **UI** (`src/ui`): `render`, `markdown-view`, `style.css` (apresentação renderizada na webview do VSCode).
- **VSCode host** (`src/vscode`): `extension` (entrypoint/customEditor), `webview`, `host-fs` (implementação de fs para o VSCode).
- **Build:** `esbuild` (`build.mjs`) gera `dist/extension.js` (cjs, external vscode), `dist/webview.js` (iife) e `dist/webview.css`.
- **Pontos de entrada VSCode:** customEditor `easydocs.structuredView` para `ROADMAP.md`/`CHANGELOG.md`; view `easydocsView` no explorer; comando `easydocs.showAdrs`.
- **Corpus de teste:** `docs(example)/` — doc real de projeto externo ("Mega Word Challenge": ROADMAP/CHANGELOG SemVer + 28 ADRs + history) usada como fixture.
- **Integração neste repo:** o pacote da extensão vive em `packages/vscode/` (a integrar; histórico via subtree do projeto Planner).

**Consequências**

- Lógica de parsing única, reusada pela casca VSCode (webview).
- `node-fs`/`host-fs` isola acesso a arquivos para o ambiente VSCode.
- Código existente (Planner) **não validado em execução** — decidir *reaproveitar vs reescrever* no momento de implementar (ver ROADMAP).

## ADR 0009 — Integração do visualizador (Planner) no EasyDocs

Fonte: [ADR 0009](adr/0009-integration-planner.md)

**Decisão**

- **Estrutura:** monorepo com o gerador na raiz e a extensão em `packages/vscode/`. O código do plugin conserva seu `src/` interno (`packages/vscode/src/{core,ui,vscode}`); o `AGENTS.md` aninhado em `packages/vscode/` tem precedência sobre o da raiz (spec agents.md).
- **Versionamento:** **unificado** — um único número SemVer para o produto. O estado combinado herda `0.2.0` (o visualizador já estava nessa versão); o `CHANGELOG` vira único, fundindo generator (0.1.0) e viewer (0.2.0). O `package.json` da extensão espelha a mesma tag.
- **Import:** **cópia do código final** do Planner em `packages/vscode/`, sem preservar o histórico git separado (conteúdo tratado como fornecido agora). Exclui `CLAUDE.md` (config privada), `node_modules/`, `dist/`, `.git`.

**Consequências**

- Repo único: gerador (raiz) + visualizador (`packages/vscode/`).
- Histórico do Planner não preservado como branch; a partir daqui tudo é commitado no EasyDocs.
- `docs(example)/` (fixture dos testes do core) é mantido em `packages/vscode/` para os testes automatizados.
- Encerra os itens I0 de fusão do ROADMAP.

## ADR 0010 — Writer roundtrip com AST (preservação de formatação)

Fonte: [ADR 0010](adr/0010-writer-roundtrip-ast.md)

**Decisão**

Adotar abordagem **AST-based** para writer roundtrip:

- Usar parser markdown completo (`remark`/`unified`) para gerar AST do `.md` original
- Modificar apenas os nós específicos no AST (ex: nós de texto com versões)
- Reescrever markdown do AST modificado usando o generator
- Preservar formatação original (espaçamento, indentação, comentários) porque o AST mantém metadados de posição

Alternativas rejeitadas:
- **Regex com placeholders**: leve, mas frágil para formatação não-padrão
- **Diff-based**: robusto, mas complexo de implementar

**Consequências**

- Formatação do `.md` é preservada com precisão ao reenumerar versões
- Dependência de `remark`/`unified` (ecossistema maduro, padrão da indústria)
- Diff no git fica limpo (só muda o que foi alterado, não formatação)
- Implementação mais robusta que regex, menos complexa que diff-based

## ADR 0012 — Validação automática de tags de rastreabilidade

Fonte: [ADR 0012](adr/0012-validacao-automatica-tags.md)

**Decisão**

Criar um linter/script que valida se toda entidade pública tem pelo menos uma tag de referência a doc:

- **Linter**: script que varre arquivos de código e verifica presença de tags `@ADR`, `@PRD` ou `@ROADMAP` antes de definições de classe/função/módulo
- **Integração**: pre-commit hook para rodar automaticamente antes de cada commit
- **Linguagem-agnóstico**: usar regex para detectar comentários `// @` em qualquer arquivo de código (JavaScript, TypeScript, Python, Go, etc.)
- **Configuração**: arquivo `.taglintrc` (JSON) para definir padrões e exceções

Alternativas rejeitadas:
- **Validação manual**: frágil e inconsistente
- **Linter específico de linguagem** (ex: ESLint plugin): não cobre todas as linguagens

**Consequências**

- Regra de rastreabilidade é enforceável automaticamente
- Pre-commit hook garante que commits não violam a convenção
- Linter leve e universal (regex)
- Requer configuração de pre-commit hook nos projetos

## ADR 0018 — ARCHITECTURE e DESIGN geradas por script a partir das ADRs

Fonte: [ADR 0018](adr/0018-views-geradas-por-script.md)

**Decisão**

- `docs/ARCHITECTURE.md` e `docs/DESIGN.md` passam a ser **arquivos gerados** por um script sem dependências (`scripts/views.mjs`), a partir das ADRs com status `accepted` dos domínios `architecture` e `design` (cada seção = título, Decisão e Consequências da ADR, em ordem numérica, com link para a ADR de origem).
- Os arquivos são **somente leitura** (cabeçalho "gerado — não edite"); a fonte é sempre a ADR. O `check` falha se estiverem desatualizados (regenera em memória e compara).
- ADRs `superseded`/`deprecated`/`proposed` não entram.
- Implementação: item R-013 do ROADMAP. A parte "views virtuais do plugin" da ADR 0001 fica superada; o restante da 0001 (PRD âncora, decisões em ADR) segue válido.

**Consequências**

- Qualquer agente lê o estado atual em um arquivo, sem plugin.
- Um arquivo gerado a mais para manter sincronizado (o `check` garante).
- ADRs mal tagueadas por domínio ficam de fora das views: o domínio da ADR passa a importar.
