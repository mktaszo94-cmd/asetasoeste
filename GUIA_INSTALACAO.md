# ASZO V2 — Fase 12.2: Eventos compactos e cartazes completos

## Alteracao
Substitui exclusivamente `assets/css/aszo-conteudos.css` por esta versao completa. O cartaz do evento passa a caber inteiro (`object-fit: contain`) e, em desktop, fica ao lado da informacao. Em mobile fica acima, com altura limitada. Noticias, Pages CMS, JSON e restantes estilos nao sao alterados.

## Instalacao
1. Abre o GitHub Desktop e confirma `desenvolvimento-v2`.
2. Guarda uma copia de `assets/css/aszo-conteudos.css` fora da pasta do repositorio.
3. Extrai este ZIP e copia `assets/css/aszo-conteudos.css` para o mesmo caminho do repositorio, substituindo-o.
4. Nao alteres outros ficheiros, em particular `.pages.yml`, `dados/eventos.json` ou `assets/js/aszo-conteudos.js`.
5. Se necessario, inicia o servidor local na raiz do repositorio com `py -m http.server 8000`.
6. Abre `http://localhost:8000/` e atualiza com Ctrl+F5. Testa em desktop e a 390 px no modo responsivo.
7. Confirma que a imagem aparece inteira e que o evento continua legivel; verifica Noticias e versao inglesa.
8. Se estiver tudo OK, cria o commit `ASZO V2 - Fase 12.2 - Cartoes de eventos compactos` e Push origin.

## Sobre a data de fim
O JavaScript da Fase 12.1 ja apresenta os intervalos quando `data_fim` existe e e posterior a `data`. Na captura foi apresentada apenas a data de inicio. Confirma no Pages CMS se o campo "Data de fim" foi guardado e, apos Pull origin, verifica em `http://localhost:8000/dados/eventos.json` se a entrada inclui `"data_fim": "2026-11-08"` (para o exemplo de 5 a 8 de novembro). Se existir mas a pagina continuar a mostrar um dia, faz Ctrl+F5 e confirma se o JS atualizado da Fase 12.1 esta instalado. Nao precisas de alterar o JSON manualmente.
