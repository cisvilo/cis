@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700&display=swap");

:root {
    --navy-950: #02070b;
    --navy-900: #050d13;
    --navy-850: #07131c;
    --navy-800: #0a1924;
    --navy-750: #0d2230;

    --red-dark: #8f1626;
    --red: #b82032;
    --red-light: #ed5262;
    --red-soft: rgba(184, 32, 50, .18);

    --white: #ffffff;
    --text: #f4f7f9;
    --muted: #a3b0ba;
    --line: rgba(255,255,255,.10);

    --glass: rgba(255,255,255,.045);
    --glass-strong: rgba(255,255,255,.075);
    --glass-border: rgba(255,255,255,.13);
    --glass-blur: blur(18px) saturate(150%);
    --glass-shadow:
        0 18px 50px rgba(0,0,0,.35),
        inset 0 1px 0 rgba(255,255,255,.14),
        inset 0 0 0 1px rgba(255,255,255,.02);

    --font-display: "Sora", "Manrope", sans-serif;
    --font-body: "Manrope", "Inter", sans-serif;

    --shadow: 0 22px 60px rgba(0,0,0,.30);
    --radius: 18px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: auto !important; }

body {
    min-height: 100vh;
    background: var(--navy-950);
    color: var(--text);
    font-family: var(--font-body);
    line-height: 1.55;
    overflow-x: hidden;
    scroll-behavior: auto !important;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}

body.menu-open { overflow: hidden; }

a { color: inherit; text-decoration: none; }
button { font: inherit; }
img { max-width: 100%; display: block; }

/* =========================================================
   FLAMMES — ARRIÈRE-PLAN FIXE RÉPARTI SUR TOUTE LA PAGE
========================================================= */

/* Lueurs ambiantes réparties */
body::before {
    content: "";
    position: fixed;
    inset: -10%;
    z-index: 0;
    pointer-events: none;
    background:
        radial-gradient(ellipse 38% 34% at 8% 18%,  rgba(237,82,98,.20), transparent 70%),
        radial-gradient(ellipse 34% 30% at 92% 30%, rgba(255,112,46,.15), transparent 70%),
        radial-gradient(ellipse 40% 34% at 18% 62%, rgba(184,32,50,.18), transparent 70%),
        radial-gradient(ellipse 36% 32% at 84% 76%, rgba(255,112,46,.16), transparent 70%),
        radial-gradient(ellipse 50% 30% at 50% 100%, rgba(237,82,98,.22), transparent 72%);
    translate: 0 calc(var(--scroll-p, 0) * -7vh);
    filter: blur(30px);
    animation: ambientDrift 14s ease-in-out infinite alternate;
    will-change: transform, opacity;
}

/* Langues de flammes sur toute la largeur */
body::after {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    bottom: -60px;
    height: calc(46vh + var(--flame-grow, 0px));
    z-index: 0;
    pointer-events: none;
    background:
        radial-gradient(ellipse 3.5% 70%  at 4%  100%, rgba(255,150,70,.65), rgba(237,82,98,.30) 40%, transparent 72%),
        radial-gradient(ellipse 4%   95%  at 12% 100%, rgba(237,82,98,.62), rgba(184,32,50,.28) 40%, transparent 72%),
        radial-gradient(ellipse 4%   80%  at 21% 100%, rgba(255,130,55,.60), rgba(184,32,50,.26) 40%, transparent 72%),
        radial-gradient(ellipse 3.5% 105% at 30% 100%, rgba(237,82,98,.62), rgba(184,32,50,.28) 40%, transparent 72%),
        radial-gradient(ellipse 4%   78%  at 40% 100%, rgba(255,130,55,.58), rgba(184,32,50,.26) 40%, transparent 72%),
        radial-gradient(ellipse 4%   100% at 50% 100%, rgba(237,82,98,.64), rgba(184,32,50,.28) 40%, transparent 72%),
        radial-gradient(ellipse 3.5% 82%  at 60% 100%, rgba(255,130,55,.58), rgba(184,32,50,.26) 40%, transparent 72%),
        radial-gradient(ellipse 4%   108% at 70% 100%, rgba(237,82,98,.62), rgba(184,32,50,.28) 40%, transparent 72%),
        radial-gradient(ellipse 4%   84%  at 80% 100%, rgba(255,130,55,.58), rgba(184,32,50,.26) 40%, transparent 72%),
        radial-gradient(ellipse 3.5% 98%  at 89% 100%, rgba(237,82,98,.62), rgba(184,32,50,.28) 40%, transparent 72%),
        radial-gradient(ellipse 3.5% 74%  at 97% 100%, rgba(255,150,70,.60), rgba(237,82,98,.28) 40%, transparent 72%);
    filter: blur(10px);
    opacity: .85;
    animation: flameTongues 3.4s ease-in-out infinite alternate;
    will-change: transform, opacity;
}

