(()=>{
'use strict';
const $=s=>document.querySelector(s);
const el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const sample=(a,n)=>shuffle(a).slice(0,n);
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const IMG=window.IMG||{};
const RATIO={bulbik:609/720,iriska:692/720,mandarinka:674/720,myatik:509/720,ponchik:485/720,nyam:626/720,shusha:436/720,drak:487/720,poch:596/720,h_nyam:560/488,h_shusha:560/550,h_poch:522/560,h_drak:560/480,h_ours:640/578,sand:400/259,water:280/392,wood:383/318,fire:311/400,g_apple:407/517,g_bed:498/311,g_scare:372/520,g_bench:414/391,g_pond:466/377,g_green:435/464,g_bird:235/520,g_can:395/371};

/* ================= data ================= */
const RES={sand:{name:'Песок',acc:'песок',ins:'песком'},water:{name:'Вода',acc:'воду',ins:'водой'},wood:{name:'Доски',acc:'доски',ins:'досками'},fire:{name:'Огонь',acc:'огонь',ins:'огнём'}};
const RES_KEYS=['sand','water','wood','fire'];
const REWARD=2;
const BABIES=[
 {id:'bulbik',name:'Бульбик',trait:'Обожает прыгать по лужам',dome:['#86CCF7','#5DB7F0'],tint:'#D3ECFD'},
 {id:'iriska',name:'Ириска',trait:'Всех обнимает',dome:['#F9A9CB','#F47FB0'],tint:'#FFDCEA'},
 {id:'mandarinka',name:'Мандаринка',trait:'Самая весёлая',dome:['#FFBE7D','#FF9A3C'],tint:'#FFE4C8'},
 {id:'myatik',name:'Мятик',trait:'Всё изобретает',dome:['#7DDCC7','#3FC4AA'],tint:'#CFF3EB'},
 {id:'ponchik',name:'Пончик',trait:'Любит поспать',dome:['#C9997A','#A9724B'],tint:'#EEDDCF'}];
const NB={
 nyam:{id:'nyam',name:'Ням',dat:'Няму',gen:'Няма',res:'wood',dome:['#F25B70','#E23D55'],tint:'#FFE5E1',trait:'Вечно голодный, живёт у леса',hello:'Я голодный! Поиграем? За игру дам доски.',games:['feed','count','sort','slice'],house:'h_nyam',hx:278,hy:188,hw:170,mx:392,my:198,mh:84},
 shusha:{id:'shusha',name:'Шуша',dat:'Шуше',gen:'Шуши',res:'sand',dome:['#BC97F4','#9B6BE0'],tint:'#F1E6FF',trait:'Проказница, живёт у песочницы',hello:'Хочешь песочка? Поиграй со мной!',games:['prank','detective','sling','cups','dig','molds','pairs'],house:'h_shusha',hx:940,hy:183,hw:160,mx:828,my:190,mh:86},
 poch:{id:'poch',name:'Почемучка',dat:'Почемучке',gen:'Почемучки',res:'water',dome:['#FFD670','#FFB81F'],tint:'#FFF0C9',trait:'Всё знает и обо всём спрашивает',hello:'Привет! Ответишь на мои вопросы? Дам водичку.',games:['why','riddle','order','run'],house:'h_poch',hx:262,hy:455,hw:148,mx:365,my:460,mh:84},
 drak:{id:'drak',name:'Дракоша',dat:'Дракоше',gen:'Дракоши',res:'fire',dome:['#B2DB72','#7FBE36'],tint:'#E8F6D6',trait:'Огнедышащий почтальон',hello:'Помоги мне разнести посылки! Дам огонёк.',games:['parcel','maze','fly','fire','mail','dots'],house:'h_drak',hx:956,hy:485,hw:172,mx:842,my:463,mh:88}};
const RES_OWNER={wood:'nyam',sand:'shusha',water:'poch',fire:'drak'};
const PARTS=[
 {id:'door',name:'Дверь',acc:'дверь',ic:'🚪',tint:'#FFE7D6',need:['wood','wood']},
 {id:'window',name:'Окно',acc:'окно',ic:'🪟',tint:'#E1F1FF',need:['sand','fire']},
 {id:'porch',name:'Крыльцо',acc:'крыльцо',ic:'🪵',tint:'#FFEBD4',need:['wood','sand']},
 {id:'roof',name:'Крыша',acc:'крышу',ic:'🏠',tint:'#FFE3DD',need:['wood','fire'],req:'door'},
 {id:'chimney',name:'Труба',acc:'трубу',ic:'🧱',tint:'#FFE3DD',need:['sand','fire'],req:'roof'},
 {id:'flowers',name:'Клумба',acc:'клумбу',ic:'🌷',tint:'#FFE6F0',need:['water','sand']},
 {id:'fence',name:'Забор',acc:'забор',ic:'🌻',tint:'#FFF3D0',need:['wood','wood']},
 {id:'lamp',name:'Фонарь',acc:'фонарь',ic:'🏮',tint:'#FFF0D6',need:['fire','wood']},
 {id:'swing',name:'Качели',acc:'качели',ic:'🎠',tint:'#F0E8FF',need:['wood','fire']},
 {id:'pool',name:'Бассейн',acc:'бассейн',ic:'🏊',tint:'#DDF1FF',need:['water','water']}];
const HOME={x:619,y:335,w:270};
const GSIGN={x:492,y:500};
const PLAYER={x:782,y:362,h:118};

/* ================= state ================= */
const KEY='igralochka-v2';
const S0=()=>({player:null,inv:{sand:0,water:0,wood:0,fire:0},built:[],gbuilt:[],beds:[],harvest:{},harvested:[],seeds:['carrot','strawberry','pepper'],apples:0,gardenSeen:0,levels:{},sound:true,voice:true});
let ST=(()=>{try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==='object'){const d=S0();return Object.assign(d,s,{inv:Object.assign(d.inv,s.inv||{}),harvest:Object.assign({},s.harvest||{})})}}catch(e){}return S0()})();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){}};
const player=()=>BABIES.find(b=>b.id===ST.player)||BABIES[0];

/* ================= audio + voice ================= */
let ac=null;
function audio(){if(!ac){try{ac=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(ac&&ac.state==='suspended')ac.resume();return ac}
function tone(f,st,dur,type='sine',g=.16){const a=audio();if(!a||!ST.sound)return;const t=a.currentTime+st;const o=a.createOscillator(),v=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t);v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(g,t+.015);v.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(v).connect(a.destination);o.start(t);o.stop(t+dur+.05)}
const sfx={
 tap(){tone(620,0,.07,'triangle',.1)},
 good(){[523,659,784].forEach((f,i)=>tone(f,i*.08,.25,'triangle',.15))},
 bad(){tone(240,0,.16,'sine',.14);tone(200,.12,.22,'sine',.12)},
 pop(){tone(880,0,.06,'square',.04);tone(1320,.04,.08,'triangle',.06)},
 tick(){tone(420,0,.05,'square',.05)},
 whoosh(){const a=audio();if(!a||!ST.sound)return;for(let i=0;i<6;i++)tone(300+i*60,i*.03,.12,'sawtooth',.02)},
 build(){[392,523,659,784,1047].forEach((f,i)=>tone(f,i*.09,.3,'triangle',.15))},
 win(){[523,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,i*.1,.32,'triangle',.14))},
 step(){tone(500+Math.random()*140,0,.05,'sine',.06)}};
