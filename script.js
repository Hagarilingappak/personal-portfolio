(function () {
  'use strict';

  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const themeKey = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(themeKey);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(themeKey, theme);
  }

  if (themeToggle) {
    setTheme(getPreferredTheme());
    themeToggle.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next);
    });
  }

  // Sticky header on scroll
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const current = window.scrollY;
      if (current > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = current;
    }, { passive: true });
  }

  // Hide hero scroll indicator on small screens or when user scrolls down
  const heroScroll = document.querySelector('.hero-scroll');
  function updateHeroScroll() {
    if (!heroScroll) return;
    const isSmall = window.innerWidth <= 640;
    const scrolled = window.scrollY > 20;
    if (isSmall || scrolled) {
      heroScroll.style.display = 'none';
    } else {
      heroScroll.style.display = 'flex';
    }
  }
  // run on load and on scroll/resize
  updateHeroScroll();
  window.addEventListener('scroll', updateHeroScroll, { passive: true });
  window.addEventListener('resize', updateHeroScroll);

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-label',
        header.classList.contains('nav-open') ? 'Close menu' : 'Open menu');
    });
  }

  // Close mobile menu on link click (anchor links)
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Section reveal on scroll — only apply to Skills/Technical Depth pillars
  const revealEls = document.querySelectorAll('.skills-pillars .skill-pillar');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('reveal') === false) {
          entry.target.classList.add('reveal');
        }
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
    // Add click 'flow' animation (short visual feedback)
    el.addEventListener('click', function (ev) {
      el.classList.add('flow');
      // show bug overlay in the Skills section positioned over the clicked widget
      const skillsSection = document.querySelector('.skills');
      const overlay = skillsSection ? skillsSection.querySelector('.bug-overlay') : null;
      if (overlay) {
        const img = overlay.querySelector('img');
        const skillsRect = skillsSection.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        // center of clicked element relative to skills container
        const cx = elRect.left - skillsRect.left + elRect.width / 2;
        const cy = elRect.top - skillsRect.top + elRect.height / 2;
        // place the image at the computed coordinates (image uses translate(-50%,-50%))
        img.style.left = cx + 'px';
        img.style.top = cy + 'px';
        overlay.classList.add('show');
        setTimeout(function () { overlay.classList.remove('show'); }, 900);
      }
      setTimeout(function () { el.classList.remove('flow'); }, 600);
    });
  });

  // Hero elements already visible (no delay for first view)
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  if (heroContent) heroContent.classList.add('visible');
  if (heroVisual) heroVisual.classList.add('visible');

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
