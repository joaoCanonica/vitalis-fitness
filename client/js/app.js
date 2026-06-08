/* VITALIS — app.js (mobile-first rewrite) */

// ── THEME ───────────────────────────────────────────────────
const root = document.documentElement;
function setTheme(t) {
  try {
    root.setAttribute('data-theme', t);
    const ico = document.getElementById('themeIco');
    if (ico) ico.textContent = t === 'dark' ? '☀️' : '🌙';
    const mc = document.getElementById('metaThemeColor');
    if (mc) mc.content = t === 'dark' ? '#0a0a0f' : '#ffffff';
    try { localStorage.setItem('vt', t); } catch(e) {}
  } catch(e) {}
}
function toggleTheme() { setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
(function() {
  try {
    const s = localStorage.getItem('vt');
    if (s) { setTheme(s); return; }
    setTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  } catch(e) { setTheme('dark'); }
})();

// ── SCREENS ─────────────────────────────────────────────────
function show(id) {
  try {
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    const el = document.getElementById(id);
    if (el) { el.classList.add('on'); window.scrollTo(0, 0); }
  } catch(e) {}
}

// ── OPTION BUTTONS ───────────────────────────────────────────
try {
  document.querySelectorAll('.og, .oi-wrap').forEach(g => {
    g.querySelectorAll('.ob').forEach(b => {
      b.addEventListener('click', function() {
        g.querySelectorAll('.ob').forEach(x => x.classList.remove('sel'));
        this.classList.add('sel');
      });
      b.addEventListener('touchend', function(e) { e.preventDefault(); this.click(); }, { passive: false });
    });
  });
} catch(e) {}

// ── DAY BUTTONS ──────────────────────────────────────────────
try {
  document.querySelectorAll('.day-btn').forEach(b => {
    b.addEventListener('click', function() { this.classList.toggle('sel'); });
    b.addEventListener('touchend', function(e) { e.preventDefault(); this.click(); }, { passive: false });
  });
} catch(e) {}

// ── TOGGLES ──────────────────────────────────────────────────
function tgl(id) { const el = document.getElementById(id); if (el) el.classList.toggle('on'); }
try {
  document.querySelectorAll('.tgl-row').forEach(r => {
    r.addEventListener('touchend', function(e) { e.preventDefault(); this.click(); }, { passive: false });
  });
} catch(e) {}

// ── TAG INPUT ────────────────────────────────────────────────
function addTag(e, cid) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const inp = e.target;
    const val = inp.value.trim().replace(/,/g, '');
    if (!val) return;
    const box = document.getElementById(cid);
    const t = document.createElement('div');
    t.className = 'tag-item';
    t.innerHTML = `<span>${escHtml(val)}</span><button class="tag-rm" onclick="this.parentElement.remove()" aria-label="Remover">×</button>`;
    box.insertBefore(t, inp);
    inp.value = '';
  }
}
function escHtml(s) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}
try {
  document.querySelectorAll('.tag-box').forEach(b => {
    b.addEventListener('click', function(e) { if (e.target === this) this.querySelector('.tag-in').focus(); });
  });
} catch(e) {}

// ── STATE ────────────────────────────────────────────────────
let step = 1;
const TOTAL = 8;
let fd = {};

// ── FORM NAVIGATION ──────────────────────────────────────────
function startForm() { step = 1; show('s-form'); updatePrg(); }

function updatePrg() {
  try {
    const pct = Math.round((step / TOTAL) * 100);
    const prgFill = document.getElementById('prgFill');
    if (prgFill) prgFill.style.width = pct + '%';
    const prgLbl = document.getElementById('prgLbl');
    if (prgLbl) prgLbl.textContent = `Etapa ${step} de ${TOTAL}`;
    const prgPct = document.getElementById('prgPct');
    if (prgPct) prgPct.textContent = pct + '%';
    for (let i = 1; i <= TOTAL; i++) {
      const el = document.getElementById(`st${i}`);
      if (el) el.classList.toggle('hide', i !== step);
    }
    const btnVoltar = document.getElementById('btnVoltar');
    if (btnVoltar) btnVoltar.style.display = step === 1 ? 'none' : '';
    const pBtn = document.getElementById('btnProx');
    if (pBtn) {
      if (step === TOTAL) {
        pBtn.innerHTML = 'Processar Avaliação <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>';
      } else {
        pBtn.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      }
    }
    if (step === TOTAL) buildSummary();
  } catch(e) {}
}

