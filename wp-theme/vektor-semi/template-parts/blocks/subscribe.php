<?php
/**
 * Карточка подписки в боковой колонке блога — Figma node 36:4744.
 *
 * Форма интерфейсная: реальную подписку по ТЗ не подключаем.
 * Показывается, только если виджетов в области «Боковая колонка блога» нет.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="blog-subscribe">
	<h2 class="blog-subscribe__title"><?php esc_html_e( 'Полезные письма', 'vektor-semi' ); ?></h2>
	<p class="blog-subscribe__text"><?php esc_html_e( 'Получайте новые статьи и чек-листы для родителей раз в неделю.', 'vektor-semi' ); ?></p>

	<form class="blog-subscribe__form" data-validate novalidate>
		<div data-field>
			<label class="visually-hidden" for="blog-subscribe-email"><?php esc_html_e( 'Ваш Email', 'vektor-semi' ); ?></label>
			<input class="blog-subscribe__input" type="email" id="blog-subscribe-email" name="email" placeholder="<?php esc_attr_e( 'Ваш Email', 'vektor-semi' ); ?>" required>
			<span class="blog-subscribe__error" data-error hidden></span>
		</div>
		<button class="blog-subscribe__submit" type="submit"><?php esc_html_e( 'Подписаться', 'vektor-semi' ); ?></button>
		<p class="blog-subscribe__note"><?php esc_html_e( 'Нажимая кнопку, вы соглашаетесь с правилами.', 'vektor-semi' ); ?></p>
		<p class="modal__status" data-form-status hidden></p>
	</form>
</div>
