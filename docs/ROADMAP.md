Afazeres/pendências do projeto (TODOs).

# ROADMAP — MinimalDocs

> Tarefas do projeto. Marque `- [x]` ao concluir. Itens que aguardam decisão do dono ficam aqui até resolvidos.

- [x] Confirmar que o nome da pasta (`MinimalDocs`) é o nome do projeto — registrado em [[PRD]]/[[README]].
- [ ] Definir o destino do `push` (remote GitHub) — *pode adiar*.
- [x] Detalhar o objetivo no [[PRD]] (template de docs orientadas a agente).
- [x] Confirmar que **não é um app** → não criar `src/`.
- [x] Confirmar que **não é software com runtime** → stack = estática (sem build).
- [ ] Escrever o `README` em inglês? (hoje em pt-BR, alinhado às docs) — decidir idioma canônico.
- [x] Validar `AGENTS.md` contra a especificação agents.md (https://agents.md) e versionar como `v0.1.0`.
- [ ] Adicionar exemplo de ADR `proposed` real para exercitar o fluxo.
- [ ] (Opcional, I2) Agregar a `AGENTS.md` nota de "sem build/test/segredos" alinhada às seções recomendadas da spec agents.md (aguarda aprovação do dono).
- [ ] Renomear projeto **MinimalDocs → EasyDocs** (pasta + PRD/README/CHANGELOG/refs nas docs).
- [ ] Trazer o projeto **VSCode (visualizador de docs)** e fundi-lo aqui (monorepo: `seed/` gerador + `packages/vscode/` extensão).
  - Fonte: `/Users/mauriciokataoka/Documents/GitHub/Planner` — package `easydocs` v0.2.0, já nomeado EasyDocs; segue as mesmas convenções AGENTS.md (fusão limpa).
  - Excluir da fusão: `CLAUDE.md` (config privada) e `node_modules/`/`dist/`/`docs(example)/` (ignoráveis).
- [ ] (I0 / ADR) Decidir estrutura de monorepo: gerador na raiz + extensão em `packages/vscode/`; precedência de `AGENTS.md` aninhado na extensão (spec agents.md).
- [ ] (I0 / ADR) Decidir versionamento unificado: repo EasyDocs (CHANGELOG, hoje 0.1.0) vs `package.json` da extensão (0.2.0) — manter independentes ou unificar.
- [ ] (I0 / ADR) Decidir mesclagem de histórico git: `git subtree add` de Planner em `packages/vscode/` (preserva histórico) vs `merge --allow-unrelated-histories`.
- [ ] (ADR 0001, proposed) Decidir colapsar PRD/ARCHITECTURE/DESIGN em ADRs tagueados por domínio (views renderizadas). Aguarda aprovação do dono + mudança em AGENTS.md (I2).
