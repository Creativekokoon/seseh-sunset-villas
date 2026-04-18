// ── CURSOR ──
const tip = document.getElementById('tip');
document.addEventListener('mousemove', e => {
  tip.style.left = e.clientX + 'px';
  tip.style.top  = e.clientY + 'px';
});
document.querySelectorAll('.pzone').forEach(z => {
  z.addEventListener('mouseenter', () => tip.classList.add('visible'));
  z.addEventListener('mouseleave', () => tip.classList.remove('visible'));
});

// ── ROOM VISUALS MAP ──
const roomImg = document.getElementById('roomImg');
const visuals = document.querySelectorAll('.room-visual');

// Map plan zones to visual IDs (some share same visual)
const visualMap = {
  living:   'visual-living',
  kitchen:  'visual-living',
  storage:  'visual-living',
  powder:   'visual-bath1',
  stairs:   'visual-living',
  parking:  'visual-terrace',
  garden:   'visual-terrace',
  terrace:  'visual-terrace',
  pooldeck: 'visual-pool',
  pool:     'visual-pool',
  bedroom1: 'visual-bedroom1',
  bedroom2: 'visual-bedroom2',
  bath1:    'visual-bath1',
  bath2:    'visual-bath2',
  balcony:  'visual-balcony',
};

function hideAllVisuals() {
  visuals.forEach(v => v.classList.remove('visible'));
}
function clearSelections() {
  document.querySelectorAll('.pzone').forEach(z => z.classList.remove('selected'));
}

function pick(id, zone) {
  clearSelections();
  zone.classList.add('selected');
  hideAllVisuals();
  const targetId = visualMap[id] || ('visual-' + id);
  const activeVisual = document.getElementById(targetId);
  if (activeVisual) {
    roomImg.classList.remove('empty');
    activeVisual.classList.add('visible');
  }
}

// ── FLOOR SWITCH ──
function setFloor(idx, btn) {
  document.querySelectorAll('.floor-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('f0').style.display = idx === 0 ? 'block' : 'none';
  document.getElementById('f1').style.display = idx === 1 ? 'block' : 'none';
  clearSelections();
  hideAllVisuals();
  roomImg.classList.add('empty');
}

// Show living room by default
window.addEventListener('load', () => {
  const first = document.querySelector('#f0 .pzone.selected');
  if (first) {
    const visual = document.getElementById('visual-living');
    if (visual) { roomImg.classList.remove('empty'); visual.classList.add('visible'); }
  }
});
