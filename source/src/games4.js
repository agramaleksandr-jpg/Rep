/* ================= v6: новые игры Шуши и Дракоши ================= */
const starPts=(cx,cy,R,r,n=5)=>{let s='';for(let i=0;i<n*2;i++){const rr=i%2?r:R,a=-Math.PI/2+i*Math.PI/n;s+=`${(cx+Math.cos(a)*rr).toFixed(1)},${(cy+Math.sin(a)*rr).toFixed(1)} `}return s.trim()};
// star burst at a point of the board (for drag games where the last tap was elsewhere)
function boardBurst(bx,by){const s=$('#scr-game');if(!s)return;const r=board.getBoundingClientRect(),q=s.getBoundingClientRect();lastTap={x:(r.left-q.left)/K+bx,y:(r.top-q.top)/K+by};uiBurst()}
// drag helper: element centred at (left,top); onDrop(point) decides what happens
function dragItem(e,{start,drop,can}){e.style.touchAction='none';
 e.onpointerdown=ev=>{if(can&&!can())return;audio();ev.preventDefault();ev.stopPropagation();if(start)start();
  const p0=toLocal(ev,board),x0=parseFloat(e.style.left),y0=parseFloat(e.style.top);e.classList.add('drag');sfx.tap();
  try{e.setPointerCapture(ev.pointerId)}catch(_){}
  e.onpointermove=m=>{const p=toLocal(m,board);e.style.left=(x0+p.x-p0.x)+'px';e.style.top=(y0+p.y-p0.y)+'px'};
  e.onpointerup=e.onpointercancel=u=>{e.onpointermove=e.onpointerup=e.onpointercancel=null;e.classList.remove('drag');const p=toLocal(u,board);drop({x:x0+p.x-p0.x,y:y0+p.y-p0.y},Math.hypot(p.x-p0.x,p.y-p0.y))}}}

/* --- 15. Cups: Шуша прячет мячик под ведёрко и перемешивает --- */
const CUP_COLS=[['#F2584B','#C93A2C'],['#4FA3F7','#2F7FD0'],['#FFC233','#D99A0F'],['#5BC46E','#36994A']];
function cupSvg(c,d){return `<svg viewBox="0 0 100 110"><path d="M33 19Q50-4 67 19" fill="none" stroke="#9C93B0" stroke-width="5" stroke-linecap="round"/><path d="M27 16H73L88 92H12Z" fill="${c}"/><path d="M27 16H73L75 25H25Z" fill="${d}" opacity=".45"/><rect x="5" y="86" width="90" height="17" rx="8.5" fill="${d}"/><path d="M33 31L27 78" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".32"/><polygon points="${starPts(58,55,12,5)}" fill="#fff" opacity=".85"/></svg>`}
GAMES.cups={host:'shusha',name:'Где мячик?',sub:'Следи за ведёрком',art:'🪣',rounds:3,layout:'host',
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.appendChild(el('div','sandbox'));
  const n=LV(lv,[2,3,3,4,4]),swaps=LV(lv,[2,3,5,6,6])+(GS.step>0&&lv>1?1:0),D=LV(lv,[.95,.8,.62,.55,.52])*1000;
  const CW=Math.min(108,bw/(n+1)*.92),CH=CW*1.1,GY=bh*.84,BS=CW*.5;
  const slotX=i=>bw*(i+1)/(n+1);
  const cols=Object.keys(TCOL);const two=lv===5;const bc=two?sample(cols,2):[pick(cols)];const want=two?pick(bc):bc[0];
  const cups=[];
  for(let i=0;i<n;i++){const cc=lv<=2?CUP_COLS[i]:CUP_COLS[0];const b=el('button','cp-cup');b.innerHTML=cupSvg(cc[0],cc[1]);b.style.cssText=`width:${CW}px;height:${CH}px`;board.appendChild(b);
   const cu={e:b,slot:i,x:slotX(i),y:GY,ball:null,up:false};cups.push(cu);b.onclick=()=>tap(cu)}
  const place=cu=>{cu.e.style.left=(cu.x-CW/2)+'px';cu.e.style.top=(cu.y-CH)+'px'};cups.forEach(place);
  const hideIn=sample(cups,bc.length);hideIn.forEach((cu,i)=>cu.ball=bc[i]);
  const balls={};for(const co of bc){const b=el('div','cp-ball');b.innerHTML=toySvg({type:'ball',color:co});b.style.cssText=`width:${BS}px;height:${BS}px`;board.appendChild(b);balls[co]=b}
  const showBall=(cu,on)=>{const b=balls[cu.ball];if(!b)return;b.style.left=(cu.x-BS/2)+'px';b.style.top=(GY-BS-4)+'px';b.classList.toggle('on',on)};
  const lift=(cu,on)=>{cu.up=on;cu.e.classList.toggle('up',on);if(cu.ball)showBall(cu,on)};
  let phase='show',wrong=0;const ballName=co=>TCOL[co].a[0]+' мячик';
  GS.dbg=()=>({phase,idx:cups.findIndex(cu=>cu.ball===want)});
  // 1) show where the ball is, 2) hide, 3) shuffle, 4) guess
  hideIn.forEach(cu=>lift(cu,true));
  c.say(two?'Смотри! Под ведёрками два мячика. Запомни, где какой!':(GS.step===0?'Смотри внимательно! Мячик под ведёрком.':'Смотри, где мячик!'),two?'Запомни мячики!':'Смотри, где мячик!');
  c.later(()=>{hideIn.forEach(cu=>lift(cu,false));sfx.tap();c.later(()=>{say(pick(['Хи-хи! Перемешиваю!','Хи-хи! Следи за ведёрком!']));shuffleAll(swaps)},700)},2300);
  function shuffleAll(k){phase='mix';const g=GS,r=GS.round;let left=k;
   const one=()=>{if(GS!==g||GS.round!==r)return;if(left--<=0){phase='guess';c.say(two?`Где ${ballName(want)}?`:'Где мячик? Нажми на ведёрко!',two?`Где ${ballName(want)}?`:'Где мячик?');return}
    const a=rnd(n);let b=rnd(n-1);if(b>=a)b++;const A=cups.find(cu=>cu.slot===a),B=cups.find(cu=>cu.slot===b);
    const xa=slotX(a),xb=slotX(b),arc=Math.min(56,Math.abs(xb-xa)*.35)+18;A.e.style.zIndex=3;B.e.style.zIndex=5;tone(500+rnd(200),0,.12,'triangle',.05);
    const t0=performance.now();const step=t=>{if(GS!==g||GS.round!==r)return;let p=Math.min(1,(t-t0)/D);const e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
     A.x=xa+(xb-xa)*e;A.y=GY-Math.sin(Math.PI*e)*arc;B.x=xb+(xa-xb)*e;B.y=GY+Math.sin(Math.PI*e)*arc*.22;place(A);place(B);
     B.e.style.transform=`scale(${1+Math.sin(Math.PI*e)*.08})`;
     if(p<1)requestAnimationFrame(step);else{A.slot=b;B.slot=a;A.x=xb;B.x=xa;A.y=B.y=GY;place(A);place(B);B.e.style.transform='';A.e.style.zIndex=B.e.style.zIndex='';setTimeout(one,90)}};
    requestAnimationFrame(step)};
   one()}
  function tap(cu){if(phase!=='guess'||cu.up)return;audio();lift(cu,true);
   if(cu.ball===want){phase='done';sfx.pop();c.success(two?`Вот он, ${ballName(want)}!`:pick(['Ура! Вот он, мячик!','Нашёлся мячик! Ура!']),2000);return}
   wrong++;c.mistake(cu.ball?`Это ${ballName(cu.ball)}. А где ${TCOL[want].a[0]}?`:pick(['Пусто! Попробуй другое ведёрко.','Тут пусто! Ищи ещё.']),null,cu.e);
   c.later(()=>{lift(cu,false);if(wrong>=2){const t=cups.find(x=>x.ball===want);if(t)t.e.classList.add('hint')}},1300)}
 }};

