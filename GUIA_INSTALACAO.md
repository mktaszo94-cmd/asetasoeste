# ASZO V2 - Fase 12.4 | Ampliacao de imagens de noticias e eventos

## Objetivo
Ao clicar num cartaz de noticia ou evento no site, abre uma janela com a imagem integral sem sair da pagina. Suporta fechar no X, tecla Esc ou clique fora da imagem. A disposicao compacta existente e mantida.

## Instalar (ramo desenvolvimento-v2)
1. No GitHub Desktop, confirmar o repositorio `asetasoeste` e ramo `desenvolvimento-v2`. Fazer Fetch/Pull, se necessario.
2. Extrair o ZIP para uma pasta temporaria.
3. Abrir Repository > Show in Explorer e guardar uma copia de `assets/js/aszo-conteudos.js` e `assets/css/aszo-conteudos.css` fora do repositorio.
4. Copiar a pasta `assets` do pacote para a raiz do repositorio, substituindo APENAS esses dois ficheiros.
5. No GitHub Desktop, confirmar que aparecem apenas dois ficheiros modificados. Nao fazer commit ainda.
6. Com o servidor local iniciado na raiz do repositorio (`py -m http.server 8000`), abrir `http://localhost:8000/` e atualizar com Ctrl+F5.
7. Clicar nas imagens de uma noticia e de um evento; confirmar que abrem completas em modal e que o X, Esc e clique fora fecham a imagem.
8. Verificar em `http://localhost:8000/en/` e numa janela mobile. Confirmar que as datas multidia e os cartoes compactos continuam intactos.
9. Apos validar, fazer commit `ASZO V2 - Fase 12.4 - Ampliacao de imagens` e Push origin apenas para `desenvolvimento-v2`.

## Ficheiros
- `assets/js/aszo-conteudos.js`: versao completa com datas multidia da Fase 12.1 e visualizacao ampliada.
- `assets/css/aszo-conteudos.css`: versao completa com layouts compactos das Fases 12.2/12.3 e estilo do modal.

Nao altera `.pages.yml`, JSON, HTML, PDFs nem imagens. Funcionalidade apenas para noticias e eventos que tenham imagem valida em `/assets/img/`.
