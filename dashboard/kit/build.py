#!/usr/bin/env python3
"""Builds the v19 (maayanotecha-staff-ui) version of the dashboard from the published index.html."""
import base64, re, sys, pathlib
B = pathlib.Path(__file__).resolve().parent
SK = pathlib.Path('/mnt/skills/plugins/maayanotecha-staff-ui')
SRC = pathlib.Path(sys.argv[1]); OUT = pathlib.Path(sys.argv[2])
s = SRC.read_text(encoding='utf8')
# the host wraps the page in its own skeleton at publish time: keep only what the author wrote
if s.lstrip().lower().startswith('<!doctype'):
    s = s[s.index('<body>') + len('<body>'):]
    s = s[:s.rindex('</body>')]

def uri(p, mt=None):
    p = pathlib.Path(p); mt = mt or ('image/svg+xml' if p.suffix == '.svg' else 'image/webp')
    return f'data:{mt};base64,' + base64.b64encode(p.read_bytes()).decode()

def sub1(old, new, count=1):
    global s
    n = s.count(old)
    if n < 1: raise SystemExit(f'NOT FOUND: {old[:90]!r}')
    s = s.replace(old, new, count)

def mini(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S); css = re.sub(r'\s+', ' ', css)
    return re.sub(r'\s*([{};,>])\s*', r'\1', css).strip()

# ---------- class names that already exist in the dashboard: skill rules that use them are scoped under .mtx ----------
COLLIDE = set('bad bar big brand btn card dot empty gauge go gold h hero i ic ico kpi lab lbl legend lg meta more n num ok on plum sb-bell search seg sm sub tag tb tm tnum tools up who'.split())
def scope_sel(sel):
    sel = sel.strip()
    if not sel or sel.startswith(('from', 'to')) or re.fullmatch(r'[\d.]+%', sel): return sel
    cls = set(re.findall(r'\.([a-zA-Z][\w-]*)', sel))
    hit = cls & COLLIDE
    if not hit: return sel
    if '.glass-ui' in sel and hit <= {'card'}: return sel
    return '.mtx ' + sel
