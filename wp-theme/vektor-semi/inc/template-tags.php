<?php
/**
 * Вспомогательные функции вывода.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

/**
 * Заглушка отсутствующего ассета.
 *
 * Пока иконки и фото не выгружены из Figma (блокер 5.4 в docs/AUDIT.md),
 * в разметке стоит `.asset-pending`. Функция выводит её единообразно,
 * чтобы потом заменить в одном месте.
 *
 * @param int    $width  Ширина в px.
 * @param int    $height Высота в px.
 * @param string $note   Подпись (для крупных фото).
 */
function vs_asset_pending( $width = 24, $height = 24, $note = '' ) {
	$class = 'asset-pending' . ( '' !== $note ? ' asset-pending--photo' : '' );

	printf(
		'<span class="%s"%s aria-hidden="true">%s</span>',
		esc_attr( $class ),
		'' === $note ? sprintf( ' style="width:%dpx;height:%dpx"', (int) $width, (int) $height ) : '',
		'' === $note ? '' : esc_html( $note )
	);
}

/**
 * Миниатюра записи либо заглушка, если картинки нет.
 *
 * @param string $size  Размер изображения.
 * @param string $class Класс обёртки.
 * @param string $note  Подпись заглушки.
 */
function vs_thumbnail_or_placeholder( $size = 'vs-card', $class = '', $note = '' ) {
	if ( has_post_thumbnail() ) {
		the_post_thumbnail(
			$size,
			array(
				'class'   => $class,
				'loading' => 'lazy',
			)
		);

		return;
	}

	vs_asset_pending( 64, 64, '' !== $note ? $note : __( 'Изображение не задано', 'vektor-semi' ) );
}

/**
 * Время чтения записи в минутах.
 *
 * В макете у карточек стоит «7 мин» — считаем по содержимому,
 * чтобы значение не было выдуманной константой.
 *
 * @param int|WP_Post|null $post Запись.
 * @return int Минуты (не меньше 1).
 */
function vs_reading_time( $post = null ) {
	$post = get_post( $post );

	if ( ! $post ) {
		return 1;
	}

	$words = str_word_count( wp_strip_all_tags( strip_shortcodes( $post->post_content ) ) );

	// Кириллицу str_word_count считает плохо — подстрахуемся простым разбиением.
	if ( $words < 10 ) {
		$words = count( preg_split( '/\s+/u', trim( wp_strip_all_tags( strip_shortcodes( $post->post_content ) ) ) ) );
	}

	return max( 1, (int) ceil( $words / 180 ) );
}

/**
 * Первая рубрика записи (в макете у карточки одна метка).
 *
 * @param int|WP_Post|null $post Запись.
 * @return WP_Term|null
 */
function vs_primary_category( $post = null ) {
	$terms = get_the_category( get_post( $post ) ? get_post( $post )->ID : 0 );

	return $terms ? $terms[0] : null;
}

/**
 * Хлебные крошки по макету (`breadcrumb`).
 *
 * @param string $current Заголовок текущего уровня. Если пусто — берётся из запроса.
 */
function vs_breadcrumbs( $current = '' ) {
	if ( is_front_page() ) {
		return;
	}

	$crumbs = array();

	if ( '' === $current ) {
		if ( is_singular( 'vs_course' ) ) {
			$archive = get_post_type_archive_link( 'vs_course' );

			if ( $archive ) {
				$crumbs[] = array( __( 'Курсы', 'vektor-semi' ), $archive );
			}

			$current = get_the_title();
		} elseif ( is_post_type_archive( 'vs_course' ) ) {
			$current = post_type_archive_title( '', false );
		} elseif ( is_singular( 'post' ) || is_home() ) {
			$blog_id = (int) get_option( 'page_for_posts' );

			if ( is_singular( 'post' ) && $blog_id ) {
				$crumbs[] = array( get_the_title( $blog_id ), get_permalink( $blog_id ) );
				$current  = get_the_title();
			} else {
				$current = $blog_id ? get_the_title( $blog_id ) : __( 'Блог', 'vektor-semi' );
			}
		} elseif ( is_search() ) {
			/* translators: %s — поисковый запрос. */
			$current = sprintf( __( 'Поиск: %s', 'vektor-semi' ), get_search_query() );
		} elseif ( is_404() ) {
			$current = __( 'Страница не найдена', 'vektor-semi' );
		} else {
			$current = get_the_title();
		}
	}

	?>
	<nav class="breadcrumb" aria-label="<?php esc_attr_e( 'Хлебные крошки', 'vektor-semi' ); ?>">
		<div class="container">
			<ol class="breadcrumb__list">
				<li><a class="breadcrumb__link" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Главная', 'vektor-semi' ); ?></a></li>
				<?php foreach ( $crumbs as $crumb ) : ?>
					<li aria-hidden="true">/</li>
					<li><a class="breadcrumb__link" href="<?php echo esc_url( $crumb[1] ); ?>"><?php echo esc_html( $crumb[0] ); ?></a></li>
				<?php endforeach; ?>
				<li aria-hidden="true">/</li>
				<li class="breadcrumb__current" aria-current="page"><?php echo esc_html( $current ); ?></li>
			</ol>
		</div>
	</nav>
	<?php
}

