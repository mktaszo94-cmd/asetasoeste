# ASZO V2 - Fase 7.1 | Correcao das larguras dos cartoes

## Objetivo
Corrigir o problema de grelhas aninhadas da Fase 7 que tornava os cartoes de eventos demasiado estreitos. Sem alterar JavaScript, dados JSON, PDFs, configuracao Pages CMS ou HTML.

## Ficheiro alterado
- `assets/css/aszo-conteudos.css` (substituir o ficheiro inteiro pelo fornecido)

## Instalacao passo a passo
1. No GitHub Desktop, abre o repositorio `asetasoeste` e confirma o ramo `desenvolvimento-v2`.
2. Faz `Fetch origin` e, se estiver disponivel, `Pull origin`.
3. Faz uma copia de seguranca do ficheiro atual `assets/css/aszo-conteudos.css` fora da pasta do repositorio.
4. Extrai o ZIP e copia `assets/css/aszo-conteudos.css` para a mesma localizacao no repositorio, aceitando substituir.
5. No GitHub Desktop, confirma que **apenas** `assets/css/aszo-conteudos.css` foi alterado. Nao faças commit ainda.
6. Abre o repositorio com `Repository > Show in Explorer`, escreve `powershell` na barra de endereco e executa `py -m http.server 8000` (se a porta estiver ocupada por outro servidor, encerra-o primeiro com Ctrl+C).
7. Abre `http://localhost:8000/` e faz `Ctrl+F5`. Confirma que o cartao do evento de teste ja nao fica estreito e que a noticia continua legivel.
8. No Firefox, `Ctrl+Shift+M` e testa larguras de 390px, 768px e escritorio.
9. Confirma que o menu e a biblioteca de PDFs continuam a funcionar; testa igualmente `http://localhost:8000/en/`.
10. Se tudo estiver correto, cria o commit `ASZO V2 - Fase 7.1 - Correcao da grelha de conteudos` e faz `Push origin`.

## Se nao vires alteracoes
- Confirma que iniciaste o servidor a partir da pasta local do repositorio e nao da antiga pasta `Downloads/ASZO_V2_Fase2`.
- Carrega `Ctrl+F5` para renovar o CSS.
- Confirma no inspetor do navegador que `assets/css/aszo-conteudos.css` esta a ser carregado (sem erro 404).

## Reversao
Podes restaurar o ficheiro anterior a partir da copia de seguranca ou usar `Discard changes` no GitHub Desktop, **antes de fazer commit**, se esta for a unica alteracao pendente.

## Nota
O pacote e uma correcao CSS; os resultados visuais devem ser confirmados no navegador antes do commit. O ramo `main` e o site publico nao sao alterados.
