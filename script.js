document.addEventListener("DOMContentLoaded", () => {

```
/* ========================================================= */
/* NAVIGATION */
/* ========================================================= */

const navButtons = document.querySelectorAll("[data-open]");
const views = document.querySelectorAll(".view");

function openView(viewId, updateHash = true) {

    const target = document.getElementById(viewId);

    if (!target) {
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

    if (updateHash) {
        history.replaceState(
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


navButtons.forEach(button => {

    button.addEventListener("click", event => {

        /*
         * Les liens externes possèdent data-link,
         * mais data-open est réservé à la navigation interne.
         */

        const viewId = button.dataset.open;

        if (viewId) {

            event.preventDefault();

            openView(viewId);
        }

    });

});


/* ========================================================= */
/* HASH AU CHARGEMENT */
/* ========================================================= */

const initialHash =
    window.location.hash.replace("#", "");

if (initialHash && document.getElementById(initialHash)) {

    openView(initialHash, false);

} else {

    openView("home", false);

}


window.addEventListener("hashchange", () => {

    const hash =
        window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {

        openView(hash, false);

    }

});


/* ========================================================= */
/* INVENTAIRES */
/* ========================================================= */

const inventoryDetails =
    document.querySelectorAll(".inventory-category");


inventoryDetails.forEach(detail => {

    detail.addEventListener("toggle", () => {

        if (!detail.open) {
            return;
        }

        inventoryDetails.forEach(other => {

            if (other !== detail) {
                other.removeAttribute("open");
            }

        });

    });

});


/* ========================================================= */
/* LIENS
   IMPORTANT :
   On ne remplace PAS les href existants par de faux liens.
   Tu peux ajouter tes vraies URL ci-dessous.
*/
/* ========================================================= */

const links = {

    /*
    Exemple :

    vsav1_chef: "https://ton-vrai-lien.com",
    vsav1_conducteur: "https://ton-vrai-lien.com",
    vsav1_equipier: "https://ton-vrai-lien.com",

    */

};


document.querySelectorAll("[data-link]").forEach(element => {

    const key = element.dataset.link;

    if (
        links[key] &&
        typeof links[key] === "string"
    ) {

        element.href = links[key];

        /*
         * Ouvre les plateformes externes
         * dans un nouvel onglet.
         */

        if (
            links[key].startsWith("http://") ||
            links[key].startsWith("https://")
        ) {

            element.target = "_blank";

            element.rel = "noopener noreferrer";

        }

    }

});


/* ========================================================= */
/* MOUVEMENT DE LA SOURIS
   Le fond réagit légèrement au mouvement.
*/
/* ========================================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let targetMouseX = mouseX;
let targetMouseY = mouseY;


window.addEventListener("mousemove", event => {

    targetMouseX = event.clientX;
    targetMouseY = event.clientY;

    const percentX =
        (event.clientX / window.innerWidth) * 100;

    const percentY =
        (event.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty(
        "--mx",
        percentX + "%"
    );

    document.documentElement.style.setProperty(
        "--my",
        percentY + "%"
    );

});


/* ========================================================= */
/* FLAMMES PREMIUM */
/* ========================================================= */

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


/* ========================================================= */
/* RESIZE */
/* ========================================================= */

function resizeCanvas() {

    dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width =
        Math.floor(width * dpr);

    canvas.height =
        Math.floor(height * dpr);

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


/* ========================================================= */
/* PARTICULES FLAMMES */
/* ========================================================= */

function createFlame() {

    return {

        x:
            Math.random() * width,

        y:
            height +
            Math.random() * 80,

        size:
            18 +
            Math.random() * 55,

        speed:
            .35 +
            Math.random() * 1.15,

        life:
            Math.random(),

        drift:
            (Math.random() - .5) * .55,

        phase:
            Math.random() * Math.PI * 2,

        opacity:
            .10 +
            Math.random() * .18

    };

}


function createEmber() {

    return {

        x:
            Math.random() * width,

        y:
            height +
            Math.random() * 100,

        size:
            .7 +
            Math.random() * 2.2,

        speed:
            .35 +
            Math.random() * 1.3,

        drift:
            (Math.random() - .5) * .45,

        opacity:
            .25 +
            Math.random() * .55,

        phase:
            Math.random() * Math.PI * 2

    };

}


/*
 * Beaucoup de petites flammes réparties
 * sur toute la largeur.
 */

const flameCount =
    Math.min(
        125,
        Math.max(
            70,
            Math.floor(width / 12)
        )
    );


for (let i = 0; i < flameCount; i++) {

    const flame = createFlame();

    flame.y =
        height -
        Math.random() * height * .20;

    flames.push(flame);

}


const emberCount =
    Math.min(
        90,
        Math.max(
            45,
            Math.floor(width / 18)
        )
    );


for (let i = 0; i < emberCount; i++) {

    const ember = createEmber();

    ember.y =
        Math.random() * height;

    embers.push(ember);

}


/* ========================================================= */
/* DESSIN D'UNE FLAMME */
/* ========================================================= */

function drawFlame(flame, time) {

    const mouseInfluence =
        (mouseX / width - .5) * 0.9;

    const wave =
        Math.sin(
            time * .0015 +
            flame.phase
        ) * 12;


    flame.x +=
        flame.drift +
        mouseInfluence * .20;


    flame.y -=
        flame.speed;


    flame.life += .006;


    if (
        flame.y <
        height * .15 ||
        flame.life > 1.8
    ) {

        flame.x =
            Math.random() * width;

        flame.y =
            height +
            Math.random() * 50;

        flame.life = 0;

    }


    const pulse =
        1 +
        Math.sin(
            time * .002 +
            flame.phase
        ) * .18;


    const size =
        flame.size * pulse;


    const x =
        flame.x + wave;


    const y =
        flame.y;


    const gradient =
        ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            size * 2.8
        );


    gradient.addColorStop(
        0,
        `rgba(255,210,100,${flame.opacity})`
    );

    gradient.addColorStop(
        .22,
        `rgba(255,100,20,${flame.opacity * .72})`
    );

    gradient.addColorStop(
        .55,
        `rgba(225,30,20,${flame.opacity * .35})`
    );

    gradient.addColorStop(
        1,
        "rgba(180,20,10,0)"
    );


    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.ellipse(
        x,
        y,
        size,
        size * 2.2,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* ========================================================= */
/* DESSIN DES BRAISES */
/* ========================================================= */

function drawEmber(ember, time) {

    ember.y -= ember.speed;

    ember.x +=
        ember.drift +
        Math.sin(
            time * .002 +
            ember.phase
        ) * .12;


    if (ember.y < -10) {

        ember.y =
            height +
            Math.random() * 50;

        ember.x =
            Math.random() * width;

    }


    const alpha =
        ember.opacity *
        (
            .55 +
            .45 *
            Math.sin(
                time * .004 +
                ember.phase
            )
        );


    ctx.beginPath();

    ctx.arc(
        ember.x,
        ember.y,
        ember.size,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        `rgba(255,130,45,${alpha})`;

    ctx.shadowBlur = 10;

    ctx.shadowColor =
        "rgba(255,70,20,.7)";

    ctx.fill();

    ctx.shadowBlur = 0;

}


/* ========================================================= */
/* HALO DE CHALEUR EN BAS */
/* ========================================================= */

function drawHeat(time) {

    const centerX =
        width / 2 +
        (mouseX - width / 2) * .04;


    const gradient =
        ctx.createRadialGradient(
            centerX,
            height + 50,
            0,
            centerX,
            height + 50,
            Math.min(width * .75, 900)
        );


    gradient.addColorStop(
        0,
        "rgba(255,70,15,.12)"
    );

    gradient.addColorStop(
        .28,
        "rgba(225,30,15,.055)"
    );

    gradient.addColorStop(
        .65,
        "rgba(100,20,10,.018)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

}


/* ========================================================= */
/* BOUCLE UNIQUE
   IMPORTANT :
   une seule animation pour éviter le scintillement.
*/
/* ========================================================= */

function animate(time) {

    mouseX +=
        (targetMouseX - mouseX) * .035;

    mouseY +=
        (targetMouseY - mouseY) * .035;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    drawHeat(time);


    flames.forEach(flame => {

        drawFlame(
            flame,
            time
        );

    });


    embers.forEach(ember => {

        drawEmber(
            ember,
            time
        );

    });


    requestAnimationFrame(animate);

}


requestAnimationFrame(animate);


/* ========================================================= */
/* ESCAPE
   Ferme les catégories ouvertes.
*/
/* ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        inventoryDetails.forEach(
            detail => {
                detail.removeAttribute("open");
            }
        );

    }
);
```

});

