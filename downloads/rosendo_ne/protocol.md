# Extensão municipal inspirada em Rosendo: Nordeste, 2008–2012

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
