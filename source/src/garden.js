/* ================= GARDEN ================= */
const CROPS={
 carrot:{e:'🥕',n:'морковка',acc:'морковку',k:3},strawberry:{e:'🍓',n:'клубника',acc:'клубнику',k:3},pepper:{e:'🌶️',n:'перчик',acc:'перчик',k:3},
 tomato:{e:'🍅',n:'помидор',acc:'помидоры',k:3},cucumber:{e:'🥒',n:'огурец',acc:'огурцы',k:3},pumpkin:{e:'🎃',n:'тыква',acc:'тыкву',k:1},
 sunflower:{e:'🌻',n:'подсолнух',acc:'подсолнух',k:1},watermelon:{e:'🍉',n:'арбуз',acc:'арбуз',k:1},apple:{e:'🍎',n:'яблоко',acc:'яблоки',k:0}};
const SEED_ORDER=['carrot','strawberry','pepper','tomato','cucumber','pumpkin','sunflower','watermelon'];
const LIKES={nyam:'any',shusha:'strawberry',poch:'carrot',drak:'pepper'};
const GPARTS=[
 {id:'bed1',kind:'garden',name:'Грядка',acc:'грядку',img:'g_bed',tint:'#F3E3CF',need:['wood','sand']},
 {id:'apple',kind:'garden',name:'Яблонька',acc:'яблоньку',img:'g_apple',tint:'#E3F4D8',need:['water','sand']},
 {id:'bed2',kind:'garden',name:'Грядка',acc:'вторую грядку',img:'g_bed',tint:'#F3E3CF',need:['wood','sand'],req:'bed1'},
 {id:'bench',kind:'garden',name:'Скамейка',acc:'скамейку',img:'g_bench',tint:'#FFE7D6',need:['wood','wood']},
 {id:'scare',kind:'garden',name:'Пугало',acc:'пугало',img:'g_scare',tint:'#FFF0C9',need:['wood','sand']},
 {id:'bed3',kind:'garden',name:'Грядка',acc:'третью грядку',img:'g_bed',tint:'#F3E3CF',need:['wood','sand'],req:'bed2'},
 {id:'bird',kind:'garden',name:'Скворечник',acc:'скворечник',img:'g_bird',tint:'#FFE3DD',need:['wood','fire']},
 {id:'pond',kind:'garden',name:'Прудик',acc:'прудик',img:'g_pond',tint:'#DDF1FF',need:['water','water']},
 {id:'green',kind:'garden',name:'Теплица',acc:'теплицу',img:'g_green',tint:'#E8F6F0',need:['sand','fire']}];
// position in background pixels (1792x768): [centre x, bottom y, height]
const GPOS={bird:[170,470,270],apple:[372,486,320],bed1:[650,468],bed2:[905,468],bed3:[1160,468],scare:[1398,452,230],green:[1612,470,250],bench:[332,748,140],pond:[1600,762,150]};
const BED_W=236,GBG_W=1792,GBG_H=768;
const GROW_MS=90000;
const STAGE_TXT=['посадили','росток','кустик','цветёт','урожай!'];
const gBuilt=id=>ST.gbuilt.includes(id);
function bedOf(i){return ST.beds[i]||(ST.beds[i]={crop:null,stage:0,watered:false,t:0})}
function growMs(){return gBuilt('green')?GROW_MS/2:GROW_MS}
function growBed(b){if(b.crop&&b.watered&&b.stage<4){b.stage++;b.watered=false;return true}return false}
function tickGarden(){let ch=false;const now=Date.now();for(let i=0;i<3;i++){const b=bedOf(i);if(b.crop&&b.watered&&b.stage<4&&now-b.t>=growMs())ch=growBed(b)||ch}if(ch)save();return ch}
function growGarden(){let ch=false;for(let i=0;i<3;i++)ch=growBed(bedOf(i))||ch;if(gBuilt('apple')&&ST.apples<3){ST.apples++;ch=true}if(ch)save();return ch}
function gardenAlert(){for(let i=0;i<3;i++){if(!gBuilt('bed'+(i+1)))continue;const b=bedOf(i);if(b.crop&&b.stage>=4)return '🧺';}for(let i=0;i<3;i++){if(!gBuilt('bed'+(i+1)))continue;const b=bedOf(i);if(b.crop&&!b.watered&&b.stage<4)return '💧'}return gBuilt('apple')&&ST.apples>0?'🍎':''}

