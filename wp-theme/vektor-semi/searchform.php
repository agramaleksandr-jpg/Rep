<?php
/**
 * Форма поиска — визуально совпадает с поиском по блогу (Figma 36:4490).
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

$vs_id = 'search-' . wp_unique_id();
?>
<form class="blog-hero__search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="visually-hidden" for="<?php echo esc_attr( $vs_id ); ?>"><?php esc_html_e( 'Найти статью', 'vektor-semi' ); ?></label>
	<span class="asset-pending blog-hero__search-icon" aria-hidden="true"></span>
	<input class="blog-hero__search-input" type="search" id="<?php echo esc_attr( $vs_id ); ?>" name="s"
		value="<?php echo esc_attr( get_search_query() ); ?>"
		placeholder="<?php esc_attr_e( 'Найти статью (например, аттестация)', 'vektor-semi' ); ?>">
</form>
