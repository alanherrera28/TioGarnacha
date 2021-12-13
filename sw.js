;
//Nombre y Versión de Cache
const CACHE_NAME = 'v1_cache_tio_garnacha'

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(
                    [
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
                )
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

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

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recupera del cache
                return res
            }
            //recupera la petición a la url
            return fetch(e.request)
        })
    )
})