let gS=1,gX=0,gY=0,gTick=0,seedPop=null;
const gp=(x,y)=>[gX+x*gS,gY+y*gS];
function openGarden(){
 hush();const s=$('#scr-garden');s.innerHTML='';show('scr-garden');tickGarden();
 s.appendChild(el('div','gsky'));const bg=el('img','gbg');bg.src=IMG.g_bg;bg.alt='';s.appendChild(bg);
 const layer=el('div','glayer');layer.id='gLayer';s.appendChild(layer);
 const back=el('button','rbtn',SVG.back);back.style.cssText='left:var(--side);top:14px';back.setAttribute('aria-label','На карту');back.onclick=()=>{sfx.tap();clearInterval(gTick);goMap(false)};s.appendChild(back);
 const title=el('div','gtitle');title.id='gTitle';s.appendChild(title);
 const bp=el('div','backpack');bp.id='gBackpack';s.appendChild(bp);
 const hv=el('div','harvest');hv.id='gHarvest';s.appendChild(hv);
 const hb=el('button','rbtn gbuild');hb.innerHTML=SVG.hammer;hb.setAttribute('aria-label','Строить в саду');hb.onclick=()=>{sfx.tap();openBuild('garden')};s.appendChild(hb);
 layoutGarden();renderGarden();clearInterval(gTick);gTick=setInterval(()=>{if($('#scr-garden').hidden){clearInterval(gTick);return}if(tickGarden()){sfx.pop();renderGarden();say('Растение подросло!')}},3000);
 const g=goalPart();const firstVisit=!ST.gardenSeen;ST.gardenSeen=1;save();
 say(firstVisit?'Это наш сад! Построй грядки, посади семена и поливай. Растения растут, пока ты играешь с друзьями.':gardenSpeech())}
function gardenSpeech(){const a=gardenAlert();if(a==='🧺')return 'Урожай созрел! Собирай!';if(a==='💧')return 'Растения хотят пить. Полей их!';if(!gBuilt('bed1'))return 'Построй грядку, чтобы сажать семена!';
 for(let i=0;i<3;i++)if(gBuilt('bed'+(i+1))&&!bedOf(i).crop)return 'Грядка пустая. Посади что-нибудь!';return 'Растения растут. Поиграй с друзьями, и они подрастут!'}
function layoutGarden(){const s=$('#scr-garden');if(!s||s.hidden)return;gS=W/H<GBG_W/GBG_H?W/GBG_W:H/GBG_H;gX=(W-GBG_W*gS)/2;gY=H-GBG_H*gS;
 const bg=s.querySelector('.gbg');Object.assign(bg.style,{left:gX+'px',top:gY+'px',width:GBG_W*gS+'px',height:GBG_H*gS+'px'});
 const t=$('#gTitle');t.style.left=(SIDE+56)+'px';const hb=s.querySelector('.gbuild');hb.style.right=SIDE+'px';hb.style.top='14px';$('#gHarvest').style.right=(SIDE+56)+'px'}
function renderGarden(){
 const layer=$('#gLayer');if(!layer)return;layer.innerHTML='';closeSeeds();
 $('#gTitle').innerHTML=`<b>Наш сад</b><span>${ST.gbuilt.length}/${GPARTS.length}</span>`;
 const bp=$('#gBackpack');bp.innerHTML='';for(const k of RES_KEYS){const n=ST.inv[k]||0;const it=el('div','bpi'+(n?'':' zero'));it.appendChild(resImg(k,28));it.appendChild(el('span',null,String(n)));bp.appendChild(it)}
 const hv=$('#gHarvest');hv.innerHTML='<span class="emo">🧺</span>';const keys=Object.keys(ST.harvest).filter(k=>ST.harvest[k]>0);
 if(!keys.length)hv.insertAdjacentHTML('beforeend','<i>пусто</i>');else keys.slice(0,4).forEach(k=>hv.insertAdjacentHTML('beforeend',`<span class="hv" id="hv-${k}"><span class="emo">${CROPS[k].e}</span>${ST.harvest[k]}</span>`));
 const order=['bird','apple','scare','green','bed1','bed2','bed3','bench','pond'];
 for(const id of order){const p=GPARTS.find(x=>x.id===id);const pos=GPOS[id];const isBed=id.startsWith('bed');
  const w=isBed?BED_W:pos[2]*RATIO[p.img],h=isBed?BED_W/RATIO.g_bed:pos[2];const [x,y]=gp(pos[0]-w/2,pos[1]-h);
  const o=el('button','gobj'+(gBuilt(id)?'':' ghost')+(isBed?' gbedwrap':''));o.dataset.id=id;Object.assign(o.style,{left:x+'px',top:y+'px',width:w*gS+'px',height:h*gS+'px'});o.setAttribute('aria-label',p.name);
  const im=el('img');im.src=IMG[p.img];im.alt='';o.appendChild(im);
  if(!gBuilt(id)){const locked=p.req&&!gBuilt(p.req);o.insertAdjacentHTML('beforeend',`<span class="gbadge ${locked?'lock':canBuild(p)?'ham':'need'}">${locked?SVG.lock:canBuild(p)?SVG.hammer:'+'}</span>`)}
  else if(isBed)renderPlant(o,+id.slice(3)-1,w*gS,h*gS);
  else if(id==='apple'&&ST.apples>0)o.insertAdjacentHTML('beforeend',`<span class="gbadge apples"><span class="emo">🍎</span>${ST.apples}</span>`);
  o.onclick=e=>{e.stopPropagation();audio();onGardenTap(id,o)};layer.appendChild(o)}
 const pl=player();const ph=250*gS,pw=ph*RATIO[pl.id];const [px,py]=gp(905,748);const pm=monImg(pl.id,ph,'mon tap gplayer');pm.style.left=(px-pw/2)+'px';pm.style.top=(py-ph)+'px';pm.onclick=e=>{e.stopPropagation();hop(pm);say(gardenSpeech())};layer.appendChild(pm);
 layer.onclick=()=>closeSeeds()}
