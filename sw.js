// Vector service worker: always ask the server for the newest version when online, fall back to the saved copy offline.
const C='vector-cache-3';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url),same=u.origin===self.location.origin;
  // inbox.json holds entries added by chat: always read it fresh and never keep a copy.
  if(same&&u.pathname.endsWith('/inbox.json')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>new Response('',{status:503})));return}
  e.respondWith(fetch(e.request,same?{cache:'no-cache'}:{}).then(r=>{
      if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{})}
      return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));
});
