const rooms = {
  living:   { name:'Living · Cuisine', desc:'Espace ouvert et lumineux. Cuisine sur-mesure intégrée dans le séjour.', tags:['42 m²','Double hauteur','Accès terrasse','Cuisine équipée'],
               bg:'linear-gradient(135deg,#3A3028,#2C2420,#4A3C30)' },
  pool:     { name:'Piscine Privée',   desc:'Piscine privée en pierre naturelle avec éclairage immergé.',            tags:['Pierre naturelle','Éclairage immergé','Accès direct living'],
               bg:'linear-gradient(135deg,#1E2A30,#243440,#182028)' },
  terrace:  { name:'Terrasse',         desc:'Terrasse en bois naturel, entièrement privative, vue sur le jardin.',   tags:['Bois naturel','Privatif','Vue jardin'],
               bg:'linear-gradient(135deg,#2A2C24,#383C2C,#202218)' },
  parking:  { name:'Parking',          desc:'Parking couvert privatif avec rangements intégrés.',                    tags:['Couvert','Privatif'],
               bg:'linear-gradient(135deg,#282420,#322E28,#201C18)' },
  shower:   { name:'Douche Extérieure',desc:'Douche extérieure en pierre naturelle, accès direct piscine.',          tags:['Pierre naturelle','Accès piscine'],
               bg:'linear-gradient(135deg,#243028,#2C3C30,#1C2820)' },
  bedroom1: { name:'Chambre Principale',desc:'Suite parentale avec dressing intégré. Vue sur jardin tropical.',      tags:['Dressing','Climatisation','Baies vitrées','Vue jardin'],
               bg:'linear-gradient(135deg,#2C2820,#3A3428,#241E18)' },
  bedroom2: { name:'Chambre 2',        desc:'Chambre lumineuse avec salle de bain privative.',                       tags:['Salle de bain privative','Rangements','Lumière naturelle'],
               bg:'linear-gradient(135deg,#28261E,#343028,#201E16)' },
  bath1:    { name:'Salle de Bain 1',  desc:'Salle de bain en pierre naturelle, baignoire double et douche italienne.', tags:['Baignoire','Douche italienne','Pierre naturelle'],
               bg:'linear-gradient(135deg,#202430,#28303C,#181C28)' },
  bath2:    { name:'Salle de Bain 2',  desc:'Salle de bain avec douche et vasque sur-mesure.',                       tags:['Douche','Vasque sur-mesure'],
               bg:'linear-gradient(135deg,#222030,#2C2A3C,#1A1828)' },
  stairs:   { name:'Escalier',         desc:'Escalier en béton ciré, garde-corps métal noir mat.',                   tags:['Béton ciré','Vue séjour'],
               bg:'linear-gradient(135deg,#242220,#302E2A,#1C1A18)' },
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

function selectRoom(roomId, zoneEl) {
  if (activeZone) activeZone.classList.remove('selected');
  activeZone = zoneEl;
  zoneEl.classList.add('selected');

  const data = rooms[roomId];
  if (!data) return;

  // Hide placeholder
  document.getElementById('imgPlaceholder').classList.add('hidden');

  // Set room image bg (placeholder gradient until real photo)
  const img = document.getElementById('roomImage');
  img.style.background = data.bg;
  img.style.backgroundSize = 'cover';
  img.classList.add('visible');

  // Update overlay info
  document.getElementById('riName').textContent = data.name;
  document.getElementById('riDesc').textContent = data.desc;
  document.getElementById('riTags').innerHTML = data.tags
    .map(t => `<div class="room-tag">${t}</div>`).join('');
  document.getElementById('roomOverlay').classList.add('visible');
}

function setFloor(idx, btn) {
  document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('floor-0').style.display = idx === 0 ? 'block' : 'none';
  document.getElementById('floor-1').style.display = idx === 1 ? 'block' : 'none';

  // Reset image
  if (activeZone) activeZone.classList.remove('selected');
  activeZone = null;
  document.getElementById('imgPlaceholder').classList.remove('hidden');
  document.getElementById('roomImage').classList.remove('visible');
  document.getElementById('roomOverlay').classList.remove('visible');
}

// Drawer
const menuBtn = document.getElementById('menuBtn');
const drawer  = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');
const open  = () => { drawer.classList.add('open');    overlay.classList.add('show'); };
const close = () => { drawer.classList.remove('open'); overlay.classList.remove('show'); };
menuBtn.addEventListener('click', open);
drawerClose.addEventListener('click', close);
overlay.addEventListener('click', close);
document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
