/* נתוני ההדגמה של "סטודיו אופק" – חברה בדויה. התאריכים יחסיים להיום, כך שההדגמה תמיד עדכנית.
   סימני התמונות מוחלפים בבנייה בתמונות קיימות (אווטארים, כריכות, אייקוני סוכנים). */
window.DEMO_SEED=function(){
  const T=new Date();T.setHours(12,0,0,0);
  const d=n=>{const x=new Date(T);x.setDate(x.getDate()+n);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
  const ts=(n,h=10)=>{const x=new Date(T);x.setDate(x.getDate()+n);x.setHours(h,30,0,0);return x.toISOString()};
  const dow=(target)=>{let n=(target-T.getDay()+7)%7;return n};
  const thu=dow(4)||7,sun=dow(0)||7;
  const remAt=(()=>{const x=new Date(Date.now()+75*60000);return d(0)+'T'+String(x.getHours()).padStart(2,'0')+':'+String(x.getMinutes()).padStart(2,'0')})();
  const people={
    zalmen:{name:'דניאל לוי',role:'מנהל השיווק והתוכן',color:'#3F5499',avatar:'__IMG_AV_zalmen__',uid:'u_demo'},
    mendy:{name:'אברהם שטרן',role:'מאשר את כל התכנים',color:'#5E1542',avatar:'__IMG_AV_mendy__'},
    ben:{name:'יונתן פרץ',role:'מפתח האתר',color:'#1F7FA8',avatar:'__IMG_AV_ben__'},
    kaplan:{name:'עמית גל',role:'כותב רעיונות ותסריטים',color:'#A88A63',avatar:'__IMG_AV_kaplan__'},
    social:{name:'נועה ברק',role:'מראיינת ומצלמת בשטח',color:'#2E8B57',avatar:'__IMG_AV_social__'},
    claude:{name:'אטלס',role:'עוזר השיווק (AI)',color:'#F2911C',initials:'AI',avatar:'__IMG_AV_claude__'}};
  const items={
    launch:{kind:'project',channel:'video',title:'קמפיין השקה · קולקציית החורף',status:'doing',priority:1,owner:'zalmen',start:d(-2),due:d(24),createdAt:ts(-2),
      blocked:{on:true,since:d(-2),who:'zalmen',why:'עוד לא נסגר מי כותב את הרעיונות והתסריטים (עמית או מישהו אחר)'},
      notes:'עשרה סרטונים קצרים לרשתות, שבוע לפני הכנס.',links:[{label:'תיקיית הקמפיין',url:'https://example.com/launch'}],
      steps:[{t:'מסמך ראשי פרטים לקמפיין',done:true,doneAt:ts(-2),owner:'claude'},{t:'לסגור מי כותב רעיונות ותסריטים',done:false,due:d(0),est:30,estSrc:'claude',owner:'zalmen'},
        {t:'טיוטת רעיונות ראשונה שתעזור לתסריטאי',done:false,due:d(0),est:30,estSrc:'claude',owner:'claude',bg:true},{t:'10 תסריטים: פתיח מסקרן וקריאה לפעולה',done:false,due:d(4),owner:'kaplan'},
        {t:'אישור תסריטים',done:false,due:d(5),owner:'mendy'},{t:'צילומים עם לקוחות אמיתיים',done:false,due:d(9),owner:'social'},{t:'עריכה, כתוביות ומוזיקה',done:false,due:d(10),owner:'zalmen'},{t:'תזמון פרסום לשבועיים',done:false,due:d(11),owner:'claude',bg:true}]},
    ga:{kind:'project',channel:'data',title:'Google Analytics לאתר',status:'doing',priority:2,owner:'zalmen',start:d(-2),createdAt:ts(-2),thumb:'__IMG_CV_ga__',thumbArt:true,
      blocked:{on:true,since:d(-2),who:'ben',why:'מחכה שיונתן יחבר את קוד המדידה לאתר'},notes:'אחרי החיבור ייתכן שיעברו עד 48 שעות עד שיופיעו נתונים.',
      steps:[{t:'חשבון, נכס וזרם נתונים לאתר',done:true,doneAt:ts(-2),owner:'claude'},{t:'הרשאות לדניאל, אברהם ויונתן',done:true,doneAt:ts(-2),owner:'claude'},
        {t:'לחבר את קוד המדידה לאתר',done:false,est:30,estSrc:'claude',owner:'ben'},{t:'לבדוק שהנתונים נכנסים',done:false,est:15,estSrc:'claude',owner:'claude',bg:true},{t:'לאשר הארכת שמירת נתונים ל-14 חודשים',done:false,est:5,owner:'zalmen'}]},
    newsletter:{kind:'project',channel:'newsletter',title:'ניוזלטר חודשי ללקוחות',status:'doing',priority:2,owner:'zalmen',start:d(-5),due:d(12),createdAt:ts(-5),thumb:'__IMG_CV_newsletter__',thumbArt:true,
      steps:[{t:'להחליט על תדירות וכלי שליחה',done:false,est:20,owner:'zalmen'},{t:'לבנות מסמך פתיחה לניוזלטר',done:false,owner:'claude',bg:true,est:30,estSrc:'claude'},{t:'רשימת תפוצה מסודרת',done:false,owner:'ben',due:d(8)}]},
    site:{kind:'project',channel:'site',title:'אתר חדש לסטודיו',status:'doing',priority:2,owner:'ben',start:d(-10),due:d(30),createdAt:ts(-10),thumb:'__IMG_CV_site__',thumbArt:true,
      steps:[{t:'מפת אתר ותוכן לדפים',done:true,doneAt:ts(-6),owner:'zalmen'},{t:'עיצוב דף הבית',done:true,doneAt:ts(-3),owner:'ben'},{t:'לבדוק את גווני האתר מול הפלטה',done:false,owner:'claude',bg:true,est:30,estSrc:'claude'},{t:'דפי שירותים ותיק עבודות',done:false,owner:'ben',due:d(14)},{t:'עלייה לאוויר',done:false,owner:'ben',due:d(30)}]},
    brand:{kind:'project',channel:'brand',title:'מדריך המותג המעודכן',status:'review',priority:2,owner:'zalmen',start:d(-8),due:d(3),createdAt:ts(-8),waitingOn:'mendy',thumb:'__IMG_CV_brand__',thumbArt:true,
      notes:'4 החלטות פתוחות: צבע משני, גופן לכותרות, שימוש בלוגו על תמונות, טון בוואטסאפ.',steps:[{t:'טיוטת מדריך',done:true,doneAt:ts(-4),owner:'claude'},{t:'4 החלטות פתוחות',done:true,doneAt:ts(-1),owner:'zalmen'},{t:'אישור סופי',done:false,owner:'mendy',due:d(2)}]},
    workspace:{kind:'project',channel:'admin',title:'חשבון גוגל ארגוני',status:'doing',priority:3,owner:'zalmen',start:d(-6),createdAt:ts(-6),thumb:'__IMG_CV_workspace__',thumbArt:true,
      steps:[{t:'לברר אם יש לסטודיו כבר Google Workspace',done:false,owner:'claude',bg:true,est:15,estSrc:'claude'},{t:'להחליט: Workspace על הדומיין או Gmail ייעודי',done:false,owner:'zalmen',est:10}]},
    weekly:{kind:'project',channel:'weekly',title:'פוסט שבועי · טיפ לסוף השבוע',status:'doing',priority:2,owner:'zalmen',start:d(-4),due:d(sun),createdAt:ts(-4),thumb:'__IMG_CV_newsletter__',thumbArt:true,
      sub:'פוסט פייסבוק שבועי עם טיפ קצר, בגרפיקה הקבועה של הסטודיו.',
      steps:[{t:'תבנית גרפית ננעלה',done:true,doneAt:ts(-4),owner:'claude'},{t:'סגנון כתיבה אושר',done:true,doneAt:ts(-3),owner:'zalmen'},{t:'לבנות סוכן מתוזמן ליום ראשון בבוקר',done:false,due:d(sun),est:60,estSrc:'claude',owner:'claude',bg:true},{t:'החלטה על חתימה קבועה בכל הערוצים',done:false,est:15,owner:'mendy'}]},
    'wk-now':{kind:'content',channel:'weekly',parent:'weekly',title:'פוסט שבועי: __THEME0__',status:'doing',owner:'claude',claudeCan:true,due:d(thu-2<0?0:thu-2),publishAt:d(thu),platforms:['פייסבוק'],est:30,estSrc:'claude',thumb:'__IMG_CV_newsletter__',thumbArt:true,createdAt:ts(-1)},
    reel:{kind:'content',channel:'video',title:'רילס: מאחורי הקלעים בסטודיו',status:'review',owner:'zalmen',waitingOn:'mendy',publishAt:d(3),platforms:['אינסטגרם'],createdAt:ts(-3)},
    story:{kind:'content',channel:'post',title:'סיפור לקוח: מהרעיון לקמפיין',status:'review',owner:'claude',waitingOn:'mendy',publishAt:d(6),platforms:['פייסבוק','אינסטגרם'],createdAt:ts(-2)},
    split:{kind:'content',channel:'video',title:'סרטון "שלושה טעויות בשיווק" להתאמה לרשתות',status:'todo',owner:'zalmen',priority:1,due:d(-1),createdAt:ts(-4),
      blocked:{on:true,since:d(-1),who:'zalmen',why:'צריך להעביר לכאן ZIP עם קבצי המקור של הגרסה האחרונה'}},
    tips:{kind:'content',channel:'post',title:'קרוסלה: 5 טיפים לתמונת מוצר',status:'idea',owner:'kaplan',platforms:['אינסטגרם'],createdAt:ts(-1)},
    expo:{kind:'event',channel:'event',title:'כנס השיווק השנתי',status:'scheduled',priority:1,start:d(18),due:d(20),sub:'מרכז הכנסים. דוכן 14.',thumbLabel:'מרכז הכנסים',createdAt:ts(-10)},
    'rec-weekly':{kind:'recurring',channel:'weekly',title:'הכנת הפוסט השבועי לשבוע הבא',status:'scheduled',owner:'claude',rule:{freq:'weekly',dow:0},start:d(-14),sub:'בכל יום ראשון בבוקר אטלס מכין טיוטה לאישור.'},
    'rec-review':{kind:'recurring',channel:'admin',title:'סקירה שבועית בחדר הבקרה',status:'scheduled',owner:'zalmen',rule:{freq:'weekly',dow:0},start:d(-14)},
    'rec-ga':{kind:'recurring',channel:'data',title:'דוח מדידה חודשי',status:'scheduled',owner:'claude',rule:{freq:'monthly',dom:1},start:d(-30)},
    'rem-call':{kind:'task',title:'להתקשר לספק ההדפסה לגבי הכנס',status:'todo',owner:'zalmen',due:d(0),remindAt:remAt,priority:2,createdAt:ts(0,8)}};
  const activity={
    a1:{at:ts(-1,16),who:'zalmen',text:'שינה סטטוס של "רילס: מאחורי הקלעים בסטודיו" לממתין לאישור',itemId:'reel'},
    a2:{at:ts(-2,11),who:'claude',text:'סיים "מסמך ראשי פרטים לקמפיין"',itemId:'launch'},
    a3:{at:ts(-2,12),who:'claude',text:'סיים "חשבון, נכס וזרם נתונים לאתר"',itemId:'ga'},
    a4:{at:ts(-3,15),who:'ben',text:'סיים "עיצוב דף הבית"',itemId:'site'},
    a5:{at:ts(-4,9),who:'claude',text:'סיים "טיוטת מדריך"',itemId:'brand'},
    a6:{at:ts(-1,10),who:'zalmen',text:'סיים "4 החלטות פתוחות"',itemId:'brand'},
    a7:{at:ts(-5,14),who:'mendy',text:'אישר את "פוסט שבועי: כלי השבוע"',itemId:'weekly'},
    a8:{at:ts(-3,13),who:'zalmen',text:'סיים "סגנון כתיבה אושר"',itemId:'weekly'}};
  const agents={weekly:{img:'__IMG_AG_weekly__'},creative:{img:'__IMG_AG_creative__'},media:{img:'__IMG_AG_media__'},newsletter:{img:'__IMG_AG_newsletter__'},site:{img:'__IMG_AG_site__'},data:{img:'__IMG_AG_data__'}};
  return {items,people,activity,inbox:{},agents,_seed:d(0)};
};
