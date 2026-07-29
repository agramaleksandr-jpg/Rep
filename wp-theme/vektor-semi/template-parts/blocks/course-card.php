<?php
/**
 * Карточка курса в каталоге — Figma node 35:1434.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

$vs_groups   = get_the_terms( get_the_ID(), 'vs_course_group' );
$vs_tag      = ( $vs_groups && ! is_wp_error( $vs_groups ) ) ? $vs_groups[0]->name : '';
$vs_format   = (string) get_post_meta( get_the_ID(), 'vs_course_format', true );
$vs_curator  = (string) get_post_meta( get_the_ID(), 'vs_course_curator', true );
?>
<li class="courses-card">
	<?php if ( '' !== $vs_tag ) : ?>
		<span class="courses-card__tag"><?php echo esc_html( $vs_tag ); ?></span>
	<?php endif; ?>

	<h3 class="courses-card__title"><?php the_title(); ?></h3>

	<?php if ( has_excerpt() ) : ?>
		<p class="courses-card__text"><?php echo esc_html( get_the_excerpt() ); ?></p>
	<?php endif; ?>

	<?php if ( '' !== $vs_format || '' !== $vs_curator ) : ?>
		<div class="courses-card__meta">
			<?php if ( '' !== $vs_format ) : ?>
				<span class="courses-card__meta-item"><?php vs_asset_pending( 16, 16 ); ?> <?php echo esc_html( $vs_format ); ?></span>
			<?php endif; ?>
			<?php if ( '' !== $vs_curator ) : ?>
				<span class="courses-card__meta-item"><?php vs_asset_pending( 16, 16 ); ?> <?php echo esc_html( $vs_curator ); ?></span>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="courses-card__actions">
		<a class="btn btn--outline-brand btn--rect" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Подробнее', 'vektor-semi' ); ?></a>
		<button class="btn btn--primary btn--rect" type="button" data-modal-open="consultation"><?php esc_html_e( 'Записаться', 'vektor-semi' ); ?></button>
	</div>
</li>
