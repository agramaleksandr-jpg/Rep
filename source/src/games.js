/* ================= GAMES (5 levels each) ================= */
const GAMES={};
const LV=(lv,arr)=>arr[Math.min(arr.length,Math.max(1,lv))-1];
function crPath(pts){let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=`C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`}return d}
function taskBubble(text,x,y,w,tail='t-right'){const b=el('div','bubble taskb '+tail+' pop');b.appendChild(el('span','tb-text',text));b.style.left=x+'px';b.style.top=y+'px';if(w)b.style.width=w+'px';board.appendChild(b);return b}
function nightLayer(){const n=el('div','night');n.innerHTML='<i style="left:12%;top:14%"></i><i style="left:46%;top:8%"></i><i style="left:78%;top:18%"></i><i style="left:30%;top:30%"></i><i style="left:64%;top:36%"></i>';board.appendChild(n);return(x,y,r=74)=>{n.style.background=`radial-gradient(circle at ${x}px ${y}px,rgba(24,16,58,0) 0,rgba(24,16,58,0) ${r}px,rgba(24,16,58,.9) ${r*1.7}px)`}}

/* --- 1. Feed Nyam: L4 night with a light, L5 loop path --- */
GAMES.feed={host:'nyam',name:'Покорми Няма',sub:'Проведи ложку по дорожке',art:'🥄',rounds:3,layout:'full',noMistakes:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const nh=Math.min(bh-24,214),nw=nh*RATIO.nyam,nx=bw-14-nw,ny=bh-8-nh;
  const tol=LV(lv,[42,36,31,31,29]);const x1=nx-10;const mx=nx+nw*.42,my=ny+nh*.45;let pts=[[48,bh-48]];
  if(lv===5){const cx=Math.min(bw*.4,nx-130),cy=bh*.47,r=Math.min(84,bh*.3);pts.push([cx-r*.9,bh-40]);for(let k=0;k<=8;k++){const a=Math.PI/2-k*Math.PI/4;pts.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r])}pts.push([cx+r*1.2,bh-50])}
  else{const n=LV(lv,[3,4,5,5]);for(let i=1;i<n;i++){const x=48+(x1-48)*i/n;const y=i%2?52+Math.random()*44:bh-52-Math.random()*44;pts.push([x,y])}}
  pts.push([nx+nw*.18,my]);const d=crPath(pts);
  board.insertAdjacentHTML('beforeend',`<svg class="track-svg" width="${bw}" height="${bh}" viewBox="0 0 ${bw} ${bh}" fill="none" stroke-linecap="round"><path d="${d}" stroke="#F9DCCB" stroke-width="${tol*2+12}"/><path d="${d}" stroke="#FFF3EA" stroke-width="${tol*2}"/><path d="${d}" stroke="#F4B79A" stroke-width="4" stroke-dasharray="0.5 12"/><path class="trail" d="${d}" stroke="#FF8A5C" stroke-width="12" opacity=".85"/></svg>`);
  const st=el('div');st.style.cssText=`position:absolute;left:${pts[0][0]-11}px;top:${pts[0][1]-11}px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 5px #FF8A5C`;board.appendChild(st);
  const trail=board.querySelector('.trail');const L=trail.getTotalLength();trail.style.strokeDasharray=L;trail.style.strokeDashoffset=L;
  const STEP=4,N=Math.ceil(L/STEP)+1,S=[];for(let i=0;i<N;i++){const p=trail.getPointAtLength(Math.min(i*STEP,L));S.push([p.x,p.y])}
  const cnt=LV(lv,[2,2,3,3,3]),fr=cnt===2?[.38,.72]:[.3,.56,.8];const emo=sample(['🍓','🍌','🍎','🍐','🍇','🍒','🍑','🥝'],cnt);
  const fruits=fr.map((f,i)=>{const idx=Math.round(f*(N-1));const e=el('div','fruit emo',emo[i]);e.style.left=S[idx][0]+'px';e.style.top=S[idx][1]+'px';board.appendChild(e);return{idx,e,got:false}});
  const light=lv===4?nightLayer():null;
  const col=el('div','collect');board.appendChild(col);fruits.forEach((f,i)=>{f.slot=el('i',null,`<span class="emo">${emo[i]}</span>`);col.appendChild(f.slot)});
  const ny_=monImg('nyam',nh);ny_.style.left=nx+'px';ny_.style.top=ny+'px';ny_.style.zIndex=4;board.appendChild(ny_);
  const sp=el('div','spoon');sp.innerHTML='<div class="g"></div><span class="s emo">🥄</span><span class="f emo"></span>';board.appendChild(sp);
  let fing=null;if(GS.round===1&&lv<=2){fing=el('div','finger emo','👆');fing.style.left=(pts[0][0]+14)+'px';fing.style.top=(pts[0][1]+6)+'px';board.appendChild(fing)}
  const msg=lv===4?'Темно! Неси ложку ко мне, фонарик поможет!':lv===5?'Дорожка с петлёй! Неси ложку ко мне!':'Неси ложку ко мне!';
  taskBubble(msg,Math.max(170,nx-196),12,170);
  c.say(lv===4?'Наступила ночь! Проведи ложку по тёмной дорожке к Няму.':lv===5?'Дорожка закручивается петлёй! Проведи ложку к Няму.':'Проведи ложку по дорожке к Няму!',msg);
  let cur=0,dragging=false,done=false;
  const upd=()=>{sp.style.left=S[cur][0]+'px';sp.style.top=S[cur][1]+'px';trail.style.strokeDashoffset=Math.max(0,L-cur*STEP);if(light)light(S[cur][0],S[cur][1]);
   for(const f of fruits)if(!f.got&&cur>=f.idx){f.got=true;sfx.pop();sp.querySelector('.f').textContent=f.e.textContent;f.e.style.left='31px';f.e.style.top='31px';f.e.style.transform='scale(.4)';f.e.style.opacity='0';setTimeout(()=>f.slot.classList.add('got'),500)}
   if(!done&&cur>=N-3){done=true;dragging=false;sp.style.transition='left .5s,top .5s';sp.style.left=mx+'px';sp.style.top=my+'px';if(light)setTimeout(()=>light(mx,my,600),100);setTimeout(()=>{sp.style.opacity=0;hop(ny_,'chomp')},450);c.success('Ням-ням! Вкусно! Спасибо!',2000,ny_)}};
  upd();GS.dbg=()=>S;
  board.onpointerdown=e=>{if(done)return;audio();dragging=true;if(fing){fing.remove();fing=null}try{board.setPointerCapture(e.pointerId)}catch(_){}move(e)};
  board.onpointermove=e=>{if(dragging)move(e)};board.onpointerup=board.onpointercancel=()=>{dragging=false};
  function move(e){const p=toLocal(e,board);let best=-1,bd=1e9;const lo=Math.max(0,cur-4),hi=Math.min(N-1,cur+26);for(let i=lo;i<=hi;i++){const dx=S[i][0]-p.x,dy=S[i][1]-p.y,dd=dx*dx+dy*dy;if(dd<bd){bd=dd;best=i}}
   if(Math.sqrt(bd)<=tol*1.6&&best>cur){if(best-cur>3)sfx.step();cur=best;upd()}}
 }};

/* --- 2. Count: L4 pick the number, L5 add up --- */
const FOODS=[{e:'🍓',f:['клубничку','клубнички','клубничек'],g:'f'},{e:'🍎',f:['яблоко','яблока','яблок'],g:'n'},{e:'🍌',f:['банан','банана','бананов'],g:'m'},{e:'🥕',f:['морковку','морковки','морковок'],g:'f'},{e:'🍪',f:['печенье','печенья','печений'],g:'n'},{e:'🍒',f:['вишенку','вишенки','вишенок'],g:'f'},{e:'🍐',f:['грушу','груши','груш'],g:'f'},{e:'🧁',f:['кекс','кекса','кексов'],g:'m'}];
const numAcc=(n,g)=>n===1?(g==='f'?'одну':g==='n'?'одно':'один'):n===2?(g==='f'?'две':'два'):['','','','три','четыре','пять','шесть','семь','восемь','девять'][n];
const plural=(n,f)=>{const a=n%10,b=n%100;return a===1&&b!==11?f[0]:a>=2&&a<=4&&(b<10||b>=20)?f[1]:f[2]};
const COUNTW=['','Один','Два','Три','Четыре','Пять','Шесть','Семь','Восемь','Девять'];
GAMES.count={host:'nyam',name:'Считалка',sub:'Считай вместе с Нямом',art:'🔢',rounds:4,layout:'full',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();if(!GS.foods)GS.foods=shuffle(FOODS);const food=GS.foods[(GS.round-1)%GS.foods.length];
  const mode=lv<=3?'put':lv===4?'digit':'add';
  const cw=Math.min(bw*.44,320);const nh=Math.min(bh-24,212),nw=nh*RATIO.nyam,nx=bw-12-nw,ny=bh-8-nh;
  const pcx=Math.min(nx+nw*.1,bw-110),pcy=bh-46,pw=Math.min(190,pcx-cw-30),ph=pw*.36;
  const ny_=monImg('nyam',nh);ny_.style.left=nx+'px';ny_.style.top=ny+'px';board.appendChild(ny_);
  const plate=el('div','plate');plate.style.cssText=`left:${pcx-pw/2}px;top:${pcy-ph/2}px;width:${pw}px;height:${ph}px;z-index:2`;board.appendChild(plate);
  const plateSlots=k=>{const out=[];const perRow=Math.min(5,Math.max(3,Math.ceil(k/2)));for(let i=0;i<k;i++){const r=Math.floor(i/perRow),inRow=Math.min(perRow,k-r*perRow),ci=i%perRow;out.push([pcx+(ci-(inRow-1)/2)*Math.min(32,pw*.8/perRow),pcy-6+(r-.5*(Math.ceil(k/perRow)-1))*22])}return out};
  let done=false;
  if(mode==='digit'){
   const N=2+rnd(6);const sl=plateSlots(N);let counted=0;
   const items=sl.map(([x,y])=>{const e=el('button','cnt-item emo inplate',food.e);e.style.left=x+'px';e.style.top=y+'px';board.appendChild(e);e.onclick=()=>{if(e.classList.contains('cnted')||done)return;audio();e.classList.add('cnted');counted++;sfx.tick();say(COUNTW[counted])};return e});
   const bub=taskBubble(`Сколько у меня в тарелке? Нажимай и считай!`,cw+34,12,Math.min(210,nx-cw-30),'t-right');
   const opts=shuffle([N,...sample([N-2,N-1,N+1,N+2].filter(v=>v>=1&&v<=9),2)]);
   const box=el('div','digits');box.style.cssText=`left:16px;top:${bh/2-60}px;width:${cw}px`;board.appendChild(box);
   opts.forEach(v=>{const b=el('button','digit',String(v));box.appendChild(b);b.onclick=()=>{if(done)return;audio();if(v===N){done=true;b.classList.add('ok');setTimeout(()=>hop(ny_,'chomp'),300);c.success(`Верно! ${COUNTW[N]}! Ням-ням!`,2200,ny_)}else{b.classList.add('dim');c.mistake(`Нет, не ${v}. Посчитай ещё раз!`,ny_,b);items.forEach(i=>i.classList.remove('cnted'));counted=0}}});
   c.say(`Сколько ${plural(5,food.f)} у меня в тарелке? Посчитай и нажми на цифру!`,'Сколько у меня в тарелке?');return}
  const cloth=el('div','cloth');cloth.style.cssText=`left:16px;top:16px;width:${cw}px;height:${bh-32}px`;board.appendChild(cloth);
  let N,A=0;
  if(mode==='put'){const rg=LV(lv,[[1,3],[3,5],[4,7]]);N=rg[0]+rnd(rg[1]-rg[0]+1)}else{A=1+rnd(3);N=Math.min(8,A+1+rnd(4))}
  const total=Math.min(N-A+2+rnd(2),9);
  const bubTxt=mode==='put'?`Положи мне ${N} ${plural(N,food.f)}!`:`У меня ${A}. Сделай, чтобы стало ${N}!`;
  const bub=taskBubble(bubTxt,cw+34,12,Math.min(210,nx-cw-30),'t-right');const dots=el('div','cdots');bub.appendChild(dots);
  const renderDots2=k=>{dots.innerHTML='';for(let i=0;i<N;i++){const d=el('i',(i<A?'got given':i<k?'got':''),i<k?`<span class="emo">${food.e}</span>`:'');dots.appendChild(d)}};
  c.say(mode==='put'?`Положи мне в тарелку ${numAcc(N,food.g)} ${plural(N,food.f)}!`:`У меня в тарелке ${A}. Добавь, чтобы стало ${N}!`,bubTxt);
  const cols=4,rows=3,cellW=cw/cols,cellH=(bh-32)/rows;const cells=sample([...Array(cols*rows).keys()],total);
  const items=cells.map(ci=>{const x=16+(ci%cols+.5)*cellW+(Math.random()-.5)*cellW*.3,y=16+(Math.floor(ci/cols)+.5)*cellH+(Math.random()-.5)*cellH*.3;const e=el('button','cnt-item emo',food.e);e.style.left=x+'px';e.style.top=y+'px';board.appendChild(e);return{e,x,y,inp:false}});
  const given=[...Array(A)].map(()=>{const e=el('div','cnt-item emo inplate given',food.e);board.appendChild(e);return{e,inp:true,given:true}});
  const all=()=>[...given,...items.filter(i=>i.inp)];
  let warned=false;
  const relayout=()=>{const inP=all();const sl=plateSlots(inP.length);inP.forEach((it,i)=>{it.e.style.left=sl[i][0]+'px';it.e.style.top=sl[i][1]+'px'});renderDots2(Math.min(inP.length,N));return inP.length};relayout();
  items.forEach(it=>{it.e.onclick=()=>{if(done)return;audio();if(it.inp){it.inp=false;it.e.classList.remove('inplate');it.e.style.left=it.x+'px';it.e.style.top=it.y+'px';sfx.tap();const k=relayout();if(k<=N)warned=false;return}
   if(all().length>=9)return;it.inp=true;it.e.classList.add('inplate');const k=relayout();sfx.pop();
   if(k===N){done=true;say(COUNTW[k]+'!');setTimeout(()=>hop(ny_,'chomp'),300);c.success(mode==='put'?`Ням-ням! Ровно ${numAcc(N,food.g)}! Спасибо!`:`Было ${A}, добавили ${N-A}, стало ${N}! Молодец!`,2600,ny_)}
   else if(k>N){if(!warned){warned=true;c.mistake('Ой, многовато! Нажми на лишнюю в тарелке.',ny_)}else say(COUNTW[k]||String(k))}
   else say(COUNTW[k])}});
 }};

