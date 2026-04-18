const rooms = {
  living:   { bg:'linear-gradient(135deg,#3A3028,#2C2420,#4A3C30)' },
  pool:     { bg:'linear-gradient(135deg,#1A2A32,#1E3040,#142028)' },
  terrace:  { bg:'linear-gradient(135deg,#2A2C22,#363C28,#1E2016)' },
  bedroom1: { bg:'linear-gradient(135deg,#2C2820,#3A3428,#221E16)' },
  bedroom2: { bg:'linear-gradient(135deg,#28261C,#343020,#1E1C14)' },
  bath1:    { bg:'linear-gradient(135deg,#1C2030,#242838,#141820)' },
  bath2:    { bg:'linear-gradient(135deg,#201E2E,#2A2838,#181620)' },
  balcony:  { bg:'linear-gradient(135deg,#222220,#2E2C28,#1A1818)' },
};

let sel = null;

// Cursor
const tip = document.getElementById('cursorTip');
document.addEventListener('mousemove', e => {
  tip.style.left = e.clientX + 'px';
  tip.style.top  = e.clientY + 'px';
});
document.querySelectorAll('.pzone').forEach(z => {
  z.addEventListener('mouseenter', () => tip.classList.add('visible'));
  z.addEventListener('mouseleave', () => tip.classList.remove('visible'));
});

function selectRoom(id, zone) {
  if (sel) sel.classList.remove('selected');
  sel = zone;
  zone.classList.add('selected');

  const d = rooms[id];
  if (!d) return;

  const img = document.getElementById('roomImage');
  img.style.background = d.bg + ' center/cover';
  document.getElementById('imgPlaceholder').classList.add('hidden');
}

function setFloor(idx, btn) {
  document.querySelectorAll('.floor-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('floor-0').style.display = idx === 0 ? 'block' : 'none';
  document.getElementById('floor-1').style.display = idx === 1 ? 'block' : 'none';
  if (sel) sel.classList.remove('selected');
  sel = null;
}