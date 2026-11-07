const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const R={};
const mk=async(w,h,ls={})=>{const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(w+': '+e.message));
 await p.addInitScript(ls=>{localStorage.setItem('mt-staff-tour-v19b','1');for(const k in ls)localStorage.setItem(k,ls[k])},ls);await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1800);return p};
const W=ms=>new Promise(r=>setTimeout(r,ms));
// 1. errors + overflow on every view, 390 and 1440
for(const w of [390,1440]){const p=await mk(w,900);R['overflow'+w]={};for(const h of ['today','tasks','calendar','board','gantt','people','agents']){await p.evaluate(h=>location.hash='#'+h,h);await W(400);R['overflow'+w][h]=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth)}await p.close()}
let p=await mk(1440,900);
// 2. clicks
await p.click('#attList .ar b');await W(400);R.attRowOpensResolve=await p.evaluate(()=>!!document.querySelector('#drawer.on .rs-h'));
await p.mouse.click(40,450);await W(400);R.outsideCloses=await p.evaluate(()=>!document.querySelector('#drawer').classList.contains('on'));
R.outsideNoPassThrough=await p.evaluate(()=>!document.querySelector('#drawer').classList.contains('on')&&location.hash.replace('#','')||'today');
await p.click('#plist .pr b');await W(400);R.cardOpens=await p.evaluate(()=>!!document.querySelector('#drawer.on .dr-body'));await p.keyboard.press('Escape');await W(300);
await p.keyboard.press('Control+k');await W(300);R.paletteCtrlK=await p.evaluate(()=>!!document.querySelector('.pal'));await p.keyboard.type('קמפיין');await W(200);await p.keyboard.press('Enter');await W(400);R.paletteEnterOpens=await p.evaluate(()=>document.querySelector('#drawer').classList.contains('on'));await p.keyboard.press('Escape');await W(300);
// 3. arrange: hide + restore
await p.evaluate(()=>document.querySelector('.sg[data-proxy="arrangeBtn"]').click());await W(300);R.arranging=await p.evaluate(()=>document.documentElement.classList.contains('arranging'));
const before=await p.evaluate(()=>document.querySelectorAll('[data-arrange="today2"]>[data-cid]:not([hidden])').length);
await p.hover('#attCard');await p.click('#attCard .cc-hide');await W(300);
const after=await p.evaluate(()=>document.querySelectorAll('[data-arrange="today2"]>[data-cid]:not([hidden])').length);
R.hide=[before,after];R.hiddenBtn=await p.evaluate(()=>document.querySelector('#hiddenBtn').textContent);
await p.evaluate(()=>document.documentElement.classList.remove('arranging'));await p.click('#briefBtn');await W(700);await p.locator('[data-bmgo]').last().click();await W(500);await p.click('[data-bproxy="hiddenBtn"]');await W(300);R.hiddenMenu=await p.evaluate(()=>(document.querySelector('.hp,.hp-r,.modal,.bgpop')||{}).className||'none');await p.screenshot({path:'s8-hidden.png'});
const restore=await p.$('.hp-r,[data-unhide],[data-restore]');if(restore){await restore.click();await W(300)}
R.restored=await p.evaluate(()=>!document.querySelector('#attCard').hidden);
// move by drag handle
const order0=await p.evaluate(()=>[...document.querySelectorAll('[data-arrange="today2"]>[data-cid]:not([hidden])')].map(c=>c.dataset.cid).slice(0,4).join(','));
const h=await p.$('#kpis')?null:null;
const g=await p.$('[data-cid="miniCal"] .cc-drag');if(g){await p.hover('[data-cid="miniCal"]');const bb=await g.boundingBox();const t=await (await p.$('[data-cid="attCard"]')).boundingBox();
 await p.mouse.move(bb.x+5,bb.y+5);await p.mouse.down();await p.mouse.move(bb.x+40,bb.y+30,{steps:5});await p.mouse.move(t.x+t.width*0.7,t.y+20,{steps:12});await p.mouse.up();await W(400)}
R.moveOrder=[order0,await p.evaluate(()=>[...document.querySelectorAll('[data-arrange="today2"]>[data-cid]:not([hidden])')].map(c=>c.dataset.cid).slice(0,4).join(','))];
await p.evaluate(()=>document.querySelector('.sg[data-proxy="arrangeBtn"]').click());await W(200);
// 4. content vs work
await p.evaluate(()=>location.hash='#board');await W(400);
R.planInKanban=await p.evaluate(()=>[...document.querySelectorAll('#kanban .kc')].map(k=>k.dataset.open).filter(x=>/vayetze|vayishlach|vayeshev|miketz/.test(x)));
await p.evaluate(()=>location.hash='#calendar');await W(300);
await p.evaluate(()=>{localStorage.setItem('mt-calkind','content')});await p.click('[data-calkind="content"]');await W(300);await p.click('[data-cmap="gantt"]');await W(400);
R.ganttParts=await p.evaluate(()=>({bar:document.querySelectorAll('#cGantt .cg-bar').length,dash:document.querySelectorAll('#cGantt .cg-dash').length,pin:document.querySelectorAll('#cGantt .cg-pin').length,virt:document.querySelectorAll('#cGantt .cg-r.virt').length}));
const vn=await p.$('#cGantt .cg-r.virt .cg-n');if(vn){await vn.click();await W(500);R.virtOpens=await p.evaluate(()=>(document.querySelector('#modalHost .modal, #drawer.on')||{}).className||'none');await p.screenshot({path:'s8-virt.png'});
 const sp=await p.$('[data-startprod]');if(sp){await sp.click();await W(500);await p.keyboard.press('Escape');await W(300);await p.evaluate(()=>location.hash='#board');await W(400);
 R.afterStartInKanban=await p.evaluate(()=>[...document.querySelectorAll('#kanban .kc')].map(k=>k.dataset.open).filter(x=>/vayetze|vayishlach|vayeshev|miketz|par-/.test(x)))}}
// 5. team: who am I / view as
await p.keyboard.press('Escape');await W(200);
await p.click('#sbProf');await W(400);R.viewAsModal=await p.evaluate(()=>document.querySelectorAll('.who-pick .who-b').length);await p.screenshot({path:'s8-who.png'});
const vb=await p.$('.who-b[data-viewas="mendy"]');if(vb){await vb.click();await W(500);R.viewAsMendy=await p.evaluate(()=>[localStorage.getItem('mt-as'),document.querySelector('#greet').textContent])}
R.errors=errs;console.log(JSON.stringify(R,null,1));await b.close()})();
