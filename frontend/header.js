/**
 * Anviksha – Shared Site Header
 * Injected at the top of every page via <script src="header.js"></script>.
 * Automatically marks the active link based on the current filename.
 */
(function () {
    /* ── Styles ─────────────────────────────────────────────────────── */
    const css = `
    /* === Shared Site Header === */
    .site-header {
        position: sticky;
        top: 0;
        z-index: 500;
        width: 100%;
        background: rgba(253, 251, 247, 0.88);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(139, 175, 139, 0.22);
        box-shadow: 0 2px 16px rgba(44, 62, 80, 0.04);
        font-family: var(--font-sans, 'Inter', sans-serif);
    }

    .site-header__inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 2rem;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
    }

    /* Brand ---------------------------------------------------------- */
    .site-header__brand {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        text-decoration: none;
        color: #2C3E50;
        flex-shrink: 0;
    }

    .site-header__brand-icon {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8BAF8B, #CDE0CD);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        flex-shrink: 0;
        transition: transform 0.3s ease;
    }

    .site-header__brand:hover .site-header__brand-icon {
        transform: rotate(15deg) scale(1.08);
    }

    .site-header__brand-icon svg {
        width: 16px;
        height: 16px;
    }

    .site-header__brand-name {
        font-family: var(--font-serif, 'Merriweather', serif);
        font-size: 1.15rem;
        font-weight: 400;
        letter-spacing: 0.01em;
    }

    /* Nav links ------------------------------------------------------- */
    .site-header__nav {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .site-header__nav-link {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.4rem 0.85rem;
        border-radius: 9999px;
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        color: #9CA3AF;
        transition: color 0.2s ease, background 0.2s ease;
    }

    .site-header__nav-link:hover {
        color: #2C3E50;
        background: rgba(139, 175, 139, 0.12);
    }

    .site-header__nav-link.active {
        color: #8BAF8B;
        background: rgba(139, 175, 139, 0.14);
    }

    /* Animated underline for active link */
    .site-header__nav-link::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: calc(100% - 1.7rem);
        height: 2px;
        background: #8BAF8B;
        border-radius: 2px;
        transition: transform 0.25s ease;
    }

    .site-header__nav-link.active::after {
        transform: translateX(-50%) scaleX(1);
    }

    /* CTA button ------------------------------------------------------ */
    .site-header__cta {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 1.15rem;
        border-radius: 9999px;
        background: #8BAF8B;
        color: #fff;
        font-size: 0.82rem;
        font-weight: 600;
        text-decoration: none;
        letter-spacing: 0.02em;
        transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        white-space: nowrap;
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(139, 175, 139, 0.35);
    }

    .site-header__cta:hover {
        background: #7a9e7a;
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(139, 175, 139, 0.45);
    }

    /* Mobile hamburger ----------------------------------------------- */
    .site-header__hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 36px;
        height: 36px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        transition: background 0.2s;
    }

    .site-header__hamburger:hover {
        background: rgba(139, 175, 139, 0.12);
    }

    .site-header__hamburger span {
        display: block;
        height: 2px;
        background: #2C3E50;
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    .site-header__hamburger.open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }
    .site-header__hamburger.open span:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
    }
    .site-header__hamburger.open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }

    /* Mobile drawer -------------------------------------------------- */
    .site-header__mobile-menu {
        display: none;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.75rem 1.5rem 1rem;
        border-top: 1px solid rgba(139, 175, 139, 0.15);
        background: rgba(253, 251, 247, 0.97);
    }

    .site-header__mobile-menu.open {
        display: flex;
    }

    .site-header__mobile-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.65rem 0.75rem;
        border-radius: 10px;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        color: #9CA3AF;
        transition: color 0.2s, background 0.2s;
    }

    .site-header__mobile-link:hover,
    .site-header__mobile-link.active {
        color: #2C3E50;
        background: rgba(139, 175, 139, 0.1);
    }

    .site-header__mobile-link.active {
        color: #8BAF8B;
    }

    .site-header__mobile-cta {
        margin-top: 0.5rem;
        text-align: center;
        padding: 0.7rem;
        border-radius: 10px;
        background: #8BAF8B;
        color: #fff;
        font-size: 0.88rem;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;
    }

    .site-header__mobile-cta:hover {
        background: #7a9e7a;
    }

    /* Responsive ------------------------------------------------------ */
    @media (max-width: 680px) {
        .site-header__nav,
        .site-header__cta {
            display: none;
        }

        .site-header__hamburger {
            display: flex;
        }

        .site-header__inner {
            padding: 0 1.25rem;
        }
    }

    /* Push page content below the sticky header ----------------------- */
    body.has-site-header .page-wrapper,
    body.has-site-header .about-wrapper {
        /* header is 60px; the sticky positioning handles the rest */
    }
    `;

    /* ── Inject styles ────────────────────────────────────────────── */
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ── Nav items config ─────────────────────────────────────────── */
    const navItems = [
        { label: 'Home',     icon: '🏠', href: './index.html' },
        { label: 'About Us', icon: '✨', href: './about.html' },
    ];

    /* Detect active page by comparing the current filename */
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    function isActive(href) {
        const target = href.replace('./', '');
        return currentFile === target ||
               (currentFile === '' && target === 'index.html');
    }

    /* ── Build desktop nav items ─────────────────────────────────── */
    const navLinksHTML = navItems.map(item => `
        <li>
            <a href="${item.href}"
               class="site-header__nav-link ${isActive(item.href) ? 'active' : ''}"
               ${isActive(item.href) ? 'aria-current="page"' : ''}>
                <span>${item.icon}</span> ${item.label}
            </a>
        </li>
    `).join('');

    /* ── Build mobile drawer items ───────────────────────────────── */
    const mobileLinksHTML = navItems.map(item => `
        <a href="${item.href}"
           class="site-header__mobile-link ${isActive(item.href) ? 'active' : ''}"
           ${isActive(item.href) ? 'aria-current="page"' : ''}>
            <span>${item.icon}</span> ${item.label}
        </a>
    `).join('');

    /* ── Assemble full header HTML ───────────────────────────────── */
    const headerHTML = `
    <header class="site-header" id="siteHeader" role="banner">
        <div class="site-header__inner">
            <!-- Brand -->
            <a class="site-header__brand" href="./index.html" id="headerBrandLink" aria-label="Anviksha home">
                <div class="site-header__brand-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <span class="site-header__brand-name">Anviksha</span>
            </a>

            <!-- Desktop nav -->
            <nav aria-label="Primary navigation">
                <ul class="site-header__nav">
                    ${navLinksHTML}
                </ul>
            </nav>

            <!-- Desktop CTA -->
            <a href="./guidelines.html" class="site-header__cta" id="headerStartBtn">
                Start Interview →
            </a>

            <!-- Mobile hamburger -->
            <button class="site-header__hamburger" id="headerHamburger"
                    aria-label="Toggle navigation menu" aria-expanded="false"
                    aria-controls="headerMobileMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <!-- Mobile drawer -->
        <div class="site-header__mobile-menu" id="headerMobileMenu" role="navigation"
             aria-label="Mobile navigation">
            ${mobileLinksHTML}
            <a href="./guidelines.html" class="site-header__mobile-cta" id="headerMobileStartBtn">
                Start Interview →
            </a>
        </div>
    </header>
    `;

    /* ── Insert header as very first child of <body> ─────────────── */
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.classList.add('has-site-header');

    /* ── Hamburger toggle ────────────────────────────────────────── */
    const hamburger = document.getElementById('headerHamburger');
    const mobileMenu = document.getElementById('headerMobileMenu');

    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    /* Close drawer on outside click */
    document.addEventListener('click', (e) => {
        if (!document.getElementById('siteHeader').contains(e.target)) {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
})();
