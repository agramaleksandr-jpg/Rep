# Как продолжить работу над «Игралочкой»

## Сборка
- Исходники: `source/src` (app.js, games.js, games2.js, garden.js, style.css, body.html), картинки `source/img`, Matter.js `source/vendor`.
- `python3 build.py` → `dist/igralochka.html` + `dist/voice-*.js`; `python3 pwa.py vN` → `dist/pwa` (корень этого репозитория). Перед запуском скрипты из `source/` копируются в одну папку: `src/ img/ vendor/ voice/ build.py pwa.py`.
- Озвучка: `voice/packs/<голос>.json` ({ключ: base64 mp3}). build.py превращает их в `voice-<голос>.js`.

## Конвейер озвучки (source/voice)
1. `python3 build.py --dev` → в странице доступен `window.__venum()` (все динамические фразы) → сохранить в `voice/enum.json`.
2. `node voice/sentences.js` → `voice/sentences.json` (фразы целиком по голосам: narrator, nyam, shusha, poch, drak, frag).
3. `python3 voice/stress.py` (pip silero-stress) → `voice/stressed.json` с ударениями «+»; ручные исправления в `voice/stress_fix.json`.
4. Синтез: `voice/synth_silero.py` (Silero v4: модель из GitHub-репозитория Politrees/silero-tts, файл silero_tts/silero_models/v4_ru_ru.pt → voice/silero/v4_ru.pt).

## Следующий шаг (запрос пользователя)
Переозвучить игру открытой нейросетью нового поколения (F5-TTS, русская модель Misha24-10/F5-TTS_RUSSIAN с Hugging Face, вокодер charactr/vocos-mel-24khz) с клонированием голоса по образцу 10–15 с.
Голоса: ведущая — тёплый женский, у монстриков свои. Сначала пробные фразы на выбор, потом вся игра (~2000 фраз; кусочки frag можно оставить Silero).
Входной текст брать из `voice/stressed.json` (ударения «+»), результат — те же `voice/packs/<голос>.json`.
