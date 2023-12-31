self.addEventListener('install', function (event) {
  // event.installModule('http://127.0.0.1:5500/service-worker/test.js')
    event.waitUntil(
      caches.open('aryan-cache-v38').then(function (cache) {
        return cache.addAll([
          '/service-worker/test.js',
          '/service-worker/about.html',
          '/service-worker/about.js',
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
//  self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       console.log(event.request.url,"return from cached",response)
//       return response 
//       || fetch(event.request).then(function (fetchResponse) {
//         console.log(event.request.url,"not from cach",response)
//         return caches.open('aryan-cache-v27').then(function (cache) {
//           cache.put(event.request, fetchResponse.clone());
//           return fetchResponse;
//         });
//       });
//     })
//   );
// });
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve from cache if available, otherwise fetch from the network
      console.log(event.request.url,"return from cach",cachedResponse)
      if(cachedResponse){
      return cachedResponse 
      }
      else{
        console.log(event.request.url,"calling request")
        return fetch(event.request);
      }
    })
  );
});




// Inside your service worker (service-worker.js)

self.addEventListener('sync', async event => {
  if (event.tag === 'syncTasks') {
    console.log("syncking with background")
    await syncTasksWithServer();
  }
});

async function syncTasksWithServer() {
  const db = await openDatabase();
  const tasks = await getUnsyncedTasks(db);

  // try {
  //   const response = await fetch('https://dummy.restapiexample.com/api/v1/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(tasks),
  //   });

  //   if (response.ok) {
  //     console.log('Tasks synchronized successfully.');
  //     await clearTasks(db);
  //   }
  // } catch (error) {
  //   console.error('Error syncing tasks:', error);
  // }
  try {
    const response = await fetch(' https://jsonplaceholder.typicode.com/todos/1');

    if (response.ok) {
      console.log('Tasks synchronized successfully.');
      await clearTasks(db);
    }
  } catch (error) {
    console.error('Error syncing tasks:', error);
  }

 
}

async function openDatabase() {
  const db = await indexedDB.open('taskDatabase', 2);

  return new Promise((resolve, reject) => {
    db.onerror = event => {
      reject(event.target.error);
    };

    db.onsuccess = event => {
      resolve(event.target.result);
    };

  });
}

async function getUnsyncedTasks(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('tasks', 'readonly');
    const store = transaction.objectStore('tasks');
    const request = store.getAll();

    request.onerror = event => {
      reject(event.target.error);
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };
  });
}

async function clearTasks(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('tasks', 'readwrite');
    const store = transaction.objectStore('tasks');
    const request = store.clear();

    request.onerror = event => {
      reject(event.target.error);
    };

    request.onsuccess = event => {
      resolve();
    };
  });
}