@keyframes ambientDrift {
    0%   { transform: translate3d(-1.5%, 1%, 0) scale(1);    opacity: .75; }
    100% { transform: translate3d(1.5%, -1%, 0) scale(1.06); opacity: 1; }
}

@keyframes flameTongues {
    0%   { transform: translateY(10px) scaleY(.82); opacity: .62; }
    50%  { transform: translateY(-4px) scaleY(1);   opacity: .88; }
    100% { transform: translateY(-14px) scaleY(.9); opacity: .76; }
}

/* Le contenu passe devant les flammes */
main, .site-footer { position: relative; z-index: 1; }

/* =========================================================
   HEADER
========================================================= */

.site-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5vw;
    background: linear-gradient(180deg, rgba(8,18,26,.62), rgba(2,7,11,.52));
    backdrop-filter: blur(22px) saturate(160%);
    -webkit-backdrop-filter: blur(22px) saturate(160%);
    border-bottom: 1px solid var(--glass-border);
    box-shadow: 0 10px 40px rgba(0,0,0,.28), inset 0 -1px 0 rgba(237,82,98,.12);
}

.brand { display: flex; align-items: center; gap: 13px; }

.brand img { width: 45px; height: 45px; object-fit: contain; }

.brand div { display: flex; flex-direction: column; }

.brand span {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: .2em;
    color: var(--muted);
}

.brand strong {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 700;
    letter-spacing: .1em;
}

.main-nav { display: flex; align-items: center; gap: 26px; }

.main-nav a {
    position: relative;
    color: #d3dbe1;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .14em;
    transition: color .25s ease, transform .25s ease;
}

.main-nav a::after {
    content: "";
    position: absolute;
    left: 0; bottom: -8px;
    width: 0; height: 2px;
    background: var(--red-light);
    box-shadow: 0 0 10px rgba(237,82,98,.7);
    transition: width .25s ease;
}

.main-nav a:hover { color: var(--white); transform: translateY(-1px); }
.main-nav a:hover::after { width: 100%; }

/* =========================================================
   MOBILE
========================================================= */

.mobile-menu-toggle {
    display: none;
    position: fixed;
    top: 18px; right: 18px;
    z-index: 1100;
    width: 45px; height: 45px;
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    background: rgba(10,22,32,.55);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    cursor: pointer;
}

.mobile-menu-toggle span {
    display: block;
    width: 20px; height: 2px;
    margin: 4px auto;
    background: var(--white);
    transition: transform .25s ease;
}

.mobile-menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 1050;
    background: rgba(0,0,0,.65);
    opacity: 0;
    visibility: hidden;
    transition: opacity .25s ease, visibility .25s ease;
}

.mobile-menu-overlay.open { opacity: 1; visibility: visible; }

.mobile-menu {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(390px, 90vw);
    z-index: 1080;
    padding: 25px;
    background: linear-gradient(180deg, rgba(10,25,36,.82), rgba(2,7,11,.92));
    backdrop-filter: blur(26px) saturate(150%);
    -webkit-backdrop-filter: blur(26px) saturate(150%);
    border-left: 1px solid var(--glass-border);
    transform: translateX(100%);
    transition: transform .3s ease;
    overflow-y: auto;
}

.mobile-menu.open { transform: translateX(0); }

.mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 25px;
    border-bottom: 1px solid var(--line);
}

.mobile-menu-kicker {
    display: block;
    color: var(--red-light);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .2em;
}

.mobile-menu-header strong {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 700;
}

.mobile-menu-close {
    width: 40px; height: 40px;
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    color: var(--white);
    background: var(--glass);
    font-size: 27px;
    cursor: pointer;
}

.mobile-nav { display: flex; flex-direction: column; margin-top: 20px; }

