/* ============================================
   SWIPE GESTURES - 87/OCHOSITETE
   Navegación entre artículos con swipe
   ============================================ */

(function() {
  'use strict';
  
  // Inicializar solo en páginas de artículos individuales
  if (document.body.classList.contains('single') || document.querySelector('.articulo-single')) {
    document.addEventListener('DOMContentLoaded', initSwipeNavigation);
  }
  
  function initSwipeNavigation() {
    const swipeZone = document.querySelector('.articulo-single') || document.querySelector('main');
    if (!swipeZone) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    // Configuración
    const config = {
      minSwipeDistance: 50, // Distancia mínima para reconocer swipe (px)
      maxVerticalDistance: 100, // Máxima desviación vertical permitida
      velocityThreshold: 0.3 // Velocidad mínima del swipe
    };
    
    // Encontrar links de navegación
    const prevLink = findNavigationLink('prev');
    const nextLink = findNavigationLink('next');
    
    // Si no hay links de navegación, no hacer nada
    if (!prevLink && !nextLink) return;
    
    // Crear indicadores visuales de swipe
    createSwipeIndicators();
    
    // Touch events
    swipeZone.addEventListener('touchstart', handleTouchStart, { passive: true });
    swipeZone.addEventListener('touchmove', handleTouchMove, { passive: false });
    swipeZone.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
    
    function handleTouchMove(e) {
      // Mostrar indicador visual mientras se mueve
      const currentX = e.changedTouches[0].screenX;
      const diffX = currentX - touchStartX;
      
      if (Math.abs(diffX) > 10) {
        updateSwipeIndicator(diffX);
      }
    }
    
    function handleTouchEnd(e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      
      // Resetear indicador
      resetSwipeIndicator();
      
      // Detectar dirección del swipe
      handleSwipe();
    }
    
    function handleSwipe() {
      const diffX = touchEndX - touchStartX;
      const diffY = Math.abs(touchEndY - touchStartY);
      
      // Validar que sea un swipe horizontal válido
      if (Math.abs(diffX) < config.minSwipeDistance) return;
      if (diffY > config.maxVerticalDistance) return; // Demasiado vertical
      
      // Swipe a la derecha (ir a artículo anterior)
      if (diffX > 0 && prevLink) {
        showSwipeFeedback('prev');
        setTimeout(() => {
          window.location.href = prevLink.href;
        }, 200);
      }
      
      // Swipe a la izquierda (ir a artículo siguiente)
      if (diffX < 0 && nextLink) {
        showSwipeFeedback('next');
        setTimeout(() => {
          window.location.href = nextLink.href;
        }, 200);
      }
    }
    
    function findNavigationLink(direction) {
      // Buscar link de navegación por múltiples métodos
      
      // Método 1: Buscar en la navegación prev/next
      const navSection = document.querySelector('nav[style*="border-top"]');
      if (navSection) {
        const links = navSection.querySelectorAll('a');
        if (direction === 'prev' && links[0]) return links[0];
        if (direction === 'next' && links[1]) return links[1];
      }
      
      // Método 2: Buscar por texto
      const allLinks = document.querySelectorAll('a');
      for (let link of allLinks) {
        const text = link.textContent.toLowerCase();
        if (direction === 'prev' && (text.includes('anterior') || text.includes('←'))) {
          return link;
        }
        if (direction === 'next' && (text.includes('siguiente') || text.includes('→'))) {
          return link;
        }
      }
      
      return null;
    }
    
    function createSwipeIndicators() {
      // Crear indicadores solo si hay navegación disponible
      if (prevLink) {
        const prevIndicator = document.createElement('div');
        prevIndicator.id = 'swipe-indicator-prev';
        prevIndicator.className = 'swipe-indicator swipe-indicator-prev';
        prevIndicator.innerHTML = `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Anterior</span>
        `;
        document.body.appendChild(prevIndicator);
      }
      
      if (nextLink) {
        const nextIndicator = document.createElement('div');
        nextIndicator.id = 'swipe-indicator-next';
        nextIndicator.className = 'swipe-indicator swipe-indicator-next';
        nextIndicator.innerHTML = `
          <span>Siguiente</span>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        document.body.appendChild(nextIndicator);
      }
    }
    
    function updateSwipeIndicator(diffX) {
      const prevIndicator = document.getElementById('swipe-indicator-prev');
      const nextIndicator = document.getElementById('swipe-indicator-next');
      
      if (diffX > 0 && prevIndicator) {
        // Swipe derecha - mostrar indicador prev
        const opacity = Math.min(Math.abs(diffX) / 100, 1);
        prevIndicator.style.opacity = opacity;
        prevIndicator.style.transform = `translateX(-50%) scale(${0.8 + opacity * 0.2})`;
      } else if (diffX < 0 && nextIndicator) {
        // Swipe izquierda - mostrar indicador next
        const opacity = Math.min(Math.abs(diffX) / 100, 1);
        nextIndicator.style.opacity = opacity;
        nextIndicator.style.transform = `translateX(50%) scale(${0.8 + opacity * 0.2})`;
      }
    }
    
    function resetSwipeIndicator() {
      const prevIndicator = document.getElementById('swipe-indicator-prev');
      const nextIndicator = document.getElementById('swipe-indicator-next');
      
      if (prevIndicator) {
        prevIndicator.style.opacity = '0';
        prevIndicator.style.transform = 'translateX(-50%) scale(0.8)';
      }
      
      if (nextIndicator) {
        nextIndicator.style.opacity = '0';
        nextIndicator.style.transform = 'translateX(50%) scale(0.8)';
      }
    }
    
    function showSwipeFeedback(direction) {
      const indicator = direction === 'prev' 
        ? document.getElementById('swipe-indicator-prev')
        : document.getElementById('swipe-indicator-next');
      
      if (indicator) {
        indicator.style.opacity = '1';
        indicator.classList.add('swipe-active');
      }
    }
  }
  
})();
