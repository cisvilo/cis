document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE
    ===================================================== */

    const year = document.getElementById("current-year");
    if (year) year.textContent = new Date().getFullYear();


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const mobileMenuClose = document.getElementById("mobile-menu-close");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add("open");
        mobileMenuOverlay?.classList.add("open");
        mobileMenuToggle?.classList.add("active");
        mobileMenuToggle?.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");
        document.body.classList.add("menu-open");
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove("open");
        mobileMenuOverlay?.classList.remove("open");
        mobileMenuToggle?.classList.remove("active");
        mobileMenuToggle?.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-open");
    }

    mobileMenuToggle?.addEventListener("click", () => {
        if (mobileMenu?.classList.contains("open")) closeMobileMenu();
        else openMobileMenu();
    });

    mobileMenuClose?.addEventListener("click", closeMobileMenu);
    mobileMenuOverlay?.addEventListener("click", closeMobileMenu);
    mobileNavLinks.forEach(link => link.addEventListener("click", closeMobileMenu));

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMobileMenu();
    });


    /* =====================================================
       ACCORDÉONS
       - UNE SEULE CARTE OUVERTE PAR GROUPE
       - AUCUN SCROLL AUTOMATIQUE
       - POSITION EXACTEMENT CONSERVÉE
    ===================================================== */

    const collapsibleCards = document.querySelectorAll("[data-collapsible]");

    function getCardGroup(card) {
        const inventoryGrid = card.closest(".inventory-grid");
        if (inventoryGrid) return inventoryGrid;

        const resourceGrid = card.closest(".resource-grid");
        if (resourceGrid) return resourceGrid;

        if (card.classList.contains("entretien-card")) return card.parentElement;

        return card.parentElement;
    }

    function updateCardState(card, open) {
        card.classList.toggle("open", open);

        const plus = card.querySelector(".inventory-plus, .resource-plus");
        if (plus) plus.textContent = open ? "−" : "+";

        const header = card.querySelector(".inventory-header, .resource-header");
        if (header) header.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function closeOtherCards(currentCard) {
        const group = getCardGroup(currentCard);
        if (!group) return;

        group.querySelectorAll("[data-collapsible]").forEach(card => {
            if (card !== currentCard) updateCardState(card, false);
        });
    }

    function restoreScroll(x, y) {
        window.scrollTo(x, y);
        requestAnimationFrame(() => window.scrollTo(x, y));
    }

    collapsibleCards.forEach(card => {

        const header = card.querySelector(".inventory-header, .resource-header");
        if (!header) return;

        updateCardState(card, card.classList.contains("open"));

        function toggleCard(event) {

            if (event && event.target.closest("a, button")) return;

            /* On mémorise la position AVANT toute modification du DOM. */
            const savedX = window.scrollX;
            const savedY = window.scrollY;

            const isOpen = card.classList.contains("open");

            if (isOpen) {
                updateCardState(card, false);
            } else {
                closeOtherCards(card);
                updateCardState(card, true);
            }

            /* On restaure la position après le recalcul du layout. */
            restoreScroll(savedX, savedY);
        }

        header.setAttribute("tabindex", "0");
        header.setAttribute("role", "button");
        header.addEventListener("click", toggleCard);

        header.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleCard(event);
            }
        });
    });


    /* =====================================================
       PHOTOS DES VÉHICULES — ENTRETIENS
    ===================================================== */

    const vehicleImages = {
        "FPT 01": "https://www.usfirepolice.net/france_62/france_62_vitry_en_artois_fpt_%282%29-1.JPG",
        "FPTGP 02": "https://www.usfirepolice.net/france_62/france_62_vitry_en_artois_fpt_%282%29-1.JPG",
        "ECH": "https://cloudfront-eu-central-1.images.arcpublishing.com/leparisien/PRNAZMXQHNC2TOBAZTY3PUM2JY.jpg",
        "VSAV 1": "https://up.autotitre.com/1c78a63715.jpg",
        "VSAV 2": "https://up.autotitre.com/1c78a63715.jpg",
        "VSAV 3": "https://up.autotitre.com/1c78a63715.jpg",
        "CCF 1": "https://pompieractu.fr/storage/articles/pompieractufr/definition-ccf-camion-citerne-feux-forets-pompiers-francais/featured-1nGRrpceYimnNcyH.jpg",
        "CCF 2": "https://pompieractu.fr/storage/articles/pompieractufr/definition-ccf-camion-citerne-feux-forets-pompiers-francais/featured-1nGRrpceYimnNcyH.jpg",
        "VLHR": "https://www.usfirepolice.net/france_62/france_62_montreuil_sur_mer_vlhr_%287%29-1.jpg",
        "FMOGP": "https://www.usfirepolice.net/france_75/france_75_bspp_1_10_3_fmogp_1-3.jpg",
        "VSR M": "https://sapeurs-pompiers35.fr/content/uploads/2017/07/VSR_1.jpg",
        "VTU 1 (VIA)": "https://pompiersstpaul3chateaux.fr/images/a/vehicules_vtu_med_hr-688-692.jpg",
        "VTU 2": "https://up.autotitre.com/6572ae9036.jpg",
        "VLS 1": "https://up.autotitre.com/50ac913d07.jpg",
        "VLS 2": "https://up.autotitre.com/50ac913d07.jpg",
        "VLS 3": "https://up.autotitre.com/50ac913d07.jpg",
        "V DRONE": "https://www.sdis50.fr/app/uploads/2026/03/IMG_8196-1024x683.jpg"
    };

    document.querySelectorAll(".maintenance-card").forEach(card => {

        const titleElement = card.querySelector("strong");
        if (!titleElement) return;

        const vehicleName = titleElement.textContent.trim().replace(/\s+/g, " ");
        const imageUrl = vehicleImages[vehicleName];
        if (!imageUrl) return;

        const oldImage = card.querySelector(".maintenance-image");
        if (oldImage) oldImage.remove();

        const image = document.createElement("div");
        image.className = "maintenance-image";
        image.style.backgroundImage = `url("${imageUrl}")`;

        const icon = card.querySelector("span");
        const strong = card.querySelector("strong");
        const small = card.querySelector("small");

        const info = document.createElement("div");
        info.className = "maintenance-info";

        if (icon) info.appendChild(icon);
        if (strong) info.appendChild(strong);
        if (small) info.appendChild(small);

        card.insertBefore(image, card.firstChild);
        card.appendChild(info);
    });


    /* =====================================================
       AMICALE
       TRANSFORMATION DES DONNÉES EN CARTES PROPRES
    ===================================================== */

    const amicaleLinks = {

        "01": [
            { title: "SOIRÉE ENJOY 33 — 08 SEPTEMBRE", subtitle: "OUVERT À TOUS LES AGENTS DE VILO", url: "https://forms.gle/vmvFjFrtcmnVrP6C6" },
            { title: "INSCRIPTIONS TOURNOI PADEL — COMPLEXE 4PADEL — 22/09 10H/12H", subtitle: "OUVERT À TOUS LES AGENTS DE VILO", url: "https://docs.google.com/forms/d/e/1FAIpQLSd1wey0THEvrfyJRKpnmwYdVHR6nzq0e44UvZT1F9QPhXm8wA/viewform?usp=dialog" },
            { title: "UBB — STADE FRANÇAIS — DIMANCHE 20/09 21H00", subtitle: "OUVERT AUX AMICALISTES", url: "https://docs.google.com/forms/d/e/1FAIpQLScgOl8zBbhS4iuNMQ8nazXS38Ex17I8-0gZhKyiwXZ-lgw2DA/viewform?usp=header" },
            { title: "SPEEDPARK — 05 ET 12 OCTOBRE", subtitle: "OUVERT À TOUS LES AGENTS DE VILO", url: "https://docs.google.com/forms/d/e/1FAIpQLSf3ZJ1FjxqNDaW_wky0Gr4klqyzqpKVr1sR_6Zs3h0igpL1ag/viewform?usp=header" },
            { title: "LOCATION MATÉRIEL JOLT", url: "https://forms.gle/ZxMAxuXU16isUjD78" }
        ],

        "02": [
            { title: "SOIRÉE ENJOY — INSCRIPTION", url: "https://docs.google.com/forms/d/e/1FAIpQLSdwZr5wQbEGY4oT7HKPXYKjQwi0LDVIzDobKQmyK479s0RlJA/viewform?usp=header" },
            { title: "INSCRIPTIONS MATCH UBB — STADE FRANÇAIS", url: "https://docs.google.com/forms/d/e/1FAIpQLScgOl8zBbhS4iuNMQ8nazXS38Ex17I8-0gZhKyiwXZ-lgw2DA/viewform?usp=header" },
            { title: "RAPPEL DES RÈGLES D'ATTRIBUTION", url: "https://drive.google.com/file/d/1VleKfAE5S1V0WXyCBqhueX9uqhXzTyOm/view?usp=sharing" },
            { title: "TOURNOI PADEL 22/09", url: "https://docs.google.com/forms/d/e/1FAIpQLSd1wey0THEvrfyJRKpnmwYdVHR6nzq0e44UvZT1F9QPhXm8wA/viewform?usp=dialog" },
            { title: "SOIRÉE SPEEDPARK — 05 ET 12 OCTOBRE", url: "https://docs.google.com/forms/d/e/1FAIpQLSf3ZJ1FjxqNDaW_wky0Gr4klqyzqpKVr1sR_6Zs3h0igpL1ag/viewform?usp=header" }
        ],

        "03": [
            { title: "LIEN POUR PAYER UNE PRESTATION", url: "https://pay.sumup.com/b2c/QL9SNKAR" },
            { title: "DEMANDE D'INDEMNISATION / SUBVENTION / REMBOURSEMENT", url: "https://docs.google.com/forms/d/e/1FAIpQLSdoNRLaLy2dahxObT4eTlctBZ8FFMp4bH0rBD05T2QRFgrv0g/viewform?usp=header" },
            { title: "TABLEAU PRESTATIONS", url: "https://drive.google.com/file/d/1pYoqLNOE89M5B1MqkF2Sz1jFm5v2hdeG/view?usp=drive_link" }
        ],

        "04": [
            { title: "DEMANDE DE LOCATION DU MATÉRIEL", url: "https://docs.google.com/forms/d/e/1FAIpQLSfPz3EyIxsQFtr65ksZpYA-MQK_-RTLv1OwGL-Emijii3a6eg/viewform?usp=header" },
            { title: "DEMANDE DE LOCATION MATÉRIEL JOLT", url: "https://forms.gle/ZxMAxuXU16isUjD78" },
            { title: "LOCATION SALLES DES FÊTES DE LUDON", url: "https://www.amicalepompiersbordeaux.fr/" }
        ],

        "05": [
            { title: "STATUTS DE L'AMICALE", url: "https://drive.google.com/file/d/13935dl1_BXo9TxPw-MHYxcBizpAxvEDQ/view?usp=drive_link" },
            { title: "RÈGLEMENT INTÉRIEUR", url: "https://drive.google.com/file/d/1G7iWYH27CzaEJ9ZpGVD2WX1m6FJbMqtJ/view?usp=drive_link" },
            { title: "RÈGLES POUR ÊTRE AMICALISTE", url: "https://drive.google.com/file/d/1IBvJA1N0hZMMpAEh1qomH_F8QLefknJs/view?usp=drive_link" },
            { title: "TABLEAU PRESTATIONS AMICALE", url: "https://drive.google.com/file/d/1pYoqLNOE89M5B1MqkF2Sz1jFm5v2hdeG/view?usp=drive_link" },
            { title: "COMPTE-RENDU DERNIER CA", url: "https://drive.google.com/file/d/1waEKRd2Pt6skdirNydr6-Y6JpZoxjMWo/view?usp=drive_link" }
        ],

        "06": [
            { title: "DEMANDE ADHÉSION 2026", url: "https://docs.google.com/forms/d/e/1FAIpQLSfMt2cx18aGF0WtHOc5WacRjTBE5b70YDuNV7TnLUmg1ChKOQ/viewform?usp=header" },
            { title: "LISTE ADHÉRENTS 2026", url: "https://drive.google.com/file/d/1nGGmhIzKY4fDMgEp1zCAIQJ1B7pgSfB6/view?usp=sharing" }
        ],

        "07": [
            { title: "SECTEURS CALENDRIERS", url: "https://www.google.com/maps/d/edit?mid=1a7CY1kuTPUbNeoAkft3Wwx5SfWOI-7U&usp=drive_link" },
            { title: "RÈGLEMENTS DISTRIBUTION CALENDRIERS", url: "https://drive.google.com/file/d/1E78LngumgOKvv2SD9gFfcTk72L3kng_H/view?usp=drive_link" },
            { title: "FICHE RETOUR COLLECTE", url: "https://drive.google.com/file/d/1Rhh_vC4OWL5IdvKZWRFtZWmElq_k9P_u/view?usp=drive_link" },
            { title: "FICHE DE TÂCHES DISTRIBUTEUR 2025", url: "https://drive.google.com/file/d/1TMhYsD_NWmkCIiukVjw0xbRs9eejVIsy/view?usp=drive_link" },
            { title: "UTILISATION APPLICATION SUMUP", url: "https://drive.google.com/file/d/18AREoboAmm0_co0vlKli3ATQqP_zRt_G/view?usp=drive_link" }
        ],

        "08": [
            { title: "FORMULAIRE INSCRIPTIONS BÉNÉVOLAT BAL", url: "https://forms.gle/LShcXjrQmnmcuzof9" },
            { title: "INSCRIPTIONS AVANT LE 15/06", url: "https://forms.gle/LShcXjrQmnmcuzof9" }
        ],

        "09": [
            { title: "MAIL AMICALE VILO", url: "mailto:amicale.vilo@gmail.com" },
            { title: "TÉLÉPHONE SECRÉTARIAT", url: "tel:0761272754" },
            { title: "MAIL AMICALE BORDEAUX MÉTROPOLE", url: "mailto:amicalespompiersbxmetropole@gmail.com" },
            { title: "SITE AMICALE BORDEAUX MÉTROPOLE", url: "https://www.amicalepompiersbordeaux.fr/" }
        ],

        "10": [
            { title: "AFFICHE RECHERCHE PARTENAIRES — CALENDRIERS 2027", url: "https://drive.google.com/file/d/1PIuBN9HFVh7fuJ4_bM9O6AfwHYqFLewS/view?usp=sharing" },
            { title: "FORMULAIRE CONTACT PUBS — CALENDRIERS 2027", url: "https://docs.google.com/forms/d/e/1FAIpQLSd3-NRxOMQcz8EF8thwNtg8mCpMpWLz2EiM_b9yFhwTZKRW3A/viewform?usp=header" }
        ],

        "11": [
            { title: "COMPOSITION BUREAU 2026", url: "https://drive.google.com/file/d/1g3NxiYsp2GFC1mCAikz2lLolBs2pnk6V/view?usp=drive_link" },
            { title: "COMPTE-RENDU DERNIER CA", url: "https://drive.google.com/file/d/1waEKRd2Pt6skdirNydr6-Y6JpZoxjMWo/view?usp=drive_link" },
            { title: "RESPONSABLES BAL : SIMON Bertrand / DEVISE Frédéric", url: "mailto:organisation.baldemadere@gmail.com" }
        ],

        "12": [
            { title: "RECHARGER LA CARTE DU MES", url: "https://pay.sumup.com/b2c/QN2MQ7XB?utm_campaign=pdf&utm_medium=print&utm_source=qr" },
            { title: "PAYER UNE PRESTATION", url: "https://pay.sumup.com/b2c/QL9SNKAR" }
        ]
    };

    document.querySelectorAll(".amicale-grid .resource-card").forEach(card => {

        const numberElement = card.querySelector(".resource-number");
        if (!numberElement) return;

        const links = amicaleLinks[numberElement.textContent.trim()];
        if (!links || !links.length) return;

        const content = card.querySelector(".resource-content");
        if (!content) return;

        content.innerHTML = "";

        const linksContainer = document.createElement("div");
        linksContainer.className = "amicale-links";

        links.forEach(item => {

            const link = document.createElement("a");
            link.href = item.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "large-button";

            const title = document.createElement("strong");
            title.textContent = item.title;
            link.appendChild(title);

            if (item.subtitle) {
                const subtitle = document.createElement("small");
                subtitle.textContent = item.subtitle;
                subtitle.style.display = "block";
                subtitle.style.marginTop = "3px";
                subtitle.style.color = "rgba(255,255,255,.58)";
                subtitle.style.fontWeight = "500";
                link.appendChild(subtitle);
            }

            linksContainer.appendChild(link);
        });

        content.appendChild(linksContainer);
    });


    /* =====================================================
       REVEAL DES CARTES
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: .08 });

        revealElements.forEach(element => revealObserver.observe(element));

    } else {
        revealElements.forEach(element => element.classList.add("visible"));
    }


    /* =====================================================
       TILT DES CARTES — DESKTOP
       Les accordéons ne bougent pas.
    ===================================================== */

    if (window.innerWidth > 1000) {

        document.querySelectorAll(".premium-card").forEach(card => {

            if (card.hasAttribute("data-collapsible")) return;

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateY = ((x / rect.width) - .5) * 2;
                const rotateX = -((y / rect.height) - .5) * 2;

                card.style.transform =
                    `translateY(-5px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }


    /* =====================================================
       SUPPRESSION DES FLÈCHES ÉVENTUELLES
       Les liens restent fonctionnels.
    ===================================================== */

    document
        .querySelectorAll("a b, a .arrow, a .external-arrow")
        .forEach(element => element.remove());


    /* =====================================================
       FLAMMES PREMIUM + EFFETS (bloc ajouté)
    ===================================================== */

(function () {

    const root = document.documentElement;

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canHover =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const lowPower =
        window.innerWidth <= 900 ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 4);

    if (lowPower) root.classList.add("flames-lite");


    /* -----------------------------------------------------
       1. FLAMMES (canvas plein écran, derrière tout le contenu)
    ----------------------------------------------------- */

    const canvas = document.createElement("canvas");
    canvas.id = "fire-bg";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext("2d");

    if (ctx) {

        const LAYERS = [
            /* braises profondes, larges et sombres */
            { wMul: 2.1, hMul: .60, alpha: .22,
              c0: "143,22,38", c1: "184,32,50", speed: .55 },
            /* corps rouge-orangé */
            { wMul: 1.4, hMul: .46, alpha: .26,
              c0: "237,82,98", c1: "255,112,46", speed: .8 },
            /* cœur chaud, fin et brillant */
            { wMul: .85, hMul: .28, alpha: .30,
              c0: "255,205,120", c1: "255,140,60", speed: 1.15 }
        ];

        let W = 0, H = 0, tongues = [], embers = [];

        function rand(a, b) { return a + Math.random() * (b - a); }

        function build() {

            const scale = lowPower ? .5 : .7;

            W = canvas.width  = Math.ceil(window.innerWidth  * scale);
            H = canvas.height = Math.ceil(window.innerHeight * scale);

            const step = lowPower ? 110 : 80;
            const count = Math.max(5, Math.round(window.innerWidth / step));

            tongues = LAYERS.map(layer => {
                const list = [];
                for (let i = 0; i < count; i++) {
                    list.push({
                        x: (i + rand(.1, .9)) / count * W,
                        w: (W / count) * layer.wMul * rand(.8, 1.2),
                        h: rand(.6, 1),
                        phase: rand(0, 6.28),
                        speed: layer.speed * rand(.8, 1.2)
                    });
                }
                return list;
            });

            const nEmbers = lowPower ? 16 : 34;
            embers = [];
            for (let i = 0; i < nEmbers; i++) embers.push(newEmber(true));
        }

        function newEmber(anywhere) {
            return {
                x: rand(0, W),
                y: anywhere ? rand(0, H) : H + rand(0, 20),
                r: rand(.8, 2.2),
                vy: rand(.15, .5),
                drift: rand(-.15, .15),
                phase: rand(0, 6.28),
                flick: rand(1.5, 4)
            };
        }

        function tongue(x, w, h, sway, rgb0, rgb1, a) {

            const g = ctx.createLinearGradient(0, H, 0, H - h);
            g.addColorStop(0,   "rgba(" + rgb0 + "," + a + ")");
            g.addColorStop(.45, "rgba(" + rgb1 + "," + (a * .55) + ")");
            g.addColorStop(1,   "rgba(" + rgb1 + ",0)");

            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(x - w / 2, H + 2);
            ctx.bezierCurveTo(
                x - w * .55, H - h * .35,
                x - w * .12 + sway * .4, H - h * .72,
                x + sway, H - h
            );
            ctx.bezierCurveTo(
                x + w * .12 + sway * .4, H - h * .72,
                x + w * .55, H - h * .35,
                x + w / 2, H + 2
            );
            ctx.closePath();
            ctx.fill();
        }

        function glow(cx, cy, r, rgb, a) {
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            g.addColorStop(0, "rgba(" + rgb + "," + a + ")");
            g.addColorStop(1, "rgba(" + rgb + ",0)");
            ctx.fillStyle = g;
            ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
        }

        let last = 0;

        function frame(now) {

            if (!reducedMotion) requestAnimationFrame(frame);

            if (lowPower && now - last < 33) return;
            last = now;

            const t = now / 1000;

            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;

            const sp = maxScroll > 0
                ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
                : 0;

            const boost = 1 + sp * .3;

            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = "lighter";

            /* halos répartis : bas + côtés */
            glow(W * .5,  H,      W * .75, "237,82,98", .16);
            glow(0,       H * .8, W * .45, "255,112,46", .10 + sp * .05);
            glow(W,       H * .6, W * .45, "237,82,98",  .10 + sp * .05);

            /* langues de flammes, de l'arrière vers l'avant */
            LAYERS.forEach((layer, li) => {
                tongues[li].forEach(f => {
                    const n =
                        Math.sin(t * f.speed + f.phase) * .5 +
                        Math.sin(t * f.speed * 2.3 + f.phase * 1.7) * .3;

                    const h = H * layer.hMul * f.h * (1 + n * .22) * boost;
                    const sway = Math.sin(t * f.speed * .8 + f.phase) * f.w * .35;

                    tongue(f.x, f.w, h, sway, layer.c0, layer.c1, layer.alpha);
                });
            });

            /* braises */
            embers.forEach((e, i) => {

                if (!reducedMotion) {
                    e.y -= e.vy;
                    e.x += e.drift + Math.sin(t + e.phase) * .15;
                }

                if (e.y < -10) embers[i] = newEmber(false);

                const life = Math.max(0, Math.min(1, e.y / H));
                const flicker = .55 + .45 * Math.sin(t * e.flick + e.phase);
                const a = life * flicker * .8;

                glow(e.x, e.y, e.r * 5, "255,150,70", a * .25);

                ctx.fillStyle = "rgba(255,215,150," + a + ")";
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.r, 0, 6.283);
                ctx.fill();
            });

            ctx.globalCompositeOperation = "source-over";
        }

        build();

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(build, 200);
        });

        requestAnimationFrame(frame);

        if (reducedMotion) {
            window.addEventListener("scroll", () => requestAnimationFrame(frame), { passive: true });
        }
    }


    /* -----------------------------------------------------
       2. REFLET DE LUMIÈRE QUI SUIT LA SOURIS (desktop)
    ----------------------------------------------------- */

    if (canHover && !reducedMotion) {

        const sel = ".premium-card, .vehicle-card, .maintenance-card";

        document.querySelectorAll(sel).forEach(card => {
            if (card.querySelector(":scope > .glass-glow")) return;
            const glowEl = document.createElement("div");
            glowEl.className = "glass-glow";
            glowEl.setAttribute("aria-hidden", "true");
            card.appendChild(glowEl);
        });

        let ticking = false, lastEvent = null;

        document.addEventListener("mousemove", event => {
            lastEvent = event;
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                const card = lastEvent.target.closest(sel);
                if (!card) return;
                const r = card.getBoundingClientRect();
                card.style.setProperty("--mx", (lastEvent.clientX - r.left) + "px");
                card.style.setProperty("--my", (lastEvent.clientY - r.top) + "px");
            });
        }, { passive: true });
    }

})();

});
