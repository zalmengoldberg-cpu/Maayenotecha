/* ===== v19: ממשק הצוות של מעיינותיך – מעטפת + תמונת מצב (maayanotecha-staff-ui) =====
   רק תצוגה: כל הנתונים, הפעולות והשמירה נשארים של הקוד הקיים. */
(function(){
const R=document.documentElement,$1=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const LSg=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:v}catch(e){return d}},LSs=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const IC=window.MT_IMG||{};
const mobile=()=>matchMedia('(max-width:1100px)').matches;
const sb=$1('#app .sidebar');

/* ---- סרגל: הלוגו מכווץ/פותח. ההעדפה נשמרת במנגנון הקיים (sb-mini) ---- */
const syncMini=()=>{const c=R.classList.contains('sb-mini')&&!mobile();sb.classList.toggle('is-collapsed',c);const b=sb.querySelector('.sb-logo');if(b){b.setAttribute('aria-expanded',String(!c));b.setAttribute('aria-label',c?'פתיחת הסרגל':'כיווץ הסרגל')}};
sb.addEventListener('ds:logo',e=>{e.preventDefault();
  if(mobile()){const c=sb.classList.toggle('is-collapsed');sb.querySelector('.sb-logo').setAttribute('aria-expanded',String(!c));return}
  const t=$1('#sbCol');if(t)t.click();setTimeout(syncMini,0)});
new MutationObserver(syncMini).observe(R,{attributes:true,attributeFilter:['class']});
addEventListener('resize',syncMini);syncMini();
/* מובייל: פריט בתפריט סוגר את המגירה */
sb.addEventListener('click',e=>{if(mobile()&&e.target.closest('.sb-item[href^="#"]'))R.classList.remove('sb-open')});

/* ---- חיפוש + AI בסרגל: פותח את פלטת החיפוש הקיימת ---- */
const q=$1('#sbQ');
if(q){q.addEventListener('keydown',e=>{if(e.key.length===1&&!e.metaKey&&!e.ctrlKey){e.preventDefault();q.click();const ch=e.key;setTimeout(()=>{const p=$1('#palIn');if(p){p.value+=ch;p.dispatchEvent(new Event('input',{bubbles:true}));p.focus()}},60)}else if(e.key==='Enter'){e.preventDefault();q.click()}});}

/* ---- מצבים ריקים: אייקון תלת-ממדי + כותרת קצרה + הסבר (אותו טקסט) ---- */
const EMPTY_IC={attList:'tasks',tday:'calendar',feed:'activity',bgList:'agents',plist:'catalog',reps:'tasks',projGrid:'catalog',remind:'calendar',inboxList:'agents',laneMe:'tasks',laneBg:'agents',laneWait:'tasks',peopleGrid:'tasks',upcoming:'calendar',dayPanel:'calendar'};
function dressEmpty(root){(root||document).querySelectorAll('#app .empty:not([data-mt])').forEach(el=>{
  const host=el.closest('[id]');const k=host&&Object.keys(EMPTY_IC).find(id=>host.id===id||host.closest('#'+id));
  el.dataset.mt='1';const txt=el.textContent.trim();if(!txt)return;
  const m=txt.match(/^(.+?[.!?])\s+(.+)$/);const ic=IC[EMPTY_IC[k]||'tasks'];
  el.innerHTML=(ic?`<img class="icon-3d" src="${ic}" alt="">`:'')+(m?`<b>${esc(m[1].replace(/\.$/,''))}</b><span>${esc(m[2])}</span>`:`<b>${esc(txt.replace(/\.$/,''))}</b>`)})}

/* ---- כיווץ רשימות ארוכות (רק בתמונת מצב) ---- */
const FOLDS=[['#attCard','.att .ar',3,'att'],['#tday','#tday>div',3,'tday'],['#feed','.feed .fi',3,'feed'],['#plist','.plist .pr',3,'plist'],['#reps','#reps .ldr',3,'reps'],['#bgList','#bgList .row',3,'bg']];
function refold(){FOLDS.forEach(([s,items,n,key])=>{const el=$1(s);const card=el&&(el.classList.contains('card')?el:el.closest('.card'));if(!card)return;
  card.querySelectorAll(':scope>.fold-toggle').forEach(b=>b.remove());card.classList.remove('is-folded');
  card.dataset.fold=n;card.dataset.foldItems=items;card.dataset.foldKey='today-'+key;DS.fold(card)})}

