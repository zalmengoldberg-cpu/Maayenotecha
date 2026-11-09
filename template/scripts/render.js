// Render every frame of a template HTML to JPGs.
// usage: node scripts/render.js reel_template.html out_frames 25.55 [fps=30] [workers=4]
// Needs a local static server on the template folder:  python3 -m http.server 8765
const { chromium } = require('playwright');
const [,, page, out, dur, fps='30', workers='4'] = process.argv;
const FPS=+fps, N=Math.round(FPS*(+dur)), W=+workers;
require('fs').mkdirSync(out,{recursive:true});
(async () => {
  const b = await chromium.launch();
  await Promise.all([...Array(W).keys()].map(async w=>{
    const p = await b.newPage({ viewport:{width:1080,height:1920} });
    p.on('pageerror', e=>console.log('PAGEERR', e.message));
    await p.goto('http://127.0.0.1:8765/'+page, { waitUntil:'load' });
    await p.evaluate(()=>window.ready); await p.waitForTimeout(1000);
    for (let i=w;i<N;i+=W){
      await p.evaluate(async t=>{ render(t);
        await Promise.all([...document.images].filter(i=>i.src&&!i.complete).map(i=>new Promise(r=>{i.onload=r;i.onerror=r})));
        await Promise.all([...document.images].map(i=>i.decode?i.decode().catch(()=>{}):0)); }, i/FPS);
      await p.screenshot({ path:`${out}/f_${String(i).padStart(4,'0')}.jpg`, type:'jpeg', quality:93 });
    }
  }));
  await b.close(); console.log('frames',N);
})();
