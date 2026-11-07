const {chromium}=require('playwright');(async()=>{const U='http://mock.local/';const SRV=require('./srvlib');const b=await chromium.launch();const errs=[];
const pg=async(w,h,wall)=>{const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});p.on('pageerror',e=>errs.push(e.message));await SRV(p);await p.addInitScript(x=>{try{localStorage.setItem('mt-staff-tour-v19b','1');if(x){localStorage.setItem('mt-bg2-light',x);localStorage.setItem('mt-bg2-dark',x)}}catch(e){}},wall);await p.goto(U);await p.waitForTimeout(2400);return p};
let p=await pg(1440,900,'');await p.click('[data-agenda]');await p.waitForTimeout(800);await p.screenshot({path:'x1-day.png'});
await p.click('[data-agtab="week"]');await p.waitForTimeout(500);await p.screenshot({path:'x2-week.png'});
// drag in week view
const card=p.locator('#agendaPage .agx-col[data-agday] .agx-card[data-agmove]').first();const spec=await card.getAttribute('data-agmove');const A=await card.boundingBox();const tgt=p.locator('#agendaPage .agx-col').nth(5);const B=await tgt.boundingBox();
await p.mouse.move(A.x+A.width/2,A.y+A.height/2);await p.mouse.down();await p.mouse.move(A.x+A.width/2-10,A.y+20,{steps:3});await p.mouse.move(B.x+B.width/2,B.y+80,{steps:12});await p.mouse.up();await p.waitForTimeout(400);
console.log('moved',spec,'->',await tgt.getAttribute('data-agday'),await p.evaluate(s=>{const[id,t,si]=s.split('|');const it=S.items[id];return t==='step'?it.steps[si].due:t==='pub'?it.publishAt:it.due},spec));
await p.click('[data-agtab="day"]');await p.waitForTimeout(300);
const n0=await p.locator('#agendaPage .agx-list .agx-card').count();await p.locator('[data-agplan]').first().click();await p.waitForTimeout(400);console.log('plan: list',n0,'->',await p.locator('#agendaPage .agx-list .agx-card').count());
await p.locator('#agendaPage .agx-list .agx-t[data-open]').first().click();await p.waitForTimeout(500);console.log('drawer over agenda',await p.evaluate(()=>{const d=document.querySelector('#drawer');return d.classList.contains('on')&&getComputedStyle(d).zIndex}));await p.close();
p=await pg(1440,900,'ph-galilee');await p.screenshot({path:'x3-home-galilee.png'});await p.click('[data-agenda]');await p.waitForTimeout(800);await p.screenshot({path:'x4-day-galilee.png'});await p.close();
p=await pg(1440,900,'ph-bloom');await p.goto(U+'#people');await p.waitForTimeout(1500);await p.screenshot({path:'x5-people-bloom.png'});await p.close();
p=await pg(390,844,'ph-sea');await p.click('[data-agenda]');await p.waitForTimeout(800);await p.screenshot({path:'x6-phone.png'});await p.close();
console.log('errors',errs);await b.close()})();
