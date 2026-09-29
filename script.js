document.addEventListener("DOMContentLoaded", () => {

```
/* =========================================================
   NAVIGATION
   ========================================================= */

const views = document.querySelectorAll(".view");

const navButtons =
    document.querySelectorAll(".nav [data-open]");


function openView(id, updateUrl = true) {

    const target =
        document.getElementById(id);

    if (!target) {
        return;
    }


    /* Masquer toutes les pages */
    views.forEach(view => {
        view.classList.remove("active");
    });


    /* Afficher la page demandée */
    target.classList.add("active");


    /* Mise à jour du menu */
    navButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.open === id
        );

    });


    /* URL */
    if (updateUrl) {

        const newUrl =
            window.location.pathname +
            "#" +
            id;

        if (
            window.location.hash !== "#" + id &&
            history.replaceState
        ) {
            history.replaceState(
                null,
                "",
                newUrl
            );
        }
    }


    /* Retour en haut */
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   BOUTONS DU MENU
   ========================================================= */

navButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const id =
            button.dataset.open;

        if (id) {
            openView(id);
        }

    });

});


/* =========================================================
   CARTES DE L'ACCUEIL
   ========================================================= */

document
    .querySelectorAll(".home-card[data-open]")
    .forEach(card => {

        card.addEventListener("click", () => {

            const id =
                card.dataset.open;

            if (id) {
                openView(id);
            }

        });

    });


/* =========================================================
   HASH URL
   ========================================================= */

function loadHash() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim();

    if (
        hash &&
        document.getElementById(hash)
    ) {

        openView(hash, false);

    } else {

        openView("home", false);

    }

}


loadHash();


window.addEventListener(
    "hashchange",
    loadHash
);


/* =========================================================
   INVENTAIRES — ACCORDÉONS
   ========================================================= */

const inventoryDetails =
    document.querySelectorAll(
        "#inventaires .inventory-category"
    );


inventoryDetails.forEach(detail => {

    detail.addEventListener(
        "toggle",
        () => {

            if (!detail.open) {
                return;
            }


            /*
             * Une seule catégorie ouverte
             * à la fois.
             */

            inventoryDetails.forEach(other => {

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


/* =========================================================
   TOUCHE ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        document
            .querySelectorAll("details[open]")
            .forEach(detail => {

                detail.open = false;

            });

    }
);


/* =========================================================
   LUMIÈRE QUI SUIT LA SOURIS
   ========================================================= */

let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;


window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


        const x =
            (
                event.clientX /
                window.innerWidth
            ) * 100;


        const y =
            (
                event.clientY /
                window.innerHeight
            ) * 100;


        document.documentElement
            .style
            .setProperty(
                "--mx",
                `${x}%`
            );


        document.documentElement
            .style
            .setProperty(
                "--my",
                `${y}%`
            );

    },
    { passive: true }
);


/* =========================================================
   FEU — ARRIÈRE-PLAN
   ========================================================= */

const canvas =
    document.getElementById(
        "fireCanvas"
    );


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


const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   REDIMENSIONNEMENT DU CANVAS
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
        Math.floor(width * dpr);

    canvas.height =
        Math.floor(height * dpr);


    canvas.style.width =
        `${width}px`;

    canvas.style.height =
        `${height}px`;


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
   PARTICULES
   ========================================================= */

const flames = [];

const flameCount =
    reducedMotion
        ? 25
        : 80;


function createFlame(
    randomStart = false
) {

    return {

        x:
            Math.random() *
            width,

        y:
            randomStart
                ? height * (
                    .30 +
                    Math.random() * .70
                )
                : height +
                    Math.random() * 80,

        vx:
            (
                Math.random() -
                .5
            ) * .7,

        vy:
            -(
                .8 +
                Math.random() * 2.4
            ),

        size:
            7 +
            Math.random() * 18,

        life:
            randomStart
                ? Math.random()
                : 0,

        maxLife:
            .7 +
            Math.random() * 1.2,

        phase:
            Math.random() *
            Math.PI *
            2,

        phaseSpeed:
            .015 +
            Math.random() * .035,

        rotation:
            (
                Math.random() -
                .5
            ) * .8

    };

}


for (
    let i = 0;
    i < flameCount;
    i++
) {

    flames.push(
        createFlame(true)
    );

}


/* =========================================================
   ÉTINCELLES
   ========================================================= */

const sparks = [];

const sparkCount =
    reducedMotion
        ? 12
        : 35;


for (
    let i = 0;
    i < sparkCount;
    i++
) {

    sparks.push({

        x:
            Math.random() *
            width,

        y:
            Math.random() *
            height,

        vx:
            (
                Math.random() -
                .5
            ) * .3,

        vy:
            -(
                .2 +
                Math.random() * .7
            ),

        size:
            1 +
            Math.random() * 2,

        alpha:
            .2 +
            Math.random() * .7

    });

}


/* =========================================================
   DESSIN D'UNE FLAMME
   ========================================================= */

function drawFlame(p) {

    const progress =
        Math.max(
            0,
            Math.min(
                1,
                p.life / p.maxLife
            )
        );


    /*
     * Apparition puis disparition douce.
     */

    const fade =
        Math.sin(
            progress * Math.PI
        );


    if (fade <= 0) {
        return;
    }


    /* Lumière extérieure */
    const glow =
        ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3
        );


    glow.addColorStop(
        0,
        `rgba(255,245,180,${.32 * fade})`
    );

    glow.addColorStop(
        .18,
        `rgba(255,180,50,${.25 * fade})`
    );

    glow.addColorStop(
        .45,
        `rgba(255,65,0,${.16 * fade})`
    );

    glow.addColorStop(
        1,
        "rgba(180,0,0,0)"
    );


    ctx.save();

    ctx.globalCompositeOperation =
        "screen";


    ctx.fillStyle =
        glow;


    ctx.beginPath();

    ctx.arc(
        p.x,
        p.y,
        p.size * 3,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /*
     * Corps de la flamme.
     */

    const flame =
        ctx.createRadialGradient(
            p.x,
            p.y + p.size * .20,
            0,
            p.x,
            p.y,
            p.size * 1.4
        );


    flame.addColorStop(
        0,
        `rgba(255,245,175,${.55 * fade})`
    );

    flame.addColorStop(
        .25,
        `rgba(255,150,25,${.48 * fade})`
    );

    flame.addColorStop(
        .65,
        `rgba(255,55,0,${.27 * fade})`
    );

    flame.addColorStop(
        1,
        "rgba(150,0,0,0)"
    );


    ctx.fillStyle =
        flame;


    ctx.beginPath();

    ctx.ellipse(
        p.x,
        p.y,
        p.size * .65,
        p.size * 1.35,
        p.rotation,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();

}


/* =========================================================
   ANIMATION PRINCIPALE
   ========================================================= */

let lastTime =
    performance.now();


function animate(now) {

    const delta =
        Math.min(
            (now - lastTime) / 16.67,
            2
        );


    lastTime =
        now;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* ---------------------------------------------
       FLAMMES
       --------------------------------------------- */

    flames.forEach(p => {

        p.life +=
            .008 * delta;


        p.phase +=
            p.phaseSpeed * delta;


        /*
         * Attraction très légère vers la souris.
         */

        const dx =
            mouseX - p.x;

        const dy =
            mouseY - p.y;


        const distance =
            Math.hypot(
                dx,
                dy
            );


        if (distance < 500) {

            const influence =
                (
                    1 -
                    distance / 500
                );


            p.vx +=
                dx *
                influence *
                .00012 *
                delta;


            p.vy -=
                influence *
                .003 *
                delta;

        }


        /*
         * Mouvement naturel.
         */

        const wave =
            Math.sin(
                p.phase
            ) * .8;


        p.x +=
            (
                p.vx +
                wave
            ) * delta;


        p.y +=
            p.vy * delta;


        /*
         * Respawn.
         */

        if (
            p.y <
            height * .04 ||
            p.life >
            p.maxLife
        ) {

            p.x =
                Math.random() *
                width;

            p.y =
                height +
                Math.random() * 70;

            p.vx =
                (
                    Math.random() -
                    .5
                ) * .7;

            p.vy =
                -(
                    .8 +
                    Math.random() * 2.4
                );

            p.size =
                7 +
                Math.random() * 18;

            p.life =
                0;

            p.maxLife =
                .7 +
                Math.random() * 1.2;

        }


        if (p.x < -50) {
            p.x =
                width + 50;
        }


        if (p.x > width + 50) {
            p.x =
                -50;
        }


        drawFlame(p);

    });


    /* ---------------------------------------------
       ÉTINCELLES
       --------------------------------------------- */

    ctx.save();

    ctx.globalCompositeOperation =
        "screen";


    sparks.forEach(spark => {

        spark.y +=
            spark.vy * delta;

        spark.x +=
            spark.vx * delta;


        if (spark.y < -20) {

            spark.y =
                height + 20;

            spark.x =
                Math.random() *
                width;

        }


        const distance =
            Math.hypot(
                mouseX - spark.x,
                mouseY - spark.y
            );


        const mouseInfluence =
            distance < 260
                ? 1 - distance / 260
                : 0;


        ctx.beginPath();


        ctx.fillStyle =
            `rgba(
                255,
                ${125 + mouseInfluence * 100},
                ${30 + mouseInfluence * 80},
                ${spark.alpha + mouseInfluence * .25}
            )`;


        ctx.shadowBlur =
            12;


        ctx.shadowColor =
            "rgba(255,70,0,.8)";


        ctx.arc(
            spark.x,
            spark.y,
            spark.size +
                mouseInfluence,
            0,
            Math.PI * 2
        );


        ctx.fill();

    });


    ctx.restore();


    requestAnimationFrame(
        animate
    );

}


requestAnimationFrame(
    animate
);
```

});
