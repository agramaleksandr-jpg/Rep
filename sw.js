const C='igralochka-20261027-125549';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png','./apple-touch-icon.png','./voice-drak.js','./voice-frag.js','./voice-narrator.js','./voice-nyam.js','./voice-poch.js','./voice-shusha.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com/.test(u.host))){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res})))});
