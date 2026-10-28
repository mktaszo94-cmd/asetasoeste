# ASZO V2 — Fase 12.1 — Eventos de varios dias

## Alteracoes
- `.pages.yml`: o campo `data` continua a existir, agora com o rotulo **Data de inicio**. Novo campo `data_fim` opcional.
- `assets/js/aszo-conteudos.js`: mostra intervalos de datas PT/EN e considera o ultimo dia na separacao entre proximos eventos e arquivo.
- Nenhum ficheiro JSON ou HTML e substituido; os eventos antigos continuam compativeis.

## Instalar no ramo desenvolvimento-v2
1. No GitHub Desktop, confirma o ramo `desenvolvimento-v2`, faz Fetch/Pull, e certifica-te de que nao ha alteracoes pendentes. Se existirem, guarda-as antes de continuar.
2. Extrai o ZIP. Em **Repository > Show in Explorer**, copia `.pages.yml` e `assets/js/aszo-conteudos.js` para os caminhos correspondentes no repositorio.
3. Antes de substituir, guarda copia dos dois ficheiros existentes fora da pasta do repositorio. Se alteraste a configuracao ou script entretanto, compara antes de substituir.
4. Confirma no GitHub Desktop que apenas estes dois ficheiros foram alterados. Cria o commit `ASZO V2 - Fase 12.1 - Datas de inicio e fim dos eventos` e faz **Push origin** no ramo `desenvolvimento-v2`.
5. Abre https://app.pagescms.org, seleciona o repositorio e o ramo `desenvolvimento-v2`, atualiza a pagina e abre **Eventos (ASZO)**. Encontras os campos **Data de inicio** e **Data de fim (opcional)**.
6. Para testar, cria um evento temporario: inicio `2026-11-05`, fim `2026-11-08`, titulo `ASZO - Teste de Evento Multidia`, publicado = true. Guarda.
7. No GitHub Desktop, Fetch/Pull para receber o novo registo. Inicia `py -m http.server 8000` na pasta do repositorio e abre `http://localhost:8000/` (Ctrl+F5). Deve aparecer `5 a 8 de novembro de 2026`. Em `/en/`, `5–8 November 2026`.
8. Confirma que os eventos com apenas data inicial continuam a aparecer como anteriormente. Depois desativa/elimina o evento de teste no CMS e Fetch/Pull.

## Regras
- O campo Data de fim e **opcional**, e o ultimo dia e **inclusivo**.
- Se a data final estiver vazia, considera-se que o evento dura um dia.
- Se a data final for anterior a inicial ou invalida, o JS nao publica esse evento e escreve aviso na consola (nao altera dados no GitHub). O CMS nao faz validacao cruzada automatica entre campos.
- Nao alteres o ramo `main` nesta fase.
