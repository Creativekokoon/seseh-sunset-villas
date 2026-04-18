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

// ── ROOM SELECTION ──
const roomImg = document.getElementById('roomImg');
const visuals = document.querySelectorAll('.room-visual');

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
  const activeVisual = document.getElementById('visual-' + id);
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

// Show living room by default on load
window.addEventListener('load', () => {
  const livingZone = document.querySelector('.pzone.selected');
  if (livingZone) {
    const id = livingZone.getAttribute('onclick').match(/'(\w+)'/)[1];
    const visual = document.getElementById('visual-' + id);
    if (visual) { roomImg.classList.remove('empty'); visual.classList.add('visible'); }
  }
});
