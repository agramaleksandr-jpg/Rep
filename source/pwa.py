import pathlib, json, shutil, sys
from PIL import Image, ImageDraw
VERSION = sys.argv[1] if len(sys.argv) > 1 else 'v2'
root = pathlib.Path(__file__).parent
pwa = root / 'dist' / 'pwa'
if pwa.exists():
    shutil.rmtree(pwa)
pwa.mkdir(parents=True)
mon = Image.open(root / 'img' / 'bulbik.webp').convert('RGBA')

def icon(size, maskable=False):
    bg = Image.new('RGBA', (size, size), (0, 0, 0, 0)); d = ImageDraw.Draw(bg)
    if maskable:
        d.rectangle([0, 0, size, size], fill=(251, 243, 226, 255))
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * .22), fill=(251, 243, 226, 255))
    r = int(size * (.36 if maskable else .42)); cx = cy = size // 2
    d.ellipse([cx - r, cy - r + int(size * .06), cx + r, cy + r + int(size * .06)], fill=(93, 183, 240, 255))
    h = int(size * (.62 if maskable else .74)); w = int(h * mon.width / mon.height)
    m = mon.resize((w, h), Image.LANCZOS); bg.alpha_composite(m, (cx - w // 2, int(size * (.2 if maskable else .14))))
    return bg

icon(192).save(pwa / 'icon-192.png'); icon(512).save(pwa / 'icon-512.png'); icon(512, True).save(pwa / 'icon-maskable.png')
icon(180, True).convert('RGB').save(pwa / 'apple-touch-icon.png')
man = {"name": "Игралочка", "short_name": "Игралочка", "lang": "ru", "start_url": "./", "scope": "./", "display": "fullscreen",
       "orientation": "landscape", "background_color": "#FBF3E2", "theme_color": "#FBF3E2",
       "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"}, {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
                 {"src": "icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
(pwa / 'manifest.webmanifest').write_text(json.dumps(man, ensure_ascii=False, indent=1))
packs = sorted(f.name for f in (root / 'dist').glob('voice-*.js'))
for f in packs:
    shutil.copy(root / 'dist' / f, pwa / f)
sw = """const C='igralochka-%s';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png','./apple-touch-icon.png'];
const VOICE=[""" + ','.join(f"'./{f}'" for f in packs) + """];
const fresh=u=>new Request(u,{cache:'reload'});
// install: first drop old versions (iPhone gives little storage), then download everything fresh
self.addEventListener('install',e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)));
 const c=await caches.open(C);await c.addAll(CORE.map(fresh));await Promise.all(VOICE.map(u=>c.add(fresh(u)).catch(()=>{})));await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&(u.origin===location.origin||/fonts\\.(googleapis|gstatic)\\.com/.test(u.host)))c.put(e.request,res.clone());return res}))))});
"""
sw = sw.replace('%s', VERSION)
(pwa / 'sw.js').write_text(sw)
html = (root / 'dist' / 'igralochka.html').read_text()
html = html.replace('<meta name="apple-mobile-web-app-title" content="Игралочка">', '<meta name="apple-mobile-web-app-title" content="Игралочка">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n<link rel="icon" href="icon-192.png">', 1)
html = html.replace('</body>', "<script>if('serviceWorker' in navigator&&/^https?:/.test(location.protocol)){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}</script>\n</body>", 1)
(pwa / 'index.html').write_text(html)
shutil.make_archive(str(root / 'dist' / 'igralochka-pwa'), 'zip', pwa)
print('pwa', VERSION, (root / 'dist' / 'igralochka-pwa.zip').stat().st_size // 1024, 'KB')