/* --- 3. Prank: scenes room/kitchen/yard, L5 "what disappeared?" --- */
const PRANK_POOLS={
 room:[{e:'🧸',n:'мишка',g:'m',a:1},{e:'🚗',n:'машинка',g:'f'},{e:'⚽',n:'мячик',g:'m'},{e:'🎈',n:'шарик',g:'m'},{e:'📚',n:'книжки',g:'p'},{e:'🐱',n:'котик',g:'m',a:1},{e:'🦆',n:'уточка',g:'f',a:1},{e:'🍎',n:'яблоко',g:'n'},{e:'🎸',n:'гитара',g:'f'},{e:'🥁',n:'барабан',g:'m'},{e:'🧩',n:'пазл',g:'m'},{e:'🦖',n:'динозаврик',g:'m',a:1},{e:'🎁',n:'подарок',g:'m'},{e:'🌵',n:'кактус',g:'m'},{e:'🐸',n:'лягушонок',g:'m',a:1},{e:'🚂',n:'паровозик',g:'m'},{e:'🪀',n:'йо-йо',g:'n'},{e:'🍩',n:'пончик',g:'m'}],
 kitchen:[{e:'🍎',n:'яблоко',g:'n'},{e:'🍌',n:'банан',g:'m'},{e:'🥛',n:'молоко',g:'n'},{e:'🍞',n:'хлеб',g:'m'},{e:'🧀',n:'сыр',g:'m'},{e:'🥕',n:'морковка',g:'f'},{e:'🍳',n:'сковородка',g:'f'},{e:'☕',n:'чашка',g:'f'},{e:'🍪',n:'печенье',g:'n'},{e:'🍯',n:'мёд',g:'m'},{e:'🥄',n:'ложка',g:'f'},{e:'🍉',n:'арбуз',g:'m'},{e:'🧁',n:'кекс',g:'m'},{e:'🐱',n:'котик',g:'m',a:1},{e:'🍋',n:'лимон',g:'m'},{e:'🥚',n:'яйцо',g:'n'}],
 yard:[{e:'🌻',n:'подсолнух',g:'m'},{e:'🐞',n:'божья коровка',g:'f',a:1},{e:'🐝',n:'пчёлка',g:'f',a:1},{e:'🦋',n:'бабочка',g:'f',a:1},{e:'🍄',n:'грибок',g:'m'},{e:'🐌',n:'улитка',g:'f',a:1},{e:'🌷',n:'тюльпан',g:'m'},{e:'🐦',n:'птичка',g:'f',a:1},{e:'🪁',n:'воздушный змей',g:'m'},{e:'⚽',n:'мячик',g:'m'},{e:'🐸',n:'лягушонок',g:'m',a:1},{e:'🐶',n:'щенок',g:'m',a:1},{e:'🐿️',n:'белочка',g:'f',a:1},{e:'🍎',n:'яблоко',g:'n'},{e:'🌰',n:'жёлудь',g:'m'}]};
const SLOTS=[[.61,.29,1],[.72,.29,1],[.83,.29,1],[.165,.5,1],[.42,.53,0],[.11,.8,0],[.3,.87,0],[.5,.78,0],[.69,.87,0],[.88,.76,0]];
const GONE=g=>({m:'Пропал',f:'Пропала',n:'Пропало',p:'Пропали'})[g],CAME=g=>({m:'Появился',f:'Появилась',n:'Появилось',p:'Появились'})[g],WAS=g=>({m:'Был',f:'Была',n:'Было',p:'Были'})[g],NOW=g=>({m:'а стал',f:'а стала',n:'а стало',p:'а стали'})[g];
function sceneHTML(kind,bw){
 if(kind==='kitchen')return `<div class="sc-wall" style="background-color:#E6F4EF;background-image:linear-gradient(#fff6 2px,transparent 2px),linear-gradient(90deg,#fff6 2px,transparent 2px);background-size:34px 34px"></div><div class="floor" style="background:#F2D3A8;background-image:none"></div><div class="sc-table"></div><div class="win"><i></i></div><div class="pic"><span class="emo">🧁</span></div><svg class="clock" viewBox="0 0 52 52"><circle cx="26" cy="26" r="23" fill="#fff" stroke="#7BB5A3" stroke-width="4"/><path d="M26 14v12l8 5" stroke="#2D1856" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg><div class="shelf" style="background:#7BB5A3"></div>`;
 if(kind==='yard')return `<div class="sc-wall" style="background:linear-gradient(#9ED6FA,#D8F0FF)"></div><div class="sc-sun"></div><div class="floor" style="background:#9BD86A;background-image:repeating-linear-gradient(90deg,transparent 0 22px,#8ECF5D 22px 24px)"></div><div class="sc-tree"><i></i></div><div class="sc-fence"></div><div class="sc-cloud" style="left:36%;top:10%"></div>`;
 let v='M0 0H'+bw+'V14';for(let x=bw;x>-44;x-=44)v+=`Q${x-22} 34 ${x-44} 14`;
 return `<div class="stripes"></div><div class="floor"></div><div class="rug"></div><div class="win"><i></i></div><div class="curt" style="left:3%"></div><div class="curt" style="left:26.5%"></div><div class="pic"><span class="emo">🌻</span></div><svg class="clock" viewBox="0 0 52 52"><circle cx="26" cy="26" r="23" fill="#fff" stroke="#C98B5A" stroke-width="4"/><path d="M26 14v12l8 5" stroke="#2D1856" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg><div class="shelf"></div><svg class="val" viewBox="0 0 ${bw} 34" preserveAspectRatio="none" style="height:30px;width:100%"><path d="${v}V0Z" fill="#F07A98"/></svg>`}
