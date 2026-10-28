# ASZO V2 - Fase 6 | Instalacao e testes

## Antes de comecar
- No GitHub Desktop, confirmar `asetasoeste` e `desenvolvimento-v2`.
- Fazer **Fetch origin** e **Pull origin** se necessario.
- Concluir o commit/push da Fase 5 primeiro.
- Guardar copia dos ficheiros `.pages.yml`, `index.html` e `en/index.html` antes de substituir.

## Instalar (somente 8 ficheiros)
1. Extrair `ASZO_V2_Fase6_Apenas_Alteracoes.zip` para uma pasta temporaria.
2. No GitHub Desktop: **Repository > Show in Explorer**.
3. Copiar o conteudo extraido para a raiz do repositorio, mantendo a hierarquia de pastas.
4. Substituir os tres ficheiros existentes quando solicitado.
5. No GitHub Desktop confirmar oito ficheiros novos/alterados: `.pages.yml`, `index.html`, `en/index.html`, `dados/noticias.json`, `dados/eventos.json`, `assets/css/aszo-conteudos.css`, `assets/js/aszo-conteudos.js`.
6. Nao copiar a pasta temporaria em si e nao tocar em `dados/documentos.json` ou `documentacao/`.

## Testar localmente ANTES do commit
1. Abrir PowerShell **na pasta do repositorio** e executar `py -m http.server 8000`.
2. Testar `http://localhost:8000/` e `/en/`: os eventos antigos e PDFs continuam disponiveis.
3. Novas secoes ficam ocultas enquanto nao existirem noticias/eventos publicados (intencional).
4. Confirmar `http://localhost:8000/dados/noticias.json` mostra `{"noticias":[]}` e `/dados/eventos.json` mostra `{"eventos":[]}`.
5. Se tudo funcionar, criar commit `ASZO V2 - Fase 6 - Gestao de noticias e eventos` e fazer Push origin.

## Validar Pages CMS
1. Entrar em https://app.pagescms.org/ no ramo `desenvolvimento-v2`.
2. Confirmar novas areas **Noticias (ASZO)** e **Eventos (ASZO)** e media **Imagens das noticias e eventos**.
3. Adicionar uma noticia de teste, marcar `Visivel no website` e guardar.
4. No GitHub Desktop fazer Fetch/Pull origin; atualizar o localhost para ver a noticia.
5. Adicionar evento de teste e repetir.

## Campos
- Titulo PT obrigatorio; titulo EN opcional (usa PT como alternativa).
- Descricao PT obrigatoria, EN opcional; data obrigatoria, formato AAAA-MM-DD.
- Imagem opcional; usar o selecionador de imagens do Pages CMS.
- Link opcional e deve comecar por `https://`.
- `Visivel no website`: controlar publicacao sem apagar o conteudo.

## Notas de seguranca
- Atualizacoes no Pages CMS escrevem diretamente no ramo selecionado.
- Nao mudar ramo para `main` durante os testes.
- O dominio publico continua a usar `main`.
- Esta fase nao converte os eventos historicos para o CMS: permanecem no HTML para evitar perda de conteudo.
- Nao substituir o JSON de documentos existente. Os novos JSON começam vazios deliberadamente.
