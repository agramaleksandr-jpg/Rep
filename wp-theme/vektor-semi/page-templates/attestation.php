<?php
/**
 * Template Name: Аттестация
 *
 * Шаблон страницы «Аттестация» — Figma node 38:6513.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs( get_the_title() );
?>
<!-- ===================== Hero (Figma 38:6595) ======================= -->
<section class="course-hero">
  <div class="container">
    <div class="course-hero__grid">
      <div class="course-hero__content">
        <h1 class="course-hero__title">Аттестация без стресса и хаоса</h1>
        <p class="course-hero__text">Помогаем родителям разобраться, как проходит проверка знаний при дистанционном и семейном обучении, и готовим ребёнка к ней спокойно и системно.</p>

        <div class="course-hero__actions">
          <button class="btn btn--primary btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:32px">Получить консультацию по аттестации</button>
          <button class="btn btn--outline-brand btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:33px">Узнать о переходе в онлайн</button>
        </div>
      </div>

      <div class="attestation-hero__media" aria-hidden="true">
        <div class="attestation-hero__media-inner"><span class="asset-pending"></span></div>
      </div>

      <div class="course-hero__card attestation-hero__card--lesson" aria-hidden="true">
        <span class="asset-pending"></span>
        <span class="attestation-hero__card--lesson-text">Математика сдана</span>
      </div>

      <div class="course-hero__card attestation-hero__card--calendar" aria-hidden="true">
        <span class="attestation-hero__card--calendar-row">
          <span class="asset-pending"></span>
          <span class="attestation-hero__card--calendar-label">Календарь сдачи</span>
        </span>
        <span class="attestation-hero__card--calendar-value">Май 2024</span>
      </div>
    </div>
  </div>
</section>

<!-- =================== Что такое аттестация (Figma 38:6617) ========== -->
<section class="attestation-basics">
  <div class="container">
    <h2 class="course-section-title">Что такое аттестация простыми словами</h2>
    <p class="course-section-text">Аттестация — это официальное подтверждение того, что ребёнок усвоил программу своего класса. Она нужна для перевода в следующий класс и допуска к итоговым экзаменам (ОГЭ/ЕГЭ).</p>

    <div class="attestation-basics__grid">
      <div class="attestation-basics__card">
        <span class="attestation-basics__icon attestation-basics__icon--blue"><span class="asset-pending"></span></span>
        <h3 class="attestation-basics__title">Промежуточная аттестация</h3>
        <p class="attestation-basics__text">Проходит каждый год (обычно в конце учебного года или по четвертям/полугодиям). Это проверка знаний за текущий класс по всем обязательным предметам. Успешная сдача гарантирует перевод в следующий класс.</p>
      </div>
      <div class="attestation-basics__card">
        <span class="attestation-basics__icon attestation-basics__icon--amber"><span class="asset-pending"></span></span>
        <h3 class="attestation-basics__title">Итоговая аттестация (ГИА)</h3>
        <p class="attestation-basics__text">Это государственные экзамены — ОГЭ в 9 классе и ЕГЭ в 11 классе. К ним допускаются только те ученики, у которых нет задолженностей по промежуточным аттестациям.</p>
      </div>
    </div>
  </div>
</section>

<!-- =================== Формы обучения (Figma 38:6661) ================ -->
<section class="attestation-forms">
  <div class="container">
    <h2 class="course-section-title">Какие бывают формы обучения</h2>

    <div class="courses-compare__table-wrap" style="margin-block-start:48px">
      <table class="courses-compare__table">
        <thead>
          <tr>
            <th scope="col">Форма</th>
            <th scope="col">Кто отвечает за обучение</th>
            <th scope="col">Контроль знаний</th>
            <th scope="col">Аттестация</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Очное обучение</th>
            <td>Школа</td>
            <td>Ежедневный (оценки на уроках)</td>
            <td>Проходит внутри школы автоматически</td>
          </tr>
          <tr>
            <th scope="row">Заочное обучение</th>
            <td>Школа (составляет план, проверяет ДЗ)</td>
            <td>Регулярная сдача работ по графику</td>
            <td>По графику школы (дистанционно или очно)</td>
          </tr>
          <tr>
            <th scope="row">Семейное обучение</th>
            <td>Родители (имеют право привлекать репетиторов, онлайн-школы)</td>
            <td>Ответственность родителей</td>
            <td>Сдаётся в прикреплённой школе по её графику 1-2 раза в год</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="attestation-forms__note">Точную форму обучения и порядок оформления необходимо уточнять индивидуально.</p>
  </div>
</section>

<!-- ============= Как мы помогаем с подготовкой (Figma 38:6728) ======== -->
<section class="attestation-help">
  <span class="attestation-help__glow attestation-help__glow--left" aria-hidden="true"></span>
  <span class="attestation-help__glow attestation-help__glow--right" aria-hidden="true"></span>
  <div class="container">
    <h2 class="attestation-help__title">Как мы помогаем с подготовкой</h2>

    <ol class="attestation-help__grid">
      <li class="attestation-help__card">
        <span class="attestation-help__num">1</span>
        <p class="attestation-help__text">Составляем образовательный маршрут с учётом требований ФГОС</p>
      </li>
      <li class="attestation-help__card">
        <span class="attestation-help__num">2</span>
        <p class="attestation-help__text">Находим и мягко закрываем пробелы в знаниях за прошлые годы</p>
      </li>
      <li class="attestation-help__card">
        <span class="attestation-help__num">3</span>
        <p class="attestation-help__text">Предоставляем все необходимые материалы и тренажёры</p>
      </li>
      <li class="attestation-help__card">
        <span class="attestation-help__num">4</span>
        <p class="attestation-help__text">Регулярно проверяем домашние задания и даём обратную связь</p>
      </li>
      <li class="attestation-help__card">
        <span class="attestation-help__num">5</span>
        <p class="attestation-help__text">Отслеживаем реальный прогресс, а не просто ставим оценки</p>
      </li>
      <li class="attestation-help__card">
        <span class="attestation-help__num">6</span>
        <p class="attestation-help__text">Проводим тренировочные работы в формате аттестации</p>
      </li>
      <li class="attestation-help__card">
        <span class="attestation-help__num">7</span>
        <p class="attestation-help__text">Подробно объясняем родителям весь порядок действий</p>
      </li>
      <li class="attestation-help__card">
        <span class="attestation-help__num">8</span>
        <p class="attestation-help__text">Эмоционально поддерживаем ребёнка перед проверками</p>
      </li>
    </ol>
  </div>
</section>

<!-- ============= Прозрачность для родителей (Figma 38:6800) =========== -->
<section class="attestation-transparency">
  <div class="container">
    <div class="attestation-transparency__grid">
      <div class="attestation-transparency__content">
        <h2 class="course-section-title" style="text-align:start">Полная прозрачность для родителей</h2>
        <p class="course-section-text" style="margin-inline:0;text-align:start">Вам не придётся гадать, готов ли ребёнок к проверке знаний. Вы в любой момент видите реальную картину.</p>

        <ul class="attestation-transparency__list">
          <li class="attestation-transparency__item"><span class="asset-pending"></span> Понятное расписание пройденных и будущих тем</li>
          <li class="attestation-transparency__item"><span class="asset-pending"></span> Статус выполненных заданий и оценки за них</li>
          <li class="attestation-transparency__item"><span class="asset-pending"></span> Развёрнутые комментарии педагогов к работам</li>
          <li class="attestation-transparency__item"><span class="asset-pending"></span> Наглядная динамика успеваемости по каждому предмету</li>
          <li class="attestation-transparency__item"><span class="asset-pending"></span> Рекомендации от личного куратора</li>
          <li class="attestation-transparency__item"><span class="asset-pending"></span> Индикатор готовности к итоговой проверке</li>
        </ul>
      </div>

      <div class="attestation-transparency__dashboard" aria-hidden="true">
        <div class="attestation-transparency__subject">
          <div class="attestation-transparency__subject-row">
            <span>Математика</span>
            <span class="attestation-transparency__status--ready">Готов к сдаче</span>
          </div>
          <div class="attestation-transparency__bar"><span style="width:95%;background-color:#00c950"></span></div>
        </div>
        <div class="attestation-transparency__subject">
          <div class="attestation-transparency__subject-row">
            <span>Русский язык</span>
            <span class="attestation-transparency__status--progress">В процессе (80%)</span>
          </div>
          <div class="attestation-transparency__bar"><span style="width:80%;background-color:#2b7fff"></span></div>
        </div>
        <div class="attestation-transparency__subject">
          <div class="attestation-transparency__subject-row">
            <span>История</span>
            <span class="attestation-transparency__status--behind">Есть долги (45%)</span>
          </div>
          <div class="attestation-transparency__bar"><span style="width:45%;background-color:#ff6900"></span></div>
        </div>

        <p class="attestation-transparency__comment"><strong>Комментарий куратора:</strong> «По математике всё отлично, можно записываться на сдачу. По истории нужно сдать два теста за прошлую неделю.»</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== Особенности подготовки по классам (Figma 38:6908) ======= -->
<section class="attestation-classes">
  <div class="container">
    <h2 class="course-section-title">Особенности подготовки по классам</h2>

    <div class="attestation-classes__grid">
      <div class="attestation-classes__card">
        <h3 class="attestation-classes__title">1–4 классы</h3>
        <p class="attestation-classes__text">Главное — мягкая адаптация и минимизация стресса. Закладываем базовые навыки. Проверки проходят в максимально спокойной обстановке с поддержкой родителей.</p>
      </div>
      <div class="attestation-classes__card">
        <h3 class="attestation-classes__title">5–8 классы</h3>
        <p class="attestation-classes__text">Системная проверка знаний и контроль пробелов. Учим ребёнка самостоятельности. Вводим регулярные тренировочные тесты без запугивания.</p>
      </div>
      <div class="attestation-classes__card">
        <h3 class="attestation-classes__title">9 класс</h3>
        <p class="attestation-classes__text">Фокус на отсутствии задолженностей для допуска к ОГЭ. Выстраиваем чёткий план подготовки, чтобы сдача промежуточной аттестации не мешала подготовке к ОГЭ.</p>
      </div>
      <div class="attestation-classes__card">
        <h3 class="attestation-classes__title">10–11 классы</h3>
        <p class="attestation-classes__text">Итоговая траектория с упором на ЕГЭ. Сроки аттестации и документы уточняются индивидуально, чтобы освободить время для подготовки к поступлению.</p>
      </div>
    </div>
  </div>
</section>

<!-- ================ Важно про ОГЭ и ЕГЭ (Figma 38:6948) =============== -->
<section class="attestation-callout">
  <div class="container">
    <div class="attestation-callout__card">
      <div class="attestation-callout__heading">
        <span class="attestation-callout__icon"><span class="asset-pending"></span></span>
        <h2 class="attestation-callout__title">Важно про ОГЭ и ЕГЭ</h2>
      </div>
      <p class="attestation-callout__text">Итоговые государственные экзамены (ОГЭ в 9 классе и ЕГЭ в 11 классе) требуют отдельной, целенаправленной подготовки. Они проводятся строго в очном формате в аккредитованных школах.</p>
      <p class="attestation-callout__text">Наша школа помогает выстроить учебный маршрут, закрыть все <strong>промежуточные аттестации</strong> (что является обязательным условием допуска к ОГЭ/ЕГЭ) и качественно подготовиться к самим экзаменам.</p>
      <p class="attestation-callout__note">Конкретный порядок допуска, прикрепления к школе для сдачи ГИА и оформления документов уточняется строго индивидуально на консультации.</p>
    </div>
  </div>
</section>

<!-- ========================= FAQ (Figma 38:7140) ====================== -->
<section class="courses-faq courses-faq--surface">
  <div class="container">
    <h2 class="courses-faq__title">Популярные вопросы родителей</h2>
    <p class="courses-faq__subtitle">Отвечаем на главные вопросы родителей о семейном образовании и нашей школе.</p>
    <div class="courses-faq__panel">
      <div class="courses-faq__col">
        <details class="courses-faq__item" open>
          <summary>
            Можно ли перейти к вам в течение года?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Да, вы можете присоединиться к нам в любой момент. Мы поможем плавно влиться в учебный процесс.</p>
        </details>
        <details class="courses-faq__item">
          <summary>
            Как родитель видит прогресс?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
        <details class="courses-faq__item">
          <summary>
            Есть ли пробное занятие?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
      </div>
      <div class="courses-faq__col">
        <details class="courses-faq__item">
          <summary>
            Как проходит аттестация?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
        <details class="courses-faq__item">
          <summary>
            Сколько детей в группе?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
        <details class="courses-faq__item">
          <summary>
            Официально ли это?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
      </div>
    </div>
  </div>
</section>

<?php
get_footer();
