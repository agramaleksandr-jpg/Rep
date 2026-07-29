<?php
/**
 * Template Name: Для родителей
 *
 * Шаблон страницы «Для родителей» — Figma node 37:5853.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs( get_the_title() );
?>
<!-- ===================== Hero (Figma 37:5935) ======================= -->
<section class="parents-hero">
  <div class="container">
    <div class="parents-hero__grid">

      <div class="parents-hero__content">
        <h1 class="parents-hero__title">Всё, что важно знать родителям о дистанционном обучении</h1>
        <p class="parents-hero__text">Разбираем переход в онлайн-школу, аттестацию, режим дня, мотивацию ребёнка и роль родителей — спокойно и без сложных формулировок.</p>

        <div class="parents-hero__actions">
          <button class="btn btn--primary btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:32px">Получить консультацию</button>
          <a class="btn btn--outline-brand btn--lg btn--rect" href="<?php echo esc_url( vs_blog_url() ); ?>" style="padding-inline:33px">Полезные материалы</a>
        </div>
      </div>

      <div class="parents-hero__topics">
        <!-- В макете карточка «Аттестация» помечена как Link (37:5957);
             адрес не задан — ведём на страницу аттестации по названию. -->
        <a class="parents-hero__topic parents-hero__topic--attestation" href="<?php echo esc_url( vs_page_url( 'attestation' ) ); ?>">
          <!-- Требуется экспорт из Figma: node 37:5958, 32×32 -->
          <span class="asset-pending parents-hero__topic-icon"></span>
          <span class="parents-hero__topic-title">Аттестация</span>
          <span class="parents-hero__topic-text">Как и когда сдавать</span>
        </a>

        <div class="parents-hero__topic parents-hero__topic--routine">
          <span class="asset-pending parents-hero__topic-icon"></span>
          <p class="parents-hero__topic-title">Режим дня</p>
          <p class="parents-hero__topic-text">Как выстроить дома</p>
        </div>

        <div class="parents-hero__topic parents-hero__topic--motivation">
          <span class="asset-pending parents-hero__topic-icon"></span>
          <p class="parents-hero__topic-title">Мотивация</p>
          <p class="parents-hero__topic-text">Как увлечь учебой</p>
        </div>

        <div class="parents-hero__topic parents-hero__topic--programs">
          <span class="asset-pending parents-hero__topic-icon"></span>
          <p class="parents-hero__topic-title">Программы</p>
          <p class="parents-hero__topic-text">Выбор маршрута</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ================ Путь родителя (Figma 37:6013) =================== -->
<section class="parents-path">
  <div class="container">
    <h2 class="parents-path__title">Путь родителя: от сомнений до спокойной учёбы</h2>

    <ol class="parents-path__steps">
      <li class="parents-path__step">
        <span class="parents-path__num">1</span>
        <h3 class="parents-path__step-title">Сомнения</h3>
        <p class="parents-path__step-text">Ребёнку некомфортно в школе. Вы ищете варианты.</p>
      </li>
      <li class="parents-path__step">
        <span class="parents-path__num">2</span>
        <h3 class="parents-path__step-title">Консультация</h3>
        <p class="parents-path__step-text">Разбираем ситуацию, форму обучения и документы.</p>
      </li>
      <li class="parents-path__step">
        <span class="parents-path__num">3</span>
        <h3 class="parents-path__step-title">Адаптация</h3>
        <p class="parents-path__step-text">Первые недели. Куратор помогает выстроить режим.</p>
      </li>
      <li class="parents-path__step">
        <span class="parents-path__num">4</span>
        <h3 class="parents-path__step-title">Спокойствие</h3>
        <p class="parents-path__step-text">Ребёнок учится, вы видите прогресс в кабинете.</p>
      </li>
    </ol>
  </div>
</section>

<!-- ================= Ваша роль (Figma 37:6075) ====================== -->
<section class="parents-role">
  <div class="container">
    <div class="parents-role__grid">

      <div class="parents-role__content">
        <h2 class="parents-role__title">Ваша роль в онлайн-обучении</h2>
        <p class="parents-role__text">Главный страх многих — «придётся самому стать учителем». Это не так. Школа полностью берет на себя учебный процесс, проверку заданий и объяснение тем.</p>

        <div class="parents-role__note parents-role__note--you">
          <h3 class="parents-role__note-title">Что делаете вы:</h3>
          <p class="parents-role__note-text">Помогаете организовать рабочее место, следите за режимом сна и питания, поддерживаете ребёнка эмоционально.</p>
        </div>

        <div class="parents-role__note parents-role__note--school">
          <h3 class="parents-role__note-title">Что делает школа:</h3>
          <p class="parents-role__note-text">Учит, проверяет, контролирует прогресс, мотивирует, готовит к аттестации и регулярно отчитывается вам об успехах.</p>
        </div>
      </div>

      <div class="parents-role__panel">
        <h3 class="parents-role__panel-title">Как вы контролируете процесс:</h3>
        <ul class="parents-role__list">
          <li class="parents-role__item">
            <!-- Требуется экспорт из Figma: node 37:6110, 20×20 (переиспользуется 5×) -->
            <span class="asset-pending"></span> Доступ в личный кабинет 24/7
          </li>
          <li class="parents-role__item"><span class="asset-pending"></span> Еженедельные отчёты от куратора</li>
          <li class="parents-role__item"><span class="asset-pending"></span> Наглядные графики успеваемости</li>
          <li class="parents-role__item"><span class="asset-pending"></span> Комментарии педагогов к домашкам</li>
          <li class="parents-role__item"><span class="asset-pending"></span> Прямая связь с куратором в мессенджере</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<!-- ============= Учебный день дома (Figma 37:6155) ================== -->
<section class="parents-day">
  <span class="parents-day__glow parents-day__glow--left" aria-hidden="true"></span>
  <span class="parents-day__glow parents-day__glow--right" aria-hidden="true"></span>
  <div class="container">
    <div class="parents-day__inner">
      <h2 class="parents-day__title">Как организовать учебный день дома</h2>

      <div class="parents-day__grid">
        <div class="parents-day__card">
          <div class="parents-day__card-head">
            <span class="parents-day__card-icon">
              <!-- Требуется экспорт из Figma: node 38:6454, 24×24 -->
              <span class="asset-pending"></span>
            </span>
            <h3 class="parents-day__card-title">Баланс</h3>
          </div>
          <p class="parents-day__card-text">Ограничить фоновые отвлечения (телефон) во время уроков. После учебы — обязательная прогулка.</p>
        </div>

        <div class="parents-day__card">
          <div class="parents-day__card-head">
            <span class="parents-day__card-icon">
              <span class="asset-pending"></span>
            </span>
            <h3 class="parents-day__card-title">Расписание</h3>
          </div>
          <p class="parents-day__card-text">Уроки в одно и то же время. Визуальное расписание на стене или на рабочем столе компьютера.</p>
        </div>

        <div class="parents-day__card">
          <div class="parents-day__card-head">
            <span class="parents-day__card-icon">
              <span class="asset-pending"></span>
            </span>
            <h3 class="parents-day__card-title">Рабочее место</h3>
          </div>
          <p class="parents-day__card-text">Отдельный стол, хорошее освещение, стабильный интернет. Важно: учиться не в кровати.</p>
        </div>

        <div class="parents-day__card">
          <div class="parents-day__card-head">
            <span class="parents-day__card-icon">
              <span class="asset-pending"></span>
            </span>
            <h3 class="parents-day__card-title">Перерывы</h3>
          </div>
          <p class="parents-day__card-text">Правило 45/15: после урока обязательно отойти от экрана, сделать разминку или перекусить.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============== Частые ситуации (Figma 37:6195) =================== -->
<section class="parents-cases">
  <div class="container">
    <h2 class="parents-cases__title">Частые ситуации</h2>

    <div class="parents-cases__grid">
      <div class="parents-cases__card">
        <h3 class="parents-cases__card-title">Нужно перейти в середине года</h3>
        <p class="parents-cases__card-text">Мы оценим текущие оценки, составим план догонялок и мягко встроим ребёнка в процесс.</p>
        <button class="parents-cases__card-link" type="button" data-modal-open="consultation">Обсудить ситуацию →</button>
      </div>

      <div class="parents-cases__card">
        <h3 class="parents-cases__card-title">Ребёнок отстал по предметам</h3>
        <p class="parents-cases__card-text">Проведём диагностику, выявим пробелы и дадим материалы для их точечного закрытия.</p>
        <button class="parents-cases__card-link" type="button" data-modal-open="consultation">Обсудить ситуацию →</button>
      </div>

      <div class="parents-cases__card">
        <h3 class="parents-cases__card-title">Мы часто переезжаем</h3>
        <p class="parents-cases__card-text">Дистанционный формат позволяет учиться из любой точки мира. График можно подстроить под часовой пояс.</p>
        <button class="parents-cases__card-link" type="button" data-modal-open="consultation">Обсудить ситуацию →</button>
      </div>

      <div class="parents-cases__card">
        <h3 class="parents-cases__card-title">Ребёнку тяжело в классе</h3>
        <p class="parents-cases__card-text">Дома спокойнее. Нет буллинга и шума, можно сосредоточиться на знаниях.</p>
        <button class="parents-cases__card-link" type="button" data-modal-open="consultation">Обсудить ситуацию →</button>
      </div>

      <div class="parents-cases__card">
        <h3 class="parents-cases__card-title">Подготовка к экзаменам</h3>
        <p class="parents-cases__card-text">Помогаем закрыть аттестации без долгов, чтобы освободить время для ОГЭ/ЕГЭ.</p>
        <button class="parents-cases__card-link" type="button" data-modal-open="consultation">Обсудить ситуацию →</button>
      </div>

      <div class="parents-cases__card">
        <h3 class="parents-cases__card-title">Непонятно с документами</h3>
        <p class="parents-cases__card-text">На консультации подробно объясняем разницу форм обучения и алгоритм прикрепления.</p>
        <button class="parents-cases__card-link" type="button" data-modal-open="consultation">Обсудить ситуацию →</button>
      </div>
    </div>
  </div>
</section>

<!-- ========================= FAQ (Figma 38:6464) ====================
     Те же 6 вопросов и тот же паттерн, что на главной/`courses.html`/
     `attestation.html`; отвечает только первый (блокер 5.13). -->
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

<!-- ================ Финальный CTA (Figma 37:6314) =================== -->
<section class="parents-cta">
  <div class="container">
    <h2 class="parents-cta__title">Разберём вашу ситуацию и подскажем, как действовать</h2>
    <p class="parents-cta__text">Если вы сомневаетесь или не знаете, с чего начать — оставьте заявку. Консультация бесплатная и ни к чему не обязывает.</p>
    <div class="parents-cta__actions">
      <button class="btn btn--primary btn--lg btn--rect parents-cta__button" type="button" data-modal-open="consultation">Записаться на консультацию</button>
    </div>
  </div>
</section>

<?php
get_footer();
