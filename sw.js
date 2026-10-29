const C='igralochka-v11-yandex-20261029';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png','./apple-touch-icon.png'];
const VOICE=['./voice-drak.js','./voice-frag.js','./voice-narrator.js','./voice-nyam.js','./voice-poch.js','./voice-shusha.js'];
const fresh=u=>new Request(u,{cache:'reload'});
// install: first drop old versions (iPhone gives little storage), then download everything fresh
self.addEventListener('install',e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)));
 const c=await caches.open(C);await c.addAll(CORE.map(fresh));await Promise.all(VOICE.map(u=>c.add(fresh(u)).catch(()=>{})));await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com/.test(u.host)))c.put(e.request,res.clone());return res}))))});