/**
 * Телефон школы. Задаётся в «Настройки → Общие» через опцию `vs_phone`;
 * пока не задан — показываем значение из макета.
 *
 * @return string
 */
function vs_phone() {
	$phone = get_option( 'vs_phone' );

	return $phone ? $phone : '8 (800) 123-45-67';
}

/**
 * Телефон в формате для href="tel:".
 *
 * @return string
 */
function vs_phone_href() {
	return 'tel:' . preg_replace( '/[^0-9+]/', '', vs_phone() );
}

/**
 * E-mail школы.
 *
 * @return string
 */
function vs_email() {
	$email = get_option( 'vs_email' );

	return $email ? $email : 'hello@tochkarosta.ru';
}

/**
 * Режим работы из макета шапки.
 *
 * @return string
 */
function vs_schedule() {
	$schedule = get_option( 'vs_schedule' );

	return $schedule ? $schedule : __( 'Ежедневно с 9:00 до 21:00', 'vektor-semi' );
}

/**
 * Поля контактов в «Настройки → Общие», чтобы телефон и почта правились
 * из админки, а не в шаблонах.
 */
function vs_register_contact_settings() {
	$fields = array(
		'vs_phone'    => __( 'Телефон школы', 'vektor-semi' ),
		'vs_email'    => __( 'E-mail школы', 'vektor-semi' ),
		'vs_schedule' => __( 'Режим работы (текст в шапке)', 'vektor-semi' ),
	);

	foreach ( $fields as $key => $label ) {
		register_setting( 'general', $key, array( 'sanitize_callback' => 'sanitize_text_field' ) );

		add_settings_field(
			$key,
			$label,
			function () use ( $key ) {
				printf(
					'<input type="text" class="regular-text" name="%1$s" id="%1$s" value="%2$s">',
					esc_attr( $key ),
					esc_attr( (string) get_option( $key, '' ) )
				);
			},
			'general',
			'default',
			array( 'label_for' => $key )
		);
	}
}
add_action( 'admin_init', 'vs_register_contact_settings' );

/**
 * Адрес страницы блога (страница, назначенная в «Настройки → Чтение»).
 *
 * @return string
 */
function vs_blog_url() {
	$blog_id = (int) get_option( 'page_for_posts' );

	return $blog_id ? (string) get_permalink( $blog_id ) : home_url( '/' );
}

/**
 * Заголовок страницы блога.
 *
 * @return string
 */
function vs_blog_title() {
	$blog_id = (int) get_option( 'page_for_posts' );

	if ( is_category() ) {
		return single_cat_title( '', false );
	}

	return $blog_id ? get_the_title( $blog_id ) : __( 'Блог', 'vektor-semi' );
}

/**
 * Адрес страницы по слагу — для ссылок из статических секций макета.
 *
 * Если страницы с таким слагом ещё нет, возвращаем главную, чтобы
 * не оставлять битую ссылку.
 *
 * @param string $slug Слаг страницы.
 * @return string
 */
function vs_page_url( $slug ) {
	$page = get_page_by_path( $slug );

	return $page ? (string) get_permalink( $page ) : home_url( '/' );
}

/**
 * Избранная статья для шапки ленты: закреплённая, иначе самая свежая.
 *
 * @return WP_Post|null
 */
