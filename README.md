# Near miss materno no Brasil · Dashboard

Dashboard da pesquisa de Tainá dos Santos Rêgo e colaboradores sobre marcadores administrativos de near miss materno nas internações obstétricas financiadas pelo SUS, **2002–2025**.

Endereço de publicação: **https://abnr.github.io/nearmiss-dashboard/**.

O painel mostra o Brasil e as cinco regiões, com contagens, frequências brutas e padronizadas por idade. Inclui perfis etários, análise de sensibilidade ao registro pré-natal, tabela por UF, dados agregados para download e o relatório do Nordeste em PDF. As listas CID identificam marcadores administrativos; não confirmam individualmente os critérios clínicos de near miss. O denominador é internações, não nascidos vivos.

A seção **[Nordeste · 2008–2025](https://abnr.github.io/nearmiss-dashboard/#nordeste)** apresenta mapa do IBGE, barras ordenadas, composição diagnóstica e curvas anuais para os nove estados e o total regional. Os seletores permitem escolher um dos 18 anos ou uma janela próxima aos censos, além de alternar todos os sinais, hipertensão e hemorragias. As escalas são comuns entre estados e permanecem fixas ao mudar o período. O complemento usa residentes de 15–49 anos, internações em qualquer UF e a lista de Rosendo; seus filtros são independentes da análise nacional.

As associações municipais usam 2008–2012 com Censo 2010 e 2020–2024 com Censo 2022; a sensibilidade 2021–2025 utiliza os mesmos indicadores de 2022. Não há uma série socioeconômica anual interpolada. Os novos agregados estão em `downloads/rosendo_ne/extension/`; os resultados históricos originais permanecem em `downloads/rosendo_ne/`. O [relatório de divulgação](downloads/ROSENDO_NORDESTE.pdf) apresenta métodos, resultados e limites. O protocolo da extensão foi registrado antes dos novos cálculos nos commits `04b67fb` e `093d51a` do projeto de análise.

A extensão até 2025 e a comparação entre censos correspondem ao commit `0ac215b` do projeto de análise.

O quadro de [contexto social](https://abnr.github.io/nearmiss-dashboard/#ne-social) destaca os contrastes de saneamento em Alagoas/Piauí e de renda entre estados, com coeficientes e intervalos em tabela expansível. A explicação das [correlações regionais](https://abnr.github.io/nearmiss-dashboard/#correlacoes-regionais) distingue valores anuais e mudanças anuais: nenhuma correlação das mudanças teve q<0,05 após ajuste para múltiplos testes. Os p-valores, intervalos e q-valores estão em `downloads/bivariate.csv`.

A abertura explica o objetivo e resume as três abordagens por 1.000 internações. A seção **Para quem vai divulgar** oferece uma apresentação curta e identifica os períodos de cada análise. As curvas do Nordeste mostram a faixa 2020–2021, sem atribuir um efeito causal à pandemia.

O mapa usa uma cópia local da [malha simplificada do IBGE](https://servicodados.ibge.gov.br/api/v3/malhas/regioes/2?intrarregiao=UF&qualidade=minima&formato=image%2Fsvg%2Bxml), obtida em 19/09/2026. As cores e as barras são calculadas a partir do CSV agregado. Não há consulta externa durante a navegação.

## Publicação no GitHub Pages

A publicação está configurada pela branch `gh-pages`, na raiz. Em **Settings → Pages → Build and deployment**, a origem correspondente é:

- **Source:** Deploy from a branch
- **Branch:** gh-pages
- **Folder:** /(root)

O GitHub publica alterações enviadas a `gh-pages`. A branch `main` mantém os mesmos arquivos de trabalho; o comando abaixo envia a revisão para as duas branches. O arquivo `.nojekyll` está incluído; não é necessário instalar bibliotecas, configurar um build ou executar Python no GitHub.

[Configurações de Pages deste repositório](https://github.com/abnr/nearmiss-dashboard/settings/pages) · [Documentação do GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Visualizar localmente

Na raiz deste repositório:

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000`. Um servidor HTTP permite carregar o JSON dos gráficos corretamente.

## Organização

| Caminho | Conteúdo |
|---|---|
| `index.html` | Página e textos do painel |
| `style.css`, `app.js` | Estilo, filtros, gráficos e tabelas |
| `data.json` | Dados agregados usados nos gráficos |
| `assets/` | Logo do Instituto Santos Dumont e malha simplificada do IBGE |
| `downloads/` | Tabelas CSV, listas CID, proveniência e relatório do Nordeste |
| `.nojekyll` | Publicação direta dos arquivos estáticos |

Não há serviço externo de gráficos, rastreamento, backend ou microdados individuais neste repositório. O site funciona com arquivos estáticos e caminhos relativos, inclusive no endereço de projeto do GitHub Pages.

## Manuscrito ainda não publicado

Por decisão dos autores, o manuscrito e seu material suplementar inédito não ficam disponíveis no site antes da publicação científica. As cópias de trabalho permanecem no projeto de pesquisa. Não copie o manuscrito para `downloads/`; o arquivo foi removido da versão atual e seu nome está no `.gitignore`. Essa retirada não reescreve as versões antigas no histórico Git.

## Atualizar

Os arquivos de publicação são mantidos em `site/` no [projeto de análise](https://github.com/abnr/nearmiss). A versão inicial deste dashboard corresponde ao commit `793d903a0f3bb63eb07f26af495a8437adbaeb33` daquele projeto.

Após uma revisão da análise ou do painel, copie os arquivos de `site/` para esta raiz, preservando este README de publicação. Atualize juntos `data.json`, as tabelas em `downloads/` e o relatório do Nordeste quando houver mudança dos resultados. Depois faça commit na branch `main` e publique essa revisão nas duas branches:

```bash
git push origin main main:gh-pages
```

Esse comando usa atualizações normais, sem forçar sobrescrita do histórico. Se editar arquivos diretamente no GitHub em `main`, sincronize sua cópia local com `git pull --ff-only` antes de executar o comando de publicação. O progresso aparece na aba **Actions**, no fluxo **pages build and deployment**. No projeto de análise, `./run.sh export` prepara os documentos locais, mas copia para o site somente o relatório de divulgação do Nordeste e os agregados públicos previstos; não publica no GitHub. A integração do complemento nordestino ao manuscrito e ao site corresponde ao commit `4e387c1` daquele projeto.

A análise principal inclui 58.376.917 internações em 287 meses comuns às 27 UFs. AP/outubro de 2007 não constava na fonte consultada. Anos incompletos ficam visíveis nas tabelas e como lacunas nas curvas. Os metadados da fonte estão em [downloads/validation.json](downloads/validation.json).

A conferência funcional fica no projeto de análise: `python3 tools/check_site.py`, com Chromium instalado. Verifica os 19 gráficos, combinações de filtros, mapa, 18 anos e três janelas censitárias para três grupos de sinais, ordenação e composição contra os CSVs publicados, unidades, cobertura, logo, downloads e layouts de computador e celular.

## Identidade visual e fontes

A paleta segue o [site do Instituto Santos Dumont](https://institutosantosdumont.org.br/): verde `#3F6B6C`, laranja `#DA8032` e cinza-azulado `#4A5B65`. O logo é uma cópia sem alterações do [arquivo usado no cabeçalho do ISD](https://institutosantosdumont.org.br/wp-content/uploads/2023/05/Logo-ISD_230-1.png); a marca pertence ao Instituto.

Fontes dos dados: Ministério da Saúde / DATASUS / SIH-SUS e IBGE. Os métodos e as limitações estão descritos no [painel](https://abnr.github.io/nearmiss-dashboard/#metodo) e no [relatório do Nordeste](downloads/ROSENDO_NORDESTE.pdf).

A curva total do Nordeste aparece diretamente; as nove curvas estaduais ficam em “Ver a evolução nos nove estados”, para manter a leitura inicial curta. Todas usam os mesmos dados anuais e a mesma escala.
