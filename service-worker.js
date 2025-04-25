const CACHE_NAME = "hematology-counter-cache-v2";

const urlsToCache = [
  "/index.html",
  "/wbc_counter.html",
  "/retic_counter.html",
  "/platelet_counter.html",
  "/bone_marrow.html",
  "/manifest.json",
  "/offline.html",  // Optional offline fallback
  "/style.css",     // If you're using an external CSS
  "/images/neutrophil.png",
  "/images/lymphocyte.png",
  "/images/monocyte.png",
  "/images/basophil.png",
  "/images/eosinophil.png",
  "/images/blast.png",
  "/images/myeloblast.png",
  "/images/promyeloblast.png",
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

// Install event: cache everything
self.addEventListener("install", event => {
  self.skipWaiting();  // Activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event: clean old caches
self.addEventListener("activate", event => {
  clients.claim();  // Take control of pages immediately
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event: serve from cache or fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match("/offline.html"))  // Optional fallback
  );
});
