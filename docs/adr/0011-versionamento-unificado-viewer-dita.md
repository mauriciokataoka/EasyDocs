Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0011 — Versionamento unificado: viewer dita o bump

- Status: accepted
- Domínio: architecture

## Contexto
A ADR 0009 estabelece versionamento unificado para EasyDocs (um único SemVer para gerador + viewer). Mas não especifica como sincronizar quando os componentes têm ciclos diferentes: gerador é estático (poucas mudanças), viewer é ativo (muitas mudanças). Sem regra clara, o processo de bump fica ambíguo.

## Decisão
Adotar regra: **viewer dita o versionamento**.

- Versão unificada = versão do viewer
- Gerador só bumpa se tiver mudança significativa que justifique
- Se ambos mudam, viewer tem prioridade na decisão (major/minor/patch)
- Gerador é estático por design (AGENTS.md não é alterado nos projetos consumidores — PRD)

**Justificativa:**
- Viewer é o componente mais ativo (maior parte do ROADMAP)
- Gerador é template estático (poucas mudanças)
- Simplifica o processo: um componente de verdade
- Alinhado com uso pessoal (não precisa de sincronização complexa)

## Consequências
- Bump de versão é decidido pelo viewer (componente ativo)
- Gerador só entra na equação se tiver mudança estrutural relevante
- Processo de release simplificado (não precisa negociar entre componentes)
- CHANGELOG único reflete mudanças de ambos, mas versionamento segue viewer