/* --- 16. Dig: стирай песок пальцем и откапывай клад --- */
const DIG_DECOY={shell:{e:'🐚',t:'Это ракушка.'},rock:{e:'🪨',t:'Это камешек.'},crab:{e:'🦀',t:'Это крабик! Он щиплется.'},bone:{e:'🦴',t:'Это косточка.'}};
const NUM_F=['','Одна!','Две!','Три!','Четыре!','Пять!'];
GAMES.dig={host:'shusha',name:'Раскопки',sub:'Откопай клад в песке',art:'⛏️',rounds:3,layout:'host',noMistakes:true,canvas:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.appendChild(el('div','dg-under'));
  const kind=LV(lv,['gem','stars','toy','shells','list']);
  const ALLT=[];for(const ty in TTYPE)for(const co in TCOL)ALLT.push({type:ty,color:co,pattern:null});
  let defs=[],intro='',short='',need=0,lst=null;
  if(kind==='gem'){defs=[{e:pick(['💎','👑','🏆','💍']),tg:1,big:1}];intro=GS.step===0?'Шуша закопала сокровище! Три песок пальцем и откопай его.':'Откопай сокровище!';short='Откопай сокровище!'}
  else if(kind==='stars'){defs=[{e:'⭐',tg:1},{e:'⭐',tg:1},{e:'⭐',tg:1},{d:'shell'},{d:'rock'}];intro='Откопай три звёздочки!';short='Найди 3 звёздочки ⭐'}
  else if(kind==='shells'){const N=2+rnd(3);for(let i=0;i<N;i++)defs.push({e:'🐚',tg:1});defs.push({d:'rock'},{d:'crab'},...(N<4?[{d:'bone'}]:[]));intro=`Откопай ${numAcc(N,'f')} ${plural(N,['ракушку','ракушки','ракушек'])}!`;short=`Найди ${N} 🐚`}
  else if(kind==='toy'){const tg=pick(ALLT);defs=[{toy:tg,tg:1},...sample(ALLT.filter(t=>!sameToy(t,tg)&&(t.type===tg.type||t.color===tg.color)),3).map(t=>({toy:t}))];intro=`Найди ${toyDesc(tg,'acc')}!`;short=intro}
  else{const tgs=sample(ALLT,3);lst=tgs;defs=[...tgs.map(t=>({toy:t,tg:1})),...sample(ALLT.filter(t=>!tgs.some(s=>sameToy(s,t))),3).map(t=>({toy:t}))];intro='Откопай игрушки, как на картинке!';short='Откопай такие игрушки!'}
  need=defs.filter(d=>d.tg).length;
  // positions on a 4x2 grid with jitter
  const cells=sample([...Array(8).keys()],defs.length),cw=bw/4,ch=bh/2;
  const items=defs.map((d,i)=>{const ci=cells[i];const s=d.big?84:d.toy?62:52;
   const x=Math.max(s*.7,Math.min(bw-s*.7,(ci%4+.5)*cw+(Math.random()-.5)*cw*.35)),y=Math.max(s*.7+(ci%4===0?30:0),Math.min(bh-s*.7,(Math.floor(ci/4)+.5)*ch+(Math.random()-.5)*ch*.3));
   const e=el('div','dg-item'+(d.toy?' tsvg':' emo'));e.style.cssText=`left:${x-s/2}px;top:${y-s/2}px;width:${s}px;height:${s}px;font-size:${s*.82}px`;
   if(d.toy)e.innerHTML=toySvg(d.toy);else e.textContent=d.e||DIG_DECOY[d.d].e;e.style.transform=`rotate(${(Math.random()-.5)*30}deg)`;board.appendChild(e);return{...d,e,x,y,s,found:false}});
  const x=gameCanvas(),cv=x.canvas,SC=cv.width/bw;
  // sand layer
  {const g=x.createLinearGradient(0,0,0,bh);g.addColorStop(0,'#F8E1AC');g.addColorStop(1,'#EFCB86');x.fillStyle=g;x.fillRect(0,0,bw,bh);
   for(let i=0;i<bw*bh/80;i++){x.fillStyle=Math.random()<.55?'rgba(190,140,70,.28)':'rgba(255,255,255,.45)';const r=1+Math.random()*1.6;x.fillRect(Math.random()*bw,Math.random()*bh,r,r)}
   x.strokeStyle='rgba(205,155,85,.28)';x.lineWidth=2.5;x.lineCap='round';for(let i=0;i<16;i++){const yy=Math.random()*bh,xx=Math.random()*bw,r=40+Math.random()*70;x.beginPath();x.arc(xx,yy,r,Math.PI*1.2,Math.PI*1.8);x.stroke()}
   for(let i=0;i<10;i++){x.fillStyle='rgba(170,120,60,.22)';x.beginPath();x.ellipse(Math.random()*bw,Math.random()*bh,3+Math.random()*4,2+Math.random()*3,Math.random()*3,0,7);x.fill()}}
  const top=gameCanvas();const fx=Particles();let grains=[];
  const cnt=el('div','fl-count dg-cnt');board.appendChild(cnt);
  const renderCnt=()=>{const got=items.filter(i=>i.tg&&i.found);cnt.innerHTML='';
   if(lst){for(const t of lst){const s=el('i','dg-li'+(items.some(i=>i.tg&&i.found&&sameToy(i.toy,t))?' on':''));s.innerHTML=toySvg(t);cnt.appendChild(s)}return}
   for(let i=0;i<need;i++){const s=el('i',i<got.length?'on':'',kind==='toy'?'':(kind==='gem'?defs[0].e:kind==='stars'?'⭐':'🐚'));if(kind==='toy'&&i===0)s.innerHTML=toySvg(items[0].toy);cnt.appendChild(s)}};
  cnt.classList.add('k-'+kind);renderCnt();
  c.say(intro,short);
  // sparkles above the treasure (always on level 1, later as a help)
  const sparks=[];const addSpark=it=>{for(let k=0;k<2;k++){const s=el('div','dg-spark emo','✨');s.style.left=(it.x-14+(k?18:-18))+'px';s.style.top=(it.y-16+(k?10:-8))+'px';s.style.animationDelay=(k*.5)+'s';board.appendChild(s);sparks.push([it,s])}};
  if(kind==='gem')addSpark(items[0]);
  let fing=null;if(lv===1&&GS.step===0){fing=el('div','finger emo sl-swipe','👆');fing.style.left=(items[0].x-10)+'px';fing.style.top=(items[0].y+10)+'px';board.appendChild(fing)}
  const R=lv>=4?27:31;let down=false,last=null,lastChk=0,lastSnd=0,lastFound=performance.now(),done=false,lastSay=0;
  const dig=(p,q)=>{x.globalCompositeOperation='destination-out';x.fillStyle=x.strokeStyle='#000';x.lineCap='round';x.lineWidth=R*2;x.beginPath();x.moveTo(q.x,q.y);x.lineTo(p.x,p.y);x.stroke();
   for(let k=0;k<3;k++){x.beginPath();x.arc(p.x+(Math.random()-.5)*R*1.6,p.y+(Math.random()-.5)*R*1.6,R*(.25+Math.random()*.25),0,7);x.fill()}x.globalCompositeOperation='source-over';
   if(grains.length<120)for(let k=0;k<3;k++){const a=Math.random()*Math.PI*2,s=60+Math.random()*120;grains.push({x:p.x+Math.cos(a)*R*.8,y:p.y+Math.sin(a)*R*.8,vx:Math.cos(a)*s,vy:Math.sin(a)*s-90,t:0,c:pick(['#E2B46E','#F3D59B','#C9965F'])})}
   const now=performance.now();if(now-lastSnd>85){lastSnd=now;tone(140+Math.random()*120,0,.07,'sawtooth',.018);tone(2400+Math.random()*900,0,.03,'square',.006)}};
  const clearRatio=it=>{const r=it.s*.36;const x0=Math.max(0,Math.round((it.x-r)*SC)),y0=Math.max(0,Math.round((it.y-r)*SC)),w=Math.max(1,Math.min(Math.round(2*r*SC),cv.width-x0)),h=Math.max(1,Math.min(Math.round(2*r*SC),cv.height-y0));
   const d=x.getImageData(x0,y0,w,h).data;let nn=0,cl=0;const st=4*Math.max(1,Math.round(SC*2.5));for(let i=3;i<d.length;i+=st){nn++;if(d[i]<60)cl++}return cl/Math.max(1,nn)};
  const check=()=>{for(const it of items)if(!it.found&&clearRatio(it)>.5)reveal(it)};
  function reveal(it){it.found=true;lastFound=performance.now();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(it.x,it.y,it.s*.72,0,7);x.fill();x.globalCompositeOperation='source-over';
   it.e.classList.add('got');if(it.tg)it.e.classList.add('ok');for(const [o,s] of sparks)if(o===it)s.remove();
   if(it.tg){fx.burst(it.x,it.y,18,['#FFD34D','#FFF1A8','#FF8A5C','#fff']);sfx.good();buzz(20);renderCnt();
    const got=items.filter(i=>i.tg&&i.found).length;
    if(got>=need){done=true;c.success(kind==='gem'?'Ура! Сокровище!':kind==='stars'?'Ура! Все звёздочки нашлись!':kind==='shells'?'Ура! Все ракушки нашлись!':kind==='toy'?`Верно! Вот ${toyDesc(it.toy,'nom')}!`:'Ура! Все игрушки нашлись!',2200)}
    else say(kind==='stars'?'Звёздочка!':kind==='shells'?NUM_F[got]:`Верно! Вот ${toyDesc(it.toy,'nom')}!`)}
   else{sfx.pop();const t=it.toy?`Это ${toyDesc(it.toy,'nom')}.`:DIG_DECOY[it.d].t;
    const more=kind==='stars'?' Ищи звёздочки!':kind==='shells'?' Ищи ракушки!':kind==='list'?' Такой игрушки нет на картинке.':' Копай дальше!';
    if(it.d==='crab')hop(GS.hostMon,'sad');say(t+more)}}
  GS.dbg=()=>items.map(i=>({x:i.x,y:i.y,s:i.s,tg:!!i.tg,found:i.found}));
  board.onpointerdown=e=>{if(done)return;audio();down=true;if(fing){fing.remove();fing=null}const p=toLocal(e,board);last=p;dig(p,p);try{board.setPointerCapture(e.pointerId)}catch(_){}};
  board.onpointermove=e=>{if(!down||done)return;const p=toLocal(e,board);if(Math.hypot(p.x-last.x,p.y-last.y)<3)return;dig(p,last);last=p;const now=performance.now();if(now-lastChk>110){lastChk=now;check()}};
  board.onpointerup=board.onpointercancel=()=>{if(down&&!done)check();down=false};
  gameLoop((dt,t)=>{
   if(!done&&kind!=='gem'&&performance.now()-lastFound>20000&&!sparks.some(([o,s])=>!o.found&&s.isConnected)){const it=items.find(i=>i.tg&&!i.found);if(it){addSpark(it);if(performance.now()-lastSay>15000){lastSay=performance.now();say('Смотри, там что-то блестит!')}}lastFound=performance.now()}
   top.clearRect(0,0,bw,bh);for(const g of grains){g.t+=dt;g.vy+=700*dt;g.x+=g.vx*dt;g.y+=g.vy*dt;top.globalAlpha=Math.max(0,1-g.t/.5);top.fillStyle=g.c;top.fillRect(g.x,g.y,3,3)}top.globalAlpha=1;grains=grains.filter(g=>g.t<.5);
   fx.draw(top,dt)});
 }};

