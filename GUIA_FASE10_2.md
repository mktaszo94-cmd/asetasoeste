# ASZO V2 — Fase 10.2 — Documentacao com pesquisa inicial

## Objetivo
Ao abrir a secao Documentacao, mostrar apenas pesquisa, categoria e epoca.
So mostrar PDFs depois de o visitante escrever um termo ou selecionar um filtro.
Os atalhos de Calendarios, Folhas de jogo e Regulamentos continuam ativos.

## Pre-requisitos
- Ramo `desenvolvimento-v2` no GitHub Desktop.
- Fase 10.1 testada e guardada no repositório.
- Backup dos dois ficheiros que vamos substituir.

## Instalar
1. No GitHub Desktop, confirme `desenvolvimento-v2` e clique em Fetch origin / Pull origin se disponivel.
2. Escolha Repository > Show in Explorer.
3. Guarde copias de `assets/js/documentos.js` e `assets/css/documentos.css` fora do repositorio.
4. Extraia o ZIP e copie a pasta `assets` para a raiz do repositorio, mantendo a estrutura.
5. Confirme no GitHub Desktop que aparecem **apenas dois ficheiros alterados**.
6. Na pasta do repositorio, abra PowerShell e execute `py -m http.server 8000`.
7. Aceda a http://localhost:8000/ e force recarregamento com Ctrl+F5.

## Testes
1. Abra Documentacao pelo menu: a lista e os cartoes devem estar ocultos.
2. Digite parte de um nome no campo Pesquisa: os cartoes correspondentes aparecem.
3. Apague completamente a pesquisa: sem filtro ativo, a lista volta a ficar oculta.
4. Escolha Calendarios na Categoria: devem aparecer calendarios.
5. Volte a Todas as categorias e escolha 2026 na Epoca: mostra ficheiros dessa epoca.
6. Limpe os filtros: os cartoes escondem-se novamente.
7. Clique no atalho Calendarios na zona de acesso rapido: a categoria fica selecionada e os resultados aparecem.
8. Verifique Ver PDF e Descarregar.
9. Repita os testes em http://localhost:8000/en/ e num ecra pequeno.
10. Verifique que competicoes, noticias, eventos e o carrossel continuam a funcionar.

## Publicacao
Apenas depois de testar, crie o commit `ASZO V2 - Fase 10.2 - Documentacao por pesquisa` e efetue Push origin para desenvolvimento-v2. Nao altere main.

## Rollback
No GitHub Desktop pode descartar as duas alteracoes locais (se nao fez commit) ou restaurar os backups criados.

## Notas
Nao mexer em `.pages.yml`, `dados/documentos.json` nem nos ficheiros PDF.
A biblioteca nao foi eliminada: apenas a apresentacao inicial passou a depender de interacao.
