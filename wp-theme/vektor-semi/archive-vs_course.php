<?php
/**
 * Архив курсов — Figma node 35:1225.
 *
 * Карточки каталога приходят из типа записи `vs_course`; остальные секции
 * (hero, чипы, сравнение программ, списки, FAQ, CTA) — статический контент
 * макета. Фильтры «Класс»/«Цель» визуальные: применённого состояния
 * в макете нет — блокер 5.16.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs();
?>
<!-- ===================== Hero (Figma 35:1307) ====================== -->
<section class="courses-hero">
  <div class="container">
    <div class="courses-hero__grid">
      <div class="courses-hero__content">
        <h1 class="courses-hero__title">Курсы для дистанционного обучения с 1 по 11 класс</h1>
        <p class="courses-hero__text">Подберите программу под возраст, цели и темп ребёнка: от начальной школы до подготовки к ОГЭ и ЕГЭ.</p>

        <div class="courses-hero__actions">
          <button class="btn btn--primary btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:32px">Подобрать курс</button>
          <button class="btn btn--outline-brand btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:33px">Получить консультацию</button>
        </div>

        <ul class="courses-hero__features">
          <li class="courses-hero__feature">
            <span class="asset-pending" style="width:20px;height:20px"></span>
            Обучение из дома
          </li>
          <li class="courses-hero__feature">
            <span class="asset-pending" style="width:20px;height:20px"></span>
            Поддержка куратора
          </li>
          <li class="courses-hero__feature">
            <span class="asset-pending" style="width:20px;height:20px"></span>
            Понятная программа
          </li>
          <li class="courses-hero__feature">
            <span class="asset-pending" style="width:20px;height:20px"></span>
            Контроль прогресса
          </li>
        </ul>
      </div>

      <div class="courses-hero__media" aria-hidden="true">
        <div class="courses-hero__media-inner">
          <!-- Требуется экспорт из Figma: node 35:1363, 128×128 -->
          <span class="asset-pending"></span>
        </div>
      </div>

      <div class="courses-hero__card courses-hero__card--subject" aria-hidden="true">
        <p class="courses-hero__card-label">
          <span class="asset-pending"></span>
          Математика
        </p>
        <span class="courses-hero__progress-bar"><span></span></span>
      </div>

      <div class="courses-hero__card courses-hero__card--progress" aria-hidden="true">
        <p class="courses-hero__card-label">
          <span class="asset-pending"></span>
          Прогресс
        </p>
        <p class="courses-hero__card-value">85%</p>
      </div>
    </div>
  </div>
</section>

<!-- ============= Что нужно вашему ребёнку (Figma 35:1394) =========== -->
<section class="courses-need">
  <div class="container">
    <h2 class="courses-need__title">Что нужно вашему ребёнку?</h2>
    <div class="courses-need__grid">
      <a class="courses-need__chip" href="#catalog">Перейти на дистанционное обучение</a>
      <a class="courses-need__chip courses-need__chip--active" href="#catalog" aria-current="true">Учиться в своём темпе</a>
      <a class="courses-need__chip" href="#catalog">Подтянуть школьные предметы</a>
      <a class="courses-need__chip" href="#catalog">Подготовиться к аттестации</a>
      <a class="courses-need__chip" href="#catalog">Подготовиться к ОГЭ</a>
      <a class="courses-need__chip" href="#catalog">Подготовиться к ЕГЭ</a>
      <a class="courses-need__chip" href="#catalog">Вернуться к учёбе без стресса</a>
      <a class="courses-need__chip" href="#catalog">Совмещать школу со спортом</a>
    </div>
  </div>
</section>

<!-- ============== Фильтры + каталог курсов (Figma 35:1434) ========== -->
<section class="courses-catalog" id="catalog">
  <div class="container">
    <div class="courses-catalog__layout">

      <form class="courses-filters" aria-label="Фильтры курсов">
        <div class="courses-filters__group">
          <h2 class="courses-filters__title">Класс</h2>
          <div class="courses-filters__options">
            <label class="courses-filters__option">
              <input type="radio" name="grade-filter" value="all" checked>
              Все классы
            </label>
            <label class="courses-filters__option">
              <input type="radio" name="grade-filter" value="1-4">
              1–4 классы
            </label>
            <label class="courses-filters__option">
              <input type="radio" name="grade-filter" value="5-8">
              5–8 классы
            </label>
            <label class="courses-filters__option">
              <input type="radio" name="grade-filter" value="9">
              9 класс
            </label>
            <label class="courses-filters__option">
              <input type="radio" name="grade-filter" value="10-11">
              10–11 классы
            </label>
          </div>
        </div>

        <div class="courses-filters__group">
          <h2 class="courses-filters__title">Цель</h2>
          <div class="courses-filters__options">
            <label class="courses-filters__option">
              <input type="checkbox" name="goal-filter" value="full">
              Полное обучение
            </label>
            <label class="courses-filters__option">
              <input type="checkbox" name="goal-filter" value="attestation">
              Подготовка к аттестации
            </label>
            <label class="courses-filters__option">
              <input type="checkbox" name="goal-filter" value="oge">
              Подготовка к ОГЭ
            </label>
            <label class="courses-filters__option">
              <input type="checkbox" name="goal-filter" value="ege">
              Подготовка к ЕГЭ
            </label>
            <label class="courses-filters__option">
              <input type="checkbox" name="goal-filter" value="individual">
              Индивидуально
            </label>
          </div>
        </div>
      </form>

      <ul class="courses-grid">
        <?php
        if ( have_posts() ) :
            while ( have_posts() ) :
                the_post();
                get_template_part( 'template-parts/blocks/course-card' );
            endwhile;
        else :
            ?>
            <li class="courses-card">
              <p class="courses-card__text"><?php esc_html_e( 'Курсы ещё не добавлены.', 'vektor-semi' ); ?></p>
            </li>
            <?php
        endif;
        ?>
      </ul>

    </div>
  </div>
</section>

<!-- =================== Сравнение программ (Figma 35:1811) =========== -->
<section class="courses-compare">
  <div class="container">
    <h2 class="courses-compare__title">Сравнение программ</h2>
    <div class="courses-compare__table-wrap">
      <table class="courses-compare__table">
        <thead>
          <tr>
            <th scope="col"><span class="visually-hidden">Параметр</span></th>
            <th scope="col">Начальная школа</th>
            <th scope="col">Средняя школа</th>
            <th scope="col">Старшие классы</th>
            <th scope="col">Подготовка к экзаменам</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Формат занятий</th>
            <td>Интерактив, игры</td>
            <td>Онлайн + записи</td>
            <td>Онлайн + записи</td>
            <td>Интенсивы, вебинары</td>
          </tr>
          <tr>
            <th scope="row">Роль родителя</th>
            <td>Высокая вовлеченность</td>
            <td>Средняя, контроль</td>
            <td>Только поддержка</td>
            <td>Только поддержка</td>
          </tr>
          <tr>
            <th scope="row">Куратор</th>
            <td><span class="asset-pending" role="img" aria-label="Есть"></span></td>
            <td><span class="asset-pending" role="img" aria-label="Есть"></span></td>
            <td><span class="asset-pending" role="img" aria-label="Есть"></span></td>
            <td><span class="asset-pending" role="img" aria-label="Есть"></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ============ Что получает родитель/ученик (Figma 35:1882) ========= -->
<section class="courses-lists">
  <div class="container">
    <div class="courses-lists__grid">
      <div>
        <h2 class="courses-lists__col-title">Что получает родитель</h2>
        <ul class="courses-lists__items">
          <li class="courses-lists__item courses-lists__item--parent"><span class="asset-pending"></span> Понятное расписание без сюрпризов</li>
          <li class="courses-lists__item courses-lists__item--parent"><span class="asset-pending"></span> Доступ к реальному прогрессу ребёнка</li>
          <li class="courses-lists__item courses-lists__item--parent"><span class="asset-pending"></span> Связь с куратором в любое время</li>
          <li class="courses-lists__item courses-lists__item--parent"><span class="asset-pending"></span> Подробные отчёты об успеваемости</li>
          <li class="courses-lists__item courses-lists__item--parent"><span class="asset-pending"></span> Помощь с переходом из обычной школы</li>
        </ul>
      </div>
      <div>
        <h2 class="courses-lists__col-title">Что получает ученик</h2>
        <ul class="courses-lists__items">
          <li class="courses-lists__item courses-lists__item--student"><span class="asset-pending"></span> Понятные и интересные уроки</li>
          <li class="courses-lists__item courses-lists__item--student"><span class="asset-pending"></span> Меньше стресса и тревоги из-за оценок</li>
          <li class="courses-lists__item courses-lists__item--student"><span class="asset-pending"></span> Возможность учиться в своём комфортном темпе</li>
          <li class="courses-lists__item courses-lists__item--student"><span class="asset-pending"></span> Записи всех занятий (можно пересмотреть)</li>
          <li class="courses-lists__item courses-lists__item--student"><span class="asset-pending"></span> Современная и удобная платформа</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ========================= FAQ (Figma 35:1986) ===================== -->
<section class="courses-faq">
  <div class="container">
    <h2 class="courses-faq__title">Частые вопросы</h2>
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
            Есть ли пробное занятие?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
      </div>
      <div class="courses-faq__col">
        <details class="courses-faq__item">
          <summary>
            Как родитель видит прогресс?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
        <details class="courses-faq__item">
          <summary>
            Как родитель видит прогресс?
            <span class="courses-faq__chevron asset-pending" aria-hidden="true"></span>
          </summary>
          <p class="courses-faq__answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
        </details>
      </div>
    </div>
  </div>
</section>

<!-- ======================= CTA-баннер (Figma 35:2022) ================ -->
<section class="courses-cta">
  <span class="courses-cta__glow courses-cta__glow--left" aria-hidden="true"></span>
  <span class="courses-cta__glow courses-cta__glow--right" aria-hidden="true"></span>
  <div class="container">
    <div class="courses-cta__inner">
      <h2 class="courses-cta__title">Не знаете, какой курс подойдёт ребёнку?</h2>
      <p class="courses-cta__text">Оставьте заявку — мы поможем подобрать программу под класс, цели и текущую ситуацию.</p>
      <button class="btn btn--rect courses-cta__button" type="button" data-modal-open="consultation">Записаться на консультацию</button>
    </div>
  </div>
</section>

<?php
get_footer();
