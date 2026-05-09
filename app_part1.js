// ============================================================
// BELISIA SV — SUPABASE CLIENT v5 (role fix)
// ============================================================
const SUPABASE_URL = window.SUPABASE_URL || 'https://JOUW-PROJECT-ID.supabase.co';
const SUPABASE_KEY = window.SUPABASE_KEY || 'JOUW-ANON-KEY';

const sb = {
  token: null, userId: null,
  h(x={}) { return {'Content-Type':'application/json','apikey':SUPABASE_KEY,'Authorization':`Bearer ${this.token||SUPABASE_KEY}`,...x}; },
  async signUp(email,pass,name) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`,{method:'POST',headers:this.h(),body:JSON.stringify({email,password:pass,data:{name}})});
    return r.json();
  },
  async signIn(email,pass) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:'POST',headers:this.h(),body:JSON.stringify({email,password:pass})});
    const d = await r.json();
    if(d.access_token){
      this.token=d.access_token;
      this.userId=d.user.id;
      localStorage.setItem('sb_tok',d.access_token);
      localStorage.setItem('sb_uid',d.user.id);
      localStorage.setItem('sb_name', d.user.user_metadata?.name || d.user.email);
    }
    return d;
  },
  async signOut() {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`,{method:'POST',headers:this.h()});
    this.token=null;this.userId=null;
    localStorage.removeItem('sb_tok');
    localStorage.removeItem('sb_uid');
    localStorage.removeItem('sb_name');
    localStorage.removeItem('sb_usr');
  },
  async me() {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:this.h()});
    return r.json();
  },
  q(table){ return new SbQuery(table); }
};

class SbQuery {
  constructor(t){this.t=t;this._f=[];this._s='*';this._o=null;this._l=null;}
  select(s){this._s=s;return this;}
  eq(c,v){this._f.push(`${c}=eq.${encodeURIComponent(v)}`);return this;}
  order(c,{asc=true}={}){this._o=`${c}.${asc?'asc':'desc'}`;return this;}
  limit(n){this._l=n;return this;}
  _url(){
    let u=`${SUPABASE_URL}/rest/v1/${this.t}?select=${this._s}`;
    this._f.forEach(f=>u+='&'+f);
    if(this._o)u+=`&order=${this._o}`;
    if(this._l)u+=`&limit=${this._l}`;
    return u;
  }
  async get(){
    const r=await fetch(this._url(),{headers:sb.h({'Accept':'application/json'})});
    const d=await r.json();
    return{data:Array.isArray(d)?d:[],error:d.error||null};
  }
  async insert(data){
    const r=await fetch(`${SUPABASE_URL}/rest/v1/${this.t}`,{method:'POST',headers:sb.h({'Prefer':'return=representation'}),body:JSON.stringify(Array.isArray(data)?data:[data])});
    const d=await r.json();
    return{data:Array.isArray(d)?d[0]:d,error:d.error||null};
  }
  async update(data,id){
    const r=await fetch(`${SUPABASE_URL}/rest/v1/${this.t}?id=eq.${id}`,{method:'PATCH',headers:sb.h({'Prefer':'return=representation'}),body:JSON.stringify(data)});
    const d=await r.json();
    return{data:Array.isArray(d)?d[0]:d,error:d.error||null};
  }
  async del(id){
    const r=await fetch(`${SUPABASE_URL}/rest/v1/${this.t}?id=eq.${id}`,{method:'DELETE',headers:sb.h()});
    return{error:r.ok?null:'failed'};
  }
  async upsert(data){
    const r=await fetch(`${SUPABASE_URL}/rest/v1/${this.t}`,{method:'POST',headers:sb.h({'Prefer':'return=representation,resolution=merge-duplicates'}),body:JSON.stringify(Array.isArray(data)?data:[data])});
    const d=await r.json();
    return{data:d,error:d.error||null};
  }
}

// ============================================================
// APP STATE
// ============================================================
const COLORS=['#4FA8D1','#2EAA6A','#D4860A','#7C5CBF','#E05252','#16A085','#E67E22','#2980B9','#8E44AD','#27AE60','#C0392B','#F39C12'];
const S={user:null,profile:null,players:[],kpis:[],principes:[],weekSessions:{},carriere:[],competenties:[],licenseTopics:[],reflecties:[],oefenvormen:[],activePlayer:null,activeWerkpuntId:null,activeLicenseTopic:null,weekOffset:0,charts:{}};

