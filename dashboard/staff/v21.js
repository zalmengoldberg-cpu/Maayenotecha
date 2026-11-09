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
function openAgenda(ds){agDay=ds||dnSel||iso(TODAY);document.documentElement.classList.remove('sb-open');document.querySelectorAll('#app .sb-nav [aria-current]').forEach(x=>x.removeAttribute('aria-current'));$1('#sbAgenda')?.setAttribute('aria-current','page');const el=ensureAgenda();el.hidden=false;document.documentElement.classList.add('agp-open');renderAgenda();el.querySelector('.agx-x')?.focus();if(location.hash!=='#agenda')history.pushState(null,'','#agenda')}
function closeAgenda(back){const el=$1('#agendaPage');if(!el||el.hidden)return;$1('#sbAgenda')?.removeAttribute('aria-current');setTimeout(()=>{const a=$1(`#app .sb-nav a[href="${location.hash&&location.hash!=='#agenda'?location.hash:'#today'}"]`);if(a&&!document.querySelector('#app .sb-nav [aria-current]'))a.setAttribute('aria-current','page')},60);el.hidden=true;document.documentElement.classList.remove('agp-open');if(back&&location.hash==='#agenda')history.back();$1('[data-agenda]')?.focus()}
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
function sideAgenda(){const t=$1('#app .sb-nav a[href="#today"]');if(!t||$1('#sbAgenda'))return;const b=document.createElement('button');b.type='button';b.className='sb-item';b.id='sbAgenda';b.dataset.agenda='';
  b.innerHTML=`<span class="i">${DS.icon('clock','ico-sm')}</span><span class="lbl">על סדר היום</span>`;t.after(b)}
function sideSettings(){sideAgenda();const nav=$1('#app .sb-nav');if(!nav||$1('#setBtn'))return;const b=document.createElement('button');b.type='button';b.className='sb-item';b.id='setBtn';
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
      <div class="st-btns"><button type="button" class="st-b" data-setarr="1">${DS.icon('sliders','ico-sm')}סידור הלוח בגרירה</button><button type="button" class="st-b ghost" data-resetlayout="1">איפוס הסידור</button><button type="button" class="st-b ghost" data-rzreset="1">החזרת הגדלים המקוריים</button></div><p class="st-tip">כדי לשנות גודל של כרטיס: גוררים את הפינה התחתונה שלו. לחיצה כפולה על הפינה מחזירה אותו לגודל המקורי.</p></section>
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
  const reset=()=>{g.classList.remove('mas');all.forEach(el=>{el.style.gridRowStart='';el.style.gridRowEnd='';if(el.closest('.bento'))el.style.gridColumn=''})};
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
  /* v28: מיקום קבוע לכל כרטיס – עמודה שמורה (x) ושורה מחושבת, במקום שהדפדפן יבחר חור בכל טעינה */
  const COLS=12,bot=new Array(COLS+2).fill(1);const num=v=>parseInt(v,10);
  [hero,deck,dn,cal].forEach(el=>{if(!el||!S_.has(el))return;const cs=getComputedStyle(el);let st=num(cs.gridColumnStart)||1;const ce=cs.gridColumnEnd;const sm0=(cs.gridColumnStart+' '+ce).match(/span\s*(\d+)/);let en=sm0?st+num(sm0[1]):(num(ce)>0?num(ce):COLS+1);
    const r0=num(el.style.gridRowStart)||1,r1=r0+S_.get(el);for(let c=st;c<en&&c<=COLS;c++)bot[c]=Math.max(bot[c],r1)});
  const O=rzGet();let froze=false;
  vis.forEach(el=>{if([hero,dn,deck,cal].includes(el))return;const k=el.dataset.cid,sv=(k&&O[k])||{};
    el.style.gridColumn=sv.c&&!RZ_W_LOCK.has(k)?'span '+sv.c:'';const cs=getComputedStyle(el);
    let full=cs.gridColumnStart==='1'&&(cs.gridColumnEnd==='-1');const sm=(cs.gridColumnStart+' '+cs.gridColumnEnd).match(/span\s*(\d+)/);let c=full?COLS:sm?num(sm[1]):(num(cs.gridColumnEnd)>num(cs.gridColumnStart)?num(cs.gridColumnEnd)-num(cs.gridColumnStart):1);
    if(el._liveC)c=el._liveC;c=Math.max(1,Math.min(COLS,c));
    const top=x=>{let m=1;for(let i=x;i<x+c;i++)m=Math.max(m,bot[i]);return m};
    let x=full?1:(sv.x&&sv.x+c-1<=COLS?sv.x:(sv.x?COLS-c+1:0));
    if(!x){let best=1,bv=Infinity;const cand=[];for(let i=1;i+c-1<=COLS;i+=c)cand.push(i);if(cand[cand.length-1]+c-1<COLS)cand.push(COLS-c+1);for(const i of cand){const t=top(i);if(t<bv){bv=t;best=i}}x=best;if(k&&!full&&!el._liveC){O[k]={...sv,x};froze=true}}
    const r=top(x);el.style.gridColumn=x+' / span '+c;el.style.gridRowStart=r;el.style.gridRowEnd='span '+S_.get(el);for(let i=x;i<x+c;i++)bot[i]=r+S_.get(el)});
  if(froze&&typeof S!=='undefined'&&S.loaded&&!document.documentElement.classList.contains('arranging'))rzSet(O)})}
addEventListener('resize',masonry);
{const ro=new ResizeObserver(()=>masonry());const watch=()=>{document.querySelectorAll('#v-today>.mtx-wrap>*,#v-today>.bento>*').forEach(el=>{if(!el._mro){el._mro=1;ro.observe(el)}})};
  [document.querySelector('#v-today'),document.querySelector('#v-today>.mtx-wrap')].filter(Boolean).forEach(n=>new MutationObserver(()=>{watch();masonry()}).observe(n,{childList:true,subtree:false}));
  window.__masWatch=watch;
  const b=document.querySelector('#v-today>.bento');if(b)new MutationObserver(()=>{watch();masonry()}).observe(b,{childList:true,attributes:true,attributeFilter:['hidden'],subtree:true});
  addEventListener('hashchange',()=>setTimeout(masonry,30));setTimeout(()=>{watch();masonry()},0)}

function paintV22(){try{renderBM();sideSettings();heroTrim();renderDeck();renderRem();renderBottom();remNotif();renderDayNow();wireCal();renderAgenda();dressRows();meterToggle();battery();window.__masWatch&&__masWatch();masonry()}catch(e){console.error(e)}}
const _ra22=window.renderAll;window.renderAll=function(){const r=_ra22.apply(this,arguments);paintV22();return r};
new MutationObserver(()=>{if(typeof S!=='undefined'&&S.loaded)dressRows()}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});

