navigator.serviceWorker && navigator.serviceWorker.register('./js/sw.js').then(function(registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
      console.log('opened');
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/img/ricon.png',
        '/logo.png',
        '/js/main.js',
        '/js/sw.js',
        '/css/style.css',
      ]);
      console.log('Loaded');
    })
  );
});
