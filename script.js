/* ============================================================
   CIS VILLENAVE — script.js
   Contient :
   1. La table CIS_LINKS : à remplir plus tard avec les vraies URLs
      (Google Forms, Google Drive, etc.). Chaque clé correspond à un
      attribut data-link="..." présent dans index.html.
   2. La logique de navigation entre sections (sans rechargement de page).
   3. L'animation d'ambiance (fumée + braises) derrière le contenu.
   ============================================================ */

/* ---------- 1. LIENS À COMPLÉTER ----------
   Exemple : CIS_LINKS.fpt1 = "https://docs.google.com/forms/...";
   Tant qu'une clé n'a pas d'URL, le lien reste inactif (href="#").
*/
window.CIS_LINKS = {
  // Inventaires — SSUAP
  vsav1_chef: "", vsav1_conducteur: "", vsav1_equipier: "",
  vsav2_chef: "", vsav2_conducteur: "", vsav2_equipier: "",
  vsav3_chef: "", vsav3_conducteur: "", vsav3_equipier: "",
  asu_pdg: "", asu_utilisation: "",

  // Inventaires — Incendie
  fpt1: "", fptgp2: "", ech: "", fmogp_inv: "", vlcdgg: "",

  // Inventaires — DIV
  vtu1_inv: "", vtu2_inv: "", vsrm_inv: "",

  // Inventaires — FDF
  ccf1_inv: "", ccf2_inv: "", vlhr_inv: "", amsec: "",

  // Inventaires — Spécialités
  eld: "", drone_inv: "",

  // Inventaires — Standard
  stas: "", sac_ps_stas: "",

  // Inventaires — Casernement
  reserve_inc: "", pharmacie: "",

  // Entretiens
  ent_fpt1: "", ent_fptgp2: "", ent_ech: "", ent_vsav1: "", ent_vsav2: "",
  ent_vsav3: "", ent_ccf1: "", ent_ccf2: "", ent_vlhr: "", ent_fmogp: "",
  ent_vsr: "", ent_vtu1: "", ent_vtu2: "", ent_vls1: "", ent_vls2: "",
  ent_vls3: "", ent_vdrone: "",

  // Documents
  drive_notes: "", drive_proc: "", drive_ssuap: "", drive_fdf: "", ref_formation: "",

  // Amicale
  amicale_enjoy: "", amicale_padel: "", amicale_ubb: "", amicale_speedpark: "", amicale_jolt: "",
  amicale_enjoy2: "", amicale_ubb2: "", regles_ubb: "", amicale_padel2: "", amicale_speedpark2: "",
  sumup: "", remboursement: "", prestations: "",
  location_materiel: "", location_jolt: "", location_salles: "",
  statuts: "", reglement_interieur: "", regles_amicale: "", tableau_prestations: "", doc_partenaires: "",
  adhesion: "", compobureau: "",
  mymaps: "", reglement_cal: "", fiche_retour: "", fiche_taches: "", fiche_sumup: "",
  doc_partenaires2: "", form_partenariat: "",
  ref_formation2: "", sumup_mess: "",

  // Raccourcis
  agatt: "", zimbra: "", gipsi: "", enasis: "", udsp: "", cos: ""
};

