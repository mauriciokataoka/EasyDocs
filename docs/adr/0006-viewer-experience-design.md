Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Consequências*.

# ADR 0006 — Experiência de visualização (design do viewer)

- Status: active
- Domínio: design

## Contexto
A navegação precisa ser rápida (busca, reordenação, visão por versão) sem perder o contexto das decisões.

## Decisão
- **Descoberta:** varre recursivamente a pasta atrás de `ROADMAP.md`, `CHANGELOG.md` e pasta de ADRs (`adr/` ou `gdd/`).
- **Organização por SemVer:** pastas colapsáveis por versão; cada item vira um **card**.
- **Busca:** por texto, por versão, ou navegando o **treeview**.
- **Features órfãs:** itens sem versão aparecem destacados; recebem versão pela **posição (ordem)** no doc.
- **ROADMAP:** cards **arrastáveis**; reordenar recalcula a numeração de versão automaticamente.
- **CHANGELOG:** implementações em pastas colapsáveis; cada feature em card separado (espelha o ROADMAP, porém read-oriented).
- **ADRs:** árvore de 4 níveis — raiz → status → cada ADR → itens internos; expostas também como **pastas virtuais** `decisions` / `Project` / `architecture` / `design` (ver ADR 0001).
- **Shell único (plugin VSCode):** a visualização vive no customEditor/webview do VSCode; a casca HTML foi descartada — o objetivo de leitura rápida é atingido pelo plugin.

## Consequências
- Navegação por versão/cards reduz tempo de localização.
- ROADMAP editável por arraste aproxima doc de quadro visual.
- Pastas virtuais ligam diretamente ao modelo de ADRs tagueados por domínio.
