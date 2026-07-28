/* ==========================================================================
   Точка входа. Модули подключаются только если на странице есть их разметка.
   Без зависимостей и сторонних библиотек.
   ========================================================================== */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --- Мобильное меню --------------------------------------------------- */

  function initMobileMenu() {
    var burger = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-menu]');
    if (!burger || !menu) return;

    function setOpen(open) {
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  /* --- Плавная прокрутка к якорям --------------------------------------- */

  function initAnchors() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href');
      if (id.length < 2) return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* --- Появление блоков при прокрутке ----------------------------------- */

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* --- Табы (OnlineClasses и подобные) ------------------------------------ */

  function initTabs() {
    var roots = document.querySelectorAll('[data-tabs]');
    if (!roots.length) return;

    roots.forEach(function (root) {
      var tabs = Array.prototype.slice.call(
        root.querySelectorAll('[role="tab"]')
      );
      if (!tabs.length) return;

      function selectTab(tab, focus) {
        tabs.forEach(function (item) {
          var selected = item === tab;
          item.setAttribute('aria-selected', String(selected));
          item.tabIndex = selected ? 0 : -1;

          var panel = document.getElementById(
            item.getAttribute('aria-controls')
          );
          if (panel) panel.hidden = !selected;
        });
        if (focus) tab.focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
          selectTab(tab, false);
        });

        tab.addEventListener('keydown', function (event) {
          var newIndex = null;

          if (event.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
          else if (event.key === 'ArrowLeft')
            newIndex = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === 'Home') newIndex = 0;
          else if (event.key === 'End') newIndex = tabs.length - 1;

          if (newIndex !== null) {
            event.preventDefault();
            selectTab(tabs[newIndex], true);
          }
        });
      });
    });
  }

  /* --- Модальные окна ---------------------------------------------------- */

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function initModals() {
    var lastFocused = null;

    function open(modal) {
      lastFocused = document.activeElement;
      modal.hidden = false;
      document.body.classList.add('is-locked');
      requestAnimationFrame(function () {
        modal.classList.add('is-open');
      });
      var first = modal.querySelector(FOCUSABLE);
      if (first) first.focus();
    }

    function close(modal) {
      modal.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      window.setTimeout(function () {
        modal.hidden = true;
      }, reducedMotion.matches ? 0 : 250);
      if (lastFocused) lastFocused.focus();
    }

    document.addEventListener('click', function (event) {
      var opener = event.target.closest('[data-modal-open]');
      if (opener) {
        var modal = document.getElementById(
          opener.getAttribute('data-modal-open')
        );
        if (modal) {
          event.preventDefault();
          open(modal);
        }
        return;
      }

      var closer = event.target.closest('[data-modal-close]');
      if (closer) {
        var parent = closer.closest('[data-modal]');
        if (parent) close(parent);
      }
    });

    document.addEventListener('keydown', function (event) {
      var openModal = document.querySelector('[data-modal].is-open');
      if (!openModal) return;

      if (event.key === 'Escape') {
        close(openModal);
        return;
      }

      if (event.key !== 'Tab') return;

      var items = Array.prototype.slice.call(
        openModal.querySelectorAll(FOCUSABLE)
      );
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* --- Маска телефона ---------------------------------------------------- */

  function initPhoneMask() {
    var inputs = document.querySelectorAll('input[data-phone]');
    if (!inputs.length) return;

    function format(value) {
      var digits = value.replace(/\D/g, '');
      if (digits[0] === '8') digits = '7' + digits.slice(1);
      if (digits[0] !== '7') digits = '7' + digits;
      digits = digits.slice(0, 11);

      var out = '+7';
      if (digits.length > 1) out += ' (' + digits.slice(1, 4);
      if (digits.length >= 5) out += ') ' + digits.slice(4, 7);
      if (digits.length >= 8) out += '-' + digits.slice(7, 9);
      if (digits.length >= 10) out += '-' + digits.slice(9, 11);
      return out;
    }

    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        input.value = format(input.value);
      });
      input.addEventListener('focus', function () {
        if (!input.value) input.value = '+7 (';
      });
    });
  }

  /* --- Клиентская валидация форм ----------------------------------------
     Реальная отправка не подключается (п.10 ТЗ).
     ---------------------------------------------------------------------- */

  function initForms() {
    var forms = document.querySelectorAll('form[data-validate]');
    if (!forms.length) return;

    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function fieldError(field) {
      if (field.type === 'checkbox') {
        return field.required && !field.checked
          ? 'Отметьте это поле, чтобы продолжить'
          : '';
      }

      var value = field.value.trim();

      if (field.required && !value) return 'Заполните это поле';
      if (!value) return '';

      if (field.dataset.phone !== undefined) {
        return value.replace(/\D/g, '').length === 11
          ? ''
          : 'Введите номер полностью';
      }

      if (field.type === 'email') {
        return EMAIL.test(value) ? '' : 'Проверьте адрес электронной почты';
      }

      return '';
    }

    function setError(field, message) {
      var wrapper = field.closest('[data-field]') || field.parentElement;
      var box = wrapper.querySelector('[data-error]');

      field.classList.toggle('is-invalid', Boolean(message));
      field.setAttribute('aria-invalid', message ? 'true' : 'false');

      if (box) {
        box.textContent = message;
        box.hidden = !message;
      }
    }

    forms.forEach(function (form) {
      var fields = Array.prototype.slice.call(
        form.querySelectorAll('input, textarea, select')
      );

      fields.forEach(function (field) {
        field.addEventListener('blur', function () {
          setError(field, fieldError(field));
        });
        field.addEventListener('input', function () {
          if (field.classList.contains('is-invalid')) {
            setError(field, fieldError(field));
          }
        });
      });

      form.addEventListener('submit', function (event) {
        event.preventDefault();

        var firstInvalid = null;

        fields.forEach(function (field) {
          var message = fieldError(field);
          setError(field, message);
          if (message && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        var submit = form.querySelector('[type="submit"]');
        if (submit) {
          submit.disabled = true;
          submit.classList.add('is-loading');
        }

        var status = form.querySelector('[data-form-status]');
        if (status) {
          status.hidden = false;
          status.textContent = 'Данные заполнены верно. Отправка не подключена.';
        }
      });
    });
  }

  /* --- Запуск ------------------------------------------------------------ */

  function init() {
    initMobileMenu();
    initAnchors();
    initReveal();
    initTabs();
    initModals();
    initPhoneMask();
    initForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
