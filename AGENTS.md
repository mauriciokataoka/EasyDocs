# AGENTS.md

> Segue a convenção [agents.md](https://agents.md). **Retomada:** leia este arquivo → [ROADMAP](docs/ROADMAP.md) (o que fazer) + [ADRs](docs/adr/INDEX.md) (porquês). **Este é o único lugar das regras normativas** (ADR 0016): não existe outro arquivo de metodologia. Todo o estado vive nas docs — um agente novo lê isto e continua.

## Início
- Se `SCAFFOLD.md` existir nesta pasta (não procurar aninhado): execute-o **1×**. Senão: siga o método.
- Config do agente: se você tem um arquivo de config padrão (ex.: `CLAUDE.md`), **crie-o na 1ª execução** referenciando `AGENTS.md` como **fonte canônica** (lida primeiro, com precedência), sem contrariá-lo. É privado; use-o só p/ **rascunho efêmero seu**. O que vale p/ o projeto ou outro agente **vai p/ a doc canônica**, nunca só no seu config.
- Antes de encerrar a sessão ou trocar de máquina: **commite e dê push** (automático, sem pedir aprovação). Trabalho não commitado ou sem push não existe para outro agente.

## Mapa (docs canônicas em `docs/`; raiz só `AGENTS`+`README`; uma fonte por assunto)
| Arquivo | Quando ler |
|---|---|
| [PRD](docs/PRD.md) | âncora mínima: problema, público, não-objetivos, objetivo inicial (não é decisão) |
| (views) ARCHITECTURE/DESIGN | **virtuais** (plugin): montadas a partir das ADRs por domínio — ver [índice de ADRs](docs/adr/INDEX.md) |
| [README](README.md) | visão p/ humano |
| [ROADMAP](docs/ROADMAP.md) | **sempre, p/ retomar** — só trabalho aberto |
| [ADRs](docs/adr/INDEX.md) | decisões e porquês — **sob demanda**; status no índice |
| [CHANGELOG](docs/CHANGELOG.md) | histórico de versões |
| [field-notes](docs/field-notes/INDEX.md) | evidências datadas de validação/uso (só se investigar) |
| [history](docs/history/INDEX.md) | arquivado (roadmap concluído, decisões mortas) — fora da leitura padrão |

## Método
- Iteração = brainstorm: questionar, checar consistência, digerir em detalhe **na doc** — o chat recebe só o essencial, nunca vazio de conteúdo útil.
- **Resposta:** o definitivo/simples → responda já, curto. O que pede decisão ou altera doc → vira tópico. No chat: a resposta + os **títulos** dos pendentes + a **descrição de UM só** tópico (o mais importante × abrangência) + **um pedido**.
- **Documentar é execução direta, sem pedir permissão**, de forma **objetiva** (≠ reduzida): **tópico = título + explicação**, nunca só o título. Autossuficiente p/ qualquer agente retomar.
- **Persistência imediata:** doc/ROADMAP atualizados **antes** de responder no chat. O que **aguarda decisão do dono** entra no ROADMAP (ou ADR `proposed`) **antes** da pergunta; sai quando decidido. A cada iteração, revisar ROADMAP + ADRs `proposed`.
- **Estado atual ≠ histórico:** docs canônicas = estado atual; o histórico fica em ADRs, field-notes e `docs/history/`. Não duplicar texto entre docs; apontar com link.
- **Propor→aprovar→executar** = só p/ mudança **estrutural** (I0) ou p/ alterar **este arquivo** (I2). Atualizar **conteúdo** de PRD/README/ROADMAP em resposta direta a instrução do usuário é execução direta.

### Links e referências (ADR 0013)
- Entre docs: link Markdown **relativo** `[ADR-0008](adr/0008-nome.md)`, com âncora p/ seção `[R-004](ROADMAP.md#r-004--titulo)`; p/ código com linha `[x.ts](../src/x.ts#L10)`. **Sem `[[wikilinks]]`.**
- Menção curta por **ID estável** em texto: `R-004`, `ADR-0008`. IDs nunca mudam nem são reutilizados.

### ADRs (ADR 0016)
- Decisão significativa → `docs/adr/NNNN-titulo.md` (modelo [0000](docs/adr/0000-template.md): Status · Domínio · Contexto · Decisão · **Alternativas** · Consequências), indexada em [INDEX](docs/adr/INDEX.md).
- Status: `proposed` (sugestão; **não orienta implementação importante sem aprovação**) · `accepted` (vigente) · `superseded` (aponta a substituta) · `deprecated`. Nunca apagar ADR.

### ROADMAP (ADR 0014)
- **Só trabalho aberto.** Seções `## vX.Y.Z` (a **posição** do card gera a versão — ADR 0008). Item = `- **R-NNN — Título** · Estado: <estado>` + linhas indentadas `**Objetivo:**`, `**Escopo:**`, `**Validação:**` (obrigatórios) e, quando couber, `**Fora de escopo:**`, `**Dependências:**`, `**Riscos:**`, `**Critérios de pronto:**`. **Escreva o afazer de forma verbosa e sem lacunas:** quem registra deve especificar o máximo possível (contexto, motivo, critérios, exemplos) p/ o próximo agente **não precisar supor**. Ele pode discordar, criticar e contra-argumentar, mas não deve ter dúvida sobre o que foi pedido. O ROADMAP guarda só afazeres, então detalhar não o incha.
- **ID `R-NNN` permanente, nunca reutilizado** (nem após concluir). Antes de criar, consulte o ROADMAP e [docs/history/roadmap/INDEX](docs/history/roadmap/INDEX.md).
- **Estados:** planejado · em implementação · aguardando validação · pronto para revisão · concluído · congelado (adiado por decisão do dono, com motivo; fica na seção `## Congelado`) · cancelado · substituído (cancelado/substituído com motivo e link da decisão).
- **Não é diário:** evidência vai p/ `docs/field-notes/` (`AAAA-MM-DD-assunto.md`, imutável, indexada); o item só linka e guarda o estado.
- **Decisão que sobrevive à tarefa → ADR**; o item continua sendo o registro da execução.

### Pronto, evidência e testes (ADR 0014; tudo **conforme aplicável** ao escopo e risco)
- **Pronto p/ revisão** quando: implementação dentro do escopo; testes relevantes passam; validação manual prevista feita; docs/contratos/ADRs afetados atualizados; limitações e riscos residuais registrados; nenhuma regressão conhecida sem decisão explícita.
- **Pronto p/ revisão ≠ concluído.** Código sozinho não comprova critério de pronto. Conclui quando: o `check` passou, o funcionamento foi **demonstrado** (saída de comando, teste, execução real — o agente **mostra o trabalho funcionando**) e houve **revisão independente por agente** (outro agente/sub-agente/modelo, que tenta provar que **não** funciona; quanto maior o risco, mais revisores). Falha encontrada ⇒ o próprio agente corrige e revisa de novo. **O dono não é portão de revisão**; ele vê a evidência e pode reabrir. Então mova o item **íntegro** p/ `docs/history/roadmap/R-NNN-titulo.md` (acrescente data, resultado, evidências, limitações — sem resumir o original), indexe com palavras-chave em `docs/history/roadmap/INDEX.md` e remova do ROADMAP. Tarefa mecânica verificável por comandos dispensa revisor (registre).
- **Evidência honesta:** cada evidência vale p/ o subitem que prova, com data, ambiente/revisão e resultado `aprovado | falhou | não executado`; registre a **causa** de falhas e de verificações não feitas. **Nunca apresente verificação parcial como aprovação completa.**
- **Testes:** bug corrigido ⇒ teste de regressão. TDD seletivo: teste primeiro p/ regra nova, de risco alto ou isolável; UI/integração difícil ⇒ validação manual registrada. **Antes de concluir mudança de código, rode o `check`** (abaixo).

## Invariantes
- **I0** novo **artefato/termo/doc/pasta**: propor→ratificar→codificar aqui→usar — mudança **abrangente** (registre como ADR, com justificativa); termos preferem o **padrão da indústria**.
- **I1** ler/operar só nesta pasta.
- **I2** este arquivo só muda com aprovação explícita do dono do projeto — nunca por sua iniciativa.

## Comportamento / Operação
- Objetivo claro (senão pergunte); pergunta é pergunta; "né?/não?" confirma premissa; tarefa grande→plano; **doc = fonte de verdade**.
- **Branches:** **docs vão direto na `main`; código SEMPRE em branch** (`type/descricao`, ex.: `feat/busca`; mudança mista código+docs = branch). A branch entra na `main` (sem PR obrigatório) só após `check` + demonstração + revisão independente; apague-a depois. `npm run release` só roda na `main`.
- **Segredos:** nunca commitar chaves, tokens, senhas, `.env` ou credenciais (nem em comentários, docs ou exemplos); use variáveis de ambiente e `.gitignore`.
- Git imediato (repo próprio); **push automático, sem pedir aprovação** (nunca `--force` nem reescrever histórico já publicado); **commits obrigatoriamente em Conventional Commits** (`type(scope): description`).
  - **Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`. **Scope** opcional (`feat(viewer):`). **Breaking:** `!` após type/scope ou footer `BREAKING CHANGE:`. **ADR:** footer `Refs: ADR-0008`.
- **Verificação (ADR 0015):** comando único do projeto = `npm run check` (= `node seed/scripts/check.mjs --ignore seed` + testes do viewer; em projetos gerados o script fica em `scripts/check.mjs`). Hook `pre-push` em `.githooks/` (ativar: `npm run hooks`). **Sem GitHub Actions por padrão** (cota gratuita limitada); CI só se justificada e **mínima**: `pull_request`+`main`, só `ubuntu-latest`, `cancel-in-progress`, `timeout-minutes`, `paths-ignore` de docs, `workflow_dispatch`; macOS/Windows só manual.
- **Versão automática** ([SemVer](https://semver.org/)): corrente = **tag `vX.Y.Z`**, espelhada no topo do `CHANGELOG` ([Keep a Changelog](https://keepachangelog.com)); nasce em `0.1.0`. Ao concluir uma unidade de trabalho com commits `feat`/`fix`/`!`, **o agente roda `npm run release`, sem pedir aprovação**: o script calcula o bump pelos commits desde a última tag (`fix`→patch, `feat`→minor, `!`/`BREAKING`→major; só `docs`/`chore`/`test`/`refactor` = sem release), move `[Unreleased]`→`[X.Y.Z] - data`, espelha os manifestos (`package.json`…), commita `chore(release)`, cria a tag **annotated** `vX.Y.Z` e dá push (branch + tag). O `check` valida o espelhamento.
- **Tags no código**: comentários `// @TAG valor` p/ rastreabilidade código↔docs: `@ADR-XXXX`, `@PRD`, `@ROADMAP` (ex.: `// @ROADMAP R-004`), `@since X.Y.Z`, `@deprecated X.Y.Z`. Toda entidade pública (classe, função, módulo) DEVE ter ao menos uma referência a doc (@ADR, @PRD ou @ROADMAP). Validação automática: ADR 0012 (`proposed`).
