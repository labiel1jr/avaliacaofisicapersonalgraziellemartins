/* =======================================================================
   1. MODELO DE DADOS
   ======================================================================= */
const MEASURES = [
  {k:'peso',         label:'Peso',                unit:'kg', dir:'down', group:'Peso corporal', step:0.1},
  {k:'pescoco',      label:'Pescoço',             unit:'cm', dir:'flat', group:'Tronco'},
  {k:'ombros',       label:'Ombros',              unit:'cm', dir:'up',   group:'Tronco'},
  {k:'torax',        label:'Tórax',               unit:'cm', dir:'flat', group:'Tronco'},
  {k:'busto',        label:'Busto',               unit:'cm', dir:'flat', group:'Tronco'},
  {k:'abdomen',      label:'Abdômen',             unit:'cm', dir:'down', group:'Tronco'},
  {k:'cintura',      label:'Cintura',             unit:'cm', dir:'down', group:'Tronco'},
  {k:'quadril',      label:'Quadril',             unit:'cm', dir:'flat', group:'Tronco'},
  {k:'bracoD',       label:'Braço direito',       unit:'cm', dir:'up',   group:'Membros superiores'},
  {k:'bracoE',       label:'Braço esquerdo',      unit:'cm', dir:'up',   group:'Membros superiores'},
  {k:'antebraco',    label:'Antebraço',           unit:'cm', dir:'up',   group:'Membros superiores'},
  {k:'coxaD',        label:'Coxa direita',        unit:'cm', dir:'up',   group:'Membros inferiores'},
  {k:'coxaE',        label:'Coxa esquerda',       unit:'cm', dir:'up',   group:'Membros inferiores'},
  {k:'panturrilhaD', label:'Panturrilha direita', unit:'cm', dir:'up',   group:'Membros inferiores'},
  {k:'panturrilhaE', label:'Panturrilha esquerda',unit:'cm', dir:'up',   group:'Membros inferiores'},
  {k:'dcTriceps',     label:'Tricipital',          unit:'mm', dir:'down', group:'Dobras cutâneas'},
  {k:'dcSubescapular',label:'Subescapular',        unit:'mm', dir:'down', group:'Dobras cutâneas'},
  {k:'dcSuprailiaca', label:'Suprailíaca',         unit:'mm', dir:'down', group:'Dobras cutâneas'},
  {k:'dcAbdominal',   label:'Abdominal',           unit:'mm', dir:'down', group:'Dobras cutâneas'},
  {k:'dcCoxa',        label:'Coxa',                unit:'mm', dir:'down', group:'Dobras cutâneas'},
  {k:'diamPunho',     label:'Punho (biestiloide)', unit:'cm', dir:'flat', group:'Diâmetros ósseos', step:0.1},
  {k:'diamFemur',     label:'Fêmur (biepicondiliano)', unit:'cm', dir:'flat', group:'Diâmetros ósseos', step:0.1}
];
const SKINFOLD_KEYS = ['dcTriceps','dcSubescapular','dcSuprailiaca','dcAbdominal'];
const JP3F_KEYS = ['dcTriceps','dcSuprailiaca','dcCoxa'];
const MUSCLE_KEYS = ['ombros','torax','bracoD','bracoE','antebraco','coxaD','coxaE','panturrilhaD','panturrilhaE'];
const AVAL_KEYS = ['av1','av2','av3','av4','av5','av6'];
const AVAL_LABELS = { av1:'1ª avaliação', av2:'2ª avaliação', av3:'3ª avaliação', av4:'4ª avaliação', av5:'5ª avaliação', av6:'6ª avaliação' };
/* Cores dos corpos 3D: 1ª vermelha, 2ª laranja, 3ª roxa, 4ª amarela, 5ª azul, 6ª verde */
const AVAL_COLORS = { av1:'#E0463C', av2:'#F08A2E', av3:'#9A55CC', av4:'#E8C53A', av5:'#3F8FE0', av6:'#3DB56E' };
const OBJETIVOS = [
  'Emagrecer','Perder gordura abdominal','Reduzir o percentual de gordura','Definir o corpo',
  'Ganhar massa muscular','Diminuir medidas','Tonificar os músculos','Melhorar o condicionamento físico',
  'Aumentar a força','Melhorar a resistência','Melhorar a aparência física','Melhorar a autoestima',
  'Ter mais disposição e energia','Melhorar a saúde e qualidade de vida','Manter o peso depois de emagrecer'
];
const STORE_KEY = 'avaliacao-fisica:v1';

/* Anamnese — foco em Educação Física */
const PARQ = [
  'Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionada por profissionais de saúde?',
  'Você sente dores no peito quando pratica atividade física?',
  'No último mês, você sentiu dores no peito quando praticou atividade física?',
  'Você apresenta desequilíbrio devido a tontura e/ou perda de consciência?',
  'Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?',
  'Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?',
  'Sabe de alguma outra razão pela qual você não deve praticar atividade física?'
];
const NENHUMA_COND = 'Nenhuma condição relatada';
const CONDICOES = [
  NENHUMA_COND,'Hipertensão arterial','Diabetes','Colesterol ou triglicerídeos elevados','Doença cardíaca',
  'Asma ou doença respiratória','Problemas de coluna','Hérnia de disco','Lesões articulares (joelho, ombro, tornozelo…)',
  'Osteoporose ou osteopenia','Labirintite ou tonturas','Alterações da tireoide','Ansiedade ou depressão','Gestação atual'
];
const ANAM_SECTIONS = [
  {title:'Histórico de saúde', fields:[
    {k:'condicoes', label:'Condições de saúde diagnosticadas', type:'checks', options:CONDICOES},
    {k:'medicamentos', label:'Medicamentos em uso', type:'textarea', ph:'Nome, dose e finalidade'},
    {k:'cirurgias', label:'Cirurgias', ph:'Tipo e ano'},
    {k:'lesoes', label:'Lesões ou dores atuais', ph:'Local, intensidade, quando piora'},
    {k:'restricoes', label:'Restrições médicas para exercícios', ph:'Ex.: evitar impacto'},
    {k:'historicoFamiliar', label:'Histórico familiar', ph:'Doença cardíaca, diabetes, hipertensão…'},
    {k:'paRepouso', label:'Pressão arterial em repouso', unit:'mmHg', ph:'120/80'},
    {k:'fcRepouso', label:'FC de repouso', type:'number', unit:'bpm'}
  ]},
  {title:'Atividade física', fields:[
    {k:'nivel', label:'Nível atual', type:'select', options:['Sedentário','Iniciante','Intermediário','Avançado']},
    {k:'praticaAtual', label:'Modalidades praticadas atualmente', ph:'Musculação, corrida, natação…'},
    {k:'freqSemanal', label:'Frequência atual', type:'select', options:['0','1','2','3','4','5','6','7'], unit:'dias/semana'},
    {k:'duracao', label:'Duração média da sessão', type:'number', unit:'min'},
    {k:'tempoPratica', label:'Tempo de prática ou tempo parado', ph:'Ex.: treina há 2 anos / parado há 6 meses'},
    {k:'experienciaMusc', label:'Experiência com musculação', type:'select', options:['Nenhuma','Menos de 6 meses','De 6 meses a 2 anos','Mais de 2 anos']},
    {k:'historicoEsportivo', label:'Histórico esportivo', type:'textarea', ph:'Esportes já praticados, competições, lesões esportivas'}
  ]},
  {title:'Hábitos de vida', fields:[
    {k:'sonoHoras', label:'Horas de sono por noite', type:'number', unit:'h', step:0.5},
    {k:'sonoQualidade', label:'Qualidade do sono', type:'select', options:['Ruim','Regular','Boa']},
    {k:'tabagismo', label:'Tabagismo', type:'select', options:['Não fuma','Fumante','Ex-fumante']},
    {k:'alcool', label:'Bebida alcoólica', type:'select', options:['Não consome','Socialmente','Frequentemente']},
    {k:'alimentacao', label:'Alimentação', type:'select', options:['Ruim','Regular','Boa']},
    {k:'nutricionista', label:'Acompanhamento nutricional', type:'select', options:['Sim','Não']},
    {k:'agua', label:'Ingestão de água', type:'number', unit:'L/dia', step:0.1},
    {k:'estresse', label:'Nível de estresse', type:'select', options:['Baixo','Moderado','Alto']},
    {k:'ocupacao', label:'Rotina de trabalho', type:'select', options:['Predominantemente sentado','Predominantemente em pé','Fisicamente ativa']}
  ]},
  {title:'Disponibilidade e preferências', fields:[
    {k:'diasDisponiveis', label:'Dias disponíveis para treinar', type:'select', options:['1','2','3','4','5','6','7'], unit:'dias/semana'},
    {k:'tempoSessao', label:'Tempo disponível por sessão', type:'number', unit:'min'},
    {k:'horario', label:'Horário preferido', type:'select', options:['Manhã','Tarde','Noite','Variável']},
    {k:'local', label:'Local de treino', type:'select', options:['Academia','Em casa','Ao ar livre','Estúdio / personal']},
    {k:'gosta', label:'Atividades de que gosta', ph:'Ex.: bike, treino funcional'},
    {k:'naoGosta', label:'Atividades que evita ou não gosta', ph:'Ex.: corrida'},
    {k:'observacoes', label:'Observações gerais', type:'textarea'}
  ]}
];
function blankAnamnese(){
  const o={};
  PARQ.forEach((q,i)=>o['parq'+(i+1)]='');
  ANAM_SECTIONS.forEach(sec=>sec.fields.forEach(f=>o[f.k] = f.type==='checks' ? [] : ''));
  return o;
}
function blankData(){
  return { versao:4, aluno:{nome:'',sexo:'',nascimento:'',idade:'',altura:'',objetivos:[],profissional:''}, anamnese:blankAnamnese(),
    av1:blankAval(), av2:blankAval(), av3:blankAval(), av4:blankAval(), av5:blankAval(), av6:blankAval() };
}
function anamHasData(an){
  return !!an && Object.values(an).some(v=>Array.isArray(v) ? v.length>0 : String(v??'').trim()!=='');
}
/* PAR-Q: 'pos' (alguma resposta Sim), 'neg' (todas Não), 'inc' (parcial) ou null (não respondido) */
function parqStatus(an){
  const r = PARQ.map((q,i)=>an ? an['parq'+(i+1)] : '');
  const yes = r.map((v,i)=>v==='S'?i:-1).filter(i=>i>=0);
  if(yes.length) return {st:'pos', yes};
  if(r.every(v=>v==='N')) return {st:'neg', yes};
  if(r.some(v=>v==='N')) return {st:'inc', yes};
  return null;
}
function blankAval(){ const o={data:''}; MEASURES.forEach(m=>o[m.k]=''); return o; }
let data = blankData();
function avalHasData(av){
  return !!(av && (av.data || MEASURES.some(m=>num(av[m.k])!==null)));
}
function filledAvalKeys(){
  return AVAL_KEYS.filter(k=>avalHasData(data[k]));
}

/* =======================================================================
   2. UTILITÁRIOS
   ======================================================================= */
const $  = s=>document.querySelector(s);
const $$ = s=>Array.from(document.querySelectorAll(s));
const MINUS = '\u2212';

function num(v){
  if(v===null||v===undefined) return null;
  const s = String(v).trim().replace(',','.');
  if(s==='') return null;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}
/* Corrige o engano comum de digitar a altura em metros (ex.: "1.65") em um campo que
   espera centímetros. Qualquer valor plausível de metros (0 < v <= 3) é convertido para cm. */