function validate(s) {
  if (s === 1) {
    if (!document.getElementById('f-nome').value.trim()) { toast('Por favor, informe seu nome'); return false; }
    const idade = +document.getElementById('f-idade').value;
    if (!idade || idade < 10 || idade > 99) { toast('Informe uma idade válida (10–99)'); return false; }
    const alt = +document.getElementById('f-altura').value;
    if (!alt || alt < 100 || alt > 250) { toast('Informe uma altura válida em cm'); return false; }
    const peso = +document.getElementById('f-peso').value;
    if (!peso || peso < 30 || peso > 300) { toast('Informe um peso válido em kg'); return false; }
    if (!document.getElementById('f-genero').value) { toast('Selecione seu gênero'); return false; }
  }
  return true;
}

function nextStp() {
  try {
    if (!validate(step)) return;
    if (step < TOTAL) { step++; updatePrg(); window.scrollTo(0, 0); }
    else { collectData(); process(); }
  } catch(e) {}
}
function prevStp() {
  try {
    if (step > 1) { step--; updatePrg(); window.scrollTo(0, 0); }
    else show('s-hero');
  } catch(e) {}
}

// ── DATA ─────────────────────────────────────────────────────
function selVal(gid) { const s = document.querySelector(`#${gid} .ob.sel`); return s ? s.dataset.v : null; }
function selDays() { const ds = []; document.querySelectorAll('.day-btn.sel').forEach(d => ds.push(d.dataset.d)); return ds; }

function collectData() {
  try {
    const tPers = document.getElementById('t-pers');
    const tNutri = document.getElementById('t-nutri');
    fd = {
      nome:    (document.getElementById('f-nome') || {}).value?.trim() || '',
      idade:   +(document.getElementById('f-idade') || {}).value || 25,
      genero:  (document.getElementById('f-genero') || {}).value || 'masculino',
      altura:  +(document.getElementById('f-altura') || {}).value || 170,
      peso:    +(document.getElementById('f-peso') || {}).value || 70,
      obj:     selVal('og-obj') || 'fitness-geral',
      nivel:   selVal('og-niv') || 'iniciante',
      dias:    +(document.getElementById('f-dias') || {}).value || 3,
      tempo:   selVal('ow-tmp') || '60',
      local:   selVal('og-loc') || 'academia',
      sono:    +(document.getElementById('f-sono') || {}).value || 7,
      agua:    +(document.getElementById('f-agua') || {}).value || 2,
      str:     selVal('ow-str') || 'moderado',
      sonoQ:   selVal('ow-sono') || 'boa',
      frut:    selVal('ow-frut') || 'diario',
      ind:     selVal('ow-ind') || 'raramente',
      hasP:    tPers ? tPers.classList.contains('on') : false,
      hasN:    tNutri ? tNutri.classList.contains('on') : false,
      daysSel: selDays(),
    };
  } catch(e) {}
}

// ── CALCULATIONS ─────────────────────────────────────────────
function calcIMC(p, h) { return p / ((h / 100) ** 2); }
function calcTMB(p, h, i, g) { return g === 'feminino' ? 10*p + 6.25*h - 5*i - 161 : 10*p + 6.25*h - 5*i + 5; }
function actFact(d) { return d <= 1 ? 1.2 : d <= 3 ? 1.375 : d <= 5 ? 1.55 : 1.725; }
function imcStatus(v) {
  if (v < 18.5) return { lbl: 'Abaixo do Peso', cls: 'bad',  mbg: 'background:var(--rbg);color:var(--red)' };
  if (v < 25)   return { lbl: 'Peso Normal',    cls: 'good', mbg: 'background:var(--gbg);color:var(--green)' };
  if (v < 30)   return { lbl: 'Sobrepeso',      cls: 'ok',   mbg: 'background:var(--ambg);color:var(--amber)' };
                return { lbl: 'Obesidade',      cls: 'bad',  mbg: 'background:var(--rbg);color:var(--red)' };
}

