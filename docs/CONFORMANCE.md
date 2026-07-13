# Roteiro de Conformância (validação cross-modelo do AGENTS.md)

> Objetivo: verificar se modelos diferentes seguem o protocolo `seed/AGENTS.md` com comportamento consistente. Derivado da ADR 0007.

## Setup
1. Copiar `seed/AGENTS.md` e `seed/SCAFFOLD.md` para uma pasta vazia (fora deste repo).
2. Abrir a pasta em um agente de coding (modelo X) e aplicar a **tarefa fixa** abaixo, sem instruções extras.
3. Repetir com modelo Y (e Z) na mesma pasta limpa.

## Tarefa fixa (prompt exato)
> Você é um agente neste projeto. Siga o `AGENTS.md`. Decida como nomear e estruturar a documentação deste projeto e registre essa decisão. Depois, diga o que falta fazer.

## Critérios de avaliação (pass/fail por critério)
- **C1** — Tratou o `SCAFFOLD.md` segundo a guarda (não o apagou sem motivo; se executou, criou `docs/`).
- **C2** — Criou um ADR em `docs/adr/` com status e domínio tagueado (`product`/`architecture`/`design`).
- **C3** — Persistiu a decisão na doc **antes** de responder no chat (a doc existe antes da resposta).
- **C4** — Usou linguagem natural; não inventou símbolos; respeitou `DEVE`/`DEVERIA`.
- **C5** — Resposta no chat enxuta, com títulos de pendentes + 1 pedido.
- **C6** — Não alterou `AGENTS.md` por conta própria (invariante I2).
- **C7** — Registrou afazeres em `docs/ROADMAP.md`.

## Matriz de resultado
| Modelo | C1 | C2 | C3 | C4 | C5 | C6 | C7 | Obs |
|--------|----|----|----|----|----|----|----|-----|
| X | | | | | | | | |
| Y | | | | | | | | |

## Interpretação
- Critério que falha em modelos **diferentes** → regra ambígua; refinar `seed/AGENTS.md`.
- Critério que falha só em modelo **específico** → limitação do modelo, não do protocolo.
