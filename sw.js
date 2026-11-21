const CACHE = 'wxcalc-v0.15.8-5';
const ASSETS = [
  './', './index.html',
  './icon-180.png', './icon-192.png', './icon-512.png', './icon-1024.png',
  './splash-1170x2532.png', './splash-1284x2778.png', './splash-1125x2436.png',
  './assets/bg_clean.jpg',
  './assets/seg_vortex.webp', './assets/seg_boss.webp',
  './assets/seg_tablets.webp', './assets/seg_warrior.webp',
  './assets/logo_wxsj.webp', './assets/logo_13.webp', './assets/logo_sszj.webp',
  './assets/kpi1.webp', './assets/kpi2.webp', './assets/kpi3.webp',
  './assets/kpi4.webp', './assets/kpi5.webp', './assets/kpi6.webp',
  './assets/frame_stone.webp', './assets/runner.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isDoc = e.request.mode === 'navigate' ||
                (e.request.headers.get('accept') || '').includes('text/html');
  if (isDoc) {
    // HTML 走网络优先：保证更新能立刻拿到，离线再回退缓存
    e.respondWith(
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  // 静态资源走缓存优先
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return resp;
    }))
  );
});
