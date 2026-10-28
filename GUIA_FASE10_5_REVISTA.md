# ASZO V2 - Fase 10.5 Revista: Sem Sugestões

## Objetivo
Remover integralmente a secção Sugestões/FormSubmit das páginas portuguesa e inglesa, mantendo Contactos, mapa e redes sociais. Sem alterações a JSON, CMS, PDFs ou JavaScript.

## Ficheiros a substituir
- `index.html`
- `en/index.html`
- `assets/css/aszo-fase10-5.css`

## Instalação passo a passo
1. Abre GitHub Desktop e confirma o repositório `asetasoeste` e o ramo `desenvolvimento-v2`.
2. Se houver alterações ainda não guardadas da Fase 10.5, faz primeiro commit e push, ou guarda uma cópia dos ficheiros alterados fora do repositório. Evita fazer Pull se tens alterações locais por resolver.
3. Extrai este ZIP numa pasta temporária.
4. No GitHub Desktop escolhe **Repository > Show in Explorer**.
5. Copia os três ficheiros atuais indicados acima para uma pasta de backup **fora** do repositório.
6. Copia `index.html`, `en/index.html` e a pasta `assets` extraída para a raiz do repositório, aceitando substituir apenas os três ficheiros correspondentes.
7. Abre PowerShell na pasta raiz do repositório e inicia `py -m http.server 8000` (se já estiver em execução na pasta correta, não abras outro).
8. Testa `http://localhost:8000/` e `http://localhost:8000/en/`; pressiona Ctrl+F5.
9. Confirma: não existe Sugestões; os contactos, telefone, email, morada, mapa, Facebook e Instagram mantêm-se; os parceiros e carrosséis continuam presentes.
10. Se tudo estiver correto, faz commit `ASZO V2 - Fase 10.5 Revista - Remover Sugestoes` e **Push origin** apenas para `desenvolvimento-v2`.

**Nota:** As páginas HTML do pacote são baseadas na versão Fase 10.5 fornecida anteriormente. Se fizeste edições adicionais aos HTML desde então, compara antes de sobrescrever.
