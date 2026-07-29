<?php
/**
 * Шапка сайта — Figma node 7:1479.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="visually-hidden" href="#main"><?php esc_html_e( 'Перейти к содержанию', 'vektor-semi' ); ?></a>

<header class="header">
	<div class="container header__inner">

		<a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<span class="logo__mark">
				<?php
				if ( has_custom_logo() ) {
					$logo_id = (int) get_theme_mod( 'custom_logo' );
					echo wp_get_attachment_image( $logo_id, 'full', false, array( 'alt' => '' ) );
				} else {
					// Иконка-росток ещё не выгружена из макета — блокер 5.4.
					vs_asset_pending( 33, 24 );
				}
				?>
			</span>
			<span class="logo__text">
				<span class="logo__name"><?php bloginfo( 'name' ); ?></span>
				<?php if ( get_bloginfo( 'description' ) ) : ?>
					<span class="logo__tagline"><?php bloginfo( 'description' ); ?></span>
				<?php endif; ?>
			</span>
		</a>

		<nav class="header__nav" aria-label="<?php esc_attr_e( 'Основная навигация', 'vektor-semi' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'header__nav-list',
					'menu_id'        => 'main-menu',
					'depth'          => 1,
					'fallback_cb'    => false,
					'items_wrap'     => '<ul id="%1$s" class="%2$s" data-menu>%3$s</ul>',
				)
			);
			?>
		</nav>

		<div class="header__aside">
			<div class="header__contacts">
				<a class="header__phone" href="<?php echo esc_attr( vs_phone_href() ); ?>"><?php echo esc_html( vs_phone() ); ?></a>
				<span class="header__schedule"><?php echo esc_html( vs_schedule() ); ?></span>
			</div>

			<div class="header__actions">
				<?php // Экран «Войти» в макете не определён — блокер 5.6. ?>
				<a class="btn btn--secondary" href="<?php echo esc_url( wp_login_url() ); ?>">
					<?php vs_asset_pending( 16, 16 ); ?>
					<?php esc_html_e( 'Войти', 'vektor-semi' ); ?>
				</a>
				<button class="btn btn--primary" type="button" data-modal-open="consultation">
					<?php esc_html_e( 'Записаться', 'vektor-semi' ); ?>
					<?php vs_asset_pending( 16, 16 ); ?>
				</button>
			</div>

			<button class="header__burger" type="button"
					aria-expanded="false" aria-controls="main-menu"
					data-menu-toggle>
				<span class="visually-hidden"><?php esc_html_e( 'Открыть меню', 'vektor-semi' ); ?></span>
			</button>
		</div>

	</div>
</header>

<div class="header__spacer" aria-hidden="true"></div>

<main id="main">