function normalizeAltura(v){
  const n = num(v);
  if(n===null || n<=0) return v;
  if(n<=3) return String(Math.round(n*1000)/10); // 1.65 -> 165 (mantém 1 casa decimal)
  return v;
}
function fmt(n,d=1){
  if(n===null||n===undefined||!Number.isFinite(n)) return '—';
  return n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
}
function fmtDelta(n,d=1){
  if(n===null||!Number.isFinite(n)) return '—';
  if(Math.abs(n) < 0.05) return '0,0';
  return (n>0?'+':MINUS) + fmt(Math.abs(n),d);
}
function brDate(iso){
  if(!iso) return '—';
  const p = String(iso).split('-');
  if(p.length!==3) return iso;
  return p[2]+'/'+p[1]+'/'+p[0];
}
function daysBetween(a,b){
  if(!a||!b) return null;
  const d1=new Date(a+'T12:00:00'), d2=new Date(b+'T12:00:00');
  if(isNaN(d1)||isNaN(d2)) return null;
  return Math.round((d2-d1)/86400000);
}
function humanPeriod(days){
  if(days===null) return '—';
  const m = days/30.44;
  if(days < 31) return days+' dia'+(days===1?'':'s');
  if(m < 12) return fmt(m,1).replace(',0','')+' meses ('+days+' dias)';
  return fmt(m/12,1)+' anos ('+days+' dias)';
}
function toast(msg){
  const t=$('#toast'); t.textContent=msg; t.classList.add('on');
  clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove('on'),3200);
}
function esc(s){ return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

/* =======================================================================
   3. CÁLCULOS
   ======================================================================= */
function imc(peso,alturaCm){
  if(!peso||!alturaCm) return null;
  const h = alturaCm/100;
  return peso/(h*h);
}
function classImc(v){
  if(v===null) return null;
  if(v<18.5) return {t:'Abaixo do peso', c:'o'};
  if(v<25)   return {t:'Peso normal',    c:'g'};
  if(v<30)   return {t:'Sobrepeso',      c:'o'};
  if(v<35)   return {t:'Obesidade grau I', c:'r'};
  if(v<40)   return {t:'Obesidade grau II',c:'r'};
  return {t:'Obesidade grau III', c:'r'};
}
function rcq(cintura,quadril){
  if(!cintura||!quadril) return null;
  return cintura/quadril;
}
function classRcq(v,sexo){
  if(v===null) return null;
  if(sexo==='M'){
    if(v<0.90) return {t:'Risco baixo', c:'g'};
    if(v<1.00) return {t:'Risco moderado', c:'o'};
    return {t:'Risco alto', c:'r'};
  }
  if(sexo==='F'){
    if(v<0.80) return {t:'Risco baixo', c:'g'};
    if(v<0.85) return {t:'Risco moderado', c:'o'};
    return {t:'Risco alto', c:'r'};
  }
  return {t:'Sexo não informado — classificação indisponível', c:'b'};
}
/* Percentual de gordura — método da Marinha dos EUA (fórmula métrica) */
function navyBf(a, sexo, alturaCm){
  const pesc=num(a.pescoco), cint=num(a.cintura), quad=num(a.quadril);
  if(!alturaCm || !sexo || !pesc || !cint) return {v:null, why:'faltam pescoço, cintura, altura ou sexo'};
  if(sexo==='M'){
    const x = cint - pesc;
    if(x<=0) return {v:null, why:'cintura menor ou igual ao pescoço (verificar medidas)'};
    const v = 495/(1.0324 - 0.19077*Math.log10(x) + 0.15456*Math.log10(alturaCm)) - 450;
    return {v: clamp(v,2,70), why:null};
  }
  if(!quad) return {v:null, why:'para o sexo feminino a fórmula exige também o quadril'};
  const x = cint + quad - pesc;
  if(x<=0) return {v:null, why:'valores incompatíveis entre cintura, quadril e pescoço'};
  const v = 495/(1.29579 - 0.35004*Math.log10(x) + 0.22100*Math.log10(alturaCm)) - 450;
  return {v: clamp(v,4,70), why:null};
}
/* Percentual de gordura — Faulkner (1968): %G = 0,153 × (TR + SE + SI + AB) + 5,783 */
function faulknerBf(a){
  const dobras = SKINFOLD_KEYS.map(k=>num(a[k]));
  if(dobras.every(v=>v===null)) return null;
  if(dobras.some(v=>v===null)) return {v:null, why:'Faulkner exige as 4 dobras (tricipital, subescapular, suprailíaca e abdominal)'};
  const soma = dobras.reduce((s,v)=>s+v,0);
  return {v: clamp(0.153*soma + 5.783, 2, 70), why:null};
}
/* Percentual de gordura — Jackson, Pollock & Ward (1980), 3 dobras para mulheres (TR + SI + coxa) + Siri (1961):
   D = 1,0994921 − 0,0009929·S + 0,0000023·S² − 0,0001392·idade;  %G = 495/D − 450 */
function jp3FemBf(a, idade){
  const dobras = JP3F_KEYS.map(k=>num(a[k]));
  if(num(a.dcCoxa)===null) return null;
  if(dobras.some(v=>v===null)) return {v:null, why:'Jackson & Pollock exige as dobras tricipital, suprailíaca e da coxa'};
  if(!idade) return {v:null, why:'Jackson & Pollock exige a idade (ou a data de nascimento)'};
  const S = dobras.reduce((s,v)=>s+v,0);
  const D = 1.0994921 - 0.0009929*S + 0.0000023*S*S - 0.0001392*idade;
  return {v: clamp(495/D - 450, 4, 70), why:null};
}
/* Fracionamento em 4 componentes (Carnaval, 2000):
   massa óssea — Von Döbeln modificada por Rocha (1975): MO = 3,02 × (H² × R × F × 400)^0,712
     (H = estatura, R = diâmetro biestiloide, F = diâmetro biepicondiliano do fêmur, todos em metros);
   massa residual — Würch (1974): 24,1% do peso (homens) ou 20,9% (mulheres);
   massa muscular — Matiegka: peso − (gorda + óssea + residual). */
function boneMass(a, alturaCm){
  const r=num(a.diamPunho), f=num(a.diamFemur);
  if(!alturaCm || !r || !f) return null;
  const h=alturaCm/100;
  return 3.02*Math.pow(h*h*(r/100)*(f/100)*400, 0.712);
}
function residualMass(peso, sexo){
  if(!peso || !sexo) return null;
  return peso*(sexo==='M' ? 0.241 : 0.209);
}
function classBf(v,sexo){
  if(v===null||!sexo) return null;
  const T = sexo==='M' ? [6,14,18,25] : [14,21,25,32];
  if(v<T[0]) return {t:'Muito baixo', c:'o'};
  if(v<T[1]) return {t:'Atlético', c:'g'};
  if(v<T[2]) return {t:'Bom', c:'g'};
  if(v<T[3]) return {t:'Aceitável', c:'o'};
  return {t:'Elevado', c:'r'};
}
function riskWaist(cintura,sexo){
  if(!cintura||!sexo) return null;
  const T = sexo==='M' ? [94,102] : [80,88];
  if(cintura < T[0]) return {t:'Cintura em faixa desejável', c:'g', lvl:0};
  if(cintura < T[1]) return {t:'Cintura com risco aumentado', c:'o', lvl:1};
  return {t:'Cintura com risco muito aumentado', c:'r', lvl:2};
}

/* Deriva todos os indicadores de uma avaliação */
function derive(a, aluno){
  const alturaCm = num(aluno.altura), sexo = aluno.sexo;
  const peso = num(a.peso);
  const i = imc(peso, alturaCm);
  const r = rcq(num(a.cintura), num(a.quadril));
  /* Prioridade: Jackson & Pollock 3 dobras (mulheres) → Faulkner (4 dobras) → Marinha dos EUA.
     A idade usada é a da data da avaliação (ou a idade informada, sem data de nascimento). */
  const idade = calcIdade(aluno.nascimento, a.data) ?? num(aluno.idade);
  const jp = sexo==='F' ? jp3FemBf(a, idade) : null;
  const fk = faulknerBf(a);
  const nv = navyBf(a, sexo, alturaCm);
  const bf = [jp, fk, nv].find(m=>m && m.v!==null) || jp || fk || nv;
  const bfMethod = bf.v===null ? null : (bf===jp ? 'Jackson & Pollock' : (bf===fk ? 'Faulkner' : 'Marinha dos EUA'));
  const mg = (peso && bf.v!==null) ? peso*bf.v/100 : null;
  const mm = (peso && mg!==null) ? peso-mg : null;
  const mo = boneMass(a, alturaCm), mr = residualMass(peso, sexo);
  let mmu = null;
  if(mg!==null && mo!==null && mr!==null){
    mmu = peso-(mg+mo+mr);
    if(mmu<=0) mmu = null;
  }
  return {
    peso, imc:i, imcClass:classImc(i), rcq:r, rcqClass:classRcq(r,sexo),
    bf:bf.v, bfWhy:bf.why, bfClass:classBf(bf.v,sexo), bfMethod, mg, mm,
    mo, mr, mmu,
    waist:riskWaist(num(a.cintura), sexo)
  };
}

/* =======================================================================
   4. ANÁLISE COMPARATIVA
   ======================================================================= */
function analyze(){
  const A = data.aluno;
  const filled = filledAvalKeys();
  const baseKey = filled.length ? filled[0] : 'av1';
  const curKey = filled.length ? filled[filled.length-1] : 'av1';
  const a1 = data[baseKey], a2 = data[curKey];
  const d1 = derive(a1,A), d2 = derive(a2,A);
  const days = daysBetween(a1.data, a2.data);
  const months = days ? days/30.44 : null;

  const delta = {};
  MEASURES.forEach(m=>{
    const v1=num(a1[m.k]), v2=num(a2[m.k]);
    delta[m.k] = (v1!==null && v2!==null) ? v2-v1 : null;
  });
  ['imc','rcq','bf','mg','mm','mo','mr','mmu'].forEach(k=>{
    delta[k] = (d1[k]!==null && d1[k]!==undefined && d2[k]!==null && d2[k]!==undefined) ? d2[k]-d1[k] : null;
  });

  const pos=[], att=[], obs=[], rec=[];
  const dPeso=delta.peso, dCint=delta.cintura, dAbd=delta.abdomen,
        dBf=delta.bf, dMg=delta.mg, dMm=delta.mm, dImc=delta.imc, dRcq=delta.rcq;

  /* --- pontos positivos --- */
  if(dCint!==null && dCint<=-1) pos.push('Redução de '+fmt(Math.abs(dCint),1)+' cm na cintura');
  if(dAbd!==null && dAbd<=-1) pos.push('Redução de '+fmt(Math.abs(dAbd),1)+' cm no abdômen');
  if(dBf!==null && dBf<=-0.5) pos.push('Queda de '+fmt(Math.abs(dBf),1)+' pontos no percentual de gordura');
  if(dMg!==null && dMg<=-0.5) pos.push('Perda de '+fmt(Math.abs(dMg),1)+' kg de massa gorda');
  if(dMm!==null && dMm>=0.3) pos.push('Ganho de '+fmt(dMm,1)+' kg de massa magra');
  if(dMm!==null && dMm>-0.3 && dMm<0.3 && dMg!==null && dMg<=-0.5) pos.push('Massa magra preservada durante a perda de gordura');
  if(dImc!==null && dImc<=-0.3 && d1.imc>24.9) pos.push('Melhora do IMC ('+fmt(d1.imc,1)+' → '+fmt(d2.imc,1)+')');
  if(dRcq!==null && dRcq<=-0.01) pos.push('Redução da relação cintura-quadril');
  if(d2.rcqClass && d1.rcqClass && d2.rcqClass.t!==d1.rcqClass.t && dRcq!==null && dRcq<0)
    pos.push('Mudança de faixa de risco no RCQ: '+d1.rcqClass.t.toLowerCase()+' → '+d2.rcqClass.t.toLowerCase());
  const gains = MUSCLE_KEYS.filter(k=>delta[k]!==null && delta[k]>=0.5);
  if(gains.length) pos.push('Aumento de circunferência muscular em: '+gains.map(k=>MEASURES.find(m=>m.k===k).label.toLowerCase()).join(', '));
  if(dPeso!==null && dPeso<=-0.5 && (dMm===null||dMm>=-0.3)) pos.push('Redução de '+fmt(Math.abs(dPeso),1)+' kg de peso corporal');

  /* --- pontos de atenção --- */
  if(dCint!==null && dCint>=1) att.push('Aumento de '+fmt(dCint,1)+' cm na cintura');
  if(dAbd!==null && dAbd>=1) att.push('Aumento de '+fmt(dAbd,1)+' cm no abdômen');
  if(dBf!==null && dBf>=0.5) att.push('Elevação de '+fmt(dBf,1)+' pontos no percentual de gordura');
  if(dMg!==null && dMg>=0.5) att.push('Ganho de '+fmt(dMg,1)+' kg de massa gorda');
  if(dMm!==null && dMm<=-0.5) att.push('Perda de '+fmt(Math.abs(dMm),1)+' kg de massa magra');
  if(dRcq!==null && dRcq>=0.01) att.push('Aumento da relação cintura-quadril');
  if(d2.waist && d2.waist.lvl>0) att.push(d2.waist.t.replace('Cintura com','Cintura atual com'));
  if(dPeso!==null && dCint!==null && dPeso<=-1 && dCint>=1) att.push('Perda de peso acompanhada de aumento de cintura — medidas inconsistentes');
  const asymArm = (delta.bracoD!==null && delta.bracoE!==null) ? Math.abs(delta.bracoD-delta.bracoE) : null;
  const asymLeg = (delta.coxaD!==null && delta.coxaE!==null) ? Math.abs(delta.coxaD-delta.coxaE) : null;
  if(asymArm!==null && asymArm>=1.5) att.push('Evolução assimétrica entre os braços ('+fmt(asymArm,1)+' cm de diferença na variação)');
  if(asymLeg!==null && asymLeg>=2) att.push('Evolução assimétrica entre as coxas ('+fmt(asymLeg,1)+' cm de diferença na variação)');
  if(d1.bfWhy && d2.bfWhy) att.push('Percentual de gordura não pôde ser calculado: '+d2.bfWhy);

  /* --- interpretação técnica --- */
  const P=[];
  const nome = A.nome ? A.nome.split(' ')[0] : 'O aluno';
  if(days!==null){
    P.push('No intervalo de '+humanPeriod(days)+' entre as avaliações, '+nome+
      (dPeso!==null ? ' apresentou variação de peso de '+fmtDelta(dPeso,1)+' kg' : ' foi reavaliado')+
      (dBf!==null ? ' e variação de '+fmtDelta(dBf,1)+' ponto percentual na gordura corporal estimada.' : '.'));
  }
  if(dMg!==null && dMm!==null){
    if(dMg<=-0.4 && dMm>=0.2){
      P.push('O quadro é de recomposição corporal: houve redução de massa gorda ('+fmtDelta(dMg,1)+' kg) com ganho simultâneo de massa magra ('+fmtDelta(dMm,1)+' kg). Esse é o cenário mais favorável, pois a melhora estética e metabólica ocorre sem prejuízo do tecido muscular.');
    } else if(dMg<=-0.4 && Math.abs(dMm)<0.4){
      P.push('A redução de peso ocorreu essencialmente às custas do tecido adiposo, com manutenção da massa magra — indicativo de estratégia nutricional e de treino bem ajustadas.');
    } else if(dMg<=-0.4 && dMm<=-0.4){
      P.push('Houve perda de gordura acompanhada de perda de massa magra ('+fmtDelta(dMm,1)+' kg). O resultado é parcialmente favorável, mas sugere déficit calórico excessivo, ingestão proteica insuficiente ou estímulo de força abaixo do necessário.');
    } else if(dMg>=0.4 && dMm>=0.4){
      P.push('O ganho de peso envolveu tanto massa magra quanto massa gorda, padrão típico de fase de ganho com superávit calórico acima do necessário.');
    } else if(dMg>=0.4 && dMm<=-0.2){
      P.push('Observa-se aumento de massa gorda com redução de massa magra, o que indica necessidade de revisão da estratégia alimentar e de aumento do estímulo de força.');
    } else {
      P.push('A composição corporal permaneceu estável no período, caracterizando manutenção corporal.');
    }
  }
  const nUp = MUSCLE_KEYS.filter(k=>delta[k]!==null && delta[k]>=0.5).length;
  const nDown = MUSCLE_KEYS.filter(k=>delta[k]!==null && delta[k]<=-0.5).length;
  if(nUp>=2 && dCint!==null && dCint<=-1){
    P.push('O aumento de circunferências musculares em '+nUp+' pontos, combinado à redução da cintura, sugere hipertrofia com melhora da distribuição corporal — a chamada melhora do formato corporal, que muitas vezes não aparece na balança.');
  } else if(nUp>=3 && dPeso!==null && Math.abs(dPeso)<0.5){
    P.push('Com peso praticamente estável e várias circunferências em elevação, o padrão aponta ganho muscular compensado por perda de gordura.');
  } else if(nDown>=3 && dPeso!==null && dPeso<=-1){
    P.push('A redução generalizada de circunferências acompanha a perda de peso, o que é esperado em processos de emagrecimento mais acentuados.');
  }
  const allUpSmall = MUSCLE_KEYS.filter(k=>delta[k]!==null && delta[k]>0 && delta[k]<1).length;
  if(allUpSmall>=5 && dPeso!==null && Math.abs(dPeso)<1){
    P.push('O aumento discreto e simultâneo de quase todas as circunferências, sem variação relevante de peso, pode refletir retenção hídrica, horário de medição diferente ou pequenas diferenças no posicionamento da fita — vale confirmar na próxima coleta.');
  }
  if(dPeso!==null && dCint!==null && dPeso<=-1 && dCint>=1){
    P.push('A combinação de queda de peso com aumento de cintura é fisiologicamente improvável no intervalo avaliado e sugere erro de medição em um dos momentos. Recomenda-se repetir as medidas antes de qualquer ajuste de conduta.');
  }
  if(!P.length) P.push('Ainda não há dados suficientes para uma interpretação técnica completa. Informe ao menos peso, cintura, quadril, pescoço, altura, sexo e as duas datas de avaliação.');

  /* --- estimativa de evolução --- */
  const est=[];
  let fatPerMonth=null, weightPerMonth=null, leanPerMonth=null;
  if(months && months>0.3){
    if(dMg!==null) fatPerMonth = dMg/months;
    if(dPeso!==null) weightPerMonth = dPeso/months;
    if(dMm!==null) leanPerMonth = dMm/months;
  }
  if(fatPerMonth!==null){
    est.push('Ritmo atual de variação de massa gorda: '+fmtDelta(fatPerMonth,2)+' kg por mês.');
  } else if(weightPerMonth!==null){
    est.push('Ritmo atual de variação de peso: '+fmtDelta(weightPerMonth,2)+' kg por mês.');
  }
  if(leanPerMonth!==null && Math.abs(leanPerMonth)>0.05) est.push('Variação de massa magra: '+fmtDelta(leanPerMonth,2)+' kg por mês.');

  let prazo = null;
  const alturaM = num(A.altura) ? num(A.altura)/100 : null;
  if(alturaM && d2.imc!==null && d2.imc>24.9 && weightPerMonth!==null && weightPerMonth<-0.1){
    const pesoAlvo = 24.9*alturaM*alturaM;
    const falta = d2.peso - pesoAlvo;
    const meses = falta/Math.abs(weightPerMonth);
    if(meses>0 && meses<240){
      prazo = 'Mantido o ritmo atual, a faixa de IMC saudável (até 24,9) seria alcançada em aproximadamente '+
        Math.max(1,Math.floor(meses*0.85))+' a '+Math.ceil(meses*1.15)+' meses, o que corresponde a cerca de '+fmt(falta,1)+' kg a reduzir.';
    }
  } else if(d2.imc!==null && d2.imc<=24.9){
    prazo = 'O IMC atual já se encontra em faixa saudável; o foco passa a ser a qualidade da composição corporal e não a redução de peso.';
  } else if(d2.imc!==null && d2.imc>24.9){
    prazo = 'Não há ritmo de perda de peso estabelecido entre as duas avaliações, portanto não é possível projetar prazo para a faixa de IMC saudável.';
  }
  if(prazo) est.push(prazo);

  if(d2.bf!==null && A.sexo){
    const alvo = A.sexo==='M' ? 17 : 24;
    if(d2.bf>alvo && fatPerMonth!==null && fatPerMonth<-0.1 && d2.peso){
      const kgGordAlvo = (alvo/100)*d2.peso;
      const excesso = d2.mg - kgGordAlvo;
      const meses = excesso/Math.abs(fatPerMonth);
      if(meses>0 && meses<240) est.push('Para chegar a cerca de '+alvo+'% de gordura, seriam necessários aproximadamente '+Math.max(1,Math.round(meses))+' meses no ritmo atual.');
    } else if(d2.bf<=alvo){
      est.push('O percentual de gordura estimado já está dentro da faixa considerada saudável para o sexo informado.');
    }
  }
  if(!est.length) est.push('Sem datas ou medidas suficientes para estimar velocidade de evolução.');
  est.push('Todos os prazos acima são estimativas lineares baseadas apenas nas duas avaliações e não constituem previsão exata — a evolução real tende a desacelerar com o tempo.');

  /* --- tendência --- */
  let tend = 'Estável';
  if(dMg!==null && dMm!==null){
    if(dMg<=-0.4 && dMm>=0.2) tend='Recomposição corporal';
    else if(dMg<=-0.4) tend='Emagrecimento';
    else if(dMg>=0.4 && dMm>=0.4) tend='Ganho de peso misto';
    else if(dMg>=0.4) tend='Acúmulo de gordura';
    else if(dMm>=0.4) tend='Ganho muscular';
  } else if(dPeso!==null){
    if(dPeso<=-1) tend='Redução de peso';
    else if(dPeso>=1) tend='Aumento de peso';
  }

  /* --- recomendações --- */
  if(dMg!==null && dMg<=-0.4 && (dMm===null||dMm>=-0.2)) rec.push('Manter a estratégia atual de treino e alimentação — o ritmo está adequado e sustentável');
  if(dMm!==null && dMm<=-0.4){
    rec.push('Aumentar a ingestão proteica (referência usual de 1,6 a 2,2 g por kg de peso, a ser definida pelo nutricionista)');
    rec.push('Priorizar treino de força com progressão de carga para preservar massa magra');
    rec.push('Revisar o tamanho do déficit calórico, que pode estar excessivo');
  }
  if(dMg!==null && dMg>=0.4){
    rec.push('Reduzir alimentos ultraprocessados e controlar a ingestão de açúcar');
    rec.push('Inserir ou ampliar o volume de exercícios aeróbicos ao longo da semana');
  }
  if(d2.waist && d2.waist.lvl>0) rec.push('Atenção à circunferência de cintura, indicador direto de risco cardiometabólico — trabalhar redução de gordura visceral');
  if(nUp===0 && dMm!==null && dMm<0.2) rec.push('Revisar a intensidade e o volume do treinamento de força, com registro de cargas para garantir progressão');
  if(allUpSmall>=5) rec.push('Melhorar a hidratação e padronizar o horário das medições para reduzir o efeito de retenção hídrica');
  if(asymArm!==null && asymArm>=1.5) rec.push('Incluir trabalho unilateral para corrigir a assimetria entre os braços');
  if(asymLeg!==null && asymLeg>=2) rec.push('Incluir trabalho unilateral de membros inferiores para equilibrar as coxas');
  const pq = parqStatus(data.anamnese);
  if(pq && pq.st==='pos') rec.unshift('PAR-Q positivo: obter avaliação e liberação médica antes de progredir a intensidade do treino');
  if(data.anamnese && String(data.anamnese.lesoes||'').trim()) rec.push('Adaptar a escolha e a amplitude dos exercícios às lesões ou dores relatadas na anamnese');
  rec.push('Cuidar da qualidade do sono, fator direto na recuperação e no controle do apetite');
  rec.push('Repetir a avaliação em 8 a 12 semanas, nas mesmas condições de horário, hidratação, alimentação e pontos anatômicos');

  /* --- observações --- */
  if(dMg!==null && dMg<=-0.4 && dMm!==null && dMm>=-0.2) obs.push('A redução de peso ocorreu sem perda importante de massa magra.');
  if(nUp>=2 && dCint!==null && dCint<=-1) obs.push('Houve aumento de circunferências musculares acompanhado de redução da cintura, sugerindo hipertrofia.');
  if(allUpSmall>=5) obs.push('As medidas sugerem possível retenção de líquidos no dia da reavaliação.');
  if(dPeso!==null && dCint!==null && dPeso<=-1 && dCint>=1) obs.push('Houve aumento de cintura apesar da redução de peso, sendo recomendável confirmar as medidas na próxima avaliação.');
  if(!obs.length && (dPeso!==null||dCint!==null)) obs.push('As medidas parecem coerentes entre as duas avaliações.');
  if(days!==null && days<21) obs.push('O intervalo entre as avaliações é curto ('+days+' dias); variações pequenas podem refletir oscilação normal e não mudança real de composição corporal.');
  if(d1.bfMethod && d2.bfMethod && d1.bfMethod!==d2.bfMethod) obs.push('O percentual de gordura foi estimado por métodos diferentes ('+d1.bfMethod+' na '+AVAL_LABELS[baseKey]+' e '+d2.bfMethod+' na '+AVAL_LABELS[curKey]+'); a comparação entre eles é apenas aproximada.');
  if(d1.bfWhy || d2.bfWhy) obs.push('Percentual de gordura estimado de forma parcial ou indisponível — '+(d2.bfWhy||d1.bfWhy)+'.');
  obs.push('Recomenda-se repetir a avaliação nas mesmas condições (horário, hidratação, alimentação e pontos anatômicos) para garantir maior precisão.');

  /* --- nota geral --- */
  let score=5;
  if(fatPerMonth!==null){
    if(fatPerMonth<=-1) score+=2; else if(fatPerMonth<=-0.5) score+=1.5; else if(fatPerMonth<=-0.15) score+=1;
    else if(fatPerMonth>=0.5) score-=2; else if(fatPerMonth>=0.15) score-=1;
  } else if(weightPerMonth!==null){
    if(weightPerMonth<=-0.5) score+=1; else if(weightPerMonth>=0.5) score-=1;
  }
  if(dMm!==null){ if(dMm>=0.4) score+=1.5; else if(dMm>=-0.2) score+=0.5; else score-=1.5; }
  if(dCint!==null){ if(dCint<=-2) score+=1; else if(dCint<=-0.5) score+=0.5; else if(dCint>=2) score-=1; }
  if(dRcq!==null){ if(dRcq<=-0.01) score+=0.5; else if(dRcq>=0.02) score-=0.5; }
  if(nUp>=2) score+=0.5;
  score = clamp(score,0,10);

  /* --- barras --- */
  const bars=[];
  bars.push({lab:'Perda de gordura', note: fatPerMonth!==null ? fmtDelta(fatPerMonth,2)+' kg/mês' : 'sem dados',
    pct: fatPerMonth!==null ? clamp(Math.abs(Math.min(fatPerMonth,0))/1.0*100,0,100) : 0,
    cls: fatPerMonth!==null && fatPerMonth<0 ? 'g' : (fatPerMonth!==null && fatPerMonth>0.1 ? 'r' : 'b')});
  bars.push({lab:'Massa muscular', note: dMm!==null ? fmtDelta(dMm,1)+' kg no período' : 'sem dados',
    pct: dMm!==null ? clamp(50 + dMm*25,0,100) : 0,
    cls: dMm!==null ? (dMm>=0.2?'g':(dMm<=-0.4?'r':'b')) : 'b'});
  const riskLvl = d2.waist ? d2.waist.lvl : (d2.rcqClass ? ({'Risco baixo':0,'Risco moderado':1,'Risco alto':2}[d2.rcqClass.t] ?? null) : null);
  bars.push({lab:'Risco cardiometabólico', note: riskLvl===null?'sem dados':['baixo','aumentado','muito aumentado'][riskLvl],
    pct: riskLvl===null?0:[25,60,95][riskLvl], cls: riskLvl===null?'b':['g','o','r'][riskLvl]});
  bars.push({lab:'Consistência das medidas', note: (dPeso!==null && dCint!==null && dPeso<=-1 && dCint>=1) ? 'revisar medidas' : (allUpSmall>=5 ? 'possível retenção' : 'coerente'),
    pct: (dPeso!==null && dCint!==null && dPeso<=-1 && dCint>=1) ? 35 : (allUpSmall>=5 ? 65 : 92),
    cls: (dPeso!==null && dCint!==null && dPeso<=-1 && dCint>=1) ? 'r' : (allUpSmall>=5 ? 'o' : 'g')});

  return {d1,d2,delta,days,months,pos,att,obs,rec,est,prose:P,score,bars,tend,fatPerMonth,weightPerMonth,filled,baseKey,curKey};
}

/* =======================================================================
   5. RENDERIZAÇÃO DO RELATÓRIO
   ======================================================================= */
function hasAnyData(){
  return filledAvalKeys().length>0 || !!data.aluno.nome || anamHasData(data.anamnese);
}
function kpi(k,v,cls,clas,d){
  return '<div class="kpi '+(cls||'b')+'"><div class="k">'+esc(k)+'</div><div class="v">'+v+'</div>'+
    (clas?'<div class="c">'+esc(clas)+'</div>':'')+(d?'<div class="d">'+d+'</div>':'')+'</div>';
}
function varCell(v,dir,dec,unit){
  if(v===null||v===undefined||!Number.isFinite(v)) return '<td class="var eq">—</td>';
  const eq = Math.abs(v) < (dec===2?0.005:0.05);
  let cls='nt';
  if(eq) cls='eq';
  else if(dir==='down') cls = v<0?'up':'dn';
  else if(dir==='up')   cls = v>0?'up':'dn';
  const dot = eq?'eq':(cls==='up'?'up':(cls==='dn'?'dn':'nt'));
  return '<td class="var '+cls+'">'+fmtDelta(v,dec)+(unit?' '+unit:'')+'<span class="dot '+dot+'"></span></td>';
}
function rowMeasure(m,filled,an){
  const vals = filled.map(k=>num(data[k][m.k]));
  if(vals.every(v=>v===null)) return '';
  const dec = 1;
  const tds = vals.map(v=>'<td>'+fmt(v,dec)+'</td>').join('');
  return '<tr><td>'+esc(m.label)+'</td>'+tds+varCell(an.delta[m.k],m.dir,dec,m.unit)+'</tr>';
}
function rowCalc(label,vals,d,dir,dec,unit){
  if(vals.every(v=>v===null||v===undefined)) return '';
  const tds = vals.map(v=>'<td>'+fmt(v,dec)+'</td>').join('');
  return '<tr class="calc"><td>'+esc(label)+'</td>'+tds+varCell(d,dir,dec,unit)+'</tr>';
}

/* Gráfico de linha em SVG para o histórico (peso, % de gordura, etc.).
   Recebe cores já resolvidas (hex), não var(), para funcionar de forma confiável
   tanto na tela quanto na captura para PDF/JPG (html2canvas). */
function svgTrendChart(labels, values, opts){
  const valid = values.filter(v=>v!==null && Number.isFinite(v));
  if(valid.length < 2) return null;

  const W = opts.width||520, H = opts.height||190;
  const padL=32, padR=32, padT=26, padB=28;
  const plotW = W-padL-padR, plotH = H-padT-padB;
  let min = Math.min(...valid), max = Math.max(...valid);
  if(min===max){ min-=1; max+=1; }
  const pad = (max-min)*0.22;
  min -= pad; max += pad;

  const n = values.length;
  const xAt = i => padL + (n<=1 ? plotW/2 : (plotW*i/(n-1)));
  const yAt = v => padT + plotH - ((v-min)/(max-min))*plotH;
  const dec = opts.decimals ?? 1;

  /* Linhas de grade horizontais, só como referência visual — sem números,
     já que cada ponto já mostra seu valor exato (evita qualquer colisão de texto). */
  let gridSvg='';
  const steps=3;
  for(let s=0;s<=steps;s++){
    const gy = padT + plotH*s/steps;
    gridSvg += '<line x1="'+padL+'" y1="'+gy+'" x2="'+(W-padR)+'" y2="'+gy+'" stroke="'+opts.lineColor+'" stroke-width="1"/>';
  }

  let pathD='', dotsSvg='', valueLabels='', started=false;
  const pts = [];
  values.forEach((v,i)=>{
    if(v===null || !Number.isFinite(v)){ started=false; return; }
    const px=xAt(i), py=yAt(v);
    pathD += (started?' L':'M')+px+' '+py;
    started = true;
    dotsSvg += '<circle cx="'+px+'" cy="'+py+'" r="4.5" fill="'+opts.color+'" stroke="'+opts.bgColor+'" stroke-width="2"/>';
    pts.push({px,py,v});
  });
  /* Rótulo de valor acima do ponto; se dois pontos vizinhos ficarem muito próximos
     verticalmente, alterna o rótulo mais à direita para baixo do ponto, evitando sobreposição. */
  pts.forEach((p,idx)=>{
    const prev = pts[idx-1];
    const tooClose = prev && Math.abs(p.py-prev.py) < 15 && Math.abs(p.px-prev.px) < 70;
    const below = tooClose && idx%2===1;
    const ty = below ? p.py+17 : p.py-11;
    valueLabels += '<text x="'+p.px+'" y="'+ty+'" text-anchor="middle" font-size="11.5" font-weight="600" fill="'+opts.textColor+'">'+fmt(p.v,dec)+(opts.unit||'')+'</text>';
  });

  let xLabels='';
  labels.forEach((lb,i)=>{
    xLabels += '<text x="'+xAt(i)+'" y="'+(H-8)+'" text-anchor="middle" font-size="11" fill="'+opts.mutedColor+'">'+esc(lb)+'</text>';
  });

  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="'+esc(opts.title||'')+'">'+
    gridSvg+
    '<path d="'+pathD+'" fill="none" stroke="'+opts.color+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+
    dotsSvg+valueLabels+xLabels+
    '</svg>';
}
function chartCard(title, svg, fallbackMsg){
  return '<div class="chart-card"><h4>'+esc(title)+'</h4>'+(svg || '<p class="chart-empty">'+esc(fallbackMsg)+'</p>')+'</div>';
}

/* Componentes da composição corporal de uma avaliação já derivada.
   4 componentes (gorda, muscular, óssea, residual) quando há dobras/diâmetros suficientes;
   senão, 2 componentes (gorda × magra). */
function compParts(d, colors){
  if(d.mmu!==null && d.mmu!==undefined) return [
    {k:'mg',  label:'Massa gorda',    v:d.mg,  color:colors.gord},
    {k:'mmu', label:'Massa muscular', v:d.mmu, color:colors.musc},
    {k:'mo',  label:'Massa óssea',    v:d.mo,  color:colors.osso},
    {k:'mr',  label:'Massa residual', v:d.mr,  color:colors.resid}];
  if(d.mg!==null && d.mm!==null) return [
    {k:'mg', label:'Massa gorda', v:d.mg, color:colors.gord},
    {k:'mm', label:'Massa magra', v:d.mm, color:colors.musc}];
  return null;
}
/* Rosca SVG com a composição da avaliação atual + legenda com kg e %. */
function svgCompDonut(parts, opts){
  if(!parts) return null;
  const total = parts.reduce((s,p)=>s+p.v,0);
  if(!(total>0)) return null;
  const S=170, c=S/2, R=80, r=52;
  const pt = (rad,ang)=>[c+rad*Math.sin(ang), c-rad*Math.cos(ang)];
  let a0=0, arcs='';
  parts.forEach(p=>{
    const a1 = a0 + p.v/total*Math.PI*2;
    const large = (a1-a0)>Math.PI ? 1 : 0;
    const [x0,y0]=pt(R,a0), [x1,y1]=pt(R,a1), [x2,y2]=pt(r,a1), [x3,y3]=pt(r,a0);
    const pct = p.v/total*100;
    arcs += '<path d="M'+x0+' '+y0+' A'+R+' '+R+' 0 '+large+' 1 '+x1+' '+y1+' L'+x2+' '+y2+' A'+r+' '+r+' 0 '+large+' 0 '+x3+' '+y3+' Z" '+
      'fill="'+p.color+'" stroke="'+opts.bgColor+'" stroke-width="2" stroke-linejoin="round">'+
      '<title>'+esc(p.label)+': '+fmt(p.v,1)+' kg ('+fmt(pct,1)+'%)</title></path>';
    a0 = a1;
  });
  const svg = '<svg viewBox="0 0 '+S+' '+S+'" width="170" height="170" role="img" aria-label="'+esc(opts.title||'')+'">'+arcs+
    '<text x="'+c+'" y="'+(c-2)+'" text-anchor="middle" font-size="22" font-weight="700" fill="'+opts.textColor+'">'+fmt(total,1)+'</text>'+
    '<text x="'+c+'" y="'+(c+16)+'" text-anchor="middle" font-size="11" fill="'+opts.mutedColor+'">kg no total</text></svg>';
  const legend = '<ul class="comp-legend">'+parts.map(p=>
    '<li><i style="background:'+p.color+'"></i><span>'+esc(p.label)+'</span><b>'+fmt(p.v,1)+' kg</b><em>'+fmt(p.v/total*100,1)+'%</em></li>').join('')+'</ul>';
  return '<div class="comp-wrap">'+svg+legend+'</div>';
}
/* Barras horizontais empilhadas (kg) — uma por avaliação, na mesma escala. */
function svgCompStacked(labels, partsList, opts){
  const rows = partsList.map((parts,i)=>({lab:labels[i], parts})).filter(r=>r.parts);
  if(rows.length<2) return null;
  const max = Math.max(...rows.map(r=>r.parts.reduce((s,p)=>s+p.v,0)));
  const W=520, padL=34, padR=58, rowH=26, gap=12, padT=6;
  const H = padT + rows.length*(rowH+gap) + 22;
  const plotW = W-padL-padR;
  let body='';
  rows.forEach((row,ri)=>{
    const y = padT + ri*(rowH+gap);
    let x = padL, total=0;
    body += '<text x="'+(padL-8)+'" y="'+(y+rowH/2+4)+'" text-anchor="end" font-size="11" fill="'+opts.mutedColor+'">'+esc(row.lab)+'</text>';
    row.parts.forEach((p,pi)=>{
      const w = p.v/max*plotW;
      const last = pi===row.parts.length-1;
      body += '<rect x="'+x+'" y="'+y+'" width="'+Math.max(0,w-(last?0:2))+'" height="'+rowH+'" rx="'+(pi===0||last?4:0)+'" fill="'+p.color+'">'+
        '<title>'+esc(row.lab)+' · '+esc(p.label)+': '+fmt(p.v,1)+' kg</title></rect>';
      if(w>=40) body += '<text x="'+(x+w/2-(last?0:1))+'" y="'+(y+rowH/2+4)+'" text-anchor="middle" font-size="10.5" font-weight="600" fill="#fff" pointer-events="none">'+fmt(p.v,1)+'</text>';
      x += w; total += p.v;
    });
    body += '<text x="'+(x+6)+'" y="'+(y+rowH/2+4)+'" font-size="11.5" font-weight="600" fill="'+opts.textColor+'">'+fmt(total,1)+' kg</text>';
  });
  let legend='', lx=padL;
  rows[rows.length-1].parts.forEach(p=>{
    legend += '<rect x="'+lx+'" y="'+(H-13)+'" width="10" height="10" rx="3" fill="'+p.color+'"/>'+
      '<text x="'+(lx+15)+'" y="'+(H-4)+'" font-size="11" fill="'+opts.mutedColor+'">'+esc(p.label)+'</text>';
    lx += 15 + p.label.length*6.2 + 16;
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="'+esc(opts.title||'')+'">'+body+legend+'</svg>';
}

function renderAnamnese(an){
  if(!anamHasData(an)) return '';
  let h = '<div class="sec"><h3>Anamnese <em>saúde, atividade física e hábitos</em></h3>';
  const pq = parqStatus(an);
  if(pq && pq.st==='pos'){
    h += '<div class="alert r"><b>PAR-Q positivo — liberação médica recomendada</b>'+
      'Houve resposta "Sim" em '+pq.yes.length+' pergunta'+(pq.yes.length>1?'s':'')+'. Recomenda-se avaliação e liberação médica antes de iniciar ou intensificar o programa de exercícios.'+
      '<ul>'+pq.yes.map(i=>'<li>'+esc(PARQ[i])+'</li>').join('')+'</ul></div>';
  } else if(pq && pq.st==='neg'){
    h += '<div class="alert g"><b>PAR-Q negativo</b>Todas as respostas foram "Não". O aluno está apto a iniciar atividade física com progressão gradual de intensidade.</div>';
  } else if(pq && pq.st==='inc'){
    h += '<div class="alert o"><b>PAR-Q incompleto</b>Nem todas as perguntas foram respondidas — complete o questionário antes de iniciar o programa.</div>';
  }
  let items='';
  ANAM_SECTIONS.forEach(sec=>{
    let block='';
    sec.fields.forEach(f=>{
      let v = an[f.k];
      if(Array.isArray(v)) v = v.join(' · ');
      v = String(v??'').trim();
      if(!v) return;
      if(f.type==='number') v = v.replace('.',',');
      if(f.unit) v += ' '+f.unit;
      block += '<div class="anam-item"><span>'+esc(f.label)+'</span><b>'+esc(v)+'</b></div>';
    });
    if(block) items += '<h4>'+esc(sec.title)+'</h4>'+block;
  });
  if(items) h += '<div class="anam-grid">'+items+'</div>';
  return h+'</div>';
}

function renderReport(target){
  const host = target || $('#report');
  if(!hasAnyData()){
    host.innerHTML = '<div class="rep"><div class="empty"><b>Nenhuma medida informada ainda</b>Preencha as abas <em>Aluno</em> e ao menos a <em>1ª Avaliação</em> — o relatório é montado automaticamente conforme você digita.</div></div>';
    return;
  }
  const A=data.aluno, an=analyze(), d1=an.d1, d2=an.d2, filled=an.filled;
  const cs = getComputedStyle(host);
  const cvar = (name, fallback) => { const v = cs.getPropertyValue(name).trim(); return v || fallback; };
  const chartColors = {
    accent: cvar('--accent','#9A55CC'), info: cvar('--info','#7FA9E0'),
    ink: cvar('--ink','#EDEAEA'), mutedColor: cvar('--ink-2','#A79FAE'),
    lineColor: cvar('--line','#2C2732'), bgColor: cvar('--card','#141019'),
    shade: cvar('--shade','#181220')
  };
  const compColors = { gord: cvar('--cc-gord','#E3855B'), musc: cvar('--cc-musc','#A56BD6'),
    osso: cvar('--cc-osso','#6FA3E0'), resid: cvar('--cc-resid','#8F8898') };

  const idade = num(A.idade), alt = num(A.altura);
  const meta = [A.sexo==='M'?'Masculino':(A.sexo==='F'?'Feminino':null), idade?idade+' anos':null, alt?fmt(alt,0)+' cm':null,
    (A.objetivos && A.objetivos.length)?('Objetivo: '+A.objetivos.join(' · ')):null]
    .filter(Boolean).join(' · ');

  let h = '<div class="rep">';
  const dateBlocks = filled.length
    ? filled.map(k=>'<div><span>'+AVAL_LABELS[k]+'</span><b>'+esc(brDate(data[k].data))+'</b></div>').join('')
    : '<div><span>1ª avaliação</span><b>—</b></div>';
  h += '<div class="rep-head"><div class="who"><h2>'+esc(A.nome||'Aluno sem nome')+'</h2>'+
       (meta?'<p>'+esc(meta)+'</p>':'')+(A.profissional?'<p>Avaliador: '+esc(A.profissional)+'</p>':'')+'</div>'+
       '<div class="dates">'+dateBlocks+
       (filled.length>1?'<div><span>Intervalo total</span><b>'+humanPeriod(an.days)+'</b></div>':'')+'</div></div>';

  h += renderAnamnese(data.anamnese);

  /* Situação atual */
  const curLabel = filled.length ? AVAL_LABELS[an.curKey] : '1ª avaliação';
  h += '<div class="sec"><h3>Situação atual <em>valores da '+curLabel+'</em></h3><div class="kpis">';
  h += kpi('IMC', fmt(d2.imc,1), d2.imcClass?d2.imcClass.c:'b', d2.imcClass?d2.imcClass.t:'Informe peso e altura',
        (filled.length>1 && an.delta.imc!==null)?('variação '+fmtDelta(an.delta.imc,1)):'');
  h += kpi('RCQ', fmt(d2.rcq,2), d2.rcqClass?d2.rcqClass.c:'b', d2.rcqClass?d2.rcqClass.t:'Informe cintura e quadril',
        (filled.length>1 && an.delta.rcq!==null)?('variação '+fmtDelta(an.delta.rcq,2)):'');
  h += kpi('Gordura corporal', d2.bf!==null?fmt(d2.bf,1)+'%':'—', d2.bfClass?d2.bfClass.c:'b',
        d2.bfClass?d2.bfClass.t:(d2.bfWhy?'Não calculado: '+d2.bfWhy:''),
        (filled.length>1 && an.delta.bf!==null)?('variação '+fmtDelta(an.delta.bf,1)+' p.p.'):'');
  h += kpi('Massa gorda', d2.mg!==null?fmt(d2.mg,1)+' kg':'—', 'b','', (filled.length>1 && an.delta.mg!==null)?('variação '+fmtDelta(an.delta.mg,1)+' kg'):'');
  h += kpi('Massa magra', d2.mm!==null?fmt(d2.mm,1)+' kg':'—', 'b','', (filled.length>1 && an.delta.mm!==null)?('variação '+fmtDelta(an.delta.mm,1)+' kg'):'');
  h += '</div>';
  if(d2.waist) h += '<div class="note" style="margin-top:12px">'+esc(d2.waist.t)+' — referência de cintura para '+(A.sexo==='M'?'homens: 94 cm (risco aumentado) e 102 cm (muito aumentado)':'mulheres: 80 cm (risco aumentado) e 88 cm (muito aumentado)')+'.</div>';
  h += '</div>';

  /* Composição corporal — % de gordura (Jackson & Pollock, Faulkner ou Marinha) + fracionamento de Carnaval (óssea, residual, muscular) */
  {
    const curParts = compParts(d2, compColors);
    const donut = svgCompDonut(curParts, {textColor:chartColors.ink, mutedColor:chartColors.mutedColor,
      bgColor:chartColors.shade, title:'Composição corporal da '+curLabel});
    const allDerived = filled.map(k=>derive(data[k],A));
    const labs = filled.map(k=>AVAL_LABELS[k].replace(' avaliação',''));
    const four = allDerived.filter(d=>d.mmu!==null).length>=2;
    const stacked = svgCompStacked(labs, allDerived.map(d=>{
      if(four){ const pr = compParts(d, compColors); return pr && pr.length===4 ? pr : null; }
      return compParts({mg:d.mg, mm:d.mm}, compColors);
    }), {textColor:chartColors.ink, mutedColor:chartColors.mutedColor, title:'Composição corporal por avaliação'});
    const falta = [];
    if(d2.bf===null) falta.push(A.sexo==='F' ? 'as dobras tricipital, suprailíaca e da coxa (Jackson & Pollock) ou as 4 dobras de Faulkner' : 'as 4 dobras cutâneas (Faulkner)');
    if(!num(A.altura)) falta.push('a altura');
    if(!A.sexo) falta.push('o sexo');
    if(d2.mo===null) falta.push('os diâmetros do punho e do fêmur');
    if(!d2.peso) falta.push('o peso');
    const metodo = d2.bfMethod==='Jackson & Pollock'
      ? '% de gordura por Jackson, Pollock & Ward (1980), 3 dobras para mulheres, com densidade convertida por Siri (1961)'
      : d2.bfMethod==='Faulkner'
      ? '% de gordura por Faulkner (1968)'+(A.sexo==='F' ? ' — para mulheres, prefira Jackson & Pollock informando a dobra da coxa, pois Faulkner tende a subestimar a gordura feminina' : '')
      : (d2.bfMethod ? '% de gordura pelo método da Marinha dos EUA (dobras cutâneas incompletas)' : null);
    const titleDonut = (curParts && curParts.length===4) ? 'Composição em 4 componentes' : 'Composição (gorda × magra)';
    h += '<div class="sec"><h3>Composição corporal <em>'+esc(d2.bfMethod && d2.bfMethod!=='Marinha dos EUA' ? d2.bfMethod : 'Dobras cutâneas')+' · Carnaval</em></h3><div class="charts-grid">'+
         chartCard(titleDonut+' — '+curLabel.replace(' avaliação',''), donut,
           'Para montar o gráfico, informe '+(falta.length?falta.join(', '):'as medidas necessárias')+'.')+
         (filled.length>1 ? chartCard('Evolução da composição (kg)', stacked,
           'É preciso ter a composição calculada em pelo menos duas avaliações para comparar.') : '')+
         '</div>';
    if(curParts && curParts.length===2)
      h += '<div class="note" style="margin-top:12px">Para dividir a massa magra em muscular, óssea e residual, informe também '+esc(falta.join(', ')||'os diâmetros ósseos')+'.</div>';
    h += '<div class="note" style="margin-top:12px">'+(metodo?esc(metodo)+'. ':'')+
         'Fracionamento conforme Carnaval (2000): massa óssea por Von Döbeln modificada por Rocha (1975), massa residual por Würch (1974) e massa muscular por diferença (Matiegka). Estimativas de campo, com margem de erro.</div>';
    h += '</div>';
  }

  if(filled.length < 2){
    h += '<div class="sec"><h3>Comparativo</h3><div class="prose"><p>Preencha pelo menos duas avaliações (entre a 1ª e a 6ª) para o site montar o comparativo completo, a interpretação técnica, os pontos de atenção e as recomendações.</p></div></div>';
    h += '<div class="foot"><b>Importante:</b> esta análise é baseada nas medidas fornecidas e tem caráter informativo. A interpretação clínica e o planejamento de treinamento ou nutrição devem ser realizados por um profissional habilitado, considerando o histórico completo do aluno.</div>';
    h += '</div>';
    host.innerHTML = h;
    return;
  }

  /* Comparativo — uma coluna por avaliação preenchida + variação total (1ª preenchida → última preenchida) */
  const filledDerived = filled.map(k=>derive(data[k],A));
  const varLabel = filled.length>2
    ? 'Variação ('+AVAL_LABELS[an.baseKey].replace(' avaliação','')+' → '+AVAL_LABELS[an.curKey].replace(' avaliação','')+')'
    : 'Variação';
  h += '<div class="sec"><h3>Comparativo <em>aumento (+) · redução ('+MINUS+')</em></h3><div class="tablewrap"><table>'+
       '<thead><tr><th>Indicador</th>'+filled.map(k=>'<th>'+AVAL_LABELS[k]+'</th>').join('')+'<th>'+varLabel+'</th></tr></thead><tbody>';
  MEASURES.forEach(m=>{ h += rowMeasure(m,filled,an); });
  h += rowCalc('IMC', filledDerived.map(d=>d.imc), an.delta.imc, 'down', 1, '');
  h += rowCalc('RCQ', filledDerived.map(d=>d.rcq), an.delta.rcq, 'down', 2, '');
  h += rowCalc('% de gordura', filledDerived.map(d=>d.bf), an.delta.bf, 'down', 1, 'p.p.');
  h += rowCalc('Massa gorda', filledDerived.map(d=>d.mg), an.delta.mg, 'down', 1, 'kg');
  h += rowCalc('Massa magra', filledDerived.map(d=>d.mm), an.delta.mm, 'up', 1, 'kg');
  h += rowCalc('Massa muscular', filledDerived.map(d=>d.mmu), an.delta.mmu, 'up', 1, 'kg');
  h += rowCalc('Massa óssea', filledDerived.map(d=>d.mo), an.delta.mo, 'flat', 1, 'kg');
  h += rowCalc('Massa residual', filledDerived.map(d=>d.mr), an.delta.mr, 'flat', 1, 'kg');
  h += '</tbody></table></div></div>';

  /* Histórico — peso e % de gordura ao longo das avaliações preenchidas */
  const trendLabels = filled.map(k=>AVAL_LABELS[k].replace(' avaliação',''));
  const pesoValues = filled.map(k=>num(data[k].peso));
  const bfValues = filledDerived.map(d=>d.bf);
  const pesoSvg = svgTrendChart(trendLabels, pesoValues, {color:chartColors.accent, textColor:chartColors.ink,
    mutedColor:chartColors.mutedColor, lineColor:chartColors.lineColor, bgColor:chartColors.bgColor, unit:' kg', decimals:1, title:'Histórico de peso'});
  const bfSvg = svgTrendChart(trendLabels, bfValues, {color:chartColors.info, textColor:chartColors.ink,
    mutedColor:chartColors.mutedColor, lineColor:chartColors.lineColor, bgColor:chartColors.bgColor, unit:'%', decimals:1, title:'Histórico de % de gordura'});
  h += '<div class="sec"><h3>Histórico</h3><div class="charts-grid">'+
       chartCard('Peso (kg)', pesoSvg, 'Peso insuficiente em pelo menos duas avaliações para montar o gráfico.')+
       chartCard('Percentual de gordura (%)', bfSvg, 'Dados insuficientes (dobras cutâneas ou pescoço, cintura'+(A.sexo==='F'?', quadril':'')+' e altura) em pelo menos duas avaliações para montar o gráfico.')+
       '</div></div>';

  /* Interpretação */
  h += '<div class="sec"><h3>Interpretação técnica</h3><div class="prose">'+an.prose.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div></div>';

  /* Positivos / atenção */
  h += '<div class="sec"><h3>Pontos positivos</h3>';
  h += an.pos.length ? '<ul class="lst">'+an.pos.map(t=>'<li class="pos"><i>&#10004;</i><span>'+esc(t)+'</span></li>').join('')+'</ul>'
                     : '<div class="prose"><p>Nenhum indicador de melhora identificado entre as avaliações com os dados informados.</p></div>';
  h += '</div>';
  h += '<div class="sec"><h3>Pontos de atenção</h3>';
  h += an.att.length ? '<ul class="lst">'+an.att.map(t=>'<li class="att"><i>&#9888;</i><span>'+esc(t)+'</span></li>').join('')+'</ul>'
                     : '<div class="prose"><p>Nenhum ponto de atenção relevante identificado.</p></div>';
  h += '</div>';

  /* Estimativa */
  h += '<div class="sec"><h3>Estimativa de evolução</h3><div class="prose">'+an.est.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div></div>';

  /* Evolução geral */
  h += '<div class="sec"><h3>Evolução geral</h3><div class="score">'+
       '<div class="big"><b>'+fmt(an.score,1)+'</b><span>nota geral de 0 a 10</span><div style="font-size:12.5px;margin-top:8px"><b style="font-size:13px">'+esc(an.tend)+'</b></div></div>'+
       '<div class="bars">'+an.bars.map(b=>
          '<div class="bar"><div class="lab"><span>'+esc(b.lab)+'</span><span>'+esc(b.note)+'</span></div>'+
          '<div class="track"><div class="fill '+b.cls+'" style="width:'+Math.round(b.pct)+'%"></div></div></div>').join('')+
       '</div></div></div>';

  /* Recomendações */
  h += '<div class="sec"><h3>Recomendações</h3><ul class="lst">'+an.rec.map(t=>'<li class="rec"><i>&#9679;</i><span>'+esc(t)+'</span></li>').join('')+'</ul></div>';

  /* Observações */
  h += '<div class="sec"><h3>Observações importantes</h3><div class="obs"><ul>'+an.obs.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div></div>';

  h += '<div class="foot"><b>Importante:</b> esta análise é baseada nas medidas fornecidas e tem caráter informativo. A interpretação clínica e o planejamento de treinamento ou nutrição devem ser realizados por um profissional habilitado, considerando o histórico completo do aluno. Relatório gerado com base nas medidas fornecidas; não substitui a avaliação presencial.</div>';
  h += '</div>';
  host.innerHTML = h;
}

/* =======================================================================
   6. FORMULÁRIO
   ======================================================================= */
function buildAvalForm(which){
  const host = $('#form-'+which);
  let h = '<div class="sub">Data da avaliação</div><div class="grid">'+
    '<div class="field"><label for="'+which+'_data">Data</label><div class="row"><input id="'+which+'_data" type="date" data-path="'+which+'.data"></div></div></div>';
  let group=null;
  MEASURES.forEach(m=>{
    if(m.group!==group){
      if(group!==null) h+='</div>';
      h += '<div class="sub">'+esc(m.group)+'</div><div class="grid">';
      group=m.group;
    }
    const id=which+'_'+m.k;
    h += '<div class="field"><label for="'+id+'">'+esc(m.label)+'</label><div class="row">'+
         '<input id="'+id+'" type="number" inputmode="decimal" step="'+(m.step||0.5)+'" min="0" placeholder="0" data-path="'+which+'.'+m.k+'">'+
         '<span class="unit">'+m.unit+'</span></div></div>';
  });
  h += '</div>';
  host.innerHTML = h;
}
function anamField(f){
  const id='an_'+f.k, path='anamnese.'+f.k;
  if(f.type==='checks'){
    return '<div class="field full"><label>'+esc(f.label)+' <span style="font-weight:400">— marque todas que se aplicam</span></label><div class="checks">'+
      f.options.map((o,i)=>'<label class="check-item" for="'+id+'_'+i+'"><input type="checkbox" id="'+id+'_'+i+'" data-list="'+path+'" value="'+esc(o)+'"><span>'+esc(o)+'</span></label>').join('')+
      '</div></div>';
  }
  const lab = '<label for="'+id+'">'+esc(f.label)+(f.type==='select' && f.unit ? ' ('+esc(f.unit)+')' : '')+'</label>';
  if(f.type==='select'){
    return '<div class="field">'+lab+'<select id="'+id+'" data-path="'+path+'"><option value="">Não informado</option>'+
      f.options.map(o=>'<option value="'+esc(o)+'">'+esc(o)+'</option>').join('')+'</select></div>';
  }
  if(f.type==='textarea'){
    return '<div class="field full">'+lab+'<div class="row"><textarea id="'+id+'" rows="2" data-path="'+path+'" placeholder="'+esc(f.ph||'')+'"></textarea></div></div>';
  }
  const t = f.type==='number' ? 'type="number" inputmode="decimal" min="0" step="'+(f.step||1)+'"' : 'type="text"';
  return '<div class="field">'+lab+'<div class="row"><input id="'+id+'" '+t+' data-path="'+path+'" placeholder="'+esc(f.ph||(f.type==='number'?'0':''))+'">'+
    (f.unit?'<span class="unit">'+esc(f.unit)+'</span>':'')+'</div></div>';
}
function buildAnamneseForm(){
  let h = '<div class="sub">PAR-Q — Questionário de Prontidão para Atividade Física</div><ol class="parq">'+
    PARQ.map((q,i)=>'<li><span>'+esc(q)+'</span><select data-path="anamnese.parq'+(i+1)+'" aria-label="PAR-Q, pergunta '+(i+1)+'">'+
      '<option value="">—</option><option value="N">Não</option><option value="S">Sim</option></select></li>').join('')+'</ol>';
  ANAM_SECTIONS.forEach(sec=>{
    h += '<div class="sub">'+esc(sec.title)+'</div><div class="grid">'+sec.fields.map(anamField).join('')+'</div>';
  });
  $('#form-anamnese').innerHTML = h;
}
function markParq(){
  $$('.parq select').forEach(sel=>sel.closest('li').classList.toggle('yes', sel.value==='S'));
}
function buildObjetivosBox(){
  const host = $('#objetivosBox');
  host.innerHTML = OBJETIVOS.map((o,i)=>{
    const id='obj_'+i;
    return '<label class="check-item" for="'+id+'"><input type="checkbox" id="'+id+'" data-obj="'+esc(o)+'"><span>'+esc(o)+'</span></label>';
  }).join('');
}
function setByPath(path,val){
  const [a,b] = path.split('.');
  data[a][b] = val;
}
function getByPath(path){
  const [a,b] = path.split('.');
  return data[a][b];
}
function formToData(){
  $$('[data-path]').forEach(el=>setByPath(el.dataset.path, el.value));
  data.aluno.objetivos = $$('#objetivosBox input[type=checkbox]:checked').map(cb=>cb.dataset.obj);
  data.anamnese.condicoes = $$('[data-list="anamnese.condicoes"]:checked').map(cb=>cb.value);
}
function dataToForm(){
  $$('[data-path]').forEach(el=>{ el.value = getByPath(el.dataset.path) ?? ''; });
  const sel = new Set(data.aluno.objetivos||[]);
  $$('#objetivosBox input[type=checkbox]').forEach(cb=>{ cb.checked = sel.has(cb.dataset.obj); });
  $$('[data-list]').forEach(cb=>{ cb.checked = (getByPath(cb.dataset.list)||[]).includes(cb.value); });
  markParq();
}
/* Idade em anos completos na data de referência (hoje, por padrão) */
function calcIdade(nascIso, refIso){
  if(!nascIso) return null;
  const n = new Date(nascIso+'T00:00:00');
  const r = refIso ? new Date(refIso+'T00:00:00') : new Date();
  if(isNaN(n) || isNaN(r) || n>r) return null;
  let a = r.getFullYear()-n.getFullYear();
  if(r.getMonth()<n.getMonth() || (r.getMonth()===n.getMonth() && r.getDate()<n.getDate())) a--;
  return a>=0 && a<=120 ? a : null;
}
/* Com data de nascimento, a idade é calculada e o campo fica somente leitura */
function syncIdade(){
  const a = calcIdade(data.aluno.nascimento);
  const el = $('#f_idade'), hint = $('#idadeHint');
  if(a!==null) data.aluno.idade = String(a);
  if(el){ el.readOnly = a!==null; if(a!==null) el.value = data.aluno.idade; }
  if(hint) hint.textContent = a!==null ? '— calculada pela data de nascimento' : '';
}
function refresh(){
  syncIdade();
  renderReport();
  $('#jsonBox').value = JSON.stringify(data,null,2);
  save();
  if(three.ready) three.update();
}
function save(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(data)); }catch(e){}
  updateBackupWarn();
}
/* Backup em arquivo: o localStorage some se o navegador for limpo, então o site lembra o
   conteúdo do último .txt salvo/carregado e avisa enquanto houver alterações fora dele. */
const BACKUP_KEY = STORE_KEY+':ultimo-txt';
function backupPending(){
  if(!hasAnyData()) return false;
  try{ return localStorage.getItem(BACKUP_KEY) !== JSON.stringify(data); }catch(e){ return true; }
}
function markBackup(){
  try{ localStorage.setItem(BACKUP_KEY, JSON.stringify(data)); }catch(e){}
  updateBackupWarn();
}
function updateBackupWarn(){
  const el = $('#backupWarn');
  if(el) el.hidden = !backupPending();
}
window.addEventListener('beforeunload', e=>{
  if(backupPending()){ e.preventDefault(); e.returnValue=''; }
});
function load(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) mergeData(JSON.parse(raw));
  }catch(e){}
}
function mergeData(obj){
  if(!obj || typeof obj!=='object') return false;
  const fresh = blankData();
  if(obj.aluno){
    Object.keys(fresh.aluno).forEach(k=>{
      if(k==='objetivos'){
        if(Array.isArray(obj.aluno.objetivos)) fresh.aluno.objetivos = obj.aluno.objetivos.map(String);
        else if(typeof obj.aluno.objetivo === 'string' && obj.aluno.objetivo.trim()) fresh.aluno.objetivos = [obj.aluno.objetivo.trim()];
      } else if(obj.aluno[k]!=null){
        fresh.aluno[k] = (k==='altura') ? normalizeAltura(obj.aluno[k]) : String(obj.aluno[k]);
      }
    });
  }
  if(obj.anamnese && typeof obj.anamnese==='object'){
    Object.keys(fresh.anamnese).forEach(k=>{
      const v = obj.anamnese[k];
      if(v==null) return;
      fresh.anamnese[k] = Array.isArray(fresh.anamnese[k]) ? (Array.isArray(v) ? v.map(String) : []) : String(v);
    });
  }
  AVAL_KEYS.forEach(av=>{
    if(!obj[av]) return;
    Object.keys(fresh[av]).forEach(k=>{ if(obj[av][k]!=null) fresh[av][k]=String(obj[av][k]); });
  });
  data = fresh;
  return true;
}