const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
let ruVoice=null;
function loadVoices(){try{const vs=speechSynthesis.getVoices();ruVoice=vs.find(v=>/^ru/i.test(v.lang)&&/milena|милена|google|natural|premium|enhanced|yandex/i.test(v.name))||vs.find(v=>/^ru/i.test(v.lang))||null}catch(e){}}
if('speechSynthesis' in window){loadVoices();try{speechSynthesis.onvoiceschanged=loadVoices}catch(e){}}
try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
// recorded voice packs: window.VP[speaker] = {normalized sentence: base64 mp3}; VP.frag = phrase fragments (fallback)
const VP=window.VP=window.VP||{};const SPK=['narrator','nyam','shusha','poch','drak'];
const vnorm=t=>String(t).toLowerCase().replace(/ё/g,'е').replace(/<[^>]*>/g,' ').replace(/[^a-zа-я0-9\s-]/g,' ').replace(/-/g,' ').replace(/\s+/g,' ').trim();
const vsplit=t=>(String(t).replace(/<[^>]*>/g,' ').match(/[^.!?…]+[.!?…]*/g)||[]).map(x=>x.trim()).filter(x=>vnorm(x));
let voiceWho='narrator';const vMiss=[];
const PACKS=['narrator','frag','nyam','shusha','poch','drak'],packState={};
function loadPack(n){if(packState[n])return packState[n];packState[n]=new Promise(res=>{if(VP[n]){res(1);return}const s=document.createElement('script');s.src='voice-'+n+'.js';s.async=true;s.onload=()=>res(1);s.onerror=()=>res(0);document.head.appendChild(s)});return packState[n]}
let packsAll=null;function loadPacks(){if(!packsAll)packsAll=PACKS.reduce((pr,n)=>pr.then(()=>loadPack(n)),Promise.resolve());return packsAll}
const packsPending=()=>PACKS.some(n=>!VP[n]);
function vclip(spk,key){if(VP[spk]&&VP[spk][key])return spk;if(VP.narrator&&VP.narrator[key])return 'narrator';for(const s of SPK)if(VP[s]&&VP[s][key])return s;return null}
let FMAX=0,FKEYS=null;
function vfrag(key){const F=VP.frag;if(!F)return null;if(!FKEYS){FKEYS=new Set(Object.keys(F));FKEYS.forEach(k=>{const n=k.split(' ').length;if(n>FMAX)FMAX=n})}
 const w=key.split(' ');const out=[];let miss=0;for(let i=0;i<w.length;){let ok=0;for(let n=Math.min(FMAX,w.length-i);n>0;n--){const k=w.slice(i,i+n).join(' ');if(FKEYS.has(k)){out.push({s:'frag',k,gap:.03});i+=n;ok=1;break}}if(!ok){miss++;vMiss.push(w[i]);i++}}
 return{items:out,miss,total:w.length}}
function vPlan(text,spk=voiceWho){const out=[];let miss=0,total=0;
 for(const sent of vsplit(text)){const k=vnorm(sent);const s=vclip(spk,k);total++;
  if(s){out.push({s,k,gap:.3});continue}
  const f=vfrag(k);if(!f||!f.items.length||f.miss>Math.max(1,f.total*.25)){miss++;continue}
  f.items[f.items.length-1].gap=.3;out.push(...f.items);vMiss.push('~'+k)}
 return out.length&&miss<=total*.34?out:null}
const vcache=new Map();let vsrcs=[],vtok=0;
function vbuf(s,key){const id=s+'|'+key;if(vcache.has(id))return vcache.get(id);const p=new Promise((res,rej)=>{try{const bin=atob(VP[s][key]);const arr=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);ac.decodeAudioData(arr.buffer,res,rej)}catch(e){rej(e)}});vcache.set(id,p);if(vcache.size>200)vcache.delete(vcache.keys().next().value);return p}
function vStop(){vtok++;vsrcs.forEach(x=>{try{x.stop()}catch(e){}});vsrcs=[]}
async function vPlay(plan){const my=++vtok;vsrcs.forEach(x=>{try{x.stop()}catch(e){}});vsrcs=[];const a=audio();if(!a)return;let t=a.currentTime+.05;
 const bufs=plan.map(it=>vbuf(it.s,it.k).catch(()=>{VST.fail++;return null}));
 for(let i=0;i<plan.length;i++){const b=await bufs[i];if(my!==vtok)return;if(!b)continue;const src=a.createBufferSource();src.buffer=b;src.connect(a.destination);t=Math.max(t,a.currentTime+.01);src.start(t);VST.clips++;vsrcs.push(src);t+=b.duration+plan[i].gap}}
function sayTTS(text,cancel){if(!('speechSynthesis' in window))return;try{const u=new SpeechSynthesisUtterance(text);u.lang='ru-RU';if(ruVoice)u.voice=ruVoice;u.rate=.95;u.pitch=1.12;if(cancel&&(speechSynthesis.speaking||speechSynthesis.pending)){speechSynthesis.cancel();setTimeout(()=>speechSynthesis.speak(u),60)}else speechSynthesis.speak(u)}catch(e){}}
const VST={say:0,rec:0,tts:0,clips:0,fail:0,log:[]};let sayTok=0;
function say(text,cancel=true){if(!ST.voice||!text)return;VST.say++;if(VST.log.length<4000)VST.log.push([voiceWho,String(text)]);
 const my=++sayTok,spk=voiceWho;audio();
 const go=()=>{if(my!==sayTok)return true;const pl=vPlan(text,spk);if(pl&&ac){VST.rec++;try{speechSynthesis.cancel()}catch(e){}vPlay(pl);return true}return false};
 if(go())return;vStop();
 if(packsPending()){const to=new Promise(r=>setTimeout(r,8000));Promise.race([Promise.all([loadPack(spk),loadPack('narrator'),loadPack('frag')]),to]).then(()=>{if(!go()&&my===sayTok){VST.tts++;sayTTS(text,cancel)}});return}
 VST.tts++;sayTTS(text,cancel)}
const hush=()=>{sayTok++;vStop();try{speechSynthesis.cancel()}catch(e){}};
const PRAISE=['Молодец!','Умница!','Отлично!','Здорово!','Ура!','Так держать!','Супер!'];
const TRY=['Попробуй ещё!','Почти! Ещё разок.','Подумай ещё!'];

/* ================= stage fit ================= */
const app=$('#app'),stage=$('#stage');
let K=1,W=844,H=390,SIDE=48;
const probe=el('div');probe.style.cssText='position:absolute;visibility:hidden;padding-left:env(safe-area-inset-left,0px);padding-right:env(safe-area-inset-right,0px)';document.body.appendChild(probe);
function fit(){
 const r=app.getBoundingClientRect();const w=Math.max(r.width,1),h=Math.max(r.height,1);
 K=Math.min(w/844,h/390);W=w/K;H=h/K;
 stage.style.width=W+'px';stage.style.height=H+'px';stage.style.transform=`scale(${K})`;
 const cs=getComputedStyle(probe);const inset=Math.max(parseFloat(cs.paddingLeft)||0,parseFloat(cs.paddingRight)||0);
 SIDE=Math.max(40,inset/K+14);stage.style.setProperty('--side',SIDE+'px');
 const cv=$('#confetti');cv.style.width=W+'px';cv.style.height=H+'px';
 if(!$('#scr-choose').hidden)layoutChoose();
 if(!$('#scr-map').hidden){clampCam();applyCam()}
 if(!$('#scr-house').hidden&&curHouse)layoutHouse();
 if(!$('#scr-garden').hidden){layoutGarden();renderGarden()}
}
window.addEventListener('resize',()=>requestAnimationFrame(fit));
const toLocal=(e,elm)=>{const r=elm.getBoundingClientRect();return{x:(e.clientX-r.left)/K,y:(e.clientY-r.top)/K}};

/* ================= helpers ================= */
function monImg(key,h,cls='mon'){const i=el('img',cls);i.src=IMG[key];i.alt='';i.style.height=h+'px';i.style.width=Math.round(h*RATIO[key])+'px';i.style.animationDelay=(-Math.random()*2.8).toFixed(2)+'s';return i}
function resImg(key,box){const i=el('img');i.src=IMG[key];i.alt=RES[key].name;i.style.width=box+'px';i.style.height=box+'px';i.style.objectFit='contain';return i}
function hop(m,cls='hop'){if(!m)return;m.classList.remove('hop','dance','sad','chomp');void m.offsetWidth;m.classList.add(cls);setTimeout(()=>m.classList.remove(cls),cls==='dance'?1700:700)}
function shake(e){e.classList.remove('shake');void e.offsetWidth;e.classList.add('shake');setTimeout(()=>e.classList.remove('shake'),500)}
function show(id){voiceWho='narrator';document.querySelectorAll('.screen').forEach(s=>s.hidden=s.id!==id);['#ov-build','#ov-reward','#ov-parents'].forEach(o=>{const e=$(o);if(e)e.hidden=true})}
let toastT=0;function toast(t){const e=$('#toast');e.textContent=t;e.style.opacity=1;clearTimeout(toastT);toastT=setTimeout(()=>e.style.opacity=0,2200)}
const SVG={
 play:'<svg viewBox="0 0 24 24"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="#fff"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#2D1856" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 close:'<svg viewBox="0 0 24 24" fill="none" stroke="#2D1856" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 hammer:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.4 8.4a2.1 2.1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.9-1.9A2 2 0 0 1 19 8.2V7l-2.3-2.3a6 6 0 0 0-4.2-1.8L9 3l.9.8A6.2 6.2 0 0 1 12 8.4V10l2 2h1.2a2 2 0 0 1 1.4.6l1.9 1.9"/></svg>',
 lock:'<svg viewBox="0 0 24 24" fill="none" stroke="#B3A6C4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
 check:'<svg viewBox="0 0 34 34"><circle cx="17" cy="17" r="15.5" fill="#3CC37A" stroke="#fff" stroke-width="3"/><path d="M10.5 17.5l4.2 4 8.6-8.7" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 okSmall:'<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" fill="#3CC37A" stroke="#fff" stroke-width="2"/><path d="M5.5 9.3l2.3 2.2 4.6-4.7" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 speak:'<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 9.5H7L11.5 5.5v13L7 14.5H3.5z" fill="#C48A00"/><path d="M15 9a4 4 0 0 1 0 6" stroke="#C48A00" stroke-width="2.4" stroke-linecap="round"/></svg>',
 backpack:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 10h8M8 18h8"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>'};

/* ================= confetti ================= */
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const cv=$('#confetti'),x=cv.getContext('2d');const dpr=Math.min(2,devicePixelRatio||1)*K;cv.width=W*dpr;cv.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
 const cols=['#FF6B5B','#FFC83D','#5BC46E','#3FA2F2','#A47CF0','#F26BA7'];
 const P=[...Array(120)].map(()=>({x:W/2+(Math.random()-.5)*120,y:H*.4,vx:(Math.random()-.5)*13,vy:-Math.random()*12-4,s:6+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:pick(cols),q:Math.random()<.5}));
 const t0=performance.now();(function f(t){x.clearRect(0,0,W,H);for(const p of P){p.vy+=.33;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;if(p.q)x.fillRect(-p.s/2,-p.s/3,p.s,p.s*.66);else{x.beginPath();x.arc(0,0,p.s/2.2,0,7);x.fill()}x.restore()}if(t-t0<2600)requestAnimationFrame(f);else x.clearRect(0,0,W,H)})(t0)}