.mobile-nav-link {
    display: grid;
    grid-template-columns: 35px 1fr;
    gap: 14px;
    padding: 20px 5px;
    border-bottom: 1px solid var(--line);
}

.mobile-nav-link > span {
    color: var(--red-light);
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 600;
}

.mobile-nav-link strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .1em;
}

.mobile-nav-link small { color: var(--muted); font-size: 11px; }

.mobile-menu-footer {
    margin-top: 30px;
    color: var(--muted);
    font-size: 9px;
    letter-spacing: .2em;
}

/* =========================================================
   HERO
========================================================= */

.hero { position: relative; width: 100%; }

.hero-photo {
    position: relative;
    min-height: 620px;
    overflow: hidden;
    background: var(--navy-950);
}

.hero-photo > img {
    width: 100%;
    height: 620px;
    object-fit: cover;
    filter: none;
    transform: none;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        rgba(2,7,11,.10) 0%,
        rgba(2,7,11,.02) 35%,
        rgba(2,7,11,.72) 100%
    );
    pointer-events: none;
}

.hero::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 4px;
    z-index: 10;
    background: linear-gradient(
        90deg,
        transparent 0%,
        var(--red-dark) 12%,
        var(--red-light) 50%,
        var(--red-dark) 88%,
        transparent 100%
    );
    box-shadow: 0 0 14px rgba(237,82,98,.48), 0 -2px 12px rgba(184,32,50,.20);
    pointer-events: none;
}

.hero .flames { display: none !important; }

/* =========================================================
   SECTIONS
========================================================= */

.intro-section,
.content-section {
    position: relative;
    width: min(1400px, 90vw);
    margin: 0 auto;
}

.intro-section { padding: 100px 0 70px; }
.content-section { padding: 100px 0; }

.section-heading { position: relative; z-index: 3; margin-bottom: 38px; }

.section-kicker {
    display: inline-block;
    margin-bottom: 10px;
    color: var(--red-light);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .2em;
}

.section-heading h2 {
    font-family: var(--font-display);
    font-size: clamp(34px, 5vw, 58px);
    font-weight: 700;
    line-height: 1.02;
    letter-spacing: -.01em;
    background: linear-gradient(180deg, #ffffff 30%, #b9c4cc 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.section-heading p {
    max-width: 650px;
    margin-top: 15px;
    color: var(--muted);
    font-size: 14.5px;
    font-weight: 500;
}

/* =========================================================
   EFFET VERRE — CARTES
========================================================= */

.quick-card,
.inventory-card,
.resource-card,
.result-card,
.maintenance-card {
    background:
        linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.025) 55%, rgba(255,255,255,.04));
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
}

/* reflet de verre */
.quick-card::before,
.inventory-card::before,
.resource-card::before,
.result-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 55%;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255,255,255,.07), transparent);
    pointer-events: none;
    z-index: 0;
}

.inventory-header,
.resource-header,
.inventory-content,
.resource-content,
.quick-card > * { position: relative; z-index: 1; }

/* =========================================================
   QUICK CARDS
========================================================= */

.quick-grid { display: grid; gap: 15px; }
.quick-grid-five { grid-template-columns: repeat(5, 1fr); }

.quick-card {
    position: relative;
    min-height: 215px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border-radius: var(--radius);
    transition: transform .3s ease, border-color .3s ease, background .3s ease, box-shadow .3s ease;
}

.quick-card:hover {
    transform: translateY(-7px);
    border-color: rgba(237,82,98,.45);
    background: linear-gradient(145deg, rgba(255,255,255,.13), rgba(237,82,98,.06) 60%, rgba(255,255,255,.05));
    box-shadow: 0 26px 60px rgba(0,0,0,.4), 0 0 30px rgba(237,82,98,.14), inset 0 1px 0 rgba(255,255,255,.2);
}

.card-number {
    color: rgba(237,82,98,.6);
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 600;
}

.card-kicker {
    display: block;
    margin-bottom: 7px;
    color: var(--red-light);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .18em;
}

.quick-card h3 {
    font-family: var(--font-display);
    font-size: 23px;
    font-weight: 600;
    letter-spacing: -.005em;
}

.quick-card p { margin-top: 7px; color: var(--muted); font-size: 12px; }

/* =========================================================
   INVENTAIRES
========================================================= */

.inventory-grid,
.resource-grid,
.maintenance-grid { position: relative; }

.inventory-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 17px;
}

