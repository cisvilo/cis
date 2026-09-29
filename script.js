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
        document.getElementById(
            "mobile-menu-overlay"
        );

    const mobileClose =
        document.getElementById(
            "mobile-menu-close"
        );


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


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       CHANGEMENT DE VUE
       PAS DE LONGUE PAGE
       PAS DE SMOOTH SCROLL
    ===================================================== */

    const views =
        document.querySelectorAll(
            ".page-view"
        );

    const navigationLinks =
        document.querySelectorAll(
            "[data-view]"
        );


    function showView(viewName) {

        if (!viewName) {
            viewName = "accueil";
        }


        const target =
            document.querySelector(
                `.page-view[data-page="${viewName}"]`
            );


        if (!target) {
            return;
        }


        /* Cacher toutes les vues */

        views.forEach(view => {

            view.classList.remove(
                "active"
            );

        });


        /* Afficher uniquement la vue choisie */

        target.classList.add(
            "active"
        );


        /* Navigation active */

        document
            .querySelectorAll(
                ".main-nav a[data-view]"
            )
            .forEach(link => {

                link.classList.toggle(
                    "active",
                    link.dataset.view === viewName
                );

            });


        /* Fermer le menu mobile */

        closeMobileMenu();


        /* Retour immédiat en haut
           sans animation */

        window.scrollTo(
            0,
            0
        );


        /* Mise à jour du hash */

        if (
            window.location.hash !==
            `#${viewName}`
        ) {

            history.pushState(
                null,
                "",
                `#${viewName}`
            );
        }

    }


    navigationLinks.forEach(element => {

        element.addEventListener(
            "click",
            event => {

                const viewName =
                    element.dataset.view;

                if (!viewName) {
                    return;
                }


                event.preventDefault();

                showView(
                    viewName
                );

            }
        );

    });


    /* =====================================================
       CLAVIER SUR LES CARTES ACCUEIL
    ===================================================== */

    document
        .querySelectorAll(
            ".quick-card"
        )
        .forEach(card => {

            card.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        const viewName =
                            card.dataset.view;

                        showView(
                            viewName
                        );
                    }

                }
            );

        });


    /* =====================================================
       HASH AU CHARGEMENT
    ===================================================== */

    const initialHash =
        window.location.hash
            .replace("#", "")
            .trim();


    if (initialHash) {

        const initialView =
            document.querySelector(
                `.page-view[data-page="${initialHash}"]`
            );

        if (initialView) {

            views.forEach(view => {
                view.classList.remove(
                    "active"
                );
            });

            initialView.classList.add(
                "active"
            );

            document
                .querySelectorAll(
                    ".main-nav a[data-view]"
                )
                .forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.dataset.view ===
                        initialHash
                    );

                });

        }

    }


    /* =====================================================
       BOUTON PRÉCÉDENT / SUIVANT DU NAVIGATEUR
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            const hash =
                window.location.hash
                    .replace("#", "")
                    .trim();


            const viewName =
                hash || "accueil";


            const target =
                document.querySelector(
                    `.page-view[data-page="${viewName}"]`
                );


            if (!target) {
                return;
            }


            views.forEach(view => {

                view.classList.remove(
                    "active"
                );

            });


            target.classList.add(
                "active"
            );


            document
                .querySelectorAll(
                    ".main-nav a[data-view]"
                )
                .forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.dataset.view ===
                        viewName
                    );

                });


            window.scrollTo(
                0,
                0
            );

        }
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
            card.classList.contains(
                "open"
            );


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
                isOpen
                    ? "+"
                    : "−";
        }


        const header =
            card.querySelector(
                ".inventory-header, .resource-header, .entretien-header"
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


    collapsibleCards.forEach(
        card => {

            const header =
                card.querySelector(
                    ".inventory-header, .resource-header, .entretien-header"
                );


            if (!header) {
                return;
            }


            /* Fermé au départ */

            card.classList.remove(
                "open"
            );


            const plus =
                header.querySelector(
                    ".inventory-plus, .resource-plus"
                );


            if (plus) {
                plus.textContent = "+";
            }


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
                "click",
                event => {

                    if (
                        event.target.closest("a") ||
                        event.target.closest("button")
                    ) {
                        return;
                    }


                    toggleCard(
                        card
                    );

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

                        toggleCard(
                            card
                        );
                    }

                }
            );

        }
    );


    /* =====================================================
       FLAMMES
    ===================================================== */

    const flamesContainer =
        document.querySelector(
            ".flames"
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


            flame.style.left =
                `${Math.random() * 100}%`;


            flame.style.animationDelay =
                `${Math.random() * 2.5}s`;


            flame.style.animationDuration =
                `${2 + Math.random() * 2}s`;


            flame.style.width =
                `${10 + Math.random() * 18}px`;


            flame.style.height =
                `${35 + Math.random() * 65}px`;


            flame.style.opacity =
                `${0.45 + Math.random() * 0.5}`;


            flamesContainer.appendChild(
                flame
            );

        }

    }


    /* =====================================================
       LIENS #
       UNIQUEMENT POUR LES VRAIS LIENS NON CONFIGURÉS
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


                    if (!toast) {
                        return;
                    }


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
            );

        });


    /* =====================================================
       PAS DE REVEAL
       PAS D'INTERSECTION OBSERVER
       PAS D'ANIMATION D'APPARITION
    ===================================================== */


    /* =====================================================
       EFFET TILT
       UNIQUEMENT SUR LES CARTES NON DÉPLIABLES
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".premium-card:not(.inventory-card):not(.resource-card)"
        );


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        tiltCards.forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const rotateY =
                            (
                                (x / rect.width) -
                                0.5
                            ) * 4;


                        const rotateX =
                            (
                                (y / rect.height) -
                                0.5
                            ) * -4;


                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-3px)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


});
