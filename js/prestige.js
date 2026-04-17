const rooms = {
  living:   { name:'Living · Cuisine',  bg:'linear-gradient(135deg,#3A3028 0%,#2C2420 50%,#4A3C30 100%)' },
  pool:     { name:'Piscine Privée',    bg:'linear-gradient(135deg,#1A2A32 0%,#1E3040 50%,#142028 100%)' },
  terrace:  { name:'Terrasse',          bg:'linear-gradient(135deg,#2A2C22 0%,#363C28 50%,#1E2016 100%)' },
  bedroom1: { name:'Chambre 1',         bg:'linear-gradient(135deg,#2C2820 0%,#3A3428 50%,#221E16 100%)' },
  bedroom2: { name:'Chambre 2',         bg:'linear-gradient(135deg,#28261C 0%,#343020 50%,#1E1C14 100%)' },
  bath1:    { name:'Salle de Bain 1',   bg:'linear-gradient(135deg,#1C2030 0%,#242838 50%,#141820 100%)' },
  bath2:    { name:'Salle de Bain 2',   bg:'linear-gradient(135deg,#201E2E 0%,#2A2838 50%,#181620 100%)' },
  balcony:  { name:'Balcon',            bg:'linear-gradient(135deg,#222220 0%,#2E2C28 50%,#1A1818 100%)' },
};

let activeZone = null;

// Cursor
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

  // Hide placeholder
  document.getElementById('detailPlaceholder').classList.add('hidden');

  // Update name + image
  document.getElementById('detailName').textContent = d.name;
  document.getElementById('detailImage').style.background = d.bg;

  // Show content
  document.getElementById('detailContent').classList.add('visible');
}

function setFloor(idx, btn) {
  document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('floor-0').style.display = idx === 0 ? 'block' : 'none';
  document.getElementById('floor-1').style.display = idx === 1 ? 'block' : 'none';
  if (activeZone) activeZone.classList.remove('selected');
  activeZone = null;
  document.getElementById('detailPlaceholder').classList.remove('hidden');
  document.getElementById('detailContent').classList.remove('visible');
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

// Back — simple fade
document.getElementById('backBtn').addEventListener('click', function(e) {
  e.preventDefault();
  const dest = this.getAttribute('href');
  document.body.style.transition = 'opacity 0.35s ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = dest; }, 360);
});