function vs_featured_post() {
	$sticky = get_option( 'sticky_posts' );

	if ( ! empty( $sticky ) ) {
		$posts = get_posts(
			array(
				'post__in'            => $sticky,
				'posts_per_page'      => 1,
				'ignore_sticky_posts' => true,
			)
		);

		if ( $posts ) {
			return $posts[0];
		}
	}

	$posts = get_posts( array( 'posts_per_page' => 1 ) );

	return $posts ? $posts[0] : null;
}

/**
 * Похожие статьи — три записи из той же рубрики.
 *
 * @return WP_Post[]
 */
function vs_related_posts() {
	$category = vs_primary_category();

	$args = array(
		'posts_per_page'      => 3,
		'post__not_in'        => array( get_the_ID() ),
		'ignore_sticky_posts' => true,
	);

	if ( $category ) {
		$args['cat'] = $category->term_id;
	}

	$posts = get_posts( $args );

	// Если в рубрике не набралось трёх — добираем свежими.
	if ( count( $posts ) < 3 ) {
		$exclude = array_merge( array( get_the_ID() ), wp_list_pluck( $posts, 'ID' ) );

		$posts = array_merge(
			$posts,
			get_posts(
				array(
					'posts_per_page'      => 3 - count( $posts ),
					'post__not_in'        => $exclude,
					'ignore_sticky_posts' => true,
				)
			)
		);
	}

	return $posts;
}

/**
 * Стрелка «вперёд» для пагинации — в макете это иконка, ассет не выгружен.
 *
 * @return string
 */
function vs_pagination_next() {
	return '<span class="asset-pending" style="width:20px;height:20px" aria-hidden="true"></span>';
}

/**
 * Оглавление статьи — Figma node 37:5128.
 *
 * Строится по заголовкам h2/h3 из контента записи: в макете оглавление
 * статическое, но привязывать его к «рыбе» нельзя — редактор пишет свой текст.
 */
function vs_table_of_contents() {
	$content = (string) get_the_content();

	if ( '' === trim( $content ) ) {
		return;
	}

	if ( ! preg_match_all( '/<h([23])[^>]*>(.*?)<\/h\1>/i', apply_filters( 'the_content', $content ), $matches, PREG_SET_ORDER ) ) {
		return;
	}

	// Нужны минимум два пункта, иначе оглавление бессмысленно.
	if ( count( $matches ) < 2 ) {
		return;
	}

	?>
	<nav class="post-toc" aria-label="<?php esc_attr_e( 'Содержание статьи', 'vektor-semi' ); ?>">
		<h2 class="post-toc__title"><?php esc_html_e( 'Содержание статьи', 'vektor-semi' ); ?></h2>
		<ul class="post-toc__list">
			<?php
			$open_sub = false;

			foreach ( $matches as $index => $match ) {
				$level = (int) $match[1];
				$text  = wp_strip_all_tags( $match[2] );
				$anchor = 'section-' . ( $index + 1 );

				if ( 3 === $level && ! $open_sub ) {
					echo '<ul class="post-toc__sublist">';
					$open_sub = true;
				} elseif ( 2 === $level && $open_sub ) {
					echo '</ul></li>';
					$open_sub = false;
				}

				printf(
					'%1$s<a class="post-toc__link" href="#%2$s">%3$s</a>%4$s',
					2 === $level ? '<li>' : '<li>',
					esc_attr( $anchor ),
					esc_html( $text ),
					2 === $level && isset( $matches[ $index + 1 ] ) && 3 === (int) $matches[ $index + 1 ][1] ? '' : '</li>'
				);
			}

			if ( $open_sub ) {
				echo '</ul></li>';
			}
			?>
		</ul>
	</nav>
	<?php
}

/**
 * Проставляет id заголовкам контента, чтобы работали ссылки из оглавления.
 *
 * @param string $content Контент записи.
 * @return string
 */
function vs_add_heading_anchors( $content ) {
	if ( ! is_singular( 'post' ) || ! in_the_loop() || ! is_main_query() ) {
		return $content;
	}

	$index = 0;

	return (string) preg_replace_callback(
		'/<h([23])([^>]*)>/i',
		function ( $m ) use ( &$index ) {
			++$index;

			if ( false !== stripos( $m[2], 'id=' ) ) {
				return $m[0];
			}

			return sprintf( '<h%1$s%2$s id="section-%3$d">', $m[1], $m[2], $index );
		},
		$content
	);
}
add_filter( 'the_content', 'vs_add_heading_anchors', 9 );
