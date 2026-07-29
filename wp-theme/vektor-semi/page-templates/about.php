<?php
/**
 * Template Name: О школе
 *
 * Шаблон страницы «О школе» — Figma node 38:7407.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs( get_the_title() );
?>
<!-- ===================== Hero (Figma 38:7489) ======================= -->
<section class="about-hero">
  <div class="container">
    <div class="about-hero__grid">

      <div class="about-hero__content">
        <h1 class="about-hero__title">Онлайн-школа, где ребёнку спокойно учиться, а родителю понятно, что происходит</h1>
        <p class="about-hero__text">Мы создаём дистанционное обучение для учеников 1–11 классов: с понятной программой, поддержкой педагогов, контролем прогресса и вниманием к состоянию ребёнка.</p>

        <div class="about-hero__actions">
          <button class="btn btn--primary btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:32px">Получить консультацию</button>
          <a class="btn btn--outline-brand btn--lg btn--rect" href="<?php echo esc_url( get_post_type_archive_link( 'vs_course' ) ); ?>" style="padding-inline:33px">Посмотреть программы</a>
        </div>
      </div>

      <div class="about-hero__cards about-hero__cards--first" aria-hidden="true">
        <div class="about-hero__card about-hero__card--feature about-hero__card--lessons">
          <!-- Требуется экспорт из Figma: node 38:7513, 40×40 -->
          <span class="asset-pending about-hero__card-icon"></span>
          <p class="about-hero__card-title">Живые уроки</p>
          <p class="about-hero__card-subtitle">и записи в кабинете</p>
        </div>

        <div class="about-hero__card about-hero__card--panel">
          <div class="about-hero__progress-head">
            <span class="about-hero__progress-icon">
              <!-- Требуется экспорт из Figma: node 38:7527, 20×20 -->
              <span class="asset-pending"></span>
            </span>
            <span class="about-hero__progress-label">Прогресс</span>
          </div>
          <div class="about-hero__progress-bar"><span style="width:75%"></span></div>
          <p class="about-hero__progress-note">На 15% лучше</p>
        </div>
      </div>

      <div class="about-hero__cards about-hero__cards--second" aria-hidden="true">
        <div class="about-hero__card about-hero__card--panel">
          <p class="about-hero__team-label">Команда</p>
          <div class="about-hero__team-avatars">
            <span class="about-hero__team-avatar"></span>
            <span class="about-hero__team-avatar"></span>
            <span class="about-hero__team-avatar"></span>
            <span class="about-hero__team-avatar about-hero__team-avatar--more">+</span>
          </div>
        </div>

        <div class="about-hero__card about-hero__card--feature about-hero__card--support">
          <!-- Требуется экспорт из Figma: node 38:7559, 40×40 -->
          <span class="asset-pending about-hero__card-icon"></span>
          <p class="about-hero__card-title">Поддержка</p>
          <p class="about-hero__card-subtitle">куратор всегда на связи</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ================== Полоса цифр (Figma 38:7573) =================== -->
<section class="about-stats">
  <div class="container">
    <ul class="about-stats__grid">
      <li class="about-stats__item">
        <span class="about-stats__value">1–11</span>
        <span class="about-stats__label">классы обучения</span>
      </li>
      <li class="about-stats__item">
        <span class="about-stats__value">ФГОС</span>
        <span class="about-stats__label">полное соответствие</span>
      </li>
      <li class="about-stats__item">
        <span class="about-stats__value">100%</span>
        <span class="about-stats__label">онлайн-формат</span>
      </li>
      <li class="about-stats__item">
        <!-- Требуется экспорт из Figma: node 38:7602, 32×32 -->
        <span class="asset-pending about-stats__icon"></span>
        <span class="about-stats__label">поддержка семьи</span>
      </li>
    </ul>
  </div>
</section>

<!-- =================== Мы верим… (Figma 38:7613) ==================== -->
<section class="about-belief">
  <div class="container">
    <h2 class="about-belief__title">Мы верим, что школа может быть спокойной, понятной и гибкой</h2>

    <div class="about-belief__card">
      <p class="about-belief__lead">Многие годы считалось, что хорошее образование обязательно сопровождается стрессом, перегрузками и бесконечными домашними заданиями до ночи. Мы создали школу, чтобы доказать обратное.</p>

      <ul class="about-belief__list">
        <li class="about-belief__item">
          <!-- Требуется экспорт из Figma: node 38:7624, 24×24 (переиспользуется 4×) -->
          <span class="asset-pending"></span>
          Ребёнок не обязан страдать от перегрузки. Учеба должна оставлять время на жизнь.
        </li>
        <li class="about-belief__item">
          <span class="asset-pending"></span>
          Родитель не должен разбираться во всём один. Школа берёт ответственность за процесс.
        </li>
        <li class="about-belief__item">
          <span class="asset-pending"></span>
          Дистанционное обучение — это системно. Это не просто видео в записи, это живой процесс с контролем результатов.
        </li>
        <li class="about-belief__item">
          <span class="asset-pending"></span>
          Онлайн-формат не означает одиночество. Рядом всегда есть куратор и педагоги, готовые поддержать.
        </li>
      </ul>
    </div>
  </div>
</section>

<!-- ======= Это не набор видеоуроков (Figma 39:8182) =================
     Секция полностью совпадает с обзором формата в TimelineFormat на
     главной (`1:330`) — переиспользованы её классы и разметка. -->
<div class="timeline-format__overview">
  <div class="container">
    <div class="timeline-format__overview-grid reveal">

      <div class="timeline-format__overview-content">
        <h2 class="timeline-format__overview-title">Это не набор видеоуроков, а полноценная онлайн-школа</h2>
        <p class="timeline-format__overview-text">
          Мы перенесли лучшие практики классической школы в онлайн, избавив их от бюрократии и стресса. Дети общаются, тянут руку, работают в командах и получают удовольствие от процесса.
        </p>

        <ul class="timeline-format__features">
          <li class="timeline-format__feature">
            <span class="timeline-format__feature-icon">
              <!-- Требуется экспорт из Figma: node 39:8193, 20×20 -->
              <span class="asset-pending" style="width:20px;height:20px"></span>
            </span>
            <h3 class="timeline-format__feature-title">Уроки в реальном времени</h3>
            <p class="timeline-format__feature-text">Не предзаписанные видео, а живой диалог.</p>
          </li>
          <li class="timeline-format__feature">
            <span class="timeline-format__feature-icon">
              <span class="asset-pending" style="width:20px;height:20px"></span>
            </span>
            <h3 class="timeline-format__feature-title">Объяснение до понимания</h3>
            <p class="timeline-format__feature-text">Преподаватель не пойдет дальше, пока все не поймут.</p>
          </li>
          <li class="timeline-format__feature">
            <span class="timeline-format__feature-icon">
              <span class="asset-pending" style="width:20px;height:20px"></span>
            </span>
            <h3 class="timeline-format__feature-title">Записи занятий</h3>
            <p class="timeline-format__feature-text">Всегда можно пересмотреть урок в личном кабинете.</p>
          </li>
          <li class="timeline-format__feature">
            <span class="timeline-format__feature-icon">
              <span class="asset-pending" style="width:20px;height:20px"></span>
            </span>
            <h3 class="timeline-format__feature-title">Личный кабинет родителя</h3>
            <p class="timeline-format__feature-text">Удобное отслеживание прогресса и расписания.</p>
          </li>
        </ul>
      </div>

      <div class="timeline-format__visual-wrap">
        <div class="timeline-format__visual">
          <div class="timeline-format__visual-inner">
            <span class="asset-pending asset-pending--photo">Преподаватель на видеозвонке<br>assets/images/timeline-format-teacher.jpg</span>

            <div class="timeline-format__visual-overlay">
              <div class="timeline-format__visual-top">
                <span class="timeline-format__rec">
                  <span class="timeline-format__rec-dot" aria-hidden="true"></span>
                  REC
                </span>
                <span class="timeline-format__viewers">
                  <!-- Требуется экспорт из Figma: node 39:8239, 12×12 -->
                  <span class="asset-pending" style="width:12px;height:12px"></span>
                  8 учеников
                </span>
              </div>

              <div class="timeline-format__thumbs">
                <span class="timeline-format__thumb">
                  <span class="asset-pending"></span>
                </span>
                <span class="timeline-format__thumb timeline-format__thumb--active">
                  <span class="asset-pending"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- ============ Преподаватели (Figma 38:8144) =======================
     Идентична блоку преподавателей в ParentsTeachers на главной
     (`1:702`) — переиспользованы её классы. Отличие только в фоне
     (белый вместо `--color-surface-muted`), переопределён в about.css. -->
<div class="parents-teachers__teachers">
  <div class="container">
    <div class="parents-teachers__teachers-head reveal">
      <div>
        <h2 class="parents-teachers__teachers-title">Преподаватели, которых любят дети</h2>
        <p class="parents-teachers__teachers-text">
          Мы отбираем только тех учителей, которые горят своим предметом, умеют держать внимание класса через экран и уважительно относятся к каждому ученику.
        </p>
      </div>
      <!-- Страница со списком всех преподавателей в макете не определена — см. блокер 5.12 -->
      <a class="parents-teachers__teachers-link" href="#">Смотреть всех преподавателей →</a>
    </div>

    <ul class="parents-teachers__teachers-grid reveal">
      <li class="parents-teachers__teacher">
        <div class="parents-teachers__teacher-photo">
          <span class="asset-pending asset-pending--photo">Анна Смирнова<br>assets/images/teacher-1.jpg</span>
          <span class="parents-teachers__teacher-badge">Опыт 8 лет</span>
        </div>
        <div class="parents-teachers__teacher-body">
          <p class="parents-teachers__teacher-subject">Математика, 5-9 классы</p>
          <p class="parents-teachers__teacher-name">Анна Смирнова</p>
          <p class="parents-teachers__teacher-text">Учит понимать математику, а не зубрить формулы. Средний балл учеников на ОГЭ — 4.8.</p>
        </div>
      </li>
      <li class="parents-teachers__teacher">
        <div class="parents-teachers__teacher-photo">
          <span class="asset-pending asset-pending--photo">Михаил Волков<br>assets/images/teacher-2.jpg</span>
          <span class="parents-teachers__teacher-badge">Опыт 12 лет</span>
        </div>
        <div class="parents-teachers__teacher-body">
          <p class="parents-teachers__teacher-subject">История и Обществознание</p>
          <p class="parents-teachers__teacher-name">Михаил Волков</p>
          <p class="parents-teachers__teacher-text">Превращает скучные даты в захватывающие истории. Эксперт ЕГЭ.</p>
        </div>
      </li>
      <li class="parents-teachers__teacher">
        <div class="parents-teachers__teacher-photo">
          <span class="asset-pending asset-pending--photo">Елена Попова<br>assets/images/teacher-3.jpg</span>
          <span class="parents-teachers__teacher-badge">Опыт 15 лет</span>
        </div>
        <div class="parents-teachers__teacher-body">
          <p class="parents-teachers__teacher-subject">Начальные классы</p>
          <p class="parents-teachers__teacher-name">Елена Попова</p>
          <p class="parents-teachers__teacher-text">Мягко адаптирует к школе. Знает, как удержать внимание непосед через игру.</p>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- ============== Чем мы отличаемся (Figma 38:7785) ================= -->
<section class="about-compare">
  <div class="container">
    <h2 class="about-compare__title">Чем мы отличаемся</h2>

    <div class="about-compare__grid">
      <div class="about-compare__col about-compare__col--old">
        <h3 class="about-compare__col-title">Обычная школа</h3>
        <ul class="about-compare__list">
          <li class="about-compare__item"><span class="about-compare__dot" aria-hidden="true"></span> Жёсткий график, ранние подъемы</li>
          <li class="about-compare__item"><span class="about-compare__dot" aria-hidden="true"></span> Большой класс, сложно уделить время каждому</li>
          <li class="about-compare__item"><span class="about-compare__dot" aria-hidden="true"></span> Много стресса из-за оценок и конфликтов</li>
          <li class="about-compare__item"><span class="about-compare__dot" aria-hidden="true"></span> Родитель часто узнаёт о проблемах поздно (в конце четверти)</li>
        </ul>
      </div>

      <div class="about-compare__col about-compare__col--new">
        <h3 class="about-compare__col-title">Наша онлайн-школа</h3>
        <ul class="about-compare__list">
          <li class="about-compare__item">
            <!-- Требуется экспорт из Figma: node 38:7826, 20×20 (переиспользуется 4×) -->
            <span class="asset-pending"></span> Гибкость расписания, можно высыпаться
          </li>
          <li class="about-compare__item"><span class="asset-pending"></span> Понятный маршрут и индивидуальный подход</li>
          <li class="about-compare__item"><span class="asset-pending"></span> Спокойная, безопасная среда без буллинга</li>
          <li class="about-compare__item"><span class="asset-pending"></span> Родитель видит прогресс в реальном времени каждую неделю</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ================== Документы (Figma 38:7859) =====================
     В макете это осознанная заглушка с пунктирной рамкой — самих
     документов в дизайне нет. Верстаем как нарисовано (блокер 5.21). -->
<section class="about-docs">
  <div class="container">
    <div class="about-docs__card">
      <!-- Требуется экспорт из Figma: node 38:7862, 40×40 -->
      <span class="asset-pending about-docs__icon"></span>
      <h2 class="about-docs__title">Документы и юридическая информация</h2>
      <p class="about-docs__text">Здесь будут размещены подтверждённые документы школы (лицензия, сведения об образовательной организации, договор).</p>
    </div>
  </div>
</section>

<!-- ================ Финальный CTA (Figma 38:7880) =================== -->
<section class="about-cta">
  <div class="container">
    <h2 class="about-cta__title">Познакомьтесь со школой лично</h2>
    <p class="about-cta__text">Мы ответим на все вопросы, покажем платформу и поможем понять, подойдёт ли вам наш формат.</p>
    <div class="about-cta__actions">
      <button class="btn btn--primary btn--lg btn--rect about-cta__button" type="button" data-modal-open="consultation">Записаться на консультацию</button>
    </div>
  </div>
</section>

<?php
get_footer();