/* ===================== v26 (7.11): בקשות זלמן =====================
   1. שינוי גודל לכרטיסים בדף הבית (רוחב בעמודות + גובה), נשמר בדפדפן.
   2. קישורים חיצוניים ככפתורי אייקון לפי המותג: בכרטיס, בשורות בדף הבית, וכרטיס "קישורים" לכל הצוות.
   3. בתוך כרטיס: בחירה מעוצבת (במקום רשימת הדפדפן), ואזור אחד לקישורים, קבצים והערות.
   4. "על סדר היום" עם הסרגל בצד. */

/* ---- 1. שינוי גודל ---- */
const RZK='mt-size-v26',RZ_W_LOCK=new Set(['miniCal','bottom22']);
const rzGet=()=>{try{return JSON.parse(localStorage.getItem(RZK)||'{}')||{}}catch(e){return{}}};
const rzSet=o=>{try{localStorage.setItem(RZK,JSON.stringify(o))}catch(e){}};
function rzCards(){return [...document.querySelectorAll('#v-today>.bento>[data-cid]')].filter(c=>c.dataset.cid!=='brief8'&&c.dataset.cid!=='kpis')}
function rzApply(){const big=innerWidth>760,o=rzGet();rzCards().forEach(c=>{const s=big?o[c.dataset.cid]:null;
  if(!big&&c.style.gridColumn){c.style.gridColumn='';c._rzw=false}
  const h=s&&s.h?s.h+'px':'';if(c.style.height!==h&&(h||c._rzh)){c.style.height=h;c._rzh=!!h}c.classList.toggle('rz-h',!!h)})}
function rzHandles(){if(innerWidth<=760)return;rzCards().forEach(c=>{if(c.querySelector(':scope>.rz26'))return;const h=document.createElement('span');h.className='rz26';h.tabIndex=0;h.setAttribute('role','separator');
  h.setAttribute('aria-label','שינוי גודל: '+(c.dataset.cname||'כרטיס'));h.title='גרירה משנה גודל · לחיצה כפולה מחזירה לגודל המקורי';c.append(h)})}
function rzSave(c,patch){const o=rzGet();const k=c.dataset.cid;const n={...(o[k]||{}),...patch};Object.keys(n).forEach(x=>n[x]==null&&delete n[x]);if(Object.keys(n).length)o[k]=n;else delete o[k];rzSet(o);rzApply();masonry()}
function rzGrid(){const vs=getComputedStyle($1('#v-today'));return{gap:parseFloat(vs.columnGap)||16,col:parseFloat(vs.gridTemplateColumns)||80}}
document.addEventListener('pointerdown',e=>{const h=e.target.closest&&e.target.closest('.rz26');if(!h||e.button>0)return;e.preventDefault();e.stopPropagation();
  const c=h.parentElement,G=rzGrid(),r=c.getBoundingClientRect(),x0=e.clientX,y0=e.clientY,lock=RZ_W_LOCK.has(c.dataset.cid);let cur=null;
  c.classList.add('rz-on');document.documentElement.classList.add('rz-drag');try{h.setPointerCapture(e.pointerId)}catch(x){}
  const mv=ev=>{const w=r.width+(x0-ev.clientX)*(document.dir==='ltr'?-1:1),hh=Math.max(140,Math.round((r.height+ev.clientY-y0)/4)*4);
    const sp=Math.max(3,Math.min(12,Math.round((w+G.gap)/(G.col+G.gap))));cur={h:hh};if(!lock){cur.c=sp;c._liveC=sp;masonry()}
    c.style.height=hh+'px';c._rzh=1;c.classList.add('rz-h')};
  const up=()=>{c._liveC=0;h.removeEventListener('pointermove',mv);h.removeEventListener('pointerup',up);h.removeEventListener('pointercancel',up);c.classList.remove('rz-on');document.documentElement.classList.remove('rz-drag');if(cur)rzSave(c,cur);else masonry()};
  h.addEventListener('pointermove',mv);h.addEventListener('pointerup',up);h.addEventListener('pointercancel',up)},true);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.rz26')){e.preventDefault();e.stopPropagation()}},true);
document.addEventListener('dblclick',e=>{const h=e.target.closest&&e.target.closest('.rz26');if(!h)return;e.preventDefault();rzSave(h.parentElement,{c:null,h:null});toast('הכרטיס חזר לגודל המקורי')},true);
document.addEventListener('keydown',e=>{const h=e.target.closest&&e.target.closest('.rz26');if(!h)return;const c=h.parentElement,G=rzGrid(),r=c.getBoundingClientRect(),o=rzGet()[c.dataset.cid]||{};
  const span=o.c||Math.max(3,Math.round((r.width+G.gap)/(G.col+G.gap)));const H=o.h||Math.round(r.height/4)*4;const grow=document.dir==='ltr'?'ArrowRight':'ArrowLeft',shrink=document.dir==='ltr'?'ArrowLeft':'ArrowRight';
  let p=null;if(e.key===grow&&!RZ_W_LOCK.has(c.dataset.cid))p={c:Math.min(12,span+1)};else if(e.key===shrink&&!RZ_W_LOCK.has(c.dataset.cid))p={c:Math.max(3,span-1)};else if(e.key==='ArrowDown')p={h:H+20};else if(e.key==='ArrowUp')p={h:Math.max(140,H-20)};else if(e.key==='Enter'||e.key==='Delete')p={c:null,h:null};
  if(p){e.preventDefault();rzSave(c,p);h.focus()}});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-resetlayout],[data-rzreset]')){rzSet({});rzApply();masonry();if(e.target.closest('[data-rzreset]'))toast('כל הכרטיסים חזרו לגודל המקורי')}});
addEventListener('resize',()=>{rzApply();rzHandles()});

