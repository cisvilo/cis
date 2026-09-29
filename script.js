/* =========================================================
   CIS VILLENAVE — INTERACTIONS PREMIUM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ANNÉE
    ====================================================== */

    const year =
        document.getElementById("current-year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       FLAMMES PREMIUM
    ====================================================== */

    const flameField =
        document.querySelector(".flame-field");


    if (flameField) {

        /*
           Plus de flammes qu'avant,
           mais de tailles variées.
        */

        const flameCount =
            window.innerWidth <= 800
                ? 32
                : 42;


        for (
            let i = 0;
            i < flameCount;
            i++
        ) {

            const flame =
                document.createElement("span");


            flame.className =
                "flame";


            /*
               Taille :
               certaines flammes sont
               petites, d'autres plus grandes.
            */

            const size =
                Math.floor(
                    Math.random() * 42
                ) + 12;


            /*
               Position horizontale
            */

            const x =
                Math.floor(
                    Math.random() * 100
                );


            /*
               Durée d'animation
            */

            const duration =
                (
                    Math.random() * 6 + 7
                ).toFixed(2);


            /*
               Décalage initial
            */

            const delay =
                (
                    Math.random() * -14
                ).toFixed(2);


            /*
               Mouvement horizontal
            */

            const drift =
                (
                    Math.random() * 150 - 75
                ).toFixed(0);


            /*
               Opacité :
               suffisamment visible pour
               qu'elles ne disparaissent pas.
            */

            const opacity =
                (
                    Math.random() * .25 + .22
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


            flameField.appendChild(
                flame
            );

        }

    }


    /* =====================================================
       APPARITION DES CARTES
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.08
                }

            );


        revealElements.forEach(
            element =>
                revealObserver.observe(
                    element
                )
        );

    }

    else {

        revealElements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

    }


    /* =====================================================
       NAVIGATION ACTIVE
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(
                            link => {

                                const target =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    target ===
                                    `#${id}`
                                );

                            }
                        );

                    }
                );

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }

        );


    sections.forEach(
        section =>
            sectionObserver.observe(
                section
            )
    );


    /* =====================================================
       LIENS PLACEHOLDERS
    ====================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    placeholderLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    showMessage(
                        "Lien à connecter à votre ressource."
                    );

                }
            );

        }
    );


    /* =====================================================
       MESSAGE
    ====================================================== */

    function showMessage(message) {

        let toast =
            document.querySelector(
                ".site-toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );


            toast.className =
                "site-toast";


            /*
               Style directement injecté
               pour ne pas obliger à modifier
               le CSS.
            */

            toast.style.position =
                "fixed";

            toast.style.left =
                "50%";

            toast.style.bottom =
                "25px";

            toast.style.transform =
                "translate(-50%,20px)";

            toast.style.padding =
                "13px 20px";

            toast.style.background =
                "rgba(7,22,36,.95)";

            toast.style.border =
                "1px solid rgba(225,74,88,.30)";

            toast.style.borderRadius =
                "10px";

            toast.style.color =
                "#ffffff";

            toast.style.fontSize =
                "11px";

            toast.style.fontWeight =
                "700";

            toast.style.letterSpacing =
                ".04em";

            toast.style.boxShadow =
                "0 15px 40px rgba(0,0,0,.40)";

            toast.style.opacity =
                "0";

            toast.style.transition =
                ".3s ease";

            toast.style.zIndex =
                "99999";


            document.body.appendChild(
                toast
            );

        }


        toast.textContent =
            message;


        requestAnimationFrame(
            () => {

                toast.style.opacity =
                    "1";

                toast.style.transform =
                    "translate(-50%,0)";

            }
        );


        clearTimeout(
            window.__toastTimer
        );


        window.__toastTimer =
            setTimeout(
                () => {

                    toast.style.opacity =
                        "0";

                    toast.style.transform =
                        "translate(-50%,20px)";

                },
                2600
            );

    }


    /* =====================================================
       EFFET PREMIUM DES CARTES
       UNIQUEMENT ORDINATEUR
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

        cards.forEach(
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
                                x /
                                rect.width
                                - .5
                            ) * 2.2;


                        const rotateX =
                            (
                                y /
                                rect.height
                                - .5
                            ) * -2.2;


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

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       ACCORDÉON INVENTAIRES
    ====================================================== */

    const details =
        document.querySelectorAll(
            ".inventory-card"
        );


    details.forEach(
        detail => {

            detail.addEventListener(
                "toggle",
                () => {

                    if (!detail.open) {
                        return;
                    }


                    details.forEach(
                        other => {

                            if (
                                other !== detail
                                &&
                                other.open
                            ) {

                                other.open =
                                    false;

                            }

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       SCROLL FLUIDE
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        )
        .forEach(
            link => {

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

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });


                        history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    }
                );

            }
        );


    /* =====================================================
       PETITE ADAPTATION FLAMMES
       SI ON CHANGE LA TAILLE DE LA FENÊTRE
    ====================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        /*
                           On ne recrée pas les flammes
                           en boucle : cela évite de
                           surcharger le téléphone.
                        */

                    },
                    250
                );

        }
    );

});
