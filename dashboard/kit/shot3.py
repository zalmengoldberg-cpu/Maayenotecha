import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':1440,'height':900})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.add_init_script("try{localStorage.setItem('mt-staff-tour-v19','1')}catch(e){}")
        await pg.goto('file://'+sys.argv[1]+'#today');await pg.wait_for_timeout(2500)
        await pg.screenshot(path='full.png',full_page=True)
        for v in ['tasks','calendar','agents']:
            await pg.goto('file://'+sys.argv[1]+'#'+v);await pg.wait_for_timeout(1200);await pg.screenshot(path=v+'.png')
        # tour
        await pg.evaluate("localStorage.removeItem('mt-staff-tour-v19')")
        await pg.goto('file://'+sys.argv[1]+'#today');await pg.wait_for_timeout(2500);await pg.screenshot(path='tour1.png')
        print('errors',errs)
        await b.close()
asyncio.run(main())
