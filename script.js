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
                mobileMenu?.classList.contains(
                    "open"
                )
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
       - INVENTAIRES
       - DOCUMENTS
       - AMICALE
       - RACCOURCIS
       - ENTRETIENS
       
       IMPORTANT :
       aucun scroll automatique.
       une seule carte ouverte à la fois
       dans chaque groupe.
    ===================================================== */

    const collapsibleCards =
        document.querySelectorAll(
            '[data-collapsible]'
        );


    function closeOtherCards(
        currentCard
    ) {

        const parent =
            currentCard.parentElement;

        if (!parent) return;

        const cards =
            parent.querySelectorAll(
                '[data-collapsible]'
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


        function toggleCard(
            event
        ) {

            /*
             * Empêche un clic sur la carte
             * de provoquer une navigation.
             */

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

                card.classList.remove(
                    "open"
                );

                if (plus) {
                    plus.textContent = "+";
                }

                return;
            }


            /*
             * Ferme les autres cartes
             * du même groupe.
             */

            closeOtherCards(card);


            card.classList.add("open");

            if (plus) {
                plus.textContent = "−";
            }

            /*
             * AUCUN scrollIntoView ici.
             *
             * Donc la page reste exactement
             * à la position où l'utilisateur
             * a cliqué.
             */
        }


        header.setAttribute(
            "tabindex",
            "0"
        );

        header.setAttribute(
            "role",
            "button"
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
       PHOTOS DES VÉHICULES — ENTRETIENS
       
       Photos publiques d'illustration.
       Elles correspondent au type de véhicule.
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
            "https://pompiersstpaul3chateaux.fr/images/a/vehicules_vtu_med_hr-688-692.jpg",

        "VLS 1":
            "https://up.autotitre.com/50ac913d07.jpg",

        "VLS 2":
            "https://up.autotitre.com/50ac913d07.jpg",

        "VLS 3":
            "https://up.autotitre.com/50ac913d07.jpg",

        "V DRONE":
            "https://www.sdis50.fr/app/uploads/2026/03/IMG_8196-1024x683.jpg"
    };


    /*
     * Ajoute automatiquement une photo
     * dans chaque carte entretien.
     */

    document
        .querySelectorAll(".maintenance-card")
        .forEach(card => {

            const titleElement =
                card.querySelector("strong");

            if (!titleElement) return;

            const vehicleName =
                titleElement.textContent.trim();

            const imageUrl =
                vehicleImages[vehicleName];

            if (!imageUrl) return;


            /*
             * On évite de créer deux fois
             * la même image.
             */

            if (
                card.querySelector(
                    ".maintenance-image"
                )
            ) {
                return;
            }


            const image =
                document.createElement("div");

            image.className =
                "maintenance-image";


            image.style.backgroundImage =
                `url("${imageUrl}")`;


            /*
             * On déplace les éléments texte
             * dans une zone propre.
             */

            const icon =
                card.querySelector("span");

            const strong =
                card.querySelector("strong");

            const small =
                card.querySelector("small");

            const arrow =
                card.querySelector("b");


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

            if (arrow) {
                info.appendChild(arrow);
            }


            card.insertBefore(
                image,
                card.firstChild
            );


            card.appendChild(info);

        });


    /* =====================================================
       AMICALE
       
       Les anciennes cartes sont conservées
       mais leur contenu est remplacé par
       les liens directs fournis.
    ===================================================== */

    const amicaleLinks = {

        "01": {
            title: "NOUVEAUTÉS",
            subtitle: "Sorties et actualités",
            links: [

                [
                    "SOIRÉE ENJOY 33 — 08 SEPTEMBRE",
                    "https://forms.gle/vmvFjFrtcmnVrP6C6"
                ],

                [
                    "TOURNOI PADEL — 22/09",
                    "https://docs.google.com/forms/d/e/1FAIpQLSd1wey0THEvrfyJRKpnmwYdVHR6nzq0e44UvZT1F9QPhXm8wA/viewform?usp=dialog"
                ],

                [
                    "UBB — STADE FRANÇAIS — 20/09",
                    "https://docs.google.com/forms/d/e/1FAIpQLScgOl8zBbhS4iuNMQ8nazXS38Ex17I8-0gZhKyiwXZ-lgw2DA/viewform?usp=header"
                ],

                [
                    "SPEEDPARK — 05 ET 12 OCTOBRE",
                    "https://docs.google.com/forms/d/e/1FAIpQLSf3ZJ1FjxqNDaW_wky0Gr4klqyzqpKVr1sR_6Zs3h0igpL1ag/viewform?usp=header"
                ],

                [
                    "LOCATION MATÉRIEL JOLT",
                    "https://forms.gle/ZxMAxuXU16isUjD78"
                ]

            ]
        },


        "02": {
            title: "INSCRIPTIONS / COMMANDES",
            subtitle: "Sorties, commandes et inscriptions",
            links: [

                [
                    "SOIRÉE ENJOY — INSCRIPTION",
                    "https://docs.google.com/forms/d/e/1FAIpQLSdwZr5wQbEGY4oT7HKPXYKjQwi0LDVIzDobKQmyK479s0RlJA/viewform?usp=header"
                ],

                [
                    "INSCRIPTIONS MATCH UBB — STADE FRANÇAIS",
                    "https://docs.google.com/forms/d/e/1FAIpQLScgOl8zBbhS4iuNMQ8nazXS38Ex17I8-0gZhKyiwXZ-lgw2DA/viewform?usp=header"
                ],

                [
                    "RAPPEL DES RÈGLES D'ATTRIBUTION",
                    "https://drive.google.com/file/d/1VleKfAE5S1V0WXyCBqhueX9uqhXzTyOm/view?usp=sharing"
                ],

                [
                    "TOURNOI PADEL 22/09",
                    "https://docs.google.com/forms/d/e/1FAIpQLSd1wey0THEvrfyJRKpnmwYdVHR6nzq0e44UvZT1F9QPhXm8wA/viewform?usp=dialog"
                ],

                [
                    "SOIRÉE SPEEDPARK — 05 ET 12 OCTOBRE",
                    "https://docs.google.com/forms/d/e/1FAIpQLSf3ZJ1FjxqNDaW_wky0Gr4klqyzqpKVr1sR_6Zs3h0igpL1ag/viewform?usp=header"
                ]

            ]
        },


        "03": {
            title: "TRÉSORERIE",
            subtitle: "Paiements et demandes",
            links: [

                [
                    "LIEN POUR PAYER UNE PRESTATION",
                    "https://pay.sumup.com/b2c/QL9SNKAR"
                ],

                [
                    "DEMANDE D'INDEMNISATION / SUBVENTION / REMBOURSEMENT",
                    "https://docs.google.com/forms/d/e/1FAIpQLSdoNRLaLy2dahxObT4eTlctBZ8FFMp4bH0rBD05T2QRFgrv0g/viewform?usp=header"
                ],

                [
                    "TABLEAU PRESTATIONS",
                    "https://drive.google.com/file/d/1pYoqLNOE89M5B1MqkF2Sz1jFm5v2hdeG/view?usp=drive_link"
                ]

            ]
        },


        "04": {
            title: "LOCATION",
            subtitle: "Matériel et salles",
            links: [

                [
                    "DEMANDE DE LOCATION DU MATÉRIEL",
                    "https://docs.google.com/forms/d/e/1FAIpQLSfPz3EyIxsQFtr65ksZpYA-MQK_-RTLv1OwGL-Emijii3a6eg/viewform?usp=header"
                ],

                [
                    "DEMANDE DE LOCATION MATÉRIEL JOLT",
                    "https://forms.gle/ZxMAxuXU16isUjD78"
                ],

                [
                    "LOCATION SALLES DES FÊTES DE LUDON",
                    "https://www.amicalepompiersbordeaux.fr/"
                ]

            ]
        },


        "05": {
            title: "DOCUMENTS CADRES",
            subtitle: "Règlements et documents officiels",
            links: [

                [
                    "STATUTS DE L'AMICALE",
                    "https://drive.google.com/file/d/13935dl1_BXo9TxPw-MHYxcBizpAxvEDQ/view?usp=drive_link"
                ],

                [
                    "RÈGLEMENT INTÉRIEUR",
                    "https://drive.google.com/file/d/1G7iWYH27CzaEJ9ZpGVD2WX1m6FJbMqtJ/view?usp=drive_link"
                ],

                [
                    "RÈGLES POUR ÊTRE AMICALISTE",
                    "https://drive.google.com/file/d/1IBvJA1N0hZMMpAEh1qomH_F8QLefknJs/view?usp=drive_link"
                ],

                [
                    "TABLEAU PRESTATIONS AMICALE",
                    "https://drive.google.com/file/d/1pYoqLNOE89M5B1MqkF2Sz1jFm5v2hdeG/view?usp=drive_link"
                ],

                [
                    "COMPTE-RENDU DERNIER CA",
                    "https://drive.google.com/file/d/1waEKRd2Pt6skdirNydr6-Y6JpZoxjMWo/view?usp=drive_link"
                ]

            ]
        },


        "06": {
            title: "ADHÉRENTS",
            subtitle: "Adhésion et liste des membres",
            links: [

                [
                    "DEMANDE ADHÉSION 2026",
                    "https://docs.google.com/forms/d/e/1FAIpQLSfMt2cx18aGF0WtHOc5WacRjTBE5b70YDuNV7TnLUmg1ChKOQ/viewform?usp=header"
                ],

                [
                    "LISTE ADHÉRENTS 2026",
                    "https://drive.google.com/file/d/1nGGmhIzKY4fDMgEp1zCAIQJ1B7pgSfB6/view?usp=sharing"
                ]

            ]
        },


        "07": {
            title: "CALENDRIERS",
            subtitle: "Organisation des calendriers",
            links: [

                [
                    "SECTEURS CALENDRIERS",
                    "https://www.google.com/maps/d/edit?mid=1a7CY1kuTPUbNeoAkft3Wwx5SfWOI-7U&usp=drive_link"
                ],

                [
                    "RÈGLEMENTS DISTRIBUTION CALENDRIERS",
                    "https://drive.google.com/file/d/1E78LngumgOKvv2SD9gFfcTk72L3kng_H/view?usp=drive_link"
                ],

                [
                    "FICHE RETOUR COLLECTE",
                    "https://drive.google.com/file/d/1Rhh_vC4OWL5IdvKZWRFtZWmElq_k9P_u/view?usp=drive_link"
                ],

                [
                    "FICHE DE TÂCHES DISTRIBUTEUR 2025",
                    "https://drive.google.com/file/d/1TMhYsD_NWmkCIiukVjw0xbRs9eejVIsy/view?usp=drive_link"
                ],

                [
                    "UTILISATION APPLICATION SUMUP",
                    "https://drive.google.com/file/d/18AREoboAmm0_co0vlKli3ATQqP_zRt_G/view?usp=drive_link"
                ]

            ]
        },


        "08": {
            title: "BAL",
            subtitle: "Bal de Madère",
            links: [

                [
                    "FORMULAIRE INSCRIPTIONS BÉNÉVOLAT BAL",
                    "https://forms.gle/LShcXjrQmnmcuzof9"
                ],

                [
                    "INSCRIPTIONS AVANT LE 15/06",
                    "https://forms.gle/LShcXjrQmnmcuzof9"
                ]

            ]
        },


        "09": {
            title: "CONTACT",
            subtitle: "Contacter l'amicale",
            links: [

                [
                    "MAIL AMICALE VILO",
                    "mailto:amicale.vilo@gmail.com"
                ],

                [
                    "TÉLÉPHONE SECRÉTARIAT",
                    "tel:0761272754"
                ],

                [
                    "MAIL AMICALE BORDEAUX MÉTROPOLE",
                    "mailto:amicalespompiersbxmetropole@gmail.com"
                ],

                [
                    "SITE AMICALE BORDEAUX MÉTROPOLE",
                    "https://www.amicalepompiersbordeaux.fr/"
                ]

            ]
        },


        "10": {
            title: "PARTENARIAT",
            subtitle: "Partenaires et calendriers 2027",
            links: [

                [
                    "AFFICHE RECHERCHE PARTENAIRES — CALENDRIERS 2027",
                    "https://drive.google.com/file/d/1PIuBN9HFVh7fuJ4_bM9O6AfwHYqFLewS/view?usp=sharing"
                ],

                [
                    "FORMULAIRE CONTACT PUBS — CALENDRIERS 2027",
                    "https://docs.google.com/forms/d/e/1FAIpQLSd3-NRxOMQcz8EF8thwNtg8mCpMpWLz2EiM_b9yFhwTZKRW3A/viewform?usp=header"
                ]

            ]
        },


        "11": {
            title: "BUREAU",
            subtitle: "Composition et fonctionnement",
            links: [

                [
                    "COMPOSITION BUREAU 2026",
                    "https://drive.google.com/file/d/1g3NxiYsp2GFC1mCAikz2lLolBs2pnk6V/view?usp=drive_link"
                ],

                [
                    "COMPTE-RENDU DERNIER CA",
                    "https://drive.google.com/file/d/1waEKRd2Pt6skdirNydr6-Y6JpZoxjMWo/view?usp=drive_link"
                ],

                [
                    "RESPONSABLES BAL : SIMON Bertrand / DEVISE Frédéric",
                    "mailto:organisation.baldemadere@gmail.com"
                ]

            ]
        },


        "12": {
            title: "SUMUP",
            subtitle: "Paiements de l'amicale",
            links: [

                [
                    "RECHARGER LA CARTE DU MES",
                    "https://pay.sumup.com/b2c/QN2MQ7XB?utm_campaign=pdf&utm_medium=print&utm_source=qr"
                ],

                [
                    "PAYER UNE PRESTATION",
                    "https://pay.sumup.com/b2c/QL9SNKAR"
                ]

            ]
        }

    };


    /* =====================================================
       REMPLACEMENT DES CARTES AMICALE
    ===================================================== */

    const amicaleSection =
        document.getElementById("amicale");


    if (amicaleSection) {

        const cards =
            amicaleSection.querySelectorAll(
                ".resource-card"
            );


        cards.forEach(card => {

            const numberElement =
                card.querySelector(
                    ".resource-number"
                );


            if (!numberElement) return;


            const number =
                numberElement.textContent.trim();


            const data =
                amicaleLinks[number];


            if (!data) return;


            const header =
                card.querySelector(
                    ".resource-header"
                );


            const content =
                card.querySelector(
                    ".resource-content"
                );


            const title =
                header?.querySelector("h3");

            const subtitle =
                header?.querySelector("p");


            if (title) {
                title.textContent =
                    data.title;
            }


            if (subtitle) {
                subtitle.textContent =
                    data.subtitle;
            }


            if (!content) return;


            content.innerHTML = "";


            const wrapper =
                document.createElement("div");

            wrapper.className =
                "amicale-links";


            data.links.forEach(
                ([label, url]) => {

                    const link =
                        document.createElement("a");

                    link.href = url;

                    link.target =
                        url.startsWith("mailto:") ||
                        url.startsWith("tel:")
                            ? "_self"
                            : "_blank";

                    link.rel =
                        "noopener noreferrer";

                    link.className =
                        "large-button";

                    link.innerHTML =
                        `${label} <span>↗</span>`;


                    wrapper.appendChild(link);

                }
            );


            content.appendChild(wrapper);

        });

    }


    /* =====================================================
       STYLE DES LIENS AMICALE
    ===================================================== */

    if (
        !document.getElementById(
            "amicale-links-style"
        )
    ) {

        const style =
            document.createElement("style");

        style.id =
            "amicale-links-style";


        style.textContent = `

            .amicale-links {
                display: grid;
                grid-template-columns: 1fr;
                gap: 9px;
            }

            .amicale-links .large-button {
                justify-content: space-between;
                text-align: left;
                min-height: 46px;
                line-height: 1.35;
            }

            @media (min-width: 850px) {
                .amicale-grid .resource-card.open {
                    grid-column: span 1;
                }
            }

        `;


        document.head.appendChild(style);

    }


    /* =====================================================
       FLAMMES DYNAMIQUES HERO
    ===================================================== */

    const flamesContainer =
        document.querySelector(".flames");


    if (flamesContainer) {

        const flameCount =
            window.innerWidth <= 800
                ? 26
                : 42;


        for (
            let i = 0;
            i < flameCount;
            i++
        ) {

            const flame =
                document.createElement("span");


            flame.style.position =
                "absolute";

            flame.style.bottom =
                `${Math.random() * 8}px`;

            flame.style.left =
                `${Math.random() * 100}%`;

            flame.style.width =
                `${4 + Math.random() * 9}px`;

            flame.style.height =
                `${18 + Math.random() * 48}px`;

            flame.style.borderRadius =
                "50% 50% 35% 35%";

            flame.style.background =
                "rgba(237,82,98,.42)";

            flame.style.filter =
                "blur(2px)";

            flame.style.transform =
                `rotate(${Math.random() * 20 - 10}deg)`;

            flame.style.opacity =
                `${.28 + Math.random() * .45}`;

            flame.style.animation =
                `flameFloat ${
                    1.8 + Math.random() * 2.5
                }s ease-in-out infinite alternate`;

            flame.style.animationDelay =
                `${Math.random() * 2}s`;


            flamesContainer.appendChild(
                flame
            );

        }

    }


    /* =====================================================
       REVEAL AU SCROLL
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
       LIENS #
    ===================================================== */

    const toast =
        document.getElementById("toast");

    let toastTimer;


    function showToast() {

        if (!toast) return;

        toast.classList.add("show");

        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2600
            );

    }


    document
        .querySelectorAll(
            'a[href="#"]'
        )
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
       PAS DE SMOOTH SCROLL
       
       Le bloc qui faisait :
       scrollIntoView({ behavior: "smooth" })
       
       a volontairement été supprimé.
    ===================================================== */


    /* =====================================================
       TILT DES CARTES — DESKTOP
    ===================================================== */

    if (window.innerWidth > 1000) {

        document
            .querySelectorAll(
                ".premium-card"
            )
            .forEach(card => {

                /*
                 * Les cartes avec accordéon
                 * ne subissent pas le tilt,
                 * pour garder un fonctionnement
                 * propre.
                 */

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

});
