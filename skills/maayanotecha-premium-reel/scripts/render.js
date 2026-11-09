// node scripts/render.js <config.json> <out_frames_dir> [duration=25.25] [workers=4]
// Serves nothing itself: run `python3 -m http.server 8765` inside template/ first.
const { chromium } = require('playwright'); const fs=require('fs');
const [,, cfgPath, out, dur='auto', workers='4'] = process.argv;
const CONFIG = cfgPath && cfgPath!=='-' ? JSON.parse(fs.readFileSync(cfgPath,'utf8')) : {};
const FPS=30, W=+workers; let N=0; fs.mkdirSync(out,{recursive:true});
(async () => {
  const b = await chromium.launch();
  { const p=await b.newPage({viewport:{width:1080,height:1920}}); await p.addInitScript(c=>{window.CONFIG=c},CONFIG);
    await p.goto('http://127.0.0.1:8765/'+((CONFIG.format||'reel')+'.html')); await p.evaluate(()=>window.ready);
    const d = dur==='auto' ? (await p.evaluate(()=>window.DURATION||25.25)) : +dur; N=Math.round(FPS*d); await p.close(); console.log('duration',d); }
  await Promise.all([...Array(W).keys()].map(async w=>{
    const p = await b.newPage({ viewport:{width:1080,height:1920} });
    p.on('pageerror', e=>console.log('PAGEERR', e.message));
    await p.addInitScript(c=>{ window.CONFIG=c; }, CONFIG);
    await p.goto('http://127.0.0.1:8765/'+((CONFIG.format||'reel')+'.html'), { waitUntil:'load' });
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
