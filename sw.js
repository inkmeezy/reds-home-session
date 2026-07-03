const CACHE="reds-1192624dd1";
const CORE=["./","./index.html","./manifest.webmanifest",
 "./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png",
 "./icons/apple-touch-180.png","./icons/favicon-64.png"];
const CLIPS=["./clips/01-inside-taps.mp4?v=ea46de86","./clips/02-sole-rolls.mp4?v=b3af6e0a","./clips/03-stepovers.mp4?v=3a5fd6cd","./clips/04-sambas.mp4?v=545908ff","./clips/05-boxes.mp4?v=456638bc","./clips/06-v-taps.mp4?v=821c0712","./clips/07-outside-taps.mp4?v=893e75be","./clips/08-drag-out-in.mp4?v=370b33c1","./clips/09-passes-right.mp4?v=690812fe","./clips/10-passes-left.mp4?v=02614708","./clips/11-insides.mp4?v=b62e1495","./clips/12-outsides.mp4?v=e19bb5ef","./clips/13-inside-pass.mp4?v=608cfc62","./clips/14-outside-pass.mp4?v=7f20b55c","./clips/15-ball-roll-pass.mp4?v=38811ce7","./clips/16-behind-leg-pass.mp4?v=a8c2081d","./clips/17-l-drag-pass.mp4?v=dfad40ab","./bg.mp4","./start-bg.mp4?v=d7680b21"];
self.addEventListener("install",e=>{e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  await c.addAll(CORE);                 // shell must cache
  await Promise.allSettled(CLIPS.map(u=>c.add(u))); // clips best-effort
  self.skipWaiting();
})());});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  self.clients.claim();
})());});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith((async()=>{
    const hit=await caches.match(e.request);
    if(hit)return hit;
    try{
      const resp=await fetch(e.request);
      if(resp&&resp.status===200&&new URL(e.request.url).origin===location.origin){
        const c=await caches.open(CACHE); c.put(e.request,resp.clone());
      }
      return resp;
    }catch(err){
      if(e.request.mode==="navigate")return caches.match("./index.html");
      throw err;
    }
  })());
});