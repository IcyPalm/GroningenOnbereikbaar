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

  const normalizeStreet = (value) => value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  const KNOWN_STREETS = [
    ['bankstel', () => ({
      status: 'Vrij',
      heropening: 'Niet van toepassing',
      omleiding: 'Geen. Dit is de groene stip.',
      advies: 'Blijf zitten. U bent er al.',
    })],
    ['kraneweg', () => ({
      status: 'Dicht voor auto, fiets en bus',
      heropening: 'Vrijdag 17:00, de stoep is al open',
      omleiding: 'Westersingel en Aweg. Fietsers via de Friesestraatweg, onder begeleiding.',
      advies: 'Lopen mag. Verkeersregelaar bij de Herman Colleniusstraat.',
    })],
    ['kielerbocht', () => ({
      status: 'Toerit dicht',
      heropening: '19 december 06:00',
      omleiding: 'Meerstad, of Gotenburgweg–Europaweg–Westerbroek',
      advies: 'Dit is geen weekend. Plan een ander seizoen.',
    })],
    ['toerit', () => ({
      status: 'Toerit dicht',
      heropening: '19 december 06:00',
      omleiding: 'Een andere toerit, die ook file is',
      advies: 'Sinterklaas rijdt ook om.',
    })],
    ['n978', () => ({
      status: 'Twee weken langer dicht dan gepland',
      heropening: '2 november 06:00, onder voorbehoud van onvoorziene situaties',
      omleiding: 'A7, N388 bij Boerakker, N980 bij Oldekerk',
      advies: '2027 is alvast meegenomen. De hinder ook.',
    })],
    ['leek', () => ({
      status: 'Twee weken langer dicht dan gepland',
      heropening: '2 november 06:00',
      omleiding: 'De A7, die daardoor ook van u is',
      advies: 'Bedankt voor uw begrip. Dat is geen reistijd.',
    })],
    ['hereweg', () => ({
      status: 'Afgesloten, fase 3 van 7',
      heropening: '2028. Juni 2026 was de vorige schatting.',
      omleiding: 'De Verlengde Hereweg, die om dezelfde reden dicht is',
      advies: 'Zet de wekker twee uur eerder. Of verhuis de afspraak.',
    })],
    ['ring', () => ({
      status: 'Deels een evenement, deels een seizoen',
      heropening: 'De nachten zijn voorbij. De toerit niet.',
      omleiding: 'Europaweg, en daarna nog een europaweg',
      advies: 'Thuisblijven telt als route.',
    })],
    ['zonnelaan', () => ({
      status: 'Deze week weer open. Volgende week vragen wij niet na.',
      heropening: 'Geweest, tot het asfalt iets anders besluit',
      omleiding: 'Bus 1, 2 en 171 kozen hun eigen weg',
      advies: 'Controleer het bord, niet deze generator.',
    })],
    ['friesestraatweg', () => ({
      status: 'Datum volgt',
      heropening: 'Onbekend, en dat is de status',
      omleiding: 'Via een straat die zelf in de wachtrij staat',
      advies: 'Zeg tegen uw afspraak dat de datum volgt. Dat is letterlijk het beleid.',
    })],
    ['station', () => ({
      status: 'Open. Cijfer: een afgeronde 8.',
      heropening: 'Het station is niet het probleem',
      omleiding: 'De laatste honderd meter, die een andere afdeling zijn',
      advies: 'Geef het perron een voldoende en de weg geen cijfer.',
    })],
    ['wunderline', () => ({
      status: 'De trein reed, toen een bus, toen weer een trein',
      heropening: 'Tot het volgende spoorbericht',
      omleiding: 'Snelbus. Fietsen mogen niet mee. Ihrhove alleen per taxibus.',
      advies: 'Vier het niet te vroeg. Dertien dagen was genoeg.',
    })],
    ['a7', () => ({
      status: 'Open, in de betekenis van: u mag erop staan',
      heropening: 'De file heropent zichzelf elke ochtend',
      omleiding: 'Er is geen omleiding. Dit is de omleiding.',
      advies: '4 km/u is een tempo, geen noodgeval. Niet voor deze weg.',
    })],
  ];

  const TEMPLATES = [
    (street) => ({
      status: 'Dicht van maandag 07:00 tot vrijdag 17:00',
      heropening: 'Daarna een evaluatie, die duurt tot de volgende maandag',
      omleiding: `Via de ${street}, de andere kant op, en dan alsnog niet`,
      advies: 'Thuisblijven',
    }),
    (street) => ({
      status: 'Afgesloten in beide richtingen',
      heropening: 'Datum volgt',
      omleiding: 'Een straat die zelf ook dicht is. De naam krijgt u op het bord.',
      advies: `Zeg dat u via de ${street} zou gaan. Dat is geen leugen, dat is een intentie.`,
    }),
    (street) => ({
      status: 'Fietsers over de stoep, auto\'s niet',
      heropening: 'Als het asfalt klaar is, of als het asfalt er genoeg van heeft',
      omleiding: 'Verkeersregelaar op de kruising. U steekt over wanneer het hesje dat zegt.',
      advies: `De ${street} is een wandeling geworden.`,
    }),
    (street) => ({
      status: 'Nachtafsluiting, 20:00 tot 06:00',
      heropening: 'Overdag open, \'s nachts een evenement',
      omleiding: 'De Europaweg. Ook als u niet naar Europa hoeft.',
      advies: `Zit u \'s nachts op de ${street}? Dat is niet de bedoeling.`,
    }),
    (street) => ({
      status: 'Twee weken langer dan gepland',
      heropening: 'Oorspronkelijk volgend jaar, nu vast meegenomen',
      omleiding: 'De A7. Onvoorziene situaties onderweg.',
      advies: 'Bedankt voor uw begrip. De provincie bedoelt het.',
    }),
    (street) => ({
      status: 'Bus in plaats van de gebruikelijke route',
      heropening: 'Aansluitingen niet gegarandeerd',
      omleiding: 'Snelbus. Fietsen blijven thuis.',
      advies: `Plan de ${street} twee keer: een keer voor vertrek en een keer als u al staat.`,
    }),
  ];

  const planForStreet = (raw) => {
    const key = normalizeStreet(raw);
    for (const [needle, build] of KNOWN_STREETS) {
      if (key.includes(needle)) return build();
    }
    let hash = 0;
    for (const char of key) hash = (hash * 33 + char.codePointAt(0)) >>> 0;
    return TEMPLATES[hash % TEMPLATES.length](raw.trim());
  };

  const showVertraging = (form) => {
    const street = form.querySelector('#straat').value.trim();
    const plan = planForStreet(street);
    const status = ensureStatus(form);
    status.replaceChildren();

    const title = document.createElement('p');
    title.className = 'form-status-title';
    title.textContent = 'Planning vastgesteld';
    status.append(title);

    [
      ['Straat', street],
      ['Status', plan.status],
      ['Heropening', plan.heropening],
      ['Omleiding', plan.omleiding],
      ['Advies', plan.advies],
    ].forEach(([label, value]) => {
      const line = document.createElement('p');
      const name = document.createElement('strong');
      name.textContent = label;
      line.append(name, document.createTextNode(': ' + value));
      status.append(line);
    });
  };

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.id === 'vertragings-form') {
        showVertraging(form);
        return;
      }
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

  // ---- Excuusbrief: kies een variant, kopieer of print de zichtbare ----
  const copyBtn = document.getElementById('copy-letter');
  const printBtn = document.getElementById('print-letter');
  const copyStatus = document.getElementById('copy-status');
  const letterTabs = document.querySelectorAll('[data-letter]');
  const visibleLetter = () => document.querySelector('.excuusbrief-preview:not([hidden])');

  letterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.letter;
      letterTabs.forEach(other => {
        other.setAttribute('aria-selected', other === tab ? 'true' : 'false');
      });
      document.querySelectorAll('[data-panel]').forEach(panel => {
        panel.hidden = panel.dataset.panel !== id;
      });
      if (copyStatus) copyStatus.textContent = '';
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const letter = visibleLetter();
      if (!letter || !copyStatus) return;
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
