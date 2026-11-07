const {chromium}=require('playwright');(async()=>{const [,,file,out,w,h,mode]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(m=>{try{localStorage.setItem('mt-staff-tour-v19b','1');if(m)localStorage.setItem('mt-hero-meter',m)}catch(e){}},mode||'');
await p.goto('file://'+file);await p.waitForTimeout(2600);await p.screenshot({path:out});console.log(out,'errors',errs);await b.close()})();
