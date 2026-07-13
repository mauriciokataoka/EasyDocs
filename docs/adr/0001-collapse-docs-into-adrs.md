Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0001 — Colapsar PRD/ARCHITECTURE/DESIGN em ADRs tagueados por domínio

- Status: active

## Contexto
Todo projeto do dono nasce como brainstorm/decision com o LLM (pair programming + modelagem). Hoje `docs/PRD.md`, `docs/ARCHITECTURE.md` e `docs/DESIGN.md` são narrativas separadas que o agente deve manter em sincronia com as decisões — mas os modelos nem sempre seguem, gerando drift. A hipótese: PRD/ARCHITECTURE/DESIGN são, na prática, **projeções (views)** das decisões ativas, não fontes primárias.

## Decisão (proposta)
- Tratar cada questão do brainstorm como um **ADR** (`docs/adr/NNNN-*.md`), obrigatoriamente tagueado por **domínio**: `product` · `architecture` · `design` (extensível).
- **`PRD.md` vira âncora mínima** editada à mão, contendo **só o que não é decisão**: problema, público-alvo, não-objetivos e objetivo inicial mínimo. Tudo o que evolui (funcionalidades, solução, escopo) é **renderizado a partir dos ADRs `product` ativos**.
- **`ARCHITECTURE.md` e `DESIGN.md` tornam-se views 100% renderizadas** a partir dos ADRs `architecture`/`design` ativos (sem âncora à mão, pois são puramente derivadas de decisões técnicas/UX).
- Gerar os três documentos como **views renderizadas** (plugin VSCode — ou gerador simples de markdown — produz o conteúdo a partir dos ADRs filtrados por domínio).
- Conteúdo decidido vira `ROADMAP` (afazer) e/ou `CHANGELOG` (entregue), como já hoje.
- `AGENTS.md` (Mapa) passa a apontar para a âncora `PRD` + as views derivadas de ADRs (não mais 3 docs narrativos editados à mão).

## Consequências
- **Positivas:** fonte única de verdade (ADRs); acaba o drift entre narrativa e decisão; menos documentação para o modelo manter; pluga no plugin VSCode (que já varre ADRs).
- **Negativas / riscos:**
  - *Gap de transição:* até o renderizador existir, ARCH/DESIGN não terão forma legível (só ADRs). Mitigo com um gerador mínimo de markdown ou mantendo a âncora `PRD` já legível.
  - *Contexto que não é decisão* (problema, público, não-objetivos): resolvido pela **âncora mínima do PRD** — não precisa virar ADR.
  - *Mudança no `AGENTS.md`* (I2): exige aprovação explícita do dono para alterar o Mapa.
  - *Tagueamento disciplinado*: cada ADR precisa de domínio correto, senão a view fica incompleta.
- **Dependência:** o plugin VSCode (pacote `easydocs`) precisa ler o domínio de cada ADR para montar as 3 views.
