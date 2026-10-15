Arquivo do ROADMAP anterior (checklist com `[x]`), preservado íntegro antes da migração para o modelo "só aberto" com IDs permanentes (ADR 0014). Os itens ainda abertos foram reescritos em `docs/ROADMAP.md` com IDs `R-NNN`. Texto original abaixo, sem alteração (inclui `[[wikilinks]]` da época).

---

Afazeres/pendências do projeto (TODOs).

# ROADMAP — EasyDocs

> Tarefas do projeto. Marque `- [x]` ao concluir. Itens que aguardam decisão do dono ficam aqui até resolvidos.

- [x] Confirmar que o nome da pasta (`EasyDocs`) é o nome do projeto — registrado em [[PRD]]/[[README]].
- [x] Definir o destino do `push` (remote GitHub: mauriciokataoka/EasyDocs).
- [x] Detalhar o objetivo no [[PRD]] (template de docs orientadas a agente).
- [x] Confirmar que o **gerador** (`seed/` + docs) não é um app → sem `src/` na raiz; o plugin VSCode tem seu próprio `src/` em `packages/vscode/` (ADR 0005).
- [x] Confirmar que o **gerador é estático** (sem build na raiz); o plugin VSCode tem runtime/esbuild próprios (ADR 0005).
- [x] Idioma canônico: pt-BR (alinhado às docs atuais).
- [x] Validar `AGENTS.md` contra a especificação agents.md (https://agents.md) e versionar como `v0.1.0`.
- [x] Adicionar exemplo de ADR `proposed` real para exercitar o fluxo (ADR 0012 — validação automática de tags).
- [ ] (Opcional, I2) Agregar a `AGENTS.md` nota de "sem build/test/segredos" alinhada às seções recomendadas da spec agents.md (aguarda aprovação do dono).
- [x] Renomear projeto **MinimalDocs → EasyDocs** (pasta + PRD/README/CHANGELOG/refs nas docs) — concluído.
- [x] Trazer o projeto **VSCode (visualizador de docs)** e fundi-lo aqui: **especificações trazidas** (ADRs 0004/0005/0006) e **código integrado** em `packages/vscode/` (ADR 0009).
  - Fonte: `/Users/mauriciokataoka/Documents/GitHub/Planner` — package `easydocs` v0.2.0, já nomeado EasyDocs; segue as mesmas convenções AGENTS.md (fusão limpa).
  - Import por **cópia do código final** (sem histórico git); excluídos `CLAUDE.md`, `node_modules/`, `dist/`, `.git`. `docs(example)/` mantido como fixture de testes. Docs narrativos do Planner removidos (fonte única é `docs/` na raiz, ADR 0001).

## Visualizador (herdado do Planner — ADRs 0004/0005/0006)
Tarefas de implementação do plugin VSCode. No Planner estavam parcialmente concluídas; aqui ficam pendentes até integração em `packages/vscode/` e validação em execução (ADR 0005: código não validado). Itens marcados `*(feito no Planner; revalidar)*` foram concluídos lá, mas precisam ser reconfirmados no repo unificado.

### Core (compartilhado)
- [x] Writer roundtrip (`.md` ← modelo) preservando formatação (ADR 0010 — AST-based com remark/unified).
- [ ] Atribuir versão a feature órfã pela posição (ordem) no doc (ADR 0006 / ADR 0008).

### UI compartilhada (webview)
- [x] Cards colapsáveis por versão; render de Roadmap/Changelog/ADRs; busca por texto. *(feito no Planner; revalidar)*
- [x] Features órfãs destacadas (grupo próprio). *(feito no Planner; revalidar)*
- [ ] Busca por versão + treeview.
- [ ] Render de doc único (painel/aba do VSCode).
- [ ] **ROADMAP: cards arrastáveis + auto-renumeração de versão ao reordenar** (ADR 0006 / ADR 0008 — algoritmo definido).

### Extensão VSCode
- [x] Manifest + build esbuild (`dist/extension.js`, `dist/webview.js`, `dist/webview.css`). *(feito no Planner; revalidar)*
- [x] Ponte host↔webview (`workspace.fs` → core → `postMessage`). *(feito no Planner; revalidar)*
- [x] Custom Editor para `ROADMAP.md`/`CHANGELOG.md`. *(feito no Planner; revalidar)*
- [x] Painel EasyDocs na Activity Bar (TreeView). *(feito no Planner; revalidar)*
- [x] Remover casca HTML/SPA (`src/web`). *(feito no Planner)*
- [x] Verificação manual no Extension Development Host (F5) — **corrigido**: `launch.json` agora tem `preLaunchTask: build`, e `.vscode/tasks.json` builda via `npm run build`. Causa raiz de "não funcionava": o webview lê `dist/webview.js`/`webview.css` em runtime, mas `dist/` é gitignorado e ausente sem build — F5 sem build queueava ao ler arquivos inexistentes.
- [ ] Comando/menu de contexto (opcional).

### Testes e distribuição
- [x] Testes automatizados do core (fixture `docs(example)/`). *(feito no Planner; revalidar)*
- [x] Fixture `docs(example)/` fica local (não entra versionado).
- [x] Empacotar/distribuir (uso pessoal: VSIX manual via `vsce package`, sem Marketplace/CI-CD).

- [x] (I0 / ADR 0009) Estrutura de monorepo: gerador na raiz + extensão em `packages/vscode/`; `AGENTS.md` aninhado na extensão tem precedência (spec agents.md).
- [x] (I0 / ADR 0009) Versionamento **unificado**: um único número SemVer (produto combinado em `0.2.0`); `CHANGELOG` único funde generator (0.1.0) + viewer (0.2.0).
- [x] (ADR 0011) Regra de versionamento unificado: viewer dita o bump (gerador estático, viewer ativo).
- [x] (I0 / ADR 0009) Mesclagem de histórico: **cópia do código final** (sem `subtree`); histórico do Planner não preservado como branch.
- [x] Implementar o visualizador: **reaproveitar** o código do Planner, copiado em `packages/vscode/` (ADR 0009). Validação em execução pendente nos itens abaixo.
- [x] Renomear repo **MinimalDocs → EasyDocs** (pasta): produto já é EasyDocs (ADR 0004); ajustar nomes/refs em docs — concluído.
- [x] (ADR 0007) Validar `seed/AGENTS.md` reescrito em ≥2 modelos (conformância) — exercitado com 5 modelos no teste de landing page; estilo aprovado para o root `AGENTS.md`.
- [x] (ADR 0001, active) Colapsar PRD/ARCH/DESIGN em ADRs tagueados por domínio — piloto aplicado no repo (PRD âncora + ARCH/DESIGN views; AGENTS.md raiz+seed e seed/SCAFFOLD.md atualizados).

## Candidatas importadas do ArchiveGuard (avaliação em curso, 2026-10-15)
Origem: comparação entre o EasyDocs e `/Users/mauriciokataoka/GitHub/ArchiveGuard` (metodologia em `docs/DOCUMENTATION.md`, `scripts/check.sh`, `.githooks/`, `.github/workflows/check.yml`, `scripts/sync-version.mjs`, `docs/field-notes/`, `docs/archive/`). Nada abaixo está decidido: cada item aguarda o dono aprovar/rejeitar (itens estruturais exigem I0 → ADR `proposed`).
- [ ] **C1 — ROADMAP só com trabalho aberto + arquivo de concluídos.** No ArchiveGuard, item concluído sai do ROADMAP e vai integral p/ `archive/roadmap/R-XXX-*.md` (com índice). Aqui o ROADMAP é checklist com `[x]` acumulados (cresce sem parar, mistura feito/aberto). Impacto: retomada mais rápida (só o aberto é lido). Estrutural (I0): conversa com `history/`. Recomendação: **adotar**.
- [ ] **C2 — Item de ROADMAP autossuficiente (modelo rico).** Campos: Estado, Objetivo, Contexto, Escopo, Fora de escopo, Dependências, Riscos, Validação, Critérios de pronto. Alinha com a regra daqui "tópico = título + explicação". Recomendação: **adotar em versão enxuta** (Estado/Objetivo/Escopo/Validação obrigatórios; o resto quando couber) — o ArchiveGuard chegou a 372 linhas.
- [ ] **C3 — IDs permanentes `R-XXX` (nunca reutilizar).** O ArchiveGuard sofreu colisão (R-011/R-012 reutilizados; corrigida em 2026-10-15 com tabela de correspondência). Hoje o ROADMAP daqui não tem IDs, então o viewer/arraste (ADR 0006/0008) não tem chave estável. Recomendação: **adotar** junto com C1.
- [ ] **C4 — `field-notes/` (evidências datadas, imutáveis).** Categoria distinta de ADR (decisão) e `history/` (arquivado): registra comando, ambiente, resultado, limitações. Útil p/ validar o viewer em F5/VSCode e a conformância cross-modelo (hoje `CONFORMANCE.md` tem matriz vazia). Estrutural (I0). Recomendação: **adotar**.
- [ ] **C5 — Verificação executável única (`npm run check`/`scripts/check.sh`) + hook `pre-push` opcional + CI.** O ArchiveGuard roda fmt/clippy/test/build num comando, com perfil descartável e hook ativável por `npm run hooks`. Aqui só `packages/vscode` tem testes e nada roda sozinho. Casa com a ADR 0012 (linter de tags): o linter viraria um passo do `check`. Recomendação: **adotar** (check na raiz = testes do viewer + validação de tags + links `[[ ]]` + versão).
- [ ] **C6 — Single source of truth de versão com `sync-version`.** Hoje a versão está na tag, no topo do CHANGELOG e em `packages/vscode/package.json` (espelho manual; ADR 0011). O ArchiveGuard tem script que espelha e falha no CI se divergir (`git diff --exit-code`). Recomendação: **adotar** (script pequeno que valida, sem build).
- [ ] **C7 — BDD/TESTING como doc de comportamento observável.** Cenários Dado/Quando/Então p/ o viewer (ex.: "arrastar card reordena e renumera versão"). Só vale quando o viewer estabilizar. Recomendação: **adiar** (não adotar como doc obrigatória do gerador).
- [ ] **C8 — Padronizar status de ADR.** Aqui há `active` e `accepted` misturados no INDEX; ArchiveGuard usa só `proposed|accepted|superseded|deprecated` e documenta o significado de cada um. Recomendação: **adotar** (corrige inconsistência; migrar `active`→`accepted`).
- [ ] **C9 — ADR com `Alternativas` explícitas.** O formato Nygard daqui não força alternativas rejeitadas (só a 0012 as cita). Recomendação: **adotar** como seção opcional recomendada no `0000-template`.
### Mantido do EasyDocs (não importar o equivalente do ArchiveGuard)
`AGENTS.md` como protocolo único (sem indireção p/ `DOCUMENTATION.md`); retomada sem handoff (o ArchiveGuard acumulou 3 `HANDOFF-*` arquivados); wikilinks/Obsidian; tags `@ADR/@PRD/@ROADMAP` no código; Conventional Commits + SemVer + tags annotated; `seed/` + `SCAFFOLD.md`; roteiro de conformância; PRD/ARCH/DESIGN como views virtuais (ADR 0001) — ressalva: sem o plugin, o agente não tem "estado atual" materializado; avaliar depois se `ARCHITECTURE.md` gerado vale a pena.

### Decisões do dono (2026-10-15) — aguardando "pode implementar"
O dono pediu **não implementar ainda** (vai complementar). Decidido até agora:
- **Importar** C1, C2, C3, C4, C5, C6, C8, C9 e também os demais pontos "melhor no ArchiveGuard". C7 (BDD) segue adiado.
- **Regras só no `AGENTS.md`** (sem `DOCUMENTATION.md` separado): aceitar um `AGENTS.md` maior em troca de zero redundância; a metodologia do ArchiveGuard é absorvida nele (e no `seed/AGENTS.md`).
- **Handoffs:** esporádicos (trabalho não commitado entre duas máquinas); não recorrentes → **não mencionar handoff** nas docs do EasyDocs.
- **Fim dos wikilinks/Obsidian:** links passam a ser Markdown relativos padrão, como no ArchiveGuard. Impacto a tratar na implementação: supersedar a ADR 0003; remover a regra "Formato Obsidian" do `AGENTS.md` (raiz e seed); converter `[[ ]]` em todas as docs, `seed/` e `README`; checar se o viewer (`packages/vscode`) depende de `[[ ]]`.
- **Restrição de custo (GitHub Actions, plano gratuito):** o dono estourou a cota em 2025-09 por excesso de automação. **C5/C6 devem ser local-first** (script + hook `pre-push`); CI só se for barato (ver proposta abaixo, pendente de aprovação).

### Proposta genérica v2 (2026-10-15) — substitui a leitura "comparar com o app"; aguardando aprovação
Correção de foco do dono: comparar o EasyDocs com a **documentação** do ArchiveGuard, não com o app (desktop multiplataforma, caso raro; os projetos normais serão **web**). O EasyDocs é genérico: serve a qualquer projeto futuro. Pesquisado: `master` do ArchiveGuard (`docs/DOCUMENTATION.md`, `AGENTS.md`, `docs/field-notes/20261008-Auditoria.md`) e a branch `docs/improve-documentation` (só reescrita de conteúdo de set/2026; **não há ADR** com o raciocínio da metodologia — ela nasceu em conversa e foi consolidada em `7bcab46`, 2026-10-15).
- **Núcleo (todo projeto):** `AGENTS.md` (única fonte normativa, sem `DOCUMENTATION.md`), `README`, `docs/PRD`, `docs/ROADMAP` (só aberto; IDs `R-XXX` permanentes; item com Estado/Objetivo/Escopo/Validação obrigatórios, Fora de escopo/Dependências/Riscos/Critérios de pronto quando couber), `docs/adr/` (+INDEX; status `proposed|accepted|superseded|deprecated`; seção Alternativas), `docs/CHANGELOG`, `docs/field-notes/` (criada na 1ª evidência), `docs/archive/` (`roadmap/` + INDEX; fora da leitura padrão).
- **Módulos opcionais (o projeto declara no PRD quais usa):** BDD (quando comportamento observável importa), API (contratos), ARCHITECTURE (estado atual materializado — decisão sobre as views virtuais segue adiada), TESTING (comandos, não resultados), SAFETY (só se há operação destrutiva). O `seed/` oferece cada um como módulo, não como obrigação.
- **Erros do ArchiveGuard a NÃO herdar** (a própria auditoria dele aponta): metodologia grande demais (314 linhas > PRD+API+ARCH somados) → regras enxutas no `AGENTS.md`; item de roadmap virando diário ("Evolução em…", "Falha confirmada…") → o item guarda Estado + link p/ field-note, a evidência vive na nota; TESTING com números datados ("50 testes") → só comandos; colisão de IDs → regra "nunca reutilizar" + checagem no `check`.
- **Verificação e custo de Actions (política padrão do seed):** (1) `scripts/check.sh` por projeto + hook `pre-push` (`git config core.hooksPath .githooks`) = portão **local**, custo zero; (2) **sem workflow por padrão**; (3) CI só se justificada (publicar/tag/release, mais de um colaborador, checagem que exige outro SO) e então **mínima**: `pull_request` + `main` (nunca todo push), `ubuntu-latest` apenas, `concurrency: cancel-in-progress`, `timeout-minutes`, `paths` filtrando docs, `workflow_dispatch` p/ rodar à mão; macOS/Windows (minuto 10×/2× no plano gratuito) só via `workflow_dispatch`. Projetos web normalmente dispensam matriz. Registrar a política numa ADR `proposed`.
- **Versão:** cada projeto declara **uma** fonte de verdade (manifesto nativo ou tag/CHANGELOG); script `check` valida que os espelhos coincidem. Sem build, sem CI obrigatório.
- **Sem wikilinks:** links Markdown relativos (já adotado no ArchiveGuard); `check` valida links quebrados.

### Testes e critérios de pronto — o que portar (2026-10-15, proposta; aguardando aprovação)
Origem: `ArchiveGuard/docs/DOCUMENTATION.md` (seção "Critérios de pronto", "Fluxo de manutenção"), `AGENTS.md` ("Desenvolvimento e validação") e `docs/TESTING.md`. O ArchiveGuard é mais rígido porque o risco é perda de dados; o EasyDocs genérico adota o **mecanismo** e deixa o **rigor proporcional** ao risco/escopo do item ("conforme aplicável").
- **T1 — Critérios de pronto genéricos no `AGENTS.md`** (portar): item **pronto para revisão** quando, conforme aplicável: implementação dentro do escopo; testes relevantes passam; validação manual prevista feita; docs/contratos/ADRs afetados atualizados; limitações e riscos residuais registrados; nenhuma regressão conhecida sem decisão explícita.
- **T2 — Dois passos de conclusão** (portar): "pronto para revisão" ≠ "concluído". Só o dono aceitando move o item para `archive/roadmap/` (texto íntegro + data, resultado, evidências, limitações). Código sozinho não comprova critério de pronto.
- **T3 — Estados do item** (portar, enxuto): planejado, em implementação, aguardando validação, pronto para revisão, concluído, cancelado/substituído (cancelado leva motivo e link da decisão substituta).
- **T4 — Regra de evidência honesta** (portar): cada evidência vale para **o subitem que prova**, com data, ambiente/revisão e resultado `aprovado | falhou | não executado`; registrar a causa de falhas e de verificações não feitas; **nunca apresentar verificação parcial como aprovação completa**. A evidência detalhada vive em `field-notes/`; o item só aponta.
- **T5 — Bug fix exige teste de regressão** (portar como regra geral).
- **T6 — TDD seletivo** (portar): teste primeiro quando a regra é nova, de risco alto ou isolável (domínio, persistência, segurança, dinheiro); não forçar teste artificial em UI/integração difícil — nesses casos, validação manual registrada.
- **T7 — Comando único de verificação** (portar, ligado a C5): todo projeto define **um** comando (`npm run check` ou `scripts/check.sh`) e o `AGENTS.md` manda executá-lo antes de concluir mudança de código. No EasyDocs gerador, o `check` testa as **próprias docs** (links/âncoras, IDs únicos, status de ADR válido, tags `@ADR/@PRD/@ROADMAP`, versão espelhada) + testes do `packages/vscode`.
- **T8 — Mudança de comportamento atualiza BDD/ADR** (portar só se o projeto usa o módulo BDD; senão, atualiza PRD/ADR).
- **Não portar (específico do ArchiveGuard):** perfil descartável e `--test-threads=1`, testes em volumes reais, clippy/fmt/Rust, matriz macOS/Linux/Windows, SAFETY. Ficam como exemplo no `seed/` de um projeto de risco alto, não como regra.
