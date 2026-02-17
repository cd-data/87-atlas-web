/* ============================================
   MENÚ HAMBURGUESA MOBILE - 87/OCHOSITETE
   ============================================ */

(function() {
  'use strict';
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', initMobileMenu);
  
  function initMobileMenu() {
    // Crear botón hamburguesa
    createHamburgerButton();
    
    // Crear overlay de menú
    createMenuOverlay();
    
    // Event listeners
    setupEventListeners();
  }
  
  function createHamburgerButton() {
    const header = document.querySelector('.header-contenido');
    if (!header) return;
    
    // Crear botón hamburguesa
    const hamburger = document.createElement('button');
    hamburger.id = 'mobile-menu-toggle';
    hamburger.className = 'mobile-menu-toggle';
    hamburger.setAttribute('aria-label', 'Abrir menú');
    hamburger.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    
    // Insertar después del logo
    const logo = header.querySelector('.site-logo');
    if (logo && logo.parentNode) {
      logo.parentNode.insertBefore(hamburger, logo.nextSibling);
    }
  }
  
  function createMenuOverlay() {
    // Clonar el menú de navegación existente
    const navOriginal = document.querySelector('.nav-principal');
    if (!navOriginal) return;
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.id = 'mobile-menu-overlay';
    overlay.className = 'mobile-menu-overlay';
    
    // Crear contenedor del menú
    const menuContainer = document.createElement('div');
    menuContainer.className = 'mobile-menu-container';
    
    // Header del menú móvil
    const menuHeader = document.createElement('div');
    menuHeader.className = 'mobile-menu-header';
    menuHeader.innerHTML = `
      <span class="mobile-menu-title">MENÚ</span>
      <button id="mobile-menu-close" class="mobile-menu-close" aria-label="Cerrar menú">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    
    // Clonar navegación
    const navClone = navOriginal.cloneNode(true);
    navClone.className = 'mobile-menu-nav';
    
    // Ensamblar
    menuContainer.appendChild(menuHeader);
    menuContainer.appendChild(navClone);
    overlay.appendChild(menuContainer);
    
    // Añadir al body
    document.body.appendChild(overlay);
  }
  
  function setupEventListeners() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    if (!toggleBtn || !overlay) return;
    
    // Abrir menú
    toggleBtn.addEventListener('click', openMenu);
    
    // Cerrar menú
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }
    
    // Cerrar al hacer click en el overlay (fuera del menú)
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });
    
    // Cerrar al hacer click en un link del menú
    const menuLinks = overlay.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeMenu();
      }
    });
  }
  
  function openMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    
    if (overlay && toggleBtn) {
      overlay.classList.add('active');
      toggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
  }
  
  function closeMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    
    if (overlay && toggleBtn) {
      overlay.classList.remove('active');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
  
})();
