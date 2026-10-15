Âncora mínima: problema, público, não-objetivos, objetivo inicial. O que não é decisão; o resto (funcionalidades/solução) é renderizado de ADRs `product`. Otimizado p/ agente.

# PRD — EasyDocs (âncora)

## Nome do projeto
EasyDocs (nome da pasta = nome do projeto). **Produto:** gerador de documentação orientada a agente **+** visualizador estruturado de ROADMAP/CHANGELOG/ADRs (ADR 0004).

## Problema
Projetos nascem sem documentação estruturada; agentes de IA perdem contexto entre sessões e duplicam decisões. Templates pesados (geralmente acoplados a frameworks) afugentam quem quer só o essencial.

## Público-alvo
Donos de projeto que querem documentação viva mantida por agentes, com baixo atrito inicial.

## Não-objetivos
- Não acoplar o gerador `seed/` a framework ou ferramenta de build específica.
- Não exigir que o projeto consumidor adote o plugin VSCode (o gerador é independente do visualizador).
- Não permitir alteração do `AGENTS.md` nos projetos consumidores (o protocolo é estático; mudanças estruturais vêm do EasyDocs, não do projeto).

## Objetivo inicial (mínimo)
Fornecer um scaffold de documentação mínimo e agnóstico, centrado em `AGENTS.md` (protocolo) + `SCAFFOLD.md` (inicializador), que qualquer projeto copie e execute.

## Visualizador (âncora do produto — ADRs 0004/0006) — **congelado** em 2026-10-15 ([ADR 0017](adr/0017-congelar-viewer.md))
### Problema
Docs de projeto (`ROADMAP`/`CHANGELOG`/ADRs) crescem e viram texto corrido; achar um item específico ou **reordenar prioridades** é lento e manual.

### Não-objetivos
- Edição de conteúdo livre dos docs (fora da estrutura SemVer/cards).
- Colaboração multi-usuário.
- Sync em nuvem.

> O restante do PRD (solUção, produto, escopo em evolução) é **renderizado a partir dos ADRs `product` ativos** — ver `docs/adr/INDEX.md`. Não editar à mão aqui.
