// ── PAGE TRANSITION → VILLAS ──
const ctaBtn = document.getElementById('ctaBtn');
if (ctaBtn) {
  ctaBtn.addEventListener('click', () => {
    const cover = document.createElement('div');
    cover.style.cssText = 'position:fixed;inset:0;z-index:5000;background:#0E0B08;opacity:0;transition:opacity 0.32s ease;pointer-events:all;';
    document.body.appendChild(cover);
    document.querySelector('.hero').style.transition = 'opacity 0.25s ease';
    document.querySelector('.hero').style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => { cover.style.opacity = '1'; }));
    setTimeout(() => { window.location.href = 'pages/villas.html'; }, 360);
  });
}