/* --- 17. Molds: перетащи формочку на такой же след в песке --- */
const SHAPES={
 circle:{n:'Круг!',d:'<circle cx="32" cy="32" r="26"/>'},
 square:{n:'Квадрат!',d:'<rect x="8" y="8" width="48" height="48" rx="8"/>'},
 triangle:{n:'Треугольник!',d:'<path d="M32 8L58 54H6Z"/>',sw:6},
 star:{n:'Звезда!',d:`<polygon points="${starPts(32,34,28,12)}"/>`,sw:4},
 heart:{n:'Сердечко!',d:'<path d="M32 56C14 43 4 33 6 20C8 9 24 5 32 18C40 5 56 9 58 20C60 33 50 43 32 56Z"/>'},
 fish:{n:'Рыбка!',d:'<path d="M4 32C14 14 38 12 48 27L60 16V48L48 37C38 52 14 50 4 32Z"/>'},
 flower:{n:'Цветочек!',d:'<circle cx="32" cy="14" r="11"/><circle cx="49" cy="27" r="11"/><circle cx="43" cy="47" r="11"/><circle cx="21" cy="47" r="11"/><circle cx="15" cy="27" r="11"/><circle cx="32" cy="32" r="12"/>'},
 moon:{n:'Месяц!',d:'<path d="M40 5A27 27 0 1 0 59 44A21 21 0 1 1 40 5Z"/>'}};
const MCOL={red:['#F2584B','#C93A2C','#FF9A8F'],blue:['#4FA3F7','#2F7FD0','#9DD0FF'],yellow:['#FFC233','#D99A0F','#FFE08A'],green:['#5BC46E','#36994A','#A6E6B0']};
const sh=(k,fill,stroke,extra='')=>{const S=SHAPES[k];return `<g fill="${fill}" stroke="${stroke||fill}" stroke-width="${S.sw||0}" stroke-linejoin="round" ${extra}>${S.d}</g>`};
function moldSvg(k,co){const C=MCOL[co];return `<svg viewBox="-4 -4 72 72">${sh(k,C[1])}${sh(k,C[0],null,'transform="translate(32 32) scale(.8) translate(-32 -31)"')}${sh(k,'rgba(255,255,255,.35)','none','transform="translate(32 32) scale(.42) translate(-46 -46)"')}</svg>`}
function printSvg(k,co){return `<svg viewBox="-4 -4 72 72">${sh(k,'#D2A262')}${sh(k,'#E2B978',null,'transform="translate(33 34) scale(.86) translate(-32 -32)"')}${co?sh(k,'none',MCOL[co][0],'stroke-dasharray="7 5" style="stroke-width:3.5px"'):''}</svg>`}
function cakeSvg(k){return `<svg viewBox="-4 -4 72 72">${sh(k,'#C99556','none','transform="translate(32 35)  translate(-32 -32)"')}${sh(k,'#F2CF8F')}${sh(k,'#FBE3B3','none','transform="translate(30 28) scale(.55) translate(-32 -32)"')}</svg>`}
GAMES.molds={host:'shusha',name:'Куличики',sub:'Найди формочке её след',art:'🏖️',rounds:3,layout:'host',noMistakes:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.appendChild(el('div','sandbox'));const tray=el('div','md-tray');board.appendChild(tray);
  const mode=LV(lv,['shape','shape','color','rot','size']);const keys=Object.keys(SHAPES);let prints=[],molds=[];
  if(mode==='shape'){const ks=sample(lv===1?['circle','square','triangle','star','heart']:keys,lv===1?3:4);const co=pick(Object.keys(MCOL));prints=ks.map(k=>({k,co:null}));molds=ks.map(k=>({k,co:lv===1?co:pick(Object.keys(MCOL))}))}
  else if(mode==='color'){const ks=sample(keys,2),cs=sample(Object.keys(MCOL),3);prints=[{k:ks[0],co:cs[0]},{k:ks[0],co:cs[1]},{k:ks[1],co:cs[1]},{k:ks[1],co:cs[2]}];molds=[...prints.map(p=>({...p})),{k:ks[0],co:cs[2]},{k:ks[1],co:cs[0]}]}
  else if(mode==='rot'){const ks=sample(keys.filter(k=>k!=='circle'),4);prints=ks.map(k=>({k,co:null,rot:(rnd(2)?1:-1)*(35+rnd(4)*25)}));molds=ks.map(k=>({k,co:pick(Object.keys(MCOL))}))}
  else{const ks=sample(keys,3);for(const k of ks)for(const s of ['big','small'])prints.push({k,co:null,sz:s});molds=prints.map(p=>({k:p.k,sz:p.sz,co:pick(Object.keys(MCOL))}))}
  prints=shuffle(prints);molds=shuffle(molds);
  const np=prints.length,rows=np>4?2:1,perRow=Math.ceil(np/rows);const S=rows===2?Math.min(70,(bh-118)/2-8):Math.min(84,bw/(perRow+1)*.9);
  const trayH=Math.min(98,bh*.32);tray.style.height=trayH+'px';
  prints.forEach((p,i)=>{const r=Math.floor(i/perRow),inRow=Math.min(perRow,np-r*perRow),ci=i-r*perRow;const s=p.sz==='small'?S*.6:S;
   p.x=bw*(ci+1)/(inRow+1)+(Math.random()-.5)*14;p.y=rows===2?(16+S/2+r*(S+12)):(bh-trayH)*.5;p.s=s;
   const e=el('div','md-print');e.innerHTML=printSvg(p.k,p.co);e.style.cssText=`left:${p.x-s/2}px;top:${p.y-s/2}px;width:${s}px;height:${s}px;transform:rotate(${p.rot||0}deg)`;board.appendChild(e);p.e=e});
  const nm=molds.length,ms=Math.min(S*.86,(bw-30)/nm-10);
  molds.forEach((m,i)=>{const s=m.sz==='small'?ms*.6:ms;m.hx=bw*(i+1)/(nm+1);m.hy=bh-trayH/2-4;m.s=s;
   const e=el('div','md-mold');e.innerHTML=moldSvg(m.k,m.co);e.style.cssText=`left:${m.hx}px;top:${m.hy}px;width:${s}px;height:${s}px;margin:${-s/2}px 0 0 ${-s/2}px`;board.appendChild(e);m.e=e;
   dragItem(e,{can:()=>!m.used&&!done,start:()=>{if(fing){fing.remove();fing=null}},drop:(p,d)=>drop(m,p,d)})});
  const fits=(m,p)=>m.k===p.k&&(!p.co||p.co===m.co)&&(!p.sz||p.sz===m.sz);
  let done=false,made=0,lastSay=0;
  const home=m=>{m.e.style.left=m.hx+'px';m.e.style.top=m.hy+'px'};
  function drop(m,p,d){let best=null,bd=1e9;for(const q of prints){if(q.done)continue;const dd=Math.hypot(q.x-p.x,q.y-p.y);if(dd<bd){bd=dd;best=q}}
   if(!best||bd>Math.max(best.s*.75,36)){home(m);return}
   if(!fits(m,best)){GS.mistakes++;sfx.bad();buzz([30,50,30]);shake(m.e);hop(GS.hostMon,'sad');home(m);
    const why=best.k!==m.k?'Не подходит! Посмотри на форму.':best.co&&best.co!==m.co?'Не тот цвет! Найди такой же след.':(m.sz==='big'?'Не тот размер! Эта формочка большая.':'Не тот размер! Эта формочка маленькая.');
    if(performance.now()-lastSay>1200){lastSay=performance.now();say(why)}return}
   m.used=true;best.done=true;m.e.classList.add('set');m.e.style.left=best.x+'px';m.e.style.top=best.y+'px';m.e.style.transform=`rotate(${best.rot||0}deg)`;sfx.pop();
   setTimeout(()=>{m.e.classList.add('lift');best.e.innerHTML=cakeSvg(best.k);best.e.classList.add('cake');boardBurst(best.x,best.y);tone(660,0,.12,'triangle',.1);tone(990,.08,.14,'triangle',.08)},380);
   made++;if(made>=prints.length){done=true;setTimeout(()=>{if(GS&&GS.g===GAMES.molds)c.success(pick(['Ура! Все куличики готовы!','Какие красивые куличики!']),2200)},500)}else say(SHAPES[m.k].n)}
  GS.dbg=()=>molds.filter(m=>!m.used).map(m=>{const t=prints.find(q=>!q.done&&fits(m,q));return{mx:m.hx,my:m.hy,tx:t?t.x:null,ty:t?t.y:null}});
  let fing=null;if(lv===1&&GS.step===0){const m=molds[0],t=prints.find(q=>fits(m,q));fing=el('div','finger emo cnt-hint','👆');fing.style.left=m.hx+'px';fing.style.top=m.hy+'px';fing.style.setProperty('--dx',(t.x-m.hx)+'px');fing.style.setProperty('--dy',(t.y-m.hy)+'px');board.appendChild(fing)}
  const intro=mode==='color'?'Смотри на цвет! Каждой формочке — след такого же цвета.':mode==='rot'?'Следы повернулись! Найди, какой формочке какой след.':mode==='size'?'Тут большие и маленькие формочки! Найди каждой свой след.':'Перетащи формочку на такой же след в песке.';
  c.say((GS.step===0?'Сделаем куличики! ':'')+intro,mode==='color'?'Смотри на цвет!':mode==='size'?'Большие и маленькие!':'Найди формочке след!');
 }};

