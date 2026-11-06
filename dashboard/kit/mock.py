import json,glob,os,sys
db={}
for col in ['items','people','activity','inbox','agents']:
    db[col]={os.path.basename(f)[:-5]:json.load(open(f)) for f in glob.glob(f'db/{col}/*.json')}
# documents saved by ArtifactData may wrap data; normalise
for col,d in db.items():
    for k,v in list(d.items()):
        if isinstance(v,dict) and 'data' in v and isinstance(v['data'],dict) and len(v)<=4: d[k]=v['data']
mock="""<script>
(function(){const DB=%s;
function coll(name){return{onSnapshot(cb){setTimeout(()=>cb({docs:Object.entries(DB[name]||{}).map(([id,v])=>({id,data:()=>v}))}),30);return()=>{}},
 doc(id){return{set:async v=>{(DB[name]=DB[name]||{})[id]=v},update:async v=>{DB[name][id]={...DB[name][id],...v}},delete:async()=>{delete DB[name][id]}}}}}
window.claude={use:async n=>n==='db'?{collection:coll}:n==='user'?{id:'u_test',name:'Zalmen Goldberg',isOwner:true}:null};})();
</script>"""%json.dumps(db,ensure_ascii=False)
body=open(sys.argv[1],encoding='utf8').read()
html='<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0;padding:0;font:14px sans-serif;background:#fff;color:#000}[hidden]:not([hidden=until-found i]){display:none!important}</style>'+mock+'</head><body>'+body+'</body></html>'
open(sys.argv[2],'w',encoding='utf8').write(html)
