/* Offline cache for the signage page.
   Page code: network first, saved copy if the network is down.  Fonts, logo, QR files, libraries: saved copy first.
   Video (range requests), the Sheet and the weather are never cached here: the page keeps its own last-good copies. */
const CACHE = 'wakediv-signage-v1';
const SHELL = ['./', 'index.html', 'config.js', 'logo.png', 'lib/qrcode-generator.js', 'lib/qrcode.js', 'lib/jsQR.js', 'lib/zxing.min.js', 'lib/maker.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if(r.method !== 'GET' || r.headers.has('range')) return;
  if(/docs\.google\.com|open-meteo\.com|youtube|zoom\.us/.test(u.hostname)) return;
  const fonts = /fonts\.(googleapis|gstatic)\.com/.test(u.hostname);
  if(u.origin !== location.origin && !fonts) return;
  const shell = u.origin === location.origin && (r.mode === 'navigate' || /\/(index\.html|config\.js)?$/.test(u.pathname) || u.pathname.endsWith('config.js'));
  if(shell){
    e.respondWith(fetch(r).then(res => { if(res.ok){ const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)); } return res; })
      .catch(() => caches.match(r, { ignoreSearch:true }).then(m => m || caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
    if(res.ok && !/\.(mp4|webm|mov)$/i.test(u.pathname)){ const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)); }
    return res;
  })));
});