.inventory-card,
.result-card,
.resource-card { position: relative; z-index: 2; }

.inventory-card { overflow: hidden; border-radius: var(--radius); }

.inventory-header {
    min-height: 105px;
    padding: 24px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    transition: background .25s ease;
}

.inventory-header:hover { background: rgba(255,255,255,.035); }

.inventory-header:focus-visible,
.resource-header:focus-visible {
    outline: 2px solid var(--red-light);
    outline-offset: -2px;
}

.inventory-code,
.resource-number {
    display: block;
    margin-bottom: 5px;
    color: var(--red-light);
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .14em;
}

.inventory-header h3,
.resource-header h3 {
    font-family: var(--font-display);
    font-size: 21px;
    font-weight: 600;
    letter-spacing: .01em;
}

.inventory-header p,
.resource-header p {
    margin-top: 3px;
    color: var(--muted);
    font-size: 12px;
    font-weight: 500;
}

.inventory-plus,
.resource-plus {
    flex: 0 0 auto;
    width: 40px; height: 40px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(237,82,98,.35);
    border-radius: 50%;
    background: rgba(255,255,255,.04);
    color: var(--red-light);
    font-size: 23px;
    font-weight: 400;
    transition: transform .3s ease, background .3s ease;
}

.inventory-card.open .inventory-plus,
.resource-card.open .resource-plus {
    background: rgba(184,32,50,.2);
    transform: rotate(180deg);
}

.inventory-content,
.resource-content {
    display: grid;
    grid-template-rows: 0fr;
    padding: 0 26px;
    opacity: 0;
    transition: grid-template-rows .38s ease, opacity .25s ease, padding .38s ease;
}

.inventory-card.open .inventory-content,
.resource-card.open .resource-content {
    grid-template-rows: 1fr;
    padding-top: 0;
    padding-bottom: 26px;
    opacity: 1;
}

.inventory-content > *,
.resource-content > * { min-height: 0; }

/* =========================================================
   VEHICLES
========================================================= */

.vehicle-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    overflow: hidden;
}

.vehicle-card {
    position: relative;
    min-height: 105px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgba(255,255,255,.11);
    border-radius: 13px;
    background: linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
    transition: transform .25s ease, border-color .25s ease, background .25s ease;
}

.vehicle-card:hover {
    transform: translateY(-3px);
    border-color: rgba(237,82,98,.42);
    background: linear-gradient(145deg, rgba(237,82,98,.12), rgba(255,255,255,.03));
}

.vehicle-card > span:first-child,
.vehicle-card > div > span {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: .02em;
}

.vehicle-card small { color: var(--muted); font-size: 10.5px; font-weight: 500; }

.vehicle-buttons { display: grid; gap: 7px; margin-top: 13px; }
.asu-buttons { grid-template-columns: repeat(2, 1fr); }

.inventory-button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 38px;
    padding: 8px 11px;
    border: 1px solid rgba(237,82,98,.24);
    border-radius: 9px;
    background: rgba(184,32,50,.10);
    color: #f0f3f5;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .02em;
    transition: background .2s ease, border-color .2s ease, transform .2s ease;
}

.inventory-button:hover {
    background: rgba(184,32,50,.24);
    border-color: rgba(237,82,98,.5);
    transform: translateY(-1px);
}

/* =========================================================
   RESULTATS
========================================================= */

.result-card {
    min-height: 145px;
    padding: 28px;
    display: flex;
    align-items: center;
    grid-column: span 2;
    overflow: hidden;
    background: linear-gradient(120deg, rgba(184,32,50,.55), rgba(255,255,255,.05) 70%);
    border: 1px solid rgba(237,82,98,.38);
    border-radius: var(--radius);
    transition: transform .3s ease, box-shadow .3s ease;
}

.result-card > div { position: relative; z-index: 1; }

.result-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 60px rgba(0,0,0,.4), 0 0 34px rgba(237,82,98,.2), inset 0 1px 0 rgba(255,255,255,.2);
}

.result-card h3 {
    margin-top: 3px;
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 600;
}

.result-card p { margin-top: 6px; color: rgba(255,255,255,.78); font-size: 12.5px; }

/* =========================================================
   ENTRETIENS
========================================================= */

.entretien-card { width: 100%; }

.maintenance-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    overflow: visible;
}

