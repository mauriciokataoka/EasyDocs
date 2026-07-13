Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0008 — Mapeamento ROADMAP ↔ SemVer por posição (arraste reordena)

- Status: proposed
- Domínio: design

## Contexto
A ADR 0006 define a experiência do visualizador: ROADMAP em **cards arrastáveis** onde reordenar recalcula a numeração de versão automaticamente, e **features sem versão (órfãs)** recebem versão pela posição/ordem no documento. A ADR 0005 prevê o write-back (`.md` ← modelo) que depende dessa regra. Mas a regra exata de mapeamento entre **ordem** e **SemVer** ainda não está definida — daí a pergunta recorrente "por que SemVer no ROADMAP".

## Decisão (proposta — em aberto, aguarda ratificação)
Estabelecer:
- A **ordem** dos cards no ROADMAP define a numeração SemVer: reordenar por arraste = reenumerar automaticamente os itens afetados (e o write-back persiste no `.md`, ADR 0005).
- **Features órfãs** (sem versão explícita) recebem a versão correspondente à sua **posição/ordem** no documento.
- O gerador de numeração é **determinístico**, para que a renumeração seja reproduzível e o diff no git faça sentido.

Pendente de ratificação: o algoritmo exato de projeção ordem→SemVer (ex.: major por seção vs minor por card; como tratar sub-itens).

## Consequências
- O ROADMAP deixa de ser só uma lista e vira um quadro visual editável por arraste, com versionamento sempre consistente.
- Acopla a **ordem das tarefas à SemVer**, justificando a presença de versão no ROADMAP (não é decoração: é a posição que gera o número).
- Exige um **writer roundtrip** confiável (ADR 0005) para não corromper a formatação do `.md` ao reenumerar.
- Mantém o `CHANGELOG` como espelho read-oriented das mesmas versões (ADR 0006).
