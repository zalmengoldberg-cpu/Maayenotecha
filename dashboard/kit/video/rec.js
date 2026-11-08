const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const SRV=require(process.cwd()+'/srvlib');
const OUT=process.argv[2];const FD='/root/.claude/skills/synced/2d9a19a6-e850-47cc-a16a-ca5fd49e928a_40d3b54c-46b5-423a-9446-dd033b64967e/maayanotecha-media/assets/fonts/';
const W=1600,H=900;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1});const p=await ctx.newPage();
await SRV(p);
let css='';for(const w of [400,500,700,800,900])for(const s of ['hebrew','latin']){const f=`rubik-${s}-${w}-normal.woff2`;if(fs.existsSync(FD+f))css+=`@font-face{font-family:'Rubik';font-weight:${w};font-display:block;src:url(http://mock.local/_f/${f}) format('woff2');unicode-range:${s==='hebrew'?'U+0590-05FF,U+FB1D-FB4F':'U+0000-00FF,U+2000-206F'}}`}
css+=css.replace(/font-weight:400/g,'font-weight:300').split('}').filter(x=>x.includes('font-weight:300')).map(x=>x+'}').join('');
await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:css,contentType:'text/css'}));
await p.route('http://mock.local/_f/*',r=>r.fulfill({body:fs.readFileSync(FD+path.basename(new URL(r.request().url()).pathname)),contentType:'font/woff2'}));
await p.route('http://mock.local/phone.html',r=>r.fulfill({contentType:'text/html; charset=utf-8',body:`<!doctype html><html dir="rtl"><head><meta charset="utf-8"><style>${css}body{margin:0;height:100vh;display:grid;grid-template-columns:1fr 420px;align-items:center;gap:70px;padding:0 140px;box-sizing:border-box;font-family:Rubik;background:radial-gradient(60% 60% at 80% 10%,rgba(100,118,182,.22),transparent 70%),radial-gradient(50% 50% at 10% 100%,rgba(242,145,28,.14),transparent 70%),linear-gradient(180deg,#ECEEF3,#F3F1EC)}
.ph{width:410px;height:840px;border-radius:56px;background:#121733;padding:12px;box-shadow:0 40px 90px -30px rgba(20,26,51,.55);order:2}.ph iframe{width:386px;height:816px;border:0;border-radius:44px;background:#fff}
h1{font-size:54px;font-weight:800;color:#141A33;margin:0 0 18px;line-height:1.1}p{font-size:24px;color:#626A88;margin:0 0 12px;line-height:1.5}b{color:#3F5499}</style></head><body><div><h1>גם בטלפון</h1><p>אותו חדר, אותם נתונים – <b>מתעדכן בזמן אמת</b> אצל כל הצוות.</p><p>תפריט בלחיצה על הלוגו, כרטיס נפתח מלמטה, גרירה במגע.</p></div><div class="ph"><iframe src="http://mock.local/"></iframe></div></body></html>`}));
await p.clock.setFixedTime(new Date('2026-11-08T08:40:00+02:00'));
await p.addInitScript(()=>{try{localStorage.setItem('mt-staff-tour-v19b','1');localStorage.setItem('mt-staff-tour-v1','1');localStorage.setItem('mt-tour-done','1')}catch(e){}
  addEventListener('DOMContentLoaded',()=>{if(top!==self)return;const st=document.createElement('style');st.textContent=`
  #vcur{position:fixed;z-index:2147483647;width:26px;height:26px;margin:-4px 0 0 -4px;pointer-events:none;transition:transform .12s;filter:drop-shadow(0 3px 6px rgba(0,0,0,.35))}
  #vcur.dn{transform:scale(.82)}.vrip{position:fixed;z-index:2147483646;width:16px;height:16px;margin:-8px;border-radius:50%;background:rgba(242,145,28,.55);pointer-events:none;animation:vr .6s ease-out forwards}
  @keyframes vr{to{transform:scale(4.5);opacity:0}}
  #vcap{position:fixed;z-index:2147483645;left:50%;bottom:34px;translate:-50% 0;display:flex;align-items:center;gap:18px;padding:16px 28px 16px 18px;border-radius:999px;background:rgba(20,26,51,.88);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#fff;font-family:Rubik,sans-serif;direction:rtl;box-shadow:0 24px 60px -20px rgba(10,12,30,.6),inset 0 0 0 1px rgba(255,255,255,.1);width:max-content;max-width:1340px;opacity:0;transition:opacity .45s, translate .45s}
  #vcap.on{opacity:1}#vcap .n{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(180deg,#5266AC,#3F5499);font-weight:700;font-size:20px;box-shadow:inset 0 1px 0 rgba(255,255,255,.25)}
  #vcap b{display:block;font-size:27px;font-weight:700;line-height:1.25}#vcap>div{min-width:0}#vcap span{white-space:normal;display:block;font-size:19px;color:#C9CDE0;margin-top:3px;line-height:1.35}
  #vfull{position:fixed;inset:0;z-index:2147483644;display:grid;place-items:center;font-family:Rubik,sans-serif;direction:rtl;opacity:0;pointer-events:none;transition:opacity .6s;
   background:radial-gradient(60% 55% at 85% 0%,rgba(100,118,182,.55),transparent 70%),radial-gradient(50% 50% at 5% 100%,rgba(242,145,28,.28),transparent 70%),linear-gradient(180deg,#141A33,#0E1124)}
  #vfull.on{opacity:1}#vfull .in{text-align:center;color:#fff;max-width:1300px}#vfull h1{color:#fff!important;font-size:76px;font-weight:900;margin:0 0 16px;letter-spacing:-.01em;line-height:1.05}#vfull p{font-size:30px;color:#C9CDE0;margin:0}
  #vfull .tag{display:inline-block;margin-bottom:26px;padding:8px 20px;border-radius:999px;background:rgba(242,145,28,.18);color:#F6B25B;font-size:20px;font-weight:500;box-shadow:inset 0 0 0 1px rgba(242,145,28,.35)}
  .flow{display:flex;align-items:stretch;gap:14px;margin-top:46px;direction:rtl}.flow .s{width:220px;padding:22px 18px;border-radius:22px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);text-align:center;opacity:0;transform:translateY(16px);animation:fin .6s forwards}
  .flow .s i{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 12px;border-radius:50%;font-style:normal;font-size:26px;font-weight:800;background:linear-gradient(180deg,#5266AC,#3F5499)}
  .flow .s.g i{background:linear-gradient(180deg,#F6B25B,#D97B0A)}.flow .s.p i{background:linear-gradient(180deg,#8A74C4,#6A55A8)}.flow .s.ok i{background:linear-gradient(180deg,#4FA383,#2E8566)}
  .flow .s b{display:block;font-size:22px;margin-bottom:6px}.flow .s span{font-size:16px;color:#AEB3CC;line-height:1.45}.flow .ar{align-self:center;color:#6476B6;font-size:30px;opacity:0;animation:fin .5s forwards}
  @keyframes fin{to{opacity:1;transform:none}}
  .chips{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:34px}.chips span{padding:10px 18px;border-radius:999px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);font-size:18px;color:#E6E8F2}`;
  document.head.append(st);const c=document.createElement('div');c.id='vcur';c.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2.5 20 12l-7.2 1.6L9.2 21z" fill="#141A33" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';c.style.left='-50px';document.body.append(c);
  const cap=document.createElement('div');cap.id='vcap';document.body.append(cap);const f=document.createElement('div');f.id='vfull';document.body.append(f);
  addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'},true);
  addEventListener('mousedown',e=>{c.classList.add('dn');const r=document.createElement('div');r.className='vrip';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.append(r);setTimeout(()=>r.remove(),700)},true);
  addEventListener('mouseup',()=>c.classList.remove('dn'),true);})});
