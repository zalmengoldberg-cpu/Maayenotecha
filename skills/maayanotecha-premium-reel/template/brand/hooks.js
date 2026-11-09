// ===== Hook library – the first ~2.5s of any format (requires brand.js) =====
// CONFIG.hook = { type, ...fields }   types: question | punch | vortex | coverZoom | stack | count | footage | none
// The hook plays first, then the format starts (its timeline is shifted by hook.dur).
const HOOK_DUR = {question:2.6, punch:2.4, vortex:2.4, coverZoom:2.4, stack:2.6, count:2.4, footage:2.8};

function makeHook(H){
  if(!H || !H.type || H.type==='none') return {dur:0, render(){}};
  const dur = H.dur || HOOK_DUR[H.type] || 2.4;
  const L = el('div','L'); L.style.zIndex=500; L.style.background='#000';
  if(H.background==='stage') el('img','bgi',null,L).src='assets/ap_stage.jpg'; else el('div','bg-glow',null,L);
  const hl = ws => ws.forEach(w=>{ if((H.hl||[]).some(h=>w.textContent.includes(h))) w.className='w acc'; });
  const txt = (text,cls,top) => { const d=el('div','center '+cls,null,L); d.style.top=top+'px'; const ws=words(d,text||''); hl(ws); return ws; };
  let draw = ()=>{};
  switch(H.type){
    case 'question': {          // a personal question, word by word, on black
      const ws = txt(H.text,'h-l',H.top||720);
      draw = t => revealWords(ws,t,0.1,0.16,0.4); break; }
    case 'punch': {             // words slam one at a time, full screen
      const items=(H.words||[]).map((w,i)=>{ const d=el('div','center h-xl '+(i%2?'acc':'gl'),w,L); d.style.top=(H.top||780)+'px'; return d; });
      const step=(dur-0.45)/Math.max(1,items.length);
      draw = t => items.forEach((d,i)=>{ const a=0.05+i*step, last=i===items.length-1, on=t>=a&&(last||t<a+step);
        d.style.display=on?'block':'none'; if(!on) return; const k=E.out5(P(t,a,a+0.18));
        d.style.transform=`scale(${lerp(2.4,1,k)})`; d.style.filter=`blur(${(1-k)*16}px) drop-shadow(0 22px 26px rgba(0,0,0,.75))`; op(d,k); }); break; }
    case 'vortex': {            // book vortex from frame one + headline
      const V=makeVortex(H.covers||[],30,L); const ws=txt(H.text,'h-l',H.top||380);
      draw = t => { renderVortex(V,t,0,dur-0.55,dur,540,1000); revealWords(ws,t,0.3,0.1,0.35); }; break; }
    case 'coverZoom': {         // one cover crashes in from extreme close-up
      const b=makeBook(H.cover,520,L); const ws=txt(H.text,'h-m',H.top||1380);
      draw = t => { const k=E.expo(P(t,0,1.0));
        placeBook(b,540,820,{s:lerp(4.5,1,k),ry:lerp(-40,0,k)+Math.sin(t*1.4)*5,o:clamp(t*6),bob:6,t});
        b.style.filter=`blur(${(1-k)*18}px) drop-shadow(0 40px 40px rgba(0,0,0,.65))`; revealWords(ws,t,0.9,0.1,0.35); }; break; }
    case 'stack': {             // covers fall and pile up
      const cs=(H.covers||[]).slice(0,8), bs=cs.map(c=>makeBook(c,380,L)); bs.forEach(b=>b.classList.remove('refl'));
      const ws=txt(H.text,'h-m',H.top||300), gap=Math.min(0.2,(dur-1.0)/Math.max(1,cs.length));
      draw = t => { bs.forEach((b,i)=>{ const a=0.1+i*gap, k=E.in3(P(t,a,a+0.26)), land=E.back(P(t,a+0.24,a+0.44));
          placeBook(b,540+((i*137)%70-35),1230-i*40-(1-k)*1500,{s:0.86+0.14*land,rz:((i*53)%26-13),o:t>=a?1:0}); });
        revealWords(ws,t,0.2,0.1,0.35); }; break; }
    case 'count': {             // a real number counts up (never invent numbers)
      const n=el('div','center acc','0',L); n.style.cssText+=`top:${H.top||600}px;font-family:Dig,Say;font-size:340px;line-height:1;direction:ltr`;
      const ws=txt(H.label,'h-m',(H.top||600)+420);
      draw = t => { const k=E.out3(P(t,0.05,1.1)); n.textContent=Math.round(k*(H.n||0)).toLocaleString('en-US');
        n.style.transform=`scale(${lerp(1.3,1,k)})`; revealWords(ws,t,0.7,0.1,0.35); }; break; }
    case 'footage': {           // real or AI video (frames from scripts/prepare_video.sh) + caption from frame one
      const F=H.frames||{}, im=el('img',null,null,L); im.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
      const sh=el('div',null,null,L); sh.style.cssText='position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(0deg,rgba(0,0,0,.8),transparent)';
      const ws=txt(H.text,'h-l',H.top||1250);
      draw = t => { const f=seqSrc(F.dir,t*(F.speed||1),F.fps||25,F.count||1,true); if(!im.src.endsWith(f)) im.src=f;
        im.style.transform=`scale(${1.04+0.05*t/dur})`; revealWords(ws,t,0,0.1,0.35); }; break; }
  }
  if(H.bug) { const b=makeBug(H.bug); L.appendChild(b); }
  const flash = el('div','flash'); flash.style.zIndex=501;
  return { dur, render(t){
    L.style.display = t<dur ? 'block' : 'none';
    if(t<dur){ draw(t); const out=E.in3(P(t,dur-0.25,dur)); op(L,1-out); L.style.transform=`scale(${1+out*0.08})`; }
    op(flash, Math.max(0,1-Math.abs(t-(dur-0.05))/0.18)*0.7);
  }};
}

// wrap a format's render(t): hook first, then the format shifted by hook.dur
function withHook(renderFn, baseDuration){
  const H = makeHook(CFG.hook); window.HOOK = H;
  const base = window.DURATION ?? baseDuration;
  if(base!=null) window.DURATION = base + H.dur;
  return t => { H.render(t); renderFn(t - H.dur); };
}