def scope_css(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out, i = [], 0
    while i < len(css):
        j = css.find('{', i)
        if j < 0: out.append(css[i:]); break
        head = css[i:j].strip()
        if head.startswith('@media') or head.startswith('@supports'):
            depth, k = 1, j + 1
            while depth:
                if css[k] == '{': depth += 1
                elif css[k] == '}': depth -= 1
                k += 1
            out.append(head + '{' + scope_css(css[j + 1:k - 1]) + '}'); i = k; continue
        k = css.find('}', j)
        body = css[j + 1:k]
        if head.startswith('@keyframes'):
            depth, k = 1, j + 1
            while depth:
                if css[k] == '{': depth += 1
                elif css[k] == '}': depth -= 1
                k += 1
            out.append(css[i:k]); i = k; continue
        if head.startswith('@'): out.append(css[i:k + 1]); i = k + 1; continue
        out.append(','.join(scope_sel(x) for x in head.split(',')) + '{' + body + '}'); i = k + 1
    return ''.join(out)

tokens = (SK / 'references/tokens.css').read_text()
# skin.css: only page-level typography/links/focus (the dashboard already styles its own buttons, fields, tables and cards)
skin = (SK / 'references/skin.css').read_text()
skin = skin.split('/* כפתורים')[0]
comps = scope_css((SK / 'references/components.css').read_text())

IMG = {
  'ondark': uri(SK / 'assets/logos/maayanotecha-logo-ondark.svg'),
  'logo': uri(SK / 'assets/logos/maayanotecha-logo.svg'),
  'calm': uri(SK / 'assets/img/pulse-calm.webp'), 'busy': uri(SK / 'assets/img/pulse-busy.webp'), 'urgent': uri(SK / 'assets/img/pulse-urgent.webp'),
  'silk': uri(SK / 'assets/img/silk-waves.webp'), 'flame': uri(SK / 'assets/img/assistant-flame.webp'),
  'calendar': uri(SK / 'assets/icons-3d/calendar.webp'), 'catalog': uri(SK / 'assets/icons-3d/catalog.webp'),
  'tasks': uri(B / 'icons/tasks.webp'), 'activity': uri(B / 'icons/activity.webp'), 'agents': uri(B / 'icons/agents.webp'),
}
override = (B / 'override.css').read_text().replace('__SILK__', IMG['silk']).replace('__FLAME__', IMG['flame'])

# ---------- 1. light only ----------
sub1("document.documentElement.dataset.skin=localStorage.getItem('mt-skin')||'dark'", "document.documentElement.dataset.skin='light'")
sub1("catch(e){document.documentElement.dataset.skin='dark'}", "catch(e){document.documentElement.dataset.skin='light'}")
sub1("var k='mt-skin',v='dark';try{v=localStorage.getItem(k)||'dark'}catch(e){}", "var k='mt-skin',v='light';")
sub1("var b=e.target.closest&&e.target.closest('#skinT');if(!b)return;", "return;")

# ---------- 2. wallpapers → aurora variants (the "רקע" picker stays) ----------
def aurora(stops, base):
    g = ''.join(f"%3CradialGradient id='{n}' cx='{cx}' cy='{cy}' r='{r}'%3E%3Cstop offset='0' stop-color='%23{c}' stop-opacity='{o}'/%3E%3Cstop offset='1' stop-color='%23{c}' stop-opacity='0'/%3E%3C/radialGradient%3E"
                for n, (cx, cy, r, c, o) in enumerate(stops))
    rects = ''.join(f"%3Crect width='1600' height='1000' fill='url(%23{n})'/%3E" for n in range(len(stops)))
    a, b2, c2 = base
    return ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000' preserveAspectRatio='xMidYMid slice'%3E%3Cdefs%3E"
            f"%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23{a}'/%3E%3Cstop offset='.5' stop-color='%23{b2}'/%3E%3Cstop offset='1' stop-color='%23{c2}'/%3E%3C/linearGradient%3E"
            + g.replace("id='", "id='g") + "%3C/defs%3E%3Crect width='1600' height='1000' fill='url(%23b)'/%3E" + rects.replace("url(%23", "url(%23g") + "%3C/svg%3E")
WALLS = {
  'mt-aurora': aurora([('.92', '0', '.55', '546CB8', '.5'), ('.22', '.08', '.45', '6FC4D4', '.42'), ('.62', '1', '.5', 'F2AA5A', '.26'), ('0', '.72', '.42', '7A5BB8', '.2')], ('D8DEEB', 'E4EBEC', 'EEEAE2')),
  'mt-dawn':   [('.85', '.05', '.55', 'F2AA5A', '.34'), ('.15', '.15', '.45', '6476B6', '.3'), ('.5', '1', '.55', 'C6CDE6', '.5')],
  'mt-sea':    [('.9', '.1', '.55', '4A8BAA', '.42'), ('.2', '.9', '.5', '3F5499', '.3'), ('.5', '.3', '.4', 'BFE3EA', '.4')],
  'mt-dusk':   [('.85', '.05', '.5', '6A55A8', '.36'), ('.1', '.3', '.45', 'C2477C', '.18'), ('.6', '1', '.55', 'F2911C', '.2')],
  'mt-calm':   [('.85', '.0', '.6', 'C6CDE6', '.55'), ('.15', '1', '.55', 'E4E8F4', '.6')],
}
bases = {'mt-dawn': ('E6E1E6', 'ECE8EA', 'F1ECE4'), 'mt-sea': ('D6E2EA', 'E1EAEE', 'ECEFEF'), 'mt-dusk': ('DCD9E8', 'E5E2EC', 'EFE9E6'), 'mt-calm': ('E7EAF1', 'ECEEF3', 'F3F1EC')}
walls_js = ''.join(f'"{k}|light":"{(v if isinstance(v, str) else aurora(v, bases[k]))}","{k}|dark":"{(v if isinstance(v, str) else aurora(v, bases[k]))}",' for k, v in WALLS.items())
sub1('const WALLS={', 'const WALLS={' + walls_js)
sub1("const NAMES=[['mist','ערפל'],['orig','המקורי'],['plain','חלק'],['bloom','פריחה'],['hills','גבעות'],['waves','גלים'],['material','צורות'],['dusk','דמדומים'],['ocean','אוקיינוס'],['aurora','זוהר']];",
     "const NAMES=[['mt-aurora','זוהר המעיין'],['mt-dawn','שחר'],['mt-sea','ים'],['mt-dusk','דמדומים'],['mt-calm','שקט']];")
