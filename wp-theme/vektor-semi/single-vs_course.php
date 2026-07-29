<?php
/**
 * Страница курса — Figma node 36:2139.
 *
 * Из записи берутся заголовок, лид и факты (возраст/формат/старт/длительность).
 * Остальные секции — статический контент макета: он одинаков для всех курсов
 * и в Figma не параметризован. Табы «Предметы и программа» заполнены только
 * для «5 класса» — блокер 5.17.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();

	vs_breadcrumbs();
	?>
<!-- ===================== Hero (Figma 36:2229) ======================= -->
<section class="course-hero">
  <div class="container">
    <div class="course-hero__grid">
      <div class="course-hero__content">
        <span class="course-hero__badge">
          <span class="course-hero__badge-dot" aria-hidden="true"></span>
          Набор открыт
        </span>

        <h1 class="course-hero__title"><?php the_title(); ?></h1>
        <?php if ( has_excerpt() ) : ?>
          <p class="course-hero__text"><?php echo esc_html( get_the_excerpt() ); ?></p>
        <?php endif; ?>

        <div class="course-hero__actions">
          <button class="btn btn--primary btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:32px">Записаться на консультацию</button>
          <button class="btn btn--outline-brand btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:33px">Получить программу курса</button>
        </div>

        <?php
        $vs_facts = array(
            __( 'Возраст', 'vektor-semi' )      => get_post_meta( get_the_ID(), 'vs_course_age', true ),
            __( 'Формат', 'vektor-semi' )       => get_post_meta( get_the_ID(), 'vs_course_format', true ),
            __( 'Старт', 'vektor-semi' )        => get_post_meta( get_the_ID(), 'vs_course_start', true ),
            __( 'Длительность', 'vektor-semi' ) => get_post_meta( get_the_ID(), 'vs_course_duration', true ),
        );
        $vs_facts = array_filter( $vs_facts );

        if ( $vs_facts ) :
            ?>
            <dl class="course-hero__facts">
              <?php foreach ( $vs_facts as $vs_label => $vs_value ) : ?>
                <div>
                  <dt class="course-hero__fact-label"><?php echo esc_html( $vs_label ); ?></dt>
                  <dd class="course-hero__fact-value"><?php echo esc_html( $vs_value ); ?></dd>
                </div>
              <?php endforeach; ?>
            </dl>
            <?php
        endif;
        ?>
      </div>

      <div class="course-hero__media" aria-hidden="true">
        <div class="course-hero__media-inner"><span class="asset-pending"></span></div>
      </div>

      <div class="course-hero__card course-hero__card--lesson" aria-hidden="true">
        <span class="course-hero__card-icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-hero__card-label" style="display:block">Алгебра</span>
          <span class="course-hero__card-value" style="display:block">Урок пройден</span>
        </span>
      </div>

      <div class="course-hero__card course-hero__card--stats" aria-hidden="true">
        <span class="course-hero__card-label">Успеваемость</span>
        <span class="course-hero__chart">
          <span style="height:32px;background:#dbeafe"></span>
          <span style="height:48px;background:#bedbff"></span>
          <span style="height:40px;background:#8ec5ff"></span>
          <span style="height:64px;background:#155dfc"></span>
        </span>
      </div>
    </div>
  </div>
</section>

<!-- ================ Кому подойдёт (Figma 36:2324) ==================== -->
<section class="course-fit">
  <div class="container">
    <h2 class="course-section-title">Кому подойдёт этот курс</h2>
    <p class="course-section-text">Мы создали программу для семей, которые ищут современный и бережный подход к образованию.</p>

    <ul class="course-fit__grid">
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Устали от школы</h3>
        <p class="course-fit__text">Ребёнок теряет интерес к учёбе из-за перегрузок и стресса.</p>
      </li>
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Нужен гибкий график</h3>
        <p class="course-fit__text">Семья часто путешествует или живёт на два города.</p>
      </li>
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Спорт и творчество</h3>
        <p class="course-fit__text">Ребёнок серьёзно занимается спортом, музыкой или танцами.</p>
      </li>
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Есть пробелы</h3>
        <p class="course-fit__text">Нужно спокойно подтянуть знания и догнать программу.</p>
      </li>
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Подготовка к аттестации</h3>
        <p class="course-fit__text">Семья на семейном обучении и ищет помощь с аттестацией.</p>
      </li>
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Спокойный темп</h3>
        <p class="course-fit__text">Ребёнку комфортнее учиться в своём ритме, без спешки.</p>
      </li>
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Прозрачность</h3>
        <p class="course-fit__text">Родителям важно видеть реальный прогресс и оценки.</p>
      </li>
      <li class="course-fit__card">
        <span class="course-fit__icon"><span class="asset-pending" style="width:20px;height:20px"></span></span>
        <h3 class="course-fit__title">Частые переезды</h3>
        <p class="course-fit__text">Возможность не менять школу при смене места жительства.</p>
      </li>
    </ul>
  </div>
</section>

<!-- ============ Школа vs мы (Figma 36:2450) ========================== -->
<section class="course-compare-approach">
  <div class="container">
    <div class="course-compare-approach__grid">
      <div class="course-compare-approach__col course-compare-approach__col--bad">
        <p class="course-compare-approach__heading">
          <span class="course-compare-approach__mark course-compare-approach__mark--bad" aria-hidden="true">✕</span>
          С чем сталкиваются в школе
        </p>
        <ul class="course-compare-approach__list">
          <li class="course-compare-approach__item"><span class="course-compare-approach__bullet" aria-hidden="true"></span> Перегрузка лишними предметами и домашкой</li>
          <li class="course-compare-approach__item"><span class="course-compare-approach__bullet" aria-hidden="true"></span> Отсутствие индивидуального подхода</li>
          <li class="course-compare-approach__item"><span class="course-compare-approach__bullet" aria-hidden="true"></span> Стресс из-за оценок и конфликтов</li>
          <li class="course-compare-approach__item"><span class="course-compare-approach__bullet" aria-hidden="true"></span> Неудобный жесткий график</li>
          <li class="course-compare-approach__item"><span class="course-compare-approach__bullet" aria-hidden="true"></span> Потеря интереса к учёбе</li>
          <li class="course-compare-approach__item"><span class="course-compare-approach__bullet" aria-hidden="true"></span> Слабый контроль реальных знаний</li>
        </ul>
      </div>
      <div class="course-compare-approach__col course-compare-approach__col--good">
        <p class="course-compare-approach__heading">
          <span class="course-compare-approach__mark course-compare-approach__mark--good" aria-hidden="true">✓</span>
          Как учим мы
        </p>
        <ul class="course-compare-approach__list">
          <li class="course-compare-approach__item"><span class="asset-pending"></span> Понятная структурированная программа</li>
          <li class="course-compare-approach__item"><span class="asset-pending"></span> Поддержка педагогов и куратора</li>
          <li class="course-compare-approach__item"><span class="asset-pending"></span> Бережная среда без стресса</li>
          <li class="course-compare-approach__item"><span class="asset-pending"></span> Обучение из дома в своём темпе</li>
          <li class="course-compare-approach__item"><span class="asset-pending"></span> Регулярная обратная связь</li>
          <li class="course-compare-approach__item"><span class="asset-pending"></span> Упор на понимание, а не зазубривание</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ============ Всё необходимое (Figma 36:2562) ====================== -->
<section class="course-features">
  <div class="container">
    <h2 class="course-features__title">Всё необходимое для полноценного обучения — в одном месте</h2>
    <ul class="course-features__grid">
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Живые онлайн-уроки</span>
          <span class="course-features__item-text" style="display:block">Интерактивные занятия с преподавателем в мини-группах.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Записи занятий</span>
          <span class="course-features__item-text" style="display:block">Все уроки сохраняются в личном кабинете. Можно пересмотреть.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Домашние задания</span>
          <span class="course-features__item-text" style="display:block">Практика для закрепления материала с ручной проверкой.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Обратная связь</span>
          <span class="course-features__item-text" style="display:block">Развернутые комментарии от учителей по каждой работе.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Консультации</span>
          <span class="course-features__item-text" style="display:block">Возможность задать вопросы учителю 1 на 1, если тема непонятна.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Личный куратор</span>
          <span class="course-features__item-text" style="display:block">Помогает с расписанием, мотивацией и оргвопросами.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Личный кабинет</span>
          <span class="course-features__item-text" style="display:block">Удобная платформа с расписанием, материалами и оценками.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Отчёты родителям</span>
          <span class="course-features__item-text" style="display:block">Еженедельная сводка об успехах и сложностях ребёнка.</span>
        </span>
      </li>
      <li class="course-features__item">
        <span class="course-features__icon"><span class="asset-pending"></span></span>
        <span>
          <span class="course-features__item-title" style="display:block">Помощь с аттестацией</span>
          <span class="course-features__item-text" style="display:block">Подготовка и сопровождение при сдаче промежуточной аттестации.</span>
        </span>
      </li>
    </ul>
  </div>
</section>

<!-- ============ Предметы и программа (Figma 36:2709) ================= -->
<section class="course-subjects" id="subjects" data-tabs>
  <div class="container">
    <h2 class="course-section-title">Предметы и программа</h2>
    <p class="course-section-text">Программа полностью соответствует ФГОС. Выберите класс, чтобы увидеть список предметов.</p>

    <div class="course-subjects__tabs-row">
      <div class="course-subjects__tablist" role="tablist" aria-label="Класс">
        <button class="course-subjects__tab" type="button" role="tab" id="subjects-tab-5" aria-controls="subjects-panel-5" aria-selected="true" tabindex="0">5 класс</button>
        <button class="course-subjects__tab" type="button" role="tab" id="subjects-tab-6" aria-controls="subjects-panel-6" aria-selected="false" tabindex="-1">6 класс</button>
        <button class="course-subjects__tab" type="button" role="tab" id="subjects-tab-7" aria-controls="subjects-panel-7" aria-selected="false" tabindex="-1">7 класс</button>
        <button class="course-subjects__tab" type="button" role="tab" id="subjects-tab-8" aria-controls="subjects-panel-8" aria-selected="false" tabindex="-1">8 класс</button>
      </div>
    </div>

    <div class="course-subjects__panels">
      <!--
        В макете список предметов и раскрытие ответа есть только для
        вкладки «5 класс»; сами пункты-аккордеоны при этом свёрнуты и
        без текста ответа (проверено по всем 9 инстансам) — не выдумываем.
      -->
      <div class="course-subjects__panel" role="tabpanel" id="subjects-panel-5" aria-labelledby="subjects-tab-5" tabindex="0">
        <div class="course-subjects__list">
          <details class="course-subjects__item"><summary>Русский язык<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>Литература<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>Математика (Алгебра/Геометрия)<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>История<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>Обществознание<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>Биология<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>География<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>Английский язык<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
          <details class="course-subjects__item"><summary>Информатика<span class="course-subjects__chevron asset-pending" aria-hidden="true"></span></summary><p class="course-subjects__answer">Материалы по этому предмету ещё не добавлены в макет Figma.</p></details>
        </div>
      </div>
      <div class="course-subjects__panel" role="tabpanel" id="subjects-panel-6" aria-labelledby="subjects-tab-6" tabindex="0" hidden>
        <p class="course-subjects__placeholder">Список предметов для 6 класса ещё не добавлен в макет Figma.</p>
      </div>
      <div class="course-subjects__panel" role="tabpanel" id="subjects-panel-7" aria-labelledby="subjects-tab-7" tabindex="0" hidden>
        <p class="course-subjects__placeholder">Список предметов для 7 класса ещё не добавлен в макет Figma.</p>
      </div>
      <div class="course-subjects__panel" role="tabpanel" id="subjects-panel-8" aria-labelledby="subjects-tab-8" tabindex="0" hidden>
        <p class="course-subjects__placeholder">Список предметов для 8 класса ещё не добавлен в макет Figma.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ Учебная неделя (Figma 36:2814) ======================= -->
<section class="course-week">
  <div class="container">
    <div class="course-week__grid">
      <div class="course-week__content">
        <h2 class="course-week__title">Как проходит учебная неделя</h2>
        <p class="course-week__text">Мы выстроили расписание так, чтобы ребёнок всё успевал и не переутомлялся. Баланс живых уроков и самостоятельной работы.</p>

        <div class="course-week__table">
          <div class="course-week__row"><span class="course-week__row-label">Нагрузка</span><span class="course-week__row-value">3-4 урока в день</span></div>
          <div class="course-week__row"><span class="course-week__row-label">Учебные дни</span><span class="course-week__row-value">5 дней в неделю (Пн-Пт)</span></div>
          <div class="course-week__row"><span class="course-week__row-label">Длительность</span><span class="course-week__row-value">45 минут урок</span></div>
          <div class="course-week__row"><span class="course-week__row-label">Домашка</span><span class="course-week__row-value">В удобное время после уроков</span></div>
        </div>
      </div>

      <div class="course-week__schedule">
        <p class="course-week__schedule-label">Пример расписания</p>
        <div class="course-week__schedule-list">
          <p class="course-week__schedule-item"><span class="asset-pending"></span> 09:00 - Русский язык (Онлайн)</p>
          <p class="course-week__schedule-item"><span class="asset-pending"></span> 10:00 - Литература (Онлайн)</p>
          <p class="course-week__schedule-item"><span class="asset-pending"></span> 11:00 - Английский язык (Видеоурок)</p>
          <p class="course-week__schedule-item"><span class="asset-pending"></span> 12:00 - Математика (Онлайн)</p>
          <p class="course-week__schedule-item"><span class="asset-pending"></span> 13:00 - Обед и отдых</p>
          <p class="course-week__schedule-item"><span class="asset-pending"></span> 15:00 - Выполнение ДЗ</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ Учебный процесс шаг за шагом (Figma 36:2918) ========= -->
<section class="course-steps">
  <div class="container">
    <h2 class="course-section-title">Учебный процесс шаг за шагом</h2>
    <ol class="course-steps__grid">
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">01</span><span class="course-steps__badge" aria-hidden="true">1</span><p class="course-steps__text">Ребёнок заходит в личный кабинет</p></li>
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">02</span><span class="course-steps__badge" aria-hidden="true">2</span><p class="course-steps__text">Видит расписание и задания на день</p></li>
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">03</span><span class="course-steps__badge" aria-hidden="true">3</span><p class="course-steps__text">Посещает онлайн-уроки</p></li>
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">04</span><span class="course-steps__badge" aria-hidden="true">4</span><p class="course-steps__text">Смотрит записи при необходимости</p></li>
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">05</span><span class="course-steps__badge" aria-hidden="true">5</span><p class="course-steps__text">Выполняет домашние задания</p></li>
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">06</span><span class="course-steps__badge" aria-hidden="true">6</span><p class="course-steps__text">Получает проверку и комментарии педагога</p></li>
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">07</span><span class="course-steps__badge" aria-hidden="true">7</span><p class="course-steps__text">Куратор отслеживает прогресс</p></li>
      <li class="course-steps__card"><span class="course-steps__bgnum" aria-hidden="true">08</span><span class="course-steps__badge" aria-hidden="true">8</span><p class="course-steps__text">Родитель получает обратную связь</p></li>
    </ol>
  </div>
</section>

<!-- ============ Роль родителя / поддержка ученика (Figma 36:3019) ==== -->
<section class="course-roles">
  <div class="container">
    <div class="course-roles__grid">
      <div class="course-roles__col course-roles__col--parent">
        <h2 class="course-roles__title">Роль родителя</h2>
        <p class="course-roles__text">Родителю не нужно становиться учителем. Мы берем на себя учебный процесс, а вы остаетесь любящим родителем.</p>
        <ul class="course-roles__list">
          <li class="course-roles__item"><span class="asset-pending"></span> Вы видите прозрачный прогресс в кабинете</li>
          <li class="course-roles__item"><span class="asset-pending"></span> Получаете еженедельные отчеты</li>
          <li class="course-roles__item"><span class="asset-pending"></span> Общаетесь с куратором по любым вопросам</li>
        </ul>
      </div>
      <div class="course-roles__col course-roles__col--student">
        <h2 class="course-roles__title">Поддержка ученика</h2>
        <p class="course-roles__text">Ребенок никогда не остается один на один с платформой. Рядом всегда есть взрослый, готовый помочь.</p>
        <ul class="course-roles__list">
          <li class="course-roles__item"><span class="asset-pending"></span> Преподаватель терпеливо объясняет материал</li>
          <li class="course-roles__item"><span class="asset-pending"></span> Куратор помогает с расписанием и мотивацией</li>
          <li class="course-roles__item"><span class="asset-pending"></span> Помощь при пропусках и рекомендации по нагрузке</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ============ Преподаватели курса (Figma 36:3083) ================== -->
<section class="parents-teachers__teachers" style="padding-block:80px">
  <div class="container">
    <div class="parents-teachers__header" style="text-align:center;max-width:768px;margin-inline:auto">
      <h2 class="parents-teachers__teachers-title">Преподаватели курса</h2>
      <p class="parents-teachers__teachers-text" style="max-width:none">Педагоги, которые умеют держать внимание через экран и объяснять сложное простыми словами.</p>
    </div>

    <ul class="parents-teachers__teachers-grid">
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
</section>

<!-- ============ Стоимость и форматы (Figma 36:3154) ================== -->
<section class="course-pricing">
  <div class="container">
    <h2 class="course-section-title">Стоимость и форматы</h2>
    <p class="course-section-text">Выберите подходящий формат сопровождения.</p>

    <div class="course-pricing__grid">
      <div class="course-pricing__card">
        <h3 class="course-pricing__title">Базовый</h3>
        <p class="course-pricing__subtitle">Самостоятельное изучение</p>
        <p class="course-pricing__price">По запросу</p>
        <a class="btn btn--outline-brand btn--rect" href="#" data-modal-open="consultation">Узнать подробнее</a>
      </div>
      <div class="course-pricing__card course-pricing__card--highlight">
        <p class="course-pricing__eyebrow">Самый частый выбор</p>
        <h3 class="course-pricing__title">С куратором</h3>
        <p class="course-pricing__subtitle">Полное сопровождение</p>
        <p class="course-pricing__price">По запросу</p>
        <button class="btn btn--outline-brand btn--rect" type="button" data-modal-open="consultation">Узнать подробнее</button>
      </div>
      <div class="course-pricing__card">
        <h3 class="course-pricing__title">Индивидуальный</h3>
        <p class="course-pricing__subtitle">Занятия 1 на 1</p>
        <p class="course-pricing__price">По запросу</p>
        <a class="btn btn--outline-brand btn--rect" href="#" data-modal-open="consultation">Узнать подробнее</a>
      </div>
    </div>

    <div class="course-pricing__cta">
      <h2 class="course-pricing__cta-title">Поможем понять, подойдёт ли курс вашему ребёнку</h2>
      <p class="course-pricing__cta-text">Оставьте заявку, мы свяжемся с вами, ответим на вопросы и поможем с выбором формата.</p>
      <button class="btn btn--primary btn--lg btn--rect course-pricing__cta-button" type="button" data-modal-open="consultation">Записаться на консультацию</button>
      <p class="course-pricing__cta-note">Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
    </div>
  </div>
</section>

<?php
endwhile;

get_footer();