GAMES.prank={host:'shusha',name:'Кто напроказничал?',sub:'Найди, что изменилось',art:'🙈',rounds:3,layout:'host',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const kind=LV(lv,['room','room','kitchen','yard','room']);const where={room:'в комнате',kitchen:'на кухне',yard:'во дворе'}[kind];
  const room=el('div','room sc-'+kind);room.innerHTML=sceneHTML(kind,bw);board.appendChild(room);
  const count=LV(lv,[5,7,7,8,8]);const slotIdx=sample([...Array(SLOTS.length).keys()],count);const toys=shuffle(PRANK_POOLS[kind]);let ti=0;
  const state=SLOTS.map(()=>null);slotIdx.forEach(si=>state[si]=toys[ti++]);
  const cells=SLOTS.map((s,i)=>{const b=el('button','ritem emo'+(s[2]?' sm':''));b.style.left=(s[0]*bw)+'px';b.style.top=(s[1]*bh)+'px';room.appendChild(b);return b});
  const render=()=>cells.forEach((b,i)=>{const t=state[i];b.innerHTML=t?t.e:'';if(t&&t.hat)b.insertAdjacentHTML('beforeend','<span class="hat emo">🎩</span>')});render();
  const cl=el('div','curtain l'),cr=el('div','curtain r');room.appendChild(cl);room.appendChild(cr);
  const timer=el('div','timer','<i></i>');room.appendChild(timer);const T=LV(lv,[7,6,6,6,6])*1000;
  const ready=el('button','play ready-btn','<i><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-left:0"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></i>');ready.setAttribute('aria-label','Готово');room.appendChild(ready);
  c.say(`Запомни, что лежит ${where}!`,`Запомни, что ${where}!`);
  let phase='look',targets=[],found=0,wrong=0,missingToy=null,missingSlot=-1;
  const bar=timer.firstChild;bar.style.transition=`width ${T}ms linear`;bar.style.width='100%';requestAnimationFrame(()=>requestAnimationFrame(()=>bar.style.width='0%'));
  c.later(hide,T);ready.onclick=()=>{audio();hide()};
  function hide(){if(phase!=='look'||!GS)return;phase='hide';timer.remove();ready.remove();sfx.whoosh();cl.classList.add('closed');cr.classList.add('closed');say('Хи-хи!');
   c.later(()=>{if(lv===5)removeOne();else applyChanges();render();cl.classList.remove('closed');cr.classList.remove('closed');sfx.whoosh();
    c.later(()=>{phase='find';if(lv===5){showChoices();c.say('Что пропало? Выбери!','Что пропало?')}else c.say('Что изменилось? Найди!','Я кое-что поменяла! Что?')},700)},1100)}
  function nextToy(ex){for(let k=0;k<toys.length;k++){const t=toys[ti++%toys.length];if(!state.some(s=>s&&s.e===t.e)&&(!ex||t.e!==ex))return t}return toys[ti++%toys.length]}
  function applyChanges(){const types=lv===1?['swap','add','hat']:['swap','add','hat','remove'];const nChanges=lv>=4?2:1;const usedSlots=new Set();
   for(let k=0;k<nChanges;k++){let tp=pick(types);const filled=state.map((t,i)=>t?i:-1).filter(i=>i>=0&&!usedSlots.has(i)),empty=state.map((t,i)=>t?-1:i).filter(i=>i>=0&&!usedSlots.has(i));
    if(tp==='hat'){const an=filled.filter(i=>state[i].a&&!state[i].hat);if(!an.length)tp='swap';else{const i=pick(an);state[i]={...state[i],hat:1};usedSlots.add(i);targets.push({i,text:`${cap(state[i].n)} в шляпе!`});continue}}
    if(tp==='add'&&!empty.length)tp='swap';
    if(tp==='add'){const i=pick(empty);const t=nextToy();state[i]=t;usedSlots.add(i);targets.push({i,text:`${CAME(t.g)} ${t.n}!`});continue}
    if(tp==='remove'){const i=pick(filled);const t=state[i];state[i]=null;usedSlots.add(i);targets.push({i,text:`${GONE(t.g)} ${t.n}!`});continue}
    const i=pick(filled);const old=state[i];const t=nextToy(old.e);state[i]=t;usedSlots.add(i);targets.push({i,text:`${WAS(old.g)} ${old.n}. ${cap(NOW(t.g))} ${t.n}!`})}}
  function removeOne(){const filled=state.map((t,i)=>t?i:-1).filter(i=>i>=0);missingSlot=pick(filled);missingToy=state[missingSlot];state[missingSlot]=null}
  function showChoices(){const box=el('div','pchoices');room.appendChild(box);
   const decoys=sample(toys.filter(t=>t.e!==missingToy.e&&!state.some(s=>s&&s.e===t.e)),2);
   shuffle([missingToy,...decoys]).forEach(t=>{const b=el('button','pchoice emo',t.e);box.appendChild(b);b.onclick=()=>{if(phase!=='find')return;audio();
    if(t===missingToy){phase='done';b.classList.add('ok');state[missingSlot]=missingToy;render();cells[missingSlot].classList.add('found');c.success(`Верно! ${GONE(t.g)} ${t.n}!`,2400)}
    else{b.classList.add('dim');c.mistake(`Нет, ${t.n} тут и не было. Подумай ещё!`,null,b);if(++wrong>=2)cells[missingSlot].classList.add('hint')}}})}
  cells.forEach((b,i)=>b.onclick=()=>{if(phase!=='find'||lv===5)return;audio();const t=targets.find(x=>x.i===i&&!x.f);
   if(t){t.f=1;found++;b.classList.remove('hint');b.classList.add('found');sfx.good();if(found>=targets.length){phase='done';c.success(`Верно! ${targets.map(x=>x.text).join(' ')}`,2600)}else say(`Верно! ${t.text} Есть ещё одно!`)}
   else if(targets.some(x=>x.i===i&&x.f)){}
   else{wrong++;c.mistake(wrong>=2?'Нет, не тут. Подсказываю!':'Нет, это не изменилось. Ищи ещё!',null,b);if(wrong>=2){const r=targets.find(x=>!x.f);if(r)cells[r.i].classList.add('hint')}}});
 }};

/* --- 4. Detective: L4 find the pair, L5 big/small --- */
const TCOL={red:{c:'#F2584B',d:'#C93A2C',a:['красный','красная','красную','красные']},blue:{c:'#3FA2F2',d:'#1E78C2',a:['синий','синяя','синюю','синие']},yellow:{c:'#FFC83D',d:'#D99A0F',a:['жёлтый','жёлтая','жёлтую','жёлтые']},green:{c:'#5BC46E',d:'#36994A',a:['зелёный','зелёная','зелёную','зелёные']}};
const TTYPE={ball:{n:'мяч',acc:'мяч',pl:'мячики',g:'m'},car:{n:'машинка',acc:'машинку',pl:'машинки',g:'f'},cube:{n:'кубик',acc:'кубик',pl:'кубики',g:'m'},balloon:{n:'шарик',acc:'шарик',pl:'шарики',g:'m'},star:{n:'звёздочка',acc:'звёздочку',pl:'звёздочки',g:'f'}};
const TPAT={dots:'в горошек',stripes:'в полоску'};
const TSIZE={big:['большой','большая','большую','большие'],small:['маленький','маленькая','маленькую','маленькие']};
function toyDesc(t,cs){const T=TTYPE[t.type],A=TCOL[t.color].a;const f=T.g==='f';const adj=f?(cs==='acc'?A[2]:A[1]):A[0];const sz=t.size?(f?(cs==='acc'?TSIZE[t.size][2]:TSIZE[t.size][1]):TSIZE[t.size][0])+' ':'';return `${sz}${adj} ${cs==='acc'?T.acc:T.n}${t.pattern?' '+TPAT[t.pattern]:''}`}
let toyUid=0;
function toySvg(t){const C=TCOL[t.color];const u=++toyUid;let body='',hl='',extra='';
 if(t.type==='ball'){body='<circle cx="32" cy="32" r="26"/>';hl='<path d="M15 25a19 19 0 0 1 13-13" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>'}
 else if(t.type==='cube'){body='<rect x="8" y="8" width="48" height="48" rx="11"/>';hl='<rect x="15" y="15" width="34" height="34" rx="7" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>'}
 else if(t.type==='star'){body='<path d="M32 4.5l8 16.2 17.8 2.6-12.9 12.6 3 17.8L32 45.3l-15.9 8.4 3-17.8L6.2 23.3l17.8-2.6z"/>'}
 else if(t.type==='balloon'){body='<ellipse cx="32" cy="25" rx="19" ry="22"/>';extra=`<path d="M28.5 50h7l-3.5-4z" fill="${C.d}"/><path d="M32 50c-4 4 4 6 0 12" stroke="#7B6F86" stroke-width="2" fill="none" stroke-linecap="round"/>`;hl='<path d="M20 19a13 13 0 0 1 9-8.5" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>'}
 else if(t.type==='car'){body='<path d="M6 44v-6q0-6 7-7l7-1 6-10q2-3 6-3h12q4 0 6 3l5 10h2q5 1 5 7v7q0 2-2 2H8q-2 0-2-2z"/>';extra='<path d="M25 29l5-8h8v8zM41 21h5l4 8h-9z" fill="#E6F4FF"/><circle cx="19" cy="47" r="7" fill="#3A3446"/><circle cx="19" cy="47" r="3" fill="#C5BACF"/><circle cx="47" cy="47" r="7" fill="#3A3446"/><circle cx="47" cy="47" r="3" fill="#C5BACF"/>'}
 let pat='';
 if(t.pattern==='dots'){let d='';for(let r=0;r<6;r++)for(let k=0;k<6;k++)d+=`<circle cx="${k*12+3+(r%2)*6}" cy="${r*12+4}" r="3.3"/>`;pat=`<g fill="#fff" opacity=".92">${d}</g>`}
 if(t.pattern==='stripes'){let d='';for(let i=0;i<10;i++)d+=`<path d="M${i*13-30} 72L${i*13+14} -4"/>`;pat=`<g stroke="#fff" stroke-width="5.5" opacity=".88">${d}</g>`}
 return `<svg viewBox="0 0 64 64"><defs><clipPath id="tc${u}">${body}</clipPath></defs><g fill="${C.c}" stroke="${C.c}" stroke-width="${t.type==='star'?4:0}" stroke-linejoin="round">${body}</g>${pat?`<g clip-path="url(#tc${u})">${pat}</g>`:''}${hl}${extra}</svg>`}
const toyMatch=(t,s)=>(!s.type||t.type===s.type)&&(!s.color||t.color===s.color)&&(s.pattern===undefined||t.pattern===s.pattern)&&(!s.size||t.size===s.size);
const sameToy=(a,b)=>a.type===b.type&&a.color===b.color&&a.pattern===b.pattern&&a.size===b.size;
GAMES.detective={host:'shusha',name:'Детектив',sub:'Найди игрушку по приметам',art:'🔎',rounds:3,layout:'host',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const n=LV(lv,[6,8,10,10,10]);
  const pats=lv===3||lv===4?['dots','stripes',null]:[null],sizes=lv===5?['big','small']:[undefined];const ALL=[];
  for(const ty in TTYPE)for(const co in TCOL)for(const p of pats)for(const s of sizes)ALL.push(s?{type:ty,color:co,pattern:p,size:s}:{type:ty,color:co,pattern:p});
  const kind=LV(lv,[['one','one','alltype'],['one','allcolor','one'],['one','one','allcolor'],['pair','pair','pair'],['one','one','allsize']])[GS.round-1]||'one';
  let spec=null,items=[],text,pair=null;
  if(kind==='one'){
   const pool=lv===3?ALL.filter(t=>t.pattern):ALL;const tg=pick(pool);spec={type:tg.type,color:tg.color};if(lv===3)spec.pattern=tg.pattern;if(lv===5)spec.size=tg.size;
   const rest=ALL.filter(t=>!toyMatch(t,spec));
   const near=[...sample(rest.filter(t=>t.type===tg.type&&t.color!==tg.color),2),...sample(rest.filter(t=>t.color===tg.color&&t.type!==tg.type),2)];
   if(lv===3||lv===5)near.push(...sample(rest.filter(t=>t.type===tg.type&&t.color===tg.color),2));
   items=[tg,...near];const others=shuffle(rest.filter(t=>!items.includes(t)));while(items.length<n)items.push(others.pop());text=`Найди ${toyDesc(tg,'acc')}!`}
  else if(kind==='pair'){const tg=pick(ALL);pair=tg;const rest=shuffle(ALL.filter(t=>!sameToy(t,tg)));const near=rest.filter(t=>t.type===tg.type&&t.color===tg.color).slice(0,2);items=[tg,{...tg},...near];for(const t of rest){if(items.length>=n)break;if(!items.includes(t))items.push(t)}text='Найди две одинаковые игрушки!'}
  else{const k=lv===1?2:3;
   if(kind==='alltype'){const ty=pick(Object.keys(TTYPE));spec={type:ty};text=`Найди все ${TTYPE[ty].pl}!`}
   else if(kind==='allsize'){spec={size:'small'};text='Найди все маленькие игрушки!'}
   else{const co=pick(Object.keys(TCOL));spec={color:co};text=`Найди все ${TCOL[co].a[3]} игрушки!`}
   const yes=sample(ALL.filter(t=>toyMatch(t,spec)),k),no=sample(ALL.filter(t=>!toyMatch(t,spec)),n-k);items=[...yes,...no]}
  items=shuffle(items.slice(0,n));
  const isTarget=t=>pair?sameToy(t,pair):toyMatch(t,spec);const need=items.filter(isTarget).length;
  board.appendChild(el('div','playroom'));
  const cols=Math.ceil(n/2),rows=2,cw=(bw-24)/cols,ch=(bh-24)/rows,sz=Math.min(cw*.8,ch*.62,86);
  let found=0,done=false,wrong=0;
  items.forEach((t,i)=>{const b=el('button','toy');b.innerHTML=toySvg(t);b.setAttribute('aria-label',toyDesc(t,'nom'));
   const s=t.size==='small'?sz*.6:sz;const x=12+(i%cols+.5)*cw+(Math.random()-.5)*cw*.22,y=12+(Math.floor(i/cols)+.5)*ch+(Math.random()-.5)*ch*.22+(t.size==='small'?sz*.18:0);
   Object.assign(b.style,{width:s+'px',height:s+'px',left:(x-s/2)+'px',top:(y-s/2)+'px',transform:`rotate(${(Math.random()-.5)*24}deg)`});board.appendChild(b);t.el=b;
   b.onclick=()=>{if(done||b.classList.contains('got'))return;audio();
    if(isTarget(t)){b.classList.add('got');found++;sfx.good();
     if(found>=need){done=true;c.success(pair?'Пара нашлась! Они одинаковые!':need>1?'Все нашлись! Молодец!':`Верно! Вот ${toyDesc(t,'nom')}!`,1800)}else say(pair?'Есть одна! Где такая же?':'Есть! Ищи ещё!')}
    else{wrong++;c.mistake(null,null,b);say(pair?'У этой игрушки нет пары. Ищи ещё!':`Это ${toyDesc(t,'nom')}. ${GS.task}`);if(wrong>=3){const h=items.find(x=>isTarget(x)&&!x.el.classList.contains('got'));if(h)h.el.classList.add('hint')}}}});
  c.say((GS.round===1?'Шуша спрятала игрушки. ':'')+text,text);
 }};

