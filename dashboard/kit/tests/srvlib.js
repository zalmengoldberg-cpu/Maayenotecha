const fs=require('fs'),path=require('path');const ROOT=path.join(__dirname,'srv');
module.exports=async function(p){await p.route('http://mock.local/**',r=>{const u=new URL(r.request().url());let f=u.pathname==='/'?'/index.html':u.pathname;const fp=path.join(ROOT,f);
  if(fs.existsSync(fp)&&fs.statSync(fp).isFile())return r.fulfill({body:fs.readFileSync(fp),contentType:f.endsWith('.html')?'text/html; charset=utf-8':'image/webp'});return r.fulfill({status:404,body:''})})};
