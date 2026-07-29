<?php
/**
 * Обычная страница без назначенного шаблона.
 *
 * Страницы из макета («Аттестация», «О школе», «Для родителей», «Контакты»)
 * имеют собственные шаблоны в page-templates/. Этот файл — для остальных
 * страниц, которые заведёт заказчик: выводит контент в типографике статьи.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();

	vs_breadcrumbs( get_the_title() );
	?>

	<div class="post-header">
		<div class="container">
			<h1 class="post-header__title"><?php the_title(); ?></h1>
		</div>
	</div>

	<div class="post-body">
		<div class="container">
			<?php
			the_content();

			wp_link_pages(
				array(
					'before' => '<nav class="blog-pagination">',
					'after'  => '</nav>',
				)
			);
			?>
		</div>
	</div>

	<?php
endwhile;

get_footer();
