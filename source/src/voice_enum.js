/* DEV ONLY: enumerate every dynamic phrase the game can say, as [speaker, text] */
window.__venum=function(){
 const out=[];const add=(spk,t)=>out.push([spk,t]);
 const ALLP=[...PARTS.map(p=>({...p,kind:'house'})),...GPARTS.map(p=>({...p,kind:'garden'}))];
 // ---- app: build hints for every part and every combination of missing resources
 const inv0=ST.inv;
 for(const p of ALLP){const rs=[...new Set(needOf(p)?Object.keys(needOf(p)):[])];
  for(let m=0;m<(1<<rs.length);m++){ST.inv={sand:99,water:99,wood:99,fire:99};rs.forEach((r,i)=>{if(m&(1<<i))ST.inv[r]=0});add('narrator',hintFor(p))}
  add('narrator',`${p.name} — уже готово!`);add('narrator',`Можно построить ${p.acc}! Нажми на молоточек.`);add('narrator',`Ура! Построили ${p.acc}!`);
  if(p.req){const rq=ALLP.find(x=>x.id===p.req);add('narrator',`Сначала построй ${rq.acc}!`)}}
 ST.inv=inv0;add('narrator',hintFor(null));
 for(const b of BABIES)add('narrator',`Привет! Я ${b.name}!`);
 for(const id in NB){const nb=NB[id];const like=LIKES[id];
  for(const r of RES_KEYS){add('narrator',`Ура! ${nb.name} дарит тебе ${RES[r].acc}!`);add('narrator',`Ура! ${RES[r].name}!`)}
  add(id,`Ням-ням! Спасибо! ${nb.name} дарит тебе ${RES[nb.res].acc}!`);
  add(id,like==='any'?`${nb.name} любит урожай из сада. Вырасти что-нибудь и угости!`:`${nb.name} любит ${CROPS[like].acc}. Вырасти в саду и угости!`)}
 // ---- garden
 for(const k in CROPS){const c=CROPS[k];
  add('narrator',`Новые семена: ${c.n}!`);add('narrator',`Полили! ${cap(c.n)} растёт.`);add('narrator',`Посадили ${c.acc}! Теперь полей грядку.`);add('narrator',`Урожай! ${cap(c.acc)} в корзинку!`);
  for(let s=0;s<4;s++)add('narrator',`Это ${c.n}, сейчас тут ${STAGE_TXT[s]}. Поиграй с друзьями — и растение подрастёт!`)}
 for(let n=1;n<=3;n++)add('narrator',`Собрали яблоки: ${n}! Ням их очень любит.`);
 // ---- count (Ням)
 for(const f of FOODS){add('nyam',`Сколько ${plural(5,f.f)} у меня в тарелке? Посчитай и нажми на цифру!`);
  for(let N=1;N<=9;N++){add('nyam',`Положи мне в тарелку ${numAcc(N,f.g)} ${plural(N,f.f)}!`);add('nyam',`Ням-ням! Ровно ${numAcc(N,f.g)}! Спасибо!`)}}
 for(let v=1;v<=9;v++){add('nyam',`Нет, не ${v}. Посчитай ещё раз!`);add('nyam',COUNTW[v]+'!')}
 for(let A=1;A<=3;A++)for(let N=A+1;N<=Math.min(8,A+4);N++){add('nyam',`У меня в тарелке ${A}. Добавь, чтобы стало ${N}!`);add('nyam',`Было ${A}, добавили ${N-A}, стало ${N}! Молодец!`)}
 // ---- sort (Ням)
 for(const lv in SORTS){const S=SORTS[lv];for(const x of S.yes)add('nyam',S.bad(x[1],true,x[2]));for(const x of S.no)add('nyam',S.bad(x[1],false,x[2]))}
 // ---- prank (Шуша)
 for(const kind in PRANK_POOLS){for(const t of PRANK_POOLS[kind]){
   add('shusha',`${CAME(t.g)} ${t.n}!`);add('shusha',`${GONE(t.g)} ${t.n}!`);add('shusha',`${WAS(t.g)} ${t.n}. ${cap(NOW(t.g))} ${t.n}!`);
   add('shusha',`Нет, ${t.n} тут и не было. Подумай ещё!`);if(t.a)add('shusha',`${cap(t.n)} в шляпе!`)}}
 for(const w of ['в комнате','на кухне','во дворе'])add('shusha',`Запомни, что лежит ${w}!`);
 // ---- detective (Шуша)
 for(const ty in TTYPE)for(const co in TCOL)for(const p of [null,'dots','stripes'])for(const s of [undefined,'big','small']){
  if(p&&s)continue;const t=s?{type:ty,color:co,pattern:p,size:s}:{type:ty,color:co,pattern:p};
  add('shusha',`Найди ${toyDesc(t,'acc')}!`);add('shusha',`Шуша спрятала игрушки. Найди ${toyDesc(t,'acc')}!`);add('shusha',`Верно! Вот ${toyDesc(t,'nom')}!`);add('shusha',`Это ${toyDesc(t,'nom')}.`)}
 for(const ty in TTYPE)add('shusha',`Найди все ${TTYPE[ty].pl}!`);
 for(const co in TCOL)add('shusha',`Найди все ${TCOL[co].a[3]} игрушки!`);
 // ---- parcel + maze (Дракоша)
 for(const d of ['nyam','shusha','poch']){const nb=NB[d];
  add('drak',`Зима! Дорожка должна пройти через письмо, а потом к домику ${nb.gen}.`);add('drak',`Помоги Дракоше обойти речку и донести посылку ${nb.dat}!`);
  add('drak',`Помоги Дракоше отнести посылку ${nb.dat}! Нажимай на плитки, чтобы повернуть дорожку.`);
  add('drak',`Ворота закрыты на замок! Собери все ключики, а потом веди Дракошу к домику ${nb.gen}.`);
  add('drak',`Наступила ночь! Проведи Дракошу по тёмному лабиринту к домику ${nb.gen}.`);add('drak',`Проведи Дракошу по лабиринту к домику ${nb.gen}!`);
  add('drak',`Ура! Дракоша долетел до ${nb.gen}!`)}
 // ---- riddle + order (Почемучка)
 for(const s of SOUNDS){add('poch',`Кто так говорит: ${s[2]}?`);add('poch',`Да! Так говорит ${s[1]}: ${s[2]}!`);add('poch',`Нет, ${s[1]} говорит «${s[2]}». Послушай ещё: ${s[2]}!`);add('poch',cap(s[2])+'!')}
 for(const r of RIDDLES)add('poch',`Да! Это ${r[1]}!`);
 for(const s of ORDER)add('poch',orderText(s));
 for(let k=1;k<=5;k++)add('poch',`Нет. Сейчас нужно ${COUNTW[k].toLowerCase()}. Посчитай!`);
 // ---- fly (Дракоша)
 for(const c of FLY_COLS){add('drak',`Лови только ${c.pl} шарики!`);add('drak',`Нет, не тот цвет! Лови ${c.pl} шарики!`);add('drak',`Лови ${c.pl} шарики!`)}
 for(let k=1;k<=5;k++){add('drak',`Нет! Сейчас нужна цифра ${COUNTW[k].toLowerCase()}.`);add('drak',COUNTW[k]+'!')}
 return out};
