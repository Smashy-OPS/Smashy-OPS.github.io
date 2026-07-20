// Anno dinamico
  document.getElementById('year').textContent = '© ' + new Date().getFullYear();

  // Nav scroll state
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const iconMenu = document.getElementById('iconMenu');
  const iconClose = document.getElementById('iconClose');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    iconMenu.style.display = open ? 'none' : 'block';
    iconClose.style.display = open ? 'block' : 'none';
    navToggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      iconMenu.style.display = 'block';
      iconClose.style.display = 'none';
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => linkObserver.observe(s));

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Terminal typing effect
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const terminalBody = document.getElementById('terminalBody');
  const lines = [
    { cmd: 'whoami', out: 'Salvatore Isca — Perito Informatico' },
    { cmd: 'cat competenze.txt', out: 'Sviluppo Web · Database · Reti &amp; Sicurezza' },
    { cmd: 'cat contatti.txt', out: 'Palermo · salvatoreisca53@gmail.com' }
  ];

  function renderStatic() {
    terminalBody.innerHTML = lines.map(l =>
      '<div class="t-line"><span class="t-prompt">visitor</span><span class="t-path">@portfolio:~$</span> ' + l.cmd +
      '<span class="t-out">' + l.out + '</span></div>'
    ).join('') + '<span class="t-prompt">visitor</span><span class="t-path">@portfolio:~$</span><span class="t-cursor"></span>';
  }

  async function typeLine(lineEl, text, speed) {
    for (let i = 0; i <= text.length; i++) {
      lineEl.innerHTML = '<span class="t-prompt">visitor</span><span class="t-path">@portfolio:~$</span> ' + text.slice(0, i) + '<span class="t-cursor"></span>';
      await new Promise(r => setTimeout(r, speed));
    }
  }

  async function runTerminal() {
    if (reduceMotion) { renderStatic(); return; }
    terminalBody.innerHTML = '';
    for (const l of lines) {
      const lineEl = document.createElement('div');
      lineEl.className = 't-line';
      terminalBody.appendChild(lineEl);
      await typeLine(lineEl, l.cmd, 38);
      await new Promise(r => setTimeout(r, 220));
      lineEl.innerHTML = '<span class="t-prompt">visitor</span><span class="t-path">@portfolio:~$</span> ' + l.cmd + '<span class="t-out">' + l.out + '</span>';
      await new Promise(r => setTimeout(r, 380));
    }
    const finalLine = document.createElement('div');
    finalLine.innerHTML = '<span class="t-prompt">visitor</span><span class="t-path">@portfolio:~$</span><span class="t-cursor"></span>';
    terminalBody.appendChild(finalLine);
  }

  // avvia poco dopo il caricamento, in sync con l'animazione del terminale
  setTimeout(runTerminal, 650);
