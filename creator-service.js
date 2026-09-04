/**
 * BALTAANAY - creator-service.js
 * Servicio de datos dedicado para el subdominio de creadores.
 */
const CreatorService = (function() {
  async function saveContent(data) {
    const url = localStorage.getItem('https://script.google.com/macros/s/AKfycbzw5SUx9LPOaNkwZE_VILXY25wjTMKvZccMHUYALI-DbfygK4najH4EjYzQTPvEHUU/exec');
    if (url) {
      try {
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ action: 'saveContent', ...data })
        });
      } catch (e) {
        console.error(e);
      }
    }
    // Guardar en respaldo local
    const list = JSON.parse(localStorage.getItem('creator_items') || '[]');
    list.unshift({ id: 'CONT-' + Date.now(), ...data });
    localStorage.setItem('creator_items', JSON.stringify(list));
  }

  return { saveContent };
})();
