# ASZO V2 — Fase 3: nomes dos documentos no Pages CMS

## Objetivo
Os elementos no Pages CMS deixam de aparecer como `Item #1` e passam a apresentar o valor do campo **titulo**. Os 16 PDFs e os seus URLs mantem-se.

## Antes de comecar
- Confirmar no GitHub Desktop **Current branch = desenvolvimento-v2**.
- Confirmar que o ramo `main` continua a ser publicado em Settings > Pages (nao alterar).
- Se houver alteracoes pendentes no GitHub Desktop, parar e avaliar antes de copiar os ficheiros.
- Fazer copia de seguranca do `dados/documentos.json` e `.pages.yml` atuais.
- **Nao guardar alteracoes no Pages CMS durante esta substituicao.**

## Instalar apenas os 3 ficheiros alterados (recomendado)
1. Descarregar `ASZO_V2_Fase3_Apenas_Alteracoes.zip` e extrair numa pasta temporaria.
2. No GitHub Desktop, confirmar **desenvolvimento-v2**.
3. Clicar **Repository > Show in Explorer**.
4. Copiar os 3 ficheiros do ZIP, preservando a sua estrutura:
   - `.pages.yml` para a raiz do repositorio;
   - `dados/documentos.json` para `dados/`;
   - `assets/js/documentos.js` para `assets/js/`.
5. Aceitar a substituicao destes 3 ficheiros. **Nao substituir** a pasta `.git`.
6. Voltar ao GitHub Desktop e confirmar **3 ficheiros alterados**. Se aparecerem outros ficheiros, rever antes de continuar.
7. Em Summary escrever `ASZO V2 - Titulos dos documentos no CMS`.
8. Clicar **Commit to desenvolvimento-v2** e depois **Push origin**.
9. No browser, abrir o Pages CMS e **atualizar a pagina** (F5). Confirmar o ramo `desenvolvimento-v2`.
10. Abrir **Biblioteca de documentos**. Cada linha devera apresentar o titulo do documento, em vez de `Item #1`.

## Validacao sem alterar o website publico
1. Expandir o primeiro documento e verificar titulo PT/EN, categoria, epoca, ficheiro e estado `Visivel no website`.
2. Confirmar que continua a haver 16 documentos.
3. Nao clicar em Save ate verificar tudo. Se tiveres de testar gravacao, primeiro faz um teste reversivel no ramo de desenvolvimento.
4. Para testar localmente, na pasta do repositorio executar `py -m http.server 8000` e abrir `http://localhost:8000/`; testar pesquisa, filtros, Ver PDF e Descarregar.
5. Na versao inglesa testar `http://localhost:8000/en/`.

## Se os nomes nao aparecerem
- Fazer F5 no Pages CMS e confirmar que o ramo selecionado e `desenvolvimento-v2`.
- Confirmar online no GitHub que `.pages.yml` tem `summary: "{titulo}"`.
- Confirmar que `dados/documentos.json` comeca por `{ "documentos": [`.
- Se a biblioteca apresentar erro, nao mexer no `main`. Enviar captura de ecra antes de qualquer outra alteracao.

## Como voltar atras
No GitHub Desktop (ramo desenvolvimento-v2), utilizar o historico para **Revert** do commit da Fase 3 e fazer **Push origin**. Isto restaura em conjunto a configuracao, o JSON e o JavaScript anteriores. Nao reverter apenas um dos tres ficheiros.

## Notas
- O Pages CMS edita conteudos no GitHub; nao altera automaticamente a publicacao do `main`.
- A opcao `summary` esta documentada para listas de objetos. Ver: https://pagescms.org/docs/configuration/content/list/
- Esta atualizacao nao altera o aspeto publico da biblioteca.