.maintenance-card {
    position: relative;
    z-index: 2;
    min-height: 190px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 17px;
    border-radius: 15px;
    transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
}

.maintenance-card:hover {
    transform: translateY(-5px);
    border-color: rgba(237,82,98,.5);
    box-shadow: 0 22px 50px rgba(0,0,0,.4), 0 0 24px rgba(237,82,98,.15), inset 0 1px 0 rgba(255,255,255,.18);
}

.maintenance-image {
    position: absolute;
    inset: 0;
    z-index: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transform: scale(1.02);
    transition: transform .45s ease;
}

.maintenance-card:hover .maintenance-image { transform: scale(1.08); }

.maintenance-card::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
        180deg,
        rgba(2,7,11,.05) 10%,
        rgba(2,7,11,.30) 40%,
        rgba(2,7,11,.92) 100%
    );
}

.maintenance-info {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    margin: -4px;
    border-radius: 11px;
    background: rgba(255,255,255,.07);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.12);
}

.maintenance-info > span { display: none; }

.maintenance-info strong {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: .02em;
}

.maintenance-info small {
    margin-top: 2px;
    color: rgba(255,255,255,.75);
    font-size: 10.5px;
    font-weight: 500;
}

/* =========================================================
   RESSOURCES
========================================================= */

.resource-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 17px;
}

.resource-card { overflow: hidden; border-radius: var(--radius); }

.resource-header {
    min-height: 108px;
    padding: 23px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    transition: background .25s ease;
}

.resource-header:hover { background: rgba(255,255,255,.035); }

.resource-content { padding-left: 25px; padding-right: 25px; }

.large-button {
    min-height: 50px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(237,82,98,.26);
    border-radius: 10px;
    background: rgba(184,32,50,.10);
    color: var(--white);
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: .08em;
    transition: background .25s ease, border-color .25s ease, transform .25s ease;
}

.large-button:hover {
    background: rgba(184,32,50,.24);
    border-color: rgba(237,82,98,.5);
    transform: translateY(-2px);
}

.amicale-links { display: grid; grid-template-columns: 1fr; gap: 9px; }

.amicale-links .large-button {
    justify-content: flex-start;
    text-align: left;
    min-height: 46px;
    line-height: 1.35;
}

/* =========================================================
   REVEAL
========================================================= */

.reveal {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity .6s ease, transform .6s ease;
}

.reveal.visible { opacity: 1; transform: translateY(0); }

/* =========================================================
   FOOTER
========================================================= */

.site-footer {
    min-height: 120px;
    padding: 30px 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--glass-border);
    background: rgba(2,7,11,.55);
    backdrop-filter: blur(20px) saturate(150%);
    -webkit-backdrop-filter: blur(20px) saturate(150%);
}

.footer-brand { display: flex; align-items: center; gap: 13px; }

.footer-brand img { width: 42px; height: 42px; object-fit: contain; }

.footer-brand div { display: flex; flex-direction: column; }

.footer-brand strong {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: .06em;
}

.footer-brand span { color: var(--muted); font-size: 10px; }

.footer-right {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--muted);
    font-size: 9px;
    letter-spacing: .14em;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1150px) {
    .quick-grid-five { grid-template-columns: repeat(3, 1fr); }
    .maintenance-grid { grid-template-columns: repeat(3, 1fr); }
    .resource-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
    .site-header { height: 70px; }
    .main-nav { display: none; }
    .mobile-menu-toggle { display: block; }
    .brand { max-width: calc(100% - 65px); }
    .brand img { width: 38px; height: 38px; }
    .brand span { font-size: 7px; }
    .brand strong { font-size: 16px; }

    .hero-photo,
    .hero-photo > img { min-height: 500px; height: 500px; }

    .inventory-grid { grid-template-columns: 1fr; }
    .result-card { grid-column: span 1; }
    .maintenance-grid { grid-template-columns: repeat(2, 1fr); }

    body::after { height: calc(36vh + var(--flame-grow, 0px)); }
}

