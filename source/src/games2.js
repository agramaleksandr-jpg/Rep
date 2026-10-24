/* ================= v4: canvas games (Кидалка, Полёт) + effects ================= */
const IMGO={};
function imgObj(k){if(!IMGO[k]){const i=new Image();i.src=IMG[k];IMGO[k]=i}return IMGO[k]}
function gameCanvas(){const bw=board.clientWidth,bh=board.clientHeight;const cv=el('canvas','gcv');const dpr=Math.min(2,window.devicePixelRatio||1)*K;
 cv.width=Math.round(bw*dpr);cv.height=Math.round(bh*dpr);cv.style.cssText=`position:absolute;left:0;top:0;width:${bw}px;height:${bh}px;z-index:2`;board.appendChild(cv);
 const x=cv.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);return x}
// runs fn(dt seconds, time) every frame while this round of this game is on screen
function gameLoop(fn){const g=GS,r=GS.round;let last=performance.now();
 const step=t=>{if(!GS||GS!==g||GS.round!==r||$('#scr-game').hidden)return;const dt=Math.min(.05,(t-last)/1000);last=t;fn(dt,t/1000);requestAnimationFrame(step)};requestAnimationFrame(step)}
function starPath(x,cx,cy,R,r,n=5,rot=-Math.PI/2){x.beginPath();for(let i=0;i<n*2;i++){const rr=i%2?r:R,a=rot+i*Math.PI/n;x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.closePath()}
function Particles(){const P=[];return{
 burst(px,py,n=16,cols=['#FFD34D','#FF8A5C','#7FD1FF','#9BE36B','#F49AE0']){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=70+Math.random()*170;P.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s-80,life:.6+Math.random()*.5,t:0,c:pick(cols),r:3+Math.random()*4,star:Math.random()<.6,rot:Math.random()*6})}},
 draw(x,dt){for(let i=P.length-1;i>=0;i--){const p=P[i];p.t+=dt;if(p.t>p.life){P.splice(i,1);continue}p.vy+=430*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=dt*6;
  x.globalAlpha=Math.max(0,1-p.t/p.life);x.fillStyle=p.c;if(p.star)starPath(x,p.x,p.y,p.r*1.7,p.r*.75,5,p.rot);else{x.beginPath();x.arc(p.x,p.y,p.r,0,7)}x.fill()}x.globalAlpha=1}}}
function rrect(x,X,Y,w,h,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath()}

/* --- 11. Sling: Шуша throws a ball at towers with bowling pins (real physics) --- */
const SL_LAYOUTS={
 1:[{X:.62,o:[['crate',0,0],['pin',0,34]]},{X:.66,o:[['crate',0,0],['crate',0,34],['pin',0,68]]},{X:.7,o:[['crate',-18,0],['crate',18,0],['crate',0,34],['pin',0,68]]}],
 2:[{X:.66,o:[['crate',-44,0],['pin',-44,34],['crate',44,0],['crate',44,34],['pin',44,68]]},{X:.68,o:[['col',-34,0,62],['col',34,0,62],['plank',0,62,96],['pin',-22,74],['pin',22,74]]},{X:.7,o:[['crate',0,0],['crate',0,34],['pin',0,68],['pin',-62,0]]}],
 3:[{X:.68,o:[['col',-48,0,66],['col',48,0,66],['plank',0,66,124],['pin',-36,78],['pin',0,78],['pin',36,78]]},
    {X:.7,o:[['crate',-44,0],['crate',44,0],['plank',0,34,128],['crate',-22,46],['crate',22,46],['plank',0,80,96],['pin',0,92],['pin',-80,0],['pin',80,0]]},
    {X:.7,o:[['crate',-36,0],['crate',0,0],['crate',36,0],['crate',-18,34],['crate',18,34],['pin',0,68],['pin',-60,0],['pin',62,0]]}],
 4:[{X:.7,o:[['stone',-92,0,22,96],['crate',0,0],['pin',0,34],['pin',48,0]]},
    {X:.72,o:[['stone',0,0,30,96],['splat',0,96,124],['pin',-40,108],['pin',40,108],['crate',0,108],['pin',0,142]]},
    {X:.7,o:[['stone',-96,0,22,110],['col',-30,0,60],['col',40,0,60],['plank',5,60,100],['pin',-15,72],['pin',25,72],['pin',80,0]]}],
 5:[{X:.74,o:[['stone',-100,0,24,84],['crate',-40,0],['crate',-6,0],['crate',28,0],['plank',-6,34,110],['crate',-24,46],['crate',12,46],['pin',-6,80],['pin',-60,46],['pin',52,46]]},
    {X:.72,o:[['stone',-60,0,30,50],['splat',-60,50,90],['stone',50,0,30,90],['splat',50,90,90],['pin',-78,62],['pin',-42,62],['pin',50,102]]},
    {X:.74,o:[['crate',-54,0],['crate',-18,0],['crate',18,0],['crate',54,0],['plank',0,34,150],['col',-50,46,56],['col',50,46,56],['plank',0,102,124],['pin',-30,46],['pin',30,46],['pin',0,114]]}]};
