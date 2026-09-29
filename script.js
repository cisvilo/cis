document.addEventListener("DOMContentLoaded", () => {

```
/* =========================================================
   NAVIGATION
   ========================================================= */

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll("[data-open]");


function openView(id) {

    if (!document.getElementById(id)) {
        return;
    }

    views.forEach(view => {
        view.classList.remove("active");
    });

    const target = document.getElementById(id);

    target.classList.add("active");


    navButtons.forEach(button => {

        if (
            button.dataset.open === id &&
            button.closest(".nav")
        ) {
            button.classList.add("active");
        } else if (button.closest(".nav")) {
            button.classList.remove("active");
        }

    });


    if (history.replaceState) {

        history.replaceState(
            null,
            "",
            "#" + id
        );

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const id = button.dataset.open;

        if (id) {
            openView(id);
        }

    });

});


/* =========================================================
   LIENS DATA-OPEN SUR LES CARTES
   ========================================================= */

document.querySelectorAll(".home-card").forEach(card => {

    card.addEventListener("click", () => {

        const id = card.dataset.open;

        if (id) {
            openView(id);
        }

    });

});


/* =========================================================
   HASH URL
   ========================================================= */

const initialHash =
    window.location.hash.replace("#", "");

if (
    initialHash &&
    document.getElementById(initialHash)
) {

    openView(initialHash);

} else {

    openView("home");

}


window.addEventListener("hashchange", () => {

    const id =
        window.location.hash.replace("#", "");

    if (
        id &&
        document.getElementById(id)
    ) {
        openView(id);
    }

});


/* =========================================================
   INVENTAIRES — ACCORDÉONS
   ========================================================= */

const inventoryDetails =
    document.querySelectorAll(
        "#inventaires details"
    );


inventoryDetails.forEach(detail => {

    detail.addEventListener("toggle", () => {

        if (!detail.open) {
            return;
        }

        inventoryDetails.forEach(other => {

            if (
                other !== detail &&
                other.open
            ) {
                other.open = false;
            }

        });

    });

});


/* =========================================================
   AUTRES DETAILS
   ========================================================= */

document.querySelectorAll("details").forEach(detail => {

    detail.addEventListener("click", event => {

        const summary =
            event.target.closest("summary");

        if (!summary) {
            return;
        }

        const parent =
            detail.parentElement;

        if (!parent) {
            return;
        }

        parent
            .querySelectorAll(":scope > details")
            .forEach(other => {

                if (
                    other !== detail &&
                    other.open
                ) {
                    other.open = false;
                }

            });

    });

});


/* =========================================================
   MOUVEMENT DE LA LUMIÈRE AVEC LA SOURIS
   ========================================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        const x =
            (event.clientX / window.innerWidth) * 100;

        const y =
            (event.clientY / window.innerHeight) * 100;

        document.documentElement.style.setProperty(
            "--mx",
            `${x}%`
        );

        document.documentElement.style.setProperty(
            "--my",
            `${y}%`
        );

    },
    { passive: true }
);


/* =========================================================
   FEU EN ARRIÈRE-PLAN
   ========================================================= */

const canvas =
    document.getElementById("fireCanvas");

if (!canvas) {
    return;
}


const ctx =
    canvas.getContext("2d");


let width = 0;
let height = 0;
let dpr = 1;

let particles = [];

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


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
   CREATION D'UNE FLAMME
   ========================================================= */

function createParticle(
    randomStart = false
) {

    const baseX =
        randomStart
            ? Math.random() * width
            : width * (
                .05 +
                Math.random() * .90
            );


    return {

        x: baseX,

        y:
            randomStart
                ? height * (
                    .50 +
                    Math.random() * .50
                )
                : height + Math.random() * 40,

        vx:
            (Math.random() - .5) * .65,

        vy:
            -(1.1 + Math.random() * 2.8),

        size:
            8 + Math.random() * 23,

        life:
            randomStart
                ? Math.random()
                : 0,

        maxLife:
            .55 +
            Math.random() * .9,

        sway:
            Math.random() * Math.PI * 2,

        swaySpeed:
            .012 +
            Math.random() * .025,

        rotation:
            Math.random() * Math.PI * 2,

        rotationSpeed:
            (Math.random() - .5) * .025,

        heat:
            Math.random()

    };

}


const particleCount =
    reducedMotion ? 30 : 95;


for (
    let i = 0;
    i < particleCount;
    i++
) {

    particles.push(
        createParticle(true)
    );

}


/* =========================================================
   DESSIN D'UNE PARTICULE DE FEU
   ========================================================= */

function drawParticle(p) {

    const alpha =
        Math.sin(
            Math.min(
                p.life,
                1
            ) * Math.PI
        ) * .42;


    if (alpha <= 0) {
        return;
    }


    const glow =
        ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 2.5
        );


    glow.addColorStop(
        0,
        `rgba(255,245,180,${alpha})`
    );

    glow.addColorStop(
        .18,
        `rgba(255,175,45,${alpha * .95})`
    );

    glow.addColorStop(
        .48,
        `rgba(255,69,0,${alpha * .65})`
    );

    glow.addColorStop(
        1,
        `rgba(180,0,0,0)`
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
        p.size * 2.5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* petite flamme centrale */

    const flame =
        ctx.createRadialGradient(
            p.x,
            p.y + p.size * .15,
            0,
            p.x,
            p.y,
            p.size
        );


    flame.addColorStop(
        0,
        `rgba(255,240,150,${alpha * .9})`
    );

    flame.addColorStop(
        .35,
        `rgba(255,105,15,${alpha * .75})`
    );

    flame.addColorStop(
        1,
        "rgba(210,20,0,0)"
    );


    ctx.fillStyle =
        flame;

    ctx.beginPath();

    ctx.ellipse(
        p.x,
        p.y,
        p.size * .7,
        p.size * 1.35,
        p.rotation,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}


/* =========================================================
   ANIMATION DU FEU
   ========================================================= */

let lastTime = performance.now();


function animateFire(now) {

    const delta =
        Math.min(
            (now - lastTime) / 16.67,
            2
        );

    lastTime = now;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(p => {

        p.life +=
            .008 * delta;

        p.sway +=
            p.swaySpeed * delta;

        p.rotation +=
            p.rotationSpeed * delta;


        /*
         * Le feu est légèrement attiré
         * par la position de la souris.
         */

        const dx =
            mouseX - p.x;

        const dy =
            mouseY - p.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distance < 420) {

            const force =
                (1 - distance / 420) *
                .018;

            p.vx +=
                dx * force * .04;

            p.vy -=
                force * .12;

        }


        /*
         * Mouvement naturel des flammes.
         */

        p.x +=
            (
                p.vx +
                Math.sin(p.sway) * .65
            ) * delta;

        p.y +=
            p.vy * delta;


        /*
         * Quand la flamme disparaît,
         * elle revient par le bas.
         */

        if (
            p.y <
            height * .05 ||
            p.life >= p.maxLife
        ) {

            p.x =
                Math.random() * width;

            p.y =
                height +
                Math.random() * 35;

            p.vx =
                (Math.random() - .5) * .65;

            p.vy =
                -(1.1 + Math.random() * 2.8);

            p.size =
                8 + Math.random() * 23;

            p.life = 0;

            p.maxLife =
                .55 +
                Math.random() * .9;

        }


        /*
         * Repositionnement horizontal.
         */

        if (p.x < -40) {
            p.x = width + 40;
        }

        if (p.x > width + 40) {
            p.x = -40;
        }


        drawParticle(p);

    });


    requestAnimationFrame(
        animateFire
    );

}


requestAnimationFrame(
    animateFire
);


/* =========================================================
   EMBERS / ÉTINCELLES
   ========================================================= */

const embers = [];


for (
    let i = 0;
    i < (reducedMotion ? 10 : 28);
    i++
) {

    embers.push({

        x:
            Math.random() * window.innerWidth,

        y:
            Math.random() * window.innerHeight,

        size:
            1 + Math.random() * 2.2,

        speed:
            .2 + Math.random() * .65,

        drift:
            (Math.random() - .5) * .5,

        alpha:
            .25 + Math.random() * .55

    });

}


function animateEmbers() {

    ctx.save();

    ctx.globalCompositeOperation =
        "screen";


    embers.forEach(e => {

        e.y -= e.speed;

        e.x += e.drift;


        if (e.y < -10) {

            e.y =
                height + 10;

            e.x =
                Math.random() * width;

        }


        const distance =
            Math.hypot(
                mouseX - e.x,
                mouseY - e.y
            );


        const mouseGlow =
            distance < 250
                ? 1 - distance / 250
                : 0;


        ctx.beginPath();

        ctx.fillStyle =
            `rgba(
                255,
                ${120 + mouseGlow * 100},
                ${35 + mouseGlow * 90},
                ${e.alpha + mouseGlow * .35}
            )`;

        ctx.shadowBlur =
            10;

        ctx.shadowColor =
            "rgba(255,70,0,.8)";

        ctx.arc(
            e.x,
            e.y,
            e.size + mouseGlow,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });


    ctx.restore();

    requestAnimationFrame(
        animateEmbers
    );

}


requestAnimationFrame(
    animateEmbers
);


/* =========================================================
   TOUCHE ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            document
                .querySelectorAll("details[open]")
                .forEach(detail => {
                    detail.open = false;
                });

        }

    }
);
```

});