$('#btnEnter').addEventListener('click', ()=>{
  $('#welcome').style.display = 'none';
  const app = $('#app'); app.hidden = false;
  window.scrollTo(0,0);
  const h = document.getElementById('t-aluno'); if(h) h.focus();
});

/* =======================================================================
   7. ABAS
   ======================================================================= */
function selectTab(id){
  $$('.tab').forEach(t=>{
    const on = t.id===id;
    t.setAttribute('aria-selected', on?'true':'false');
    $('#'+t.getAttribute('aria-controls')).classList.toggle('on', on);
  });
  if(id==='t-3d'){ requestAnimationFrame(()=>{ three.init(); three.resize(); three.update(); }); }
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('.tab').forEach(t=>t.addEventListener('click',()=>selectTab(t.id)));
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>selectTab(b.dataset.go)));

/* =======================================================================
   8. ARQUIVOS: TXT, PDF, JPG
   ======================================================================= */
let downloadsCap = null, capsTried = false;
async function getDownloads(){
  if(capsTried) return downloadsCap;
  capsTried = true;
  try{
    if(window.claude && typeof window.claude.use === 'function'){
      downloadsCap = await window.claude.use('downloads');
    }
  }catch(e){ downloadsCap = null; }
  return downloadsCap;
}
async function offerFile(filename, payload){
  const cap = await getDownloads();
  if(cap){
    try{
      await cap.save({filename, data: payload});
      toast('Arquivo salvo: '+filename);
      return true;
    }catch(err){
      const code = err && err.code;
      if(code==='declined'){ toast('Download cancelado.'); return false; }
      if(code==='rate_limited'){ toast('Aguarde um instante e tente de novo.'); return false; }
      toast('Não foi possível salvar aqui ('+(code||'erro')+').');
      return false;
    }
  }
  /* fallback para o preview local */
  try{
    const blob = payload instanceof Blob ? payload : new Blob([payload], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
    toast('Arquivo gerado: '+filename);
    return true;
  }catch(e){
    toast('Não foi possível gerar o arquivo neste ambiente.');
    return false;
  }
}
function slug(s){
  return (s||'aluno').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40) || 'aluno';
}
function baseName(){
  const filled = filledAvalKeys();
  const d = (filled.length ? data[filled[filled.length-1]].data : null) || new Date().toISOString().slice(0,10);
  return 'avaliacao-'+slug(data.aluno.nome)+'-'+d;
}
function txtFileName(){
  formToData();
  return slug(data.aluno.nome || 'aluno-sem-nome')+'.txt';
}
function txtPayload(){
  formToData();
  return [
    '# AVALIACAO FISICA - ARQUIVO DE DADOS',
    '# Aluno: '+(data.aluno.nome||'(sem nome)'),
    '# Gerado em: '+new Date().toLocaleString('pt-BR'),
    '# Formato: JSON (versao 1). Linhas iniciadas por # sao ignoradas na leitura.',
    '',
    JSON.stringify(data,null,2)
  ].join('\n');
}
function parseTxt(text){
  const clean = text.split(/\r?\n/).filter(l=>!l.trim().startsWith('#')).join('\n');
  const i = clean.indexOf('{'), j = clean.lastIndexOf('}');
  if(i<0||j<i) throw new Error('JSON não encontrado no arquivo');
  return JSON.parse(clean.slice(i,j+1));
}
function handleFile(input){
  const f = input.files && input.files[0];
  if(!f) return;
  const r = new FileReader();
  r.onload = ()=>{
    try{
      const obj = parseTxt(String(r.result));
      if(!mergeData(obj)) throw new Error('estrutura inválida');
      dataToForm(); refresh(); markBackup();
      toast('Dados carregados de '+f.name);
      selectTab('t-rep');
    }catch(e){
      toast('Arquivo inválido: '+e.message);
    }
    input.value='';
  };
  r.onerror = ()=>{ toast('Falha ao ler o arquivo.'); input.value=''; };
  r.readAsText(f,'utf-8');
}
$('#fileTxt').addEventListener('change', e=>handleFile(e.target));
$('#fileTxt2').addEventListener('change', e=>handleFile(e.target));
$('#btnSaveTxt').addEventListener('click', async ()=>{ if(await offerFile(txtFileName(), txtPayload())) markBackup(); });
$('#btnSaveTxt2').addEventListener('click', async ()=>{ if(await offerFile(txtFileName(), txtPayload())) markBackup(); });
$('#btnBackupNow').addEventListener('click', async ()=>{ if(await offerFile(txtFileName(), txtPayload())) markBackup(); });
$('#btnCopyJson').addEventListener('click', async ()=>{
  formToData();
  const t = JSON.stringify(data,null,2);
  try{ await navigator.clipboard.writeText(t); toast('JSON copiado.'); }
  catch(e){ $('#jsonBox').select(); toast('Selecione e use Ctrl+C.'); }
});
$('#btnApplyJson').addEventListener('click', ()=>{
  try{
    const obj = JSON.parse($('#jsonBox').value);
    if(!mergeData(obj)) throw new Error('estrutura inválida');
    dataToForm(); refresh(); toast('JSON aplicado no formulário.'); selectTab('t-rep');
  }catch(e){ toast('JSON inválido: '+e.message); }
});

