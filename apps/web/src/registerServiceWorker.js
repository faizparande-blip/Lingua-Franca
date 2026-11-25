/**
 * Production Service Worker Registration & Automatic Update Manager
 *
 * Responsibilities:
 * 1. Safe registration of /sw.js on window load.
 * 2. Background update polling (every 15 minutes).
 * 3. Immediate update check when the window/tab is focused or becomes visible.
 * 4. controllerchange event handling with first-visit guard:
 *    - On cold first-time visit: no reload.
 *    - On returning visit when a new deployment activates: single clean reload.
 * 5. vite:preloadError listener: automatically reloads if an outdated chunk 404s after a new deployment.
 */
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Track if an active controller existed when the page loaded.
  // If not, this is the very first install; do NOT reload.
  let hasActiveController = Boolean(navigator.serviceWorker.controller);
  let isRefreshing = false;

  // Safe reload trigger: avoids interrupting user input or active form submissions
  const triggerSafeReload = () => {
    if (isRefreshing) return;

    // Check if user is actively typing in an input or if a form is submitting
    const activeEl = document.activeElement;
    const isInputActive = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT');
    const isFormSubmitting = Boolean(document.querySelector('form button[disabled], form [aria-busy="true"]'));

    if (isInputActive || isFormSubmitting) {
      console.log('[PWA] New deployment active, but deferring reload while user is interacting with form.');
      // Defer reload until user switches tab or navigates away
      const onHidden = () => {
        if (document.visibilityState === 'hidden' && !isRefreshing) {
          isRefreshing = true;
          window.location.reload();
        }
      };
      document.addEventListener('visibilitychange', onHidden, { once: true });
      return;
    }

    isRefreshing = true;
    console.log('[PWA] New deployment active. Reloading application to serve latest version...');
    window.location.reload();
  };

  // When a new service worker activates and claims clients, trigger a safe reload to load fresh bundles
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hasActiveController) {
      hasActiveController = true;
      return;
    }
    triggerSafeReload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // 1. Periodic background update check (every 15 minutes)
        setInterval(() => {
          registration.update().catch(() => {});
        }, 15 * 60 * 1000);

        // 2. Immediate check whenever user switches back to the tab/window
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update().catch(() => {});
          }
        });
        window.addEventListener('focus', () => {
          registration.update().catch(() => {});
        });

        // 3. If a worker is already waiting, tell it to take over
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        // 4. Listen for newly discovered workers during this session
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          }
        });
      })
      .catch((err) => {
        console.warn('[SW Registration Error]', err);
      });
  });

  // Handle Vite dynamic import chunk failures when older deployment chunks are replaced
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    console.log('[PWA] Chunk preload error detected; reloading to sync with latest deployment...');
    window.location.reload();
  });
}
