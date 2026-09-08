const CACHE_NAME = 'felipe-ribeiro-v2';
const PRACTICE_ASSETS = [
  '/assets/flagrante.png',
  '/assets/audiencia.png',
  '/assets/habeas-corpus.png',
  '/assets/inquerito.png',
  '/assets/acao-penal.png',
  '/assets/tribunal.png',
  '/assets/logo-felipe-ribeiro-dark.png',
  '/assets/logo-felipe-ribeiro-clean.png',
  '/assets/favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRACTICE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return cached;
      });
    })
  );
});