/* ---- הירו: מדד העבודה (שעון החול) מהנתונים הקיימים ---- */
const hero=$1('#heroMt');
const F=[{k:'blocked',label:'שלבים תקועים',weight:14},{k:'late',label:'באיחור',weight:12},{k:'urgent',label:'דחופים',weight:8},{k:'review',label:'ממתינים לאישור מענדי',weight:5},{k:'due',label:'דדליינים קרובים',weight:4}].map(f=>({...f,value:0}));
const pulse=hero?DS.pulse(hero,{factors:F}):null;
function renderPulse(){if(!pulse)return;const att=S.att||[];F.forEach(f=>f.value=att.filter(a=>a.type===f.k).length);pulse.recalc();
  const L=$1('#ppList');if(L)L.innerHTML=F.map(f=>{const pts=f.value*f.weight;return `<li><span class="pp-l">${f.label}</span><span class="pp-v num">${f.value}</span><span class="pp-p num">+${pts}</span><div class="bar"><i style="--v:${Math.min(100,pts*2.5)}%;--c:rgb(var(--pulse-rgb))"></i></div></li>`}).join('')+`<li class="pp-total"><span class="pp-l">סך הכל</span><span class="pp-p num">${pulse.score} / 100</span></li>`}
if(hero){const chip=hero.querySelector('.pulse-chip'),pop=$1('#pulsePop');const setPop=o=>{pop.hidden=!o;chip.setAttribute('aria-expanded',String(o))};
  chip.addEventListener('click',e=>{e.stopPropagation();setPop(pop.hidden)});$1('#ppClose').addEventListener('click',()=>setPop(false));
  document.addEventListener('click',e=>{if(!pop.hidden&&!pop.contains(e.target))setPop(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')setPop(false)})}

/* השבבים של ההירו (אותם נתונים ואותן פעולות כמו קודם) כ-chip-float */
window.renderHero=function(){const el=$1('#heroVis');if(!el||!S.loaded)return;
  const y=yarid();const yn=y&&y.start?daysTo(y.start):null;const att=(S.att||[]).length;const rev=items().filter(i=>i.status==='review').length;
  const wk=items().filter(i=>i.channel==='weekly'&&i.publishAt&&i.publishAt>=iso(TODAY)).sort((a,b)=>a.publishAt.localeCompare(b.publishAt))[0];
  const chips=[yn!=null&&yn>=0?{k:'יריד החסידות',v:yn===0?'היום':yn,u:yn===0?'':'ימים',c:'gold',i:'calendar',go:y.id}:null,{k:'צריכים אותך',v:att,u:'פריטים',i:'bell',go:'#att'},{k:'ממתין לאישור מענדי',v:rev,u:'',i:'clock',list:'status:review'},wk?{k:'הפוסט הבא',v:(wk.title.match(/פרשת\s+\S+/)||[wk.title])[0],u:fmt(wk.publishAt),i:'book',go:wk.id}:null].filter(Boolean);
  el.innerHTML=chips.map(c=>`<button type="button" class="chip-float ${c.c||''}" ${c.go&&c.go[0]==='#'?`data-go="${c.go}"`:c.go?`data-open="${esc(c.go)}"`:c.list?`data-list="${c.list}"`:''}><span class="ic">${DS.icon(c.i,'ico-sm')}</span><span class="lab"><span>${esc(c.k)}</span><b>${esc(String(c.v))}${c.u?`<em>${esc(c.u)}</em>`:''}</b></span></button>`).join('')};

/* ---- עיגולים: פעולות מהירות + סטוריז מהפעילות האחרונה ---- */
const circles=$1('#circles'),cShow=$1('#circlesShow');
const setCircles=v=>{circles.hidden=!v;cShow.hidden=v;LSs('mt-circles',v?'1':'0')};
setCircles(LSg('mt-circles','1')!=='0');
$1('#circlesHide').addEventListener('click',()=>{setCircles(false);cShow.focus()});
cShow.addEventListener('click',()=>{setCircles(true);$1('#circlesHide').focus()});
$1('#qaQueue').addEventListener('click',()=>{const b=$1('#sendAllBg');if(b&&!b.hidden)b.click();else{const c=$1('#bgList');if(c)c.scrollIntoView({behavior:'smooth',block:'center'});toast('אין כרגע משימות שממתינות לשליחה לתור')}});
const seen=new Set(JSON.parse(LSg('mt-stories-seen','[]')));
function renderStories(){const row=$1('#stories');if(!row||typeof feedList!=='function')return;const f=feedList().slice(0,12);
  row.innerHTML=f.map(x=>{const id=x.at+'|'+x.who;const tx=(x.html||'').replace(/<[^>]+>/g,'').trim();const who=(P(x.who)||{}).name||'';
    return `<button type="button" class="st ${seen.has(id)?'seen':''}" data-sid="${esc(id)}" ${x.id?`data-open="${esc(x.id)}"`:''} title="${esc(tx)}"><span class="ring"><span>${av(x.who)}</span></span><b>${esc(who||tx)}</b><small>${esc(tsRel(x.at))}</small></button>`}).join('')||'<div class="st-empty">עוד אין פעילות. כל סימון "בוצע" יופיע כאן.</div>'}
document.addEventListener('click',e=>{const s=e.target.closest('.st[data-sid]');if(!s)return;seen.add(s.dataset.sid);s.classList.add('seen');LSs('mt-stories-seen',JSON.stringify([...seen].slice(-200)));if(!s.dataset.open){const f=$1('#feed');f&&f.scrollIntoView({behavior:'smooth',block:'center'})}});

/* ---- לוח שנה עברי קטן (DS.calendar) על הנתונים הקיימים ---- */
let calSig='';
function miniEvents(){const E={};const t=new Date(TODAY);for(let n=-45;n<=75;n++){const d=new Date(t);d.setDate(t.getDate()+n);const ds=iso(d);
  const ev=dayEvents(ds).filter(e=>e.type!=='par');if(!ev.length)continue;
  E[ds]=ev.map(e=>({t:`<span ${e.it&&e.it.id&&!e.virtual?`data-open="${esc(e.it.id)}" style="cursor:pointer"`:''}>${esc(String(e.label||'').replace(/^(עולה|יעד):\s*/,''))}</span>`,
    s:esc(e.type==='rec'?'קבוע':e.type==='pub'?'עולה · '+(CHANNEL[e.it.channel]||''):e.type==='step'?'שלב ב'+(e.it.title||''):e.type==='evt'?'אירוע':e.type==='pin'?'נעיצה קבועה':'יעד'),
    gold:e.type==='evt'}))}return E}
function tidyCal(root){if(root._tidy)return;root._tidy=1;
  root.querySelectorAll('.hcal-actions [aria-label="סינון"],.hcal-detail .btn-gold').forEach(b=>b.remove());
  const add=root.querySelector('.hcal-actions .btn-brand');const sel=root.querySelector('.hcal-day[aria-pressed="true"]');if(add&&sel)add.dataset.newday=sel.dataset.k;
  root._tidy=0}
window.renderMiniCal=function(){const card=$1('#miniCal');if(!card||!S.loaded)return;const E=miniEvents();const sig=JSON.stringify(E);if(sig===calSig&&card.querySelector('.hcal'))return;calSig=sig;
  card.innerHTML='<div class="hcal" id="mtCal"></div>';const root=card.firstChild;
  new MutationObserver(()=>tidyCal(root)).observe(root,{childList:true});
  root.addEventListener('click',e=>{if(e.target.closest('.hcal-nav button'))e.stopPropagation()});
  DS.calendar(root,{events:E,emptyIcon:IC.calendar});tidyCal(root)};

/* ---- נקודות לקרוסלת המספרים במובייל ---- */
const kp=$1('#kpis'),dots=$1('#kpiDots');
if(kp&&dots){kp.addEventListener('scroll',()=>{const cards=[...kp.children],c=kp.getBoundingClientRect().left+kp.clientWidth/2;let best=0,bd=1e9;cards.forEach((el,n)=>{const r=el.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-c);if(d<bd){bd=d;best=n}});[...dots.children].forEach((d,n)=>d.classList.toggle('on',n===best))},{passive:true})}
function syncDots(){if(!kp||!dots)return;const n=kp.querySelectorAll('.kpi').length;if(dots.children.length!==n)dots.innerHTML=Array.from({length:n},(_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}

/* ---- כניסה מדורגת ---- */
$$('#v-today .hero,#v-today .circles,#v-today .bento>*').forEach((el,n)=>{el.classList.add('reveal');el.style.setProperty('--i',Math.min(n,10))});

/* ---- חיבור ל-renderAll ---- */
function paintV19(){try{renderPulse();renderStories();refold();dressEmpty();syncDots();renderHero()}catch(e){console.error(e)}}
const _ra=window.renderAll;window.renderAll=function(){const r=_ra.apply(this,arguments);paintV19();return r};
new MutationObserver(()=>dressEmpty()).observe($1('main'),{childList:true,subtree:true});
if(S.loaded)renderAll();else dressEmpty();

/* ---- המדריך: בנוי מהמסכים והרכיבים של הדשבורד, בסדר שפוגשים אותם ---- */
new MutationObserver(m=>m.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1&&/(^|\s)tour/.test(n.className||''))n.classList.add('mtx')}))).observe(document.body,{childList:true});
const goToday=()=>{if(location.hash&&location.hash!=='#today')location.hash='#today'};
const showSb=()=>{if(mobile())R.classList.add('sb-open');sb.classList.remove('is-collapsed')};
const hideSb=()=>{if(mobile())R.classList.remove('sb-open')};
const onToday=()=>{goToday();hideSb()};
const circlesOn=()=>!circles.hidden;
const nav=h=>`#app .sidebar .sb-item[href="${h}"]`;
const tour=DS.tour([
  {target:null,title:'ברוכים הבאים לחדר הבקרה',text:'סיור קצר: איפה כל דבר נמצא ואיך משתמשים בו. אפשר לדלג בכל שלב ולחזור למדריך מהסרגל.',before:onToday},
  {target:'[data-tour=pulse]',title:'מדד העבודה',text:'שעון החול משקף את מצב העבודה עכשיו, לפי מה שתקוע, באיחור, דחוף, ממתין לאישור מענדי או קרוב לדדליין. ירוק כשרגוע, זהב כשעמוס ואדום כשדחוף. לחיצה מראה מה משפיע עליו.',tap:true,before:onToday},
  {target:'#mobMenu',only:mobile,title:'פתיחת התפריט',text:'בטלפון התפריט מוסתר. לחיצה על הלוגו של מעיינותיך פותחת אותו.',action:'click',hint:'לחצו על הלוגו'},
  {target:'[data-tour=logo]',title:'הלוגו מכווץ את הסרגל',text:'לחיצה על הלוגו מכווצת את הסרגל כך שנשארים רק האייקונים, ולחיצה נוספת פותחת אותו שוב.',action:'click',hint:'לחצו על הלוגו',before:showSb},
  {target:'[data-tour=logo]',title:'ולחיצה נוספת פותחת',text:'הסרגל חוזר עם השמות של כל המסכים.',action:'click',hint:'לחצו שוב על הלוגו',before:()=>{if(mobile())R.classList.add('sb-open')}},
  {target:'[data-tour=ask]',title:'חיפוש, או שאלה לקלוד',text:'שדה אחד לכל דבר: מחפשים כרטיס, פרויקט או אדם, או כותבים בקשה לקלוד. אפשר גם ⌘K מכל מקום.',tap:true,before:showSb},
  {target:'[data-tour=profile]',title:'החלפת משתמש',text:'רואים את הדשבורד כמו שאדם אחר בצוות רואה אותו: מה שלו ומה מחכה לו.',tap:true,before:showSb},
  {target:'[data-tour=bell]',title:'צריך תשומת לב',text:'המספר מראה כמה דברים מחכים לך. לחיצה מובילה לרשימה.',tap:true,before:showSb},
  {target:'[data-tour=cta]',tapTarget:'#startBtn',title:'מה מחכה לנו',text:'הכפתור הכהה עובר על הדברים שמחכים לך אחד אחרי השני. לידו סידור הלוח: גוררים ומסתירים כרטיסים.',tap:true,before:onToday},
  {target:'[data-tour=quick]',only:circlesOn,title:'פעולות מהירות',text:'תוכן חדש, פרויקט, משימה ושליחת כל המשימות של קלוד לתור, בלחיצה אחת. "שאל את קלוד" פותח את החיפוש. לא צריך? "הסתרה" מעל העיגולים.',tap:true,tapTarget:'#qaAi',before:onToday},
  {target:'[data-tour=stories]',only:circlesOn,title:'פעילות אחרונה',text:'מה קרה לאחרונה ומי עשה את זה. טבעת צבעונית מסמנת עדכון שעוד לא ראיתם.',before:onToday},
  {target:'#kpis',title:'המספרים של היום',text:'ימים ליריד, צעדים שמחכים לך, שלבים שהושלמו, ותקועים ולאישור. לחיצה על כרטיס עוברת למסך המתאים. בטלפון גוללים ביניהם הצידה.',before:onToday},
  {target:'#attCard',title:'צריך תשומת לב',text:'הכי מסוכן קודם. לחיצה על שורה פותחת פתרון, ו"הצגת הכל" פותח את כל הרשימה.',before:onToday},
  {target:'#miniCal',title:'לוח השנה העברי',text:'בוחרים יום ורואים מה עולה ומה צריך לקרות בו. "הוסף אירוע" מוסיף כרטיס ליום שנבחר.',before:onToday},
  {target:'.assist-card',title:'קלוד יכול להכין בינתיים',text:'שלבים שקלוד יכול לעשות ברקע. "שלח" מעביר לתור, וכל מה שחוזר מחכה לאישור.',before:onToday},
  {target:nav('#tasks'),title:'משימות',text:'כל השלבים של כל הפרויקטים, מחולקים למה שעליך, מה שקלוד עושה ברקע ומה שמחכה לאחרים.',before:showSb},
  {target:'#v-tasks .toolbar',title:'מיון וזמן פנוי',text:'ממיינים לפי דחיפות או לפי תאריך. "יש לי" מסנן רק משימות שנכנסות בזמן שיש לך עכשיו, ו"קלוד, הערך זמנים חסרים" ממלא הערכות זמן.',before:()=>{location.hash='#tasks';hideSb()}},
  {target:'#v-tasks .tlay',title:'שלוש עמודות',text:'עליי: מה שרק אתה יכול לקדם. קלוד ברקע: לשלוח ולשכוח עד שזה חוזר לאישור. מחכה לאחרים: מי מחזיק את זה. "↤ לקלוד" מעביר משימה לקלוד, והתיבה מסמנת בוצע.',before:()=>{location.hash='#tasks';hideSb()}},
  {target:nav('#calendar'),title:'לוח שנה',text:'מה עולה, מה בהפקה ומה קבוע, בכל תאריך. אפשר לעבור בין מפת תוכן למשימות ויעדים.',before:showSb},
  {target:nav('#board'),title:'קנבן',text:'כל הכרטיסים לפי שלב, מרעיון ועד פרסום.',before:showSb},
  {target:nav('#gantt'),title:'גאנט',text:'ציר הזמן של כל הפרויקטים, עם מה שתקוע ועם יריד החסידות.',before:showSb},
  {target:nav('#people'),title:'אנשים',text:'מי בצוות ומה כל אחד מחזיק.',before:showSb},
  {target:nav('#agents'),title:'קלוד וסוכנים',text:'מה קלוד עושה לבד, מה הוא מכין לאישור ומה מחכה בתור.',before:showSb},
  {target:'[data-tour=guide]',title:'המדריך תמיד כאן',text:'אפשר לחזור לסיור הזה מתי שרוצים, מ"מדריך למערכת" בסרגל.',tap:true,before:showSb}
],{key:'mt-staff-tour-v19b',onEnd:hideSb});
$1('#tourBtn').addEventListener('click',()=>{hideSb();tour.start()});
setTimeout(()=>{if(S.loaded)tour.autostart();else{const t=setInterval(()=>{if(S.loaded){clearInterval(t);tour.autostart()}},400);setTimeout(()=>clearInterval(t),15000)}},800);
})();
