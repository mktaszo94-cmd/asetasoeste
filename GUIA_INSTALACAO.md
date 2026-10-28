# ASZO V2 — Fase 11: Identidade e páginas institucionais

## O que muda
- Reutiliza o carrossel atual, mas mostra as fotografias a ocupar toda a largura do banner, como no main.
- Mantém os títulos, botões, cinco imagens e comandos do carrossel. Elimina o número decorativo «180».
- Coloca o logótipo oficial à direita e utiliza vermelho, verde, branco e grafite inspirados no logótipo.
- Reduz espaçamentos verticais e a altura dos cartões da página inicial.
- Moderniza as páginas Sobre e Órgãos Sociais em português e inglês. Os nomes, cargos e textos das páginas secundárias foram preservados.
- Não modifica Pages CMS, JSON, PDFs, JavaScript nem o ramo main.

## Instalação passo a passo
1. GitHub Desktop → repositório asetasoeste → ramo desenvolvimento-v2. Execute Fetch/Pull e confirme ausência de alterações pendentes.
2. Faça um backup dos seis ficheiros HTML da atualização fora do repositório.
3. Extraia o ZIP da Fase 11. Copie os ficheiros mantendo as pastas e substituindo apenas os seis HTML; adicione assets/css/aszo-identidade.css.
4. Em GitHub Desktop confirme sete ficheiros novos/alterados. Não faça commit ainda.
5. Na pasta do repositório, abra PowerShell e execute `py -m http.server 8000`. Abra http://localhost:8000 e http://localhost:8000/en/.
6. Confirme: fotografias ocupam todo o banner; não há «180»; setas/dots/pausa; os dois botões; logótipo à direita; todas as secções continuam funcionais.
7. Abra http://localhost:8000/sobre.html, http://localhost:8000/orgaos-sociais.html e equivalentes /en/about.html e /en/board.html. Compare os nomes e cargos com o original e teste navegação mobile.
8. Após validação crie o commit `ASZO V2 - Fase 11 - Identidade e paginas institucionais` e Push origin em desenvolvimento-v2. Não faça merge para main.

## Notas
O logótipo e as fotos são ficheiros originais já existentes em assets/img. As cores foram aproximadas visualmente a partir do logótipo, não são valores oficiais documentados. O website público continua inalterado.
A página Órgãos Sociais contém um cargo indicado como «Demitiu-se» no original; preservou-se a informação, mas confirme-a antes da produção.
