document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE FOOTER
    ====================================================== */

    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }



    /* =====================================================
       FLAMMES
    ====================================================== */

    const flameField =
        document.querySelector(".flame-field");

    if (flameField) {

        const isMobile =
            window.innerWidth <= 800;

        const flameCount =
            isMobile ? 24 : 38;

        for (let i = 0; i < flameCount; i++) {

            const flame =
                document.createElement("div");

            flame.className = "flame";

            const size =
                Math.random() * 42 + 12;

            const left =
                Math.random() * 100;

            const duration =
                Math.random() * 10 + 9;

            const delay =
                Math.random() * -18;

            const drift =
                (Math.random() * 180 - 90) + "px";

            const opacity =
                Math.random() * .25 + .18;

            flame.style.width =
                `${size}px`;

            flame.style.height =
                `${size}px`;

            flame.style.left =
                `${left}%`;

            flame.style.animationDuration =
                `${duration}s`;

            flame.style.animationDelay =
                `${delay}s`;

            flame.style.setProperty(
                "--drift",
                drift
            );

            flame.style.opacity =
                opacity;

            flameField.appendChild(flame);
        }
    }



    /* =====================================================
       REVEAL DES ÉLÉMENTS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.10
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       NAVIGATION ACTIVE
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const id =
                            entry.target.id;

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );
                            }
                        });
                    }
                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });



    /* =====================================================
       LIENS PLACEHOLDERS
       UNIQUEMENT POUR href="#"
    ====================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById(
            "toast-message"
        );

    let toastTimer;

    placeholderLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                if (toastMessage) {

                    toastMessage.textContent =
                        "Lien à connecter à votre ressource.";
                }

                if (toast) {

                    toast.classList.add(
                        "show"
                    );

                    clearTimeout(
                        toastTimer
                    );

                    toastTimer =
                        setTimeout(() => {

                            toast.classList.remove(
                                "show"
                            );

                        }, 3000);
                }
            }
        );

    });



    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );

    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    document.querySelector(
                        ".site-header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const position =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        );

    });



    /* =====================================================
       TILT DES CARTES — DESKTOP
    ====================================================== */

    const premiumCards =
        document.querySelectorAll(
            ".premium-card"
        );

    const canHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;

    if (canHover) {

        premiumCards.forEach(card => {

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
                        ((x / rect.width) - .5) * 3;

                    const rotateX =
                        ((y / rect.height) - .5) * -3;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;
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
       ACCORDÉON / PANELS
    ====================================================== */

    const inventoryHeaders =
        document.querySelectorAll(
            ".inventory-header"
        );

    inventoryHeaders.forEach(header => {

        header.style.cursor =
            "default";
    });



    /* =====================================================
       EMPÊCHE LE TILT SUR LES BOUTONS
    ====================================================== */

    const inventoryButtons =
        document.querySelectorAll(
            ".inventory-button"
        );

    inventoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    });



    /* =====================================================
       RESIZE
    ====================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(() => {

                    document.body.classList.remove(
                        "is-resizing"
                    );

                }, 250);

            document.body.classList.add(
                "is-resizing"
            );
        }
    );

});
