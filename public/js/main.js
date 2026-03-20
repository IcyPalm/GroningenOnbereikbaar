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

  // ---- Newsletter form (mock) ----
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const val = input ? input.value.trim() : '';
      if (val) {
        alert('U bent aangemeld voor meer ellende. Wij sturen u wekelijks updates over nieuwe wegafsluitingen. Bedankt voor uw lijdzaamheid.');
        if (input) input.value = '';
      }
    });
  }

  // ---- Travel planner form (mock) ----
  const travelForm = document.querySelector('.travel-form');
  if (travelForm) {
    travelForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Routeberekening voltooid.\n\nGeschat reistijd: 2x zo lang als normaal.\nAanbevolen actie: thuisblijven.\n\nEen fijne dag verder.');
    });
  }

  // ---- Logo shrink on scroll ----
  // Adds `body.is-scrolled` which shrinks the fixed logo and adjusts header padding
  const SCROLL_THRESHOLD = 60;
  const onScroll = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page loads mid-scroll

})();
