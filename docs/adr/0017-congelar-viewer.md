Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Alternativas · Consequências*.

# ADR 0017 — Congelar o visualizador (packages/vscode)

- Status: accepted
- Domínio: product

## Contexto
O EasyDocs nasceu com dois produtos: o gerador de documentação (`seed/`) e o visualizador VSCode de ROADMAP/CHANGELOG/ADRs ([ADR 0004](0004-easydocs-viewer-product.md)). Em 2026-10-15, depois de adotar o ROADMAP só-aberto com IDs, o `check` local e o release automático, o dono decidiu: "vamos deixar isso congelado por enquanto; não estou vendo necessidade mais". O viewer resolvia a leitura e a reordenação de docs longos; com o ROADMAP enxuto e o histórico arquivado em arquivos pequenos e indexados, essa dor diminuiu.

## Decisão
- **`packages/vscode` fica congelado:** nenhum desenvolvimento novo. O código é **mantido** (não removido) e continua coberto pelo `check` (seus testes rodam).
- Os itens de ROADMAP do viewer (R-002 a R-006) vão para a seção `## Congelado`, com estado `congelado` e o motivo. Podem ser reativados pelo dono.
- As ADRs 0004, 0005, 0006, 0008 e 0010 permanecem `accepted` como especificação do viewer, **sem implementação em andamento**. As "views virtuais" ARCHITECTURE/DESIGN (ADR 0001) nunca foram implementadas e dependiam do viewer: a decisão sobre elas está em aberto (ROADMAP R-010).
- A [ADR 0011](0011-versionamento-unificado-viewer-dita.md) (viewer dita o bump) fica `superseded` pela [ADR 0015](0015-verificacao-local-first-ci-versao.md): a versão é calculada automaticamente pelos commits.

## Alternativas
- **Remover `packages/vscode`:** perde trabalho útil e a opção de retomar. Rejeitada.
- **Continuar o desenvolvimento:** sem demanda do dono e com custo de manutenção. Rejeitada.

## Consequências
- O foco do EasyDocs passa a ser o **gerador/metodologia** (`seed/`).
- O formato do ROADMAP (ADR 0014) continua compatível com o parser do viewer, para uma eventual retomada.
- Há código sem evolução no repositório; o custo é só o dos seus testes no `check`.
