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
function dnTick(){clearInterval(dnTimer);if(matchMedia('(prefers-reduced-motion:reduce)').matches||PREF('rotate','on')==='off')return;
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
  root.querySelectorAll('.hcal-day[data-k]').forEach(b=>{const L=typeof dayEvents==='function'?dayEvents(b.dataset.k).filter(e=>e.type!=='par'&&e.type!=='rec'):[];
    const c=L.filter(e=>e.type==='pub'||e.type==='pin'),t=L.filter(e=>e.type==='due'||e.type==='step'||e.type==='evt');
    b.classList.toggle('mk',!!(c.length||t.length));b.querySelector('.mk-bars')?.remove();
    if(c.length||t.length){b.insertAdjacentHTML('beforeend',`<span class="mk-bars" aria-hidden="true">${c.length?'<i class="c"></i>':''}${t.length?'<i class="t"></i>':''}</span>`);
      b._mk=[...c.map(e=>['c',evTitle(e)]),...t.map(e=>['t',evTitle(e)])]}else b._mk=null});
  if(!root.querySelector('.mk-legend'))root.querySelector('.hcal-sheet')?.insertAdjacentHTML('beforeend','<div class="mk-legend" aria-hidden="true"><span><i class="c"></i>תוכן</span><span><i class="t"></i>משימה או יעד</span></div>')}
