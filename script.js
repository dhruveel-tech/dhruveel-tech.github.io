(function () {
  var root = document.documentElement;

  // ----- Role switch: point resume links at the FDE resume on ?role=fde -----
  if (root.getAttribute('data-role') === 'fde') {
    document.querySelectorAll('.js-resume').forEach(function (a) {
      a.setAttribute('href', 'assets/Dhruveel_Chahodiya_Resume_FDE.pdf');
    });
  }

  // ----- Theme toggle -----
  var toggle = document.getElementById('theme-toggle');
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ----- Mobile menu -----
  var menuBtn = document.getElementById('menu-btn');
  var links = document.getElementById('nav-links');
  function closeMenu() {
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });

  // ----- Reveal on scroll -----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // ----- Lightbox -----
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  var boxCap = document.getElementById('lightbox-caption');
  var boxClose = document.getElementById('lightbox-close');
  var lastFocus = null;

  function openBox(src, caption) {
    lastFocus = document.activeElement;
    boxImg.src = src;
    boxImg.alt = caption || '';
    boxCap.textContent = caption || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    boxClose.focus();
  }
  function closeBox() {
    box.hidden = true;
    boxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('.thumb').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openBox(btn.getAttribute('data-full'), btn.getAttribute('data-caption'));
    });
  });
  boxClose.addEventListener('click', closeBox);
  box.addEventListener('click', function (e) {
    if (e.target === box) closeBox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!box.hidden) closeBox();
      closeMenu();
    }
  });

  // ----- Footer year -----
  document.getElementById('year').textContent = new Date().getFullYear();
})();