// isCoach reads directly from S.profile which is always loaded fresh from Supabase
const isCoach=()=>S.profile?.role==='coach';
const ini=name=>(name||'?').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();

// ============================================================
// SYNC
// ============================================================
let syncTimer;
function syncing(v){
  const dot=document.getElementById('syncDot'),lbl=document.getElementById('syncLbl');
  if(!dot)return;
  if(v){dot.style.background='#D4860A';lbl.textContent='Opslaan...';}
  else{dot.style.background='#2EAA6A';lbl.textContent='Opgeslagen';}
}
function notify(msg='✓ Opgeslagen',col='#2EAA6A'){
  const n=document.getElementById('notif');
  if(!n)return;
  n.textContent=msg;n.style.borderLeftColor=col;n.style.display='flex';
  clearTimeout(syncTimer);syncTimer=setTimeout(()=>n.style.display='none',2800);
}

// ============================================================
// AUTH
// ============================================================
async function doLogin(){
  const email=document.getElementById('lEmail').value.trim();
  const pass=document.getElementById('lPass').value;
  const err=document.getElementById('lErr');
  if(!email||!pass){showErr(err,'Vul e-mail en wachtwoord in.');return;}
  const d=await sb.signIn(email,pass);
  if(!d.access_token){showErr(err,d.error?.message||'Login mislukt. Controleer je gegevens.');return;}
  await bootApp();
}
async function doRegister(){
  const name=document.getElementById('rName').value.trim();
  const email=document.getElementById('rEmail').value.trim();
  const pass=document.getElementById('rPass').value;
  const err=document.getElementById('rErr');
  if(!name||!email||!pass){showErr(err,'Vul alle velden in.');return;}
  if(pass.length<8){showErr(err,'Wachtwoord min. 8 tekens.');return;}
  const d=await sb.signUp(email,pass,name);
  if(d.error){showErr(err,d.error.message);return;}
  err.style.background='#D1FAE5';err.style.color='#065F46';
  err.textContent='✓ Account aangemaakt! Log nu in.';
  err.style.display='block';
  showLog();
}
function showErr(el,msg){el.textContent=msg;el.style.display='block';el.style.background='#FEE2E2';el.style.color='#991B1B';}
function showReg(){document.getElementById('loginView').style.display='none';document.getElementById('regView').style.display='block';}
function showLog(){document.getElementById('loginView').style.display='block';document.getElementById('regView').style.display='none';}
async function doLogout(){
  await sb.signOut();
  location.reload();
}

// ============================================================
// BOOT — altijd rol ophalen uit Supabase, nooit uit cache
// ============================================================
async function init(){
  const tok=localStorage.getItem('sb_tok');
  const uid=localStorage.getItem('sb_uid');
  if(tok && uid){
    sb.token=tok;
    sb.userId=uid;
    // Verify token still valid
    const check=await sb.me();
    if(check.id){
      await bootApp();
      return;
    }
    // Token expired — clear and show login
    await sb.signOut();
  }
  document.getElementById('loading').style.display='none';
  document.getElementById('authWrap').style.display='flex';
}

async function bootApp(){
  document.getElementById('loading').style.display='flex';
  document.getElementById('authWrap').style.display='none';

  // STAP 1: Haal altijd vers profiel op uit Supabase — NOOIT uit cache
  // Dit garandeert dat rolewijzigingen in Supabase meteen zichtbaar zijn
  const {data:profs} = await sb.q('profiles').eq('id', sb.userId).get();

  if(profs && profs.length > 0){
    S.profile = profs[0];
  } else {
    // Nieuw profiel aanmaken
    const name = localStorage.getItem('sb_name') || 'Gebruiker';
    const newProf = {id: sb.userId, name, role: 'player'};
    const {data:created} = await sb.q('profiles').insert(newProf);
    S.profile = created || newProf;
  }

  // STAP 2: Laad alle data
  await Promise.all([
    loadPlayers(),
    loadKpis(),
    loadPrincipes(),
    loadWeekSessions(),
    loadCoachData(),
    loadOefenvormen()
  ]);

  // STAP 3: Render UI met correcte rol
  document.getElementById('loading').style.display='none';
  document.getElementById('app').style.display='flex';
  renderSidebar();
  nav('dashboard', null);
}

