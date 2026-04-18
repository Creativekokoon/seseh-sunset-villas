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
      position:fixed;top:0;left:0;right:0;z-index:500;height:64px;
      display:flex;justify-content:space-between;align-items:center;padding:0 40px;
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
      color:#2A2420;background:#E8E8E6;
    }
    #site-topbar.nav-dark .nav-menu-btn:hover { background:#f0efec; }

    /* Grey variant (villas) */
    #site-topbar.nav-light {
      background:#E8E8E6;
    }
    #site-topbar.nav-light .nav-back,
    #site-topbar.nav-light .nav-brand {
      color:rgba(52,48,44,0.75);
    }
    #site-topbar.nav-light .nav-back:hover,
    #site-topbar.nav-light .nav-brand:hover { color:rgba(52,48,44,1); }
    #site-topbar.nav-light .nav-menu-btn {
      color:#E8E8E6;background:rgba(52,48,44,0.88);
    }
    #site-topbar.nav-light .nav-menu-btn:hover { background:rgba(36,34,32,1); }

    #site-topbar .nav-back {
      font-family:'Helvetica Neue',Arial,sans-serif;font-size:0.72rem;
      letter-spacing:0.22em;text-transform:uppercase;
      text-decoration:none;transition:color 0.2s;min-width:120px;
    }
    #site-topbar .nav-brand {
      font-family:'the-seasons',Georgia,serif;font-size:1rem;
      font-weight:500;letter-spacing:0.12em;
      text-decoration:none;transition:color 0.2s;
    }
    #site-topbar .nav-menu-btn {
      font-family:'Helvetica Neue',Arial,sans-serif;font-size:0.68rem;
      letter-spacing:0.2em;text-transform:uppercase;
      border:none;padding:0 24px;height:36px;
      border-radius:30px;cursor:pointer;transition:background 0.22s;
      min-width:120px;text-align:center;
      display:flex;align-items:center;justify-content:center;
    }

    #nav-overlay {
      position:fixed;inset:0;z-index:600;
      background:rgba(20,16,12,0.22);
      opacity:0;pointer-events:none;transition:opacity 0.28s;
    }
    #nav-overlay.open { opacity:1;pointer-events:all; }

    #nav-drawer {
      position:fixed;top:0;right:0;bottom:0;width:min(340px,72vw);z-index:700;
      background:#E8E8E6;
      border-left:1px solid rgba(160,155,148,0.25);
      transform:translateX(100%);transition:transform 0.3s ease;
      display:flex;flex-direction:column;padding:32px 28px;
    }
    #nav-drawer.open { transform:translateX(0); }

    .nav-drawer-top {
      display:flex;justify-content:space-between;align-items:center;margin-bottom:48px;
    }
    .nav-drawer-title {
      font-family:'the-seasons',Georgia,serif;font-size:1.4rem;font-weight:300;
      color:rgba(30,22,14,0.75);
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
      text-decoration:none;color:rgba(30,22,14,0.65);
      font-family:'Helvetica Neue',Arial,sans-serif;
      font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;
      transition:color 0.22s,padding-left 0.22s;
    }
    .nav-drawer-link:hover { color:rgba(30,22,14,0.95);padding-left:6px; }
    .nav-drawer-arrow { opacity:0.25;transition:opacity 0.22s,transform 0.22s; }
    .nav-drawer-link:hover .nav-drawer-arrow { opacity:0.75;transform:translateX(4px); }

    .nav-drawer-footer {
      padding-top:20px;font-family:'Helvetica Neue',Arial,sans-serif;
      font-size:0.56rem;letter-spacing:0.2em;text-transform:uppercase;
      color:rgba(30,22,14,0.28);
    }
  `;
  document.head.appendChild(style);

  // ── Determine back link based on current page ──
  const path = window.location.pathname;
  let backHref = '';
  let backLabel = '';

  if (path.includes('villas.html') && !path.includes('bali.html')) {
    backHref = depth + 'index.html';
    backLabel = '← Accueil';
  } else if (path.includes('prestige.html') || path.includes('elegance.html') ||
             path.includes('signature.html') || path.includes('exception.html')) {
    backHref = depth + 'pages/villas.html';
    backLabel = '← Les Villas';
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
      <a class="nav-brand" href="${depth}index.html">Seseh Sunset Villas</a>
      <button class="nav-menu-btn" id="nav-menu-btn">Menu</button>
    </header>

    <div id="nav-overlay"></div>

    <aside id="nav-drawer">
      <div class="nav-drawer-top">
        <div class="nav-drawer-title">Seseh</div>
        <button class="nav-drawer-close" id="nav-drawer-close">✕</button>
      </div>
      <nav class="nav-drawer-links">
        <a class="nav-drawer-link" href="${depth}index.html">
          Accueil <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/villas.html">
          Explorer les villas <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/elegance.html">
          Élégance <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/prestige.html">
          Prestige <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/signature.html">
          Signature <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/exception.html">
          Exception <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/bali.html">
          Explorer Bali <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="#">
          Pré-réserver <span class="nav-drawer-arrow">→</span>
        </a>
      </nav>
      <div class="nav-drawer-footer">© 2026 Sora Immobilier · sora-immobilier.fr</div>
    </aside>
  `;

  // ── Apply nav colour theme based on page ──
  const topbar = document.getElementById('site-topbar');
  if (path.includes('villas.html') && !path.includes('bali.html')) {
    topbar.classList.add('nav-light');
  } else if (path.includes('bali.html')) {
    topbar.classList.add('nav-dark');
  } else {
    topbar.classList.add('nav-dark');
  }

  // ── Logic ──
  const overlay    = document.getElementById('nav-overlay');
  const drawer     = document.getElementById('nav-drawer');
  const menuBtn    = document.getElementById('nav-menu-btn');
  const closeBtn   = document.getElementById('nav-drawer-close');

  function openNav()  { drawer.classList.add('open');    overlay.classList.add('open'); }
  function closeNav() { drawer.classList.remove('open'); overlay.classList.remove('open'); }

  menuBtn.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });


  // ── Back/forward browser navigation — fade transition ──
  // Push a state so we can intercept the back button
  history.pushState({ page: window.location.href }, '', window.location.href);

  window.addEventListener('popstate', (e) => {
    // Create fade cover
    const fade = document.createElement('div');
    fade.style.cssText = 'position:fixed;inset:0;z-index:5000;background:#0E0B08;opacity:0;transition:opacity 0.45s ease;pointer-events:all;';
    document.body.appendChild(fade);

    // Fade body out
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      fade.style.opacity = '1';
    }));

    // Navigate back after fade
    setTimeout(() => {
      history.back();
    }, 460);
  });

})();
