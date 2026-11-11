# ASZO V2 — Fase 10.3 (revista): Arquivo de eventos sem Links Úteis

## Alterações
- Removida a secção «Links úteis» / «Useful links» das páginas PT e EN.
- Os acessos à inscrição de sócios e às classificações continuam nas áreas Associação e Competições, respetivamente.
- Mantido o arquivo de eventos recolhível, com fotografias e ligações originais.
- Removidos os estilos CSS exclusivos dos cartões de Links Úteis.
- Não são alterados conteúdos, PDFs ou configurações do Pages CMS.

## Instalação (passo a passo)
1. No GitHub Desktop, seleciona o repositório `asetasoeste` e o ramo `desenvolvimento-v2`. Não faças alterações no `main`.
2. Executa `Fetch origin` e `Pull origin` se estiver disponível. Se tiveres alterações locais por guardar, não as substituas sem as rever.
3. Descarrega e extrai o ZIP. Contém `index.html`, `en/index.html` e `assets/css/aszo-fase10-3.css`.
4. No GitHub Desktop, escolhe `Repository > Show in Explorer`. Faz backup dos HTML e do CSS existente (se existir) para uma pasta **fora** do repositório.
5. Copia os três ficheiros extraídos para a raiz do repositório, respeitando as subpastas, e aceita substituir os que já existirem. **Não copies a pasta exterior do ZIP como uma subpasta**.
6. Não alteres `.pages.yml`, `dados/*.json`, `documentacao/` ou outros ficheiros JS/CSS.
7. Abre PowerShell na pasta do repositório e executa `py -m http.server 8000`. Se o servidor já estiver a correr nessa pasta, reutiliza-o.
8. Abre `http://localhost:8000/` e `http://localhost:8000/en/`, atualizando com `Ctrl + F5`.
9. Confirma: (a) não existe «Links úteis» nem «Useful links»; (b) Associação ainda tem a inscrição de sócios; (c) Competições ainda tem a ligação 2K; (d) arquivo de eventos abre/fecha e respetivos carrosséis e links funcionam; (e) documentação e restantes secções continuam operacionais; (f) mobile 390 px sem scroll horizontal.
10. Só depois de validar os testes, no GitHub Desktop faz commit com o resumo `ASZO V2 - Fase 10.3 - Arquivo sem links duplicados` e executa `Push origin`. **Não faças merge para `main`**.

## Nota sobre versões
O pacote é uma **substituição integral da Fase 10.3 anterior**. Se já copiaste a Fase 10.3 antiga, basta sobrescrever estes três ficheiros. Se ainda não a copiaste, este pacote também a substitui. Os HTML incluídos partem da Fase 10.1 e preservam as alterações das fases 8/9 incorporadas nessa versão; a Fase 10.2 alterou apenas `documentos.css` e `documentos.js`, que ficam intactos.
