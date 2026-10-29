/* ================= v5: Нарезка (как Fruit Ninja) и Бегалка (как Марио) ================= */
const FRUITS=[
 {e:'🍎',c:'#E8423A',red:1,nom:'яблоко',pl:'яблоки',f:['яблоко','яблока','яблок'],g:'n'},
 {e:'🍌',c:'#F5CF3B',nom:'банан',pl:'бананы',f:['банан','банана','бананов'],g:'m'},
 {e:'🍐',c:'#A9CF45',nom:'груша',pl:'груши',f:['грушу','груши','груш'],g:'f'},
 {e:'🍊',c:'#F79A2B',nom:'апельсин',pl:'апельсины',f:['апельсин','апельсина','апельсинов'],g:'m'},
 {e:'🍋',c:'#F3DE45',nom:'лимон',pl:'лимоны',f:['лимон','лимона','лимонов'],g:'m'},
 {e:'🍓',c:'#E63950',red:1},{e:'🍒',c:'#C7213A',red:1},{e:'🍅',c:'#E5452F',red:1},
 {e:'🍉',c:'#EF5A6A'},{e:'🥝',c:'#8DBB3D'},{e:'🍑',c:'#F7A27B'},{e:'🍍',c:'#F2C340'}];
const COUNTABLE=FRUITS.filter(f=>f.f);

