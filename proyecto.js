// ===== Datos (ajustá URLs/imagenes) =====
const PROJECTS = {
  "backery-kitchen": {
    title: "Backery Kitchen",
    desc: " Bakery kitchen es una web dedicada a ofrecer talleres de panadería. La página está diseñada para ser intuitiva y funcional, facilitando a los usuarios encontrar información sobre los talleres, contactar con los organizadores, y conocer más sobre la historia de Bakery Kitchen",
    web: "https://bakerykitchen.netlify.app/",
    hero: "img/proj-1.png",
    alt: "Mockup de Backery Kitchen en notebook y pantallas flotantes"
  },
  "brava": {
    title: "Brava",
    desc: "Esta aplicación te permitirá explorar los productos de la panadería Brava, realizar tus compras o reservar una mesa, asegurando una experiencia más completa y personalizada.",
    web: "https://sensational-klepon-55d1f0.netlify.app/home",
    ux: "https://www.figma.com/design/e73sxVB2gnzMwUZgmiswK1/Proyecto-web--BRAVA?node-id=0-1&p=f&t=fGWIRoYYHHlwwAZp-0",
    hero: "img/proj-2.png",
    alt: "Mockup de Brava con pantallas sobre notebook",
    btnWebLabel: "Ver Web",
    btnUxLabel: "Ver prototipo / Diseño"
  },
  "cudpadel": {
    title: "CudPadel",
    desc: "Culpadel es una identidad digital que cuenta con el diseño de una aplicación pensada para brindar una experiencia clara y atractiva. El proyecto combina simplicidad y estilo, permitiendo a los usuarios conectar fácilmente con la propuesta de la marca.",
    web: "https://www.figma.com/proto/iaGCv4stGiXWdUCoit1HTo/Web-culpadel?node-id=1-447&t=usTlxydIeVpVZV1n-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
    ux: "https://www.figma.com/proto/iaGCv4stGiXWdUCoit1HTo/Web-culpadel?node-id=2016-323&t=usTlxydIeVpVZV1n-0&scaling=scale-down-width&content-scaling=fixed&page-id=2016%3A102",
    hero: "img/proj-3.png",
    alt: "UI móvil de CudPadel con tarjetas de reserva"
  },
  "hobby": {
    title: "Hobby",
    desc: " Hobby es una aplicación web diseñada para ayudar a los usuarios a gestionar y organizar sus hobbies de manera efectiva. Ofrece una experiencia de usuario simplificada, permitiendo a los usuarios registrar, filtrar, editar y eliminar sus hobbies",
    web: "https://hobby-pw2.netlify.app/login.html",
    ux: "",
    hero: "img/proj-4.png",
    alt: "hobby",
    btnUxLabel: "Ver diseño"
  },

  "ilumina": {
    title: "Ilumina",
    desc: "Ilumina es una identidad corporativa diseñada para transmitir claridad y modernidad. El proyecto se centra en una presencia digital atractiva y profesional, destacando la esencia de la marca a través de un estilo visual simple y coherente.",
    web: "",
    ux: "https://www.figma.com/proto/28fIg9naPEgWzf4kTakZQS/Imagen-corporativa-web?node-id=2026-2&t=zFjruapglKT6vlZn-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1",
    hero: "img/proj-5.png",
    alt: "Tarjetas de visita Ilumina sobre fondo claro"
  }

  // ...
};

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

function renderRelated(currentSlug) {
  const container = document.getElementById('related-grid');
  const section   = document.getElementById('related-projects');
  if (!container || !section) return;

  // Filtra proyectos distintos al actual
  const similares = Object.entries(PROJECTS)
    .filter(([slug]) => slug !== currentSlug)
    .slice(0, 3); // solo 3

  container.innerHTML = '';
  similares.forEach(([slug, data]) => {
    const card = document.createElement('article');
    card.className = 'related-card';
    card.innerHTML = `
      <a href="proyecto.html?p=${slug}">
        <img src="${data.hero}" alt="${data.alt}">
      </a>
      <div class="related-meta">
        <h3 class="related-title-sm">${data.title}</h3>
        <a href="proyecto.html?p=${slug}" class="related-more">Ver más</a>
      </div>
    `;
    container.appendChild(card);
  });

  section.hidden = false;
}

// en handleRoute:
function handleRoute(){
  const slug = getSlug();
  renderProject(slug);
  renderRelated(slug);
}
// Navegación interna en "Proyectos Similares" sin recargar
document.addEventListener('click', (e) => {
  const link = e.target.closest('.related-card a, .related-more');
  if (!link) return;

  // Si el link es a proyecto.html?p=...
  const url = new URL(link.href, window.location.href);
  const slug = url.searchParams.get('p');
  if (!slug) return;

  // Prevenimos la carga completa y hacemos SPA-like
  e.preventDefault();
  history.pushState({ p: slug }, '', `?p=${slug}`);

  renderProject(slug);
  renderRelated(slug);

  // opcional: sube al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Soporte para botón Atrás/Adelante
window.addEventListener('popstate', () => {
  const slug = getSlug();
  renderProject(slug);
  renderRelated(slug);
});