// ── LOADING ──────────────────────────────────────────────────
function process() {
  try {
    show('s-load');
    const ids = ['ls1','ls2','ls3','ls4'];
    let i = 0;
    function tick() {
      try {
        if (i > 0) {
          const p = document.getElementById(ids[i-1]);
          if (p) {
            p.className = 'ls done';
            p.textContent = '✅ ' + p.textContent.replace(/^[^\s]+\s/, '');
          }
        }
        if (i < ids.length) {
          const cur = document.getElementById(ids[i]);
          if (cur) cur.className = 'ls act';
          i++;
          setTimeout(tick, 650 + Math.random() * 350);
        } else {
          setTimeout(() => { buildResults(); show('s-res'); }, 400);
        }
      } catch(e) {}
    }
    tick();
  } catch(e) {}
}

// ── RESULTS ──────────────────────────────────────────────────
const objLabel = { 'perder-peso':'Perder Peso','ganhar-massa':'Ganhar Massa','resistencia':'Resistência','fitness-geral':'Fitness Geral' };
const nivLabel = { 'iniciante':'Iniciante','intermediario':'Intermediário','avancado':'Avançado' };
const locLabel = { 'casa':'Casa','academia':'Academia','ar-livre':'Ar Livre','misto':'Misto' };
const genLabel = { 'masculino':'Masculino','feminino':'Feminino','outro':'Outro' };

function buildResults() {
  const d = fd;
  const iv = calcIMC(d.peso, d.altura);
  const tb = calcTMB(d.peso, d.altura, d.idade, d.genero);
  const td = tb * actFact(d.dias);
  const aguaML = Math.round(d.peso * 35);
  const st = imcStatus(iv);
  const nome = d.nome ? d.nome.split(' ')[0] : 'Usuário';

  document.getElementById('r-nm').textContent = nome;
  document.getElementById('r-imc').textContent = iv.toFixed(1);
  document.getElementById('r-imc-cat').textContent = st.lbl;
  document.getElementById('r-tmb').textContent = Math.round(tb);
  document.getElementById('r-tdee').textContent = Math.round(td);
  document.getElementById('r-agua').textContent = aguaML;

  const badge = document.getElementById('r-badge');
  badge.textContent = '● ' + st.lbl;
  badge.className = 'sc-badge ' + st.cls;

  const mb = document.getElementById('r-imc-bg');
  mb.textContent = st.lbl;
  mb.style.cssText = st.mbg + ';padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600';

  const f = [];
  if (d.dias >= 3) f.push({ ic:'g', sy:'✓', tx:`Frequência de ${d.dias} dias/semana — consistente para resultados sólidos.` });
  if (d.sonoQ === 'boa' || d.sonoQ === 'excelente') f.push({ ic:'g', sy:'✓', tx:'Qualidade de sono boa — essencial para recuperação muscular e hormônios.' });
  if (d.frut === 'diario') f.push({ ic:'g', sy:'✓', tx:'Consumo diário de frutas e verduras — excelente base nutricional.' });
  if (d.str === 'baixo' || d.str === 'moderado') f.push({ ic:'g', sy:'✓', tx:'Nível de estresse controlado — menor interferência no cortisol e recuperação.' });
  if (!f.length) f.push({ ic:'g', sy:'✓', tx:'Fazer esta avaliação já é o primeiro passo — parabéns pela iniciativa!' });

  const a = [];
  if (iv >= 25) a.push({ ic:'w', sy:'!', tx:`IMC ${iv.toFixed(1)} indica ${st.lbl.toLowerCase()}. Déficit calórico e aeróbico são recomendados.` });
  if (d.agua < 2) a.push({ ic:'w', sy:'!', tx:`Ingestão de água baixa (${d.agua}L). Ideal para seu peso: ${(aguaML/1000).toFixed(1)}L/dia.` });
  if (d.sonoQ === 'ruim' || d.sonoQ === 'razoavel') a.push({ ic:'w', sy:'!', tx:'Sono insatisfatório impacta diretamente recuperação, hormônios e composição corporal.' });
  if (d.str === 'alto' || d.str === 'muito-alto') a.push({ ic:'w', sy:'!', tx:'Estresse elevado pode sabotear seus resultados — considere técnicas de gestão.' });
  if (!a.length) a.push({ ic:'w', sy:'!', tx:'Mantenha a consistência — pequenos retrocessos são parte normal do processo.' });

  const r = [];
  const calMeta = d.obj === 'perder-peso' ? Math.round(td-400) : d.obj === 'ganhar-massa' ? Math.round(td+300) : Math.round(td);
  const tipo = d.obj === 'perder-peso' ? 'déficit' : d.obj === 'ganhar-massa' ? 'superávit' : 'manutenção';
  r.push({ ic:'i', sy:'→', tx:`Meta calórica: ${calMeta} kcal/dia (${tipo}).` });
  r.push({ ic:'i', sy:'→', tx:`Proteína: ${Math.round(d.peso*(d.nivel==='avancado'?2.2:1.8))}g/dia para ${d.obj==='ganhar-massa'?'hipertrofia':'preservação muscular'}.` });
  if (!d.hasP) r.push({ ic:'i', sy:'→', tx:'Considere ao menos 1 sessão/semana com personal trainer para ajuste técnico.' });
  r.push({ ic:'i', sy:'→', tx:'Reavalie métricas a cada 4 semanas para ajustar o plano conforme evolução.' });

  renderList('r-fortes', f);
  renderList('r-atenc', a);
  renderList('r-rec', r);
  buildWorkout();
}

