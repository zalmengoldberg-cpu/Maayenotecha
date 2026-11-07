const {chromium}=require('playwright');(async()=>{const f='file:///home/user/Maayenotecha/dashboard/demo/opk-demo.html';const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:900}});p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>localStorage.setItem('mt-staff-tour-v19b','1'));await p.goto(f);await p.waitForTimeout(2800);
await p.screenshot({path:'demo-home.png'});
console.log(await p.evaluate(()=>({items:Object.keys(S.items).length,att:(S.att||[]).length,greet:document.querySelector('#greet').textContent,name:document.querySelector('#sbName')?.textContent,wall:document.documentElement.dataset.wp})));
await p.click('#briefBtn');await p.waitForTimeout(700);await p.screenshot({path:'demo-brief.png'});await p.keyboard.press('Escape');
await p.goto(f+'#board');await p.waitForTimeout(1500);await p.screenshot({path:'demo-board.png'});
await p.goto(f+'#agents');await p.waitForTimeout(1500);await p.screenshot({path:'demo-agents.png'});
await p.goto(f+'#people');await p.waitForTimeout(1500);await p.screenshot({path:'demo-people.png'});
await p.goto(f+'#calendar');await p.waitForTimeout(1500);await p.screenshot({path:'demo-cal.png'});
// persistence: mark a step done then reload
await p.goto(f);await p.waitForTimeout(2000);await p.evaluate(()=>saveItem('tips',{status:'todo'}));await p.reload();await p.waitForTimeout(2000);console.log('persist',await p.evaluate(()=>S.items.tips.status));
await p.evaluate(()=>{const t=[...document.body.innerText.matchAll(/(מעיינותיך|מענדי|זלמן|קלוד|יריד|פרשת)/g)].map(m=>m[0]);return t}).then(r=>console.log('leftover visible terms',r));
console.log(errs);await b.close()})();
