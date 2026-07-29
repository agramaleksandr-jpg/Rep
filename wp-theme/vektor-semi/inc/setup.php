<?php
/**
 * Регистрация возможностей темы, меню и размеров изображений.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

/**
 * Базовая настройка темы.
 */
function vs_setup() {
	load_theme_textdomain( 'vektor-semi', VS_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

	// Логотип в макете — иконка-росток плюс два текстовых блока; текст
	// выводим сами, поэтому кастомному логотипу задаём только размер иконки.
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 24,
			'width'       => 33,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	register_nav_menus(
		array(
			'primary'         => __( 'Основная навигация (шапка)', 'vektor-semi' ),
			'footer_learning' => __( 'Подвал — Обучение', 'vektor-semi' ),
			'footer_info'     => __( 'Подвал — Информация', 'vektor-semi' ),
			'footer_docs'     => __( 'Подвал — Документы', 'vektor-semi' ),
		)
	);

	// Размеры под карточки из макета.
	add_image_size( 'vs-card', 652, 525, true );      // карточка статьи/курса.
	add_image_size( 'vs-featured', 619, 303, true );  // избранная статья блога.
	add_image_size( 'vs-teacher', 424, 528, true );   // фото преподавателя.
	add_image_size( 'vs-hero', 1336, 468, true );     // обложка статьи.
}
add_action( 'after_setup_theme', 'vs_setup' );

/**
 * Ширина контента для встраиваемых объектов (полезная ширина контейнера).
 */
function vs_content_width() {
	$GLOBALS['content_width'] = 1336;
}
add_action( 'after_setup_theme', 'vs_content_width', 0 );

/**
 * Сайдбар блога — в макете там карточка подписки.
 */
function vs_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Боковая колонка блога', 'vektor-semi' ),
			'id'            => 'blog-aside',
			'description'   => __( 'Показывается справа от ленты статей. Если пусто — выводится карточка подписки из макета.', 'vektor-semi' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="blog-subscribe__title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'vs_widgets_init' );

/**
 * Пункты меню шапки получают aria-current, как в статике.
 *
 * @param array    $atts Атрибуты ссылки.
 * @param WP_Post  $item Пункт меню.
 * @param stdClass $args Аргументы wp_nav_menu.
 * @return array
 */
function vs_nav_menu_link_attributes( $atts, $item, $args ) {
	if ( 'primary' !== $args->theme_location ) {
		return $atts;
	}

	$atts['class'] = 'header__nav-link';

	if ( ! empty( $item->current ) || ! empty( $item->current_item_ancestor ) || ! empty( $item->current_item_parent ) ) {
		$atts['aria-current'] = 'page';
	}

	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'vs_nav_menu_link_attributes', 10, 3 );

/**
 * Ссылки подвала — свой класс.
 *
 * @param array    $atts Атрибуты ссылки.
 * @param WP_Post  $item Пункт меню.
 * @param stdClass $args Аргументы wp_nav_menu.
 * @return array
 */
function vs_footer_menu_link_attributes( $atts, $item, $args ) {
	if ( in_array( $args->theme_location, array( 'footer_learning', 'footer_info', 'footer_docs' ), true ) ) {
		$atts['class'] = 'footer__link';
	}

	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'vs_footer_menu_link_attributes', 10, 3 );
