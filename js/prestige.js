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

// Map plan zones to visual IDs
const visualMap = {
  // Ground floor
  kitchen:   'visual-kitchen',
  dining:    'visual-dining',
  living:    'visual-living',
  workspace: 'visual-workspace',
  terrace:   'visual-terrace',
  toilet:    'visual-toilet',
  // First floor
  bedroom1:  'visual-bedroom1',
  bedroom2:  'visual-bedroom2',
  bath1:     'visual-bath1',
  bath2:     'visual-bath2',
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

// ── VISITE VIRTUELLE ──
const VR_URL = 'https://showreel.d5render.com/personal-krpano?directory=https://usa.asset.d5cdn.com/tourProject/pano_roam_1777631813915_3226505/&tourId=2050163455791652866';
function openVR() {
  const modal = document.getElementById('vrModal');
  const frame = document.getElementById('vrFrame');
  frame.src = VR_URL;
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeVR() {
  const modal = document.getElementById('vrModal');
  const frame = document.getElementById('vrFrame');
  modal.classList.remove('visible');
  frame.src = '';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('vrModal').classList.contains('visible')) closeVR();
});
