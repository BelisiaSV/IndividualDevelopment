// ============================================================
// SIDEBAR & NAV
// ============================================================
function renderSidebar(){
  const p=S.profile;
  const logo=S.clubLogo?`<img src="${S.clubLogo}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0" alt="Club logo">`:`<div style="width:36px;height:36px;background:#4FA8D1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#fff;flex-shrink:0;font-family:var(--fc)">BSV</div>`;
  const coachNav=isCoach()?`
    <div class="sbl">Kern</div>
    <div class="sbi" onclick="nav('spelers',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.85"/></svg>Kern <span class="sbadge" id="kern-count">${S.players.length}</span></div>
    <div class="sbi" onclick="nav('werkpunten',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>Werkpunten</div>
    <div class="sbi" onclick="nav('pop',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>POP / PAP</div>
    <div class="sbi" onclick="nav('fysiek',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Fysiek & KPI</div>
    <div class="sbi" onclick="nav('kpibeheer',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>KPI Beheer</div>
    <div class="sbl">Planning</div>
    <div class="sbi" onclick="nav('training',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Trainingsplan</div>
    <div class="sbi" onclick="nav('oefenvormen',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>Oefenvormen</div>
    <div class="sbl">Rapportage</div>
    <div class="sbi" onclick="nav('export',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export & Grafieken</div>
    <div class="sbl">Profiel</div>
    <div class="sbi" onclick="nav('portfolio',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>Coach Portfolio</div>
    <div class="sbi" onclick="nav('licentie',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>Pro License</div>`
  :`<div class="sbl">Mijn dashboard</div>
    <div class="sbi" onclick="openMyProfile()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>Mijn profiel</div>`;
  document.getElementById('sidebar').innerHTML=`
    <div style="padding:18px 16px 14px;border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="display:flex;align-items:center;gap:10px">
        ${logo}
        <div><div style="font-family:var(--fc);font-size:17px;font-weight:700;color:#fff">${S.clubName||'Belisia SV'}</div><div style="font-size:11px;color:rgba(255,255,255,.4)">Performance Platform</div></div>
      </div>
    </div>
    <div style="padding:6px 8px">
      <div class="sbi active" onclick="nav('dashboard',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>Dashboard</div>
      ${coachNav}
    </div>
    <div style="margin-top:auto;padding:12px 8px;border-top:1px solid rgba(255,255,255,.08)">
      <div style="display:flex;align-items:center;gap:10px;padding:8px 10px">
        <div style="width:32px;height:32px;border-radius:50%;background:#4FA8D1;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0">${ini(p?.name)}</div>
        <div><div style="font-size:12px;color:rgba(255,255,255,.7);font-weight:500">${p?.name||'Gebruiker'}</div><div style="font-size:10px;color:rgba(255,255,255,.35)">${isCoach()?'Coach':'Speler'} · ${S.clubName||'Belisia SV'}</div></div>
      </div>
      <button onclick="doLogout()" style="width:100%;padding:7px;background:rgba(255,255,255,.06);border:none;border-radius:7px;color:rgba(255,255,255,.5);font-size:12px;cursor:pointer;font-family:var(--f)">Uitloggen</button>
    </div>`;
}

function nav(page,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sbi').forEach(i=>i.classList.remove('active'));
  document.getElementById('pg-'+page)?.classList.add('active');
  if(el)el.classList.add('active');
  const titles={dashboard:'Dashboard',spelers:'Kern',werkpunten:'Werkpunten',pop:'POP / PAP',fysiek:'Fysiek & KPI',kpibeheer:'KPI Beheer',training:'Trainingsplan',oefenvormen:'Oefenvormen',export:'Export & Grafieken',portfolio:'Coach Portfolio',licentie:'Pro License','speler-detail':'Spelerprofiel'};
  document.getElementById('topTitle').textContent=titles[page]||page;
  const acts={
    spelers:isCoach()?'<button class="btn bp sm" onclick="om(\'addSpeler\')">+ Speler</button>':'',
    werkpunten:'<button class="btn bp sm" onclick="om(\'addWerkpuntDirect\')">+ Werkpunt toevoegen</button>',
    pop:'<button class="btn bp sm" onclick="om(\'addPop\')">+ Gesprek</button>',
    training:'<button class="btn bp sm" onclick="om(\'addSession\')">+ Sessie</button>',
    oefenvormen:'<button class="btn bp sm" onclick="om(\'addOefenvorm\')">+ Oefenvorm</button>',
    portfolio:'<button class="btn bp sm" onclick="om(\'addCarriere\')">+ Carrièrepunt</button>',
    licentie:'<button class="btn bp sm" onclick="om(\'addLeerlog\')">+ Leerlog</button>',
  };
  document.getElementById('topActs').innerHTML=acts[page]||'';
  const renders={dashboard:renderDashboard,spelers:renderSpelers,werkpunten:renderWerkpuntenPage,pop:renderPopPage,fysiek:renderFysiek,kpibeheer:renderKpiBeheer,training:renderTraining,oefenvormen:renderOefenvormen,export:()=>setTimeout(renderExport,80),portfolio:renderPortfolio,licentie:renderLicentie};
  renders[page]?.();
}

