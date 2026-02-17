/* ============================================
   SERVICE WORKER - 87/OCHOSITETE PWA
   Estrategia: Network First with Cache Fallback
   ============================================ */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `87-ochositete-${CACHE_VERSION}`;

// Recursos esenciales para cache inicial
const ESSENTIAL_RESOURCES = [
  '/',
  '/css/main.css',
  '/js/mobile-menu.js',
  '/js/swipe-navigation.js',
  '/favicon.svg',
  '/offline.html' // Página offline personalizada
];

// Recursos a cachear con estrategia diferente
const STATIC_RESOURCES = [
  '/images/',
  '/fonts/'
];

/* ============================================
   INSTALACIÓN DEL SERVICE WORKER
   ============================================ */
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando recursos esenciales');
        return cache.addAll(ESSENTIAL_RESOURCES.map(url => new Request(url, {cache: 'reload'})));
      })
      .then(() => {
        console.log('[SW] Instalación completa');
        return self.skipWaiting(); // Activar inmediatamente
      })
      .catch((error) => {
        console.error('[SW] Error en instalación:', error);
      })
  );
});

/* ============================================
   ACTIVACIÓN DEL SERVICE WORKER
   ============================================ */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Eliminar caches antiguos
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('87-ochositete-') && name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Eliminando cache antiguo:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activación completa');
        return self.clients.claim(); // Tomar control de todas las páginas
      })
  );
});

/* ============================================
   INTERCEPTAR REQUESTS (FETCH)
   ============================================ */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo cachear requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }
  
  // Estrategia según tipo de recurso
  if (request.method === 'GET') {
    // HTML: Network First, Cache Fallback
    if (request.headers.get('accept').includes('text/html')) {
      event.respondWith(networkFirstStrategy(request));
    }
    // CSS/JS: Cache First, Network Fallback
    else if (request.url.match(/\.(css|js)$/)) {
      event.respondWith(cacheFirstStrategy(request));
    }
    // Imágenes: Cache First, Network Fallback
    else if (request.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      event.respondWith(cacheFirstStrategy(request));
    }
    // Otros: Network First
    else {
      event.respondWith(networkFirstStrategy(request));
    }
  }
});

/* ============================================
   ESTRATEGIAS DE CACHING
   ============================================ */

// Network First: Intenta red primero, cache como fallback
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Si la respuesta es válida, cachearla
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, serving from cache:', request.url);
    
    // Intentar servir desde cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si es HTML y no hay cache, mostrar página offline
    if (request.headers.get('accept').includes('text/html')) {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    // Última opción: respuesta de error
    return new Response('Recurso no disponible offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

// Cache First: Busca en cache primero, red como fallback
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Serving from cache:', request.url);
    
    // Actualizar cache en background (stale-while-revalidate)
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse);
          });
        }
      })
      .catch(() => {
        // Error de red, ignorar
      });
    
    return cachedResponse;
  }
  
  // No está en cache, obtener de la red
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Fetch failed for:', request.url, error);
    
    // Retornar error
    return new Response('Recurso no disponible', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/* ============================================
   MENSAJES DEL SERVICE WORKER
   ============================================ */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Limpiar cache manualmente
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
  
  // Obtener información del cache
  if (event.data && event.data.type === 'CACHE_INFO') {
    caches.open(CACHE_NAME).then((cache) => {
      cache.keys().then((keys) => {
        event.ports[0].postMessage({
          cacheSize: keys.length,
          cacheName: CACHE_NAME
        });
      });
    });
  }
});

/* ============================================
   SYNC BACKGROUND (para futuras features)
   ============================================ */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-articles') {
    event.waitUntil(syncArticles());
  }
});

async function syncArticles() {
  // Placeholder para sincronización de artículos
  console.log('[SW] Background sync triggered');
}

/* ============================================
   NOTIFICACIONES PUSH (para futuras features)
   ============================================ */
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nuevo contenido disponible',
    icon: '/images/pwa/icon-192x192.png',
    badge: '/images/pwa/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver ahora',
        icon: '/images/pwa/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/images/pwa/icon-72x72.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('87 • OchoSiete', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[SW] Service Worker cargado correctamente');
