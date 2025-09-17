// ===== Datos (ajustá URLs/imagenes) =====
const PROJECTS = {
  "backery-kitchen": {
    title: "Backery Kitchen",
    desc: "Sitio para panadería con catálogo, cursos y reservas. Experiencia cálida y clara, enfocada en conversión.",
    web:  "https://tusitio.com/backery",
    ux:   "https://www.figma.com/file/XXXX/backery",
    hero: "img/proj-1.png",
    alt:  "Mockup de Backery Kitchen en notebook y pantallas flotantes"
  },
  "brava": {
    title: "Brava",
    desc: "Explorá productos, comprá o reservá una mesa en la panadería Brava con una experiencia completa y personalizada.",
    web:  "https://sensational-klepon-55d1f0.netlify.app/home",
    ux:   "https://www.figma.com/design/e73sxVB2gnzMwUZgmiswK1/Proyecto-web--BRAVA?node-id=0-1&p=f&t=fGWIRoYYHHlwwAZp-0",
    hero: "img/proj-2.png",
    alt:  "Mockup de Brava con pantallas sobre notebook"
  },
  "cudpadel": {
    title: "CudPadel",
    desc: "UI para reservar canchas y gestionar turnos de pádel de forma rápida desde el celular.",
    web:  "",
    ux:   "https://www.figma.com/file/XXXX/cudpadel",
    hero: "img/proj-3.png",
    alt:  "UI móvil de CudPadel con tarjetas de reserva"
  },
  "catalogo-tipografico": {
    title: "Catálogo Tipográfico",
    desc: "Exploración editorial con jerarquías claras y contraste para lectura cómoda.",
    web:  "",
    ux:   "https://www.figma.com/file/XXXX/catalogo",
    hero: "img/proj-4.png",
    alt:  "Libro negro con relieve tipográfico sobre tela"
  },
  "ilumina": {
    title: "Ilumina",
    desc: "Identidad y tarjetas minimalistas con formas modulares. Focus en ritmo y balance.",
    web:  "",
    ux:   "https://www.figma.com/file/XXXX/ilumina",
    hero: "img/proj-5.png",
    alt:  "Tarjetas de visita Ilumina sobre fondo claro"
  }
};

// ===== Helpers =====
function getSlug(){
  const url = new URL(window.location.href);
  const q = url.searchParams.get('p');
  if (q) return q.trim().toLowerCase();
  if (location.hash) return location.hash.replace('#','').trim().toLowerCase();
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

  // Título (dentro de .projects-title)
  document.getElementById('proj-title').lastChild
    ? document.getElementById('proj-title').lastChild.nodeType === 3
      ? document.getElementById('proj-title').lastChild.nodeValue = data.title
      : document.getElementById('proj-title').appendChild(document.createTextNode(data.title))
    : document.getElementById('proj-title').appendChild(document.createTextNode(data.title));

  document.getElementById('doc-title').textContent = `${data.title} • BDS`;
  document.getElementById('proj-desc').textContent  = data.desc;

  // Botones
  const btnWeb = document.getElementById('btn-web');
  const btnUx  = document.getElementById('btn-ux');
  btnWeb.href = data.web || '#';
  btnUx.href  = data.ux  || '#';
  btnWeb.style.display = data.web ? '' : 'none';
  btnUx.style.display  = data.ux  ? '' : 'none';

  // Imagen
  const hero = document.getElementById('proj-hero');
  hero.src = data.hero;
  hero.alt = data.alt || data.title;

  root.hidden = false;
}

function handleRoute(){
  renderProject(getSlug());
}
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
