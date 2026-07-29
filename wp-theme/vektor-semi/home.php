<?php
/**
 * Лента блога — Figma node 36:4408.
 *
 * Поиск и фильтр рубрик в макете без показанного состояния выдачи —
 * рубрики сделаны обычными ссылками на архивы, поиск отдаёт запрос в WP
 * (блокер 5.28).
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

vs_breadcrumbs();
?>
<!-- ============== Заголовок и поиск (Figma 36:4490) ================= -->
<section class="blog-hero">
  <div class="container">
    <h1 class="blog-hero__title"><?php echo esc_html( vs_blog_title() ); ?></h1>
    <p class="blog-hero__text">Разбираем дистанционное обучение, аттестацию, мотивацию, экзамены и переход в онлайн-школу простым языком.</p>

    <!-- Поиск визуальный: поведение выдачи в макете не спроектировано -->
    <form class="blog-hero__search" role="search" onsubmit="return false">
      <label class="visually-hidden" for="blog-search">Найти статью</label>
      <!-- Требуется экспорт из Figma: node 36:4500, 20×20 -->
      <span class="asset-pending blog-hero__search-icon" aria-hidden="true"></span>
      <input class="blog-hero__search-input" type="search" id="blog-search" name="q" placeholder="Найти статью (например, аттестация)">
    </form>

    <div class="blog-hero__hints">
      <span class="blog-hero__hints-label">Часто ищут:</span>
      <button class="blog-hero__hint" type="button">аттестация</button>
      <button class="blog-hero__hint" type="button">ОГЭ</button>
      <button class="blog-hero__hint" type="button">режим дня</button>
    </div>
  </div>
</section>

<!-- ================ Рубрики (Figma 36:4522) ========================= -->
<nav class="blog-filters" aria-label="Рубрики блога">
  <div class="container">
    <ul class="blog-filters__list">
      <li>
        <a class="blog-filters__item<?php echo is_category() ? '' : ' blog-filters__item--active'; ?>" href="<?php echo esc_url( vs_blog_url() ); ?>"><?php esc_html_e( 'Все', 'vektor-semi' ); ?></a>
      </li>
      <?php
      foreach ( get_categories( array( 'hide_empty' => true ) ) as $vs_cat ) :
          $vs_active = is_category( $vs_cat->term_id ) ? ' blog-filters__item--active' : '';
          ?>
          <li>
            <a class="blog-filters__item<?php echo esc_attr( $vs_active ); ?>" href="<?php echo esc_url( get_category_link( $vs_cat ) ); ?>"><?php echo esc_html( $vs_cat->name ); ?></a>
          </li>
          <?php
      endforeach;
      ?>
    </ul>
  </div>
</nav>

<!-- ================== Лента статей (Figma 36:4549) ================== -->
<section class="blog-feed">
  <div class="container">

    <?php
    // Избранная статья: закреплённая, иначе самая свежая (36:4553).
    $vs_featured = vs_featured_post();

    if ( $vs_featured ) :
        $vs_cat = vs_primary_category( $vs_featured );
        ?>
        <article class="blog-featured">
          <div class="blog-featured__media">
            <?php
            if ( has_post_thumbnail( $vs_featured ) ) {
                echo get_the_post_thumbnail( $vs_featured, 'vs-featured', array( 'loading' => 'lazy' ) );
            } else {
                vs_asset_pending( 64, 64 );
            }
            ?>
          </div>

          <div class="blog-featured__body">
            <div class="blog-featured__meta">
              <?php if ( $vs_cat ) : ?>
                <span class="blog-featured__category"><?php echo esc_html( $vs_cat->name ); ?></span>
              <?php endif; ?>
              <span class="blog-featured__time">
                <?php vs_asset_pending( 16, 16 ); ?>
                <?php
                /* translators: %d — время чтения в минутах. */
                printf( esc_html__( '%d мин', 'vektor-semi' ), (int) vs_reading_time( $vs_featured ) );
                ?>
              </span>
              <span class="blog-featured__date"><?php echo esc_html( get_the_date( '', $vs_featured ) ); ?></span>
            </div>

            <h2 class="blog-featured__title">
              <a href="<?php echo esc_url( get_permalink( $vs_featured ) ); ?>"><?php echo esc_html( get_the_title( $vs_featured ) ); ?></a>
            </h2>
            <p class="blog-featured__text"><?php echo esc_html( wp_trim_words( get_the_excerpt( $vs_featured ), 24 ) ); ?></p>

            <a class="btn btn--primary btn--rect blog-featured__button" href="<?php echo esc_url( get_permalink( $vs_featured ) ); ?>"><?php esc_html_e( 'Читать статью', 'vektor-semi' ); ?></a>
          </div>
        </article>
        <?php
    endif;
    ?>

    <div class="blog-feed__layout">

      <div class="blog-feed__main">
        <h2 class="blog-feed__heading">Последние материалы</h2>

        <div class="blog-feed__grid">
          <?php
          if ( have_posts() ) :
              while ( have_posts() ) :
                  the_post();
                  get_template_part( 'template-parts/blocks/post-card' );
              endwhile;
          else :
              ?>
              <p class="blog-card__text"><?php esc_html_e( 'Записей пока нет.', 'vektor-semi' ); ?></p>
              <?php
          endif;
          ?>
        </div>

        <?php
        // Пагинация (36:4082). Компонент в макете набран Montserrat —
        // оставлен проектный Inter, см. блокер 5.27.
        the_posts_pagination(
            array(
                'mid_size'           => 2,
                'prev_text'          => '',
                'next_text'          => vs_pagination_next(),
                'screen_reader_text' => __( 'Страницы блога', 'vektor-semi' ),
                'class'              => 'blog-pagination',
            )
        );
        ?>
      </div>

      <aside class="blog-feed__aside">
        <?php if ( is_active_sidebar( 'blog-aside' ) ) : ?>
          <?php dynamic_sidebar( 'blog-aside' ); ?>
        <?php else : ?>
          <?php get_template_part( 'template-parts/blocks/subscribe' ); ?>
        <?php endif; ?>
      </aside>

    </div>
  </div>
</section>

<?php
get_footer();
