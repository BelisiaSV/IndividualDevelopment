// ============================================================
// MODALS
// ============================================================
function renderModals(){
  document.getElementById('modals').innerHTML=`
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

<div class="modal-wrap" id="m-addWerkpunt"><div class="modal">
  <div class="mtitle">Werkpunt toevoegen</div>
  <div class="ff"><label>Omschrijving</label><input id="wpTxt" placeholder="bv. Timing dieptepass"></div>
  <div class="ff"><label>Categorie</label><select id="wpCat"><option>Passing & Receiving</option><option>Finishing</option><option>Positiespel</option><option>Pressing</option><option>Fysiek</option><option>Mentaal</option></select></div>
  <div class="ma"><button class="btn bg" onclick="cm('addWerkpunt')">Annuleer</button><button class="btn bp" onclick="doAddWerkpunt()">Toevoegen</button></div>
</div></div>

<div class="modal-wrap" id="m-addWerkpuntDirect"><div class="modal">
  <div class="mtitle">Werkpunt toevoegen</div>
  <div class="ff"><label>Speler</label><select id="wdSpeler"></select></div>
  <div class="ff"><label>Werkpunt</label><input id="wdTxt" placeholder="bv. Timing dieptepass"></div>
  <div class="ff"><label>Categorie</label><select id="wdCat"><option>Passing & Receiving</option><option>Finishing</option><option>Positiespel</option><option>Pressing</option><option>Fysiek</option><option>Mentaal</option></select></div>
  <div class="ma"><button class="btn bg" onclick="cm('addWerkpuntDirect')">Annuleer</button><button class="btn bp" onclick="doAddWerkpuntModal()">Toevoegen</button></div>
</div></div>

<div class="modal-wrap" id="m-addActie"><div class="modal">
  <div class="mtitle">Actiepunt toevoegen</div>
  <div class="ff"><label>Omschrijving</label><input id="actTxt" placeholder="bv. Video-analyse 2x/week"></div>
  <div class="ff"><label>Periode</label><select id="actPer"><option>Week 1</option><option>Week 2</option><option>Week 3</option><option>Week 4</option></select></div>
  <div class="ma"><button class="btn bg" onclick="cm('addActie')">Annuleer</button><button class="btn bp" onclick="doAddActie()">Toevoegen</button></div>
</div></div>

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

<div class="modal-wrap" id="m-editPop"><div class="modal">
  <div class="mtitle">POP/PAP bewerken</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Type</label><select id="ePopType"><option value="POP">POP</option><option value="PAP">PAP</option><option value="Check-in">Check-in</option></select></div>
    <div class="ff"><label>Datum</label><input type="date" id="ePopDate"></div>
  </div>
  <div class="ff"><label>Wat ging goed?</label><textarea id="ePopGoed"></textarea></div>
  <div class="ff"><label>Werkpunten / groeipunten</label><textarea id="ePopWp"></textarea></div>
  <div class="ff"><label>Afspraken / acties</label><textarea id="ePopActie"></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('editPop')">Annuleer</button><button class="btn bp" onclick="saveEditPop()">Opslaan</button></div>
</div></div>

<div class="modal-wrap" id="m-addKpi"><div class="modal">
  <div class="mtitle">Nieuwe KPI</div>
  <div class="ff"><label>Naam</label><input id="kpiName" placeholder="bv. Schoten p/90"></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Eenheid</label><select id="kpiUnit"><option value="pct">%</option><option value="num">Getal</option><option value="km">km</option></select></div>
    <div class="ff"><label>Standaardwaarde</label><input type="number" id="kpiDef" placeholder="70"></div>
  </div>
  <div class="ma"><button class="btn bg" onclick="cm('addKpi')">Annuleer</button><button class="btn bp" onclick="doAddKpi()">Toevoegen</button></div>
</div></div>

<div class="modal-wrap" id="m-editKpi"><div class="modal">
  <div class="mtitle">KPI bewerken</div><div id="ekf"></div>
  <div class="ma"><button class="btn bg" onclick="cm('editKpi')">Annuleer</button><button class="btn bp" onclick="saveKpiVals()">Opslaan</button></div>
</div></div>

<div class="modal-wrap" id="m-addSession"><div class="modal">
  <div class="mtitle">Sessie toevoegen</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Dag</label><select id="sesDay"><option value="0">Maandag</option><option value="1">Dinsdag</option><option value="2">Woensdag</option><option value="3">Donderdag</option><option value="4">Vrijdag</option><option value="5">Zaterdag</option></select></div>
    <div class="ff"><label>Type</label><select id="sesType" onchange="toggleSesPlayer()"><option value="training">Training</option><option value="match">Wedstrijd</option><option value="indiv">Individuele sessie</option><option value="rest">Herstel</option></select></div>
  </div>
  <div class="ff" id="sesTitleRow"><label>Titel</label><input id="sesTitle" placeholder="bv. Pressing drills"></div>
  <div class="ff" id="sesPlayerRow" style="display:none"><label>Speler (voor individuele sessie)</label><select id="sesPlayerSel"><option value="">-- Kies speler --</option></select></div>
  <div class="ff"><label>Tijd</label><input id="sesTime" placeholder="19:00 – 20:30"></div>
  <div class="ff"><label>Notitie (focus, werkpunt)</label><textarea id="sesNote" placeholder="bv. Focus op passing in final third..."></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addSession')">Annuleer</button><button class="btn bp" onclick="doAddSession()">Toevoegen</button></div>
</div></div>

<div class="modal-wrap" id="m-addCarriere"><div class="modal">
  <div class="mtitle">Carrièrepunt</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Jaar / periode</label><input id="carYear" placeholder="2024 – heden"></div>
    <div class="ff"><label>Club / organisatie</label><input id="carClub" placeholder="Belisia SV"></div>
  </div>
  <div class="ff"><label>Functie / titel</label><input id="carTitle" placeholder="Performance Coach"></div>
  <div class="ff"><label>Beschrijving</label><textarea id="carDesc" placeholder="Optioneel..."></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addCarriere')">Annuleer</button><button class="btn bp" onclick="doAddCarriere()">Opslaan</button></div>
</div></div>

<div class="modal-wrap" id="m-addTopic"><div class="modal">
  <div class="mtitle">Nieuw topic</div>
  <div class="ff"><label>Naam</label><input id="ltName" placeholder="bv. Tactische periodisering"></div>
  <div class="ff"><label>Beschrijving</label><textarea id="ltDesc"></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addTopic')">Annuleer</button><button class="btn bp" onclick="doAddTopic()">Toevoegen</button></div>
</div></div>

<div class="modal-wrap" id="m-addVideo"><div class="modal">
  <div class="mtitle">Video / Link toevoegen</div>
  <div class="ff"><label>Titel</label><input id="vidTitle" placeholder="bv. Pressing analyse wedstrijd"></div>
  <div class="ff"><label>URL (YouTube, Vimeo, ...)</label><input id="vidUrl" placeholder="https://..."></div>
  <div class="ff"><label>Notitie</label><textarea id="vidNote" placeholder="Wat laat dit zien?"></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addVideo')">Annuleer</button><button class="btn bp" onclick="doAddVideo()">Toevoegen</button></div>
</div></div>

<div class="modal-wrap" id="m-addLeerlog"><div class="modal">
  <div class="mtitle">Leerlog toevoegen</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Datum</label><input type="date" id="llDate" value="${new Date().toISOString().split('T')[0]}"></div>
    <div class="ff"><label>Topic / thema</label><input id="llTopic" placeholder="bv. Pressing methodiek"></div>
  </div>
  <div class="ff"><label>Wat heb je geleerd / gedaan?</label><textarea id="llWat" style="min-height:80px" placeholder="Beschrijf wat je geleerd of toegepast hebt..."></textarea></div>
  <div class="ff"><label>Hoe toegepast in training/wedstrijd?</label><textarea id="llHoe" placeholder="Optioneel..."></textarea></div>
  <div class="ff"><label>Resultaat / observatie</label><textarea id="llResultaat" placeholder="Optioneel..."></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addLeerlog')">Annuleer</button><button class="btn bp" onclick="doAddLeerlog()">Opslaan</button></div>
</div></div>

<div class="modal-wrap" id="m-addReflectie"><div class="modal">
  <div class="mtitle">Reflectie toevoegen</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Datum</label><input type="date" id="refDate" value="${new Date().toISOString().split('T')[0]}"></div>
    <div class="ff"><label>Gekoppeld aan leerlog (optioneel)</label><select id="refLeerlog"><option value="">-- Geen --</option>${(S.leerlog||[]).map(l=>`<option value="${l.topic||l.wat?.slice(0,30)}">${l.date} — ${l.topic||l.wat?.slice(0,25)}</option>`).join('')}</select></div>
  </div>
  <div class="ff"><label>Reflectie</label><textarea id="refText" style="min-height:120px" placeholder="Wat leerde je? Hoe evolueer je als coach? Wat doe je anders?"></textarea></div>
  <div class="ma"><button class="btn bg" onclick="cm('addReflectie')">Annuleer</button><button class="btn bp" onclick="doAddReflectie()">Opslaan</button></div>
</div></div>

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
  <div class="ff"><label>Omschrijving / coachingpunten</label><textarea id="oefDesc"></textarea></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div><div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:8px">LOAD DATA</div>
      <div class="ff"><label>Afstand (km)</label><input type="number" id="oefDist" step="0.1"></div>
      <div class="ff"><label>HSR (m)</label><input type="number" id="oefHsr"></div>
      <div class="ff"><label>Sprints (#)</label><input type="number" id="oefSpr"></div>
      <div class="ff"><label>Max snelheid (km/h)</label><input type="number" id="oefSpd" step="0.1"></div>
    </div>
    <div><div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:8px">FYSIOLOGIE</div>
      <div class="ff"><label>RPE (1-10)</label><input type="number" id="oefRpe" min="1" max="10"></div>
      <div class="ff"><label>Gem. hartslag (bpm)</label><input type="number" id="oefHr"></div>
      <div class="ff"><label>Max hartslag (bpm)</label><input type="number" id="oefHrmax"></div>
      <div class="ff"><label>Video URL (YouTube/Vimeo)</label><input id="oefVidUrl" placeholder="https://youtube.com/..."></div>
      <div class="ff"><label>OF: MP4 uploaden</label>
        <div style="border:2px dashed var(--brd);border-radius:7px;padding:10px;text-align:center;cursor:pointer;background:var(--bg);font-size:12px;color:var(--t3)" onclick="document.getElementById('oefVideoFile').click()">
          <span id="oefVideoLabel">📹 Klik om MP4 te selecteren</span>
        </div>
        <input type="file" id="oefVideoFile" accept="video/mp4,video/*" style="display:none" onchange="handleOefVideo(this)">
      </div>
    </div>
  </div>
  <div class="ma"><button class="btn bg" onclick="cm('addOefenvorm')">Annuleer</button><button class="btn bp" onclick="doSaveOef()">Opslaan</button></div>
</div></div>

<div class="modal-wrap" id="m-viewOef"><div class="modal" style="width:560px;max-width:96vw">
  <div id="oefViewContent"></div>
  <div class="ma"><button class="btn bg" onclick="cm('viewOef')">Sluiten</button></div>
</div></div>

<div class="modal-wrap" id="m-editPortfolioHeader"><div class="modal">
  <div class="mtitle">Portfolio header bewerken</div>
  <div class="ff"><label>Naam</label><input id="phName" placeholder="Jordy Hermans"></div>
  <div class="ff"><label>Titel / kwalificaties</label><input id="phTitle" placeholder="UEFA B · Performance & Individuele Ontwikkeling"></div>
  <div class="ff"><label>Club / organisatie</label><input id="phClub" placeholder="Belisia SV — Seniorenvoetbal"></div>
  <div class="ff"><label>Foto uploaden</label>
    <div style="border:2px dashed var(--brd);border-radius:8px;padding:16px;text-align:center;cursor:pointer;background:var(--bg)" onclick="document.getElementById('coachPhotoFile').click()">
      <div id="coachPhotoPreview">${'S.coachPhoto'?'':'<div style="font-size:24px;opacity:.25;margin-bottom:4px">📷</div><div style="font-size:12px;color:var(--t3)">Klik om foto te uploaden (JPG, PNG)</div>'}</div>
    </div>
    <input type="file" id="coachPhotoFile" accept="image/*" style="display:none" onchange="previewCoachPhoto(this)">
  </div>
  <div class="ma"><button class="btn bg" onclick="cm('editPortfolioHeader')">Annuleer</button><button class="btn bp" onclick="savePortfolioHeader()">Opslaan</button></div>
</div></div>

<div class="modal-wrap" id="m-compareSpelers"><div class="modal" style="width:500px">
  <div class="mtitle">Spelers vergelijken</div>
  <div style="font-size:13px;color:var(--t2);margin-bottom:12px">Selecteer 2 of meer spelers om te vergelijken:</div>
  <div id="compareSelectors" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;max-height:300px;overflow-y:auto">
  </div>
  <div style="display:flex;gap:8px;margin-top:10px"><button class="btn bg sm" onclick="[...document.querySelectorAll('#compareSelectors input')].forEach(c=>c.checked=false)">Wis alles</button></div>
  <div class="ma"><button class="btn bg" onclick="cm('compareSpelers')">Annuleer</button><button class="btn bp" onclick="compareSpelers()">Vergelijken</button></div>
</div></div>

<div class="modal-wrap" id="m-uploadLogo"><div class="modal">
  <div class="mtitle">Club logo uploaden</div>
  <div class="ff"><label>Club naam</label><input id="clubNameInput" placeholder="bv. Belisia SV" value="${S.clubName||'Belisia SV'}"></div>
  <div style="border:2px dashed var(--brd);border-radius:8px;padding:20px;text-align:center;cursor:pointer;background:var(--bg);margin-bottom:12px" onclick="document.getElementById('logoFile').click()">
    ${S.clubLogo?`<img src="${S.clubLogo}" style="width:80px;height:80px;border-radius:10px;object-fit:cover;margin-bottom:8px"><br>`:'<div style="font-size:32px;opacity:.2;margin-bottom:8px">🏟️</div>'}
    <div style="font-size:13px;color:var(--t3)">Klik om logo te selecteren</div>
    <div style="font-size:11px;color:var(--t3);margin-top:4px">PNG, JPG — max 2MB</div>
  </div>
  <input type="file" id="logoFile" accept="image/*" style="display:none" onchange="previewLogo(this)">
  <div id="logoPreview"></div>
  <div class="ma"><button class="btn bg" onclick="cm('uploadLogo')">Annuleer</button><button class="btn bp" onclick="saveLogo()">Opslaan</button></div>
</div></div>`;

<div class="modal-wrap" id="m-addPresence"><div class="modal">
  <div class="mtitle">Aanwezigheid registreren</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div class="ff"><label>Datum</label><input type="date" id="prDate" value="${new Date().toISOString().split('T')[0]}"></div>
    <div class="ff"><label>Dag</label><select id="prDay" class="fsel" style="width:100%"><option value="Maandag">Maandag</option><option value="Dinsdag">Dinsdag</option><option value="Woensdag">Woensdag</option><option value="Donderdag">Donderdag</option><option value="Vrijdag">Vrijdag</option><option value="Zaterdag">Zaterdag</option><option value="Zondag">Zondag</option></select></div>
    <div class="ff"><label>Sessie type</label><select id="prType" class="fsel" style="width:100%"><option value="training">Training</option><option value="wedstrijd">Wedstrijd</option><option value="herstel">Hersteltraining</option><option value="individueel">Individuele sessie</option></select></div>
    <div class="ff"><label>Status</label><select id="prStatus" class="fsel" style="width:100%"><option value="aanwezig">✅ Aanwezig</option><option value="absent">❌ Afwezig</option><option value="match">⚽ Wedstrijd</option><option value="injury">🤕 Blessure</option><option value="rtp">💪 Return-to-play</option></select></div>
  </div>
  <div class="ff"><label>Notitie (optioneel)</label><input id="prNote" placeholder="bv. Reden afwezigheid, prestatie..."></div>
  <div class="ma"><button class="btn bg" onclick="cm('addPresence')">Annuleer</button><button class="btn bp" onclick="savePresenceEntry()">Opslaan</button></div>
</div></div>

  // Close on backdrop
  document.querySelectorAll('.modal-wrap').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');}));

  // Fill player selects when modals open
  const popObs=new MutationObserver(()=>{
    const s=document.getElementById('popSel');
    if(s&&!s.options.length)s.innerHTML=S.players.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
    const sp=document.getElementById('sesPlayerSel');
    if(sp&&sp.options.length<=1)sp.innerHTML='<option value="">-- Kies speler --</option>'+S.players.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
    const wd=document.getElementById('wdSpeler');
    if(wd&&!wd.options.length)wd.innerHTML=S.players.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
  });
  ['m-addPop','m-addSession','m-addWerkpuntDirect'].forEach(id=>{const el=document.getElementById(id);if(el)popObs.observe(el,{attributes:true,attributeFilter:['class']});});
  const compareModal=document.getElementById('m-compareSpelers');
  if(compareModal){new MutationObserver(()=>{const cs=document.getElementById('compareSelectors');if(cs&&!cs.children.length)cs.innerHTML=S.players.map(p=>`<label style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;cursor:pointer;background:var(--bg);border:1px solid var(--brd)"><input type="checkbox" value="${p.id}"><div style="width:24px;height:24px;border-radius:50%;background:${p.color};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0">${p.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</div><span style="font-size:12px">${p.name}</span></label>`).join('');}).observe(compareModal,{attributes:true,attributeFilter:['class']});}
}

