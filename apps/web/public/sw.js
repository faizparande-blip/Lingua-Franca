/**
 * Lingua Franca Service Worker
 *
 * Caching & Update Strategy:
 * 1. Build-time version injection: Every Vercel deployment replaces '__SW_VERSION__'
 *    with a unique build timestamp, guaranteeing browser update discovery.
 * 2. Navigation requests: Network-First (cache: 'no-cache') with offline fallback to /index.html.
 * 3. Hashed assets (/assets/*): Cache-First with runtime caching.
 * 4. Manifest & static images: Stale-While-Revalidate with background revalidation.
 * 5. Activation: Purges all previous cache versions automatically and claims clients.
 */

// Build-time injected version placeholder (falls back safely during local dev)
const INJECTED_VERSION = '__SW_VERSION__';
const CACHE_VERSION = (INJECTED_VERSION && !INJECTED_VERSION.startsWith('__'))
  ? INJECTED_VERSION
  : 'lf-dev';

const STATIC_CACHE = `lf-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `lf-dynamic-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-192x192.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png'
];

// Install: precache the core application shell and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .catch((err) => {
        console.warn('[SW] Precache asset installation notice:', err);
      })
  );
});

// Activate: purge any caches from prior deployments and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
            .map((key) => {
              console.log('[SW] Purging outdated deployment cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Message handler for manual skipWaiting triggers
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch event listener with tailored strategies per asset category
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // 1. Only intercept GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 2. Bypass external APIs (Supabase, Google Fonts, third-party CDNs)
  if (url.origin !== self.location.origin) {
    return;
  }

  // 3. Never cache the service worker script itself
  if (url.pathname === '/sw.js') {
    event.respondWith(fetch(request, { cache: 'no-store' }));
    return;
  }

  // 4. HTML Navigation requests: Strict Network-First
  // Always query Vercel for the live deployed page; fallback to offline cache if disconnected
  const isNavigation = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
  if (isNavigation) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;

          const cachedIndex = await caches.match('/index.html');
          if (cachedIndex) return cachedIndex;

          const cachedRoot = await caches.match('/');
          if (cachedRoot) return cachedRoot;

          return new Response('Offline: Content is unavailable without an internet connection.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // 5. Hashed production assets (/assets/.*)
  // Vite assets are content-hashed. They are immutable: filename changes when content changes.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 6. Other same-origin static assets (/manifest.json, /favicon.svg, icons)
  // Stale-While-Revalidate: serve cached version immediately, revalidate in background
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Push notification support (preserved)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Lingua Franca', body: 'New update available!' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow('/'));
});
