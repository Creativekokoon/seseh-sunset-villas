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

// ── PAGE TRANSITION → VILLAS ──
const ctaBtn         = document.getElementById('ctaBtn');
const pageTransition = document.getElementById('pageTransition');

ctaBtn.addEventListener('click', () => {
  // Animate wipe then navigate
  pageTransition.classList.add('animating');
  setTimeout(() => {
    window.location.href = 'pages/villas.html';
  }, 600);
});
