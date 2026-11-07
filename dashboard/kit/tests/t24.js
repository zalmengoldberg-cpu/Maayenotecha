const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('mt-staff-tour-v19b','1')}catch(e){}});
await p.goto('file://'+process.argv[2]+'#calendar');await p.waitForTimeout(1800);
const ev=p.locator('#cal .evx[data-drag]').first();const info=await ev.evaluate(e=>({id:e.dataset.id,from:e.dataset.from,k:e.dataset.drag}));const A=await ev.boundingBox();const B=await p.locator('#cal .d[data-drop="2026-11-19"]').boundingBox();
await p.mouse.move(A.x+5,A.y+5);await p.mouse.down();await p.mouse.move(A.x+15,A.y+15,{steps:3});await p.mouse.move(B.x+30,B.y+30,{steps:10});await p.mouse.up();await p.waitForTimeout(400);
console.log(info,await p.evaluate(i=>{const it=S.items[i.id];return JSON.stringify({due:it.due,pub:it.publishAt,start:it.start,steps:(it.steps||[]).map(s=>s.due)})},info));
await p.goto('file://'+process.argv[2]+'#board');await p.waitForTimeout(900);await p.locator('#kanban .kc').first().click();await p.waitForTimeout(400);console.log('click opens',await p.evaluate(()=>document.querySelector('#drawer').classList.contains('on')));
console.log(errs);await b.close()})();
