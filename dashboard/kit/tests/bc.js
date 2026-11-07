const {chromium}=require('playwright');const SRV=require('./srvlib');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));await SRV(p);
await p.addInitScript(()=>{localStorage.setItem('mt-staff-tour-v19b','1');localStorage.setItem('mt-brief-open','1')});await p.goto('http://mock.local/');await p.waitForTimeout(2600);
await p.click('.bcard.bc-gold .bc-row[data-res="0"]');await p.waitForTimeout(500);console.log('resolve',await p.evaluate(()=>!!document.querySelector('#drawer.on .rs-h')));await p.keyboard.press('Escape');await p.waitForTimeout(300);
await p.click('.bcard.bc-royal .bc-st[data-list="status:doing"]');await p.waitForTimeout(400);console.log('list',await p.evaluate(()=>{const m=[...document.querySelectorAll('.modal')].find(x=>getComputedStyle(x).display!=='none');return m?m.innerText.slice(0,40):'none'}));
console.log(errs);await b.close()})();
