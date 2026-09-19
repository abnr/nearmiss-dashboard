'use strict';
const $ = id => document.getElementById(id);
const number = (value, digits = 0) => value == null || !Number.isFinite(Number(value)) ? '—' : Number(value).toLocaleString('pt-BR', {minimumFractionDigits: digits, maximumFractionDigits: digits});
const names = {W: 'Waterstone', M: 'Mantel', OMS: 'OMS'};
const regionNames = ['Brasil', 'Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste'];
const ns = 'http://www.w3.org/2000/svg';
let data;
function node(tag, attributes = {}, text) {
  const el = document.createElementNS(ns, tag);
  for (const [key, value] of Object.entries(attributes)) el.setAttribute(key, value);
  if (text !== undefined) el.textContent = text;
  return el;
}
function canvas(id, title, description, height = 225) {
  const svg = node('svg', {viewBox: `0 0 480 ${height}`, role: 'img', 'aria-labelledby': `${id}-title ${id}-description`});
  svg.append(node('title', {id: `${id}-title`}, title), node('desc', {id: `${id}-description`}, description));
  $(id).replaceChildren(svg);
  return svg;
}
function lineChart(id, points, title, {color = '#3f6b6c', highlight = null, maximum = null, count = false} = {}) {
  const digits = count ? 0 : 2, unit = count ? 'internações com sinais' : 'por 1.000 internações';
  const description = `${unit}. ` + points.map(p => `${p.label}: ${p.value == null ? 'sem ano completo' : number(p.value, digits)}`).join('; ');
  const svg = canvas(id, title, description);
  const left = count ? 65 : 43, right = 458, top = 16, bottom = 188;
  const max = (maximum ?? Math.max(1, ...points.map(p => p.value || 0))) * 1.12;
  const x = i => left + i * (right - left) / Math.max(1, points.length - 1);
  const y = v => bottom - v / max * (bottom - top);
  for (let i = 0; i <= 4; i++) {
    const v = max * i / 4;
    svg.append(node('line', {x1: left, x2: right, y1: y(v), y2: y(v), class: 'axis'}), node('text', {x: left - 8, y: y(v) + 4, 'text-anchor': 'end'}, number(v, count ? 0 : 1)));
  }
  let path = '', active = false;
  points.forEach((p, i) => {
    if (p.value == null) {active = false; return;}
    path += `${active ? 'L' : 'M'}${x(i)},${y(p.value)} `;
    active = true;
  });
  svg.append(node('path', {d: path, fill: 'none', stroke: color, 'stroke-width': 2.5}));
  points.forEach((p, i) => {
    if (points.length <= 8 || i % 4 === 0 || i === points.length - 1) svg.append(node('text', {x: x(i), y: 214, 'text-anchor': 'middle'}, p.label));
    if (p.value != null) {
      const circle = node('circle', {cx: x(i), cy: y(p.value), r: String(p.key) === String(highlight) ? 5 : 2.8, fill: color});
      circle.append(node('title', {}, `${p.label}: ${number(p.value, digits)} ${unit}`));svg.append(circle);
    }
  });
}
function bars(id, points, title, count = false) {
  const digits = count ? 0 : 2, unit = count ? 'internações com sinais' : 'por 1.000 internações';
  const svg = canvas(id, title, `${unit}. ` + points.map(p => `${p.label}: ${p.value == null ? 'indisponível' : number(p.value, digits)}`).join('; '));
  const max = Math.max(1, ...points.map(p => p.value || 0)) * 1.15;
  const step = 180 / points.length;
  points.forEach((p, i) => {
    const y = 15 + i * step;
    svg.append(node('text', {x: 130, y: y + 16, 'text-anchor': 'end'}, p.label));
    if (p.value == null) {svg.append(node('text', {x: 144, y: y + 16}, 'Sem ano completo'));return;}
    const width = (count ? 225 : 260) * p.value / max;
    const bar = node('rect', {x: 142, y, width, height: Math.min(24, step - 10), rx: 3, fill: p.color || '#3f6b6c'});
    bar.append(node('title', {}, `${p.label}: ${number(p.value, digits)} ${unit}`));svg.append(bar);
    svg.append(node('text', {x: 150 + width, y: y + 16}, number(p.value, digits)));
  });
}
function table(id, headers, rows, caption) {
  const table = document.createElement('table');
  const cap = document.createElement('caption');cap.textContent = caption;table.append(cap);
  const head = document.createElement('thead'), headRow = document.createElement('tr');
  headers.forEach(h => {const th = document.createElement('th');th.scope = 'col';th.textContent = h;headRow.append(th);});head.append(headRow);table.append(head);
  const body = document.createElement('tbody');
  rows.forEach(row => {const tr = document.createElement('tr');row.forEach((value, i) => {const cell = document.createElement(i ? 'td' : 'th');if (!i) cell.scope = 'row';cell.textContent = value;tr.append(cell);});body.append(tr);});
  table.append(body);$(id).replaceChildren(table);
}
function render() {
  const criterion = $('criterion').value, region = Number($('region').value), year = $('year').value, measure = $('measure').value;
  const count = measure === 'count';
  const field = count ? criterion : `${criterion}_${measure}`;
  const frequencyField = `${criterion}_${measure === 'standardized' ? 'standardized' : 'per_1000'}`;
  const unit = count ? 'internações com sinais' : measure === 'standardized' ? 'por 1.000 · padronizada por idade' : 'por 1.000 internações';
  const period = year === 'pooled' ? 'Acumulado 2002–2025' : year;
  const regional = (year === 'pooled' ? data.pooled : data.annual.filter(r => r.region_code !== null && r.year === Number(year))).slice().sort((a, b) => a.region_code - b.region_code);
  const complete = row => year === 'pooled' || row.n_months === 12;
  const maximum = Math.max(1, ...data.annual.filter(r => r.region_code !== null && r.n_months === 12).map(r => r[field] || 0));
  $('overview-note').textContent = `${names[criterion]} · ${unit}. Destaques: ${period}. ${year === 'pooled' ? '287 meses comuns às 27 UFs.' : 'Anos incompletos não entram na comparação.'}`;
  for (const row of regional) {
    const code = row.region_code;
    const series = data.annual.filter(r => r.territory === String(code)).sort((a, b) => a.year - b.year);
    $(`value-${code}`).textContent = complete(row) ? number(row[field], count ? 0 : 2) : 'Ano incompleto';
    $(`context-${code}`).textContent = complete(row) ? `${unit} · ${period}${count ? '' : ' · '+number(row[criterion])+' internações com sinais'}` : `${row.n_months} meses disponíveis em ${year}; consulte a tabela.`;
    lineChart(`trend-${code}`, series.map(r => ({key: r.year, label: String(r.year), value: r.n_months === 12 ? r[field] : null})), `${names[criterion]} · ${regionNames[code]} · 2002–2025`, {color: code === 0 ? '#3f6b6c' : '#b65d15', highlight: year, maximum, count});
  }
  $('comparison-note').textContent = `${names[criterion]} · ${unit} · ${period}.`;
  bars('regions', regional.map(r => ({label: regionNames[r.region_code], value: complete(r) ? r[field] : null, color: r.region_code === 0 ? '#3f6b6c' : '#da8032'})), `Brasil e regiões · ${names[criterion]} · ${period}`, count);
  table('overview-table', ['Território', 'Meses', 'Internações', 'Com sinais', 'Bruta / 1.000', 'Padronizada / 1.000'], regional.map(r => [regionNames[r.region_code], r.n_months, number(r.admissions), number(r[criterion]), number(r[criterion+'_per_1000'], 2), number(r[criterion+'_standardized'], 2)]), `${period} · ${names[criterion]}. Valores de períodos incompletos descrevem somente os meses disponíveis, sem estimativa anual.`);
  const pooled = data.pooled.find(r => r.region_code === region);
  const annual = data.annual.filter(r => r.territory === String(region)).sort((a, b) => a.year - b.year);
  const selected = year === 'pooled' ? pooled : annual.find(r => r.year === Number(year));
  $('admissions').textContent = number(selected.admissions);
  $('cases').textContent = number(selected[criterion]);
  $('rate').textContent = number(selected[frequencyField], 2);
  $('period-label').textContent = `${regionNames[region]} · ${year === 'pooled' ? '2002–2025' : year} · ${selected.n_months} meses`;
  $('rate-label').textContent = measure === 'standardized' ? 'Frequência padronizada por 1.000' : 'Frequência bruta por 1.000';
  $('rate-note').textContent = measure === 'standardized' ? 'Mesma distribuição etária para comparação' : names[criterion] + ' · diagnóstico principal';
  $('status').textContent = year === 'pooled' ? `Acumulado em ${data.metadata.coverage_months} meses completos nas 27 UFs. Outubro de 2007 foi excluído do acumulado comparável.` : selected.n_months === 12 ? `Ano completo no território selecionado. ${names[criterion]}.` : `Cobertura parcial: ${selected.n_months} meses. O valor exibido se refere apenas a esses meses; não é uma estimativa anual.`;
  table('annual-table', ['Ano', 'Meses', 'Internações', 'Com sinais', 'Bruta / 1.000', 'Padronizada / 1.000'], annual.map(r => [r.year, r.n_months, number(r.admissions), number(r[criterion]), number(r[criterion + '_per_1000'], 2), number(r[criterion + '_standardized'], 2)]), `${regionNames[region]} · ${names[criterion]}. Valores de anos incompletos se referem somente aos meses disponíveis.`);
  const ages = data.ages.filter(r => r.region_code === region).sort((a, b) => a.age_group - b.age_group);
  lineChart('age', ages.map(r => ({label: `${r.age_group}–${r.age_group + 4}`, value: r.admissions ? 1000 * r[criterion] / r.admissions : null})), `Frequência por faixa etária de ${names[criterion]} em ${regionNames[region]}`, {color: '#b65d15'});
  $('prenatal-sample').textContent = `${regionNames[region]} · ${period} · ${selected.n_months} meses. Sem exigir registro: ${number(selected.admissions)} internações. Exigindo registro: ${number(selected.pn_admissions)} (${number(selected.pn_percent, 1)}% da amostra).`;
  bars('prenatal', [{label: 'Sem exigir registro', value: selected[criterion + '_per_1000']}, {label: 'Exigindo registro', value: selected[criterion + '_pn_per_1000'], color: '#da8032'}], 'Comparação com e sem exigência de inscrição pré-natal');
  $('prenatal-note').textContent = `${names[criterion]} · frequências brutas por 1.000 internações de cada grupo. O grupo sem exigência inclui internações com e sem inscrição pré-natal registrada.`;
  $('state-note').textContent = `Frequências ${measure === 'standardized' ? 'padronizadas por idade' : 'brutas'} por 1.000 internações, com cobertura explícita.`;
  const stateYear = Number($('state-year').value);
  const states = data.annual.filter(r => r.region_code === null && r.year === stateYear).sort((a, b) => a.territory.localeCompare(b.territory));
  table('state-table', ['UF', 'Meses', 'Internações', 'Com sinais', 'Por 1.000'], states.map(r => [r.territory, r.n_months, number(r.admissions), number(r[criterion]), r.n_months === 12 ? number(r[frequencyField], 2) : 'Ano incompleto']), `${names[criterion]} · ${stateYear}. Contagens de anos incompletos abrangem somente os meses disponíveis.`);
}
async function start() {
  for (let year = 2025; year >= 2002; year--) {
    for (const id of ['year', 'state-year']) {const option = document.createElement('option');option.value = year;option.textContent = year;$(id).append(option);}
  }
  try {
    const response = await fetch('./data.json');if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
    if (!data.annual?.length || !data.pooled?.length) throw new Error('Arquivo de dados incompleto');
    const national = data.pooled.find(r=>r.region_code===0);
    for (const key of ['W','M','OMS']) $('quick-'+key).textContent=number(Math.round(1000*national[key]/national.admissions));
    $('coverage-note').textContent = `Foram processados ${number(data.metadata.files_ok)} de ${number(data.metadata.files_expected)} arquivos mensais esperados. Falta AP/outubro de 2007 na fonte consultada. O acumulado comparável inclui ${data.metadata.coverage_months} meses completos em todas as UFs. Arquivos consultados em 16/09/2026; período analisado termina em dezembro de 2025.`;
    for (const id of ['criterion', 'region', 'year', 'measure', 'state-year']) $(id).addEventListener('change', render);
    render();
  } catch (error) {
    for (const id of ['overview-note', 'status']) {
      $(id).textContent = 'Não foi possível carregar os gráficos. Recarregue a página ou baixe as tabelas nos links abaixo.';
      $(id).classList.add('error');
    }
    console.error(error);
  }
}
start();

