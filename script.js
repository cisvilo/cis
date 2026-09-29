document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE
    ===================================================== */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const mobileToggle =
        document.getElementById("mobile-menu-toggle");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileOverlay =
        document.getElementById("mobile-menu-overlay");

    const mobileClose =
        document.getElementById("mobile-menu-close");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav-link");


    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        if (mobileOverlay) {
            mobileOverlay.classList.add("open");
        }

        if (mobileToggle) {

            mobileToggle.classList.add("active");

            mobileToggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        if (mobileOverlay) {
            mobileOverlay.classList.remove("open");
        }

        if (mobileToggle) {

            mobileToggle.classList.remove("active");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("menu-open");
    }


    if (mobileToggle) {
        mobileToggle.addEventListener(
            "click",
            openMobileMenu
        );
    }


    if (mobileClose) {
        mobileClose.addEventListener(
            "click",
            closeMobileMenu
        );
    }


    if (mobileOverlay) {
        mobileOverlay.addEventListener(
            "click",
            closeMobileMenu
        );
    }


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {
                closeMobileMenu();
            }
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       NAVIGATION ENTRE LES RUBRIQUES

       Une seule rubrique est affichée à la fois.
       Aucun smooth scroll.
    ===================================================== */

    const views = document.querySelectorAll(".page-view");

    const mainNavLinks =
        document.querySelectorAll(".main-nav a");

    const allNavigationLinks =
        document.querySelectorAll(
            '.main-nav a[href^="#"], .mobile-nav-link[href^="#"], .quick-card[href^="#"]'
        );


    function showView(targetId) {

        if (!targetId) return;

        const cleanId =
            targetId.replace("#", "");

        const target =
            document.getElementById(cleanId);

        if (!target) return;


        /*
         * ACCUEIL
         */

        if (cleanId === "accueil") {

            views.forEach(view => {
                view.classList.remove("active");
            });

            const hero =
                document.getElementById("accueil");

            if (hero) {
                hero.classList.add("active");
            }

            const accueilContent =
                document.querySelector(
                    '[data-view="accueil-content"]'
                );

            if (accueilContent) {
                accueilContent.classList.add("active");
            }

        } else {

            /*
             * Autres rubriques
             */

            views.forEach(view => {

                if (
                    view.id === cleanId ||
                    view.dataset.view === cleanId
                ) {
                    view.classList.add("active");
                } else {
                    view.classList.remove("active");
                }

            });

        }


        /*
         * Menu actif
         */

        mainNavLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${cleanId}`
            );

        });


        /*
         * Retour immédiat en haut.
         * Pas de smooth scroll.
         */

        window.scrollTo(0, 0);
    }


    allNavigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    !href.startsWith("#")
                ) {
                    return;
                }

                const targetId =
                    href.substring(1);

                if (!targetId) {
                    return;
                }

                const target =
                    document.getElementById(targetId);

                /*
                 * Les liens réels comme les Google Forms
                 * ne passent jamais ici car ils ne commencent
                 * pas par #.
                 */

                if (!target) {
                    return;
                }

                event.preventDefault();

                showView(targetId);

            }
        );

    });


    /*
     * État initial
     */

    showView(
        window.location.hash
            ? window.location.hash.substring(1)
            : "accueil"
    );


    /* =====================================================
       CARTES DÉPLIABLES
    ===================================================== */

    const collapsibleCards =
        document.querySelectorAll(
            "[data-collapsible]"
        );


    function toggleCard(card) {

        if (!card) return;

        const isOpen =
            card.classList.contains("open");


        card.classList.toggle(
            "open",
            !isOpen
        );


        const plus =
            card.querySelector(
                ".inventory-plus, .resource-plus"
            );


        if (plus) {

            plus.textContent =
                isOpen ? "+" : "−";
        }


        const header =
            card.querySelector(
                ".inventory-header, .resource-header"
            );


        if (header) {

            header.setAttribute(
                "aria-expanded",
                isOpen
                    ? "false"
                    : "true"
            );
        }

    }


    collapsibleCards.forEach(card => {

        const header =
            card.querySelector(
                ".inventory-header, .resource-header"
            );


        if (!header) return;


        /*
         * État initial fermé
         */

        card.classList.remove("open");


        const plus =
            header.querySelector(
                ".inventory-plus, .resource-plus"
            );


        if (plus) {
            plus.textContent = "+";
        }


        /*
         * Clic
         */

        header.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest("a") ||
                    event.target.closest("button")
                ) {
                    return;
                }

                toggleCard(card);
            }
        );


        /*
         * Accessibilité clavier
         */

        header.setAttribute(
            "tabindex",
            "0"
        );

        header.setAttribute(
            "role",
            "button"
        );

        header.setAttribute(
            "aria-expanded",
            "false"
        );


        header.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleCard(card);
                }

            }
        );

    });


    /* =====================================================
       FLAMMES

       Flammes très discrètes derrière les cartes.
    ===================================================== */

    const flamesContainer =
        document.querySelector(
            ".portal-stage .flames"
        );


    if (flamesContainer) {

        const flameCount = 24;


        for (
            let i = 0;
            i < flameCount;
            i++
        ) {

            const flame =
                document.createElement("span");


            flame.style.left =
                `${Math.random() * 100}%`;


            flame.style.bottom =
                `${10 + Math.random() * 55}%`;


            flame.style.animationDelay =
                `${Math.random() * 4}s`;


            flame.style.animationDuration =
                `${4 + Math.random() * 3}s`;


            flame.style.width =
                `${8 + Math.random() * 12}px`;


            flame.style.height =
                `${25 + Math.random() * 50}px`;


            flame.style.opacity =
                `${0.15 + Math.random() * 0.25}`;


            flamesContainer.appendChild(
                flame
            );

        }

    }


    /* =====================================================
       LIENS #

       Les cartes placeholder affichent le toast.
    ===================================================== */

    const toast =
        document.getElementById("toast");


    document
        .querySelectorAll('a[href="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    if (toast) {

                        toast.classList.add(
                            "show"
                        );


                        setTimeout(
                            () => {

                                toast.classList.remove(
                                    "show"
                                );

                            },
                            2500
                        );

                    }

                }
            );

        });


    /* =====================================================
       EMPÊCHE L'OUVERTURE D'UNE CARTE PARENT
       QUAND ON CLIQUE SUR UN VRAI LIEN
    ===================================================== */

    document
        .querySelectorAll(
            ".inventory-button, .maintenance-card, .large-button"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                }
            );

        });

});
