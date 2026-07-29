<?php
/**
 * Универсальный шаблон-запасной вариант.
 *
 * WordPress требует index.php в любой теме. Реальные списки записей
 * обслуживают home.php (блог) и archive-vs_course.php (курсы) —
 * сюда попадают только архивы рубрик, меток, автора и дат.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs();
?>

<section class="blog-hero">
	<div class="container">
		<h1 class="blog-hero__title"><?php echo esc_html( wp_strip_all_tags( get_the_archive_title() ) ); ?></h1>
		<?php if ( get_the_archive_description() ) : ?>
			<p class="blog-hero__text"><?php echo esc_html( wp_strip_all_tags( get_the_archive_description() ) ); ?></p>
		<?php endif; ?>
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
				<p class="blog-card__text"><?php esc_html_e( 'Записей пока нет.', 'vektor-semi' ); ?></p>
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
				'screen_reader_text' => __( 'Страницы', 'vektor-semi' ),
				'class'              => 'blog-pagination',
			)
		);
		?>
	</div>
</section>

<?php
get_footer();
