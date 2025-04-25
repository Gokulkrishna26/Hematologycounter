const CACHE_NAME = "hematology-counter-cache-v1";

const urlsToCache = [
  "hematologycounter.html",
  "wbc_counter.html",
  "retic_counter.html",
  "platelet_counter.html",
  "bone_marrow.html",
  "manifest.json",
  "style.css",  // if you use a separate CSS file
  "images/neutrophil.png",
  "images/lymphocyte.png",
  "images/monocyte.png",
  "images/basophil.png",
  "images/eosinophil.png", 
  "images/blast.png",
  "images/myeloblast.png",
  "images/promyeloblast.png",
  "images/myelocyte.png",
  "images/metamyelocyte.png",
  "images/bandform.png",
  "images/erythroblast.png",
  "images/dyserythroblast.png",
  "images/monoblast.png",
  "images/monocyte.png",
  "images/plasmacell.png",
  "images/megakaryoblast.png",
  "images/megakaryocyte.png",
  "images/others.png",
  "images/platelet.png",
  "images/reticulocyte.png",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching app files");
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});