/* ---- 2. קישורים: זיהוי המותג לפי הכתובת ---- */
const LK=[[/facebook\.com|fb\.me|fb\.com/,'facebook','פייסבוק'],[/instagram\.com|instagr\.am/,'instagram','אינסטגרם'],[/wa\.me|whatsapp\.com/,'whatsapp','וואטסאפ'],[/youtube\.com|youtu\.be/,'youtube','יוטיוב'],
  [/^mailto:|mail\.google\./,'gmail','מייל'],[/drive\.google\.|docs\.google\.|sheets\.google\.|slides\.google\.|forms\.gle/,'google','דרייב'],[/(^|\/\/|\.)google\.com|\.google\./,'google','גוגל'],[/\/\/([a-z0-9-]+\.)*(maynotecha|maayanotecha|mayanotecha)/,'site','אתר'],
  [/claude\.ai/,'claude','קלוד'],[/canva\.com/,'web','קנבה'],[/figma\.com/,'web','פיגמה'],[/notion\.(so|site)/,'web','נושן'],[/lovable\.(dev|app)/,'web','לאבבל'],[/tiktok\.com/,'web','טיקטוק'],[/t\.me|telegram/,'web','טלגרם'],[/linkedin\.com/,'web','לינקדאין'],[/(x|twitter)\.com/,'web','X']];
function lkKind(u){const s=String(u||'').toLowerCase();const m=LK.find(([re])=>re.test(s));if(m)return{k:m[1],n:m[2]};let h='';try{h=new URL(s).hostname.replace(/^www\./,'')}catch(e){}return{k:'web',n:h||'קישור'}}
function lkIcon(k,cls=''){if(['facebook','instagram','whatsapp','youtube','gmail','google','site'].includes(k))return brandBadge(k,cls);
  return `<span class="brand lk-${k} ${cls}" role="img" aria-hidden="true">${DS.icon(k==='claude'?'flame':k==='file'?'attach':'arrowUpLeft')}</span>`}
function lkUrl(u){u=String(u||'').trim();if(!u)return'';if(/^(https?:|mailto:)/i.test(u))return u;if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u))return 'mailto:'+u;return 'https://'+u}
function lkOpen(u){try{window.open(u,'_blank','noopener')}catch(e){}}
function lkMini(links,max=3){if(!links||!links.length)return'';const L=links.slice(0,max);
  return `<span class="lk-mini">${L.map(l=>{const k=lkKind(l.url);return `<span class="lk-m" role="link" tabindex="0" data-lkgo="${esc(l.url)}" title="${esc((l.label||k.n)+' · '+l.url)}" aria-label="${esc(l.label||k.n)}">${lkIcon(k.k)}</span>`}).join('')}${links.length>max?`<span class="lk-more">+${links.length-max}</span>`:''}</span>`}
