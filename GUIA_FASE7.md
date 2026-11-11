# ASZO V2 - Fase 7: Noticias e eventos - melhoria visual

## O que contem

Esta atualizacao modifica **apenas dois ficheiros** do website:

- `assets/js/aszo-conteudos.js` - apresentacao automatica de noticias/eventos, lista progressiva, arquivo dos eventos geridos no CMS.
- `assets/css/aszo-conteudos.css` - cartoes responsivos, destaques com imagens opcionais, melhor hierarquia visual.

Nao inclui `.pages.yml`, `dados/*.json`, imagens nem PDFs. Nao modifica eventos antigos escritos no HTML. **Nao substituas todo o repositorio por um ZIP antigo**, porque isso apagaria dados adicionados entretanto no Pages CMS.

## Instalacao no Windows

1. No GitHub Desktop, seleciona `asetasoeste` e **Current branch: desenvolvimento-v2**.
2. Clica em **Fetch origin** e, quando disponivel, em **Pull origin**. Confirma que nao ha alteracoes locais pendentes.
3. Clica em **Repository > Show in Explorer**.
4. Faz uma copia dos dois ficheiros atuais (`assets/js/aszo-conteudos.js` e `assets/css/aszo-conteudos.css`) para uma pasta **fora** do repositorio.
5. Extrai o ZIP da Fase 7. Copia a pasta `assets` extraida para a raiz do repositorio e aceita substituir **apenas aqueles dois ficheiros**. O guia `GUIA_FASE7.md` pode ficar fora do repositorio.
6. Ainda nao facas Commit: testa primeiro localmente.

## Testes locais

1. Na pasta do repositorio (`index.html` na raiz), abre PowerShell e executa `py -m http.server 8000` (se o porto estiver livre).
2. Abre `http://localhost:8000/` e atualiza com Ctrl+F5. Testa tambem `http://localhost:8000/en/`.
3. Verifica se a noticia criada no CMS e o evento de teste continuam visiveis.
4. Cria **apenas no ramo desenvolvimento-v2** um evento de teste com data anterior a hoje, para confirmar que fica sob `Eventos anteriores (arquivo)` e nao em `Proximos eventos`. A secao historica existente mais abaixo permanece inalterada.
5. Se quiseres testar imagens, adiciona uma imagem JPEG/WEBP no campo `Imagem` de uma noticia no Pages CMS, grava, e sincroniza com Fetch/Pull antes de abrir o site local. Evita imagens muito pesadas; alvo recomendado abaixo de 300 KB quando possivel.
6. Testa o site numa janela estreita com Ctrl+Shift+M (Firefox), procura erros na consola (F12) e confirma que os links da documentacao ainda funcionam.
7. Se existirem mais de 6 noticias ou eventos numa lista, aparece o botao `Mostrar mais`. O teste do botao fica pendente enquanto houver menos entradas.

## Guardar no GitHub

Se estiver tudo bem, em GitHub Desktop cria o commit `ASZO V2 - Fase 7 - Cartoes de noticias e eventos` e clica **Push origin**. O website publico continua no `main` e nao sera alterado.

## Como reverter

No GitHub Desktop, antes do commit, usa `Discard changes` **apenas nos dois ficheiros** (se nao tiveres alteracoes anteriores nesses ficheiros) ou recupera as copias guardadas. Depois do commit, nao uses a opcao de alterar o `main`; podes criar um commit de reversao no `desenvolvimento-v2`.

## Notas importantes

- Os dados e a configuracao do Pages CMS nao sao alterados.
- As imagens sao opcionais. A noticia sem imagem recebe destaque visual em fundo claro.
- As datas dos eventos sao comparadas segundo o calendario em Portugal continental (`Europe/Lisbon`).
- Os eventos criados no CMS com datas passadas aparecem no novo arquivo dinamico; os eventos historicos escritos no HTML continuam numa secao separada.
- O texto longo de um cartao e visualmente limitado a cinco linhas; **o conteudo original permanece intacto no JSON**, mas ainda nao existe pagina individual da noticia.
- A Fase 7 nao apaga automaticamente noticia, evento ou PDF de teste. A limpeza sera efetuada manualmente no Pages CMS depois da validacao.