function toggleSesPlayer(){
  const type=document.getElementById('sesType')?.value;
  const pr=document.getElementById('sesPlayerRow');
  const tr=document.getElementById('sesTitleRow');
  if(pr)pr.style.display=type==='indiv'?'block':'none';
  if(tr)tr.style.display=type==='indiv'?'none':'block';
}

// ============================================================
// MODAL ACTION HANDLERS
// ============================================================
async function doAddSpeler(){
  const name=document.getElementById('nsName').value.trim();if(!name)return;
  syncing(true);
  const{data}=await sb.q('players').insert({name,pos:document.getElementById('nsPos').value,age:parseInt(document.getElementById('nsAge').value)||22,weight_kg:parseInt(document.getElementById('nsWt').value)||75,color:COLORS[S.players.length%COLORS.length],kpis:{},presence:[],injury:false});
  syncing(false);
  if(data){S.players.push({...data,werkpunten:[],popHistory:[],weight:[{d:'Start',w:data.weight_kg}],injuries:[]});const kc=document.getElementById('kern-count');if(kc)kc.textContent=S.players.length;}
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

async function doAddWerkpuntModal(){
  const pid=document.getElementById('wdSpeler')?.value;
  const text=document.getElementById('wdTxt')?.value.trim();
  const cat=document.getElementById('wdCat')?.value;
  if(!pid||!text){notify('Vul speler en werkpunt in','#E05252');return;}
  const p=S.players.find(x=>x.id==pid);if(!p)return;
  const wp={text,cat,principes:[],acties:[],feedback:''};
  syncing(true);const{data}=await sb.q('werkpunten').insert({player_id:pid,...wp});syncing(false);
  wp.id=data?.id||'local_'+Date.now();p.werkpunten=[...(p.werkpunten||[]),wp];
  document.getElementById('wdTxt').value='';cm('addWerkpuntDirect');renderWerkpuntenPage();notify('✓ Werkpunt toegevoegd aan '+p.name);
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
  const type=document.getElementById('sesType').value;
  const pid=document.getElementById('sesPlayerSel')?.value;
  const playerName=pid?S.players.find(x=>x.id==pid)?.name:'';
  const title=type==='indiv'&&playerName?`Individueel: ${playerName}`:document.getElementById('sesTitle').value||'Sessie';
  const sess={week_offset:key,day_index:day,type,title,time:document.getElementById('sesTime').value,note:document.getElementById('sesNote').value};
  syncing(true);const{data}=await sb.q('week_sessions').insert(sess);syncing(false);
  if(!S.weekSessions[key])S.weekSessions[key]={};
  if(!S.weekSessions[key][day])S.weekSessions[key][day]=[];
  S.weekSessions[key][day].push(data||{...sess,id:'local_'+Date.now()});
  cm('addSession');renderTraining();notify();
}

async function doAddCarriere(){
  const title=document.getElementById('carTitle').value.trim();if(!title)return;
  const editIdx=document.getElementById('carYear').dataset.editIdx;
  const editId=document.getElementById('carYear').dataset.editId;
  const c={year:document.getElementById('carYear').value,title,club:document.getElementById('carClub').value,description:document.getElementById('carDesc').value,sort_order:0};
  if(editIdx!==undefined&&editIdx!==''){
    const i=parseInt(editIdx);
    if(editId)await sb.q('carriere').update(c,editId);
    S.carriere[i]={...S.carriere[i],...c};
    delete document.getElementById('carYear').dataset.editIdx;
    delete document.getElementById('carYear').dataset.editId;
  } else {
    const{data}=await sb.q('carriere').insert(c);
    S.carriere.unshift({...c,id:data?.id});
  }
  cm('addCarriere');renderPortfolio();notify();
}

async function doAddTopic(){
  const name=document.getElementById('ltName').value.trim();if(!name)return;
  const t={name,description:document.getElementById('ltDesc').value};
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
  ['vidTitle','vidUrl','vidNote'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  cm('addVideo');renderLicentie();notify('Item toegevoegd');
}

async function doAddLeerlog(){
  const wat=document.getElementById('llWat').value.trim();if(!wat)return;
  const l={date:document.getElementById('llDate').value,topic:document.getElementById('llTopic').value,wat,hoe:document.getElementById('llHoe').value,resultaat:document.getElementById('llResultaat').value};
  // Sla op in Supabase als de tabel bestaat, anders lokaal
  try{const{data}=await sb.q('leerlog').insert(l);if(data)l.id=data.id;}catch(e){}
  if(!S.leerlog)S.leerlog=[];
  S.leerlog.unshift(l);
  cm('addLeerlog');renderLicentie();notify('Leerlog opgeslagen');
}

async function doAddReflectie(){
  const text=document.getElementById('refText').value.trim();if(!text)return;
  const r={date:document.getElementById('refDate').value,text,leerlog_ref:document.getElementById('refLeerlog').value};
  const{data}=await sb.q('reflecties').insert(r);
  S.reflecties.unshift({...r,id:data?.id});
  cm('addReflectie');renderLicentie();notify();
}

let _pendingOefVideo=null;
function handleOefVideo(input){
  if(!input.files[0])return;
  const file=input.files[0];
  // For large files, use object URL (works during session)
  _pendingOefVideo=URL.createObjectURL(file);
  document.getElementById('oefVideoLabel').textContent='✓ '+file.name;
}
async function doSaveOef(){
  const name=document.getElementById('oefN').value.trim();if(!name)return;
  const editId=document.getElementById('oefN').dataset.editId;
  const load={dist:parseFloat(document.getElementById('oefDist').value)||0,hsr:parseFloat(document.getElementById('oefHsr').value)||0,spr:parseFloat(document.getElementById('oefSpr').value)||0,spd:parseFloat(document.getElementById('oefSpd').value)||0,rpe:parseFloat(document.getElementById('oefRpe').value)||0,hr:parseFloat(document.getElementById('oefHr').value)||0,hrmax:parseFloat(document.getElementById('oefHrmax').value)||0};
  const videoUrl=_pendingOefVideo||document.getElementById('oefVidUrl').value||null;
  const pay={name,cat:document.getElementById('oefCatSel').value,dur:parseInt(document.getElementById('oefDur').value)||0,field:document.getElementById('oefField').value,players:document.getElementById('oefPlayers').value,intens:document.getElementById('oefIntens').value,description:document.getElementById('oefDesc').value,load,principes:[],video_url:videoUrl};
  if(editId){await sb.q('oefenvormen').update(pay,editId);const idx=S.oefenvormen.findIndex(o=>o.id==editId);if(idx>=0)S.oefenvormen[idx]={...S.oefenvormen[idx],...pay};delete document.getElementById('oefN').dataset.editId;}
  else{const{data}=await sb.q('oefenvormen').insert(pay);S.oefenvormen.push({...pay,id:data?.id,loadHistory:[]});}
  _pendingOefVideo=null;if(document.getElementById('oefVideoLabel'))document.getElementById('oefVideoLabel').textContent='📹 Klik om MP4 te selecteren';
  cm('addOefenvorm');renderOefenvormen();notify();
}

// Logo upload
async function savePresenceEntry(){
  const pid=S.activePlayer;const p=S.players.find(x=>x.id==pid);if(!p)return;
  // Auto-detect day from date
  const dateVal=document.getElementById('prDate').value;
  const dayNames=['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];
  const autoDay=dateVal?dayNames[new Date(dateVal).getDay()]:document.getElementById('prDay').value;
  const entry={date:dateVal,day:autoDay,type:document.getElementById('prType').value,status:document.getElementById('prStatus').value,note:document.getElementById('prNote').value};
  if(!p.presenceLog)p.presenceLog=[];
  // Insert sorted by date
  p.presenceLog.push(entry);
  p.presenceLog.sort((a,b)=>a.date.localeCompare(b.date));
  await savPl(p);
  cm('addPresence');
  renderPlayerDetail(p);
  // Switch to attendance tab
  setTimeout(()=>{const tabs=document.querySelectorAll('.tab');tabs.forEach(t=>{if(t.textContent.includes('Aanwezigheid'))t.click();});},100);
  notify('✓ Aanwezigheid opgeslagen');
}
let _pendingCoachPhoto=null;
function previewCoachPhoto(input){
  if(!input.files[0])return;
  const reader=new FileReader();
  reader.onload=e=>{
    _pendingCoachPhoto=e.target.result;
    document.getElementById('coachPhotoPreview').innerHTML=`<img src="${e.target.result}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:auto;display:block">`;
  };
  reader.readAsDataURL(input.files[0]);
}
function openEditPortfolioHeader(){
  document.getElementById('phName').value=S.portfolioName||S.profile?.name||'';
  document.getElementById('phTitle').value=S.portfolioTitle||'UEFA B · Performance & Individuele Ontwikkeling';
  document.getElementById('phClub').value=S.portfolioClub||S.clubName||'Belisia SV';
  const prev=document.getElementById('coachPhotoPreview');
  if(prev)prev.innerHTML=S.coachPhoto?`<img src="${S.coachPhoto}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:auto;display:block">`:'<div style="font-size:24px;opacity:.25;margin-bottom:4px;text-align:center">📷</div><div style="font-size:12px;color:var(--t3);text-align:center">Klik om foto te uploaden</div>';
  om('editPortfolioHeader');
}
function savePortfolioHeader(){
  S.portfolioName=document.getElementById('phName').value.trim();
  S.portfolioTitle=document.getElementById('phTitle').value.trim();
  S.portfolioClub=document.getElementById('phClub').value.trim();
  if(_pendingCoachPhoto){S.coachPhoto=_pendingCoachPhoto;localStorage.setItem('coachPhoto',_pendingCoachPhoto);_pendingCoachPhoto=null;}
  localStorage.setItem('portfolioName',S.portfolioName);
  localStorage.setItem('portfolioTitle',S.portfolioTitle);
  localStorage.setItem('portfolioClub',S.portfolioClub);
  cm('editPortfolioHeader');renderPortfolio();notify('Portfolio opgeslagen');
}
let _pendingLogoData=null;
function previewLogo(input){
  if(!input.files[0])return;
  const reader=new FileReader();
  reader.onload=e=>{
    _pendingLogoData=e.target.result;
    document.getElementById('logoPreview').innerHTML=`<img src="${e.target.result}" style="width:80px;height:80px;border-radius:10px;object-fit:cover;margin:8px auto;display:block">`;
  };
  reader.readAsDataURL(input.files[0]);
}
function saveLogo(){
  const name=document.getElementById('clubNameInput').value.trim()||'Belisia SV';
  if(_pendingLogoData){S.clubLogo=_pendingLogoData;localStorage.setItem('clubLogo',_pendingLogoData);_pendingLogoData=null;}
  S.clubName=name;localStorage.setItem('clubName',name);
  cm('uploadLogo');renderSidebar();if(document.getElementById('pg-portfolio').classList.contains('active'))renderPortfolio();notify('✓ Logo opgeslagen');
}
