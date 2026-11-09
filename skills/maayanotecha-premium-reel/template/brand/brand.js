// ===== Maayanotecha premium brand kit – shared runtime =====
// Every format defines render(t) using these helpers; scripts/render.js calls render(t) per frame.
window.CFG = window.CONFIG || {};
const $ = id => document.getElementById(id);
const clamp = (x,a=0,b=1) => Math.min(b,Math.max(a,x));
const P = (t,a,b) => clamp((t-a)/(b-a));
const lerp = (a,b,k) => a+(b-a)*k;
const E = {
  lin:x=>x, out3:x=>1-Math.pow(1-x,3), out5:x=>1-Math.pow(1-x,5), in3:x=>x*x*x,
  io3:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2, expo:x=>x===1?1:1-Math.pow(2,-10*x),
  inexpo:x=>x===0?0:Math.pow(2,10*x-10), back:x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)}
};
const op = (el,o) => { if(el) el.style.opacity = (+o).toFixed(3); };
const el = (tag,cls,html,parent) => { const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; (parent||$('stage')).appendChild(e); return e; };
const cover = slug => `assets/covers/${slug}.png`;

// --- brand variant knobs: accentHue (deg), accent colours ---
function applyVariant(){
  const V = CFG.variant||{}, r = document.documentElement.style;
  if (V.accent1) r.setProperty('--accent1',V.accent1);
  if (V.accent2) r.setProperty('--accent2',V.accent2);
  if (V.accentHue) document.querySelectorAll('.acc,.bgi.ribbon').forEach(e=>e.style.filter+=` hue-rotate(${V.accentHue}deg)`);
}

// --- background: 'stage' | 'ribbon' | 'glow' (ribbon = animated liquid-glass loop) ---
function makeBackground(kind){
  const b = el('div','L'); b.id='bg';
  if (kind==='stage') el('img','bgi',null,b).src='assets/ap_stage.jpg';
  else if (kind==='ribbon'){ el('div','bg-glow',null,b); const i=el('img','bgi ribbon',null,b); i.id='rib'; i.style.opacity=.42; }
  else el('div','bg-glow',null,b);
  el('div','vignette',null,b);
  return b;
}
function renderBackground(t){
  const r=$('rib'); if(r){ const f='assets/ribbon/r_'+String(Math.floor((t*15)%150)).padStart(4,'0')+'.jpg'; if(!r.src.endsWith(f)) r.src=f; r.style.transform=`scale(${1.05-0.003*t})`; }
  const g=document.querySelector('#bg .bgi:not(.ribbon)'); if(g) g.style.transform=`scale(${1+0.006*t})`;
}

// --- gloss sweep on every .gl / .acc / .shn each frame ---
function renderGloss(t){
  const bp=(110-((t*55)%260))+'% 50%';
  document.querySelectorAll('.gl,.acc').forEach(e=>e.style.backgroundPosition=bp);
  document.querySelectorAll('.shn').forEach(e=>e.style.backgroundPosition=(130-((t*70)%320))+'% 50%');
}

// --- kinetic text: split into words (RTL order kept by the browser), reveal word by word ---
function words(node, text, cls='gl'){
  node.innerHTML = text.split('\n').map(line=>line.split(' ').filter(Boolean).map(w=>`<span class="w ${cls}">${w}</span>`).join(' ')).join('<br>');
  return [...node.querySelectorAll('.w')];
}
function revealWords(ws, t, t0, stagger=0.09, dur=0.35, tOut=null){
  const out = tOut!=null ? E.in3(P(t,tOut,tOut+0.25)) : 0;
  ws.forEach((w,i)=>{ const k=E.out5(P(t,t0+i*stagger,t0+i*stagger+dur));
    w.style.opacity=(k*(1-out)).toFixed(3);
    w.style.transform=`translateY(${(1-k)*50 - out*30}px) scale(${lerp(1.25,1,k)})`;
    w.style.filter=(k<1||out>0)?`blur(${(1-k)*14+out*10}px) drop-shadow(0 22px 26px rgba(0,0,0,.75))`:''; });
}

// --- floating 3D book with reflection ---
function makeBook(slug, w=420, parent){ const i=el('img','book refl',null,parent); i.src=cover(slug); i.style.width=w+'px'; return i; }
function placeBook(img, x, y, {s=1,rx=0,ry=0,rz=0,o=1,bob=0,t=0}={}){
  const by = bob ? Math.sin(t*1.8)*bob : 0;
  img.style.transform=`translate(${x}px,${y+by}px) translate(-50%,-50%) perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`;
  op(img,o);
}

