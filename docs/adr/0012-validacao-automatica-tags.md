Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0012 — Validação automática de tags de rastreabilidade

- Status: proposed
- Domínio: architecture

## Contexto
O AGENTS.md define que toda entidade pública (classe, função, módulo) DEVE ter pelo menos uma referência a doc (@ADR, @PRD ou @ROADMAP) via comentários inline. Sem validação automática, essa regra pode ser esquecida, resultando em código sem rastreabilidade para as docs. O ROADMAP tem um item pendente para exercitar o fluxo de ADRs `proposed`.

## Decisão
Criar um linter/script que valida se toda entidade pública tem pelo menos uma tag de referência a doc:

- **Linter**: script que varre arquivos de código e verifica presença de tags `@ADR`, `@PRD` ou `@ROADMAP` antes de definições de classe/função/módulo
- **Integração**: pre-commit hook para rodar automaticamente antes de cada commit
- **Linguagem-agnóstico**: usar regex para detectar comentários `// @` em qualquer arquivo de código (JavaScript, TypeScript, Python, Go, etc.)
- **Configuração**: arquivo `.taglintrc` (JSON) para definir padrões e exceções

Alternativas rejeitadas:
- **Validação manual**: frágil e inconsistente
- **Linter específico de linguagem** (ex: ESLint plugin): não cobre todas as linguagens

## Consequências
- Regra de rastreabilidade é enforceável automaticamente
- Pre-commit hook garante que commits não violam a convenção
- Linter leve e universal (regex)
- Requer configuração de pre-commit hook nos projetos