function renderList(id, items) {
  document.getElementById(id).innerHTML = items.map(i =>
    `<div class="a-item"><div class="a-ic ${i.ic}">${i.sy}</div><div>${i.tx}</div></div>`
  ).join('');
}

// ── WORKOUT ──────────────────────────────────────────────────
function buildWorkout() {
  const d = fd;
  const dias = d.daysSel.length > 0 ? d.daysSel : ['Seg','Qua','Sex'];
  const plans = {
    'ganhar-massa': [
      { n:'Peito + Tríceps',  ex:[{n:'Supino Reto',s:'4×10-12',t:'Peito'},{n:'Supino Inclinado',s:'3×10',t:'Peito'},{n:'Crucifixo',s:'3×12-15',t:'Peito'},{n:'Tríceps Corda',s:'3×12',t:'Tríceps'},{n:'Tríceps Francês',s:'3×10',t:'Tríceps'}] },
      { n:'Costas + Bíceps',  ex:[{n:'Puxada Aberta',s:'4×10-12',t:'Costas'},{n:'Remada Curvada',s:'4×10',t:'Costas'},{n:'Remada Unilateral',s:'3×12',t:'Costas'},{n:'Rosca Direta',s:'3×12',t:'Bíceps'},{n:'Rosca Martelo',s:'3×10',t:'Bíceps'}] },
      { n:'Pernas + Glúteos', ex:[{n:'Agachamento Livre',s:'4×10-12',t:'Quadríceps'},{n:'Leg Press',s:'4×12',t:'Quadríceps'},{n:'Cadeira Extensora',s:'3×15',t:'Quadríceps'},{n:'Mesa Flexora',s:'3×12',t:'Posterior'},{n:'Panturrilha Em Pé',s:'4×15',t:'Panturrilha'}] },
      { n:'Ombros + Core',    ex:[{n:'Desenvolvimento Livre',s:'4×10',t:'Ombros'},{n:'Elevação Lateral',s:'3×15',t:'Ombros'},{n:'Elevação Frontal',s:'3×12',t:'Ombros'},{n:'Prancha',s:'3×60s',t:'Core'},{n:'Abdominal Infra',s:'3×15',t:'Core'}] },
    ],
    'perder-peso': [
      { n:'Full Body A',       ex:[{n:'Agachamento Livre',s:'3×15',t:'Legs'},{n:'Supino Inclinado',s:'3×12',t:'Peito'},{n:'Remada Cabos',s:'3×12',t:'Costas'},{n:'Stiff',s:'3×15',t:'Posterior'},{n:'Trote 20min',s:'1×20min',t:'Cardio'}] },
      { n:'Full Body B',       ex:[{n:'Leg Press',s:'3×15',t:'Quadríceps'},{n:'Puxada Frente',s:'3×12',t:'Costas'},{n:'Desenvolvimento',s:'3×12',t:'Ombros'},{n:'Panturrilha',s:'3×20',t:'Panturrilha'},{n:'Bike 20min',s:'1×20min',t:'Cardio'}] },
      { n:'Full Body C + HIIT',ex:[{n:'Agachamento Sumô',s:'3×15',t:'Glúteo'},{n:'Crucifixo',s:'3×15',t:'Peito'},{n:'Prancha',s:'3×45s',t:'Core'},{n:'Abdominal Reto',s:'3×20',t:'Core'},{n:'HIIT 15min',s:'1×15min',t:'Cardio'}] },
    ],
    'fitness-geral': [
      { n:'Superior A',        ex:[{n:'Supino Reto',s:'3×12',t:'Peito'},{n:'Puxada Frente',s:'3×12',t:'Costas'},{n:'Desenvolvimento',s:'3×12',t:'Ombros'},{n:'Rosca Direta',s:'3×12',t:'Bíceps'},{n:'Tríceps Corda',s:'3×12',t:'Tríceps'}] },
      { n:'Inferior',          ex:[{n:'Agachamento',s:'3×12',t:'Quadríceps'},{n:'Leg Press',s:'3×15',t:'Quadríceps'},{n:'Mesa Flexora',s:'3×12',t:'Posterior'},{n:'Abdutor',s:'3×15',t:'Glúteo'},{n:'Panturrilha',s:'4×15',t:'Panturrilha'}] },
      { n:'Superior B + Core', ex:[{n:'Remada Curvada',s:'3×12',t:'Costas'},{n:'Crucifixo',s:'3×12',t:'Peito'},{n:'Elevação Lateral',s:'3×15',t:'Ombros'},{n:'Prancha',s:'3×45s',t:'Core'},{n:'Abdomen Oblíquo',s:'3×15',t:'Core'}] },
    ],
    'resistencia': [
      { n:'Resistência A',     ex:[{n:'Corrida Contínua',s:'1×30min',t:'Cardio'},{n:'Agachamento',s:'4×20',t:'Força'},{n:'Supino Leve',s:'4×20',t:'Força'},{n:'Prancha',s:'3×60s',t:'Core'}] },
      { n:'HIIT + Força',      ex:[{n:'HIIT Tiro Curto',s:'8×30s',t:'Cardio'},{n:'Remada Cabos',s:'4×20',t:'Costas'},{n:'Desenvolvimento',s:'4×15',t:'Ombros'},{n:'Abdominal',s:'3×20',t:'Core'}] },
      { n:'Endurance',         ex:[{n:'Bike ou Elíptico',s:'1×45min',t:'Cardio'},{n:'Leg Press Leve',s:'4×20',t:'Pernas'},{n:'Flexão de Braço',s:'3×máx',t:'Peito'},{n:'Abdominal Reto',s:'4×20',t:'Core'}] },
    ],
  };
  const plan = plans[d.obj] || plans['fitness-geral'];
  const c = document.getElementById('wk-container');
  c.innerHTML = dias.map((dia, i) => {
    const t = plan[i % plan.length];
    return `<div class="wd" id="wd${i}">
      <div class="wd-hdr" onclick="toggleWD('wd${i}')">
        <div><div class="wd-t">${dia} — ${t.n}</div><div class="wd-s">${t.ex.length} exercícios · ${d.tempo}min</div></div>
        <span class="wd-chv">⌄</span>
      </div>
      <div class="wd-exs">
        ${t.ex.map((ex, j) => `<div class="ex-row"><div class="ex-num">${j+1}</div><div class="ex-inf"><div class="ex-n">${ex.n}</div><div class="ex-d">${ex.s}</div></div><div class="ex-tg">${ex.t}</div></div>`).join('')}
      </div>
    </div>`;
  }).join('');
  const first = document.getElementById('wd0');
  if (first) first.classList.add('open');
}
function toggleWD(id) {
  try {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  } catch(e) {}
}

