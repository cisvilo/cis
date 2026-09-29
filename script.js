document.addEventListener("DOMContentLoaded", () => {

const views = [...document.querySelectorAll(".view")];
const navButtons = [...document.querySelectorAll(".nav-btn")];
const openButtons = [...document.querySelectorAll("[data-open]")];
const inventoryCategories = [...document.querySelectorAll(".inventory-category")];

/* =========================================================
   NAVIGATION PRINCIPALE
========================================================= */

function openView(viewId, updateUrl = true) {

    const target = document.getElementById(viewId);

    if (!target) {
        console.warn("Section introuvable :", viewId);
        return;
    }

    views.forEach(view => {
        view.classList.remove("active");
    });

    target.classList.add("active");

    navButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.open === viewId
        );
    });

    if (updateUrl) {
        history.pushState(
            null,
            "",
            "#" + viewId
        );
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   BOUTONS DATA-OPEN
========================================================= */

openButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const viewId = button.dataset.open;

        if (viewId) {
            openView(viewId);
        }

    });

});


/* =========================================================
   LIENS EXTERNES
========================================================= */

const links = {

    /* ================= INVENTAIRES ================= */

    vsav1_chef:
        "https://docs.google.com/forms/d/e/1FAIpQLSfL36QKhU4DK_iWfPn4x19gmU9dLKnTLWVugFOpg3ryMzXapg/viewform?ouid=105918993275116743934&usp=sharing",

    vsav1_conducteur: "#",
    vsav1_equipier: "#",

    vsav2_chef: "#",
    vsav2_conducteur: "#",
    vsav2_equipier: "#",

    vsav3_chef: "#",
    vsav3_conducteur: "#",
    vsav3_equipier: "#",

    asu_pdg: "#",
    asu_utilisation: "#",

    fpt01: "#",
    fptgp02: "#",
    ech: "#",
    fmogp: "#",
    vl_cdgg: "#",

    vtu1_via: "#",
    vtu2: "#",
    vsrm: "#",

    ccf1: "#",
    ccf2: "#",
    vlhr: "#",
    amsec: "#",

    eld: "#",
    drone: "#",

    stas: "#",
    sac_ps_stas: "#",

    reserve_inc: "#",
    pharmacie_asu: "#",

    resultats_inventaires: "#",

    /* ================= ENTRETIENS ================= */

    entretien_vsav: "#",
    entretien_incendie: "#",
    entretien_div: "#",

    /* ================= DOCUMENTS ================= */

    notes_service:
        "https://drive.google.com/drive/folders/1mZU_QXucWcthPotO1mkU4cxS8GGF8erV?usp=sharing",

    procedures: "#",
    documents_ssuap: "#",
    fdf_documents: "#",
    drive: "#"

};


document.querySelectorAll("[data-link]").forEach(link => {

    link.addEventListener("click", event => {

        const key = link.dataset.link;
        const url = links[key];

        if (!url || url === "#") {
            event.preventDefault();

            console.log(
                "Lien à renseigner :",
                key
            );

            return;
        }

        link.href = url;

    });

});


/* =========================================================
   HASH / RETOUR NAVIGATION
========================================================= */

function loadHash() {

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
        openView(hash, false);
    } else {
        openView("home", false);
    }

}

window.addEventListener("popstate", loadHash);
window.addEventListener("hashchange", loadHash);

loadHash();


/* =========================================================
   ACCORDEON INVENTAIRES
========================================================= */

inventoryCategories.forEach(category => {

    category.addEventListener("toggle", () => {

        if (!category.open) {
            return;
        }

        inventoryCategories.forEach(other => {

            if (other !== category) {
                other.open = false;
            }

        });

    });

});


/* =========================================================
   EFFET SOURIS PREMIUM
========================================================= */

document.addEventListener("pointermove", event => {

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty(
        "--mouse-x",
        x + "%"
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        y + "%"
    );

});


/* =========================================================
   FLAMMES / BRAISES
========================================================= */

const canvas = document.getElementById("fireCanvas");

if (!canvas) {
    return;
}

const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;

const flames = [];
const embers = [];

function resizeCanvas() {

    const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

}


function random(min, max) {
    return Math.random() * (max - min) + min;
}


function createFlame() {

    return {
        x: random(-30, width + 30),
        y: height + random(10, 120),
        size: random(20, 80),
        speed: random(.25, .85),
        sway: random(-.5, .5),
        life: random(0, Math.PI * 2)
    };

}


function createEmber() {

    return {
        x: random(0, width),
        y: height + random(0, 80),
        size: random(.7, 2.2),
        speed: random(.35, 1.25),
        drift: random(-.35, .35),
        alpha: random(.25, .8)
    };

}


for (let i = 0; i < 30; i++) {
    flames.push(createFlame());
}

for (let i = 0; i < 85; i++) {
    embers.push(createEmber());
}


function drawFlame(flame) {

    flame.y -= flame.speed;
    flame.life += .018;

    flame.x +=
        Math.sin(flame.life) *
        flame.sway;

    if (flame.y < height * .35) {

        Object.assign(
            flame,
            createFlame()
        );

    }

    const alpha =
        Math.max(
            0,
            Math.min(
                .12,
                (height - flame.y) /
                height * .12
            )
        );

    const gradient =
        ctx.createRadialGradient(
            flame.x,
            flame.y,
            0,
            flame.x,
            flame.y,
            flame.size
        );

    gradient.addColorStop(
        0,
        `rgba(255,75,28,${alpha})`
    );

    gradient.addColorStop(
        .35,
        `rgba(226,29,47,${alpha * .55})`
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(
        flame.x,
        flame.y,
        flame.size,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


function drawEmber(ember) {

    ember.y -= ember.speed;
    ember.x += ember.drift;

    if (
        ember.y < height * .35 ||
        ember.x < -20 ||
        ember.x > width + 20
    ) {

        Object.assign(
            ember,
            createEmber()
        );

    }

    ctx.beginPath();

    ctx.fillStyle =
        `rgba(255,90,35,${ember.alpha})`;

    ctx.shadowBlur = 9;
    ctx.shadowColor = "rgba(255,60,25,.8)";

    ctx.arc(
        ember.x,
        ember.y,
        ember.size,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.shadowBlur = 0;

}


function animateFire() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    flames.forEach(drawFlame);
    embers.forEach(drawEmber);

    requestAnimationFrame(
        animateFire
    );

}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

animateFire();


/* =========================================================
   ESCAPE = FERMER LES ACCORDEONS
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        inventoryCategories.forEach(
            category => {
                category.open = false;
            }
        );

    }

});


});


