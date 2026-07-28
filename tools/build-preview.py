#!/usr/bin/env python3
"""Собирает static/index.html в один файл preview.html для быстрого просмотра.

Инлайнит все локальные <link rel="stylesheet"> и <script src="..."> из
static/index.html и добавляет Google Fonts как временную замену локальным
.woff2 (см. блокер 5.7 в docs/AUDIT.md — файлы шрифтов ещё не выгружены).
Остальное совпадает с боевой вёрсткой один в один — включая стили
`.asset-pending` (они в `base.css`, а не только в превью).

Результат не редактировать руками — только пересобирать этим скриптом.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / "static"
SOURCE = STATIC / "index.html"
OUTPUT = ROOT / "preview.html"

GOOGLE_FONTS_HEAD = """<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
"""

LINK_RE = re.compile(r'<link rel="stylesheet" href="([^"]+)">\s*')
SCRIPT_RE = re.compile(r'<script src="([^"]+)"></script>')


def inline_css(match: re.Match) -> str:
    href = match.group(1)
    content = (STATIC / href).read_text(encoding="utf-8").rstrip("\n")
    return f"<style>\n{content}\n</style>\n"


def inline_js(match: re.Match) -> str:
    src = match.group(1)
    content = (STATIC / src).read_text(encoding="utf-8").rstrip("\n")
    return f"<script>\n{content}\n</script>"


def build() -> None:
    html = SOURCE.read_text(encoding="utf-8")
    html = LINK_RE.sub(inline_css, html)
    html = SCRIPT_RE.sub(inline_js, html)
    html = html.replace("<head>\n", "<head>\n" + GOOGLE_FONTS_HEAD, 1)
    OUTPUT.write_text(html, encoding="utf-8")
    print(f"preview.html собран из {SOURCE.relative_to(ROOT)} → {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
