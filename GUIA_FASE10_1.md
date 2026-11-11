# ASZO V2 — Fase 10.1: Carrossel e Associação

## Objetivo
Recuperar as cinco imagens do carrossel original no banner, mantendo o texto e botões da V2, e reorganizar a secção Associação em três cartões. Funciona em português e inglês.

## O que muda
- `index.html` — página completa PT, com banner e Associação renovados.
- `en/index.html` — página completa EN, com as mesmas melhorias.
- `assets/css/aszo-fase10-1.css` — estilos novos, sem substituir os CSS anteriores.
- `assets/js/aszo-fase10-1.js` — carrossel automático (5,5 s), setas, indicadores, pausa e suporte a movimento reduzido.

Não modifica `.pages.yml`, ficheiros `dados/*.json`, documentos ou restantes funcionalidades das Fases 2–9. Os cinco JPG (`assets/img/Inicio/1.jpg` a `5.jpg`) já fazem parte do site original e **não estão incluídos** no pacote.

## Instalação, com segurança
1. No GitHub Desktop, seleciona o repositório `asetasoeste` e ramo **`desenvolvimento-v2`**. Executa Fetch origin / Pull origin, quando necessário.
2. Confirma que não existem alterações locais pendentes. Se existirem, resolve-as antes de continuar.
3. Faz uma cópia de segurança fora do repositório de `index.html` e `en/index.html`.
4. Descarrega e extrai o ZIP numa pasta temporária. Dentro há dois HTML completos, os dois ficheiros de assets novos e este guia.
5. Abre **Repository > Show in Explorer** e copia os quatro ficheiros para os caminhos correspondentes na raiz do repositório. Substitui apenas `index.html` e `en/index.html`.
6. Não substituas os ficheiros `dados/*.json` ou `.pages.yml` e não apagues as imagens existentes.
7. Abre PowerShell **na raiz do repositório** e executa `py -m http.server 8000`. Depois abre `http://localhost:8000/` e `http://localhost:8000/en/`. Se a porta já estiver ocupada por outro servidor, pára o antigo com Ctrl+C primeiro.
8. Atualiza com Ctrl+F5. Confirma que o banner muda entre as cinco imagens (setas, indicadores e pausa), e que os três cartões da Associação abrem as páginas e o formulário de inscrição.
9. Confirma também: menu mobile, documentos, competições e respetivos calendários, notícias/eventos publicados e ligações de contacto. Testa uma largura de 390 px com Ctrl+Shift+M no Firefox.
10. Se estiver tudo OK, em GitHub Desktop cria o commit `ASZO V2 - Fase 10.1 - Carrossel e Associacao` e executa Push origin. **Não faças merge para main.**

## Observações importantes
- Este pacote foi produzido a partir dos HTML integrais da Fase 8, cuja estrutura foi mantida na Fase 9. **Se alteraste manualmente `index.html` ou `en/index.html` após a Fase 8, compara essas alterações antes de os substituir.** Os ficheiros JSON atuais, incluindo os testes e alterações feitas no Pages CMS, não são substituídos.
- O carrossel respeita a preferência do sistema por movimento reduzido, tem controlos acessíveis e pára quando o separador deixa de estar visível.
- A página de inscrição abre a plataforma externa oficial já usada no site.
- O banner utiliza as fotografias que já existiam na pasta `Inicio`, pelo que não tens de voltar a carregá-las.
- Esta fase ainda não converte o banner para gestão no CMS; esse passo será posterior, se for pretendido.
