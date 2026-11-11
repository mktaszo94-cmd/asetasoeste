# ASZO — Fase 2: biblioteca de documentos + Pages CMS

## Segurança
- O site em produção continua a publicar do ramo `main`. **Não substituir esse ramo agora**.
- Criar/verificar backup do ZIP original antes de qualquer alteração.
- O GitHub Pages não permite pré-visualizar outro ramo apenas mudando o ramo de publicação: usar um servidor local ou um serviço de pré-visualização separado.
- Não publicar dados pessoais, palavras-passe ou ficheiros sensíveis no repositório público.

## Instalar no ramo desenvolvimento-v2
1. Descarregar e extrair o pacote ASZO_V2_Fase2.zip.
2. Abrir https://github.com/mktaszo94-cmd/asetasoeste/tree/desenvolvimento-v2 e confirmar que o seletor mostra `desenvolvimento-v2`.
3. No GitHub web, carregar os ficheiros novos/alterados (Add file > Upload files). **Ao carregar, preservar os caminhos de pastas**. Para carregamentos complexos usar GitHub Desktop e copiar o conteúdo da pasta do pacote para a cópia local do repositório.
4. Confirmar a existência na raiz do ramo: `.pages.yml`, `dados/documentos.json`, `index.html`, `en/index.html`, `assets/css/documentos.css`, `assets/js/documentos.js`.
5. Fazer commit **apenas no ramo desenvolvimento-v2**.
6. Confirmar em Settings > Pages que continua a publicar `main / (root)`.

## Testar localmente (Windows)
1. Extrair o pacote para uma pasta, por exemplo C:\ASZO_V2_Fase2.
2. Abrir o PowerShell nessa pasta (onde existe index.html).
3. Executar `py -m http.server 8000` (é preciso ter Python instalado).
4. Abrir http://localhost:8000/ (PT) e http://localhost:8000/en/ (EN).
5. Testar pesquisa, filtros, abrir PDF, descarregar PDF e versão móvel.
6. Para parar: CTRL+C no PowerShell.
Nota: abrir index.html com duplo clique (file://) pode bloquear a leitura do JSON.

## Ligar ao Pages CMS
1. Aceder a https://app.pagescms.org e iniciar sessão com GitHub.
2. Autorizar a aplicação apenas para o repositório `asetasoeste`, se possível.
3. Selecionar `mktaszo94-cmd/asetasoeste` e escolher o ramo `desenvolvimento-v2`.
4. A configuração `.pages.yml` está na raiz. Deverá aparecer "Biblioteca de documentos".
5. Testar editar o título de um documento e guardar; confirmar o commit no ramo `desenvolvimento-v2`.
6. Testar o upload de um PDF novo e o respetivo registo na lista. Os URLs têm de começar por `/documentacao/` e terminar em `.pdf`.
7. Não selecionar `main` no CMS até existir aprovação para publicação.

## Publicar um documento
1. Abrir a Biblioteca de documentos no Pages CMS.
2. Adicionar entrada: Título PT, Título EN (facultativo), Categoria, Época e ficheiro PDF.
3. Escolher Publicado = verdadeiro; guardar.
4. Verificar que tanto o ficheiro como o registo ficam gravados no ramo de desenvolvimento.
5. Abrir localmente ou numa pré-visualização isolada para validar o resultado.

## Restrições nesta fase
- Só a zona dos documentos foi convertida; notícias, eventos e outros conteúdos continuam no HTML.
- O CMS altera ficheiros do GitHub. Não há publicação automática no domínio público enquanto o conteúdo for editado no ramo de desenvolvimento.
- A vista pública carrega o JSON em tempo de execução. É necessário servidor HTTP/HTTPS e JavaScript ativo.
- A opção "Descarregar" pode abrir o PDF em alguns navegadores, dependendo da forma como o browser trata ficheiros do mesmo domínio.
- Se um PDF novo for carregado numa pasta diferente de `documentacao`, não será apresentado pela biblioteca (validação de segurança).
- Substituir um PDF conservando o mesmo nome evita mudar o endereço público e deve ser feito com cuidado por causa de cache.
