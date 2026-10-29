"""Озвучить только новые фразы (нет в текущих пакетах) голосом Silero и добавить их в пакеты — временно, до переозвучки Яндексом."""
import json, base64, hashlib, pathlib
here = pathlib.Path(__file__).parent
src = (here / 'synth_silero.py').read_text()
exec(src[:src.index('S = json.loads(')])
S = json.loads((here / 'sentences.json').read_text())
for spk, items in S.items():
    pf = here / 'packs' / f'{spk}.json'; pack = json.loads(pf.read_text()); n = 0
    for key, text in items.items():
        if key in pack: continue
        voice, rate = VOICES[spk], RATES[spk]; tt = prep(text)
        h = hashlib.md5(f'{VER}|{voice}|{rate}|{tt}'.encode()).hexdigest()[:20]; f = cache / f'{h}.mp3'
        if not f.exists(): f.write_bytes(synth(tt, voice, rate))
        pack[key] = base64.b64encode(f.read_bytes()).decode(); n += 1
    pf.write_text(json.dumps(pack, ensure_ascii=False, separators=(',', ':'))); print(spk, 'added', n)
