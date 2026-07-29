<?php
/**
 * Типы записей и таксономии.
 *
 * Курс — единственная сущность из макета, которой нужен свой тип записи:
 * в макете есть и архив (`35:1225`), и одиночная страница (`36:2139`).
 * Статьи блога — штатные записи WordPress.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

/**
 * Тип записи «Курс».
 */
function vs_register_course() {
	$labels = array(
		'name'               => __( 'Курсы', 'vektor-semi' ),
		'singular_name'      => __( 'Курс', 'vektor-semi' ),
		'add_new'            => __( 'Добавить курс', 'vektor-semi' ),
		'add_new_item'       => __( 'Добавить курс', 'vektor-semi' ),
		'edit_item'          => __( 'Редактировать курс', 'vektor-semi' ),
		'new_item'           => __( 'Новый курс', 'vektor-semi' ),
		'view_item'          => __( 'Смотреть курс', 'vektor-semi' ),
		'search_items'       => __( 'Искать курсы', 'vektor-semi' ),
		'not_found'          => __( 'Курсы не найдены', 'vektor-semi' ),
		'not_found_in_trash' => __( 'В корзине курсов нет', 'vektor-semi' ),
		'all_items'          => __( 'Все курсы', 'vektor-semi' ),
		'menu_name'          => __( 'Курсы', 'vektor-semi' ),
	);

	register_post_type(
		'vs_course',
		array(
			'labels'        => $labels,
			'public'        => true,
			'has_archive'   => 'courses',
			'rewrite'       => array( 'slug' => 'courses', 'with_front' => false ),
			'menu_icon'     => 'dashicons-welcome-learn-more',
			'menu_position' => 20,
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ),
			'show_in_rest'  => true,
		)
	);
}
add_action( 'init', 'vs_register_course' );

/**
 * Таксономия «Ступень» — в макете фильтр архива по классам (1-4, 5-9, 10-11).
 */
function vs_register_course_group() {
	register_taxonomy(
		'vs_course_group',
		'vs_course',
		array(
			'labels'            => array(
				'name'          => __( 'Ступени', 'vektor-semi' ),
				'singular_name' => __( 'Ступень', 'vektor-semi' ),
				'menu_name'     => __( 'Ступени', 'vektor-semi' ),
			),
			'public'            => true,
			'hierarchical'      => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'courses/group' ),
		)
	);
}
add_action( 'init', 'vs_register_course_group' );

/**
 * Метаполя карточки курса.
 *
 * В макете на карточке есть длительность и куратор, а на странице курса —
 * возраст, формат, старт и цена. Заводим ровно эти поля, ничего сверх макета.
 */
function vs_register_course_meta() {
	$fields = array(
		'vs_course_age'      => __( 'Возраст', 'vektor-semi' ),
		'vs_course_format'   => __( 'Формат', 'vektor-semi' ),
		'vs_course_start'    => __( 'Старт', 'vektor-semi' ),
		'vs_course_duration' => __( 'Длительность', 'vektor-semi' ),
		'vs_course_curator'  => __( 'Куратор', 'vektor-semi' ),
		'vs_course_price'    => __( 'Стоимость', 'vektor-semi' ),
	);

	foreach ( $fields as $key => $label ) {
		register_post_meta(
			'vs_course',
			$key,
			array(
				'type'              => 'string',
				'description'       => $label,
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
add_action( 'init', 'vs_register_course_meta' );

/**
 * Метабокс для полей курса (классическая тема — без блочного редактора полей).
 */
function vs_course_metabox() {
	add_meta_box(
		'vs_course_facts',
		__( 'Факты о курсе (из макета)', 'vektor-semi' ),
		'vs_course_metabox_render',
		'vs_course',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'vs_course_metabox' );

/**
 * Разметка метабокса.
 *
 * @param WP_Post $post Текущая запись.
 */
function vs_course_metabox_render( $post ) {
	wp_nonce_field( 'vs_course_facts_save', 'vs_course_facts_nonce' );

	$fields = array(
		'vs_course_age'      => __( 'Возраст (например: 11–14 лет)', 'vektor-semi' ),
		'vs_course_format'   => __( 'Формат (например: Онлайн-уроки)', 'vektor-semi' ),
		'vs_course_start'    => __( 'Старт (например: В любой день)', 'vektor-semi' ),
		'vs_course_duration' => __( 'Длительность (например: 9 месяцев)', 'vektor-semi' ),
		'vs_course_curator'  => __( 'Куратор', 'vektor-semi' ),
		'vs_course_price'    => __( 'Стоимость', 'vektor-semi' ),
	);

	echo '<table class="form-table"><tbody>';

	foreach ( $fields as $key => $label ) {
		printf(
			'<tr><th scope="row"><label for="%1$s">%2$s</label></th><td><input type="text" class="regular-text" id="%1$s" name="%1$s" value="%3$s"></td></tr>',
			esc_attr( $key ),
			esc_html( $label ),
			esc_attr( (string) get_post_meta( $post->ID, $key, true ) )
		);
	}

	echo '</tbody></table>';
}

/**
 * Сохранение метабокса.
 *
 * @param int $post_id ID записи.
 */
function vs_course_metabox_save( $post_id ) {
	if ( ! isset( $_POST['vs_course_facts_nonce'] ) ) {
		return;
	}

	if ( ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['vs_course_facts_nonce'] ) ), 'vs_course_facts_save' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$keys = array( 'vs_course_age', 'vs_course_format', 'vs_course_start', 'vs_course_duration', 'vs_course_curator', 'vs_course_price' );

	foreach ( $keys as $key ) {
		if ( ! isset( $_POST[ $key ] ) ) {
			continue;
		}

		$value = sanitize_text_field( wp_unslash( $_POST[ $key ] ) );

		if ( '' === $value ) {
			delete_post_meta( $post_id, $key );
		} else {
			update_post_meta( $post_id, $key, $value );
		}
	}
}
add_action( 'save_post_vs_course', 'vs_course_metabox_save' );

/**
 * В архиве курсов показываем все курсы одной страницей — как в макете
 * (6 карточек без пагинации).
 *
 * @param WP_Query $query Основной запрос.
 */
function vs_courses_archive_query( $query ) {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}

	if ( $query->is_post_type_archive( 'vs_course' ) || $query->is_tax( 'vs_course_group' ) ) {
		$query->set( 'posts_per_page', -1 );
		$query->set( 'orderby', 'menu_order title' );
		$query->set( 'order', 'ASC' );
	}
}
add_action( 'pre_get_posts', 'vs_courses_archive_query' );