// screencast
const cdp=await ctx.newCDPSession(p);const frames=[];let fi=0;fs.mkdirSync(OUT,{recursive:true});
cdp.on('Page.screencastFrame',async f=>{const n=String(fi++).padStart(5,'0');fs.writeFileSync(`${OUT}/f${n}.jpg`,Buffer.from(f.data,'base64'));frames.push({n,t:f.metadata.timestamp});cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{})});
const W8=ms=>p.waitForTimeout(ms);
const cap=async(n,t,s)=>{await p.evaluate(([n,t,s])=>{const c=document.querySelector('#vcap');if(!c)return;c.classList.remove('on');setTimeout(()=>{c.innerHTML=(n?`<div class="n">${n}</div>`:'')+`<div><b>${t}</b>${s?`<span>${s}</span>`:''}</div>`;c.classList.add('on')},n===null?0:350)},[n,t,s])};
const capOff=()=>p.evaluate(()=>document.querySelector('#vcap')?.classList.remove('on'));
const full=async(html)=>p.evaluate(h=>{const f=document.querySelector('#vfull');f.innerHTML=`<div class="in">${h}</div>`;f.classList.add('on')},html);
const fullOff=()=>p.evaluate(()=>document.querySelector('#vfull').classList.remove('on'));
let mx=W/2,my=H/2;const mv=async(x,y,steps=22)=>{await p.mouse.move(x,y,{steps});mx=x;my=y};
const to=async(sel,dx=0,dy=0)=>{const l=p.locator(sel).first();await l.scrollIntoViewIfNeeded().catch(()=>{});const bb=await l.boundingBox();if(!bb)throw new Error('no '+sel);await mv(bb.x+bb.width/2+dx,bb.y+bb.height/2+dy);return bb};
const clk=async(sel,dx=0,dy=0)=>{await to(sel,dx,dy);await W8(250);await p.mouse.down();await W8(90);await p.mouse.up();await W8(150)};
const go=async h=>{await p.evaluate(h=>{location.hash=h},h);await W8(900)};
const scene=async(name,fn)=>{try{await fn()}catch(e){console.log('scene fail',name,e.message.split('\n')[0])}};
await p.goto('http://mock.local/');await W8(3200);
await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:W,maxHeight:H,everyNthFrame:1});
// 0 intro
await full(`<div class="tag">לצוות מעיינותיך</div><h1>חדר הבקרה של מעיינותיך</h1><p>כל העבודה של הצוות ושל קלוד – במקום אחד, בזמן אמת</p>`);await W8(3800);await fullOff();await W8(700);
await scene('home',async()=>{await cap(1,'תמונת מצב – הדף הראשי','ברכה, מדד העבודה, מה צריך אותך עכשיו, ומה יש לנו היום');await mv(1000,300);await W8(1200);await to('#heroMt .hero-art');await W8(1800);await mv(260,180);await W8(1600)});
await scene('brief',async()=>{await cap(2,'בריף בוקר','כל מה שחשוב היום, כרטיס אחרי כרטיס: מדדים, מה מחכה לך, פרויקטים, ממתין לאישור');await clk('#briefBtn');await W8(2000);for(let i=0;i<3;i++){await clk('#briefModal button:has-text("הבא")');await W8(1700)}await p.keyboard.press('Escape');await W8(500)});
await scene('att',async()=>{await cap(3,'צריך תשומת לב','מה תקוע ועל מי זה מחכה – ולחיצה על "לפתרון" מציעה דרך לשחרר ומנסחת הודעה');await to('#attCard');await W8(900);await clk('#attList .ar[data-res="0"] .go');await W8(2800);await p.keyboard.press('Escape');await W8(500)});
await scene('card',async()=>{await cap(4,'כל משימה – כרטיס אחד','סטטוס, אחראי, תאריכים, שלבים, ומי מחכה למי');await p.evaluate(()=>scrollTo({top:0}));await W8(300);await clk('#plist .pr[data-open]',-40,0);await W8(1600);
  await clk('#fStatus');await W8(1500);await p.keyboard.press('Escape');await W8(400);await clk('#fOwner');await W8(1400);await p.keyboard.press('Escape');await W8(300);
  await cap(5,'קישורים, קבצים והערות','כל קישור הופך לכפתור עם האייקון שלו – דרייב, פייסבוק, האתר – וקבצים נגררים פנימה');
  for(let i=0;i<10;i++){await p.mouse.wheel(0,120);await W8(70)}await p.evaluate(()=>document.querySelector('#drawer .mat26')?.scrollIntoView({behavior:'smooth',block:'center'}));await W8(1400);
  await clk('#lUrl');await p.keyboard.type('facebook.com/maayanotecha',{delay:45});await W8(500);await p.keyboard.press('Enter');await W8(1600);
  await cap(6,'קלוד על הכרטיס','מה הצעד הבא, פירוק לשלבים, הערכת זמנים – ו"שלח לביצוע" שולח לתור של קלוד');await p.evaluate(()=>document.querySelector('#drawer .ai')?.scrollIntoView({behavior:'smooth',block:'center'}));await W8(1200);await to('#sendItem');await W8(1800);await p.keyboard.press('Escape');await W8(500)});
