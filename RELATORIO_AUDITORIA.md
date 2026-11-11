# ASZO V2 — Fase 10.6 | Auditoria técnica preliminar
Data: 28/10/2026

## Âmbito e limites
Análise estática de uma cópia reconstruída a partir do pacote completo da Fase 3 e das atualizações entregues até à Fase 10.5 revista. Não é uma cópia atualizada diretamente do repositório GitHub. **Não inclui necessariamente as modificações feitas posteriormente no Pages CMS**, como documentos de teste, o registo Rankings e alterações de conteúdo. Não substitui testes no navegador, revisão de acessibilidade assistida ou testes de produção.

## Verificações automáticas concluídas
- HTML PT/EN: não foram encontradas referências locais a ficheiros inexistentes nem âncoras internas inexistentes nas páginas iniciais.
- HTML PT/EN: nenhum ID duplicado encontrado nas páginas iniciais.
- Sete ficheiros JavaScript analisados com `node --check`: sem erros de sintaxe.
- Cinco ficheiros JSON analisados: estruturas JSON válidas.
- Referências aos PDFs e logótipos do conjunto de dados disponível: sem ficheiros em falta na cópia auditada.
- Links externos `target=_blank` existentes no HTML principal: os analisados incluem `rel=noopener noreferrer`.
- O formulário de Sugestões deixou de constar das páginas iniciais PT/EN reconstruídas.

## Achados e recomendações

### A1 — Sitemap com secções removidas [PRIORIDADE MÉDIA — CONFIRMADO]
`sitemap.xml` aponta para `#links` e `#sugestoes`, áreas removidas. Além disso, inclui âncoras como URLs em vez de páginas próprias. Incluí um `sitemap.xml` revisto, com seis páginas reais PT/EN identificadas nesta cópia. **Confirmar as páginas publicadas antes do deploy.**

### A2 — Descrições alternativas de imagens históricas [PRIORIDADE MÉDIA]
Das 12 tags `<img>` em cada página inicial, 5 pertencem ao carrossel decorativo e usam corretamente `alt=""` com `aria-hidden="true"`. As imagens dos dois eventos históricos não têm atributo `alt` descritivo. Adicionar textos adequados ao conteúdo real das fotografias, ou `alt=""` se forem puramente decorativas.

### A3 — Imagens grandes no carrossel [PRIORIDADE MÉDIA]
`assets/img/Inicio/2.jpg` ~1,2 MB; `4.jpg` ~964 KB; `3.jpg` ~778 KB; `1.jpg` ~682 KB. Recomenda-se produzir versões WebP/AVIF otimizadas e conservar originais como backup. Medir LCP e bytes totais no Lighthouse antes/depois.

### A4 — Metadados SEO e partilha [PRIORIDADE MÉDIA]
As páginas iniciais têm `<title>`, mas não encontrei `meta name="description"`, `canonical` ou metadados Open Graph no HTML reconstruído. Criar descrições específicas PT/EN, canonical correto e cartões de partilha nas redes sociais.

### A5 — Duplicação de estilos e scripts [PRIORIDADE BAIXA/MÉDIA]
A homepage carrega múltiplos CSS de fases sucessivas. Depois de estabilizar o visual, consolidar regras, eliminar CSS sem uso, minificar e testar eventuais regressões. Não apagar scripts de imediato.

### A6 — Classificações e conteúdo no CMS [PRIORIDADE MÉDIA]
O script de competições utiliza uma ligação geral à plataforma 2K quando a competição não tem URL própria. Decidir se as competições sem classificação publicada devem ocultar o botão ou continuar com o acesso geral. Verificar que os estados de 2026 condizem com a realidade.

### A7 — Conteúdo de teste e atualização para produção [PRIORIDADE ALTA]
Os JSON presentes nos pacotes auditados não são necessariamente iguais ao estado mais recente do ramo `desenvolvimento-v2`. Antes de publicar, confirmar e remover/ocultar os conteúdos de teste, verificar todos os caminhos PDF, respetivos campos `publicado`, os logótipos e o registo Rankings. **Não substituir os JSON atuais pelos de um pacote antigo.**

### A8 — Acessibilidade e UX [PRIORIDADE MÉDIA]
Os mecanismos de pausa no carrossel e filtros já foram validados manualmente pelo utilizador. Falta testar navegação apenas por teclado, foco visível, contraste, leitores de ecrã, tamanho dos alvos de toque, estados de erro e respeito por `prefers-reduced-motion` em todos os carrosséis.

### A9 — Segurança e privacidade [PRIORIDADE MÉDIA]
Confirmar permissões GitHub/Pages CMS de escrita, autenticação multifator, acesso de colaboradores, histórico de alterações, política de privacidade e consentimento aplicável ao Google Analytics / Google Maps. Não colocar tokens ou chaves no frontend.

## Ordem recomendada
1. Commit e Push da Fase 10.5 revista para `desenvolvimento-v2`, depois Pull e verificação.
2. Aplicar correção de `sitemap.xml` incluída neste ZIP; testar. Criar commit separado.
3. Rever conteúdos reais no Pages CMS e remover registos de teste.
4. Melhorar `alt`, SEO, imagens e testes de acessibilidade.
5. Testar numa pré-visualização isolada (não em `aszoeste.pt`).
6. Backup do `main`, revisão do diff, merge controlado e validação pós-publicação.

## Aplicar esta correção
- Não substituir o website inteiro.
- Substituir **apenas** o ficheiro `sitemap.xml` na raiz do ramo `desenvolvimento-v2`.
- Testar `http://localhost:8000/sitemap.xml` no servidor local.
- Fazer commit `ASZO V2 - Fase 10.6 - Corrigir sitemap` e Push somente depois da validação.
