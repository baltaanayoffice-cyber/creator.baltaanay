/**
 * BALTAANAY - creator-main.js
 */
const CreatorApp = (function() {
  function init() {
    openEditor();
  }

  function openEditor() {
    BlogEditor.render('creator-viewport');
  }

  function openAdminKing() {
    KingAdmin.render('creator-viewport');
  }

  return { init, openEditor, openAdminKing };
})();

window.addEventListener('DOMContentLoaded', CreatorApp.init);
