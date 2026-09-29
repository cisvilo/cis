/* =========================================================
   CIS VILLENAVE — INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE
    ====================================================== */

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       FLAMMES DISCRÈTES
    ====================================================== */

    const flameField = document.querySelector(".flame-field");

    if (flameField) {

        const flameCount = 24;

        for (let i = 0; i < flameCount; i++) {

            const flame = document.createElement("span");

            flame.className = "flame";

            const size =
                Math.floor(
                    Math.random() * 24
                ) + 10;

            const x =
                Math.floor(
                    Math.random() * 100
                );

            const duration =
                (
                    Math.random() * 7 + 7
                ).toFixed(2);

            const delay =
                (
                    Math.random() * -12
                ).toFixed(2);

            const drift =
                (
                    Math.random() * 120 - 60
                ).toFixed(0);

            const opacity =
                (
                    Math.random() * 0.25 + 0.08
                ).toFixed(2);

            flame.style.setProperty(
                "--size",
                `${size}px`
            );

            flame.style.setProperty(
                "--x",
                `${x}%`
            );

            flame.style.setProperty(
                "--duration",
                `${duration}s`
            );

            flame.style.setProperty(
                "--delay",
                `${delay}s`
            );

            flame.style.setProperty(
                "--drift",
                `${drift}px`
            );

            flame.style.setProperty(
                "--opacity",
                opacity
            );

            flameField.appendChild(flame);
        }
    }


    /* =====================================================
       APPARITION DES CARTES
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

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

        revealElements.forEach(
            element => revealObserver.observe(element)
        );

    } else {

        revealElements.forEach(
            element =>
                element.classList.add("visible")
        );
    }


    /* =====================================================
       NAVIGATION ACTIVE
    ====================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        const target =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            target === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",
                threshold: 0
            }
        );

    sections.forEach(
        section =>
            sectionObserver.observe(section)
    );


    /* =====================================================
       LIENS AVEC "#"
    ====================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    placeholderLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showMessage(
                    "Lien à connecter à votre ressource."
                );
            }
        );

    });


    /* =====================================================
       MESSAGE DISCRET
    ====================================================== */

    function showMessage(message) {

        let toast =
            document.querySelector(".site-toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className =
                "site-toast";

            document.body.appendChild(toast);
        }

        toast.textContent = message;

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        clearTimeout(
            window.__toastTimer
        );

        window.__toastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 2600);
    }


    /* =====================================================
       EFFET PREMIUM SUR LES CARTES
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".premium-card"
        );

    const canTilt =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (canTilt) {

        cards.forEach(card => {

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
                        ((x / rect.width) - 0.5)
                        * 2.5;

                    const rotateX =
                        ((y / rect.height) - 0.5)
                        * -2.5;

                    card.style.transform =
                        `
                        translateY(-5px)
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;
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
       OUVERTURE DES DETAILS
    ====================================================== */

    const details =
        document.querySelectorAll(
            ".inventory-card"
        );

    details.forEach(detail => {

        detail.addEventListener(
            "toggle",
            () => {

                if (!detail.open) {
                    return;
                }

                details.forEach(other => {

                    if (
                        other !== detail &&
                        other.open
                    ) {
                        other.open = false;
                    }

                });

            }
        );

    });


    /* =====================================================
       SCROLL FLUIDE
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    history.replaceState(
                        null,
                        "",
                        targetId
                    );
                }
            );

        });

});
