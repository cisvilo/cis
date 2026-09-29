document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ANNÉE
    ===================================================== */

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const mobileMenuToggle =
        document.getElementById("mobile-menu-toggle");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileMenuOverlay =
        document.getElementById("mobile-menu-overlay");

    const mobileMenuClose =
        document.getElementById("mobile-menu-close");

    const mobileNavLinks =
        document.querySelectorAll(".mobile-nav-link");


    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        mobileMenuOverlay?.classList.add("open");

        mobileMenuToggle?.classList.add("active");

        mobileMenuToggle?.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        mobileMenuOverlay?.classList.remove("open");

        mobileMenuToggle?.classList.remove("active");

        mobileMenuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("menu-open");
    }


    mobileMenuToggle?.addEventListener(
        "click",
        () => {

            if (mobileMenu?.classList.contains("open")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        }
    );


    mobileMenuClose?.addEventListener(
        "click",
        closeMobileMenu
    );


    mobileMenuOverlay?.addEventListener(
        "click",
        closeMobileMenu
    );


    mobileNavLinks.forEach(link => {

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
       CARTES + / -
    ===================================================== */

    const inventoryCards =
        document.querySelectorAll(".inventory-card");


    inventoryCards.forEach(card => {

        const header =
            card.querySelector(".inventory-header");

        const plus =
            card.querySelector(".inventory-plus");


        if (!header) return;


        function toggleCard() {

            const isOpen =
                card.classList.contains("open");


            // On ferme la carte
            if (isOpen) {

                card.classList.remove("open");

                if (plus) {
                    plus.textContent = "+";
                }

                return;
            }


            // On ouvre la carte
            card.classList.add("open");

            if (plus) {
                plus.textContent = "−";
            }

        }


        header.addEventListener(
            "click",
            toggleCard
        );


        // Accessibilité clavier
        header.setAttribute(
            "tabindex",
            "0"
        );


        header.setAttribute(
            "role",
            "button"
        );


        header.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleCard();

                }

            }
        );

    });


    /* =====================================================
       ANIMATION DES FLAMMES
    ===================================================== */

    const flamesContainer =
        document.querySelector(".flames");


    if (flamesContainer) {

        const flameCount =
            window.innerWidth <= 800 ? 24 : 38;


        for (let i = 0; i < flameCount; i++) {

            const flame =
                document.createElement("span");


            flame.style.position = "absolute";

            flame.style.bottom =
                `${Math.random() * 5}px`;

            flame.style.left =
                `${Math.random() * 100}%`;

            flame.style.width =
                `${3 + Math.random() * 7}px`;

            flame.style.height =
                `${12 + Math.random() * 38}px`;

            flame.style.borderRadius =
                "50% 50% 35% 35%";

            flame.style.background =
                "rgba(237,82,98,.28)";

            flame.style.filter =
                "blur(3px)";

            flame.style.transform =
                `rotate(${Math.random() * 20 - 10}deg)`;

            flame.style.opacity =
                `${.15 + Math.random() * .35}`;

            flame.style.animation =
                `flameFloat ${2 + Math.random() * 3}s ease-in-out infinite alternate`;

            flame.style.animationDelay =
                `${Math.random() * 2}s`;


            flamesContainer.appendChild(flame);

        }

    }


    /* =====================================================
       ANIMATION FLAMMES DYNAMIQUES
    ===================================================== */

    if (!document.getElementById("flame-animation-style")) {

        const style =
            document.createElement("style");

        style.id =
            "flame-animation-style";


        style.textContent = `

            @keyframes flameFloat {

                0% {
                    transform:
                        translateY(0)
                        scale(.85)
                        rotate(-8deg);

                    opacity: .15;
                }

                50% {
                    opacity: .45;
                }

                100% {
                    transform:
                        translateY(-55px)
                        scale(1.15)
                        rotate(8deg);

                    opacity: .05;
                }

            }

        `;


        document.head.appendChild(style);

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
                    threshold: .08
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
       LIENS PLACEHOLDER #
    ===================================================== */

    const toast =
        document.getElementById("toast");


    let toastTimer;


    function showToast() {

        if (!toast) return;


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2600);

    }


    document
        .querySelectorAll('a[href="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    showToast();

                }
            );

        });


    /* =====================================================
       SCROLL FLUIDE
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    const target =
                        document.querySelector(targetId);


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       TILT DES CARTES — DESKTOP
    ===================================================== */

    if (window.innerWidth > 900) {

        document
            .querySelectorAll(".premium-card")
            .forEach(card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        if (
                            card.classList.contains(
                                "inventory-card"
                            )
                        ) {
                            return;
                        }


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
                            -((y / rect.height) - .5) * 2;


                        card.style.transform =
                            `translateY(-5px)
                             perspective(700px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)`;

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
       EMPÊCHER LES BOUTONS FORMULAIRES
       DE DÉCLENCHER LES AUTRES ACTIONS
    ===================================================== */

    document
        .querySelectorAll(".inventory-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                }
            );

        });


});