/* ================= our house composite ================= */
let uid=0;
const PART_DEF={
 door:{l:36.4,t:45.3,w:12,h:24.2,svg:()=>'<svg viewBox="0 0 80 140" preserveAspectRatio="none"><rect x="2" y="2" width="76" height="136" rx="8" fill="#B8733A" stroke="#8A4F22" stroke-width="4"/><path d="M28 6v128M54 6v128" stroke="#9E5F2C" stroke-width="3"/><rect x="10" y="28" width="60" height="8" rx="3" fill="#7A4420"/><rect x="10" y="102" width="60" height="8" rx="3" fill="#7A4420"/><circle cx="64" cy="74" r="6" fill="#F6C344" stroke="#B88A1C" stroke-width="2"/></svg>'},
 window:{l:64.5,t:47.2,w:11.9,h:13.1,svg:i=>`<svg viewBox="0 0 76 76"><defs><linearGradient id="wg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D8F0FF"/><stop offset="1" stop-color="#6FB6EC"/></linearGradient></defs><circle cx="38" cy="38" r="37" fill="url(#wg${i})"/><path d="M38 3v70M3 38h70" stroke="#A86A33" stroke-width="7"/><circle cx="38" cy="38" r="35" fill="none" stroke="#A86A33" stroke-width="5"/><path d="M15 27a25 25 0 0 1 13-13" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85"/></svg>`},
 roof:{l:4,t:-1,w:92,h:37,svg:i=>{const d='M295 4L582 186Q592 204 572 206H18Q-2 204 8 186Z';let rows='';for(const y of[52,92,132,172]){let p=`M-20 ${y}`;for(let x=-20;x<600;x+=36)p+=` q18 18 36 0`;rows+=`<path d="${p}"/>`}return`<svg viewBox="0 0 590 210" preserveAspectRatio="none"><defs><clipPath id="rc${i}"><path d="${d}"/></clipPath><linearGradient id="rg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7E5F"/><stop offset="1" stop-color="#D9452F"/></linearGradient></defs><path d="${d}" fill="url(#rg${i})"/><g clip-path="url(#rc${i})" fill="none" stroke="#B83722" stroke-width="6" opacity=".5">${rows}</g><path d="${d}" fill="none" stroke="#A9301E" stroke-width="6" stroke-linejoin="round"/></svg>`}},
 chimney:{l:66,t:3,w:7,h:15,svg:()=>'<svg viewBox="0 0 44 86" preserveAspectRatio="none"><rect x="4" y="10" width="36" height="76" rx="4" fill="#C8573E"/><path d="M4 30h36M4 50h36M4 70h36M22 10v20M14 30v20M30 50v20M22 70v16" stroke="#9E3E2B" stroke-width="3"/><rect x="0" y="2" width="44" height="12" rx="4" fill="#8E3626"/></svg>'},
 porch:{l:33,t:68.5,w:19,h:8,svg:()=>'<svg viewBox="0 0 120 40" preserveAspectRatio="none"><rect x="0" y="14" width="120" height="26" rx="6" fill="#C98B4E"/><rect x="14" y="0" width="92" height="18" rx="5" fill="#DDA463"/><path d="M0 27h120" stroke="#A86E37" stroke-width="3"/></svg>'},
 flowers:{l:-3,t:80,w:25,h:15,svg:()=>{let f='';for(const[x,y,c]of[[22,38,'#FF7AA8'],[48,24,'#FFD34D'],[74,34,'#FF7AA8'],[100,22,'#B78CFF'],[126,38,'#FFD34D']]){f+=`<path d="M${x} ${y+6}V62" stroke="#4FA34A" stroke-width="4"/><ellipse cx="${x-7}" cy="${y+22}" rx="7" ry="4" fill="#5DBB55"/>`;for(let k=0;k<5;k++){const a=k*1.2566;f+=`<circle cx="${(x+Math.cos(a)*7).toFixed(1)}" cy="${(y+Math.sin(a)*7).toFixed(1)}" r="6" fill="${c}"/>`}f+=`<circle cx="${x}" cy="${y}" r="5" fill="#FFF3B0"/>`}return`<svg viewBox="0 0 150 90"><ellipse cx="75" cy="68" rx="72" ry="20" fill="#8A5A3B"/><ellipse cx="75" cy="63" rx="64" ry="15" fill="#6E4428"/>${f}</svg>`}},
 fence:{l:80,t:57,w:24,h:18,svg:()=>{let p='';for(let i=0;i<5;i++){const x=8+i*28;p+=`<path d="M${x} 96V26l10-14 10 14v70z" fill="#F6E7C8" stroke="#C9A574" stroke-width="3" stroke-linejoin="round"/>`}return`<svg viewBox="0 0 150 100"><rect x="0" y="40" width="150" height="10" rx="4" fill="#E9D3A8" stroke="#C9A574" stroke-width="2"/><rect x="0" y="70" width="150" height="10" rx="4" fill="#E9D3A8" stroke="#C9A574" stroke-width="2"/>${p}</svg>`}},
 lamp:{l:-9,t:28,w:7,h:48,svg:()=>'<svg viewBox="0 0 40 230" preserveAspectRatio="none"><circle cx="20" cy="30" r="27" fill="#FFE8A3" opacity=".55"/><rect x="17" y="40" width="6" height="182" rx="3" fill="#4B4458"/><rect x="8" y="214" width="24" height="14" rx="4" fill="#3A3446"/><path d="M8 18h24l-4 26H12z" fill="#FFD34D" stroke="#4B4458" stroke-width="3"/><path d="M6 18h28l-14-12z" fill="#4B4458"/></svg>'},
 swing:{l:-31,t:34,w:22,h:44,svg:()=>'<svg viewBox="0 0 140 200" preserveAspectRatio="none"><path d="M12 196L40 14M128 196L100 14" stroke="#A86E37" stroke-width="9" stroke-linecap="round"/><path d="M30 14h80" stroke="#8A5A2E" stroke-width="10" stroke-linecap="round"/><path d="M52 16v108M88 16v108" stroke="#7B6F86" stroke-width="3"/><rect x="42" y="122" width="56" height="12" rx="5" fill="#F2584B"/></svg>'},
 pool:{l:78,t:87,w:27,h:12,svg:()=>'<svg viewBox="0 0 170 70" preserveAspectRatio="none"><ellipse cx="85" cy="38" rx="84" ry="31" fill="#EDE6DC"/><ellipse cx="85" cy="36" rx="74" ry="24" fill="#53B9F0"/><path d="M40 34q10-6 20 0t20 0M95 42q10-6 20 0t20 0" stroke="#C4ECFF" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="122" cy="30" r="7" fill="#FFD34D"/><circle cx="127" cy="24" r="5" fill="#FFD34D"/><path d="M131 24l5 1-5 2z" fill="#F28C28"/></svg>'}};
function makeHome(w){
 const h=el('div','home');h.style.width=w+'px';const b=el('img','base');b.src=IMG.h_ours;b.alt='Наш дом';h.appendChild(b);const n=++uid;
 for(const p of PARTS){const d=PART_DEF[p.id];const e=el('div','part');e.dataset.part=p.id;e.style.cssText=`left:${d.l}%;top:${d.t}%;width:${d.w}%;height:${d.h}%`;e.innerHTML=d.svg(n);h.appendChild(e)}
 setParts(h);return h}
