# ASZO V2 - Fase 12.5: noticias e eventos mais compactos

Esta atualizacao altera apenas o CSS. Inclui integralmente as correcoes das Fases 12.2, 12.3 e 12.4, incluindo a janela para ampliar imagens.

## Instalacao

1. No GitHub Desktop, confirma `asetasoeste` e o ramo `desenvolvimento-v2`.
2. Abre **Repository > Show in Explorer**.
3. Guarda copia de `assets/css/aszo-conteudos.css` fora do repositorio.
4. Extrai este ZIP e copia o ficheiro `assets/css/aszo-conteudos.css` para a mesma pasta no repositorio, substituindo o ficheiro atual.
5. No PowerShell, dentro da pasta do repositorio, executa `py -m http.server 8000` se ainda nao estiver a correr.
6. Abre `http://localhost:8000/` e atualiza com **Ctrl + F5**; testa tambem `http://localhost:8000/en/`.
7. Confirma que os cartazes nao sao cortados, que os cartoes estao mais baixos e que clicar na imagem abre a ampliacao. Testa no telemovel.
8. Apenas depois da validacao, faz commit `ASZO V2 - Fase 12.5 - Cartoes compactos` e **Push origin**.

## Notas

- A imagem no cartao e apresentada com `object-fit: contain`, sem corte. Dependendo das proporcoes, podera haver espaco vazio nas laterais.
- No computador a area de imagem fica limitada a 240px de altura; no telemovel a 210px.
- Nenhum ficheiro HTML, JS, JSON, PDF ou configuracao do Pages CMS e alterado.
- Se alteraste manualmente este CSS depois da Fase 12.4, compara antes de substituir.
