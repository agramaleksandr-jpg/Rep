<?php
/**
 * Template Name: Контакты
 *
 * Шаблон страницы «Контакты» — Figma node 41:8724.
 * Условные данные (телефоны +7 (___), «Уточнить у заказчика») перенесены
 * из макета дословно — блокер 5.31.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs( get_the_title() );
?>
<!-- ===================== Hero (Figma 41:8805) ======================= -->
<section class="contacts-hero">
  <div class="container">
    <div class="contacts-hero__grid">

      <div class="contacts-hero__content">
        <h1 class="contacts-hero__title">Свяжитесь с нами удобным способом</h1>
        <p class="contacts-hero__text">Ответим на вопросы об обучении, аттестации, оплате, документах и переходе в онлайн-школу.</p>

        <div class="contacts-hero__actions">
          <a class="btn btn--primary btn--lg btn--rect" href="#messengers" style="padding-inline:32px">Написать в мессенджер</a>
          <button class="btn btn--outline-brand btn--lg btn--rect" type="button" data-modal-open="consultation" style="padding-inline:33px">Заказать звонок</button>
        </div>

        <p class="contacts-hero__note">
          <!-- Требуется экспорт из Figma: node 41:8825, 20×20 -->
          <span class="asset-pending" aria-hidden="true"></span>
          Мы всегда на связи и готовы помочь с любой ситуацией.
        </p>
      </div>

      <div class="contacts-hero__tiles" aria-hidden="true">
        <div class="contacts-hero__tile contacts-hero__tile--program">
          <!-- Требуется экспорт из Figma: node 41:8837, 32×32 -->
          <span class="asset-pending"></span>
          Поможем подобрать<br>программу
        </div>
        <div class="contacts-hero__tile contacts-hero__tile--payment">
          <span class="asset-pending"></span>
          Ответим по<br>оплате
        </div>
        <div class="contacts-hero__tile contacts-hero__tile--support">
          <span class="asset-pending"></span>
          Поддержка<br>родителей
        </div>
        <div class="contacts-hero__tile contacts-hero__tile--admin">
          <span class="asset-pending"></span>
          Связь с<br>администрацией
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ================ Быстрые контакты (Figma 41:8871) =============== -->
<section class="contacts-quick">
  <div class="container">
    <h2 class="contacts-title">Быстрые контакты</h2>

    <div class="contacts-quick__grid">
      <div class="contacts-quick__card">
        <span class="contacts-quick__icon contacts-quick__icon--blue">
          <!-- Требуется экспорт из Figma: node 41:8879, 24×24 -->
          <span class="asset-pending"></span>
        </span>
        <h3 class="contacts-quick__label">Приёмная</h3>
        <p class="contacts-quick__value">+7 (___) ___-__-__</p>
        <p class="contacts-quick__text">Для новых родителей и консультаций по обучению</p>
        <button class="contacts-quick__btn" type="button" data-modal-open="consultation">Позвонить</button>
      </div>

      <div class="contacts-quick__card">
        <span class="contacts-quick__icon contacts-quick__icon--violet">
          <span class="asset-pending"></span>
        </span>
        <h3 class="contacts-quick__label">Учебный отдел</h3>
        <p class="contacts-quick__value">+7 (___) ___-__-__</p>
        <p class="contacts-quick__text">По расписанию, занятиям, кураторам и процессу</p>
        <button class="contacts-quick__btn" type="button" data-modal-open="consultation">Позвонить</button>
      </div>

      <div class="contacts-quick__card">
        <span class="contacts-quick__icon contacts-quick__icon--amber">
          <span class="asset-pending"></span>
        </span>
        <h3 class="contacts-quick__label">Бухгалтерия</h3>
        <p class="contacts-quick__value">+7 (___) ___-__-__</p>
        <p class="contacts-quick__text">По вопросам оплаты, чеков, договоров</p>
        <button class="contacts-quick__btn" type="button" data-modal-open="consultation">Позвонить</button>
      </div>

      <div class="contacts-quick__card">
        <span class="contacts-quick__icon contacts-quick__icon--green">
          <span class="asset-pending"></span>
        </span>
        <h3 class="contacts-quick__label">Общая почта</h3>
        <a class="contacts-quick__value" href="mailto:info@school.ru">info@school.ru</a>
        <p class="contacts-quick__text">Для официальных обращений и документов</p>
        <a class="contacts-quick__btn" href="mailto:info@school.ru">Написать</a>
      </div>
    </div>
  </div>
</section>

<!-- ================= Мессенджеры (Figma 41:8964) =================== -->
<section class="contacts-messengers" id="messengers">
  <div class="container">
    <h2 class="contacts-title">Пишите туда, где вам удобно</h2>

    <div class="contacts-messengers__grid">
      <div class="contacts-messengers__card contacts-messengers__card--telegram">
        <div class="contacts-messengers__head">
          <span class="contacts-messengers__icon">
            <!-- Требуется экспорт из Figma: node 41:8973, 20×20 -->
            <span class="asset-pending"></span>
          </span>
          <h3 class="contacts-messengers__title">Telegram</h3>
        </div>
        <p class="contacts-messengers__text">Быстрые вопросы и консультации</p>
        <!-- Адреса аккаунтов в макете не заданы — блокер 5.32 -->
        <a class="contacts-messengers__btn" href="#">Перейти</a>
      </div>

      <div class="contacts-messengers__card contacts-messengers__card--whatsapp">
        <div class="contacts-messengers__head">
          <span class="contacts-messengers__icon"><span class="asset-pending"></span></span>
          <h3 class="contacts-messengers__title">WhatsApp</h3>
        </div>
        <p class="contacts-messengers__text">Вопросы родителей и запись</p>
        <a class="contacts-messengers__btn" href="#">Перейти</a>
      </div>

      <div class="contacts-messengers__card contacts-messengers__card--vk">
        <div class="contacts-messengers__head">
          <span class="contacts-messengers__icon"><span class="asset-pending"></span></span>
          <h3 class="contacts-messengers__title">ВКонтакте</h3>
        </div>
        <p class="contacts-messengers__text">Новости и полезные материалы</p>
        <a class="contacts-messengers__btn" href="#">Перейти</a>
      </div>

      <div class="contacts-messengers__card contacts-messengers__card--youtube">
        <div class="contacts-messengers__head">
          <span class="contacts-messengers__icon"><span class="asset-pending"></span></span>
          <h3 class="contacts-messengers__title">YouTube</h3>
        </div>
        <p class="contacts-messengers__text">Открытые уроки и записи</p>
        <a class="contacts-messengers__btn" href="#">Перейти</a>
      </div>
    </div>
  </div>
</section>

<!-- ============== Куда написать (Figma 41:9048) ==================== -->
<section class="contacts-routes">
  <div class="container">
    <h2 class="contacts-title">Куда написать по вашему вопросу?</h2>

    <div class="contacts-routes__grid">
      <div class="contacts-routes__card">
        <span class="contacts-routes__icon">
          <!-- Требуется экспорт из Figma: node 41:9056, 24×24 -->
          <span class="asset-pending"></span>
        </span>
        <h3 class="contacts-routes__title">Хочу узнать об обучении</h3>
        <p class="contacts-routes__text">Поможем выбрать программу, формат обучения и понять, подойдёт ли школа вашему ребёнку.</p>
        <a class="contacts-routes__link" href="#study-form">Задать вопрос <span class="asset-pending" aria-hidden="true"></span></a>
      </div>

      <div class="contacts-routes__card">
        <span class="contacts-routes__icon"><span class="asset-pending"></span></span>
        <h3 class="contacts-routes__title">Вопрос по занятиям</h3>
        <p class="contacts-routes__text">Расписание, домашние задания, куратор, доступ к платформе, связь с преподавателями.</p>
        <a class="contacts-routes__link" href="#study-form">В учебный отдел <span class="asset-pending" aria-hidden="true"></span></a>
      </div>

      <div class="contacts-routes__card">
        <span class="contacts-routes__icon"><span class="asset-pending"></span></span>
        <h3 class="contacts-routes__title">Вопрос по оплате</h3>
        <p class="contacts-routes__text">Оплата обучения, чеки, договоры, возвраты, рассрочка и закрывающие документы.</p>
        <a class="contacts-routes__link" href="#payment-form">Написать по оплате <span class="asset-pending" aria-hidden="true"></span></a>
      </div>

      <div class="contacts-routes__card">
        <span class="contacts-routes__icon"><span class="asset-pending"></span></span>
        <h3 class="contacts-routes__title">Документы и аттестация</h3>
        <p class="contacts-routes__text">Поможем разобраться, какие данные нужны и как подготовиться к аттестации.</p>
        <a class="contacts-routes__link" href="<?php echo esc_url( vs_page_url( 'attestation' ) ); ?>">По документам <span class="asset-pending" aria-hidden="true"></span></a>
      </div>

      <div class="contacts-routes__card">
        <span class="contacts-routes__icon"><span class="asset-pending"></span></span>
        <h3 class="contacts-routes__title">Написать директору</h3>
        <p class="contacts-routes__text">Для важных обращений, предложений или ситуаций, требующих внимания руководства.</p>
        <a class="contacts-routes__link" href="#director">Написать директору <span class="asset-pending" aria-hidden="true"></span></a>
      </div>

      <div class="contacts-routes__card">
        <span class="contacts-routes__icon"><span class="asset-pending"></span></span>
        <h3 class="contacts-routes__title">Партнёрство</h3>
        <p class="contacts-routes__text">Предложения от образовательных проектов, экспертов, платформ и партнёров.</p>
        <a class="contacts-routes__link" href="mailto:partners@school.ru">Отправить предложение <span class="asset-pending" aria-hidden="true"></span></a>
      </div>
    </div>
  </div>
</section>

<!-- =============== Две формы (Figma 41:9190) ======================= -->
<section class="contacts-forms">
  <div class="container">
    <div class="contacts-forms__grid">

      <div class="contacts-form contacts-form--study" id="study-form">
        <h2 class="contacts-form__title">По вопросам обучения</h2>
        <p class="contacts-form__text">Обратитесь сюда, если хотите подобрать курс, узнать про формат занятий, расписание или поддержку ребёнка.</p>

        <div class="contacts-form__contacts">
          <p class="contacts-form__contact">
            <!-- Требуется экспорт из Figma: node 41:9202, 20×20 -->
            <span class="asset-pending" aria-hidden="true"></span>
            <strong>+7 (___) ___-__-__</strong> (Пн-Пт, 09:00-19:00)
          </p>
          <p class="contacts-form__contact">
            <span class="asset-pending" aria-hidden="true"></span>
            <strong>education@school.ru</strong>
          </p>
        </div>

        <div class="contacts-form__faq">
          <h3 class="contacts-form__faq-title">Частые вопросы сюда:</h3>
          <ul class="contacts-form__faq-list">
            <li>Подбор программы и расписание</li>
            <li>Доступ в личный кабинет и домашка</li>
            <li>Подготовка к аттестации и экзаменам</li>
          </ul>
        </div>

        <form class="contacts-form__fields" data-validate novalidate>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="study-name">Ваше имя</label>
            <input class="contacts-form__input" type="text" id="study-name" name="name" placeholder="Ваше имя" required>
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="study-phone">Телефон</label>
            <input class="contacts-form__input" type="tel" id="study-phone" name="phone" placeholder="Телефон" data-phone required>
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="study-grade">Класс ребёнка</label>
            <input class="contacts-form__input" type="text" id="study-grade" name="grade" placeholder="Класс ребёнка">
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="study-message">Ваш вопрос</label>
            <textarea class="contacts-form__textarea" id="study-message" name="message" placeholder="Ваш вопрос" required></textarea>
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <button class="contacts-form__submit" type="submit">Отправить вопрос</button>
          <p class="modal__status" data-form-status hidden></p>
        </form>
      </div>

      <div class="contacts-form contacts-form--payment" id="payment-form">
        <h2 class="contacts-form__title">По вопросам оплаты</h2>
        <p class="contacts-form__text">Поможем разобраться с оплатой обучения, договором, чеками и закрывающими документами.</p>

        <div class="contacts-form__contacts">
          <p class="contacts-form__contact">
            <span class="asset-pending" aria-hidden="true"></span>
            <strong>+7 (___) ___-__-__</strong> (Пн-Пт, 10:00-18:00)
          </p>
          <p class="contacts-form__contact">
            <span class="asset-pending" aria-hidden="true"></span>
            <strong>payment@school.ru</strong>
          </p>
        </div>

        <div class="contacts-form__faq">
          <h3 class="contacts-form__faq-title">Частые вопросы сюда:</h3>
          <ul class="contacts-form__faq-list">
            <li>Оплата обучения, рассрочка, чеки</li>
            <li>Договор и закрывающие документы</li>
            <li>Изменение тарифа или возврат средств</li>
          </ul>
        </div>

        <form class="contacts-form__fields" data-validate novalidate>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="pay-name">Ваше имя</label>
            <input class="contacts-form__input" type="text" id="pay-name" name="name" placeholder="Ваше имя" required>
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="pay-contact">Телефон или Email</label>
            <input class="contacts-form__input" type="text" id="pay-contact" name="contact" placeholder="Телефон или Email" required>
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="pay-contract">Номер договора (если есть)</label>
            <input class="contacts-form__input" type="text" id="pay-contract" name="contract" placeholder="Номер договора (если есть)">
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <div class="contacts-form__field" data-field>
            <label class="visually-hidden" for="pay-message">Опишите ситуацию</label>
            <textarea class="contacts-form__textarea" id="pay-message" name="message" placeholder="Опишите ситуацию" required></textarea>
            <span class="contacts-form__error" data-error hidden></span>
          </div>
          <button class="contacts-form__submit" type="submit">Отправить обращение</button>
          <p class="modal__status" data-form-status hidden></p>
        </form>
      </div>

    </div>
  </div>
</section>

<!-- ============ Письмо директору (Figma 41:9342) =================== -->
<section class="contacts-director" id="director">
  <span class="contacts-director__glow contacts-director__glow--right" aria-hidden="true"></span>
  <span class="contacts-director__glow contacts-director__glow--left" aria-hidden="true"></span>
  <div class="container">
    <div class="contacts-director__inner">
      <h2 class="contacts-director__title">Написать директору школы</h2>
      <p class="contacts-director__text">Если вопрос требует личного внимания руководства, вы можете отправить обращение напрямую директору.</p>

      <div class="contacts-director__card">
        <div class="contacts-director__person">
          <span class="contacts-director__avatar" aria-hidden="true"></span>
          <div>
            <!-- Имя директора в макете не указано — стоит «Имя Директора» -->
            <p class="contacts-director__name">Имя Директора</p>
            <p class="contacts-director__role">Директор онлайн-школы</p>
            <p class="contacts-director__quote">«Мы внимательно относимся к обратной связи родителей. Если у вас есть важное предложение, благодарность или ситуация, требующая внимания руководства, напишите нам — обращение будет передано мне лично.»</p>
          </div>
        </div>

        <form class="contacts-director__form" data-validate novalidate>
          <div>
            <div data-field>
              <label class="visually-hidden" for="dir-name">Ваше имя</label>
              <input class="contacts-director__input" type="text" id="dir-name" name="name" placeholder="Ваше имя" required>
              <span class="contacts-director__error" data-error hidden></span>
            </div>
            <div data-field style="margin-block-start:16px">
              <label class="visually-hidden" for="dir-email">Email для связи</label>
              <input class="contacts-director__input" type="email" id="dir-email" name="email" placeholder="Email для связи" required>
              <span class="contacts-director__error" data-error hidden></span>
            </div>
            <div data-field style="margin-block-start:16px">
              <label class="visually-hidden" for="dir-type">Тип обращения</label>
              <select class="contacts-director__select" id="dir-type" name="type" required>
                <option value="" selected disabled hidden>Тип обращения</option>
                <option value="suggestion">Предложение</option>
                <option value="gratitude">Благодарность</option>
                <option value="complaint">Жалоба</option>
              </select>
              <span class="contacts-director__error" data-error hidden></span>
            </div>
          </div>

          <div>
            <div data-field>
              <label class="visually-hidden" for="dir-message">Сообщение директору</label>
              <textarea class="contacts-director__textarea" id="dir-message" name="message" placeholder="Сообщение директору" required></textarea>
              <span class="contacts-director__error" data-error hidden></span>
            </div>
            <button class="contacts-director__submit" type="submit" style="margin-block-start:16px;width:100%">Отправить сообщение</button>
          </div>

          <p class="modal__status" data-form-status hidden style="grid-column:1/-1"></p>
        </form>

        <p class="contacts-director__note">Мы передадим обращение руководству школы. Срок ответа: <strong>два рабочих дня.</strong></p>
      </div>
    </div>
  </div>
</section>

<!-- ========== Адрес и режим работы (Figma 41:9392) ================= -->
<section class="contacts-place">
  <div class="container">
    <div class="contacts-place__grid">

      <div>
        <h2 class="contacts-place__heading">Адрес школы</h2>
        <div class="contacts-place__address">
          <!-- Требуется экспорт из Figma: node 41:9401, 24×24 -->
          <span class="asset-pending" aria-hidden="true"></span>
          <div>
            <h3 class="contacts-place__address-title">Юридический и фактический адрес</h3>
            <p class="contacts-place__address-value">г. Москва, ул. Примерная, д. 10, офис 42</p>
            <p class="contacts-place__address-note">Обучение проходит дистанционно. Визит в офис возможен только по предварительной договорённости.</p>
          </div>
        </div>

        <h2 class="contacts-place__heading contacts-place__hours-heading">Режим работы</h2>
        <div class="contacts-place__hours">
          <div class="contacts-place__hours-row">
            <span class="contacts-place__hours-name">Консультации для родителей</span>
            <span class="contacts-place__hours-value">Пн–Пт: 09:00–19:00, Сб–Вс: по записи</span>
          </div>
          <div class="contacts-place__hours-row">
            <span class="contacts-place__hours-name">Учебный отдел</span>
            <span class="contacts-place__hours-value">Пн–Пт: 09:00–18:00</span>
          </div>
          <div class="contacts-place__hours-row">
            <span class="contacts-place__hours-name">Бухгалтерия / Оплата</span>
            <span class="contacts-place__hours-value">Пн–Пт: 10:00–18:00</span>
          </div>
        </div>
      </div>

      <!-- Карта в макете — заглушка, внешний виджет не подключаем (блокер 5.33) -->
      <div class="contacts-place__map" aria-hidden="true">
        <span class="asset-pending"></span>
        Интерактивная карта (Яндекс/2ГИС)
      </div>

    </div>
  </div>
</section>

<!-- ============== Реквизиты (Figma 41:9490) ======================== -->
<section class="contacts-legal">
  <div class="container">
    <div class="contacts-legal__grid">

      <div>
        <h2 class="contacts-legal__heading">
          <!-- Требуется экспорт из Figma: node 41:9495, 24×24 -->
          <span class="asset-pending" aria-hidden="true"></span>
          Юридическая информация
        </h2>
        <div class="contacts-legal__card">
          <table class="contacts-legal__table">
            <tbody>
              <tr><th scope="row">Полное наименование</th><td>Общество с ограниченной ответственностью «Название школы»</td></tr>
              <tr><th scope="row">ИНН / КПП</th><td>Уточнить у заказчика</td></tr>
              <tr><th scope="row">ОГРН</th><td>Уточнить у заказчика</td></tr>
              <tr><th scope="row">Юридический адрес</th><td>Уточнить у заказчика</td></tr>
              <tr><th scope="row">Руководитель</th><td>Иванов И.И. (действует на основании Устава)</td></tr>
              <tr><th scope="row">Лицензия</th><td>№ Л035-XXXXX-XX/XXXXXXXX от 01.01.2023</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 class="contacts-legal__heading">
          <span class="asset-pending" aria-hidden="true"></span>
          Банковские реквизиты
        </h2>
        <div class="contacts-legal__card">
          <table class="contacts-legal__table contacts-legal__table--bank">
            <tbody>
              <tr><th scope="row">Получатель</th><td>ООО «Название школы»</td></tr>
              <tr><th scope="row">Расчётный счёт</th><td>40702810XXXXXXXXXXXX</td></tr>
              <tr><th scope="row">Банк</th><td>ПАО СБЕРБАНК</td></tr>
              <tr><th scope="row">БИК</th><td>044525225</td></tr>
              <tr><th scope="row">Корр. счёт</th><td>30101810400000000225</td></tr>
            </tbody>
          </table>
          <div class="contacts-legal__actions">
            <button class="contacts-legal__btn contacts-legal__btn--copy" type="button">
              <span class="asset-pending" aria-hidden="true"></span>
              Скопировать реквизиты
            </button>
            <!-- Файл реквизитов в макете не приложен — блокер 5.33 -->
            <a class="contacts-legal__btn contacts-legal__btn--pdf" href="#">Скачать PDF</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ======== Документы и партнёрство (Figma 41:9615) ================ -->
<section class="contacts-docs">
  <div class="container">
    <h2 class="contacts-docs__heading">Документы</h2>

    <div class="contacts-docs__grid">
      <div class="contacts-docs__links">
        <a class="contacts-docs__link" href="#">
          <!-- Требуется экспорт из Figma: node 41:9654, 20×20 -->
          <span class="asset-pending" aria-hidden="true"></span>
          Политика обработки персональных данных
        </a>
        <a class="contacts-docs__link contacts-docs__link--accent" href="#">
          <span class="asset-pending" aria-hidden="true"></span>
          Правила оплаты и возврата
        </a>
        <a class="contacts-docs__link" href="#">
          <span class="asset-pending" aria-hidden="true"></span>
          Договор оферты
        </a>
        <a class="contacts-docs__link" href="#">
          <span class="asset-pending" aria-hidden="true"></span>
          Сведения об образовательной организации
        </a>
      </div>

      <div class="contacts-docs__partners">
        <span class="asset-pending contacts-docs__partners-bg" aria-hidden="true"></span>
        <h3 class="contacts-docs__partners-title">Партнёрство и официальные запросы</h3>
        <p class="contacts-docs__partners-text">По вопросам совместных проектов, вебинаров и публикаций в СМИ.</p>
        <a class="contacts-docs__partners-mail" href="mailto:partners@school.ru">
          <span class="asset-pending" aria-hidden="true"></span>
          partners@school.ru
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ================ Финальный CTA (Figma 41:9850) ================== -->
<section class="contacts-cta">
  <div class="container">
    <h2 class="contacts-cta__title">Мы на связи, когда у родителей появляются вопросы</h2>
    <p class="contacts-cta__text">Мы ответим на все вопросы, покажем платформу и поможем понять, подойдёт ли вам наш формат.</p>
    <div class="contacts-cta__actions">
      <button class="btn btn--primary btn--lg btn--rect contacts-cta__button" type="button" data-modal-open="consultation">Записаться на консультацию</button>
    </div>
  </div>
</section>

<?php
get_footer();
