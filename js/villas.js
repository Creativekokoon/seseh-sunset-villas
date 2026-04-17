// ── VILLA DATA ──
const villaData = {
  elegance: {
    num: '01', title: 'Élégance', sub: 'Loft · 1 Chambre',
    area: '48,74 m²', beds: '1', baths: '1',
    price: '189 000 €',
    features: ['Cuisine équipée','Jardin privé','Jacuzzi','Douche extérieure'],
    bg: 'linear-gradient(155deg,#3A3028,#2C2420,#5A4A38)',
    cta: '../pages/elegance.html'
  },
  prestige: {
    num: '02', title: 'Prestige', sub: 'Villa · 2 Chambres',
    area: '90,8 m²', beds: '2', baths: '2',
    price: '260 000 €',
    features: ['Cuisine équipée','Piscine privée','Parking','Terrasse','Douche extérieure'],
    bg: 'linear-gradient(155deg,#282820,#343028,#201C18)',
    cta: '../pages/prestige.html'
  },
  signature: {
    num: '03', title: 'Signature', sub: 'Villa Premium · 2 Chambres',
    area: '117,78 m²', beds: '2', baths: '2',
    price: '310 000 €',
    features: ['Cuisine équipée','Piscine privée','Parking','Terrasse','Douche extérieure'],
    bg: 'linear-gradient(155deg,#1E2820,#2A3028,#182018)',
    cta: '../pages/signature.html'
  },
  exception: {
    num: '04', title: 'Exception', sub: 'Villa · 3 Chambres',
    area: '190,17 m²', beds: '3', baths: '3',
    price: '379 000 €',
    features: ['Cuisine équipée','Piscine privée','Parking','Terrasse','BBQ Area','Douche extérieure'],
    bg: 'linear-gradient(155deg,#242038,#302C40,#1A1828)',
    cta: '../pages/exception.html'
  }
};

// ── ELEMENTS ──
const zoomLayer   = document.getElementById('zoomLayer');
const zoomBg      = document.getElementById('zoomBg');
const zoomBack    = document.getElementById('zoomBack');
const menuBtn     = document.getElementById('menuBtn');
const drawer      = document.getElementById('drawer');
const overlay     = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');

// ── ZOOM OPEN ──
document.querySelectorAll('.villa-card').forEach(card => {
  card.addEventListener('click', () => {
    const id   = card.dataset.villa;
    const data = villaData[id];
    if (!data) return;

    // Fill zoom bg with same gradient (swap for real image later)
    zoomBg.style.background = data.bg;

    // Populate content
    document.getElementById('zNum').textContent   = `Type ${data.num}`;
    document.getElementById('zTitle').textContent = data.title;
    document.getElementById('zSub').textContent   = data.sub;
    document.getElementById('zArea').textContent  = data.area;
    document.getElementById('zBed').textContent   = data.beds;
    document.getElementById('zBath').textContent  = data.baths;
    document.getElementById('zPrice').textContent = data.price;
    document.getElementById('zCta').href          = data.cta;

    const featsEl = document.getElementById('zFeatures');
    featsEl.innerHTML = data.features
      .map(f => `<div class="zoom-feat">${f}</div>`).join('');

    // Trigger zoom
    zoomLayer.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// ── ZOOM CLOSE ──
function closeZoom() {
  zoomLayer.classList.remove('active');
}
zoomBack.addEventListener('click', closeZoom);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (zoomLayer.classList.contains('active')) closeZoom();
    else closeDrawer();
  }
});

// ── DRAWER ──
function openDrawer() { drawer.classList.add('open'); overlay.classList.add('show'); }
function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('show'); }
menuBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
