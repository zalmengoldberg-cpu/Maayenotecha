const { chromium } = require('playwright');
const fs=require('fs');
const [,,mode,arg]=process.argv;
(async()=>{
 const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:1920,height:1080}});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+__dirname+'/comp.html');
 await p.waitForFunction(()=>window.READY);
 await p.waitForTimeout(300);
 if(mode==='test'){for(const t of arg.split(',')){await p.evaluate(t=>seek(+t),t);await p.screenshot({path:`test_${t}.png`});}}
 else{fs.mkdirSync('frames',{recursive:true});const fps=30,dur=await p.evaluate(()=>DUR);const n=Math.round(dur*fps);
  for(let i=0;i<n;i++){await p.evaluate(t=>seek(t),i/fps);await p.screenshot({path:`frames/${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:93});if(i%60==0)console.log(i,'/',n);}}
 await b.close();
})();