function om(id){document.getElementById('m-'+id)?.classList.add('open');}
function cm(id){document.getElementById('m-'+id)?.classList.remove('open');}
function switchTab(el,pid){
  el.closest('.tabs').querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  el.closest('.page,.modal').querySelectorAll('.tp').forEach(p=>p.classList.remove('active'));
  document.getElementById(pid)?.classList.add('active');
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard(){
  const el=document.getElementById('pg-dashboard');
  if(isCoach()){
    const att=S.players.length?Math.round(S.players.reduce((a,p)=>a+(p.presence||[]).filter(x=>x==='present').length/Math.max((p.presence||[]).length,1),0)/S.players.length*100):0;
    const wps=S.players.reduce((a,p)=>a+(p.werkpunten||[]).length,0);
    const pops=S.players.reduce((a,p)=>a+(p.popHistory||[]).length,0);
    const usage={};S.players.forEach(p=>(p.werkpunten||[]).forEach(w=>(w.principes||[]).forEach(pr=>{usage[pr]=(usage[pr]||0)+1;})));
    const top=Object.entries(usage).sort((a,b)=>b[1]-a[1]).slice(0,6);
    el.innerHTML=`
      <div style="background:#4FA8D1;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="font-size:13px;font-weight:600;color:#fff">Seizoen 2025–2026 actief</span>
      </div>
      <div class="stats-row">
        <div class="stat"><div class="slbl">Kern</div><div class="sval">${S.players.length}</div><div class="ssub">${S.players.filter(p=>p.injury).length} geblesseerd</div></div>
        <div class="stat"><div class="slbl">Gem. aanwezigheid</div><div class="sval">${att}%</div></div>
        <div class="stat"><div class="slbl">Werkpunten</div><div class="sval">${wps}</div></div>
        <div class="stat"><div class="slbl">POP gesprekken</div><div class="sval">${pops}</div></div>
      </div>
      <div class="g2">
        <div class="card"><div class="ctitle">Aandacht vereist</div>
          <table class="tbl"><thead><tr><th>Speler</th><th>Reden</th><th></th></tr></thead><tbody>
          ${S.players.filter(p=>p.injury||!(p.werkpunten||[]).length).slice(0,6).map(p=>`<tr><td><b>${p.name}</b></td><td>${p.injury?'<span class="bdg red">Blessure</span>':'<span class="bdg gray">Geen werkpunt</span>'}</td><td><button class="btn bg xs" onclick="openPlayer(${p.id})">Open</button></td></tr>`).join('')||'<tr><td colspan="3" style="color:var(--t3)">Alles in orde ✓</td></tr>'}
          </tbody></table>
        </div>
        <div class="card"><div class="ctitle">Principes in gebruik</div>
          ${top.map(([l,v])=>`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--t2);margin-bottom:3px"><span>${l}</span><span>${v}</span></div><div style="height:7px;background:var(--bg);border-radius:4px;overflow:hidden"><div style="height:100%;background:#4FA8D1;width:${Math.round(v/Math.max(S.players.length,1)*100)}%"></div></div></div>`).join('')||'<div style="color:var(--t3);font-size:13px">Nog geen principes.</div>'}
        </div>
      </div>`;
  } else {
    const me=S.players.find(p=>p.profile_id===S.profile?.id);
    el.innerHTML=me?renderPlayerDashboard(me):`<div class="card"><div style="color:var(--t3);font-size:13px">Je account is nog niet gekoppeld aan een spelersprofiel. Vraag je coach om dit te doen.</div></div>`;
  }
}

// ============================================================
// SPELERS — fix: geen re-render bij typen, lijn-filter
// ============================================================
function renderSpelers(){
  const el=document.getElementById('pg-spelers');
  const lijnen={
    'Alle lijnen': null,
    'Keepers': ['GK'],
    'Verdedigers': ['CB','LB','RB','SW'],
    'Middenvelders': ['CDM','CM','CAM','DM'],
    'Aanvallers': ['LW','RW','ST','CF','SS']
  };
  el.innerHTML=`
    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
      <input id="plSearch" class="sinput" placeholder="Speler zoeken op naam..." style="min-width:200px">
      <select id="lijnFilter" class="fsel">
        ${Object.keys(lijnen).map(l=>`<option value="${l}">${l}</option>`).join('')}
      </select>
      <select id="posFilter" class="fsel">
        <option value="">Alle posities</option>
        ${[...new Set(S.players.map(p=>p.pos))].sort().map(p=>`<option value="${p}">${p}</option>`).join('')}
      </select>
      <button class="btn bp sm" onclick="om('addSpeler')">+ Speler</button>
    </div>
    <div id="playerGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px"></div>`;

  // Gebruik addEventListener in plaats van oninput om re-render te voorkomen
  document.getElementById('plSearch').addEventListener('input', filterSpelers);
  document.getElementById('lijnFilter').addEventListener('change', filterSpelers);
  document.getElementById('posFilter').addEventListener('change', filterSpelers);
  filterSpelers();
}

function filterSpelers(){
  const q=(document.getElementById('plSearch')?.value||'').toLowerCase();
  const lijn=document.getElementById('lijnFilter')?.value||'Alle lijnen';
  const pos=document.getElementById('posFilter')?.value||'';
  const lijnen={'Keepers':['GK'],'Verdedigers':['CB','LB','RB','SW'],'Middenvelders':['CDM','CM','CAM','DM'],'Aanvallers':['LW','RW','ST','CF','SS']};
  const filtered=S.players.filter(p=>{
    if(q&&!p.name.toLowerCase().includes(q)&&!p.pos?.toLowerCase().includes(q))return false;
    if(lijn&&lijn!=='Alle lijnen'){const poses=lijnen[lijn]||[];if(!poses.includes(p.pos))return false;}
    if(pos&&p.pos!==pos)return false;
    return true;
  });
  const grid=document.getElementById('playerGrid');
  if(!grid)return;
  grid.innerHTML=filtered.map(p=>{
    const att=Math.round((p.presence||[]).filter(x=>x==='present').length/Math.max((p.presence||[]).length,1)*100);
    return`<div style="background:#fff;border:1px solid var(--brd);border-radius:10px;padding:16px;cursor:pointer;transition:all .15s;position:relative" onclick="openPlayer(${p.id})" onmouseenter="this.style.borderColor='#4FA8D1'" onmouseleave="this.style.borderColor='var(--brd)'">
      ${p.injury?'<span class="bdg red" style="position:absolute;top:10px;right:10px">Blessure</span>':''}
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div style="width:40px;height:40px;border-radius:50%;background:${p.color||'#4FA8D1'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#fff;flex-shrink:0">${ini(p.name)}</div>
        <div><div style="font-weight:600">${p.name}</div><div style="font-size:11px;color:var(--t3)">${p.pos||'—'} · ${p.age||'—'} jr</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
        ${[['Gewicht',(p.weight||[])[(p.weight||[]).length-1]?.w+' kg'],['Aanw.',att+'%'],['Werkpunten',(p.werkpunten||[]).length],["POP's",(p.popHistory||[]).length]].map(([l,v])=>`<div style="background:var(--bg);border-radius:6px;padding:5px 7px"><div style="font-size:10px;color:var(--t3)">${l}</div><div style="font-size:13px;font-weight:600">${v}</div></div>`).join('')}
      </div>
    </div>`;
  }).join('')||'<div style="color:var(--t3);font-size:13px;padding:20px">Geen spelers gevonden.</div>';
}

function openPlayer(id){
  S.activePlayer=id;
  const p=S.players.find(x=>x.id==id);if(!p)return;
  renderPlayerDetail(p);
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.getElementById('pg-speler-detail').classList.add('active');
  document.getElementById('topTitle').textContent=p.name+' — '+(p.pos||'');
  document.getElementById('topActs').innerHTML=`<button class="btn bg sm" onclick="nav('spelers',null)">← Kern</button><button class="btn bp sm" onclick="om('addPop')">+ POP/PAP</button>`;
}
function openMyProfile(){const me=S.players.find(p=>p.profile_id===S.profile?.id);if(me)openPlayer(me.id);}

function renderPlayerDetail(p){
  const att=Math.round((p.presence||[]).filter(x=>x==='present').length/Math.max((p.presence||[]).length,1)*100);
  const mxW=Math.max(...(p.weight||[{w:75}]).map(x=>x.w)),mnW=Math.min(...(p.weight||[{w:75}]).map(x=>x.w));
  document.getElementById('pg-speler-detail').innerHTML=`
    <div style="background:var(--txt);border-radius:10px;padding:20px 24px;margin-bottom:20px;display:flex;align-items:center;gap:16px">
      <div style="width:56px;height:56px;border-radius:50%;background:${p.color||'#4FA8D1'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;color:#fff">${ini(p.name)}</div>
      <div><div style="font-family:var(--fc);font-size:22px;font-weight:700;color:#fff">${p.name}</div>
      <div style="font-size:13px;color:rgba(255,255,255,.5)">${p.pos||'—'} · ${p.age||'—'} jaar · ${(p.weight||[])[(p.weight||[]).length-1]?.w||'—'} kg</div>
      <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">${p.injury?'<span class="bdg red">Blessure</span>':''}${att<65?'<span class="bdg amber">Lage aanwezigheid</span>':''}</div></div>
    </div>
    <div class="tabs">
      <div class="tab active" onclick="switchTab(this,'tp-ov')">Overzicht</div>
      <div class="tab" onclick="switchTab(this,'tp-wp')">Werkpunten</div>
      <div class="tab" onclick="switchTab(this,'tp-pop')">POP/PAP</div>
      <div class="tab" onclick="switchTab(this,'tp-aanw')">Aanwezigheid</div>
    </div>
    <div class="tp active" id="tp-ov">
      <div class="g2" style="margin-bottom:16px">
        <div class="card"><div class="ctitle">Gewicht</div>
          <div style="display:flex;align-items:flex-end;gap:8px;height:70px">
            ${(p.weight||[]).map(w=>{const h=mxW===mnW?40:Math.round(16+((w.w-mnW)/(mxW-mnW))*44);return`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px"><div style="width:100%;background:#4FA8D1;border-radius:4px 4px 0 0;height:${h}px;position:relative"><span style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:600;color:#2B7FA8;white-space:nowrap">${w.w}</span></div><div style="font-size:9px;color:var(--t3)">${w.d}</div></div>`;}).join('')}
          </div>
          ${isCoach()?`<div style="margin-top:14px;display:flex;gap:8px;align-items:flex-end">
            <div style="flex:1"><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">Nieuw gewicht (kg)</label>
            <input type="number" id="nwv" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--brd);border-radius:7px;background:var(--bg)"></div>
            <button class="btn bp sm" onclick="doSaveWeight(${p.id})">Opslaan</button></div>`:''}
        </div>
        <div class="card"><div class="ctitle">KPI ${isCoach()?`<button class="btn bg xs" style="margin-left:auto" onclick="openEditKpi(${p.id})">✏ Bewerken</button>`:''}</div>
          ${S.kpis.map(k=>`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--t2);margin-bottom:3px;font-weight:500"><span>${k.name}</span><span>${p.kpis?.[k.id]||k.default_val}${k.unit==='pct'?'%':k.unit==='km'?' km':''}</span></div><div style="height:7px;background:var(--bg);border-radius:4px;overflow:hidden"><div style="height:100%;background:#4FA8D1;width:${Math.min(100,k.unit==='km'?(p.kpis?.[k.id]||k.default_val)/12*100:(p.kpis?.[k.id]||k.default_val))}%"></div></div></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="tp" id="tp-wp">
      ${isCoach()?`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><div style="font-weight:700">Principes (sleep naar werkpunt)</div><button class="btn bp sm" onclick="om('addWerkpunt')">+ Werkpunt</button></div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;padding:10px;background:var(--bg);border-radius:8px;border:1px solid var(--brd);min-height:44px;margin-bottom:12px">${S.principes.map(pr=>`<span class="chip ${pr.color}" draggable="true" data-label="${pr.label}" ondragstart="onDS(event)">${pr.label}</span>`).join('')}</div>`:''}
      <div id="wpl-${p.id}">${renderWPs(p)}</div>
    </div>
    <div class="tp" id="tp-pop">
      ${isCoach()?`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="font-weight:700">Gesprekken</div><button class="btn bp sm" onclick="om('addPop')">+ Gesprek</button></div>`:''}
      <div id="popl-${p.id}">${renderPopList(p)}</div>
    </div>
    <div class="tp" id="tp-aanw">
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${[['#D1FAE5','#065F46','aanwezig','Aanwezig'],['#FEE2E2','#991B1B','absent','Afwezig'],['#E6F4FB','#2B7FA8','match','Wedstrijd'],['#FEF3C7','#92400E','injury','Blessure'],['#E9D5FF','#6B21A8','rtp','Return-to-play']].map(([bg,c,v,l])=>`<span style="display:flex;align-items:center;gap:4px;font-size:11px"><span style="width:10px;height:10px;border-radius:2px;background:${bg};display:inline-block"></span>${l}</span>`).join('')}
        </div>
        ${isCoach()?`<button class="btn bp sm" style="margin-left:auto" onclick="addPresenceEntry(${p.id})">+ Dag toevoegen</button>`:''}
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="ctitle">Aanwezigheidskalender</div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;min-width:600px">
            <thead><tr>
              <th style="text-align:left;font-size:11px;color:var(--t3);padding:4px 8px;font-weight:600">Datum</th>
              <th style="text-align:left;font-size:11px;color:var(--t3);padding:4px 8px;font-weight:600">Dag</th>
              <th style="text-align:left;font-size:11px;color:var(--t3);padding:4px 8px;font-weight:600">Type</th>
              <th style="text-align:left;font-size:11px;color:var(--t3);padding:4px 8px;font-weight:600">Status</th>
              <th style="text-align:left;font-size:11px;color:var(--t3);padding:4px 8px;font-weight:600">Notitie</th>
              ${isCoach()?'<th></th>':''}
            </tr></thead>
            <tbody>
              ${((p.presenceLog||[]).slice().reverse()).map((entry,ri)=>{
                const i=(p.presenceLog||[]).length-1-ri;
                const bg=entry.status==='aanwezig'?'#D1FAE5':entry.status==='absent'?'#FEE2E2':entry.status==='match'?'#E6F4FB':entry.status==='rtp'?'#E9D5FF':'#FEF3C7';
                const c=entry.status==='aanwezig'?'#065F46':entry.status==='absent'?'#991B1B':entry.status==='match'?'#2B7FA8':entry.status==='rtp'?'#6B21A8':'#92400E';
                const labels={aanwezig:'Aanwezig',absent:'Afwezig',match:'Wedstrijd',injury:'Blessure',rtp:'Return-to-play'};
                const types={training:'Training',wedstrijd:'Wedstrijd',herstel:'Herstel',individueel:'Individueel'};
                return`<tr style="border-bottom:1px solid var(--brd)">
                  <td style="padding:8px;font-size:13px;font-weight:500">${entry.date||'—'}</td>
                  <td style="padding:8px;font-size:12px;color:var(--t3)">${entry.day||'—'}</td>
                  <td style="padding:8px;font-size:12px;color:var(--t3)">${types[entry.type]||entry.type||'—'}</td>
                  <td style="padding:8px"><span style="background:${bg};color:${c};font-size:11px;padding:2px 8px;border-radius:20px;font-weight:600">${labels[entry.status]||entry.status}</span></td>
                  <td style="padding:8px;font-size:12px;color:var(--t3)">${entry.note||'—'}</td>
                  ${isCoach()?`<td style="padding:8px"><button class="btn bg xs" onclick="delPresenceEntry(${p.id},${i})">✕</button></td>`:''}
                </tr>`;
              }).join('')||`<tr><td colspan="6" style="padding:20px;text-align:center;color:var(--t3);font-size:13px">Nog geen aanwezigheid geregistreerd. Klik "+ Dag toevoegen".</td></tr>`}
            </tbody>
          </table>
        </div>
        <div style="margin-top:10px;display:flex;gap:10px;font-size:12px;color:var(--t2)">
          <span>✅ Aanwezig: <strong>${(p.presenceLog||[]).filter(e=>e.status==='aanwezig').length}</strong></span>
          <span>❌ Afwezig: <strong>${(p.presenceLog||[]).filter(e=>e.status==='absent').length}</strong></span>
          <span>⚽ Wedstrijd: <strong>${(p.presenceLog||[]).filter(e=>e.status==='match').length}</strong></span>
          <span>🤕 Blessure: <strong>${(p.presenceLog||[]).filter(e=>e.status==='injury').length}</strong></span>
        </div>
      </div>
      <div class="card"><div class="ctitle">Blessures</div>
        ${(p.injuries||[]).map(inj=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--brd)"><div style="width:8px;height:8px;border-radius:50%;background:${inj.active?'#E05252':'#2EAA6A'};flex-shrink:0"></div><div><div style="font-size:13px;font-weight:600">${inj.type}</div><div style="font-size:11px;color:var(--t3)">${inj.date_start||''} · ${inj.active?'Actief':'Hersteld'}</div></div></div>`).join('')||'<div style="font-size:13px;color:var(--t3)">Geen blessures.</div>'}
      </div>
    </div>\`;
}

function renderWPs(p){
  if(!(p.werkpunten||[]).length)return`<div style="font-size:13px;color:var(--t3);padding:12px 0">Geen werkpunten.</div>`;
  return p.werkpunten.map(w=>`<div style="background:var(--bg);border:1px solid var(--brd);border-radius:8px;padding:14px;margin-bottom:10px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <div style="font-weight:600;font-size:14px;flex:1">${w.text}</div>
      <span class="bdg blue">${w.cat}</span>
      ${isCoach()?`<button class="btn bg xs" onclick="delWP(${p.id},'${w.id}')">✕</button>`:''}
    </div>
    <div id="dz-${w.id}" style="min-height:52px;background:#fff;border:2px dashed var(--brd);border-radius:8px;padding:8px;display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start" ${isCoach()?`ondragover="oDO(event)" ondrop="oDr(event,${p.id},'${w.id}')" ondragleave="this.style.borderColor='var(--brd)'"`:''}>
      ${(w.principes||[]).map(pr=>{const f=S.principes.find(x=>x.label===pr);return`<span class="chip ${f?f.color:'chip-blue'}">${pr}${isCoach()?`<em style="cursor:pointer;opacity:.4;font-style:normal;margin-left:3px" onclick="delPr(${p.id},'${w.id}','${pr}')">×</em>`:''}</span>`;}).join('')}
      ${!(w.principes||[]).length?`<span style="font-size:12px;color:var(--t3);font-style:italic">${isCoach()?'Sleep principes...':'Geen.'}</span>`:''}
    </div>
    <div style="margin-top:10px">
      <div style="font-size:11px;font-weight:600;color:var(--t3);margin-bottom:5px;display:flex;justify-content:space-between">ACTIEPUNTEN ${isCoach()?`<button class="btn bg xs" onclick="S.activeWerkpuntId='${w.id}';om('addActie')">+ Actie</button>`:''}</div>
      ${(w.acties||[]).map((a,ai)=>`<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--brd);font-size:13px">
        <div style="width:18px;height:18px;border-radius:5px;border:2px solid var(--brd);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;${a.done?'background:#2EAA6A;border-color:#2EAA6A;color:#fff':''}" onclick="${isCoach()?`togActie(${p.id},'${w.id}',${ai})`:''}">${a.done?'✓':''}</div>
        <span style="flex:1;${a.done?'text-decoration:line-through;opacity:.5':''}">${a.t}</span>
        <span style="font-size:11px;padding:1px 7px;border-radius:20px;background:var(--bg);border:1px solid var(--brd);color:var(--t3);margin-left:auto;flex-shrink:0">${a.p}</span>
        ${isCoach()?`<button class="btn bg xs" style="margin-left:4px" onclick="delActie(${p.id},'${w.id}',${ai})">✕</button>`:''}
      </div>`).join('')}
    </div>
    <div style="margin-top:10px">
      <div style="font-size:11px;font-weight:600;color:var(--t3);margin-bottom:5px">COACH FEEDBACK</div>
      ${isCoach()?`<textarea id="fb-${w.id}" style="width:100%;padding:9px 12px;font-size:13px;font-family:var(--f);border:1px solid var(--brd);border-radius:8px;background:#fff;color:var(--txt);resize:vertical;min-height:65px" placeholder="Feedback...">${w.feedback||''}</textarea>
      <button class="btn bg sm" style="margin-top:5px" onclick="saveFB(${p.id},'${w.id}')">Opslaan</button>`:
      `<div style="background:#E6F4FB;border-radius:7px;padding:10px;font-size:13px;color:#2B7FA8">${w.feedback||'Nog geen feedback.'}</div>`}
    </div>
  </div>`).join('');
}

// POP list met bewerk-knop
function renderPopList(p){
  if(!(p.popHistory||[]).length)return`<div style="font-size:13px;color:var(--t3);padding:12px 0">Geen gesprekken.</div>`;
  return p.popHistory.map((h,hi)=>`<div style="background:#fff;border:1px solid var(--brd);border-radius:8px;padding:14px;margin-bottom:10px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
      <span style="font-size:13px;font-weight:700">${h.date||''}</span>
      <span class="bdg ${h.type==='POP'?'blue':h.type==='PAP'?'green':'gray'}">${h.type}</span>
      ${isCoach()?`
        <button class="btn bg xs" style="margin-left:auto" onclick="openEditPop(${p.id},${hi})">✏ Bewerken</button>
        <button class="btn bg xs" onclick="delPOP(${p.id},'${h.id||''}',${hi})">✕</button>`:''}
    </div>
    <div style="font-size:13px;color:var(--t2);line-height:1.6">
      <div style="margin-bottom:4px"><strong>Goed:</strong> ${h.goed||'—'}</div>
      <div style="margin-bottom:4px"><strong>Werkpunten:</strong> ${h.werkpunten||'—'}</div>
      <div><strong>Afspraken:</strong> ${h.acties||'—'}</div>
    </div>
  </div>`).join('');
}

// POP bewerken
function openEditPop(pid, hi){
  const p=S.players.find(x=>x.id==pid);
  const h=p?.popHistory[hi];
  if(!h)return;
  document.getElementById('ePopDate').value=h.date||'';
  document.getElementById('ePopType').value=h.type||'POP';
  document.getElementById('ePopGoed').value=h.goed||'';
  document.getElementById('ePopWp').value=h.werkpunten||'';
  document.getElementById('ePopActie').value=h.acties||'';
  document.getElementById('m-editPop').dataset.pid=pid;
  document.getElementById('m-editPop').dataset.hi=hi;
  document.getElementById('m-editPop').dataset.id=h.id||'';
  om('editPop');
}
async function saveEditPop(){
  const pid=document.getElementById('m-editPop').dataset.pid;
  const hi=parseInt(document.getElementById('m-editPop').dataset.hi);
  const id=document.getElementById('m-editPop').dataset.id;
  const p=S.players.find(x=>x.id==pid);if(!p)return;
  const updated={date:document.getElementById('ePopDate').value,type:document.getElementById('ePopType').value,goed:document.getElementById('ePopGoed').value,werkpunten:document.getElementById('ePopWp').value,acties:document.getElementById('ePopActie').value};
  if(id){syncing(true);await sb.q('pop_history').update(updated,id);syncing(false);}
  p.popHistory[hi]={...p.popHistory[hi],...updated};
  cm('editPop');
  const el=document.getElementById('popl-'+pid);if(el)el.innerHTML=renderPopList(p);
  if(document.getElementById('pg-pop').classList.contains('active'))renderPopPage();
  notify('POP/PAP bijgewerkt');
}

// Player actions
function onDS(e){e.dataTransfer.setData('text/plain',e.target.dataset.label);}
function oDO(e){e.preventDefault();e.currentTarget.style.borderColor='#4FA8D1';}
async function oDr(e,pid,wpId){e.preventDefault();e.currentTarget.style.borderColor='var(--brd)';const lbl=e.dataTransfer.getData('text/plain');const p=S.players.find(x=>x.id==pid),w=(p?.werkpunten||[]).find(x=>x.id==wpId);if(w&&!(w.principes||[]).includes(lbl)){w.principes=[...(w.principes||[]),lbl];await savWP(w,pid);document.getElementById('wpl-'+pid).innerHTML=renderWPs(p);}}
async function delPr(pid,wpId,lbl){const p=S.players.find(x=>x.id==pid),w=(p?.werkpunten||[]).find(x=>x.id==wpId);if(w){w.principes=(w.principes||[]).filter(x=>x!==lbl);await savWP(w,pid);document.getElementById('wpl-'+pid).innerHTML=renderWPs(p);}}
async function togActie(pid,wpId,ai){const p=S.players.find(x=>x.id==pid),w=(p?.werkpunten||[]).find(x=>x.id==wpId);if(w){w.acties[ai].done=!w.acties[ai].done;await savWP(w,pid);document.getElementById('wpl-'+pid).innerHTML=renderWPs(p);}}
async function saveFB(pid,wpId){const p=S.players.find(x=>x.id==pid),w=(p?.werkpunten||[]).find(x=>x.id==wpId);if(w){w.feedback=document.getElementById('fb-'+wpId)?.value;await savWP(w,pid);notify();}}
async function delWP(pid,wpId){const p=S.players.find(x=>x.id==pid);if(!p)return;if(String(wpId).indexOf('local_')===-1)await sb.q('werkpunten').del(wpId);p.werkpunten=(p.werkpunten||[]).filter(w=>w.id!=wpId);document.getElementById('wpl-'+pid).innerHTML=renderWPs(p);notify('Verwijderd');}
async function delActie(pid,wpId,ai){const p=S.players.find(x=>x.id==pid),w=(p?.werkpunten||[]).find(x=>x.id==wpId);if(w){w.acties.splice(ai,1);await savWP(w,pid);document.getElementById('wpl-'+pid).innerHTML=renderWPs(p);}}
async function delPOP(pid,id,hi){const p=S.players.find(x=>x.id==pid);if(!p)return;if(id)await sb.q('pop_history').del(id);p.popHistory.splice(hi,1);const el=document.getElementById('popl-'+pid);if(el)el.innerHTML=renderPopList(p);if(document.getElementById('pg-pop').classList.contains('active'))renderPopPage();notify('Gesprek verwijderd');}
function addPresenceEntry(pid){S.activePlayer=pid;om('addPresence');}
async function delPresenceEntry(pid,idx){
  const p=S.players.find(x=>x.id==pid);if(!p)return;
  (p.presenceLog||[]).splice(idx,1);
  await savPl(p);
  renderPlayerDetail(p);
  document.querySelector('#tp-aanw')?.classList.add('active');
  notify('Verwijderd');
}
async function togglePres(pid,idx){const p=S.players.find(x=>x.id==pid);if(!p)return;const cyc=['present','absent','injury','match'];p.presence[idx]=cyc[(cyc.indexOf(p.presence[idx])+1)%cyc.length];await savPl(p);renderPlayerDetail(p);}
async function addPres(pid){const p=S.players.find(x=>x.id==pid);if(!p)return;p.presence=[...(p.presence||[]),'present'];await savPl(p);renderPlayerDetail(p);}
async function doSaveWeight(pid){const val=parseFloat(document.getElementById('nwv')?.value);if(!val)return;const p=S.players.find(x=>x.id==pid);if(!p)return;syncing(true);await sb.q('weight_history').insert({player_id:pid,weight_kg:val,measured_at:new Date().toISOString()});syncing(false);const d=new Date();p.weight.push({d:d.getDate()+' '+['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'][d.getMonth()],w:val});renderPlayerDetail(p);notify('✓ Gewicht opgeslagen');}
function openEditKpi(pid){const p=S.players.find(x=>x.id==pid);document.getElementById('ekf').innerHTML=`<p style="font-size:13px;color:var(--t2);margin-bottom:12px">KPI voor <strong>${p.name}</strong></p>`+S.kpis.map(k=>`<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">${k.name}</label><input type="number" id="ek-${k.id}" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--brd);border-radius:7px;background:var(--bg)" value="${p.kpis?.[k.id]||k.default_val}"></div>`).join('');document.getElementById('ekf').dataset.pid=pid;om('editKpi');}
async function saveKpiVals(){const pid=document.getElementById('ekf').dataset.pid;const p=S.players.find(x=>x.id==pid);if(!p)return;p.kpis=p.kpis||{};S.kpis.forEach(k=>{const v=document.getElementById('ek-'+k.id)?.value;if(v!==undefined)p.kpis[k.id]=parseFloat(v);});await savPl(p);cm('editKpi');renderPlayerDetail(p);notify('KPI opgeslagen');}
async function savPl(p){syncing(true);await sb.q('players').update({name:p.name,pos:p.pos,age:p.age,weight_kg:(p.weight||[])[(p.weight||[]).length-1]?.w,kpis:p.kpis,presence:p.presence,color:p.color,injury:p.injury},p.id);syncing(false);}
async function savWP(w,pid){syncing(true);const pay={player_id:pid,text:w.text,cat:w.cat,principes:w.principes,acties:w.acties,feedback:w.feedback};if(w.id&&String(w.id).indexOf('local_')===-1)await sb.q('werkpunten').update(pay,w.id);else{const{data}=await sb.q('werkpunten').insert(pay);if(data?.id)w.id=data.id;}syncing(false);}

// Werkpunten overzicht pagina — met speler selectie
function renderWerkpuntenPage(){
  const el=document.getElementById('pg-werkpunten');
  const rows=[];
  S.players.forEach(p=>(p.werkpunten||[]).forEach(w=>{
    const done=(w.acties||[]).filter(a=>a.done).length,tot=(w.acties||[]).length||1;
    rows.push(`<tr onclick="openPlayer(${p.id})" style="cursor:pointer"><td><div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:50%;background:${p.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff">${ini(p.name)}</div><b>${p.name}</b></div></td><td>${p.pos||'—'}</td><td>${w.text}</td><td><span class="bdg blue">${w.cat}</span></td><td>${done}/${(w.acties||[]).length}</td><td><div style="height:7px;background:var(--bg);border-radius:4px;overflow:hidden;width:80px"><div style="height:100%;background:#4FA8D1;width:${Math.round(done/tot*100)}%"></div></div></td></tr>`);
  }));
  el.innerHTML=`
    <div class="card" style="margin-bottom:14px">
      <div style="font-family:var(--fc);font-size:16px;font-weight:700;margin-bottom:14px">Werkpunt toevoegen aan speler</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:10px;align-items:flex-end">
        <div><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">Speler</label>
          <select id="wpDirectSpeler" class="fsel" style="width:100%">${S.players.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
        <div><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">Werkpunt</label>
          <input id="wpDirectText" class="sinput" placeholder="bv. Timing dieptepass" style="width:100%"></div>
        <div><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">Categorie</label>
          <select id="wpDirectCat" class="fsel" style="width:100%"><option>Passing & Receiving</option><option>Finishing</option><option>Positiespel</option><option>Pressing</option><option>Fysiek</option><option>Mentaal</option></select></div>
        <button class="btn bp" onclick="addWerkpuntDirect()" style="white-space:nowrap">+ Toevoegen</button>
      </div>
    </div>
    <div class="card"><table class="tbl"><thead><tr><th>Speler</th><th>Pos</th><th>Werkpunt</th><th>Cat</th><th>Acties</th><th>Voortgang</th></tr></thead><tbody>${rows.join('')||'<tr><td colspan="6" style="color:var(--t3);text-align:center;padding:20px">Geen werkpunten. Voeg er één toe via het formulier hierboven.</td></tr>'}</tbody></table></div>`;
  
  // Fix typen in input veld
  document.getElementById('wpDirectText').addEventListener('keydown', e=>e.stopPropagation());
}

async function addWerkpuntDirect(){
  const pid=document.getElementById('wpDirectSpeler')?.value;
  const text=document.getElementById('wpDirectText')?.value.trim();
  const cat=document.getElementById('wpDirectCat')?.value;
  if(!pid||!text){notify('Vul speler en werkpunt in','#E05252');return;}
  const p=S.players.find(x=>x.id==pid);if(!p)return;
  const wp={text,cat,principes:[],acties:[],feedback:''};
  syncing(true);
  const{data}=await sb.q('werkpunten').insert({player_id:pid,...wp});
  syncing(false);
  wp.id=data?.id||'local_'+Date.now();
  p.werkpunten=[...(p.werkpunten||[]),wp];
  document.getElementById('wpDirectText').value='';
  renderWerkpuntenPage();
  notify('✓ Werkpunt toegevoegd aan '+p.name);
}

// Player dashboard (speler view)
function renderPlayerDashboard(me){
  const att=Math.round((me.presence||[]).filter(x=>x==='present').length/Math.max((me.presence||[]).length,1)*100);
  const lastW=(me.weight||[])[(me.weight||[]).length-1]?.w||'—';
  const prevW=(me.weight||[]).length>1?(me.weight||[])[me.weight.length-2]?.w:null;
  const wDiff=prevW?(lastW-prevW).toFixed(1):null;
  const actiesDone=(me.werkpunten||[]).reduce((a,w)=>(w.acties||[]).filter(x=>x.done).length+a,0);
  const actiesTotal=(me.werkpunten||[]).reduce((a,w)=>(w.acties||[]).length+a,0);
  const maxW=Math.max(...(me.weight||[{w:75}]).map(x=>x.w));
  const minW=Math.min(...(me.weight||[{w:75}]).map(x=>x.w));
  return`
    <div style="background:var(--txt);border-radius:12px;padding:24px;margin-bottom:20px;display:flex;align-items:center;gap:20px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;right:0;bottom:0;width:5px;background:#4FA8D1"></div>
      ${S.clubLogo?`<img src="${S.clubLogo}" style="position:absolute;top:16px;right:20px;width:48px;height:48px;border-radius:8px;object-fit:cover;opacity:.6" alt="logo">`:``}
      <div style="width:72px;height:72px;border-radius:50%;background:${me.color||'#4FA8D1'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:26px;color:#fff;flex-shrink:0;border:3px solid rgba(255,255,255,.15)">${ini(me.name)}</div>
      <div style="flex:1">
        <div style="font-family:var(--fc);font-size:26px;font-weight:700;color:#fff">${me.name}</div>
        <div style="font-size:13px;color:rgba(255,255,255,.5);margin-top:4px;display:flex;gap:12px;flex-wrap:wrap">
          <span>⚽ ${me.pos||'—'}</span><span>🎂 ${me.age||'—'} jaar</span>
          <span>⚖️ ${lastW} kg ${wDiff?`<span style="color:${wDiff>0?'#F87171':'#4ADE80'}">(${wDiff>0?'+':''}${wDiff})</span>`:''}</span>
        </div>
        <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
          <span style="background:${att>=75?'#2EAA6A':att>=60?'#D4860A':'#E05252'};color:#fff;font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600">${att}% aanwezigheid</span>
          <span style="background:#4FA8D1;color:#fff;font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600">${(me.werkpunten||[]).length} werkpunten</span>
          ${me.injury?'<span style="background:#E05252;color:#fff;font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600">⚠️ Blessure</span>':''}
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
      ${[['Aanwezigheid',att+'%',att>=75?'#2EAA6A':att>=60?'#D4860A':'#E05252',`${(me.presence||[]).filter(x=>x==='present').length}/${(me.presence||[]).length} sessies`],['Gewicht',lastW+' kg','#4FA8D1',wDiff?`${wDiff>0?'↑':'↓'} ${Math.abs(wDiff)} kg`:'Laatste meting'],['Actiepunten',actiesDone+'/'+actiesTotal,'#7C5CBF','Voltooid'],["POP's",(me.popHistory||[]).length+'','#D4860A','Dit seizoen']].map(([l,v,c,s])=>`<div style="background:#fff;border:1px solid var(--brd);border-radius:10px;padding:14px 16px;position:relative;overflow:hidden"><div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c}"></div><div style="font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">${l}</div><div style="font-family:var(--fc);font-size:26px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:11px;color:var(--t3);margin-top:3px">${s}</div></div>`).join('')}
    </div>
    <div class="g2" style="margin-bottom:16px">
      <div style="background:#fff;border:1px solid var(--brd);border-radius:10px;padding:18px">
        <div style="font-family:var(--fc);font-size:16px;font-weight:700;margin-bottom:14px">🎯 Werkpunten</div>
        ${(me.werkpunten||[]).map(w=>{const wD=(w.acties||[]).filter(a=>a.done).length,wT=(w.acties||[]).length,pct=wT?Math.round(wD/wT*100):0;return`<div style="background:var(--bg);border-radius:8px;padding:12px;margin-bottom:10px;border-left:3px solid #4FA8D1"><div style="font-weight:600;font-size:13px;margin-bottom:4px">${w.text}</div><div style="font-size:11px;color:var(--t3);margin-bottom:8px">${w.cat}</div>${wT?`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><div style="flex:1;height:6px;background:#E5E7EB;border-radius:3px;overflow:hidden"><div style="height:100%;background:${pct===100?'#2EAA6A':'#4FA8D1'};width:${pct}%"></div></div><span style="font-size:11px;color:var(--t3)">${wD}/${wT}</span></div>`:''}${(w.acties||[]).map(a=>`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--brd);font-size:12px"><div style="width:16px;height:16px;border-radius:4px;border:1.5px solid ${a.done?'#2EAA6A':'var(--brd)'};background:${a.done?'#2EAA6A':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:10px">${a.done?'✓':''}</div><span style="flex:1;${a.done?'text-decoration:line-through;opacity:.5':''}">${a.t}</span><span style="font-size:10px;padding:1px 6px;border-radius:20px;background:var(--bg);border:1px solid var(--brd);color:var(--t3);flex-shrink:0">${a.p}</span></div>`).join('')}${w.feedback?`<div style="margin-top:8px;background:#E6F4FB;border-radius:6px;padding:8px;font-size:12px;color:#2B7FA8"><strong>💬 Coach:</strong> ${w.feedback}</div>`:''}</div>`;}).join('')||'<div style="font-size:13px;color:var(--t3)">Nog geen werkpunten.</div>'}
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div style="background:#fff;border:1px solid var(--brd);border-radius:10px;padding:16px"><div style="font-family:var(--fc);font-size:16px;font-weight:700;margin-bottom:12px">📊 KPI's</div>${S.kpis.map(k=>`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--t2);margin-bottom:3px;font-weight:500"><span>${k.name}</span><span style="font-weight:700;color:var(--txt)">${me.kpis?.[k.id]||k.default_val}${k.unit==='pct'?'%':k.unit==='km'?' km':''}</span></div><div style="height:8px;background:var(--bg);border-radius:4px;overflow:hidden"><div style="height:100%;background:#4FA8D1;width:${Math.min(100,k.unit==='km'?(me.kpis?.[k.id]||k.default_val)/12*100:(me.kpis?.[k.id]||k.default_val))}%"></div></div></div>`).join('')}</div>
        <div style="background:#fff;border:1px solid var(--brd);border-radius:10px;padding:16px"><div style="font-family:var(--fc);font-size:16px;font-weight:700;margin-bottom:10px">⚖️ Gewicht</div><div style="display:flex;align-items:flex-end;gap:6px;height:64px">${(me.weight||[]).slice(-6).map(w=>{const h=maxW===minW?40:Math.round(14+((w.w-minW)/(maxW-minW))*46);return`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px"><div style="width:100%;background:#4FA8D1;border-radius:3px 3px 0 0;height:${h}px;position:relative"><span style="position:absolute;top:-15px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:#2B7FA8;white-space:nowrap">${w.w}</span></div><div style="font-size:8px;color:var(--t3)">${w.d}</div></div>`;}).join('')}</div></div>
        <div style="background:#fff;border:1px solid var(--brd);border-radius:10px;padding:16px"><div style="font-family:var(--fc);font-size:16px;font-weight:700;margin-bottom:8px">📅 Aanwezigheid</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">${(me.presence||[]).slice(-14).map((s,i)=>{const bg=s==='present'?'#D1FAE5':s==='absent'?'#FEE2E2':s==='injury'?'#FEF3C7':'#E6F4FB';const c=s==='present'?'#065F46':s==='absent'?'#991B1B':s==='injury'?'#92400E':'#2B7FA8';return`<div style="aspect-ratio:1;border-radius:4px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;color:${c}">${i%2===0?'T':'W'}</div>`;}).join('')}</div></div>
      </div>
    </div>
    ${(me.popHistory||[]).length?`<div style="background:#fff;border:1px solid var(--brd);border-radius:10px;padding:18px"><div style="font-family:var(--fc);font-size:16px;font-weight:700;margin-bottom:14px">💬 POP/PAP</div>${(me.popHistory||[]).slice(0,3).map(h=>`<div style="background:var(--bg);border-radius:8px;padding:12px;margin-bottom:8px"><div style="display:flex;gap:8px;margin-bottom:6px"><span style="font-size:12px;font-weight:700">${h.date||''}</span><span class="bdg ${h.type==='POP'?'blue':h.type==='PAP'?'green':'gray'}">${h.type}</span></div><div style="font-size:12px;color:var(--t2);line-height:1.6">${h.goed?`<div>✅ <strong>Sterk:</strong> ${h.goed}</div>`:''} ${h.werkpunten?`<div>🎯 <strong>WP:</strong> ${h.werkpunten}</div>`:''} ${h.acties?`<div>📋 <strong>Actie:</strong> ${h.acties}</div>`:''}</div></div>`).join('')}</div>`:''}`;
}
