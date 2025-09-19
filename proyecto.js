// ===== Datos (ajustá URLs/imagenes) =====
const PROJECTS = {
  "backery-kitchen": {
    title: "Backery Kitchen",
    desc: "Sitio para panadería con catálogo, cursos y reservas. Experiencia cálida y clara, enfocada en conversión.",
    web: "https://bakerykitchen.netlify.app/",
    hero: "img/proj-1.png",
    alt: "Mockup de Backery Kitchen en notebook y pantallas flotantes"
  },
  "brava": {
    title: "Brava",
    desc: "Explorá productos, comprá o reservá una mesa en la panadería Brava con una experiencia completa y personalizada.",
    web: "https://sensational-klepon-55d1f0.netlify.app/home",
    ux: "https://www.figma.com/design/e73sxVB2gnzMwUZgmiswK1/Proyecto-web--BRAVA?node-id=0-1&p=f&t=fGWIRoYYHHlwwAZp-0",
    hero: "img/proj-2.png",
    alt: "Mockup de Brava con pantallas sobre notebook",
    btnWebLabel: "Ver Web",                 // 👈 opcional
    btnUxLabel: "Ver prototipo / Diseño"   // 👈 opcional
  },
  "cudpadel": {
    title: "CudPadel",
    desc: "UI para reservar canchas y gestionar turnos de pádel de forma rápida desde el celular.",
    web: "https://www.figma.com/proto/iaGCv4stGiXWdUCoit1HTo/Web-culpadel?node-id=1-447&t=usTlxydIeVpVZV1n-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
    ux: "https://www.figma.com/proto/iaGCv4stGiXWdUCoit1HTo/Web-culpadel?node-id=2016-323&t=usTlxydIeVpVZV1n-0&scaling=scale-down-width&content-scaling=fixed&page-id=2016%3A102",
    hero: "img/proj-3.png",
    alt: "UI móvil de CudPadel con tarjetas de reserva"
  },
  "catalogo-tipografico": {
    title: "Catálogo Tipográfico",
    desc: "Exploración editorial con jerarquías claras y contraste para lectura cómoda.",
    web: "",                                // sin web
    ux: "https://www.figma.com/file/XXXX/catalogo",
    hero: "img/proj-4.png",
    alt: "Libro negro con relieve tipográfico sobre tela",
    btnUxLabel: "Ver diseño"                 // 👈 cambia solo este
  },

  "ilumina": {
    title: "Ilumina",
    desc: "Identidad y tarjetas minimalistas con formas modulares. Focus en ritmo y balance.",
    web: "",
    ux: "https://www.figma.com/proto/28fIg9naPEgWzf4kTakZQS/Imagen-corporativa-web?node-id=2026-2&t=zFjruapglKT6vlZn-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1",
    hero: "img/proj-5.png",
    alt: "Tarjetas de visita Ilumina sobre fondo claro"
  }

  // ...
};


// ===== Helpers =====
function getSlug() {
  const url = new URL(window.location.href);
  const q = url.searchParams.get('p');
  if (q) return q.trim().toLowerCase();
  if (location.hash) return location.hash.replace('#', '').trim().toLowerCase();
  return null;
}

function renderProject(slug){
  const data = PROJECTS[slug];
  const root = document.getElementById('project-root');
  const nf   = document.getElementById('not-found');

  if(!data){
    nf.hidden = false;
    document.title = "Proyecto no encontrado • BDS";
    return;
  }

  // Título
  document.getElementById('proj-title').textContent = data.title;
  document.title = `${data.title} • BDS`;

  // Descripción
  document.getElementById('proj-desc').textContent = data.desc;

  // Botones
  const btnWeb = document.getElementById('btn-web');
  const btnUx  = document.getElementById('btn-ux');

  // Labels opcionales
  btnWeb.textContent = data.btnWebLabel || "Ver Web";
  btnUx.textContent  = data.btnUxLabel  || "Ver diseño";

  // URLs y visibilidad
  if (data.web) { btnWeb.href = data.web; btnWeb.style.display = ""; }
  else          { btnWeb.style.display = "none"; }

  if (data.ux)  { btnUx.href  = data.ux;  btnUx.style.display  = ""; }
  else          { btnUx.style.display  = "none"; }

  // Imagen
  const hero = document.getElementById('proj-hero');
  hero.src = data.hero;
  hero.alt = data.alt || data.title;

  root.hidden = false;
}

function handleRoute() {
  renderProject(getSlug());
}
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
