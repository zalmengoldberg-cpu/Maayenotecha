import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        for name,vp,full in [('desk',{'width':1440,'height':900},True),('mob',{'width':390,'height':844},True)]:
            pg=await b.new_page(viewport=vp,device_scale_factor=1)
            errs=[]
            pg.on('console',lambda m,errs=errs:errs.append(m.type+': '+m.text) if m.type in('error','warning') else None)
            pg.on('pageerror',lambda e,errs=errs:errs.append('PAGEERROR: '+str(e)))
            await pg.add_init_script("try{localStorage.setItem('mt-staff-tour-v19','1')}catch(e){}")
            await pg.goto('file://'+sys.argv[1]+'#today'); await pg.wait_for_timeout(2500)
            await pg.screenshot(path=f'{name}.png',full_page=full)
            print(name,errs[:15])
            await pg.close()
        await b.close()
asyncio.run(main())
