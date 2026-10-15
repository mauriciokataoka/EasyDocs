
# AGENTS.md

> Protocolo de instruções para agentes de coding, no formato aberto [agents.md](https://agents.md). Ao iniciar, leia este arquivo e retome o trabalho pelas docs citadas abaixo. Este é o ÚNICO lugar das regras normativas do projeto: não existe outro arquivo de metodologia.

## Glossário (siglas usadas neste arquivo)
- **ADR** — Architecture Decision Record: registro de uma decisão, em `docs/adr/`, formato Nygard.
- **SCAFFOLD** — arquivo `SCAFFOLD.md` que cria a estrutura de docs de um projeto novo e depois se apaga.
- **I0 / I1 / I2** — três invariantes do projeto (regras que não podem ser quebradas); ver seção Invariantes.
- **R-NNN** — identificador permanente de um item do ROADMAP (ex.: `R-004`). Nunca muda e nunca é reutilizado.
- **check** — o comando único de verificação do projeto (ver seção Verificação).
- **DEVE** — regra obrigatória. **DEVERIA** — orientação recomendada, não obrigatória.

## Início (o que fazer ao abrir este projeto)
1. SE existir `SCAFFOLD.md` nesta pasta: execute-o uma única vez e depois apague-o.
2. SENÃO: siga o Método abaixo.
3. Na primeira execução, SE você (agente) usa um arquivo de configuração próprio (ex.: `CLAUDE.md`), crie-o referenciando este `AGENTS.md` como fonte canônica. Esse arquivo é privado, não entra nas docs do projeto, e serve apenas ao seu rascunho efêmero. O que vale para o projeto DEVE ir para a doc canônica.
4. Antes de encerrar a sessão ou trocar de máquina, DEVE fazer commit de tudo e push, de forma automática, sem pedir aprovação. Trabalho não commitado ou sem push não existe para outro agente.

## Mapa de documentos (onde ler o quê)
A raiz contém apenas `AGENTS.md` e `README.md`. As docs canônicas ficam em `docs/`. Cada assunto tem uma única fonte; as outras docs apontam para ela com link, sem copiar o texto.

| Documento | Quando ler |
|---|---|
| `docs/PRD.md` | Âncora mínima: problema, público, não-objetivos, objetivo inicial. O que não é decisão. |
| ARCHITECTURE e DESIGN | Views virtuais geradas pelo plugin a partir dos ADRs (domínios `architecture` e `design`). Não são arquivos e não se edita. |
| `README.md` | Visão para humano. |
| `docs/ROADMAP.md` | Sempre, para retomar: somente trabalho aberto. |
| `docs/adr/INDEX.md` | Decisões (ADRs) e seus status. Leitura sob demanda. |
| `docs/CHANGELOG.md` | Histórico de versões. |
| `docs/field-notes/INDEX.md` | Evidências datadas de validação e uso. Ler apenas ao investigar. |
| `docs/history/INDEX.md` | Arquivado (roadmap concluído, decisões mortas). Fora da leitura padrão. |

## Método (como operar)
- Cada iteração é um brainstorm: questione, confira a consistência e registre o resultado nas docs. O chat recebe apenas o essencial.
- Responda o definitivo de forma curta e direta. O que pede uma decisão ou altera uma doc vira um tópico.
- No chat, dê: a resposta, os títulos dos pendentes, a descrição de UM tópico (o mais importante por abrangência) e UM pedido.
- Documentar é execução direta, sem pedir permissão. Escreva de forma objetiva: cada tópico tem título e explicação completa, nunca só o título.
- Persistência imediata: atualize a doc ou o ROADMAP ANTES de responder no chat. Exemplo: se uma decisão aguarda o dono, registre-a no ROADMAP (ou como ADR `proposed`) antes de perguntar.
- A cada iteração, revise `docs/ROADMAP.md` e os ADRs com status `proposed`.
- As docs canônicas descrevem o estado atual. O histórico fica em ADRs, notas de campo e `docs/history/`.
- Mudança estrutural (I0: novo artefato, termo, doc ou pasta) ou alteração deste arquivo (I2) DEVE seguir propor, aprovar, executar, com aprovação explícita do dono para I2. Atualizar o conteúdo de PRD, ROADMAP e README em resposta a uma instrução direta do usuário é execução direta.

### Links e referências
- Entre docs, use link Markdown relativo, por exemplo `[ADR-0008](adr/0008-nome.md)`, com âncora para uma SEÇÃO (título `##`), por exemplo `[Método](AGENTS.md#método)`. Itens do ROADMAP são bullets e NÃO têm âncora: cite-os só pelo identificador (`R-004`) ou linke `ROADMAP.md` sem âncora. Para código com linha: `[x.ts](../src/x.ts#L10)`.
- NÃO use `[[wikilinks]]`: só funcionam em um aplicativo específico.
- Para menção curta, use o identificador estável em texto: `R-004`, `ADR-0008`.

### ADRs
- Cada decisão significativa vira `docs/adr/NNNN-titulo.md` a partir de `docs/adr/0000-template.md` (Status, Domínio, Contexto, Decisão, Alternativas, Consequências) e é indexada em `docs/adr/INDEX.md`.
- Status permitidos: `proposed` (sugestão; NÃO orienta implementação importante sem aprovação), `accepted` (vigente), `superseded` (substituída; aponta a substituta) e `deprecated`. Nunca apague uma ADR. Domínios permitidos: `product`, `architecture`, `design` e `protocol` (regras de trabalho e documentação); outro domínio conta como I0.

### ROADMAP
- Contém SOMENTE trabalho aberto, em seções `## vX.Y.Z`. A posição do item na lista gera a versão; o identificador `R-NNN` é a identidade e nunca muda.
- Formato do item: `- **R-NNN — Título** · Estado: <estado>`, seguido de linhas indentadas `**Objetivo:**`, `**Escopo:**` e `**Validação:**` (obrigatórias) e, quando couber, `**Fora de escopo:**`, `**Dependências:**`, `**Riscos:**` e `**Critérios de pronto:**`. Escreva o afazer de forma verbosa e sem lacunas: quem o registra DEVE especificar o máximo possível (contexto, motivo, critérios, exemplos) para que o próximo agente não precise supor nada. O próximo agente pode discordar, criticar e contra-argumentar, mas não deve ficar com dúvida sobre o que foi pedido. Como o ROADMAP guarda só afazeres, detalhar não o incha.
- Antes de criar um identificador, consulte o ROADMAP e `docs/history/roadmap/INDEX.md`. Nunca reutilize um número, nem depois de concluir ou cancelar o item.
- Estados: planejado, em implementação, aguardando validação, pronto para revisão, concluído, congelado (adiado por decisão do dono, com motivo; fica na seção `## Congelado`), cancelado, substituído. Cancelado e substituído levam o motivo e o link da decisão que os explica.
- O ROADMAP não é diário. A evidência detalhada vai para `docs/field-notes/` (arquivos `AAAA-MM-DD-assunto.md`, imutáveis, indexados em `INDEX.md`); o item apenas aponta para ela e guarda o estado.
- Uma decisão que sobrevive à tarefa DEVE virar ADR; o item continua sendo o registro da execução.

### Pronto, evidência e testes (tudo conforme aplicável ao escopo e ao risco)
- Um item está **pronto para revisão** quando: a implementação ficou dentro do escopo; os testes relevantes passam; a validação manual prevista foi feita; docs, contratos e ADRs afetados foram atualizados; limitações e riscos residuais foram registrados; não há regressão conhecida sem decisão explícita.
- **Pronto para revisão não é concluído.** Código sozinho não comprova critério de pronto. O item conclui quando: o `check` passou; o funcionamento foi demonstrado (saída de comando, teste ou execução real: o agente mostra o trabalho funcionando); e houve revisão independente por agente (outro agente, sub-agente ou modelo, que tenta provar que NÃO funciona; quanto maior o risco, mais revisores). Se um revisor achar falha, o próprio agente corrige e a revisão é repetida. O dono do projeto não é portão de revisão: ele vê a evidência e pode reabrir o item. SOMENTE uma mudança sem comportamento novo, verificável por comandos (release, renomear ou mover arquivos, formatação), dispensa revisor; código novo ou integração externa sempre tem revisor (registre quando dispensar). Ao concluir, mova o item inteiro para `docs/history/roadmap/R-NNN-titulo.md`, acrescentando data, resultado, evidências e limitações sem resumir o texto original; registre-o com palavras-chave em `docs/history/roadmap/INDEX.md` e remova-o do ROADMAP. Código sozinho não comprova critério de pronto.
- Evidência honesta: cada evidência vale para o subitem que ela prova, com data, ambiente ou revisão e resultado `aprovado`, `falhou` ou `não executado`. Registre a causa de falhas e de verificações não feitas. NUNCA apresente uma verificação parcial como aprovação completa.
- Testes: um bug corrigido DEVE ter teste de regressão. Use TDD seletivo: escreva o teste antes quando a regra for nova, de risco alto ou isolável; em interface ou integração difícil de simular, faça validação manual e registre-a.

## Invariantes (regras que não podem ser quebradas)
- **I0** — novo artefato, termo, doc ou pasta: DEVE seguir propor→ratificar→codificar→usar. É mudança abrangente; registre como ADR com justificativa. Prefira termos padrão da indústria. Pastas de código (ex.: `src/`) pedidas pelo dono ou exigidas pela stack NÃO são I0.
- **I1** — DEVE ler e operar apenas nesta pasta.
- **I2** — este arquivo (`AGENTS.md`) DEVE mudar somente com aprovação explícita do dono do projeto. Nunca por iniciativa do agente.

## Comportamento / Operação
- Mantenha o objetivo claro; se não estiver, pergunte. Uma pergunta é uma pergunta; confirme premissas com o dono quando necessário. Tarefas grandes DEVEM ser divididas em um plano.
- **Branches:** docs vão direto na `main`; código SEMPRE em branch (`type/descricao`, ex.: `feat/busca`; mudança mista de código e docs conta como código). A branch entra na `main` (sem PR obrigatório) somente após o `check`, a demonstração e a revisão independente; apague a branch depois. O release só roda na `main`.
- **Segredos:** NUNCA commite chaves, tokens, senhas, `.env` ou credenciais (nem em comentários, docs ou exemplos); use variáveis de ambiente e `.gitignore`.
- Use git imediatamente (repo próprio). O push é automático, sem pedir aprovação; NUNCA use `--force` nem reescreva histórico já publicado. **Commits OBRIGATORIAMENTE em Conventional Commits** (formato: `type(scope): description`). Faça o merge de branches com `git merge --ff-only` ou use a mensagem `chore(merge): ...`; nunca o tipo `merge:`.
  - **Types obrigatórios:** `feat` (feature), `fix` (bugfix), `docs` (documentação), `refactor` (refatoração), `test` (testes), `chore` (tarefas)
  - **Scope opcional:** ex: `feat(viewer):`, `fix(core):`
  - **Breaking change:** adicionar `!` após type/scope (ex: `feat!:`) ou footer `BREAKING CHANGE:`
  - **Referência a ADR:** quando aplicável, incluir no footer (ex: `Refs: ADR-0008`)
- **Verificação:** o projeto DEVERIA ter UM comando de verificação (se `scripts/check.mjs` ainda não existir, o ROADMAP tem o item para instalá-lo; nesse meio-tempo valide à mão links e status de ADR), `node scripts/check.mjs` (ou `npm run check` se existir `package.json`; o projeto o estende com seus testes). DEVE executá-lo antes de concluir qualquer mudança. O hook `pre-push` em `.githooks/` o executa (ativar com `git config core.hooksPath .githooks`). O `check` valida links relativos e âncoras, ausência de wikilinks, status de ADR, identificadores `R-NNN` únicos e versões iguais ao topo do `CHANGELOG`.
- **CI (GitHub Actions):** NÃO crie workflow por padrão; a cota gratuita é limitada e a verificação local basta. Se for justificado (publicação, mais de um colaborador, verificação em outro sistema), mantenha-o mínimo: só em `pull_request` e na branch principal, só `ubuntu-latest`, com `concurrency` de cancelamento, `timeout-minutes`, `paths-ignore` das docs e `workflow_dispatch`. macOS e Windows somente por execução manual.
- **Versão automática (SemVer):** a versão corrente é a tag `vX.Y.Z` (prefixo `v`), espelhada no topo do `CHANGELOG.md`; nasce em `0.1.0`. Ao concluir uma unidade de trabalho com commits `feat`, `fix` ou breaking change, o agente DEVE rodar `node scripts/release.mjs` (ou `npm run release`), sem pedir aprovação (se o script ainda não existir, registre a pendência no ROADMAP). O script calcula o bump pelos commits desde a última tag (`fix`→patch, `feat`→minor, `!` ou `BREAKING CHANGE`→major; commits só de `docs`, `chore`, `test` ou `refactor` não geram release), move `[Unreleased]` para `[X.Y.Z] - data`, espelha os manifestos nativos (ex.: `package.json`), faz o commit `chore(release)`, cria a tag annotated `vX.Y.Z` e dá push da branch e da tag.
- **Tags no código**: comentários inline para rastreabilidade código↔docs. Formato: `// @TAG valor`.
  - `@ADR-XXXX` - referência a ADR (ex: `// @ADR-0008`)
  - `@PRD` - referência ao PRD (ex: `// @PRD objetivo-inicial`)
  - `@ROADMAP` - referência ao ROADMAP (ex: `// @ROADMAP R-004`)
  - `@since X.Y.Z` - desde quando existe (ex: `// @since 0.2.0`)
  - `@deprecated X.Y.Z` - obsoleto desde (ex: `// @deprecated 0.3.0`)
  - Toda entidade pública (classe, função, módulo) DEVE ter pelo menos uma referência a doc (@ADR, @PRD ou @ROADMAP).