/* --- captura da ficha em canvas --- */
async function captureCanvas(){
  if(!hasAnyData()){ toast('Preencha as medidas antes de exportar.'); return null; }
  if(typeof html2canvas !== 'function'){ toast('Biblioteca de imagem indisponível; usando impressão do navegador.'); window.print(); return null; }
  const stage = $('#pdfstage');
  renderReport(stage);
  await new Promise(r=>setTimeout(r,60));
  const node = stage.querySelector('.rep');
  const canvas = await html2canvas(node, {scale:2, backgroundColor:'#ffffff', useCORS:true, logging:false, windowWidth:940});
  stage.innerHTML='';
  return canvas;
}
$('#btnPdf').addEventListener('click', async ()=>{
  const btn = $('#btnPdf'); const old = btn.textContent;
  btn.textContent='Gerando…'; btn.disabled=true;
  try{
    const canvas = await captureCanvas();
    if(!canvas) return;
    const JsPDF = window.jspdf && window.jspdf.jsPDF;
    if(!JsPDF){ toast('Gerador de PDF indisponível; abrindo impressão.'); window.print(); return; }
    const pdf = new JsPDF({unit:'mm', format:'a4', orientation:'portrait'});
    const pw = 210, ph = 297, mg = 8;
    const iw = pw - mg*2;
    const scale = iw / canvas.width;                 // mm por pixel
    const pageHpx = Math.floor((ph - mg*2) / scale); // altura de página em pixels
    let y = 0, page = 0;
    while(y < canvas.height){
      const hpx = Math.min(pageHpx, canvas.height - y);
      const slice = document.createElement('canvas');
      slice.width = canvas.width; slice.height = hpx;
      const ctx = slice.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,slice.width,slice.height);
      ctx.drawImage(canvas, 0, y, canvas.width, hpx, 0, 0, canvas.width, hpx);
      if(page>0) pdf.addPage();
      pdf.addImage(slice.toDataURL('image/jpeg',0.94), 'JPEG', mg, mg, iw, hpx*scale);
      y += hpx; page++;
    }
    const blob = pdf.output('blob');
    await offerFile(baseName()+'.pdf', blob);
  }catch(e){
    console.error(e); toast('Falha ao gerar o PDF; tente a impressão do navegador.');
  }finally{ btn.textContent=old; btn.disabled=false; }
});
$('#btnJpg').addEventListener('click', async ()=>{
  const btn=$('#btnJpg'); const old=btn.textContent;
  btn.textContent='Gerando…'; btn.disabled=true;
  try{
    const canvas = await captureCanvas();
    if(!canvas) return;
    const blob = await new Promise(res=>canvas.toBlob(res,'image/jpeg',0.94));
    await offerFile(baseName()+'.jpg', blob);
  }catch(e){ console.error(e); toast('Falha ao gerar a imagem.'); }
  finally{ btn.textContent=old; btn.disabled=false; }
});

