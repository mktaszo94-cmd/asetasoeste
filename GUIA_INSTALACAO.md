# ASZO V2 — Fase 12.6 — Gestão dos links das competições no Pages CMS

## Objetivo
Os PDFs e o botão de classificações de cada competição passam a ser editáveis através de **Competições (ASZO)** no Pages CMS. Mantém os sete links já apresentados nas quatro competições de 2026. Não altera o `main`.

## Ficheiros
- `.pages.yml` — campos do CMS para botões PDF e modo da ligação de classificações.
- `assets/js/aszo-competicoes.js` — lê os botões individuais do JSON; permite ocultar o botão das classificações.
- `migrar_ligacoes.py` — converte a associação automática dos PDFs de 2026 para listas editáveis em `dados/competicoes.json`, preservando competições novas e ligações existentes.

**Não copiar um JSON antigo:** o script usa os dados mais recentes da tua pasta local, que podem ter mudado através do CMS.

## Passos (ordem importante)
1. No GitHub Desktop, confirma `asetasoeste` / `desenvolvimento-v2`. Faz Fetch origin e Pull origin; confirma que não existem alterações locais por guardar.
2. Descarrega o ZIP, extrai-o, por exemplo, para `C:\ASZO\Fase12_6`.
3. Em GitHub Desktop: `Repository > Show in Explorer`; escreve `powershell` na barra de endereço. O PowerShell deve abrir na pasta do repositório, onde existe `index.html`.
4. **Simular a migração (não modifica ficheiros):**
   ```powershell
   py "C:\ASZO\Fase12_6\migrar_ligacoes.py" --repo .
   ```
   Se extraíste o ZIP para uma subpasta, ajusta o caminho para encontrar `migrar_ligacoes.py`.
   Esperado com os dados originais de 2026: Masculino 2 PDFs, Feminino 2, Taças 2, Tradicional 1. Se os dados mudaram, os valores podem ser diferentes. Se aparecer ERRO, não avances.
5. **Aplicar a migração (faz backup fora do repositório):**
   ```powershell
   py "C:\ASZO\Fase12_6\migrar_ligacoes.py" --repo . --apply
   ```
   O backup de `competicoes.json` aparece numa pasta `ASZO_backup_ligacoes_...`, ao lado da pasta do repositório.
6. Faz também cópia de segurança de `.pages.yml` e `assets/js/aszo-competicoes.js`, fora do repositório.
7. Copia os novos `.pages.yml` e `assets/js/aszo-competicoes.js` do ZIP para os mesmos caminhos no repositório. **Não copies** o script de migração para a raiz pública do site.
8. No GitHub Desktop, verifica que aparecem apenas estes três ficheiros alterados: `.pages.yml`, `assets/js/aszo-competicoes.js`, `dados/competicoes.json`.
9. Na pasta do repositório, executa `py -m http.server 8000` (se já estiver a correr nessa pasta, reutiliza-o). Abre `http://localhost:8000/`, `http://localhost:8000/en/`, verifica os quatro cartões de 2026, os 7 PDFs, o filtro por época e as classificações.
10. Se tudo estiver correto: Commit `ASZO V2 - Fase 12.6 - Links de competicoes no CMS`, seguido de Push origin. O `main` continua intacto.
11. Abre `https://app.pagescms.org` > ramo `desenvolvimento-v2` > `Competições (ASZO)`. Expande um dos campeonatos.

## Como gerir os links no CMS
- **Botões de PDF desta competição (editáveis)**: adiciona, remove ou reordena documentos; em cada um, define `Nome do documento (PT)`, `Nome (EN)` e `PDF do calendário`.
- **Botão Classificações e resultados**: `Mostrar link geral da plataforma 2K`, `Mostrar link personalizado` ou `Ocultar botão de classificações`.
- **Link personalizado para classificações (HTTPS)**: obrigatório na prática quando escolhes `Mostrar link personalizado`; o website oculta o botão se esse modo estiver selecionado e o URL for inválido ou estiver vazio.
- Os restantes campos (época, estado, descrição, publicado) mantêm-se.
- A biblioteca geral de documentos continua independente: alterar um PDF na biblioteca não atualiza automaticamente uma referência antiga numa competição; substitui a associação também nessa competição quando necessário.

## Teste de publicação
Depois do Push e da atualização do CMS, escolhe uma competição, altera temporariamente o nome de um botão PDF ou define um URL HTTPS válido para classificações; guarda no CMS, sincroniza com Fetch/Pull no GitHub Desktop e atualiza o site local com Ctrl+F5. Confirma os destinos e repõe o conteúdo desejado. Verifica também a versão inglesa e o mobile.

## Recuperação
Antes de fazer Push, podes usar GitHub Desktop > Discard Changes nos três ficheiros para voltar ao último commit, ou recuperar o `competicoes.json` do backup. Depois de fazer Push, usa um novo commit de reversão, em vez de forçar a atualização do ramo.

Não fazer merge para o `main` nesta fase.
