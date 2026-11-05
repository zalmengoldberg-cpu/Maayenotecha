import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.add_init_script("try{localStorage.setItem('mt-staff-tour-v19','1')}catch(e){}")
        await pg.goto('file://'+sys.argv[1]+'#today');await pg.wait_for_timeout(3000)
        await pg.screenshot(path='mob1.png')
        await pg.click('#mobMenu');await pg.wait_for_timeout(800);await pg.screenshot(path='mob2.png')
        pg2=await b.new_page(viewport={'width':1440,'height':900})
        await pg2.add_init_script("try{localStorage.setItem('mt-staff-tour-v19','1')}catch(e){}")
        await pg2.goto('file://'+sys.argv[1]+'#today');await pg2.wait_for_timeout(2500)
        await pg2.screenshot(path='desk1.png')
        await pg2.click('.sb-logo');await pg2.wait_for_timeout(700);await pg2.screenshot(path='desk2.png')
        await pg2.click('.sb-logo');await pg2.wait_for_timeout(300)
        await pg2.click('.pulse-chip',force=True);await pg2.wait_for_timeout(300);await pg2.screenshot(path='desk3.png',clip={'x':0,'y':0,'width':1150,'height':520})
        print('errors',errs)
        await b.close()
asyncio.run(main())