/* --- 18. Pairs: переворачивай карточки и ищи пары --- */
const PAIR_SET=[['🐱','Котик!'],['🐶','Щенок!'],['🐸','Лягушонок!'],['🦆','Уточка!'],['🐞','Божья коровка!'],['🦋','Бабочка!'],['🐰','Зайчик!'],['🐻','Мишка!'],['🦊','Лисичка!'],['🐷','Поросёнок!'],['🐵','Обезьянка!'],['🐔','Курочка!'],['🐢','Черепашка!'],['🐟','Рыбка!'],['🐘','Слоник!'],['🦁','Львёнок!']];
GAMES.pairs={host:'shusha',name:'Пары',sub:'Найди одинаковые карточки',art:'🃏',rounds:2,layout:'host',noMistakes:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.appendChild(el('div','pr-bg'));
  const n=LV(lv,[4,6,8,10,8]),prev=LV(lv,[2600,2600,2000,0,0]);
  const faces=sample(PAIR_SET,n/2);const deck=shuffle([...faces,...faces]);
  const [cols,rows]=n===4?[4,1]:n===6?[3,2]:n===8?[4,2]:[5,2];const gap=12;
  const cw=Math.min(104,(bw-28-(cols-1)*gap)/cols),ch=Math.min(cw*1.2,(bh-28-(rows-1)*gap)/rows);
  const ox=(bw-(cols*cw+(cols-1)*gap))/2,oy=(bh-(rows*ch+(rows-1)*gap))/2;
  const slot=i=>[ox+(i%cols)*(cw+gap),oy+Math.floor(i/cols)*(ch+gap)];
  const cards=deck.map(([e,name],i)=>{const b=el('button','pr-card');b.innerHTML=`<div class="in"><div class="f emo">${e}</div><div class="b"><span class="emo">🎀</span></div></div>`;
   const [x0,y0]=slot(i);b.style.cssText=`left:${x0}px;top:${y0}px;width:${cw}px;height:${ch}px;font-size:${Math.min(cw,ch)*.56}px`;board.appendChild(b);const cd={e:b,k:e,name,idx:i,open:false,matched:false};b.onclick=()=>tap(cd);return cd});
  const flip=(cd,on)=>{cd.open=on;cd.e.classList.toggle('open',on);tone(on?760:520,0,.06,'triangle',.06)};
  let open=[],lock=true,pairs=0,swapped=false;
  GS.dbg=()=>({lock,cards:cards.map(cd=>({k:cd.k,m:cd.matched,o:cd.open}))});
  if(prev){cards.forEach(cd=>flip(cd,true));c.say(GS.step===0?'Запомни картинки! Потом ищи одинаковые пары.':'Запомни картинки!','Запомни картинки!');
   c.later(()=>{cards.forEach(cd=>flip(cd,false));lock=false;say('Найди две одинаковые карточки!')},prev+(GS.step===0?1800:600))}
  else{lock=false;c.say(GS.step===0?'Открывай по две карточки и ищи одинаковые пары!':'Ищи пары!','Ищи пары!')}
  function tap(cd){if(lock||cd.open||cd.matched)return;audio();flip(cd,true);say(cd.name);open.push(cd);
   if(open.length<2)return;lock=true;const [a,b]=open;open=[];
   if(a.k===b.k){c.later(()=>{a.matched=b.matched=true;a.e.classList.add('ok');b.e.classList.add('ok');pairs++;
     if(pairs>=n/2){c.success(pick(['Все пары нашлись! Молодец!','Ура! Все пары найдены!']),2200);return}
     sfx.good();boardBurst(parseFloat(b.e.style.left)+cw/2,parseFloat(b.e.style.top)+ch/2);say(pick(['Пара!','Есть пара!','Одинаковые!']));
     if(lv===5&&!swapped&&pairs===2){swapped=true;c.later(shushaSwap,1200)}else lock=false},900)}
   else c.later(()=>{flip(a,false);flip(b,false);lock=false},1300)}
  function shushaSwap(){const cl=shuffle(cards.filter(cd=>!cd.matched));if(cl.length<4){lock=false;return}const [a,b]=cl;
   say('Хи-хи! Я поменяла две карточки местами!');hop(GS.hostMon,'dance');a.e.classList.add('swap');b.e.classList.add('swap');
   const al=a.e.style.left,at=a.e.style.top;a.e.style.left=b.e.style.left;a.e.style.top=b.e.style.top;b.e.style.left=al;b.e.style.top=at;
   c.later(()=>{a.e.classList.remove('swap');b.e.classList.remove('swap');lock=false},1100)}
 }};