/* --- 13. Slice: swipe to cut flying fruit, don't cut stones --- */
GAMES.slice={host:'nyam',name:'Нарезка',sub:'Режь фрукты пальцем',art:'🔪',rounds:3,layout:'full',noMistakes:true,canvas:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.insertAdjacentHTML('beforeend','<div class="sc-board"></div>');
  const nh=Math.min(150,bh*.46),nw=nh*RATIO.nyam;const ny=monImg('nyam',nh,'mon');ny.style.right='8px';ny.style.left='auto';ny.style.bottom='4px';ny.style.top='auto';ny.style.zIndex=1;board.appendChild(ny);GS.hostMon=ny;
  const x=gameCanvas();const fx=Particles();
  const mode=lv===3?'red':lv===4?'count':'any';const stones=lv===2||lv===5;
  if(GS.sliceT===undefined)GS.sliceT=rnd(COUNTABLE.length);const target=mode==='count'?COUNTABLE[(GS.sliceT+GS.step)%COUNTABLE.length]:null;
  const need=mode==='count'?2+((GS.step+lv)%3):LV(lv,[6,8,6,0,10]);
  const G=LV(lv,[620,680,700,700,800]),every=LV(lv,[1.5,1.25,1.15,1.15,.85]);
  const isGood=f=>!f.stone&&(mode==='any'||(mode==='red'&&f.fr.red)||(mode==='count'&&f.fr===target));
  let items=[],halves=[],trail=[],down=false,got=0,spawnT=.5,done=false,lastSay=0,fing=null;
  const cnt=el('div','fl-count sl-cnt');board.appendChild(cnt);
  const renderCnt=()=>{cnt.innerHTML='';for(let i=0;i<need;i++){const s=el('i',i<got?'on':'');if(mode==='count')s.textContent=target.e;cnt.appendChild(s)}};renderCnt();
  const short=mode==='count'?`Нарежь: ${target.e} × ${need}`:mode==='red'?'Только красные!':stones?'Камни не режь!':'Режь фрукты!';
  taskBubble(short,bw*.34,10,190,'t-left');
  const intro=mode==='count'?`Нарежь ${numAcc(need,target.g)} ${plural(need,target.f)}!`:mode==='red'?'Режь только красные фрукты!':lv===5?'Фруктовый дождь! Режь быстрее, а камни не трогай!':stones?'Нарежь фруктов для салата! Камни не режь.':'Нарежь мне фруктов для салата!';
  c.say((GS.step===0?'Быстро проведи пальцем по фрукту. ':'')+intro,short);
  if(lv===1&&GS.step===0){fing=el('div','finger emo sl-swipe','👆');fing.style.left=(bw*.38)+'px';fing.style.top=(bh*.42)+'px';board.appendChild(fing)}
  function spawn(){const k=lv>=3&&Math.random()<.35?2:1;
   for(let j=0;j<k;j++){let fr,stone=false;
    if(stones&&Math.random()<.25)stone=true;
    else if(mode==='red')fr=Math.random()<.55?pick(FRUITS.filter(f=>f.red)):pick(FRUITS.filter(f=>!f.red));
    else if(mode==='count')fr=Math.random()<.55?target:pick(FRUITS.filter(f=>f!==target));
    else fr=pick(FRUITS);
    const x0=bw*(.18+Math.random()*.55),h=bh*(.5+Math.random()*.3);
    items.push({x:x0,y:bh+30,vx:(bw*.5-x0)*(.25+Math.random()*.35),vy:-Math.sqrt(2*G*h),r:stone?24:30,rot:Math.random()*6,vr:(Math.random()-.5)*3,fr,stone,cut:false})}}
  function cut(it,ang){
   if(it.stone){it.hit=(it.hit||0)+1;it.vy=Math.min(it.vy,-120);it.vx*=-.6;tone(1400,0,.06,'square',.06);tone(900,.05,.08,'square',.05);
    if(it.hit===1){GS.mistakes++;buzz([20,30,20]);hop(ny,'sad');if(performance.now()-lastSay>2500){lastSay=performance.now();say('Ой! Это камень, его не режем!')}}return}
   it.cut=true;const n=[Math.cos(ang+Math.PI/2),Math.sin(ang+Math.PI/2)];
   for(const s of [-1,1])halves.push({x:it.x,y:it.y,vx:it.vx*.6+n[0]*s*110,vy:it.vy*.3+n[1]*s*110-60,ang,side:s,rot:0,vr:s*(2+Math.random()*2),fr:it.fr,t:0});
   fx.burst(it.x,it.y,18,[it.fr.c,it.fr.c,'#fff']);tone(300,0,.05,'triangle',.08);tone(700,.03,.08,'sawtooth',.03);
   if(isGood(it)){got++;sfx.pop();buzz(15);renderCnt();const s=cnt.children[got-1];if(s){s.classList.remove('pop');void s.offsetWidth;s.classList.add('pop')}
    if(got>=need&&!done){done=true;hop(ny,'chomp');c.success(pick(['Ура! Вкусный салат!','Ням-ням! Спасибо!','Отличная нарезка!']),2400,ny)}}
   else{GS.mistakes++;hop(ny,'sad');if(performance.now()-lastSay>2500){lastSay=performance.now();say(mode==='red'?'Это не красное! Режь красные.':`Это не ${target.nom}! Режь ${target.pl}.`)}}}
  const seg=(p,q,c0,r)=>{const dx=q.x-p.x,dy=q.y-p.y,l=dx*dx+dy*dy||1;let t=((c0.x-p.x)*dx+(c0.y-p.y)*dy)/l;t=Math.max(0,Math.min(1,t));return Math.hypot(p.x+t*dx-c0.x,p.y+t*dy-c0.y)<r};
  board.onpointerdown=e=>{audio();down=true;if(fing){fing.remove();fing=null}const p=toLocal(e,board);trail=[{x:p.x,y:p.y,t:performance.now()}];try{board.setPointerCapture(e.pointerId)}catch(_){}};
  board.onpointermove=e=>{if(!down)return;const p=toLocal(e,board);const q=trail[trail.length-1];trail.push({x:p.x,y:p.y,t:performance.now()});if(trail.length>14)trail.shift();
   if(q&&Math.hypot(p.x-q.x,p.y-q.y)>4)for(const it of items)if(!it.cut&&seg(q,p,it,it.r+6))cut(it,Math.atan2(p.y-q.y,p.x-q.x))};
  board.onpointerup=board.onpointercancel=()=>{down=false};
  GS.dbg=()=>items.filter(it=>!it.cut).map(it=>({x:it.x,y:it.y,vy:it.vy,good:isGood(it),stone:it.stone}));
  gameLoop((dt,t)=>{
   if(!done){spawnT-=dt;if(spawnT<=0){spawn();spawnT=every*(.85+Math.random()*.3)}}
   for(const it of items){it.vy+=G*dt;it.x+=it.vx*dt;it.y+=it.vy*dt;it.rot+=it.vr*dt}
   items=items.filter(it=>!it.cut&&it.y<bh+60);
   for(const h of halves){h.t+=dt;h.vy+=G*dt;h.x+=h.vx*dt;h.y+=h.vy*dt;h.rot+=h.vr*dt}
   halves=halves.filter(h=>h.y<bh+80&&h.t<3);
   const now=performance.now();trail=trail.filter(p=>now-p.t<160);
   // draw
   x.clearRect(0,0,bw,bh);x.textAlign='center';x.textBaseline='middle';
   for(const h of halves){x.save();x.translate(h.x,h.y);x.rotate(h.ang+h.rot);x.beginPath();x.rect(-40,h.side<0?-40:0,80,40);x.clip();x.rotate(-h.ang);x.font='54px sans-serif';x.fillText(h.fr.e,0,2);x.restore()}
   for(const it of items){x.save();x.translate(it.x,it.y);x.rotate(it.rot*.3);
    if(it.stone){x.fillStyle='#9C98A8';x.beginPath();x.ellipse(0,0,it.r,it.r*.82,0,0,7);x.fill();x.fillStyle='#86829A';x.beginPath();x.arc(-7,-4,5,0,7);x.arc(8,5,4,0,7);x.fill();x.fillStyle='#2D1856';x.beginPath();x.arc(-6,-2,2,0,7);x.arc(6,-2,2,0,7);x.fill();x.strokeStyle='#2D1856';x.lineWidth=1.6;x.beginPath();x.arc(0,4,5,.2,Math.PI-.2);x.stroke()}
    else{x.font='54px sans-serif';x.fillText(it.fr.e,0,2)}x.restore()}
   if(trail.length>1){x.lineCap='round';x.lineJoin='round';for(let i=1;i<trail.length;i++){const a=i/trail.length;x.strokeStyle=`rgba(255,255,255,${a})`;x.lineWidth=2+a*9;x.beginPath();x.moveTo(trail[i-1].x,trail[i-1].y);x.lineTo(trail[i].x,trail[i].y);x.stroke()}
    x.strokeStyle='rgba(127,209,255,.5)';x.lineWidth=2;x.beginPath();x.moveTo(trail[0].x,trail[0].y);for(const p of trail)x.lineTo(p.x,p.y);x.stroke()}
   fx.draw(x,dt)});
 }};

