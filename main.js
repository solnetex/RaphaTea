// Mobile nav toggle
const navToggle = document.querySelector('#navToggle');
const navLinks = document.querySelector('#navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Mark active link
(function markActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navLinks a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === 'index.html' && (href === '/' || href === 'index.html')) || href === path) {
      a.classList.add('active');
    }
  });
})();

// Scroll reveal
const reveal = () => {
  const els = document.querySelectorAll('[data-reveal]');
  const wh = window.innerHeight;
  els.forEach(el => {
    if (el.getBoundingClientRect().top < wh - 80) {
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }
  });
};
window.addEventListener('scroll', reveal);
window.addEventListener('load', () => {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });
  reveal();
});

// FAQ accordion
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-q');
  if (!btn) return;
  const item = btn.closest('.faq-item');
  item.classList.toggle('open');
});