Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0001 — Colapsar PRD/ARCHITECTURE/DESIGN em ADRs tagueados por domínio

- Status: proposed

## Contexto
Todo projeto do dono nasce como brainstorm/decision com o LLM (pair programming + modelagem). Hoje `docs/PRD.md`, `docs/ARCHITECTURE.md` e `docs/DESIGN.md` são narrativas separadas que o agente deve manter em sincronia com as decisões — mas os modelos nem sempre seguem, gerando drift. A hipótese: PRD/ARCHITECTURE/DESIGN são, na prática, **projeções (views)** das decisões ativas, não fontes primárias.

## Decisão (proposta)
- Tratar cada questão do brainstorm como um **ADR** (`docs/adr/NNNN-*.md`), obrigatoriamente tagueado por **domínio**: `product` · `architecture` · `design` (extensível).
- **Encerrar** `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md` como artefatos editados à mão.
- Gerar esses três documentos como **views renderizadas** a partir dos ADRs ativos filtrados por domínio (o plugin VSCode — ou gerador simples — produz o markdown/HTML).
- Conteúdo decidido vira `ROADMAP` (afazer) e/ou `CHANGELOG` (entregue), como já hoje.
- `AGENTS.md` (Mapa) deixa de listar PRD/ARCH/DESIGN como docs canônicas e aponta para as views derivadas + ADRs.

## Consequências
- **Positivas:** fonte única de verdade (ADRs); acaba o drift entre narrativa e decisão; menos documentação para o modelo manter; pluga no plugin VSCode (que já varre ADRs).
- **Negativas / riscos:**
  - *Gap de transição:* até o renderizador existir, não há PRD/ARCH/DESIGN legíveis — só ADRs. Precisa de um gerador mínimo ou manter um PRD-âncora mínimo nesse período.
  - *Contexto que não é decisão* (problema, público, não-objetivos) cabe mal em ADR; solução = modelar como ADR `accepted` ou manter um pequeno "contexto" fixo.
  - *Mudança no `AGENTS.md`* (I2): exige aprovação explícita do dono para alterar o Mapa.
  - *Tagueamento disciplinado*: cada ADR precisa de domínio correto, senão a view fica incompleta.
- **Dependência:** o plugin VSCode (pacote `easydocs`) precisa ler o domínio de cada ADR para montar as 3 views.
