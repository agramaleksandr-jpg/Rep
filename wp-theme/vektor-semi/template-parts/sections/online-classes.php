<?php
/**
 * Секция «Онлайн-классы» — Figma node 1:194.
 * Содержательная панель есть только у таба «1–2 класс» — блокер 5.8.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;
?>
<section class="online-classes" id="online-classes" data-tabs>
  <div class="container">
    <div class="online-classes__header reveal">
      <h2 class="online-classes__title">Онлайн-классы по семейному образованию</h2>
      <p class="online-classes__text">
        Программы адаптированы под возрастные особенности учеников для достижения максимального результата без стресса.
      </p>
    </div>

    <div class="online-classes__tabs-row reveal">
      <div class="online-classes__tablist" role="tablist" aria-label="Возрастная группа">
        <button class="online-classes__tab" type="button" role="tab"
                id="online-classes-tab-1" aria-controls="online-classes-panel-1"
                aria-selected="true" tabindex="0">1–2 класс</button>
        <button class="online-classes__tab" type="button" role="tab"
                id="online-classes-tab-2" aria-controls="online-classes-panel-2"
                aria-selected="false" tabindex="-1">3-4 класс</button>
        <button class="online-classes__tab" type="button" role="tab"
                id="online-classes-tab-3" aria-controls="online-classes-panel-3"
                aria-selected="false" tabindex="-1">5-9 класс</button>
        <button class="online-classes__tab" type="button" role="tab"
                id="online-classes-tab-4" aria-controls="online-classes-panel-4"
                aria-selected="false" tabindex="-1">10-11 класс</button>
      </div>
    </div>

    <div class="online-classes__panels reveal">
      <div class="online-classes__panel" role="tabpanel" id="online-classes-panel-1"
           aria-labelledby="online-classes-tab-1" tabindex="0">
        <span class="online-classes__glow" aria-hidden="true"></span>

        <div class="online-classes__content">
          <span class="online-classes__badge">Начальная школа</span>
          <h3 class="online-classes__content-title">Мягкая адаптация и любовь к учебе</h3>
          <p class="online-classes__content-text">
            В начальных классах наша главная цель — не просто дать знания, а научить ребенка учиться и показать, что это может быть увлекательно. Мы используем игровые методики и создаем поддерживающую атмосферу.
          </p>

          <ul class="online-classes__features">
            <li class="online-classes__feature">
              <span class="online-classes__feature-icon">
                <!-- Требуется экспорт из Figma: node 1:223, 16×16 -->
                <span class="asset-pending" style="width:16px;height:16px"></span>
              </span>
              <span class="online-classes__feature-text">Мини-группы до 8 учеников</span>
            </li>
            <li class="online-classes__feature">
              <span class="online-classes__feature-icon">
                <span class="asset-pending" style="width:16px;height:16px"></span>
              </span>
              <span class="online-classes__feature-text">Живое общение с преподавателем</span>
            </li>
            <li class="online-classes__feature">
              <span class="online-classes__feature-icon">
                <span class="asset-pending" style="width:16px;height:16px"></span>
              </span>
              <span class="online-classes__feature-text">Интерактивные занятия</span>
            </li>
            <li class="online-classes__feature">
              <span class="online-classes__feature-icon">
                <span class="asset-pending" style="width:16px;height:16px"></span>
              </span>
              <span class="online-classes__feature-text">Записи всех уроков доступны 24/7</span>
            </li>
          </ul>

          <div class="online-classes__cta">
            <p class="online-classes__price">
              <span class="online-classes__price-value">От 370₽</span>
              <span class="online-classes__price-note">за 40 минут</span>
            </p>
            <button class="btn btn--primary btn--lg" type="button" data-modal-open="consultation">
              Узнать подробнее
              <!-- Требуется экспорт из Figma: node 1:247, 20×20 -->
              <span class="asset-pending btn__icon" style="width:20px;height:20px"></span>
            </button>
          </div>
        </div>

        <div class="online-classes__media">
          <span class="asset-pending asset-pending--photo">Ученики на выпускном<br>assets/images/online-classes-students.jpg</span>

          <div class="online-classes__media-card">
            <p class="online-classes__media-card-title">Фокус на базе</p>
            <p class="online-classes__media-card-text">Чтение, письмо, математика в комфортном темпе</p>
          </div>
        </div>
      </div>

      <!--
        Для возрастов 3-4, 5-9 и 10-11 класс контент в макете не
        спроектирован (есть только вкладки без содержимого) —
        см. блокер 5.8 в docs/AUDIT.md. Технический placeholder
        вместо выдумывания текста/цены/фото.
      -->
      <div class="online-classes__panel" role="tabpanel" id="online-classes-panel-2"
           aria-labelledby="online-classes-tab-2" tabindex="0" hidden>
        <p class="online-classes__placeholder">Материалы для 3–4 класса ещё не добавлены в макет Figma.</p>
      </div>
      <div class="online-classes__panel" role="tabpanel" id="online-classes-panel-3"
           aria-labelledby="online-classes-tab-3" tabindex="0" hidden>
        <p class="online-classes__placeholder">Материалы для 5–9 класса ещё не добавлены в макет Figma.</p>
      </div>
      <div class="online-classes__panel" role="tabpanel" id="online-classes-panel-4"
           aria-labelledby="online-classes-tab-4" tabindex="0" hidden>
        <p class="online-classes__placeholder">Материалы для 10–11 класса ещё не добавлены в макет Figma.</p>
      </div>
    </div>
  </div>
</section>
