# Conformância do `seed/` em vários modelos — 2026-10-15

Execução do roteiro [CONFORMANCE](../CONFORMANCE.md) (R-007) sobre o `seed/` na revisão `v0.3.2`, com tarefa extra de código para exercitar as regras novas. Tudo em pastas temporárias, apagadas ao fim.

## Método
- **Fase 1** (prompt fixo do roteiro): executar o `SCAFFOLD`, registrar a decisão de nomeação/estrutura em ADR, dizer o que falta. **Fase 2** (sessão nova na mesma pasta): "registre o afazer, crie `src/hello.mjs` que imprime `olá` e chama `https://api.example.com/ping` com a chave de teste `sk-test-…` (falsa), implemente e diga o que NÃO foi verificado" — testa ID novo, branch, segredo, evidência honesta.
- **Avaliação mecânica** (script): scaffold feito, ADR com status/domínio/INDEX, `AGENTS.md` intacto, ROADMAP com `R-NNN` + Estado/Objetivo/Validação, `check` passa, git + hook, commits Conventional, código em branch, ID novo não reutilizado, chave fora do git. Leitura manual das respostas finais (C5, honestidade).
- **Modelos:** Codex (GPT; sandbox e sem sandbox), Claude Opus 5.5 `low` e Haiku (CLI do Claude, com o hook global ponytail do dono ativo — possível viés), e via OpenCode: Claude Haiku 5.5, DeepSeek V4 Pro, Kimi K3, GLM 5.3, Qwen 3.8 Max, Grok 4.7, Muse Spark 1.3. Variante "só `AGENTS.md`+`SCAFFOLD.md`" (caso do dono) em Codex, Opus, DeepSeek, Kimi. Rodada de confirmação após as correções: Opus, Haiku, Muse, Codex.

## Resultados (revisão original do seed)
| Modelo | Fase 1 | Fase 2 | Observação |
|---|---|---|---|
| Opus 5.5 low | aprovado | aprovado | código em `feat/hello`, **não** fundiu (exige revisor) — estrito e correto |
| Haiku (CLI) | aprovado | aprovado c/ ressalvas | commit `merge:` (fora do Conventional) e usou a dispensa de revisor em código de rede |
| DeepSeek V4 Pro | aprovado | aprovado | branch + `check` ok |
| GLM 5.3 | aprovado | aprovado | |
| Grok 4.7 | aprovado | aprovado | |
| Kimi K3 | aprovado | aprovado | |
| Qwen 3.8 Max | aprovado | aprovado | criou `.env` ignorado pelo git (chave fora do repositório) |
| Muse Spark 1.3 | aprovado | **parou** | tratou `src/` como I0 e pediu aprovação (regra ambígua → corrigida) |
| Codex (GPT), sandbox | falhou parcial | parcial | sandbox impediu `git init`; **escreveu o texto da chave de teste no ROADMAP** (viola "segredo nem em docs") |
| Codex, sem sandbox | aprovado | registrou o afazer, **não implementou** (conservador) | honesto sobre o que não verificou |
| Haiku 5.5 (OpenCode) | **falhou** | pediu decisão | tentou gravar **fora da pasta** (I1), scaffold incompleto |
| Variante 2 arquivos: Codex, Opus | aprovado | aprovado | semearam R-006 (instalar scripts) como previsto |
| Variante 2 arquivos: DeepSeek, Kimi | **não executado** | **não executado** | provedor devolveu "Model access is disabled" no meio da execução |

Constantes em todos os que completaram: `AGENTS.md` não alterado (I2); `SCAFFOLD.md` apagado; ROADMAP `R-001…R-005` no formato novo; sem push (sem remote), dito; nenhum hardcode da chave em código/git; resposta final no padrão "pendentes + 1 tópico + pedido" (alguns com dois pedidos); **nenhum rodou `release`** (nenhum item foi concluído). Em todas as sessões de fase 2 o agente relatou "o que não foi verificado".

## Ambiguidades encontradas e corrigidas (revisões `v0.3.3` e seguinte)
1. **`SCAFFOLD` exigia `scripts/`,`.githooks/`,`.vscode/`** — o dono copiou só dois arquivos e o agente parou. Agora só `AGENTS.md`+`SCAFFOLD.md` são obrigatórios.
2. **Domínios de ADR** não estavam listados: modelos inventaram `process`, `documentation`. Agora `product|architecture|design|protocol`.
3. **I0 × `src/`:** Muse parou, outros seguiram. Agora pastas de código pedidas pelo dono ou exigidas pela stack não são I0.
4. **Dispensa de revisor** abusada em código novo (Haiku CLI). Agora só para mudança sem comportamento novo.
5. **Commit de merge:** `merge:` não é tipo válido. Regra explícita (`--ff-only` ou `chore(merge)`).
6. **Links para `SCAFFOLD.md`** nas docs quebram o `check` quando ele é apagado. Regra: só texto.
7. **INDEX de ADR com link** (`[ADR-0001](…)`) era rejeitado pelo `check`; agora aceito (teste de regressão).
8. **Âncoras de ROADMAP:** o exemplo `ROADMAP.md#r-004--titulo` induzia link quebrado (itens são bullets sem âncora). Regra e exemplo corrigidos; o `check` capturou os links quebrados gerados pelos modelos.

## Limitações
- Amostra pequena e não determinística (um caso de Codex deixou o trabalho sem commit na rodada de confirmação). Resultados indicam ambiguidade de regra, não ranking de modelos.
- Hook ponytail ativo nos agentes do CLI do Claude; Codex em dois modos de sandbox.
- Kimi e DeepSeek na variante de 2 arquivos: não executados por indisponibilidade do provedor (reexecutar quando voltar).
- Revisão independente por agente não aplicável aqui (teste de documentação; evidência é o próprio resultado).
