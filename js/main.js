// ── DRAWER ──
const menuBtn     = document.getElementById('menuBtn');
const drawer      = document.getElementById('drawer');
const overlay     = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer()  { drawer.classList.add('open');    overlay.classList.add('show'); }
function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('show'); }

menuBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// ── CINEMATIC TRANSITION → VILLAS ──
document.getElementById('ctaBtn').addEventListener('click', () => {

  // 1. Create full-screen black cover
  const cover = document.createElement('div');
  cover.style.cssText = `
    position:fixed;inset:0;z-index:500;
    background:#0E0B08;
    opacity:0;
    transition:opacity 0.5s ease;
    pointer-events:all;
  `;
  document.body.appendChild(cover);

  // 2. Fade hero content out first
  document.querySelector('.hero').style.transition = 'opacity 0.35s ease';
  document.querySelector('.hero').style.opacity = '0';

  // 3. Fade in the black cover
  requestAnimationFrame(() => requestAnimationFrame(() => {
    cover.style.opacity = '1';
  }));

  // 4. Navigate to villas after cover is fully black
  setTimeout(() => {
    window.location.href = 'pages/villas.html';
  }, 550);
});
