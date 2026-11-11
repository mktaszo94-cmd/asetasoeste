# ASZO V2 — Fase 10.4 | Parceiros no Pages CMS

## Objetivo
Migrar os sete logótipos existentes para uma lista administrável no Pages CMS e manter o carrossel.

## Antes de instalar
1. No GitHub Desktop, confirma **asetasoeste / desenvolvimento-v2**.
2. Faz **Fetch origin / Pull origin** e confirma que já guardaste a Fase 10.3 revista.
3. Faz cópia de segurança dos ficheiros `.pages.yml`, `index.html` e `en/index.html` fora do repositório.
4. Os ficheiros deste pacote partem da configuração da **Fase 9** e dos HTML da **Fase 10.3 revista**. Se tiveres feito alterações adicionais a estes ficheiros depois disso, compara-as primeiro.

## Instalação
1. Extrai o ZIP.
2. No GitHub Desktop: **Repository → Show in Explorer**.
3. Copia a estrutura do ZIP para a raiz do repositório (o ficheiro `index.html` deve ficar na raiz).
4. Substitui `.pages.yml`, `index.html`, `en/index.html`. Acrescenta `dados/parceiros.json`, `assets/js/aszo-parceiros.js`, `assets/css/aszo-parceiros.css`.
5. **Não substituas** `dados/documentos.json`, `dados/competicoes.json`, `dados/noticias.json`, `dados/eventos.json` nem as imagens existentes.

## Teste local
1. Na raiz do repositório, executa `py -m http.server 8000` (se não existir já um servidor nessa porta).
2. Abre `http://localhost:8000/` e `http://localhost:8000/en/` e faz Ctrl+F5.
3. Confirma os sete logótipos no carrossel, a animação e a pausa ao passar o rato.
4. Testa no telemóvel e verifica se as restantes secções funcionam.
5. Se os logótipos não aparecerem, abre `http://localhost:8000/dados/parceiros.json` e verifica a consola F12.

## Publicação no ramo de desenvolvimento
1. Se os testes locais passaram, faz o commit `ASZO V2 - Fase 10.4 - Parceiros no CMS`.
2. Clica em **Push origin**.
3. Entra em `https://app.pagescms.org/`, seleciona o repositório e o ramo `desenvolvimento-v2`.
4. Confirma a secção **Parceiros (ASZO)** com sete registos. Testa mudar o nome ou a ordem de um parceiro, guarda, e faz **Pull origin** no GitHub Desktop para validar localmente.
5. Não alteres o ramo `main`.

## Como adicionar parceiro
1. No Pages CMS, entra em **Parceiros (ASZO)** e escolhe **Add an item**.
2. Preenche o nome, carrega o logótipo PNG/JPG/WebP, define a ordem (opcional) e a URL HTTPS (opcional).
3. Ativa **Mostrar no website** e guarda.
4. Faz Pull no GitHub Desktop para atualizar o teste local.

## Atenção
Os links dos sete parceiros iniciais ficam vazios porque o website original não tinha URLs verificáveis. O carrossel continua visualmente idêntico. Se editares a configuração `.pages.yml` de forma diferente no CMS desde a Fase 9, não substituas sem comparar para não perder novas coleções.
