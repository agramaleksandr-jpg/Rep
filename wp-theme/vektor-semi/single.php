<?php
/**
 * Статья блога — Figma node 37:4999.
 *
 * Тело статьи выводится через the_content(): в макете раздел «Демонстрация
 * всех форматов вёрстки» — образец типографики для редактора, поэтому его
 * стили живут в components/blog-post.css и применяются к контенту
 * автоматически (блокер 5.29).
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();

	vs_breadcrumbs();
	?>
<article>

  <!-- ================ Шапка статьи (Figma 37:5063) ================== -->
  <div class="post-header">
    <div class="container">
      <?php $vs_cat = vs_primary_category(); ?>
      <div class="post-header__badges">
        <?php if ( $vs_cat ) : ?>
          <a class="post-badge post-badge--category" href="<?php echo esc_url( get_category_link( $vs_cat ) ); ?>"><?php echo esc_html( $vs_cat->name ); ?></a>
        <?php endif; ?>
        <?php
        // Вторая метка в макете — тип материала. Берём первую метку записи.
        $vs_tags = get_the_tags();

        if ( $vs_tags ) :
            ?>
            <span class="post-badge post-badge--type">
              <?php vs_asset_pending( 12, 12 ); ?>
              <?php echo esc_html( $vs_tags[0]->name ); ?>
            </span>
            <?php
        endif;
        ?>
      </div>

      <h1 class="post-header__title"><?php the_title(); ?></h1>
      <?php if ( has_excerpt() ) : ?>
        <p class="post-header__lead"><?php echo esc_html( get_the_excerpt() ); ?></p>
      <?php endif; ?>

      <div class="post-header__meta">
        <span>
          <?php vs_asset_pending( 16, 16 ); ?>
          <time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
        </span>
        <span>
          <?php vs_asset_pending( 16, 16 ); ?>
          <?php
          /* translators: %d — время чтения в минутах. */
          printf( esc_html__( '%d минут чтения', 'vektor-semi' ), (int) vs_reading_time() );
          ?>
        </span>
        <span>
          <?php vs_asset_pending( 16, 16 ); ?>
          <?php echo esc_html( get_the_author() ); ?>
        </span>
      </div>

      <!-- Адреса шеринга в макете не заданы — блокер 5.30 -->
      <div class="post-share">
        <a class="post-share__btn post-share__btn--telegram" href="#">Telegram</a>
        <a class="post-share__btn post-share__btn--vk" href="#">ВКонтакте</a>
        <a class="post-share__btn post-share__btn--whatsapp" href="#">WhatsApp</a>
        <button class="post-share__btn post-share__btn--copy" type="button">
          <span class="asset-pending" aria-hidden="true"></span>
          Скопировать
        </button>
      </div>

      <?php if ( has_post_thumbnail() ) : ?>
        <figure class="post-header__figure">
          <div class="post-header__figure-media">
            <?php the_post_thumbnail( 'vs-hero' ); ?>
          </div>
          <?php if ( wp_get_attachment_caption( get_post_thumbnail_id() ) ) : ?>
            <figcaption class="post-header__figure-caption"><?php echo esc_html( wp_get_attachment_caption( get_post_thumbnail_id() ) ); ?></figcaption>
          <?php endif; ?>
        </figure>
      <?php endif; ?>
    </div>

    <div class="container">
      <?php vs_table_of_contents(); ?>
    </div>
  </div>

  <!-- ================= Тело статьи (Figma 37:5124) ================== -->
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

  <!-- ============= Поделиться статьёй (Figma 37:5408) =============== -->
  <div class="post-share-section">
    <div class="container">
      <h2 class="post-share-section__title">Поделиться статьёй:</h2>
      <div class="post-share">
        <a class="post-share__btn post-share__btn--telegram" href="#">Telegram</a>
        <a class="post-share__btn post-share__btn--vk" href="#">ВКонтакте</a>
        <a class="post-share__btn post-share__btn--whatsapp" href="#">WhatsApp</a>
        <button class="post-share__btn post-share__btn--copy" type="button">
          <span class="asset-pending" aria-hidden="true"></span>
          Скопировать
        </button>
      </div>
    </div>
  </div>

</article>

<!-- ============== Похожие статьи (Figma 37:5439) ==================== -->
<section class="post-related">
  <div class="container">
    <h2 class="post-related__title">Похожие статьи</h2>

    <div class="post-related__grid">
      <?php
      foreach ( vs_related_posts() as $vs_related ) :
          $GLOBALS['post'] = $vs_related; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
          setup_postdata( $vs_related );
          get_template_part( 'template-parts/blocks/post-card' );
      endforeach;

      wp_reset_postdata();
      ?>
    </div>
  </div>
</section>

<!-- ================ Финальный CTA (Figma 37:5497) =================== -->
<section class="post-cta">
  <div class="container">
    <h2 class="post-cta__title">Разберём вашу ситуацию и подскажем спокойный формат</h2>
    <p class="post-cta__text">Расскажите, в каком классе ребёнок и что сейчас беспокоит. Мы поможем понять, подойдёт ли дистанционное обучение и с чего начать.</p>

    <div class="post-cta__card">
      <form data-validate novalidate>
        <div class="post-cta__field" data-field>
          <label class="post-cta__label" for="post-cta-name">Имя родителя</label>
          <input class="post-cta__input" type="text" id="post-cta-name" name="name" placeholder="Анна" required>
          <span class="post-cta__error" data-error hidden></span>
        </div>

        <div class="post-cta__field" data-field>
          <label class="post-cta__label" for="post-cta-phone">Телефон</label>
          <input class="post-cta__input" type="tel" id="post-cta-phone" name="phone" placeholder="+7 (999) 000-00-00" data-phone required>
          <span class="post-cta__error" data-error hidden></span>
        </div>

        <button class="post-cta__submit" type="submit">Получить консультацию</button>
        <p class="post-cta__note">Нажимая на кнопку, вы даёте согласие на обработку персональных данных.</p>
        <p class="modal__status" data-form-status hidden></p>
      </form>
    </div>
  </div>
</section>

<?php
endwhile;

get_footer();
