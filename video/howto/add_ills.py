s = open('comp3.html', encoding='utf8').read()
if '.ill{' not in s:
    css = (".ill{position:absolute;z-index:25;pointer-events:none;filter:drop-shadow(0 30px 40px rgba(20,26,51,.35));will-change:transform}\n"
           ".D .ill{filter:drop-shadow(0 30px 50px rgba(0,0,0,.6)) drop-shadow(0 0 30px rgba(242,145,28,.25))}\n</style>")
    s = s.replace("</style>", css, 1)
    M = {'s2': ('gauge', 20, 1030, 270, 0.5, None), 's3': ('sun', 20, 470, 260, 0.6, None), 's4': ('warn', 14, 500, 240, 0.5, 2.2),
         's5': ('cal', 16, 470, 250, 0.6, None), 's6': ('check', 24, 1360, 260, 0.9, None), 's8': ('spark', 24, 520, 240, 0.6, None),
         's9': ('check', 30, 1150, 220, 0.6, None), 's10': ('kanban', 16, 1600, 300, 0.8, None), 's11': ('team', 30, 1290, 300, 0.6, None)}
    for sid, (n, x, y, w, t0, out) in M.items():
        i = s.index('id="%s"' % sid)
        j = s.index('</section>', i)
        img = '<img class="ill" src="ill/%s.png" data-t="%s" data-out="%s" style="left:%dpx;top:%dpx;width:%dpx" alt="">' % (n, t0, out or '', x, y, w)
        s = s[:j] + img + s[j:]
    anim = ("function ills(sc,lt){$$('.ill',sc).forEach((im,k)=>{const t0=+im.dataset.t;const out=im.dataset.out?+im.dataset.out:1e9;"
            "const x=back(P(lt,t0,t0+0.6));const o=1-P(lt,out,out+0.3);im.style.opacity=clamp(P(lt,t0,t0+0.2))*o;"
            "im.style.transform='translateY('+(Math.sin(lt*2.1+k)*12)+'px) rotate('+(Math.sin(lt*1.3+k)*5-(1-Math.max(0,x))*25)+'deg) scale('+Math.max(0,x)+')'})}\n"
            "const TR=0.24;")
    s = s.replace("const TR=0.24;", anim, 1)
    s = s.replace("el.style.display='block';upd(s.id,el,t-s.a)}", "el.style.display='block';upd(s.id,el,t-s.a);ills(el,t-s.a)}")
    open('comp3.html', 'w', encoding='utf8').write(s)
m = open('cap/meta.json').read()
open('comp3b.html', 'w', encoding='utf8').write(s.replace('__META__', m))
print('ok', s.count('class="ill"'))