function plantHTML(b){const c=CROPS[b.crop];
 if(b.stage===0)return '<span class="mound"><i></i><i></i><i></i></span>';
 if(b.stage===1)return '<span class="emo st1">🌱</span>';
 if(b.stage===2)return '<span class="emo st2">🌿</span>';
 if(b.stage===3)return '<span class="emo st2">🌿</span><span class="emo fl f1">🌼</span><span class="emo fl f2">🌼</span>';
 return c.k>1?`<span class="emo st2 leaf">🌿</span><span class="emo crop c1">${c.e}</span><span class="emo crop c2">${c.e}</span><span class="emo crop c3">${c.e}</span>`:`<span class="emo st2 leaf">🌿</span><span class="emo crop big">${c.e}</span>`}
function renderPlant(o,i,w,h){const b=bedOf(i);const pl=el('div','plant');o.appendChild(pl);
 if(!b.crop){o.insertAdjacentHTML('beforeend','<span class="gbadge sow">+</span>');return}
 pl.innerHTML=plantHTML(b);pl.style.fontSize=Math.max(26,w*.3)+'px';
 if(b.stage>=4){o.classList.add('ripe');o.insertAdjacentHTML('beforeend','<span class="gbadge ripe"><span class="emo">🧺</span></span>')}
 else if(!b.watered)o.insertAdjacentHTML('beforeend','<span class="gbadge water"><span class="emo">💧</span></span>');
 else{const left=Math.max(0,growMs()-(Date.now()-b.t));o.insertAdjacentHTML('beforeend',`<span class="gbadge wait"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="#fff"/><circle cx="18" cy="18" r="12" fill="none" stroke="#EADFCF" stroke-width="5"/><circle cx="18" cy="18" r="12" fill="none" stroke="#5BC46E" stroke-width="5" stroke-dasharray="75.4" stroke-dashoffset="${(left/growMs()*75.4).toFixed(1)}" transform="rotate(-90 18 18)"/></svg></span>`)}}
function onGardenTap(id,o){
 const p=GPARTS.find(x=>x.id===id);
 if(!gBuilt(id)){sfx.tap();if(p.req&&!gBuilt(p.req)){shake(o);say(`Сначала построй ${GPARTS.find(x=>x.id===p.req).acc}!`);return}openBuild('garden');return}
 if(id.startsWith('bed')){bedTap(+id.slice(3)-1,o);return}
 const m=o;hop(m.querySelector('img'));
 if(id==='apple'){if(ST.apples>0){const n=ST.apples;ST.apples=0;ST.harvest.apple=(ST.harvest.apple||0)+n;save();sfx.good();for(let k=0;k<n;k++)setTimeout(()=>flyCrop('🍎',o),k*150);say(`Собрали яблоки: ${n}! Ням их очень любит.`);setTimeout(renderGarden,900)}else say('Яблочки ещё растут. Поиграй с друзьями, и появятся новые!');return}
 if(id==='bench'){sfx.tap();say('Посидим, отдохнём!');return}
 if(id==='scare'){sfx.whoosh();say('Кыш, вороны! Не трогайте наш урожай!');popEmoji(o,'🐦',true);return}
 if(id==='bird'){tone(1500,0,.08,'sine',.08);tone(1900,.1,.08,'sine',.08);tone(1500,.2,.1,'sine',.08);say('Чик-чирик! Тут живёт скворец.');popEmoji(o,'🐦');return}
 if(id==='pond'){tone(320,0,.12,'square',.05);tone(300,.16,.12,'square',.05);say('Кря-кря! Уточка плавает в прудике.');popEmoji(o,'💦');return}
 if(id==='green'){say('В теплице тепло. Растения на грядках растут в два раза быстрее!');return}}
