# ASZO V2 — Fase 10.5: Sugestões, Contactos e Redes Sociais

## O que muda
- Sugestões: formulário mais legível, seleção de assunto, rótulos acessíveis e mensagens explicativas.
- Mantido o destino existente do formulário: `https://formsubmit.co/mkt.aszo94@gmail.com`.
- Removido `_captcha=false` para não desativar deliberadamente o mecanismo anti-bot do serviço; adicionado o campo `_honey` como barreira complementar.
- Contactos: cartões clicáveis para telefone, email e morada; mapa carregado apenas quando necessário; links identificados do Facebook e Instagram.
- Layout PT e EN responsivo. Nenhuma coleção nem ficheiro JSON do Pages CMS é alterado.

## Instalação (apenas desenvolvimento-v2)
1. No GitHub Desktop, confirma repositório `asetasoeste` e ramo `desenvolvimento-v2`.
2. Faz **Fetch origin / Pull origin**, se necessário. Faz commit da Fase 10.4 se já foi validada e ainda não está guardada.
3. No GitHub Desktop, abre **Repository → Show in Explorer**.
4. Guarda uma cópia de `index.html` e `en/index.html` fora do repositório.
5. Extrai `ASZO_V2_Fase10_5_Apenas_Alteracoes.zip` e copia o conteúdo para a raiz do repositório, preservando pastas; substitui apenas os dois HTML e adiciona `assets/css/aszo-fase10-5.css`.
6. **Não substituas** `.pages.yml`, `dados/*.json`, PDFs nem imagens.
7. Na raiz do repositório, abre PowerShell e executa `py -m http.server 8000` (se ainda não existir um servidor nessa porta).
8. Visita `http://localhost:8000/#sugestoes` e `http://localhost:8000/#contactos`, e `http://localhost:8000/en/`. Faz Ctrl+F5.
9. Testa o layout a 390px de largura e as ligações para telefone, email, mapa e redes sociais. Confirma que carrosséis, documentos, competições, notícias e parceiros continuam corretos.
10. O envio do formulário é **real**, mesmo em localhost. Não submetas mensagens de teste sem avisar os responsáveis; a ativação/validação do FormSubmit e o feedback de envio podem depender do serviço. Um teste combinado com a associação deve confirmar que o email chega e que a proteção anti-spam funciona. O campo de email é opcional e não foi introduzida uma promessa de resposta.
11. Após validação, faz commit `ASZO V2 - Fase 10.5 - Sugestoes e Contactos` e Push origin. Não faças merge com `main`.

## Atenções
- Este pacote parte dos HTML da Fase 10.4. Se alteraste os HTML manualmente após essa fase, compara primeiro para não perderes mudanças.
- Os contactos e as redes sociais foram preservados do código real existente; confirma se estão atualizados antes de publicar em produção.
- Em países/regiões onde se aplique, revê a política de privacidade relativa ao envio de dados ao FormSubmit e ao Google Maps.