/* --- 5. Parcel: themes, L4 river, L5 winter with a letter to pick up --- */
const BIT={N:1,E:2,S:4,W:8},OPP={N:'S',S:'N',E:'W',W:'E'},DIRS=['N','E','S','W'];
const rotM=(m,k)=>{for(let i=0;i<(k%4+4)%4;i++)m=((m<<1)|(m>>3))&15;return m};
const roadD=m=>({5:'M36 0V72',10:'M0 36H72',3:'M36 0A36 36 0 0 0 72 36',6:'M72 36A36 36 0 0 0 36 72',12:'M36 72A36 36 0 0 0 0 36',9:'M0 36A36 36 0 0 0 36 0'})[m];
const THEMES={summer:{bg:'#A8D977',dot:'#98CC69',deco:['🌼','🌳','🪨','🍄','🌷']},autumn:{bg:'#F3C46E',dot:'#E5AA4C',deco:['🍂','🍁','🍄','🌰','🎃']},river:{bg:'#A8D977',dot:'#98CC69',deco:['🌳','🌼']},winter:{bg:'#EAF4FB',dot:'#D6E8F5',deco:['⛄','🌲','❄️','🎄']}};
function tileSvg(m,th,water){if(water)return `<svg viewBox="0 0 72 72"><rect width="72" height="72" fill="#7CC7F2"/><path d="M8 24q8-6 16 0t16 0t16 0M14 46q8-6 16 0t16 0t16 0" stroke="#C4ECFF" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
 const d=roadD(m);return `<svg viewBox="0 0 72 72"><rect width="72" height="72" fill="${th.bg}"/><circle cx="14" cy="58" r="6" fill="${th.dot}"/><circle cx="58" cy="14" r="5" fill="${th.dot}"/>${d?`<g fill="none"><path d="${d}" stroke="#E2C185" stroke-width="34"/><path d="${d}" stroke="#F4DCA8" stroke-width="28"/><path d="${d}" stroke="#fff" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round"/></g>`:''}</svg>`}
GAMES.parcel={host:'drak',name:'Посылка для друзей',sub:'Поверни плитки дорожки',art:'📦',rounds:3,layout:'full',noMistakes:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const [cols,rows]=LV(lv,[[4,2],[5,3],[6,3],[6,4],[6,4]]);const G=6;const th=THEMES[LV(lv,['summer','summer','autumn','river','winter'])];
  const left=148,rightRoom=124;const T=Math.floor(Math.min((bw-left-rightRoom-(cols-1)*G)/cols,(bh-30-(rows-1)*G)/rows,84));
  const gx=left,gy=Math.round((bh-(rows*T+(rows-1)*G))/2);const cx=c0=>gx+c0*(T+G),cy=r0=>gy+r0*(T+G);
  const r0=rnd(rows),rg=rnd(rows);
  const path=[];let r=r0;for(let col=0;col<cols;col++){const tr=col===cols-1?rg:(Math.random()<(lv>=4?.75:.6)?rnd(rows):r);const stp=tr>r?1:-1;
   if(tr===r)path.push({r,c:col,a:'W',b:'E'});else{path.push({r,c:col,a:'W',b:stp>0?'S':'N'});for(let rr=r+stp;rr!==tr;rr+=stp)path.push({r:rr,c:col,a:stp>0?'N':'S',b:stp>0?'S':'N'});path.push({r:tr,c:col,a:stp>0?'N':'S',b:'E'})}r=tr}
  const grid=[...Array(rows)].map(()=>Array(cols).fill(null));
  for(const p of path){const m=BIT[p.a]|BIT[p.b];grid[p.r][p.c]={base:m,rot:rnd(4),path:1}}
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(!grid[y][x]){const t=Math.random();
   if(lv===4&&t<.45)grid[y][x]={base:0,rot:0,water:1,deco:Math.random()<.3?'🦆':''};
   else grid[y][x]=t<.35?{base:10,rot:rnd(4)}:t<.6?{base:3,rot:rnd(4)}:{base:0,rot:0,deco:pick(th.deco)}}
  const curM=t=>rotM(t.base,t.rot);
  const mail=lv===5?path[Math.floor(path.length/2)]:null;
  function trace(){let y=r0,x=0,from='W';const seq=[];for(let s=0;s<rows*cols+2;s++){if(y<0||y>=rows||x<0||x>=cols)return null;const t=grid[y][x];const m=curM(t);if(!(m&BIT[from]))return null;const outs=DIRS.filter(dd=>dd!==from&&(m&BIT[dd]));if(outs.length!==1)return null;seq.push([y,x]);const o=outs[0];if(x===cols-1&&y===rg&&o==='E')return seq;if(o==='N')y--;else if(o==='S')y++;else if(o==='E')x++;else x--;from=OPP[o]}return null}
  if(trace()){const p=path[0];grid[p.r][p.c].rot+=1}
  const rowC=y=>cy(y)+T/2;
  const s1=el('div','stub');s1.style.cssText=`left:${gx-44}px;top:${rowC(r0)-T*.2}px;width:46px;height:${T*.4}px`;board.appendChild(s1);
  const gxEnd=cx(cols-1)+T;const s2=el('div','stub');s2.style.cssText=`left:${gxEnd-2}px;top:${rowC(rg)-T*.2}px;width:40px;height:${T*.4}px`;board.appendChild(s2);
  if(lv===5)board.classList.add('snowy');
  const dest=pick(['nyam','shusha','poch']);const hw=rightRoom-28,hh=hw/RATIO[NB[dest].house];const hi=el('img');hi.src=IMG[NB[dest].house];hi.alt='';hi.style.cssText=`position:absolute;width:${hw}px;left:${gxEnd+22}px;top:${rowC(rg)-hh*.72}px;z-index:2`;board.appendChild(hi);
  let done=false,fing=null;
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const t=grid[y][x];const d=el('button','tile');d.style.cssText=`left:${cx(x)}px;top:${cy(y)}px;width:${T}px;height:${T}px`;d.innerHTML=tileSvg(t.base,th,t.water);if(t.deco)d.insertAdjacentHTML('beforeend',`<span class="deco emo">${t.deco}</span>`);
   if(mail&&mail.r===y&&mail.c===x)d.insertAdjacentHTML('beforeend','<span class="mailbadge emo">✉️</span>');
   const sv=d.querySelector('svg');sv.style.transform=`rotate(${t.rot*90}deg)`;t.el=d;board.appendChild(d);
   d.onclick=()=>{if(done||!t.base)return;audio();t.rot++;sv.style.transform=`rotate(${t.rot*90}deg)`;sfx.tick();if(fing){fing.remove();fing=null}const seq=trace();if(seq)win(seq)}}
  const dh=Math.min(118,bh*.42),dw=dh*RATIO.drak;const dr=monImg('drak',dh);dr.style.left=Math.max(4,gx-44-dw+18)+'px';dr.style.top=(rowC(r0)-dh*.78)+'px';dr.style.zIndex=4;dr.style.transition='left .32s linear,top .32s linear';board.appendChild(dr);
  const wrongTile=path.map(p=>grid[p.r][p.c]).find(t=>rotM(t.base,t.rot)!==t.base);
  GS.dbg=()=>path.map(p=>{const t=grid[p.r][p.c];let k=0;while(k<4&&rotM(t.base,t.rot+k)!==t.base)k++;return[p.r*cols+p.c,k]});
  if(wrongTile&&lv===1&&GS.round===1){fing=el('div','finger emo','👆');fing.style.left=(parseFloat(wrongTile.el.style.left)+T*.45)+'px';fing.style.top=(parseFloat(wrongTile.el.style.top)+T*.5)+'px';board.appendChild(fing)}
  const msg=lv===5?'Захвати письмо ✉️ и отнеси посылку!':lv===4?'Вода! Построй дорожку в обход реки.':'Поверни плитки, чтобы дорожка дошла до домика!';
  const top=r0===0&&rows>1;taskBubble(msg,8,top?bh-104:10,124,top?'t-up':'t-down');
  c.say(lv===5?`Зима! Дорожка должна пройти через письмо, а потом к домику ${NB[dest].gen}.`:lv===4?`Помоги Дракоше обойти речку и донести посылку ${NB[dest].dat}!`:`Помоги Дракоше отнести посылку ${NB[dest].dat}! Нажимай на плитки, чтобы повернуть дорожку.`,msg);
  function win(seq){if(mail&&!seq.some(([y,x])=>y===mail.r&&x===mail.c)){if(!GS.mailWarn){GS.mailWarn=1;say('Дорожка готова, но письмо осталось! Проведи её через конвертик.')}return}
   done=true;seq.forEach(([y,x])=>grid[y][x].el.classList.add('lit'));sfx.good();say('Дорожка готова! Пошли!');
   const pts=[[gx-10,rowC(r0)],...seq.map(([y,x])=>[cx(x)+T/2,rowC(y),y,x]),[gxEnd+22+hw*.3,rowC(rg)]];let i=0;
   const stepT=()=>{if(!GS||GS.g!==GAMES.parcel)return;if(i>=pts.length){c.success(mail?'Письмо и посылка доставлены! Спасибо!':'Посылка доставлена! Спасибо!',1800,dr);return}const [px,py,yy,xx]=pts[i++];dr.style.left=(px-dw/2)+'px';dr.style.top=(py-dh*.8)+'px';sfx.step();
    if(mail&&yy===mail.r&&xx===mail.c){const mb=grid[yy][xx].el.querySelector('.mailbadge');if(mb)mb.classList.add('taken');sfx.pop()}setTimeout(stepT,330)};setTimeout(stepT,500)}
 }};

/* --- 6. Maze: L4 collect stars to open the gate, L5 night --- */
GAMES.maze={host:'drak',name:'Лабиринт',sub:'Проведи Дракошу к другу',art:'🌀',rounds:3,layout:'full',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const [cols,rows]=LV(lv,[[5,3],[7,4],[9,5],[7,4],[8,4]]);
  const left=146,right=118;const cs=Math.floor(Math.min((bw-left-right)/cols,(bh-34)/rows));
  const mw=cs*cols,mh=cs*rows;const ox=left+Math.round((bw-left-right-mw)/2),oy=Math.round((bh-mh)/2);
  const E=[...Array(rows)].map(()=>Array(cols).fill(1)),S=[...Array(rows)].map(()=>Array(cols).fill(1)),seen=[...Array(rows)].map(()=>Array(cols).fill(0));
  const stk=[[0,0]];seen[0][0]=1;
  while(stk.length){const [r,q]=stk[stk.length-1];const nb=[[r-1,q],[r+1,q],[r,q-1],[r,q+1]].filter(([y,x])=>y>=0&&y<rows&&x>=0&&x<cols&&!seen[y][x]);if(!nb.length){stk.pop();continue}
   const [y,x]=pick(nb);if(y===r+1)S[r][q]=0;else if(y===r-1)S[y][x]=0;else if(x===q+1)E[r][q]=0;else E[y][x]=0;seen[y][x]=1;stk.push([y,x])}
  if(lv===1||lv===4)for(let k=0;k<(lv===4?4:3);k++){const r=rnd(rows),q=rnd(cols);if(Math.random()<.5){if(q<cols-1)E[r][q]=0}else if(r<rows-1)S[r][q]=0}
  const open=(r1,q1,r2,q2)=>r2===r1&&q2===q1+1?!E[r1][q1]:r2===r1&&q2===q1-1?!E[r2][q2]:q2===q1&&r2===r1+1?!S[r1][q1]:q2===q1&&r2===r1-1?!S[r2][q2]:false;
  const ex=cols-1,ey=rows-1,sw=Math.max(7,cs*.15);const stone=lv===4;
  let walls=`M${ox} ${oy}H${ox+mw}V${oy+ey*cs}M${ox+mw} ${oy+mh}H${ox}V${oy+cs}`;
  for(let r=0;r<rows;r++)for(let q=0;q<cols;q++){const x=ox+q*cs,y=oy+r*cs;if(E[r][q]&&q<cols-1)walls+=`M${x+cs} ${y}V${y+cs}`;if(S[r][q]&&r<rows-1)walls+=`M${x} ${y+cs}H${x+cs}`}
  const wc=stone?['#8E8A9C','#B9B5C6']:['#5FA845','#86CB5E'],floor=stone?'#F1ECE4':'#FFF3DC';
  board.insertAdjacentHTML('beforeend',`<svg class="track-svg" width="${bw}" height="${bh}" viewBox="0 0 ${bw} ${bh}" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="${ox-4}" y="${oy-4}" width="${mw+8}" height="${mh+8}" rx="16" fill="${floor}" stroke="none"/><path d="M${ox-50} ${oy+cs/2}H${ox}M${ox+mw} ${oy+mh-cs/2}H${ox+mw+30}" stroke="#F4DCA8" stroke-width="${cs*.5}"/><polyline class="mz-trail" points="" stroke="#FF8A5C" stroke-width="${Math.max(4,cs*.1)}" stroke-dasharray="1 ${Math.max(9,cs*.2)}" opacity=".9"/><path d="${walls}" stroke="${wc[0]}" stroke-width="${sw}" transform="translate(0 3)"/><path d="${walls}" stroke="${wc[1]}" stroke-width="${sw}"/></svg>`);
  const trail=board.querySelector('.mz-trail');
  const dest=pick(['nyam','shusha','poch']);const hw=right-22,hh=hw/RATIO[NB[dest].house];const hi=el('img');hi.src=IMG[NB[dest].house];hi.alt='';hi.style.cssText=`position:absolute;width:${hw}px;left:${ox+mw+18}px;top:${oy+mh-cs/2-hh*.72}px;z-index:6`;board.appendChild(hi);
  const nStars=LV(lv,[0,2,3,3,2]);const stars=[];if(nStars){const cells=shuffle([...Array(rows*cols).keys()].filter(i=>i!==0&&i!==rows*cols-1)).slice(0,nStars);for(const i of cells){const r=Math.floor(i/cols),q=i%cols;const s=el('div','mz-star emo',lv===4?'🔑':'⭐');s.style.cssText=`left:${ox+q*cs+cs/2}px;top:${oy+r*cs+cs/2}px;font-size:${cs*.42}px`;board.appendChild(s);stars.push({r,q,e:s})}}
  let gate=null;if(lv===4){gate=el('div','mz-gate emo','🔒');gate.style.cssText=`left:${ox+mw-6}px;top:${oy+mh-cs/2}px;font-size:${cs*.5}px`;board.appendChild(gate)}
  const light=lv===5?nightLayer():null;
  const dh=cs*1.18,dw=dh*RATIO.drak;const dr=monImg('drak',dh);dr.style.zIndex=5;dr.style.transition='left .14s linear,top .14s linear';board.appendChild(dr);
  let path=[[0,0]],done=false,dragging=false,got=0,gateWarn=false;
  const place=(r,q)=>{dr.style.left=(ox+q*cs+cs/2-dw/2)+'px';dr.style.top=(oy+r*cs+cs*.5-dh*.62)+'px';if(light)light(ox+q*cs+cs/2,oy+r*cs+cs/2,cs*1.25)};
  const drawTrail=()=>trail.setAttribute('points',path.map(([r,q])=>`${ox+q*cs+cs/2},${oy+r*cs+cs/2}`).join(' '));
  place(0,0);dr.style.left=(ox-dw*.7)+'px';requestAnimationFrame(()=>place(0,0));drawTrail();
  let fing=null;if(lv===1&&GS.round===1){fing=el('div','finger emo','👆');fing.style.left=(ox+cs*.55)+'px';fing.style.top=(oy+cs*.5)+'px';board.appendChild(fing)}
  const msg=lv===4?'Собери все ключики 🔑, чтобы открыть замок!':lv===5?'Ночь! Веди Дракошу с фонариком.':'Веди Дракошу пальцем к домику!';
  taskBubble(msg,6,oy+cs+6,Math.min(112,ox-38),'t-up');
  c.say(lv===4?`Ворота закрыты на замок! Собери все ключики, а потом веди Дракошу к домику ${NB[dest].gen}.`:lv===5?`Наступила ночь! Проведи Дракошу по тёмному лабиринту к домику ${NB[dest].gen}.`:`Проведи Дракошу по лабиринту к домику ${NB[dest].gen}!`,msg);
  function stepTo(r,q){const prev=path[path.length-2];if(prev&&prev[0]===r&&prev[1]===q)path.pop();else path.push([r,q]);place(r,q);drawTrail();sfx.step();
   for(const s of stars)if(!s.got&&s.r===r&&s.q===q){s.got=1;got++;s.e.classList.add('got');sfx.pop();if(gate&&got>=stars.length){gate.classList.add('open');gate.textContent='🔓';say('Замок открыт!')}}
   if(r===ey&&q===ex){if(gate&&got<stars.length){if(!gateWarn){gateWarn=true;say('Закрыто! Сначала собери все ключики.');shake(gate)}}else win()}}
  function bfs(tr,tq){const cur=path[path.length-1];const Q=[[cur[0],cur[1]]],from={};from[cur]=null;let found=false;
   while(Q.length){const [r,q]=Q.shift();if(r===tr&&q===tq){found=true;break}let depth=0;for(let k=[r,q];from[k];k=from[k])depth++;if(depth>=3)continue;
    for(const [y,x] of [[r-1,q],[r+1,q],[r,q-1],[r,q+1]])if(y>=0&&y<rows&&x>=0&&x<cols&&from[[y,x]]===undefined&&open(r,q,y,x)){from[[y,x]]=[r,q];Q.push([y,x])}}
   if(!found)return null;const seq=[];for(let k=[tr,tq];from[k];k=from[k])seq.unshift(k);return seq}
  function move(e){const p=toLocal(e,board);const q=Math.floor((p.x-ox)/cs),r=Math.floor((p.y-oy)/cs);if(r<0||r>=rows||q<0||q>=cols)return;const cur=path[path.length-1];if(cur[0]===r&&cur[1]===q)return;
   const seq=bfs(r,q);if(seq)for(const [y,x] of seq){if(done)break;stepTo(y,x)}}
  function win(){done=true;dragging=false;if(light)light(ox+mw,oy+mh,900);dr.style.transition='left .6s ease-in,top .6s ease-in';setTimeout(()=>{dr.style.left=(ox+mw+18+hw*.25-dw/2)+'px'},150);c.success(`Ура! Дракоша долетел до ${NB[dest].gen}!`,1900,dr)}
  GS.dbg=()=>{const bf=(a,b)=>{const prev={};prev[a[0]+','+a[1]]=null;const Q=[a];while(Q.length){const [r,q]=Q.shift();if(r===b[0]&&q===b[1])break;for(const [y,x] of [[r-1,q],[r+1,q],[r,q-1],[r,q+1]])if(y>=0&&y<rows&&x>=0&&x<cols&&prev[y+','+x]===undefined&&open(r,q,y,x)){prev[y+','+x]=[r,q];Q.push([y,x])}}const out=[];for(let k=b;k;k=prev[k[0]+','+k[1]])out.unshift(k);return out};
   let cur=[0,0];const cells=[[0,0]];const rem=stars.filter(s=>!s.got).map(s=>[s.r,s.q]);while(rem.length){rem.sort((u,v)=>bf(cur,u).length-bf(cur,v).length);const t=rem.shift();cells.push(...bf(cur,t).slice(1));cur=t}cells.push(...bf(cur,[ey,ex]).slice(1));
   return{path:cells.map(([r,q])=>[ox+q*cs+cs/2,oy+r*cs+cs/2]),stars:stars.map(s=>[ox+s.q*cs+cs/2,oy+s.r*cs+cs/2])}};
  board.onpointerdown=e=>{if(done)return;audio();dragging=true;if(fing){fing.remove();fing=null}try{board.setPointerCapture(e.pointerId)}catch(_){}move(e)};
  board.onpointermove=e=>{if(dragging)move(e)};board.onpointerup=board.onpointercancel=()=>{dragging=false};
 }};

/* --- 7. Why: L4 four options, L5 yes / no --- */
const WHY=[
 [1,'Что возьмём на прогулку в дождь?',['☂️','🕶️','🎈'],'Под зонтиком не промокнешь!'],
 [1,'Что наденем, когда холодно?',['🧣','🩳','🕶️'],'В тёплом шарфе не замёрзнешь!'],
 [1,'Чем чистят зубы?',['🪥','🥄','✏️'],'Зубы чистят щёткой!'],
 [1,'Кто живёт в воде?',['🐟','🐈','🐓'],'Рыбка живёт в воде!'],
 [1,'Что светит днём?',['☀️','🌙','⭐'],'Днём светит солнышко!'],
 [1,'Что едет по рельсам?',['🚂','🚗','🚲'],'По рельсам едет поезд!'],
 [1,'Что растёт на дереве?',['🍎','🥕','🥔'],'Яблоки растут на яблоне!'],
 [1,'Кто говорит «му-у»?',['🐄','🐶','🐱'],'Так мычит корова!'],
 [1,'Что даёт курочка?',['🥚','🥛','🍯'],'Курочка несёт яички!'],
 [1,'Кто лает «гав-гав»?',['🐶','🐱','🐟'],'Так лает собачка!'],
 [2,'Что нужно цветку, чтобы расти?',['💧','🍬','🧸'],'Цветам нужна вода!'],
 [2,'Чем измерить температуру?',['🌡️','📏','⏰'],'Градусник покажет температуру!'],
 [2,'Что растает на солнце?',['⛄','🪨','🧱'],'Снеговик тает, когда тепло!'],
 [2,'Чем будем рисовать?',['🖍️','🍴','🔑'],'Рисуют карандашами и мелками!'],
 [2,'Кто умеет летать?',['🦋','🐢','🐌'],'Бабочка летает на крыльях!'],
 [2,'Что любит есть кролик?',['🥕','🍖','🍭'],'Кролик любит морковку!'],
 [2,'Чем подметают пол?',['🧹','🍴','🎸'],'Пол подметают веником!'],
 [2,'Что поможет в темноте?',['🔦','🕶️','🧤'],'Фонарик светит в темноте!'],
 [2,'Чем режут бумагу?',['✂️','🥄','🧽'],'Бумагу режут ножницами!'],
 [2,'Что надевают на ноги?',['👟','🎩','🧤'],'На ноги надевают ботинки!'],
 [3,'Из чего делают стекло?',['🏖️','🍬','🧸'],'Стекло делают из песка в горячей печи!'],
 [3,'Что нужно, чтобы испечь пирог?',['🔥','❄️','💧'],'Пирог пекут в горячей печке!'],
 [3,'Кто поможет, если пожар?',['🚒','🚜','🚌'],'Пожарные потушат огонь!'],
 [3,'На чём переплыть реку?',['⛵','🚲','🛴'],'По воде плывут на лодке!'],
 [3,'Чем мы слушаем музыку?',['👂','👃','🦶'],'Мы слушаем ушками!'],
 [3,'Кто даёт нам молоко?',['🐄','🐔','🐷'],'Молоко даёт корова!'],
 [3,'Кто вылупляется из яйца?',['🐣','🐟','🦋'],'Цыплёнок вылупляется из яйца!'],
 [3,'Из чего строят дом?',['🧱','🍰','🎈'],'Дом строят из кирпичей!'],
 [3,'Где живёт белый медведь?',['🧊','🏝️','🌵'],'Белый медведь живёт там, где лёд и снег!'],
 [4,'Когда падают листья?',['🍂','❄️','🌷','☀️'],'Листья падают осенью!'],
 [4,'Когда появляются цветы?',['🌷','❄️','🍂','🎄'],'Цветы появляются весной!'],
 [4,'Кто лечит людей?',['🩺','🔨','🍳','🎨'],'Людей лечит доктор!'],
 [4,'Кто живёт в улье?',['🐝','🐟','🐈','🐦'],'В улье живут пчёлы!'],
 [4,'Чем мы нюхаем?',['👃','👂','👀','✋'],'Мы нюхаем носом!'],
 [4,'На чём катаются с горки зимой?',['🛷','🏖️','🚲','🪁'],'Зимой катаются на санках!'],
 [4,'Где растут грибы?',['🌲','🏠','🚌','🌊'],'Грибы растут в лесу!'],
 [4,'Кто носит панцирь?',['🐢','🐶','🐔','🐰'],'Черепаха носит панцирь!'],
 [4,'Что тает в тепле?',['🧊','🥄','🪨','🧸'],'Лёд тает, когда тепло!'],
 [4,'По чему звонят бабушке?',['📱','🍌','👟','🧸'],'Бабушке звонят по телефону!'],
 [4,'Кто строит дом из веточек на дереве?',['🐦','🐟','🐷','🐌'],'Птичка вьёт гнездо на дереве!'],
 [4,'Что нужно, чтобы слепить снеговика?',['❄️','🏖️','🌻','💧'],'Снеговика лепят из снега!']];
const TRUTH=[
 ['🐟','Рыбка живёт в воде?',1,'Да! Рыбка плавает в воде.'],['🐘','Слон маленький, как мышка?',0,'Нет! Слон очень большой.'],
 ['☀️','Солнышко светит ночью?',0,'Нет, ночью на небе луна и звёзды.'],['❄️','Зимой идёт снег?',1,'Да! Зимой бывает снег.'],
 ['🐄','Корова говорит «гав»?',0,'Нет! Корова говорит «му-у».'],['🍋','Лимон кислый?',1,'Да, лимон очень кислый!'],
 ['🐧','Пингвин живёт в жаркой пустыне?',0,'Нет! Пингвин живёт там, где холодно.'],['🦒','У жирафа длинная шея?',1,'Да! Длинная-предлинная.'],
 ['🍦','Мороженое горячее?',0,'Нет, мороженое холодное!'],['🐝','Пчёлки делают мёд?',1,'Да! Пчёлки делают мёд.'],
 ['🚗','Машина летает по небу?',0,'Нет! Машина едет по дороге, а летает самолёт.'],['🌙','Луну видно ночью?',1,'Да! Ночью на небе луна.'],
 ['🥕','Морковка растёт на дереве?',0,'Нет! Морковка растёт в земле.'],['🐢','Черепаха бегает быстро?',0,'Нет, черепаха ползает медленно.'],
 ['🐓','Петушок кричит «ку-ка-ре-ку»?',1,'Да! Ку-ка-ре-ку!'],['🌈','Радуга бывает после дождя?',1,'Да! После дождя бывает радуга.'],
 ['🐟','Рыбка умеет ходить?',0,'Нет! Рыбка плавает.'],['🔥','Огонь горячий?',1,'Да! Огонь горячий, его нельзя трогать.']];
GAMES.why={host:'poch',name:'Почему так?',sub:'Отвечай на вопросы',art:'❓',rounds:4,layout:'host',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();let done=false;
  if(lv===5){const pool=TRUTH.filter(t=>!GS.used.has(t[1]));const t=pick(pool.length?pool:TRUTH);GS.used.add(t[1]);
   const qc=el('div','qcard');qc.style.cssText='left:16px;right:16px;top:16px';qc.innerHTML=`<button class="spk" aria-label="Повторить">${SVG.speak}</button><b>Правда или нет?</b>`;board.appendChild(qc);qc.querySelector('.spk').onclick=()=>say(t[1]);
   const pic=el('div','tpic emo',t[0]);board.appendChild(pic);const txt=el('div','ttext',t[1]);board.appendChild(txt);
   const yn=el('div','yesno');yn.innerHTML='<button class="yn yes"><span class="emo">👍</span>Да</button><button class="yn no"><span class="emo">👎</span>Нет</button>';board.appendChild(yn);
   yn.querySelectorAll('.yn').forEach((b,i)=>b.onclick=()=>{if(done)return;audio();const ans=i===0?1:0;if(ans===t[2]){done=true;b.classList.add('ok');const ch=el('div','okchip',t[3]);ch.style.left='16px';ch.style.bottom='12px';board.appendChild(ch);c.success(t[3],2600)}else{b.classList.add('dim');c.mistake('Подумай ещё!',null,b)}});
   c.say('Правда или нет? '+t[1],'Правда или нет?');return}
  const pool=WHY.filter(q=>(lv===1?q[0]===1:lv===2?q[0]<=2:lv===3?q[0]===3||q[0]===2:q[0]===4)&&!GS.used.has(q[1]));const q=pick(pool.length?pool:WHY.filter(x=>lv===4?x[0]===4:x[0]<4));GS.used.add(q[1]);
  const qc=el('div','qcard');qc.style.cssText='left:16px;right:16px;top:16px';qc.innerHTML=`<button class="spk" aria-label="Повторить">${SVG.speak}</button><b>${q[1]}</b>`;board.appendChild(qc);qc.querySelector('.spk').onclick=()=>say(q[1]);
  const k=q[2].length;const ow=Math.min(150,(bw-32-(k-1)*14)/k),oh=Math.min(140,bh-160);
  const opts=el('div','opts');opts.style.cssText=`left:16px;right:16px;top:${Math.max(96,(bh-oh)/2+12)}px;gap:14px`;board.appendChild(opts);
  shuffle(q[2].map((e,i)=>({e,ok:i===0}))).forEach(o=>{const b=el('button','opt emo',o.e);b.style.width=ow+'px';b.style.height=oh+'px';b.style.fontSize=Math.min(74,oh*.55,ow*.55)+'px';opts.appendChild(b);
   b.onclick=()=>{if(done)return;audio();if(o.ok){done=true;b.classList.add('ok');b.insertAdjacentHTML('beforeend',`<span class="ck">${SVG.check}</span>`);const ch=el('div','okchip',`Верно! ${q[3]}`);ch.style.left='16px';ch.style.bottom='12px';board.appendChild(ch);c.success(`Верно! ${q[3]}`,2600)}
    else{b.classList.add('dim');c.mistake(null,null,b);say('Нет. Подумай ещё!')}}});
  c.say(q[1],'Как думаешь?');
 }};

/* --- 8. Riddle: L4 who says it, L5 whose shadow --- */
const RIDDLES=[
 ['🐰','зайчик','a',['Это животное','У него длинные уши','Он любит морковку']],
 ['🐘','слон','a',['Это животное','Он очень большой','У него длинный хобот']],
 ['🐶','собачка','a',['Это животное','Живёт с людьми и сторожит дом','Говорит «гав-гав»']],
 ['🐱','кошка','a',['Это животное','Любит молоко и ловит мышей','Говорит «мяу»']],
 ['🦒','жираф','a',['Это животное','Он весь в пятнышках','У него очень длинная шея']],
 ['🐸','лягушка','a',['Это животное','Она зелёная и прыгает','Говорит «ква-ква»']],
 ['🐻','мишка','a',['Это животное','Он большой и косолапый','Любит мёд и зимой спит']],
 ['🦊','лиса','a',['Это животное','Она рыжая','У неё пушистый хвост']],
 ['🚒','пожарная машина','t',['Это машина','Она красная','Она тушит пожар']],
 ['🚂','поезд','t',['Это транспорт','У него много вагонов','Он едет по рельсам']],
 ['✈️','самолёт','t',['Это транспорт','У него есть крылья','Он летает высоко в небе']],
 ['🚲','велосипед','t',['Это транспорт','У него два колеса','На нём крутят педали']],
 ['🚜','трактор','t',['Это машина','Она работает в поле','У неё большие колёса']],
 ['🍌','банан','f',['Это еда','Он жёлтый и длинный','Его любят обезьянки']],
 ['🍉','арбуз','f',['Это ягода','Снаружи зелёный, внутри красный','В нём много косточек']],
 ['🥕','морковка','f',['Это овощ','Она оранжевая','Растёт в земле, её любит зайка']],
 ['🍋','лимон','f',['Это фрукт','Он жёлтый','Он очень кислый']],
 ['☂️','зонтик','o',['Это вещь','Его берут на улицу','Он спасает от дождя']],
 ['⛄','снеговик','o',['Его лепят зимой','Он белый и холодный','У него нос — морковка']],
 ['⏰','будильник','o',['Это вещь','Он тикает','Звенит утром и будит']],
 ['🎈','шарик','o',['Это игрушка','Его надувают','Он может улететь в небо']]];
const SOUNDS=[['🐓','петушок','ку-ка-ре-ку'],['🐄','корова','му-у-у'],['🐶','собачка','гав-гав'],['🐱','кошка','мяу'],['🐸','лягушка','ква-ква'],['🐷','поросёнок','хрю-хрю'],['🦆','уточка','кря-кря'],['🐑','овечка','бе-е-е'],['🐝','пчёлка','жу-жу-жу'],['🦉','сова','у-ху'],['🐴','лошадка','и-го-го'],['🐭','мышка','пи-пи-пи'],['🐐','козочка','ме-е-е'],['🐦','птичка','чик-чирик']];
GAMES.riddle={host:'poch',name:'Угадай по подсказкам',sub:'Слушай и угадывай',art:'🔍',rounds:3,layout:'host',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const aw=Math.min(104,(bh-44)/2);let done=false;
  const answers=(opts,isOk,okMsg,onWrong)=>{const ans=el('div','answers');ans.style.cssText=`right:16px;top:${(bh-(aw*2+12))/2}px`;board.appendChild(ans);
   opts.forEach(o=>{const b=el('button','ans emo',o[0]);b.style.width=aw+'px';b.style.height=aw+'px';b.style.fontSize=(aw*.54)+'px';ans.appendChild(b);
    b.onclick=()=>{if(done)return;audio();if(isOk(o)){done=true;b.classList.add('ok');okMsg(b);}else{b.classList.add('dim');c.mistake(null,null,b);onWrong(o)}}})};
  const leftW=bw-(aw*2+12)-48;
  if(lv===4){const pool=SOUNDS.filter(s=>!GS.used.has(s[1]));const s=pick(pool.length?pool:SOUNDS);GS.used.add(s[1]);
   const box=el('div','soundbox');box.style.cssText=`left:16px;top:24px;width:${leftW}px`;box.innerHTML=`<button class="spk big" aria-label="Послушать">${SVG.speak}</button><b>«${cap(s[2])}!»</b><span>Кто так говорит?</span>`;board.appendChild(box);box.querySelector('.spk').onclick=()=>{audio();say(cap(s[2])+'!')};
   answers(shuffle([s,...sample(SOUNDS.filter(x=>x!==s),3)]),o=>o===s,()=>c.success(`Да! Так говорит ${s[1]}: ${s[2]}!`,2200),o=>say(`Нет, ${o[1]} говорит «${o[2]}». Послушай ещё: ${s[2]}!`));
   c.say(`Кто так говорит: ${s[2]}?`,'Кто так говорит?');return}
  if(lv===5){const pool=RIDDLES.filter(r=>!GS.used.has(r[1]));const rd=pick(pool.length?pool:RIDDLES);GS.used.add(rd[1]);
   const box=el('div','shadowbox');box.style.cssText=`left:16px;top:16px;width:${leftW}px;bottom:16px`;box.innerHTML=`<span class="emo shadow">${rd[0]}</span><b>Чья это тень?</b>`;board.appendChild(box);
   const same=RIDDLES.filter(r=>r!==rd&&r[2]===rd[2]);answers(shuffle([rd,...sample(same.length>=3?same:RIDDLES.filter(r=>r!==rd),3)]),o=>o===rd,()=>{box.querySelector('.shadow').classList.add('lit');c.success(`Да! Это ${rd[1]}!`,2200)},()=>say('Нет. Посмотри на тень ещё раз!'));
   c.say('Чья это тень? Угадай!','Чья это тень?');return}
  const pool=RIDDLES.filter(r=>!GS.used.has(r[1]));const rd=pick(pool.length?pool:RIDDLES);GS.used.add(rd[1]);
  const same=RIDDLES.filter(r=>r!==rd&&r[2]===rd[2]),other=RIDDLES.filter(r=>r!==rd&&r[2]!==rd[2]);
  const dis=lv===3?sample(same,3):sample(lv===2?[...sample(same,1),...sample(other,2)]:other,3);while(dis.length<3)dis.push(pick(other.filter(o=>!dis.includes(o))));
  const hints=el('div','hints');hints.style.cssText=`left:16px;top:16px;width:${leftW}px`;board.appendChild(hints);
  let shown=0;const more=el('button','morehint');
  function addHint(speak){if(shown>=3)return;const h=el('div','rhint',`<i>${shown+1}</i><span>${rd[3][shown]}</span>`);hints.insertBefore(h,more);shown++;if(shown>=3)more.remove();else more.innerHTML=`<i>${shown+1}</i>Ещё подсказка`;if(speak)say(rd[3][shown-1])}
  hints.appendChild(more);more.innerHTML='<i>1</i>Ещё подсказка';more.onclick=()=>{audio();sfx.tap();addHint(true)};
  const start=lv===1?2:1;for(let i=0;i<start;i++)addHint(false);
  answers(shuffle([rd,...dis]),o=>o===rd,()=>{while(shown<3)addHint(false);c.success(`Да! Это ${rd[1]}!`,2200)},()=>{if(shown<3){addHint(false);say('Нет. Слушай ещё подсказку! '+rd[3][shown-1]+'.')}else say('Нет. Подумай ещё!')});
  c.say('Угадай, кого я загадал? '+rd[3].slice(0,start).join('. ')+'.','Угадай, кого я загадал?');
 }};

/* --- 9. What came first: L4 small to big, L5 numbers 1..5 --- */
const ORDER=[
 [['🥚','яйцо'],['🐣','цыплёнок'],['🐔','курочка']],[['🌰','жёлудь'],['🌱','росток'],['🌳','дуб']],[['☁️','тучка'],['🌧️','дождик'],['🌈','радуга']],
 [['🌸','цветочек'],['🍏','зелёное яблочко'],['🍎','спелое яблоко']],[['🧱','кирпичи'],['🏗️','стройка'],['🏠','домик']],[['❄️','снег'],['⛄','снеговик'],['💧','лужица']],
 [['🥚','яичко'],['🐛','гусеница'],['🦋','бабочка']],[['🧦','носочки'],['👟','ботинки'],['🛝','гулять']],[['🍞','хлеб'],['🧈','масло'],['🥪','бутерброд']],
 [['👶','малыш'],['🧒','ребёнок'],['🧑','взрослый'],['👴','дедушка']],[['🌅','утро'],['☀️','день'],['🌇','вечер'],['🌙','ночь']],
 [['🛏️','проснулись'],['🪥','почистили зубки'],['🥣','позавтракали'],['🎒','пошли в садик']],[['🌱','росток'],['🌿','кустик'],['🌷','цветок'],['💐','букет']],
 [['🥚','яйцо'],['🐣','цыплёнок вылупился'],['🐥','подрос'],['🐔','стал курочкой']],[['🌱','посадили'],['💧','полили'],['🌻','вырос'],['🌰','семечки']]];
const orderText=s=>'Сначала '+s.map((x,i)=>i===0?x[1]:(i===s.length-1?'а потом ':'потом ')+x[1]).join(', ')+'!';
GAMES.order={host:'poch',name:'Что было сначала?',sub:'Расставь по порядку',art:'🐣',rounds:3,layout:'host',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();let seq,mode='seq';
  if(lv===4){mode='size';const e=pick(['🐻','🍎','🌳','🐟','🎈','🏠','⭐','🚗','🐘','🌻']);seq=[.38,.58,.78,1].map((k,i)=>[e,['маленький','побольше','ещё больше','самый большой'][i],k])}
  else if(lv===5){mode='num';const e=pick(['🍓','🍎','⭐','🎈','🐞','🌸']);seq=[1,2,3,4,5].map(k=>[e,String(k),k])}
  else{const pool=ORDER.filter(s=>(lv===3?s.length===4:s.length===3)&&!GS.used.has(s[0][1]+s[1][1]));seq=pick(pool.length?pool:ORDER.filter(s=>lv===3?s.length===4:s.length===3));GS.used.add(seq[0][1]+seq[1][1])}
  const n=seq.length,gap=n>4?18:30,sz=Math.min(104,(bw-40-(n-1)*gap)/n);const total=n*sz+(n-1)*gap,x0=(bw-total)/2,ys=22;
  seq.forEach((_,i)=>{const s=el('div','oslot');s.style.cssText=`left:${x0+i*(sz+gap)}px;top:${ys}px;width:${sz}px;height:${sz}px`;s.innerHTML=`<i>${i+1}</i>`;board.appendChild(s);
   if(i<n-1){const a=el('div','oarrow');a.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#E8C9A8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';a.style.cssText=`left:${x0+i*(sz+gap)+sz+(gap-24)/2}px;top:${ys+sz/2-12}px;width:${Math.min(24,gap)}px`;board.appendChild(a)}});
  const yp=ys+sz+Math.max(30,(bh-ys-2*sz-24)/2);const order=shuffle(seq.map((_,i)=>i));let next=0,done=false;
  const cards=seq.map(it=>{const b=el('button','ocard');let face;
   if(mode==='size')face=`<span class="emo" style="font-size:${sz*.62*it[2]}px">${it[0]}</span>`;
   else if(mode==='num')face=`<span class="numface">${Array(it[2]).fill(`<span class="emo">${it[0]}</span>`).join('')}</span>`;
   else face=`<span class="emo" style="font-size:${sz*.56}px">${it[0]}</span>`;
   b.innerHTML=face+`<small>${it[1]}</small>`;b.setAttribute('aria-label',it[1]);board.appendChild(b);return b});
  cards.forEach(b=>{if(mode==='num')b.querySelectorAll('.numface .emo').forEach(e=>e.style.fontSize=Math.min(26,sz*.26)+'px')});
  const placeAt=(b,x,y)=>{b.style.left=x+'px';b.style.top=y+'px'};
  order.forEach((i,k)=>{const b=cards[i];b.style.width=b.style.height=sz+'px';placeAt(b,x0+k*(sz+gap),yp)});
  const put=i=>{const b=cards[i];b.classList.add('placed');placeAt(b,x0+i*(sz+gap),ys);next++};
  if(lv===1)put(0);
  cards.forEach((b,i)=>b.onclick=()=>{if(done||b.classList.contains('placed'))return;audio();
   if(i===next){put(i);sfx.pop();say(mode==='num'?COUNTW[i+1]:seq[i][1]);
    if(next>=n){done=true;c.later(()=>{cards.forEach((cb,k)=>setTimeout(()=>{cb.classList.add('glow');sfx.tick()},k*320))},300);
     c.success(mode==='size'?'От маленького к большому! Молодец!':mode==='num'?'Один, два, три, четыре, пять! Молодец!':orderText(seq),3200)}}
   else{c.mistake(null,null,b);say(mode==='size'?(next===0?'Нет, найди самый маленький!':'Нет, нужен чуть побольше!'):mode==='num'?`Нет. Сейчас нужно ${COUNTW[next+1].toLowerCase()}. Посчитай!`:(next===0?'Нет, это было не самым первым. Подумай!':'Нет. А что было дальше?'))}});
  const intro=mode==='size'?'Расставь от маленького к большому!':mode==='num'?'Расставь по порядку: от одного до пяти!':lv===1?'Что было сначала, а что потом? Первое уже стоит. Найди, что дальше!':'Что было сначала, а что потом? Расставь по порядку!';
  c.say(intro,mode==='size'?'От маленького к большому!':mode==='num'?'По порядку: 1, 2, 3...':'Что было сначала, а что потом?');
 }};

/* --- 10. Sort: food/toys, red, fruit/veg, sweet, tree/ground --- */
const SORTS={
 1:{say:'Еду — Няму в ротик, а игрушки — в коробку!',bubble:'Еду — мне, игрушки — в коробку!',box:'📦',boxHint:'🧸',nyHint:'🍎',
   yes:[['🍎','яблоко'],['🍌','банан'],['🍓','клубничка'],['🍐','груша'],['🍇','виноград'],['🥕','морковка'],['🍪','печенье'],['🧀','сыр'],['🍉','арбуз']],
   no:[['🧸','мишка'],['🚗','машинка'],['⚽','мячик'],['🎈','шарик'],['🧩','пазл'],['🪁','воздушный змей'],['🎲','кубик'],['🪀','йо-йо']],
   bad:(n,yes)=>yes?`Нет, ${n} — это еда! Это для Няма.`:`Фу! ${cap(n)} — это игрушка. Игрушки не едят!`},
 2:{say:'Ням ест только красное! Остальное — в коробку.',bubble:'Мне — только красное!',box:'📦',boxHint:'🍌',nyHint:'🍓',
   yes:[['🍓','клубничка','f'],['🍎','яблоко','n'],['🍒','вишенки','p'],['🍅','помидор','m'],['🌶️','перчик','m']],
   no:[['🍌','банан','m'],['🍋','лимон','m'],['🥒','огурец','m'],['🥦','брокколи','f'],['🍐','груша','f'],['🍇','виноград','m'],['🥝','киви','n'],['🌽','кукуруза','f'],['🍊','апельсин','m']],
   bad:(n,yes,g)=>{const adj={m:'красный',f:'красная',n:'красное',p:'красные'}[g||'m'],nadj={m:'не красный',f:'не красная',n:'не красное',p:'не красные'}[g||'m'];return yes?`Нет, ${n} — ${adj}! Дай Няму.`:`Нет, ${n} ${nadj}. В коробку!`}},
 3:{say:'Фрукты — Няму, а овощи — в корзинку!',bubble:'Фрукты — мне, овощи — в корзинку!',box:'🧺',boxHint:'🥕',nyHint:'🍐',
   yes:[['🍎','яблоко'],['🍌','банан'],['🍐','груша'],['🍇','виноград'],['🍑','персик'],['🍊','апельсин'],['🍓','клубничка'],['🍒','вишенки'],['🥝','киви'],['🍍','ананас']],
   no:[['🥕','морковка'],['🥒','огурец'],['🥔','картошка'],['🧅','лук'],['🥦','брокколи'],['🌽','кукуруза'],['🍆','баклажан'],['🧄','чеснок']],
   bad:(n,yes)=>yes?`Нет, ${n} — это фрукт! Дай Няму.`:`Нет, ${n} — это овощ. В корзинку!`},
 4:{say:'Сладкое — Няму на десерт, а остальное — в коробку!',bubble:'Сладкое — мне!',box:'📦',boxHint:'🧅',nyHint:'🍰',
   yes:[['🍰','тортик'],['🍭','леденец'],['🍫','шоколадка'],['🍩','пончик'],['🍪','печенье'],['🍯','мёд'],['🍦','мороженое'],['🧁','кекс'],['🍬','конфета']],
   no:[['🧅','лук'],['🧄','чеснок'],['🥒','огурец'],['🍋','лимон'],['🥦','брокколи'],['🧀','сыр'],['🥔','картошка']],
   bad:(n,yes)=>yes?`Нет, ${n} — это сладкое! Дай Няму.`:`Нет, ${n} — не сладкое. В коробку!`},
 5:{say:'Что растёт на дереве — на яблоньку, а что растёт в земле — на грядку!',bubble:'На дереве или в земле?',yesImg:'g_apple',noImg:'g_bed',
   yes:[['🍎','яблоко'],['🍐','груша'],['🍒','вишенки'],['🍑','персик'],['🍊','апельсин'],['🍋','лимон'],['🥥','кокос']],
   no:[['🥕','морковка'],['🥔','картошка'],['🧅','лук'],['🧄','чеснок'],['🎃','тыква'],['🍉','арбуз'],['🥒','огурец']],
   bad:(n,yes)=>yes?`Нет, ${n} растёт на дереве!`:`Нет, ${n} растёт в земле, на грядке!`}};
GAMES.sort={host:'nyam',name:'Ням ест фрукты',sub:'Разложи, куда надо',art:'🍎',rounds:6,layout:'full',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const S=SORTS[lv]||SORTS[1];
  if(!GS.sortQ)GS.sortQ=shuffle([...sample(S.yes,3).map(x=>({x,yes:true})),...sample(S.no,3).map(x=>({x,yes:false}))]);
  const item=GS.sortQ[GS.round-1]||{x:pick(S.yes),yes:true};
  const garden=!!S.yesImg;
  const nh=Math.min(bh-24,garden?150:214),nw=nh*RATIO.nyam,nx=bw-16-nw,ny=bh-8-nh;
  let yesEl,yesZone,yesC;
  if(garden){const tw=Math.min(190,bw*.24),th=tw/RATIO.g_apple;const ti=el('img','starget');ti.src=IMG.g_apple;ti.alt='Яблонька';ti.style.cssText=`left:${bw-tw-24}px;top:${bh-th-8}px;width:${tw}px`;board.appendChild(ti);yesEl=ti;yesZone={x:bw-tw-44,y:bh-th-28,w:tw+40,h:th+40};yesC=[bw-tw/2-24,bh-th*.62]}
  else{const ny_=monImg('nyam',nh);ny_.style.left=nx+'px';ny_.style.top=ny+'px';board.appendChild(ny_);yesEl=ny_;yesZone={x:nx-20,y:ny-20,w:nw+40,h:nh+40};yesC=[nx+nw*.45,ny+nh*.5];
   const nyTag=el('div','nytag emo',S.nyHint);nyTag.style.left=(nx+nw*.08)+'px';nyTag.style.top=(ny+nh*.08)+'px';board.appendChild(nyTag)}
  const bx=40,bs=150,by=bh-bs-14;let box;
  if(garden){box=el('button','sbox simg');box.style.cssText=`left:${bx-10}px;top:${by+30}px;width:${bs+30}px;height:${bs-30}px`;box.innerHTML=`<img src="${IMG.g_bed}" alt="Грядка">`}
  else{box=el('button','sbox');box.style.cssText=`left:${bx}px;top:${by}px;width:${bs}px;height:${bs}px`;box.innerHTML=`<span class="emo big">${S.box}</span><span class="emo hint">${S.boxHint}</span>`}
  box.setAttribute('aria-label','В коробку');board.appendChild(box);
  if(garden){const nm=monImg('nyam',90);nm.style.left=(bw/2-40)+'px';nm.style.top='8px';board.appendChild(nm)}
  const sx=bw*.47,sy=bh*.6;const pad=el('div','spad');pad.style.left=(sx-52)+'px';pad.style.top=(sy-22)+'px';board.appendChild(pad);
  const it=el('div','sitem emo',item.x[0]);it.setAttribute('aria-label',item.x[1]);board.appendChild(it);
  const home=()=>{it.style.transition='left .35s cubic-bezier(.4,1.4,.5,1),top .35s cubic-bezier(.4,1.4,.5,1)';it.style.left=sx+'px';it.style.top=sy+'px'};home();
  taskBubble(S.bubble,garden?bw/2+60:Math.max(bx+bs+10,sx-120),12,garden?180:Math.min(240,nx-sx+90),garden?'t-left':'t-right');
  if(GS.round===1)c.say(S.say,S.bubble);else GS.task=S.say;
  let done=false,drag=null;
  const choose=toYes=>{if(done)return;audio();
   if(toYes===item.yes){done=true;const tx=toYes?yesC[0]:bx+bs/2,ty=toYes?yesC[1]:by+bs*.45;it.style.transition='left .45s,top .45s,transform .45s,opacity .45s';it.style.left=tx+'px';it.style.top=ty+'px';it.style.transform='translate(-50%,-50%) scale(.35)';it.style.opacity='0';
    if(toYes&&!garden)setTimeout(()=>hop(yesEl,'chomp'),300);else{const t=toYes?yesEl:box;t.classList.remove('bounce');void t.offsetWidth;t.classList.add('bounce')}
    c.success(garden?pick(['Верно!','Правильно!','Молодец!']):toYes?pick(['Ням-ням!','Вкусно!','Ам! Спасибо!']):pick(['В коробку!','Правильно!','Верно!']),950)}
   else{c.mistake(null,garden?null:yesEl,it);say(S.bad(item.x[1],item.yes,item.x[2]));home();if(!toYes)shake(box)}};
  it.onpointerdown=e=>{if(done)return;audio();e.stopPropagation();const p=toLocal(e,board);drag={dx:p.x-parseFloat(it.style.left),dy:p.y-parseFloat(it.style.top)};it.style.transition='none';it.classList.add('lift');try{it.setPointerCapture(e.pointerId)}catch(_){}};
  it.onpointermove=e=>{if(!drag)return;const p=toLocal(e,board);it.style.left=(p.x-drag.dx)+'px';it.style.top=(p.y-drag.dy)+'px'};
  it.onpointerup=it.onpointercancel=()=>{if(!drag)return;drag=null;it.classList.remove('lift');const x=parseFloat(it.style.left),y=parseFloat(it.style.top);
   if(x>yesZone.x&&x<yesZone.x+yesZone.w&&y>yesZone.y&&y<yesZone.y+yesZone.h)choose(true);else if(x>bx-30&&x<bx+bs+30&&y>by-40&&y<by+bs+20)choose(false);else home()};
  box.onclick=()=>choose(false);yesEl.classList.add('tap');yesEl.onclick=()=>choose(true);
 }};
