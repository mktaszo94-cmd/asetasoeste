# ASZO V2 — Fase 8: Competições

## O que faz
Cria uma secção de Competições nas páginas PT e EN, com cartões Masculino, Feminino, Taças e Tradicional, filtro de época e links para os PDFs existentes no `dados/documentos.json`. A ligação **Provas e classificações** abre a plataforma 2K já utilizada no site. Não cria classificações locais nem modifica o Pages CMS.

## Instalação passo a passo
1. No GitHub Desktop, selecionar o repositório `asetasoeste`, ramo **desenvolvimento-v2**. Fazer **Fetch origin** e **Pull origin** (se existir).
2. Guardar uma cópia de `index.html` e `en/index.html` fora do repositório.
3. Extrair o ZIP e copiar **apenas** `index.html`, `en/index.html` e a pasta `assets/` para a raiz do repositório, preservando a organização. Confirmar substituição dos dois HTML. O ficheiro `GUIA_FASE8.md` pode ficar apenas na pasta de downloads.
4. **Importante:** o ZIP foi preparado a partir dos HTML da Fase 6. Se editaste manualmente `index.html` ou `en/index.html` desde então, revê as diferenças no GitHub Desktop antes de substituir para não perder as alterações. As Fases 7 e 7.1 alteraram apenas CSS/JS de notícias, que este pacote não substitui.
5. Não alterar `.pages.yml`, `dados/`, `documentacao/`, `assets/js/aszo-conteudos.js` nem `assets/css/aszo-conteudos.css`.
6. No diretório do repositório, iniciar `py -m http.server 8000` e abrir `http://localhost:8000/` e `http://localhost:8000/en/`.
7. Confirmar a secção **Competições**, o filtro das épocas, os PDFs de Masculino, Feminino, Taças e Tradicional, a ligação externa e o menu de navegação. Testar em modo móvel (390 px).
8. Confirmar que a biblioteca de documentos, notícias e eventos continuam a funcionar e que o PDF de teste do Pages CMS ainda aparece.
9. Se estiver tudo correto: GitHub Desktop → Summary `ASZO V2 - Fase 8 - Area de competicoes` → **Commit to desenvolvimento-v2** → **Push origin**.
10. **Não efetuar merge para `main` nem alterar o GitHub Pages.**

## Limitações conscientes
- A classificação é consultada na plataforma externa da 2K. Não há ainda uma tabela dinâmica de classificações no website.
- Os PDFs são agrupados por palavras nos títulos. Futuramente, um campo de competição específico no Pages CMS tornará esta atribuição mais robusta.
- Documentos com categoria diferente de `calendarios` não são mostrados nos cartões, mas permanecem na biblioteca de documentos.
- Alguns calendários gerais não surgem nos quatro cartões, permanecendo disponíveis na secção Documentação.
