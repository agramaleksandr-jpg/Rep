<?php
/**
 * Подключение стилей и скриптов.
 *
 * В статике каждая страница линковала только нужные ей компонентные файлы —
 * здесь тот же принцип: базовый набор грузится всегда, компонентные —
 * по типу текущего шаблона. Порядок важен: adaptive.css идёт последним,
 * он переопределяет раскладку на узких экранах (см. docs/AUDIT.md, блокер 5.1).
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

/**
 * Возвращает список компонентных стилей для текущего запроса.
 *
 * @return string[] Имена файлов из assets/css/components без расширения.
 */
function vs_current_components() {
	// Есть на каждой странице.
	$components = array( 'button', 'header', 'footer', 'modal' );

	if ( is_front_page() ) {
		$components = array_merge(
			$components,
			array( 'hero', 'benefits', 'online-classes', 'timeline-format', 'attestation-exam', 'parents-teachers', 'results-faq' )
		);
	} else {
		// Все внутренние страницы показывают хлебные крошки.
		$components[] = 'breadcrumb';
	}

	if ( is_post_type_archive( 'vs_course' ) || is_tax( 'vs_course_group' ) ) {
		$components[] = 'courses';
	}

	if ( is_singular( 'vs_course' ) ) {
		$components[] = 'parents-teachers';
		$components[] = 'course';
	}

	if ( is_home() || is_singular( 'post' ) || is_archive() || is_search() ) {
		$components[] = 'blog';
	}

	if ( is_singular( 'post' ) ) {
		$components[] = 'blog-post';
	}

	if ( is_page_template( 'page-templates/attestation.php' ) ) {
		$components[] = 'course';
		$components[] = 'courses';
		$components[] = 'attestation';
	}

	if ( is_page_template( 'page-templates/about.php' ) ) {
		$components[] = 'timeline-format';
		$components[] = 'parents-teachers';
		$components[] = 'about';
	}

	if ( is_page_template( 'page-templates/parents.php' ) ) {
		$components[] = 'courses';
		$components[] = 'parents';
	}

	if ( is_page_template( 'page-templates/contacts.php' ) ) {
		$components[] = 'contacts';
	}

	return array_values( array_unique( $components ) );
}

/**
 * Регистрирует и подключает ассеты темы.
 */
function vs_enqueue_assets() {
	$css = VS_URI . '/assets/css';

	// --- База: порядок как в статике -------------------------------------
	wp_enqueue_style( 'vs-fonts', $css . '/fonts.css', array(), VS_VERSION );
	wp_enqueue_style( 'vs-tokens', $css . '/tokens.css', array( 'vs-fonts' ), VS_VERSION );
	wp_enqueue_style( 'vs-base', $css . '/base.css', array( 'vs-tokens' ), VS_VERSION );

	$deps = array( 'vs-base' );

	foreach ( vs_current_components() as $component ) {
		$handle = 'vs-' . $component;
		wp_enqueue_style( $handle, $css . '/components/' . $component . '.css', $deps, VS_VERSION );
		$deps[] = $handle;
	}

	// Адаптив всегда последним — он переопределяет компонентные правила.
	wp_enqueue_style( 'vs-adaptive', $css . '/adaptive.css', $deps, VS_VERSION );

	// style.css темы нужен WordPress как манифест; правил в нём нет,
	// но подключаем, чтобы дочерние темы могли на него опереться.
	wp_enqueue_style( 'vs-theme', get_stylesheet_uri(), array( 'vs-adaptive' ), VS_VERSION );

	wp_enqueue_script( 'vs-main', VS_URI . '/assets/js/main.js', array(), VS_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'vs_enqueue_assets' );

/**
 * Шрифты Inter лежат локально — просим браузер забрать их пораньше.
 *
 * Файлы ещё не выгружены из макета (блокер 5.7 в docs/AUDIT.md);
 * когда появятся, preload заработает без правок.
 */
function vs_preload_fonts() {
	$fonts = array( 'Inter-Regular', 'Inter-Medium', 'Inter-SemiBold', 'Inter-Bold' );

	foreach ( $fonts as $font ) {
		$path = VS_DIR . '/assets/fonts/' . $font . '.woff2';

		if ( ! file_exists( $path ) ) {
			continue;
		}

		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( VS_URI . '/assets/fonts/' . $font . '.woff2' )
		);
	}
}
add_action( 'wp_head', 'vs_preload_fonts', 1 );

/**
 * Классы body: помечаем страницу, чтобы CSS/JS могли на неё опереться.
 *
 * @param string[] $classes Классы.
 * @return string[]
 */
function vs_body_class( $classes ) {
	if ( is_front_page() ) {
		$classes[] = 'is-front';
	}

	return $classes;
}
add_filter( 'body_class', 'vs_body_class' );
