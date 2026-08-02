/* Service Worker der Entwicklungsschnecke
   Zweck: Die App muss auch ohne Netz funktionieren – im Wald gibt es oft keinen Empfang.

   Strategie:
   - Seitenaufrufe (navigate): erst Netz, sonst Cache. Online bekommt man so immer die
     aktuelle Fassung, offline die zuletzt gespeicherte.
   - Übrige Dateien (Icons, Manifest): erst Cache, sonst Netz. Die ändern sich selten.

   Bei jeder Änderung an der App CACHE_VERSION hochzählen, damit alte Stände
   zuverlässig ersetzt werden. */

const CACHE_VERSION = "v1";
const CACHE_NAME = `entwicklungsschnecke-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Einzeln ablegen: fehlt eine Datei, soll trotzdem der Rest gecacht werden
      .then(cache => Promise.allSettled(APP_SHELL.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(namen => Promise.all(
        namen.filter(n => n.startsWith("entwicklungsschnecke-") && n !== CACHE_NAME)
             .map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if(req.method !== "GET") return;

  // Seitenaufruf: Netz bevorzugen, damit Aktualisierungen ankommen
  if(req.mode === "navigate"){
    event.respondWith(
      fetch(req)
        .then(res => {
          const kopie = res.clone();
          caches.open(CACHE_NAME).then(c => c.put("./index.html", kopie));
          return res;
        })
        .catch(() => caches.match("./index.html")
          .then(t => t || caches.match("./"))
          .then(t => t || new Response(
            "<!doctype html><meta charset=utf-8><p>Die App ist offline noch nicht verfügbar. Bitte einmal mit Internetverbindung öffnen.",
            {status:503, headers:{"Content-Type":"text/html; charset=utf-8"}}
          )))
    );
    return;
  }

  // Alles andere: Cache bevorzugen
  event.respondWith(
    caches.match(req).then(treffer => {
      if(treffer) return treffer;
      return fetch(req).then(res => {
        if(res && res.status === 200 && res.type === "basic"){
          const kopie = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, kopie));
        }
        return res;
      }).catch(() =>
        // Weder Cache noch Netz: eine echte Antwort liefern, sonst wirft respondWith
        new Response("", {status:504, statusText:"Offline und nicht im Zwischenspeicher"})
      );
    })
  );
});