// ============================================================
// DATA LOADERS
// ============================================================
async function loadPlayers(){
  const{data:pl}=await sb.q('players').order('name').get();
  for(const p of(pl||[])){
    const[{data:wps},{data:pops},{data:wh},{data:inj}]=await Promise.all([
      sb.q('werkpunten').eq('player_id',p.id).get(),
      sb.q('pop_history').eq('player_id',p.id).order('created_at',{asc:false}).get(),
      sb.q('weight_history').eq('player_id',p.id).order('measured_at').get(),
      sb.q('injuries').eq('player_id',p.id).get()
    ]);
    p.werkpunten=(wps||[]).map(w=>({...w,principes:w.principes||[],acties:w.acties||[]}));
    p.popHistory=pops||[];
    p.weight=(wh||[]).map(w=>({d:new Date(w.measured_at).toLocaleDateString('nl-BE',{day:'numeric',month:'short'}),w:w.weight_kg}));
    if(!p.weight.length)p.weight=[{d:'Start',w:p.weight_kg||75}];
    p.injuries=inj||[];
    p.kpis=p.kpis||{};
    p.presence=p.presence||[];
  }
  S.players=pl||[];
}

async function loadKpis(){
  const{data}=await sb.q('kpis').order('created_at').get();
  if(data?.length){S.kpis=data;return;}
  const defs=[
    {id:'k1',name:'Passes geslaagd %',unit:'pct',default_val:70},
    {id:'k2',name:'Sprints p/90',unit:'num',default_val:60},
    {id:'k3',name:'Toplopen p/90',unit:'num',default_val:55},
    {id:'k4',name:'Afstand (km)',unit:'km',default_val:8}
  ];
  for(const k of defs)await sb.q('kpis').insert(k);
  S.kpis=defs;
}

async function loadPrincipes(){
  const{data}=await sb.q('principes').order('created_at').get();
  if(data?.length){S.principes=data;return;}
  const defs=[
    {label:'Passing in final third',color:'chip-blue'},
    {label:'Receiving under pressure',color:'chip-blue'},
    {label:'Finishing 1v1',color:'chip-green'},
    {label:'Schot op doel',color:'chip-green'},
    {label:'Pressing trigger',color:'chip-amber'},
    {label:'Compactheid verdediging',color:'chip-amber'},
    {label:'Balrecirculatie',color:'chip-blue'},
    {label:'Dieptepas timing',color:'chip-green'}
  ];
  for(const p of defs)await sb.q('principes').insert(p);
  S.principes=defs;
}

async function loadWeekSessions(){
  const{data}=await sb.q('week_sessions').order('week_offset').get();
  S.weekSessions={};
  (data||[]).forEach(r=>{
    if(!S.weekSessions[r.week_offset])S.weekSessions[r.week_offset]={};
    if(!S.weekSessions[r.week_offset][r.day_index])S.weekSessions[r.week_offset][r.day_index]=[];
    S.weekSessions[r.week_offset][r.day_index].push(r);
  });
}

async function loadCoachData(){
  const[{data:carr},{data:comp},{data:topics},{data:refs}]=await Promise.all([
    sb.q('carriere').order('sort_order').get(),
    sb.q('competenties').order('created_at').get(),
    sb.q('license_topics').order('created_at').get(),
    sb.q('reflecties').order('date',{asc:false}).get()
  ]);
  S.carriere=carr?.length?carr:[
    {year:'2024–heden',title:'Performance Coach',club:'Belisia SV',description:'Seniorenvoetbal'},
    {year:'2020',title:'UEFA B Licentie',club:'KBVB Brussel',description:''}
  ];
  S.competenties=(comp||[]).map(c=>c.name);
  for(const t of(topics||[])){
    const{data:vids}=await sb.q('license_videos').eq('topic_id',t.id).get();
    t.videos=vids||[];
  }
  S.licenseTopics=topics||[];
  S.reflecties=refs||[];
}

async function loadOefenvormen(){
  const{data}=await sb.q('oefenvormen').order('created_at').get();
  for(const o of(data||[])){
    const{data:h}=await sb.q('oef_load_history').eq('oefenvorm_id',o.id).order('session_date').get();
    o.loadHistory=h||[];
    o.principes=o.principes||[];
    o.load=o.load||{};
  }
  S.oefenvormen=data||[];
}