sub1("const DEF={light:'mist',dark:'mist'};", "const DEF={light:'mt-aurora',dark:'mt-aurora'};")
sub1("const get=()=>{try{return localStorage.getItem('mt-bg2-'+sk())||DEF[sk()]}catch(e){return DEF[sk()]}};",
     "const get=()=>{let v=null;try{v=localStorage.getItem('mt-bg2-'+sk())}catch(e){}return NAMES.some(n=>n[0]===v)?v:DEF[sk()]};")
sub1('<div class="bg-note">הבחירה נשמרת בנפרד לבהיר ולכהה. הצבעים והשקיפות מתאימים את עצמם לרקע.</div>', '<div class="bg-note">הבחירה נשמרת בדפדפן הזה.</div>')

# ---------- 3. JS selectors that pointed at the old sidebar ----------
sub1("e.target.closest('aside.side .promo,aside.side .brand .mk,aside.side .me')", "e.target.closest('#app .sidebar .sb-promo')")
sub1("e.target.closest('aside.side a[href^=\"#\"]')", "e.target.closest('#app .sidebar a[href^=\"#\"]')")
sub1("document.querySelector('aside.side .me')", "document.querySelector('#app .sidebar .sb-me')")
s = s.replace("document.querySelectorAll('.snav a,.mob-nav a')", "document.querySelectorAll('.sb-nav a')")
s = s.replace("document.querySelectorAll('.snav a').forEach", "document.querySelectorAll('.sb-nav a').forEach")

# ---------- 4. sidebar ----------
a0 = s.index('<aside class="side"'); a1 = s.index('</aside>', a0) + len('</aside>')
def item(h, ic, lbl, n=None, cls=''):
    badge = f'<span class="badge {cls}" data-n="{n}" hidden></span>' if n else ''
    return f'<a class="sb-item" href="{h}"><span class="i" data-icon="{ic}" data-icon-class="ico-sm"></span><span class="lbl">{lbl}</span>{badge}</a>'
def gen(proxy, ic, lbl, extra=''):
    return f'<button type="button" class="sb-item sg" data-proxy="{proxy}"><span class="i" data-icon="{ic}" data-icon-class="ico-sm"></span><span class="lbl">{lbl}</span>{extra}</button>'