/* --- 19. Fire: Дракоша дышит огнём и зажигает фонарики --- */
const LANT=[{k:'red',c:'#F2584B',d:'#B83A2E',a:'красный',pl:'красные'},{k:'blue',c:'#4FA3F7',d:'#2A6FB8',a:'синий',pl:'синие'},{k:'yellow',c:'#FFC233',d:'#C98E00',a:'жёлтый',pl:'жёлтые'},{k:'green',c:'#5BC46E',d:'#2F8A45',a:'зелёный',pl:'зелёные'}];
GAMES.fire={host:'drak',name:'Огонёк',sub:'Зажигай фонарики огнём',art:'🏮',rounds:3,layout:'full',noMistakes:true,canvas:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.insertAdjacentHTML('beforeend','<div class="fi-sky"></div>');
  const x=gameCanvas();const fx=Particles();const dimg=imgObj('drak');
  const mode=LV(lv,['all','cake','count','color','order']);
  const dh=Math.min(176,bh*.58),dw=dh*RATIO.drak,DX=6,DY=bh-dh-2;const mouth=()=>({x:DX+dw*.66+lunge*8,y:DY+dh*.37});
  let T=[],N=0,want=null,next=1,got=0,done=false,lastSay=0,lunge=0,flames=[],streams=[],doneT=0,fw=0;
  const sky=[...Array(46)].map(()=>({x:Math.random()*bw,y:Math.random()*bh*.62,r:.6+Math.random()*1.3,p:Math.random()*6}));
  if(mode==='cake'){const cx=bw*.6,cy=bh*.62,w=Math.min(250,bw*.34);T=[...Array(5)].map((_,i)=>({x:cx-w*.36+i*w*.18,y:cy-74,cake:1,col:LANT[i%4],ph:i}));T.cake={cx,cy,w}}
  else{const k=LV(lv,[4,0,6,7,5]);const x0=bw*.3,x1=bw*.97;let cols;
   if(mode==='color'){want=LANT[(GS.step+(GS.fireC??(GS.fireC=rnd(4))))%4];const others=LANT.filter(l=>l!==want);cols=shuffle([want,want,want,...[...Array(k-3)].map(()=>pick(others))])}
   else cols=[...Array(k)].map(()=>pick(LANT));
   const nums=mode==='order'?shuffle([1,2,3,4,5]):[];
   T=cols.map((col,i)=>{const px=x0+(x1-x0)*(i+.5)/k,sy=14+Math.sin(Math.PI*(i+.5)/k)*26;return{x:px,sy,len:26+rnd(lv===5?70:46),col,n:nums[i],ph:Math.random()*6,sw:lv===5?.2:.07}})}
  if(mode==='count')N=2+((GS.step+lv)%3);
  const pos=(o,t)=>{if(o.cake)return{x:o.x,y:o.y};const a=Math.sin(t*1.4+o.ph)*o.sw;return{x:o.x+Math.sin(a)*(o.len+22),y:o.sy+Math.cos(a)*(o.len+22),a}};
  const good=o=>!o.lit&&(mode==='color'?o.col===want:mode==='order'?o.n===next:true);
  const intro=mode==='all'?'Стало темно! Зажги все фонарики. Нажимай на них!':mode==='cake'?'У нас праздник! Зажги все свечки на торте.':mode==='count'?`Зажги ${numAcc(N,'m')} ${plural(N,['фонарик','фонарика','фонариков'])}!`:mode==='color'?`Зажги только ${want.pl} фонарики!`:'Зажигай фонарики по порядку: один, два, три, четыре, пять!';
  const short=mode==='all'?'Зажги все фонарики!':mode==='cake'?'Зажги свечки!':mode==='count'?`Зажги ${N} 🏮`:mode==='color'?`Только ${want.pl}!`:'По порядку: 1, 2, 3, 4, 5!';
  taskBubble(short,mode==='cake'?bw*.24:bw*.3,mode==='cake'?12:bh-64,200,'t-left');
  c.say((GS.step===0&&lv<=2?'Дракоша умеет дышать огнём! ':'')+intro,short);
  let fing=null;if(lv===1&&GS.step===0){const p=pos(T[1],0);fing=el('div','finger emo','👆');fing.style.left=(p.x-6)+'px';fing.style.top=(p.y+14)+'px';board.appendChild(fing)}
  const need=mode==='all'||mode==='cake'?T.length:mode==='count'?N:mode==='color'?T.filter(o=>o.col===want).length:5;
  const cnt=el('div','fl-count fi-cnt');board.appendChild(cnt);
  const renderCnt=()=>{cnt.innerHTML='';for(let i=0;i<need;i++){const s=el('i',i<got?'on':'',mode==='order'?String(i+1):'');cnt.appendChild(s)}};renderCnt();
  GS.dbg=()=>{const t=performance.now()/1000;return T.map(o=>{const p=pos(o,t);return{x:p.x,y:p.y,good:good(o),lit:!!o.lit}})};
  const say2=(t,ms=2200)=>{if(performance.now()-lastSay>ms){lastSay=performance.now();say(t)}};
  board.onpointerdown=e=>{if(done)return;audio();if(fing){fing.remove();fing=null}const p=toLocal(e,board),t=performance.now()/1000;
   let best=null,bd=1e9;for(const o of T){if(o.lit||o.busy)continue;const q=pos(o,t);const d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best=o}}
   if(!best||bd>(best.cake?30:40))return;best.busy=true;lunge=1;streams.push({o:best,t:0,hit:false});
   tone(180,0,.3,'sawtooth',.04);tone(120,.05,.35,'sawtooth',.035);for(let i=0;i<5;i++)tone(900+Math.random()*900,i*.04,.05,'square',.012)};
  function arrive(o,t){o.busy=false;const ok=good(o);const p=pos(o,t);
   if(!ok){GS.mistakes++;sfx.bad();buzz([25,40,25]);for(let i=0;i<10;i++)flames.push({x:p.x,y:p.y,vx:(Math.random()-.5)*60,vy:-40-Math.random()*50,t:0,life:.9,r:8+Math.random()*8,smoke:1});
    say2(mode==='color'?`Это ${o.col.a} фонарик! Зажигай ${want.pl}.`:`Нет! Сейчас нужна цифра ${COUNTW[next].toLowerCase()}.`);return}
   o.lit=true;o.litT=t;got++;renderCnt();const s=cnt.children[got-1];if(s){s.classList.remove('pop');void s.offsetWidth;s.classList.add('pop')}
   fx.burst(p.x,p.y,14,['#FFD34D','#FF8A5C','#FFF1A8']);tone(880,0,.1,'triangle',.08);tone(1320,.06,.14,'triangle',.06);buzz(15);
   if(mode==='order'){say(COUNTW[o.n]+'!');next++}else if(mode==='count')say(COUNTW[got]+'!');
   if(got>=need){done=true;doneT=t;c.success(mode==='all'?'Ура! Как светло и красиво!':mode==='cake'?'Ура! Все свечки горят! Загадай желание!':mode==='count'?'Ура! Правильно!':mode==='color'?`Ура! Все ${want.pl} фонарики горят!`:'Ура! Один, два, три, четыре, пять!',2800,null)}}
  const lanternDraw=(o,t)=>{const p=pos(o,t),lit=o.lit,C=o.col;
   if(!o.cake){x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=1.5;x.beginPath();x.moveTo(o.x,o.sy);x.lineTo(p.x-Math.sin(p.a||0)*22,p.y-Math.cos(p.a||0)*22);x.stroke()}
   if(lit){const k=Math.min(1,(t-o.litT)*3);const g=x.createRadialGradient(p.x,p.y,4,p.x,p.y,o.cake?46:70);g.addColorStop(0,`rgba(255,214,110,${.55*k})`);g.addColorStop(1,'rgba(255,214,110,0)');x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,o.cake?46:70,0,7);x.fill()}
   x.save();x.translate(p.x,p.y);x.rotate(p.a||0);
   if(o.cake){x.fillStyle=o.col.c;rrect(x,-5,0,10,34,3);x.fill();x.fillStyle='rgba(255,255,255,.6)';for(let k=0;k<3;k++){x.fillRect(-5,4+k*11,10,4)}x.strokeStyle='#5B4A3A';x.lineWidth=2;x.beginPath();x.moveTo(0,0);x.lineTo(0,-6);x.stroke()}
   else{x.fillStyle='#4B3B6B';rrect(x,-9,-26,18,7,3);x.fill();rrect(x,-8,19,16,6,3);x.fill();
    x.fillStyle=lit?C.c:C.d;x.globalAlpha=lit?1:.75;x.beginPath();x.ellipse(0,0,19,21,0,0,7);x.fill();x.globalAlpha=1;
    if(lit){const g=x.createRadialGradient(0,2,2,0,0,20);g.addColorStop(0,'rgba(255,245,190,.95)');g.addColorStop(1,'rgba(255,245,190,0)');x.fillStyle=g;x.beginPath();x.ellipse(0,0,19,21,0,0,7);x.fill()}
    x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=1.5;for(const k of [-9,0,9]){x.beginPath();x.ellipse(0,0,Math.abs(k)*1.1+2,20,0,0,7);x.stroke()}
    if(o.n){x.fillStyle='#fff';x.font='900 20px Rubik, Nunito, sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(String(o.n),0,1)}}
   x.restore();
   if(lit){const fy=o.cake?p.y-8:p.y+2,fl=1+Math.sin(t*18+o.ph)*.12;x.save();x.translate(p.x,fy);x.scale(fl,1/fl);x.fillStyle='#FF8A2A';x.beginPath();x.ellipse(0,0,o.cake?5:6,o.cake?10:9,0,0,7);x.fill();x.fillStyle='#FFE27A';x.beginPath();x.ellipse(0,2,3,5.5,0,0,7);x.fill();x.restore()}};
  gameLoop((dt,t)=>{lunge=Math.max(0,lunge-dt*3);
   // fire streams from the mouth
   for(const s of streams){s.t+=dt;const m=mouth(),q=pos(s.o,t),pr=Math.min(1,s.t/.3);const cx=(m.x+q.x)/2,cy=Math.min(m.y,q.y)-40;
    if(s.t<.42)for(let i=0;i<4;i++){const u=Math.max(0,pr-Math.random()*.25),ix=(1-u)*(1-u)*m.x+2*(1-u)*u*cx+u*u*q.x,iy=(1-u)*(1-u)*m.y+2*(1-u)*u*cy+u*u*q.y;flames.push({x:ix,y:iy,vx:(Math.random()-.5)*50,vy:-30-Math.random()*40,t:0,life:.28+Math.random()*.2,r:5+Math.random()*7*(1-u*.4)})}
    if(pr>=1&&!s.hit){s.hit=true;arrive(s.o,t)}}
   streams=streams.filter(s=>s.t<.5);
   if(done&&t-doneT>.4&&fw<6&&Math.random()<dt*5){fw++;fx.burst(bw*(.3+Math.random()*.65),bh*(.12+Math.random()*.35),26,['#FFD34D','#FF8A5C','#7FD1FF','#F49AE0','#9BE36B'])}
   // draw
   x.clearRect(0,0,bw,bh);const lit=T.filter(o=>o.lit).length/T.length;
   for(const s of sky){x.globalAlpha=(.35+.65*Math.abs(Math.sin(t*1.3+s.p)))*(1-lit*.5);x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()}x.globalAlpha=1;
   {const mx=T.cake?bw*.88:bw*.2;x.fillStyle='#FFF4C4';x.beginPath();x.arc(mx,40,18,0,7);x.fill();x.fillStyle='#262063';x.beginPath();x.arc(mx+8,35,16,0,7);x.fill()}
   for(let L=0;L<2;L++){x.fillStyle=L?'#2B2766':'#211D52';x.beginPath();x.moveTo(0,bh);for(let px=0;px<=bw+20;px+=20)x.lineTo(px,bh-(L?20:38)-Math.sin((px+L*90)/(L?80:130))*(L?8:14));x.lineTo(bw,bh);x.closePath();x.fill()}
   if(!T.cake){x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=2;x.beginPath();for(let i=0;i<=30;i++){const px=bw*.27+(bw*.73)*i/30;const py=10+Math.sin(Math.PI*(px-bw*.27)/(bw*.73))*28;i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke()}
   else{const {cx,cy,w}=T.cake;x.fillStyle='#EDE7F6';x.beginPath();x.ellipse(cx,cy+60,w*.62,14,0,0,7);x.fill();
    x.fillStyle='#F6A5C0';rrect(x,cx-w*.5,cy,w,58,14);x.fill();x.fillStyle='#FDE3EC';rrect(x,cx-w*.4,cy-40,w*.8,46,12);x.fill();
    x.fillStyle='#fff';x.beginPath();x.moveTo(cx-w*.5,cy+6);for(let i=0;i<=8;i++){const px=cx-w*.5+w*i/8;x.lineTo(px,cy+(i%2?18:6))}x.lineTo(cx+w*.5,cy);x.lineTo(cx-w*.5,cy);x.fill();
    for(let i=0;i<7;i++){x.fillStyle=['#FF8A5C','#7FD1FF','#9BE36B','#FFD34D'][i%4];x.beginPath();x.arc(cx-w*.33+i*w*.11,cy+36,3.5,0,7);x.fill()}}
   for(const o of T)lanternDraw(o,t);
   // dragon
   if(dimg.complete){x.save();x.translate(DX+dw/2,DY+dh);x.rotate(-lunge*.06);x.scale(1+lunge*.04,1-lunge*.02);x.drawImage(dimg,-dw/2,-dh,dw,dh);x.restore()}
   if(lit<1){x.fillStyle=`rgba(10,8,40,${.18*(1-lit)})`;x.fillRect(0,0,bw,bh)}
   x.globalCompositeOperation='lighter';
   for(let i=flames.length-1;i>=0;i--){const f=flames[i];f.t+=dt;if(f.t>f.life){flames.splice(i,1);continue}f.x+=f.vx*dt;f.y+=f.vy*dt;const k=f.t/f.life;
    if(f.smoke){x.globalCompositeOperation='source-over';x.fillStyle=`rgba(170,165,190,${.5*(1-k)})`;x.beginPath();x.arc(f.x,f.y,f.r*(1+k),0,7);x.fill();x.globalCompositeOperation='lighter';continue}
    x.fillStyle=k<.25?`rgba(255,214,110,${.6*(1-k)})`:k<.6?`rgba(255,128,32,${.55*(1-k)})`:`rgba(220,60,30,${.5*(1-k)})`;x.beginPath();x.arc(f.x,f.y,f.r*(1-k*.5),0,7);x.fill()}
   x.globalCompositeOperation='source-over';fx.draw(x,dt)});
 }};

