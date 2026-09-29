/* =========================================================
   CIS VILLENAVE
   SCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   ANNÉE AUTOMATIQUE
   ========================================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   FLAMMES
   ========================================================== */

const flameContainer = document.querySelector(".flame-field");

if (flameContainer) {

    for (let i = 0; i < 18; i++) {

        const flame = document.createElement("span");

        flame.className = "flame";

        flame.style.left = `${Math.random() * 100}%`;
        flame.style.animationDelay = `${Math.random() * 5}s`;
        flame.style.animationDuration = `${4 + Math.random() * 5}s`;

        flameContainer.appendChild(flame);
    }
}


/* =========================================================
   APPARITION DES ÉLÉMENTS
   ========================================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

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


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================================
   MENU MOBILE
   ========================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileNav.classList.toggle("is-open");

        menuToggle.classList.toggle("is-open", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

    });


    mobileNav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("is-open");
            menuToggle.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* =========================================================
   NAVIGATION ACTIVE
   ========================================================== */

const navLinks = document.querySelectorAll(
    ".desktop-nav a, .mobile-nav a"
);

const sections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.id;

                navLinks.forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );

                });

            });

        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =========================================================
   TOAST
   ========================================================== */

const toast = document.getElementById("toast");

let toastTimer = null;


function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================================================
   LIENS PLACEHOLDER "#"
   ========================================================== */

document.querySelectorAll('a[href="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        showToast(
            "Cette ressource doit encore être connectée."
        );

    });

});


/* =========================================================
   ANCRES INTERNES
   ========================================================== */

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   CARTES DÉPLIABLES
   ========================================================= */

const collapsibleCards = document.querySelectorAll(
    ".collapsible-card"
);


collapsibleCards.forEach((card, index) => {

    const toggle = card.querySelector(".collapse-toggle");
    const content = card.querySelector(".collapse-content");
    const icon = card.querySelector(".collapse-icon");

    if (!toggle || !content) {
        return;
    }


    /* ID unique pour l'accessibilité */

    const contentId =
        content.id ||
        `collapse-content-${index + 1}`;

    content.id = contentId;

    toggle.setAttribute(
        "aria-controls",
        contentId
    );

    toggle.setAttribute(
        "aria-expanded",
        "false"
    );


    /* Toutes les cartes sont fermées au démarrage */

    card.classList.remove("is-open");


    /* -------------------------------------------------------
       OUVERTURE / FERMETURE
       ------------------------------------------------------- */

    toggle.addEventListener("click", (event) => {

        event.preventDefault();

        const isOpen =
            card.classList.contains("is-open");


        if (isOpen) {

            /* Fermer */

            card.classList.remove("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            if (icon) {
                icon.textContent = "+";
            }

        } else {

            /* Ouvrir */

            card.classList.add("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "true"
            );

            if (icon) {
                icon.textContent = "−";
            }

        }

    });

});


/* =========================================================
   EFFET HOVER PREMIUM
   On ne l'applique PAS aux cartes dépliables,
   pour ne pas gêner le bouton + / −.
   ========================================================== */

const premiumCards = document.querySelectorAll(
    ".premium-card:not(.collapsible-card)"
);


if (window.matchMedia("(hover: hover)").matches) {

    premiumCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================================
   EMPÊCHER LES CLICS DES LIENS DE PROPAGER
   ========================================================== */

document.querySelectorAll(
    ".maintenance-link, .card-action, .vehicle-card"
).forEach((link) => {

    link.addEventListener("click", (event) => {

        event.stopPropagation();

    });

});


/* =========================================================
   FERMETURE DU MENU SI REDIMENSIONNEMENT
   ========================================================== */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 800 &&
        mobileNav &&
        menuToggle
    ) {

        mobileNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});