function setParts(h,fresh){h.querySelectorAll('.part').forEach(e=>{const on=ST.built.includes(e.dataset.part);e.classList.toggle('on',on);if(fresh&&e.dataset.part===fresh){e.classList.remove('new');void e.offsetWidth;e.classList.add('new')}})}

/* ================= goal logic ================= */
const isBuilt=p=>(p.kind==='garden'?ST.gbuilt:ST.built).includes(p.id);
const reqOk=p=>!p.req||(p.kind==='garden'?ST.gbuilt:ST.built).includes(p.req);
const goalPart=()=>PARTS.find(p=>!isBuilt(p)&&reqOk(p))||GPARTS.find(p=>!isBuilt(p)&&reqOk(p));
function needOf(p){const n={};p.need.forEach(r=>n[r]=(n[r]||0)+1);return n}
function missing(p){const n=needOf(p),m={};for(const r in n){const d=n[r]-(ST.inv[r]||0);if(d>0)m[r]=d}return m}
const canBuild=p=>Object.keys(missing(p)).length===0;
function hintFor(p){if(!p)return 'Дом и сад готовы! Ура!';const m=Object.keys(missing(p));if(!m.length)return p.kind==='garden'?`Всё есть! Иди в сад и построй ${p.acc}!`:`Всё есть! Нажми на дом и построй ${p.acc}!`;return `Чтобы построить ${p.acc}, сходи `+m.map(r=>`к ${NB[RES_OWNER[r]].dat} за ${RES[r].ins}`).join(' и ')+'!'}

/* ================= CHOOSE ================= */
let chSel=0;
function openChoose(){
 show('scr-choose');chSel=Math.max(0,BABIES.findIndex(b=>b.id===ST.player));
 const box=$('#chAvas');box.innerHTML='';
 BABIES.forEach((b,i)=>{const a=el('button','ava');a.style.background=b.tint;a.setAttribute('aria-label',b.name);const im=el('img');im.src=IMG[b.id];im.alt='';a.appendChild(im);a.onclick=()=>{audio();sfx.tap();selectBaby(i,true)};box.appendChild(a)});
 selectBaby(chSel,false);layoutChoose()}
function selectBaby(i,speak){chSel=i;const b=BABIES[i];
 $('#chDome').style.background=`linear-gradient(180deg,${b.dome[0]},${b.dome[1]} 70%)`;$('#chOrbit').style.color=b.dome[1];
 const m=$('#chMon');m.src=IMG[b.id];$('#chName').textContent=b.name.toUpperCase();$('#chTrait').textContent=b.trait;
 document.querySelectorAll('#chAvas .ava').forEach((a,k)=>a.classList.toggle('sel',k===i));
 layoutChoose();if(speak){hop(m);say(`${b.name}! ${b.trait}`)}}
function layoutChoose(){
 const cx=Math.max(220,Math.min(W*.29,300));const d=500;
 Object.assign($('#chDome').style,{width:d+'px',height:d+'px',left:(cx-d/2)+'px',top:(H/2-149)+'px'});
 Object.assign($('#chOrbit').style,{width:(d+48)+'px',height:(d+48)+'px',left:(cx-d/2-24)+'px',top:(H/2-173)+'px'});
 const m=$('#chMon');const mh=Math.min(290,H-96);const key=BABIES[chSel].id;m.style.height=mh+'px';m.style.width=Math.round(mh*RATIO[key])+'px';m.style.left=(cx-mh*RATIO[key]/2)+'px';m.style.top=(H-50-mh)+'px';
 const x=Math.max(cx+266,W*.56);
 Object.assign($('#chInfo').style,{left:x+'px',top:(H/2-155)+'px'});const nmE=$('#chName');nmE.style.fontSize=Math.min(48,(W-x-SIDE)/(BABIES[chSel].name.length*.78))+'px';
 Object.assign($('#chAvas').style,{left:(x-8)+'px',top:(H/2-30)+'px'});
 Object.assign($('#chGo').style,{left:x+'px',top:(H/2+78)+'px'});
 Object.assign($('#chHint').style,{left:x+'px',top:(H/2+150)+'px'})}
$('#chMon').addEventListener('click',()=>{audio();hop($('#chMon'));const b=BABIES[chSel];say(`Привет! Я ${b.name}!`)});
$('#chGo').addEventListener('click',()=>{audio();sfx.good();ST.player=BABIES[chSel].id;save();tryFullscreen();goMap(true)});
function tryFullscreen(){try{const d=document.documentElement;const p=d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen?d.webkitRequestFullscreen():null;if(p&&p.then)p.then(()=>{try{screen.orientation.lock('landscape').catch(()=>{})}catch(e){}}).catch(()=>{})}catch(e){}}

/* ================= MAP ================= */
const world=$('#world'),vp=$('#vp');
let cam={x:0,y:0},mapBuilt=false,homeEl=null,playerEl=null,anim=null;
const WORLD_W=1250,WORLD_H=704,WS=0.86;
function clampCam(){const ww=WORLD_W*WS,wh=WORLD_H*WS;cam.x=W>=ww?(W-ww)/2:Math.min(0,Math.max(W-ww,cam.x));cam.y=H>=wh?(H-wh)/2:Math.min(0,Math.max(H-wh,cam.y))}
function applyCam(){world.style.transform=`translate3d(${cam.x}px,${cam.y}px,0) scale(${WS})`}
function centerOn(x,y,animate){const tx=W/2-x*WS,ty=H/2-y*WS;const from={...cam};const to={x:tx,y:ty};const save2=cam;cam=to;clampCam();const dest={...cam};cam=save2;
 if(!animate){cam=dest;applyCam();return}cancelAnimationFrame(anim);const t0=performance.now();
 (function f(t){const k=Math.min(1,(t-t0)/600),e=1-Math.pow(1-k,3);cam.x=from.x+(dest.x-from.x)*e;cam.y=from.y+(dest.y-from.y)*e;applyCam();if(k<1)anim=requestAnimationFrame(f)})(t0)}
function buildMap(){
 $('#mapbg').src=IMG.map;
 for(const nb of Object.values(NB)){
  const hh=nb.hw/RATIO[nb.house];const hw=el('div','wobj');hw.style.cssText=`left:${nb.hx-nb.hw/2}px;top:${nb.hy-hh}px;width:${nb.hw}px`;const hi=el('img');hi.src=IMG[nb.house];hi.alt='';hi.style.width='100%';hw.appendChild(hi);world.appendChild(hw);
  const m=monImg(nb.id,nb.mh);m.style.left=(nb.mx-nb.mh*RATIO[nb.id]/2)+'px';m.style.top=(nb.my-nb.mh)+'px';m.dataset.nb=nb.id;world.appendChild(m);
  const x1=Math.min(nb.hx-nb.hw/2,nb.mx-nb.mh*RATIO[nb.id]/2),x2=Math.max(nb.hx+nb.hw/2,nb.mx+nb.mh*RATIO[nb.id]/2),y1=Math.min(nb.hy-hh,nb.my-nb.mh),y2=Math.max(nb.hy,nb.my);
  const hit=el('div','hit');hit.dataset.hit='nb:'+nb.id;hit.style.cssText=`left:${x1}px;top:${y1}px;width:${x2-x1}px;height:${y2-y1}px`;world.appendChild(hit)}
 const hh=HOME.w/RATIO.h_ours;const hw=el('div','wobj');hw.style.cssText=`left:${HOME.x-HOME.w/2}px;top:${HOME.y-hh}px;width:${HOME.w}px`;homeEl=makeHome(HOME.w);hw.appendChild(homeEl);world.appendChild(hw);
 const hit=el('div','hit');hit.dataset.hit='home';hit.style.cssText=`left:${HOME.x-HOME.w/2}px;top:${HOME.y-hh}px;width:${HOME.w}px;height:${hh}px`;world.appendChild(hit);
 const chip=el('div','hchip');chip.id='hchip';chip.innerHTML='<b>Наш дом</b><div class="bar"><i></i></div><span></span>';chip.style.left=(HOME.x-62)+'px';chip.style.top=(HOME.y+4)+'px';chip.dataset.hit='home';world.appendChild(chip);
 const ham=el('div','hammer');ham.id='hammer';ham.innerHTML=SVG.hammer;ham.style.left=(HOME.x+HOME.w*.32)+'px';ham.style.top=(HOME.y-hh+18)+'px';ham.dataset.hit='home';world.appendChild(ham);
 {const gw=el('div','wobj gsign');gw.style.cssText=`left:${GSIGN.x-60}px;top:${GSIGN.y-92}px;width:132px;height:96px`;
  const bi=el('img');bi.src=IMG.g_bed;bi.alt='';bi.style.cssText='position:absolute;left:0;bottom:0;width:96px';gw.appendChild(bi);
  const si=el('img');si.src=IMG.g_scare;si.alt='';si.style.cssText='position:absolute;right:0;bottom:6px;height:84px';gw.appendChild(si);world.appendChild(gw);
  const gh=el('div','hit');gh.dataset.hit='garden';gh.style.cssText=`left:${GSIGN.x-64}px;top:${GSIGN.y-96}px;width:140px;height:104px`;world.appendChild(gh);
  const gc=el('div','hchip');gc.id='gchip';gc.dataset.hit='garden';gc.innerHTML='<b>Сад</b><span></span>';gc.style.left=(GSIGN.x-34)+'px';gc.style.top=(GSIGN.y+2)+'px';world.appendChild(gc);
  const ga=el('div','galert emo');ga.id='galert';ga.dataset.hit='garden';ga.style.left=(GSIGN.x+52)+'px';ga.style.top=(GSIGN.y-104)+'px';world.appendChild(ga);
  const gham=el('div','hammer');gham.id='ghammer';gham.innerHTML=SVG.hammer;gham.dataset.hit='garden';gham.style.left=(GSIGN.x-74)+'px';gham.style.top=(GSIGN.y-100)+'px';world.appendChild(gham)}
 playerEl=el('img','mon');playerEl.alt='';world.appendChild(playerEl);
 const ph=el('div','hit');ph.dataset.hit='player';world.appendChild(ph);ph.id='playerHit';
 const goal=el('div','goal');goal.id='goal';goal.dataset.hit='goal';world.appendChild(goal);
 for(const nb of Object.values(NB)){const q=el('div','quest');q.id='q-'+nb.id;q.dataset.hit='nb:'+nb.id;q.style.left=(nb.mx-29)+'px';q.style.top=Math.max(4,nb.my-nb.mh-66)+'px';q.appendChild(resImg(nb.res,36));q.hidden=true;world.appendChild(q)}
 mapBuilt=true}
