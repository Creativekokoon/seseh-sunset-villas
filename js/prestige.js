const rooms = {
  living:   { bg:'linear-gradient(135deg,#3A3028,#2C2420,#4A3C30)' },
  pool:     { bg:'linear-gradient(135deg,#1E2A30,#243440,#182028)' },
  terrace:  { bg:'linear-gradient(135deg,#2A2C24,#383C2C,#202218)' },
  bedroom1: { bg:'linear-gradient(135deg,#2C2820,#3A3428,#241E18)' },
  bedroom2: { bg:'linear-gradient(135deg,#28261E,#343028,#201E16)' },
  bath1:    { bg:'linear-gradient(135deg,#202430,#28303C,#181C28)' },
  bath2:    { bg:'linear-gradient(135deg,#222030,#2C2A3C,#1A1828)' },
  balcony:  { bg:'linear-gradient(135deg,#242220,#302E2A,#1C1A18)' },
};

let activeZone = null;

// Cursor label
const cursorLabel = document.getElementById('cursorLabel');
document.addEventListener('mousemove', e => {
  cursorLabel.style.left = e.clientX + 'px';
  cursorLabel.style.top  = e.clientY + 'px';
});
document.querySelectorAll('.plan-zone').forEach(z => {
  z.addEventListener('mouseenter', () => cursorLabel.classList.add('visible'));
  z.addEventListener('mouseleave', () => cursorLabel.classList.remove('visible'));
});

function selectRoom(id, zone) {
  if (activeZone) activeZone.classList.remove('selected');
  activeZone = zone;
  zone.classList.add('selected');

  const d = rooms[id];
  if (!d) return;

  document.getElementById('imgPlaceholder').classList.add('hidden');
  const img = document.getElementById('roomImage');
  img.style.background = d.bg;
  img.classList.add('visible');
}

function setFloor(idx, btn) {
  document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('floor-0').style.display = idx === 0 ? 'block' : 'none';
  document.getElementById('floor-1').style.display = idx === 1 ? 'block' : 'none';
  if (activeZone) activeZone.classList.remove('selected');
  activeZone = null;
  document.getElementById('imgPlaceholder').classList.remove('hidden');
  document.getElementById('roomImage').classList.remove('visible');
}

// Drawer
const menuBtn     = document.getElementById('menuBtn');
const drawer      = document.getElementById('drawer');
const overlay     = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');
menuBtn.addEventListener('click',     () => { drawer.classList.add('open');    overlay.classList.add('show'); });
drawerClose.addEventListener('click', () => { drawer.classList.remove('open'); overlay.classList.remove('show'); });
overlay.addEventListener('click',     () => { drawer.classList.remove('open'); overlay.classList.remove('show'); });
document.addEventListener('keydown',  e => { if (e.key==='Escape') { drawer.classList.remove('open'); overlay.classList.remove('show'); }});

// Back → villas, simple fade
document.getElementById('backBtn').addEventListener('click', function(e) {
  e.preventDefault();
  const dest = this.getAttribute('href');
  document.body.style.transition = 'opacity 0.35s ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = dest; }, 360);
});
