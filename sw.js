// set variable for cache
let staticCacheName = 'restaurant-cache-1';

// set variable for caching all the URL and files for service worker
let urlCache = [
  '/skeleton',
  'index.html',
	'restaurant.html',
  'js/main.js',
  'js/restaurant_info.js',
  'js/dbhelper.js',
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

// In "install" event: open cache folder, choose correct cache name for file, add all the URL and files to cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => { //when promise is resolved add all the URL and files to cache
            return cache.addAll(urlCache);
            console.log(cache);

        }).catch(error => { //when promise is rejected console.log error
            console.log(error);
        })
    );
});

// In "activate" event: cache keys, replace old caches with new ones by cheching cache name
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName; //check if cache name is not equal to the new cache name
                }).map(cacheName => {
                    return caches.delete(cacheName); //if not equal - delete the old cache name
                })
            );
        })
    );
});

// In "fetch" event: match event request and return fetch request to page
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
