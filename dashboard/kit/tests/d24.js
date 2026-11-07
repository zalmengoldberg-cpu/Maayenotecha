const {chromium}=require('playwright');const SRV=require('./srvlib');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:900}});p.on('pageerror',e=>errs.push(e.message));await SRV(p);
await p.addInitScript(()=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.setItem('mt-staff-tour-v19b','1');localStorage.setItem('mt-open','side');localStorage.setItem('mt-bg2-light','mt-dawn')}});
await p.goto('http://mock.local/');await p.waitForTimeout(2600);
console.log('wall',await p.evaluate(()=>document.documentElement.dataset.wp),'center',await p.evaluate(()=>document.documentElement.classList.contains('open-center')));
await p.screenshot({path:'d1.png'});
await p.click('#plist .pr b');await p.waitForTimeout(600);await p.screenshot({path:'d2.png'});await p.keyboard.press('Escape');await p.waitForTimeout(300);
await p.click('#sbAgenda');await p.waitForTimeout(700);console.log('agenda open',await p.evaluate(()=>!document.querySelector('#agendaPage').hidden),await p.evaluate(()=>document.querySelector('#sbAgenda').getAttribute('aria-current')));
await p.keyboard.press('Escape');await p.waitForTimeout(400);console.log('after close current',await p.evaluate(()=>document.querySelector('#app .sb-nav [aria-current]')?.textContent.trim()));
// user changes choice later should persist (migration only once)
await p.evaluate(()=>MT_WALLDATA.apply('ph-sea'));await p.reload();await p.waitForTimeout(2200);console.log('after reload wall',await p.evaluate(()=>document.documentElement.dataset.wp));
console.log(errs);await b.close()})();
