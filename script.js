
document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ANNÉE
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
            isMobile ? 20 : 34;

        for (let i = 0; i < flameCount; i++) {

            const flame =
                document.createElement("div");

            flame.className = "flame";

            const size =
                Math.random() * 34 + 10;

            const left =
                Math.random() * 100;

            const duration =
                Math.random() * 11 + 10;

            const delay =
                Math.random() * -20;

            const drift =
                (Math.random() * 160 - 80) + "px";

            const opacity =
                Math.random() * .20 + .12;

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
       REVEAL
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
                threshold:.08
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       NAVIGATION DESKTOP ACTIVE
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

                    if (!entry.isIntersecting) {
                        return;
                    }

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
       MENU MOBILE
    ====================================================== */

    const mobileToggle =
        document.getElementById(
            "mobile-menu-toggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );

    const mobileOverlay =
        document.getElementById(
            "mobile-menu-overlay"
        );

    const mobileClose =
        document.getElementById(
            "mobile-menu-close"
        );

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-nav-link"
        );


    function openMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.add("open");

        mobileOverlay?.classList.add("open");

        mobileToggle?.classList.add("active");

        mobileToggle?.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );
    }


    function closeMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.remove("open");

        mobileOverlay?.classList.remove("open");

        mobileToggle?.classList.remove("active");

        mobileToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );
    }


    mobileToggle?.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu?.classList.contains(
                    "open"
                );

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        }
    );


    mobileClose?.addEventListener(
        "click",
        closeMobileMenu
    );


    mobileOverlay?.addEventListener(
        "click",
        closeMobileMenu
    );


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
       LIENS PLACEHOLDERS
       UNIQUEMENT href="#"
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
                        "Cette ressource doit encore être connectée.";
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

                        }, 2600);
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
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    10;

                window.scrollTo({
                    top:position,
                    behavior:"smooth"
                });

            }
        );

    });


    /* =====================================================
       TILT DES CARTES — DESKTOP UNIQUEMENT
    ====================================================== */

    const premiumCards =
        document.querySelectorAll(
            ".premium-card"
        );

    const canHover =
        window.matchMedia(
            "(hover:hover)"
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
                        ((x / rect.width) - .5) * 2;

                    const rotateX =
                        ((y / rect.height) - .5) * -2;

                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       BOUTONS GOOGLE FORMS
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
       FERMETURE MENU SI ON PASSE EN DESKTOP
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {
                closeMobileMenu();
            }

        }
    );

});