// --- book vortex: spins, collapses (k from 0..1 = in, 1..2 = collapse) ---
function makeVortex(slugs, n=28, parent){ const c=el('div','L vx',null,parent); return [...Array(n)].map((_,i)=>{const im=el('img',null,null,c); im.src=cover(slugs[i%slugs.length]); return im;}); }
function renderVortex(V, t, t0, tCollapse, tEnd, cx=540, cy=900){
  const vin=E.out3(P(t,t0,t0+0.25)), vout=E.in3(P(t,tCollapse,tCollapse+0.3)), ex=E.in3(P(t,tEnd-0.15,tEnd));
  const spin=(t-t0)*8.5+Math.pow(P(t,t0,tCollapse+0.3),2)*6;
  V.forEach((im,i)=>{ const ph=i/V.length*Math.PI*2+(i%3)*0.4, r=(250+(i%4)*85)*lerp(0.15,1,vin)*(1-vout*0.85), a=ph+spin*(1+(i%3)*0.18);
    const depth=(Math.sin(a)+1)/2, sc=(0.42+0.5*depth)*lerp(0.4,1,vin)*(1-vout*0.6);
    im.style.transform=`translate(${cx+r*Math.cos(a)}px,${cy+r*Math.sin(a)*0.34+((i%5)-2)*26*(1-vout)}px) scale(${sc}) rotate(${Math.cos(a)*14}deg)`;
    im.style.opacity=(t<t0||t>tEnd)?0:((0.3+0.7*depth)*vin*(1-vout)*(1-ex)).toFixed(3); im.style.zIndex=String(Math.round(depth*100)); });
}

// --- logos ---
function makeLogo(top=330, parent){ const l=el('div','logo',null,parent); l.style.top=top+'px';
  const sp=el('div','sp',null,l); el('div','shn',null,sp).style.cssText+='-webkit-mask-image:url(assets/logo/splash_mono.png);mask-image:url(assets/logo/splash_mono.png)';
  const wm=el('div','wm',null,l); el('div','shn',null,wm).style.cssText+='-webkit-mask-image:url(assets/logo/new-wordmark-white.png);mask-image:url(assets/logo/new-wordmark-white.png)';
  return {l,sp,wm}; }
function renderLogo(L, t, t0){ const sp=E.back(P(t,t0,t0+0.45)), wk=E.out5(P(t,t0+0.15,t0+0.6));
  L.sp.style.transform=`scale(${lerp(0.2,1,sp)})`; op(L.sp,clamp(sp*1.4));
  L.wm.style.transform=`translateY(${(1-wk)*50}px)`; L.wm.style.filter=`blur(${(1-wk)*14}px) drop-shadow(0 24px 26px rgba(0,0,0,.8))`; op(L.wm,wk);
  L.l.style.translate=`0 ${(Math.sin(t*1.7)*6).toFixed(2)}px`; }
function makeBug(kind){ if(!kind) return null; const i=el('img','bug'); i.src = kind==='yarid' ? 'assets/yarid/yarid_small_mono.png' : 'assets/logo/splash_mono.png'; if(kind!=='yarid'){i.style.width='170px';i.style.marginLeft='-85px';} return i; }

// --- end card (logo + tag + cta + url) ---
function makeEnd(){ const T=CFG.end||{}; const e=el('div','L end'); e.id='end';
  const L=makeLogo(330,e); const tag=el('div','tag h-m gl',T.tag||'בית לספרות חסידית',e);
  const cta=el('div','cta',T.cta||'',e); const url=el('div','url',`<span>${T.url??'maynotechabooks.co.il'}</span>`,e);
  return {e,L,tag,cta,url}; }
function renderEnd(EN, t, t0){ const on=t>=t0-0.05; EN.e.style.display=on?'block':'none'; if(!on) return;
  op(EN.e,P(t,t0-0.05,t0+0.1)); renderLogo(EN.L,t,t0);
  [[EN.tag,t0+0.4],[EN.cta,t0+0.65],[EN.url,t0+0.9]].forEach(([x,s])=>{const k=E.out5(P(t,s,s+0.4)); op(x,k); x.style.transform=`translateY(${(1-k)*36}px)`;}); }

// --- frame-sequence media (video frames as jpg; deterministic seeking) ---
function seqSrc(dir, t, fps, count, loop=false){ let i=Math.floor(t*fps); i = loop? ((i%count)+count)%count : clamp(i,0,count-1); return `${dir}/${String(i).padStart(4,'0')}.jpg`; }

window.brandReady = () => Promise.all([...document.images].map(i=>i.decode?i.decode().catch(()=>{}):0)).then(()=>document.fonts.ready);
