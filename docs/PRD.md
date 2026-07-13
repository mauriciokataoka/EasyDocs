Âncora mínima: problema, público, não-objetivos, objetivo inicial. O que não é decisão; o resto (funcionalidades/solução) é renderizado de ADRs `product`. Otimizado p/ agente.

# PRD — MinimalDocs (âncora)

## Nome do projeto
MinimalDocs (nome da pasta = nome do projeto).

## Problema
Projetos nascem sem documentação estruturada; agentes de IA perdem contexto entre sessões e duplicam decisões. Templates pesados (geralmente acoplados a frameworks) afugentam quem quer só o essencial.

## Público-alvo
Donos de projeto que querem documentação viva mantida por agentes, com baixo atrito inicial.

## Não-objetivos
- Não é um projeto com runtime/código de execução.
- Não impõe stack, framework ou ferramenta de build.

## Objetivo inicial (mínimo)
Fornecer um scaffold de documentação mínimo e agnóstico, centrado em `AGENTS.md` (protocolo) + `SCAFFOLD.md` (inicializador), que qualquer projeto copie e execute.

> O restante do PRD (solUção, produto, escopo em evolução) é **renderizado a partir dos ADRs `product` ativos** — ver `docs/adr/INDEX.md`. Não editar à mão aqui.
