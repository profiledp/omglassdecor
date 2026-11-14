const CACHE_NAME = 'om-glass-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/products.html',
  '/gallery.html',
  '/about.html',
  '/contact.html',
  '/price-list.html',
  '/policy.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => 
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
});