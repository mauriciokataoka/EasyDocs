O que é este projeto e que problema resolve. Fonte da identidade. Otimizado p/ agente.

# PRD — MinimalDocs

## Nome do projeto
MinimalDocs (nome da pasta = nome do projeto).

## Problema
Projetos nascem sem documentação estruturada; agentes de IA perdem contexto entre sessões e duplicam decisões. Templates pesados (geralmente acoplados a frameworks) afugentam quem quer só o essencial.

## Solução
Um scaffold de documentação mínimo, agnóstico a stack, centrado em `AGENTS.md` (protocolo do agente) + `SCAFFOLD.md` (inicializador). Define convenções: docs canônicas em `docs/`, ADRs Nygard, Keep a Changelog + SemVer, Conventional Commits, wikilinks Obsidian.

## Produto
**Gerador de projetos** (não é um projeto de runtime). O próprio MinimalDocs usa o protocolo `AGENTS.md` para manter suas docs; o *entregável* é a pasta `seed/` — os arquivos originais e inalterados (`AGENTS.md` + `SCAFFOLD.md`) copiados para a pasta de um projeto novo, onde o `SCAFFOLD.md` então executa e cria as docs daquele projeto.

- Sem código de runtime; só arquivos de documentação e config (.editorconfig, .gitignore, LICENSE).
- `seed/` é o "código gerado": a semente copiável. **Não deve ser executado dentro de MinimalDocs** — só no projeto destino.

## Público
Donos de projeto que querem documentação viva mantida por agentes, com baixo atrito inicial.
