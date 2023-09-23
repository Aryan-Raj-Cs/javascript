self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open('aryan-cache').then(function (cache) {
        return cache.addAll([
          'http://127.0.0.1:5500/service-worker/test.js',
          'http://127.0.0.1:5500/service-worker/about.html',
          'https://jsonplaceholder.typicode.com/todos/1',
          'https://jsonplaceholder.typicode.com/todos/2'
        ]);
      }),
    );
    self.skipWaiting()
  });
  self.addEventListener('activate', function (event) {
       console.log("activated")
 });
// cache first straighty
 self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request).then(function (fetchResponse) {
        return caches.open('aryan-cache').then(function (cache) {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});

  // self.addEventListener('fetch', function (event) {
  //   event.respondWith(
  //     caches.open('aryan-cache').then(function (cache) {
  //       console.log("fetching:")
  //       return cache.match(event.request).then(function (response) {
  //         console.log("fetching:",event.request)
  //         console.log("response:",response)
  //         return (
  //           response ||
  //           fetch(event.request)
  //         );
  //       });
  //     }),
  //   );
  // });
