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
            closeMobileMenu
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
       NAVIGATION
       UNE SEULE RUBRIQUE VISIBLE
       PAS DE SMOOTH SCROLL
    ===================================================== */

    const views =
        document.querySelectorAll(".page-view");

    const mainNavLinks =
        document.querySelectorAll(".main-nav a");


    function showView(
        targetId,
        updateHash = true
    ) {

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

                view.classList.remove("active");

            });

        }


        /* RUBRIQUE */

        else {

            const target =
                document.getElementById(cleanId);

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
                link.getAttribute("href");

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


        /* REMONTE EN HAUT */

        window.scrollTo(
            0,
            0
        );
    }


    /* =====================================================
       CLICS NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            '.main-nav a[href^="#"], ' +
            '.mobile-nav-link[href^="#"], ' +
            '.quick-card[href^="#"]'
        )
        .forEach(link => {

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

                    const target =
                        document.getElementById(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();

                    showView(targetId);

                }
            );

        });


    /* =====================================================
       BOUTON RETOUR NAVIGATEUR
    ===================================================== */

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


    /* =====================================================
       VUE INITIALE
    ===================================================== */

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
       UNIQUEMENT :
       - INVENTAIRES
       - ENTRETIENS
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
                ".inventory-plus"
            );


        if (plus) {

            plus.textContent =
                isOpen ? "+" : "−";

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


        card.classList.remove("open");


        const plus =
            header.querySelector(
                ".inventory-plus"
            );


        if (plus) {
            plus.textContent = "+";
        }


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
       ACCUEIL + RUBRIQUES
    ===================================================== */

    const flameContainers =
        document.querySelectorAll(
            ".home-stage .flames, " +
            ".portal-stage .flames"
        );


    function createFlames(container) {

        if (!container) return;


        container.innerHTML = "";


        const flameCount = 34;


        for (
            let i = 0;
            i < flameCount;
            i++
        ) {

            const flame =
                document.createElement("span");


            const left =
                ((i * 29) % 101);


            const top =
                8 + ((i * 17) % 78);


            const width =
                8 + ((i * 7) % 10);


            const height =
                32 + ((i * 13) % 42);


            const duration =
                4.4 + ((i * 0.37) % 2.8);


            const delay =
                -((i * 0.41) % 5);


            const opacity =
                0.28 + ((i * 0.021) % 0.28);


            flame.style.left =
                `${left}%`;

            flame.style.top =
                `${top}%`;

            flame.style.width =
                `${width}px`;

            flame.style.height =
                `${height}px`;

            flame.style.opacity =
                opacity.toFixed(2);


            flame.style.setProperty(
                "--flame-duration",
                `${duration.toFixed(2)}s`
            );


            flame.style.animationDelay =
                `${delay.toFixed(2)}s`;


            container.appendChild(
                flame
            );

        }

    }


    flameContainers.forEach(
        createFlames
    );


    /* =====================================================
       LIENS PLACEHOLDER
       UNIQUEMENT SI UN # EXISTE
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
       LIENS EXTERNES
       EMPÊCHE L'OUVERTURE D'UNE CARTE
       DÉPLIABLE PAR PROPAGATION
    ===================================================== */

    document
        .querySelectorAll(
            ".vehicle-card, " +
            ".maintenance-card, " +
            ".large-button"
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