await scene('agenda',async()=>{await cap(7,'על סדר היום','היום שלך כמו יומן אישי: הצעות לצרף, ו-7 הימים הקרובים עם גרירה בין ימים');await clk('#sbAgenda');await W8(2000);await to('[data-agplan]');await W8(800);await clk('[data-agplan]');await W8(1300);await clk('[data-agtab="week"]');await W8(2600);await clk('#app .sb-nav a[href="#tasks"]');await W8(600)});
await scene('tasks',async()=>{await cap(8,'משימות','מה עליי, מה קלוד מכין ברקע, ומה מחכה למישהו אחר – גוררים משימה בין הנתיבים');await go('#tasks');await mv(800,420);await W8(2800)});
await scene('board',async()=>{await cap(9,'קנבן','גוררים כרטיס לעמודה הבאה – והסטטוס מתעדכן מיד אצל כל הצוות');await go('#board');await W8(500);
  const A=await p.locator('#kanban .col[data-col="doing"] .kc').first().boundingBox(),B=await p.locator('#kanban .col[data-col="review"]').first().boundingBox();
  if(A&&B){await mv(A.x+A.width/2,A.y+A.height/2);await W8(400);await p.mouse.down();await p.mouse.move(A.x+A.width/2+12,A.y+A.height/2+10,{steps:4});await p.mouse.move(B.x+B.width/2,B.y+80,{steps:30});await W8(200);await p.mouse.up()}await W8(2000)});
