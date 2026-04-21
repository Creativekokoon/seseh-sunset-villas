/**
 * nav.js — Shared navigation component
 * Include with: <div id="nav-root"></div><script src="../js/nav.js"></script>
 * For index.html (root level): <div id="nav-root"></div><script src="js/nav.js"></script>
 */

(function() {

  // ── Detect path depth to set correct relative links ──
  const depth = window.location.pathname.includes('/pages/') ? '../' : '';

  // ── Inject CSS ──
  const style = document.createElement('style');
  style.textContent = `
    #site-topbar {
      position:fixed;top:0;left:0;right:0;z-index:500;height:76px;
      display:flex;justify-content:space-between;align-items:center;padding:0 44px;
    }
    /* Charcoal variant (index + prestige) */
    #site-topbar.nav-dark {
      background:rgba(36,34,32,0.94);
    }
    #site-topbar.nav-dark .nav-back,
    #site-topbar.nav-dark .nav-brand {
      color:rgba(255,252,248,0.72);
    }
    #site-topbar.nav-dark .nav-back:hover,
    #site-topbar.nav-dark .nav-brand:hover { color:rgba(255,252,248,0.95); }
    #site-topbar.nav-dark .nav-menu-btn {
      color:#2A2420;background:#F0EAE0;
    }
    #site-topbar.nav-dark .nav-menu-btn:hover { background:#f0efec; }

    /* Cream variant (villas) */
    #site-topbar.nav-light {
      background:#F0EAE0;
    }
    #site-topbar.nav-light .nav-back,
    #site-topbar.nav-light .nav-brand {
      color:rgba(52,48,44,0.75);
    }
    #site-topbar.nav-light .nav-back:hover,
    #site-topbar.nav-light .nav-brand:hover { color:rgba(52,48,44,1); }
    #site-topbar.nav-light .nav-menu-btn {
      color:#F0EAE0;background:rgba(52,48,44,0.88);
    }
    #site-topbar.nav-light .nav-menu-btn:hover { background:rgba(36,34,32,1); }

    #site-topbar .nav-back {
      font-family:'Helvetica Neue',Arial,sans-serif;font-size:0.82rem;font-weight:500;
      letter-spacing:0.2em;text-transform:uppercase;
      text-decoration:none;transition:color 0.2s;min-width:120px;
    }
    #site-topbar .nav-brand {
      font-family:'the-seasons',Georgia,serif;font-size:1.08rem;
      font-weight:500;letter-spacing:0.12em;
      text-decoration:none;transition:color 0.2s;
    }
    #site-topbar .nav-menu-btn {
      font-family:'Helvetica Neue',Arial,sans-serif;font-size:0.75rem;font-weight:400;
      letter-spacing:0.24em;text-transform:uppercase;
      border:none;padding:0 28px;height:40px;
      border-radius:0;cursor:pointer;transition:background 0.22s;
      min-width:120px;text-align:center;
      display:flex;align-items:center;justify-content:center;
    }

    /* Logo image — hidden on desktop, shown on mobile */
    .nav-brand-logo { display:none;height:44px;width:auto; }
    .nav-brand-text { }

    /* Hamburger — fixed above everything, visible on mobile only */
    .nav-hamburger {
      display:none;
      position:fixed;top:18px;right:44px;z-index:800;
      flex-direction:column;justify-content:center;align-items:center;
      gap:5px;width:40px;height:40px;
      background:none;border:none;cursor:pointer;padding:0;
    }
    .nav-hamburger span {
      display:block;width:22px;height:1.5px;
      background:rgba(255,252,248,0.85);
      transition:transform 0.3s ease,opacity 0.3s ease,background 0.2s;
    }
    /* Villas page has a light nav — dark lines */
    .nav-hamburger--light span { background:rgba(52,48,44,0.85); }
    /* When open the drawer is always dark — force white */
    .nav-hamburger.open span { background:rgba(255,252,248,0.9) !important; }
    .nav-hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
    .nav-hamburger.open span:nth-child(2) { opacity:0; }
    .nav-hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

    /* Mobile full-screen dark drawer */
    @media (max-width:768px) {
      .nav-hamburger { display:flex; }
      #site-topbar .nav-menu-btn { display:none; }
      /* Right padding reserves space for the hamburger */
      #site-topbar { padding-right:88px; justify-content:flex-start; }
      #site-topbar .nav-back { min-width:0; }
      /* Logo centred in the bar on all pages */
      #site-topbar .nav-brand { position:absolute;left:50%;top:50%;transform:translate(-50%,-50%); }
      .nav-brand-text { display:none; }
      .nav-brand-logo { display:block; }

      #nav-drawer {
        width:100% !important;
        background:rgba(36,34,32,1) !important;
        border-left:none !important;
        padding:40px 32px !important;
      }
      .nav-drawer-title {
        color:rgba(255,252,248,0.85) !important;
        font-size:1.6rem !important;
      }
      .nav-drawer-close { display:none !important; }
      .nav-drawer-top { margin-bottom:32px !important; }
      .nav-drawer-link {
        color:rgba(255,252,248,0.65) !important;
        border-bottom-color:rgba(255,255,255,0.08) !important;
        font-size:0.85rem !important;
        padding:22px 0 !important;
      }
      .nav-drawer-link:hover { color:rgba(255,252,248,0.98) !important; }
      .nav-drawer-footer {
        color:rgba(255,252,248,0.28) !important;
      }
    }

    #nav-overlay {
      position:fixed;inset:0;z-index:600;
      background:rgba(20,16,12,0.22);
      opacity:0;pointer-events:none;transition:opacity 0.28s;
    }
    #nav-overlay.open { opacity:1;pointer-events:all; }

    #nav-drawer {
      position:fixed;top:0;right:0;bottom:0;width:min(340px,72vw);z-index:700;
      background:#F0EAE0;
      border-left:1px solid rgba(160,155,148,0.25);
      transform:translateX(100%);transition:transform 0.3s ease;
      display:flex;flex-direction:column;padding:32px 28px;
    }
    #nav-drawer.open { transform:translateX(0); }

    .nav-drawer-top {
      display:flex;justify-content:space-between;align-items:center;margin-bottom:48px;
    }
    .nav-drawer-title {
      font-family:'the-seasons',Georgia,serif;font-size:1.4rem;font-weight:500;
      color:rgba(30,22,14,0.85);
    }
    .nav-drawer-close {
      width:36px;height:36px;background:rgba(80,60,40,0.08);
      border:1px solid rgba(80,60,40,0.18);border-radius:50%;
      color:rgba(30,22,14,0.65);font-size:0.9rem;cursor:pointer;
      display:flex;align-items:center;justify-content:center;transition:background 0.2s;
    }
    .nav-drawer-close:hover { background:rgba(80,60,40,0.15); }

    .nav-drawer-links { display:flex;flex-direction:column;flex:1; }
    .nav-drawer-link {
      display:flex;align-items:center;justify-content:space-between;
      padding:19px 0;border-bottom:1px solid rgba(80,60,40,0.10);
      text-decoration:none;color:rgba(30,22,14,0.75);
      font-family:'Helvetica Neue',Arial,sans-serif;
      font-size:0.72rem;font-weight:400;letter-spacing:0.22em;text-transform:uppercase;
      transition:color 0.22s,padding-left 0.22s;
    }
    .nav-drawer-link:hover { color:rgba(30,22,14,0.95);padding-left:6px; }
    .nav-drawer-arrow { opacity:0.25;font-weight:400;transition:opacity 0.22s,transform 0.22s; }
    .nav-drawer-link:hover .nav-drawer-arrow { opacity:0.75;transform:translateX(4px); }

    .nav-drawer-footer {
      padding-top:20px;font-family:'Helvetica Neue',Arial,sans-serif;
      font-size:0.56rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;
      color:rgba(30,22,14,0.5);
    }
  `;
  document.head.appendChild(style);

  // ── Determine back link based on current page ──
  const path = window.location.pathname;
  let backHref = '';
  let backLabel = '';

  if (path.includes('villas.html')) {
    backHref = depth + 'index.html';
    backLabel = '← Accueil';
  } else if (path.includes('prestige.html') || path.includes('elegance.html') ||
             path.includes('signature.html') || path.includes('exception.html')) {
    backHref = depth + 'pages/villas.html';
    backLabel = '← Les Villas';
  } else if (path.includes('bali.html')) {
    backHref = depth + 'index.html';
    backLabel = '← Accueil';
  } else {
    backHref = '';
    backLabel = '';
  }

  // ── Inject HTML ──
  const root = document.getElementById('nav-root');
  root.innerHTML = `
    <header id="site-topbar">
      ${backLabel
        ? `<a class="nav-back" href="${backHref}">${backLabel}</a>`
        : `<div class="nav-back"></div>`
      }
      <a class="nav-brand" href="${depth}index.html">
        <span class="nav-brand-text">Seseh Sunset Villas</span>
        <img class="nav-brand-logo" src="${depth}assets/logos/SS%20logo.png" alt="Seseh Sunset Villas">
      </a>
      <button class="nav-menu-btn" id="nav-menu-btn">Menu</button>
    </header>

    <div id="nav-overlay"></div>

    <aside id="nav-drawer">
      <div class="nav-drawer-top">
        <div class="nav-drawer-title">Seseh Sunset Villas</div>
        <button class="nav-drawer-close" id="nav-drawer-close">✕</button>
      </div>
      <nav class="nav-drawer-links">
        <a class="nav-drawer-link" href="${depth}index.html">
          Accueil <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/villas.html">
          Explorer les villas <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/bali.html">
          Explorer Bali <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="#">
          Pré-réserver <span class="nav-drawer-arrow">→</span>
        </a>
      </nav>
      <div class="nav-drawer-footer"><div>© 2026 Sora Immobilier</div><a href="https://sora-immobilier.fr" style="color:inherit;text-decoration:none;white-space:nowrap;display:block;margin-top:3px;" target="_blank">sora-immobilier.fr</a></div>
    </aside>

    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;

  // ── Apply nav colour theme — always dark ──
  const topbar = document.getElementById('site-topbar');
  topbar.classList.add('nav-dark');
  if (backLabel) topbar.classList.add('has-back');

  // ── Logic ──
  const overlay    = document.getElementById('nav-overlay');
  const drawer     = document.getElementById('nav-drawer');
  const menuBtn    = document.getElementById('nav-menu-btn');
  const closeBtn   = document.getElementById('nav-drawer-close');
  const hamburger  = document.getElementById('nav-hamburger');


  function openNav()  {
    drawer.classList.add('open');
    overlay.classList.add('open');
    if (hamburger) hamburger.classList.add('open');
  }
  function closeNav() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  }

  menuBtn.addEventListener('click', openNav);
  if (hamburger) hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeNav() : openNav();
  });
  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

})();
