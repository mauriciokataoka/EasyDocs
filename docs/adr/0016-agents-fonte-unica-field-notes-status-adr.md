Modelo Nygard para decisões de arquitetura. *Status · Contexto · Decisão · Alternativas · Consequências*.

# ADR 0016 — `AGENTS.md` como fonte normativa única, `field-notes/` e status de ADR

- Status: accepted
- Domínio: protocol

## Contexto
O ArchiveGuard separa o protocolo (`AGENTS.md`, curto) da metodologia (`docs/DOCUMENTATION.md`, 321 linhas) e manda ler a segunda "integralmente" antes de tocar em docs — uma indireção que, na prática, é sempre lida. Além disso há evidências de uso/validação sem lugar próprio (misturadas a ADRs, ROADMAP e TESTING) e status de ADR inconsistentes aqui (`active` × `accepted`).

## Decisão
1. **Todas as regras normativas vivem em `AGENTS.md`** (raiz e `seed/`), mesmo que ele cresça; **não** existe `DOCUMENTATION.md`. Regra clara em um lugar só.
2. **`docs/field-notes/`** (com `INDEX.md`): evidências datadas e imutáveis — ambiente, comandos, resultados, limitações. Não é ADR (decisão) nem `history/` (arquivado). Notas não são reescritas para parecerem decisões; correções entram em nova nota.
3. **Status de ADR:** `proposed | accepted | superseded | deprecated`. `active` é abolido (migrado para `accepted`). `superseded` aponta a substituta. Cada status tem o significado: `proposed` = sugestão, não orienta implementação importante sem aprovação; `accepted` = vigente.
4. **Seção `Alternativas`** nas ADRs (rejeitadas e por quê); recomendada, opcional em decisões triviais.
5. **Handoff não é artefato do método:** o estado vive nas docs; antes de trocar de máquina/sessão, commitar (e, com aprovação, dar push).

## Alternativas
- **`DOCUMENTATION.md` separado:** reintroduz indireção e redundância. Rejeitada.
- **Evidências dentro do item de ROADMAP:** vira diário (problema observado no ArchiveGuard). Rejeitada.

## Consequências
- `AGENTS.md` maior (custo aceito pelo dono).
- Um tipo de documento novo (`field-notes`), criado vazio pelo SCAFFOLD.
- ADRs antigas migram `active`→`accepted`.