/* =======================================================================
   9. FIGURA 3D (three.js)
   ======================================================================= */
const three = {
  ready:false, mode:'compare', spin:true, unsupported:false,
  detectWebGL(){
    try{
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    }catch(e){ return false; }
  },
  init(){
    if(this.ready || this.unsupported) return;
    if(typeof THREE === 'undefined'){
      this.unsupported = true;
      $('#note3d').textContent = 'A biblioteca 3D não pôde ser carregada (sem conexão com o CDN). As demais abas continuam funcionando normalmente.';
      return;
    }
    if(!this.detectWebGL()){
      this.unsupported = true;
      $('#note3d').textContent = 'Este navegador não tem suporte a WebGL habilitado, então o modelo 3D não pode ser exibido aqui. Tente outro navegador ou ative a aceleração de hardware. As demais abas continuam funcionando normalmente.';
      return;
    }
    try{
      const host = $('#stage3d');
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(38, 1, 1, 4000);
      this.renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, preserveDrawingBuffer:false});
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
      host.appendChild(this.renderer.domElement);

      this.scene.add(new THREE.HemisphereLight(0xffffff, 0x54707c, 0.85));
      const dir = new THREE.DirectionalLight(0xffffff, 0.75); dir.position.set(140,260,220); this.scene.add(dir);
      const dir2 = new THREE.DirectionalLight(0xffffff, 0.3); dir2.position.set(-180,120,-160); this.scene.add(dir2);

      this.root = new THREE.Group(); this.scene.add(this.root);
      this.rotY = 0.35; this.rotX = 0; this.dist = 300; this.targetY = 90;

      /* interação */
      const el = this.renderer.domElement;
      let drag=false, lx=0, ly=0;
      const down = e=>{ drag=true; lx=(e.touches?e.touches[0].clientX:e.clientX); ly=(e.touches?e.touches[0].clientY:e.clientY); };
      const move = e=>{
        if(!drag) return;
        const x=(e.touches?e.touches[0].clientX:e.clientX), y=(e.touches?e.touches[0].clientY:e.clientY);
        this.rotY += (x-lx)*0.01; this.rotX = clamp(this.rotX + (y-ly)*0.005, -0.7, 0.7);
        lx=x; ly=y; if(e.touches) e.preventDefault();
      };
      const up = ()=>{ drag=false; };
      el.addEventListener('mousedown',down); window.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
      el.addEventListener('touchstart',down,{passive:true}); el.addEventListener('touchmove',move,{passive:false}); el.addEventListener('touchend',up);
      el.addEventListener('wheel', e=>{ this.dist = clamp(this.dist + e.deltaY*0.35, 140, 820); e.preventDefault(); }, {passive:false});

      if(window.ResizeObserver) new ResizeObserver(()=>this.resize()).observe(host);
      window.addEventListener('resize',()=>this.resize());

      this.ready = true;
      this.resize();
      const loop = ()=>{
        requestAnimationFrame(loop);
        if(this.spin) this.rotY += 0.0045;
        this.root.rotation.y = this.rotY; this.root.rotation.x = this.rotX;
        this.camera.position.set(0, this.targetY + 40, this.dist);
        this.camera.lookAt(0, this.targetY, 0);
        this.renderer.render(this.scene, this.camera);
      };
      loop();
    }catch(err){
      console.error(err);
      this.unsupported = true;
      $('#note3d').textContent = 'Não foi possível iniciar o modo 3D neste navegador ('+(err && err.message ? err.message : 'erro desconhecido')+'). As demais abas continuam funcionando normalmente.';
    }
  },
  resize(){
    if(!this.ready) return;
    const host = $('#stage3d');
    const w = host.clientWidth || 600, h = host.clientHeight || 420;
    this.renderer.setSize(w,h,false);
    this.camera.aspect = w/h; this.camera.updateProjectionMatrix();
  },
  /* estimativas para campos ausentes, só para desenhar a figura */
  profile(av){
    const H = num(data.aluno.altura) || 170;
    const W = num(av.peso) || 70;
    const ref = Math.cbrt(W/70) * (H/170);
    const g = (k, fallbackCirc)=>{
      const v = num(av[k]);
      return {v: v!==null ? v : fallbackCirc*ref, est: v===null};
    };
    const sexo = data.aluno.sexo;
    const p = {
      H,
      pescoco:   g('pescoco',   sexo==='F'?32:38),
      ombros:    g('ombros',    sexo==='F'?102:115),
      torax:     g('torax',     sexo==='F'?88:98),
      cintura:   g('cintura',   sexo==='F'?74:84),
      abdomen:   g('abdomen',   sexo==='F'?80:90),
      quadril:   g('quadril',   sexo==='F'?98:96),
      braco:     g('bracoD',    sexo==='F'?28:32),
      antebraco: g('antebraco', sexo==='F'?24:27),
      coxa:      g('coxaD',     sexo==='F'?56:56),
      pant:      g('panturrilhaD', sexo==='F'?34:37)
    };
    if(num(av.bracoD)===null && num(av.bracoE)!==null) { p.braco={v:num(av.bracoE), est:false}; }
    if(num(av.coxaD)===null && num(av.coxaE)!==null) { p.coxa={v:num(av.coxaE), est:false}; }
    if(num(av.panturrilhaD)===null && num(av.panturrilhaE)!==null) { p.pant={v:num(av.panturrilhaE), est:false}; }
    if(num(av.torax)===null && num(av.busto)!==null) { p.torax={v:num(av.busto), est:false}; }
    p.any = MEASURES.some(m=>num(av[m.k])!==null);
    return p;
  },
  figure(p, color, opacity){
    const r = c=>c/(2*Math.PI);
    const H = p.H;
    const mat = new THREE.MeshStandardMaterial({color:new THREE.Color(color), roughness:0.62, metalness:0.05,
      transparent: opacity<1, opacity:opacity, depthWrite: opacity>=1});
    const g = new THREE.Group();
    const add = (geo, x,y,z, rz)=>{ const m=new THREE.Mesh(geo,mat); m.position.set(x,y,z); if(rz) m.rotation.z=rz; g.add(m); return m; };

    /* tronco por revolução (perfil de raios) */
    const pts = [];
    const push=(rad,y)=>pts.push(new THREE.Vector2(Math.max(rad,0.6), y));
    push(r(p.quadril.v)*0.55, H*0.455);
    push(r(p.quadril.v),      H*0.515);
    push(r(p.abdomen.v),      H*0.575);
    push(r(p.cintura.v),      H*0.625);
    push(r(p.torax.v)*0.98,   H*0.700);
    push(r(p.torax.v)*0.92,   H*0.760);
    push(r(p.pescoco.v)*1.15, H*0.800);
    push(r(p.pescoco.v)*0.9,  H*0.825);
    const torso = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), mat);
    torso.scale.set(1, 1, 0.74);
    g.add(torso);

    /* ombros */
    const shoulderHalf = p.ombros.v/6.6;
    const shY = H*0.795;
    add(new THREE.SphereGeometry(r(p.braco.v)*1.25, 20, 14), -shoulderHalf, shY, 0);
    add(new THREE.SphereGeometry(r(p.braco.v)*1.25, 20, 14),  shoulderHalf, shY, 0);

    /* braços */
    const upperLen = H*0.165, foreLen = H*0.155;
    [-1,1].forEach(s=>{
      add(new THREE.CylinderGeometry(r(p.braco.v)*1.02, r(p.braco.v)*0.82, upperLen, 18),
          s*(shoulderHalf+4), shY-upperLen/2+2, 0, s*-0.07);
      add(new THREE.CylinderGeometry(r(p.antebraco.v)*0.95, r(p.antebraco.v)*0.6, foreLen, 18),
          s*(shoulderHalf+8), shY-upperLen-foreLen/2+4, 0, s*-0.05);
      add(new THREE.SphereGeometry(r(p.antebraco.v)*0.62, 14, 10), s*(shoulderHalf+10), shY-upperLen-foreLen, 0);
    });

    /* pernas */
    const hipHalf = r(p.quadril.v)*0.5;
    const thighLen = H*0.245, calfLen = H*0.225;
    [-1,1].forEach(s=>{
      add(new THREE.CylinderGeometry(r(p.coxa.v)*1.02, r(p.coxa.v)*0.72, thighLen, 20),
          s*hipHalf, H*0.465-thighLen/2, 0);
      add(new THREE.SphereGeometry(r(p.coxa.v)*0.62, 14, 10), s*hipHalf, H*0.465-thighLen, 0);
      add(new THREE.CylinderGeometry(r(p.pant.v)*1.0, r(p.pant.v)*0.5, calfLen, 18),
          s*hipHalf, H*0.465-thighLen-calfLen/2, 0);
      const foot = add(new THREE.BoxGeometry(r(p.pant.v)*1.3, H*0.022, H*0.075),
          s*hipHalf, H*0.012, H*0.018);
      foot.geometry.translate(0,0,0);
    });

    /* pescoço e cabeça */
    add(new THREE.CylinderGeometry(r(p.pescoco.v)*0.9, r(p.pescoco.v), H*0.045, 20), 0, H*0.845, 0);
    const head = add(new THREE.SphereGeometry(H*0.0455, 26, 20), 0, H*0.925, 0);
    head.scale.set(0.92,1.1,0.95);

    /* cabelo — apenas quando o sexo informado é feminino */
    if(data.aluno.sexo === 'F'){
      const hairMat = new THREE.MeshStandardMaterial({color:new THREE.Color('#2A1D22'), roughness:0.88, metalness:0.02,
        transparent: opacity<1, opacity:opacity, depthWrite: opacity>=1});
      const addHair = (geo,x,y,z,rz)=>{ const m=new THREE.Mesh(geo,hairMat); m.position.set(x,y,z); if(rz) m.rotation.z=rz; g.add(m); return m; };
      const headR = H*0.0455, headY = H*0.925;

      /* touca cobrindo topo, laterais e nuca (estilo chanel) */
      const cap = addHair(new THREE.SphereGeometry(headR*1.16, 22, 16, 0, Math.PI*2, 0, Math.PI*0.74), 0, headY+headR*0.06, -headR*0.05);
      cap.scale.set(0.99,1.05,1.03);

      /* mechas laterais caindo até o peito */
      const strandLen = H*0.155;
      [-1,1].forEach(s=>{
        addHair(new THREE.CylinderGeometry(headR*0.32, headR*0.12, strandLen, 10),
          s*headR*0.8, headY-strandLen/2-headR*0.18, -headR*0.26, s*0.09);
      });

      /* volume na nuca */
      addHair(new THREE.SphereGeometry(headR*0.85, 16, 12), 0, headY-headR*0.4, -headR*0.82);
    }

    return g;
  },
  update(){
    if(!this.ready) return;
    while(this.root.children.length) this.root.remove(this.root.children[0]);

    const H = num(data.aluno.altura) || 170;
    this.targetY = H*0.48; this.dist = clamp(this.dist, 140, 820);

    const estKeys = ['pescoco','ombros','torax','cintura','abdomen','quadril','braco','antebraco','coxa','pant'];
    const hasEstimated = p => estKeys.some(k=>p[k] && p[k].est);

    const notes=[];
    let anyEstimated = false;

    if(this.mode==='compare'){
      const filled = AVAL_KEYS.filter(k=>this.profile(data[k]).any);
      if(!filled.length){
        notes.push('Informe as medidas para gerar o modelo.');
      } else {
        /* posiciona as figuras lado a lado pela largura real de cada uma (braços incluídos),
           com um vão livre entre elas, para que nunca se sobreponham */
        const gap = H*0.10;
        const figs = filled.map(k=>{
          const p = this.profile(data[k]);
          if(hasEstimated(p)) anyEstimated = true;
          const f = this.figure(p, AVAL_COLORS[k], 1);
          const box = new THREE.Box3().setFromObject(f);
          return {f, minX:box.min.x, maxX:box.max.x};
        });
        let x = 0;
        figs.forEach((g,i)=>{
          if(i>0) x += gap - g.minX;
          g.f.position.x = x;
          x += g.maxX;
        });
        const left = figs[0].minX, right = x;
        const shift = (left+right)/2;
        figs.forEach(g=>{ g.f.position.x -= shift; this.root.add(g.f); });
        const totalWidth = right-left;
        /* afasta a câmera automaticamente só o suficiente pra caber todas as figuras,
           sem forçar zoom pra dentro caso o usuário já tenha afastado mais que isso */
        const minDistForFit = totalWidth*0.85 + H*0.80;
        if(this.dist < minDistForFit) this.dist = Math.min(minDistForFit, 820);
        this._floorRadius = Math.max(H*0.42, totalWidth/2 + H*0.12);
      }
    } else {
      const k = 'av'+this.mode;
      const p = this.profile(data[k]);
      if(p.any){
        const f = this.figure(p, AVAL_COLORS[k], 1);
        this.root.add(f);
        if(hasEstimated(p)) anyEstimated = true;
      } else {
        notes.push('Sem medidas na '+AVAL_LABELS[k]+'.');
      }
      this._floorRadius = H*0.42;
    }

    /* piso */
    const floor = new THREE.Mesh(new THREE.CircleGeometry(this._floorRadius || H*0.42, 48),
      new THREE.MeshBasicMaterial({color:0x8fa6b0, transparent:true, opacity:0.16}));
    floor.rotation.x = -Math.PI/2; floor.position.y = 0.4;
    this.root.add(floor);

    /* nota sobre estimativas */
    let txt = 'O modelo é uma representação proporcional: cada segmento usa o raio derivado da circunferência informada (r = C ÷ 2π) e a altura do aluno. Arraste para girar, use a rolagem para aproximar.';
    if(anyEstimated) txt += ' Segmentos sem medida informada foram estimados a partir de peso e altura apenas para completar a figura.';
    if(notes.length) txt = notes.join(' ') + ' ' + txt;
    $('#note3d').textContent = txt;
  }
};
['1','2','3','4','5','6'].forEach(n=>{
  const btn = $('#b3-'+n);
  if(btn) btn.addEventListener('click',()=>set3d(n));
});
$('#b3-c').addEventListener('click',()=>set3d('compare'));
function set3d(m){
  three.mode = m;
  ['1','2','3','4','5','6'].forEach(n=>{ const b=$('#b3-'+n); if(b) b.setAttribute('aria-pressed', String(m===n)); });
  $('#b3-c').setAttribute('aria-pressed', String(m==='compare'));
  three.init(); three.update();
}
$('#b3-spin').addEventListener('click',e=>{
  three.spin=!three.spin; e.currentTarget.setAttribute('aria-pressed', String(three.spin));
});
$('#b3-reset').addEventListener('click',()=>{ three.rotY=0.35; three.rotX=0; three.dist=300; });

