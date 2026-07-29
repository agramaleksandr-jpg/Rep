<?php
/**
 * Карточка статьи блога — Figma node 36:4922.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

$vs_category = vs_primary_category();
?>
<article <?php post_class( 'blog-card' ); ?>>
	<div class="blog-card__media">
		<?php vs_thumbnail_or_placeholder( 'vs-card', '', __( 'Обложка статьи', 'vektor-semi' ) ); ?>
	</div>
	<div class="blog-card__body">
		<div class="blog-card__meta">
			<?php if ( $vs_category ) : ?>
				<a class="blog-card__category" href="<?php echo esc_url( get_category_link( $vs_category ) ); ?>"><?php echo esc_html( $vs_category->name ); ?></a>
			<?php endif; ?>
			<span class="blog-card__time">
				<?php vs_asset_pending( 12, 12 ); ?>
				<?php
				/* translators: %d — время чтения в минутах. */
				printf( esc_html__( '%d мин', 'vektor-semi' ), (int) vs_reading_time() );
				?>
			</span>
		</div>
		<h3 class="blog-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<p class="blog-card__text"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 18 ) ); ?></p>
		<div class="blog-card__footer">
			<span class="blog-card__date"><?php echo esc_html( get_the_date() ); ?></span>
			<a class="blog-card__link" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Читать →', 'vektor-semi' ); ?></a>
		</div>
	</div>
</article>