document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('[data-lkgo]');if(!g)return;e.preventDefault();e.stopPropagation();lkOpen(g.dataset.lkgo)},true);
document.addEventListener('keydown',e=>{const g=e.target.closest&&e.target.closest('[data-lkgo]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopPropagation();lkOpen(g.dataset.lkgo)}},true);
/* בשורות של דף הבית ושל "על סדר היום": האייקונים של הקישורים של הכרטיס */
function dressLinks(){if(typeof S==='undefined'||!S.loaded)return;
  const put=(row,it,before)=>{if(!it||row.querySelector(':scope .lk-mini'))return;const h=lkMini(it.links);if(!h)return;const t=before&&row.querySelector(before);if(t)t.insertAdjacentHTML('beforebegin',h);else row.insertAdjacentHTML('beforeend',h)};
  /* בשורות עם עמודות קבועות: האייקונים נכנסים לתא של הכותרת, בצד */
  const inTitle=(row,it)=>{if(!it||row.querySelector('.lk-mini'))return;const h=lkMini(it.links);if(!h)return;const t=row.children[1];if(!t)return;const w=document.createElement('span');w.className='lk-tw';while(t.firstChild)w.append(t.firstChild);t.classList.add('lk-host');t.append(w);t.insertAdjacentHTML('beforeend',h)};
  document.querySelectorAll('#plist .pr[data-open]').forEach(r=>inTitle(r,S.items[r.dataset.open]));
  document.querySelectorAll('#attList .ar[data-res]').forEach(r=>{const a=(S.att||[])[+r.dataset.res];inTitle(r,a&&a.it)});
  document.querySelectorAll('#agendaPage .agx-list .agx-card').forEach(r=>{const o=r.querySelector('[data-open]');put(r,o&&S.items[o.dataset.open],null)})}

/* ---- כרטיס "קישורים" לכל הצוות (נשמר במסד: agents/_links) ---- */
let glForm=false;
function glList(){return ((typeof S!=='undefined'&&S.agents&&S.agents._links&&S.agents._links.list)||[]).filter(l=>l&&l.url)}
async function glSave(list){if(!S.db){toast('אין חיבור לשמירה');return}const prev=S.agents._links;S.agents._links={...(prev||{}),list};renderLinksCard();
  try{await S.db.collection('agents').doc('_links').set({list,updatedAt:now()})}catch(e){S.agents._links=prev;renderLinksCard();toast('השמירה נכשלה')}}
function ensureLinksCard(){let c=$1('#links26');if(c)return c;const bento=$1('#v-today>.bento');if(!bento)return null;
  c=document.createElement('div');c.id='links26';c.className='card pane s4 lk-card';c.dataset.cid='links26';c.dataset.cname='קישורים';const b=$1('#bottom22');if(b)b.before(c);else bento.append(c);return c}
function renderLinksCard(){const c=ensureLinksCard();if(!c||typeof S==='undefined'||!S.loaded)return;const L=glList();const keep=c.querySelector(':scope>.rz26,:scope>.cardctl');
  c.innerHTML=`<div class="card-head"><h3><span class="lk-hi">${DS.icon('arrowUpLeft','ico-sm')}</span>קישורים</h3><button type="button" class="rm-add lk-addbtn" data-gladd aria-expanded="${glForm}">${DS.icon('plus','ico-sm')}קישור</button></div>
  ${glForm?`<form class="lk-gform" id="glForm"><input id="glUrl" dir="ltr" placeholder="כתובת: אתר, פייסבוק, אינסטגרם, דרייב..." required aria-label="כתובת"><input id="glName" placeholder="שם (לא חובה)" aria-label="שם"><div class="lk-gbtns"><button type="submit" class="btn btn-brand btn-sm">הוספה</button><button type="button" class="btn btn-ghost btn-sm" data-glcancel>ביטול</button></div></form>`:''}
  ${L.length?`<div class="lk-tiles">${L.map((l,i)=>{const k=lkKind(l.url);return `<div class="lk-tile"><a href="${esc(l.url)}" target="_blank" rel="noopener" title="${esc(l.url)}">${lkIcon(k.k,'lg')}<span>${esc(l.label||k.n)}</span></a><button type="button" class="lk-tx" data-gldel="${i}" aria-label="הסרת ${esc(l.label||k.n)}">×</button></div>`}).join('')}</div>`
   :glForm?'':`<div class="empty lk-empty"><b>אין עדיין קישורים</b><span>האתר, הרשתות החברתיות, תיקיות בדרייב – כל מה שהצוות פותח הרבה. כל קישור הופך לכפתור עם האייקון שלו.</span></div>`}`;
  if(keep)c.append(keep);if(glForm)setTimeout(()=>$1('#glUrl')?.focus(),0)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-gladd],[data-glcancel],[data-gldel]');if(!t||!t.closest('#links26'))return;e.preventDefault();
  if(t.dataset.gladd!=null||t.dataset.glcancel!=null){glForm=t.dataset.gladd!=null?!glForm:false;renderLinksCard();return}
  const i=+t.dataset.gldel;const L=glList();const gone=L[i];if(!gone)return;glSave(L.filter((_,j)=>j!==i));toastUndo('הקישור הוסר',()=>glSave(L))});
document.addEventListener('submit',e=>{if(e.target.id!=='glForm')return;e.preventDefault();const u=lkUrl($1('#glUrl').value);if(!u)return;const n=$1('#glName').value.trim();glForm=false;glSave([...glList(),{label:n||lkKind(u).n,url:u}]);log&&log('הוסיף קישור לחדר: '+(n||lkKind(u).n))});

/* ---- 3א. בחירה מעוצבת בתוך הכרטיס (במקום רשימת הדפדפן) ---- */
const SEL_SCOPE='#drawer select, .modal select';
function selKind(s){if(s.id==='fStatus')return'status';if(s.id==='fPri')return'pri';if(s.id==='fOwner'||s.id==='fWho'||s.dataset.sto!=null)return'person';if(s.dataset.se!=null)return'est';return'plain'}
function stcOf(v){const t=document.createElement('span');t.className='stl st-'+v;t.style.display='none';document.body.append(t);const c=getComputedStyle(t).getPropertyValue('--stc').trim();t.remove();return c||'#A9B1C2'}
function selDeco(k,v){if(k==='status')return `<i class="so-dot" style="background:${stcOf(v)}"></i>`;if(k==='pri')return `<i class="so-dot" style="background:${{1:'var(--bad)',2:'var(--gold)',3:'var(--ink-300)'}[v]||'var(--ink-300)'}"></i>`;
  if(k==='person')return v&&typeof P==='function'&&P(v)?`<span class="so-av">${av(v)}</span>`:`<span class="so-av none">${DS.icon('users','ico-sm')}</span>`;if(k==='est')return `<span class="so-ic">${DS.icon('clock','ico-sm')}</span>`;return''}
function selClose(back){const p=$1('#selPop');if(!p)return;const s=p._sel;p.remove();if(s){s.classList.remove('sel-open');if(back&&s.isConnected)s.focus({preventScroll:true})}}
function selOpen(s){selClose();const k=selKind(s),r=s.getBoundingClientRect();const p=document.createElement('div');p.id='selPop';p.className='selpop';p.setAttribute('role','listbox');p.dir='rtl';
  const lab=s.closest('label')?.childNodes[0]?.textContent?.trim()||s.getAttribute('aria-label')||'';if(lab)p.setAttribute('aria-label',lab);
  p.innerHTML=[...s.options].map((o,i)=>`<button type="button" role="option" class="so ${o.selected?'on':''}" data-si="${i}" aria-selected="${o.selected}" tabindex="-1">${selDeco(k,o.value)}<span class="so-t">${esc(o.text)}</span>${o.selected?`<span class="so-ck">${DS.icon('check','ico-sm')}</span>`:''}</button>`).join('');
  document.body.append(p);p._sel=s;s.classList.add('sel-open');
  const W=Math.max(r.width,190),H=p.offsetHeight,vh=innerHeight,vw=innerWidth;let top=r.bottom+6;if(top+H>vh-10&&r.top-H-6>10)top=r.top-H-6;top=Math.max(10,Math.min(top,vh-H-10));
  let left=r.right-W;left=Math.max(10,Math.min(left,vw-W-10));Object.assign(p.style,{top:top+'px',left:left+'px',width:W+'px'});(p.querySelector('.so.on')||p.querySelector('.so'))?.focus({preventScroll:true})}
function selPick(b){const p=$1('#selPop');if(!p)return;const s=p._sel;const i=+b.dataset.si;selClose(true);if(!s||!s.isConnected||s.selectedIndex===i)return;s.selectedIndex=i;s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}))}
document.addEventListener('pointerdown',e=>{const s=e.target.closest&&e.target.closest(SEL_SCOPE);if(s&&!s.disabled&&!s.multiple){e.preventDefault();if(s.classList.contains('sel-open'))selClose(true);else selOpen(s);return}
  if(!(e.target.closest&&e.target.closest('#selPop')))selClose()},true);
