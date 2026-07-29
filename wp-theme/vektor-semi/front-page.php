<?php
/**
 * Главная страница — Figma node 1:7 (Main Content).
 *
 * Секции вынесены в template-parts/sections/, порядок соответствует макету.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

get_template_part( 'template-parts/sections/hero' );
get_template_part( 'template-parts/sections/benefits' );
get_template_part( 'template-parts/sections/online-classes' );
get_template_part( 'template-parts/sections/timeline-format' );
get_template_part( 'template-parts/sections/attestation-exam' );
get_template_part( 'template-parts/sections/parents-teachers' );
get_template_part( 'template-parts/sections/results-faq' );

get_footer();
