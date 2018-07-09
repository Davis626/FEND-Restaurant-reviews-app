// set variable for cache
let cacheID = 'restaurant-cache-1';

// Caching all the URL and files for service worker
let urlToCache = [
    '/',
    './restaurant.html',
    './index.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
];

// if event listener is in "install" event, open cache folder and choose correct cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheID).then(cache => {
            return cache.addAll(urlToCache);
            console.log(cache);

        }).catch(error => {
            console.log(error);
        })
    );
});

// if event listener is in "activate" event, cache keys and add promise for cache names (replace old caches with new ones)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != cacheID;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
