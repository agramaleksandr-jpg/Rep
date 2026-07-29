<?php
/**
 * Тема «Вектор семьи» — точка входа.
 *
 * Вся логика разнесена по файлам в inc/. Здесь только подключение.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

define( 'VS_VERSION', '1.0.0' );
define( 'VS_DIR', get_template_directory() );
define( 'VS_URI', get_template_directory_uri() );

require_once VS_DIR . '/inc/setup.php';
require_once VS_DIR . '/inc/enqueue.php';
require_once VS_DIR . '/inc/post-types.php';
require_once VS_DIR . '/inc/template-tags.php';