GAMES.sling={host:'shusha',name:'Кидалка',sub:'Сбей кегли мячиком',art:'🎳',rounds:3,layout:'full',noMistakes:true,canvas:true,
 round(c,lv){
  const M=window.Matter;const bw=c.bw(),bh=c.bh();const GY=bh-22;
  board.insertAdjacentHTML('beforeend',`<div class="sl-sky"></div><div class="sl-hill" style="bottom:${bh-GY-4}px"></div><div class="sl-ground" style="top:${GY}px"></div>`);
  const shH=Math.min(150,bh*.47),shW=shH*RATIO.shusha;const sh=monImg('shusha',shH,'mon');sh.style.left='2px';sh.style.top=(GY-shH+8)+'px';sh.style.zIndex=3;board.appendChild(sh);GS.hostMon=sh;
  const x=gameCanvas();const fx=Particles();
  const AX=Math.round(shW+46),AY=GY-100,RMAX=74,P=.205,G_=1*.001*(1000/60)**2,BR=16;
  const eng=M.Engine.create({enableSleeping:true});const WD=eng.world;
  M.Composite.add(WD,M.Bodies.rectangle(bw/2,GY+40,bw*4,80,{isStatic:true,friction:.9,label:'ground'}));
  const L=SL_LAYOUTS[Math.min(5,lv)][Math.min(2,GS.step)];const X0=bw*L.X;const pins=[],parts=[];
  const add=(b,kind)=>{M.Composite.add(WD,b);parts.push({b,kind});if(!b.isStatic)M.Sleeping.set(b,true);return b};
  const S=1.15,CS=34*S,PW=16*S,PH=40*S,TH=12*S;
  for(let [k,dx,yb,a,b] of L.o){const cx=X0+dx*S;yb*=S;if(a)a*=S;if(b)b*=S;
   if(k==='crate')add(M.Bodies.rectangle(cx,GY-yb-CS/2,CS,CS,{density:.0011,friction:.7,chamfer:{radius:3}}),'crate');
   else if(k==='plank')add(M.Bodies.rectangle(cx,GY-yb-TH/2,a,TH,{density:.0011,friction:.7}),'plank');
   else if(k==='col')add(M.Bodies.rectangle(cx,GY-yb-a/2,TH,a,{density:.0011,friction:.7}),'plank');
   else if(k==='stone')add(M.Bodies.rectangle(cx,GY-yb-b/2,a,b,{isStatic:true,friction:.8}),'stone');
   else if(k==='splat')add(M.Bodies.rectangle(cx,GY-yb-TH/2,a,TH,{isStatic:true,friction:.8}),'stone');
   else if(k==='pin'){const q=add(M.Bodies.rectangle(cx,GY-yb-PH/2,PW,PH,{density:.0006,friction:.5,chamfer:{radius:6}}),'pin');pins.push({b:q,x0:q.position.x,y0:q.position.y,down:false,t:0})}}
  const total=pins.length;let downN=0,balls=LV(lv,[5,5,6,6,6]),state='ready',pull=null,ball=null,flyT=0,still=0,hitThrow=false,downThrow=0,lastThud=0,acc=0,ballFade=0;
  const ballsEl=el('div','sl-balls');board.appendChild(ballsEl);const renderBalls=()=>{ballsEl.innerHTML='';for(let i=0;i<balls-(state==='ready'||state==='aim'?1:0);i++)ballsEl.appendChild(el('i'))};renderBalls();
  const prevN=LV(lv,[66,60,50,44,40]);
  let fing=null;if(lv===1&&GS.step===0){fing=el('div','finger emo sl-drag','👆');fing.style.left=(AX-6)+'px';fing.style.top=(AY-4)+'px';board.appendChild(fing)}
  const intro=LV(lv,['Сбей кеглю мячиком!','Сбей все кегли!','Кегли стоят на столе. Сбей их все!','Кегли спрятались за стенкой. Бросай повыше!','Большая крепость! Сбей все кегли!']);
  const short=LV(lv,['Сбей кеглю!','Сбей все кегли!','Сбей все кегли!','Бросай повыше!','Сбей все кегли!']);taskBubble(short,Math.max(AX+40,bw*.3),12,190,'t-left');
  c.say((GS.step===0?'Тяни мячик назад и отпускай! ':'')+intro,short);
  M.Events.on(eng,'collisionStart',ev=>{for(const pr of ev.pairs){const a=pr.bodyA,b=pr.bodyB;if(ball&&(a===ball||b===ball)&&a.label!=='ground'&&b.label!=='ground'&&!hitThrow){hitThrow=true;for(const q of parts)if(!q.b.isStatic)M.Sleeping.set(q.b,false)}
   const rel=Math.hypot(a.velocity.x-b.velocity.x,a.velocity.y-b.velocity.y);const now=performance.now();if(rel>2.2&&now-lastThud>70&&ST.sound){lastThud=now;tone(130+Math.random()*90,0,.09,'triangle',Math.min(.16,.03+rel*.012))}}});
  GS.dbg=()=>({AX,AY,P,G:G_,R:RMAX,GY,state,balls,pins:pins.filter(p=>!p.down).map(p=>[p.b.position.x,p.b.position.y])});
  const clampPull=p=>{let dx=Math.min(8,p.x-AX),dy=p.y-AY;const l=Math.hypot(dx,dy);if(l>RMAX){dx*=RMAX/l;dy*=RMAX/l}return{x:AX+dx,y:Math.min(GY-BR,AY+dy)}};
  board.onpointerdown=e=>{if(state!=='ready'||GS.busy)return;audio();const p=toLocal(e,board);if(p.x>bw*.6)return;state='aim';pull=clampPull(p);if(fing){fing.remove();fing=null}try{board.setPointerCapture(e.pointerId)}catch(_){}};
  board.onpointermove=e=>{if(state==='aim')pull=clampPull(toLocal(e,board))};
  board.onpointerup=board.onpointercancel=()=>{if(state!=='aim')return;const dx=AX-pull.x,dy=AY-pull.y;if(Math.hypot(dx,dy)<14){state='ready';pull=null;return}
   ball=M.Bodies.circle(pull.x,pull.y,BR,{density:.006,restitution:.32,friction:.4,frictionAir:0,label:'ball'});M.Composite.add(WD,ball);M.Body.setVelocity(ball,{x:dx*P,y:dy*P});
   balls--;state='fly';flyT=0;still=0;hitThrow=false;downThrow=0;pull=null;renderBalls();hop(sh);
   if(ST.sound){const a=audio();if(a){const t=a.currentTime,o=a.createOscillator(),v=a.createGain();o.type='triangle';o.frequency.setValueAtTime(260,t);o.frequency.exponentialRampToValueAtTime(820,t+.16);v.gain.setValueAtTime(.12,t);v.gain.exponentialRampToValueAtTime(.001,t+.22);o.connect(v).connect(a.destination);o.start(t);o.stop(t+.25)}}};
  function endThrow(){if(ball){M.Composite.remove(WD,ball);ball=null}
   if(downN>=total)return;
   if(balls>0){state='ready';renderBalls();if(!downThrow)say(pick(['Мимо! Бросай ещё!','Почти! Ещё разок!','Чуть-чуть! Попробуй ещё!']))}
   else{state='over';c.mistake('Мячики кончились. Попробуем ещё раз!',sh);c.later(()=>nextRound(false),2400)}}
  gameLoop((dt,t)=>{
   acc+=dt*1000;let n=0;while(acc>=1000/60&&n<3){M.Engine.update(eng,1000/60);acc-=1000/60;n++}
   for(const p of pins){if(p.down){p.t+=dt;continue}const b=p.b;
    if(Math.abs(b.angle)>.6||b.position.y>p.y0+18||Math.abs(b.position.x-p.x0)>24||b.position.x>bw+30||b.position.x<-30){p.down=true;downN++;downThrow++;fx.burst(b.position.x,b.position.y-10,18);sfx.pop();
     setTimeout(()=>{try{M.Composite.remove(WD,b)}catch(e){}},650);
     if(downN>=total){state='won';c.success(pick(['Ура! Все кегли упали!','Бах-бабах! Молодец!','Отличный бросок!']),2400,sh)}
     else if(downThrow===1)say(pick(['Попал!','Бах!','Ух ты!']))}}
   if(state==='fly'&&ball){flyT+=dt;still=ball.speed<.3?still+dt:0;const q=ball.position;if(still>.7||flyT>6||q.x>bw+60||q.x<-60||q.y>bh+60)endThrow()}
   // ---- draw
   x.clearRect(0,0,bw,bh);
   if(state==='aim'&&pull){let px=pull.x,py=pull.y,vx=(AX-pull.x)*P,vy=(AY-pull.y)*P;x.fillStyle='#fff';
    for(let i=1;i<=prevN;i++){vy+=G_;px+=vx;py+=vy;if(py>GY)break;if(i%3===0){x.globalAlpha=Math.max(.15,1-i/prevN);x.beginPath();x.arc(px,py,4.2-i/prevN*2,0,7);x.fill();x.strokeStyle='rgba(91,42,134,.35)';x.lineWidth=1.2;x.stroke()}}x.globalAlpha=1}
   const bp=state==='aim'&&pull?pull:{x:AX,y:AY};const loaded=state==='ready'||state==='aim';
   // sling: post + back arm
   x.lineCap='round';x.strokeStyle='#8A4B24';x.lineWidth=9;x.beginPath();x.moveTo(AX,GY);x.lineTo(AX,AY+34);x.stroke();
   x.lineWidth=7;x.beginPath();x.moveTo(AX,AY+36);x.quadraticCurveTo(AX+4,AY+14,AX+16,AY-8);x.stroke();
   if(loaded){x.strokeStyle='#6B3AA0';x.lineWidth=4;x.beginPath();x.moveTo(AX+16,AY-8);x.lineTo(bp.x+4,bp.y);x.stroke()}
   for(const pt of parts){const b=pt.b;if(pt.kind==='pin'){const p=pins.find(z=>z.b===b);if(p&&p.down&&p.t>.6)continue;x.globalAlpha=p&&p.down?Math.max(0,1-p.t/.6):1}
    x.save();x.translate(b.position.x,b.position.y);x.rotate(b.angle);
    if(pt.kind==='crate'){rrect(x,-17,-17,34,34,4);x.fillStyle='#E9A866';x.fill();x.lineWidth=2.5;x.strokeStyle='#B9783A';x.stroke();x.beginPath();x.moveTo(-12,-12);x.lineTo(12,12);x.moveTo(12,-12);x.lineTo(-12,12);x.lineWidth=2;x.strokeStyle='rgba(155,95,40,.55)';x.stroke()}
    else if(pt.kind==='plank'){const v=b.vertices;x.restore();x.save();x.beginPath();x.moveTo(v[0].x,v[0].y);for(const q of v)x.lineTo(q.x,q.y);x.closePath();x.fillStyle='#D69557';x.fill();x.lineWidth=2;x.strokeStyle='#A8692F';x.stroke()}
    else if(pt.kind==='stone'){const v=b.vertices;x.restore();x.save();x.beginPath();x.moveTo(v[0].x,v[0].y);for(const q of v)x.lineTo(q.x,q.y);x.closePath();x.fillStyle='#BDB8CC';x.fill();x.lineWidth=3;x.strokeStyle='#8E89A3';x.stroke()}
    else{// bowling pin with a face
     x.scale(1.15,1.15);
     x.beginPath();x.moveTo(0,-20);x.bezierCurveTo(7,-20,7,-9,4,-6);x.bezierCurveTo(10,0,9,16,5,20);x.lineTo(-5,20);x.bezierCurveTo(-9,16,-10,0,-4,-6);x.bezierCurveTo(-7,-9,-7,-20,0,-20);x.closePath();
     x.fillStyle='#fff';x.fill();x.lineWidth=1.6;x.strokeStyle='#D9CCE8';x.stroke();x.fillStyle='#F2584B';x.fillRect(-4.6,-7,9.2,2.6);x.fillRect(-5.4,-3.4,10.8,2.6);
     x.fillStyle='#2D1856';x.beginPath();x.arc(-2.2,-14,1.3,0,7);x.arc(2.2,-14,1.3,0,7);x.fill()}
    x.restore();x.globalAlpha=1}
   // ball
   const drawBall=(bx,by,ang)=>{x.save();x.translate(bx,by);x.rotate(ang);x.beginPath();x.arc(0,0,BR,0,7);x.fillStyle='#F2584B';x.fill();x.beginPath();x.arc(0,0,BR,-.6,.6);x.lineTo(0,0);x.fillStyle='#FFD34D';x.fill();x.beginPath();x.arc(0,0,BR,2.5,3.7);x.lineTo(0,0);x.fillStyle='#4FA3F7';x.fill();
    x.beginPath();x.arc(0,0,BR,0,7);x.lineWidth=2;x.strokeStyle='#B83A30';x.stroke();x.beginPath();x.arc(-4,-5,3.4,0,7);x.fillStyle='rgba(255,255,255,.8)';x.fill();x.restore()};
   if(loaded&&!(state==='ready'&&balls<=0))drawBall(bp.x,bp.y,0);
   if(ball)drawBall(ball.position.x,ball.position.y,ball.angle);
   // front arm + front band
   if(loaded){x.strokeStyle='#6B3AA0';x.lineWidth=4;x.beginPath();x.moveTo(AX-14,AY-6);x.lineTo(bp.x-4,bp.y);x.stroke()}
   x.strokeStyle='#9C5A2E';x.lineWidth=7;x.beginPath();x.moveTo(AX,AY+36);x.quadraticCurveTo(AX-4,AY+14,AX-14,AY-8);x.stroke();
   fx.draw(x,dt)});
 }};

