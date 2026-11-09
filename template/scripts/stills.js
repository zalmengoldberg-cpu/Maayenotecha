// Preview single frames: node scripts/stills.js reel_template.html out_dir 1.0 4.6 9.2 ...
const { chromium } = require('playwright');
const [,, page, out, ...ts] = process.argv;
require('fs').mkdirSync(out,{recursive:true});
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport:{width:1080,height:1920} });
  p.on('pageerror', e=>console.log('PAGEERR', e.message));
  await p.goto('http://127.0.0.1:8765/'+page,{waitUntil:'load'}); await p.evaluate(()=>window.ready); await p.waitForTimeout(800);
  for (const t of ts.map(Number)) { await p.evaluate(async t=>{ render(t); await Promise.all([...document.images].filter(i=>i.src&&!i.complete).map(i=>new Promise(r=>{i.onload=r;i.onerror=r}))); }, t);
    await p.screenshot({ path:`${out}/s_${t.toFixed(2)}.jpg`, type:'jpeg', quality:85 }); }
  await b.close();
})();
