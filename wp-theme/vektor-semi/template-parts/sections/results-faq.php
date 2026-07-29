<?php
/**
 * Секции пробного урока, отзывов, FAQ, CTA и SEO-текста — Figma node 1:740.
 * 5 из 6 ответов FAQ в макете отсутствуют — блокер 5.13.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;
?>
<section class="results-faq" id="results-faq">

  <div class="results-faq__promo">
    <div class="container">
      <div class="results-faq__promo-grid reveal">
        <div class="results-faq__trial">
          <span class="results-faq__trial-play">
            <!-- Требуется экспорт из Figma: node 1:747, 64×64 -->
            <span class="asset-pending" style="width:64px;height:64px"></span>
          </span>
          <h3 class="results-faq__promo-title">Бесплатный пробный урок</h3>
          <p class="results-faq__promo-text">
            Познакомьтесь со школой, преподавателем и форматом обучения. Это отличная возможность понять, подходит ли вам такой формат.
          </p>
          <button class="btn btn--primary" type="button" data-modal-open="consultation">Записаться бесплатно</button>
        </div>

        <div class="results-faq__newsletter">
          <h3 class="results-faq__promo-title">Полезные материалы для родителей</h3>
          <p class="results-faq__promo-text">
            Подпишитесь на нашу рассылку, чтобы получать советы психологов, методистов и новости об образовании.
          </p>
          <form class="results-faq__newsletter-form" data-validate>
            <label class="visually-hidden" for="newsletter-email">Ваш e-mail</label>
            <span class="results-faq__newsletter-field">
              <!-- Требуется экспорт из Figma: node 1:764, 20×20 -->
              <span class="asset-pending" style="width:20px;height:20px"></span>
              <input class="results-faq__newsletter-input" type="email" id="newsletter-email" name="email" placeholder="Ваш e-mail" required>
            </span>
            <button class="btn btn--primary results-faq__newsletter-submit" type="submit">Подписаться</button>
          </form>
          <p class="results-faq__newsletter-note">Никакого спама. Отписаться можно в один клик.</p>
        </div>
      </div>

      <div class="results-faq__accred reveal">
        <div>
          <p class="results-faq__accred-title">
            <!-- Требуется экспорт из Figma: node 1:774, 32×32 -->
            <span class="asset-pending" style="width:32px;height:32px"></span>
            Государственная аккредитация
          </p>
          <p class="results-faq__accred-text">
            Мы сотрудничаем с школой имеющей все необходимые образовательные лицензии. Ваш ребенок получит официальный аттестат.
          </p>
        </div>
        <!-- В макете это текстовые названия школ-партнёров без логотипов -->
        <div class="results-faq__accred-logos" aria-hidden="true">
          <span>Школа №1</span>
          <span>Академия</span>
          <span>Гимназия+</span>
        </div>
      </div>
    </div>
  </div>

  <div class="results-faq__reviews">
    <div class="container">
      <div class="results-faq__header reveal">
        <h2 class="results-faq__title">Что говорят родители</h2>
      </div>

      <ul class="results-faq__reviews-grid reveal">
        <li class="results-faq__review">
          <div class="results-faq__review-head">
            <span class="results-faq__review-avatar" aria-hidden="true"></span>
            <span>
              <span class="results-faq__review-name" style="display:block">Анна, мама 7 класса</span>
              <span class="results-faq__review-stars" aria-hidden="true">
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
              </span>
            </span>
          </div>
          <p class="results-faq__review-text">«Очень довольны обучением! Ребенок стал увереннее, нагрузка комфортная, учителя всегда на связи. Больше нет слез из-за домашки, как было в обычной школе.»</p>
        </li>
        <li class="results-faq__review">
          <div class="results-faq__review-head">
            <span class="results-faq__review-avatar" aria-hidden="true"></span>
            <span>
              <span class="results-faq__review-name" style="display:block">Анна, мама 7 класса</span>
              <span class="results-faq__review-stars" aria-hidden="true">
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
              </span>
            </span>
          </div>
          <p class="results-faq__review-text">«Очень довольны обучением! Ребенок стал увереннее, нагрузка комфортная, учителя всегда на связи. Больше нет слез из-за домашки, как было в обычной школе.»</p>
        </li>
        <li class="results-faq__review">
          <div class="results-faq__review-head">
            <span class="results-faq__review-avatar" aria-hidden="true"></span>
            <span>
              <span class="results-faq__review-name" style="display:block">Анна, мама 7 класса</span>
              <span class="results-faq__review-stars" aria-hidden="true">
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
                <span class="asset-pending" style="width:12px;height:12px"></span>
              </span>
            </span>
          </div>
          <p class="results-faq__review-text">«Очень довольны обучением! Ребенок стал увереннее, нагрузка комфортная, учителя всегда на связи. Больше нет слез из-за домашки, как было в обычной школе.»</p>
        </li>
      </ul>
    </div>
  </div>

  <div class="results-faq__faq">
    <div class="container">
      <div class="results-faq__header reveal">
        <h2 class="results-faq__title">Частые вопросы</h2>
        <p class="results-faq__faq-text">Отвечаем на главные вопросы родителей о семейном образовании и нашей школе.</p>
      </div>

      <div class="results-faq__faq-panel reveal">
        <div class="results-faq__faq-col">
          <details class="results-faq__faq-item" open>
            <summary>
              Можно ли перейти к вам в течение года?
              <span class="results-faq__faq-chevron asset-pending" aria-hidden="true"></span>
            </summary>
            <p class="results-faq__faq-answer">Да, вы можете присоединиться к нам в любой момент. Мы поможем плавно влиться в учебный процесс.</p>
          </details>
          <!-- Ответы для вопросов ниже не добавлены в макет (свёрнутые состояния без контента) — блокер 5.13 -->
          <details class="results-faq__faq-item">
            <summary>
              Как родитель видит прогресс?
              <span class="results-faq__faq-chevron asset-pending" aria-hidden="true"></span>
            </summary>
            <p class="results-faq__faq-answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
          </details>
          <details class="results-faq__faq-item">
            <summary>
              Есть ли пробное занятие?
              <span class="results-faq__faq-chevron asset-pending" aria-hidden="true"></span>
            </summary>
            <p class="results-faq__faq-answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
          </details>
        </div>
        <div class="results-faq__faq-col">
          <details class="results-faq__faq-item">
            <summary>
              Как проходит аттестация?
              <span class="results-faq__faq-chevron asset-pending" aria-hidden="true"></span>
            </summary>
            <p class="results-faq__faq-answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
          </details>
          <details class="results-faq__faq-item">
            <summary>
              Сколько детей в группе?
              <span class="results-faq__faq-chevron asset-pending" aria-hidden="true"></span>
            </summary>
            <p class="results-faq__faq-answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
          </details>
          <details class="results-faq__faq-item">
            <summary>
              Официально ли это?
              <span class="results-faq__faq-chevron asset-pending" aria-hidden="true"></span>
            </summary>
            <p class="results-faq__faq-answer">Ответ на этот вопрос ещё не добавлен в макет Figma.</p>
          </details>
        </div>
      </div>
    </div>
  </div>

  <div class="results-faq__cta-wrap">
    <span class="results-faq__cta-tint" aria-hidden="true"></span>
    <div class="container">
      <div class="results-faq__cta reveal">
        <span class="results-faq__cta-bg" aria-hidden="true">
          <span class="asset-pending asset-pending--photo">&nbsp;</span>
        </span>
        <h2 class="results-faq__cta-title">Начните обучение без стресса уже сейчас</h2>
        <p class="results-faq__cta-text">
          Оставьте заявку на бесплатную консультацию. Мы ответим на все вопросы, поможем определить уровень знаний ребенка и подберем подходящую программу.
        </p>
        <div class="results-faq__cta-actions">
          <button class="btn btn--primary btn--lg" type="button" data-modal-open="consultation">Записаться на консультацию</button>
          <button class="btn btn--outline btn--lg" type="button" data-modal-open="consultation">Узнать подробнее</button>
        </div>
      </div>
    </div>
  </div>

  <div class="results-faq__intro">
    <div class="container">
      <h2 class="results-faq__intro-title">Онлайн-школа «Точка роста» — ваш проводник в мире семейного образования</h2>
      <p class="results-faq__intro-text">
        Переход на <strong>домашнее обучение</strong> становится все более популярным выбором осознанных родителей. Наша <strong>онлайн-школа</strong> предлагает комплексный подход к <strong>семейному образованию</strong> для учеников 1-11 классов. Мы не просто предоставляем доступ к видеоурокам, мы организуем полноценный образовательный процесс с живыми уроками в мини-группах.
      </p>
      <p class="results-faq__intro-text">
        Особое внимание уделяется <strong>подготовке к ОГЭ и ЕГЭ</strong>, а также официальной <strong>аттестации</strong>. Сотрудничество с аккредитованными школами-партнерами гарантирует получение документов государственного образца по окончании <strong>обучения 1-11 класс</strong>.
      </p>
      <a class="results-faq__intro-link" href="#">Подробнее</a>
    </div>
  </div>
</section>
