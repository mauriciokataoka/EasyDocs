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
- [~] Trazer o projeto **VSCode (visualizador de docs)** e fundi-lo aqui: **especificações já trazidas** (ADRs 0004/0005/0006); **código** a integrar em `packages/vscode/` (ver itens I0 abaixo).
  - Fonte: `/Users/mauriciokataoka/Documents/GitHub/Planner` — package `easydocs` v0.2.0, já nomeado EasyDocs; segue as mesmas convenções AGENTS.md (fusão limpa).
  - Excluir da fusão: `CLAUDE.md` (config privada) e `node_modules/`/`dist/`/`docs(example)/` (ignoráveis).
- [ ] (I0 / ADR) Decidir estrutura de monorepo: gerador na raiz + extensão em `packages/vscode/`; precedência de `AGENTS.md` aninhado na extensão (spec agents.md).
- [ ] (I0 / ADR) Decidir versionamento unificado: repo EasyDocs (CHANGELOG, hoje 0.1.0) vs `package.json` da extensão (0.2.0) — manter independentes ou unificar.
- [ ] (I0 / ADR) Decidir mesclagem de histórico git: `git subtree add` de Planner em `packages/vscode/` (preserva histórico) vs `merge --allow-unrelated-histories`.
- [ ] Implementar o visualizador: decidir **reaproveitar** o código do Planner (não validado em execução) vs **reescrever**; alvo `packages/vscode/`.
- [x] Renomear repo **MinimalDocs → EasyDocs** (pasta): produto já é EasyDocs (ADR 0004); ajustar nomes/refs em docs — concluído.
- [ ] (ADR 0007) Validar `seed/AGENTS.md` reescrito em ≥2 modelos (conformância) antes de aplicar o mesmo estilo ao root `AGENTS.md`. Roteiro em `docs/CONFORMANCE.md`.
- [x] (ADR 0001, active) Colapsar PRD/ARCH/DESIGN em ADRs tagueados por domínio — piloto aplicado no repo (PRD âncora + ARCH/DESIGN views; AGENTS.md raiz+seed e seed/SCAFFOLD.md atualizados).
