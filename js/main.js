document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const header = document.querySelector('.site-header');
  const yearEl = document.getElementById('year');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const updateCounter = () => {
      const current = Number(counter.textContent || 0);
      const step = Math.ceil(target / 90);
      if (current < target) {
        counter.textContent = Math.min(current + step, target);
        requestAnimationFrame(updateCounter);
      }
    };

    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        updateCounter();
        counterObserver.disconnect();
      }
    }, { threshold: 0.6 });

    counterObserver.observe(counter);
  });

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    link.addEventListener('click', (event) => {
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
