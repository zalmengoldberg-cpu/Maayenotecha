const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('mt-staff-tour-v19b','1')}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(2000);
const drag=async(a,b2)=>{const A=await p.locator(a).first().boundingBox(),B=await p.locator(b2).first().boundingBox();await p.mouse.move(A.x+A.width/2,A.y+A.height/2);await p.mouse.down();await p.mouse.move(A.x+A.width/2+10,A.y+A.height/2+10,{steps:3});await p.mouse.move(B.x+B.width/2,B.y+40,{steps:12});await p.mouse.up();await p.waitForTimeout(400)};
// home: views hidden?
await p.goto('file://'+process.argv[2]+'#calendar');await p.waitForTimeout(800);console.log('today visible on calendar?',await p.evaluate(()=>getComputedStyle(document.querySelector('#v-today')).display));
await p.click('#cal .d[data-sel="2026-11-18"] .top');await p.waitForTimeout(400);console.log('cal add modal',await p.evaluate(()=>{const m=[...document.querySelectorAll('.modal')].find(x=>getComputedStyle(x).display!=='none'&&!x.hidden);return m?m.innerText.slice(0,40).replace(/\n/g,' '):'none'}));
await p.keyboard.press('Escape');await p.waitForTimeout(200);
await p.goto('file://'+process.argv[2]+'#board');await p.waitForTimeout(900);
const id=await p.locator('#kanban .col[data-col="doing"] .kc').first().getAttribute('data-open');
await drag(`#kanban .kc[data-open="${id}"]`,'#kanban .col[data-col="review"]');
console.log('kanban',id,await p.evaluate(id=>JSON.stringify({s:S.items[id].status,w:S.items[id].waitingOn}),id),'col now',await p.evaluate(id=>document.querySelector(`#kanban .kc[data-open="${id}"]`)?.closest('.col').dataset.col,id),'drawer open?',await p.evaluate(()=>document.querySelector('#drawer').classList.contains('on')));
await p.goto('file://'+process.argv[2]+'#tasks');await p.waitForTimeout(900);
const r=await p.locator('#laneMe .trow').first();const key=await r.evaluate(el=>{const s=el.querySelector('[data-step]');return s?s.dataset.step+':'+s.dataset.i:el.querySelector('[data-done]').dataset.done});
await drag('#laneMe .trow','#laneBg');console.log('lane bg',key,await p.evaluate(k=>{const[id,i]=k.split(':');const it=S.items[id];return i!=null?JSON.stringify(it.steps[i]):String(it.claudeCan)},key));
await drag('#laneMe .trow','#laneWait');await p.waitForTimeout(300);console.log('picker',await p.evaluate(()=>document.querySelector('#whoDrop')?.innerText.replace(/\n/g,' ')));
await p.click('#whoDrop [data-who="mendy"]');await p.waitForTimeout(300);console.log('wait lane count',await p.locator('#laneWait .trow').count());
console.log('errors',errs);await b.close()})();
