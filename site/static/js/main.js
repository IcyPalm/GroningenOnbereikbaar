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
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelector('.hamburger-opening-text').style.display = '';
        hamburger.querySelector('.hamburger-closing-text').style.display = 'none';
      }
    });
  }

  // ---- Mobile dropdown toggles ----
  const hasDropdowns = document.querySelectorAll('.menu.horizontal .has-dropdown');
  hasDropdowns.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('dropdown-open');
        }
      });
    }
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
  const showStatus = (form, message) => {
    let status = form.nextElementSibling;
    if (!status || !status.classList.contains('form-status')) {
      status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      form.insertAdjacentElement('afterend', status);
    }
    status.textContent = message;
  };

  const NEWSLETTER_MESSAGE = 'U bent aangemeld voor meer ellende. Wij sturen u wekelijks updates over nieuwe wegafsluitingen. Bedankt voor uw lijdzaamheid.';
  const TRAVEL_MESSAGE = 'Routeberekening voltooid. Geschatte reistijd: 2x zo lang als normaal. Aanbevolen actie: thuisblijven. Een fijne dag verder.';

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      let message = form.dataset.success;
      if (!message && form.classList.contains('newsletter-form')) message = NEWSLETTER_MESSAGE;
      if (!message && form.classList.contains('travel-form')) message = TRAVEL_MESSAGE;
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
    document.querySelectorAll('.dropdown-open').forEach(item => item.classList.remove('dropdown-open'));
    if (menu && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      if (hamburger) { hamburger.setAttribute('aria-expanded', 'false'); hamburger.focus(); }
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