const MK_IC={c:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="M3.5 15l4.5-4 4 3.5 3-2.5 5.5 4.5"/><circle cx="15.5" cy="9.5" r="1.4"/></svg>',
  t:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.3l2.5 2.5 5-5.3"/></svg>'};
document.addEventListener('pointerover',e=>{const b=e.target.closest&&e.target.closest('#mtCal .hcal-day.mk');let tip=$1('#mkTip');
  if(!b||!b._mk){if(tip&&!(e.target.closest&&e.target.closest('#mtCal .hcal-day.mk')))tip.hidden=true;return}
  if(!tip){tip=document.createElement('div');tip.id='mkTip';tip.className='mk-tip';tip.setAttribute('role','tooltip');document.body.append(tip)}
  tip.innerHTML=b._mk.slice(0,4).map(([k,t])=>`<div class="mk-tr ${k}"><span class="mk-ti">${MK_IC[k]}</span><span>${esc(t)}</span></div>`).join('')+(b._mk.length>4?`<div class="mk-more">ועוד ${b._mk.length-4}</div>`:'');
  tip.hidden=false;const r=b.getBoundingClientRect();const w=Math.min(260,innerWidth-16);tip.style.width='max-content';tip.style.maxWidth=w+'px';const tw=tip.offsetWidth;
  tip.style.left=Math.max(8,Math.min(innerWidth-tw-8,r.left+r.width/2-tw/2))+'px';tip.style.top=(r.bottom+6)+'px'});
function wireCal(){const root=$1('#mtCal');if(!root)return;decorateCal(root);if(root._dn)return;root._dn=1;
  new MutationObserver(()=>{if(root._busy)return;root._busy=1;decorateCal(root);root._busy=0;const k=root.querySelector('.hcal-day[aria-pressed="true"]')?.dataset.k;if(k&&k!==(dnSel||iso(TODAY))){dnSel=k;renderDayNow()}}).observe(root,{childList:true})}
document.addEventListener('click',e=>{if(!e.target.closest('[data-dntoday]'))return;dnSel=null;const b=$1(`#mtCal .hcal-day[data-k="${iso(TODAY)}"]`);
  if(b)b.click();else{const c=$1('#miniCal');if(c){c.innerHTML='';window.renderMiniCal&&renderMiniCal();wireCal()}}renderDayNow()});

/* ---- "על סדר היום": עמוד מלא בהשראת "My Day" של Any.do — רקע חד מלא, כרטיס תאריך,
   משימות בשקיפות, הצעות לצרף להיום, ו"7 הימים הקרובים" בעמודות (גרירה בין ימים) ---- */
let agDay=null,agTab='day',agQ='';
window.MT_WALLS=__WALLSJSON__;const WALL_DEF='lake';
function curWall(){const r=document.documentElement;const v=getComputedStyle(r).getPropertyValue('--wall').trim();return r.dataset.wp&&r.dataset.wp.startsWith('ph-')?v:null}
function ensureAgenda(){let el=$1('#agendaPage');if(el)return el;el=document.createElement('section');el.id='agendaPage';el.className='agp';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','agH');document.body.append(el);return el}
const isOpenUnit=u=>!u.done&&!(u.item&&u.item.status==='done');
function uKey(u){return u.step?{id:u.item.id,i:u.idx}:{id:u.item.id,i:null}}
function crumb(it,step){const ch=(typeof CHANNEL!=='undefined'&&CHANNEL[it.channel])||(typeof KIND!=='undefined'&&KIND[it.kind])||'';return step?`${it.title}${ch?' › '+ch:''}`:(ch||'')}
function chk(e){const it=e.it||{};if(!it.id||e.virtual||e.type==='rec'||e.type==='evt')return '<span class="agx-dot"></span>';
  return e.type==='step'?`<button class="check ${evDone(e)?'on':''}" data-step="${esc(it.id)}" data-i="${e.si}" aria-label="סמן בוצע"></button>`:`<button class="check ${evDone(e)?'on':''}" data-done="${esc(it.id)}" aria-label="סמן בוצע"></button>`}
function taskCard(e,ds){const it=e.it||{};const open=it.id&&!e.virtual?`data-open="${esc(it.id)}"`:'';const T=TYPE22[e.type]||TYPE22.due;
  const dragAttr=it.id&&!e.virtual&&/pub|due|step/.test(e.type)?`data-agmove="${esc(it.id)}|${e.type}|${e.si??''}|${ds}"`:'';
  return `<div class="agx-card${evDone(e)?' done':''}" ${dragAttr}>${chk(e)}<div class="agx-t" ${open} ${open?'role="button" tabindex="0"':''}><small>${DS.icon('box','ico-sm')}${esc(e.type==='step'?crumb(it,1):T.t+(crumb(it)?' · '+crumb(it):''))}</small><b>${esc(evTitle(e))}</b></div>${personBadge(ownerOf(e),it)}</div>`}
function suggestions(ds){if(typeof units!=='function')return[];const today=iso(TODAY);
  return units(false).filter(u=>isOpenUnit(u)&&(!u.due||u.due<today)&&u.due!==ds&&(u.owner===ME()||!u.owner)).filter(u=>!agQ||(u.title+' '+(u.parent||'')).includes(agQ))
    .sort((a,b)=>(a.due?0:1)-(b.due?0:1)||String(a.due||'').localeCompare(String(b.due||''))).slice(0,30)}
function renderAgenda(){const el=ensureAgenda();if(el.hidden||typeof S==='undefined'||!S.loaded)return;const today=iso(TODAY);const ds=agDay||today;const d=parse(ds);const h=hebParts(d);
  const wall=curWall();el.style.setProperty('--agbg',wall||`url("${(window.MT_WALLS||{})[WALL_DEF]||''}")`);
  const {par,ev}=dayList(ds);const evs=ev.filter(e=>e.type==='evt'||e.type==='rec');const tasks=ev.filter(e=>e.type!=='evt'&&e.type!=='rec');
  const n=firstName();const sub=tasks.length?`${tasks.filter(e=>!evDone(e)).length} דברים פתוחים ${ds===today?'להיום':'ליום הזה'}${tasks.some(evDone)?` · ${tasks.filter(evDone).length} כבר בוצעו`:''}`:'יום נקי. אפשר לצרף משימות מההצעות';
  const dateCard=`<div class="agx-date"><div class="agx-dd"><span>${HDOW[d.getDay()]}</span><b class="num">${d.getDate()}</b><em>${esc(new Intl.DateTimeFormat('he-IL',{month:'long'}).format(d))}</em></div>
    <div class="agx-ev">${evs.length?evs.map(e=>`<div class="agx-evr" ${e.it&&e.it.id?`data-open="${esc(e.it.id)}" role="button" tabindex="0"`:''}><i style="--c:${TYPE22[e.type].c}"></i><b>${esc(evTitle(e))}</b><span>${e.type==='rec'?'קבוע':'אירוע'}</span></div>`).join(''):`<p>אין אירועים מתוזמנים ${ds===today?'להיום':'ליום הזה'}</p>`}
      <span class="agx-heb">${esc(gem(h.day,true)+' ב'+h.mon)}${par?' · '+esc(par.label):''}</span></div></div>`;
  const dayView=`<div class="agx-main"><h2 id="agH" class="agx-hi">${esc(GREET(new Date().getHours()))}${n?', '+esc(n):''}<i></i></h2><p class="agx-sub">${esc(sub)}</p>${dateCard}
      <div class="agx-list">${tasks.map(e=>taskCard(e,ds)).join('')}</div>
      <div class="agx-add"><button type="button" class="agx-addb" data-newday="${ds}">${DS.icon('plus','ico-sm')}הוספת משימה ${ds===today?'להיום':'ליום הזה'}</button><button type="button" class="agx-wall" data-agwall="1" aria-label="החלפת רקע" style="background-image:var(--agbg)"></button></div></div>
    <aside class="agx-sug" aria-label="הצעות להיום"><div class="agx-sh">${DS.icon('sparkle','ico-sm')}<b>הצעות ${ds===today?'להיום':'ליום הזה'}</b></div>
      <label class="agx-flt"><span class="sr-only">סינון</span><input type="search" id="agFlt" placeholder="סינון" value="${esc(agQ)}"></label>
      <div class="agx-sl">${suggestions(ds).map(u=>{const k=uKey(u);return `<div class="agx-s"><button type="button" class="agx-plus" data-agplan="${esc(k.id)}|${k.i??''}" aria-label="צירוף ל${ds===today?'היום':'יום הזה'}">${DS.icon('plus','ico-sm')}</button><div class="agx-t" data-open="${esc(u.item.id)}" role="button" tabindex="0"><small>${DS.icon('box','ico-sm')}${esc(u.parent||(CHANNEL[u.item.channel]||''))}</small><b>${esc(u.title)}</b><em class="${u.due?'late':''}">${u.due?'באיחור · '+esc(fmt(u.due)):'בלי תאריך'}</em></div></div>`}).join('')||'<p class="agx-none">אין הצעות כרגע. כל המשימות שלך מתוזמנות.</p>'}</div></aside>`;
  const days=[...Array(7)].map((_,i)=>{const x=new Date(TODAY);x.setDate(x.getDate()+i);return iso(x)});
  const weekView=`<div class="agx-week" id="agH" tabindex="-1">${days.map((k,i)=>{const dd=parse(k);const L=dayList(k).ev;return `<section class="agx-col" data-agday="${k}"><h3>${i===0?'היום':i===1?'מחר':''} <span>${i<2?HDOW[dd.getDay()]:'יום '+HDOW[dd.getDay()]}</span><em>${dd.getDate()}.${dd.getMonth()+1}</em></h3>
      <div class="agx-cl">${L.map(e=>taskCard(e,k)).join('')}</div><button type="button" class="agx-addb sm" data-newday="${k}">${DS.icon('plus','ico-sm')}הוספה</button></section>`}).join('')}</div>`;
  el.innerHTML=`<div class="agx-bg" aria-hidden="true"></div><div class="agx-in">
    <header class="agx-top"><div class="agx-pill">${DS.icon('calendar')}<b>על סדר היום</b>
      <div class="agx-seg" role="tablist"><button type="button" role="tab" data-agtab="day" aria-selected="${agTab==='day'}">${ds===today?'היום':HDOW[d.getDay()]}</button><button type="button" role="tab" data-agtab="week" aria-selected="${agTab==='week'}">7 הימים הקרובים</button></div>
      ${agTab==='day'?`<span class="agx-nav"><button type="button" data-agstep="-1" aria-label="היום הקודם">${DS.icon('chevR','ico-sm')}</button>${ds!==today?'<button type="button" data-agstep="0">היום</button>':''}<button type="button" data-agstep="1" aria-label="היום הבא">${DS.icon('chevL','ico-sm')}</button></span>`:''}</div>
      <button type="button" class="agx-x" data-agclose="1" aria-label="סגירה">${DS.icon('plus')}</button></header>
    ${agTab==='day'?`<div class="agx-day">${dayView}</div>`:weekView}</div>`;
  const f=el.querySelector('#agFlt');if(f){f.addEventListener('input',()=>{agQ=f.value.trim();const pos=f.selectionStart;renderAgenda();const g=$1('#agFlt');if(g){g.focus();g.setSelectionRange(pos,pos)}})}}
function openAgenda(ds){agDay=ds||dnSel||iso(TODAY);const el=ensureAgenda();el.hidden=false;document.documentElement.classList.add('agp-open');renderAgenda();el.querySelector('.agx-x')?.focus();if(location.hash!=='#agenda')history.pushState(null,'','#agenda')}
function closeAgenda(back){const el=$1('#agendaPage');if(!el||el.hidden)return;el.hidden=true;document.documentElement.classList.remove('agp-open');if(back&&location.hash==='#agenda')history.back();$1('[data-agenda]')?.focus()}
/* צירוף הצעה ליום: נותן לה את התאריך (שלב: יעד השלב; משימה: יעד) */
function planOn(id,i,ds){const it=S.items[id];if(!it)return;if(i!==''&&i!=null){const st=(it.steps||[])[+i];if(!st)return;const old=st.due||null;setStep(id,+i,{due:ds});toastUndo(`"${st.t}" צורף ל${ds===iso(TODAY)?'היום':fmt(ds)}`,()=>setStep(id,+i,{due:old}))}
  else{const old=it.due||null;saveItem(id,{due:ds});toastUndo(`"${it.title}" צורף ל${ds===iso(TODAY)?'היום':fmt(ds)}`,()=>saveItem(id,{due:old}))}log(`צירף ל${fmt(ds)}: ${(i!==''&&i!=null)?(it.steps[+i]||{}).t:it.title}`,id)}
/* גרירה בין ימים ב"7 הימים הקרובים" */
function moveTo(spec,to){const [id,type,si,from]=spec.split('|');const it=S.items[id];if(!it||from===to)return;
  if(type==='step'){const st=(it.steps||[])[+si];if(!st)return;const old=st.due||null;setStep(id,+si,{due:to});toastUndo(`"${st.t}" הוזז ל${fmt(to)}`,()=>setStep(id,+si,{due:old}))}
  else{const f=type==='pub'?'publishAt':'due';const old=it[f]||null;saveItem(id,{[f]:to});toastUndo(`"${it.title}" הוזז ל${fmt(to)}`,()=>saveItem(id,{[f]:old}))}log(`הזיז את "${it.title}" ל${fmt(to)}`,id)}
pdrag({item:'#agendaPage .agx-card[data-agmove]',target:'#agendaPage .agx-col[data-agday]',drop(el,col){moveTo(el.dataset.agmove,col.dataset.agday)}});
document.addEventListener('click',e=>{const a=e.target.closest('[data-agenda]');if(a){openAgenda(a.dataset.agenda);return}
  if(e.target.closest('[data-agclose]')){closeAgenda(true);return}
  const tb=e.target.closest('[data-agtab]');if(tb){agTab=tb.dataset.agtab;renderAgenda();return}
  const pl=e.target.closest('[data-agplan]');if(pl){const [id,i]=pl.dataset.agplan.split('|');planOn(id,i,agDay||iso(TODAY));return}
  if(e.target.closest('[data-agwall]')){e.stopPropagation();const b=document.getElementById('bgT');if(b)b.click();return}
  const s=e.target.closest('[data-agstep]');if(s){const n=+s.dataset.agstep;if(!n)agDay=iso(TODAY);else{const d=parse(agDay||iso(TODAY));d.setDate(d.getDate()+n);agDay=iso(d)}renderAgenda();return}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$1('#agendaPage:not([hidden])')&&!document.querySelector('.drawer.on,.modal:not([hidden]),#bgPop')){closeAgenda(true)}});
addEventListener('popstate',()=>{if(location.hash!=='#agenda')closeAgenda(false);else if($1('#agendaPage')?.hidden)openAgenda(agDay)});
new MutationObserver(()=>{if($1('#agendaPage:not([hidden])'))renderAgenda()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-wp']});

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
  let m='glass';try{m=localStorage.getItem('mt-hero-meter')||'glass'}catch(e){}if(!MODES.includes(m))m='glass';set(m);hero._setMeter=set;
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

/* ---- ההירו בלי משבצת, והבריף ככפתור מתחת לברכה שפותח כרטיסיות לפי נושא ----
   התאריך (נמצא ב"מה יש לנו היום"), שורת הסיכום וכפתורי ההירו הוסתרו; מה שאין במקום אחר עבר לכרטיסיות.
   הכפתורים הישנים נשארים ב-DOM (מוסתרים), כי הסרגל והקוד הישן לוחצים עליהם */
const BRIEF_ICO={m:'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M3 18h18M6.5 18a5.5 5.5 0 0 1 11 0"/><path d="M12 6.5V4M4.6 10.6 3 9M19.4 10.6 21 9M8 8l-1-1.6M16 8l1-1.6"/></svg>',
  d:'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
  e:'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/><path d="M16.5 3.5v3M15 5h3"/></svg>'};
function briefTime(){const h=new Date().getHours();return h>=4&&h<12?{k:'m',t:'בריף בוקר'}:h<17?{k:'d',t:'בריף צהריים'}:{k:'e',t:h<21?'בריף ערב':'בריף לילה'}}
let briefOpen=false;try{briefOpen=localStorage.getItem('mt-brief-open')==='1'}catch(e){}
function heroTrim(){const hero=$1('#heroMt');if(!hero)return;hero.classList.add('hero-free');
  hero.querySelector('.hero-cta')?.removeAttribute('data-tour');
  let b=$1('#briefBtn');if(!b){b=document.createElement('button');b.type='button';b.id='briefBtn';b.className='brief-btn';b.dataset.tour='cta';b.setAttribute('aria-controls','briefDeck');
    hero.querySelector('#greet')?.after(b)}
  const bt=briefTime();const n=(S&&S.att||[]).length;const urgent=(S&&S.att||[]).filter(a=>a.type==='blocked'||a.type==='late').length;
  b.setAttribute('aria-expanded',String(briefMode()==='modal'?!!$1('#briefModal:not([hidden])'):briefOpen));b.setAttribute('aria-haspopup',briefMode()==='modal'?'dialog':'false');b.innerHTML=`<span class="bb-ic">${BRIEF_ICO[bt.k]}</span><span class="bb-tx"><b>${bt.t}</b><small>${n?`${n} דברים מחכים${urgent?` · ${urgent} דחופים`:''}`:'הכול רגוע'}</small></span><span class="bb-ch">${DS.icon('chevD','ico-sm')}</span>`}
function ensureDeck(){let d=$1('#briefDeck');if(d)return d;d=document.createElement('section');d.id='briefDeck';d.className='brief-deck';d.setAttribute('aria-label','בריף');($1('#dayNow')||$1('#heroMt')).after(d);return d}
/* כרטיסיות הבריף בסגנון כרטיס מוצק: צבע אחד לכל נושא, שורת מטא, כותרת, מספר גדול, פס שלבים עם תוויות,
   לוח מידע בשלוש עמודות, אנשים ופעולה. אותן לחיצות כמו קודם */
const BC_COL={gold:1,cream:1,royal:1,plum:1,orange:1,paper:1,navy:1,sage:1};
function bCard(o){const bar=o.bar&&o.bar.length?`<div class="bc-steps">${o.bar.map(x=>`<div class="bc-st ${x.on?'on':''}" ${x.attrs||''}><i></i><span>${esc(x.l)}${x.v!=null?` <b class="num">${x.v}</b>`:''}</span></div>`).join('')}</div>`:'';
  const panel=o.panel&&o.panel.length?`<div class="bc-panel">${o.panel.map(x=>`<div ${x.attrs||''}><small>${esc(x.k)}</small><b>${x.v}</b></div>`).join('')}</div>`:'';
  const ppl=o.people&&o.people.length?`<div class="bc-ppl">${o.people.slice(0,3).map(id=>`<span class="bc-pp" data-list="who:${esc(id)}" role="button" tabindex="0"><span class="avatar">${av(id)}</span>${esc(((P(id)||{}).name||'').split(/\s+/)[0])}</span>`).join('')}</div>`:'';
  return `<article class="bcard bc-${o.color||'cream'}" style="--i:${o.i}">
    <div class="bc-meta"><span>${o.icon}${esc(o.meta||'')}</span>${o.pill?`<span class="bc-pill">${esc(o.pill)}</span>`:''}</div>
    <h3 class="bc-title">${esc(o.k)}</h3>${o.sub?`<p class="bc-sub">${o.sub}</p>`:''}
    ${o.big?`<div class="bc-big">${o.big}</div>`:''}${bar}${panel}${o.rows&&o.rows.length?`<div class="bc-rows">${o.rows.join('')}</div>`:''}${ppl}
    ${o.act?`<footer>${o.act}</footer>`:''}</article>`}
function bRow(attrs,av_,title,sub){return `<button type="button" class="bc-row" ${attrs}>${av_||''}<span class="bc-rt"><b>${esc(title)}</b>${sub?`<small>${esc(sub)}</small>`:''}</span><span class="chev">‹</span></button>`}
function buildCards(){
  const att=S.att||[];const its=items();const cards=[];let i=1;const ico=n=>DS.icon(n,'ico-sm');const tnow=new Date().toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'});
  const cnt=t=>att.filter(a=>a.type===t).length;const who=a=>(a.it.blocked&&a.it.blocked.who)||a.it.waitingOn||a.it.owner;
  const uniq=a=>[...new Set(a.filter(Boolean))];
  cards.push(bCard({i:i++,color:'gold',icon:ico('bell'),meta:`עודכן ${tnow}`,k:'צריך אותך',sub:$1('#b8h')?.innerHTML||'',pill:att.length?`${att.length} פתוחים`:'הכול טופל',
    bar:[['blocked','תקוע'],['late','באיחור'],['urgent','דחוף'],['review','לאישור'],['due','דדליין']].map(([t,l])=>({l,v:cnt(t),on:cnt(t)>0})),
    rows:att.slice(0,3).map((a,n)=>bRow(`data-res="${n}"`,personBadge(who(a),a.it),a.title||a.it.title,a.sub)),
    people:uniq(att.map(who)).filter(x=>x!=='claude'),
    act:att.length?`<button type="button" class="bc-go" data-bproxy="startBtn">${DS.icon('arrowUpLeft','ico-sm')}מה מחכה לנו</button>`:''}));
  const proj=its.filter(x=>x.kind==='project'&&x.status!=='done');const mine=typeof units==='function'?units(false).filter(u=>!u.done&&u.owner===ME()).length:0;
  const work=its.filter(x=>x.kind!=='event'&&x.kind!=='recurring'&&x.status!=='done');const sc=st=>work.filter(x=>(x.status||'todo')===st).length;
  cards.push(bCard({i:i++,color:'royal',icon:ico('box'),meta:'כל העבודה',k:'הפרויקטים',big:`<span class="num">${proj.length}</span><em>פעילים</em>`,
    bar:[['idea','רעיון'],['todo','לעשות'],['doing','בהפקה'],['review','לאישור'],['scheduled','מתוזמן']].map(([st,l])=>({l,v:sc(st),on:sc(st)>0,attrs:`data-list="status:${st}" role="button" tabindex="0"`})),
    panel:[{k:'פרויקטים',v:`<span class="num">${proj.length}</span>`},{k:'צעדים עליך',v:`<span class="num">${mine}</span>`,attrs:`data-go="#tasks" role="button" tabindex="0"`},{k:'תשומת לב',v:`<span class="num">${att.length}</span>`}],
    rows:proj.slice().sort((a,b)=>String(a.due||'9').localeCompare(String(b.due||'9'))).slice(0,3).map(p=>{const pr=progress(p);return `<button type="button" class="bc-row" data-open="${esc(p.id)}">${thumbOf(p)}<span class="bc-rt"><b>${esc(p.title)}</b><span class="bc-bar"><i style="width:${pr}%"></i></span></span><span class="bc-pc num">${pr}%</span></button>`}),
    act:`<button type="button" class="bc-go" data-go="#gantt">${DS.icon('chart','ico-sm')}לגאנט</button>`}));
  const rev=its.filter(x=>x.status==='review');
  cards.push(bCard({i:i++,color:'plum',icon:ico('clock'),meta:'מענדי בלוי',k:'ממתין לאישור',big:`<span class="num">${rev.length}</span><em>${rev.length===1?'פריט':'פריטים'}</em>`,pill:rev.length?'ממתין':'אין',
    rows:rev.slice(0,3).map(x=>bRow(`data-open="${esc(x.id)}"`,thumbOf(x),x.title,(CHANNEL[x.channel]||''))),people:rev.length?['mendy']:[],
    act:rev.length?`<button type="button" class="bc-go" data-list="status:review">${DS.icon('users','ico-sm')}כל מה שממתין</button>`:''}));
  const y=typeof yarid==='function'?yarid():null;if(y&&y.start){const dn=daysTo(y.start);if(dn>=0){const camp=its.filter(x=>x.kind==='project'&&/יריד|קמפיין/.test(x.title||'')&&x.id!==y.id);const cp=camp.length?Math.round(camp.reduce((s,p)=>s+progress(p),0)/camp.length):null;
    cards.push(bCard({i:i++,color:'orange',icon:ico('calendar'),meta:esc(fmt(y.start)+(y.due&&y.due!==y.start?' – '+fmt(y.due):'')),k:'יריד החסידות',sub:esc(y.title||''),big:`<span class="num">${dn}</span><em>${dn===1?'יום':'ימים'}</em>`,
      bar:cp!=null?[20,40,60,80,100].map((v,n)=>({l:['התחלה','רעיונות','הפקה','עריכה','מוכן'][n],on:cp>=v-10})):null,
      panel:cp!=null?[{k:'הקמפיין',v:`<span class="num">${cp}%</span>`},{k:'פרויקטים',v:`<span class="num">${camp.length}</span>`},{k:'נשארו',v:`<span class="num">${dn}</span> ימים`}]:null,
      act:`<button type="button" class="bc-go" data-open="${esc(y.id)}">${DS.icon('arrowUpLeft','ico-sm')}לפרטי היריד</button>`}))}}
  const wk=its.filter(x=>x.channel==='weekly'&&x.kind!=='project'&&x.publishAt&&x.publishAt>=iso(TODAY)&&x.status!=='done').sort((a,b)=>a.publishAt.localeCompare(b.publishAt))[0];
  if(wk){const order=['todo','doing','review','scheduled','done'];const k=order.indexOf(wk.status||'todo');
    cards.push(bCard({i:i++,color:'paper',icon:ico('book'),meta:`עולה ${fmt(wk.publishAt)}`,k:'הפוסט השבועי',sub:esc(wk.title),big:`<span class="bc-cover">${thumbOf(wk)}</span>`,
      bar:['לעשות','בהפקה','לאישור','מתוזמן','פורסם'].map((l,n)=>({l,on:n<=k})),people:uniq([wk.owner,'mendy']),
      act:`<button type="button" class="bc-go" data-open="${esc(wk.id)}">${DS.icon('arrowUpLeft','ico-sm')}לפוסט</button>`}))}
  const bgU=typeof units==='function'?units(false).filter(u=>u.bg&&!u.done):[];const q=bgU.filter(u=>inQueue(u.key)).length;
  cards.push(bCard({i:i++,color:'navy',icon:ico('sparkle'),meta:'עובד בשבילך',k:'קלוד ברקע',big:`<span class="num">${bgU.length}</span><em>משימות</em>`,
    panel:[{k:'בתור',v:`<span class="num">${q}</span>`},{k:'מחכות לשליחה',v:`<span class="num">${bgU.length-q}</span>`},{k:'זמן משוער',v:esc(fmtEst(bgU.reduce((s,u)=>s+(u.est||0),0),true)||'—')}],
    rows:bgU.slice(0,2).map(u=>bRow(`data-open="${esc(u.item.id)}"`,'',u.title,u.parent||'')),
    act:`<button type="button" class="bc-go" data-go="#agents">${DS.icon('sparkle','ico-sm')}לקלוד וסוכנים</button>`}));
  const hid=document.querySelectorAll('[data-arrange] > [data-cid][hidden]').length;
  cards.push(bCard({i:i++,color:'sage',icon:ico('sliders'),meta:'תמונת מצב',k:'הלוח שלך',big:`<span class="num">${hid}</span><em>מוסתרים</em>`,sub:'מחזירים כרטיס או מסדרים מחדש.',
    act:`${hid?`<button type="button" class="bc-go" data-bproxy="hiddenBtn">${DS.icon('eye','ico-sm')}המוסתרים</button>`:''}<button type="button" class="bc-go ghost" data-bproxy="arrangeBtn">${DS.icon('sliders','ico-sm')}סידור</button>`}));
  if(PREF('kpis','brief')==='brief'){const k=kpiCard();if(k)cards.unshift(k)}
  return cards}
const briefMode=()=>PREF('briefmode','modal');
function renderDeck(){const d=ensureDeck();if(typeof S==='undefined'||!S.loaded)return;const on=briefOpen&&briefMode()==='inline';d.classList.toggle('open',on);if(!on){d.innerHTML='';return}
  d.innerHTML=`<div class="bd-track">${buildCards().join('')}</div>`}
/* מצב "חלון מעל הכל": כרטיס אחד במרכז, הבא/הקודם, לחיצה בחוץ או Esc סוגרת */
let bmIdx=0;
function ensureBM(){let m=$1('#briefModal');if(m)return m;m=document.createElement('div');m.id='briefModal';m.className='bm';m.hidden=true;m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','בריף');document.body.append(m);return m}
function renderBM(){const m=ensureBM();if(m.hidden)return;const cards=buildCards();if(!cards.length){closeBM();return}bmIdx=(bmIdx+cards.length)%cards.length;const bt=briefTime();
  m.innerHTML=`<div class="bm-stage"><div class="bm-head"><span class="bm-t">${BRIEF_ICO[bt.k]}${bt.t}</span><span class="bm-n num">${bmIdx+1} / ${cards.length}</span></div>
    <div class="bm-card">${cards[bmIdx].replace('<article class="bcard','<article class="bcard bm-c')}<button type="button" class="bm-x" data-bmclose="1" aria-label="סגירה">${DS.icon('plus','ico-sm')}</button></div>
    <div class="bm-nav"><button type="button" class="bm-b" data-bmstep="-1" ${bmIdx===0?'disabled':''}>${DS.icon('chevR','ico-sm')}הקודם</button>
      <span class="bm-dots" aria-hidden="true">${cards.map((_,n)=>`<i class="${n===bmIdx?'on':''}" data-bmgo="${n}"></i>`).join('')}</span>
      ${bmIdx<cards.length-1?`<button type="button" class="bm-b pri" data-bmstep="1">הבא${DS.icon('chevL','ico-sm')}</button>`:`<button type="button" class="bm-b pri" data-bmclose="1">סיום${DS.icon('check','ico-sm')}</button>`}</div></div>`;
  m.querySelector('[data-bmstep="1"],[data-bmclose]')?.focus({preventScroll:true})}
function openBM(){const m=ensureBM();bmIdx=0;m.hidden=false;document.documentElement.classList.add('bm-open');renderBM();$1('#briefBtn')?.setAttribute('aria-expanded','true')}
function closeBM(){const m=$1('#briefModal');if(!m||m.hidden)return;m.hidden=true;document.documentElement.classList.remove('bm-open');$1('#briefBtn')?.setAttribute('aria-expanded','false');$1('#briefBtn')?.focus({preventScroll:true})}
document.addEventListener('click',e=>{const m=$1('#briefModal');if(!m||m.hidden||!m.contains(e.target))return;
  if(e.target===m||e.target.classList.contains('bm-stage')||e.target.closest('[data-bmclose]')){e.stopPropagation();closeBM();return}
  const st=e.target.closest('[data-bmstep]');if(st){e.stopPropagation();bmIdx+=+st.dataset.bmstep;renderBM();return}
  const g=e.target.closest('[data-bmgo]');if(g){e.stopPropagation();bmIdx=+g.dataset.bmgo;renderBM();return}
  if(e.target.closest('[data-open],[data-res],[data-list],[data-go],[data-bproxy],[data-send]'))setTimeout(closeBM,0)},true);
document.addEventListener('keydown',e=>{const m=$1('#briefModal');if(!m||m.hidden)return;if(e.key==='Escape'){closeBM()}else if(e.key==='ArrowLeft'){bmIdx++;renderBM()}else if(e.key==='ArrowRight'&&bmIdx>0){bmIdx--;renderBM()}});
{let sx=null;document.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#briefModal .bm-card'))sx=e.clientX},true);
 document.addEventListener('pointerup',e=>{if(sx==null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>60&&$1('#briefModal:not([hidden])')){bmIdx+=dx>0?1:-1;if(bmIdx<0)bmIdx=0;renderBM()}},true)}
document.addEventListener('click',e=>{const b=e.target.closest('#briefBtn');if(b&&briefMode()==='modal'){openBM();return}if(b){briefOpen=!briefOpen;try{localStorage.setItem('mt-brief-open',briefOpen?'1':'0')}catch(x){}heroTrim();renderDeck();masonry();if(briefOpen)$1('#briefDeck')?.scrollIntoView({behavior:'smooth',block:'nearest'});return}
  const px=e.target.closest('[data-bproxy]');if(px){e.stopPropagation();const t=document.getElementById(px.dataset.bproxy);if(!t)return;const h=t.hidden;t.hidden=false;t.click();t.hidden=h;
    if(px.dataset.bproxy==='hiddenBtn'){const p=$1('#hidPop');if(p){const r=px.getBoundingClientRect();p.style.top=Math.min(innerHeight-300,r.bottom+8)+'px';p.style.right='auto';p.style.left=Math.max(8,Math.min(innerWidth-300,r.left))+'px'}}}},true);

/* ===================== v22e: מדדים בבריף, תזכורות, מה נעשה וקלוד בינתיים, הגדרות ===================== */
const PREF=(k,d)=>{try{const v=localStorage.getItem('mt-pref-'+k);return v==null?d:v}catch(e){return d}};
const SETPREF=(k,v)=>{try{localStorage.setItem('mt-pref-'+k,v)}catch(e){}};
function applyPrefs(){document.documentElement.classList.toggle('kpis-in-brief',PREF('kpis','brief')==='brief')}
applyPrefs();
/* המדדים ככרטיסייה ראשונה בבריף (אותן לחיצות כמו בכרטיסי המדדים) */
function kpiCard(){const ks=[...document.querySelectorAll('#kpis .kpi')];if(!ks.length)return'';
  const cells=ks.map(k=>{const attrs=[...k.attributes].filter(a=>a.name.startsWith('data-')&&a.name!=='data-cid').map(a=>`${a.name}="${esc(a.value)}"`).join(' ');
    return `<button type="button" class="bk-cell" ${attrs}><small>${esc(k.querySelector('.k2')?.textContent||'')}</small><b class="num">${esc(k.querySelector('.v')?.textContent||'')}</b><span>${k.querySelector('.sub')?.innerHTML||''}</span></button>`}).join('');
  return `<article class="bcard bk bc-cream" style="--i:0"><div class="bc-meta"><span>${DS.icon('chart','ico-sm')}היום במספרים</span></div><h3 class="bc-title">המדדים</h3><div class="bk-grid">${cells}</div></article>`}

/* ---- תזכורות: בדף הבית, פריט אחרי פריט, הוספה, והתראה ליד המדד כשמגיע הזמן ---- */
let remIdx=0,remTimer=0,remSig='',remForm=false;
function myReminders(){return items().filter(i=>i.remindAt&&i.status!=='done').sort((a,b)=>a.remindAt.localeCompare(b.remindAt))}
function remWhen(r){const d=new Date(r.remindAt);const ds=iso(d);const t=d.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'});return (ds===iso(TODAY)?'היום':fmt(ds))+' · '+t}
function autoNext(){if(typeof units!=='function')return null;const U=units(false).filter(u=>!u.done&&!u.bg&&(u.owner===ME()||!u.owner));if(typeof sortUnits==='function')U.sort(sortUnits);return U[0]||null}
function ensureRem(){let c=$1('#rem22');if(c)return c;const bento=$1('#v-today>.bento');const att=$1('#attCard');if(!bento)return null;
  c=document.createElement('div');c.id='rem22';c.className='card pane s4 rem22';c.dataset.cid='rem22';c.dataset.cname='תזכורות';(att||bento.lastElementChild).after(c);
  const old=$1('#remind');if(old&&old.closest('[data-arrange]')){let h=$1('#mtHold');if(!h){h=document.createElement('div');h.id='mtHold';h.hidden=true;document.body.append(h)}h.append(old)}return c}
function renderRem(){const c=ensureRem();if(!c||typeof S==='undefined'||!S.loaded)return;const R=myReminders();const nx=autoNext();
  const slides=R.map(r=>({k:'r',h:`<div class="rm-s"><div class="rm-top"><span class="rm-pill ${new Date(r.remindAt)<=new Date()?'due':''}">${DS.icon('bell','ico-sm')}${esc(remWhen(r))}</span></div><div class="rm-big">${esc(r.title)}</div>${r.notes?`<div class="rm-meta">${esc(r.notes)}</div>`:''}
      <div class="rm-act"><button type="button" class="rm-go" data-open="${esc(r.id)}">${DS.icon('arrowUpLeft','ico-sm')}פתיחה</button><button type="button" class="rm-o" data-remsnz="${esc(r.id)}|60">עוד שעה</button><button type="button" class="rm-o" data-done="${esc(r.id)}">בוצע</button></div></div>`}));
  if(nx)slides.push({k:'a',h:`<div class="rm-s"><div class="rm-top"><span class="rm-pill auto">${DS.icon('sparkle','ico-sm')}הדבר הבא שלך</span><span class="rm-urg u${nx.urg}">${esc((typeof URG!=='undefined'&&URG[nx.urg])||'')}</span></div><div class="rm-big">${esc(nx.title)}</div>
      <div class="rm-meta">${nx.parent?`<span>${esc(nx.parent)}</span>`:''}${nx.due?`<span>יעד: ${esc(rel(nx.due))}</span>`:''}${nx.est?`<span>${esc(fmtEst(nx.est,nx.estAI))}</span>`:''}</div>
      <div class="rm-act"><button type="button" class="rm-go" data-open="${esc(nx.item.id)}">${DS.icon('arrowUpLeft','ico-sm')}התחל עכשיו</button>${nx.step?`<button type="button" class="rm-o" data-snooze="${esc(nx.key)}">דחה למחר</button>`:''}</div></div>`});
  const sig=JSON.stringify([R.map(r=>r.id+r.remindAt+r.title),nx&&nx.key,remForm]);if(sig===remSig&&c.querySelector('.rm-head'))return;remSig=sig;
  const tdy=iso(TODAY),inH=new Date(Date.now()+3600e3);const hh=String(inH.getHours()).padStart(2,'0')+':'+String(inH.getMinutes()).padStart(2,'0');
  c.innerHTML=`<div class="rm-head"><h2>${DS.icon('bell','ico-sm')}תזכורות${R.length?`<span class="num">${R.length}</span>`:''}</h2><button type="button" class="rm-add" data-remnew="1" aria-expanded="${remForm}">${DS.icon('plus','ico-sm')}תזכורת</button></div>
    ${remForm?`<form class="rm-form" id="remForm"><input name="t" required placeholder="על מה להזכיר?" aria-label="על מה להזכיר" autocomplete="off"><div class="rm-fr"><input type="date" name="d" value="${tdy}" aria-label="תאריך"><input type="time" name="h" value="${hh}" aria-label="שעה"></div><div class="rm-fr"><button type="submit" class="rm-go">שמירה</button><button type="button" class="rm-o" data-remnew="0">ביטול</button></div></form>`:''}
    <div class="rm-list" aria-live="polite">${slides.map(x=>x.h).join('')||'<div class="empty">אין תזכורות. אפשר להוסיף מ"+ תזכורת".</div>'}</div>${slides.length>1?`<div class="dn-dots rm-dots" aria-hidden="true">${slides.map(()=>'<i></i>').join('')}</div>`:''}`;
  if(remForm)c.querySelector('#remForm input[name=t]')?.focus();remShow(remIdx);remTick()}
function remShow(i){const c=$1('#rem22');if(!c)return;const s=[...c.querySelectorAll('.rm-s')];if(!s.length)return;remIdx=(i+s.length)%s.length;s.forEach((x,n)=>{x.classList.toggle('on',n===remIdx);x.setAttribute('aria-hidden',String(n!==remIdx))});c.querySelectorAll('.rm-dots i').forEach((d,n)=>d.classList.toggle('on',n===remIdx))}
function remTick(){clearInterval(remTimer);if(matchMedia('(prefers-reduced-motion:reduce)').matches||PREF('rotate','on')==='off')return;remTimer=setInterval(()=>{const c=$1('#rem22');if(!c||c.matches(':hover,:focus-within')||remForm||document.hidden)return;remShow(remIdx+1)},5200)}
async function addReminder(t,d,h){const id='rem-'+uid();const at=d+'T'+(h||'09:00');const doc={kind:'task',title:t,status:'todo',owner:ME(),due:d,remindAt:at,priority:2,createdAt:now(),updatedAt:now()};
  S.items[id]=doc;remForm=false;renderAll();toast('התזכורת נשמרה · '+remWhen(doc));try{await S.db.collection('items').doc(id).set(doc)}catch(e){toast('השמירה נכשלה: '+(e.message||e.code))}log(`הוסיף תזכורת "${t}" ל${remWhen(doc)}`,id)}
document.addEventListener('click',e=>{const n=e.target.closest('[data-remnew]');if(n){remForm=n.dataset.remnew==='1'?!remForm:false;remSig='';renderRem();return}
  const z=e.target.closest('[data-remsnz]');if(z){const [id,m]=z.dataset.remsnz.split('|');const it=S.items[id];if(!it)return;const d=new Date(Math.max(Date.now(),new Date(it.remindAt).getTime())+(+m)*60e3);const old=it.remindAt;
    const v=iso(d)+'T'+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');saveItem(id,{remindAt:v});toastUndo(`"${it.title}" נדחה ל${remWhen({remindAt:v})}`,()=>saveItem(id,{remindAt:old}));remNotif();return}});
document.addEventListener('submit',e=>{if(e.target.id!=='remForm')return;e.preventDefault();const f=e.target;const t=f.t.value.trim();if(!t)return;addReminder(t,f.d.value||iso(TODAY),f.h.value)});
/* התראה ליד המדד */
let remSeen=new Set();try{remSeen=new Set(JSON.parse(localStorage.getItem('mt-rem-seen')||'[]'))}catch(e){}
function remNotif(){if(typeof S==='undefined'||!S.loaded)return;const hero=$1('#heroMt');if(!hero)return;const nowD=new Date();
  const due=myReminders().filter(r=>{const t=new Date(r.remindAt);return t<=nowD&&nowD-t<36e6&&!remSeen.has(r.id+'@'+r.remindAt)});
  let n=$1('#remNotif');if(!due.length){n?.remove();return}const r=due[due.length-1];
  if(!n){n=document.createElement('div');n.id='remNotif';n.className='rem-notif';n.setAttribute('role','alert');hero.append(n)}
  const key=r.id+'@'+r.remindAt;if(n.dataset.k!==key&&!n.dataset.k)toast('⏰ '+r.title);n.dataset.k=key;
  n.innerHTML=`<span class="rn-ic">${DS.icon('bell')}</span><span class="rn-tx"><small>תזכורת · ${esc(remWhen(r))}${due.length>1?` · ועוד ${due.length-1}`:''}</small><b>${esc(r.title)}</b></span>
    <span class="rn-act"><button type="button" data-open="${esc(r.id)}" data-remack="${esc(key)}">פתיחה</button><button type="button" data-remsnz="${esc(r.id)}|10">עוד 10 דק׳</button><button type="button" class="rn-x" data-remack="${esc(key)}" aria-label="סגירה">${DS.icon('plus','ico-sm')}</button></span>`}
document.addEventListener('click',e=>{const a=e.target.closest('[data-remack]');if(!a)return;remSeen.add(a.dataset.remack);try{localStorage.setItem('mt-rem-seen',JSON.stringify([...remSeen].slice(-200)))}catch(x){}const n=$1('#remNotif');if(n)n.dataset.k='';setTimeout(remNotif,0)});
setInterval(remNotif,20000);

/* ---- למטה בדף הבית: מה כבר נעשה, ומה אפשר לתת לקלוד בינתיים (קטנים) ---- */
function ensureBottom(){const bento=$1('#v-today>.bento');if(!bento||$1('#bottom22'))return;const w=document.createElement('div');w.id='bottom22';w.className='s12 bottom-row';w.dataset.cid='bottom22';w.dataset.cname='מה נעשה וקלוד בינתיים';
  w.innerHTML='<div class="card pane bottom22" id="done22"></div><div class="card pane bottom22" id="claude22"></div>';bento.append(w)}
let doneMore=false;
function renderBottom(){ensureBottom();if(typeof S==='undefined'||!S.loaded)return;const d=$1('#done22'),c=$1('#claude22');
  if(d&&typeof feedList==='function'){const f=feedList();const L=f.slice(0,doneMore?14:5);
    d.innerHTML=`<div class="b2-head"><h2>${DS.icon('check','ico-sm')}מה כבר נעשה</h2><span class="b2-n">${f.length?`${f.length} פעולות`:''}</span></div>
      <div class="b2-list">${L.map(x=>`<div class="b2-row" ${x.id?`data-open="${esc(x.id)}" role="button" tabindex="0"`:''}><span class="avatar pa">${av(x.who)}</span><span class="b2-t">${x.html}</span><small>${esc(tsRel(x.at))}</small></div>`).join('')||'<div class="empty">עוד אין פעילות. כל סימון "בוצע" יופיע כאן.</div>'}</div>
      ${f.length>5?`<button type="button" class="b2-more" data-donemore="1">${doneMore?'פחות':'עוד '+Math.min(9,f.length-5)}</button>`:''}`}
  if(c&&typeof units==='function'){const bg=units(false).filter(u=>!u.done&&(u.bg||u.item.claudeCan));const waiting=bg.filter(u=>!inQueue(u.key));
    c.innerHTML=`<div class="b2-head"><h2><span class="b2-flame">${DS.icon('sparkle','ico-sm')}</span>קלוד יכול בינתיים</h2>${waiting.length>1?`<button type="button" class="b2-all" data-bproxy="sendAllBg">שלח הכול (${waiting.length})</button>`:''}</div>
      <div class="b2-list">${bg.slice(0,4).map(u=>`<div class="b2-row" data-open="${esc(u.item.id)}" role="button" tabindex="0">${thumbOf(u.item)||'<span class="th22 none"></span>'}<span class="b2-t"><b>${esc(u.title)}</b><small>${esc(u.parent||'')}${u.est?' · '+esc(fmtEst(u.est,u.estAI)):''}</small></span><button type="button" class="b2-send ${inQueue(u.key)?'on':''}" data-send="${esc(u.key)}">${inQueue(u.key)?'בתור':'לקלוד'}</button></div>`).join('')||'<div class="empty">אין כרגע משהו שקלוד יכול להכין. סמן שלב "לקלוד" כדי שיופיע כאן.</div>'}</div>
      ${bg.length>4?`<a class="b2-more" href="#agents">עוד ${bg.length-4} בקלוד וסוכנים</a>`:''}`}}
document.addEventListener('click',e=>{if(e.target.closest('[data-donemore]')){doneMore=!doneMore;renderBottom()}});

/* ---- הגדרות: רקעים, תצוגות והסתרות במקום אחד ---- */
const WTHUMB=__WALLTHUMBS__;
function sideSettings(){const nav=$1('#app .sb-nav');if(!nav||$1('#setBtn'))return;const b=document.createElement('button');b.type='button';b.className='sb-item';b.id='setBtn';
  b.innerHTML=`<span class="i">${DS.icon('settings','ico-sm')}</span><span class="lbl">הגדרות</span>`;const after=nav.querySelector('.sg[data-proxy="arrangeBtn"]')||$1('#tourBtn');(after||nav.lastElementChild).before(b)}
function ensureSet(){let el=$1('#setPanel');if(el)return el;el=document.createElement('section');el.id='setPanel';el.className='setp';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','setH');document.body.append(el);return el}
function seg(name,val,opts){return `<div class="st-seg" role="radiogroup" aria-label="${esc(name)}">${opts.map(([v,t])=>`<button type="button" role="radio" aria-checked="${v===val}" data-setv="${esc(name)}|${esc(v)}">${esc(t)}</button>`).join('')}</div>`}
function renderSet(){const el=ensureSet();if(el.hidden)return;const W=window.MT_WALLDATA;const cur=W?W.get():'';const hero=$1('#heroMt');
  const walls=W?W.NAMES.map(([k,n])=>{const sk=document.documentElement.dataset.skin==='light'?'light':'dark';const ph=k.startsWith('ph-');const src=ph?WTHUMB[k.slice(3)]:W.WALLS[k+'|'+sk];
    return `<button type="button" class="st-wall ${k===cur?'on':''}" data-setwall="${esc(k)}" aria-pressed="${k===cur}"><span style="background-image:url(&quot;${src}&quot;)"></span><em>${esc(n)}</em></button>`}).join(''):'';
  const cards=[...document.querySelectorAll('#v-today [data-arrange] > [data-cid]')].filter(c=>c.dataset.cid!=='brief8');
  el.innerHTML=`<div class="setp-in"><header class="setp-top"><h2 id="setH">${DS.icon('settings')}הגדרות</h2><button type="button" class="setp-x" data-setclose="1" aria-label="סגירה">${DS.icon('plus')}</button></header>
    <section class="st-sec"><h3>רקע</h3><p>לכל הפלטפורמה וגם ל"על סדר היום". הבחירה נשמרת בדפדפן הזה.</p><div class="st-walls">${walls}</div></section>
    <section class="st-sec"><h3>תצוגה</h3>
      <div class="st-row"><span><b>מדד העבודה</b><small>אפשר גם בלחיצה על השעון עצמו</small></span>${seg('meter',hero?.dataset.meter||'glass',[['glass','שעון חול'],['gauge','מד'],['none','בלי']])}</div>
      <div class="st-row"><span><b>המדדים</b><small>ימים ליריד, צעדים, שלבים, תקועים</small></span>${seg('kpis',PREF('kpis','brief'),[['brief','בתוך הבריף'],['card','חלון נפרד']])}</div>
      <div class="st-row"><span><b>איך הבריף נפתח</b><small>כרטיס אחרי כרטיס מעל הכול, או בשורה מתחת לכפתור</small></span>${seg('briefmode',briefMode(),[['modal','חלון מעל הכול'],['inline','בשורה']])}</div>
      <div class="st-row"><span><b>הבריף בשורה בפתיחה</b><small>במצב "בשורה": פתוח או סגור כשנכנסים</small></span>${seg('brief',briefOpen?'open':'closed',[['open','פתוח'],['closed','סגור']])}</div>
      <div class="st-row"><span><b>פתיחת כרטיס</b><small>חלון בצד או במרכז המסך</small></span>${seg('open',document.documentElement.classList.contains('open-center')?'center':'side',[['side','בצד'],['center','במרכז']])}</div>
      <div class="st-row"><span><b>החלפה אוטומטית</b><small>"מה יש לנו היום" והתזכורות עוברים פריט אחרי פריט</small></span>${seg('rotate',PREF('rotate','on'),[['on','פועל'],['off','כבוי']])}</div></section>
    <section class="st-sec"><h3>מה מופיע בתמונת מצב</h3><p>כרטיס כבוי לא נמחק, הוא רק מוסתר.</p><div class="st-cards">${cards.map(c=>`<label class="st-card"><input type="checkbox" data-setcard="${esc(c.dataset.cid)}" ${c.hidden?'':'checked'}><span>${esc(c.dataset.cname||c.dataset.cid)}</span></label>`).join('')}</div>
      <div class="st-btns"><button type="button" class="st-b" data-setarr="1">${DS.icon('sliders','ico-sm')}סידור הלוח בגרירה</button><button type="button" class="st-b ghost" data-resetlayout="1">איפוס הסידור</button></div></section>
    <section class="st-sec"><h3>עזרה</h3><div class="st-btns"><button type="button" class="st-b ghost" data-settour="1">${DS.icon('help','ico-sm')}מדריך למערכת</button></div></section></div>`}
function openSet(){const el=ensureSet();el.hidden=false;document.documentElement.classList.add('setp-open');renderSet();el.querySelector('.setp-x')?.focus()}
function closeSet(){const el=$1('#setPanel');if(!el||el.hidden)return;el.hidden=true;document.documentElement.classList.remove('setp-open');$1('#setBtn')?.focus()}
document.addEventListener('click',e=>{if(e.target.closest('#setBtn')){openSet();return}
  if(!e.target.closest('#setPanel'))return;
  if(e.target.closest('[data-setclose]')||e.target===$1('#setPanel')){closeSet();return}
  const w=e.target.closest('[data-setwall]');if(w&&window.MT_WALLDATA){MT_WALLDATA.apply(w.dataset.setwall);renderSet();return}
  const v=e.target.closest('[data-setv]');if(v){const [k,val]=v.dataset.setv.split('|');
    if(k==='meter')$1('#heroMt')?._setMeter?.(val);
    if(k==='kpis'){SETPREF('kpis',val);applyPrefs();renderDeck()}
    if(k==='brief'){briefOpen=val==='open';try{localStorage.setItem('mt-brief-open',briefOpen?'1':'0')}catch(x){}heroTrim();renderDeck()}
    if(k==='open'){const isC=document.documentElement.classList.contains('open-center');if((val==='center')!==isC)$1('#openModeT')?.click()}
    if(k==='rotate'){SETPREF('rotate',val);dnTick();remTick()}
    if(k==='briefmode'){SETPREF('briefmode',val);heroTrim();renderDeck();masonry()}
    renderSet();return}
  const cd=e.target.closest('[data-setcard]');if(cd){const c=document.querySelector(`#v-today [data-arrange] > [data-cid="${CSS.escape(cd.dataset.setcard)}"]`);if(!c)return;
    if(cd.checked&&c.hidden){const u=document.createElement('button');u.dataset.unhide=c.dataset.cid;u.hidden=true;document.body.append(u);u.click();u.remove()}
    else if(!cd.checked&&!c.hidden){addCtlSafe(c);c.querySelector(':scope>.cardctl .cc-hide')?.click()}setTimeout(renderSet,50);return}
  if(e.target.closest('[data-setarr]')){closeSet();location.hash='#today';const b=$1('#arrangeBtn');if(b){const h=b.hidden;b.hidden=false;b.click();b.hidden=h}return}
  if(e.target.closest('[data-settour]')){closeSet();$1('#tourBtn')?.click()}},true);
function addCtlSafe(c){if(!c.querySelector(':scope>.cardctl')){const s=document.querySelector('#v-today [data-cid] > .cardctl');if(s)c.prepend(s.cloneNode(true))}}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$1('#setPanel:not([hidden])'))closeSet()});
new MutationObserver(()=>{if($1('#setPanel:not([hidden])'))renderSet()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-wp','class']});

/* ---- בלי שטחים ריקים בדף הבית: כל כרטיס תופס בדיוק את הגובה שלו (שורות של 4px, packing צפוף) ---- */
const MROW=4,MGAP=16;let masRaf=0;
function masonry(){cancelAnimationFrame(masRaf);masRaf=requestAnimationFrame(()=>{const g=$1('#v-today');if(!g)return;
  const all=[...g.querySelectorAll(':scope>.mtx-wrap>*,:scope>.bento>*')];
  const reset=()=>{g.classList.remove('mas');all.forEach(el=>{el.style.gridRowStart='';el.style.gridRowEnd=''})};
  if(!g.classList.contains('on')||innerWidth<=760){reset();return}
  g.classList.add('mas');
  const vis=all.filter(el=>!el.hidden&&getComputedStyle(el).display!=='none'&&!el.classList.contains('arr-lift')&&el.getBoundingClientRect().height>0);
  const span=el=>Math.max(1,Math.ceil((el.getBoundingClientRect().height+MGAP)/MROW));
  const wide=innerWidth>1280;const hero=$1('#heroMt'),dn=$1('#dayNow'),deck=$1('#briefDeck.open'),cal=$1('#miniCal');
  const S_=new Map(vis.map(el=>[el,span(el)]));
  const put=(el,start)=>{if(!el||!S_.has(el))return 0;el.style.gridRowStart=start;el.style.gridRowEnd='span '+S_.get(el);return start+S_.get(el)};
  let after=put(hero,1);
  if(deck)after=put(deck,after);
  if(wide){const a=put(dn,1);if(cal&&S_.has(cal))put(cal,a)}
  else{const a=put(dn,after);if(cal&&S_.has(cal))put(cal,after);after=Math.max(a,cal&&S_.has(cal)?after+S_.get(cal):a)}
  vis.forEach(el=>{if([hero,dn,deck,cal].includes(el))return;el.style.gridRowStart='';el.style.gridRowEnd='span '+S_.get(el)})})}
addEventListener('resize',masonry);
{const ro=new ResizeObserver(()=>masonry());const watch=()=>{document.querySelectorAll('#v-today>.mtx-wrap>*,#v-today>.bento>*').forEach(el=>{if(!el._mro){el._mro=1;ro.observe(el)}})};
  [document.querySelector('#v-today'),document.querySelector('#v-today>.mtx-wrap')].filter(Boolean).forEach(n=>new MutationObserver(()=>{watch();masonry()}).observe(n,{childList:true,subtree:false}));
  window.__masWatch=watch;
  const b=document.querySelector('#v-today>.bento');if(b)new MutationObserver(()=>{watch();masonry()}).observe(b,{childList:true,attributes:true,attributeFilter:['hidden'],subtree:true});
  addEventListener('hashchange',()=>setTimeout(masonry,30));setTimeout(()=>{watch();masonry()},0)}

function paintV22(){try{renderBM();sideSettings();heroTrim();renderDeck();renderRem();renderBottom();remNotif();renderDayNow();wireCal();renderAgenda();dressRows();meterToggle();battery();window.__masWatch&&__masWatch();masonry()}catch(e){console.error(e)}}
const _ra22=window.renderAll;window.renderAll=function(){const r=_ra22.apply(this,arguments);paintV22();return r};
new MutationObserver(()=>{if(typeof S!=='undefined'&&S.loaded)dressRows()}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});

/* תאריך גם לפני שהנתונים נטענים */
paintV21();meterToggle();battery();
if(typeof S!=='undefined'&&S.loaded&&window.renderAll)renderAll();
})();
