/* ============================================================
   Fun Stuffs — hub behaviour
   The catalog lives here: it feeds the grid, the filters and the
   rotating line in the headline, so there is one list to edit.
   `phrase` completes the sentence "This one ___."
   ============================================================ */
(function () {
  'use strict';

  var PROJECTS = [
    {
      slug: 'goose_combat',
      title: 'The Goose Combat Simulator',
      desc: 'Estimates how many angry geese you could fight off, armed with one object from your desk.',
      phrase: "counts the geese you'd beat",
      cat: 'Generators',
      tint: '#f97316',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-1.5 0-4 1-4 4s2 4 4 5c2 1 5 .5 5-2s-2-3-4-3m-1 8v4m-3-1h6"/>'
    },
    {
      slug: 'curse_generator',
      title: 'Department of Minor Misfortune',
      desc: 'File a small, non-lethal curse against whoever irritated you. Processed instantly, without oversight.',
      phrase: 'files a very small curse',
      cat: 'Generators',
      tint: '#d9472f',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>'
    },
    {
      slug: 'useless_talent_agency',
      title: 'Oddly Specific Talent Roster',
      desc: 'A full professional profile built from skills no production has ever needed.',
      phrase: 'represents unhireable talent',
      cat: 'Generators',
      tint: '#a03bab',
      stroke: false,
      icon: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5V13.2a3.26 3.26 0 0 0-3.26-3.26c-1.1 0-2.02.58-2.5 1.45V10.2h-2.9v8.3h2.9v-4.72c0-.46.18-.9.58-1.2s.93-.45 1.34-.45c.75 0 1.29.54 1.29 1.33v5.04h2.95M7.14 18.5v-8.3H4.2v8.3h2.94M5.67 5.92A1.66 1.66 0 0 0 4 7.58a1.66 1.66 0 0 0 1.67 1.66A1.66 1.66 0 0 0 7.33 7.58A1.66 1.66 0 0 0 5.67 5.92z"/>'
    },
    {
      slug: 'flaky_friend',
      title: 'Cancellation Studio',
      desc: 'Writes a last-minute excuse with exactly enough detail to sound emotionally expensive.',
      phrase: "writes tonight's excuse",
      cat: 'Generators',
      tint: '#6246ea',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>'
    },
    {
      slug: 'password_checker',
      title: 'Credential Judgment Unit',
      desc: 'Type a password, get an estimated crack time and a considerable amount of unsolicited judgment.',
      phrase: 'judges your password',
      cat: 'Generators',
      tint: '#3d6b4a',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>'
    },
    {
      slug: 'reply_all_panic',
      title: 'Reply-All Incident Console',
      desc: 'The message went to everyone. Chase the unsend button while the notifications arrive.',
      phrase: 'makes you unsend a reply-all',
      cat: 'Simulations',
      tint: '#d92d20',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>'
    },
    {
      slug: 'break_in_simulator',
      title: 'Operation: Spare Key',
      desc: 'Plan a full infiltration of a high-security, zero-value target, such as the DMV after hours.',
      phrase: 'plans a pointless heist',
      cat: 'Simulations',
      tint: '#355b46',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247"/>'
    },
    {
      slug: 'captcha_hell',
      title: 'Human Verification Terminal',
      desc: 'A short, reasonable verification check. It selects for squares containing feelings.',
      phrase: 'doubts that you are human',
      cat: 'Simulations',
      tint: '#008f86',
      stroke: true,
      icon: '<rect height="7" rx="1" width="7" x="3" y="3"/><rect height="7" rx="1" width="7" x="14" y="3"/><rect height="7" rx="1" width="7" x="14" y="14"/><rect height="7" rx="1" width="7" x="3" y="14"/>'
    },
    {
      slug: 'inconvenience_store',
      title: 'OPEN 24/7-ish',
      desc: 'A corner shop stocked entirely with products engineered to ruin your day in small ways.',
      phrase: "sells products you'll regret",
      cat: 'Simulations',
      tint: '#e8392f',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72"/>'
    },
    {
      slug: 'window_shopper',
      title: 'The Impossible Lots',
      desc: 'Browse objects that cannot be owned and buy them with a card that has no limit.',
      phrase: 'auctions impossible objects',
      cat: 'Simulations',
      tint: '#9b2c20',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>'
    },
    {
      slug: 'cookie_trap',
      title: 'Cookie Consent Trap',
      desc: 'A consent banner from 9,432 partners that has no intention of accepting your answer.',
      phrase: "won't take no for an answer",
      cat: 'Simulations',
      tint: '#d97706',
      stroke: false,
      icon: '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.5-9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM12 16a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>'
    },
    {
      slug: 'decoy_update',
      title: 'Enterprise Maintenance Console',
      desc: 'A convincing system update that makes your screen look responsibly unavailable.',
      phrase: 'fakes a system update',
      cat: 'Fake tools',
      tint: '#2d73d5',
      stroke: false,
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>'
    },
    {
      slug: 'passive_notepad',
      title: 'Helpful Editor',
      desc: 'A notepad whose writing assistant quietly improves your punctuation, pacing and character.',
      phrase: 'rewrites what you type',
      cat: 'Fake tools',
      tint: '#2458ff',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>'
    },
    {
      slug: 'is_it_level',
      title: 'Is It Level?',
      desc: 'One crooked painting on a silent gallery wall. Straighten it to the satisfaction of nobody.',
      phrase: 'wants the painting straight',
      cat: 'Fake tools',
      tint: '#57534e',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 5h16v14H4z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 12h16"/>'
    },
    {
      slug: 'button_cascade',
      title: 'Containment Button',
      desc: 'One button with no useful purpose. Pressing it produces more buttons.',
      phrase: 'makes more buttons',
      cat: 'Fidgets',
      tint: '#e42d24',
      stroke: false,
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/>'
    },
    {
      slug: 'dvd_engine',
      title: 'DVD Corner Engine',
      desc: 'The bouncing logo, running in real time. Stay until it hits a corner exactly.',
      phrase: 'waits for the corner hit',
      cat: 'Fidgets',
      tint: '#1e293b',
      stroke: false,
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14h-4v-8h8v8h-4z"/>'
    },
    {
      slug: 'dino_defeatist',
      title: 'Dino Defeatist',
      desc: 'The offline dinosaur game, except the dinosaur has thought it over and lies down.',
      phrase: 'runs a dinosaur that quit',
      cat: 'Fidgets',
      tint: '#334155',
      stroke: false,
      viewBox: '0 0 44 47',
      icon: '<path d="M22 2h14v2h2v2h2v10h-2v2h-8v2h2v2h10v2h2v12h-2v2h-2v2h-2v2h-2v2h-2v-2h-2v-4h-2v2h-2v2h-4v-2h-2v-2h-2v-12h2v-2h2v-2h2v-2H6v-2H4v-2H2v-10h2V8h2V6h2V4h14v2z"/>'
    },
    {
      slug: 'michael_bay_input',
      title: 'Michael Bay Input',
      desc: 'A plain search box where every keystroke arrives as an action sequence.',
      phrase: 'explodes when you type',
      cat: 'Fidgets',
      tint: '#ea580c',
      stroke: true,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
    }
  ];

  var CATEGORIES = ['Generators', 'Simulations', 'Fake tools', 'Fidgets'];

  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var href = function (p) { return 'projects/' + p.slug + '/index.html'; };

  var ARROW = '<svg class="card-arrow" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---- Grid ------------------------------------------------ */

  var grid = $('grid');

  grid.innerHTML = PROJECTS.map(function (p) {
    var attrs = p.stroke
      ? 'fill="none" stroke="currentColor" stroke-width="1.6"'
      : 'fill="currentColor"';
    return '<a class="card" href="' + href(p) + '" style="--tint:' + p.tint + '"' +
      ' data-cat="' + p.cat + '" data-search="' + (p.title + ' ' + p.desc + ' ' + p.cat).toLowerCase().replace(/"/g, '') + '">' +
      '<span class="card-glyph" aria-hidden="true"><svg ' + attrs + ' viewBox="' + (p.viewBox || '0 0 24 24') + '">' + p.icon + '</svg></span>' +
      '<h2 class="card-title">' + p.title + '</h2>' +
      '<p class="card-desc">' + p.desc + '</p>' +
      '<span class="card-foot"><span class="card-cat">' + p.cat + '</span>' + ARROW + '</span>' +
      '</a>';
  }).join('');

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));

  /* Cards settle in as they scroll into view. */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.animationDelay = Math.min(i, 6) * 45 + 'ms';
        el.classList.remove('is-pending');
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    cards.forEach(function (c) { c.classList.add('is-pending'); io.observe(c); });
  }

  /* ---- Filters + search ------------------------------------ */

  var filters = $('filters');
  var search = $('search');
  var count = $('count');
  var empty = $('empty');
  var activeCat = 'All';

  filters.innerHTML = ['All'].concat(CATEGORIES).map(function (c) {
    return '<button class="filter' + (c === 'All' ? ' is-active' : '') + '" type="button"' +
      ' data-cat="' + c + '" aria-pressed="' + (c === 'All') + '">' + c + '</button>';
  }).join('');

  function apply() {
    var q = search.value.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var visible = (activeCat === 'All' || card.dataset.cat === activeCat) &&
                    (!q || card.dataset.search.indexOf(q) > -1);
      card.classList.toggle('is-hidden', !visible);
      if (visible) shown++;
    });
    /* The empty state speaks for itself, so the tally stays out of its way. */
    var filtered = activeCat !== 'All' || q;
    count.textContent = filtered && shown ? shown + ' of ' + PROJECTS.length + ' shown' : '';
    empty.hidden = shown !== 0;
    grid.hidden = shown === 0;
  }

  filters.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter');
    if (!btn) return;
    activeCat = btn.dataset.cat;
    filters.querySelectorAll('.filter').forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    apply();
  });

  search.addEventListener('input', apply);

  $('clear').addEventListener('click', function () {
    search.value = '';
    filters.querySelector('[data-cat="All"]').click();
    search.focus();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    } else if (e.key === 'Escape' && document.activeElement === search) {
      search.value = '';
      apply();
      search.blur();
    }
  });

  apply();

  /* ---- The headline reads out the catalog ------------------ */

  var rotator = $('rotator');
  var phrase = $('rotator-phrase');
  var credit = $('rotator-credit');
  var order = PROJECTS.slice().sort(function () { return Math.random() - 0.5; });
  var at = 0;
  var timer = null;

  function paint(p) {
    phrase.textContent = p.phrase;
    credit.textContent = p.title;
    rotator.href = href(p);
    rotator.setAttribute('aria-label', 'Open ' + p.title);
  }

  function advance() {
    at = (at + 1) % order.length;
    rotator.classList.add('is-swapping');
    credit.classList.add('is-swapping');
    setTimeout(function () {
      paint(order[at]);
      rotator.classList.remove('is-swapping');
      credit.classList.remove('is-swapping');
    }, 240);
  }

  function play() { if (!timer) timer = setInterval(advance, 3800); }
  function pause() { clearInterval(timer); timer = null; }

  paint(order[0]);
  if (!reduceMotion) {
    play();
    rotator.addEventListener('mouseenter', pause);
    rotator.addEventListener('mouseleave', play);
    rotator.addEventListener('focus', pause);
    rotator.addEventListener('blur', play);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { pause(); } else { play(); }
    });
  }

  /* ---- Open one at random ---------------------------------- */

  $('random').addEventListener('click', function () {
    window.location.href = href(PROJECTS[Math.floor(Math.random() * PROJECTS.length)]);
  });

  /* ---- Theme ----------------------------------------------- */

  var root = document.documentElement;
  var toggle = $('theme-toggle');

  function setTheme(dark) {
    root.classList.toggle('dark', dark);
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('fx-theme', dark ? 'dark' : 'light'); } catch (e) {}
  }

  setTheme(root.classList.contains('dark'));
  toggle.addEventListener('click', function () { setTheme(!root.classList.contains('dark')); });
})();
