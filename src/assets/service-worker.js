const cacheVersion = 1;
const currentCache = {
    offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(currentCache.offline)
            .then(cache => cache.addAll([offlineUrl]))
    );
});

this.addEventListener('fetch', event => {
    if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            // Return the offline page if the page 404s
            fetch(event.request.url).catch(error => {
                return caches.match(offlineUrl);
            })
        );
    } else {
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});