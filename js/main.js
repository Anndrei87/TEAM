/**
 * Team William Landing Page
 * Minimal JS for performance and accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initHeaderScroll();
  initSmoothScroll();
  initRevealAnimations();
});

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initFaqAccordion() {
  const items = document.querySelectorAll('[data-faq-item]');

  items.forEach((item) => {
    const button = item.querySelector('[data-faq-trigger]');
    const panel = item.querySelector('[data-faq-panel]');
    if (!button || !panel) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      items.forEach((other) => {
        const otherBtn = other.querySelector('[data-faq-trigger]');
        const otherPanel = other.querySelector('[data-faq-panel]');
        if (!otherBtn || !otherPanel) return;
        otherBtn.setAttribute('aria-expanded', 'false');
        otherPanel.classList.add('hidden');
        otherBtn.querySelector('[data-faq-icon]')?.classList.remove('rotate-180');
      });

      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        panel.classList.remove('hidden');
        button.querySelector('[data-faq-icon]')?.classList.add('rotate-180');
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('shadow-lg', window.scrollY > 20);
    header.classList.toggle('bg-neutral-950/95', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
