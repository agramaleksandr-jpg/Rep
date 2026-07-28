#!/usr/bin/env python3
"""Собирает static/index.html в один файл preview.html для быстрого просмотра.

Инлайнит все локальные <link rel="stylesheet"> и <script src="..."> из
static/index.html, добавляет Google Fonts как временную замену локальным
.woff2 (см. блокер 5.7 в docs/AUDIT.md — файлы шрифтов ещё не выгружены)
и стили для .asset-pending — техническую заглушку недостающих ассетов,
которая нужна только для наглядности превью и не идёт в боевую вёрстку.

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

ASSET_PENDING_CSS = """<style>
/* ===== только для превью, в боевую вёрстку не идёт ===== */
.asset-pending{
  display:inline-block;border:1px dashed rgba(15,23,43,.35);
  border-radius:3px;background:rgba(15,23,43,.03);
}
.logo__mark .asset-pending,.hero__stat-icon .asset-pending,.benefits__icon .asset-pending{
  border-color:rgba(255,255,255,.85);background:rgba(255,255,255,.12);
}
.btn .asset-pending{border-color:currentColor;opacity:.55;background:none}
.asset-pending--photo{
  display:flex;align-items:center;justify-content:center;
  width:100%;height:100%;padding:16px;text-align:center;
  font-size:12px;line-height:16px;color:#62748e;
}
</style>
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
    html = html.replace("</head>", ASSET_PENDING_CSS + "</head>", 1)
    OUTPUT.write_text(html, encoding="utf-8")
    print(f"preview.html собран из {SOURCE.relative_to(ROOT)} → {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
