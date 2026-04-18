// ── VILLA DATA ──
const villaData = {
  elegance:  { cta:'elegance.html' },
  prestige:  { cta:'prestige.html' },
  signature: { cta:'signature.html' },
  exception: { cta:'exception.html' }
};

// ── PREZI ZOOM ──
document.querySelectorAll('.villa-card').forEach(card => {
  card.addEventListener('click', () => {
    const id   = card.dataset.villa;
    const data = villaData[id];
    if (!data) return;

    const rect = card.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Clone the card visually
    const clone = document.createElement('div');
    clone.className = 'zoom-clone';
    const cardBg = card.querySelector('.card-bg');
    const bgImg  = getComputedStyle(cardBg).backgroundImage;
    const bgCol  = getComputedStyle(cardBg).backgroundColor;
    clone.style.backgroundImage = bgImg !== 'none' ? bgImg : 'none';
    clone.style.backgroundColor = bgCol;
    clone.style.left   = rect.left + 'px';
    clone.style.top    = rect.top  + 'px';
    clone.style.width  = rect.width  + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.transformOrigin = 'center center';
    clone.style.transform = 'scale(1)';

    const zoomLayer = document.getElementById('zoomLayer');
    zoomLayer.style.visibility = 'visible';
    zoomLayer.appendChild(clone);

    // Scale to fill viewport
    const scale = Math.max((vw * 1.6) / rect.width, (vh * 1.6) / rect.height);
    const tx = (vw / 2) - (rect.left + rect.width  / 2);
    const ty = (vh / 2) - (rect.top  + rect.height / 2);

    // Fade out grid + nav
    document.getElementById('villasGrid').classList.add('fading');
    const siteNav = document.getElementById('site-topbar');
    if (siteNav) { siteNav.style.transition = 'opacity 0.4s'; siteNav.style.opacity = '0'; }

    requestAnimationFrame(() => {
      clone.classList.add('animating');
      clone.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    });

    // Fade to black then navigate
    setTimeout(() => {
      const fade = document.createElement('div');
      fade.style.cssText = 'position:fixed;inset:0;z-index:5000;background:#0E0B08;opacity:0;transition:opacity 0.4s ease;pointer-events:none;';
      document.body.appendChild(fade);
      requestAnimationFrame(() => requestAnimationFrame(() => { fade.style.opacity = '1'; }));
      setTimeout(() => { window.location.href = data.cta; }, 420);
    }, 750);
  });
});

// ── STAGGERED CARD REVEAL ──
function revealCards() {
  document.querySelectorAll('.villa-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('revealed'), 120 + i * 160);
  });
}

window.addEventListener('load', () => {
  // Fade in nav
  const siteNav = document.getElementById('site-topbar');
  if (siteNav) {
    siteNav.style.opacity = '0';
    siteNav.style.transition = 'opacity 0.6s ease';
    setTimeout(() => { siteNav.style.opacity = '1'; }, 80);
  }
  setTimeout(revealCards, 300);
});
