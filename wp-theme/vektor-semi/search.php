<?php
/**
 * Результаты поиска.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs();
?>

<section class="blog-hero">
	<div class="container">
		<h1 class="blog-hero__title">
			<?php
			/* translators: %s — поисковый запрос. */
			printf( esc_html__( 'Поиск: %s', 'vektor-semi' ), esc_html( get_search_query() ) );
			?>
		</h1>
		<?php get_search_form(); ?>
	</div>
</section>

<section class="blog-feed">
	<div class="container">
		<div class="blog-feed__grid">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/blocks/post-card' );
				endwhile;
			else :
				?>
				<p class="blog-card__text"><?php esc_html_e( 'Ничего не найдено. Попробуйте изменить запрос.', 'vektor-semi' ); ?></p>
				<?php
			endif;
			?>
		</div>

		<?php
		the_posts_pagination(
			array(
				'mid_size'           => 2,
				'prev_text'          => '',
				'next_text'          => vs_pagination_next(),
				'screen_reader_text' => __( 'Страницы результатов', 'vektor-semi' ),
				'class'              => 'blog-pagination',
			)
		);
		?>
	</div>
</section>

<?php
get_footer();