/* --- 20. Mail: разложи письма по почтовым ящикам --- */
const ML_COLS=[{k:'red',c:'#F2584B',d:'#C93A2C'},{k:'blue',c:'#4FA3F7',d:'#2F7FD0'},{k:'yellow',c:'#FFC233',d:'#D99A0F'},{k:'green',c:'#5BC46E',d:'#36994A'}];
const ML_FRIENDS={nyam:{e:['🥕','🍎','🍌','🍪','🧀','🍓'],bad:'Это еда! Еду любит Ням.'},shusha:{e:['🧸','⚽','🪀','🎈','🪁','🧩'],bad:'Это игрушка! Игрушки любит Шуша.'},poch:{e:['📚','🔭','🌍','📖','🔬','❓'],bad:'Это книжка! Книжки любит Почемучка.'}};
function envSvg(fill,stamp){return `<svg viewBox="0 0 76 54"><rect x="2" y="2" width="72" height="50" rx="7" fill="${fill}" stroke="rgba(45,24,86,.18)" stroke-width="2"/><path d="M4 6L38 30L72 6" fill="none" stroke="rgba(45,24,86,.22)" stroke-width="2.5" stroke-linejoin="round"/>${stamp||''}</svg>`}
const stampBox=(inner,x=52,y=8,w=18,h=20)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#fff" stroke="#E58A9E" stroke-width="1.6" stroke-dasharray="2 1.5"/>${inner||''}`;
GAMES.mail={host:'drak',name:'Почта',sub:'Разложи письма по ящикам',art:'📮',rounds:2,layout:'host',noMistakes:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.appendChild(el('div','ml-bg'));
  const mode=LV(lv,['color','shape','friend','count','count']);let boxes=[],letters=[];
  if(mode==='color'){boxes=sample(ML_COLS,3).map(col=>({key:col.k,col}));letters=shuffle([...boxes,...boxes]).map(b=>({key:b.key,svg:envSvg(b.col.c)}))}
  else if(mode==='shape'){const ks=sample(['circle','square','triangle','star','heart'],4);boxes=ks.map(k=>({key:k,shape:k}));const ls=shuffle([...ks,...sample(ks,2)]);
   letters=ls.map(k=>({key:k,svg:envSvg('#FFF8EC',`<g transform="translate(46 12) scale(.42)">${sh(k,'#7A5BC4')}</g>`)}))}
  else if(mode==='friend'){boxes=['nyam','shusha','poch'].map(k=>({key:k,friend:k}));const ls=shuffle(['nyam','nyam','shusha','shusha','poch','poch']);const used={};
   letters=ls.map(k=>{const pool=ML_FRIENDS[k].e.filter(e=>!(used[k]||[]).includes(e));const e=pick(pool);(used[k]=used[k]||[]).push(e);return{key:k,emo:e,svg:envSvg('#FFF8EC',stampBox('',46,6,26,28))}})}
  else{const M=lv===4?3:5;boxes=[...Array(M)].map((_,i)=>({key:i+1,num:i+1}));const vals=lv===4?shuffle([1,2,3,1,2,3]):shuffle([...sample([1,2,3,4,5],4),...sample([1,2,3,4,5],2)]);
   const SC=['#F2584B','#4FA3F7','#5BC46E','#FFC233','#B98AF0'];letters=vals.map(v=>{let st='';const w=12.5,g=2.4,x0=38-(v*w+(v-1)*g)/2;for(let i=0;i<v;i++){const sx=x0+i*(w+g);st+=`<rect x="${sx.toFixed(1)}" y="20" width="${w}" height="15" rx="2" fill="${SC[i]}" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 1.4"/><circle cx="${(sx+w/2).toFixed(1)}" cy="27.5" r="2.6" fill="#fff"/>`}return{key:v,svg:envSvg('#FFF8EC',st)}})}
  const nb=boxes.length,BW=Math.min(96,bw/(nb+1)*.92),BH=BW*1.2;
  boxes.forEach((b,i)=>{b.x=bw*(i+1)/(nb+1);b.y=10+BH/2;const e=el('div','ml-box');e.style.cssText=`left:${b.x-BW/2}px;top:10px;width:${BW}px;height:${BH}px`;
   const body=b.col?b.col.c:'#7A5BC4',dark=b.col?b.col.d:'#5A3FA0';
   let badge='';if(b.shape)badge=`<svg viewBox="-4 -4 72 72">${sh(b.shape,'#7A5BC4')}</svg>`;else if(b.friend)badge=`<img src="${IMG[b.friend]}" alt="">`;else if(b.num)badge=`<b>${b.num}</b>`;
   e.innerHTML=`<svg class="mb" viewBox="0 0 100 120"><rect x="44" y="70" width="12" height="50" fill="#9A6A3E"/><path d="M8 40Q8 8 50 8Q92 8 92 40V84H8Z" fill="${body}"/><path d="M8 40Q8 8 50 8Q92 8 92 40" fill="none" stroke="${dark}" stroke-width="4"/><rect x="28" y="28" width="44" height="8" rx="4" fill="#2D1856" opacity=".75"/><g class="flag"><rect x="88" y="34" width="5" height="30" fill="#8E89A3"/><rect x="88" y="34" width="16" height="11" rx="2" fill="#FF6B5B"/></g></svg><div class="badge${b.friend?' fr':''}">${badge}</div>`;
   board.appendChild(e);b.e=e});
  const LW=lv>=4?84:70,LH=LW*54/76,nl=letters.length,ly=bh-LH/2-14;
  letters.forEach((l,i)=>{l.hx=bw*(i+1)/(nl+1)+(Math.random()-.5)*10;l.hy=ly-(i%2)*Math.min(26,bh-BH-LH-60);l.rot=(Math.random()-.5)*16;const e=el('div','ml-letter');e.innerHTML=l.svg+(l.emo?`<span class="emo st">${l.emo}</span>`:'');
   e.style.cssText=`left:${l.hx}px;top:${l.hy}px;width:${LW}px;height:${LH}px;margin:${-LH/2}px 0 0 ${-LW/2}px;transform:rotate(${l.rot}deg)`;board.appendChild(e);l.e=e;
   dragItem(e,{can:()=>!l.used&&!done,start:()=>{if(fing){fing.remove();fing=null}e.style.transform='none'},drop:(p)=>drop(l,p)})});
  let done=false,put=0,lastSay=0;
  const home=l=>{l.e.style.left=l.hx+'px';l.e.style.top=l.hy+'px';l.e.style.transform=`rotate(${l.rot}deg)`};
  function drop(l,p){let b=null,bd=1e9;if(p.y<10+BH+30)for(const q of boxes){const d=Math.abs(p.x-q.x);if(d<bd&&d<BW*.75){bd=d;b=q}}
   if(!b){home(l);return}
   if(b.key!==l.key){GS.mistakes++;sfx.bad();buzz([30,50,30]);shake(b.e);hop(GS.hostMon,'sad');home(l);
    const why=mode==='color'?'Не тот цвет! Найди ящик такого же цвета.':mode==='shape'?'Не та фигура! Посмотри на марку.':mode==='friend'?ML_FRIENDS[l.key].bad:'Посчитай марки ещё раз!';
    if(performance.now()-lastSay>1200){lastSay=performance.now();say(why)}return}
   l.used=true;l.e.classList.add('in');l.e.style.left=b.x+'px';l.e.style.top=(10+BH*.27)+'px';b.e.classList.remove('got');void b.e.offsetWidth;b.e.classList.add('got');sfx.pop();tone(990,.1,.1,'triangle',.07);
   setTimeout(()=>l.e.remove(),500);put++;
   if(mode==='count')say(COUNTW[l.key]+'!');
   if(put>=letters.length){done=true;c.later(()=>{boardBurst(bw/2,BH/2);c.success(pick(['Все письма в ящиках! Спасибо!','Ура! Почта разнесена!']),2200)},500)}}
  GS.dbg=()=>letters.filter(l=>!l.used).map(l=>{const b=boxes.find(b=>b.key===l.key);return{mx:l.hx,my:l.hy,tx:b.x,ty:10+BH/2}});
  let fing=null;if(lv===1&&GS.step===0){const l=letters[0],b=boxes.find(b=>b.key===l.key);fing=el('div','finger emo cnt-hint','👆');fing.style.left=l.hx+'px';fing.style.top=l.hy+'px';fing.style.setProperty('--dx',(b.x-l.hx)+'px');fing.style.setProperty('--dy',(10+BH/2-l.hy)+'px');board.appendChild(fing)}
  const intro=mode==='color'?'Положи каждое письмо в ящик такого же цвета.':mode==='shape'?'Посмотри на марку и положи письмо в ящик с такой же фигурой.':mode==='friend'?'Разнеси письма друзьям! Еду — Няму, игрушки — Шуше, книжки — Почемучке.':'Посчитай марки на письме и положи его в ящик с такой же цифрой!';
  c.say((GS.step===0?'Дракоша принёс письма! ':'')+intro,mode==='color'?'Письма — по цвету!':mode==='shape'?'Смотри на марку!':mode==='friend'?'Кому письмо?':'Посчитай марки!');
 }};

