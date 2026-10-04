/* =========================================================
   FLAMMES & EFFETS PREMIUM
   À coller dans script.js, juste avant la dernière ligne  });
   (ou à charger comme fichier séparé après script.js)
========================================================= */

(function () {

    const root = document.documentElement;

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canHover =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;


    /* -----------------------------------------------------
       1. MODE ALLÉGÉ (mobiles / appareils modestes)
    ----------------------------------------------------- */

    const lowPower =
        window.innerWidth <= 900 ||
        (navigator.hardwareConcurrency &&
            navigator.hardwareConcurrency <= 4) ||
        (navigator.deviceMemory &&
            navigator.deviceMemory <= 4);

    if (lowPower) {
        root.classList.add("flames-lite");
    }


    /* -----------------------------------------------------
       2. PAUSE QUAND L'ONGLET EST CACHÉ
    ----------------------------------------------------- */

    document.addEventListener("visibilitychange", () => {
        root.classList.toggle("flames-paused", document.hidden);
    });


    /* -----------------------------------------------------
       3. FLAMMES QUI RÉAGISSENT AU SCROLL
          --scroll-p : progression 0 → 1
          --flame-grow : les flammes montent en descendant
    ----------------------------------------------------- */

    if (!reducedMotion) {

        let scrollTicking = false;

        function updateScrollEffects() {

            const maxScroll =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                maxScroll > 0
                    ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
                    : 0;

            root.style.setProperty(
                "--scroll-p",
                progress.toFixed(3)
            );

            root.style.setProperty(
                "--flame-grow",
                (progress * 70).toFixed(1) + "px"
            );

            scrollTicking = false;
        }

        window.addEventListener(
            "scroll",
            () => {
                if (!scrollTicking) {
                    scrollTicking = true;
                    requestAnimationFrame(updateScrollEffects);
                }
            },
            { passive: true }
        );

        window.addEventListener("resize", updateScrollEffects);

        updateScrollEffects();
    }


    /* -----------------------------------------------------
       4. REFLET DE LUMIÈRE QUI SUIT LA SOURIS (desktop)
    ----------------------------------------------------- */

    if (canHover && !reducedMotion) {

        const glassSelector =
            ".premium-card, .vehicle-card, .maintenance-card";

        document
            .querySelectorAll(glassSelector)
            .forEach(card => {

                if (card.querySelector(":scope > .glass-glow")) return;

                const glow = document.createElement("div");

                glow.className = "glass-glow";

                glow.setAttribute("aria-hidden", "true");

                card.appendChild(glow);

            });


        let mouseTicking = false;

        let lastEvent = null;

        function updateGlow() {

            mouseTicking = false;

            if (!lastEvent) return;

            const card =
                lastEvent.target.closest(glassSelector);

            if (!card) return;

            const rect =
                card.getBoundingClientRect();

            card.style.setProperty(
                "--mx",
                (lastEvent.clientX - rect.left) + "px"
            );

            card.style.setProperty(
                "--my",
                (lastEvent.clientY - rect.top) + "px"
            );

        }

        document.addEventListener(
            "mousemove",
            event => {

                lastEvent = event;

                if (!mouseTicking) {
                    mouseTicking = true;
                    requestAnimationFrame(updateGlow);
                }

            },
            { passive: true }
        );

    }

})();
