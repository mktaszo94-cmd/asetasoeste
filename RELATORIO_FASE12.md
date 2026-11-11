# ASZO V2 — Fase 12 | Auditoria ao ZIP de pré-produção

**Origem:** `asetasoeste-desenvolvimento-v2(1).zip`, fornecido pelo utilizador em 28/10/2026.  
**Âmbito:** análise estática dos ficheiros, sem teste de navegador autenticado nem acesso às configurações privadas do GitHub.

## Resultado resumido

- 131 entradas no ZIP, incluindo diretórios; aproximadamente 16,27 MB descomprimidos.
- Sete scripts locais `.js` verificados com `node --check`: **sem erros de sintaxe**.
- Página inicial PT/EN e páginas institucionais PT/EN têm um `h1` cada; nas seis páginas analisadas, os elementos `<img>` têm atributo `alt`.
- **16 documentos** no JSON, **4 competições** e **7 parceiros**; os caminhos de PDF e logótipos referenciados nesses dados existem no pacote.
- O `sitemap.xml` contém as seis páginas principais/institucionais e já não contém âncoras removidas.

## Problemas que requerem correção antes da publicação

### P1 — JSON vazio em notícias e eventos
`dados/noticias.json` e `dados/eventos.json` têm **0 bytes**, não sendo JSON válido. O código `aszo-conteudos.js` chama `response.json()` para ambos: o carregamento falha e escreve uma mensagem de erro na consola. Se não existirem registos a publicar, utilizar `{ "noticias": [] }` e `{ "eventos": [] }`. Os dois ficheiros corretos estão incluídos no pacote.

### P1 — Ligações EN incorretas
Na raiz de `sobre.html` e `orgaos-sociais.html`, a ligação para inglês começa por `../en/`, saindo da raiz local do website. Substituir por `en/about.html` e `en/board.html`, respetivamente. Os HTML completos corrigidos estão incluídos no pacote.

### P2 — PDF de teste ainda presente
`documentacao/aszo-teste-publicacao.pdf` e `documentacao/aszo-teste-publicacao-1.pdf` ainda existem, totalizando cerca de 547 KB. Não estão referenciados pelos 16 documentos ativos nem pelas quatro competições atuais. **Não foram removidos automaticamente**; confirmar se há referências externas e decidir se devem ser eliminados antes da publicação.

### P2 — Dados institucionais por confirmar
Na página `orgaos-sociais.html`, o cargo de vice-presidente do Conselho Fiscal está apresentado como **“Demitiu-se”**. Confirmar com a associação qual a redação institucional adequada e se a lista de órgãos sociais corresponde ao mandato atual. Não alterar nomes nem cargos sem validação.

### P2 — Ficheiros de desenvolvimento na raiz
Existem vários `GUIA_FASE*.md`, relatórios e instruções técnicas publicados na raiz caso o ramo seja integrado no GitHub Pages. Embora não sejam documentos confidenciais à partida, convém removê-los do conjunto de publicação ou transferi-los para documentação de desenvolvimento separada.

### P3 — Higiene de repositório
Há imagens com sufixo `_old.jpg` e páginas antigas de secção em pastas como `sugestoes/`. Verificar se precisam de continuar no website e se devem constar da navegação/SEO. **Não apagar sem verificar referências**.

## Conteúdos verificados
- Documentos: 16
- Competições: 4 (todas época 2026)
- Parceiros: 7
- Notícias: ficheiro vazio (corrigido para lista vazia)
- Eventos CMS: ficheiro vazio (corrigido para lista vazia)
- O registo `Rankings — 2027`, criado anteriormente como teste, já não está no JSON desta versão.

## Limitações
Esta auditoria não verifica permissões privadas do GitHub, configuração de branch protection, credenciais, funcionamento das integrações em produção, acessibilidade WCAG completa nem performance real via Lighthouse. Também não prova que as ligações externas funcionam no momento da publicação.

## Próximo passo
Aplicar os quatro ficheiros de correção exclusivamente em `desenvolvimento-v2`, executar os testes locais PT/EN, guardar commit e fazer Push. Confirmar o estado do CMS, rever conteúdos institucionais e realizar testes de produção antes do merge para `main`.