document.addEventListener('mousedown',e=>{if(e.target.closest&&e.target.closest(SEL_SCOPE))e.preventDefault()},true);
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#selPop .so');if(b){e.preventDefault();e.stopPropagation();selPick(b)}},true);
document.addEventListener('keydown',e=>{const p=$1('#selPop');
  if(p){const opts=[...p.querySelectorAll('.so')];const i=opts.indexOf(document.activeElement);
    if(e.key==='Escape'||e.key==='Tab'){e.preventDefault();e.stopPropagation();selClose(true);return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();e.stopPropagation();const n=opts[(i+(e.key==='ArrowDown'?1:-1)+opts.length)%opts.length];n&&n.focus();return}
    if(e.key==='Home'||e.key==='End'){e.preventDefault();opts[e.key==='Home'?0:opts.length-1]?.focus();return}
    if((e.key==='Enter'||e.key===' ')&&i>=0){e.preventDefault();e.stopPropagation();selPick(opts[i]);return}return}
  const s=e.target.closest&&e.target.closest(SEL_SCOPE);if(s&&['Enter',' ','ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();selOpen(s)}},true);
addEventListener('scroll',e=>{const p=$1('#selPop');if(p&&!p.contains(e.target))selClose()},true);addEventListener('resize',()=>selClose());

/* ---- 3ב. בתוך הכרטיס: אזור אחד לקישורים, קבצים והערות ---- */
const FEXT=n=>{const m=String(n||'').match(/\.([a-z0-9]{1,5})$/i);return m?m[1].toUpperCase():'קובץ'};
const FSIZE=b=>!b?'':b<1024*1024?Math.max(1,Math.round(b/1024))+' KB':(b/1024/1024).toFixed(1)+' MB';
function matHtml(it){const L=it.links||[],F=it.files||[];
  return `<section class="mat26" aria-label="קישורים, קבצים והערות">
  <div class="mt-blk"><div class="mt-h"><span class="mt-hi">${DS.icon('arrowUpLeft','ico-sm')}</span><h3>קישורים</h3>${L.length?`<em class="num">${L.length}</em>`:''}</div>
    ${L.length?`<div class="lk-grid">${L.map((l,i)=>{const k=lkKind(l.url);return `<div class="lk26"><a href="${esc(l.url)}" target="_blank" rel="noopener" title="${esc(l.url)}">${lkIcon(k.k)}<span class="lk-t"><b>${esc(l.label&&l.label!==l.url?l.label:k.n)}</b><small dir="ltr">${esc(String(l.url).replace(/^https?:\/\/(www\.)?/,'').replace(/^mailto:/,''))}</small></span></a><button type="button" class="lk-x" data-ldel="${i}" aria-label="הסרת הקישור">×</button></div>`}).join('')}</div>`:''}
    <form class="add lk-add" id="addLink"><span class="lk-prev" aria-hidden="true">${lkIcon('web')}</span><input id="lUrl" dir="ltr" placeholder="הדבקת קישור: אתר, פייסבוק, דרייב..." aria-label="כתובת הקישור"><input id="lLabel" placeholder="שם (לא חובה)" aria-label="שם הקישור"><button class="btn btn-brand btn-sm" type="submit">הוספה</button></form></div>
  <div class="mt-blk"><div class="mt-h"><span class="mt-hi">${DS.icon('attach','ico-sm')}</span><h3>קבצים</h3>${F.length?`<em class="num">${F.length}</em>`:''}</div>
    ${F.length?`<div class="fl-grid">${F.map((f,i)=>{const img=/^image\//.test(f.type||'')||/\.(png|jpe?g|webp|gif|avif)$/i.test(f.name||'');return `<div class="fl26"><a href="${esc(f.url)}" target="_blank" rel="noopener" title="${esc(f.name||'')}"><span class="fl-th ${img?'img':''}">${img?`<img src="${esc(f.url)}" alt="" loading="lazy">`:`<b>${esc(FEXT(f.name))}</b>`}</span><span class="fl-t"><b>${esc(f.name||'קובץ')}</b><small>${esc([FSIZE(f.size),f.at?fmt(String(f.at).slice(0,10)):''].filter(Boolean).join(' · '))}</small></span></a><button type="button" class="lk-x" data-fdel="${i}" aria-label="הסרת הקובץ">×</button></div>`}).join('')}</div>`:''}
    <label class="fl-drop" data-fldrop>${DS.icon('plus','ico-sm')}<span>גוררים קובץ לכאן או <u>בוחרים קובץ</u></span><input type="file" id="fileUp26" multiple hidden></label></div>
  <div class="mt-blk mt-notes"><div class="mt-h"><span class="mt-hi">${DS.icon('quote','ico-sm')}</span><h3>הערות</h3></div></div></section>`}
function enhanceDrawer(){const d=$1('#drawer');if(!d||typeof S==='undefined'||!S.open||S.mode!=='item')return;const it=S.items[S.open];if(!it||d.querySelector('.mat26'))return;
  const ls=d.querySelector('.dr-body .links');const sec=ls&&ls.parentElement;const notes=d.querySelector('#fNotes')?.closest('label');if(!sec)return;
  sec.insertAdjacentHTML('beforebegin',matHtml(it));const box=d.querySelector('.mat26 .mt-notes');sec.remove();
  if(notes){notes.classList.add('nt26');[...notes.childNodes].forEach(n=>{if(n.nodeType===3)n.remove()});notes.setAttribute('aria-label','הערות');box.append(notes);const ta=notes.querySelector('textarea');ta.placeholder='מה חשוב לדעת על הכרטיס הזה? הקשר, החלטות, מה סוכם...';taFit(ta)}}
function taFit(t){t.style.height='auto';t.style.height=Math.min(420,Math.max(110,t.scrollHeight+2))+'px'}
document.addEventListener('input',e=>{if(e.target.id==='fNotes')taFit(e.target);if(e.target.id==='lUrl'){const p=$1('#drawer .lk-prev');if(p)p.innerHTML=lkIcon(e.target.value.trim()?lkKind(lkUrl(e.target.value)).k:'web')}});
document.addEventListener('submit',e=>{if(e.target.id==='addLink'){const u=$1('#lUrl');if(u&&u.value.trim()&&!/^https?:\/\//i.test(u.value.trim()))u.value=lkUrl(u.value);const n=$1('#lLabel');if(u&&u.value.trim()&&n&&!n.value.trim())n.value=lkKind(u.value).n}},true);
async function addFiles(list){const id=S.open;if(!id||!list||!list.length)return;if(!S.assets){toast('אין אפשרות להעלות קבצים בצפייה הזו');return}
  const out=[];for(const f of list){try{toast('מעלה: '+f.name);const r=await S.assets.upload(f);if(r&&r.url)out.push({name:f.name,url:r.url,type:f.type||'',size:f.size||0,at:now()})}catch(e){toast('ההעלאה נכשלה: '+(e.message||e.code||f.name))}}
  if(out.length){const it=S.items[id];await saveItem(id,{files:[...(it.files||[]),...out]});toast(out.length===1?'הקובץ נוסף':out.length+' קבצים נוספו');log&&log('צירף '+(out.length===1?'קובץ':out.length+' קבצים')+' ל"'+(it.title||'')+'"',id)}}
document.addEventListener('change',e=>{if(e.target.id==='fileUp26'){addFiles([...e.target.files]);e.target.value=''}});
document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('#drawer [data-fdel]');if(!x)return;e.preventDefault();const id=S.open,it=S.items[id];if(!it)return;const F=it.files||[];const i=+x.dataset.fdel;saveItem(id,{files:F.filter((_,j)=>j!==i)});toastUndo('הקובץ הוסר מהכרטיס',()=>saveItem(id,{files:F}))});
['dragenter','dragover'].forEach(t=>document.addEventListener(t,e=>{const z=e.target.closest&&e.target.closest('[data-fldrop]');if(!z)return;e.preventDefault();z.classList.add('on')}));
['dragleave','drop'].forEach(t=>document.addEventListener(t,e=>{const z=e.target.closest&&e.target.closest('[data-fldrop]');if(!z)return;e.preventDefault();z.classList.remove('on');if(t==='drop')addFiles([...(e.dataTransfer?.files||[])])}));
{const d=$1('#drawer');if(d)new MutationObserver(()=>{enhanceDrawer();selClose()}).observe(d,{childList:true})}

/* ---- 4. "על סדר היום" עם הסרגל בצד ---- */
{const sb=$1('#app .sidebar');const setW=()=>{if(sb)document.documentElement.style.setProperty('--sbw',Math.round(sb.getBoundingClientRect().width)+'px')};
  if(sb&&window.ResizeObserver)new ResizeObserver(setW).observe(sb);setW()}
addEventListener('hashchange',()=>{if(location.hash!=='#agenda')closeAgenda(false)});

/* v28: כרטיסים שנוצרים אחרי הטעינה (תזכורות, קישורים, השורה התחתונה) נכנסים לפי הסדר השמור, ולא תמיד לאותו מקום */
function applyOrder(){if(document.documentElement.classList.contains('arranging'))return;const box=$1('#v-today>.bento');if(!box)return;let L=null;try{L=JSON.parse(localStorage.getItem('mt-layout-today2')||'null')}catch(e){}
  if(!L||!Array.isArray(L.order))return;const kids=[...box.children].filter(c=>c.dataset&&c.dataset.cid);const by=Object.fromEntries(kids.map(c=>[c.dataset.cid,c]));
  (L.hidden||[]).forEach(id=>{if(by[id]&&!by[id].hidden)by[id].hidden=true});
  const cur=kids.map(c=>c.dataset.cid).filter(id=>L.order.includes(id)),want=L.order.filter(id=>by[id]);if(cur.join('|')===want.join('|'))return;
  want.forEach(id=>box.appendChild(by[id]));kids.forEach(c=>{if(!L.order.includes(c.dataset.cid))box.appendChild(c)})}
function paintV26(){try{renderLinksCard();applyOrder();rzHandles();rzApply();dressLinks();enhanceDrawer();masonry()}catch(e){console.error(e)}}
const _ra26=window.renderAll;window.renderAll=function(){const r=_ra26.apply(this,arguments);paintV26();return r};
new MutationObserver(()=>{if(typeof S!=='undefined'&&S.loaded){dressLinks();rzHandles()}}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});
{const a=$1('#agendaPage');if(a)new MutationObserver(()=>dressLinks()).observe(a,{childList:true,subtree:true})}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-agenda],[data-agtab],[data-agday]'))setTimeout(dressLinks,50)});

/* ===================== v27 (8.11): הסידור נשמר במסד, וכותרת הלוח הקטן פותחת את לוח השנה =====================
   כל העדפות התצוגה (סידור והסתרה, גודל כרטיסים, רקע, פתיחת כרטיס, מד, בריף, סרגל מכווץ, תצוגת לוח) נשמרות
   באוסף prefs, מסמך אחד לכל חשבון (S.meV.id). בכניסה ממכשיר אחר הסידור נטען משם. בפעם הראשונה – מה שיש בדפדפן עולה למסד. */
const PK=/^mt-(layout-.+|size-v26|bg2-.+|open|hero-meter|brief-open|pref-.+|sbmini|fold-.+|calmode|calkind|cmap)$/;
function pfLocal(){const o={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&PK.test(k))o[k]=localStorage.getItem(k)}}catch(e){}return o}
let pfReady=false,pfT=0,pfApplying=false,pfOn=false;
const pfId=()=>(typeof S!=='undefined'&&S.meV&&S.meV.id)||null;
function pfSave(){if(!pfReady||pfApplying)return;clearTimeout(pfT);pfT=setTimeout(()=>{const id=pfId();if(!id||!S.db)return;const at=new Date().toISOString();
  pfWrite(id,at)},800)}
let pfLast=null;
function pfWrite(id,at){const v=pfLocal();const hist=((pfLast&&pfLast.hist)||[]).slice(0,7);if(pfLast&&pfLast.v&&JSON.stringify(pfLast.v)!==JSON.stringify(v))hist.unshift({at:pfLast.at,v:pfLast.v});
  try{localStorage.setItem('mt-prefs-at',at)}catch(e){}const doc={v,at,who:ME(),name:(S.meV&&S.meV.name)||'',hist:hist.slice(0,8)};pfLast=doc;S.db.collection('prefs').doc(id).set(doc).catch(()=>{})}
function pfFlush(){if(!pfT||!pfReady)return;clearTimeout(pfT);pfT=0;const id=pfId();if(id&&S.db)pfWrite(id,new Date().toISOString())}
addEventListener('pagehide',pfFlush);document.addEventListener('visibilitychange',()=>{if(document.hidden)pfFlush()});
{const set0=Storage.prototype.setItem,rm0=Storage.prototype.removeItem;
  Storage.prototype.setItem=function(k,v){let old=null;try{if(this===localStorage&&k==='mt-layout-today2')old=this.getItem(k)}catch(e){}set0.call(this,k,v);try{const ord=x=>{try{return JSON.stringify((JSON.parse(x||'{}').order)||[])}catch(e){return''}};if(this===localStorage&&k==='mt-layout-today2'&&!pfApplying&&old!=null&&ord(old)!==ord(v)){const o=JSON.parse(localStorage.getItem('mt-size-v26')||'{}');let ch=false;Object.values(o).forEach(z=>{if(z&&z.x){delete z.x;ch=true}});if(ch)set0.call(this,'mt-size-v26',JSON.stringify(o));setTimeout(()=>{try{masonry()}catch(x){}},60)}if(this===localStorage&&PK.test(k))pfSave()}catch(e){}};
  Storage.prototype.removeItem=function(k){rm0.call(this,k);try{if(this===localStorage&&PK.test(k))pfSave()}catch(e){}}}
function pfStart(){if(pfOn)return;const id=pfId();if(!id||typeof S==='undefined'||!S.db)return;pfOn=true;let first=true;
  S.db.collection('prefs').onSnapshot(s=>{const d=(s.docs||[]).find(x=>x.id===id);const r=d&&d.data();const wasFirst=first;first=false;if(r)pfLast=r;
    if(!r||!r.v){pfReady=true;if(wasFirst)pfSave();return}
    let la='';try{la=localStorage.getItem('mt-prefs-at')||''}catch(e){}
    if(la&&String(r.at)<=la){pfReady=true;return}
    const cur=pfLocal();
    const diff=Object.keys({...cur,...r.v}).some(k=>cur[k]!==r.v[k]);
    pfApplying=true;try{Object.keys(cur).forEach(k=>{if(!(k in r.v))localStorage.removeItem(k)});Object.entries(r.v).forEach(([k,v])=>{if(PK.test(k))localStorage.setItem(k,v)});localStorage.setItem('mt-prefs-at',String(r.at))}catch(e){}pfApplying=false;
    if(diff&&wasFirst){let done=false;try{done=!!sessionStorage.getItem('mt-prefs-rl-'+r.at);sessionStorage.setItem('mt-prefs-rl-'+r.at,'1')}catch(e){done=true}if(!done){location.reload();return}}
    pfReady=true},()=>{pfReady=true})}
{const t=setInterval(()=>{pfStart();if(pfOn)clearInterval(t)},700);setTimeout(()=>clearInterval(t),120000)}

/* ---- כותרת הלוח הקטן (שם החודש) פותחת את עמוד לוח השנה. לחיצה על יום ממשיכה לבחור אותו (החלטת זלמן, 8.11) ---- */
function calHead(){const t=$1('#miniCal .hcal-title');if(!t||t._go)return;t._go=1;t.setAttribute('role','link');t.tabIndex=0;t.setAttribute('aria-label','פתיחת לוח השנה');t.title='פתיחת לוח השנה';t.classList.add('cal-go')}
function calGo(){document.documentElement.classList.remove('sb-open');location.hash='#calendar'}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#miniCal .hcal-title')){e.preventDefault();calGo()}});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest&&e.target.closest('#miniCal .hcal-title')){e.preventDefault();calGo()}});
{const _p27=window.renderAll;window.renderAll=function(){const r=_p27.apply(this,arguments);try{calHead();pfStart()}catch(e){}return r}}
new MutationObserver(()=>calHead()).observe(document.body,{childList:true,subtree:true});

/* ===================== v29 (9.11): תוצרים לפי חומר – בקנבן, ובכפתור בכרטיס "קישורים" =====================
   סוג החומר: שדה format בכרטיס (video/graphic/gif/post/newsletter). אם אין – נגזר מהערוץ ומהכותרת. */
const FMT=[['video','סרטונים','סרטון','#3F5499'],['graphic','גרפיקות','גרפיקה','#4A8BAA'],['gif','GIFים','GIF','#C9730C'],['post','פוסטים','פוסט','#2E8566'],['newsletter','ניוזלטרים','ניוזלטר','#626A88']];
const FMT_ICON={video:'<path d="M4 6.5h11v11H4z"/><path d="m15 10 5-3v10l-5-3"/>',graphic:'<rect x="4" y="4.5" width="16" height="15" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 5-5 4 4 2-2 3 3"/>',gif:'<rect x="3.5" y="6" width="17" height="12" rx="3"/><path d="M9 10.5H7.5v3H9v-1.2M11.5 10.5v3M14 13.5v-3h2M14 12h1.5"/>',post:'<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',newsletter:'<rect x="4" y="5.5" width="16" height="13" rx="3"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>'};
const fmtIco=(k,cls='ico-sm')=>`<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${FMT_ICON[k]||FMT_ICON.post}</svg>`;
function fmtOf(it){if(!it||it.kind==='event'||it.kind==='recurring')return null;if(it.format&&FMT.some(f=>f[0]===it.format))return it.format;
  const t=String(it.title||'')+' '+(it.sub||''),ti=String(it.title||'');if(/\bgif\b|גיף/i.test(ti))return'gif';if(it.channel==='weekly')return'post';if(/גרפיק|באנר|פוסטר|מודעה/.test(ti))return'graphic';
  if(it.channel==='video'||/סרטון|רילס|ריל |וידאו|סטורי/.test(t))return'video';if(it.channel==='weekly'||it.channel==='post')return'post';if(it.channel==='newsletter')return'newsletter';return null}
const READY=new Set(['scheduled','done']);
function matItems(){return items().filter(i=>fmtOf(i)&&(i.kind==='content'||i.kind==='project'||i.kind==='task'))}
const KMCOV={video:'__KMCOV_video__',graphic:'__KMCOV_graphic__',gif:'__KMCOV_gif__',post:'__KMCOV_post__',newsletter:'__KMCOV_newsletter__'};
function matPreview(it){const f=(it.files||[]).find(x=>/^image\//.test(x.type||'')||/\.(png|jpe?g|webp|gif|avif)$/i.test(x.name||''));
  if(f)return `<img src="${esc(f.url)}" alt="" loading="lazy">`;if(it.thumb||it.channel==='weekly'||it.id==='weekly')return typeof art==='function'?art(it):'';
  const c=KMCOV[fmtOf(it)];return c&&!c.startsWith('__')?`<img class="km-cov" src="${c}" alt="" loading="lazy">`:(typeof art==='function'?art(it):'')}
let matMode=(()=>{try{return localStorage.getItem('mt-pref-boardmode')||'status'}catch(e){return'status'}})(),matFmt='all';
function ensureMatUI(){const v=$1('#v-board');if(!v)return null;const tb=v.querySelector('.toolbar');
  const bk=$1('#bKind');if(bk&&!$1('#bKindMat')){bk.insertAdjacentHTML('beforeend',`<button type="button" id="bKindMat" data-bmode="mat" aria-pressed="false">${fmtIco('graphic')}תוצרים</button>`)}
  let m=$1('#kanbanMat');if(!m){m=document.createElement('div');m.id='kanbanMat';m.className='kmat';$1('#kanban')?.after(m)}return m}
function renderMat(){const m=ensureMatUI();if(!m||typeof S==='undefined'||!S.loaded)return;const on=matMode==='mat';
  const bm=$1('#bKindMat');if(bm){bm.setAttribute('aria-pressed',String(on));if(on)document.querySelectorAll('#bKind [data-v]').forEach(b=>b.setAttribute('aria-pressed','false'))}
  $1('#v-board')?.classList.toggle('mat-on',on);if(!on){m.innerHTML='';return}
  const L=matItems();const cnt=k=>L.filter(i=>fmtOf(i)===k);
  const chips=`<div class="km-chips" role="tablist" aria-label="סוג חומר"><button type="button" class="km-chip" data-mfmt="all" aria-selected="${matFmt==='all'}">הכול <b class="num">${L.length}</b></button>${FMT.map(([k,n,,c])=>`<button type="button" class="km-chip" data-mfmt="${k}" aria-selected="${matFmt===k}" style="--fc:${c}">${fmtIco(k)}${n} <b class="num">${cnt(k).length}</b>${cnt(k).filter(i=>READY.has(i.status)).length?`<em>${cnt(k).filter(i=>READY.has(i.status)).length} מוכנים</em>`:''}</button>`).join('')}</div>`;
  const lanes=FMT.filter(([k])=>matFmt==='all'||matFmt===k).map(([k,n,one,c])=>{const li=cnt(k);if(matFmt==='all'&&!li.length)return'';
    return `<section class="km-lane" data-fmt="${k}" style="--fc:${c}"><header class="km-h"><span class="km-i">${fmtIco(k,'')}</span><h3>${n}</h3><span class="km-n num">${li.length}</span>${li.filter(i=>READY.has(i.status)).length?`<span class="km-ready">${li.filter(i=>READY.has(i.status)).length} מוכנים</span>`:''}<button type="button" class="btn btn-ghost btn-sm km-add" data-mnew="${k}">+ ${one}</button></header>
    <div class="km-cols">${ORDER.map(st=>{const col=li.filter(i=>(i.status||'todo')===st);return `<div class="col" data-col="${st}" data-fmt="${k}"><div class="km-ch"><span class="stl st-${st}"><i></i>${esc(STATUS[st])}</span><b class="num">${col.length||''}</b></div>
      ${col.map(it=>`<article class="kc km-card ${READY.has(it.status)?'ready':''}" data-open="${esc(it.id)}" tabindex="0"><div class="km-pv">${matPreview(it)}<span class="km-badge">${fmtIco(k)}${esc(one)}</span>${(it.files||[]).length?`<span class="km-files">${DS.icon('attach','ico-sm')}${it.files.length}</span>`:''}</div>
        <div class="km-b"><b>${esc(it.title)}</b><small>${esc([it.publishAt?'עולה '+fmt(it.publishAt):it.due?'יעד '+fmt(it.due):'',it.waitingOn&&P(it.waitingOn)?'מחכה ל'+P(it.waitingOn).name.split(' ')[0]:''].filter(Boolean).join(' · '))}</small>${lkMini(it.links,4)}</div></article>`).join('')||'<div class="km-empty"></div>'}</div>`}).join('')}</div></section>`}).join('');
  m.innerHTML=chips+(lanes||`<div class="empty"><b>אין עדיין תוצרים מהסוג הזה</b><span>כרטיס תוכן עם סוג חומר יופיע כאן לפי השלב שלו.</span></div>`)}
document.addEventListener('click',e=>{const kv=e.target.closest&&e.target.closest('#bKind [data-v]');if(kv&&matMode==='mat'){matMode='status';try{localStorage.setItem('mt-pref-boardmode','status')}catch(x){}setTimeout(renderMat,0)}

  const c=e.target.closest&&e.target.closest('[data-mfmt]');if(c){matFmt=c.dataset.mfmt;renderMat();return}
  const n=e.target.closest&&e.target.closest('[data-mnew]');if(n){const k=n.dataset.mnew;const t=prompt('שם התוצר ('+FMT.find(f=>f[0]===k)[2]+')');if(t&&t.trim()&&typeof createItem==='function')createItem({kind:'content',title:t.trim(),format:k,channel:k==='video'?'video':k==='newsletter'?'newsletter':'post',owner:ME(),status:'idea'});return}
  const g=e.target.closest&&e.target.closest('[data-gomat]');if(g){e.preventDefault();matMode='mat';matFmt=g.dataset.gomat||'all';try{localStorage.setItem('mt-pref-boardmode','mat')}catch(x){}location.hash='#board';setTimeout(renderMat,60)}});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-bmode]');if(!b)return;e.stopPropagation();matMode='mat';try{localStorage.setItem('mt-pref-boardmode','mat')}catch(x){}renderMat()},true);
pdrag({item:'#kanbanMat .kc[data-open]',target:'#kanbanMat .col[data-col]',drop(el,col){const id=el.dataset.open,it=S.items[id];if(!it)return;const to=col.dataset.col,fm=col.dataset.fmt;
  const [p,u]=(it.status||'todo')!==to?statusPatch(it,to):[{},{}];if(fm&&fmtOf(it)!==fm){p.format=fm;u.format=it.format||null}if(!Object.keys(p).length)return;
  saveItem(id,p);if(to==='done'&&p.status)stamp();log(`העביר את "${it.title}" ל${STATUS[to]}`,id);toastUndo(`"${it.title}" · ${STATUS[to]}${p.format?' · '+FMT.find(f=>f[0]===fm)[2]:''}`,()=>saveItem(id,u))}});
/* בכרטיס: בחירת סוג חומר (נכנס לשדות, ליד הערוץ) */
function drawerFmt(){const d=$1('#drawer');if(!d||!S.open||S.mode!=='item'||d.querySelector('#fFmt'))return;const it=S.items[S.open];if(!it||it.kind==='event'||it.kind==='recurring')return;const f=d.querySelector('.dr-body .fields');if(!f)return;
  const cur=it.format||'';const auto=fmtOf({...it,format:null});f.insertAdjacentHTML('beforeend',`<label class="fld">סוג חומר<select id="fFmt"><option value="">${auto?'אוטומטי · '+FMT.find(x=>x[0]===auto)[2]:'לא תוצר'}</option>${FMT.map(([k,,one])=>`<option value="${k}" ${cur===k?'selected':''}>${one}</option>`).join('')}</select></label>`)}
document.addEventListener('change',e=>{if(e.target.id==='fFmt'&&S.open){saveItem(S.open,{format:e.target.value||null})}});
{const d=$1('#drawer');if(d)new MutationObserver(()=>drawerFmt()).observe(d,{childList:true})}
/* בדף הבית: אריח "תוצרים" ראשון בכרטיס הקישורים */
function matTile(){const g=$1('#links26');if(!g||typeof S==='undefined'||!S.loaded)return;const L=matItems();const r=L.filter(i=>READY.has(i.status)).length;
  const ic='__KMICON__';const html=`<div class="lk-tile km-tile"><a href="#board" data-gomat="all" title="כל התוצרים לפי סוג ושלב${r?' · '+r+' מוכנים':''}"><span class="brand lg km-tb">${ic.startsWith('__')?fmtIco('graphic',''):`<img src="${ic}" alt="">`}</span><span>תוצרים</span></a></div>`;
  let grid=g.querySelector('.lk-tiles');if(!grid){const e=g.querySelector('.lk-empty');grid=document.createElement('div');grid.className='lk-tiles';if(e)e.before(grid);else g.append(grid)}
  const old=grid.querySelector('.km-tile');if(old)old.outerHTML=html;else grid.insertAdjacentHTML('afterbegin',html)}
{const _r29=window.renderAll;window.renderAll=function(){const r=_r29.apply(this,arguments);try{renderMat();matTile();drawerFmt()}catch(e){console.error(e)}return r}}
addEventListener('hashchange',()=>{if(location.hash==='#board')setTimeout(renderMat,30)});

/* תאריך גם לפני שהנתונים נטענים */
paintV21();meterToggle();battery();
if(typeof S!=='undefined'&&S.loaded&&window.renderAll)renderAll();
})();