/* --- 14. Run: Mario-like runner. Tap to jump, stomp bugs, bump boxes, reach the flag --- */
GAMES.run={host:'poch',name:'Бегалка',sub:'Прыгай и беги к флажку',art:'🚩',rounds:3,layout:'full',noMistakes:true,canvas:true,
 round(c,lv){
  const bw=c.bw(),bh=c.bh();board.insertAdjacentHTML('beforeend',`<div class="rn-sky${lv===5?' eve':''}"></div>`);
  const x=gameCanvas();const fx=Particles();const hero=player();const himg=imgObj(hero.id),pimg=imgObj('poch');
  const GY=bh-46,GRAV=1700,JUMP=-640,JUMP2=-560,SPEED=LV(lv,[150,160,170,180,195]),LEN=LV(lv,[1500,1900,2200,2400,2900])+GS.step*150;
  const PH=64,PW=Math.round(PH*RATIO[hero.id]*.8);
  // ---- level
  const stumps=[],stars=[],blocks=[],puddles=[],bugs=[];let xx=420;
  const addStars=(x0,n,y0,arc)=>{for(let i=0;i<n;i++)stars.push({x:x0+i*34,y:y0-(arc?Math.sin(i/(n-1||1)*Math.PI)*60:0),got:false})};
  const kinds=['stump','stars'];if(lv>=2)kinds.push('blocks','blocks');if(lv>=3)kinds.push('puddle','puddle');if(lv>=4)kinds.push('bug','bug');if(lv===5)kinds.push('stump','bug');
  while(xx<LEN-260){const k=pick(kinds);
   if(k==='stump'){const h=24+rnd(lv>=3?20:10);stumps.push({x:xx,w:30,h});addStars(xx-20,3,GY-h-70,true);xx+=230+rnd(120)}
   else if(k==='stars'){addStars(xx,4,GY-30,false);xx+=200+rnd(80)}
   else if(k==='blocks'){const n=3+rnd(2),q=rnd(n);for(let i=0;i<n;i++)blocks.push({x:xx+i*32,y:GY-128,q:i===q,used:false,bump:0});addStars(xx+8,n,GY-160,false);xx+=n*32+220}
   else if(k==='puddle'){const w=64+rnd(lv===5?36:20);puddles.push({x:xx,w});addStars(xx-10,3,GY-90,true);xx+=w+240}
   else{bugs.push({x:xx+40,x0:xx,w:30,h:22,dir:-1,alive:true,sq:0});xx+=260+rnd(80)}}
  const FLAG=LEN;
  // ---- hero state
  let px=60,py=GY-PH,vy=0,onG=true,jumps=0,stun=0,camX=0,got=0,done=false,lastSay=0,respawn=0,landSq=0,doneT=0,acc=0;
  const cnt=el('div','rn-cnt');cnt.innerHTML='<span class="emo">⭐</span><b>0</b>';board.appendChild(cnt);const setCnt=()=>{cnt.querySelector('b').textContent=got;cnt.classList.remove('pop');void cnt.offsetWidth;cnt.classList.add('pop')};
  const short=LV(lv,['Беги к флажку!','Собирай звёздочки!','Прыгай через лужи!','Прыгай на жучков!','Беги к флажку!']);taskBubble(short,bw*.34,10,190,'t-left');
  const intro=LV(lv,['Беги к флажку! Нажимай на экран, чтобы прыгать через пеньки.','Прыгай и собирай звёздочки! Ударь головой волшебный ящик.','Осторожно, лужи! Прыгай через них.','Жучки на дороге! Прыгни на жучка сверху.','Длинная дорога! Беги к флажку и собирай звёздочки.']);
  c.say((GS.step===0?'Нажимай на экран, чтобы прыгать. ':'')+intro,short);
  let fing=null;if(lv===1&&GS.step===0){fing=el('div','finger emo','👆');fing.style.left=(bw*.55)+'px';fing.style.top=(bh*.45)+'px';board.appendChild(fing)}
  const say2=(t,ms=2600)=>{if(performance.now()-lastSay>ms){lastSay=performance.now();say(t)}};
  const jump=()=>{if(done||respawn>0)return;if(onG){vy=JUMP;onG=false;jumps=1;tone(520,0,.1,'triangle',.08);tone(780,.05,.08,'triangle',.06)}else if(jumps<2){vy=JUMP2;jumps=2;tone(700,0,.08,'triangle',.07);tone(980,.04,.08,'triangle',.05)}};
  board.onpointerdown=e=>{audio();if(fing){fing.remove();fing=null}jump()};
  const bump=(msg)=>{stun=.45;vy=Math.min(vy,-200);onG=false;GS.mistakes++;sfx.bad();buzz([25,40,25]);say2(msg)};
  const ahead=()=>{const L=[...stumps.map(s=>({x:s.x,w:s.w})),...puddles.map(p=>({x:p.x,w:p.w})),...bugs.filter(b=>b.alive).map(b=>({x:b.x,w:b.w}))].filter(o=>o.x+o.w>px).sort((a,b)=>a.x-b.x);return L[0]};
  GS.dbg=()=>({px,py,onG,FLAG,got,next:ahead()});
  function step(dt){
   if(respawn>0){respawn-=dt;if(respawn<=0){py=GY-PH;vy=0;onG=true}return}
   if(GS.auto&&!done){const o=ahead();if(o&&o.x-(px+PW)<(o.w>40?42:36)&&o.x-(px+PW)>0&&onG)jump()}
   const sp=done?0:(stun>0?-110:SPEED);stun=Math.max(0,stun-dt);px+=sp*dt;if(px<20)px=20;
   vy+=GRAV*dt;let ny=py+vy*dt;const wasAir=!onG;onG=false;
   // ground (except puddles)
   const overPuddle=puddles.find(p=>px+PW*.5>p.x&&px+PW*.5<p.x+p.w);
   if(ny+PH>=GY&&!overPuddle){ny=GY-PH;vy=0;onG=true}
   // blocks: land on top / bump from below
   for(const b of blocks){if(px+PW>b.x+3&&px<b.x+29){
     if(vy>=0&&py+PH<=b.y+2&&ny+PH>=b.y){ny=b.y-PH;vy=0;onG=true}
     else if(vy<0&&py>=b.y+30&&ny<=b.y+32){ny=b.y+32;vy=60;b.bump=.25;tone(200,0,.06,'square',.05);
      if(b.q&&!b.used){b.used=true;got++;setCnt();fx.burst(b.x+16,b.y-10,14,['#FFD34D','#FFF1A8']);sfx.good();if(!GS.boxSaid){GS.boxSaid=1;say('Звёздочка из ящика!')}}}}}
   py=ny;if(onG){jumps=0;if(wasAir)landSq=.18}
   if(overPuddle&&py+PH>GY+10&&!done){fx.burst(px+PW/2,GY,16,['#7CC7F2','#C4ECFF','#fff']);tone(300,0,.12,'sine',.08);tone(200,.08,.15,'sine',.06);GS.mistakes++;say2('Ой, лужа! Прыгай повыше!');px=overPuddle.x-60;respawn=.5}
   // stumps
   for(const s of stumps){if(px+PW>s.x+4&&px<s.x+s.w-4&&py+PH>GY-s.h+4){if(py+PH-vy*dt<=GY-s.h+6&&vy>=0){py=GY-s.h-PH;vy=0;onG=true;jumps=0}else if(stun<=0){px=s.x-PW-2;bump('Ой! Прыгай через пенёк!')}}}
   // bugs
   for(const b of bugs){if(!b.alive){b.sq+=dt;continue}b.x+=b.dir*30*dt;if(b.x<b.x0-50||b.x>b.x0+50)b.dir*=-1;
    if(px+PW>b.x+3&&px<b.x+b.w-3&&py+PH>GY-b.h){
     if(vy>0&&py+PH-vy*dt<=GY-b.h+8){b.alive=false;vy=-480;onG=false;jumps=1;got++;setCnt();fx.burst(b.x+15,GY-15,16,['#FFD34D','#E8423A','#fff']);sfx.pop();tone(900,0,.06,'triangle',.08);if(!GS.bugSaid){GS.bugSaid=1;say('Жучок стал звёздочкой!')}}
     else if(stun<=0){px=b.x-PW-4;bump('Прыгни на жучка сверху!')}}}
   // stars
   for(const s of stars)if(!s.got&&Math.abs(px+PW/2-s.x)<24&&Math.abs(py+PH/2-s.y)<PH*.6){s.got=true;got++;setCnt();fx.burst(s.x,s.y,8,['#FFD34D','#FFF1A8']);tone(1200+Math.random()*300,0,.06,'triangle',.05)}
   if(!done&&px+PW>=FLAG){done=true;doneT=0;sfx.win();c.success(pick(['Ура! Добежали до флажка!','Молодец! Мы прибежали!','Ура! Финиш!']),2600,null)}
   if(done)doneT+=dt}
  gameLoop((dt,t)=>{acc+=dt;while(acc>1/120){step(1/120);acc-=1/120}
   camX+=((Math.max(0,Math.min(px-bw*.28,FLAG+160-bw)))-camX)*Math.min(1,dt*8);landSq=Math.max(0,landSq-dt);
   x.clearRect(0,0,bw,bh);
   // parallax hills
   for(let L2=0;L2<2;L2++){const k=L2?.45:.2,off=camX*k;x.fillStyle=lv===5?(L2?'#D98C6A':'#E8A97F'):(L2?'#9DD47A':'#C2E6A0');x.beginPath();x.moveTo(0,GY);for(let sx=0;sx<=bw+20;sx+=20)x.lineTo(sx,GY-(L2?40:70)-Math.sin((sx+off)/(L2?90:140))*(L2?14:22));x.lineTo(bw,GY);x.closePath();x.fill()}
   x.save();x.translate(-camX,0);
   // ground with puddles
   const gx0=Math.floor(camX/32)*32;for(let gx=gx0;gx<camX+bw+32;gx+=32){if(puddles.some(p=>gx+16>p.x&&gx+16<p.x+p.w))continue;x.fillStyle='#C9965F';x.fillRect(gx,GY,32,bh-GY);x.fillStyle='#7BBF51';x.fillRect(gx,GY,32,10);x.fillStyle='#8FCF62';x.fillRect(gx,GY,32,5);x.fillStyle='rgba(120,80,40,.25)';x.fillRect(gx+6,GY+20,6,6);x.fillRect(gx+20,GY+32,5,5)}
   for(const p of puddles){x.fillStyle='#5DB4EE';x.fillRect(p.x,GY+8,p.w,bh-GY);x.fillStyle='#8FD0F7';for(let i=0;i<3;i++){const w=10+Math.sin(t*3+i)*4;x.fillRect(p.x+10+i*(p.w-30)/2,GY+16+i*6,w,3)}}
   // flag + host
   x.fillStyle='#8E89A3';x.fillRect(FLAG,GY-170,6,170);x.fillStyle='#F2584B';x.beginPath();x.moveTo(FLAG+6,GY-168);x.quadraticCurveTo(FLAG+34,GY-160+Math.sin(t*6)*4,FLAG+58,GY-150);x.lineTo(FLAG+6,GY-132);x.closePath();x.fill();x.fillStyle='#FFD34D';x.beginPath();x.arc(FLAG+3,GY-172,7,0,7);x.fill();
   if(pimg.complete){const h=96,w=h*RATIO.poch;x.drawImage(pimg,FLAG+70,GY-h,w,h)}
   // stumps
   for(const s of stumps){x.fillStyle='#9A6A3E';x.fillRect(s.x,GY-s.h,s.w,s.h);x.fillStyle='#C58B55';x.beginPath();x.ellipse(s.x+s.w/2,GY-s.h,s.w/2,6,0,0,7);x.fill();x.strokeStyle='#9A6A3E';x.lineWidth=1.5;x.beginPath();x.ellipse(s.x+s.w/2,GY-s.h,s.w/4,3,0,0,7);x.stroke()}
   // blocks
   for(const b of blocks){b.bump=Math.max(0,b.bump-dt);const by=b.y-Math.sin(b.bump/.25*Math.PI)*8;
    if(b.q&&!b.used){x.fillStyle='#FFC233';x.fillRect(b.x,by,32,32);x.strokeStyle='#C98A00';x.lineWidth=3;x.strokeRect(b.x+1.5,by+1.5,29,29);x.fillStyle='#fff';x.font='900 22px Rubik, Nunito, sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('?',b.x+16,by+17+Math.sin(t*4)*1.5)}
    else{x.fillStyle=b.used?'#C9A27A':'#E07B45';x.fillRect(b.x,by,32,32);x.strokeStyle=b.used?'#A57E58':'#B4552A';x.lineWidth=2;x.strokeRect(b.x+1,by+1,30,30);x.beginPath();x.moveTo(b.x,by+16);x.lineTo(b.x+32,by+16);x.moveTo(b.x+16,by);x.lineTo(b.x+16,by+16);x.moveTo(b.x+8,by+16);x.lineTo(b.x+8,by+32);x.moveTo(b.x+24,by+16);x.lineTo(b.x+24,by+32);x.stroke()}}
   // stars
   for(const s of stars)if(!s.got){starPath(x,s.x,s.y+Math.sin(t*3+s.x)*2,11,5);x.fillStyle='#FFD34D';x.fill();x.strokeStyle='#F0A21C';x.lineWidth=1.5;x.stroke()}
   // bugs (ladybugs)
   for(const b of bugs){if(!b.alive){if(b.sq<.3){x.fillStyle='#E8423A';x.beginPath();x.ellipse(b.x+15,GY-4,15,4*(1-b.sq/.3),0,0,7);x.fill()}continue}
    const lx=b.x+15,ly=GY-11;x.strokeStyle='#2D1856';x.lineWidth=2;for(let i=-1;i<=1;i++){const k=Math.sin(t*14+i)*3;x.beginPath();x.moveTo(lx+i*7,ly+6);x.lineTo(lx+i*7+k,ly+12);x.stroke()}
    x.fillStyle='#E8423A';x.beginPath();x.ellipse(lx,ly,15,11,0,Math.PI,0);x.lineTo(lx+15,ly+5);x.lineTo(lx-15,ly+5);x.closePath();x.fill();x.fillStyle='#2D1856';x.beginPath();x.arc(lx+b.dir*15,ly-1,6,0,7);x.fill();x.fillRect(lx-.8,ly-10,1.6,14);x.beginPath();x.arc(lx-7,ly-4,2.4,0,7);x.arc(lx+6,ly-6,2.4,0,7);x.arc(lx+2,ly+1,2,0,7);x.fill();
    x.fillStyle='#fff';x.beginPath();x.arc(lx+b.dir*17,ly-3,1.8,0,7);x.fill()}
   // hero
   if(himg.complete&&respawn<=0){const run=onG&&!done?Math.sin(t*16):0;const sq=landSq>0?1-landSq*1.2:(onG?1:1.06);const h=PH*1.12*sq,w=(PH*1.12)*RATIO[hero.id]*(2-sq);
    x.save();x.translate(px+PW/2,py+PH);x.rotate(onG?run*.05:Math.max(-.25,Math.min(.25,vy/2400)));if(stun>0)x.globalAlpha=.6+.4*Math.sin(t*40);x.drawImage(himg,-w/2,-h+Math.abs(run)*-3,w,h);x.restore()}
   fx.draw(x,dt);
   x.restore()});
 }};
