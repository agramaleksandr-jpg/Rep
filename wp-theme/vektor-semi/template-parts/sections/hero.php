<?php
/**
 * Секция «Герой» главной — Figma node 1:8.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;
?>
<section class="hero">
  <span class="hero__blob hero__blob--right" aria-hidden="true"></span>
  <span class="hero__blob hero__blob--left" aria-hidden="true"></span>

  <div class="container hero__inner">

    <div class="hero__content">
      <p class="hero__badge"><span aria-hidden="true">🎉</span> Онлайн-школа с 1 по 11 класс</p>

      <h1 class="hero__title">
        Учимся дома, растём уверенными <span class="hero__title-accent">вместе!</span>
      </h1>

      <p class="hero__text">
        Живые онлайн-уроки с преподавателями, официальная аттестация и поддержка на каждом этапе обучения.
        <span class="hero__text-strong">Ребёнок учится дома, но не остаётся один.</span>
      </p>

      <div class="hero__actions">
        <button class="btn btn--primary btn--lg" type="button" data-modal-open="consultation">
          Записаться на обучение
          <span class="asset-pending" style="width:20px;height:20px"></span>
        </button>
        <button class="btn btn--outline btn--lg" type="button" data-modal-open="consultation">
          Получить консультацию
        </button>
      </div>

      <ul class="hero__stats">
        <li class="hero__stat">
          <span class="hero__stat-icon">
            <span class="asset-pending" style="width:24px;height:24px"></span>
          </span>
          <span class="hero__stat-text">Довольные ученики</span>
        </li>
        <li class="hero__stat">
          <span class="hero__stat-icon">
            <span class="asset-pending" style="width:24px;height:24px"></span>
          </span>
          <span class="hero__stat-text">Опытные преподаватели</span>
        </li>
        <li class="hero__stat">
          <span class="hero__stat-icon">
            <span class="asset-pending" style="width:24px;height:24px"></span>
          </span>
          <span class="hero__stat-text">Успешные аттестации</span>
        </li>
      </ul>
    </div>

    <div class="hero__media">
      <div class="hero__frame">
        <span class="asset-pending asset-pending--photo">Счастливая ученица на онлайн уроке<br>assets/images/hero-student.jpg</span>
        <div class="hero__play-layer">
          <button class="hero__play" type="button">
            <span class="visually-hidden">Смотреть видео о школе</span>
            <span class="asset-pending" style="width:31px;height:30px"></span>
          </button>
        </div>
      </div>

      <div class="hero__card hero__card--students">
        <span class="hero__card-icon hero__card-icon--blue">
          <span class="asset-pending" style="width:20px;height:20px"></span>
        </span>
        <span>
          <span class="hero__card-label">Присоединяйтесь к</span>
          <span class="hero__card-value">более 2 000 учеников</span>
        </span>
      </div>

      <div class="hero__card hero__card--attestation">
        <span class="hero__card-icon hero__card-icon--green">
          <span class="asset-pending" style="width:20px;height:20px"></span>
        </span>
        <span>
          <span class="hero__card-value">Официальная</span>
          <span class="hero__card-label">аттестация</span>
        </span>
      </div>
    </div>

  </div>
</section>
