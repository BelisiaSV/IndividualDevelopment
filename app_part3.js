// ============================================================
// WERKPUNTEN / POP / FYSIEK / KPI BEHEER
// ============================================================
function renderWerkpuntenPage(){
  const rows=[];
  S.players.forEach(p=>(p.werkpunten||[]).forEach(w=>{
    const done=(w.acties||[]).filter(a=>a.done).length,tot=(w.acties||[]).length||1;
    rows.push(`<tr onclick="openPlayer(${p.id})" style="cursor:pointer"><td><div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:50%;background:${p.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff">${ini(p.name)}</div><b>${p.name}</b></div></td><td>${p.pos}</td><td>${w.text}</td><td><span class="bdg blue">${w.cat}</span></td><td>${done}/${(w.acties||[]).length}</td><td><div style="height:7px;background:var(--bg);border-radius:4px;overflow:hidden;width:80px"><div style="height:100%;background:#4FA8D1;width:${Math.round(done/tot*100)}%"></div></div></td></tr>`);
  }));
  document.getElementById('pg-werkpunten').innerHTML=`<div class="card"><table class="tbl"><thead><tr><th>Speler</th><th>Pos</th><th>Werkpunt</th><th>Cat</th><th>Acties</th><th>Voortgang</th></tr></thead><tbody>${rows.join('')||'<tr><td colspan="6" style="color:var(--t3);text-align:center;padding:20px">Geen werkpunten.</td></tr>'}</tbody></table></div>`;
}