await scene('cal',async()=>{await cap(10,'לוח שנה וגאנט','יעדים, פרסומים ואירועים עם התאריך העברי – ולחיצה על תאריך מוסיפה משימה');await go('#calendar');await mv(700,450);await W8(2400);await go('#gantt');await mv(900,400);await W8(2400)});
await scene('people',async()=>{await cap(11,'אנשים','כמה פתוח אצל כל אחד, מי עמוס – ולחיצה מראה את המשימות שלו');await go('#people');await mv(1000,380);await W8(2600)});
await scene('agents',async()=>{await cap(12,'קלוד וסוכנים','מה כל סוכן מכין ברקע, מה הוא רשאי לעשות לבד, ותור הבקשות מהצוות');await go('#agents');await mv(900,420);await W8(2800)});
await scene('flow',async()=>{await capOff();await full(`<h1 style="font-size:58px">איך עובדים עם קלוד</h1><p>הצוות מחליט ומאשר. קלוד מכין, מזכיר ומעדכן.</p>
  <div class="flow"><div class="s" style="animation-delay:.2s"><i>1</i><b>מוסיפים</b><span>כרטיס, שלב או בקשה – מהחדר, מהטלפון או מצ'אט</span></div><div class="ar" style="animation-delay:.6s">‹</div>
  <div class="s g" style="animation-delay:1s"><i>2</i><b>קלוד מכין</b><span>טיוטה, תמונה, מחקר – גם לבד, במשימות מתוזמנות</span></div><div class="ar" style="animation-delay:1.4s">‹</div>
  <div class="s p" style="animation-delay:1.8s"><i>3</i><b>ממתין לאישור</b><span>מופיע בחדר עם הקישורים לדרייב, ומענדי מאשר</span></div><div class="ar" style="animation-delay:2.2s">‹</div>
  <div class="s ok" style="animation-delay:2.6s"><i>4</i><b>יוצא לדרך</b><span>מתפרסם, מסומן כבוצע ונרשם ב"מה כבר נעשה"</span></div></div>
  <div class="chips"><span>פוסט פרשה – כל רביעי</span><span>תמונות לכרטיסים – כל בוקר</span><span>תזכורות לטלפון – כל שעה</span><span>תור הבקשות לקלוד</span></div>`);await W8(7500);await fullOff();await W8(600)});
