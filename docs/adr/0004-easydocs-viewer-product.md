Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0004 — EasyDocs: visualizador estruturado de ROADMAP/CHANGELOG/ADRs

- Status: accepted
- Domínio: product

## Contexto
Docs de projeto (ROADMAP, CHANGELOG, ADRs) crescem e viram texto corrido difícil de navegar. Achar uma feature/bugfix específico, ver em que versão entrou ou reordenar prioridades é lento e manual.

## Decisão
EasyDocs é um **visualizador estruturado**, entregue como **extensão VSCode (plugin)** sobre um **núcleo compartilhado**. Aponta para uma pasta de projeto, varre recursivamente e apresenta os docs de forma navegável e editável dentro do editor.

Combina com o gerador (`seed/`): o EasyDocs = gerador de documentação orientada a agente **+** visualizador dessa documentação.

## Consequências
- Doc de projeto deixa de ser só leitura linear; vira navegável/editável dentro do VSCode.
- Plugin VSCode dá edição integrada (customEditor + webview).
- Aumenta o escopo do produto (antes só o gerador).
