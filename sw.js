// on install - the application shell cached
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('swa-cache').then(function(cache){
        //Static files that make up the application shell are cached
        return cache.add('index.html');
      })
    );
  });
  
  //with request network
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      //Try the cache
      caches.match(event.request).then(function(response) {
        //return it if there is a response, or else fetch again
        return response || fetch(event.request);
      })
    );
  });