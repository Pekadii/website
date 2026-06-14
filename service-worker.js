const CACHE_NAME = "pekadi-public-v1";

const PUBLIC_ASSETS = [
  "/",
  "/index.html",
  "/photography/",
  "/photography/index.html",
  "/about-me/",
  "/about-me/index.html",
  "/My-Gear/",
  "/My-Gear/index.html",
  "/Presets/",
  "/Presets/index.html",
  "/style.css",
  "/ba-gallery.js",
  "/assets/ico/apple-touch-icon.png?v=4",
  "/assets/ico/favicon-32.png?v=4",
  "/assets/pwa/icon-192.png",
  "/assets/pwa/icon-512.png",
  "/assets/pwa/maskable-512.png",
  "/assets/png/Signature.png",
  "/assets/png/instagram.png",
  "/optimized/portfolio/Fall-River-hero.jpg",
  "/optimized/portfolio/Landscape-cover.jpg",
  "/optimized/portfolio/Nathan-1-cover.jpg",
  "/optimized/portfolio/Train-3-cover.jpg",
  "/optimized/portfolio/Boston-1-cover.jpg",
  "/optimized/portfolio/Von-3-cover.jpg",
  "/optimized/about-me.jpg",
  "/offline.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PUBLIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith("/client-galleries/") || url.pathname.startsWith("/download-gate/")) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
