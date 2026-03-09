// Increment CACHE_NAME (e.g., toolhub-v2) when updating cached assets
const CACHE_NAME = "toolhub-v1";

const STATIC_ASSETS = [
  "/",
  "/compress-image",
  "/resize-image",
  "/image-to-jpg",
  "/image-to-png",
  "/image-to-webp",
  "/image-to-pdf",
  "/image-to-base64",
  "/image-to-text",
  "/image-to-qr",
  "/image-to-gif",
  "/image-to-bmp",
  "/image-to-svg",
  "/image-to-ascii",
  "/image-to-grayscale",
  "/image-to-html",
  "/image-to-zip",
  "/image-to-color-palette",
  "/image-to-favicon",
  "/image-to-icon",
  "/image-to-pixel-art",
  "/logo-192.png",
  "/logo-256.png",
  "/logo-512.png",
  "/logo.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests for same-origin or navigation requests
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Return cached and refresh in background (stale-while-revalidate)
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, response.clone()));
            }
          })
          .catch(() => {});
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseClone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          // Offline fallback: serve root for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline", { status: 503 });
        });
    })
  );
});
