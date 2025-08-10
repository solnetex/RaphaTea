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

// Hero image crossfade slideshow
(function initHeroSlideshow() {
  const container = document.querySelector('.hero-card .hero-image');
  if (!container) return;

  const baseImg = container.querySelector('img:not(.fade-overlay)');
  const overlayImg = container.querySelector('img.fade-overlay');
  if (!baseImg || !overlayImg) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const images = [
    'RaphaSlide1.png',
    'RaphaSlide2.png',
    'RaphaSlide3.png',
    'RaphaSlide4.png',
    'RolledIceSC-1.png'
  ];

  // Preload images
  images.forEach(src => {
    const i = new Image();
    i.src = src;
  });

  let index = 0;
  const changeEveryMs = 4000; // 4s per image
  const fadeMs = prefersReducedMotion ? 0 : 1000;

  function nextImage() {
    index = (index + 1) % images.length;
    const nextSrc = images[index];

    overlayImg.src = nextSrc;
    overlayImg.style.opacity = '1';

    // After fade, swap base to overlay source and hide overlay
    window.setTimeout(() => {
      baseImg.src = nextSrc;
      overlayImg.style.opacity = '0';
    }, fadeMs);
  }

  // Start from initial base image position; ensure overlay matches base to avoid flash
  overlayImg.src = baseImg.getAttribute('src') || images[0];
  overlayImg.style.opacity = '0';

  if (images.length > 1) {
    setInterval(nextImage, changeEveryMs);
  }
})();