// EyeLink service worker: lets the site open and work offline after one successful visit.
const VERSION = "eyelink-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];
const CDN_HOSTS = ["cdn.jsdelivr.net", "unpkg.com", "storage.googleapis.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && !CDN_HOSTS.includes(url.hostname)) return;

  if (same) {
    // Your own files: try the network first so updates show up, fall back to the saved copy offline.
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
  } else {
    // Big versioned files (tracking library, model, fonts): use the saved copy first.
    e.respondWith(
      caches.match(req).then(hit =>
        hit || fetch(req).then(res => {
          if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
          return res;
        })
      )
    );
  }
});
