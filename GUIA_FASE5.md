# ASZO V2 — Fase 5 | Instalação passo a passo

## O que foi alterado
- `index.html`: novo topo, área inicial e atalhos de acesso rápido (PT).
- `en/index.html`: versão equivalente em inglês.
- `assets/css/aszo-v5.css`: estilos responsivos separados.
- `assets/js/aszo-v5.js`: menu e atalhos de documentos.
- `assets/js/main.js`: não apresentar pop-up automático de eventos e proteção básica do carrossel.

**Importante:** A versão mais recente de `dados/documentos.json` e o PDF de teste estão no GitHub, não no ZIP anterior da Fase 3. Instale apenas o ZIP «Apenas Alterações» para preservar esses conteúdos. A Fase 5 não altera `.pages.yml`, `dados/` nem `documentacao/`.

## Passo 1 — Sincronizar
1. Abrir GitHub Desktop e escolher `asetasoeste` / `desenvolvimento-v2`.
2. Clicar `Fetch origin`; se aparecer, `Pull origin`.
3. Em `Repository > Show in Explorer`, abrir a pasta do repositório.
4. Confirmar que `dados/documentos.json` ainda contém o documento «ASZO - Teste de Publicação».

## Passo 2 — Criar backup local
Copiar os ficheiros atuais `index.html`, `en/index.html`, `assets/js/main.js` para uma pasta fora do repositório (ex.: `C:\ASZO\backup-fase5`).

## Passo 3 — Instalar
1. Extrair `ASZO_V2_Fase5_Apenas_Alteracoes.zip`.
2. Copiar os ficheiros e pastas do interior para a **raiz** da pasta do repositório aberta pelo GitHub Desktop.
3. Confirmar a substituição dos três ficheiros existentes; os outros dois são novos.
4. Não copiar uma pasta adicional chamada `ASZO_V2_Fase5...` para dentro do repositório.
5. Não copiar, apagar ou alterar `.git`, `dados/`, `documentacao/` ou `.pages.yml`.

## Passo 4 — Testar ANTES do commit
1. Na pasta do repositório, clicar na barra de endereço do Explorer, escrever `powershell` e Enter.
2. Executar `py -m http.server 8000` (se 8000 estiver ocupado, usar `8001`).
3. Abrir `http://localhost:8000/` (ou a porta escolhida).
4. Verificar: topo, atalhos, filtros de documentos, 17 documentos, links PDF, eventos, contactos e idioma EN.
5. Diminuir a janela para verificar o menu móvel; o botão deve abrir e fechar.
6. Carregar em «Calendários» e confirmar que a categoria Calendários é selecionada.
7. O pop-up automático de eventos deixa de aparecer; os eventos existentes continuam na respetiva secção.

## Passo 5 — Gravar no GitHub
1. GitHub Desktop > Changes: confirmar 5 ficheiros alterados/adicionados.
2. Escrever `ASZO V2 - Fase 5 - Home e navegacao responsiva` em Summary.
3. `Commit to desenvolvimento-v2`, depois `Push origin`.
4. O domínio `aszoeste.pt` continua a usar `main`, pelo que esta publicação **não atualiza a produção**.

## Recuperação
Se algum teste falhar ANTES do commit: em GitHub Desktop, rever as diferenças dos 5 ficheiros e usar `Discard changes` apenas para as alterações desta fase (isto elimina as alterações locais nesses ficheiros). Pode também restaurar os três ficheiros do backup. Não usar `Discard all changes` se tiveres outras alterações de trabalho.