// ── SUMMARY ──────────────────────────────────────────────────
function buildSummary() {
  const nome  = document.getElementById('f-nome').value.trim() || '—';
  const idade = document.getElementById('f-idade').value || '—';
  const alt   = document.getElementById('f-altura').value || '—';
  const peso  = document.getElementById('f-peso').value || '—';
  const gen   = document.getElementById('f-genero').value || '—';
  const obj   = selVal('og-obj') || '—';
  const niv   = selVal('og-niv') || '—';
  const dias  = document.getElementById('f-dias').value;
  const loc   = selVal('og-loc') || '—';
  document.getElementById('st8').innerHTML = `
    <div class="stp-t">Confirme seus Dados</div>
    <div class="stp-s">Revise as informações antes de processar sua avaliação.</div>
    <div class="sum-card">
      <h3>Dados Pessoais</h3>
      <div class="sum-row"><span class="s-lbl">Nome</span><span class="s-val">${escHtml(nome)}</span></div>
      <div class="sum-row"><span class="s-lbl">Idade</span><span class="s-val">${idade} anos</span></div>
      <div class="sum-row"><span class="s-lbl">Altura</span><span class="s-val">${alt} cm</span></div>
      <div class="sum-row"><span class="s-lbl">Peso</span><span class="s-val">${peso} kg</span></div>
      <div class="sum-row"><span class="s-lbl">Gênero</span><span class="s-val">${genLabel[gen]||gen}</span></div>
    </div>
    <div class="sum-card">
      <h3>Treino & Objetivos</h3>
      <div class="sum-row"><span class="s-lbl">Objetivo</span><span class="s-val">${objLabel[obj]||obj}</span></div>
      <div class="sum-row"><span class="s-lbl">Nível</span><span class="s-val">${nivLabel[niv]||niv}</span></div>
      <div class="sum-row"><span class="s-lbl">Dias/semana</span><span class="s-val">${dias}</span></div>
      <div class="sum-row"><span class="s-lbl">Local</span><span class="s-val">${locLabel[loc]||loc}</span></div>
    </div>
    <div class="notice">🔒 <span>Todos os dados são processados <strong>100% localmente</strong>. Nenhuma informação é enviada ou armazenada.</span></div>`;
}

