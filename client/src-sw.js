const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//caching and routing files for webpack build
precacheAndRoute(self.__WB_MANIFEST);

//servers cached responses to reqs or fetches from network
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    //handles cacheable responses
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    //sets expiration
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

//alternative to precaching for specific routes
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

//nav reqs
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

registerRoute(
    // filters requests to cache
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new offlineFallback({
      // cache storage
      cacheName: 'asset-cache',
      plugins: [
        // caches responses to headers for up to 30 days
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
);
