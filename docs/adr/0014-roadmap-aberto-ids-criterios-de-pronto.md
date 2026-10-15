Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Alternativas · Consequências*.

# ADR 0014 — ROADMAP só aberto, IDs permanentes, critérios de pronto e evidência

- Status: accepted
- Domínio: protocol

## Contexto
O ROADMAP do EasyDocs era um checklist que acumulava `[x]`, misturando feito e aberto, sem identificadores estáveis. A documentação do ArchiveGuard (2026-10, `docs/DOCUMENTATION.md`) resolveu isso com roadmap só de trabalho aberto, arquivo de concluídos, IDs `R-XXX`, critérios de pronto e regras de evidência — mas ficou pesada (a própria auditoria dele aponta metodologia maior que PRD+API+ARCHITECTURE) e deixou itens virarem diário. O EasyDocs é genérico: adota o mecanismo, com rigor **conforme aplicável** ao escopo e risco de cada item (decisão do dono, 2026-10-15).

## Decisão
1. **ROADMAP = só trabalho aberto.** Concluído/cancelado vai **íntegro** para `history/roadmap/R-NNN-titulo.md` (+ linha em `history/roadmap/INDEX.md`), com data, resultado, evidências e limitações acrescentados sem resumir o original.
2. **Formato compatível com o viewer (ADR 0008):** seções `## vX.Y.Z`; item = bullet `- **R-NNN — Título** · Estado: <estado>` com linhas indentadas `**Objetivo:**`, `**Escopo:**`, `**Validação:**` (obrigatórios) e, quando couber, `**Fora de escopo:**`, `**Dependências:**`, `**Riscos:**`, `**Critérios de pronto:**`. A **versão é a posição** do card; o **ID é a identidade** e nunca muda.
3. **IDs `R-NNN` permanentes, nunca reutilizados** (nem após concluir/cancelar). Antes de criar, consultar o ROADMAP e `history/roadmap/INDEX.md`; o `check` falha em duplicata.
4. **Estados:** planejado · em implementação · aguardando validação · pronto para revisão · concluído · cancelado · substituído (cancelado/substituído levam motivo e link da decisão).
5. **Critérios de pronto (conforme aplicável):** implementação dentro do escopo; testes relevantes passam; validação manual prevista feita; docs, contratos e ADRs afetados atualizados; limitações e riscos residuais registrados; nenhuma regressão conhecida sem decisão explícita.
6. **Dois passos:** "pronto para revisão" ≠ "concluído". Só o aceite do dono conclui e arquiva. Código sozinho não comprova critério de pronto.
7. **Evidência honesta:** cada evidência vale para o subitem que prova, com data, ambiente/revisão e resultado `aprovado | falhou | não executado`; registrar a causa de falhas e de verificações não feitas; nunca apresentar verificação parcial como aprovação completa. O detalhe vive em `docs/field-notes/`; o item só linka (não vira diário).
8. **Testes:** correção de bug exige teste de regressão; TDD seletivo (teste primeiro para regra nova, de risco alto ou isolável; UI/integração difícil → validação manual registrada); um comando de verificação por projeto (ADR 0015).

## Alternativas
- **Manter o checklist com `[x]`:** simples, mas cresce sem fim e não dá chave estável ao viewer/arraste. Rejeitada.
- **Copiar o modelo do ArchiveGuard inteiro** (todos os campos sempre; `DOCUMENTATION.md` separado): rigor desproporcional para projetos pequenos. Rejeitada; campos extras só "quando couber".
- **Rigor fixo por nível de risco no PRD:** mais uma estrutura a manter. Rejeitada pelo dono; fica "conforme aplicável".

## Consequências
- Retomada mais rápida: só o aberto é lido.
- IDs estáveis sobrevivem a reordenação por arraste (a versão muda, o ID não).
- Custo: disciplina de arquivar a cada conclusão aceita.
- O viewer lê o novo ROADMAP sem mudança de código (bullets de topo = cards; linhas indentadas = corpo).
