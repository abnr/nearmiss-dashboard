# Near miss materno no Brasil · Dashboard

Dashboard da pesquisa de Tainá dos Santos Rêgo e colaboradores sobre marcadores administrativos de near miss materno nas internações obstétricas financiadas pelo SUS, **2002–2025**.

Endereço de publicação: **https://abnr.github.io/nearmiss-dashboard/**.

O painel mostra o Brasil e as cinco regiões, com contagens, frequências brutas e padronizadas por idade. Inclui perfis etários, análise de sensibilidade ao registro pré-natal, tabela por UF, dados agregados para download e o manuscrito em PDF. As listas CID identificam marcadores administrativos; não confirmam individualmente os critérios clínicos de near miss. O denominador é internações, não nascidos vivos.

A seção **[Análise municipal do Nordeste · 2008–2012](https://abnr.github.io/nearmiss-dashboard/#nordeste)** apresenta mapa interativo do IBGE, barras ordenadas e composição diagnóstica dos nove estados e do total regional, com 3.913.500 internações e 140.519 identificações da lista de Rosendo. Esse complemento usa residentes de 15–49 anos, internações em qualquer UF e indicadores do Censo 2010; seus resultados são fixos e independentes dos filtros nacionais. O [relatório completo](downloads/ROSENDO_NORDESTE.pdf), as tabelas e as figuras suplementares estão em `downloads/rosendo_ne/`.

A abertura explica o objetivo e resume as três abordagens em números por 1.000 internações. A seção **Para quem vai divulgar** oferece uma apresentação curta da pesquisa. No Nordeste, o seletor permite comparar todos os sinais, hipertensão ou hemorragias no mapa e nas barras. O atalho temporal leva à série nacional de 2002–2025, mantendo explícitas as diferenças entre os desenhos. Essa revisão da interface corresponde ao commit `275026b` do projeto de análise.

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
| `downloads/` | Tabelas CSV, listas CID, proveniência e manuscrito PDF |
| `.nojekyll` | Publicação direta dos arquivos estáticos |

Não há serviço externo de gráficos, rastreamento, backend ou microdados individuais neste repositório. O site funciona com arquivos estáticos e caminhos relativos, inclusive no endereço de projeto do GitHub Pages.

## Atualizar

Os arquivos de publicação são mantidos em `site/` no [projeto de análise](https://github.com/abnr/nearmiss). A versão inicial deste dashboard corresponde ao commit `793d903a0f3bb63eb07f26af495a8437adbaeb33` daquele projeto.

Após uma revisão da análise ou do painel, copie os arquivos de `site/` para esta raiz, preservando este README de publicação. Atualize juntos `data.json`, as tabelas em `downloads/` e o PDF quando houver mudança dos resultados. Depois faça commit na branch `main` e publique essa revisão nas duas branches:

```bash
git push origin main main:gh-pages
```

Esse comando usa atualizações normais, sem forçar sobrescrita do histórico. Se editar arquivos diretamente no GitHub em `main`, sincronize sua cópia local com `git pull --ff-only` antes de executar o comando de publicação. O progresso aparece na aba **Actions**, no fluxo **pages build and deployment**. No projeto de análise, `./run.sh export` prepara os PDFs e suplementos locais antes desta cópia; não publica no GitHub. A integração do complemento nordestino ao manuscrito e ao site corresponde ao commit `4e387c1` daquele projeto.

A análise principal inclui 58.376.917 internações em 287 meses comuns às 27 UFs. AP/outubro de 2007 não constava na fonte consultada. Anos incompletos ficam visíveis nas tabelas e como lacunas nas curvas. Os metadados da fonte estão em [downloads/validation.json](downloads/validation.json).

A conferência funcional fica no projeto de análise: `python3 tools/check_site.py`, com Chromium instalado. Verifica os nove gráficos interativos, combinações de filtros, mapa, três grupos de sinais, ordenação das barras e composição do Nordeste contra o CSV publicado, unidades, cobertura, logo, downloads e layouts de computador e celular.

## Identidade visual e fontes

A paleta segue o [site do Instituto Santos Dumont](https://institutosantosdumont.org.br/): verde `#3F6B6C`, laranja `#DA8032` e cinza-azulado `#4A5B65`. O logo é uma cópia sem alterações do [arquivo usado no cabeçalho do ISD](https://institutosantosdumont.org.br/wp-content/uploads/2023/05/Logo-ISD_230-1.png); a marca pertence ao Instituto.

Fontes dos dados: Ministério da Saúde / DATASUS / SIH-SUS e IBGE. O manuscrito, os métodos e as limitações estão disponíveis em [downloads/MANUSCRITO.pdf](downloads/MANUSCRITO.pdf).
