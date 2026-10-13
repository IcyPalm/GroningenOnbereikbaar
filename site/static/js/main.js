/* ============================================================
   Groningen ONbereikbaar — main.js
   ============================================================ */

(function () {
  'use strict';

  // ---- Hero tabs ----
  const tabBtns = document.querySelectorAll('.hero-tab-btn');
  const tabPanels = document.querySelectorAll('.hero-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // ---- Mobile hamburger ----
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu.horizontal');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.querySelector('.hamburger-opening-text').style.display = isOpen ? 'none' : '';
      hamburger.querySelector('.hamburger-closing-text').style.display = isOpen ? 'block' : 'none';
      if (!isOpen) closeDropdowns();
    });

    const closeMenu = () => {
      menu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('.hamburger-opening-text').style.display = '';
      hamburger.querySelector('.hamburger-closing-text').style.display = 'none';
      closeDropdowns();
    };

    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) closeMenu();
    });
  }

  // ---- Mobile dropdown toggles (chevron only; the label stays a link) ----
  const closeDropdowns = () => {
    document.querySelectorAll('.has-dropdown.dropdown-open').forEach(item => {
      item.classList.remove('dropdown-open');
      const toggle = item.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  };

  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.has-dropdown');
      const willOpen = !item.classList.contains('dropdown-open');
      closeDropdowns();
      if (willOpen) {
        item.classList.add('dropdown-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Cards slider buttons ----
  const sliderPrev = document.querySelector('.slider-btn-prev');
  const sliderNext = document.querySelector('.slider-btn-next');
  const track = document.querySelector('.cards-track');

  if (sliderPrev && sliderNext && track) {
    const scrollAmount = 300;
    sliderPrev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    sliderNext.addEventListener('click', () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  }

  // ---- Mock forms: show an inline confirmation instead of submitting ----
  const ensureStatus = (form) => {
    let status = form.nextElementSibling;
    if (!status || !status.classList.contains('form-status')) {
      status = document.createElement('div');
      status.className = 'form-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      form.insertAdjacentElement('afterend', status);
    }
    return status;
  };

  const showStatus = (form, message) => {
    ensureStatus(form).textContent = message;
  };

  const showPlannerStatus = (form) => {
    const from = form.querySelector('#from').value.trim();
    const to = form.querySelector('#to').value.trim();
    const time = form.querySelector('#time').value;
    const status = ensureStatus(form);
    status.replaceChildren();

    const title = document.createElement('p');
    title.className = 'form-status-title';
    title.textContent = 'Routeberekening voltooid';
    status.append(title);

    [
      ['Van', from],
      ['Naar', to],
      ['Vertrek', time],
      ['Reistijd', 'Twee keer zo lang als normaal'],
      ['Advies', 'Thuisblijven'],
    ].forEach(([label, value]) => {
      const line = document.createElement('p');
      const name = document.createElement('strong');
      name.textContent = label;
      line.append(name, document.createTextNode(': ' + value));
      status.append(line);
    });
  };

  const NEWSLETTER_MESSAGE = 'U bent aangemeld voor meer ellende. Wij sturen u wekelijks updates over nieuwe wegafsluitingen. Bedankt voor uw lijdzaamheid.';

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.querySelector('#from') && form.querySelector('#to')) {
        showPlannerStatus(form);
        return;
      }
      let message = form.dataset.success;
      if (!message && form.classList.contains('newsletter-form')) message = NEWSLETTER_MESSAGE;
      if (!message) return;
      showStatus(form, message);
      form.reset();
    });
  });

  // ---- Excuusbrief: copy / print ----
  const copyBtn = document.getElementById('copy-letter');
  const printBtn = document.getElementById('print-letter');
  const letter = document.querySelector('.excuusbrief-preview');
  const copyStatus = document.getElementById('copy-status');
  if (copyBtn && letter) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(letter.innerText.trim());
        copyStatus.textContent = 'De brief staat op uw klembord. Vul de [haakjes] in en lever hem in.';
      } catch (err) {
        copyStatus.textContent = 'Kopiëren is niet gelukt. Selecteer de tekst handmatig, net als de omleiding.';
      }
    });
  }
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  // ---- Escape closes open menus ----
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeDropdowns();
    if (menu && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelector('.hamburger-opening-text').style.display = '';
        hamburger.querySelector('.hamburger-closing-text').style.display = 'none';
        hamburger.focus();
      }
    }
    if (document.activeElement && document.activeElement.closest('.has-dropdown')) document.activeElement.blur();
  });

  // ---- Logo shrink on scroll ----
  // Adds `body.is-scrolled` which shrinks the fixed logo and adjusts header padding
  const SCROLL_THRESHOLD = 60;
  const onScroll = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page loads mid-scroll

})();