sidebar = f'''<div class="mtx mtx-wrap"><aside class="sidebar" aria-label="ניווט" data-tour="sidebar">
    <div class="sb-head">
      <button class="sb-logo" data-tour="logo" type="button" aria-label="כיווץ הסרגל" aria-expanded="true"><img class="sb-logo-full" src="{IMG['ondark']}" alt="מעיינותיך"></button>
      <button class="sb-icon-btn sb-bell" data-tour="bell" type="button" data-go="#att" aria-label="צריך תשומת לב" data-icon="bell" data-icon-class="ico-sm"><span class="badge" id="sbBellC" hidden></span></button>
      <button type="button" id="sbCol" hidden aria-label="כיווץ הסרגל"></button>
    </div>
    <div class="sb-rule"></div>
    <button class="sb-profile" id="sbProf" data-tour="profile" type="button"><span id="sbAv"></span><span class="who"><b id="sbName" dir="ltr">Zalmen Goldberg</b><span data-icon="swap" data-icon-class="ico-sm">החלפת משתמש</span></span><svg class="ico ico-sm" aria-hidden="true"><use href="#i-chevL"/></svg></button>
    <label class="ai-search" data-tour="ask"><span class="field" data-icon="searchAi" data-icon-class="ico-sm"><span class="sr-only">חיפוש, או שאלה לקלוד</span><input id="sbQ" type="search" placeholder="חיפוש, או שאלה לקלוד…" data-pal="1" autocomplete="off"></span></label>
    <nav class="sb-nav" data-tour="nav">
      <div class="sb-label">עבודה</div>
      {item('#today','home','תמונת מצב')}{item('#tasks','check','משימות','nTasks','')}{item('#calendar','calendar','לוח שנה','nCal','soft')}{item('#board','panel','קנבן','nBoard','soft')}{item('#gantt','chart','גאנט','nGantt','')}
      <div class="sb-label">צוות</div>
      {item('#people','users','אנשים')}
      <div class="sb-label">קלוד</div>
      {item('#agents','sparkle','קלוד וסוכנים','nInbox','soft')}
      <div class="sb-label">כללי</div>
      {gen('bgT','image','רקע')}{gen('openModeT','swap','פתיחת כרטיסים','<em class="sg-v" id="sgOpenV"></em>')}{gen('arrangeBtn','sliders','סידור הלוח')}
      <button class="sb-item" id="tourBtn" data-tour="guide" type="button"><span class="i" data-icon="help" data-icon-class="ico-sm"></span><span class="lbl">מדריך למערכת</span></button>
    </nav>
    <div class="sb-foot">
      <div class="sb-promo"><b>קלוד ברקע</b><span id="promoTxt"></span><button type="button" id="promoBtn" class="btn btn-sm btn-secondary ai-mode">שלח הכול לתור</button></div>
      <div class="sync8" id="sync8"></div>
    </div>
  </aside></div>'''
s = s[:a0] + sidebar + s[a1:]

# ---------- 5. top bar: only what the sidebar does not have; mobile = logo that opens the drawer ----------
t0 = s.index('<div class="topb">'); t1 = s.index('<main>', t0)
topb = s[t0:t1]
topb_new = topb.replace('<div class="topb">', f'<div class="topb"><button class="topbar-logo" id="mobMenu" type="button" aria-label="פתיחת התפריט"><img src="{IMG["logo"]}" alt="מעיינותיך"></button>', 1)
topb_new = re.sub(r'<nav class="mob-nav".*?</nav>', '', topb_new, flags=re.S)
s = s[:t0] + topb_new + s[t1:]

# ---------- 6. hero with the work pulse + circles ----------
h0 = s.index('<div class="pagehead herohead">'); h1 = s.index('<div class="bento" data-arrange="today2">', h0)
old_hero = s[h0:h1]
assert 'id="startBtn"' in old_hero and 'id="hiddenBtn"' in old_hero
hero = f'''<div class="mtx mtx-wrap"><section class="hero open-top hero-pulse" id="heroMt" data-alive="sand" data-neck="0.345,0.478" data-floor="0.68" aria-label="פתיחה ומדד העבודה">
      <div class="hero-art" aria-hidden="true"><img data-level="calm" alt="" src="{IMG['calm']}"><img data-level="busy" alt="" src="{IMG['busy']}"><img data-level="urgent" alt="" src="{IMG['urgent']}"></div>
      <button class="chip-float chip-a pulse-chip" type="button" aria-expanded="false" aria-controls="pulsePop" data-tour="pulse"><span class="ps-dot" aria-hidden="true"></span><span class="lab"><span>מדד העבודה</span><b><span class="ps-score num">0</span><span class="ps-level">רגוע</span></b></span><svg class="ico ico-sm ps-chev" aria-hidden="true"><use href="#i-chevD"/></svg></button>
      <div class="pulse-pop" id="pulsePop" role="dialog" aria-label="מה משפיע על מדד העבודה" hidden><div class="pp-head"><b>מה משפיע על המדד עכשיו</b><button class="kebab" type="button" id="ppClose" aria-label="סגירה" data-icon="plus" data-icon-class="ico-sm"></button></div><ul class="pp-list" id="ppList"></ul></div>
      <div class="hero-copy">
        <span class="eyebrow">תמונת מצב · <span id="hdate"></span></span>
        <h1 class="t-h1" id="greet" dir="ltr">Zalmen</h1>
        <p class="t-muted" id="dateLine">טוען...</p>
        <div class="hero-cta" data-tour="cta"><button class="btn btn-primary hh-go" id="startBtn" type="button" data-icon="arrowUpLeft" data-icon-class="ico-sm"><span id="startTxt">מה מחכה לנו</span></button><button class="btn btn-ghost" id="arrangeBtn" type="button" data-icon="sliders" data-icon-class="ico-sm">סידור הלוח</button><button class="btn btn-ghost" id="hiddenBtn" type="button" hidden></button></div>
        <div class="hero-chips" id="heroVis"></div>
      </div>
    </section>
    <section class="circles" id="circles" aria-label="פעולות מהירות ופעילות אחרונה">
      <button class="circles-hide" id="circlesHide" type="button" aria-controls="circles" data-icon="eyeOff" data-icon-class="ico-sm">הסתרה</button>
      <div class="quick" data-tour="quick" aria-label="פעולות מהירות">
        <button class="qa" type="button" data-new="content"><span class="qi" data-icon="image"></span>תוכן</button>
        <button class="qa" type="button" data-new="project"><span class="qi" data-icon="box"></span>פרויקט</button>
        <button class="qa" type="button" data-new="task"><span class="qi" data-icon="check"></span>משימה</button>
        <button class="qa" type="button" id="qaQueue"><span class="qi" data-icon="send"></span>שלח הכול לתור</button>
        <button class="qa ai ai-mode" type="button" id="qaAi" data-pal="1"><span class="qi" data-icon="sparkle"></span>שאל את קלוד</button>
      </div>
      <div class="stories" data-tour="stories"><div class="st-head"><h3 id="st-h">פעילות אחרונה</h3></div><div class="st-row" id="stories" aria-labelledby="st-h"></div></div>
    </section>
    <button class="circles-show" id="circlesShow" type="button" hidden data-icon="eye" data-icon-class="ico-sm">הצגת הקיצורים והפעילות</button></div>
    '''
