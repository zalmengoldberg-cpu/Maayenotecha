/* ===== v21: חדר הבקרה על maayanotecha-staff-ui בלבד – מעטפת + תמונת מצב =====
   לא משנה נתונים ולא פונקציות. רק מחליף את המבנה שהקוד כותב בתבניות של הסקיל:
   ברכה בעברית, תאריך עברי + לועזי בשורת הכותרת של ההירו, ומדדים ב-kpi של הסקיל (בלי פס הנקודות). */
(function(){
const $1=s=>document.querySelector(s);
const GREET=h=>h<5?'לילה טוב':h<12?'בוקר טוב':h<17?'צהריים טובים':h<21?'ערב טוב':'לילה טוב';
const HM={Tishri:'תשרי',Heshvan:'חשון',Kislev:'כסלו',Tevet:'טבת',Shevat:'שבט','Adar I':'אדר א׳','Adar II':'אדר ב׳',Adar:'אדר',Nisan:'ניסן',Iyar:'אייר',Sivan:'סיון',Tamuz:'תמוז',Av:'אב',Elul:'אלול'};
function hebDate(d){try{const p={};new Intl.DateTimeFormat('en-u-ca-hebrew',{day:'numeric',month:'long'}).formatToParts(d).forEach(x=>p[x.type]=x.value);
  return (window.DS&&DS.gematria?DS.gematria(+p.day,true):p.day)+' ב'+(HM[p.month]||p.month)}catch(e){return ''}}
function firstName(){try{const id=(typeof S!=='undefined'&&S.meP)||'zalmen';const p=typeof P==='function'?P(id):null;const n=p&&p.name?String(p.name).trim().split(/\s+/)[0]:'';
  if(/[֐-׿]/.test(n))return n}catch(e){}return window.meFirst?meFirst():''}

/* הקוד הישן קורא ל-renderToday מתוך הבלוק שלו, לכן מתקנים אחרי renderAll (כמו v19) */
function skillKpis(){const kp=$1('#kpis');if(!kp)return;kp.querySelectorAll('.kpi').forEach(c=>{c.classList.remove('hero','s3');if(c.querySelector('.kpi-top'))return;
  const k2=c.querySelector('.k2'),v=c.querySelector('.v'),sub=c.querySelector('.sub'),dw=c.querySelector('.dw');if(!k2||!v||!sub)return;
  const top=document.createElement('div');top.className='kpi-top';const go=document.createElement('span');go.className='go';go.innerHTML=window.DS?DS.icon('arrowUpLeft','ico-sm'):'';top.append(k2,go);
  const body=document.createElement('div');body.className='kpi-body';const val=document.createElement('div');val.className='kpi-val';v.classList.add('t-kpi','num');val.append(v,sub);body.append(val);
  c.replaceChildren(top,body);if(dw){dw.hidden=true;c.append(dw)}})}
function greet(){const g=$1('#greet');if(!g)return;const n=firstName();g.innerHTML=GREET(new Date().getHours())+(n?`, <b>${esc(n)}</b>`:'')}
function setDate(){const hd=$1('#hdate');if(hd){const d=new Date();hd.textContent=hebDate(d)+' · '+new Intl.DateTimeFormat('he-IL',{weekday:'long',day:'numeric',month:'long'}).format(d)}}
/* גאנט במובייל: עמודת השמות צרה יותר (הקוד קובע 220px בתוך הסגנון) */
function ganttMobile(){const g=$1('#gantt');if(!g)return;const m=matchMedia('(max-width:760px)').matches;g.style.gridTemplateColumns=g.style.gridTemplateColumns.replace(/^\d+px/,m?'150px':'220px')}
addEventListener('resize',ganttMobile);
/* מסך אנשים: לחיצה על השם או התמונה פותחת את "המשימות של X" (אותו חלון כמו "מי מחזיק מה"). אפיון 9.10, החלטה 6.11 */
function peopleClick(){if(typeof S==='undefined'||!S.people)return;const ids=Object.keys(S.people);
  document.querySelectorAll('#peopleGrid .person').forEach((c,i)=>{const id=ids[i];if(!id)return;c.querySelectorAll('.hd>.av,.hd>div').forEach(el=>{el.dataset.list='who:'+id;el.setAttribute('role','button');el.tabIndex=0;el.title='כל הפריטים של '+(S.people[id].name||'')})})}
/* מובייל: נקודות דפדוף מתחת לקרוסלת המדדים, כמו בסקיל */
function kpiPager(){const kp=$1('#kpis');if(!kp)return;let d=$1('#kpiPager');if(!d){d=document.createElement('div');d.id='kpiPager';d.className='kpi-dots';d.setAttribute('aria-hidden','true');kp.after(d);
    kp.addEventListener('scroll',()=>{const c=[...kp.querySelectorAll('.kpi')];if(!c.length)return;const mid=kp.getBoundingClientRect().left+kp.clientWidth/2;let best=0,bd=1e9;
      c.forEach((x,i)=>{const r=x.getBoundingClientRect();const dd=Math.abs(r.left+r.width/2-mid);if(dd<bd){bd=dd;best=i}});[...d.children].forEach((x,i)=>x.classList.toggle('on',i===best))},{passive:true})}
  const n=kp.querySelectorAll('.kpi').length;if(d.children.length!==n)d.innerHTML=Array.from({length:n},(_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}
function paintV21(){try{skillKpis();kpiPager();greet();setDate();ganttMobile();peopleClick()}catch(e){console.error(e)}}
const _ra=window.renderAll;window.renderAll=function(){const r=_ra.apply(this,arguments);paintV21();return r};

/* עיגולים בכל מסך: הסתרה והצגה משותפות עם תמונת מצב (אותו מפתח, mt-circles) */
function syncCircles(){const home=$1('#circles');if(!home)return;const off=home.hidden;
  document.querySelectorAll('.circles-page').forEach(c=>{c.hidden=off;const sh=c.nextElementSibling;if(sh&&sh.matches('[data-circles-show]'))sh.hidden=!off})}
document.addEventListener('click',e=>{const h=e.target.closest('[data-circles-hide]'),s=e.target.closest('[data-circles-show]');
  if(h){$1('#circlesHide')?.click();syncCircles();s||h.closest('.circles-page')?.nextElementSibling?.focus()}
  else if(s){$1('#circlesShow')?.click();syncCircles()}
  else if(e.target.closest('#circlesHide,#circlesShow'))setTimeout(syncCircles)});
/* העיגולים והסטוריז הוסרו (6.11): מסמנים כמוסתרים כדי שהמדריך ידלג על השלבים שלהם */
{const c=$1('#circles');if(c)c.hidden=true}

/* ===================== v22 (6.11): תמונת מצב לפי הסימונים 1–4 =====================
   1. "מה יש לנו היום" בראש העמודה הצדדית (החלק של פרטי היום מהלוח של הסקיל), והלוח מיד מתחתיו.
   2. תמונה של הפרויקט + האדם + אייקון הפלטפורמה בשורות, כמו בטבלת ההזמנות של הסקיל.
   3. מדד העבודה כסוללה. 4. מד עם מחוגה במקום שעון החול, עם בחירה ביניהם. 5. התדריך כאזור פתוח. */
const SITE_ICON='__SITEICON__';
const BRL={facebook:'פייסבוק',instagram:'אינסטגרם',whatsapp:'וואטסאפ',youtube:'יוטיוב',gmail:'מייל',google:'גוגל',site:'אתר'};
const BRH={'פייסבוק':'facebook','אינסטגרם':'instagram','אינסטה':'instagram','וואטסאפ':'whatsapp','ווטסאפ':'whatsapp','יוטיוב':'youtube','מייל':'gmail','ניוזלטר':'gmail','גוגל':'google','אתר':'site'};
/* פלטפורמה רק ממה שכתוב בכרטיס (שדה פלטפורמות), ואם אין: ערוצים שהפלטפורמה שלהם ידועה */
function brandsOf(it){if(!it)return[];const out=[];(it.platforms||[]).forEach(x=>{const t=String(x).trim().toLowerCase();const h=Object.keys(BRH).find(w=>t.includes(w));const k=h?BRH[h]:Object.keys(BRL).find(b=>t.includes(b));if(k&&!out.includes(k))out.push(k)});
  if(!out.length){const c={newsletter:'gmail',site:'site',data:'google'}[it.channel];if(c)out.push(c)}return out}
function brandBadge(k,cls=''){if(!k)return'';if(k==='site')return `<span class="brand site ${cls}" role="img" aria-label="אתר"><img src="${SITE_ICON}" alt=""></span>`;
  return window.DS?DS.brand(k,BRL[k]).replace('class="brand ','class="brand '+cls+' '):''}
/* אדם עגול + אייקון הפלטפורמה בפינה (כמו .avatar .brand בסקיל). תמונה אמיתית אם הועלתה, אחרת ראשי תיבות */
function personBadge(id,it,cls=''){if(!id||typeof av!=='function'||!P(id))return'';const b=brandsOf(it)[0];return `<span class="avatar pa ${cls}">${av(id)}${b?brandBadge(b):''}</span>`}
function thumbOf(it){if(!it||!it.id||typeof art!=='function')return'';return `<span class="th22">${art(it)}</span>`}
function ownerOf(e){const it=e.it||{};if(e.type==='step'){const st=(it.steps||[])[e.si];if(st&&st.owner)return st.owner}return it.owner||null}
const TYPE22={pub:{g:'c',t:'עולה',c:'var(--gold)'},pin:{g:'c',t:'נעיצה',c:'var(--gold)'},due:{g:'t',t:'יעד',c:'var(--royal)'},step:{g:'t',t:'שלב',c:'var(--royal-400)'},evt:{g:'e',t:'אירוע',c:'var(--sched)'},rec:{g:'e',t:'קבוע',c:'var(--ink-300)'}};
function evDone(e){const it=e.it||{};if(e.type==='step')return !!((it.steps||[])[e.si]||{}).done;return it.status==='done'}
function evSub(e){const it=e.it||{};if(e.type==='step')return 'שלב ב'+(it.title||'');if(e.type==='pub')return 'עולה · '+((typeof CHANNEL!=='undefined'&&CHANNEL[it.channel])||'');
  if(e.type==='pin')return 'נעיצה קבועה · עוד אין כרטיס';if(e.type==='rec')return 'קבוע';if(e.type==='evt')return 'אירוע';return it.kind==='project'?'יעד הפרויקט':'יעד'}
function evTitle(e){return String(e.label||'').replace(/^(עולה|יעד):\s*/,'')}
function dayList(ds){if(typeof dayEvents!=='function')return{par:null,ev:[]};const all=dayEvents(ds);return{par:all.find(e=>e.type==='par'),ev:all.filter(e=>e.type!=='par')}}
function rowHtml(e,cls='dn-row'){const it=e.it||{};const T=TYPE22[e.type]||TYPE22.due;const open=it.id&&!e.virtual?`data-open="${esc(it.id)}"`:'';
  return `<div class="${cls}${evDone(e)?' done':''}" ${open} ${open?'role="button" tabindex="0"':''}><i class="bullet" style="--c:${T.c}"></i>${thumbOf(it.id?it:null)}<span class="meta"><b>${esc(evTitle(e))}</b><span>${esc(evSub(e))}</span></span>${personBadge(ownerOf(e),it)}</div>`}

/* ---- 1. מה יש לנו היום ---- */
let dnSel=null;
const HDOW=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
function hebParts(d){try{const p={};new Intl.DateTimeFormat('en-u-ca-hebrew',{day:'numeric',month:'long'}).formatToParts(d).forEach(x=>p[x.type]=x.value);return{day:+p.day,mon:HM[p.month]||p.month}}catch(e){return{day:d.getDate(),mon:''}}}
function gem(n,q){return window.DS&&DS.gematria?DS.gematria(n,q):String(n)}
function ensureDayNow(){let el=$1('#dayNow');if(el)return el;const hero=$1('#heroMt');if(!hero)return null;
  el=document.createElement('section');el.id='dayNow';el.className='card open-top daynow';el.setAttribute('aria-labelledby','dnH');el.dataset.tour='daynow';hero.after(el);return el}
/* פריט אחד בכל פעם, מתחלף כל כמה שניות במעבר רך (עוצר בריחוף; בלי תנועה למי שביקש) */
let dnIdx=0,dnTimer=0,dnSig='';
function dnShow(i){const el=$1('#dayNow');if(!el)return;const rows=[...el.querySelectorAll('.dn-slide')];if(!rows.length)return;dnIdx=(i+rows.length)%rows.length;
  rows.forEach((r,n)=>{r.classList.toggle('on',n===dnIdx);r.setAttribute('aria-hidden',String(n!==dnIdx));r.tabIndex=n===dnIdx&&r.dataset.open?0:-1});
  el.querySelectorAll('.dn-dots i').forEach((d,n)=>d.classList.toggle('on',n===dnIdx))}
function dnTick(){clearInterval(dnTimer);if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  dnTimer=setInterval(()=>{const el=$1('#dayNow');if(!el||el.matches(':hover,:focus-within')||document.hidden)return;dnShow(dnIdx+1)},4200)}
function renderDayNow(){const el=ensureDayNow();if(!el||typeof S==='undefined'||!S.loaded)return;const today=iso(TODAY);const ds=dnSel||today;const d=parse(ds);const h=hebParts(d);
  const {par,ev}=dayList(ds);const nC=ev.filter(e=>TYPE22[e.type]?.g==='c').length,nT=ev.filter(e=>TYPE22[e.type]?.g==='t').length,nE=ev.filter(e=>TYPE22[e.type]?.g==='e').length;
  const cnt=[nT?`${nT} משימות ויעדים`:'',nC?`${nC} תוכן`:'',nE?`${nE} אירועים`:''].filter(Boolean).join(' · ')||'יום פנוי';
  const isT=ds===today;const ttl=isT?'מה יש לנו היום':d<TODAY?`מה היה לנו ביום ${HDOW[d.getDay()]}`:`מה יש לנו ביום ${HDOW[d.getDay()]}`;
  const order={t:0,c:1,e:2};const sorted=ev.slice().sort((a,b)=>(order[TYPE22[a.type]?.g]??3)-(order[TYPE22[b.type]?.g]??3)||evDone(a)-evDone(b));
  const sig=ds+'|'+sorted.map(e=>e.type+(e.it&&e.it.id)+e.label+evDone(e)).join(',');if(sig===dnSig&&el.firstChild)return;const same=dnSig.split('|')[0]===ds;dnSig=sig;if(!same)dnIdx=0;
  const empty=`<div class="empty dn-empty">${window.MT_IMG&&MT_IMG['e-dayPanel']?`<img class="icon-3d" src="${MT_IMG['e-dayPanel']}" alt="">`:''}<b>יום פנוי</b><span>אין משימות, תוכן או אירועים ביום הזה.</span></div>`;
  el.innerHTML=`<div class="card-head"><h3 id="dnH">${esc(ttl)}</h3>${isT?'':`<button type="button" class="link-sm dn-today" data-dntoday="1">חזרה להיום</button>`}</div>
    <div class="hcal-detail dn-detail"><div class="big"><b>${gem(h.day)}</b><span>${HDOW[d.getDay()]}</span></div>
      <span class="date">${esc(new Intl.DateTimeFormat('he-IL',{day:'numeric',month:'long',year:'numeric'}).format(d))}</span>
      <span class="count">${esc(cnt)} · ${esc(gem(h.day,true)+' ב'+h.mon)}${par?' · '+esc(par.label):''}</span></div>
    <div class="dn-list" aria-live="polite">${sorted.length?sorted.map(e=>rowHtml(e,'row-tile dn-row dn-slide')).join(''):empty}</div>
    ${sorted.length>1?`<div class="dn-dots" aria-hidden="true">${sorted.map(()=>'<i></i>').join('')}</div>`:''}
    <button type="button" class="dn-agenda" data-agenda="${ds}"><span>${DS.icon('calendar','ico-sm')}על סדר היום</span><em>${sorted.length>1?`${sorted.length} פריטים`:'הלו״ז המלא'}${DS.icon('chevL','ico-sm')}</em></button>`;
  dnShow(dnIdx);dnTick()}
/* הלוח שולט ביום שמוצג: כל בחירת יום בלוח (הוא מצייר את עצמו מחדש) מעדכנת את האזור */
/* הלוח הקטן בדף הבית: בלי הוספה ובלי חיצים, ועיגול עדין בימים שיש בהם משהו (זהב לתוכן, כחול למשימה/יעד) */
function decorateCal(root){root.querySelectorAll('.hcal-actions,.hcal-nav').forEach(x=>x.remove());
  root.querySelectorAll('.hcal-day[data-k]').forEach(b=>{const L=typeof dayEvents==='function'?dayEvents(b.dataset.k):[];
    const c=L.some(e=>e.type==='pub'||e.type==='pin'),t=L.some(e=>e.type==='due'||e.type==='step'||e.type==='evt');
    b.classList.toggle('mk',c||t);b.classList.toggle('mk-c',c&&!t);b.classList.toggle('mk-t',t&&!c);b.classList.toggle('mk-ct',c&&t)});
  if(!root.querySelector('.mk-legend'))root.querySelector('.hcal-sheet')?.insertAdjacentHTML('beforeend','<div class="mk-legend" aria-hidden="true"><span><i style="--c:#F2911C"></i>תוכן</span><span><i style="--c:#3F5499"></i>משימה או יעד</span></div>')}
function wireCal(){const root=$1('#mtCal');if(!root)return;decorateCal(root);if(root._dn)return;root._dn=1;
  new MutationObserver(()=>{if(root._busy)return;root._busy=1;decorateCal(root);root._busy=0;const k=root.querySelector('.hcal-day[aria-pressed="true"]')?.dataset.k;if(k&&k!==(dnSel||iso(TODAY))){dnSel=k;renderDayNow()}}).observe(root,{childList:true})}
document.addEventListener('click',e=>{if(!e.target.closest('[data-dntoday]'))return;dnSel=null;const b=$1(`#mtCal .hcal-day[data-k="${iso(TODAY)}"]`);
  if(b)b.click();else{const c=$1('#miniCal');if(c){c.innerHTML='';window.renderMiniCal&&renderMiniCal();wireCal()}}renderDayNow()});

/* ---- "על סדר היום": עמוד מלא עם הלו"ז של היום ---- */
let agDay=null;
function ensureAgenda(){let el=$1('#agendaPage');if(el)return el;el=document.createElement('section');el.id='agendaPage';el.className='agp';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','agH');document.body.append(el);return el}
function renderAgenda(){const el=ensureAgenda();if(el.hidden||typeof S==='undefined'||!S.loaded)return;const ds=agDay||iso(TODAY);const d=parse(ds);const h=hebParts(d);const {par,ev}=dayList(ds);
  const G=[['t','משימות ויעדים'],['c','תוכן שעולה'],['e','אירועים וקבועים']];const done=ev.filter(evDone).length;const pc=ev.length?Math.round(done/ev.length*100):0;
  const people={};ev.forEach(e=>{const o=ownerOf(e);if(o)people[o]=(people[o]||0)+1});
  const plat={};ev.forEach(e=>brandsOf(e.it).forEach(b=>plat[b]=(plat[b]||0)+1));
  const st=e=>{const it=e.it||{};if(evDone(e))return '<span class="status ok">בוצע</span>';if(typeof isBlocked==='function'&&it.id&&isBlocked(it))return '<span class="status bad">תקוע</span>';
    if(it.status==='review')return '<span class="status review">ממתין לאישור</span>';if(ds<iso(TODAY))return '<span class="status warn">לא סומן</span>';return `<span class="status info">${esc((STATUS&&STATUS[it.status])||'מתוכנן')}</span>`};
  const item=e=>{const it=e.it||{};const T=TYPE22[e.type]||TYPE22.due;const open=it.id&&!e.virtual?`data-open="${esc(it.id)}" role="button" tabindex="0"`:'';
    return `<div class="agenda-item${evDone(e)?' done':''}" ${open}><span class="tm">${esc(T.t)}<span>${e.type==='rec'||e.type==='evt'?'כל היום':'עד סוף היום'}</span></span>${thumbOf(it.id?it:null)||'<span class="th22 none"></span>'}<span class="meta"><b>${esc(evTitle(e))}</b><span>${esc(evSub(e))}</span></span>${personBadge(ownerOf(e),it)}${st(e)}</div>`};
  const groups=G.map(([g,t])=>{const L=ev.filter(e=>TYPE22[e.type]?.g===g);return L.length?`<section class="agp-g"><h4>${t}<span class="num">${L.length}</span></h4><div class="agenda">${L.map(item).join('')}</div></section>`:''}).join('');
  el.innerHTML=`<div class="agp-in">
    <header class="agp-top"><div class="agp-t"><span class="eyebrow">על סדר היום</span><h2 id="agH">${ds===iso(TODAY)?'הלו״ז של היום':'הלו״ז של יום '+HDOW[d.getDay()]}</h2>
      <span class="t-muted">${esc(gem(h.day,true)+' ב'+h.mon)} · ${esc(new Intl.DateTimeFormat('he-IL',{weekday:'long',day:'numeric',month:'long'}).format(d))}${par?' · '+esc(par.label):''}</span></div>
      <div class="agp-act"><button class="btn btn-secondary btn-icon btn-sm" type="button" data-agstep="-1" aria-label="היום הקודם">${DS.icon('chevR','ico-sm')}</button>
        <button class="btn btn-secondary btn-sm" type="button" data-agstep="0">היום</button>
        <button class="btn btn-secondary btn-icon btn-sm" type="button" data-agstep="1" aria-label="היום הבא">${DS.icon('chevL','ico-sm')}</button>
        <button class="btn btn-brand btn-sm" type="button" data-newday="${ds}">${DS.icon('plus','ico-sm')}הוסף ליום</button>
        <button class="btn btn-ghost btn-icon btn-sm agp-x" type="button" data-agclose="1" aria-label="סגירה">${DS.icon('plus','ico-sm')}</button></div></header>
    <div class="agp-body"><div class="agp-main">${groups||`<div class="empty">${window.MT_IMG&&MT_IMG['e-dayPanel']?`<img class="icon-3d" src="${MT_IMG['e-dayPanel']}" alt="">`:''}<b>יום פנוי</b><span>אין משימות, תוכן או אירועים ביום הזה. אפשר להוסיף מהכפתור למעלה.</span></div>`}</div>
      <aside class="agp-side"><div class="card"><div class="sched-progress"><div class="r"><span>התקדמות היום</span><b class="num">${done}/${ev.length}</b></div><div class="bar" style="--v:${pc}%;--c:var(--ok)"><i></i></div></div>
        <div class="agp-sum">${G.map(([g,t])=>`<div><b class="num">${ev.filter(e=>TYPE22[e.type]?.g===g).length}</b><span>${t}</span></div>`).join('')}</div></div>
        ${Object.keys(people).length?`<div class="card"><h4>מי עובד על זה</h4>${Object.entries(people).map(([id,n])=>`<div class="agp-p" data-list="who:${esc(id)}" role="button" tabindex="0"><span class="avatar">${av(id)}</span><b>${esc((P(id)||{}).name||'')}</b><span class="num">${n}</span></div>`).join('')}</div>`:''}
        ${Object.keys(plat).length?`<div class="card"><h4>פלטפורמות</h4>${Object.entries(plat).map(([k,n])=>`<div class="ch-row">${brandBadge(k)}<span class="meta"><b>${BRL[k]}</b><span class="num">${n} פריטים</span></span></div>`).join('')}</div>`:''}
      </aside></div></div>`}
function openAgenda(ds){agDay=ds||dnSel||iso(TODAY);const el=ensureAgenda();el.hidden=false;document.documentElement.classList.add('agp-open');renderAgenda();el.querySelector('.agp-x')?.focus();if(location.hash!=='#agenda')history.pushState(null,'','#agenda')}
function closeAgenda(back){const el=$1('#agendaPage');if(!el||el.hidden)return;el.hidden=true;document.documentElement.classList.remove('agp-open');if(back&&location.hash==='#agenda')history.back();$1('[data-agenda]')?.focus()}
document.addEventListener('click',e=>{const a=e.target.closest('[data-agenda]');if(a){openAgenda(a.dataset.agenda);return}
  if(e.target.closest('[data-agclose]')){closeAgenda(true);return}
  const s=e.target.closest('[data-agstep]');if(s){const n=+s.dataset.agstep;if(!n)agDay=iso(TODAY);else{const d=parse(agDay||iso(TODAY));d.setDate(d.getDate()+n);agDay=iso(d)}renderAgenda();return}
  const ag=$1('#agendaPage');if(ag&&!ag.hidden&&e.target.closest('#agendaPage [data-open],#agendaPage [data-list],#agendaPage [data-newday]'))setTimeout(()=>closeAgenda(true),0)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$1('#agendaPage:not([hidden])')&&!document.querySelector('.drawer.on,.modal.on')){closeAgenda(true)}});
addEventListener('popstate',()=>{if(location.hash!=='#agenda')closeAgenda(false);else if($1('#agendaPage')?.hidden)openAgenda(agDay)});

/* ---- 2. שורות בסגנון של טבלת ההזמנות: תמונת הפרויקט, האדם ואייקון הפלטפורמה ---- */
function dressRows(){if(typeof S==='undefined'||!S.loaded)return;
  document.querySelectorAll('#attList .ar[data-res]').forEach(r=>{if(r._d)return;const a=(S.att||[])[+r.dataset.res];const it=a&&a.it;if(!it)return;r._d=1;
    const ic=r.querySelector('.ai2');if(ic){const t=document.createElement('span');t.className='ai22';t.innerHTML=thumbOf(it)+`<i class="warn-dot" aria-hidden="true">${ic.innerHTML}</i>`;ic.replaceWith(t)}
    const who=(it.blocked&&it.blocked.who)||it.waitingOn||it.owner;const pb=personBadge(who,it);if(pb)r.querySelector('.est')?.insertAdjacentHTML('beforebegin',pb)});
  document.querySelectorAll('#b8chips .bc').forEach(c=>{if(c._d)return;const a=(S.att||[])[+c.dataset.res];const it=a&&a.it;const v=c.querySelector(':scope>.av');if(!it||!v)return;c._d=1;
    const w=document.createElement('span');w.className='avatar pa';v.replaceWith(w);w.append(v);const b=brandsOf(it)[0];if(b)w.insertAdjacentHTML('beforeend',brandBadge(b))});
  document.querySelectorAll('#plist .pr[data-open]').forEach(r=>{if(r._d)return;const it=S.items&&S.items[r.dataset.open];if(!it)return;r._d=1;const pb=personBadge(it.owner,it);if(pb)r.querySelector('.stl-wrap')?.insertAdjacentHTML('beforebegin',pb)});
  document.querySelectorAll('#reps .ldr>.av').forEach(v=>{const w=document.createElement('span');w.className='avatar pa lg';v.replaceWith(w);w.append(v)})}

/* ---- 3. מדד העבודה כסוללה (אותו ציון ואותו חלון "מה משפיע"). מופיע רק בריחוף או בנגיעה ---- */
const BAT=[{c:'#2E8566',t:'רגוע'},{c:'#7FA35A',t:'סביר'},{c:'#F2911C',t:'עמוס'},{c:'#E06A1B',t:'לחוץ'},{c:'#C2412D',t:'עומס יתר'}];
function meterScore(){const v=parseInt($1('#heroMt .ps-score')?.textContent,10);return isFinite(v)?Math.max(0,Math.min(100,v)):0}
function stageOf(v){return Math.min(4,Math.floor(v/20))}
function battery(){const chip=$1('#heroMt .pulse-chip');if(!chip)return;const v=meterScore(),st=stageOf(v);
  let b=chip.querySelector('.batt');if(!b){b=document.createElement('span');b.className='batt';b.setAttribute('aria-hidden','true');b.innerHTML=BAT.map(()=>'<i></i>').join('')+'<u></u>';chip.querySelector('.ps-dot')?.replaceWith(b);chip.classList.add('has-batt')}
  [...b.querySelectorAll('i')].forEach((x,i)=>{const on=v>0&&i<=st;x.className=on?'on':'';x.style.setProperty('--c',on?BAT[st].c:'')});
  const lv=chip.querySelector('.ps-level');if(lv){lv.textContent=BAT[st].t;lv.style.color=BAT[st].c}
  const sc=chip.querySelector('.ps-score');if(sc&&!/%$/.test(sc.textContent))sc.textContent=v+'%';
  chip.setAttribute('aria-label',`מדד העבודה ${v} אחוז, ${BAT[st].t}. לחיצה מציגה מה משפיע`);
  const g=$1('#meterGauge');if(g){g.style.setProperty('--a',(-132+v*2.64)+'deg');g.style.setProperty('--mc',BAT[st].c);g.querySelector('.mg-v').textContent=v+'%';const l=g.querySelector('.mg-l');l.textContent=BAT[st].t;l.style.color=BAT[st].c}}

/* ---- 4. מד עם מחוגה: אותו סגנון ואותה שכבה כמו שעון החול (תמונה מ-fal באותה קומפוזיציה),
   מחוגה חיה מעליה. החלפה בלחיצה על האובייקט עצמו: שעון חול → מד → בלי → שעון חול ---- */
const GAUGE_IMG='__GAUGEIMG__';const HUB=[.2854,.4979],ARC_R=.2454;
const MODES=['glass','gauge','none'],MODE_T={glass:'שעון חול',gauge:'מד',none:'בלי מדד'},MODE_NEXT={glass:'החלפה למד',gauge:'הסתרת המדד',none:'החזרת שעון החול'};
function artMap(fx,fy){const art=$1('#heroMt .hero-art');const img=art&&art.querySelector('img.mg-img');if(!img)return null;
  const r=img.getBoundingClientRect(),a=art.getBoundingClientRect(),cs=getComputedStyle(img),[px,py]=cs.objectPosition.split(' ').map(v=>parseFloat(v)/100);
  const nw=img.naturalWidth||768,nh=img.naturalHeight||429,sc=Math.max(r.width/nw,r.height/nh),dw=nw*sc,dh=nh*sc;
  return {x:r.left-a.left+(r.width-dw)*(isNaN(px)?.5:px)+fx*dw,y:r.top-a.top+(r.height-dh)*(isNaN(py)?.5:py)+fy*dh,dh}}
function placeNeedle(){const g=$1('#meterGauge'),hit=$1('#heroMt .art-hit');const m=artMap(HUB[0],HUB[1]);if(!m)return;
  if(g){const L=m.dh*ARC_R*1.02;g.style.cssText+=`;left:${m.x-L}px;top:${m.y-L}px;width:${2*L}px;height:${2*L}px`}
  if(hit){const R=m.dh*.44;hit.style.cssText=`left:${m.x-R}px;top:${m.y-R}px;width:${2*R}px;height:${2*R}px`}}
function meterToggle(){const hero=$1('#heroMt');if(!hero||hero._mt)return;const art=hero.querySelector('.hero-art');if(!art)return;hero._mt=1;
  const im=document.createElement('img');im.className='mg-img';im.alt='';im.src=GAUGE_IMG;art.append(im);
  const g=document.createElement('div');g.id='meterGauge';g.className='mgauge';g.setAttribute('aria-hidden','true');
  g.innerHTML=`<i class="mg-glow"></i><svg viewBox="0 0 200 200"><defs><linearGradient id="mgN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".55" stop-color="var(--mc,#F2911C)" stop-opacity=".9"/><stop offset="1" stop-color="var(--mc,#F2911C)" stop-opacity=".35"/></linearGradient></defs>
    <g class="mg-needle"><g class="mg-wob"><path d="M100 112 L96.6 100 L100 6 L103.4 100 Z" fill="url(#mgN)"/><path d="M100 6 L100 104" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/></g></g>
    <circle cx="100" cy="100" r="8" fill="rgba(255,255,255,.75)" stroke="#fff" stroke-width="1.5"/><circle cx="100" cy="100" r="3" fill="var(--mc,#F2911C)"/></svg>
    <div class="mg-read"><b class="mg-v num">0%</b><span class="mg-l"></span></div>`;art.append(g);
  const hit=document.createElement('button');hit.type='button';hit.className='art-hit';hero.append(hit);
  const tip=document.createElement('span');tip.className='art-tip';tip.setAttribute('aria-hidden','true');hit.append(tip);
  const set=m=>{MODES.forEach(x=>hero.classList.toggle('meter-'+x,x===m));hero.dataset.meter=m;const nx=MODES[(MODES.indexOf(m)+1)%3];
    hit.setAttribute('aria-label',`תצוגת המדד: ${MODE_T[m]}. לחיצה: ${MODE_NEXT[m]}`);tip.textContent=MODE_NEXT[m];try{localStorage.setItem('mt-hero-meter',m)}catch(e){}};
  let m='glass';try{m=localStorage.getItem('mt-hero-meter')||'glass'}catch(e){}if(!MODES.includes(m))m='glass';set(m);
  let peekT=0;const peek=()=>{hero.classList.add('peek');clearTimeout(peekT);peekT=setTimeout(()=>hero.classList.remove('peek'),4500)};
  let pt='mouse';hero.addEventListener('pointerdown',e=>{pt=e.pointerType},true);
  hit.addEventListener('click',e=>{e.stopPropagation();if(pt==='touch'&&!hero.classList.contains('peek')){peek();return}set(MODES[(MODES.indexOf(hero.dataset.meter)+1)%3]);if(pt==='touch')peek()});
  hero.addEventListener('click',e=>{if(pt==='touch'&&!e.target.closest('button,a,[role=button],.pulse-pop'))peek()});
  const sc=hero.querySelector('.ps-score');if(sc)new MutationObserver(()=>{if(!/%$/.test(sc.textContent))battery()}).observe(sc,{childList:true,characterData:true,subtree:true});
  im.addEventListener('load',placeNeedle);addEventListener('resize',placeNeedle);new ResizeObserver(placeNeedle).observe(art);placeNeedle()}

/* ---- לוח השנה המלא: לחיצה על מספר התאריך מוסיפה לתאריך הזה ---- */
function newOn(ds){const nb=document.createElement('button');nb.type='button';nb.hidden=true;nb.dataset.newday=ds;document.body.append(nb);nb.click();nb.remove()}
document.addEventListener('click',e=>{const dn=e.target.closest('#cal .d[data-sel] .top');if(dn&&!e.target.closest('[data-open]')){e.stopPropagation();const ds=dn.closest('.d').dataset.sel;S.selDay=ds;newOn(ds);return}
  const cc=e.target.closest('[data-ccday]');if(cc&&cc.getAttribute('aria-pressed')==='true'){e.stopPropagation();newOn(cc.dataset.ccday)}},true);

/* ---- גרירה כללית (עכבר ומגע): קנבן ומשימות. ההעברה מעדכנת סטטוס ותיוגים, עם ביטול ---- */
let dragSwallow=0;document.addEventListener('click',e=>{if(Date.now()<dragSwallow){e.stopPropagation();e.preventDefault()}},true);
function pdrag(o){let st=null;
  document.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button,select,input,a,.check'))return;const el=e.target.closest(o.item);if(!el)return;st={el,x:e.clientX,y:e.clientY,on:false,id:e.pointerId,t:e.pointerType,at:Date.now()}},true);
  document.addEventListener('pointermove',e=>{if(!st||e.pointerId!==st.id)return;const dx=e.clientX-st.x,dy=e.clientY-st.y;
    if(!st.on){if(st.t==='touch'&&Date.now()-st.at<280){if(Math.hypot(dx,dy)>8)st=null;return}if(Math.hypot(dx,dy)<6)return;st.on=true;
      const r=st.el.getBoundingClientRect();const g=st.el.cloneNode(true);g.classList.add('drag-ghost');g.style.cssText=`position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;z-index:90;pointer-events:none`;
      document.body.append(g);st.g=g;st.ox=e.clientX-r.left;st.oy=e.clientY-r.top;st.el.classList.add('drag-src');document.documentElement.classList.add('dragging')}
    e.preventDefault();st.g.style.left=(e.clientX-st.ox)+'px';st.g.style.top=(e.clientY-st.oy)+'px';
    const t=document.elementsFromPoint(e.clientX,e.clientY).map(x=>x.closest&&x.closest(o.target)).find(Boolean);document.querySelectorAll('.drop-over').forEach(x=>x!==t&&x.classList.remove('drop-over'));if(t)t.classList.add('drop-over');st.tg=t},{passive:false});
  const end=e=>{if(!st||e.pointerId!==st.id)return;const s=st;st=null;if(!s.on)return;s.g.remove();s.el.classList.remove('drag-src');document.documentElement.classList.remove('dragging');
    document.querySelectorAll('.drop-over').forEach(x=>x.classList.remove('drop-over'));dragSwallow=Date.now()+350;if(s.tg&&e.type==='pointerup')o.drop(s.el,s.tg,e)};
  document.addEventListener('touchmove',e=>{if(st&&st.t==='touch'&&Date.now()-st.at>=280)e.preventDefault()},{passive:false});
  document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end)}
/* קנבן: שינוי סטטוס + התיוגים שנגזרים ממנו */
function statusPatch(it,to){const p={status:to},u={status:it.status||'todo'};
  if(to==='review'&&!it.waitingOn){p.waitingOn='mendy';u.waitingOn=it.waitingOn||null}
  if(it.status==='review'&&to!=='review'&&it.waitingOn==='mendy'){p.waitingOn=null;u.waitingOn='mendy'}
  if(to==='done'){p.doneAt=new Date().toISOString();u.doneAt=it.doneAt||null;if(it.blocked&&it.blocked.on){p.blocked={...it.blocked,on:false};u.blocked=it.blocked}}
  if(it.status==='done'&&to!=='done'){p.doneAt=null;u.doneAt=it.doneAt||null}
  return [p,u]}
pdrag({item:'#kanban .kc[data-open]',target:'#kanban .col[data-col]',drop(el,col){const id=el.dataset.open,it=S.items[id],to=col.dataset.col;if(!it||(it.status||'todo')===to)return;
  const [p,u]=statusPatch(it,to);saveItem(id,p);if(to==='done')stamp();log(`העביר את "${it.title}" ל${STATUS[to]}`,id);
  toastUndo(`"${it.title}" עבר ל${STATUS[to]}${p.waitingOn==='mendy'?' · ממתין למענדי':''}`,()=>saveItem(id,u))}});
new MutationObserver(()=>document.querySelectorAll('#kanban [draggable="true"]').forEach(c=>c.setAttribute('draggable','false'))).observe(document.querySelector('#kanban')||document.body,{childList:true,subtree:true});
/* משימות: עליי / קלוד ברקע / מחכה לאחרים */
function rowKey(r){const st=r.querySelector('[data-step]');if(st)return{id:st.dataset.step,i:+st.dataset.i};const d=r.querySelector('[data-done]');return d?{id:d.dataset.done,i:null}:null}
function applyLane(k,lane,who){const it=S.items[k.id];if(!it)return;const step=k.i!=null?(it.steps||[])[k.i]:null;const name=step?step.t:it.title;
  if(step){const old={owner:step.owner||null,bg:!!step.bg};const np=lane==='bg'?{bg:true}:{owner:lane==='me'?ME():who,bg:false};setStep(k.id,k.i,np);toastUndo(`"${name}" הועבר`,()=>setStep(k.id,k.i,old))}
  else{const old={owner:it.owner||null,claudeCan:!!it.claudeCan,blocked:it.blocked||null};const np=lane==='bg'?{claudeCan:true}:{owner:lane==='me'?ME():who,claudeCan:false};
    if(lane==='me'&&it.blocked&&it.blocked.on)np.blocked={...it.blocked,on:false};saveItem(k.id,np);toastUndo(`"${name}" הועבר`,()=>saveItem(k.id,old))}
  log(`העביר את "${name}" ל${lane==='me'?'עליי':lane==='bg'?'קלוד ברקע':'מחכה ל'+((P(who)||{}).name||'')}`,k.id)}
function pickWho(x,y,cb){$1('#whoDrop')?.remove();const p=document.createElement('div');p.id='whoDrop';p.className='hidpop';
  const ids=Object.keys(S.people||{}).filter(i=>i!==ME()&&i!=='claude');
  p.innerHTML=`<div class="hp-h">על מי זה מחכה?</div>${ids.map(i=>`<button type="button" class="hp-r" data-who="${esc(i)}"><span style="display:flex;align-items:center;gap:8px">${av(i)}${esc(S.people[i].name||'')}</span><em>בחירה</em></button>`).join('')}`;
  p.style.top=Math.min(y,innerHeight-60-ids.length*44)+'px';p.style.left=Math.max(8,Math.min(x-140,innerWidth-290))+'px';document.body.append(p);
  const close=()=>{p.remove();document.removeEventListener('pointerdown',out,true)};const out=e=>{if(!p.contains(e.target))close()};setTimeout(()=>document.addEventListener('pointerdown',out,true));
  p.addEventListener('click',e=>{const b=e.target.closest('[data-who]');if(b){close();cb(b.dataset.who)}})}
pdrag({item:'#v-tasks .trow',target:'#v-tasks .lane',drop(el,lane,e){const k=rowKey(el);if(!k)return;const L=lane.querySelector('#laneMe')?'me':lane.querySelector('#laneBg')?'bg':lane.querySelector('#laneWait')?'wait':null;
  if(!L||el.closest('.lane')===lane)return;if(L==='wait')pickWho(e.clientX,e.clientY,w=>applyLane(k,'wait',w));else applyLane(k,L)}});

function paintV22(){try{renderDayNow();wireCal();renderAgenda();dressRows();meterToggle();battery()}catch(e){console.error(e)}}
const _ra22=window.renderAll;window.renderAll=function(){const r=_ra22.apply(this,arguments);paintV22();return r};
new MutationObserver(()=>{if(typeof S!=='undefined'&&S.loaded)dressRows()}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});

/* תאריך גם לפני שהנתונים נטענים */
paintV21();meterToggle();battery();
if(typeof S!=='undefined'&&S.loaded&&window.renderAll)renderAll();
})();