await scene('custom',async()=>{await go('#today');await p.evaluate(()=>scrollTo({top:0}));await cap(13,'כל אחד מסדר לעצמו','גוררים את פינת הכרטיס לשינוי גודל, וכרטיס "קישורים" לאתר ולרשתות');
  await p.evaluate(()=>{S.agents._links={list:[{label:'האתר',url:'https://maynotechabooks.co.il'},{label:'פייסבוק',url:'https://facebook.com/maayanotecha'},{label:'אינסטגרם',url:'https://instagram.com/maayanotecha'},{label:'וואטסאפ',url:'https://wa.me/972500000000'},{label:'יוטיוב',url:'https://youtube.com/@maayanotecha'},{label:'דרייב',url:'https://drive.google.com/drive/'}]};renderAll()});
  await W8(500);await p.locator('#links26').scrollIntoViewIfNeeded();await W8(600);const c=p.locator('#rem22');await c.scrollIntoViewIfNeeded();await to('#rem22');await W8(500);const hb=await c.locator('.rz26').boundingBox();
  if(hb){await mv(hb.x+11,hb.y+11);await W8(300);await p.mouse.down();await p.mouse.move(hb.x-60,hb.y+70,{steps:30});await p.mouse.up()}await W8(1200);await to('#links26');await W8(1600);
  await cap(14,'הגדרות','רקע, איך הבריף נפתח, ומה מופיע בדף הבית');await clk('#setBtn');await W8(2600);await p.keyboard.press('Escape');await W8(400)});
await scene('phone',async()=>{await capOff();await p.goto('http://mock.local/phone.html');await W8(5200)});
await p.goto('http://mock.local/');await W8(1500);
await full(`<h1>מתחילים</h1><p>פותחים את הקישור ששותף איתכם · מדריך קצר בתפריט "מדריך למערכת"</p><div class="chips"><span>תמונת מצב</span><span>על סדר היום</span><span>משימות</span><span>קנבן</span><span>לוח שנה</span><span>אנשים</span><span>קלוד וסוכנים</span></div>`);await W8(4200);
await cdp.send('Page.stopScreencast');await W8(300);
// concat list
const lines=[];for(let i=0;i<frames.length;i++){const d=i<frames.length-1?Math.max(0.001,frames[i+1].t-frames[i].t):1.5;lines.push(`file 'f${frames[i].n}.jpg'`,`duration ${d.toFixed(4)}`)}lines.push(`file 'f${frames[frames.length-1].n}.jpg'`);
fs.writeFileSync(`${OUT}/list.txt`,lines.join('\n'));console.log('frames',frames.length,'secs',(frames[frames.length-1].t-frames[0].t).toFixed(1));await b.close()})();
