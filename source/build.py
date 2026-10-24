import base64, json, os, pathlib, sys
DEV = '--dev' in sys.argv
root = pathlib.Path(__file__).parent
src = root / 'src'
img = {}
for f in sorted((root / 'img').glob('*.webp')):
    img[f.stem] = 'data:image/webp;base64,' + base64.b64encode(f.read_bytes()).decode()
css = (src / 'style.css').read_text()
body = (src / 'body.html').read_text()
extra = (src / 'voice_enum.js').read_text() if DEV else ''
js = (src / 'app.js').read_text().replace('/* ================= boot ================= */', (src / 'games.js').read_text() + '\n' + (src / 'games2.js').read_text() + '\n' + (src / 'garden.js').read_text() + '\n' + extra + '\n/* ================= boot ================= */', 1)
assert 'GAMES.sort=' in js and 'function openGarden' in js
voice_js = ''
fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Rubik:wght@800;900&display=swap">'
content = (f'<title>Игралочка</title>\n{fonts}\n<style>\n{css}\n</style>\n{body}\n'
           f'<script>window.IMG={json.dumps(img)};</script>\n<script>{(root / "vendor" / "matter.min.js").read_text()}</script>\n{voice_js}<script>\n{js}\n</script>\n')
dist = root / ('dist-dev' if DEV else 'dist')
dist.mkdir(exist_ok=True)
for old in dist.glob('voice-*.js'):
    old.unlink()
for pk in sorted((root / 'voice' / 'packs').glob('*.json')):
    (dist / f'voice-{pk.stem}.js').write_text('(window.VP=window.VP||{})[' + json.dumps(pk.stem) + ']=' + pk.read_text() + ';\n')
(dist / 'igralochka-artifact.html').write_text(content)
head = ('<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">\n'
        '<meta name="theme-color" content="#FBF3E2">\n<meta name="apple-mobile-web-app-capable" content="yes">\n'
        '<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Игралочка">\n'
        '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);box-sizing:border-box}body{margin:0}[hidden]{display:none!important}</style>\n')
full = head + content.replace('<title>Игралочка</title>\n', '<title>Игралочка</title>\n', 1)
# move title/fonts/style into head, body content after
split = full.index(body)
full = full[:split] + '</head>\n<body>\n' + full[split:] + '</body>\n</html>\n'
(dist / 'igralochka.html').write_text(full)
for f in sorted(dist.iterdir()):
    if f.is_file(): print(f.name, round(f.stat().st_size / 1024), 'KB')
