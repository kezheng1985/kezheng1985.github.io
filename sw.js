const prefix = 'changsha-workbook-'
const cacheName = prefix + 'v2'
const core = ['./', './index.html', './app.js', './style.css', './hero.jpg', './app.webmanifest', './banks/index.json', './banks/2026-11.js']
self.addEventListener('install',event => event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(core))))
self.addEventListener('activate',event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith(prefix) && key !== cacheName).map(key => caches.delete(key))))
    .then(() => self.clients.claim()))
})
self.addEventListener('fetch',event => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET' || url.origin !== location.origin || !url.href.startsWith(self.registration.scope)) return
  event.respondWith((async () => {
    const cache = await caches.open(cacheName)
    try {
      const response = await fetch(event.request)
      if (response.ok) await cache.put(event.request,response.clone())
      return response
    } catch {
      return await cache.match(event.request)
        ?? (event.request.mode === 'navigate' ? await cache.match('./') : undefined)
        ?? new Response('暂时离线', {status:503})
    }
  })())
})
