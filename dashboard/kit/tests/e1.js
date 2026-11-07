const {chromium}=require('playwright');const SRV=require('./srvlib');(async()=>{const U='http://mock.local/';const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:900}});p.on('pageerror',e=>errs.push(e.message));await SRV(p);await p.addInitScript(()=>localStorage.setItem('mt-staff-tour-v19b','1'));await p.goto(U);await p.waitForTimeout(2500);
// calendar hover
await p.hover('#mtCal .hcal-day.mk[data-k="2026-11-08"]');await p.waitForTimeout(300);await p.screenshot({path:'e-cal.png',clip:{x:0,y:380,width:520,height:520}});
// reminder: new, in the past -> notif
await p.click('[data-remnew="1"]');await p.waitForTimeout(200);await p.fill('#remForm input[name=t]','להתקשר למענדי על התסריטים');
const t=await p.evaluate(()=>{const d=new Date(Date.now()-60000);return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')});await p.fill('#remForm input[name=h]',t);await p.click('#remForm button[type=submit]');await p.waitForTimeout(800);
console.log('rem items',await p.evaluate(()=>Object.entries(S.items).filter(([k,v])=>v.remindAt).map(([k,v])=>k+':'+v.remindAt).join(',')),'notif',await p.evaluate(()=>document.querySelector('#remNotif')?.innerText.replace(/\n/g,' | ')));
await p.screenshot({path:'e-home.png'});
const rb=await p.locator('#rem22').boundingBox();await p.screenshot({path:'e-rem.png',clip:{x:rb.x-10,y:rb.y-10,width:rb.width+20,height:rb.height+20}});
await p.click('#briefBtn');await p.waitForTimeout(900);console.log('brief modal',await p.evaluate(()=>!document.querySelector('#briefModal').hidden));await p.screenshot({path:'e-brief.png'});await p.keyboard.press('Escape');await p.waitForTimeout(300);
await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await p.waitForTimeout(400);await p.screenshot({path:'e-bottom.png'});
await p.evaluate(()=>window.scrollTo(0,0));await p.click('#setBtn');await p.waitForTimeout(500);await p.screenshot({path:'e-set.png'});
await p.click('[data-setv="kpis|card"]');await p.waitForTimeout(300);console.log('kpis visible now',await p.evaluate(()=>getComputedStyle(document.querySelector('#kpis')).display));
await p.click('[data-setwall="ph-sea"]');await p.waitForTimeout(300);console.log('wall',await p.evaluate(()=>document.documentElement.dataset.wp));
await p.click('[data-setv="meter|gauge"]');console.log('meter',await p.evaluate(()=>document.querySelector('#heroMt').dataset.meter));
await p.click('[data-setcard="plist"]');await p.waitForTimeout(300);console.log('plist hidden',await p.evaluate(()=>document.querySelector('#plist')?.closest('[data-cid]').hidden));
await p.click('[data-setcard="plist"]');await p.waitForTimeout(300);console.log('plist back',await p.evaluate(()=>document.querySelector('#plist')?.closest('[data-cid]').hidden));
await p.keyboard.press('Escape');console.log('errors',errs);await b.close()})();
