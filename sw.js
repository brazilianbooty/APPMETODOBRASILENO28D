const CACHE = 'gluteo28-entregavel-86392a07ef5b';
const BASE = ["/APPMETODOBRASILENO28D/", "/APPMETODOBRASILENO28D/manifest.webmanifest", "/APPMETODOBRASILENO28D/app.js", "/APPMETODOBRASILENO28D/image-data.js", "/APPMETODOBRASILENO28D/app.css"];
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      let assets = BASE;
      try {
        const response = await fetch("/APPMETODOBRASILENO28D/offline-assets.json", {
          cache: "no-store",
        });
        if (response.ok) {
          const manifest = await response.json();
          if (
            Array.isArray(manifest.assets) &&
            manifest.assets.every(
              p =>
                typeof p === "string" &&
                p.startsWith("/APPMETODOBRASILENO28D/") &&
                !p.startsWith("//")
            )
          )
            assets = manifest.assets;
        }
      } catch {
        /* Development uses BASE; the production build supplies the asset list. */
      }
      const cache = await caches.open(CACHE);
      await cache.addAll(assets);
      await self.skipWaiting();
    })()
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(k => k.startsWith("gluteo28-entregavel-") && k !== CACHE)
            .map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/__") ||
    url.pathname.startsWith("/src/") ||
    url.pathname.startsWith("/node_modules/") ||
    url.pathname.includes("@vite") ||
    url.pathname.includes("@react")
  )
    return;
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            event.waitUntil(
              caches.open(CACHE).then(cache => cache.put(event.request, copy))
            );
          }
          return response;
        })
        .catch(() =>
          caches.match("/APPMETODOBRASILENO28D/").then(response => response || Response.error())
        )
    );
    return;
  }
  if (
    url.pathname.startsWith("/APPMETODOBRASILENO28D/") ||
    url.pathname.startsWith("/assets/") ||
    /\.(png|svg|webmanifest)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(event.request).then(
        cached =>
          cached ||
          fetch(event.request).then(response => {
            if (response.ok && response.type === "basic") {
              const copy = response.clone();
              event.waitUntil(
                caches.open(CACHE).then(cache => cache.put(event.request, copy))
              );
            }
            return response;
          })
      )
    );
  }
});
