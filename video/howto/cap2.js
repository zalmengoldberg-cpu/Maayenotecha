const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = 'vid/cap/';
fs.mkdirSync(OUT, { recursive: true });
const META = {};
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 875 }, deviceScaleFactor: 3 });
  const p = await ctx.newPage();
  p.on('pageerror', e => console.log('ERR', e.message.slice(0, 160)));
  await p.route(/\/_blob\/([0-9a-f]{32})/, r => {
    const id = r.request().url().match(/_blob\/([0-9a-f]{32})/)[1];
    const f = fs.readdirSync('dash2/blobs').find(x => x.startsWith(id));
    if (!f) return r.fulfill({ status: 404 });
    const ext = path.extname(f).slice(1);
    r.fulfill({ body: fs.readFileSync('dash2/blobs/' + f), contentType: { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[ext] });
  });
  await p.addInitScript({ path: 'dash2/prefs.js' });
  await p.addInitScript({ path: 'dash2/mock.js' });
  await p.clock.install({ time: new Date('2026-11-08T09:30:00+02:00') });
  await p.goto('file://' + process.cwd() + '/dash2/index.html#today');
  await p.clock.runFor(7000); await p.waitForTimeout(2500);
  const hideTour = () => p.evaluate(() => { document.querySelectorAll('.tour').forEach(t => t.hidden = true); });
  await hideTour();
  const settle = async (ms = 1200) => { await p.clock.runFor(ms); await p.waitForTimeout(600); await hideTour(); };

  // crop a region (page coords, viewport-relative since we use clip on viewport) and record sub-boxes
  async function shotEl(name, loc, subs = {}) {
    const el = typeof loc === 'string' ? p.locator(loc).first() : loc;
    await el.scrollIntoViewIfNeeded(); await settle(300);
    const bb = await el.boundingBox();
    await p.screenshot({ path: OUT + name + '.png', clip: bb });
    const m = { w: bb.width, h: bb.height, subs: {} };
    for (const [k, s] of Object.entries(subs)) {
      try {
        const sl = typeof s === 'function' ? s(el) : el.locator(s).first();
        const sb = await sl.boundingBox();
        if (sb) m.subs[k] = { x: sb.x - bb.x, y: sb.y - bb.y, w: sb.width, h: sb.height };
      } catch (e) { console.log('sub fail', name, k); }
    }
    META[name] = m;
    return el;
  }
  async function shotClip(name, clip, subs = {}) {
    await p.screenshot({ path: OUT + name + '.png', clip });
    const m = { w: clip.width, h: clip.height, subs: {} };
    for (const [k, s] of Object.entries(subs)) {
      try { const sb = await p.locator(s).first().boundingBox(); if (sb) m.subs[k] = { x: sb.x - clip.x, y: sb.y - clip.y, w: sb.width, h: sb.height }; } catch (e) { console.log('sub fail', name, k); }
    }
    META[name] = m;
  }

  await p.evaluate(() => scrollTo(0, 0)); await settle(300);
  await shotClip('view', { x: 0, y: 0, width: 1440, height: 875 }, { brief: '#briefBtn', hero: '#heroMt', att: '#attCard', day: '#dayNow', cal: '#miniCal' });
  await shotEl('hero', '#heroMt', { brief: '#briefBtn' });
  await shotEl('daynow', '#dayNow', { agendaLink: 'text=על סדר היום' });
  await shotEl('minical', '#miniCal');
  await shotEl('att', '#attCard', { fix: p => p.getByText('לפתרון').first(), row1: '.att-row, .ar, li' });
  await shotEl('rem', '#rem22');
  await shotEl('links', '#links26');
  await shotEl('pulse', '#pulse');
  await shotEl('reps', '#reps');
  await shotEl('claude', '#claude22', { sendAll: p => p.getByText('שלח הכל').first(), b1: p => p.getByText('לקלוד', { exact: true }).nth(0), b2: p => p.getByText('לקלוד', { exact: true }).nth(1), b3: p => p.getByText('לקלוד', { exact: true }).nth(2), b4: p => p.getByText('לקלוד', { exact: true }).nth(3) });
  await shotEl('done', '#done22', { r1: p => p.getByText('הכין את פוסט פרשת תולדות').first() });
  await shotEl('plist', '#plist');

  // brief card
  await p.evaluate(() => scrollTo(0, 0)); await settle(300);
  await p.click('#briefBtn'); await settle();
  await p.screenshot({ path: OUT + 'brief_full.png' });
  META.brief_full = { w: 1440, h: 875, subs: {} };
  for (const [k, s] of Object.entries({ next: 'text=הבא' })) { const sb = await p.locator(s).first().boundingBox().catch(() => null); if (sb) META.brief_full.subs[k] = sb; }
  try { await p.getByText('הבא').first().click(); await settle(); await p.screenshot({ path: OUT + 'brief_full2.png' }); } catch (e) { console.log('next fail'); }
  await p.keyboard.press('Escape'); await settle();

  // fix modal
  const fx = p.locator('#attCard').getByText('לפתרון').first();
  await fx.scrollIntoViewIfNeeded(); await settle(300);
  await fx.click(); await settle();
  await p.screenshot({ path: OUT + 'fix_full.png' });
  await p.keyboard.press('Escape'); await settle();
  await p.evaluate(() => scrollTo(0, 0)); await settle(300);

  // agenda
  await p.click('#sbAgenda'); await settle(1500);
  await p.screenshot({ path: OUT + 'agenda_full.png' });
  META.agenda_full = { w: 1440, h: 875, subs: {} };
  const cbs = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('button, [role=button], .chk, .cb, input[type=checkbox]').forEach(e => { const r = e.getBoundingClientRect(); if (r.width > 14 && r.width < 40 && Math.abs(r.width - r.height) < 4 && r.left > 380 && r.left < 1300) out.push({ x: r.left, y: r.top, w: r.width, h: r.height, c: e.className }); });
    return out;
  });
  META.agenda_full.checks = cbs;
  const plus = await p.evaluate(() => { const out = []; document.querySelectorAll('button, [role=button]').forEach(e => { const r = e.getBoundingClientRect(); if (r.left < 380 && r.top > 140 && r.width < 40 && r.width > 10) out.push({ x: r.left, y: r.top, w: r.width, h: r.height, t: e.textContent.trim() }); }); return out; });
  META.agenda_full.plus = plus;
  await p.keyboard.press('Escape'); await settle();

  // board
  await p.evaluate(() => location.hash = 'board'); await settle(1500);
  await p.screenshot({ path: OUT + 'board_full.png' });
  fs.writeFileSync(OUT + 'meta.json', JSON.stringify(META, null, 1));
  await b.close();
})();
