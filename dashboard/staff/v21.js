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
function renderDayNow(){const el=ensureDayNow();if(!el||typeof S==='undefined'||!S.loaded)return;const today=iso(TODAY);const ds=dnSel||today;const d=parse(ds);const h=hebParts(d);
  const {par,ev}=dayList(ds);const nC=ev.filter(e=>TYPE22[e.type]?.g==='c').length,nT=ev.filter(e=>TYPE22[e.type]?.g==='t').length,nE=ev.filter(e=>TYPE22[e.type]?.g==='e').length;
  const cnt=[nT?`${nT} משימות ויעדים`:'',nC?`${nC} תוכן`:'',nE?`${nE} אירועים`:''].filter(Boolean).join(' · ')||'יום פנוי';
  const isT=ds===today;const ttl=isT?'מה יש לנו היום':d<TODAY?`מה היה לנו ביום ${HDOW[d.getDay()]}`:`מה יש לנו ביום ${HDOW[d.getDay()]}`;
  const order={t:0,c:1,e:2};const sorted=ev.slice().sort((a,b)=>(order[TYPE22[a.type]?.g]??3)-(order[TYPE22[b.type]?.g]??3)||evDone(a)-evDone(b));
  const MAX=3,shown=sorted.slice(0,MAX),more=sorted.length-shown.length;
  const empty=`<div class="empty dn-empty">${window.MT_IMG&&MT_IMG['e-dayPanel']?`<img class="icon-3d" src="${MT_IMG['e-dayPanel']}" alt="">`:''}<b>יום פנוי</b><span>אין משימות, תוכן או אירועים ביום הזה.</span></div>`;
  el.innerHTML=`<div class="card-head"><h3 id="dnH">${esc(ttl)}</h3>${isT?'':`<button type="button" class="link-sm dn-today" data-dntoday="1">חזרה להיום</button>`}</div>
    <div class="hcal-detail dn-detail"><div class="big"><b>${gem(h.day)}</b><span>${HDOW[d.getDay()]}</span></div>
      <span class="date">${esc(new Intl.DateTimeFormat('he-IL',{day:'numeric',month:'long',year:'numeric'}).format(d))}</span>
      <span class="count">${esc(cnt)} · ${esc(gem(h.day,true)+' ב'+h.mon)}${par?' · '+esc(par.label):''}</span>
      <span class="dn-act"><button class="btn btn-brand btn-sm" type="button" data-newday="${ds}">${DS.icon('plus','ico-sm')}הוסף</button></span></div>
    <div class="dn-list">${shown.length?shown.map(e=>rowHtml(e,'row-tile dn-row')).join(''):empty}</div>
    <button type="button" class="dn-agenda" data-agenda="${ds}"><span>${DS.icon('calendar','ico-sm')}על סדר היום</span><em>${more>0?`ועוד ${more}`:'הלו״ז המלא'}${DS.icon('chevL','ico-sm')}</em></button>`}
/* הלוח שולט ביום שמוצג: כל בחירת יום בלוח (הוא מצייר את עצמו מחדש) מעדכנת את האזור */
function wireCal(){const root=$1('#mtCal');if(!root||root._dn)return;root._dn=1;
  new MutationObserver(()=>{const k=root.querySelector('.hcal-day[aria-pressed="true"]')?.dataset.k;if(k&&k!==(dnSel||iso(TODAY))){dnSel=k;renderDayNow()}}).observe(root,{childList:true})}
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

/* ---- 3. מדד העבודה כסוללה (אותו ציון ואותו חלון "מה משפיע") ---- */
const BAT=[{c:'#2E8566',t:'רגוע'},{c:'#7FA35A',t:'סביר'},{c:'#F2911C',t:'עמוס'},{c:'#E06A1B',t:'לחוץ'},{c:'#C2412D',t:'עומס יתר'}];
function meterScore(){const v=parseInt($1('#heroMt .ps-score')?.textContent,10);return isFinite(v)?Math.max(0,Math.min(100,v)):0}
function stageOf(v){return Math.min(4,Math.floor(v/20))}
function battery(){const chip=$1('#heroMt .pulse-chip');if(!chip)return;const v=meterScore(),st=stageOf(v);
  let b=chip.querySelector('.batt');if(!b){b=document.createElement('span');b.className='batt';b.setAttribute('aria-hidden','true');b.innerHTML=BAT.map(()=>'<i></i>').join('')+'<u></u>';chip.querySelector('.ps-dot')?.replaceWith(b);chip.classList.add('has-batt')}
  [...b.querySelectorAll('i')].forEach((x,i)=>{const on=v>0&&i<=st;x.className=on?'on':'';x.style.setProperty('--c',on?BAT[st].c:'')});
  const lv=chip.querySelector('.ps-level');if(lv){lv.textContent=BAT[st].t;lv.style.color=BAT[st].c}
  const sc=chip.querySelector('.ps-score');if(sc&&!/%$/.test(sc.textContent))sc.textContent=v+'%';
  chip.setAttribute('aria-label',`מדד העבודה ${v} אחוז, ${BAT[st].t}. לחיצה מציגה מה משפיע`);
  const g=$1('#meterGauge');if(g){g.style.setProperty('--a',(-120+v*2.4)+'deg');g.querySelector('.mg-v').textContent=v+'%';g.querySelector('.mg-l').textContent=BAT[st].t;g.querySelector('.mg-l').style.color=BAT[st].c}}

