;
//Nombre y Versión de Cache
const CACHE_STATIC_NAME = 'cache_tio_garnacha_v1';
const CACHE_DYNAMIC_NAME = "cache_tio_garnacha_dinamyc_v1";
var cacheFiles = [
    './',
    './vendor/fontawesome-free/css/all.min.css',
    'https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700',
    'https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic',
    'vendor/magnific-popup/magnific-popup.css',
    './css/creative.css',
    './css/creative.min.css',
    './vendor/jquery/jquery.min.js',
    './vendor/bootstrap/js/bootstrap.bundle.min.js',
    './vendor/jquery-easing/jquery.easing.min.js',
    './vendor/magnific-popup/jquery.magnific-popup.min.js',
    './js/creative.js',
    './js/funciones_buttons.js',
    'https://kit.fontawesome.com/801633f78a.js',
    './js/startSW.js',
    './img/TioGarna.png',
    './img/bg-masthead.jpg',
    './img/icons/icon512.png'
]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    console.log('[SW] Installed');
    e.waitUntil(
        caches.open(CACHE_STATIC_NAME).then(cache => {
            console.log('[SW] Caching cacheFiles');
            return cache.addAll(cacheFiles)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_STATIC_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            cacheNames.map(cacheName => {
                //Eliminamos lo que ya no se necesita en cache
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            })
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//Stale while revalidate
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((cacheResponse) => {
            if (cacheResponse) {
                fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_STATIC_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                });
                return cacheResponse;
            } else {
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_STATIC_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                });
            }
        })
    );
})