# Extensão municipal inspirada em Rosendo: Nordeste, 2008–2012

Este arquivo preserva o protocolo histórico de 2008–2012. A emenda ao final estende a série até 2025 e registra as comparações entre censos, motivadas em parte pelos achados históricos.

Protocolo de 19/09/2026, registrado antes da nova extração e das correlações. Complementa o artigo nacional de 2002–2025. Nenhum resultado desta extensão foi usado para escolher estados, períodos ou testes.

## Pergunta e escopo

As associações entre contexto socioeconômico municipal e marcadores administrativos de morbidade materna encontradas no RN se repetem nos demais estados nordestinos? Incluir os nove estados (AL, BA, CE, MA, PB, PE, PI, RN e SE), com resultados por estado e para o Nordeste. A unidade de análise é o município, não a grande região como uma única observação. Este recorte não permite generalizar os resultados às cinco regiões brasileiras.

O período principal será 2008–2012, centrado no Censo 2010 e coincidente com [Rosendo e Roncalli (2016)](https://doi.org/10.1590/1413-81232015211.20802014). Não transportar os indicadores censitários de 2010 para internações de 2025. Uma extensão contemporânea exigiria protocolo e covariáveis compatíveis.

## População, desfechos e território

- AIH normal, identificador válido, sexo feminino conforme codificação usada no projeto, idade de 15–49 anos expressa em anos, alta com sobrevivência/óbito conhecido.
- Diagnóstico principal do capítulo O ou procedimento obstétrico (prefixos SIGTAP 030310, 0310 e 0411). Não exigir inscrição pré-natal.
- Residência em município nordestino identificado por código IBGE; incluir hospitalizações em qualquer UF. Ler as 27 UFs para não perder os deslocamentos entre estados. A sensibilidade restringirá residência e hospitalização à mesma UF.
- Desfechos: lista do Quadro 1 de Rosendo, condições hipertensivas e hemorrágicas, conforme os grupos já conferidos no dicionário. A lista geral exclui os grupos HIV/abdome agudo presentes na lista Waterstone-CID nacional.
- Numerador: internações com sobrevivência e diagnóstico principal na lista. Denominador: todas as internações obstétricas elegíveis, incluindo óbitos. Frequência por 1.000 internações; AIHs não equivalem a mulheres únicas nem a nascidos vivos. Sem confirmação clínica individual.
- Manter a resolução de versões pela última competência observada no acervo 2002–2025; não incluir dados de 2026. Remover repetições idênticas e quantificar conflitos na última competência. O recorte temporal aplica-se depois dessa resolução.
- Exigir cobertura dos 60 meses nas 27 UFs. Falhas de leitura ficarão no manifesto; resultados finais não serão produzidos silenciosamente com cobertura incompleta. Códigos municipais desconhecidos serão quantificados e apresentados separadamente, sem união por nome nem imputação de território.

## Covariáveis e dependência territorial

Reutilizar as definições e APIs oficiais já verificadas: renda domiciliar per capita (SIDRA 3578/2012), analfabetismo de pessoas de 10 anos ou mais (1383/1646) e domicílios com rede geral/pluvial ou fossa séptica (1394/96), todos de 2010. Validar união por código com o universo censitário dos nove estados, sem interpolação. São aproximações aos conceitos de Rosendo; não incluem todas as variáveis assistenciais/PNUD do original.

Obter da [API de localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades) o vínculo com as microrregiões históricas, conferindo cobertura municipal. Para reconhecer dependência entre municípios próximos, apresentar IC95% de Pearson por bootstrap de microrregiões (2.000 reamostragens, semente 20260919), mantendo os municípios de cada bloco juntos. No Nordeste, reamostrar blocos dentro de cada UF. Isso não recria Skater nem elimina a dependência entre blocos; intervalos serão exploratórios, com número de blocos informado. Não substituir por regiões imediatas sem registrar uma alteração de protocolo.

## Análises pré-especificadas

1. Tabela dos nove estados e do Nordeste: municípios, internações, sobreviventes com marcadores, frequências gerais/hipertensivas/hemorrágicas e proporção de internações fora da UF de residência. Não interpretar diferenças como classificação da qualidade dos serviços.
2. Correlações municipais de Pearson e Spearman: três indicadores × três desfechos × dez territórios (90 comparações). Cada município tem peso igual. Informar n, IC95% convencional e por blocos, p convencional e q Benjamini–Hochberg. Ajustar Pearson e Spearman em famílias separadas; p/q convencionais não corrigem dependência espacial.
3. Sensibilidade pré-especificada: apenas municípios com pelo menos 1.000 internações no quinquênio; outra família de 90 testes por método. Informar quantos municípios e internações permanecem, sem remover observações pela magnitude do desfecho.
4. Repetir as análises com hospitalização na própria UF, com famílias separadas, e conferir o recorte RN contra os agregados anteriores. Explicar qualquer divergência antes de interpretar os resultados.
5. Para o Nordeste, apresentar também correlação após centralizar as variáveis nas médias de cada UF, como descrição da relação dentro dos estados; não confundir associação regional agregada com associação dentro de cada estado. Sem regressão multivariável.
6. Figuras: frequências estaduais por desfecho, painel dos coeficientes municipais e dispersões socioeconômicas por estado. Destacar direção, magnitude, heterogeneidade, estabilidade das sensibilidades e incerteza; não procurar apenas significância.

## Entregas e interpretação

Usar Python `.py`, reutilizar leitura, normalização e funções estatísticas existentes, preservar o cache e os resultados nacionais. Acrescentar uma rotina da extensão e um modo no `run.sh`, sem notebooks. Publicar no Git somente tabelas agregadas, figuras, proveniência, relatório de achados e instruções. Os arquivos individuais permanecem locais.

Esta é uma extensão parcial do desenho: municípios, indicadores censitários e bootstrap por microrregião substituem os 63 agrupamentos Skater, covariáveis assistenciais e exclusões do artigo original. Não alegar replicação exata, validação/refutação do estudo de Rosendo ou causalidade. Relacionar os resultados ao artigo original e à análise nacional. O relatório da extensão ficará separado do manuscrito nacional para que o escopo científico adicional esteja explícito.

## Verificação descritiva adicional em 19/09/2026

Após a análise principal, observou-se variação na participação dos marcadores hemorrágicos entre UFs. Será tabulada a composição dos três desfechos por diagnóstico principal para todos os nove estados e para o Nordeste, usando a mesma população. Esta verificação exploratória busca descrever quais códigos compõem as frequências; não altera a lista, não remove municípios/casos e não acrescenta testes de hipótese. Foi registrada antes dessa tabulação adicional.

## Emenda de 19/09/2026: série até 2025 e comparação entre censos

Emenda autorizada após a discussão dos resultados de 2008–2012 e registrada antes da extração de 2013–2025 e dos novos cálculos. A concentração histórica de códigos hemorrágicos em SE/PI motivou parte das perguntas; essas perguntas não são hipóteses formuladas antes de conhecer os dados históricos. O protocolo e os resultados históricos acima permanecem documentados.

### Série descritiva

Estender a mesma população, lista, unidade de análise e resolução de versões para 2008–2025, sem meses de 2026. Ler os 5.832 arquivos das 27 UFs × 216 meses, exigir cobertura completa e registrar erros individualmente. Identificar residentes de todos os nove estados internadas em qualquer UF. Produzir contagens e frequências anuais estaduais e regionais dos três desfechos, composição diagnóstica anual e distribuição por código. Tabular O03.1 e O06.1 em todos os estados e anos, inclusive zeros somente quando houver cobertura completa. Descrever se os perfis históricos persistem, sem selecionar estados ou excluir casos com base nas novas frequências. O denominador continua sendo internações obstétricas elegíveis do SIH; censos não são necessários para essas frequências. Mostrar os anos da pandemia nos gráficos, sem atribuir causalidade a mudanças concomitantes.

### Janelas municipais e indicadores

- Comparação histórica harmonizada: internações de 2008–2012, Censo 2010.
- Comparação recente principal: internações de 2020–2024, Censo 2022. Ambas são janelas de cinco anos centradas no censo.
- Sensibilidade temporal recente: internações de 2021–2025, mesmos indicadores de 2022. Não chamar esses indicadores de medições de 2025; as duas janelas recentes se sobrepõem e não são replicações independentes.
- Não imputar covariáveis censitárias para cada ano, não interpolar uma série anual e não levar o Censo 2010 a 2025. Renda de pesquisas disponíveis somente por UF não será atribuída aos municípios.
- Renda: média domiciliar mensal per capita, com universos compatíveis, SIDRA 3578 (2010) e 10295 (2022). Descrever valores nominais no ano do censo; qualquer comparação de níveis monetários entre censos exigirá deflação explícita. Correlações separadas por período não exigem converter uma constante monetária comum.
- Analfabetismo: pessoas de 15 anos ou mais em ambos os censos. Recalcular 2010 a partir de contagens por idade verificadas na fonte, pois o indicador histórico original era de 10 anos ou mais. Preservar a análise original com 10+; não apresentar as duas como idênticas. Para 2022, SIDRA 9543.
- Esgotamento: porcentagem de domicílios particulares permanentes ocupados com rede geral/pluvial ou fossa séptica; compatibilizar categorias de 2010 (1394) e 2022 (6805), sem somar categorias hierárquicas em duplicidade. Não denominar o indicador tratamento de esgoto.
- Arquivar respostas e metadados oficiais com URLs, datas, hashes, variáveis, categorias e universos. Os dados de renda de 2022 são resultados preliminares da amostra; registrar essa condição. Não preencher covariáveis ausentes com zero.
- Conferir o universo municipal, os códigos completos do IBGE e sua correspondência com os seis dígitos do SIH, a UF e os vínculos com microrregiões. Quantificar códigos não correspondidos. Investigar criações, extinções e mudanças territoriais documentadas; não assumir limites idênticos apenas porque o código é igual. Havendo incompatibilidade identificada, não fazer comparação direta daquele município sem harmonização. As associações de cada época não serão interpretadas como efeito longitudinal individual.

### Análise e apresentação

Reutilizar as correlações bivariadas, o bootstrap de microrregiões (2.000 reamostragens, semente 20260919), a centralização por UF e as sensibilidades de pelo menos 1.000 internações e hospitalização na própria UF. As famílias de 90 comparações serão corrigidas separadamente por método, janela, requisito de contagem e local de hospitalização. Comparar direção, magnitude e intervalos; significância em um período e ausência no outro não demonstram diferença entre coeficientes. Não acrescentar regressão multivariável nem interpretar correlações municipais como risco individual ou confirmação clínica de near miss.

Preservar os resultados originais de 2008–2012 e sua reconciliação com os 167 municípios do RN. Separar os novos resultados por janela, validar somas entre diagnósticos, municípios, UFs e região, e conferir anos compartilhados contra a análise histórica. Registrar emenda adicional antes de qualquer mudança material motivada por indisponibilidade de dados ou problemas de comparabilidade.

No artigo, usar o DOCX autoral atualizado como fonte e preservar as revisões do autor. Acrescentar a evolução anual e a composição diagnóstica; manter tabelas municipais, detalhes dos indicadores e sensibilidades no suplemento. Atualizar o relatório de achados e o dashboard com os novos dados agregados, períodos explícitos e explicações acessíveis. Não disponibilizar o manuscrito nem o material suplementar inédito no site. Manter scripts `.py`, reutilizar a rotina existente e atualizar a sequência de execução no README/`run.sh`.

Fontes dos indicadores de 2022: [renda per capita](https://sidra.ibge.gov.br/tabela/10295), [alfabetização](https://sidra.ibge.gov.br/tabela/9543), [esgotamento sanitário](https://sidra.ibge.gov.br/tabela/6805).

### Conferência das fontes antes das novas correlações

A tabela SIDRA 3324 fornece contagens de pessoas de 15 anos ou mais por alfabetização em 2010; será utilizada para harmonizar a faixa etária, verificando também a categoria sem declaração. O IBGE documenta alterações em limites municipais/distritais nordestinos em [2013](https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/14635-asi-mapas-municipais-estatisticos-em-2013-166-limites-municipais-ou-distritais-foram-alterados), [2014](https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/10117-ibge-disponibiliza-mapas-municipais-para-fins-estatisticos-das-estimativas-populacionais-2014) e outros anos. Portanto, os mesmos códigos não definem um painel de áreas invariantes. As associações serão cortes transversais separados, com indicadores do censo próximo e os códigos de residência registrados no SIH; não serão calculadas diferenças longitudinais por município. As séries anuais comparáveis serão agregadas por UF/região. A ausência de geocodificação dos registros impede redistribuir internações entre polígonos históricos; eventuais desencontros de limites dentro das janelas censitárias serão uma limitação explícita, não uma harmonização territorial presumida.
