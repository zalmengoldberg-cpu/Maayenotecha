#!/usr/bin/env python3
"""Pick DIFFERENT fair shots for each new video.
Reads template/footage/catalog.json + used.txt (moments already used), chooses fresh moments
for every slot of the reel hook (G,A,B,D,I,E,F,C,J,K) and the 12-tile grid, writes segs.txt +
grid.txt, and logs the choice in used.txt.  Then run scripts/prepare_footage.sh.
usage: python3 scripts/pick_footage.py [--theme kids|mass|crowd|reading|signage|walk] [--seed N]
                                       [--hook-clip]   # also print a prepare_video.sh command for a 'footage' hook
                                       [--reset]       # forget history"""
import json, random, sys, os, argparse
K=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); F=os.path.join(K,'template','footage')
a=argparse.ArgumentParser(); a.add_argument('--theme'); a.add_argument('--seed',type=int); a.add_argument('--hook-clip',action='store_true'); a.add_argument('--reset',action='store_true'); o=a.parse_args()
cat=json.load(open(os.path.join(F,'catalog.json')))['clips']; up=os.path.join(F,'used.txt')
if o.reset and os.path.exists(up): os.remove(up)
used=set(l.strip() for l in open(up)) if os.path.exists(up) else set()
rnd=random.Random(o.seed)
pool=[(c,m) for c,v in cat.items() for m in v['moments']]
def fresh(tags=None, n=1, dur=1.0, taken=set()):
    def ok(c,m): return f'{c}@{m}' not in used and c not in taken and m+dur<=cat[c]['d']
    cand=[(c,m) for c,m in pool if ok(c,m) and (not tags or set(tags)&set(cat[c]['tags']))]
    if o.theme: cand.sort(key=lambda x: o.theme not in cat[x[0]]['tags'])
    if len(cand)<n:                           # history exhausted -> allow reuse, still avoid this video's clips
        cand=[(c,m) for c,m in pool if c not in taken and m+dur<=cat[c]['d'] and (not tags or set(tags)&set(cat[c]['tags']))]
    head=cand[:max(n*3,len(cand)//2)] if o.theme else cand
    rnd.shuffle(head); out=[]; seen=set()
    for c,m in head+cand:
        if c in seen: continue
        seen.add(c); out.append((c,m))
        if len(out)==n: break
    return out
taken=set(); picks={}
SLOTS=[('G',['entrance','towers','wide'],1.0),('A',['towers','mass','lowangle'],0.8),('B',['towers','lowangle'],0.8),
       ('D',['wide','crowd','walk'],1.2),('I',['walk','wide','crowd'],1.6),('E',['crowd','signage','wide'],1.2),
       ('F',['closeup','hands','basket','cart'],0.8),('C',['reading','kids','portrait'],1.2),('J',['kids','reading','family','closeup'],0.8),('K',['basket','cart','closeup','reading'],0.8)]
for k,tags,d in SLOTS:
    p=fresh(tags,1,d,taken) or fresh(None,1,d,taken); c,m=p[0]; taken.add(c); picks[k]=(c,m,d)
grid=fresh(None,12,1.6,taken); 
with open(os.path.join(F,'segs.txt'),'w') as f:
    for k,(c,m,d) in picks.items(): f.write(f'{k} {c} {m} {d}\n')
with open(os.path.join(F,'grid.txt'),'w') as f:
    for c,m in grid: f.write(f'{c} {m}\n')
with open(up,'a') as f:
    for c,m,_ in picks.values(): f.write(f'{c}@{m}\n')
    for c,m in grid: f.write(f'{c}@{m}\n')
print('hook slots:'); [print(f'  {k}: {c} @{m}s  – {cat[c]["desc"]}') for k,(c,m,d) in picks.items()]
print('grid:', ', '.join(f'{c}@{m}' for c,m in grid))
if o.hook_clip:
    c,m=fresh(['towers','wide','entrance','mass','walk'],1,3.0,taken)[0]
    open(up,'a').write(f'{c}@{m}\n')
    print(f'\nfootage hook: bash scripts/prepare_footage.sh --clip {c} {m} 3 fair_{c}   # -> media/fair_{c}  ({cat[c]["desc"]})')
print('\nnext: bash scripts/prepare_footage.sh')
