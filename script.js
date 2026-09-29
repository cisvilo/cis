document.addEventListener("DOMContentLoaded", () => {


/* =========================================================
   NAVIGATION PRINCIPALE
   ========================================================= */

const views = document.querySelectorAll(".view");
const navigationButtons = document.querySelectorAll("[data-open]");


function openView(viewId, updateHash = true) {

    const targetView = document.getElementById(viewId);

    if (!targetView) {
        console.warn("Section introuvable :", viewId);
        return;
    }

    /* Masquer toutes les sections */
    views.forEach(view => {
        view.classList.remove("active");
    });

    /* Afficher la section demandée */
    targetView.classList.add("active");


    /* Mettre à jour le bouton actif */
    document.querySelectorAll(".nav-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.open === viewId
        );

    });


    /* Mettre à jour l'adresse */
    if (updateHash) {

        history.pushState(
            { view: viewId },
            "",
            "#" + viewId
        );

    }


    /* Retour en haut */
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   TOUS LES ÉLÉMENTS DATA-OPEN
   ========================================================= */

navigationButtons.forEach(element => {

    element.addEventListener("click", event => {

        const viewId = element.dataset.open;

        if (!viewId) {
            return;
        }

        /*
         * Empêche le comportement du lien
         * lorsqu'il s'agit d'une navigation interne.
         */

        event.preventDefault();

        openView(viewId);

    });

});


/* =========================================================
   OUVERTURE DE LA PAGE DEPUIS LE HASH
   ========================================================= */

function openHash() {

    const hash =
        window.location.hash.substring(1);

    if (
        hash &&
        document.getElementById(hash)
    ) {

        openView(hash, false);

    } else {

        openView("home", false);

    }

}


openHash();


/* =========================================================
   BOUTON PRÉCÉDENT / SUIVANT DU NAVIGATEUR
   ========================================================= */

window.addEventListener("popstate", () => {

    openHash();

});


window.addEventListener("hashchange", () => {

    openHash();

});


/* =========================================================
   INVENTAIRES
   Une seule catégorie ouverte à la fois.
   ========================================================= */

const inventoryCategories =
    document.querySelectorAll(
        ".inventory-category"
    );


inventoryCategories.forEach(category => {

    category.addEventListener(
        "toggle",
        () => {

            if (!category.open) {
                return;
            }

            inventoryCategories.forEach(
                otherCategory => {

                    if (
                        otherCategory !== category &&
                        otherCategory.open
                    ) {

                        otherCategory.open = false;

                    }

                }
            );

        }
    );

});


/* =========================================================
   LIENS EXTERNES
   ========================================================= */

/*
 * Ajoute ici uniquement tes vraies URLs.
 *
 * Exemple :
 *
 * vsav1_chef:
 * "https://docs.google.com/forms/..."
 *
 */

const links = {

    /* ==============================
       INVENTAIRES
       ============================== */

    /*
    vsav1_chef: "TON_URL",
    vsav1_conducteur: "TON_URL",
    vsav1_equipier: "TON_URL",

    vsav2_chef: "TON_URL",
    vsav2_conducteur: "TON_URL",
    vsav2_equipier: "TON_URL",

    vsav3_chef: "TON_URL",
    vsav3_conducteur: "TON_URL",
    vsav3_equipier: "TON_URL",

    asu_pdg: "TON_URL",
    asu_utilisation: "TON_URL",

    fpt01: "TON_URL",
    fptgp02: "TON_URL",
    ech: "TON_URL",
    fmogp: "TON_URL",
    vl_cdgg: "TON_URL",

    vtu1_via: "TON_URL",
    vtu2: "TON_URL",
    vsrm: "TON_URL",

    ccf1: "TON_URL",
    ccf2: "TON_URL",
    vlhr: "TON_URL",
    amsec: "TON_URL",

    eld: "TON_URL",
    drone: "TON_URL",

    stas: "TON_URL",
    sac_ps_stas: "TON_URL",

    reserve_inc: "TON_URL",
    pharmacie_asu: "TON_URL",

    resultats_inventaires: "TON_URL",

    */

    /* ==============================
       ENTRETIENS
       ============================== */

    /*
    entretien_vsav: "TON_URL",
    entretien_incendie: "TON_URL",
    entretien_div: "TON_URL",
    */

    /* ==============================
       DOCUMENTS
       ============================== */

    /*
    notes_service: "TON_URL",
    procedures: "TON_URL",
    documents_ssuap: "TON_URL",
    auto_protection_mensuel: "TON_URL",
    auto_protection_hebdo: "TON_URL",
    */

    /* ==============================
       AMICALE
       ============================== */

    /*
    amicale_calendriers: "TON_URL",
    amicale_documents: "TON_URL",
    amicale_informations: "TON_URL",
    */

    /* ==============================
       RACCOURCIS
       ============================== */

    /*
    agatt: "TON_URL",
    zimbra: "TON_URL",
    gipsi: "TON_URL",
    enasis: "TON_URL",
    udsp: "TON_URL",
    cos: "TON_URL"
    */

};


document.querySelectorAll("[data-link]")
    .forEach(element => {

        const key =
            element.dataset.link;

        const url =
            links[key];


        if (
            url &&
            typeof url === "string"
        ) {

            element.href = url;

            if (
                url.startsWith("http://") ||
                url.startsWith("https://")
            ) {

                element.target = "_blank";

                element.rel =
                    "noopener noreferrer";

            }

        }

    });


/* =========================================================
   MOUVEMENT DE LA SOURIS
   ========================================================= */

let targetX = 50;
let targetY = 50;

window.addEventListener(
    "mousemove",
    event => {

        targetX =
            (event.clientX /
                window.innerWidth) * 100;

        targetY =
            (event.clientY /
                window.innerHeight) * 100;

        document.documentElement.style.setProperty(
            "--mx",
            targetX + "%"
        );

        document.documentElement.style.setProperty(
            "--my",
            targetY + "%"
        );

    }
);


/* =========================================================
   FLAMMES
   ========================================================= */

const canvas =
    document.getElementById("fireCanvas");

if (!canvas) {
    return;
}


const ctx =
    canvas.getContext("2d");

if (!ctx) {
    return;
}


let width = 0;
let height = 0;
let dpr = 1;


const flames = [];
const embers = [];


/* =========================================================
   REDIMENSIONNEMENT
   ========================================================= */

function resizeCanvas() {

    dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    width =
        window.innerWidth;

    height =
        window.innerHeight;


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   CRÉATION DES FLAMMES
   ========================================================= */

function createFlame() {

    return {

        x:
            Math.random() * width,

        y:
            height +
            Math.random() * 100,

        size:
            15 +
            Math.random() * 45,

        speed:
            .25 +
            Math.random() * .85,

