/**
 * BALTAANAY - king.js
 * Consola Maestra de Administrador con acceso total:
 * - Supervisión de todos los usuarios
 * - Promoción a Premium / Bloqueo
 * - Vinculación de URLs de audio/video externos (MP3, MP4, PDF) a creadores
 * - Resolución de recuperación de cuentas en ventana de 24 horas
 */
const KingAdmin = (function() {
  function render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-white flex items-center">
              <i class="fa-solid fa-crown text-amber-400 mr-3"></i> Panel Maestro King.js
            </h1>
            <p class="text-slate-400 text-sm mt-1">Control integral de plataforma, contenidos externos y cuentas.</p>
          </div>
        </div>

        <!-- Módulos de Administración -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- 1. VINCULAR CONTENIDO EXTERNO -->
          <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 class="text-lg font-bold text-white flex items-center">
              <i class="fa-solid fa-link text-indigo-400 mr-2"></i> Vincular Archivo Externo a Creador
            </h3>
            <p class="text-xs text-slate-400">Asocia archivos MP4, MP3 o PDF alojados en servidores externos al nombre del creador.</p>
            <div class="space-y-3 text-xs">
              <input type="text" id="king-title" placeholder="Título del contenido" class="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white" />
              <input type="text" id="king-url" placeholder="URL nativa directa (ej: https://.../video.mp4)" class="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white font-mono" />
              <div class="grid grid-cols-2 gap-3">
                <select id="king-type" class="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white">
                  <option value="video">Video (MP4)</option>
                  <option value="audio">Audio / Podcast (MP3)</option>
                  <option value="pdf">Documento (PDF)</option>
                </select>
                <select id="king-vis" class="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white">
                  <option value="open">Abierto (Open)</option>
                  <option value="gratis">Gratis (Registrados)</option>
                  <option value="premium">Premium</option>
                  <option value="oculto">Oculto (Invitados)</option>
                </select>
              </div>
              <button onclick="KingAdmin.publishExternal()" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-white">
                Publicar Contenido Oficial
              </button>
            </div>
          </div>

          <!-- 2. GESTIÓN DE CUENTAS Y RECUPERACIÓN 24H -->
          <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 class="text-lg font-bold text-white flex items-center">
              <i class="fa-solid fa-user-shield text-emerald-400 mr-2"></i> Solicitudes de Recuperación (24h)
            </h3>
            <p class="text-xs text-slate-400">Emite contraseñas temporales tras el tercer intento fallido del usuario.</p>
            <div id="king-recovery-list" class="space-y-2 max-h-52 overflow-y-auto">
              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div class="font-bold text-white">Carlos Vargas</div>
                  <div class="text-slate-400 text-[10px]">carlos.vargas@estudiante.edu</div>
                </div>
                <button onclick="alert('Contraseña temporal generada y publicada: TEMP-984210')" class="px-3 py-1 bg-emerald-600 rounded-lg text-white font-semibold">
                  Aprobar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function publishExternal() {
    const t = document.getElementById('king-title').value;
    const u = document.getElementById('king-url').value;
    const type = document.getElementById('king-type').value;
    const vis = document.getElementById('king-vis').value;

    if (!t || !u) {
      alert('Ingresa el título y la URL.');
      return;
    }

    CreatorService.saveContent({
      titulo: t,
      contenido_principal: u,
      tipo: type,
      visibilidad: vis,
      es_plataforma: true,
      estado: 'publicado'
    });
    alert('Contenido vinculado y publicado correctamente en la base de datos.');
  }

  return { render, publishExternal };
})();
