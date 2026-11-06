/* סביבת ההדגמה: מסד נתונים מקומי בדפדפן במקום חיבור לחשבון AI. נשמר ב-localStorage ומתאפס מההגדרות.
   בלי AI אמיתי ובלי חיבור לשום חשבון. */
(function(){
  const THEMES=['כלי השבוע','סיפור לקוח','טיפ לעיצוב','מגמות ברשתות','נתון מפתיע','מאחורי הקלעים','שאלות ותשובות','המלצת קריאה','טעות נפוצה','לפני ואחרי'];
  const iso=x=>x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');
  const sat=new Date();sat.setHours(12,0,0,0);sat.setDate(sat.getDate()+((6-sat.getDay()+7)%7));
  const P=[];for(let w=-10;w<=45;w++){const x=new Date(sat);x.setDate(sat.getDate()+w*7);const k=Math.floor(x.getTime()/6048e5);P.push([iso(x),THEMES[((k%THEMES.length)+THEMES.length)%THEMES.length]])}
  window.DEMO_PARASHOT=P;
  const KEY='opk-demo-db-v1';let DB=null;
  const fresh=()=>{const s=window.DEMO_SEED();const th=P.find(p=>p[0]===iso(sat))[1];const it=s.items['wk-now'];if(it)it.title=it.title.replace('__THEME0__',th);return s};
  try{DB=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
  if(!DB||!DB._seed||Math.abs(new Date(DB._seed)-new Date(iso(new Date())))>3*864e5)DB=fresh();
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}};save();
  const subs={};const emit=n=>(subs[n]||[]).forEach(cb=>cb({docs:Object.entries(DB[n]||{}).map(([id,v])=>({id,data:()=>v}))}));
  function coll(name){return{onSnapshot(cb){(subs[name]=subs[name]||[]).push(cb);setTimeout(()=>cb({docs:Object.entries(DB[name]||{}).map(([id,v])=>({id,data:()=>v}))}),30);return()=>{}},
    doc(id){return{set:async v=>{(DB[name]=DB[name]||{})[id]=v;save();emit(name)},update:async v=>{DB[name]=DB[name]||{};DB[name][id]={...(DB[name][id]||{}),...v};save();emit(name)},delete:async()=>{if(DB[name])delete DB[name][id];save();emit(name)}}}}}
  window.__demo={use:async n=>n==='db'?{collection:coll}:n==='user'?{id:'u_demo',name:'דניאל לוי',isOwner:true}:null};
  window.DEMO_RESET=()=>{try{localStorage.removeItem(KEY)}catch(e){}location.reload()};
})();
