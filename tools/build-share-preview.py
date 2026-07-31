#!/usr/bin/env python3
"""Собирает всю статику в ОДИН самодостаточный HTML — чтобы показать
результат заказчику по ссылке, без сервера и без установки WordPress.

Отличие от `build-preview.py`: тот кладёт в один файл только главную,
а этот — все 9 страниц сразу. Шапка, подвал и модалка общие (как в жизни),
меняется только содержимое `<main>`; переходы по ссылкам работают через
hash-роутер (`#/courses`, `#/about`, …).

Внутрь зашивается всё: стили, скрипт и шрифты Inter (base64) — файл
открывается двойным щелчком и работает офлайн. Шрифты берутся с Google
Fonts один раз и кэшируются в `tools/.fonts-cache/`, потому что своих
`.woff2` в проекте пока нет (блокер 5.7 в docs/AUDIT.md).

ВАЖНО: это витрина для показа, а не боевая сборка. Боевая вёрстка —
`static/`, продакшен — тема `wp-theme/vektor-semi`. Файл не редактировать
руками, только пересобирать этим скриптом.
"""

import base64
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / "static"
CACHE = Path(__file__).resolve().parent / ".fonts-cache"
OUTPUT = ROOT / "share-preview.html"
EMBED = ROOT / "share-preview.body.html"

# Порядок как в статике: база → компоненты → адаптив последним.
# `fonts.css` намеренно не подключаем: он объявляет @font-face на локальные
# .woff2, которых ещё нет. В витрине их заменяет встроенный base64 —
# иначе битые правила перекрыли бы встроенные и текст съехал бы на системный.
CSS_ORDER = [
    "tokens.css",
    "base.css",
    "components/button.css",
    "components/header.css",
    "components/footer.css",
    "components/breadcrumb.css",
    "components/modal.css",
    "components/hero.css",
    "components/benefits.css",
    "components/online-classes.css",
    "components/timeline-format.css",
    "components/attestation-exam.css",
    "components/parents-teachers.css",
    "components/results-faq.css",
    "components/courses.css",
    "components/course.css",
    "components/attestation.css",
    "components/about.css",
    "components/parents.css",
    "components/blog.css",
    "components/blog-post.css",
    "components/contacts.css",
    "adaptive.css",
]

# id роутера → файл. Первый — стартовый.
PAGES = [
    ("home", "index.html"),
    ("courses", "pages/courses.html"),
    ("course", "pages/course.html"),
    ("attestation", "pages/attestation.html"),
    ("about", "pages/about.html"),
    ("parents", "pages/parents.html"),
    ("blog", "pages/blog.html"),
    ("blog-post", "pages/blog-post.html"),
    ("contacts", "pages/contacts.html"),
]

GOOGLE_CSS = (
    "https://fonts.googleapis.com/css2"
    "?family=Inter:wght@400;500;600;700&display=swap"
)
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
KEEP_SUBSETS = ("cyrillic", "latin")


