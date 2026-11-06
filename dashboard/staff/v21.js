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
function paintV21(){try{skillKpis();greet();setDate();ganttMobile();peopleClick()}catch(e){console.error(e)}}
const _ra=window.renderAll;window.renderAll=function(){const r=_ra.apply(this,arguments);paintV21();return r};

/* עיגולים בכל מסך: הסתרה והצגה משותפות עם תמונת מצב (אותו מפתח, mt-circles) */
function syncCircles(){const home=$1('#circles');if(!home)return;const off=home.hidden;
  document.querySelectorAll('.circles-page').forEach(c=>{c.hidden=off;const sh=c.nextElementSibling;if(sh&&sh.matches('[data-circles-show]'))sh.hidden=!off})}
document.addEventListener('click',e=>{const h=e.target.closest('[data-circles-hide]'),s=e.target.closest('[data-circles-show]');
  if(h){$1('#circlesHide')?.click();syncCircles();s||h.closest('.circles-page')?.nextElementSibling?.focus()}
  else if(s){$1('#circlesShow')?.click();syncCircles()}
  else if(e.target.closest('#circlesHide,#circlesShow'))setTimeout(syncCircles)});
syncCircles();

/* תאריך גם לפני שהנתונים נטענים */
paintV21();
if(window.S&&S.loaded&&window.renderAll)renderAll();
})();
