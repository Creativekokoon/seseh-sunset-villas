// ── ROOM DATA ──
const rooms = {
  living:   { name:'Living · Cuisine', area:'42 m²', desc:'Espace ouvert baigné de lumière naturelle. La cuisine sur-mesure s\'intègre au séjour dans une continuité élégante.', tags:['Double hauteur','Cuisine équipée','Accès terrasse','Lumière naturelle'] },
  pool:     { name:'Piscine Privée', area:'', desc:'Piscine privée prolongeant l\'espace de vie vers l\'extérieur. Revêtement en pierre naturelle, éclairage immergé.', tags:['Éclairage immergé','Pierre naturelle','Accès living'] },
  terrace:  { name:'Terrasse', area:'', desc:'Terrasse en bois naturel avec vue dégagée. Espace de vie extérieur entièrement privatif.', tags:['Bois naturel','Privatif','Vue dégagée'] },
  parking:  { name:'Parking', area:'', desc:'Parking privé couvert pour un véhicule, avec rangements intégrés.', tags:['Couvert','Privatif'] },
  shower:   { name:'Douche Extérieure', area:'', desc:'Douche extérieure en pierre naturelle, directement accessible depuis la terrasse et la piscine.', tags:['Pierre naturelle','Accès piscine'] },
  bedroom1: { name:'Chambre Principale', area:'', desc:'Suite parentale avec dressing intégré et vue sur le jardin tropical. Hauteur sous plafond généreuse.', tags:['Dressing intégré','Vue jardin','Climatisation','Baies vitrées'] },
  bedroom2: { name:'Chambre 2', area:'', desc:'Chambre lumineuse avec accès à la salle de bain privative. Fenêtres double hauteur.', tags:['Salle de bain privative','Rangements','Lumière naturelle'] },
  bath1:    { name:'Salle de Bain 1', area:'', desc:'Salle de bain en pierre naturelle avec baignoire double et douche à l\'italienne.', tags:['Pierre naturelle','Baignoire','Douche italienne'] },
  bath2:    { name:'Salle de Bain 2', area:'', desc:'Salle de bain avec douche et vasque sur-mesure.', tags:['Douche','Vasque sur-mesure'] },
  landing:  { name:'Palier', area:'', desc:'Escalier en béton ciré avec garde-corps métal noir mat. Mezzanine ouverte sur le séjour.', tags:['Béton ciré','Vue sur séjour'] }
};

let activeRoom = null;
let activeZone = null;

// ── CURSOR LABEL ──
const cursorLabel = document.getElementById('cursorLabel');
document.addEventListener('mousemove', e => {
  cursorLabel.style.left = e.clientX + 'px';
  cursorLabel.style.top  = e.clientY + 'px';
});

// ── ZONE HOVER ──
document.querySelectorAll('.plan-zone').forEach(zone => {
  zone.addEventListener('mouseenter', () => cursorLabel.classList.add('visible'));
  zone.addEventListener('mouseleave', () => cursorLabel.classList.remove('visible'));
});

// ── SELECT ROOM ──
function selectRoom(roomId, zoneEl) {
  // Deselect previous
  if (activeZone) activeZone.classList.remove('selected');

  activeRoom = roomId;
  activeZone = zoneEl;
  zoneEl.classList.add('selected');

  const data = rooms[roomId];
  if (!data) return;

  document.getElementById('roomPlaceholder').style.display = 'none';
  const detail = document.getElementById('roomDetail');
  detail.style.display = 'block';

  document.getElementById('rdName').textContent = data.name;
  document.getElementById('rdArea').textContent = data.area;
  document.getElementById('rdDesc').textContent = data.desc;
  document.getElementById('rdTags').innerHTML = data.tags
    .map(t => `<div class="room-tag">${t}</div>`).join('');
}

// ── FLOOR TABS ──
function setFloor(idx, btn) {
  document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('floor-0').style.display = idx === 0 ? 'block' : 'none';
  document.getElementById('floor-1').style.display = idx === 1 ? 'block' : 'none';
  // Reset panel
  if (activeZone) activeZone.classList.remove('selected');
  activeRoom = null; activeZone = null;
  document.getElementById('roomPlaceholder').style.display = 'flex';
  document.getElementById('roomDetail').style.display = 'none';
}

// ── DRAWER ──
const menuBtn     = document.getElementById('menuBtn');
const drawer      = document.getElementById('drawer');
const overlay     = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');
const open  = () => { drawer.classList.add('open');    overlay.classList.add('show'); };
const close = () => { drawer.classList.remove('open'); overlay.classList.remove('show'); };
menuBtn.addEventListener('click', open);
drawerClose.addEventListener('click', close);
overlay.addEventListener('click', close);
document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
