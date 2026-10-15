# R-013 — Gerar `ARCHITECTURE.md` e `DESIGN.md` por script

**Estado final:** concluído em 2026-10-15

## Texto original (preservado)
- **R-013 — Gerar `ARCHITECTURE.md` e `DESIGN.md` por script (`scripts/views.mjs`)** · Estado: planejado
  **Objetivo:** implementar a decisão da [ADR 0018](adr/0018-views-geradas-por-script.md): dois arquivos gerados a partir das ADRs, para um agente ler o estado atual de arquitetura e de design sem abrir ADR por ADR.
  **Escopo:** script Node sem dependências (`seed/scripts/views.mjs`) que lê `docs/adr/*.md`, filtra `Status: accepted` e `Domínio: architecture` (→ `docs/ARCHITECTURE.md`) ou `design` (→ `docs/DESIGN.md`), ordena por número e emite, por ADR, um `##` com o título, o texto de **Decisão** e **Consequências** e o link para a ADR de origem; cabeçalho "gerado por scripts/views.mjs — não edite"; integrar ao `check` (falha se o arquivo estiver desatualizado: regenera em memória e compara); atualizar o Mapa e a seção ADRs do `AGENTS.md` (raiz e seed, I2: aprovado em princípio pelo dono) e o `SCAFFOLD` (gerar os arquivos no scaffold).
  **Fora de escopo:** PRD (continua âncora à mão); resumir ou reescrever texto das ADRs; viewer/plugin.
  **Dependências:** ADRs com `Domínio` preenchido e válido (por isso o seed lista os domínios). **Riscos:** ADR sem domínio ou com status fora do padrão some das views — o `check` já valida status; avisar quando o domínio faltar. Cuidado com o conflito com o parser de ADR do viewer (congelado, sem impacto).
  **Validação:** teste de regressão do script (ADRs de exemplo → saída esperada; ADR `proposed`/`superseded` fora; arquivo desatualizado reprova no `check`); gerar para este repositório e conferir que as ADRs `architecture`/`design` aceitas aparecem.

## Resultado
`seed/scripts/views.mjs` implementado (gera `docs/ARCHITECTURE.md` e `docs/DESIGN.md`; `--check`), integrado ao `check`, com teste de regressão, Mapa/ADRs do `AGENTS.md` (raiz e seed) e `SCAFFOLD` atualizados. Decisão: [ADR 0018](../../adr/0018-views-geradas-por-script.md).

## Evidências
- Revisão independente (subagente Sonnet, 2026-10-15): sem falhas graves; 10 achados menores. Corrigidos: referência `@ROADMAP` casando por substring (agora exige o ID inteiro), crash com symlink quebrado, `views.mjs` sem `docs/`, `status === null` ignorado no `check`. Não corrigidos (limitações): `## ` dentro de bloco de código na "Decisão" corta a seção; link com título `[t](x.md "tt")` não é reescrito; ADR com `**Status:**` em negrito ou domínio fora do conjunto some da view sem aviso; cobertura parcial de TS (`export abstract class`, `export declare`, `export namespace`, `export default () =>`) e Rust (`pub fn` na linha de `impl`); pastas `build`/`dist`/`node_modules` ignoradas em qualquer nível; o cabeçalho da view cita `node scripts/views.mjs` (no EasyDocs é `npm run views`).
- `npm run check` aprovado (6 testes de scripts + 7 do viewer), views geradas para este repositório.

## Limitações
Ver "não corrigidos" acima.