/* ---- 4. מד עם מחוגה במקום שעון החול, ובחירה ביניהם (נשמר בדפדפן) ---- */
function arcPath(r,a0,a1){const p=a=>{const t=(a-90)*Math.PI/180;return [100+r*Math.cos(t),100+r*Math.sin(t)]};const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${a1-a0>180?1:0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`}
function gaugeSvg(){const Z=[[0,40,'#2E8566'],[40,60,'#7FA35A'],[60,75,'#F2911C'],[75,88,'#E06A1B'],[88,100,'#C2412D']];const A=v=>-120+v*2.4;
  let ticks='';for(let v=0;v<=100;v+=5){const big=v%20===0;const t=(A(v)-90)*Math.PI/180,r1=big?62:66,r2=72;ticks+=`<line x1="${(100+r1*Math.cos(t)).toFixed(2)}" y1="${(100+r1*Math.sin(t)).toFixed(2)}" x2="${(100+r2*Math.cos(t)).toFixed(2)}" y2="${(100+r2*Math.sin(t)).toFixed(2)}" class="${big?'big':''}"/>`;
    if(big){const rn=52;ticks+=`<text x="${(100+rn*Math.cos(t)).toFixed(2)}" y="${(100+rn*Math.sin(t)+3).toFixed(2)}">${v}</text>`}}
  return `<svg viewBox="0 0 200 200" role="img" aria-label="מד העומס"><defs><radialGradient id="mgFace" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".7" stop-color="#E9ECF4" stop-opacity=".75"/><stop offset="1" stop-color="#C9CEDD" stop-opacity=".6"/></radialGradient>
    <linearGradient id="mgRim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#B9BFD0"/></linearGradient><filter id="mgGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
    <circle cx="100" cy="100" r="92" fill="url(#mgFace)" stroke="url(#mgRim)" stroke-width="3"/>
    <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(63,84,153,.12)" stroke-width="1"/>
    ${Z.map(([a,b,c])=>`<path d="${arcPath(78,A(a),A(b)-.6)}" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="butt" opacity=".92"/>`).join('')}
    <path d="${arcPath(78,A(75),A(100))}" stroke="#C2412D" stroke-width="9" fill="none" filter="url(#mgGlow)" opacity=".45"/>
    <g class="mg-ticks">${ticks}</g>
    <text class="mg-load" x="${(100+34*Math.cos((A(90)-90)*Math.PI/180)).toFixed(1)}" y="${(100+34*Math.sin((A(90)-90)*Math.PI/180)+3).toFixed(1)}">עומס</text>
    <g class="mg-needle"><path d="M100 104 L97.6 100 L100 30 L102.4 100 Z" fill="#C2412D"/><path d="M100 104 L97.6 100 L100 30 Z" fill="#E0573F"/></g>
    <circle cx="100" cy="100" r="9" fill="url(#mgRim)" stroke="#fff" stroke-width="2"/><circle cx="100" cy="100" r="3.5" fill="#1F2747"/></svg>`}
function meterToggle(){const hero=$1('#heroMt');if(!hero||hero._mt)return;hero._mt=1;const art=hero.querySelector('.hero-art');if(!art)return;
  const g=document.createElement('div');g.id='meterGauge';g.className='mgauge';g.setAttribute('aria-hidden','true');g.innerHTML=gaugeSvg()+'<div class="mg-read"><b class="mg-v num">0%</b><span class="mg-l"></span></div>';art.append(g);
  const t=document.createElement('div');t.className='meter-tog';t.setAttribute('role','group');t.setAttribute('aria-label','תצוגת מדד העבודה');
  t.innerHTML=`<button type="button" data-meter="glass" aria-label="שעון חול">${'<svg class="ico ico-sm" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/></svg>'}<span>שעון חול</span></button><button type="button" data-meter="gauge" aria-label="מד">${'<svg class="ico ico-sm" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="M12 14l4-5"/><circle cx="12" cy="14" r="1.4" fill="currentColor"/></svg>'}<span>מד</span></button>`;
  hero.append(t);
  const set=m=>{hero.classList.toggle('meter-gauge',m==='gauge');t.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.meter===m)));try{localStorage.setItem('mt-hero-meter',m)}catch(e){}};
  let m='glass';try{m=localStorage.getItem('mt-hero-meter')||'glass'}catch(e){}set(m);
  t.addEventListener('click',e=>{const b=e.target.closest('[data-meter]');if(b){e.stopPropagation();set(b.dataset.meter)}});
  const sc=hero.querySelector('.ps-score');if(sc)new MutationObserver(()=>{if(!/%$/.test(sc.textContent))battery()}).observe(sc,{childList:true,characterData:true,subtree:true})}

function paintV22(){try{renderDayNow();wireCal();renderAgenda();dressRows();meterToggle();battery()}catch(e){console.error(e)}}
const _ra22=window.renderAll;window.renderAll=function(){const r=_ra22.apply(this,arguments);paintV22();return r};
new MutationObserver(()=>{if(typeof S!=='undefined'&&S.loaded)dressRows()}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});

/* תאריך גם לפני שהנתונים נטענים */
paintV21();meterToggle();battery();
if(typeof S!=='undefined'&&S.loaded&&window.renderAll)renderAll();
})();
