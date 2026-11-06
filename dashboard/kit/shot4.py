import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':1440,'height':900})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file://'+sys.argv[1]+'#today');await pg.wait_for_timeout(3500)
        await pg.screenshot(path='tour1.png')
        for i in range(2):
            btn=pg.locator('.tour-card button').last
            print(await pg.locator('.tour-card').inner_text())
            await btn.click(force=True);await pg.wait_for_timeout(700)
        await pg.screenshot(path='tour2.png')
        await pg.keyboard.press('Escape')
        # mini cal: click a day and nav
        await pg.goto('file://'+sys.argv[1]+'#today');await pg.wait_for_timeout(2500)
        await pg.click('#miniCal .hcal-nav button >> nth=1',force=True);await pg.wait_for_timeout(500)
        print('cal month',await pg.locator('#miniCal .hcal-month').inner_text(),'drawer open',await pg.evaluate("document.getElementById('drawer').classList.contains('on')"))
        await pg.click('.st >> nth=0',force=True);await pg.wait_for_timeout(600)
        print('story drawer',await pg.evaluate("document.getElementById('drawer').classList.contains('on')"))
        print('errors',errs)
        await b.close()
asyncio.run(main())
