document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE
    ===================================================== */

    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
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

        document.body.classList.add(
            "menu-open"
        );
    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        if (mobileOverlay) {
            mobileOverlay.classList.remove("open");
        }

        if (mobileToggle) {

            mobileToggle.classList.remove(
                "active"
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );
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
       NAVIGATION DES RUBRIQUES
       Une seule rubrique visible.
       Aucun smooth scroll.
    ===================================================== */

    const views =
        document.querySelectorAll(
            ".page-view"
        );

    const mainNavLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    function showView(targetId, updateHash = true) {

        if (!targetId) return;

        const cleanId =
            targetId.replace("#", "");


        /* ACCUEIL */

        if (cleanId === "accueil") {

            document.body.classList.remove(
                "category-view"
            );

            document.body.classList.add(
                "home-view"
            );

            views.forEach(view => {
                view.classList.remove(
                    "active"
                );
            });

        }


        /* AUTRES RUBRIQUES */

        else {

            const target =
                document.getElementById(
                    cleanId
                );

            if (!target) return;

            document.body.classList.remove(
                "home-view"
            );

            document.body.classList.add(
                "category-view"
            );

            views.forEach(view => {

                view.classList.toggle(
                    "active",
                    view.id === cleanId
                );

            });

        }


        /* MENU ACTIF */

        mainNavLinks.forEach(link => {

            const href =
                link.getAttribute(
                    "href"
                );

            link.classList.toggle(
                "active",
                href === `#${cleanId}`
            );

        });


        /* HASH */

        if (updateHash) {

            history.pushState(
                null,
                "",
                `#${cleanId}`
            );
        }


        /* RETOUR EN HAUT IMMÉDIAT */

        window.scrollTo(
            0,
            0
        );

    }


    /* NAVIGATION PRINCIPALE */

    document
        .querySelectorAll(
            '.main-nav a[href^="#"], .mobile-nav-link[href^="#"], .quick-card[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );

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
                        document.getElementById(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    showView(
                        targetId
                    );

                }
            );

        });


    /* BOUTON RETOUR NAVIGATEUR */

    window.addEventListener(
        "popstate",
        () => {

            const hash =
                window.location.hash
                    ? window.location.hash.substring(1)
                    : "accueil";

            showView(
                hash,
                false
            );

        }
    );


    /* ÉTAT INITIAL */

    const initialHash =
        window.location.hash
            ? window.location.hash.substring(1)
            : "accueil";

    showView(
        initialHash,
        false
    );


    /* =====================================================
       CARTES DÉPLIABLES
       UNIQUEMENT INVENTAIRES + ENTRETIENS
    ===================================================== */

    const collapsibleCards =
        document.querySelectorAll(
            "[data-collapsible]"
        );


    function toggleCard(card) {

        if (!card) return;

        const isOpen =
            card.classList.contains(
                "open"
            );

        card.classList.toggle(
            "open",
            !isOpen
        );


        const plus =
            card.querySelector(
                ".inventory-plus"
            );


        if (plus) {

            plus.textContent =
                isOpen
                    ? "+"
                    : "−";
        }


        const header =
            card.querySelector(
                ".inventory-header"
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
                ".inventory-header"
            );

        if (!header) return;


        /* État initial fermé */

        card.classList.remove(
            "open"
        );


        const plus =
            header.querySelector(
                ".inventory-plus"
            );


        if (plus) {
            plus.textContent = "+";
        }


        /* CLIC */

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


        /* CLAVIER */

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
       FLAMMES PREMIUM
    ===================================================== */

    const flamesContainer =
        document.querySelector(
            ".portal-stage .flames"
        );


    if (flamesContainer) {

        const flameCount = 34;


        for (
            let i = 0;
            i < flameCount;
            i++
        ) {

            const flame =
                document.createElement(
                    "span"
                );


            /*
             * Répartition sur toute la hauteur
             */

            flame.style.left =
                `${Math.random() * 100}%`;

            flame.style.top =
                `${8 + Math.random() * 82}%`;


            /*
             * Taille
             */

            flame.style.width =
                `${8 + Math.random() * 12}px`;

            flame.style.height =
                `${28 + Math.random() * 52}px`;


            /*
             * Animation
             */

            flame.style.animationDelay =
                `${Math.random() * 5}s`;

            flame.style.animationDuration =
                `${3.8 + Math.random() * 3.2}s`;


            /*
             * Opacité
             */

            flame.style.opacity =
                `${0.22 + Math.random() * 0.32}`;


            /*
             * Légère variation
             */

            flame.style.transform =
                `rotate(${(-8 + Math.random() * 16).toFixed(1)}deg)`;


            flamesContainer.appendChild(
                flame
            );

        }

    }


    /* =====================================================
       LIENS PLACEHOLDER #
    ===================================================== */

    const toast =
        document.getElementById(
            "toast"
        );


    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    if (!toast) return;

                    toast.classList.add(
                        "show"
                    );


                    clearTimeout(
                        toast._timer
                    );


                    toast._timer =
                        setTimeout(
                            () => {

                                toast.classList.remove(
                                    "show"
                                );

                            },
                            2500
                        );

                }
            );

        });


    /* =====================================================
       EMPÊCHE LES CLICS SUR LES LIENS
       DE REMONTER VERS LA CARTE
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
