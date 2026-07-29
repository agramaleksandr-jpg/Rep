<?php
/**
 * Подвал сайта — Figma node 7:1480.
 *
 * Копирайт в макете говорит «Точка роста», а логотип — «Вектор семьи»
 * (блокер 5.2). Тут выводится название сайта из настроек: заказчик решает,
 * какое из двух оставить, не правя шаблон.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;
?>
</main>

<footer class="footer">
	<div class="container footer__inner">

		<div class="footer__columns">

			<div class="footer__about">
				<a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<span class="logo__mark">
						<?php
						if ( has_custom_logo() ) {
							echo wp_get_attachment_image( (int) get_theme_mod( 'custom_logo' ), 'full', false, array( 'alt' => '' ) );
						} else {
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

				<p class="footer__description">
					<?php
					$about = get_option( 'vs_footer_about' );
					echo esc_html( $about ? $about : __( 'Современная онлайн-школа с человеческим лицом. Учим детей, бережем нервы родителей.', 'vektor-semi' ) );
					?>
				</p>

				<div class="footer__contacts">
					<a class="footer__phone" href="<?php echo esc_attr( vs_phone_href() ); ?>"><?php echo esc_html( vs_phone() ); ?></a>
					<a class="footer__email" href="mailto:<?php echo esc_attr( vs_email() ); ?>"><?php echo esc_html( vs_email() ); ?></a>
				</div>
			</div>

			<?php
			$footer_menus = array(
				'footer_learning' => __( 'Обучение', 'vektor-semi' ),
				'footer_info'     => __( 'Информация', 'vektor-semi' ),
				'footer_docs'     => __( 'Документы', 'vektor-semi' ),
			);

			foreach ( $footer_menus as $location => $title ) :
				if ( ! has_nav_menu( $location ) ) {
					continue;
				}
				?>
				<div class="footer__column">
					<h2 class="footer__heading"><?php echo esc_html( $title ); ?></h2>
					<?php
					wp_nav_menu(
						array(
							'theme_location' => $location,
							'container'      => false,
							'menu_class'     => 'footer__list',
							'depth'          => 1,
							'fallback_cb'    => false,
						)
					);
					?>
				</div>
			<?php endforeach; ?>

		</div>

		<div class="footer__bottom">
			<p class="footer__copyright">
				<?php
				printf(
					/* translators: 1 — год, 2 — название сайта. */
					esc_html__( '© %1$s Онлайн-школа «%2$s». Все права защищены.', 'vektor-semi' ),
					esc_html( gmdate( 'Y' ) ),
					esc_html( get_bloginfo( 'name' ) )
				);
				?>
			</p>

			<?php // Иконок и ссылок соцсетей в макете нет — блокер 5.3. ?>
			<ul class="footer__social">
				<li><span class="footer__social-item"></span></li>
				<li><span class="footer__social-item"></span></li>
				<li><span class="footer__social-item"></span></li>
			</ul>
		</div>

	</div>
</footer>

<?php get_template_part( 'template-parts/blocks/modal' ); ?>

<?php wp_footer(); ?>
</body>
</html>
