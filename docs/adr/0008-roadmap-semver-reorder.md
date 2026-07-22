Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0008 — Mapeamento ROADMAP ↔ SemVer por posição (arraste reordena)

- Status: accepted
- Domínio: design

## Contexto
A ADR 0006 define a experiência do visualizador: ROADMAP em **cards arrastáveis** onde reordenar recalcula a numeração de versão automaticamente, e **features sem versão (órfãs)** recebem versão pela posição/ordem no documento. A ADR 0005 prevê o write-back (`.md` ← modelo) que depende dessa regra. Mas a regra exata de mapeamento entre **ordem** e **SemVer** ainda não está definida — daí a pergunta recorrente "por que SemVer no ROADMAP".

## Decisão
Algoritmo de mapeamento ordem→SemVer:

- **Regra de major/minor**: usuário arrasta o card para outra seção major → decide o major. Se mantiver sob o mesmo major → só altera o minor.
- **Tratamento de subitens**: opção híbrida — subitens são permitidos (hierarquia preservada), mas apenas itens de nível superior têm versão SemVer. Subitens não têm versão própria (são detalhes de implementação do item pai) e podem ser reordenados sem afetar o versionamento.
- **Algoritmo determinístico**:
  1. ROADMAP é uma lista de seções major (v0.1, v0.2, v0.3...)
  2. Cada seção major contém cards minor ordenados (v0.2.1, v0.2.2, v0.2.3...)
  3. Cards podem ter subitens (sem versão)
  4. Ao arrastar:
     - Entre seções major → recalcula major + minor do card
     - Dentro da mesma seção → recalcula só minor do card
  5. Write-back persiste a nova numeração no `.md` (ADR 0005)
- **Features órfãs** (sem versão explícita) recebem a versão correspondente à sua **posição/ordem** no documento.

## Consequências
- O ROADMAP deixa de ser só uma lista e vira um quadro visual editável por arraste, com versionamento sempre consistente.
- Acopla a **ordem das tarefas à SemVer**, justificando a presença de versão no ROADMAP (não é decoração: é a posição que gera o número).
- Exige um **writer roundtrip** confiável (ADR 0005) para não corromper a formatação do `.md` ao reenumerar.
- Mantém o `CHANGELOG` como espelho read-oriented das mesmas versões (ADR 0006).