function renderBackpack(bumpKey){const bp=$('#backpack');bp.innerHTML='';for(const k of RES_KEYS){const n=ST.inv[k]||0;const it=el('div','bpi'+(n?'':' zero'));it.id='bp-'+k;it.appendChild(resImg(k,30));it.appendChild(el('span',null,String(n)));bp.appendChild(it);if(bumpKey===k)it.classList.add('bump')}}
function refreshMap(bumpKey){
 if(!mapBuilt)buildMap();mapAmbient();
 const pl=player();
 playerEl.src=IMG[pl.id];const ph=PLAYER.h,pw=ph*RATIO[pl.id];Object.assign(playerEl.style,{height:ph+'px',width:pw+'px',left:(PLAYER.x-pw/2)+'px',top:(PLAYER.y-ph)+'px'});
 Object.assign($('#playerHit').style,{left:(PLAYER.x-pw/2)+'px',top:(PLAYER.y-ph)+'px',width:pw+'px',height:ph+'px'});
 const ha=$('#hudAva');ha.style.background=pl.tint;ha.querySelector('img').src=IMG[pl.id];
 renderBackpack(bumpKey);setParts(homeEl);
 const done=ST.built.length;$('#hchip span').textContent=`${done}/${PARTS.length}`;$('#hchip .bar i').style.width=(done/PARTS.length*100)+'%';
 const g=goalPart();const m=g?missing(g):{};
 for(const nb of Object.values(NB))$('#q-'+nb.id).hidden=!(g&&m[nb.res]);
 $('#hammer').hidden=!(g&&g.kind!=='garden'&&canBuild(g));$('#ghammer').hidden=!(g&&g.kind==='garden'&&canBuild(g));
 tickGarden();$('#gchip span').textContent=`${ST.gbuilt.length}/${GPARTS.length}`;const ga=gardenAlert();$('#galert').textContent=ga;$('#galert').hidden=!ga;
 const goal=$('#goal');goal.innerHTML='';
 if(g){if(g.img){const gi=el('img','gpimg');gi.src=IMG[g.img];gi.alt=g.name;goal.appendChild(gi)}else goal.appendChild(el('span','gpart emo',g.ic));goal.appendChild(el('span','op','='));const used={};let first=true;
  for(const r of g.need){if(!first)goal.appendChild(el('span','op','+'));first=false;const have=(ST.inv[r]||0);const s=el('div','slot');used[r]=(used[r]||0)+1;const ok=have>=used[r];if(ok)s.classList.add('ok');s.appendChild(resImg(r,28));if(ok)s.insertAdjacentHTML('beforeend',`<span class="badge">${SVG.okSmall}</span>`);goal.appendChild(s)}}
 else goal.appendChild(el('span','gpart emo','🎉'));
 goal.style.left=(PLAYER.x+pw/2+10)+'px';goal.style.top=(PLAYER.y-ph+6)+'px'}
function goMap(first,bumpKey){
 hush();show('scr-map');refreshMap(bumpKey);if(first)centerOn(HOME.x,HOME.y-100,false);clampCam();applyCam();
 setTimeout(()=>say(hintFor(goalPart())),first?400:900)}
// pan + tap
let drag=null,inert=0;
vp.addEventListener('pointerdown',e=>{audio();cancelAnimationFrame(anim);cancelAnimationFrame(inert);drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,cx:cam.x,cy:cam.y,moved:false,vx:0,vy:0,lx:e.clientX,ly:e.clientY,lt:performance.now()};try{vp.setPointerCapture(e.pointerId)}catch(_){}});
vp.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=(e.clientX-drag.sx)/K,dy=(e.clientY-drag.sy)/K;if(!drag.moved&&Math.hypot(dx,dy)>7)drag.moved=true;if(drag.moved){cam.x=drag.cx+dx;cam.y=drag.cy+dy;clampCam();applyCam();const t=performance.now(),dt=Math.max(1,t-drag.lt);drag.vx=(e.clientX-drag.lx)/K/dt*16;drag.vy=(e.clientY-drag.ly)/K/dt*16;drag.lx=e.clientX;drag.ly=e.clientY;drag.lt=t}});
vp.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;
 if(!d.moved){const t=document.elementFromPoint(e.clientX,e.clientY);const h=t&&t.closest('[data-hit]');if(h)onMapHit(h.dataset.hit);return}
 let vx=d.vx,vy=d.vy;(function f(){vx*=.92;vy*=.92;cam.x+=vx;cam.y+=vy;clampCam();applyCam();if(Math.hypot(vx,vy)>.3)inert=requestAnimationFrame(f)})()});
vp.addEventListener('pointercancel',()=>{drag=null});
function onMapHit(h){
 if(h==='home'){sfx.tap();openBuild('house');return}
 if(h==='garden'){sfx.tap();openGarden();return}
 if(h==='player'||h==='goal'){hop(playerEl);sfx.pop();say(hintFor(goalPart()));return}
 if(h.startsWith('nb:')){const id=h.slice(3);const m=world.querySelector(`img[data-nb="${id}"]`);hop(m);sfx.tap();setTimeout(()=>openHouse(id),260)}}
$('#homeBtn').addEventListener('click',()=>{sfx.tap();centerOn(HOME.x,HOME.y-100,true)});
$('#hudAva').addEventListener('click',()=>{hop(playerEl);say(hintFor(goalPart()))});
// parents long-press
(()=>{const b=$('#lockBtn');let t=0,st=0;
 const start=e=>{e.preventDefault();st=Date.now();b.classList.add('holding');t=setTimeout(()=>{b.classList.remove('holding');t=0;openParents()},1500)};
 const end=()=>{if(!t)return;clearTimeout(t);t=0;b.classList.remove('holding');if(Date.now()-st<1300)toast('Для родителей: нажмите и держите')};
 b.addEventListener('pointerdown',start);['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,end));
 b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openParents()})})();

/* ================= BUILD ================= */
let pvHome=null,buildKind='house';
const kindParts=()=>buildKind==='garden'?GPARTS:PARTS;
function openBuild(kind='house'){
 buildKind=kind;voiceWho='narrator';const ov=$('#ov-build');ov.innerHTML='';ov.hidden=false;
 const scrim=el('div','scrim');scrim.onclick=closeBuild;ov.appendChild(scrim);
 const p=el('div','panel');ov.appendChild(p);
 const cl=el('button','close',SVG.close);cl.setAttribute('aria-label','Закрыть');cl.onclick=closeBuild;p.appendChild(cl);
 const left=el('div','bl');left.innerHTML=`<h2>${kind==='garden'?'Наш сад':'Наш дом'}</h2><span class="sub" id="bSub"></span>`;const pv=el('div','pv');pv.appendChild(el('div','dome'));
 if(kind==='garden'){pvHome=null;const gi=el('img','pvgarden');gi.src=IMG.g_scare;gi.alt='';pv.appendChild(gi)}else{pvHome=makeHome(176);pvHome.style.marginLeft='22px';pv.appendChild(pvHome)}left.appendChild(pv);p.appendChild(left);
 const right=el('div','br');right.innerHTML='<h2>Что построим?</h2>';const list=el('div','parts');list.id='partsList';right.appendChild(list);
 const tip=el('div','tip');const ta=el('div','hud-ava');ta.style.cssText=`position:relative;top:0;left:0;width:26px;height:26px;box-shadow:none;background:${player().tint}`;const ti=el('img');ti.src=IMG[player().id];ta.appendChild(ti);tip.appendChild(ta);tip.appendChild(el('span',null,'Значок на ресурсе — к кому идти'));left.appendChild(tip);
 p.appendChild(right);renderParts();
 const g=kindParts().find(p=>!isBuilt(p)&&reqOk(p)&&canBuild(p))||kindParts().find(p=>!isBuilt(p)&&reqOk(p));say(g?(canBuild(g)?`Можно построить ${g.acc}! Нажми на молоточек.`:hintFor(g)):(kind==='garden'?'Сад готов! Ура!':'Дом построен! Ура!'))}