/* ---------- 2. NAVIGATION ---------- */
(function () {
  // Applique les URLs de CIS_LINKS sur les éléments data-link
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var url = window.CIS_LINKS && window.CIS_LINKS[key];
    if (url) el.setAttribute("href", url);
  });

  var views = [].slice.call(document.querySelectorAll(".view"));
  var sections = new Set(views.map(function (v) { return v.id; }));

  function snapshot(id) {
    var detailsInView = [].slice.call(document.querySelectorAll("#" + id + " details"));
    var openIdx = [];
    detailsInView.forEach(function (d, i) { if (d.open) openIdx.push(i); });
    return { cisPortal: true, view: id, open: openIdx };
  }

  function render(state) {
    var id = (state && sections.has(state.view)) ? state.view : "home";
    views.forEach(function (v) { v.classList.toggle("active", v.id === id); });
    document.querySelectorAll(".nav button[data-open]").forEach(function (b) {
      b.classList.toggle("active", b.dataset.open === id);
    });
    document.querySelectorAll(".view details").forEach(function (d) { d.open = false; });
    var detailsInView = [].slice.call(document.querySelectorAll("#" + id + " details"));
    (state.open || []).forEach(function (i) {
      if (detailsInView[i]) detailsInView[i].open = true;
    });
  }

  function navigate(id) {
    if (!sections.has(id)) return;
    var current = document.querySelector(".view.active").id;
    if (current === id) return;
    history.pushState({ cisPortal: true, view: id, open: [] }, "", location.href);
    render(history.state);
  }

  // Premier état de l'historique, pour que le bouton "Retour" du navigateur reste dans le portail
  history.replaceState(snapshot(document.querySelector(".view.active").id), "", location.href);

  // Ajoute un bouton "Retour à l'accueil" en haut de chaque section (sauf l'accueil)
  views.filter(function (v) { return v.id !== "home"; }).forEach(function (v) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "section-back";
    button.textContent = "← Retour à l'accueil";
    button.addEventListener("click", function () { navigate("home"); });
    v.prepend(button);
  });

  // Clic sur tout élément data-open (boutons du menu, cartes de l'accueil)
  document.querySelectorAll("[data-open]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      navigate(el.dataset.open);
    });
  });

  // Ouverture/fermeture des accordéons (details/summary), avec mémorisation dans l'historique
  document.querySelectorAll(".view details > summary").forEach(function (summary) {
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      var d = summary.parentElement;
      var id = d.closest(".view").id;
      d.open = !d.open;
      history.pushState(snapshot(id), "", location.href);
    });
  });

  window.addEventListener("popstate", function (e) {
    render(e.state || { view: "home", open: [] });
  });
})();

/* ---------- 3. ANIMATION D'AMBIANCE (fumée + braises) ---------- */
(function () {
  var main = document.querySelector("main");
  if (!main) return;

  var canvas = document.createElement("canvas");
  canvas.id = "ambient-fire";
  canvas.setAttribute("aria-hidden", "true");
  main.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var width = 0, height = 0, dpr = 1, last = 0, visible = true;
  function random(a, b) { return a + Math.random() * (b - a); }

  var clouds = Array.from({ length: 18 }, function () {
    return {
      x: Math.random(), y: Math.random(), r: random(110, 250),
      speed: random(5, 15), drift: random(-5, 5),
      age: random(0, 1), life: random(15, 26)
    };
  });

  var embers = Array.from({ length: 64 }, function () {
    return {
      x: Math.random(), y: Math.random(), speed: random(16, 43),
      drift: random(-9, 9), radius: random(1, 2.7), phase: random(0, 6.28)
    };
  });

  function resize() {
    var rect = main.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  new ResizeObserver(resize).observe(main);
  resize();

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(main);
  }

  function frame(time) {
    var dt = Math.min((time - last) / 1000 || 0, 0.06);
    last = time;

    if (visible) {
      ctx.clearRect(0, 0, width, height);

      clouds.forEach(function (c) {
        c.age += dt / c.life;
        c.y -= c.speed * dt / height;
        c.x += c.drift * dt / width;
        if (c.age >= 1 || c.y < -0.2) {
          c.x = Math.random(); c.y = random(0.75, 1.12);
          c.r = random(110, 250); c.age = 0; c.life = random(15, 26);
        }
        var fade = Math.sin(Math.PI * c.age);
        var x = c.x * width, y = c.y * height;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1.55, 0.62);
        var g = ctx.createRadialGradient(0, 0, 0, 0, 0, c.r);
        g.addColorStop(0, 'rgba(210,221,219,' + (0.20 * fade) + ')');
        g.addColorStop(0.48, 'rgba(177,194,194,' + (0.14 * fade) + ')');
        g.addColorStop(1, 'rgba(166,184,185,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, c.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      embers.forEach(function (e) {
        e.y -= e.speed * dt / height;
        e.x += (e.drift + Math.sin(time / 850 + e.phase) * 4) * dt / width;
        if (e.y < -0.025) { e.y = 1.02; e.x = Math.random(); }
        var x = e.x * width, y = e.y * height;
        var pulse = 0.7 + 0.3 * Math.sin(time / 420 + e.phase);
        var glow = ctx.createRadialGradient(x, y, 0, x, y, e.radius * 5);
        glow.addColorStop(0, 'rgba(255,226,164,' + (0.94 * pulse) + ')');
        glow.addColorStop(0.25, 'rgba(255,132,53,' + (0.75 * pulse) + ')');
        glow.addColorStop(1, 'rgba(239,74,23,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, e.radius * 5, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
