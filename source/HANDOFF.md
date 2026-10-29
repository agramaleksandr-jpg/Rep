# Как продолжить работу над «Игралочкой»

## Сборка
- Исходники: `source/src` (app.js, games.js, games2.js, games3.js, games4.js, garden.js, style.css, body.html), картинки `source/img`, Matter.js `source/vendor`.
- Скрипты из `source/` копируются в одну папку: `src/ img/ vendor/ voice/ build.py pwa.py`.
- `python3 build.py` → `dist/igralochka.html` + `dist/voice-*.js`; `python3 pwa.py vN-ДАТА` → `dist/pwa` (корень этого репозитория).
- Озвучка: `voice/packs/<голос>.json` ({ключ: base64 mp3}), build.py превращает их в `voice-<голос>.js`.

## Игры (по 5 уровней)
- Ням: feed, count, sort, slice. Почемучка: why, riddle, order, run.
- Шуша: prank, detective, sling, cups («Где мячик?»), dig («Раскопки»), molds («Куличики»), pairs («Пары»).
- Дракоша: parcel, maze, fly, fire («Огонёк»), mail («Почта»), dots («Точки»).
- Если у соседа больше 4 игр, плитки в доме листаются лентой.

## Конвейер озвучки (source/voice)
1. `python3 build.py --dev` → в странице `window.__venum()` (все динамические фразы) → `voice/enum.json`.
2. `node voice/sentences.js` → `voice/sentences.json` (фразы по голосам: narrator, nyam, shusha, poch, drak, frag).
3. `python3 voice/stress.py` (pip silero-stress) → `voice/stressed.json` с ударениями «+»; ручные правки в `voice/stress_fix.json`.
4. Основной голос — Яндекс SpeechKit v3 (озвучивает пользователь у себя: tools/yandex_tts.py из пакета обновления).
   Голоса: narrator=marina:friendly:0.9, nyam=zahar:good, shusha=marina:friendly:1:60, poch=lera:friendly, drak=alexander:good:0.9.
5. Новые фразы до переозвучки: `python3 voice/add_interim.py` (Silero v4, только отсутствующие ключи).
6. Пакет для переозвучки: `python3 voice/make_update.py <старый phrases.csv> <старый .original.json> <папка> dist/pwa`.
