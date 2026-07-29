<?php
/**
 * Модалка консультации — Figma node 7:1254 (затемнение 7:1253).
 *
 * Форма только интерфейсная: по ТЗ реальную отправку на почту и в CRM
 * не подключаем ни в статике, ни в теме. Валидация — клиентская, в main.js.
 *
 * @package vektor-semi
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="modal" id="consultation" data-modal hidden>
	<div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
		<button class="modal__close" type="button" data-modal-close aria-label="<?php esc_attr_e( 'Закрыть', 'vektor-semi' ); ?>">
			<?php vs_asset_pending( 16, 16 ); ?>
		</button>

		<div class="modal__header">
			<h2 class="modal__title" id="consultation-title"><?php esc_html_e( 'Записаться на консультацию', 'vektor-semi' ); ?></h2>
			<p class="modal__subtitle"><?php esc_html_e( 'Оставьте свои данные, и мы поможем подобрать подходящую программу для вашего ребенка', 'vektor-semi' ); ?></p>
		</div>

		<form class="modal__form" data-validate novalidate>
			<div class="modal__field" data-field>
				<label class="modal__label" for="consultation-name"><?php esc_html_e( 'Как к вам обращаться?', 'vektor-semi' ); ?></label>
				<input class="modal__input" type="text" id="consultation-name" name="name" placeholder="<?php esc_attr_e( 'Ваше имя', 'vektor-semi' ); ?>" required>
				<span class="modal__error" data-error hidden></span>
			</div>

			<div class="modal__field" data-field>
				<label class="modal__label" for="consultation-phone"><?php esc_html_e( 'Номер телефона', 'vektor-semi' ); ?></label>
				<input class="modal__input" type="tel" id="consultation-phone" name="phone" placeholder="+7 (999) 000-00-00" data-phone required>
				<span class="modal__error" data-error hidden></span>
			</div>

			<div class="modal__field" data-field>
				<label class="modal__label" for="consultation-grade"><?php esc_html_e( 'В какой класс пойдет ребенок?', 'vektor-semi' ); ?></label>
				<span class="modal__select-wrap">
					<select class="modal__select" id="consultation-grade" name="grade" required>
						<option value="" selected disabled hidden><?php esc_html_e( 'Выберите класс', 'vektor-semi' ); ?></option>
						<?php for ( $grade = 1; $grade <= 11; $grade++ ) : ?>
							<option value="<?php echo esc_attr( (string) $grade ); ?>">
								<?php
								/* translators: %d — номер класса. */
								printf( esc_html__( '%d класс', 'vektor-semi' ), (int) $grade );
								?>
							</option>
						<?php endfor; ?>
					</select>
					<span class="asset-pending modal__select-icon" aria-hidden="true"></span>
				</span>
				<span class="modal__error" data-error hidden></span>
			</div>

			<div class="modal__field" data-field>
				<label class="modal__consent">
					<input type="checkbox" name="consent" required>
					<span class="modal__consent-text">
						<?php
						$privacy = get_privacy_policy_url();
						printf(
							wp_kses(
								/* translators: 1, 2 — ссылки на документы. */
								__( 'Нажимая на кнопку, вы соглашаетесь с <a href="%1$s">политикой конфиденциальности</a> и <a href="%2$s">обработкой персональных данных</a>', 'vektor-semi' ),
								array( 'a' => array( 'href' => array() ) )
							),
							esc_url( $privacy ? $privacy : '#' ),
							esc_url( $privacy ? $privacy : '#' )
						);
						?>
					</span>
				</label>
				<span class="modal__error" data-error hidden></span>
			</div>

			<button class="btn btn--primary modal__submit" type="submit"><?php esc_html_e( 'Оставить заявку', 'vektor-semi' ); ?></button>
			<p class="modal__status" data-form-status hidden></p>
		</form>
	</div>
</div>
