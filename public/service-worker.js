// Cache version is automatically injected during build by Vite plugin
const CACHE_VERSION = "__SW_VERSION__";
const CACHE_NAME = `boycott-israel-${CACHE_VERSION}`;
const RUNTIME_CACHE = `boycott-israel-runtime-${CACHE_VERSION}`;

// Essential static offline assets
const PRECACHE_ASSETS = [
  "/",
  "/offline.html",
  "/logo.svg",
  "/logo.png",
  "/manifest.json",
];

// Install: Pre-cache core app shell & offline page
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .catch((err) => {
        console.warn("[SW] Precache failed:", err);
      })
  );
});

// Activate: Purge old outdated caches from previous deployments
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME && name !== RUNTIME_CACHE) {
              return caches.delete(name);
            }
            return null;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Listen for message event (UI triggered manual update)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Fetch event with safe strategy segregation
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Never cache non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // 2. Never cache backend API calls (always live network data)
  if (
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("vercel.app") && url.pathname.includes("/api/") ||
    url.hostname !== self.location.hostname &&
      !url.hostname.includes("fonts.googleapis.com") &&
      !url.hostname.includes("fonts.gstatic.com")
  ) {
    return;
  }

  // 3. Navigation requests (HTML pages) -> Network-First
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Fallback to cache for this page
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;

          // Fallback to cached app shell
          const cachedHome = await caches.match("/");
          if (cachedHome) return cachedHome;

          // Fallback to dedicated offline page
          const offlineFallback = await caches.match("/offline.html");
          if (offlineFallback) return offlineFallback;

          return new Response(
            "ইন্টারনেট সংযোগ নেই। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
            {
              status: 503,
              statusText: "Service Unavailable",
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            }
          );
        })
    );
    return;
  }

  // 4. Hashed build assets (/assets/*) -> Cache-First
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 5. Images, fonts & other static assets -> Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      // Return cached immediately if present, otherwise await network
      return cachedResponse || fetchPromise;
    })
  );
});
