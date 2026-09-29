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

            if (
                mobileMenu?.classList.contains("open")
            ) {
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
       ACCORDÉONS
       
       UNE SEULE CARTE OUVERTE PAR GRILLE.
       AUCUN SCROLL AUTOMATIQUE.
    ===================================================== */

    const collapsibleCards =
        document.querySelectorAll(
            "[data-collapsible]"
        );


    function getCardGroup(card) {

        const inventoryGrid =
            card.closest(".inventory-grid");

        if (inventoryGrid) {
            return inventoryGrid;
        }


        const resourceGrid =
            card.closest(".resource-grid");

        if (resourceGrid) {
            return resourceGrid;
        }


        if (
            card.classList.contains(
                "entretien-card"
            )
        ) {
            return card.parentElement;
        }


        return card.parentElement;
    }


    function closeOtherCards(currentCard) {

        const group =
            getCardGroup(currentCard);

        if (!group) return;


        const cards =
            group.querySelectorAll(
                "[data-collapsible]"
            );


        cards.forEach(card => {

            if (card === currentCard) {
                return;
            }


            card.classList.remove("open");


            const plus =
                card.querySelector(
                    ".inventory-plus, .resource-plus"
                );


            if (plus) {
                plus.textContent = "+";
            }

        });

    }


    collapsibleCards.forEach(card => {

        const header =
            card.querySelector(
                ".inventory-header, .resource-header"
            );


        const plus =
            card.querySelector(
                ".inventory-plus, .resource-plus"
            );


        if (!header) return;


        function toggleCard(event) {

            if (
                event &&
                event.target.closest(
                    "a, button"
                )
            ) {
                return;
            }


            const isOpen =
                card.classList.contains("open");


            if (isOpen) {

                card.classList.remove("open");

                if (plus) {
                    plus.textContent = "+";
                }

                return;
            }


            closeOtherCards(card);


            card.classList.add("open");


            if (plus) {
                plus.textContent = "−";
            }

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
            toggleCard
        );


        header.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleCard(event);
                }

            }
        );

    });


    /* =====================================================
       PHOTOS DES VÉHICULES
       ENTRETIENS
    ===================================================== */

    const vehicleImages = {

        "FPT 01":
            "https://www.usfirepolice.net/france_62/france_62_vitry_en_artois_fpt_%282%29-1.JPG",

        "FPTGP 02":
            "https://www.usfirepolice.net/france_62/france_62_vitry_en_artois_fpt_%282%29-1.JPG",

        "ECH":
            "https://cloudfront-eu-central-1.images.arcpublishing.com/leparisien/PRNAZMXQHNC2TOBAZTY3PUM2JY.jpg",

        "VSAV 1":
            "https://up.autotitre.com/1c78a63715.jpg",

        "VSAV 2":
            "https://up.autotitre.com/1c78a63715.jpg",

        "VSAV 3":
            "https://up.autotitre.com/1c78a63715.jpg",

        "CCF 1":
            "https://pompieractu.fr/storage/articles/pompieractufr/definition-ccf-camion-citerne-feux-forets-pompiers-francais/featured-1nGRrpceYimnNcyH.jpg",

        "CCF 2":
            "https://pompieractu.fr/storage/articles/pompieractufr/definition-ccf-camion-citerne-feux-forets-pompiers-francais/featured-1nGRrpceYimnNcyH.jpg",

        "VLHR":
            "https://www.usfirepolice.net/france_62/france_62_montreuil_sur_mer_vlhr_%287%29-1.jpg",

        "FMOGP":
            "https://www.usfirepolice.net/france_75/france_75_bspp_1_10_3_fmogp_1-3.jpg",

        "VSR M":
            "https://sapeurs-pompiers35.fr/content/uploads/2017/07/VSR_1.jpg",

        "VTU 1 (VIA)":
            "https://pompiersstpaul3chateaux.fr/images/a/vehicules_vtu_med_hr-688-692.jpg",

        "VTU 2":
            "https://www.usfirepolice.net/france_62/france_62_montreuil_sur_mer_vlhr_%287%29-1.jpg",

        "VLS 1":
            "https://up.autotitre.com/50ac913d07.jpg",

        "VLS 2":
            "https://up.autotitre.com/50ac913d07.jpg",

        "VLS 3":
            "https://up.autotitre.com/50ac913d07.jpg",

        "V DRONE":
            "https://www.sdis50.fr/app/uploads/2026/03/IMG_8196-1024x683.jpg"
    };


    document
        .querySelectorAll(".maintenance-card")
        .forEach(card => {

            const titleElement =
                card.querySelector("strong");

            if (!titleElement) return;


            const vehicleName =
                titleElement.textContent
                    .trim()
                    .replace(/\s+/g, " ");


            const imageUrl =
                vehicleImages[vehicleName];


            if (!imageUrl) return;


            const oldImage =
                card.querySelector(
                    ".maintenance-image"
                );


            if (oldImage) {
                oldImage.remove();
            }


            const image =
                document.createElement("div");

            image.className =
                "maintenance-image";


            image.style.backgroundImage =
                `url("${imageUrl}")`;


            const icon =
                card.querySelector("span");


            const strong =
                card.querySelector("strong");


            const small =
                card.querySelector("small");


            const info =
                document.createElement("div");


            info.className =
                "maintenance-info";


            if (icon) {
                info.appendChild(icon);
            }


            if (strong) {
                info.appendChild(strong);
            }


            if (small) {
                info.appendChild(small);
            }


            card.insertBefore(
                image,
                card.firstChild
            );


            card.appendChild(info);

        });


    /* =====================================================
       RÉVÈLEMENT DES CARTES
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .08
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       TILT DES CARTES — DESKTOP
       
       Les accordéons ne bougent pas.
    ===================================================== */

    if (window.innerWidth > 1000) {

        document
            .querySelectorAll(
                ".premium-card"
            )
            .forEach(card => {

                if (
                    card.hasAttribute(
                        "data-collapsible"
                    )
                ) {
                    return;
                }


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
                            -((y / rect.height) - .5) * 2;


                        card.style.transform =
                            `
                            translateY(-5px)
                            perspective(700px)
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

            });

    }


    /* =====================================================
       SUPPRESSION DES FLÈCHES ÉVENTUELLES
    ===================================================== */

    document
        .querySelectorAll(
            "a b, a .arrow, a .external-arrow"
        )
        .forEach(element => {

            element.remove();

        });

});

