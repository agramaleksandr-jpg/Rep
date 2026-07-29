<?php
/**
 * Страница 404.
 *
 * Отдельного экрана 404 в макете нет (в Figma такой фрейм отсутствует) —
 * собран из существующих компонентов: заголовок как у блога плюс поиск.
 * Заменить, когда дизайнер нарисует экран.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs( __( 'Страница не найдена', 'vektor-semi' ) );
?>

<section class="blog-hero">
	<div class="container">
		<h1 class="blog-hero__title"><?php esc_html_e( 'Страница не найдена', 'vektor-semi' ); ?></h1>
		<p class="blog-hero__text"><?php esc_html_e( 'Возможно, страница была перемещена или адрес набран с опечаткой. Попробуйте найти нужное через поиск.', 'vektor-semi' ); ?></p>
		<?php get_search_form(); ?>
	</div>
</section>

<section class="contacts-cta">
	<div class="container">
		<h2 class="contacts-cta__title"><?php esc_html_e( 'Не нашли, что искали?', 'vektor-semi' ); ?></h2>
		<p class="contacts-cta__text"><?php esc_html_e( 'Напишите нам — подскажем, где искать, и ответим на вопросы об обучении.', 'vektor-semi' ); ?></p>
		<div class="contacts-cta__actions">
			<button class="btn btn--primary btn--lg btn--rect contacts-cta__button" type="button" data-modal-open="consultation"><?php esc_html_e( 'Записаться на консультацию', 'vektor-semi' ); ?></button>
		</div>
	</div>
</section>

<?php
get_footer();
