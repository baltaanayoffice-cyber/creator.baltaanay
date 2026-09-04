/**
 * BALTAANAY - editorblog.js
 * Editor enriquecido de artículos y blogs para la plataforma.
 * Soporta formateo, incrustación de código e imágenes y estados de publicación.
 */
const BlogEditor = (function() {
  function render(containerId, onSaveCallback) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold text-white">Editor de Blog y Artículos</h2>
          <div class="flex items-center space-x-2">
            <select id="blog-visibility" class="bg-slate-800 text-xs rounded-xl px-3 py-2 border border-slate-700 text-slate-200">
              <option value="open">Público (Open)</option>
              <option value="gratis">Solo Registrados</option>
              <option value="premium">Solo Premium</option>
            </select>
            <select id="blog-status" class="bg-slate-800 text-xs rounded-xl px-3 py-2 border border-slate-700 text-slate-200">
              <option value="publicado">Publicar</option>
              <option value="borrador">Borrador</option>
              <option value="privado">Privado</option>
            </select>
          </div>
        </div>

        <input type="text" id="blog-title" placeholder="Título del artículo..." class="w-full text-2xl font-extrabold bg-transparent border-b border-slate-800 pb-2 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500" />

        <!-- Barra de Herramientas de Formato -->
        <div class="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 text-xs">
          <button type="button" onclick="BlogEditor.insertFormat('**', '**')" class="px-3 py-1.5 rounded hover:bg-slate-800 font-bold">B</button>
          <button type="button" onclick="BlogEditor.insertFormat('*', '*')" class="px-3 py-1.5 rounded hover:bg-slate-800 italic">I</button>
          <button type="button" onclick="BlogEditor.insertFormat('\n* ', '')" class="px-3 py-1.5 rounded hover:bg-slate-800"><i class="fa-solid fa-list-ul"></i></button>
          <button type="button" onclick="BlogEditor.insertFormat('\n1. ', '')" class="px-3 py-1.5 rounded hover:bg-slate-800"><i class="fa-solid fa-list-ol"></i></button>
          <button type="button" onclick="BlogEditor.insertFormat('\n> ', '')" class="px-3 py-1.5 rounded hover:bg-slate-800"><i class="fa-solid fa-quote-left"></i></button>
          <button type="button" onclick="BlogEditor.insertFormat('\n```javascript\n', '\n```')" class="px-3 py-1.5 rounded hover:bg-slate-800"><i class="fa-solid fa-code"></i></button>
          <button type="button" onclick="BlogEditor.insertImagePrompt()" class="px-3 py-1.5 rounded hover:bg-slate-800"><i class="fa-solid fa-image"></i></button>
        </div>

        <!-- Área de Redacción -->
        <textarea id="blog-content" rows="14" placeholder="Escribe tu contenido en formato estructurado o Markdown..." class="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"></textarea>

        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
          <button type="button" onclick="BlogEditor.save()" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20">
            Guardar Contenido
          </button>
        </div>
      </div>
    `;
  }

  function insertFormat(startTag, endTag) {
    const area = document.getElementById('blog-content');
    if (!area) return;
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const text = area.value;
    const selected = text.substring(start, end);
    area.value = text.substring(0, start) + startTag + selected + endTag + text.substring(end);
    area.focus();
  }

  function insertImagePrompt() {
    const url = prompt('Ingresa la URL de la imagen:');
    if (url) {
      insertFormat(`![Imagen](${url})`, '');
    }
  }

  function save() {
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const vis = document.getElementById('blog-visibility').value;
    const st = document.getElementById('blog-status').value;

    if (!title || !content) {
      alert('Por favor completa el título y el cuerpo del artículo.');
      return;
    }

    CreatorService.saveContent({
      titulo: title,
      tipo: 'blog',
      contenido_principal: content,
      descripcion: content.substring(0, 140) + '...',
      visibilidad: vis,
      estado: st
    });
    alert('¡Artículo guardado exitosamente en Google Sheets!');
  }

  return { render, insertFormat, insertImagePrompt, save };
})();