def fetch(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


def cached(name: str, url: str) -> bytes:
    CACHE.mkdir(exist_ok=True)
    path = CACHE / name
    if not path.exists():
        path.write_bytes(fetch(url))
    return path.read_bytes()


def build_fonts_css() -> str:
    """Inter с Google Fonts, зашитый в base64. Только cyrillic и latin —
    остальные подмножества в макете не нужны и только раздувают файл."""
    try:
        source = cached("inter.css", GOOGLE_CSS).decode("utf-8")
    except Exception as error:  # сеть недоступна — не повод ронять сборку
        print(f"  шрифты не скачались ({error}); останется системный шрифт")
        return ""

    blocks = re.findall(r"/\* (\S+) \*/\s*(@font-face \{.*?\})", source, re.S)
    out = []
    for subset, block in blocks:
        if subset not in KEEP_SUBSETS:
            continue
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        weight = re.search(r"font-weight: (\d+)", block).group(1)
        data = cached(f"inter-{weight}-{subset}.woff2", url)
        uri = "data:font/woff2;base64," + base64.b64encode(data).decode("ascii")
        out.append(block.replace(url, uri))

    total = sum(len(b) for b in out) // 1024
    print(f"  шрифты Inter: {len(out)} файлов, ~{total} КБ в base64")
    return "\n".join(out)


def collect_css() -> str:
    parts = []
    for name in CSS_ORDER:
        path = STATIC / "assets" / "css" / name
        parts.append(f"/* ===== {name} ===== */\n{path.read_text(encoding='utf-8').rstrip()}")
    return "\n\n".join(parts)


def rewrite_links(html: str) -> str:
    """Ссылки между страницами → маршруты роутера. Якоря внутри страницы
    (`href="#..."`) не трогаем — их обрабатывает штатный main.js."""
    route = {file.split("/")[-1]: page for page, file in PAGES}

    def replace(match: re.Match) -> str:
        target = match.group(1)
        file = target.split("#")[0].split("/")[-1]
        if file not in route:
            return match.group(0)
        page = route[file]
        return f'href="#/{"" if page == "home" else page}"'

    return re.sub(r'href="((?:\.\./|pages/)?[a-z0-9-]+\.html(?:#[\w-]+)?)"', replace, html)


def extract_main(html: str) -> str:
    start = html.index("<main")
    end = html.index("</main>") + len("</main>")
    return html[start:end]


def page_title(html: str) -> str:
    return re.search(r"<title>(.*?)</title>", html, re.S).group(1).strip()


ROUTER_JS = """
/* --- Роутер витрины ----------------------------------------------------
   Только для однофайлового превью: в боевой вёрстке это отдельные
   страницы со своими адресами, никакого роутера там нет. */
(function () {
  'use strict';

  var pages = Array.prototype.slice.call(document.querySelectorAll('[data-page]'));
  var titles = window.__pageTitles || {};
  var nav = document.querySelectorAll('.header__nav-link');

  function routeOf(hash) {
    var id = (hash || '').replace(/^#\\//, '');
    return id === '' ? 'home' : id;
  }

  function closeMenu() {
    var burger = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-menu]');
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }

  function show(id, animate) {
    var known = pages.some(function (p) { return p.dataset.page === id; });
    if (!known) id = 'home';

    pages.forEach(function (p) { p.hidden = p.dataset.page !== id; });

    nav.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (routeOf(href) === id && href.charAt(0) === '#') {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (titles[id]) document.title = titles[id];

    // Блоки с .reveal показываются наблюдателем при прокрутке. Тот, что
    // уже отработал, второй раз не сработает — на скрытой странице
    // раскрываем всё сразу, иначе часть секций осталась бы невидимой.
    var current = pages.filter(function (p) { return p.dataset.page === id; })[0];
    if (current) {
      current.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }

    closeMenu();
    window.scrollTo(0, 0);
  }

  // Перехватываем в фазе погружения: штатный обработчик якорей в main.js
  // висит на document и на «#/courses» упал бы с ошибкой селектора.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#/"]');
    if (!link) return;
    event.preventDefault();
    event.stopPropagation();
    var next = link.getAttribute('href');
    if (window.location.hash === next) show(routeOf(next));
    else window.location.hash = next;
  }, true);

  window.addEventListener('hashchange', function () {
    show(routeOf(window.location.hash));
  });

  show(routeOf(window.location.hash));
}());
"""

BANNER = """
  <div class="preview-note">
    <strong>Превью вёрстки.</strong> Все 9 страниц собраны в один файл,
    переходы по меню работают. Формы — только интерфейс и проверка полей,
    заявки никуда не отправляются. На местах иконок и фотографий —
    штриховка: ассеты из Figma ещё не выгружены.
  </div>
"""

BANNER_CSS = """
/* ===== плашка витрины (в боевой вёрстке её нет) =====
   Внизу и фиксировано: шапка сайта — position: fixed сверху, и плашка
   в потоке документа перекрывала бы ей навигацию. Ниже модалки (z 200)
   и шапки (z 100), чтобы ничего не загораживать. */
/* Макет светлый и другого варианта в Figma нет — фиксируем схему,
   иначе браузер в тёмной теме перекрасил бы поля форм и скроллбары. */
:root { color-scheme: light; }

.preview-note {
  position: fixed;
  inset-inline: 0;
  inset-block-end: 0;
  z-index: 90;
  padding: 10px 32px;
  background-color: #0f172b;
  color: #f8fafc;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
}
.preview-note strong { color: #fff; }
/* чтобы плашка не накрывала низ подвала */
body { padding-block-end: 64px; }
@media (max-width: 900px) {
  .preview-note { padding: 10px 20px; font-size: 12px; line-height: 18px; }
  body { padding-block-end: 76px; }
}
"""


def build() -> None:
    print("Сборка витрины:")

    chrome_source = (STATIC / "index.html").read_text(encoding="utf-8")

    mains, titles = [], {}
    for page, file in PAGES:
        html = (STATIC / file).read_text(encoding="utf-8")
        titles[page] = page_title(html)
        main = rewrite_links(extract_main(html))
        # id="main" есть на каждой странице — в одном документе он должен
        # остаться единственным, поэтому оставляем его только у активной.
        main = main.replace(' id="main"', "", 1)
        hidden = "" if page == PAGES[0][0] else " hidden"
        mains.append(f'<div data-page="{page}"{hidden}>\n{main}\n</div>')
        print(f"  {file:24} → #/{'' if page == 'home' else page}")

    head_start = chrome_source.index("<head>") + len("<head>")
    head_end = chrome_source.index("</head>")
    body_main_start = chrome_source.index("<main")
    body_main_end = chrome_source.index("</main>") + len("</main>")

    head = chrome_source[head_start:head_end]
    head = re.sub(r'\s*<link rel="stylesheet" href="[^"]+">', "", head)
    head = re.sub(r"\s*<link rel=\"preload\"[^>]+>", "", head)
    head = re.sub(r"<title>.*?</title>", f"<title>{titles['home']}</title>", head, flags=re.S)

    before = rewrite_links(chrome_source[:body_main_start])
    after = rewrite_links(chrome_source[body_main_end:])
    before = before[before.index("<body>") + len("<body>"):]
    after = after[: after.index("</body>")]
    after = re.sub(r'\s*<script src="[^"]+"></script>', "", after)

    css = "\n\n".join([build_fonts_css(), collect_css(), BANNER_CSS])
    js = (STATIC / "assets" / "js" / "main.js").read_text(encoding="utf-8")
    titles_js = ",".join(f'"{k}":{_json_string(v)}' for k, v in titles.items())

    document = (
        "<!doctype html>\n"
        '<html lang="ru">\n<head>'
        f"{head}"
        f"<style>\n{css}\n</style>\n"
        "</head>\n<body>\n"
        f"{BANNER}"
        f"{before}\n"
        '<div id="main">\n' + "\n".join(mains) + "\n</div>\n"
        f"{after}\n"
        f"<script>window.__pageTitles={{{titles_js}}};</script>\n"
        f"<script>\n{js}\n</script>\n"
        f"<script>{ROUTER_JS}</script>\n"
        "</body>\n</html>\n"
    )

    OUTPUT.write_text(document, encoding="utf-8")
    size = len(document.encode("utf-8")) // 1024
    print(f"  готово: {OUTPUT.relative_to(ROOT)} ({size} КБ)")

    # Тот же документ без <!doctype>/<html>/<head>/<body> — для публикации
    # на хостинге, который сам оборачивает содержимое в свой скелет.
    embed = (
        f"<title>{titles['home']}</title>\n"
        f"<style>\n{css}\n</style>\n"
        f"{BANNER}"
        f"{before}\n"
        '<div id="main">\n' + "\n".join(mains) + "\n</div>\n"
        f"{after}\n"
        f"<script>window.__pageTitles={{{titles_js}}};</script>\n"
        f"<script>\n{js}\n</script>\n"
        f"<script>{ROUTER_JS}</script>\n"
    )
    EMBED.write_text(embed, encoding="utf-8")
    print(f"  готово: {EMBED.relative_to(ROOT)} (для публикации по ссылке)")


def _json_string(value: str) -> str:
    import json

    return json.dumps(value, ensure_ascii=False)


if __name__ == "__main__":
    sys.exit(build())