@media (max-width: 650px) {
    .intro-section,
    .content-section {
        width: min(92vw, 600px);
        padding-top: 70px;
        padding-bottom: 70px;
    }

    .quick-grid-five,
    .resource-grid { grid-template-columns: 1fr; }

    .quick-card { min-height: 170px; }
    .vehicle-grid { grid-template-columns: 1fr; }
    .maintenance-grid { grid-template-columns: 1fr; }
    .asu-buttons { grid-template-columns: 1fr; }

    .inventory-header,
    .resource-header { padding: 20px; }

    .inventory-content,
    .resource-content { padding-left: 20px; padding-right: 20px; }

    .inventory-card.open .inventory-content,
    .resource-card.open .resource-content { padding-bottom: 20px; }

    .maintenance-card { min-height: 210px; }

    .site-footer { align-items: flex-start; flex-direction: column; gap: 20px; }
    .footer-right { flex-direction: column; align-items: flex-start; gap: 7px; }
}

@media (max-width: 420px) {
    .hero-photo,
    .hero-photo > img { min-height: 430px; height: 430px; }

    .section-heading h2 { font-size: 36px; }
    .mobile-menu { width: 94vw; }
}

@media (prefers-reduced-motion: reduce) {
    body::before, body::after { animation: none; }
}


/* =========================================================
   EFFETS DYNAMIQUES (pilotés par script.js)
========================================================= */

/* Reflet de lumière qui suit la souris */
.glass-glow {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(
        280px circle at var(--mx, 50%) var(--my, 50%),
        rgba(255,255,255,.13),
        rgba(237,82,98,.07) 40%,
        transparent 70%
    );
    transition: opacity .3s ease;
}

.premium-card:hover > .glass-glow,
.vehicle-card:hover > .glass-glow,
.maintenance-card:hover > .glass-glow { opacity: 1; }

.maintenance-card > .glass-glow { z-index: 2; }

/* Pause quand l'onglet est caché */
html.flames-paused body::before,
html.flames-paused body::after { animation-play-state: paused; }

/* Mode allégé (mobiles / appareils modestes) */
html.flames-lite { --glass-blur: blur(10px) saturate(130%); }

html.flames-lite body::before {
    filter: blur(18px);
    animation: none;
}

html.flames-lite body::after {
    filter: blur(6px);
    animation-duration: 5.5s;
}


/* =========================================================
   FLAMMES VISIBLES DERRIÈRE LES CARTES (correctif)
   - flammes ajoutées au bas de chaque section, derrière les cartes
   - cartes en verre plus transparentes pour laisser passer la lumière
========================================================= */

.intro-section::before,
.content-section::before {
    content: "";
    position: absolute;
    left: -6%;
    right: -6%;
    bottom: -30px;
    height: 420px;
    z-index: 0;
    pointer-events: none;
    background:
        radial-gradient(ellipse 5% 70%  at 5%  100%, rgba(255,150,70,.85), rgba(237,82,98,.45) 40%, transparent 74%),
        radial-gradient(ellipse 5% 100% at 15% 100%, rgba(237,82,98,.85), rgba(184,32,50,.42) 40%, transparent 74%),
        radial-gradient(ellipse 5% 78%  at 25% 100%, rgba(255,130,55,.82), rgba(184,32,50,.40) 40%, transparent 74%),
        radial-gradient(ellipse 5% 108% at 35% 100%, rgba(237,82,98,.85), rgba(184,32,50,.42) 40%, transparent 74%),
        radial-gradient(ellipse 5% 80%  at 45% 100%, rgba(255,130,55,.82), rgba(184,32,50,.40) 40%, transparent 74%),
        radial-gradient(ellipse 5% 104% at 55% 100%, rgba(237,82,98,.85), rgba(184,32,50,.42) 40%, transparent 74%),
        radial-gradient(ellipse 5% 82%  at 65% 100%, rgba(255,130,55,.82), rgba(184,32,50,.40) 40%, transparent 74%),
        radial-gradient(ellipse 5% 110% at 75% 100%, rgba(237,82,98,.85), rgba(184,32,50,.42) 40%, transparent 74%),
        radial-gradient(ellipse 5% 84%  at 85% 100%, rgba(255,130,55,.82), rgba(184,32,50,.40) 40%, transparent 74%),
        radial-gradient(ellipse 5% 96%  at 95% 100%, rgba(255,150,70,.85), rgba(237,82,98,.42) 40%, transparent 74%);
    filter: blur(9px);
    opacity: .9;
    animation: flameTongues 3.2s ease-in-out infinite alternate;
}

/* le contenu des sections reste au-dessus des flammes */
.section-heading,
.quick-grid,
.inventory-grid,
.resource-grid,
.entretien-card { position: relative; z-index: 2; }