function renderPopPage(){
  const mf=document.getElementById('pmf')?.value||'';
  const tf=document.getElementById('ptf')?.value||'';
  const pf=document.getElementById('ppf')?.value||'';
  const all=[];S.players.forEach(p=>(p.popHistory||[]).forEach(h=>all.push({...h,player:p})));
  const filt=all.filter(h=>(!mf||h.date?.startsWith(mf))&&(!tf||h.type===tf)&&(!pf||h.player.id==pf)).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const withPop=S.players.filter(p=>(p.popHistory||[]).length>0).length;
  document.getElementById('pg-pop').innerHTML=`
    <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
      <select class="fsel" id="pmf" onchange="renderPopPage()"><option value="">Alle maanden</option>${['2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06'].map(m=>`<option value="${m}" ${mf===m?'selected':''}>${m}</option>`).join('')}</select>
      <select class="fsel" id="ptf" onchange="renderPopPage()"><option value="">Alle types</option><option value="POP" ${tf==='POP'?'selected':''}>POP</option><option value="PAP" ${tf==='PAP'?'selected':''}>PAP</option><option value="Check-in" ${tf==='Check-in'?'selected':''}>Check-in</option></select>
      <select class="fsel" id="ppf" onchange="renderPopPage()"><option value="">Alle spelers</option>${S.players.map(p=>`<option value="${p.id}" ${pf==p.id?'selected':''}>${p.name}</option>`).join('')}</select>
      <button class="btn bp sm" onclick="om('addPop')">+ Gesprek</button>
    </div>
    <div class="stats-row" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
      <div class="stat"><div class="slbl">Totaal</div><div class="sval">${all.length}</div></div>
      <div class="stat"><div class="slbl">Spelers met gesprek</div><div class="sval">${withPop}</div></div>
      <div class="stat"><div class="slbl">Te plannen</div><div class="sval">${S.players.length-withPop}</div></div>
    </div>
    ${filt.map(h=>`<div style="background:#fff;border:1px solid var(--brd);border-radius:8px;padding:14px;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <div style="width:32px;height:32px;border-radius:50%;background:${h.player.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0">${ini(h.player.name)}</div>
        <span style="font-weight:600">${h.player.name}</span><span class="bdg gray">${h.player.pos}</span>
        <span style="font-size:13px;font-weight:700">${h.date||''}</span>
        <span class="bdg ${h.type==='POP'?'blue':h.type==='PAP'?'green':'gray'}">${h.type}</span>
      </div>
      <div style="font-size:13px;color:var(--t2);line-height:1.6"><div style="margin-bottom:4px"><strong>Goed:</strong> ${h.goed||'—'}</div><div style="margin-bottom:4px"><strong>Werkpunten:</strong> ${h.werkpunten||'—'}</div><div><strong>Afspraken:</strong> ${h.acties||'—'}</div></div>
    </div>`).join('')||'<div style="color:var(--t3);font-size:13px;padding:20px;text-align:center">Geen gesprekken gevonden.</div>'}`;
}

function renderFysiek(){
  document.getElementById('pg-fysiek').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-family:var(--fc);font-size:17px;font-weight:700">Fysiek & KPI</div><button class="btn bg sm" onclick="nav('kpibeheer',null)">⚙ KPI's beheren</button></div>
    <div class="card"><table class="tbl"><thead><tr><th>Speler</th><th>Pos</th><th>Gewicht</th>${S.kpis.map(k=>`<th>${k.name}</th>`).join('')}<th></th></tr></thead>
    <tbody>${S.players.map(p=>`<tr onclick="openPlayer(${p.id})" style="cursor:pointer">
      <td><div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:50%;background:${p.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff">${ini(p.name)}</div><b>${p.name}</b></div></td>
      <td>${p.pos}</td><td>${(p.weight||[])[(p.weight||[]).length-1]?.w||'—'} kg</td>
      ${S.kpis.map(k=>`<td>${p.kpis?.[k.id]||k.default_val}${k.unit==='pct'?'%':k.unit==='km'?' km':''}</td>`).join('')}
      <td><button class="btn bg xs" onclick="event.stopPropagation();openEditKpi(${p.id})">✏</button></td>
    </tr>`).join('')}</tbody></table></div>`;
}

function renderKpiBeheer(){
  document.getElementById('pg-kpibeheer').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-family:var(--fc);font-size:17px;font-weight:700">KPI & Principes Beheer</div><button class="btn bp sm" onclick="om('addKpi')">+ KPI</button></div>
    <div class="card" style="margin-bottom:16px">
      <div class="ctitle">Actieve KPI's</div>
      ${S.kpis.map((k,i)=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--brd)">
        <div style="flex:1;font-weight:600">${k.name}</div><span class="bdg gray">${k.unit}</span>
        <input value="${k.name}" style="padding:5px 8px;font-size:13px;border:1px solid var(--brd);border-radius:6px;background:var(--bg);width:160px" onchange="S.kpis[${i}].name=this.value">
        <button class="btn bg xs" onclick="delKpi('${k.id}')">✕</button>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="ctitle">Principes bibliotheek</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">${S.principes.map(pr=>`<span class="chip ${pr.color}">${pr.label}<em style="cursor:pointer;opacity:.4;font-style:normal;margin-left:3px" onclick="delPrincipe('${pr.id}')">×</em></span>`).join('')}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input id="npt" class="sinput" placeholder="Nieuw principe..." style="flex:1">
        <select class="fsel" id="npc"><option value="chip-blue">Technisch (blauw)</option><option value="chip-green">Afwerking (groen)</option><option value="chip-amber">Verdedigend (amber)</option></select>
        <button class="btn bp sm" onclick="addPrincipe()">Toevoegen</button>
      </div>
    </div>`;
}

async function delKpi(id){await sb.q('kpis').del(id);S.kpis=S.kpis.filter(k=>k.id!==id);renderKpiBeheer();notify('KPI verwijderd');}
async function delPrincipe(id){await sb.q('principes').del(id);S.principes=S.principes.filter(p=>String(p.id)!==String(id));renderKpiBeheer();notify('Principe verwijderd');}
async function addPrincipe(){const l=document.getElementById('npt').value.trim();if(!l)return;const c=document.getElementById('npc').value;const{data}=await sb.q('principes').insert({label:l,color:c});if(data)S.principes.push({...data,label:l,color:c});document.getElementById('npt').value='';renderKpiBeheer();notify();}

// ============================================================
// TRAINING
// ============================================================
function renderTraining(){
  const dates=getWeekDates();
  const dnames=['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];
  const months=['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
  const key=S.weekOffset;const ws=S.weekSessions[key]||{};
  document.getElementById('pg-training').innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px">
        <button class="btn bg sm" onclick="chWk(-1)">◀</button>
        <div style="font-family:var(--fc);font-size:17px;font-weight:700">Week ${1+S.weekOffset} — ${months[dates[0].getMonth()]} ${dates[0].getFullYear()}</div>
        <button class="btn bg sm" onclick="chWk(1)">▶</button>
      </div>
      <button class="btn bp sm" onclick="om('addSession')">+ Sessie</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px">
      ${dates.map((d,i)=>`<div style="background:#fff;border:1px solid var(--brd);border-radius:8px;padding:12px;min-height:130px">
        <div style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:8px;display:flex;justify-content:space-between">${dnames[i]} ${d.getDate()}/${d.getMonth()+1}<span style="cursor:pointer;opacity:.4;font-size:16px" onclick="om('addSession')">+</span></div>
        ${(ws[i]||[]).map(s=>{const tc=s.type==='match'?'#FEF3C7':s.type==='indiv'?'#D1FAE5':s.type==='rest'?'var(--bg)':'#E6F4FB';const c=s.type==='match'?'#92400E':s.type==='indiv'?'#065F46':s.type==='rest'?'var(--t3)':'#2B7FA8';return`<div style="background:${tc};border-radius:6px;padding:6px 8px;margin-bottom:5px;position:relative" onmouseenter="this.querySelector('.sdel').style.display='flex'" onmouseleave="this.querySelector('.sdel').style.display='none'">
          <div style="font-size:12px;font-weight:600;color:${c}">${s.title}</div><div style="font-size:10px;color:${c};opacity:.7">${s.time||''}</div>
          <span class="sdel" style="display:none;position:absolute;top:3px;right:3px;background:rgba(0,0,0,.25);color:#fff;border-radius:50%;width:15px;height:15px;align-items:center;justify-content:center;font-size:9px;cursor:pointer" onclick="delSess('${s.id}',${key},${i})">✕</span>
        </div>`;}).join('')}
        ${!(ws[i]||[]).length?'<div style="font-size:11px;color:var(--t3);font-style:italic">Vrij</div>':''}
      </div>`).join('')}
    </div>
    <div class="card"><div class="ctitle">Individuele sessies</div>
      ${Object.values(ws).flat().filter(s=>s.type==='indiv').map(s=>`<div style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid var(--brd);font-size:13px"><span style="font-weight:600">${s.title}</span><span style="color:var(--t3)">${s.time||''}</span></div>`).join('')||'<div style="font-size:13px;color:var(--t3)">Geen individuele sessies.</div>'}
    </div>`;
}
function getWeekDates(){const b=new Date(2025,6,7);b.setDate(b.getDate()+S.weekOffset*7);return Array(6).fill(0).map((_,i)=>{const d=new Date(b);d.setDate(d.getDate()+i);return d;});}
function chWk(d){S.weekOffset+=d;renderTraining();}
async function delSess(id,wk,day){if(id&&String(id).indexOf('local_')===-1)await sb.q('week_sessions').del(id);if(S.weekSessions[wk]?.[day])S.weekSessions[wk][day]=S.weekSessions[wk][day].filter(s=>s.id!=id);renderTraining();}

// ============================================================
// OEFENVORMEN
// ============================================================
function renderOefenvormen(){
  const q=(document.getElementById('oq')?.value||'').toLowerCase();
  const cat=document.getElementById('ocat')?.value||'';
  const filt=S.oefenvormen.filter(o=>(!q||o.name.toLowerCase().includes(q))&&(!cat||o.cat===cat));
  const ic={laag:'green',middel:'blue',hoog:'amber',max:'red'};
  document.getElementById('pg-oefenvormen').innerHTML=`
    <div class="tabs"><div class="tab active" onclick="switchTab(this,'ob')">Bibliotheek</div><div class="tab" onclick="switchTab(this,'ol');setTimeout(renderLoadChart,80)">Load Analyse</div><div class="tab" onclick="switchTab(this,'oi')">Data Import</div></div>
    <div class="tp active" id="ob">
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <input id="oq" class="sinput" placeholder="Oefenvorm zoeken..." oninput="renderOefenvormen()" value="${q}">
        <select class="fsel" id="ocat" onchange="renderOefenvormen()"><option value="">Alle cat.</option>${['Passing','Finishing','Pressing','Positiespel','Conditie','Kracht','Herstel'].map(c=>`<option value="${c}" ${cat===c?'selected':''}>${c}</option>`).join('')}</select>
        <button class="btn bp sm" onclick="om('addOefenvorm')">+ Oefenvorm</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px">
        ${filt.map(o=>`<div style="background:#fff;border:1px solid var(--brd);border-radius:10px;overflow:hidden;cursor:pointer;transition:all .15s" onclick="viewOef('${o.id}')" onmouseenter="this.style.borderColor='#4FA8D1';this.style.transform='translateY(-1px)'" onmouseleave="this.style.borderColor='var(--brd)';this.style.transform=''">
          <div style="height:110px;background:var(--txt);display:flex;align-items:center;justify-content:center;position:relative">
            ${o.video_url?`<video src="${o.video_url}" style="width:100%;height:100%;object-fit:cover;opacity:.7"></video>`:'<div style="text-align:center;color:rgba(255,255,255,.2)"><div style="font-size:32px">🎬</div><div style="font-size:11px;margin-top:4px">Geen video</div></div>'}
            <span class="bdg ${ic[o.intens]||'gray'}" style="position:absolute;top:8px;left:8px">${o.intens||'—'}</span>
            <span class="bdg blue" style="position:absolute;top:8px;right:8px">${o.cat}</span>
          </div>
          <div style="padding:12px">
            <div style="font-weight:700;font-size:14px;margin-bottom:6px">${o.name}</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:8px">
              ${[['Afstand',(o.load?.dist||0)+' km'],['HSR',(o.load?.hsr||0)+' m'],['Sprints',(o.load?.spr||0)+'x']].map(([l,v])=>`<div style="background:var(--bg);border-radius:5px;padding:4px 7px"><div style="font-size:10px;color:var(--t3)">${l}</div><div style="font-size:12px;font-weight:700">${v}</div></div>`).join('')}
            </div>
            ${isCoach()?`<div style="display:flex;gap:5px"><button class="btn bg xs" onclick="event.stopPropagation();editOef('${o.id}')">✏</button><button class="btn bg xs" onclick="event.stopPropagation();delOef('${o.id}')">✕</button></div>`:''}
          </div>
        </div>`).join('')||'<div style="color:var(--t3);font-size:13px;padding:20px">Geen oefenvormen.</div>'}
      </div>
    </div>
    <div class="tp" id="ol">
      <div class="card" style="margin-bottom:14px"><div class="ctitle">Load vergelijking</div><div style="position:relative;height:220px"><canvas id="oefChart"></canvas></div></div>
    </div>
    <div class="tp" id="oi">
      <div class="g2">
        <div class="card">
          <div class="ctitle">CSV import</div>
          <div style="font-size:13px;color:var(--t2);margin-bottom:10px">Catapult, Statsports, Polar Team Pro — plak CSV-data hieronder.</div>
          <div style="margin-bottom:10px"><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">CSV data</label><textarea id="csvPaste" style="width:100%;padding:8px;font-size:11px;font-family:monospace;border:1px solid var(--brd);border-radius:7px;background:var(--bg);min-height:90px" placeholder="Oefenvorm,Duur(min),Afstand(km),HSR(m),Sprints,RPE"></textarea></div>
          <div style="display:flex;gap:8px"><button class="btn bp sm" onclick="importCSV()">Import</button><button class="btn bg sm" onclick="loadDemo()">Demo data</button></div>
          <div id="impRes" style="margin-top:8px;font-size:12px;color:#2EAA6A;display:none"></div>
        </div>
        <div class="card">
          <div class="ctitle">Handmatige invoer</div>
          <div style="margin-bottom:10px"><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">Oefenvorm</label><select class="fsel" id="manOef" style="width:100%">${S.oefenvormen.map(o=>`<option value="${o.id}">${o.name}</option>`).join('')}</select></div>
          <div style="margin-bottom:10px"><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">Datum</label><input type="date" id="manDate" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--brd);border-radius:7px;background:var(--bg)" value="${new Date().toISOString().split('T')[0]}"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${[['manDist','Afstand (km)','1.8','number'],['manHsr','HSR (m)','420','number'],['manSpr','Sprints','18','number'],['manRpe','RPE (1-10)','7','number']].map(([id,l,ph,t])=>`<div><label style="font-size:12px;font-weight:600;color:var(--t2);display:block;margin-bottom:4px">${l}</label><input type="${t}" id="${id}" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--brd);border-radius:7px;background:var(--bg)" placeholder="${ph}"></div>`).join('')}
          </div>
          <button class="btn bp sm" style="margin-top:10px" onclick="saveManLoad()">Opslaan</button>
        </div>
      </div>
    </div>`;
}

function renderLoadChart(){
  if(S.charts['oef']){S.charts['oef'].destroy();delete S.charts['oef'];}
  const ctx=document.getElementById('oefChart');if(!ctx||!S.oefenvormen.length)return;
  const top=S.oefenvormen.slice(0,8);
  S.charts['oef']=new Chart(ctx,{type:'bar',data:{labels:top.map(o=>o.name.length>16?o.name.slice(0,14)+'…':o.name),datasets:[{label:'Afstand×10',data:top.map(o=>(o.load?.dist||0)*10),backgroundColor:'rgba(79,168,209,.7)'},{label:'HSR÷10',data:top.map(o=>Math.round((o.load?.hsr||0)/10)),backgroundColor:'rgba(212,134,10,.7)'},{label:'Sprints',data:top.map(o=>o.load?.spr||0),backgroundColor:'rgba(46,170,106,.7)'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}}}});
}

function viewOef(id){const o=S.oefenvormen.find(x=>x.id==id);if(!o)return;document.getElementById('oefViewContent').innerHTML=`
  <div style="font-family:var(--fc);font-size:20px;font-weight:700;margin-bottom:10px">${o.name}</div>
  ${o.video_url?`<video src="${o.video_url}" controls style="width:100%;border-radius:8px;margin-bottom:12px;max-height:200px;background:#000"></video>`:`<div style="height:70px;background:var(--bg);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--t3);font-size:13px;margin-bottom:12px">Geen video</div>`}
  <p style="font-size:13px;color:var(--t2);margin-bottom:12px">${o.desc||'Geen omschrijving.'}</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px">
    ${[['Afstand',(o.load?.dist||0)+' km'],['HSR',(o.load?.hsr||0)+' m'],['Sprints',(o.load?.spr||0)+'x'],['Max snelh.',(o.load?.spd||0)+' km/h'],['RPE',(o.load?.rpe||0)+'/10'],['HR',(o.load?.hr||0)+' bpm']].map(([l,v])=>`<div style="background:var(--bg);border-radius:7px;padding:8px"><div style="font-size:10px;color:var(--t3)">${l}</div><div style="font-size:14px;font-weight:700">${v}</div></div>`).join('')}
  </div>
  ${(o.loadHistory||[]).length?`<table class="tbl"><thead><tr><th>Datum</th><th>Afstand</th><th>HSR</th><th>Sprints</th><th>RPE</th></tr></thead><tbody>${(o.loadHistory||[]).map(h=>`<tr><td>${h.session_date}</td><td>${h.dist_km} km</td><td>${h.hsr_m} m</td><td>${h.sprints}x</td><td>${h.rpe}/10</td></tr>`).join('')}</tbody></table>`:''}`;
  om('viewOef');}

function editOef(id){const o=S.oefenvormen.find(x=>x.id==id);if(!o)return;['oefN','oefDur','oefField','oefPlayers','oefDesc','oefDist','oefHsr','oefSpr','oefSpd','oefRpe','oefHr','oefHrmax','oefVidUrl'].forEach(fid=>{const m={'oefN':'name','oefDur':'dur','oefField':'field','oefPlayers':'players','oefDesc':'desc'};const lm={'oefDist':'dist','oefHsr':'hsr','oefSpr':'spr','oefSpd':'spd','oefRpe':'rpe','oefHr':'hr','oefHrmax':'hrmax'};const el=document.getElementById(fid);if(!el)return;if(m[fid])el.value=o[m[fid]]||'';if(lm[fid])el.value=o.load?.[lm[fid]]||'';if(fid==='oefVidUrl')el.value=o.video_url||'';});document.getElementById('oefCatSel').value=o.cat||'Passing';document.getElementById('oefIntens').value=o.intens||'middel';document.getElementById('oefN').dataset.editId=id;om('addOefenvorm');}
async function delOef(id){if(!confirm('Verwijderen?'))return;await sb.q('oefenvormen').del(id);S.oefenvormen=S.oefenvormen.filter(o=>o.id!=id);renderOefenvormen();notify('Verwijderd');}
async function saveManLoad(){const id=document.getElementById('manOef').value;const o=S.oefenvormen.find(x=>x.id==id);if(!o)return;const e={oefenvorm_id:id,session_date:document.getElementById('manDate').value,dist_km:parseFloat(document.getElementById('manDist').value)||0,hsr_m:parseFloat(document.getElementById('manHsr').value)||0,sprints:parseFloat(document.getElementById('manSpr').value)||0,rpe:parseFloat(document.getElementById('manRpe').value)||0};const{data}=await sb.q('oef_load_history').insert(e);if(data){o.loadHistory=[...(o.loadHistory||[]),data];o.load={...o.load,dist:e.dist_km,hsr:e.hsr_m,spr:e.sprints,rpe:e.rpe};}notify('Load opgeslagen');}
function loadDemo(){document.getElementById('csvPaste').value=`Oefenvorm,Duur(min),Afstand(km),HSR(m),Sprints,RPE\nPressing 4v4,20,1.8,420,18,7\nRondo 5v2,15,0.6,38,1,3\nSprintcircuit,25,2.4,995,36,9`;}
async function importCSV(){const raw=document.getElementById('csvPaste').value.trim();if(!raw)return;const lines=raw.split('\n');const hdr=lines[0].split(',').map(h=>h.trim().toLowerCase());let cnt=0;for(const line of lines.slice(1)){const vals=line.split(',').map(v=>v.trim());const obj={};hdr.forEach((h,i)=>obj[h]=vals[i]);const name=obj['oefenvorm']||obj['naam']||'Onbekend';const load={dist:parseFloat(obj['afstand(km)']||obj['afstand']||0),hsr:parseFloat(obj['hsr(m)']||obj['hsr']||0),spr:parseFloat(obj['sprints']||0),rpe:parseFloat(obj['rpe']||0)};let ex=S.oefenvormen.find(o=>o.name.toLowerCase()===name.toLowerCase());if(!ex){const{data}=await sb.q('oefenvormen').insert({name,cat:'Onbekend',dur:parseFloat(obj['duur(min)']||0),intens:'middel',load,principes:[],video_url:null});if(data){S.oefenvormen.push({...data,loadHistory:[]});ex=S.oefenvormen[S.oefenvormen.length-1];}}if(ex){ex.load=load;await sb.q('oef_load_history').insert({oefenvorm_id:ex.id,session_date:new Date().toISOString().split('T')[0],dist_km:load.dist,hsr_m:load.hsr,sprints:load.spr,rpe:load.rpe});cnt++;}}const r=document.getElementById('impRes');r.style.display='block';r.textContent=`✓ ${cnt} rijen verwerkt`;renderOefenvormen();notify(cnt+' verwerkt');}

// ============================================================
// PORTFOLIO & LICENTIE & EXPORT
// ============================================================
function renderPortfolio(){
  document.getElementById('pg-portfolio').innerHTML=`
    <div style="background:var(--txt);border-radius:10px;padding:32px;margin-bottom:20px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;right:0;bottom:0;width:6px;background:#4FA8D1"></div>
      <div style="font-family:var(--fc);font-size:32px;font-weight:700;color:#fff">${S.profile?.name||'Performance Coach'}</div>
      <div style="font-size:15px;color:rgba(255,255,255,.6);margin-top:6px">UEFA B · Performance & Individuele Ontwikkeling</div>
      <div style="background:#4FA8D1;display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;margin-top:14px"><span style="font-size:13px;font-weight:700;color:#fff">Belisia SV — Seniorenvoetbal</span></div>
    </div>
    <div class="g2" style="margin-bottom:16px">
      <div class="card">
        <div class="ctitle" style="justify-content:space-between">Coachingfilosofie <button class="btn bg xs" onclick="editFil()">✏</button></div>
        <p id="filTxt" style="font-size:13px;color:var(--t2);line-height:1.6">Ik geloof in individuele ontwikkeling als fundament van collectief succes. Elke speler heeft een eigen leerpad dat vertrekt vanuit het gameplan van het team.</p>
      </div>
      <div class="card">
        <div class="ctitle" style="justify-content:space-between">Kerncompetenties <button class="btn bg xs" onclick="addComp()">+ Toevoegen</button></div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${S.competenties.map((c,i)=>`<span class="chip chip-blue">${c}<em style="cursor:pointer;opacity:.4;font-style:normal;margin-left:3px" onclick="delComp(${i})">×</em></span>`).join('')}</div>
      </div>
    </div>
    <div class="card">
      <div class="ctitle" style="justify-content:space-between">Carrièrelijn <button class="btn bp sm" onclick="om('addCarriere')">+ Toevoegen</button></div>
      ${S.carriere.map((c,i)=>`<div style="display:flex;gap:14px;padding-bottom:16px;position:relative">
        <div style="position:absolute;left:17px;top:28px;bottom:0;width:1px;background:var(--brd)"></div>
        <div style="width:34px;height:34px;border-radius:50%;background:#E6F4FB;border:2px solid #A8D8EF;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1">⚽</div>
        <div style="flex:1"><div style="font-size:11px;font-weight:700;color:#4FA8D1">${c.year}</div><div style="font-size:14px;font-weight:600">${c.title}</div><div style="font-size:12px;color:var(--t3)">${c.club}${c.description?' · '+c.description:''}</div></div>
        <button class="btn bg xs" onclick="delCarr(${i},'${c.id||''}')">✕</button>
      </div>`).join('')}
    </div>`;
}

function renderLicentie(){
  const total=S.licenseTopics.length,done=S.licenseTopics.filter(t=>(t.videos||[]).length>0).length,pct=total?Math.round(done/total*100):0;
  document.getElementById('pg-licentie').innerHTML=`
    <div style="background:var(--txt);border-radius:10px;padding:20px;margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-family:var(--fc);font-size:18px;font-weight:700;color:#fff">Pro License traject</span><span style="font-size:13px;color:rgba(255,255,255,.5)">${pct}%</span></div>
      <div style="background:rgba(255,255,255,.1);border-radius:4px;height:8px"><div style="background:#4FA8D1;height:100%;border-radius:4px;width:${pct}%"></div></div>
    </div>
    ${S.licenseTopics.map((t,ti)=>`<div style="background:var(--bg);border:1px solid var(--brd);border-radius:8px;padding:14px;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:10px;cursor:pointer" onclick="this.nextElementSibling.classList.toggle('open')">
        <div style="font-weight:600;font-size:14px;flex:1">${t.name}</div>
        <span class="bdg blue">${(t.videos||[]).length} video's</span>
        <button class="btn bp xs" onclick="event.stopPropagation();S.activeLicenseTopic=${ti};om('addVideo')">+ Video</button>
        <button class="btn bg xs" onclick="event.stopPropagation();delTopic(${ti},'${t.id||''}')">✕</button>
      </div>
      <div style="display:none" class="lt-body-${ti}">
        <p style="font-size:13px;color:var(--t2);margin:10px 0">${t.desc||''}</p>
        ${(t.videos||[]).map((v,vi)=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--brd)">
          <div style="width:48px;height:32px;background:#E6F4FB;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0">▶</div>
          <div style="flex:1"><div style="font-size:13px;font-weight:600">${v.title}</div><div style="font-size:11px;color:var(--t3)">${v.url||''}</div>${v.note?`<div style="font-size:12px;color:var(--t2);margin-top:2px">${v.note}</div>`:''}</div>
          <button class="btn bg xs" onclick="delVid(${ti},${vi},'${v.id||''}')">✕</button>
        </div>`).join('')||'<div style="font-size:13px;color:var(--t3);padding:8px 0">Nog geen video\'s.</div>'}
        <div style="margin-top:10px"><textarea id="ltn-${ti}" style="width:100%;padding:8px;font-size:13px;font-family:var(--f);border:1px solid var(--brd);border-radius:7px;background:#fff;color:var(--txt);min-height:55px" placeholder="Notitie..."></textarea>
        <button class="btn bg sm" style="margin-top:5px" onclick="saveTopicNote(${ti},'${t.id||''}')">Opslaan</button></div>
      </div>
    </div>`).join('')}
    <div class="card" style="margin-top:14px">
      <div class="ctitle" style="justify-content:space-between">Leerlog / Reflecties <button class="btn bp sm" onclick="om('addReflectie')">+ Reflectie</button></div>
      ${S.reflecties.map((r,i)=>`<div style="background:#fff;border:1px solid var(--brd);border-radius:8px;padding:12px;margin-bottom:8px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-weight:700;font-size:13px">${r.date}</span><button class="btn bg xs" style="margin-left:auto" onclick="delRef(${i},'${r.id||''}')">✕</button></div><div style="font-size:13px;color:var(--t2)">${r.text}</div></div>`).join('')||'<div style="font-size:13px;color:var(--t3)">Nog geen reflecties.</div>'}
    </div>`;
  // Toggle bodies
  document.querySelectorAll('[class^="lt-body-"]').forEach(el=>{const ti=el.className.split('-').pop();el.style.display='none';el.classList.remove('open');Object.defineProperty(el,'className',{get(){return`lt-body-${ti}${this._open?' open':''}`;},set(v){this._open=v.includes('open');this.style.display=this._open?'block':'none';}});});
}

function renderExport(){
  const el=document.getElementById('pg-export');
  el.innerHTML=`
    <div class="tabs"><div class="tab active" onclick="switchTab(this,'exc')">Grafieken</div><div class="tab" onclick="switchTab(this,'exe')">Export</div></div>
    <div class="tp active" id="exc">
      <div class="g2" style="margin-bottom:16px">
        <div class="card"><div class="ctitle">Aanwezigheid</div><div style="position:relative;height:200px"><canvas id="chAtt"></canvas></div></div>
        <div class="card"><div class="ctitle">Werkpunten per categorie</div><div style="position:relative;height:200px"><canvas id="chWp"></canvas></div></div>
      </div>
      <div class="card"><div class="ctitle">KPI overzicht</div><div style="position:relative;height:180px"><canvas id="chKpi"></canvas></div></div>
    </div>
    <div class="tp" id="exe">
      <div class="g2">
        ${[['POP/PAP Rapport','Alle gesprekken en actiepunten','pop'],['Spelersprestaties CSV','KPI en aanwezigheid','players'],['Portfolio','Carrière en competenties','portfolio']].map(([t,d,type])=>`<div class="card"><div style="font-weight:700;margin-bottom:6px">📋 ${t}</div><div style="font-size:13px;color:var(--t2);margin-bottom:10px">${d}</div><button class="btn bp sm" onclick="doExport('${type}')">📥 Exporteer</button></div>`).join('')}
      </div>
      <div id="expOut" style="display:none;margin-top:16px"><div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><strong>Export</strong><button class="btn bp sm" onclick="navigator.clipboard?.writeText(document.getElementById('expTxt').textContent);notify('Gekopieerd')">📋 Kopieer</button></div>
        <pre id="expTxt" style="font-size:11px;font-family:monospace;white-space:pre-wrap;background:var(--bg);padding:14px;border-radius:8px;max-height:300px;overflow:auto;border:1px solid var(--brd)"></pre>
      </div></div>
    </div>`;
  setTimeout(()=>{
    ['chAtt','chWp','chKpi'].forEach(id=>{if(S.charts[id]){S.charts[id].destroy();delete S.charts[id];}});
    const pl=S.players;
    const c1=document.getElementById('chAtt');if(c1)S.charts['chAtt']=new Chart(c1,{type:'bar',data:{labels:pl.slice(0,10).map(p=>p.name.split(' ')[0]),datasets:[{label:'Aanw. %',data:pl.slice(0,10).map(p=>Math.round((p.presence||[]).filter(x=>x==='present').length/Math.max((p.presence||[]).length,1)*100)),backgroundColor:'rgba(79,168,209,.7)'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,max:100}}}});
    const cats={};pl.forEach(p=>(p.werkpunten||[]).forEach(w=>{cats[w.cat]=(cats[w.cat]||0)+1;}));
    const c2=document.getElementById('chWp');if(c2)S.charts['chWp']=new Chart(c2,{type:'doughnut',data:{labels:Object.keys(cats),datasets:[{data:Object.values(cats),backgroundColor:['#4FA8D1','#2EAA6A','#D4860A','#E05252','#7C5CBF','#16A085']}]},options:{responsive:true,maintainAspectRatio:false}});
    const k0=S.kpis[0];const c3=document.getElementById('chKpi');if(c3&&k0)S.charts['chKpi']=new Chart(c3,{type:'bar',data:{labels:pl.map(p=>p.name.split(' ')[0]),datasets:[{label:k0.name,data:pl.map(p=>p.kpis?.[k0.id]||k0.default_val),backgroundColor:'rgba(46,170,106,.6)'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}});
  },100);
}

function doExport(type){
  let lines=[];
  if(type==='pop'){lines=['BELISIA SV — POP/PAP','='.repeat(40),''];S.players.forEach(p=>{if(!(p.popHistory||[]).length)return;lines.push(p.name+' ('+p.pos+')');(p.popHistory||[]).forEach(h=>{lines.push(h.date+' — '+h.type);lines.push('Goed: '+(h.goed||'—'));lines.push('WP: '+(h.werkpunten||'—'));lines.push('Actie: '+(h.acties||'—'));lines.push('');});});}
  else if(type==='players'){lines=[['Naam','Pos','Leeftijd','Gewicht',...S.kpis.map(k=>k.name)].join(',')];S.players.forEach(p=>lines.push([p.name,p.pos,p.age,(p.weight||[])[(p.weight||[]).length-1]?.w||'—',...S.kpis.map(k=>p.kpis?.[k.id]||k.default_val)].join(',')));}
  else if(type==='portfolio'){lines=['COACH PORTFOLIO','='.repeat(40),''];S.carriere.forEach(c=>lines.push(c.year+' — '+c.title+' @ '+c.club));lines.push('','COMPETENTIES: '+S.competenties.join(', '));lines.push('','REFLECTIES:');S.reflecties.forEach(r=>lines.push(r.date+': '+r.text));}
  document.getElementById('expOut').style.display='block';document.getElementById('expTxt').textContent=lines.join('\n');
}

// Portfolio actions
function editFil(){const el=document.getElementById('filTxt');if(!el)return;const ta=document.createElement('textarea');ta.value=el.textContent;ta.style.cssText='width:100%;padding:8px;font-size:13px;font-family:var(--f);border:1px solid var(--brd);border-radius:7px;background:var(--bg);color:var(--txt);min-height:80px;margin-bottom:8px';el.replaceWith(ta);const btn=document.createElement('button');btn.className='btn bp sm';btn.textContent='Opslaan';btn.onclick=()=>{const p=document.createElement('p');p.id='filTxt';p.style.cssText='font-size:13px;color:var(--t2);line-height:1.6';p.textContent=ta.value;btn.remove();ta.replaceWith(p);notify();};ta.after(btn);}
function addComp(){const c=prompt('Competentie:');if(c){S.competenties.push(c.trim());renderPortfolio();}}
function delComp(i){S.competenties.splice(i,1);renderPortfolio();}
async function delCarr(i,id){if(id)await sb.q('carriere').del(id);S.carriere.splice(i,1);renderPortfolio();}
async function saveTopicNote(ti,tid){const text=document.getElementById('ltn-'+ti)?.value?.trim();if(!text)return;const{data}=await sb.q('license_videos').insert({topic_id:tid,title:'Notitie '+new Date().toLocaleDateString('nl-BE'),url:'',note:text});S.licenseTopics[ti].videos=[...(S.licenseTopics[ti].videos||[]),(data||{title:'Notitie',url:'',note:text})];renderLicentie();notify();}
async function delVid(ti,vi,id){if(id)await sb.q('license_videos').del(id);S.licenseTopics[ti].videos.splice(vi,1);renderLicentie();}
async function delTopic(ti,id){if(id)await sb.q('license_topics').del(id);S.licenseTopics.splice(ti,1);renderLicentie();}
async function delRef(i,id){if(id)await sb.q('reflecties').del(id);S.reflecties.splice(i,1);renderLicentie();}