s = s[:h0] + hero + s[h1:]

# ---------- 7. today cards: anchors for KPI dots, calendar, assistant ----------
sub1('<div class="s12"><div class="bento" id="kpis">', '<div class="s12"><div class="bento" id="kpis" data-tour="kpis">')
k = s.index('id="kpis"'); ke = s.index('</div></div>', s.index('<div class="skel s3"></div><div class="skel s3"></div><div class="skel s3"></div><div class="skel s3"></div>', k))
s = s[:ke] + '</div><div class="kpi-dots" id="kpiDots" aria-hidden="true"></div></div>' + s[ke + len('</div></div>'):]
sub1('<div class="card pane s4 minical" id="miniCal"></div>', '<div class="card pane s4 minical mtx" id="miniCal" aria-label="לוח שנה עברי"></div>')
sub1('<div class="card pane s12"><div class="ch"><div class="ttl"><span class="ico">', '<div class="card pane s12 assist-card"><div class="ch"><div class="ttl"><span class="ico">')

# ---------- 8. styles + script ----------
FONT = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;800;900&display=swap">'
head_css = f'{FONT}<style id="mt-ds">{mini(tokens)}{mini(skin)}{mini(comps)}</style><style id="mt-v19">{mini(override)}</style>'
last_style = s.rindex('</style>', 0, s.index('<div dir="rtl" id="app"'))
s = s[:last_style + len('</style>')] + head_css + s[last_style + len('</style>'):]
s = s.replace('<div dir="rtl" id="app" class="app">', '<div dir="rtl" id="app" class="app glass-ui">', 1)
sub1("document.documentElement.dataset.skin='light'}catch(e)", "document.documentElement.dataset.skin='light';document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('mt-skin','bg-aurora')})}catch(e)")
ds = (SK / 'references/ds.js').read_text()
imgjs = 'window.MT_IMG=' + '{' + ','.join(f'"{k}":"{IMG[k]}"' for k in ('calendar', 'catalog', 'tasks', 'activity', 'agents')) + '};'
tail = f'<script>{ds}</script><script>{imgjs}</script><script>{(B / "v19.js").read_text()}</script>'
s = s + tail
OUT.write_text(s, encoding='utf8')
print('ok', len(s))