function closeBuild(){sfx.tap();$('#ov-build').hidden=true;if(!$('#scr-garden').hidden)renderGarden();else refreshMap()}
function renderParts(){
 const list=$('#partsList');if(!list)return;list.innerHTML='';
 const LIST=kindParts();$('#bSub').textContent=`Построено ${LIST.filter(isBuilt).length} из ${LIST.length}`;
 const rank=p=>{const b=isBuilt(p),l=!b&&!reqOk(p);return b?3:l?2:canBuild(p)?0:1};
 for(const p of LIST.slice().sort((a,b)=>rank(a)-rank(b))){
  const built=isBuilt(p),locked=!built&&!reqOk(p),ready=!built&&!locked&&canBuild(p);
  const c=el('div','pc'+(built?' built':locked?' locked':ready?' ready':''));
  c.setAttribute('aria-label',p.name);
  const rc=el('div','rc');rc.innerHTML=`<div class="hd"><div class="ic emo" style="background:${p.tint}">${p.img?`<img src="${IMG[p.img]}" alt="">`:p.ic}</div><span class="nm">${p.name}</span></div><span class="op eq">=</span>`;const need=needOf(p);const used={};let first=true;
  for(const r of p.need){if(!first)rc.appendChild(el('span','op','+'));first=false;used[r]=(used[r]||0)+1;const ok=built||(ST.inv[r]||0)>=used[r];const s=el('div','slot'+(ok?' ok':''));s.appendChild(resImg(r,28));
   if(ok)s.insertAdjacentHTML('beforeend',`<span class="badge">${SVG.okSmall}</span>`);else{const o=NB[RES_OWNER[r]];const w=el('span','who');w.style.background=o.dome[1];const wi=el('img');wi.src=IMG[o.id];w.appendChild(wi);s.appendChild(w)}rc.appendChild(s)}
  const act=el('div','act');
  if(built)act.innerHTML=`<span class="done">${SVG.okSmall.replace('viewBox','width="26" height="26" viewBox')}</span>`;
  else if(locked)act.innerHTML=`<span class="lk">${SVG.lock}</span>`;
  else if(ready)act.innerHTML=`<span class="bld">${SVG.hammer}</span>`;
  rc.appendChild(act);c.appendChild(rc);
  c.onclick=()=>{audio();if(built){say(`${p.name} — уже готово!`);return}
   if(locked){sfx.bad();shake(c);const rq=LIST.find(x=>x.id===p.req);say(`Сначала построй ${rq.acc}!`);return}
   if(ready){buildPart(p);return}
   sfx.tap();shake(c);say(hintFor(p))};
  list.appendChild(c)}}
function buildPart(p){
 for(const r of p.need)ST.inv[r]=Math.max(0,(ST.inv[r]||0)-1);
 (p.kind==='garden'?ST.gbuilt:ST.built).push(p.id);save();sfx.build();buzz([20,40,20]);confetti();
 if(p.kind!=='garden'){if(pvHome)setParts(pvHome,p.id);if(homeEl)setParts(homeEl,p.id)}renderParts();refreshMap();if(!$('#scr-garden').hidden)renderGarden();
 if(p.kind!=='garden'&&ST.built.length===PARTS.length){say('Ура! Дом построен!');setTimeout(()=>{$('#ov-build').hidden=true;showHousewarming('house')},1600)}
 else if(p.kind==='garden'&&ST.gbuilt.length===GPARTS.length){say('Ура! Сад готов!');setTimeout(()=>{$('#ov-build').hidden=true;showHousewarming('garden')},1600)}
 else{const g=goalPart();say(`Ура! Построили ${p.acc}! `+(p.kind==='garden'&&p.id.startsWith('bed')?'Теперь можно сажать семена. ':'')+(g?hintFor(g):''))}}

/* ================= NEIGHBOUR HOUSE ================= */
let curHouse=null;
function openHouse(id){
 hush();curHouse=id;const nb=NB[id];const s=$('#scr-house');s.innerHTML='';show('scr-house');voiceWho=id;
 const orb=el('div','orbit');orb.style.borderColor=nb.dome[1];s.appendChild(orb);
 const dome=el('div','dome');dome.style.background=`linear-gradient(180deg,${nb.dome[0]},${nb.dome[1]} 75%)`;s.appendChild(dome);
 const m=monImg(nb.id,10,'mon tap');m.id='hMon';m.onclick=()=>{hop(m,'dance');say(nb.hello)};s.appendChild(m);
 const back=el('button','rbtn',SVG.back);back.style.cssText='left:var(--side);top:14px';back.setAttribute('aria-label','На карту');back.onclick=()=>{sfx.tap();goMap(false)};s.appendChild(back);
 const bub=el('div','bubble t-left pop');bub.id='hBub';bub.textContent=nb.hello;s.appendChild(bub);
 const info=el('div','info');info.innerHTML=`<span class="lbl">В гостях у соседа</span><span class="name">${nb.name.toUpperCase()}</span><span class="trait">${nb.trait}</span>`;
 const gift=el('div','gift');gift.appendChild(resImg(nb.res,26));gift.insertAdjacentHTML('beforeend',`<span>За игру — ${RES[nb.res].name.toLowerCase()}</span><b>+${REWARD}</b>`);const grow=el('div','giftrow');grow.appendChild(gift);
 const like=LIKES[id];const gc=giftCrop(id);const gb=el('button','treat'+(gc?' on':''));gb.innerHTML=`<span class="emo">${like==='any'?'🧺':CROPS[like].e}</span><span>${gc?'Угостить':(like==='any'?'Любит урожай':'Любит '+CROPS[like].acc)}</span>`;
 gb.onclick=()=>{audio();const k=giftCrop(id);if(!k){sfx.tap();say(like==='any'?`${nb.name} любит урожай из сада. Вырасти что-нибудь и угости!`:`${nb.name} любит ${CROPS[like].acc}. Вырасти в саду и угости!`);return}
  ST.harvest[k]--;ST.inv[nb.res]=(ST.inv[nb.res]||0)+REWARD;save();sfx.win();confetti();hop($('#hMon'),'chomp');setTimeout(()=>hop($('#hMon'),'dance'),600);
  const fl=el('span','treatfly emo',CROPS[k].e);s.appendChild(fl);setTimeout(()=>fl.remove(),900);say(`Ням-ням! Спасибо! ${nb.name} дарит тебе ${RES[nb.res].acc}!`);toast(`+${REWARD} ${RES[nb.res].name.toLowerCase()}`);setTimeout(()=>openHouse(id),1800)};
 grow.appendChild(gb);info.appendChild(grow);s.appendChild(info);
 const games=el('div','games');
 for(const gid of nb.games){const g=GAMES[gid];const lv=ST.levels[gid]||1;const c=el('button','gtile');c.setAttribute('aria-label',g.name);
  c.innerHTML=`<span class="lvs">${[1,2,3,4,5].map(i=>`<i class="${i<=lv?'on':''}"></i>`).join('')}</span><div class="art emo" style="background:${nb.tint}">${g.art}</div><b>${g.name}</b><div class="play"><i>${SVG.play}</i></div>`;
  c.onclick=()=>{audio();sfx.good();startGame(gid)};games.appendChild(c)}
 if(nb.games.length>4)games.classList.add('many');s.appendChild(games);layoutHouse();say(nb.hello);
 if(nb.games.length>4){const g=games;setTimeout(()=>{if(g.isConnected&&g.scrollLeft<5){g.scrollTo({left:90,behavior:'smooth'});setTimeout(()=>{if(g.isConnected)g.scrollTo({left:0,behavior:'smooth'})},900)}},1300)}}
