"""Record every sentence with Silero v4 (Russian neural TTS) and write voice packs.
sentences.json {speaker: {key: text}} -> packs/<speaker>.json {key: base64 mp3}"""
import json, re, hashlib, base64, subprocess, sys, pathlib, time
import numpy as np, torch
torch.set_num_threads(2)
here = pathlib.Path(__file__).parent
VOICES = {'narrator': 'xenia', 'frag': 'xenia', 'nyam': 'aidar', 'shusha': 'kseniya', 'poch': 'baya', 'drak': 'eugene'}
RATES = {'narrator': '82%', 'frag': '82%', 'nyam': '90%', 'shusha': '92%', 'poch': '92%', 'drak': '75%'}
VER = 'v1'
SR = 24000
cache = here / 'cache' / 'silero'
cache.mkdir(parents=True, exist_ok=True)
(here / 'packs').mkdir(exist_ok=True)

ONES = ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать',
        'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать']
TENS = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто']
def num(n):
    n = int(n)
    if n < 20: return ONES[n]
    if n < 100: return TENS[n // 10] + ('' if n % 10 == 0 else ' ' + ONES[n % 10])
    return str(n)
STRESS = [('Шуш', 'Ш+уш'), ('Дракош', 'Драк+ош'), ('Почемучк', 'Почем+учк'), ('Бульбик', 'Б+ульбик'), ('Ириск', 'Ир+иск'),
          ('Мандаринк', 'Мандар+инк'), ('Мятик', 'М+ятик'), ('Пончик', 'П+ончик')]
def prep(t):
    t = re.sub(r'[«»"“”„]', '', t)
    t = re.sub(r'\s*[—–]\s*', ', ', t)
    t = t.replace('…', '.').replace('...', '.')
    t = re.sub(r'\d+', lambda m: num(m.group()), t)
    for a, b in STRESS:
        t = re.sub(a, b, t); t = re.sub(a.lower(), b.lower(), t)
    t = re.sub(r'^[,\s]+', '', t).strip()
    if not re.search(r'[.!?]$', t): t += '.'
    return t

model = torch.package.PackageImporter(str(here / 'silero' / 'v4_ru.pt')).load_pickle('tts_models', 'model')
def synth(text, voice, rate):
    ssml = f'<speak><prosody rate="{rate}">{text}</prosody></speak>'
    try:
        a = model.apply_tts(ssml_text=ssml, speaker=voice, sample_rate=SR, put_accent=True, put_yo=True)
    except Exception:
        a = model.apply_tts(text=text, speaker=voice, sample_rate=SR, put_accent=True, put_yo=True)
    a = a.numpy().astype(np.float32)
    thr = max(1e-4, np.abs(a).max() * 0.02)
    idx = np.where(np.abs(a) > thr)[0]
    if len(idx): a = a[max(0, idx[0] - int(.03 * SR)): idx[-1] + int(.08 * SR)]
    a = a / max(1e-6, np.abs(a).max()) * 0.9
    fade = int(.008 * SR); a[:fade] *= np.linspace(0, 1, fade); a[-fade:] *= np.linspace(1, 0, fade)
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-b:a', '32k', '-f', 'mp3', '-'],
                       input=a.tobytes(), capture_output=True, check=True)
    return p.stdout

S = json.loads((here / 'sentences.json').read_text())
only = sys.argv[1:]
t0 = time.time(); total = 0
for spk, items in S.items():
    if only and spk not in only: continue
    voice = VOICES[spk]; rate = RATES[spk]; pack = {}; new = 0
    for key, text in items.items():
        tt = prep(text)
        h = hashlib.md5(f'{VER}|{voice}|{rate}|{tt}'.encode()).hexdigest()[:20]
        f = cache / f'{h}.mp3'
        if not f.exists():
            try: f.write_bytes(synth(tt, voice, rate)); new += 1
            except Exception as e: print('FAIL', spk, repr(text), e); continue
        pack[key] = base64.b64encode(f.read_bytes()).decode()
    (here / 'packs' / f'{spk}.json').write_text(json.dumps(pack, ensure_ascii=False, separators=(',', ':')))
    sz = sum(len(v) for v in pack.values()); total += sz
    print(f'{spk:9} {voice:8} {len(pack)}/{len(items)} clips, new {new}, {sz/1048576:.2f} MB, {time.time()-t0:.0f}s', flush=True)
print(f'total {total/1048576:.2f} MB')
