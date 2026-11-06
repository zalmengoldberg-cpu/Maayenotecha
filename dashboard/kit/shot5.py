import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        errs=[]
        for n,vp in [('t_desk',{'width':1440,'height':900}),('t_mob',{'width':390,'height':844})]:
            pg=await b.new_page(viewport=vp,device_scale_factor=1 if n=='t_desk' else 2)
            pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.add_init_script("try{localStorage.setItem('mt-staff-tour-v19b','1')}catch(e){}")
            await pg.goto('file://'+sys.argv[1]+'#tasks');await pg.wait_for_timeout(2500)
            await pg.screenshot(path=n+'.png')
            w=await pg.evaluate("document.documentElement.scrollWidth");print(n,'scrollWidth',w)
        print('errors',errs);await b.close()
asyncio.run(main())