/* =======================================================================
   10. AÇÕES AUXILIARES
   ======================================================================= */
function pullFromNext(which){
  formToData();
  const i = AVAL_KEYS.indexOf(which);
  const srcKey = AVAL_KEYS[(i+1)%AVAL_KEYS.length];
  MEASURES.forEach(m=>{ data[which][m.k] = data[srcKey][m.k]; });
  dataToForm(); refresh();
  toast('Medidas puxadas da '+AVAL_LABELS[srcKey]+' — ajuste o que for diferente.');
}
$('#btnPullAv1').addEventListener('click',()=>pullFromNext('av1'));
$('#btnPullAv2').addEventListener('click',()=>pullFromNext('av2'));
$('#btnPullAv3').addEventListener('click',()=>pullFromNext('av3'));
$('#btnPullAv4').addEventListener('click',()=>pullFromNext('av4'));
$('#btnPullAv5').addEventListener('click',()=>pullFromNext('av5'));
$('#btnPullAv6').addEventListener('click',()=>pullFromNext('av6'));
$('#btnClear').addEventListener('click',()=>{
  data = blankData();
  dataToForm(); refresh(); toast('Todos os campos foram limpos.');
});
$('#btnDemo').addEventListener('click',()=>{
  mergeData({
    aluno:{nome:'Aluno de exemplo', sexo:'M', nascimento:'1992-04-18', idade:'34', altura:'176',
      objetivos:['Perder gordura abdominal','Reduzir o percentual de gordura','Ganhar massa muscular'], profissional:''},
    anamnese:{parq1:'N', parq2:'N', parq3:'N', parq4:'N', parq5:'S', parq6:'N', parq7:'N',
      condicoes:['Problemas de coluna'], medicamentos:'', cirurgias:'', lesoes:'Dor lombar leve ao agachar com carga',
      restricoes:'', historicoFamiliar:'Pai hipertenso', paRepouso:'125/80', fcRepouso:'72',
      nivel:'Iniciante', praticaAtual:'Caminhada', freqSemanal:'2', duracao:'40', tempoPratica:'Parado há 1 ano',
      experienciaMusc:'Menos de 6 meses', historicoEsportivo:'Futebol amador até os 25 anos',
      sonoHoras:'6.5', sonoQualidade:'Regular', tabagismo:'Não fuma', alcool:'Socialmente', alimentacao:'Regular',
      nutricionista:'Não', agua:'1.5', estresse:'Moderado', ocupacao:'Predominantemente sentado',
      diasDisponiveis:'4', tempoSessao:'60', horario:'Manhã', local:'Academia', gosta:'Musculação, bike', naoGosta:'Corrida', observacoes:''},
    av1:{data:'2026-03-10', peso:'88.4', pescoco:'40', ombros:'116', torax:'103', busto:'', bracoD:'33', bracoE:'32.5',
         antebraco:'28', abdomen:'99', cintura:'95', quadril:'103', coxaD:'59', coxaE:'58.5', panturrilhaD:'38', panturrilhaE:'38'},
    av2:{data:'2026-06-09', peso:'82.1', pescoco:'39', ombros:'117', torax:'104', busto:'', bracoD:'34', bracoE:'33.5',
         antebraco:'28.5', abdomen:'91', cintura:'87', quadril:'100', coxaD:'59.5', coxaE:'59', panturrilhaD:'38.5', panturrilhaE:'38.5'},
    av3:{data:'2026-08-11', peso:'78.6', pescoco:'38.5', ombros:'118', torax:'105', busto:'', bracoD:'34.5', bracoE:'34',
         antebraco:'28.5', abdomen:'87', cintura:'83', quadril:'98', coxaD:'60', coxaE:'59.5', panturrilhaD:'39', panturrilhaE:'39'},
    av4:{data:'2026-10-13', peso:'76.2', pescoco:'38', ombros:'119', torax:'106', busto:'', bracoD:'35', bracoE:'34.5',
         antebraco:'29', abdomen:'84', cintura:'80', quadril:'97', coxaD:'60.5', coxaE:'60', panturrilhaD:'39.5', panturrilhaE:'39.5'},
    av5:{data:'2026-12-15', peso:'74.8', pescoco:'37.5', ombros:'120', torax:'107', busto:'', bracoD:'35.5', bracoE:'35',
         antebraco:'29', abdomen:'82', cintura:'78', quadril:'96', coxaD:'61', coxaE:'60.5', panturrilhaD:'40', panturrilhaE:'40'},
    av6:{data:'2027-02-16', peso:'73.5', pescoco:'37', ombros:'120', torax:'107', busto:'', bracoD:'36', bracoE:'35.5',
         antebraco:'29.5', abdomen:'80', cintura:'76', quadril:'95', coxaD:'61.5', coxaE:'61', panturrilhaD:'40', panturrilhaE:'40'}
  });
  dataToForm(); refresh(); toast('Exemplo carregado.'); selectTab('t-rep');
});

