# ASZO V2 — Fase 10.3: arquivo de eventos e links úteis

## Objetivo
Reduzir a altura da homepage mantendo os dois eventos históricos e respetivos carrosséis e ligações. O arquivo só é expandido quando o visitante clicar em «Ver eventos anteriores». Modernizar os dois links úteis existentes, sem mudar os seus destinos. Versões PT e EN incluídas.

## Ficheiros completos no pacote
- `index.html` — página portuguesa completa (baseada na Fase 10.1).
- `en/index.html` — página inglesa completa (baseada na Fase 10.1).
- `assets/css/aszo-fase10-3.css` — novo ficheiro de estilos; não substitui os estilos anteriores.

**Importante:** a Fase 10.2 alterou apenas `assets/js/documentos.js` e `assets/css/documentos.css`. Estes ficheiros permanecem no repositório e não são substituídos pelo pacote 10.3. O arquivo histórico continua em HTML, não passa ainda para o CMS.

## Instalação passo a passo
1. Abre GitHub Desktop no repositório `asetasoeste`, ramo **`desenvolvimento-v2`**.
2. Confirma que a Fase 10.2 está validada e guarda-a com o commit `ASZO V2 - Fase 10.2 - Pesquisa de documentos`. Faz `Push origin`.
3. Executa `Fetch origin` e `Pull origin` se disponível; certifica-te de que não tens alterações locais pendentes.
4. Descarrega o ZIP e extrai-o numa pasta temporária.
5. Clica `Repository > Show in Explorer`. Faz cópia de segurança de `index.html` e `en/index.html` para uma pasta fora do repositório.
6. Copia os três ficheiros do pacote para as pastas correspondentes. Substitui apenas `index.html` e `en/index.html`; o CSS é adicionado.
7. Não alteres `dados/*.json`, `.pages.yml`, imagens, PDFs, `documentos.css` e `documentos.js`.
8. Na raiz do repositório, abre PowerShell e executa `py -m http.server 8000`. Caso já exista servidor nessa porta, usa o que está em execução ou encerra-o antes.
9. Abre `http://localhost:8000/` e `http://localhost:8000/en/` e atualiza com Ctrl+F5.
10. Na área «Arquivo de eventos», confirma que os eventos estão recolhidos de início. Clica em «Ver eventos anteriores (2)» e testa as imagens, setas e links originais.
11. Em «Links úteis», testa «Inscrição de sócios» e «Provas e classificações» e confirma que abrem o destino correto num novo separador.
12. Confirma ainda que a pesquisa de documentos da Fase 10.2 está oculta por defeito, o carrossel principal e os atalhos funcionam, e a versão mobile (390 px) não tem scroll horizontal.
13. **Só depois dos testes**, cria o commit `ASZO V2 - Fase 10.3 - Arquivo e links uteis` e faz Push origin para `desenvolvimento-v2`. Não faças merge para `main`.

## Limites desta fase
- Mantivemos os dois eventos históricos e imagens tal como estavam. Não adicionámos novas notícias ou eventos, nem mudámos o funcionamento do Pages CMS.
- Em futuras fases podemos criar uma página de arquivo com filtros por época e gerir os links úteis no Pages CMS.
- Os ficheiros HTML deste pacote foram gerados a partir dos HTML da Fase 10.1. Se fizeste alterações manuais adicionais em HTML após essa fase, compara-as antes de substituir.
