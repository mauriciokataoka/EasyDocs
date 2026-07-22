Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0010 — Writer roundtrip com AST (preservação de formatação)

- Status: accepted
- Domínio: architecture

## Contexto
A ADR 0005 prevê write-back (`.md` ← modelo) para persistir alterações do visualizador (ex: renumeração de versão no ROADMAP pelo ADR 0008). Mas reescrever markdown pode corromper formatação original (espaçamento, quebras de linha, comentários) se manipulado como texto bruto (regex). O ROADMAP marca essa tarefa como pendente.

## Decisão
Adotar abordagem **AST-based** para writer roundtrip:

- Usar parser markdown completo (`remark`/`unified`) para gerar AST do `.md` original
- Modificar apenas os nós específicos no AST (ex: nós de texto com versões)
- Reescrever markdown do AST modificado usando o generator
- Preservar formatação original (espaçamento, indentação, comentários) porque o AST mantém metadados de posição

Alternativas rejeitadas:
- **Regex com placeholders**: leve, mas frágil para formatação não-padrão
- **Diff-based**: robusto, mas complexo de implementar

## Consequências
- Formatação do `.md` é preservada com precisão ao reenumerar versões
- Dependência de `remark`/`unified` (ecossistema maduro, padrão da indústria)
- Diff no git fica limpo (só muda o que foi alterado, não formatação)
- Implementação mais robusta que regex, menos complexa que diff-based