/* --- 21. Dots: соедини точки по порядку — получится картинка --- */
const DOT_PICS={
 kite:{got:'Получился воздушный змей!',c:'#FF8A5C',p:[[50,6],[86,40],[50,94],[14,40]],deco:'<path d="M50 6V94M14 40H86" stroke="#fff" stroke-width="3" opacity=".8"/><path d="M50 94q-8 6 0 10t0 10" stroke="#7A5BC4" stroke-width="2.5" fill="none"/>'},
 boat:{got:'Получилась лодочка!',c:'#4FA3F7',p:[[6,56],[94,56],[76,84],[24,84]],deco:'<path d="M50 54V10L80 50Z" fill="#fff" stroke="#E2D8F0" stroke-width="2"/><path d="M50 54V10" stroke="#9A6A3E" stroke-width="3"/>'},
 house:{got:'Получился домик!',c:'#F2584B',p:[[20,92],[80,92],[80,48],[50,16],[20,48]],deco:'<rect x="42" y="64" width="16" height="28" rx="3" fill="#9A6A3E"/><rect x="26" y="54" width="12" height="12" rx="2" fill="#FFE08A"/><rect x="62" y="54" width="12" height="12" rx="2" fill="#FFE08A"/>'},
 tree:{got:'Получилась ёлочка!',c:'#5BC46E',p:[[50,6],[76,44],[62,44],[86,82],[14,82],[38,44],[24,44]],deco:'<rect x="44" y="82" width="12" height="14" fill="#9A6A3E"/><circle cx="44" cy="58" r="4" fill="#F2584B"/><circle cx="60" cy="70" r="4" fill="#FFC233"/><circle cx="52" cy="34" r="3.5" fill="#4FA3F7"/><circle cx="34" cy="74" r="4" fill="#F49AE0"/>'},
 crown:{got:'Получилась корона!',c:'#FFC233',p:[[10,84],[10,30],[30,56],[50,16],[70,56],[90,30],[90,84]],deco:'<circle cx="30" cy="72" r="5" fill="#F2584B"/><circle cx="50" cy="70" r="6" fill="#4FA3F7"/><circle cx="70" cy="72" r="5" fill="#5BC46E"/>'},
 fish:{got:'Получилась рыбка!',c:'#FF9A3C',p:[[94,50],[64,22],[32,40],[8,20],[8,80],[32,60],[64,78]],deco:'<circle cx="72" cy="44" r="5" fill="#fff"/><circle cx="73" cy="44" r="2.5" fill="#2D1856"/><path d="M52 34q8 16 0 32" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>'},
 heart:{got:'Получилось сердечко!',c:'#F2584B',p:[[50,30],[66,14],[86,18],[94,38],[50,90],[6,38],[14,18],[34,14]],deco:'<path d="M26 30q-8 8-4 18" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>'},
 moon:{got:'Получился месяц!',c:'#FFD34D',p:[[58,6],[24,18],[8,52],[28,86],[66,90],[46,70],[38,46],[48,22]],deco:'<circle cx="30" cy="54" r="3" fill="#2D1856"/><path d="M28 64q5 4 10 0" stroke="#2D1856" stroke-width="2.5" fill="none" stroke-linecap="round"/>'},
 mushroom:{got:'Получился грибок!',c:'#F2584B',p:[[8,52],[20,24],[50,10],[80,24],[92,52],[62,52],[62,92],[38,92],[38,52]],deco:'<rect x="38" y="52" width="24" height="40" fill="#FFF3E2"/><circle cx="34" cy="32" r="6" fill="#fff"/><circle cx="58" cy="24" r="5" fill="#fff"/><circle cx="72" cy="40" r="5" fill="#fff"/>'},
 rocket:{got:'Получилась ракета!',c:'#B9A6E8',p:[[50,4],[64,22],[66,62],[82,88],[60,80],[40,80],[18,88],[34,62],[36,22]],deco:'<circle cx="50" cy="40" r="8" fill="#7FD1FF" stroke="#fff" stroke-width="3"/><path d="M42 82q8 18 16 0" fill="#FF8A2A"/>'},
 car:{got:'Получилась машинка!',c:'#F2584B',p:[[6,72],[6,52],[22,48],[34,26],[66,26],[80,48],[94,52],[94,72]],deco:'<path d="M38 32H49V47H28ZM53 32H63L73 47H53Z" fill="#CDEBFF"/><circle cx="26" cy="74" r="11" fill="#3A3446"/><circle cx="26" cy="74" r="4.5" fill="#C5BACF"/><circle cx="74" cy="74" r="11" fill="#3A3446"/><circle cx="74" cy="74" r="4.5" fill="#C5BACF"/><rect x="86" y="56" width="7" height="6" rx="2" fill="#FFE08A"/>'},
 star:{got:'Получилась звезда!',c:'#FFC233',p:[...Array(10)].map((_,i)=>{const r=i%2?20:46,a=-Math.PI/2+i*Math.PI/5;return[Math.round(50+Math.cos(a)*r),Math.round(53+Math.sin(a)*r)]}),deco:'<circle cx="43" cy="50" r="3" fill="#2D1856"/><circle cx="57" cy="50" r="3" fill="#2D1856"/><path d="M44 60q6 5 12 0" stroke="#2D1856" stroke-width="2.5" fill="none" stroke-linecap="round"/>'},
 butterfly:{got:'Получилась бабочка!',c:'#F49AE0',p:[[50,34],[78,8],[94,30],[72,50],[88,82],[50,64],[12,82],[28,50],[6,30],[22,8]],deco:'<ellipse cx="50" cy="52" rx="4" ry="22" fill="#5A3FA0"/><path d="M48 32q-6-12-12-14M52 32q6-12 12-14" stroke="#5A3FA0" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="74" cy="28" r="6" fill="#fff" opacity=".7"/><circle cx="26" cy="28" r="6" fill="#fff" opacity=".7"/>'}};
