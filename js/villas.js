// ── VILLA DATA ──
const villaData = {
  elegance: {
    num:'01', title:'Élégance', sub:'Loft · 1 Chambre',
    area:'48,74 m²', beds:'1', baths:'1', price:'189 000 €',
    features:['Cuisine équipée','Jardin privé','Jacuzzi','Douche extérieure'],
    cta:'elegance.html'
  },
  prestige: {
    num:'02', title:'Prestige', sub:'Villa · 2 Chambres',
    area:'90,8 m²', beds:'2', baths:'2', price:'260 000 €',
    features:['Cuisine équipée','Piscine privée','Parking','Terrasse','Douche extérieure'],
    cta:'prestige.html'
  },
  signature: {
    num:'03', title:'Signature', sub:'Villa Premium · 2 Chambres',
    area:'117,78 m²', beds:'2', baths:'2', price:'310 000 €',
    features:['Cuisine équipée','Piscine privée','Parking','Terrasse','Douche extérieure'],
    cta:'signature.html'
  },
  exception: {
    num:'04', title:'Exception', sub:'Villa · 3 Chambres',
    area:'190,17 m²', beds:'3', baths:'3', price:'379 000 €',
    features:['Cuisine équipée','Piscine privée','Parking','Terrasse','BBQ Area','Douche extérieure'],
    cta:'exception.html'
  }
};

// ── ELEMENTS ──
const zoomLayer   = document.getElementById('zoomLayer');
const grid        = document.getElementById('villasGrid');
const topbar      = document.querySelector('.topbar');
const menuBtn     = document.getElementById('menuBtn');
const drawer      = document.getElementById('drawer');
const overlay     = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');

// ── PREZI ZOOM ──
document.querySelectorAll('.villa-card').forEach(card => {
  card.addEventListener('click', () => {
    const id   = card.dataset.villa;
    const data = villaData[id];
    if (!data) return;

    // 1. Get card's exact rect on screen
    const rect = card.getBoundingClientRect();
    const vw   = window.innerWidth;
    const vh   = window.innerHeight;

    // 2. Create a clone div that sits exactly over the card
    const clone = document.createElement('div');
    clone.className = 'zoom-clone';

    // Copy background image from card-bg
    const cardBg = card.querySelector('.card-bg');
    const bgImg  = getComputedStyle(cardBg).backgroundImage;
    const bgCol  = getComputedStyle(cardBg).backgroundColor;
    clone.style.backgroundImage = bgImg !== 'none' ? bgImg : 'none';
    clone.style.backgroundColor = bgCol;

    // Position clone exactly over card
    clone.style.left   = rect.left   + 'px';
    clone.style.top    = rect.top    + 'px';
    clone.style.width  = rect.width  + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.borderRadius = '0px';
    clone.style.transformOrigin = 'center center';
    clone.style.transform = 'scale(1)';

    // Activate zoom layer and append clone
    zoomLayer.style.visibility = 'visible';
    zoomLayer.appendChild(clone);

    // 3. Calculate scale needed to fill + overflow viewport
    const scaleX = (vw * 1.6) / rect.width;
    const scaleY = (vh * 1.6) / rect.height;
    const scale  = Math.max(scaleX, scaleY);

    // 4. Calculate translate so card centre moves to viewport centre
    const cardCX = rect.left + rect.width  / 2;
    const cardCY = rect.top  + rect.height / 2;
    const vpCX   = vw / 2;
    const vpCY   = vh / 2;
    const tx = vpCX - cardCX;
    const ty = vpCY - cardCY;

    // 5. Fade out grid & topbar
    grid.classList.add('fading');
    topbar.classList.add('hidden');

    // 6. Trigger animation on next frame
    requestAnimationFrame(() => {
      clone.classList.add('animating');
      clone.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    });

    // 7. Navigate after zoom completes
    setTimeout(() => {
      window.location.href = data.cta;
    }, 680);
  });
});

// ── DRAWER ──
function openDrawer()  { drawer.classList.add('open');    overlay.classList.add('show'); }
function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('show'); }
menuBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
