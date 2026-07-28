# Ассеты к выгрузке

Figma отдаёт ассеты временными ссылками (≈7 дней) через MCP
(`get_design_context` / `download_assets`). В этой рабочей среде прямой
скачивание по этим ссылкам недоступно (сетевая политика блокирует
`figma.com` для исходящих запросов) — ссылки получены, но byte-контент
не сохранён. Экспортировать реальными файлами при следующей сессии,
где есть доступ, командой `download_assets` по нужному node-id и
сохранить в указанный путь.

## Шапка / подвал (Figma `7:1479`, `7:1480`)

* [ ] `74:1250` — логотип (лист/росток), 33×24 → `assets/icons/logo-mark.svg`
* [ ] иконка стрелки в кнопке «Войти», 16×16 → `assets/icons/arrow-right.svg`
* [ ] иконка в кнопке «Записаться» (шапка), 16×16 → `assets/icons/arrow-right-sm.svg`

## Hero (`1:8`)

* [ ] фото ученицы за уроком → `assets/images/hero-student.jpg`
* [ ] иконка play в кружке, 31×30 → `assets/icons/play.svg`
* [ ] 3 иконки строки статистики, 24×24 → `assets/icons/stat-*.svg`
* [ ] иконка карточки «более 2000 учеников», 20×20 → `assets/icons/card-students.svg`
* [ ] иконка карточки «Официальная аттестация», 20×20 → `assets/icons/card-attestation.svg`

## Benefits (`1:76`) — добавлено в этой сессии

Все иконки 24×24, экспорт SVG, каждая — вектор внутри `Icon`-обёртки:

* [ ] `1:87` — «Живые уроки» → `assets/icons/benefits-live-lessons.svg`
* [ ] `1:100` — «Опытные преподаватели» → `assets/icons/benefits-teachers.svg`
* [ ] `1:112` — «Личное сопровождение» → `assets/icons/benefits-curator.svg`
* [ ] `1:125` — «Официальная аттестация» → `assets/icons/benefits-attestation.svg`
* [ ] `1:138` — «Контроль прогресса» → `assets/icons/benefits-progress.svg`
* [ ] `1:149` — «Поддержка родителей» → `assets/icons/benefits-parents.svg`
* [ ] `1:162` — «Понятная система» → `assets/icons/benefits-system.svg`
* [ ] `1:175` — «Без перегрузки» → `assets/icons/benefits-balance.svg`

До выгрузки в разметке стоит технический `.asset-pending` (см.
`docs/AUDIT.md` §5.4) — не финальный вид, только заглушка геометрии.
