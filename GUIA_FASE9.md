# ASZO V2 - Fase 9 | Gestao de competicoes

## Objectivo
Gerir competicoes no Pages CMS, por epoca, sem editar o HTML.
Preservam-se os PDFs do CMS, os eventos, as noticias, os idiomas e a ligacao geral a plataforma 2K.

## Conteudo do ZIP
- `.pages.yml` — configuracao completa do Pages CMS (documentos, noticias, eventos e competicoes)
- `dados/competicoes.json` — 4 registos iniciais da epoca 2026 (somente metadados; nao altera documentos.json)
- `assets/js/aszo-competicoes.js` — substituicao completa do script da Fase 8
- `assets/css/aszo-competicoes.css` — CSS completo da Fase 8 com estilos adicionais de estado e resultados

## Instalar (apenas no ramo desenvolvimento-v2)
1. No GitHub Desktop, seleccionar `asetasoeste`, ramo `desenvolvimento-v2`.
2. Fazer Fetch origin / Pull origin, se disponivel.
3. Abrir Repository > Show in Explorer.
4. Guardar, fora do repositorio, uma copia de seguranca dos actuais `.pages.yml`, `assets/js/aszo-competicoes.js` e `assets/css/aszo-competicoes.css`.
5. Extrair o ZIP da Fase 9 para uma pasta temporaria.
6. Copiar os conteudos da pasta extraida para a raiz do repositorio local, conservando a estrutura de pastas.
7. Confirmar no GitHub Desktop APENAS quatro ficheiros novos/alterados: `.pages.yml`, `dados/competicoes.json`, `assets/js/aszo-competicoes.js`, `assets/css/aszo-competicoes.css`.
8. Testar localmente, abrindo PowerShell NA PASTA DO REPOSITORIO e executando `py -m http.server 8000`. Se a porta ja estiver em uso, parar o servidor anterior (`Ctrl+C`) ou utilizar 8001 e aceder ao URL correspondente.
9. Abrir `http://localhost:8000/` e verificar Competições (4 cartoes) e filtro por epoca 2026. Testar PDFs e classificacoes.
10. Testar `http://localhost:8000/en/` e modo mobile. Validar que Documentacao, Noticias e Eventos permanecem intactos.
11. So depois de validar, Commit: `ASZO V2 - Fase 9 - Competicoes no Pages CMS`; Push origin para desenvolvimento-v2. Nao efectuar merge para main.
12. Abrir `https://app.pagescms.org/` no ramo desenvolvimento-v2. Deverá aparecer `Competicoes (ASZO)`, com quatro registos iniciais. Nao premir Save nem modificar os registos antes de validar.

## Como adicionar uma competicao de 2027
1. Pages CMS > Competicoes (ASZO) > Add an item.
2. Preencher titulo PT, titulo EN, epoca `2027`, estado `Em preparacao` e `Mostrar no website = true`.
3. Opcionalmente indicar URL HTTPS especifico de classificacoes; sem URL utiliza-se a ligacao geral 2K.
4. Em `PDFs associados`, adicionar o titulo e seleccionar/carregar o PDF (fica na pasta `documentacao`).
5. Deixar `Associacao automatica dos PDF antigos` em `Nenhuma`.
6. Guardar, verificar commits e puxar alteracoes no GitHub Desktop para testar a listagem local.

## Compatibilidade e cuidados
- Os calendarios de 2026 continuam associados automaticamente por titulos a partir de dados/documentos.json. Isto e uma ponte de compatibilidade, nao uma associacao precisa por ID.
- Para novos campeonatos, associar PDFs explicitamente no campo do CMS.
- Os registos iniciais de 2026 estao marcados `Concluida` como exemplo de estado; confirmar/corrigir no CMS antes de publicar em producao.
- Nao substituir `dados/documentos.json`, `dados/noticias.json` ou `dados/eventos.json`.
- Este pacote foi construido a partir dos ficheiros da Fase 8 e da configuracao CMS da Fase 6. Se entretanto alteraste manualmente esses quatro ficheiros, comparar antes de substituir.
- Nao incluir no pacote os documentos de teste; estao preservados no teu repositorio. Retirar apenas quando concluirmos todos os testes.
- GitHub Pages publica `main`; desenvolvimento-v2 so fica disponivel localmente ou noutra preview que venha a ser configurada.
