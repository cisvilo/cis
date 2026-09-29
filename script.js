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

    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileOverlay = document.getElementById("mobile-menu-overlay");
    const mobileClose = document.getElementById("mobile-menu-close");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");


    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        if (mobileOverlay) {
            mobileOverlay.classList.add("open");
        }

        if (mobileToggle) {
            mobileToggle.setAttribute("aria-expanded", "true");
        }

        mobileMenu.setAttribute("aria-hidden", "false");

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        if (mobileOverlay) {
            mobileOverlay.classList.remove("open");
        }

        if (mobileToggle) {
            mobileToggle.setAttribute("aria-expanded", "false");
        }

        mobileMenu.setAttribute("aria-hidden", "true");

        document.body.classList.remove("menu-open");
    }


    if (mobileToggle) {
        mobileToggle.addEventListener("click", openMobileMenu);
    }


    if (mobileClose) {
        mobileClose.addEventListener("click", closeMobileMenu);
    }


    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeMobileMenu);
    }


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMobileMenu();
        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* =====================================================
       CARTES DÉPLIABLES
       Inventaires
       Entretiens
       Documents
       Amicale
       Raccourcis
    ===================================================== */

    const collapsibleCards = document.querySelectorAll(
        "[data-collapsible]"
    );


    function toggleCard(card) {

        if (!card) return;

        const isOpen = card.classList.contains("open");

        card.classList.toggle("open", !isOpen);

        const plus = card.querySelector(
            ".inventory-plus, .resource-plus"
        );

        if (plus) {
            plus.textContent = isOpen ? "+" : "−";
        }

    }


    collapsibleCards.forEach(card => {

        const header = card.querySelector(
            ".inventory-header, .resource-header"
        );

        if (!header) return;


        /* État initial : fermé */

        card.classList.remove("open");


        const plus = header.querySelector(
            ".inventory-plus, .resource-plus"
        );

        if (plus) {
            plus.textContent = "+";
        }


        /* Clic souris / tactile */

        header.addEventListener("click", event => {

            /*
             * On empêche uniquement les clics parasites
             * provenant d'un éventuel lien dans le header.
             */

            if (
                event.target.closest("a") ||
                event.target.closest("button")
            ) {
                return;
            }

            toggleCard(card);

        });


        /* Clavier */

        header.setAttribute("tabindex", "0");
        header.setAttribute("role", "button");
        header.setAttribute("aria-expanded", "false");


        header.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                toggleCard(card);

                header.setAttribute(
                    "aria-expanded",
                    card.classList.contains("open")
                        ? "true"
                        : "false"
                );

            }

        });


        /*
         * Mise à jour de aria-expanded après clic.
         */

        header.addEventListener("click", () => {

            header.setAttribute(
                "aria-expanded",
                card.classList.contains("open")
                    ? "true"
                    : "false"
            );

        });

    });


    /* =====================================================
       FLAMMES
    ===================================================== */

    const flamesContainer = document.querySelector(".flames");


    if (flamesContainer) {

        const flameCount = 18;

        for (let i = 0; i < flameCount; i++) {

            const flame = document.createElement("span");

            flame.style.left =
                `${Math.random() * 100}%`;

            flame.style.animationDelay =
                `${Math.random() * 2.5}s`;

            flame.style.animationDuration =
                `${2 + Math.random() * 2}s`;

            flame.style.transform =
                `scale(${0.5 + Math.random() * 0.8})`;

            flamesContainer.appendChild(flame);

        }


        const flameStyle = document.createElement("style");

        flameStyle.textContent = `

            @keyframes flameFloat {

                0% {
                    transform:
                        translateY(20px)
                        scale(.65)
                        rotate(-3deg);

                    opacity: 0;
                }

                25% {
                    opacity: .7;
                }

                70% {
                    opacity: .4;
                }

                100% {
                    transform:
                        translateY(-110px)
                        scale(1)
                        rotate(5deg);

                    opacity: 0;
                }

            }

            .flames span {
                position: absolute;
                bottom: 0;
                width: 18px;
                height: 42px;

                border-radius:
                    50% 50% 45% 45%;

                background:
                    linear-gradient(
                        to top,
                        rgba(184,32,50,.7),
                        rgba(237,82,98,.05)
                    );

                filter: blur(2px);

                animation:
                    flameFloat 3s ease-in-out infinite;
            }

        `;

        document.head.appendChild(flameStyle);

    }


    /* =====================================================
       REVEAL AU SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

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

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       LIENS #
    ===================================================== */

    const toast = document.getElementById("toast");

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            if (toast) {

                toast.classList.add("show");

                setTimeout(() => {

                    toast.classList.remove("show");

                }, 2500);

            }

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(".site-header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       EFFET TILT
       Désactivé sur les cartes dépliables
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".premium-card:not(.inventory-card):not(.resource-card)"
        );


    if (window.matchMedia("(pointer:fine)").matches) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 4;

                const rotateX =
                    ((y / rect.height) - 0.5) * -4;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-3px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       EMPÊCHE L'OUVERTURE D'UNE CARTE PARENT
       QUAND ON CLIQUE SUR UN BOUTON / LIEN INTERNE
    ===================================================== */

    document.querySelectorAll(
        ".inventory-button, .maintenance-card, .large-button"
    ).forEach(link => {

        link.addEventListener("click", event => {

            event.stopPropagation();

        });

    });


});
