// ============================================================
// MODALS — ALLE FORMULIEREN
// ============================================================
function renderModals(){
  document.getElementById('modals').innerHTML=`
<!-- Speler toevoegen -->
<div class="modal-wrap" id="m-addSpeler"><div class="modal">
  <div class="mtitle">Speler toevoegen</div>
  <div class="ff"><label>Naam</label><input id="nsName" placeholder="Voornaam Achternaam"></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Positie</label><select id="nsPos"><option>GK</option><option>CB</option><option>LB</option><option>RB</option><option>CDM</option><option>CM</option><option>CAM</option><option>LW</option><option>RW</option><option>ST</option></select></div>
    <div class="ff"><label>Leeftijd</label><input type="number" id="nsAge" placeholder="24"></div>
  </div>
  <div class="ff"><label>Gewicht (kg)</label><input type="number" id="nsWt" placeholder="75"></div>
  <div class="ma"><button class="btn bg" onclick="cm('addSpeler')">Annuleer</button><button class="btn bp" onclick="doAddSpeler()">Toevoegen</button></div>
</div></div>

<!-- Werkpunt -->
<div class="modal-wrap" id="m-addWerkpunt"><div class="modal">
  <div class="mtitle">Werkpunt toevoegen</div>
  <div class="ff"><label>Omschrijving</label><input id="wpTxt" placeholder="bv. Timing dieptepass"></div>
  <div class="ff"><label>Categorie</label><select id="wpCat"><option>Passing & Receiving</option><option>Finishing</option><option>Positiespel</option><option>Pressing</option><option>Fysiek</option><option>Mentaal</option></select></div>
  <div class="ma"><button class="btn bg" onclick="cm('addWerkpunt')">Annuleer</button><button class="btn bp" onclick="doAddWerkpunt()">Toevoegen</button></div>
</div></div>

<!-- Actiepunt -->
<div class="modal-wrap" id="m-addActie"><div class="modal">
  <div class="mtitle">Actiepunt toevoegen</div>
  <div class="ff"><label>Omschrijving</label><input id="actTxt" placeholder="bv. Video-analyse 2x/week"></div>
  <div class="ff"><label>Periode</label><select id="actPer"><option>Week 1</option><option>Week 2</option><option>Week 3</option><option>Week 4</option></select></div>
  <div class="ma"><button class="btn bg" onclick="cm('addActie')">Annuleer</button><button class="btn bp" onclick="doAddActie()">Toevoegen</button></div>
</div></div>

<!-- POP/PAP -->
<div class="modal-wrap" id="m-addPop"><div class="modal">
  <div class="mtitle">POP/PAP gesprek</div>
  <div class="ff"><label>Speler</label><select id="popSel"></select></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Type</label><select id="popType"><option value="POP">POP</option><option value="PAP">PAP</option><option value="Check-in">Check-in</option></select></div>
    <div class="ff"><label>Datum</label><input type="date" id="popDate" value="${new Date().toISOString().split('T')[0]}"></div>
  </div>
  <div class="ff"><label>Wat ging goed?</label><textarea id="popGoed" placeholder="Sterke punten..."></textarea></div>
  <div class="ff"><label>Werkpunten / groeipunten</label><textarea id="popWp" placeholder="Ontwikkelpunten..."></textarea></div>
  <div class="ff"><label>Afspraken / acties</label><textarea id="popActie" placeholder="Concrete acties..."></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addPop')">Annuleer</button><button class="btn bp" onclick="doAddPop()">Opslaan</button></div>
</div></div>

<!-- KPI -->
<div class="modal-wrap" id="m-addKpi"><div class="modal">
  <div class="mtitle">Nieuwe KPI</div>
  <div class="ff"><label>Naam</label><input id="kpiName" placeholder="bv. Schoten p/90"></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Eenheid</label><select id="kpiUnit"><option value="pct">%</option><option value="num">Getal</option><option value="km">km</option></select></div>
    <div class="ff"><label>Standaardwaarde</label><input type="number" id="kpiDef" placeholder="70"></div>
  </div>
  <div class="ma"><button class="btn bg" onclick="cm('addKpi')">Annuleer</button><button class="btn bp" onclick="doAddKpi()">Toevoegen</button></div>
</div></div>

<!-- KPI edit per speler -->
<div class="modal-wrap" id="m-editKpi"><div class="modal">
  <div class="mtitle">KPI bewerken</div>
  <div id="ekf"></div>
  <div class="ma"><button class="btn bg" onclick="cm('editKpi')">Annuleer</button><button class="btn bp" onclick="saveKpiVals()">Opslaan</button></div>
</div></div>

<!-- Sessie -->
<div class="modal-wrap" id="m-addSession"><div class="modal">
  <div class="mtitle">Sessie toevoegen</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Dag</label><select id="sesDay"><option value="0">Maandag</option><option value="1">Dinsdag</option><option value="2">Woensdag</option><option value="3">Donderdag</option><option value="4">Vrijdag</option><option value="5">Zaterdag</option></select></div>
    <div class="ff"><label>Type</label><select id="sesType"><option value="training">Training</option><option value="match">Wedstrijd</option><option value="indiv">Individuele sessie</option><option value="rest">Herstel</option></select></div>
  </div>
  <div class="ff"><label>Titel</label><input id="sesTitle" placeholder="bv. Pressing drills"></div>
  <div class="ff"><label>Tijd</label><input id="sesTime" placeholder="19:00 – 20:30"></div>
  <div class="ff"><label>Notitie (optioneel)</label><textarea id="sesNote" placeholder="..."></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addSession')">Annuleer</button><button class="btn bp" onclick="doAddSession()">Toevoegen</button></div>
</div></div>

<!-- Carrière -->
<div class="modal-wrap" id="m-addCarriere"><div class="modal">
  <div class="mtitle">Carrièrepunt toevoegen</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Jaar / periode</label><input id="carYear" placeholder="2024 – heden"></div>
    <div class="ff"><label>Club / organisatie</label><input id="carClub" placeholder="Belisia SV"></div>
  </div>
  <div class="ff"><label>Functie / titel</label><input id="carTitle" placeholder="Performance Coach"></div>
  <div class="ff"><label>Beschrijving (optioneel)</label><textarea id="carDesc" placeholder="..."></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addCarriere')">Annuleer</button><button class="btn bp" onclick="doAddCarriere()">Toevoegen</button></div>
</div></div>

<!-- License topic -->
<div class="modal-wrap" id="m-addTopic"><div class="modal">
  <div class="mtitle">Nieuw Pro License topic</div>
  <div class="ff"><label>Naam</label><input id="ltName" placeholder="bv. Tactische periodisering"></div>
  <div class="ff"><label>Beschrijving</label><textarea id="ltDesc" placeholder="Wat behandelt dit topic?"></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addTopic')">Annuleer</button><button class="btn bp" onclick="doAddTopic()">Toevoegen</button></div>
</div></div>

<!-- Video toevoegen -->
<div class="modal-wrap" id="m-addVideo"><div class="modal">
  <div class="mtitle">Video / materiaal toevoegen</div>
  <div class="ff"><label>Titel</label><input id="vidTitle" placeholder="bv. Pressing analyse wedstrijd 5/10"></div>
  <div class="ff"><label>URL (YouTube, Vimeo of bestandspad)</label><input id="vidUrl" placeholder="https://..."></div>
  <div class="ff"><label>Notitie</label><textarea id="vidNote" placeholder="Wat laat dit zien?"></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addVideo')">Annuleer</button><button class="btn bp" onclick="doAddVideo()">Toevoegen</button></div>
</div></div>

<!-- Reflectie -->
<div class="modal-wrap" id="m-addReflectie"><div class="modal">
  <div class="mtitle">Reflectie toevoegen</div>
  <div class="ff"><label>Datum</label><input type="date" id="refDate" value="${new Date().toISOString().split('T')[0]}"></div>
  <div class="ff"><label>Reflectie</label><textarea id="refText" style="min-height:120px" placeholder="Wat leerde je? Hoe evolueer je als coach?"></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addReflectie')">Annuleer</button><button class="btn bp" onclick="doAddReflectie()">Opslaan</button></div>
</div></div>

<!-- Oefenvorm -->
<div class="modal-wrap" id="m-addOefenvorm"><div class="modal" style="width:560px;max-width:96vw">
  <div class="mtitle">Oefenvorm</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Naam</label><input id="oefN" placeholder="bv. Pressing 4v4"></div>
    <div class="ff"><label>Categorie</label><select id="oefCatSel"><option>Passing</option><option>Finishing</option><option>Pressing</option><option>Positiespel</option><option>Conditie</option><option>Kracht</option><option>Herstel</option></select></div>
    <div class="ff"><label>Duur (min)</label><input type="number" id="oefDur"></div>
    <div class="ff"><label>Terrein</label><input id="oefField" placeholder="30x20m"></div>
    <div class="ff"><label>Spelers</label><input id="oefPlayers" placeholder="8+GK"></div>
    <div class="ff"><label>Intensiteit</label><select id="oefIntens"><option value="laag">Laag</option><option value="middel" selected>Middel</option><option value="hoog">Hoog</option><option value="max">Maximaal</option></select></div>
  </div>
  <div class="ff"><label>Omschrijving / coachingpunten</label><textarea id="oefDesc" placeholder="..."></textarea></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div>
      <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:8px">LOAD DATA (van tracker)</div>
      <div class="ff"><label>Afstand (km)</label><input type="number" id="oefDist" step="0.1"></div>
      <div class="ff"><label>HSR (m >21km/h)</label><input type="number" id="oefHsr"></div>
      <div class="ff"><label>Sprints (#)</label><input type="number" id="oefSpr"></div>
      <div class="ff"><label>Max snelheid (km/h)</label><input type="number" id="oefSpd" step="0.1"></div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:8px">FYSIOLOGIE</div>
      <div class="ff"><label>RPE (1-10)</label><input type="number" id="oefRpe" min="1" max="10"></div>
      <div class="ff"><label>Gem. hartslag (bpm)</label><input type="number" id="oefHr"></div>
      <div class="ff"><label>Max hartslag (bpm)</label><input type="number" id="oefHrmax"></div>
      <div class="ff"><label>Video URL (optioneel)</label><input id="oefVidUrl" placeholder="YouTube of pad"></div>
    </div>
  </div>
  <div class="ma"><button class="btn bg" onclick="cm('addOefenvorm')">Annuleer</button><button class="btn bp" onclick="doSaveOef()">Opslaan</button></div>
</div></div>

<!-- Oefenvorm bekijken -->
<div class="modal-wrap" id="m-viewOef"><div class="modal" style="width:560px;max-width:96vw">
  <div id="oefViewContent"></div>
  <div class="ma"><button class="btn bg" onclick="cm('viewOef')">Sluiten</button></div>
</div></div>`;
  // Close on backdrop
  document.querySelectorAll('.modal-wrap').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');}));
  // Fill player selects dynamically when modal opens
  const popModal=document.getElementById('m-addPop');
  new MutationObserver(()=>{const s=document.getElementById('popSel');if(s&&!s.options.length)s.innerHTML=S.players.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');}).observe(popModal,{attributes:true,attributeFilter:['class']});
}

// ============================================================
// MODAL ACTION HANDLERS
// ============================================================
async function doAddSpeler(){
  const name=document.getElementById('nsName').value.trim();if(!name)return;
  syncing(true);
  const{data}=await sb.q('players').insert({name,pos:document.getElementById('nsPos').value,age:parseInt(document.getElementById('nsAge').value)||22,weight_kg:parseInt(document.getElementById('nsWt').value)||75,color:COLORS[S.players.length%COLORS.length],kpis:{},presence:[],injury:false});
  syncing(false);
  if(data){S.players.push({...data,werkpunten:[],popHistory:[],weight:[{d:'Start',w:data.weight_kg}],injuries:[]});document.getElementById('kern-count').textContent=S.players.length;}
  cm('addSpeler');renderSpelers();notify('Speler toegevoegd');
}

async function doAddWerkpunt(){
  const text=document.getElementById('wpTxt').value.trim();if(!text||S.activePlayer===null)return;
  const p=S.players.find(x=>x.id==S.activePlayer);if(!p)return;
  const wp={text,cat:document.getElementById('wpCat').value,principes:[],acties:[],feedback:''};
  const{data}=await sb.q('werkpunten').insert({player_id:p.id,...wp});
  wp.id=data?.id||'local_'+Date.now();p.werkpunten=[...(p.werkpunten||[]),wp];
  document.getElementById('wpl-'+p.id).innerHTML=renderWPs(p);
  document.getElementById('wpTxt').value='';cm('addWerkpunt');notify();
}

async function doAddActie(){
  const t=document.getElementById('actTxt').value.trim();if(!t||S.activePlayer===null)return;
  const p=S.players.find(x=>x.id==S.activePlayer),w=(p?.werkpunten||[]).find(x=>x.id==S.activeWerkpuntId);
  if(w){w.acties=[...(w.acties||[]),{t,p:document.getElementById('actPer').value,done:false}];await savWP(w,p.id);document.getElementById('wpl-'+p.id).innerHTML=renderWPs(p);}
  document.getElementById('actTxt').value='';cm('addActie');notify();
}

async function doAddPop(){
  const pid=document.getElementById('popSel').value;const p=S.players.find(x=>x.id==pid);if(!p)return;
  const pop={date:document.getElementById('popDate').value,type:document.getElementById('popType').value,goed:document.getElementById('popGoed').value,werkpunten:document.getElementById('popWp').value,acties:document.getElementById('popActie').value};
  syncing(true);const{data}=await sb.q('pop_history').insert({player_id:pid,...pop});syncing(false);
  p.popHistory=[{...pop,id:data?.id},...(p.popHistory||[])];
  cm('addPop');
  if(document.getElementById('pg-pop').classList.contains('active'))renderPopPage();
  const ppl=document.getElementById('popl-'+pid);if(ppl)ppl.innerHTML=renderPopList(p);
  notify('POP/PAP opgeslagen');
}

async function doAddKpi(){
  const name=document.getElementById('kpiName').value.trim();if(!name)return;
  const def=parseFloat(document.getElementById('kpiDef').value)||70;
  const{data}=await sb.q('kpis').insert({name,unit:document.getElementById('kpiUnit').value,default_val:def});
  if(data)S.kpis.push({...data,name,default_val:def});
  cm('addKpi');renderKpiBeheer();notify('KPI toegevoegd');
}

async function doAddSession(){
  const key=S.weekOffset,day=parseInt(document.getElementById('sesDay').value);
  const sess={week_offset:key,day_index:day,type:document.getElementById('sesType').value,title:document.getElementById('sesTitle').value||'Sessie',time:document.getElementById('sesTime').value,note:document.getElementById('sesNote').value};
  syncing(true);const{data}=await sb.q('week_sessions').insert(sess);syncing(false);
  if(!S.weekSessions[key])S.weekSessions[key]={};
  if(!S.weekSessions[key][day])S.weekSessions[key][day]=[];
  S.weekSessions[key][day].push(data||{...sess,id:'local_'+Date.now()});
  cm('addSession');renderTraining();notify();
}

async function doAddCarriere(){
  const title=document.getElementById('carTitle').value.trim();if(!title)return;
  const c={year:document.getElementById('carYear').value,title,club:document.getElementById('carClub').value,description:document.getElementById('carDesc').value,sort_order:0};
  const{data}=await sb.q('carriere').insert(c);
  S.carriere.unshift({...c,id:data?.id});
  cm('addCarriere');renderPortfolio();notify();
}

async function doAddTopic(){
  const name=document.getElementById('ltName').value.trim();if(!name)return;
  const t={name,desc:document.getElementById('ltDesc').value};
  const{data}=await sb.q('license_topics').insert(t);
  S.licenseTopics.push({...t,id:data?.id,videos:[]});
  cm('addTopic');renderLicentie();notify();
}

async function doAddVideo(){
  const ti=S.activeLicenseTopic;if(ti===null||ti===undefined)return;
  const t=S.licenseTopics[ti];
  const v={topic_id:t.id,title:document.getElementById('vidTitle').value,url:document.getElementById('vidUrl').value,note:document.getElementById('vidNote').value};
  const{data}=await sb.q('license_videos').insert(v);
  t.videos=[...(t.videos||[]),(data||v)];
  cm('addVideo');renderLicentie();notify('Video toegevoegd');
}

async function doAddReflectie(){
  const text=document.getElementById('refText').value.trim();if(!text)return;
  const r={date:document.getElementById('refDate').value,text};
  const{data}=await sb.q('reflecties').insert(r);
  S.reflecties.unshift({...r,id:data?.id});
  cm('addReflectie');renderLicentie();notify();
}

async function doSaveOef(){
  const name=document.getElementById('oefN').value.trim();if(!name)return;
  const editId=document.getElementById('oefN').dataset.editId;
  const load={dist:parseFloat(document.getElementById('oefDist').value)||0,hsr:parseFloat(document.getElementById('oefHsr').value)||0,spr:parseFloat(document.getElementById('oefSpr').value)||0,spd:parseFloat(document.getElementById('oefSpd').value)||0,rpe:parseFloat(document.getElementById('oefRpe').value)||0,hr:parseFloat(document.getElementById('oefHr').value)||0,hrmax:parseFloat(document.getElementById('oefHrmax').value)||0};
  const pay={name,cat:document.getElementById('oefCatSel').value,dur:parseInt(document.getElementById('oefDur').value)||0,field:document.getElementById('oefField').value,players:document.getElementById('oefPlayers').value,intens:document.getElementById('oefIntens').value,desc:document.getElementById('oefDesc').value,load,principes:[],video_url:document.getElementById('oefVidUrl').value||null};
  if(editId){await sb.q('oefenvormen').update(pay,editId);const idx=S.oefenvormen.findIndex(o=>o.id==editId);if(idx>=0)S.oefenvormen[idx]={...S.oefenvormen[idx],...pay};delete document.getElementById('oefN').dataset.editId;}
  else{const{data}=await sb.q('oefenvormen').insert(pay);S.oefenvormen.push({...pay,id:data?.id,loadHistory:[]});}
  cm('addOefenvorm');renderOefenvormen();notify();
}
