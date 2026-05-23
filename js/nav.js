/**
 * nav.js — Shared navigation component
 * Include with: <div id="nav-root"></div><script src="../js/nav.js"></script>
 * For index.html (root level): <div id="nav-root"></div><script src="js/nav.js"></script>
 */

(function() {

  // ── Detect path depth to set correct relative links ──
  // depth     → racine de la langue courante (FR ou EN), pour les liens internes
  // assetRoot → racine du projet (pour assets/, css/, js/ partagés)
  const navPath = window.location.pathname;
  const navIsEn = /\/en(\/|$)/.test(navPath);
  const depth = navPath.includes('/pages/') ? '../' : '';
  const assetRoot = depth + (navIsEn ? '../' : '');

  // ── Translations ──
  const t = ({
    fr: {
      backHome: '← Accueil',
      backVillas: '← Les Villas',
      backDocuments: '← Documents',
      drawerHome: 'Accueil',
      drawerVillas: 'Explorer les villas',
      drawerSeseh: 'Vivre à Seseh',
      drawerDocuments: 'Documents',
      drawerTeam: 'Nos Équipes',
      drawerAvailable: 'Villas disponibles',
      drawerPrebook: 'Pré-réserver',
      chatEyebrow: 'Une question ?',
      chatTitle: 'Discuter avec Gabriel',
      langSwitchLabel: 'Sélecteur de langue',
      villaPrev: 'Villa précédente',
      villaNext: 'Villa suivante',
      menuLabel: 'Menu',
    },
    en: {
      backHome: '← Home',
      backVillas: '← The Villas',
      backDocuments: '← Documents',
      drawerHome: 'Home',
      drawerVillas: 'Explore the villas',
      drawerSeseh: 'Living in Seseh',
      drawerDocuments: 'Documents',
      drawerTeam: 'Our Team',
      drawerAvailable: 'Available villas',
      drawerPrebook: 'Pre-book',
      chatEyebrow: 'Got a question?',
      chatTitle: 'Chat with Gabriel',
      langSwitchLabel: 'Language selector',
      villaPrev: 'Previous villa',
      villaNext: 'Next villa',
      menuLabel: 'Menu',
    },
  })[navIsEn ? 'en' : 'fr'];

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
      color:#2A2420;background:#E8E4DC;
    }
    #site-topbar.nav-dark .nav-menu-btn:hover { background:#f0efec; }

    /* Cream variant (villas) */
    #site-topbar.nav-light {
      background:#E8E4DC;
    }
    #site-topbar.nav-light .nav-back,
    #site-topbar.nav-light .nav-brand {
      color:rgba(52,48,44,0.75);
    }
    #site-topbar.nav-light .nav-back:hover,
    #site-topbar.nav-light .nav-brand:hover { color:rgba(52,48,44,1); }
    #site-topbar.nav-light .nav-menu-btn {
      color:#E8E4DC;background:rgba(52,48,44,0.88);
    }
    #site-topbar.nav-light .nav-menu-btn:hover { background:rgba(36,34,32,1); }

    #site-topbar .nav-back {
      font-family:'Inter','Helvetica Neue',Arial,sans-serif;font-size:0.82rem;font-weight:500;
      letter-spacing:0.2em;text-transform:uppercase;
      text-decoration:none;transition:color 0.2s;min-width:120px;
    }
    #site-topbar .nav-brand {
      position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
      font-family:'the-seasons',Georgia,serif;font-size:1.08rem;
      font-weight:500;letter-spacing:0.12em;
      text-decoration:none;transition:color 0.2s;
      white-space:nowrap;
    }
    #site-topbar .nav-menu-btn {
      font-family:'Inter','Helvetica Neue',Arial,sans-serif;font-size:0.75rem;font-weight:400;
      letter-spacing:0.24em;text-transform:uppercase;
      border:none;padding:0 28px;height:40px;
      border-radius:0;cursor:pointer;transition:background 0.22s;
      min-width:120px;text-align:center;
      display:flex;align-items:center;justify-content:center;
    }

    /* ── Right cluster (lang switch + menu button) ── */
    .nav-right { display:flex;align-items:center;gap:14px; }

    /* ── Switch de langue (style texte minimal) ── */
    .lang-switch {
      display:inline-flex;align-items:center;gap:10px;
      font-size:11px;letter-spacing:0.2em;
      font-family:'Inter','Helvetica Neue',sans-serif;
      font-weight:500;
    }
    .lang-btn {
      background:transparent;border:none;
      color:rgba(255,255,255,0.4);
      cursor:pointer;padding:6px 4px;
      transition:color 0.25s ease;
      font-family:inherit;font-size:inherit;
      letter-spacing:inherit;font-weight:inherit;
    }
    .lang-btn.active {
      color:rgba(255,255,255,0.95);
      text-decoration:underline;
      text-underline-offset:4px;
      text-decoration-color:#b8a886;
      text-decoration-thickness:1px;
    }
    .lang-btn:not(.active):hover { color:rgba(255,255,255,0.7); }
    .lang-sep {
      color:rgba(255,255,255,0.25);
      font-size:11px;user-select:none;
    }
    /* Variante header clair (nav-light ou .header-light ancêtre) */
    #site-topbar.nav-light .lang-btn,
    .header-light .lang-btn { color:rgba(61,57,52,0.4); }
    #site-topbar.nav-light .lang-btn.active,
    .header-light .lang-btn.active {
      color:#3d3934;text-decoration-color:#b8a886;
    }
    #site-topbar.nav-light .lang-btn:not(.active):hover,
    .header-light .lang-btn:not(.active):hover { color:rgba(61,57,52,0.75); }
    #site-topbar.nav-light .lang-sep,
    .header-light .lang-sep { color:rgba(61,57,52,0.25); }

    /* Logo image — hidden on desktop, shown on mobile */
    .nav-brand-logo { display:none;height:52px;width:auto; }
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
    /* When open the drawer is cream — force dark lines */
    .nav-hamburger.open span { background:rgba(52,48,44,0.9) !important; }
    .nav-hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
    .nav-hamburger.open span:nth-child(2) { opacity:0; }
    .nav-hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

    /* Mobile full-screen dark drawer */
    @media (max-width:768px) {
      .nav-hamburger { display:flex; }
      #site-topbar .nav-menu-btn { display:none; }
      /* Right padding reserves space for the hamburger, reduce left for breadcrumbs */
      #site-topbar { padding-left:20px; padding-right:88px; justify-content:flex-start; }
      #site-topbar .nav-back { min-width:0; }
      /* Logo centred in the bar on all pages */
      #site-topbar .nav-brand { position:absolute;left:50%;top:50%;transform:translate(-50%,-50%); }
      .nav-brand-text { display:none; }
      .nav-brand-logo { display:block; }
      /* Keep lang switch on the right next to the hamburger */
      .nav-right { margin-left:auto; gap:0; }

      #nav-drawer {
        width:100% !important;
        background:#E8E4DC !important;
        border-left:none !important;
        padding:40px 32px !important;
      }
      .nav-drawer-title {
        font-size:1.6rem !important;
      }
      .nav-drawer-close { display:none !important; }
      .nav-drawer-top { margin-bottom:32px !important; }
      .nav-drawer-link {
        font-size:0.85rem !important;
        padding:22px 0 !important;
      }
    }
    @media (max-width:600px) {
      .lang-switch { font-size:10px;letter-spacing:0.18em;gap:8px; }
    }

    #nav-overlay {
      position:fixed;inset:0;z-index:600;
      background:rgba(20,16,12,0.22);
      opacity:0;pointer-events:none;transition:opacity 0.28s;
    }
    #nav-overlay.open { opacity:1;pointer-events:all; }

    #nav-drawer {
      position:fixed;top:0;right:0;bottom:0;width:min(440px,86vw);z-index:700;
      background:#E8E4DC;
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
      color:rgba(52,48,44,0.9);
    }
    .nav-drawer-close {
      width:36px;height:36px;background:rgba(80,60,40,0.08);
      border:1px solid rgba(80,60,40,0.18);border-radius:50%;
      color:rgba(52,48,44,0.75);font-size:0.9rem;cursor:pointer;
      display:flex;align-items:center;justify-content:center;transition:background 0.2s;
    }
    .nav-drawer-close:hover { background:rgba(80,60,40,0.15); }

    .nav-drawer-links { display:flex;flex-direction:column;flex:1; }
    .nav-drawer-link {
      display:flex;align-items:center;justify-content:space-between;
      padding:19px 0;border-bottom:1px solid rgba(80,60,40,0.10);
      text-decoration:none;color:rgba(52,48,44,0.85);
      font-family:'Inter','Helvetica Neue',Arial,sans-serif;
      font-size:0.92rem;font-weight:400;letter-spacing:0.22em;text-transform:uppercase;
      transition:color 0.22s,padding-left 0.22s;
    }
    .nav-drawer-link:hover { color:rgba(52,48,44,0.98);padding-left:6px; }
    .nav-drawer-arrow { opacity:0.25;font-weight:400;transition:opacity 0.22s,transform 0.22s; }
    .nav-drawer-link:hover .nav-drawer-arrow { opacity:0.75;transform:translateX(4px); }

    .nav-drawer-chat {
      display:flex;align-items:center;gap:12px;
      margin:-12px 0 14px;
      padding:16px 18px;
      background:#242220;
      border:1px solid rgba(201,168,106,0.4);
      border-radius:2px;
      text-decoration:none;
      color:rgba(249,245,239,0.95);
      transition:background 0.25s, border-color 0.25s, transform 0.25s;
      box-shadow:0 6px 18px rgba(36,32,28,0.18);
    }
    .nav-drawer-chat:hover {
      background:#2e2a26;
      border-color:#c8a86a;
      transform:translateY(-1px);
    }
    .nav-drawer-chat-icon {
      flex-shrink:0;
      width:34px;height:34px;border-radius:50%;
      background:rgba(201,168,106,0.18);
      border:1px solid rgba(201,168,106,0.55);
      color:#c8a86a;
      display:flex;align-items:center;justify-content:center;
    }
    .nav-drawer-chat-icon svg { width:18px;height:18px;display:block; }
    .nav-drawer-chat-label { flex:1;display:flex;flex-direction:column;gap:2px;min-width:0; }
    .nav-drawer-chat-eyebrow {
      font-family:'Inter','Helvetica Neue',Arial,sans-serif;
      font-size:0.7rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;
      color:#c8a86a;
    }
    .nav-drawer-chat-title {
      font-family:'the-seasons',Georgia,serif;
      font-size:1.15rem;font-weight:500;letter-spacing:0.04em;
      color:rgba(249,245,239,0.98);
      line-height:1.18;
    }
    .nav-drawer-chat-arrow {
      flex-shrink:0;color:#c8a86a;font-size:1rem;line-height:1;
      transition:transform 0.25s;
    }
    .nav-drawer-chat:hover .nav-drawer-chat-arrow { transform:translateX(3px); }

    .nav-drawer-footer {
      padding-top:20px;font-family:'Inter','Helvetica Neue',Arial,sans-serif;
      font-size:0.7rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;
      color:rgba(94,89,82,0.6);
      white-space:nowrap;
    }
    .nav-drawer-footer a { color:inherit;text-decoration:none; }
  `;
  document.head.appendChild(style);

  // ── Determine back link based on current page ──
  const path = window.location.pathname;
  let backHref = '';
  let backLabel = '';

  if (path.includes('villas.html')) {
    backHref = depth + 'index.html';
    backLabel = t.backHome;
  } else if (path.includes('prestige.html') || path.includes('elegance.html') ||
             path.includes('signature.html') || path.includes('exception.html')) {
    backHref = depth + 'pages/villas.html';
    backLabel = t.backVillas;
  } else if (path.includes('seseh.html') || path.includes('bali.html')) {
    backHref = depth + 'index.html';
    backLabel = t.backHome;
  } else if (path.includes('equipe.html')) {
    backHref = depth + 'index.html';
    backLabel = t.backHome;
  } else if (path.includes('documents.html')) {
    backHref = depth + 'index.html';
    backLabel = t.backHome;
  } else if (path.includes('galerie.html')) {
    backHref = depth + 'pages/documents.html';
    backLabel = t.backDocuments;
  } else {
    backHref = '';
    backLabel = '';
  }

  // ── Inject HTML ──
  const root = document.getElementById('nav-root');
  root.innerHTML = `
    <header id="site-topbar" class="nav-dark${backLabel ? ' has-back' : ''}">
      ${backLabel
        ? `<a class="nav-back" href="${backHref}">${backLabel}</a>`
        : `<div class="nav-back"></div>`
      }
      <a class="nav-brand" href="${depth}index.html">
        <span class="nav-brand-text">Seseh Sunset Villas</span>
        <img class="nav-brand-logo" src="${assetRoot}assets/logos/SS%20logo.png" alt="Seseh Sunset Villas">
      </a>
      <div class="nav-right">
        <div class="lang-switch" role="group" aria-label="${t.langSwitchLabel}">
          <button class="lang-btn${navIsEn ? '' : ' active'}" data-lang="fr"${navIsEn ? '' : ' aria-current="true"'}>FR</button>
          <span class="lang-sep">/</span>
          <button class="lang-btn${navIsEn ? ' active' : ''}" data-lang="en"${navIsEn ? ' aria-current="true"' : ''}>EN</button>
        </div>
        <button class="nav-menu-btn" id="nav-menu-btn">${t.menuLabel}</button>
      </div>
    </header>

    <div id="nav-overlay"></div>

    <aside id="nav-drawer">
      <div class="nav-drawer-top">
        <div class="nav-drawer-title">Seseh Sunset Villas</div>
        <button class="nav-drawer-close" id="nav-drawer-close">✕</button>
      </div>
      <nav class="nav-drawer-links">
        <a class="nav-drawer-link" href="${depth}index.html">
          ${t.drawerHome} <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/villas.html">
          ${t.drawerVillas} <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/seseh.html">
          ${t.drawerSeseh} <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="https://canva.link/pktkwf7mjekfmge" target="_blank" rel="noopener noreferrer">
          ${t.drawerAvailable} <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/documents.html">
          ${t.drawerDocuments} <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="${depth}pages/equipe.html">
          ${t.drawerTeam} <span class="nav-drawer-arrow">→</span>
        </a>
        <a class="nav-drawer-link" href="https://bit.ly/sora-immobilier" target="_blank" rel="noopener">
          ${t.drawerPrebook} <span class="nav-drawer-arrow">→</span>
        </a>
      </nav>
      <a class="nav-drawer-chat" href="https://wa.me/message/U6SAMFGVWDQDO1" target="_blank" rel="noopener">
        <span class="nav-drawer-chat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </span>
        <span class="nav-drawer-chat-label">
          <span class="nav-drawer-chat-eyebrow">${t.chatEyebrow}</span>
          <span class="nav-drawer-chat-title">${t.chatTitle}</span>
        </span>
        <span class="nav-drawer-chat-arrow">→</span>
      </a>
      <div class="nav-drawer-footer">© 2026 Sora Immobilier | <a href="https://sora-immobilier.com/" target="_blank">sora-immobilier.com</a></div>
    </aside>

    <button class="nav-hamburger" id="nav-hamburger" aria-label="${t.menuLabel}">
      <span></span><span></span><span></span>
    </button>
  `;

  // ── Topbar reference (class preset in template to avoid load-flash) ──
  const topbar = document.getElementById('site-topbar');

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

  // ── Switch FR / EN — détection auto de la langue courante ──
  (function() {
    const isEn = /\/en(\/|$)/.test(window.location.pathname);
    const activeLang = isEn ? 'en' : 'fr';

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
      if (btn.dataset.lang === activeLang) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
      }
    });

    document.documentElement.lang = activeLang;
  })();

  // ── Switch FR / EN — redirection ──
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.dataset.lang;
      const currentPath = window.location.pathname;
      const isCurrentlyEn = /\/en(\/|$)/.test(currentPath);

      let targetPath;

      if (targetLang === 'en' && !isCurrentlyEn) {
        // FR → EN : insérer /en/ avant le segment de page (préfixe projet préservé)
        if (currentPath.includes('/pages/')) {
          targetPath = currentPath.replace('/pages/', '/en/pages/');
        } else if (/\/index\.html$/.test(currentPath)) {
          targetPath = currentPath.replace(/\/index\.html$/, '/en/index.html');
        } else if (currentPath.endsWith('/')) {
          targetPath = currentPath + 'en/index.html';
        } else {
          targetPath = currentPath + '/en/index.html';
        }
      } else if (targetLang === 'fr' && isCurrentlyEn) {
        // EN → FR : retirer /en/ tout en gardant le préfixe projet
        if (currentPath.includes('/en/pages/')) {
          targetPath = currentPath.replace('/en/pages/', '/pages/');
        } else if (/\/en\/index\.html$/.test(currentPath)) {
          targetPath = currentPath.replace(/\/en\/index\.html$/, '/index.html');
        } else {
          targetPath = currentPath.replace(/\/en\/?$/, '/');
        }
      } else {
        return;
      }

      window.location.href = targetPath + window.location.search + window.location.hash;
    });
  });

  // ── Villa-to-villa prev/next arrows ──
  const villaOrder = ['elegance', 'prestige', 'signature', 'exception'];
  const villaLabels = {
    elegance: 'Élégance',
    prestige: 'Prestige',
    signature: 'Signature',
    exception: 'Exception',
  };
  const currentVilla = villaOrder.find(v => path.includes(v + '.html'));
  if (currentVilla) {
    const idx = villaOrder.indexOf(currentVilla);
    const prev = villaOrder[(idx - 1 + villaOrder.length) % villaOrder.length];
    const next = villaOrder[(idx + 1) % villaOrder.length];
    const arrowsCSS = `
      .villa-nav-arrow,
      .villa-nav-arrow:visited,
      .villa-nav-arrow:active {
        position:fixed; bottom:28px; z-index:15;
        display:flex; align-items:center; gap:12px;
        text-decoration:none;
        font-family:'the-seasons',Georgia,serif;
        font-size:1.05rem; font-weight:600; letter-spacing:0.08em;
        color:rgba(52,48,44,0.88);
        transition:color 0.25s, transform 0.25s;
      }
      .villa-nav-prev { left:28px; }
      .villa-nav-next { right:28px; }
      .van-arrow {
        width:36px; height:36px;
        border:1px solid rgba(52,48,44,0.4);
        border-radius:50%;
        display:flex; align-items:center; justify-content:center;
        color:rgba(52,48,44,0.78);
        background:transparent;
        transition:border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s;
      }
      .van-arrow svg { width:20px; height:20px; display:block; }
      .villa-nav-arrow:hover { color:rgba(52,48,44,0.98); }
      .villa-nav-arrow:hover .van-arrow {
        border-color:#c8a86a;
        color:#c8a86a;
      }
      .villa-nav-prev:hover .van-arrow { transform:translateX(-2px); }
      .villa-nav-next:hover .van-arrow { transform:translateX(2px); }
      @media (max-width:600px) {
        .villa-nav-arrow { bottom:18px; gap:8px; font-size:0.76rem; }
        .villa-nav-prev { left:16px; }
        .villa-nav-next { right:16px; }
        .van-arrow { width:32px; height:32px; }
        .van-arrow svg { width:17px; height:17px; }
        .van-label { display:none; }
      }
    `;
    const styleEl = document.createElement('style');
    styleEl.textContent = arrowsCSS;
    document.head.appendChild(styleEl);
    const arrowsHTML = `
      <a class="villa-nav-arrow villa-nav-prev" href="${depth}pages/${prev}.html" aria-label="${t.villaPrev}: ${villaLabels[prev]}">
        <span class="van-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="20" y1="12" x2="4" y2="12"/>
            <polyline points="8 7 4 12 8 17"/>
          </svg>
        </span>
        <span class="van-label">${villaLabels[prev]}</span>
      </a>
      <a class="villa-nav-arrow villa-nav-next" href="${depth}pages/${next}.html" aria-label="${t.villaNext}: ${villaLabels[next]}">
        <span class="van-label">${villaLabels[next]}</span>
        <span class="van-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"/>
            <polyline points="16 7 20 12 16 17"/>
          </svg>
        </span>
      </a>
    `;
    document.body.insertAdjacentHTML('beforeend', arrowsHTML);
  }

})();
