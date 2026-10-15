Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0007 — Estilo das instruções do agente: verboso, sem símbolos ambíguos, com exemplos

- Status: accepted
- Domínio: protocol

## Contexto
Diferentes modelos de LLM seguem o `AGENTS.md` com variância grande de comportamento. O estilo atual é denso e abreviado (setas `->`, siglas `I0/I1/I2`, marcadores `(views)`/`(proposed)`, frases curtas) e parece enviesado ao modelo que o criou (Claude Opus): modelos de outra arquitetura/tamanho deixam cair passos implícitos ou interpretam símbolos de forma inconsistente.

Por outro lado, o objetivo original era manter o `AGENTS.md` **o mais enxuto possível**, pois é contexto carregado em toda sessão. Inflar o arquivo com prosa contradiz esse objetivo. O desafio é, portanto, **desambiguar sem inflar**.

## Decisão (aceita pelo dono em 2026-10-15)
- **Manter o `AGENTS.md` enxuto** (economia de contexto é objetivo válido): não adicionar prose desnecessária.
- **Desambiguar onde custa pouco:** substituir símbolos de interpretação variável (`->`, `(views)`, siglas soltas) por linguagem natural curta e explícita ("SE … ENTÃO …"); manter Markdown só para hierarquia (títulos, listas, checkboxes) (links Markdown relativos — ADR 0013).
- **Poucos exemplos (few-shot)** apenas nas regras mais mal-seguidas (ex.: "documentar é execução direta"; "persistir na doc antes de responder").
- Distinguir **regras obrigatórias (DEVE)** de **orientações (DEVERIA)**.
- **Glossário** de siglas (`I0/I1/I2`, `ADR`, `SCAFFOLD`) na primeira ocorrência.
- **Detalhe empurrado para docs on-demand** (modelo já existente): `ROADMAP`, `adr/`, âncora `PRD` são lidos sob demanda, não carregados sempre — assim o core do `AGENTS.md` fica pequeno e o peso pesado vai por pull.
- **Motivação do dono (2026-10-15):** o estilo verboso existe para que o agente que **registra** um afazer/registro o especifique o melhor possível, de modo que o **próximo agente não precise supor**. O próximo agente pode discordar, criticar e contra-argumentar, mas não deve ficar em dúvida sobre o que foi pedido. Por isso a verbosidade vale sobretudo para itens de ROADMAP, ADRs e notas de campo (que o ROADMAP, só com afazeres, comporta sem inchar).
- **Idioma:** pt-BR permanece canônico (a avaliação de inglês fica fora; reabrir como ADR própria se necessário).

## Consequências
- **Positivas:** modelos diversos seguem melhor; reduz o drift — **sem inflar** o contexto (só desambiguação cirúrgica + exemplos pontuais).
- **Negativas / riscos:**
  - Algum aumento de tokens, mas contido (não é reescrita prolixa).
  - Retrabalho para reescrever `AGENTS.md`/`SCAFFOLD.md` (raiz + `seed/`).
  - Exige **validação cross-modelo** (testar em ≥2 modelos) para confirmar ganho — sem isso, é só palpite.
- **Dependência:** a reescrita deve ser piloto em `seed/` (template enviado a terceiros) antes de tocar no root.
