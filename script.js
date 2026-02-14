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

  // Section reveal on scroll
  const revealEls = document.querySelectorAll(
    '.section-label, .section-title, .about-grid, .timeline-item, .skills-pillars, .services-carousel, .cert-card, .contact-grid, .hero-content, .hero-visual'
  );

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