const stateNames = {AL:'Alagoas', BA:'Bahia', CE:'Ceará', MA:'Maranhão', PB:'Paraíba', PE:'Pernambuco', PI:'Piauí', RN:'Rio Grande do Norte', SE:'Sergipe', NE:'Nordeste'};
const outcomeNames = {W:'Todos os sinais da lista de Rosendo', hypertension:'Sinais relacionados à hipertensão', hemorrhage:'Sinais relacionados a hemorragias'};
let northeast, selectedState = 'NE';
const mapColor = value => '#' + [233,241,241].map((v,i) => Math.round(v + ([23,72,74][i]-v)*value/80).toString(16).padStart(2,'0')).join('');
function northeastReading() {
  const row = northeast.find(r => r.territory === selectedState), outcome = $('ne-outcome').value;
  $('ne-reading').textContent = `${stateNames[selectedState]}: ${number(row[outcome])} internações com ${outcome === 'W' ? 'sinais da lista' : outcome === 'hypertension' ? 'sinais relacionados à hipertensão' : 'sinais relacionados a hemorragias'} entre ${number(row.admissions)} analisadas — ${number(row[outcome+'_per_1000'],2)} por 1.000.`;
  for (const link of $('ne-map').querySelectorAll('a')) link.classList.toggle('selected', link.dataset.uf === selectedState);
}
function renderNortheast() {
  const outcome = $('ne-outcome').value, field = outcome+'_per_1000';
  const ordered = northeast.filter(r => r.territory !== 'NE').sort((a,b) => b[field]-a[field]);
  $('ne-compare-note').textContent = `${outcomeNames[outcome]} · por 1.000 internações · 2008–2012.`;
  $('ne-bars-reading').textContent = `${stateNames[ordered[0].territory]} e ${stateNames[ordered[1].territory]} apresentam as maiores frequências neste grupo. Nordeste: ${number(northeast.find(r=>r.territory==='NE')[field],2)} por 1.000.`;
  const rows = [...ordered, northeast.find(r=>r.territory==='NE')];
  document.querySelector('.ne-bars').innerHTML = rows.map(r=>`<li data-territory="${r.territory}"${r.territory==='NE'?' class="ne-total"':''}><span>${stateNames[r.territory]}</span><span class="ne-track" aria-hidden="true"><span style="width:${r[field]/80*100}%"></span></span><strong>${number(r[field],2)}</strong></li>`).join('');
  $('ne-map-description').textContent = `${outcomeNames[outcome]}, por 1.000 internações em 2008–2012. ` + ordered.map(r=>`${stateNames[r.territory]}: ${number(r[field],2)}`).join('; ');
  for (const link of $('ne-map').querySelectorAll('a')) {
    const row = northeast.find(r => r.territory === link.dataset.uf);
    const description = `${stateNames[row.territory]}: ${number(row[field],2)} por 1.000. Ver contagens.`;
    link.querySelector('use').setAttribute('fill',mapColor(row[field]));
    link.querySelector('title').textContent = description;link.setAttribute('aria-label',description);
  }
  northeastReading();
}
async function startNortheast() {
  try {
    const response = await fetch('downloads/rosendo_ne/state_summary.csv');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // Este resumo tem somente códigos e números, sem campos que contenham vírgulas.
    const lines = (await response.text()).trim().split(/\r?\n/), headers = lines.shift().split(',');
    northeast = lines.map(line=>Object.fromEntries(line.split(',').map((v,i)=>[headers[i],['care','territory'].includes(headers[i])?v:Number(v)]))).filter(r=>r.care==='any_uf');
    // Escala comum de 0–80 para os três grupos deste recorte; novos dados exigem revisar a escala.
    if (northeast.length!==10 || new Set(northeast.map(r=>r.territory)).size!==10 || northeast.some(r=>!stateNames[r.territory] || !(r.admissions>0) || r.hypertension+r.hemorrhage>r.W || ['W','hypertension','hemorrhage'].some(k=>!Number.isFinite(r[k]) || r[k]<0 || !(r[k+'_per_1000']>=0 && r[k+'_per_1000']<=80) || Math.abs(r[k+'_per_1000']-1000*r[k]/r.admissions)>1e-8))) throw new Error('Resumo do Nordeste inválido ou fora da escala');
    $('ne-outcome').disabled = false;$('ne-outcome').addEventListener('change',renderNortheast);
    for (const link of $('ne-map').querySelectorAll('a')) link.addEventListener('click',event=>{event.preventDefault();selectedState=link.dataset.uf;northeastReading();});
    const parts = [{key:'hypertension',name:'Hipertensão e complicações relacionadas'},{key:'hemorrhage',name:'Hemorragias'},{key:'other',name:'Outras condições da lista'}];
    const composition = Object.keys(stateNames).sort((a,b)=>a==='NE'?-1:b==='NE'?1:stateNames[a].localeCompare(stateNames[b],'pt-BR')).map(uf=>{
      const row=northeast.find(r=>r.territory===uf);
      return {...row,other:row.W-row.hypertension-row.hemorrhage};
    });
    $('ne-composition').innerHTML = composition.map(r=>{
      const percentages=parts.map(p=>({...p,value:100*r[p.key]/r.W}));
      const label=stateNames[r.territory]+': '+percentages.map(p=>`${p.name}, ${number(p.value,1)}%`).join('; ');
      return `<li data-territory="${r.territory}"${r.territory==='NE'?' class="ne-total"':''}><span><abbr title="${stateNames[r.territory]}">${r.territory==='NE'?'Nordeste':r.territory}</abbr></span><div class="composition-track" role="img" aria-label="${label}">${percentages.map(p=>`<span class="${p.key}" style="width:${p.value}%" title="${p.name}: ${number(p.value,1)}%">${p.value>=20?number(p.value,1)+'%':''}</span>`).join('')}</div></li>`;
    }).join('');
    table('ne-composition-table',['Território','Com sinais (n)','Hipertensão (%)','Hemorragias (%)','Outras (%)'],composition.map(r=>[stateNames[r.territory],number(r.W),...parts.map(p=>number(100*r[p.key]/r.W,1))]),'Percentuais entre internações com sinais da lista de Rosendo, 2008–2012. Os três grupos somam 100% antes do arredondamento.');
    renderNortheast();
  } catch(error) {
    $('ne-compare-note').textContent='A comparação interativa não carregou. A tabela abaixo e os arquivos para download continuam disponíveis.';
    $('ne-compare-note').classList.add('error');console.error(error);
  }
}
$('ne-time-link').addEventListener('click',()=>{
  if (!data) return;
  $('region').value='2';$('criterion').value='W';$('measure').value='per_1000';$('year').value='pooled';render();
});
startNortheast();
