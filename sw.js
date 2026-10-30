const CACHE_NAME = 'belajaro-v2'; // Ubah versi tiap kali update besar

// Saat diinstal, langsung aktifkan tanpa menunggu
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Hapus cache lama yang menumpuk saat ada update baru
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Strategi Network First: Utamakan ambil data terbaru dari internet, fallback ke cache jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
