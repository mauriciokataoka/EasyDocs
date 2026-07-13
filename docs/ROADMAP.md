Afazeres/pendências do projeto (TODOs).

# ROADMAP — EasyDocs

> Tarefas do projeto. Marque `- [x]` ao concluir. Itens que aguardam decisão do dono ficam aqui até resolvidos.

- [x] Confirmar que o nome da pasta (`EasyDocs`) é o nome do projeto — registrado em [[PRD]]/[[README]].
- [ ] Definir o destino do `push` (remote GitHub) — *pode adiar*.
- [x] Detalhar o objetivo no [[PRD]] (template de docs orientadas a agente).
- [x] Confirmar que o **gerador** (`seed/` + docs) não é um app → sem `src/` na raiz; o plugin VSCode tem seu próprio `src/` em `packages/vscode/` (ADR 0005).
- [x] Confirmar que o **gerador é estático** (sem build na raiz); o plugin VSCode tem runtime/esbuild próprios (ADR 0005).
- [ ] Escrever o `README` em inglês? (hoje em pt-BR, alinhado às docs) — decidir idioma canônico.
- [x] Validar `AGENTS.md` contra a especificação agents.md (https://agents.md) e versionar como `v0.1.0`.
- [ ] Adicionar exemplo de ADR `proposed` real para exercitar o fluxo.
- [ ] (Opcional, I2) Agregar a `AGENTS.md` nota de "sem build/test/segredos" alinhada às seções recomendadas da spec agents.md (aguarda aprovação do dono).
- [x] Renomear projeto **MinimalDocs → EasyDocs** (pasta + PRD/README/CHANGELOG/refs nas docs) — concluído.
- [x] Trazer o projeto **VSCode (visualizador de docs)** e fundi-lo aqui: **especificações trazidas** (ADRs 0004/0005/0006) e **código integrado** em `packages/vscode/` (ADR 0009).
  - Fonte: `/Users/mauriciokataoka/Documents/GitHub/Planner` — package `easydocs` v0.2.0, já nomeado EasyDocs; segue as mesmas convenções AGENTS.md (fusão limpa).
  - Import por **cópia do código final** (sem histórico git); excluídos `CLAUDE.md`, `node_modules/`, `dist/`, `.git`. `docs(example)/` mantido como fixture de testes. Docs narrativos do Planner removidos (fonte única é `docs/` na raiz, ADR 0001).

## Visualizador (herdado do Planner — ADRs 0004/0005/0006)
Tarefas de implementação do plugin VSCode. No Planner estavam parcialmente concluídas; aqui ficam pendentes até integração em `packages/vscode/` e validação em execução (ADR 0005: código não validado). Itens marcados `*(feito no Planner; revalidar)*` foram concluídos lá, mas precisam ser reconfirmados no repo unificado.

### Core (compartilhado)
- [ ] Writer roundtrip (`.md` ← modelo) preservando formatação (ADR 0005).
- [ ] Atribuir versão a feature órfã pela posição (ordem) no doc (ADR 0006 / ADR 0008).

### UI compartilhada (webview)
- [x] Cards colapsáveis por versão; render de Roadmap/Changelog/ADRs; busca por texto. *(feito no Planner; revalidar)*
- [x] Features órfãs destacadas (grupo próprio). *(feito no Planner; revalidar)*
- [ ] Busca por versão + treeview.
- [ ] Render de doc único (painel/aba do VSCode).
- [ ] **ROADMAP: cards arrastáveis + auto-renumeração de versão ao reordenar** (ADR 0006 / ADR 0008 — regra de mapeamento em aberto).

### Extensão VSCode
- [x] Manifest + build esbuild (`dist/extension.js`, `dist/webview.js`, `dist/webview.css`). *(feito no Planner; revalidar)*
- [x] Ponte host↔webview (`workspace.fs` → core → `postMessage`). *(feito no Planner; revalidar)*
- [x] Custom Editor para `ROADMAP.md`/`CHANGELOG.md`. *(feito no Planner; revalidar)*
- [x] Painel EasyDocs na Activity Bar (TreeView). *(feito no Planner; revalidar)*
- [x] Remover casca HTML/SPA (`src/web`). *(feito no Planner)*
- [ ] Verificação manual no Extension Development Host (F5).
- [ ] Comando/menu de contexto (opcional).

### Testes e distribuição
- [x] Testes automatizados do core (fixture `docs(example)/`). *(feito no Planner; revalidar)*
- [ ] Decidir se `docs(example)/` entra versionado como fixture ou fica local.
- [ ] Empacotar/distribuir (VSIX/Marketplace).

- [x] (I0 / ADR 0009) Estrutura de monorepo: gerador na raiz + extensão em `packages/vscode/`; `AGENTS.md` aninhado na extensão tem precedência (spec agents.md).
- [x] (I0 / ADR 0009) Versionamento **unificado**: um único número SemVer (produto combinado em `0.2.0`); `CHANGELOG` único funde generator (0.1.0) + viewer (0.2.0).
- [x] (I0 / ADR 0009) Mesclagem de histórico: **cópia do código final** (sem `subtree`); histórico do Planner não preservado como branch.
- [x] Implementar o visualizador: **reaproveitar** o código do Planner, copiado em `packages/vscode/` (ADR 0009). Validação em execução pendente nos itens abaixo.
- [x] Renomear repo **MinimalDocs → EasyDocs** (pasta): produto já é EasyDocs (ADR 0004); ajustar nomes/refs em docs — concluído.
- [x] (ADR 0007) Validar `seed/AGENTS.md` reescrito em ≥2 modelos (conformância) — exercitado com 5 modelos no teste de landing page; estilo aprovado para o root `AGENTS.md`.
- [x] (ADR 0001, active) Colapsar PRD/ARCH/DESIGN em ADRs tagueados por domínio — piloto aplicado no repo (PRD âncora + ARCH/DESIGN views; AGENTS.md raiz+seed e seed/SCAFFOLD.md atualizados).
