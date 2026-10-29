"""Пакет обновления для переозвучки на компьютере пользователя.
python3 make_update.py <старый audio/phrases.csv> <старый audio/.original.json> <папка пакета> <pwa-папка игры>
Берёт текущие sentences.json/stressed.json/packs, сохраняет нумерацию старых фраз, новые добавляет в конец.
В пакет кладёт: audio/phrases.csv, audio/.original.json, mp3 только для НОВЫХ фраз (временный голос),
audio/<голос>/_фразы.txt, pwa/index.html + sw.js, tools/yandex_tts.py."""
import base64, csv, hashlib, json, pathlib, re, shutil, sys
here = pathlib.Path(__file__).parent
old_csv, old_orig, out, pwa = map(pathlib.Path, sys.argv[1:5])
LBL = {'narrator': 'Ведущая', 'nyam': 'Ням', 'shusha': 'Шуша', 'poch': 'Почемучка', 'drak': 'Дракоша', 'frag': 'Запасные кусочки'}
S = json.loads((here / 'sentences.json').read_text()); ST = json.loads((here / 'stressed.json').read_text())
packs = {s: json.loads((here / 'packs' / f'{s}.json').read_text()) for s in S}
acute = lambda t: re.sub(r'\+(.)', lambda m: m.group(1) + '́', t)
with open(old_csv, encoding='utf-8-sig', newline='') as f: old = list(csv.reader(f, delimiter=';'))
head, rows = old[0], old[1:]
orig = json.loads(old_orig.read_text())
have = {(r[1].split('/')[0], r[4]) for r in rows}
nmax = {}
for r in rows:
    spk, num = r[1].split('/')[0], int(pathlib.Path(r[1]).stem); nmax[spk] = max(nmax.get(spk, 0), num)
changed = 0
for r in rows:  # обновить тексты старых фраз (исправленные ударения и т. п.)
    spk, key = r[1].split('/')[0], r[4]
    t = S.get(spk, {}).get(key)
    if t is None: continue
    new = acute(ST.get(t, t))
    if new != r[3] or t != r[2]: changed += 1; r[2], r[3] = t, new
(out / 'audio').mkdir(parents=True, exist_ok=True)
added = {}
for spk in ['narrator', 'nyam', 'shusha', 'poch', 'drak', 'frag']:
    for key, t in S[spk].items():
        if (spk, key) in have: continue
        n = nmax.get(spk, 0) + 1; nmax[spk] = n; rel = f'{spk}/{n:04d}.mp3'
        rows.append([LBL[spk], rel, t, acute(ST.get(t, t)), key])
        data = base64.b64decode(packs[spk][key]); d = out / 'audio' / spk; d.mkdir(exist_ok=True)
        (d / f'{n:04d}.mp3').write_bytes(data); orig[f'{spk}/{n:04d}'] = hashlib.sha1(data).hexdigest()
        added[spk] = added.get(spk, 0) + 1
order = {s: i for i, s in enumerate(['narrator', 'nyam', 'shusha', 'poch', 'drak', 'frag'])}
rows.sort(key=lambda r: (order[r[1].split('/')[0]], r[1]))
with open(out / 'audio' / 'phrases.csv', 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.writer(f, delimiter=';'); w.writerow(head); w.writerows(rows)
(out / 'audio' / '.original.json').write_text(json.dumps(orig))
for spk in order:
    d = out / 'audio' / spk; d.mkdir(exist_ok=True)
    (d / '_фразы.txt').write_text('\n'.join(f'{pathlib.Path(r[1]).stem}  {r[3]}' for r in rows if r[1].startswith(spk + '/')), encoding='utf-8')
(out / 'pwa').mkdir(exist_ok=True)
for f in ['index.html', 'sw.js']: shutil.copy(pwa / f, out / 'pwa' / f)
print('rows', len(rows), 'added', added, 'texts changed', changed)