function layoutHouse(){
 const s=$('#scr-house');const cx=Math.max(178,Math.min(W*.22,240));const d=440;
 Object.assign(s.querySelector('.dome').style,{width:d+'px',height:d+'px',left:(cx-d/2-20)+'px',top:(H/2-155)+'px'});
 Object.assign(s.querySelector('.orbit').style,{width:(d+40)+'px',height:(d+40)+'px',left:(cx-d/2-40)+'px',top:(H/2-175)+'px'});
 const m=$('#hMon');const mh=Math.min(266,H-110);const k=RATIO[curHouse];m.style.height=mh+'px';m.style.width=(mh*k)+'px';m.style.left=(cx-mh*k/2)+'px';m.style.top=(H-28-mh)+'px';
 const b=$('#hBub');b.style.left=(cx+mh*k/2-10)+'px';b.style.top=(H/2-118)+'px';b.style.width='124px';
 const x=Math.max(cx+mh*k/2+158,W*.535);const w=Math.min(372,W-x-SIDE);
 Object.assign(s.querySelector('.info').style,{left:x+'px',top:(H/2-168)+'px',width:w+'px'});
 const gs=s.querySelector('.games');Object.assign(gs.style,{left:x+'px',top:(H/2-14)+'px',width:(gs.classList.contains('many')?W-x:w)+'px'})}

/* ================= GAME SHELL ================= */
const board=$('#gBoard'),gHost=$('#gHost');
let GS=null;
function startGame(gid){
 hush();const g=GAMES[gid];const nb=NB[g.host];
 GS={g,gid,nb,step:0,mistakes:0,level:ST.levels[gid]||1,round:0,busy:false,used:new Set(),task:''};
 show('scr-game');voiceWho=g.host;$('#gReward img').src=IMG[nb.res];$('#gReward span').textContent='+'+REWARD;
 $('#gWrap').classList.toggle('full',g.layout==='full');
 gHost.innerHTML='';GS.hostMon=null;
 if(g.layout!=='full'){const hb=el('div','bubble t-down taskb');hb.style.cssText='left:0;right:6px;top:10px';gHost.appendChild(hb);const m=monImg(nb.id,Math.min(196,H-170),'mon tap');m.style.left='50%';m.style.bottom='0';m.style.marginLeft=(-Math.min(196,H-170)*RATIO[nb.id]/2)+'px';m.onclick=()=>{hop(m);say(GS.task)};gHost.appendChild(m);GS.hostMon=m}
 requestAnimationFrame(()=>nextRound(true))}
function renderDots(){const d=$('#gDots');d.innerHTML='';for(let i=0;i<GS.g.rounds;i++){const e=el('i');if(i<GS.step)e.className='on';else if(i===GS.step)e.className='cur';d.appendChild(e)}}
function nextRound(first){if(!GS)return;GS.round++;GS.busy=false;board.innerHTML='';board.onpointerdown=board.onpointermove=board.onpointerup=board.onpointercancel=null;renderDots();GS.g.round(ctx,GS.level,first)}
const ctx={
 get board(){return board},
 bw:()=>board.clientWidth,bh:()=>board.clientHeight,
 say(text,bubbleText){GS.task=text;const b=document.querySelector('#scr-game .taskb');if(b){const t=b.querySelector('.tb-text')||b;t.textContent=bubbleText||text;b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}say(text)},
 later(fn,ms){const g=GS,r=GS.round;setTimeout(()=>{if(GS===g&&GS.round===r)fn()},ms)},
 mon(m){return m||GS.hostMon},
 success(msg,delay=1500,m){if(!GS||GS.busy)return;GS.busy=true;GS.step++;renderDots();sfx.good();buzz(25);if(!GS.g.canvas)uiBurst();hop(this.mon(m),'dance');if(msg!==null)say(msg||pick(PRAISE));
  if(GS.step>=GS.g.rounds)this.later(finishGame,delay+300);else this.later(()=>nextRound(false),delay)},
 mistake(msg,m,elm){if(!GS)return;GS.mistakes++;sfx.bad();buzz([30,50,30]);hop(this.mon(m),'sad');if(elm)shake(elm);if(msg!==null)say(msg||pick(TRY))}};
$('#gBack').addEventListener('click',()=>{sfx.tap();const nb=GS&&GS.nb;GS=null;hush();if(nb)openHouse(nb.id);else goMap(false)});
$('#gSay').addEventListener('click',()=>{audio();if(GS)say(GS.task)});
function finishGame(){
 const g=GS;GS=null;const nb=g.nb;ST.inv[nb.res]=(ST.inv[nb.res]||0)+REWARD;
 const lim=g.g.noMistakes?99:1;let up=0;if(g.level<5&&g.mistakes<=lim){ST.levels[g.gid]=g.level+1;up=g.level+1}const grew=growGarden();save();showReward(nb.res,nb,false,up,grew)}
board.addEventListener('contextmenu',e=>e.preventDefault());

/* ================= REWARD ================= */
let raysSvg='';
function showReward(res,nb,primeOnly,up,grew){
 const ov=$('#ov-reward');ov.innerHTML='';ov.hidden=false;
 if(!raysSvg){let p='';for(let i=0;i<18;i++){const a1=i*20*Math.PI/180,a2=(i*20+10)*Math.PI/180;p+=`<path d="M700 700L${(700+800*Math.cos(a1)).toFixed(0)} ${(700+800*Math.sin(a1)).toFixed(0)}L${(700+800*Math.cos(a2)).toFixed(0)} ${(700+800*Math.sin(a2)).toFixed(0)}Z"/>`}raysSvg=`<svg class="rays" viewBox="0 0 1400 1400" fill="#FFE6B0" fill-opacity=".6">${p}</svg>`}
 if(primeOnly)return;ov.insertAdjacentHTML('beforeend',raysSvg);ov.appendChild(el('div','glow'));
 const big=el('img','big');big.src=IMG[res];big.alt='';ov.appendChild(big);
 const tl=el('div','tl',`Ура! ${RES[res].name}!`);tl.style.top=(H*.42+60)+'px';ov.appendChild(tl);
 const sb=el('div','sb',`${nb.name} дарит тебе ${RES[res].acc}: ${REWARD} шт.`);sb.style.top=(H*.42+106)+'px';ov.appendChild(sb);
 const nm=monImg(nb.id,Math.min(236,H-150));nm.style.left=(SIDE+20)+'px';nm.style.bottom='-4px';ov.appendChild(nm);
 const pl=player();const pm=monImg(pl.id,Math.min(196,H-190));pm.style.right=(SIDE+20)+'px';pm.style.bottom='-4px';ov.appendChild(pm);
 setTimeout(()=>{hop(nm,'dance');hop(pm,'dance')},300);
 const b=el('button','cta',`${SVG.backpack}В рюкзак`);b.style.top=(H*.42+136)+'px';ov.appendChild(b);
 if(up){const lb=el('div','lvup',`<span class="emo">⭐</span>Новый уровень: ${up}!`);ov.appendChild(lb)}
 const bp=el('div','backpack');bp.style.position='absolute';ov.appendChild(bp);
 for(const k of RES_KEYS){const n=Math.max(0,ST.inv[k]-(k===res?REWARD:0));const it=el('div','bpi'+(n?'':' zero'));it.id='rbp-'+k;it.appendChild(resImg(k,30));it.appendChild(el('span',null,String(n)));bp.appendChild(it)}
 sfx.win();confetti();voiceWho='narrator';say(`Ура! ${nb.name} дарит тебе ${RES[res].acc}!`+(up?' Новый уровень!':'')+(grew?' А в саду подросли растения!':''));
 b.onclick=()=>{audio();b.disabled=true;sfx.pop();const tgt=$('#rbp-'+res);const tr=tgt.getBoundingClientRect(),br=big.getBoundingClientRect();const fl=el('img','fly');fl.src=IMG[res];
  const sr=stage.getBoundingClientRect();const fx=(br.left-sr.left)/K+(br.width/K-60)/2,fy=(br.top-sr.top)/K+(br.height/K-60)/2;fl.style.left=fx+'px';fl.style.top=fy+'px';ov.appendChild(fl);big.style.opacity=0;
  requestAnimationFrame(()=>{fl.style.left=((tr.left-sr.left)/K-15)+'px';fl.style.top=((tr.top-sr.top)/K-15)+'px';fl.style.width='30px';fl.style.height='30px'});
  setTimeout(()=>{tgt.classList.remove('zero');tgt.querySelector('span').textContent=ST.inv[res];tgt.classList.add('bpi','bump');sfx.good()},820);
  setTimeout(()=>{ov.hidden=true;goMap(false,res)},1500)}}

