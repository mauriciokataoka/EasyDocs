# AGENTS.md

> Protocolo de instruções para agentes de coding, no formato aberto [agents.md](https://agents.md). Ao iniciar, leia este arquivo e retome o trabalho pelas docs citadas abaixo.

## Glossário (siglas usadas neste arquivo)
- **ADR** — Architecture Decision Record: registro de uma decisão, em `docs/adr/`, formato Nygard.
- **SCAFFOLD** — arquivo `SCAFFOLD.md` que cria a estrutura de docs de um projeto novo e depois se apaga.
- **I0 / I1 / I2** — três invariantes do projeto (regras que não podem ser quebradas); ver seção Invariantes.
- **DEVE** — regra obrigatória. **DEVERIA** — orientação recomendada, não obrigatória.

## Início (o que fazer ao abrir este projeto)
1. SE existir `SCAFFOLD.md` nesta pasta: execute-o uma única vez e depois apague-o.
2. SENÃO: siga o Método abaixo.
3. Na primeira execução, SE você (agente) usa um arquivo de configuração próprio (ex.: `CLAUDE.md`), crie-o referenciando este `AGENTS.md` como fonte canônica. Esse arquivo é privado, não entra nas docs do projeto, e serve apenas ao seu rascunho efêmero.

## Mapa de documentos (onde ler o quê)
A raiz contém apenas `AGENTS.md` e `README.md`. As docs canônicas ficam em `docs/`.

| Documento | Quando ler |
|---|---|
| `docs/PRD.md` | Âncora mínima: problema, público, não-objetivos, objetivo inicial. O que não é decisão. |
| ARCHITECTURE e DESIGN | Views virtuais geradas pelo plugin a partir dos ADRs (domínios `architecture` e `design`). Não são arquivos e não se edita. |
| `docs/README.md` | Visão para humano. |
| `docs/ROADMAP.md` | Sempre, para retomar: afazeres e pendências. |
| `docs/adr/INDEX.md` | Decisões (ADRs) e seus status. Leitura sob demanda. |
| `docs/CHANGELOG.md` | Histórico de versões. |
| `history/INDEX.md` | Arquivado, fora do grafo. Ler apenas se necessário. |

## Método (como operar)
- Cada iteração é um brainstorm: questione, confira a consistência e registre o resultado nas docs. O chat recebe apenas o essencial.
- Responda o definitivo de forma curta e direta. O que pede uma decisão ou altera uma doc vira um tópico.
- No chat, dê: a resposta, os títulos dos pendentes, a descrição de UM tópico (o mais importante por abrangência) e UM pedido.
- Documentar é execução direta, sem pedir permissão. Escreva de forma objetiva: cada tópico tem título e explicação completa, nunca só o título. Exemplo: ao concluir uma tarefa, registre o que foi decidido em `docs/ROADMAP.md` (ou em um ADR) antes de responder no chat.
- Decisões significativas viram ADRs em `docs/adr/` (formato Nygard), indexados; um ADR aberto tem status `proposed`.
- Afazeres vão para `docs/ROADMAP.md`.
- Persistência imediata: atualize a doc ou o ROADMAP ANTES de responder no chat, para que outra sessão retome sem handoff. Exemplo: se uma decisão aguarda o dono, registre-a no ROADMAP (ou como ADR `proposed`) antes de perguntar.
- A cada iteração, revise `docs/ROADMAP.md` e os ADRs com status `proposed`.
- Formato das docs: referências entre docs usam `[[wikilink]]` (Obsidian); o `README.md` usa links padrão; `history/` fica fora do grafo.
- Mudança estrutural (I0: novo artefato/termo/doc/pasta) ou alteração deste arquivo (I2) DEVE seguir propor→aprovar→executar, com aprovação explícita do dono para I2. Atualizar o conteúdo de PRD/ROADMAP/etc. em resposta a uma instrução direta do usuário é execução direta.

## Invariantes (regras que não podem ser quebradas)
- **I0** — novo artefato, termo, doc ou pasta: DEVE seguir propor→ratificar→codificar→usar. É mudança abrangente; registre como ADR com justificativa. Prefira termos padrão da indústria.
- **I1** — DEVE ler e operar apenas nesta pasta.
- **I2** — este arquivo (`AGENTS.md`) DEVE mudar somente com aprovação explícita do dono do projeto. Nunca por iniciativa do agente.

## Comportamento / Operação
- Mantenha o objetivo claro; se não estiver, pergunte. Uma pergunta é uma pergunta; confirme premissas com o dono quando necessário. Tarefas grandes DEVEM ser divididas em um plano.
- Use git imediatamente (repo próprio). DEVE fazer push somente com aprovação. Commits são livres e seguem Conventional Commits.
- Versão: SemVer. A versão corrente é a tag `vX.Y.Z`, espelhada no topo do `CHANGELOG.md`. Bump por commits (`fix`→patch, `feat`→minor, `!`/`BREAKING`→major); nasce em `0.1.0`. Release = mover `[Unreleased]` para `[X.Y.Z] - data` e criar a tag. Com código, o manifesto nativo (ex.: `package.json`) espelha a tag.
