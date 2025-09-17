 const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mainMenu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('is-active');
    menu.classList.toggle('is-open');
    const expanded = btn.classList.contains('is-active');
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  (function(){
    const track = document.querySelector('.skills .skills-wrap');
    if (!track) return;

    // Duplicamos todos los ítems para que el loop sea perfecto
    const items = Array.from(track.children);
    items.forEach(node => track.appendChild(node.cloneNode(true)));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) {
      track.style.animation = 'none';
    }
  })();

  // Filtros de proyectos
(() => {
  const pills = document.querySelectorAll('.projects-filters .pill');
  const cards = document.querySelectorAll('.project-card');
  if (!pills.length || !cards.length) return;

  pills.forEach(btn => {
    btn.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter; // "all" | "codigo" | "figma"
      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();