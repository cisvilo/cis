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
       CARTES DÉPLIABLES
       Inventaires
       Entretiens
       Documents
       Amicale
       Raccourcis
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
                isOpen ? "false" : "true"
            );
        }
    }


    collapsibleCards.forEach(card => {

        const header =
            card.querySelector(
                ".inventory-header, .resource-header"
            );

        if (!header) return;


        /* État initial : fermé */

        card.classList.remove("open");


        const plus =
            header.querySelector(
                ".inventory-plus, .resource-plus"
            );

        if (plus) {
            plus.textContent = "+";
        }


        /* Clic souris / tactile */

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


        /* Accessibilité clavier */

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
    ===================================================== */

    const flamesContainer =
        document.querySelector(".flames");


    if (flamesContainer) {

        const flameCount = 28;


        for (
            let i = 0;
            i < flameCount;
            i++
        ) {

            const flame =
                document.createElement("span");


            flame.style.left =
                `${Math.random() * 100}%`;


            flame.style.animationDelay =
                `${Math.random() * 2.5}s`;


            flame.style.animationDuration =
                `${2 + Math.random() * 2}s`;


            flame.style.width =
                `${10 + Math.random() * 18}px`;


            flame.style.height =
                `${35 + Math.random() * 55}px`;


            flame.style.opacity =
                `${0.45 + Math.random() * 0.5}`;


            flamesContainer.appendChild(
                flame
            );
        }
    }


    /* =====================================================
       REVEAL AU SCROLL
       Conservé : ce n'est PAS le smooth scroll.
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       LIENS #
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

                        setTimeout(() => {

                            toast.classList.remove(
                                "show"
                            );

                        }, 2500);
                    }
                }
            );
        });


    /* =====================================================
       IMPORTANT :
       SMOOTH SCROLL SUPPRIMÉ
    =====================================================

       Il n'y a volontairement plus de :

       window.scrollTo({
           behavior: "smooth"
       });

       Les liens # utilisent maintenant
       le comportement normal du navigateur.
    ===================================================== */


    /* =====================================================
       EFFET TILT
       Désactivé sur les cartes dépliables
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

        tiltCards.forEach(card => {

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
                        ((x / rect.width) - 0.5) * 4;


                    const rotateX =
                        ((y / rect.height) - 0.5) * -4;


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

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       EMPÊCHE L'OUVERTURE D'UNE CARTE PARENT
       QUAND ON CLIQUE SUR UN LIEN
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
