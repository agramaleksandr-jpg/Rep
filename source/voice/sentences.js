// Build the list of whole sentences to record, per speaker.
// Sources: static string literals (by code section -> speaker), enum.json (dynamic combos from the page),
// extra.json (pairs seen in play tests). Output: sentences.json {speaker: {key: ttsText}}
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..', 'src');
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');
const vnorm = t => String(t).toLowerCase().replace(/ё/g, 'е').replace(/<[^>]*>/g, ' ').replace(/[^a-zа-я0-9\s-]/g, ' ').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
const vsplit = t => (String(t).replace(/<[^>]*>/g, ' ').match(/[^.!?…]+[.!?…]*/g) || []).map(x => x.trim()).filter(x => vnorm(x));
const HOSTS = ['nyam', 'shusha', 'poch', 'drak'];

// lexer: string/template literal pieces with flags whether the piece starts/ends the literal
function literals(src) {
  const out = []; let i = 0; const n = src.length; const stack = [{ t: 'code', depth: 0 }]; let lastSig = '('; let buf = '', bufStart = true;
  while (i < n) {
    const top = stack[stack.length - 1]; const c = src[i], d = src[i + 1];
    if (top.t === 'code') {
      if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue }
      if (c === '/' && d === '*') { i = src.indexOf('*/', i + 2); i = i < 0 ? n : i + 2; continue }
      if (c === "'" || c === '"') { stack.push({ t: 'str', q: c, pos: i }); buf = ''; bufStart = true; i++; continue }
      if (c === '`') { stack.push({ t: 'tpl', pos: i }); buf = ''; bufStart = true; i++; continue }
      if (c === '/' && '(,=:[!&|?{};+-*%<>~^'.includes(lastSig)) { i++; let cls = false; while (i < n) { const ch = src[i]; if (ch === '\\') { i += 2; continue } if (ch === '[') cls = true; else if (ch === ']') cls = false; else if (ch === '/' && !cls) break; i++ } i++; while (/[a-z]/.test(src[i] || '')) i++; lastSig = 'x'; continue }
      if (c === '{') top.depth++;
      if (c === '}') { if (top.depth === 0 && stack.length > 1 && top.inTpl) { stack.pop(); buf = ''; bufStart = false; i++; continue } top.depth-- }
      if (!/\s/.test(c)) lastSig = c; i++; continue
    }
    if (top.t === 'str') { if (c === '\\') { buf += src[i + 1]; i += 2; continue } if (c === top.q) { out.push({ text: buf, start: true, end: true, pos: top.pos }); stack.pop(); lastSig = 'x'; i++; continue } buf += c; i++; continue }
    if (top.t === 'tpl') {
      if (c === '\\') { buf += src[i + 1]; i += 2; continue }
      if (c === '`') { out.push({ text: buf, start: bufStart, end: true, pos: top.pos }); stack.pop(); lastSig = 'x'; i++; continue }
      if (c === '$' && d === '{') { out.push({ text: buf, start: bufStart, end: false, pos: top.pos }); buf = ''; stack.push({ t: 'code', depth: 0, inTpl: true }); lastSig = '('; i += 2; continue }
      buf += c; i++; continue
    }
  }
  return out;
}
const clean = t => t.replace(/<[^>]*>/g, ' ').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{20E3}]/gu, ' ').replace(/\s+/g, ' ').trim();
const okText = t => /[а-яё]/i.test(t) && !/[a-z]/i.test(t) && t.length <= 220;

const S = { narrator: {}, nyam: {}, shusha: {}, poch: {}, drak: {}, frag: {} };
const addS = (spk, text) => { const t = clean(text); if (!okText(t)) return; for (const s of vsplit(t)) { const k = vnorm(s); if (k && !S[spk][k]) S[spk][k] = s } };
const addF = text => { const t = clean(text).replace(/^[\s,.:;!?—–«»"()+=-]+|[\s,:;—–«»"(+=-]+$/g, '').trim(); if (!okText(t)) return; const k = vnorm(t); if (k && k.length > 1 && !S.frag[k]) S.frag[k] = t };

function sectionsOf(file, src) {
  if (file !== 'games.js') return [{ from: 0, spk: 'narrator' }];
  const marks = [{ from: 0, spk: 'narrator' }]; const re = /\/\* --- /g; let m;
  while ((m = re.exec(src))) { const h = /GAMES\.\w+=\{host:'(\w+)'/.exec(src.slice(m.index)); marks.push({ from: m.index, spk: h ? h[1] : 'narrator' }) }
  return marks;
}
for (const file of ['app.js', 'games.js', 'garden.js']) {
  const src = read(file); const secs = sectionsOf(file, src);
  const spkAt = pos => { let s = 'narrator'; for (const x of secs) if (x.from <= pos) s = x.spk; return s };
  for (const lit of literals(src)) {
    if (!/[а-яё]/i.test(lit.text)) continue;
    const spk = spkAt(lit.pos); const t = clean(lit.text);
    const parts = vsplit(t);
    parts.forEach((s, i) => {
      const complete = (i > 0 || lit.start || /^\s+[А-ЯЁ]/.test(lit.text)) && (i < parts.length - 1 || (lit.end && /[.!?…]$/.test(s)) || (lit.end && lit.start));
      if (complete) addS(spk, s); else addF(s);
    });
    // fragments for word-level fallback (narrator voice)
    if (!(lit.start && lit.end) || vnorm(t).split(' ').length <= 3) for (const p of t.split(/[.!?…]/)) addF(p);
  }
}
// neighbours' greetings and generic praise are said by everybody
const app = read('app.js');
for (const m of app.matchAll(/\{id:'(\w+)'[^\n]*?hello:'([^']+)'/g)) addS(m[1], m[2]);
for (const arr of ['PRAISE', 'TRY']) { const m = new RegExp(`const ${arr}=\\[([^\\]]+)\\]`).exec(app); for (const s of m[1].match(/'[^']+'/g)) for (const h of HOSTS) addS(h, s.slice(1, -1)) }
// dynamic combos and pairs seen in play tests
for (const f of ['enum.json', 'extra.json']) { const p = path.join(__dirname, f); if (fs.existsSync(p)) for (const [spk, text] of JSON.parse(fs.readFileSync(p, 'utf8'))) addS(S[spk] ? spk : 'narrator', text) }
for (let k = 0; k <= 20; k++) S.frag[String(k)] = String(k);
fs.writeFileSync(path.join(__dirname, 'sentences.json'), JSON.stringify(S, null, 0));
for (const k in S) console.log(k, Object.keys(S[k]).length, Object.values(S[k]).reduce((a, b) => a + b.length, 0), 'chars');
