/* =========================================================
   CIS VILLENAVE — NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navButtons = document.querySelectorAll("[data-open]");
    const sections = document.querySelectorAll("main .page-section");

    /*
     * Les boutons qui possèdent data-open ouvrent
     * directement la section correspondante.
     */
    navButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const targetName = button.dataset.open;

            if (!targetName) return;

            openSection(targetName);

        });

    });


    /*
     * Ouvre une section
     */
    function openSection(name) {

        let target;

        if (name === "home") {
            target = document.getElementById("home");
        } else {
            target = document.getElementById(name);
        }

        if (!target) return;

        /*
         * Pour l'accueil, on remonte tout en haut.
         */
        if (name === "home") {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        updateActiveNavigation(name);
    }


    /*
     * Menu actif
     */
    function updateActiveNavigation(name) {

        document.querySelectorAll(".nav-item").forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.open === name
            );

        });

    }


    /*
     * Détection automatique de la section visible
     */
    const observer = new IntersectionObserver(
        entries => {

            const visibleSections = entries
                .filter(entry => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio -
                        a.intersectionRatio
                );

            if (!visibleSections.length) return;

            const section = visibleSections[0].target;

            if (section.id) {

                updateActiveNavigation(section.id);

            }

        },
        {
            threshold: [0.25, 0.5, 0.75],
            rootMargin: "-15% 0px -55% 0px"
        }
    );


    sections.forEach(section => {
        observer.observe(section);
    });


    /*
     * Cartes avec data-link
     */
    document.querySelectorAll("[data-link]").forEach(card => {

        card.addEventListener("click", event => {

            /*
             * Si l'utilisateur clique déjà sur
             * un lien interne, on ne fait rien.
             */
            if (event.target.closest("a")) return;

            const link = card.dataset.link;

            if (
                link &&
                link !== "#" &&
                link.trim() !== ""
            ) {
                window.location.href = link;
            }

        });

    });


    /*
     * Empêche les # de faire remonter la page.
     * À remplacer par tes vrais liens.
     */
    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", event => {
            event.preventDefault();
        });

    });


    /*
     * Animation des catégories d'inventaire
     */
    document
        .querySelectorAll(".inventory-category")
        .forEach(category => {

            category.addEventListener("toggle", () => {

                if (!category.open) return;

                document
                    .querySelectorAll(".inventory-category")
                    .forEach(other => {

                        if (
                            other !== category &&
                            other.open
                        ) {
                            other.open = false;
                        }

                    });

            });

        });


    /*
     * Effet léger de parallaxe sur la photo
     */
    const heroPhoto =
        document.querySelector(".hero-photo-frame");

    if (heroPhoto) {

        document.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) return;

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);

            heroPhoto.style.transform =
                `perspective(1000px)
                 rotateY(${x * -4}deg)
                 rotateX(${y * 2}deg)`;
        });

    }


    /*
     * Retour au comportement normal
     * quand la souris quitte l'écran.
     */
    document.addEventListener("mouseleave", () => {

        if (!heroPhoto) return;

        heroPhoto.style.transform =
            "perspective(1000px) rotateY(-4deg)";
    });


    /*
     * Touche ESC :
     * referme les catégories ouvertes.
     */
    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        document
            .querySelectorAll(".inventory-category[open]")
            .forEach(category => {
                category.open = false;
            });

    });

});
