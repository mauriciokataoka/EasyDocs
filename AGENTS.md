# AGENTS.md

> Segue a convenção [agents.md](https://agents.md). **Retomada:** leia este arquivo → [[ROADMAP]] (o que fazer) + `docs/adr/` (porquês). Tudo relevante referenciado aqui; arquivado é off-graph. **Este projeto retoma sem handoff: todo o estado vive nas docs — um agente novo lê este arquivo e continua.**

## Início
- Se `SCAFFOLD.md` existir nesta pasta (não procurar aninhado): execute-o **1×**. Senão: siga o método.
- Config do agente: se você tem um arquivo de config padrão (ex.: `CLAUDE.md`), **crie-o na 1ª execução** referenciando [[AGENTS]] como **fonte canônica** (lida primeiro, com precedência), sem contrariá-lo. Não entra no Mapa; é privado. Use-o só p/ **rascunho efêmero seu**; o que vale p/ o projeto ou outro agente **vai p/ a doc canônica** (ver Método), nunca só no seu config — senão some na troca de agente.

## Mapa (docs canônicas em `docs/`; raiz só `AGENTS`+`README`; não listar diretórios; arquivado = off-graph)
| Arquivo | Quando ler |
|---|---|
| [[PRD]] | âncora mínima: problema, público, não-objetivos, objetivo inicial (não é decisão) |
| (views) ARCHITECTURE/DESIGN | **virtuais** (plugin): pastas `architecture`/`design` montadas a partir de ADRs por domínio — ver `docs/adr/INDEX.md` |
| [[README]] | visão p/ humano |
| [[ROADMAP]] | **sempre, p/ retomar** — afazeres/pendências |
| `docs/adr/INDEX.md` | decisões e porquês — **sob demanda**; status no índice |
| [[CHANGELOG]] | histórico de versões |
| `history/INDEX.md` | arquivado — off-graph (só se vasculhar) |

## Método
- Iteração = brainstorm: questionar, checar consistência, digerir em detalhe **na doc** — o chat recebe só o essencial (ver `Resposta` abaixo), nunca fica vazio de conteúdo útil.
- **Resposta:** o definitivo/simples → responda já, curto. O que pede decisão ou altera doc → vira tópico. No chat: a resposta + os **títulos** dos pendentes + a **descrição de UM só** tópico (o mais importante × abrangência) + **um pedido**.
- **Documentar é execução direta, sem pedir permissão** — de forma **objetiva** (≠ reduzida): **tópico = título + explicação**, nunca só o título (outro agente não deve inventar a explicação de um título alheio). Todos os tópicos ficam documentados em detalhe, autossuficientes p/ qualquer agente retomar e apresentá-los *as-it-is*.
- **Decisões significativas → ADR** (`docs/adr/`, formato Nygard; indexadas; aberta = `status: proposed`).
- **Afazeres → [[ROADMAP]]**.
- **Persistência imediata:** doc/ROADMAP atualizados **antes** de responder no chat — a conversa pode ser abandonada a qualquer momento e outro agente retoma **só pelas docs**, sem handoff. O que **aguarda decisão do dono** entra no [[ROADMAP]] (ou ADR `proposed`) **antes** da pergunta no chat; sai quando decidido.
- A cada iteração, revisar [[ROADMAP]] + ADRs `proposed` (um brainstorm pode resolver sem o usuário notar).
- Doc canônica = estado atual; `history/` = off-graph.
- **Formato Obsidian:** refs entre docs = `[[wikilink]]` (grafo = mapa mental); `README` usa links padrão (GitHub); `history/` fica fora do grafo.
- **Propor→aprovar→executar** = só p/ mudança **estrutural** (I0: novo tipo de artefato/termo/doc/pasta) ou p/ alterar **este arquivo** (I2: exige aprovação explícita do dono do projeto — nunca por sua iniciativa). Atualizar **conteúdo** de PRD/ARCHITECTURE/DESIGN/README/ROADMAP em resposta direta a uma instrução do usuário (nome, objetivo, rename, item do ROADMAP) é execução direta.

## Invariantes
- **I0** novo **artefato/termo/doc/pasta**: propor→ratificar→codificar aqui→usar — mudança **abrangente** (registre como ADR, com justificativa); termos preferem o **padrão da indústria**.
- **I1** ler/operar só nesta pasta.
- **I2** este arquivo só muda com aprovação explícita do dono do projeto — nunca por sua iniciativa.

## Comportamento / Operação
- Objetivo claro (senão pergunte); pergunta é pergunta; "né?/não?" confirma premissa; tarefa grande→plano; **doc = fonte de verdade**.
- Git imediato (repo próprio); **push só com aprovação**; **commits obrigatoriamente em Conventional Commits** (formato: `type(scope): description`).
  - **Types obrigatórios:** `feat` (feature), `fix` (bugfix), `docs` (documentação), `refactor` (refatoração), `test` (testes), `chore` (tarefas)
  - **Scope opcional:** ex: `feat(viewer):`, `fix(core):`
  - **Breaking change:** adicionar `!` após type/scope (ex: `feat!:`) ou footer `BREAKING CHANGE:`
  - **Referência a ADR:** quando aplicável, incluir no footer (ex: `Refs: ADR-0008`)
- **Versão** ([SemVer](https://semver.org/)): corrente = **tag `vX.Y.Z`**, espelhada no topo do `CHANGELOG` ([Keep a Changelog](https://keepachangelog.com)); bump pelos commits (`fix`→patch, `feat`→minor, `!`/`BREAKING`→major); nasce em `0.1.0`. Release = mover `[Unreleased]`→`[X.Y.Z] - data` + criar a tag. Com código, o manifesto nativo (`package.json`…) espelha a tag.
- **Git tags**: usar formato `vX.Y.Z` (prefixo `v` + SemVer). Tags são annotated (com mensagem) e seguem o conteúdo do CHANGELOG. Ex: `git tag -a v0.2.0 -m "Release 0.2.0"`
- **Tags no código**: comentários inline para rastreabilidade código↔docs. Formato: `// @TAG valor`.
  - `@ADR-XXXX` - referência a ADR (ex: `// @ADR-0008`)
  - `@PRD` - referência ao PRD (ex: `// @PRD objetivo-inicial`)
  - `@ROADMAP` - referência ao ROADMAP (ex: `// @ROADMAP item-123`)
  - `@since X.Y.Z` - desde quando existe (ex: `// @since 0.2.0`)
  - `@deprecated X.Y.Z` - obsoleto desde (ex: `// @deprecated 0.3.0`)
  - Toda entidade pública (classe, função, módulo) DEVE ter pelo menos uma referência a doc (@ADR, @PRD ou @ROADMAP).