function showHousewarming(kind='house'){
 const ov=$('#ov-reward');ov.innerHTML='';ov.hidden=false;
 if(!raysSvg)showReward('sand',NB.shusha,true);
 ov.innerHTML='';ov.insertAdjacentHTML('beforeend',raysSvg);ov.appendChild(el('div','glow'));
 const hw=Math.min(250,H*.6);let h;if(kind==='garden'){h=el('img','hw-home');h.src=IMG.g_apple;h.alt='';h.style.width=(hw*.62)+'px';h.style.left=(W/2-hw*.31)+'px';h.style.top=(H*.08+hw/RATIO.h_ours-hw*.62/RATIO.g_apple)+'px'}else{h=makeHome(hw);h.classList.add('hw-home');h.style.left=(W/2-hw/2-14)+'px';h.style.top=(H*.08)+'px'}ov.appendChild(h);
 const tl=el('div','tl',kind==='garden'?'Сад готов!':'Новоселье!');tl.style.top=(H*.08+hw/RATIO.h_ours+4)+'px';ov.appendChild(tl);
 const sb=el('div','sb',kind==='garden'?'Все друзья пришли в наш сад!':'Дом построен! Все друзья пришли в гости');sb.style.top=(H*.08+hw/RATIO.h_ours+50)+'px';ov.appendChild(sb);
 const row=[['nyam',SIDE+6],['shusha',SIDE+110]],row2=[['poch',W-SIDE-200],['drak',W-SIDE-96]];
 const ms=[];for(const [id,x] of [...row,...row2]){const mh=Math.min(150,H*.38);const m=monImg(id,mh);m.style.left=x+'px';m.style.bottom='-4px';ov.appendChild(m);ms.push(m)}
 const pl=player();const pm=monImg(pl.id,Math.min(130,H*.33));pm.style.left=(W/2+hw*.32)+'px';pm.style.top=(H*.08+hw/RATIO.h_ours-Math.min(130,H*.33)+6)+'px';ov.appendChild(pm);ms.push(pm);
 const b=el('button','cta','Ура!');b.style.top=(H*.08+hw/RATIO.h_ours+82)+'px';ov.appendChild(b);
 sfx.win();confetti();setTimeout(confetti,1400);ms.forEach((m,i)=>setTimeout(()=>hop(m,'dance'),200+i*150));
 voiceWho='narrator';say(kind==='garden'?'Ура! Сад готов! Все друзья пришли в наш сад. Ты настоящий садовник!':'Новоселье! Дом построен! Все друзья пришли в гости. Ты настоящий строитель!'+(kind==='house'?' А ещё у нас есть сад!':''));
 b.onclick=()=>{sfx.good();ov.hidden=true;goMap(false)}}

/* ================= PARENTS ================= */
function openParents(){
 const ov=$('#ov-parents');ov.innerHTML='';ov.hidden=false;const scrim=el('div','scrim');scrim.onclick=()=>{ov.hidden=true};ov.appendChild(scrim);
 const p=el('div','ppanel');p.innerHTML=`<h2>Для родителей</h2>
  <label class="prow"><span>Звуки</span><input type="checkbox" class="sw" id="pSound"></label>
  <label class="prow"><span>Голос монстриков</span><input type="checkbox" class="sw" id="pVoice"></label>
  <div class="pnote" id="pVoiceNote"></div>
  <div class="pnote">Дом: ${ST.built.length} из ${PARTS.length}. Сад: ${ST.gbuilt.length} из ${GPARTS.length}. Ресурсы: песок ${ST.inv.sand}, вода ${ST.inv.water}, доски ${ST.inv.wood}, огонь ${ST.inv.fire}.</div>
  <div class="pnote">Уровни игр (из 5): ${Object.values(NB).flatMap(n=>n.games).map(g=>GAMES[g].name+' — '+(ST.levels[g]||1)).join(', ')}.</div>
  <div class="pbtns"><button class="pbtn" id="pChange">Сменить монстрика</button><button class="pbtn" id="pGive">+2 каждого ресурса (тест)</button><button class="pbtn" id="pGrow">Вырастить сад (тест)</button><button class="pbtn warn" id="pReset">Начать заново</button></div>
  <div class="pbtns" id="pConfirm" hidden><span class="pnote" style="align-self:center">Стереть дом, ресурсы и уровни?</span><button class="pbtn warn" id="pYes">Стереть</button><button class="pbtn" id="pNo">Отмена</button></div>
  <div class="pnote">Игра работает в горизонтальном положении. Чтобы поставить на телефон иконкой, откройте ссылку в браузере: Android — меню ⋮ → «Добавить на главный экран», iPhone — «Поделиться» → «На экран Домой».</div>
  <div class="pnote" id="pVer"></div>
  <div class="pbtns"><button class="pbtn" id="pUpdate">Обновить игру</button><button class="pbtn" id="pClose">Закрыть</button></div>`;
 ov.appendChild(p);
 const s=$('#pSound'),v=$('#pVoice');s.checked=ST.sound;v.checked=ST.voice;
 s.onchange=()=>{ST.sound=s.checked;save()};v.onchange=()=>{ST.voice=v.checked;save();if(!v.checked)hush()};
 $('#pVoiceNote').textContent=VP.narrator?'Голос записан прямо в игру и работает без интернета. Если звука нет — проверьте громкость и беззвучный режим.':'';
 $('#pChange').onclick=()=>{ov.hidden=true;openChoose()};
 $('#pGrow').onclick=()=>{for(let i=0;i<3;i++){const b=bedOf(i);if(b.crop){b.stage=4;b.watered=false}}if(ST.gbuilt.includes('apple'))ST.apples=3;save();refreshMap();toast('Сад вырос');ov.hidden=true;if(!$('#scr-garden').hidden)renderGarden()};
 $('#pGive').onclick=()=>{RES_KEYS.forEach(k=>ST.inv[k]+=2);save();refreshMap();toast('Добавлено по 2 каждого ресурса');ov.hidden=true};
 $('#pReset').onclick=()=>{$('#pConfirm').hidden=false};$('#pNo').onclick=()=>{$('#pConfirm').hidden=true};
 $('#pYes').onclick=()=>{const keepSound=ST.sound,keepVoice=ST.voice;ST=S0();ST.sound=keepSound;ST.voice=keepVoice;save();ov.hidden=true;openChoose()};
 (async()=>{try{const ks=(await caches.keys()).filter(k=>k.startsWith('igralochka-'));$('#pVer').textContent=ks.length?'Версия: '+ks[0].replace('igralochka-',''):''}catch(e){}})();
 $('#pUpdate').onclick=async()=>{toast('Обновляю игру…');try{if(navigator.serviceWorker)for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k)}catch(e){}setTimeout(()=>location.reload(),300)};
 $('#pClose').onclick=()=>{ov.hidden=true}}

/* ================= boot ================= */
$('#rotImg').src=IMG.poch;
const SILENT='data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAAEgAACA8AIyMjIyMwMDAwMDA9PT09PUpKSkpKSldXV1dXZGRkZGRkcXFxcXF+fn5+fn6Li4uLi5iYmJiYmKWlpaWlpbKysrKyv7+/v7+/zMzMzMzZ2dnZ2dnm5ubm5vLy8vLy8v//////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQDzAAAAAAAAAgPPhJtKQAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEpAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsSjAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEpAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsSjAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';let silEl=null,unlocked=false;
function unlock(){const a=audio();if(!a||unlocked)return;unlocked=true;
 try{const b=a.createBuffer(1,1,22050),s=a.createBufferSource();s.buffer=b;s.connect(a.destination);s.start(0)}catch(e){}
 // iOS < 17: a playing media element lets Web Audio sound even with the silent switch on
 if(!navigator.audioSession&&/iP(hone|ad|od)|Macintosh/.test(navigator.userAgent)&&'ontouchend' in document){try{silEl=new Audio(SILENT);silEl.loop=true;silEl.setAttribute('playsinline','');silEl.setAttribute('x-webkit-airplay','deny');silEl.play().catch(()=>{})}catch(e){}}}
['pointerdown','touchend','click'].forEach(ev=>document.addEventListener(ev,()=>{unlock();audio()},{capture:true,passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden){hush();if(silEl)silEl.pause()}else{if(silEl)silEl.play().catch(()=>{});if(ac&&ac.state==='suspended')ac.resume().catch(()=>{})}});
fit();
loadPacks();const stEl=$('#start');$('#stImg').src=IMG[ST.player||'bulbik'];
function begin(){if(!stEl.isConnected)return;unlock();stEl.remove();
 if(ST.player)goMap(true);else{openChoose();setTimeout(()=>say('Привет! Выбери себе монстрика и нажми большую кнопку!'),300)}
 requestAnimationFrame(fit)}
stEl.addEventListener('click',begin);
requestAnimationFrame(fit);
window.__igr={VST,begin,vMiss,vPlan,vsplit,vnorm,VP,loadPacks,openGarden,growGarden,GS:()=>GS,ST:()=>ST,startGame,openHouse,goMap,openBuild,showReward,showHousewarming,GAMES};
})();
