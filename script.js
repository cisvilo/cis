
/* =========================================================
   CIS VILLENAVE — SCRIPT PRINCIPAL
   Navigation + liens + effets visuels
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. NAVIGATION ENTRE LES SECTIONS
  ======================================================= */

  const views = document.querySelectorAll(".view");
  const navButtons = document.querySelectorAll(".nav button[data-open]");
  const openButtons = document.querySelectorAll("[data-open]");

  function openView(id) {

    if (!id) return;

    const target = document.getElementById(id);

    if (!target) {
      console.warn("Section introuvable :", id);
      return;
    }

    /* Masquer toutes les sections */
    views.forEach(view => {
      view.classList.remove("active");
    });

    /* Afficher la section demandée */
    target.classList.add("active");

    /* Mettre à jour le menu */
    navButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.open === id
      );
    });

    /* Mettre à jour l'URL */
    history.replaceState(null, "", "#" + id);

    /* Revenir en haut */
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  /* =======================================================
     2. BOUTONS data-open
  ======================================================= */

  openButtons.forEach(button => {

    button.addEventListener("click", event => {

      const id = button.dataset.open;

      if (!id) return;

      event.preventDefault();

      openView(id);
    });

  });


  /* =======================================================
     3. OUVERTURE DIRECTE AVEC #URL
     
     Exemple :
     site.com/cis.html#inventaires
  ======================================================= */

  function openFromHash() {

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
      openView(hash);
    } else {
      openView("home");
    }

  }

  openFromHash();


  /* =======================================================
     4. GESTION DU BOUTON RETOUR / HASH
  ======================================================= */

  window.addEventListener("hashchange", () => {

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
      openView(hash);
    }

  });


  /* =======================================================
     5. LIENS EXTERNES
     
     Tous les éléments ayant :
     data-link="nom"
     
     peuvent être associés à une URL ici.
  ======================================================= */

  const links = {

    /* ================= INVENTAIRES ================= */

    vsav1_chef: "https://example.com",
    vsav1_conducteur: "https://example.com",
    vsav1_equipier: "https://example.com",

    vsav2_chef: "https://example.com",
    vsav2_conducteur: "https://example.com",
    vsav2_equipier: "https://example.com",

    vsav3_chef: "https://example.com",
    vsav3_conducteur: "https://example.com",
    vsav3_equipier: "https://example.com",

    fourgon: "https://example.com",
    echelle: "https://example.com",
    mousse: "https://example.com",

    div1: "https://example.com",

    fdf1: "https://example.com",

    specialite1: "https://example.com",

    standard1: "https://example.com",

    casernement1: "https://example.com",


    /* ================= ENTRETIENS ================= */

    entretien_vsav: "https://example.com",
    entretien_incendie: "https://example.com",
    entretien_div: "https://example.com",


    /* ================= DOCUMENTS ================= */

    notes_service: "https://example.com",
    procedures: "https://example.com",
    documents_ssuap: "https://example.com",
    auto_protection_mensuel: "https://example.com",
    auto_protection_hebdo: "https://example.com",


    /* ================= AMICALE ================= */

    amicale_services: "https://example.com",

    amicale_enjoy2: "https://example.com",
    amicale_ubb2: "https://example.com",
    regles_ubb: "https://example.com",
    amicale_padel2: "https://example.com",
    amicale_speedpark2: "https://example.com",

    sumup: "https://example.com",
    remboursement: "https://example.com",
    prestations: "https://example.com",

    location_materiel: "https://example.com",
    location_jolt: "https://example.com",
    location_salles: "https://example.com",

    statuts: "https://example.com",
    reglement_interieur: "https://example.com",
    regles_amicale: "https://example.com",
    tableau_prestations: "https://example.com",
    doc_partenaires: "https://example.com",

    adhesion: "https://example.com",
    compobureau: "https://example.com",

    mymaps: "https://example.com",
    reglement_cal: "https://example.com",
    fiche_retour: "https://example.com",
    fiche_taches: "https://example.com",
    fiche_sumup: "https://example.com",

    doc_partenaires2: "https://example.com",
    form_partenariat: "https://example.com",

    ref_formation2: "https://example.com",

    sumup_mess: "https://example.com",


    /* ================= RACCOURCIS ================= */

    agatt: "https://example.com",
    zimbra: "https://example.com",
    gipsi: "https://example.com",
    enasis: "https://example.com",
    udsp: "https://example.com",
    cos: "https://example.com"

  };


  /* =======================================================
     6. APPLIQUER AUTOMATIQUEMENT LES URL
  ======================================================= */

  document.querySelectorAll("[data-link]").forEach(element => {

    const key = element.dataset.link;

    if (!key) return;

    const url = links[key];

    if (!url) {

      console.warn(
        "Aucune URL définie pour :",
        key
      );

      return;
    }

    element.href = url;

    /* Sécurité pour les nouveaux onglets */
    if (element.target === "_blank") {
      element.rel = "noopener noreferrer";
    }

  });


  /* =======================================================
     7. EFFET SOURIS SUR LE SITE
     
     Ton CSS utilise :
     --mx
     --my
  ======================================================= */

  let mouseX = 50;
  let mouseY = 30;

  document.addEventListener("mousemove", event => {

    mouseX = (event.clientX / window.innerWidth) * 100;
    mouseY = (event.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty(
      "--mx",
      `${mouseX}%`
    );

    document.documentElement.style.setProperty(
      "--my",
      `${mouseY}%`
    );

  });


  /* =======================================================
     8. ACCESSIBILITÉ
     
     Permet d'utiliser les boutons avec le clavier.
  ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      const openDetails = document.querySelectorAll(
        "details[open]"
      );

      openDetails.forEach(detail => {
        detail.removeAttribute("open");
      });

    }

  });


  /* =======================================================
     9. ANIMATION DES DETAILS
  ======================================================= */

  document.querySelectorAll("details").forEach(detail => {

    detail.addEventListener("toggle", () => {

      if (!detail.open) return;

      /* Fermer les autres catégories du même groupe */

      const parent = detail.parentElement;

      if (!parent) return;

      parent.querySelectorAll("details[open]").forEach(other => {

        if (other !== detail) {
          other.removeAttribute("open");
        }

      });

    });

  });


  /* =======================================================
     10. LOG POUR VÉRIFIER QUE LE SCRIPT FONCTIONNE
  ======================================================= */

  console.log(
    "🔥 CIS VILLENAVE — script.js chargé avec succès."
  );

});
