const CACHE_NAME = "hematology-counter-cache-v3";

const urlsToCache = [
  "/index.html",
  "/wbc_counter.html",
  "/retic_counter.html",
  "/platelet_counter.html",
  "/bone_marrow.html",
  "/manifest.json",
  "/offline.html",
  "/style.css",
  "/app.js",
  "/images/neutrophil.png",
  "/images/lymphocyte.png",
  "/images/monocyte.png",
  "/images/basophil.png",
  "/images/eosinophil.png",
  "/images/blast.png",
  "/images/myeloblast.png",
  "/images/promyelocyte.png",
  "/images/myelocyte.png",
  "/images/metamyelocyte.png",
  "/images/bandform.png",
  "/images/erythroblast.png",
  "/images/dyserythroblast.png",
  "/images/monoblast.png",
  "/images/plasmacell.png",
  "/images/megakaryoblast.png",
  "/images/megakaryocyte.png",
  "/images/others.png",
  "/images/platelet.png",
  "/images/reticulocyte.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install event
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[Service Worker] Caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event
self.addEventListener("activate", event => {
  clients.claim();
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch event
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Only fallback to offline.html for page navigations
        if (event.request.mode === 'navigate') {
          return caches.match("/offline.html");
        }
      });
    })
  );
});
