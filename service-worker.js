// // use a cacheName for cache versioning
var MyCacheName = 'v1:static';

// during the install phase you usually want to cache static assets
self.addEventListener('install', function (e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(MyCacheName).then(function (cache) {
            return cache.addAll([
                './',
                './css/fireworks.css',
                './index.html',
                './js/application.js'
            ]).then(function () {
                self.skipWaiting();
            });
        })
    );
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith('v1:static')))
                    .filter(cacheName => (cacheName !== MyCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// when the browser fetches a url
self.addEventListener('fetch', function (event) {
    // either respond with the cached object or go ahead and fetch the actual url
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});