const DOT_LV={1:['kite','boat','house'],2:['tree','crown','fish'],3:['heart','moon','crown'],4:['mushroom','rocket','car'],5:['star','butterfly','rocket']};
GAMES.dots={host:'drak',name:'Точки',sub:'Соедини точки по порядку',art:'✏️',rounds:3,layout:'full',noMistakes:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.appendChild(el('div','dt-bg'));
  if(!GS.dotPool||GS.dotLv!==lv){GS.dotPool=shuffle(DOT_LV[lv]||DOT_LV[5]);GS.dotLv=lv}const key=GS.dotPool[GS.step%GS.dotPool.length],P=DOT_PICS[key];
  const S=Math.min(bh-28,290),ox=Math.max(170,bw*.56-S/2),oy=(bh-S)/2,X=v=>ox+v[0]*S/100,Y=v=>oy+v[1]*S/100;
  const pts=P.p.map(v=>({x:X(v),y:Y(v)})),N=pts.length;
  const dh=Math.min(150,bh*.5),dw=dh*RATIO.drak;const dr=monImg('drak',dh);dr.style.left='10px';dr.style.bottom='4px';dr.style.top='auto';dr.style.zIndex=4;board.appendChild(dr);GS.hostMon=dr;
  const poly=pts.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  board.insertAdjacentHTML('beforeend',`<svg class="dt-svg" width="${bw}" height="${bh}" viewBox="0 0 ${bw} ${bh}">${lv<=2?`<polygon points="${poly}" fill="none" stroke="#D9CCEB" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>`:''}<g class="pic" style="opacity:0"><polygon points="${poly}" fill="${P.c}" stroke="${P.c}" stroke-width="6" stroke-linejoin="round"/><g transform="translate(${ox} ${oy}) scale(${S/100})">${P.deco}</g></g><polyline class="ln" points="" fill="none" stroke="#7A5BC4" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><line class="rb" x1="0" y1="0" x2="0" y2="0" stroke="#B9A6E8" stroke-width="4" stroke-dasharray="3 8" stroke-linecap="round" opacity="0"/></svg>`);
  const svg=board.querySelector('.dt-svg'),ln=svg.querySelector('.ln'),rb=svg.querySelector('.rb'),pic=svg.querySelector('.pic');
  const dots=pts.map((p,i)=>{const d=el('div','dt-dot',String(i+1));d.style.left=p.x+'px';d.style.top=p.y+'px';board.appendChild(d);return d});
  let cur=0,done=false,down=false,lastSay=0,wrong=0;const hl=lv<=3;
  const mark=()=>{dots.forEach((d,i)=>{d.classList.toggle('on',i<cur);d.classList.toggle('next',i===cur&&hl)});ln.setAttribute('points',pts.slice(0,cur).map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '))};mark();
  const intro=lv===1&&GS.step===0?'Веди пальцем от точки к точке: один, два, три! Что получится?':'Соедини точки по порядку! Что получится?';
  taskBubble('Соедини точки: 1, 2, 3…',8,10,150,'t-down');
  c.say(intro,'Соедини точки: 1, 2, 3…');
  let fing=null;if(lv===1&&GS.step===0){fing=el('div','finger emo','👆');fing.style.left=(pts[0].x-8)+'px';fing.style.top=(pts[0].y+8)+'px';board.appendChild(fing)}
  GS.dbg=()=>({cur,N,pts});
  const hit=(p,i)=>Math.hypot(p.x-pts[i].x,p.y-pts[i].y)<26;
  const connect=()=>{cur++;mark();const d=dots[cur-1];d.classList.remove('pop');void d.offsetWidth;d.classList.add('pop');tone(500+cur*60,0,.1,'triangle',.08);say(COUNTW[cur]+'!');if(cur>=N)finish()};
  const wrongDot=i=>{wrong++;GS.mistakes++;sfx.bad();shake(dots[i]);if(performance.now()-lastSay>1500){lastSay=performance.now();say(`Нет! Сейчас нужна цифра ${COUNTW[cur+1].toLowerCase()}.`)}if(wrong>=2)dots[cur].classList.add('next')};
  board.onpointerdown=e=>{if(done)return;audio();const p=toLocal(e,board);if(fing){fing.remove();fing=null}
   if(hit(p,cur)){connect();down=true}else{const i=pts.findIndex((_,k)=>k>cur&&hit(p,k));if(i>=0)wrongDot(i);else if(cur>0&&hit(p,cur-1))down=true}
   if(down)try{board.setPointerCapture(e.pointerId)}catch(_){}};
  board.onpointermove=e=>{if(!down||done)return;const p=toLocal(e,board);if(hit(p,cur))connect();
   if(!done&&cur>0){const a=pts[cur-1];rb.setAttribute('x1',a.x);rb.setAttribute('y1',a.y);rb.setAttribute('x2',p.x);rb.setAttribute('y2',p.y);rb.setAttribute('opacity',1)}};
  board.onpointerup=board.onpointercancel=()=>{down=false;rb.setAttribute('opacity',0)};
  function finish(){done=true;down=false;rb.setAttribute('opacity',0);ln.setAttribute('points',[...pts,pts[0]].map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '));
   // Дракоша облетает картинку
   const fly=monImg('drak',46,'dt-fly');board.appendChild(fly);let i=0;const fw=46*RATIO.drak;
   const stepF=()=>{if(!GS||GS.g!==GAMES.dots)return;if(i>N){fly.remove();pic.style.transition='opacity .6s';pic.style.opacity=1;dots.forEach(d=>d.classList.add('fade'));sfx.win();boardBurst(ox+S/2,oy+S/2);c.success(P.got,2600,dr);return}
    const p=pts[i%N];fly.style.left=(p.x-fw/2)+'px';fly.style.top=(p.y-40)+'px';sfx.step();i++;setTimeout(stepF,Math.max(140,1300/N))};
   fly.style.left=(pts[0].x-fw/2)+'px';fly.style.top=(pts[0].y-40)+'px';setTimeout(stepF,250)}
 }};
