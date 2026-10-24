"""Put stress marks (+ before the stressed vowel) on every sentence with the Silero stress model.
Writes stressed.json {plain sentence text: stressed text}; words.txt for review."""
import json, re, pathlib, sys
from silero_stress import load_accentor
from textprep import prep_base
here = pathlib.Path(__file__).parent
acc = load_accentor()
S = json.loads((here / 'sentences.json').read_text())
FIX = json.loads((here / 'stress_fix.json').read_text()) if (here / 'stress_fix.json').exists() else {}
V = 'аеёиоуыэюяАЕЁИОУЫЭЮЯ'
def strip1(w):  # drop marks on one-vowel words
    return w.replace('+', '') if sum(c in V for c in w) <= 1 else w
out = {}; forms = {}
for spk, d in S.items():
    for t in d.values():
        if t in out: continue
        s = acc(prep_base(t))
        s = re.sub(r"[+А-Яа-яЁё]+", lambda m: strip1(m.group()), s)
        def fix(m):
            w = m.group(); plain = w.replace('+', '').lower()
            if plain in FIX:
                f = FIX[plain]; return f[0].upper() + f[1:] if w[0].isupper() else f
            return w
        s = re.sub(r"[+А-Яа-яЁё]+", fix, s)
        out[t] = s
        for w in re.findall(r"[+А-Яа-яЁё]+", s):
            if '+' in w: forms.setdefault(w.replace('+', '').lower(), {}).setdefault(w.lower(), t)
(here / 'stressed.json').write_text(json.dumps(out, ensure_ascii=False, indent=0))
lines = []
for p in sorted(forms):
    vs = forms[p]
    lines.append(' | '.join(f'{v}' for v in vs) + ('   <<< ' + ' // '.join(vs.values()) if len(vs) > 1 else ''))
(here / 'words.txt').write_text('\n'.join(lines))
print(len(out), 'sentences', len(forms), 'words', sum(1 for p in forms if len(forms[p]) > 1), 'with variants')