/* flammes globales un peu plus présentes */
body::after { opacity: .95; }

/* verre plus transparent : la lumière passe à travers */
.quick-card,
.inventory-card,
.resource-card,
.maintenance-card {
    background: linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 55%, rgba(255,255,255,.03));
    backdrop-filter: blur(10px) saturate(160%);
    -webkit-backdrop-filter: blur(10px) saturate(160%);
}

html.flames-lite .intro-section::before,
html.flames-lite .content-section::before {
    height: 300px;
    filter: blur(6px);
    animation-duration: 5.5s;
}


/* =========================================================
   CORRECTIF iPHONE / SAFARI iOS
   Safari iOS n'affiche pas de façon fiable les grandes couches
   avec filter: blur() + position: fixed + animation.
   On retire le flou (les dégradés sont déjà doux) et on simplifie.
========================================================= */

@supports (-webkit-touch-callout: none) {

    body::before,
    body::after,
    .intro-section::before,
    .content-section::before {
        filter: none;
        will-change: auto;
        -webkit-transform: translateZ(0);
    }

    body::before {
        inset: 0;
        translate: none;
    }

    .intro-section::before,
    .content-section::before {
        left: 0;
        right: 0;
        height: 320px;
    }

    .quick-card,
    .inventory-card,
    .resource-card,
    .maintenance-card,
    .vehicle-card {
        -webkit-backdrop-filter: blur(8px) saturate(150%);
        backdrop-filter: blur(8px) saturate(150%);
    }
}


/* =========================================================
   CORRECTIF 2 — CONTENU INVISIBLE SUR iPHONE
========================================================= */

@supports (-webkit-touch-callout: none) {
    /* iOS : trop de couches "verre" => Safari n'affiche plus le contenu.
       On supprime le flou d'arrière-plan des cartes et on garde un fond translucide. */
    .quick-card,
    .inventory-card,
    .resource-card,
    .result-card,
    .maintenance-card,
    .vehicle-card,
    .maintenance-info {
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        background: linear-gradient(145deg, rgba(20,34,46,.62), rgba(6,14,20,.70));
    }

    .result-card {
        background: linear-gradient(120deg, rgba(150,26,42,.70), rgba(8,18,26,.72));
    }

    /* le contenu ne doit jamais rester invisible */
    .reveal {
        opacity: 1;
        transform: none;
    }

    /* pas de couches GPU supplémentaires */
    body::before,
    body::after,
    .intro-section::before,
    .content-section::before {
        -webkit-transform: none;
    }

    .intro-section::before,
    .content-section::before { height: 240px; }
}

@media (max-width: 650px) {
    /* iOS : trop de couches "verre" => Safari n'affiche plus le contenu.
       On supprime le flou d'arrière-plan des cartes et on garde un fond translucide. */
    .quick-card,
    .inventory-card,
    .resource-card,
    .result-card,
    .maintenance-card,
    .vehicle-card,
    .maintenance-info {
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        background: linear-gradient(145deg, rgba(20,34,46,.62), rgba(6,14,20,.70));
    }

    .result-card {
        background: linear-gradient(120deg, rgba(150,26,42,.70), rgba(8,18,26,.72));
    }

    /* le contenu ne doit jamais rester invisible */
    .reveal {
        opacity: 1;
        transform: none;
    }

    /* pas de couches GPU supplémentaires */
    body::before,
    body::after,
    .intro-section::before,
    .content-section::before {
        -webkit-transform: none;
    }

    .intro-section::before,
    .content-section::before { height: 240px; }
}


/* =========================================================
   FLAMMES PREMIUM (canvas) — remplace les anciennes flammes CSS
========================================================= */

#fire-bg {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

/* on retire les anciennes flammes en dégradés (taches floues) */
body::after,
.intro-section::before,
.content-section::before { display: none !important; }

/* lueur ambiante discrète seulement */
body::before { animation: none; opacity: .5; }

/* lisibilité des titres posés sur le fond */
.section-heading h2 { filter: drop-shadow(0 2px 14px rgba(2,7,11,.75)); }
.section-heading p { color: #b9c5ce; text-shadow: 0 1px 14px rgba(2,7,11,.9); }


/* flammes WebGL : doux et lisible derrière le contenu */
#fire-bg { opacity: .92; }
body::before { opacity: .35; }
