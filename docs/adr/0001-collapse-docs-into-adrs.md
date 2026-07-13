Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0001 — Colapsar PRD/ARCHITECTURE/DESIGN em ADRs tagueados por domínio

- Status: active

## Contexto
Todo projeto do dono nasce como brainstorm/decision com o LLM (pair programming + modelagem). Hoje `docs/PRD.md`, `docs/ARCHITECTURE.md` e `docs/DESIGN.md` são narrativas separadas que o agente deve manter em sincronia com as decisões — mas os modelos nem sempre seguem, gerando drift. A hipótese: PRD/ARCHITECTURE/DESIGN são, na prática, **projeções (views)** das decisões ativas, não fontes primárias.

## Decisão
- Tratar cada questão do brainstorm como um **ADR** (`docs/adr/NNNN-*.md`), obrigatoriamente tagueado por **domínio**: `product` · `architecture` · `design` (extensível).
- **`PRD.md` vira âncora mínima** editada à mão, contendo **só o que não é decisão**: problema, público-alvo, não-objetivos e objetivo inicial mínimo. Tudo o que evolui (funcionalidades, solução, escopo) é **renderizado a partir dos ADRs `product` ativos**.
- **`ARCHITECTURE` e `DESIGN` NÃO existem como arquivos físicos.** São **views virtuais** montadas pelo plugin VSCode a partir dos ADRs `architecture`/`design` ativos. O plugin expõe pastas virtuais: `decisions` (todos os ADRs), `Project` (domínio `product`), `architecture` (domínio `architecture`), `design` (domínio `design`).
- Conteúdo decidido vira `ROADMAP` (afazer) e/ou `CHANGELOG` (entregue), como já hoje.
- `AGENTS.md` (Mapa) aponta para a âncora `PRD` + descreve as views virtuais derivadas de ADRs (não mais 3 docs narrativos editados à mão).

## Consequências
- **Positivas:** fonte única de verdade (ADRs); acaba o drift entre narrativa e decisão; menos arquivos para o modelo manter; pluga no plugin VSCode (pastas virtuais por domínio).
- **Negativas / riscos:**
  - *Gap de transição:* até o plugin existir, ARCH/DESIGN só existem como ADRs (sem forma legível à parte). A âncora `PRD` já é legível; para o resto, basta abrir `docs/adr/`.
  - *Contexto que não é decisão* (problema, público, não-objetivos): resolvido pela **âncora mínima do PRD** — não precisa virar ADR.
  - *Mudança no `AGENTS.md`* (I2): exige aprovação explícita do dono para alterar o Mapa.
  - *Tagueamento disciplinado*: cada ADR precisa de domínio correto, senão a pasta virtual fica incompleta.
- **Dependência:** o plugin VSCode (pacote `easydocs`) lê o domínio de cada ADR e monta as pastas virtuais `decisions`/`Project`/`architecture`/`design`.
