navigator.serviceWorker && navigator.serviceWorker.register('/js/sw.js').then(function(registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

// self.addEventListener('install', function(e) {
//   e.waitUntil(
//     caches.open('the-magic-cache').then(function(cache) {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/manifest.json',
//         '/img/ricon.png',
//         '/logo.png',
//         '/js1/main.js',
//         '/js1/sw.js',
//         '/css/style.css'
//       ]);
//     })
//   );
// });

let deferredPrompt;