function popEmoji(o,e,flyAway){const s=el('span','gpop emo',e);o.appendChild(s);if(flyAway)s.classList.add('away');setTimeout(()=>s.remove(),1400)}
function bedTap(i,o){const b=bedOf(i);
 if(!b.crop){openSeeds(i,o);return}
 if(b.stage>=4){harvestBed(i,o);return}
 if(!b.watered){b.watered=true;b.t=Date.now();save();waterAnim(o);sfx.pop();say(b.stage===0?'Полили семечко! Теперь оно будет расти.':`Полили! ${cap(CROPS[b.crop].n)} растёт.`);setTimeout(renderGarden,1300);return}
 sfx.tap();say(`Это ${CROPS[b.crop].n}, сейчас тут ${STAGE_TXT[b.stage]}. Поиграй с друзьями — и растение подрастёт!`)}
function waterAnim(o){const can=el('img','gcan');can.src=IMG.g_can;can.alt='';o.appendChild(can);const dr=el('div','gdrops');dr.innerHTML='<i></i><i></i><i></i><i></i><i></i>';o.appendChild(dr);setTimeout(()=>{can.remove();dr.remove()},1300)}
function openSeeds(i,o){closeSeeds();const pop=el('div','seedpick');seedPop=pop;
 SEED_ORDER.forEach(k=>{const open=ST.seeds.includes(k);const b=el('button','seed'+(open?'':' locked'));b.innerHTML=open?`<span class="emo">${CROPS[k].e}</span>`:SVG.lock;b.setAttribute('aria-label',CROPS[k].n);
  b.onclick=e=>{e.stopPropagation();audio();if(!open){sfx.bad();say('Эти семена откроются, когда соберёшь новый урожай!');return}const bd=bedOf(i);bd.crop=k;bd.stage=0;bd.watered=false;bd.t=0;save();sfx.pop();closeSeeds();say(`Посадили ${CROPS[k].acc}! Теперь полей грядку.`);renderGarden()};pop.appendChild(b)});
 const r=o.getBoundingClientRect(),sr=$('#scr-garden').getBoundingClientRect();const cx=(r.left-sr.left+r.width/2)/K;pop.style.left=Math.max(SIDE,Math.min(W-SIDE-330,cx-165))+'px';pop.style.top=Math.max(64,(r.top-sr.top)/K-64)+'px';
 $('#scr-garden').appendChild(pop);say('Что посадим?')}
function closeSeeds(){if(seedPop){seedPop.remove();seedPop=null}}
function harvestBed(i,o){const b=bedOf(i);const c=CROPS[b.crop];const k=b.crop;const n=c.k;ST.harvest[k]=(ST.harvest[k]||0)+n;
 const first=!ST.harvested.includes(k);if(first)ST.harvested.push(k);let unlocked=null;
 if(first){const nx=SEED_ORDER.find(s=>!ST.seeds.includes(s));if(nx){ST.seeds.push(nx);unlocked=nx}}
 b.crop=null;b.stage=0;b.watered=false;b.t=0;save();sfx.win();confetti();for(let j=0;j<n;j++)setTimeout(()=>flyCrop(c.e,o),j*160);
 say(`Урожай! ${cap(c.acc)} в корзинку!`+(unlocked?` Новые семена: ${CROPS[unlocked].n}!`:''));setTimeout(renderGarden,1000);checkGardenDone()}
function flyCrop(e,o){const s=$('#scr-garden');const r=o.getBoundingClientRect(),sr=s.getBoundingClientRect(),t=$('#gHarvest').getBoundingClientRect();const f=el('span','flycrop emo',e);
 f.style.left=((r.left-sr.left+r.width/2)/K-18)+'px';f.style.top=((r.top-sr.top+r.height*.3)/K-18)+'px';s.appendChild(f);
 requestAnimationFrame(()=>{f.style.left=((t.left-sr.left)/K+8)+'px';f.style.top=((t.top-sr.top)/K+4)+'px';f.style.transform='scale(.6)'});setTimeout(()=>f.remove(),800)}
function checkGardenDone(){}
// gifts at a neighbour's house
function giftCrop(nbId){const like=LIKES[nbId];if(like==='any'){const ks=Object.keys(ST.harvest).filter(k=>ST.harvest[k]>0).sort((a,b)=>ST.harvest[b]-ST.harvest[a]);return ks[0]||null}return ST.harvest[like]>0?like:null}
