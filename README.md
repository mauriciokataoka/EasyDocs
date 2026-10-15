Visão geral p/ humano; aponta p/ as docs de agente.

# EasyDocs

Scaffold mínimo de documentação orientada a agente (IA). Fornece `AGENTS.md` e `SCAFFOLD.md` para iniciar qualquer projeto com docs canônicas, ADRs e versionamento — sem dependências.

## O que é
Um repositório-template: copie a pasta `seed/` inteira para a raiz do projeto novo, renomeie com o nome do projeto, e execute `AGENTS.md`. O agente inicializa `README`, `docs/` (PRD, ROADMAP, CHANGELOG, adr/, field-notes/, history/ — tudo em `docs/`), `scripts/check.mjs` e o hook `pre-push`, configurações VSCode e versiona com git.

## Documentação do agente
As docs canônicas vivem em [`docs/`](docs/); as regras do protocolo, em [AGENTS.md](AGENTS.md):
- [PRD](docs/PRD.md) — identidade e problema
- [ROADMAP](docs/ROADMAP.md) — somente trabalho aberto
- [CHANGELOG](docs/CHANGELOG.md) — versões
- [ADRs](docs/adr/INDEX.md) — decisões (ARCHITECTURE e DESIGN são views das ADRs)
- [Notas de campo](docs/field-notes/INDEX.md) — evidências de validação

## Verificação
`npm run check` valida as docs (links, âncoras, ADRs, IDs, versão) e roda os testes do viewer; `npm run hooks` ativa o hook `pre-push`. Não há GitHub Actions por padrão (ver [ADR 0015](docs/adr/0015-verificacao-local-first-ci-versao.md)).
