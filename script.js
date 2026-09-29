
/* =========================================================
   CIS VILLENAVE — SCRIPT PRINCIPAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE
       ===================================================== */

    const yearElements = document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", (event) => {

            event.preventDefault();

            mainNav.classList.toggle("active");

        });


        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

            });

        });

    }


    /* =====================================================
       EMPÊCHER LE SMOOTH SCROLL
       ===================================================== */

    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";


    /* =====================================================
       PHOTOS DES VÉHICULES
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

        /*
         * VTU 1 ET VTU 2 ONT BIEN DEUX PHOTOS DISTINCTES
         */

        "VTU 1 (VIA)":
            "https://pompiersstpaul3chateaux.fr/images/a/vehicules_vtu_med_hr-688-692.jpg",

        "VTU 2":
            "https://www.sdis50.fr/app/uploads/2026/03/IMG_8196-1024x683.jpg",

        "VLS 1":
            "https://up.autotitre.com/50ac913d07.jpg",

        "VLS 2":
            "https://up.autotitre.com/50ac913d07.jpg",

        "VLS 3":
            "https://up.autotitre.com/50ac913d07.jpg",

        "V DRONE":
            "https://www.sdis50.fr/app/uploads/2026/03/IMG_8196-1024x683.jpg"

    };


    document.querySelectorAll(".maintenance-card").forEach(card => {

        const vehicleName = card.dataset.vehicle;
        const image = card.querySelector(".maintenance-image");

        if (
            image &&
            vehicleName &&
            vehicleImages[vehicleName]
        ) {

            image.style.backgroundImage =
                `url("${vehicleImages[vehicleName]}")`;

        }

    });


    /* =====================================================
       ACCORDÉONS
       ===================================================== */

    /*
     * Important :
     *
     * Les cartes de maintenance sont des liens.
     * On ne les transforme donc pas en accordéons
     * et on ne fait aucun scroll automatique.
     *
     * Les cartes inventaire / documents restent également
     * de simples liens.
     */


    /* =====================================================
       SUPPRESSION DES FLÈCHES
       ===================================================== */

    document.querySelectorAll("b").forEach(element => {

        if (
            element.textContent.trim() === "↗" ||
            element.textContent.trim() === "→"
        ) {
            element.remove();
        }

    });


    /* =====================================================
       REVEAL — SANS MODIFIER LA POSITION DE LA PAGE
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".quick-card, " +
        ".inventory-block, " +
        ".maintenance-card, " +
        ".resource-card, " +
        ".amicale-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       TILT DES CARTES
       ===================================================== */

    document.querySelectorAll(".quick-card, .resource-card").forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) return;

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const rotateY = (x - .5) * 4;
            const rotateX = (.5 - y) * 4;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       SÉCURITÉ :
       AUCUN SCROLL AUTOMATIQUE
       ===================================================== */

    document.querySelectorAll(
        ".inventory-card, " +
        ".maintenance-card, " +
        ".resource-card"
    ).forEach(card => {

        card.addEventListener("click", () => {

            /*
             * Aucun scrollIntoView().
             * Aucun scrollTo().
             * Aucun changement de position.
             */

        });

    });

});