/* =======================================================================
   11. INICIALIZAÇÃO
   ======================================================================= */
buildAvalForm('av1');
buildAvalForm('av2');
buildAvalForm('av3');
buildAvalForm('av4');
buildAvalForm('av5');
buildAvalForm('av6');
buildObjetivosBox();
buildAnamneseForm();
load();
dataToForm();
document.addEventListener('input', e=>{
  if(!e.target.dataset || !e.target.dataset.path) return;
  setByPath(e.target.dataset.path, e.target.value);
  clearTimeout(window._deb);
  window._deb = setTimeout(refresh, 180);
});
document.addEventListener('change', e=>{
  if(e.target.matches && e.target.matches('#objetivosBox input[type=checkbox]')){
    data.aluno.objetivos = $$('#objetivosBox input[type=checkbox]:checked').map(cb=>cb.dataset.obj);
    refresh();
    return;
  }
  if(e.target.dataset && e.target.dataset.list){
    const path = e.target.dataset.list;
    const boxes = $$('[data-list="'+path+'"]');
    /* "Nenhuma condição relatada" é exclusiva */
    if(e.target.checked){
      if(e.target.value===NENHUMA_COND) boxes.forEach(b=>{ if(b!==e.target) b.checked=false; });
      else boxes.forEach(b=>{ if(b.value===NENHUMA_COND) b.checked=false; });
    }
    setByPath(path, boxes.filter(b=>b.checked).map(b=>b.value));
    refresh();
    return;
  }
  if(!e.target.dataset || !e.target.dataset.path) return;
  if(e.target.closest && e.target.closest('.parq')) markParq();
  let val = e.target.value;
  if(e.target.dataset.path === 'aluno.altura'){
    const fixed = normalizeAltura(val);
    if(fixed !== val){ val = fixed; e.target.value = fixed; toast('Altura ajustada para '+fixed+' cm (parecia estar em metros).'); }
  }
  setByPath(e.target.dataset.path, val);
  refresh();
});
$$('.filelabel').forEach(l=>l.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){ e.preventDefault(); l.querySelector('input').click(); }
}));
refresh();
getDownloads();