/* --- 12. Fly: Дракоша flies and catches stars / balloons --- */
const FLY_COLS=[{k:'red',c:'#F2584B',d:'#C93A2C',pl:'красные'},{k:'blue',c:'#4FA3F7',d:'#2F7FD0',pl:'синие'},{k:'yellow',c:'#FFC233',d:'#E09B00',pl:'жёлтые'},{k:'green',c:'#5BC46E',d:'#3C9A4E',pl:'зелёные'}];
GAMES.fly={host:'drak',name:'Полёт',sub:'Лови звёздочки в небе',art:'🌟',rounds:3,layout:'full',noMistakes:true,canvas:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();const night=lv===5;
  board.insertAdjacentHTML('beforeend',`<div class="fl-sky${night?' dark':''}"></div>`);
  const x=gameCanvas();const fx=Particles();const dimg=imgObj('drak');
  const mode=lv===3?'color':lv===4?'num':'star';const need=LV(lv,[6,7,5,5,8]);const speed=LV(lv,[95,110,112,112,135]);
  if(GS.flyC===undefined)GS.flyC=rnd(4);const want=mode==='color'?FLY_COLS[(GS.step+GS.flyC)%4]:null;
  const dh=Math.min(92,bh*.3),dw=dh*RATIO.drak,DX=Math.max(70,bw*.13);let dy=bh*.5,ty=bh*.5,tilt=0,wob=0;
  let got=0,nextNum=1,spawnT=.6,done=false,doneT=0,lastSay=0,items=[],clouds=[],hillOff=0;
  for(let i=0;i<5;i++)clouds.push({x:Math.random()*bw,y:20+Math.random()*bh*.45,s:.5+Math.random()*.7});
  const stars=night?[...Array(40)].map(()=>({x:Math.random()*bw,y:Math.random()*bh*.8,r:.6+Math.random()*1.4,p:Math.random()*6})):[];
  const cnt=el('div','fl-count');board.appendChild(cnt);
  const renderCnt=()=>{cnt.innerHTML='';for(let i=0;i<need;i++){const s=el('i',i<got?'on':'');if(mode==='num')s.textContent=String(i+1);else if(mode==='color'){s.style.setProperty('--bc',want.c)}cnt.appendChild(s)}};
  cnt.classList.add(mode);renderCnt();
  let fing=null;if(lv===1&&GS.step===0){fing=el('div','finger emo fl-drag','👆');fing.style.left=(DX+dw*.6)+'px';fing.style.top=(bh*.5)+'px';board.appendChild(fing)}
  const intro=mode==='color'?`Лови только ${want.pl} шарики!`:mode==='num'?'Лови шарики по порядку: один, два, три, четыре, пять!':LV(lv,['Лови звёздочки!','Лови звёздочки и облетай тучки!','','','Наступила ночь! Лови звёздочки и облетай грозовые тучи!']);
  const short=mode==='color'?`Лови ${want.pl} шарики!`:mode==='num'?'По порядку: 1, 2, 3, 4, 5!':LV(lv,['Лови звёздочки!','Облетай тучки!','','','Ночной полёт!']);taskBubble(short,bw*.36,10,200,'t-left');
  c.say((GS.step===0&&lv<=2?'Полетели! Води пальцем вверх и вниз. ':'')+intro,short);
  GS.dbg=()=>({DX,dy,dh,items:items.map(it=>({x:it.x,y:it.y+Math.sin(it.ph)*6,good:it.type==='star'||(mode==='color'&&it.col===want)||(mode==='num'&&it.n===nextNum)}))});
  const setY=e=>{ty=Math.max(dh*.45,Math.min(bh-dh*.4,toLocal(e,board).y))};
  board.onpointerdown=e=>{audio();if(fing){fing.remove();fing=null}setY(e);try{board.setPointerCapture(e.pointerId)}catch(_){}};
  board.onpointermove=e=>{if(e.buttons||e.pointerType==='touch')setY(e)};
  function spawn(){const y=58+Math.random()*(bh-104);let it;
   if(mode==='star'){const bad=lv>=2&&Math.random()<(night?.38:.3);it=bad?{type:'cloud',r:30,storm:night}:{type:'star',r:18}}
   else if(mode==='color'){const col=Math.random()<.58?want:pick(FLY_COLS.filter(c=>c!==want));it={type:'ball',r:20,col}}
   else{const n=Math.random()<.62?nextNum:pick([1,2,3,4,5].filter(v=>v!==nextNum));it={type:'ball',r:21,col:FLY_COLS[(n-1)%4],n}}
   it.x=bw+40;it.y=y;it.ph=Math.random()*6;it.vx=speed*(it.type==='cloud'?.85:1)*(.9+Math.random()*.25);items.push(it)}
  function catchIt(it){it.gone=true;
   if(it.type==='cloud'){wob=1;sfx.bad();buzz([30,40,30]);GS.mistakes++;if(performance.now()-lastSay>3500){lastSay=performance.now();say(night?'Ой, гроза! Облетай тучи!':'Ой, тучка! Облетай тучки!')}return}
   let ok=true;if(mode==='color')ok=it.col===want;if(mode==='num')ok=it.n===nextNum;
   if(!ok){wob=.6;sfx.bad();GS.mistakes++;if(performance.now()-lastSay>2500){lastSay=performance.now();say(mode==='color'?`Нет, не тот цвет! Лови ${want.pl} шарики!`:`Нет! Сейчас нужна цифра ${COUNTW[nextNum].toLowerCase()}.`)}return}
   got++;fx.burst(it.x,it.y,16,it.type==='star'?['#FFD34D','#FFF1A8','#FFB020']:[it.col.c,'#fff','#FFD34D']);sfx.pop();buzz(15);
   if(mode==='num'){say(COUNTW[nextNum]+'!');nextNum++}
   renderCnt();const s=cnt.children[got-1];if(s){s.classList.remove('pop');void s.offsetWidth;s.classList.add('pop')}
   if(got>=need){done=true;c.success(mode==='num'?'Ура! Один, два, три, четыре, пять!':mode==='color'?'Ура! Все шарики собраны!':'Ура! Все звёздочки собраны!',2600,null)}}
  gameLoop((dt,t)=>{
   if(!done){spawnT-=dt;if(spawnT<=0){spawn();spawnT=LV(lv,[1.25,1.05,1.1,1.1,.9])*(.8+Math.random()*.4)}}
   dy+=(ty-dy)*Math.min(1,dt*7);tilt+=((ty-dy)*.006-tilt)*Math.min(1,dt*8);wob=Math.max(0,wob-dt*1.6);
   if(done&&!doneT)doneT=t;const ddx=done?DX+Math.min(bw,(t-doneT)*260):DX;
   for(const it of items){it.x-=it.vx*dt;it.ph+=dt*2.4;if(!it.gone&&!done&&Math.hypot(it.x-ddx,it.y+Math.sin(it.ph)*6-dy)<it.r+dh*.33)catchIt(it)}
   items=items.filter(it=>!it.gone&&it.x>-60);
   // ---- draw
   x.clearRect(0,0,bw,bh);
   if(night){for(const s of stars){x.globalAlpha=.4+.6*Math.abs(Math.sin(t*1.5+s.p));x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()}x.globalAlpha=1;x.fillStyle='#FFF4C4';x.beginPath();x.arc(bw-70,46,22,0,7);x.fill();x.fillStyle='#2A2363';x.beginPath();x.arc(bw-60,40,20,0,7);x.fill()}
   for(const cl of clouds){cl.x-=speed*.22*cl.s*dt;if(cl.x<-90)cl.x=bw+90;x.globalAlpha=night?.18:.85;x.fillStyle='#fff';const r=16*cl.s+10;x.beginPath();x.arc(cl.x,cl.y,r,0,7);x.arc(cl.x+r*.9,cl.y+4,r*.8,0,7);x.arc(cl.x-r*.9,cl.y+5,r*.7,0,7);x.fill()}x.globalAlpha=1;
   hillOff=(hillOff+speed*.5*dt)%400;for(let layer=0;layer<2;layer++){const off=layer?hillOff:hillOff*.5;x.fillStyle=night?(layer?'#2E3A6E':'#252F5C'):(layer?'#8FD16A':'#B5E28E');x.beginPath();x.moveTo(0,bh);
    for(let px=0;px<=bw+20;px+=20)x.lineTo(px,bh-(layer?26:44)-Math.sin((px+off)/(layer?70:110))*(layer?10:16));x.lineTo(bw,bh);x.closePath();x.fill()}
   for(const it of items){const yy=it.y+Math.sin(it.ph)*6;
    if(it.type==='star'){x.save();x.translate(it.x,yy);x.rotate(Math.sin(it.ph*.7)*.3);x.shadowColor='rgba(255,200,40,.8)';x.shadowBlur=12;starPath(x,0,0,it.r,it.r*.46);x.fillStyle='#FFD34D';x.fill();x.shadowBlur=0;x.lineWidth=2;x.strokeStyle='#F0A21C';x.stroke();
     x.fillStyle='#7A4A00';x.beginPath();x.arc(-4,-1,1.6,0,7);x.arc(4,-1,1.6,0,7);x.fill();x.restore()}
    else if(it.type==='cloud'){x.fillStyle=it.storm?'#7C78A6':'#A9B1C3';x.beginPath();x.arc(it.x,yy,18,0,7);x.arc(it.x+18,yy+4,14,0,7);x.arc(it.x-18,yy+5,13,0,7);x.arc(it.x+4,yy-10,13,0,7);x.fill();
     if(it.storm){x.fillStyle='#FFD34D';x.beginPath();x.moveTo(it.x+2,yy+12);x.lineTo(it.x-6,yy+28);x.lineTo(it.x+1,yy+27);x.lineTo(it.x-4,yy+42);x.lineTo(it.x+10,yy+22);x.lineTo(it.x+3,yy+23);x.closePath();x.fill()}
     else{x.strokeStyle='#6FB6F2';x.lineWidth=2;x.lineCap='round';for(let k=-1;k<=1;k++){const o=((t*60+k*13)%14);x.beginPath();x.moveTo(it.x+k*10,yy+18+o);x.lineTo(it.x+k*10-2,yy+24+o);x.stroke()}}}
    else{const r=it.r;x.strokeStyle='rgba(80,60,120,.5)';x.lineWidth=1.4;x.beginPath();x.moveTo(it.x,yy+r*1.15);x.quadraticCurveTo(it.x-6,yy+r*1.6,it.x+2,yy+r*2.2);x.stroke();
     x.beginPath();x.ellipse(it.x,yy,r*.9,r*1.08,0,0,7);x.fillStyle=it.col.c;x.fill();x.beginPath();x.moveTo(it.x-3,yy+r*1.06);x.lineTo(it.x+3,yy+r*1.06);x.lineTo(it.x,yy+r*1.2);x.closePath();x.fillStyle=it.col.d;x.fill();
     x.beginPath();x.ellipse(it.x-r*.35,yy-r*.4,r*.18,r*.3,-.5,0,7);x.fillStyle='rgba(255,255,255,.65)';x.fill();
     if(it.n){x.fillStyle='#fff';x.font='900 22px Rubik, Nunito, sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(String(it.n),it.x,yy+1)}}}
   // dragon
   if(dimg.complete){x.save();x.translate(ddx,dy);x.rotate(tilt+Math.sin(t*30)*.12*wob);const fl=1+Math.sin(t*11)*.035;x.scale(1/fl,fl);x.drawImage(dimg,-dw/2,-dh/2,dw,dh);x.restore()}
   if(night){const g=x.createRadialGradient(ddx,dy,dh*.6,ddx,dy,dh*2.6);g.addColorStop(0,'rgba(14,10,46,0)');g.addColorStop(1,'rgba(14,10,46,.55)');x.fillStyle=g;x.fillRect(0,0,bw,bh)}
   fx.draw(x,dt)});
 }};

/* ---- effects for all games: star burst where the child tapped on a right answer ---- */
let lastTap=null;
document.addEventListener('pointerdown',e=>{const s=$('#scr-game');if(!s||s.hidden)return;lastTap=toLocal(e,s)},true);
function uiBurst(){const s=$('#scr-game');if(!s||s.hidden||!lastTap||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let L=s.querySelector('.fxl');if(!L){L=el('div','fxl');s.appendChild(L)}
 const cols=['#FFD34D','#FF8A5C','#7FD1FF','#9BE36B','#F49AE0'];
 for(let i=0;i<14;i++){const p=el('i',i%3?'fxs':'fxs dot');const a=Math.PI*2*i/14+Math.random()*.4,d=50+Math.random()*60;p.style.left=lastTap.x+'px';p.style.top=lastTap.y+'px';p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d+'px');p.style.background=pick(cols);p.style.animationDelay=(Math.random()*.06)+'s';L.appendChild(p);setTimeout(()=>p.remove(),900)}
 const ring=el('i','fxring');ring.style.left=lastTap.x+'px';ring.style.top=lastTap.y+'px';L.appendChild(ring);setTimeout(()=>ring.remove(),700)}

/* ---- living map: butterflies and drifting cloud shadows ---- */
function mapAmbient(){const w=$('#world');if(!w||w.querySelector('.bfly'))return;
 const bs=[...Array(3)].map((_,i)=>{const b=el('div','bfly');b.innerHTML='<i></i><i></i>';b.style.setProperty('--h',[330,200,45][i]);w.appendChild(b);return{b,cx:300+i*330,cy:220+i*110,ax:120+i*30,ay:70+i*15,sp:.18+i*.05,ph:i*2}});
 const cs=[...Array(2)].map((_,i)=>{const c=el('div','cshadow');w.appendChild(c);return{c,x:i*700,y:120+i*300,sp:9+i*4}});
 let last=performance.now();
 const tick=t=>{const dt=Math.min(.05,(t-last)/1000);last=t;if(!$('#scr-map').hidden){
  for(const o of bs){o.ph+=dt*o.sp*2;const X=o.cx+Math.sin(o.ph)*o.ax+Math.sin(o.ph*2.3)*30,Y=o.cy+Math.sin(o.ph*1.7)*o.ay;const dx=Math.cos(o.ph)*o.ax;o.b.style.transform=`translate(${X}px,${Y}px) scaleX(${dx<0?-1:1})`}
  for(const o of cs){o.x+=o.sp*dt;if(o.x>WORLD_W+200)o.x=-420;o.c.style.transform=`translate(${o.x}px,${o.y}px)`}}
  requestAnimationFrame(tick)};requestAnimationFrame(tick)}