// ── EXPORT ───────────────────────────────────────────────────
function exportPDF() { toast('PDF em breve — recurso em desenvolvimento!'); }
function shareWA() {
  if (!fd.nome) { toast('Complete a avaliação primeiro'); return; }
  const iv = calcIMC(fd.peso, fd.altura).toFixed(1);
  const tb = Math.round(calcTMB(fd.peso, fd.altura, fd.idade, fd.genero));
  const msg = `*Vitalis — Minha Avaliação Fitness*\n\n👤 *${fd.nome}*\n📊 IMC: ${iv} (${imcStatus(+iv).lbl})\n🔥 TMB: ${tb} kcal/dia\n🎯 Objetivo: ${objLabel[fd.obj]||fd.obj}\n💪 Nível: ${nivLabel[fd.nivel]||fd.nivel}\n\n_Gerado pelo Vitalis_`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}

// ── RESET ────────────────────────────────────────────────────
function reset() {
  fd = {}; step = 1;
  ['f-nome','f-idade','f-altura','f-peso','f-pdej','f-mot'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['f-genero','f-prazo'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.querySelectorAll('.ob.sel').forEach(b => b.classList.remove('sel'));
  document.querySelectorAll('.day-btn.sel').forEach(b => b.classList.remove('sel'));
  document.querySelectorAll('.tgl.on').forEach(t => t.classList.remove('on'));
  document.querySelectorAll('.tag-item').forEach(t => t.remove());
  ['ow-frut','ow-ind','ow-tmp','og-loc'].forEach(gid => {
    const defaults = { 'ow-frut':'diario','ow-ind':'nunca','ow-tmp':'60','og-loc':'academia' };
    const btn = document.querySelector(`#${gid} [data-v="${defaults[gid]}"]`);
    if (btn) btn.classList.add('sel');
  });
  show('s-hero');
}

// ── TOAST ────────────────────────────────────────────────────
function toast(msg) {
  try {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('on'), 2800);
  } catch(e) {}
}

// ── INIT ─────────────────────────────────────────────────────
try {
  const btnVoltar = document.getElementById('btnVoltar');
  if (btnVoltar) btnVoltar.style.display = 'none';
} catch(e) {}

// Prevent double-tap zoom on iOS (keep inputs working)
let _lt = 0;
document.addEventListener('touchend', function(e) {
  const now = Date.now();
  const tag = e.target.tagName;
  if (now - _lt < 350 && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
    e.preventDefault();
  }
  _lt = now;
}, { passive: false });

// Expor funções globalmente
window.startForm = startForm;
window.nextStp = nextStp;
window.prevStp = prevStp;
window.show = show;
window.tgl = tgl;
window.addTag = addTag;
window.exportPDF = exportPDF;
window.shareWA = shareWA;
window.reset = reset;
window.toggleTheme = toggleTheme;
window.toggleWD = toggleWD;
window.buildWorkout = buildWorkout;
