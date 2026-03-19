const CACHE_NAME = 'nurfizika-v3';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// ─── Install: statik fayllarni keshlash ───────────────────────────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// ─── Activate: eski keshlarni tozalash ────────────────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((k) => k !== CACHE_NAME)
                    .map((k) => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// ─── Fetch: Network first, kesh fallback ─────────────────────────────────────
self.addEventListener('fetch', (event) => {
    // Firebase, Gemini API, va non-GET so'rovlarini o'tkazib yuborish
    if (
        event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('firebase') ||
        event.request.url.includes('generativelanguage') ||
        event.request.url.includes('googleapis.com') ||
        event.request.method !== 'GET'
    ) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Muvaffaqiyatli javobni klon qilib keshlash
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) =>
                        cache.put(event.request, clone)
                    );
                }
                return response;
            })
            .catch(() =>
                // Offline holatida — keshdan olish, yo'q bo'lsa index.html
                caches.match(event.request).then(
                    (cached) => cached || caches.match('/index.html')
                )
            )
    );
});
