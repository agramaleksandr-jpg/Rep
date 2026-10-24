// Collect every Russian phrase fragment from the game sources and print JSON {key: ttsText}
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..', 'src');
const files = ['app.js', 'games.js', 'garden.js'].map(f => fs.readFileSync(path.join(SRC, f), 'utf8'));
const vnorm = t => String(t).toLowerCase().replace(/ё/g, 'е').replace(/<[^>]*>/g, ' ').replace(/[^a-zа-я0-9\s-]/g, ' ').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();

function literals(src) {
  const out = []; let i = 0; const n = src.length;
  const stack = [{ t: 'code', depth: 0 }];
  let lastSig = '(';
  let buf = '';
  while (i < n) {
    const top = stack[stack.length - 1]; const c = src[i], d = src[i + 1];
    if (top.t === 'code') {
      if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue }
      if (c === '/' && d === '*') { i = src.indexOf('*/', i + 2); i = i < 0 ? n : i + 2; continue }
      if (c === "'" || c === '"') { stack.push({ t: 'str', q: c }); buf = ''; i++; continue }
      if (c === '`') { stack.push({ t: 'tpl' }); buf = ''; i++; continue }
      if (c === '/' && '(,=:[!&|?{};+-*%<>~^'.includes(lastSig)) { // regex literal
        i++; let cls = false; while (i < n) { const ch = src[i]; if (ch === '\\') { i += 2; continue } if (ch === '[') cls = true; else if (ch === ']') cls = false; else if (ch === '/' && !cls) break; i++ } i++; while (/[a-z]/.test(src[i] || '')) i++; lastSig = 'x'; continue }
      if (c === '{') top.depth++;
      if (c === '}') { if (top.depth === 0 && stack.length > 1) { stack.pop(); buf = ''; i++; continue } top.depth-- }
      if (!/\s/.test(c)) lastSig = c;
      i++; continue
    }
    if (top.t === 'str') {
      if (c === '\\') { buf += src[i + 1]; i += 2; continue }
      if (c === top.q) { out.push(buf); stack.pop(); lastSig = 'x'; i++; continue }
      buf += c; i++; continue
    }
    if (top.t === 'tpl') {
      if (c === '\\') { buf += src[i + 1]; i += 2; continue }
      if (c === '`') { out.push(buf); stack.pop(); lastSig = 'x'; i++; continue }
      if (c === '$' && d === '{') { out.push(buf); buf = ''; stack.push({ t: 'code', depth: 0, inTpl: true }); lastSig = '('; i += 2; continue }
      buf += c; i++; continue
    }
  }
  return out;
}
// when an expression inside a template closes we must resume the template buffer
const units = new Map();
function addUnit(raw) {
  let t = raw.replace(/<[^>]*>/g, ' ').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, ' ').replace(/\s+/g, ' ').trim();
  t = t.replace(/^[\s,.:;!?—–«»"()+=-]+|[\s,:;—–«»"(+=-]+$/g, '').trim();
  if (!/[а-яё]/i.test(t) || /[a-z]/i.test(t) || t.length > 150) return;
  const k = vnorm(t); if (!k) return;
  if (!units.has(k)) units.set(k, t);
}
for (const src of files) for (const lit of literals(src)) {
  if (!/[а-яё]/i.test(lit)) continue;
  for (const part of lit.split(/(?<=[.!?…])\s+|[|]/)) addUnit(part);
  // also allow clause-level reuse for long sentences with commas
}
for (let k = 0; k <= 20; k++) units.set(String(k), String(k));
// composite phrases for dynamic sentences, so they sound whole instead of word-by-word
function grab(src, name, open, close) { const i = src.indexOf('const ' + name + '=' + open); if (i < 0) return null; let d = 0, j = i + name.length + 7;
  for (; j < src.length; j++) { const c = src[j]; if (c === '[' || c === '{') d++; else if (c === ']' || c === '}') { d--; if (!d) break } }
  return (0, eval)('(' + src.slice(i + name.length + 7, j + 1) + ')') }
const [APP, , GARDEN] = files;
const RES = grab(APP, 'RES', '{', '}'), NB = grab(APP, 'NB', '{', '}'), OWN = grab(APP, 'RES_OWNER', '{', '}');
const ALLP = [...grab(APP, 'PARTS', '[', ']'), ...grab(GARDEN, 'GPARTS', '[', ']')];
const extra = [];
for (const r in RES) extra.push(`к ${NB[OWN[r]].dat} за ${RES[r].ins}`);
for (const p of ALLP) extra.push(`Чтобы построить ${p.acc}, сходи`, `Нажми на дом и построй ${p.acc}!`, `Иди в сад и построй ${p.acc}!`, `Можно построить ${p.acc}!`, `Построили ${p.acc}!`, `Сначала построй ${p.acc}!`);
for (const x of extra) { const k = vnorm(x); if (!units.has(k)) units.set(k, x.replace(/[!,]$/, '')) }
const PRON = { 'му у у': 'мууу', 'бе е е': 'бээээ', 'ме е е': 'мээээ', 'у ху': 'уху' };
for (const k in PRON) if (units.has(k)) units.set(k, PRON[k]);
for (const k of [...units.keys()]) if (!/\s/.test(k) && !/\d/.test(k) && !/[аеиоуыэюя]/.test(k)) units.delete(k);
process.stdout.write(JSON.stringify(Object.fromEntries(units), null, 0));
