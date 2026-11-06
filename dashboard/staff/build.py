#!/usr/bin/env python3
"""v21: חדר הבקרה על מערכת העיצוב maayanotecha-staff-ui בלבד.

מקור הלוגיקה: backups/v20_out.html (כל הסקריפטים נשמרים).
מה שיורד: כל ה-CSS של v4–v20 (שלושת בלוקי ה-style) והגופנים הישנים.
מה שנכנס: tokens + skin + components של הסקיל (בלי scoping), v21.css (פריסה וחיבור
המבנה הקיים לרכיבי הסקיל, רק בטוקנים של הסקיל), ds.js העדכני של הסקיל, ו-v21.js.

שימוש: python3 staff/build.py backups/v20_out.html staff/v21.html
הפלט הוא גוף העמוד בלבד (המארח של claude.ai עוטף אותו), כמו הגרסה המפורסמת.
"""
import base64, pathlib, re, sys

B = pathlib.Path(__file__).resolve().parent
SK = B.parent.parent / 'design-system/skill/maayanotecha-staff-ui'
SRC, OUT = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
s = SRC.read_text(encoding='utf8')
if s.lstrip().lower().startswith('<!doctype'):
    s = s[s.index('<body>') + 6:s.rindex('</body>')]


def uri(p):
    p = pathlib.Path(p)
    mt = 'image/svg+xml' if p.suffix == '.svg' else 'image/webp'
    return f'data:{mt};base64,' + base64.b64encode(p.read_bytes()).decode()


def mini(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'\s+', ' ', css)
    return re.sub(r'\s*([{};,>])\s*', r'\1', css).strip()


def sub1(old, new):
    global s
    if s.count(old) != 1:
        raise SystemExit(f'expected exactly one match for {old[:80]!r}, found {s.count(old)}')
    s = s.replace(old, new)


# ---------- 1. בלי ה-CSS הישן ----------
styles = list(re.finditer(r'<style[^>]*>.*?</style>', s, flags=re.S))
assert len(styles) == 3, len(styles)
for m in reversed(styles):
    s = s[:m.start()] + s[m.end():]

# ---------- 2. Rubik בלבד ----------
s = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2\?family=Assistant[^"]*">\n?', '', s)
assert 'family=Rubik' in s and 'Poppins' not in s.split('<script')[0]

# ---------- 3. ה-CSS של הסקיל + v21.css ----------
ref = SK / 'references'
silk = uri(SK / 'assets/img/silk-waves.webp')
flame = uri(SK / 'assets/img/assistant-flame.webp')
css = '\n'.join([
    (ref / 'tokens.css').read_text(encoding='utf8'),
    (ref / 'skin.css').read_text(encoding='utf8'),
    (B / 'v21-reset.css').read_text(encoding='utf8'),
    (ref / 'components.css').read_text(encoding='utf8'),
    (B / 'v21.css').read_text(encoding='utf8').replace('__SILK__', silk).replace('__FLAME__', flame),
])
sub1('<meta name="claude:viewport-fit-sides" content="cover">',
     '<meta name="claude:viewport-fit-sides" content="cover">\n<style id="mt-staff">' + mini(css) + '</style>')

# ---------- 3ב. צבעי הכריכות והגרפים מהפלטה של הסקיל (בלי סגול – שמור ל"ממתין לאישור") ----------
# הקבועים חיים בתוך בלוק של הקוד הישן ולכן מוחלפים כאן, ולא מ-v21.js. רק ערכי צבע משתנים.
sub1("const CV_PAL={weekly:['#142A5C','#2F63CF'],video:['#7A3A0E','#F2911C'],post:['#2E2F86','#6E7CF0'],newsletter:['#0B4E61','#2AA3B8'],site:['#3D2470','#8B5CF6'],data:['#0C4433','#22A06B'],brand:['#4A1036','#C9A24B'],event:['#101F45','#3F5499'],admin:['#232B3D','#5B6783']};",
     "const CV_PAL={weekly:['#1F2747','#3F5499'],video:['#C9730C','#F2911C'],post:['#33468A','#6476B6'],newsletter:['#2B727C','#4A8BAA'],site:['#121733','#33468A'],data:['#1F5E48','#2E8566'],brand:['#A9865C','#D2B899'],event:['#141A33','#3F5499'],admin:['#353D5E','#626A88']};")
sub1("const SERIES=['#2A4F95','#5C7CC0','#B9C8E6','#E89A2C','#5B6BD6','#1C86A3','#D2443A','#88958D','#C9A27A'];",
     "const SERIES=['#3F5499','#6476B6','#C6CDE6','#F2911C','#4A8BAA','#2B727C','#B93B36','#8B91A9','#D2B899'];")

# ---------- 3ג. בלי עיצוב inline ישן במסכים שכבר עברו לסקיל (מלבד צבעי מקרא: <i> ו-.dot) ----------
DONE_VIEWS = ['today', 'tasks', 'calendar', 'board', 'gantt', 'people', 'agents']
STYLE_RE = re.compile(r'(<(?!i\b)[a-z0-9]+\b(?:(?!class="dot")[^>])*?)\s+style="[^"]*"')
for v in DONE_VIEWS:
    i = s.index(f'<section class="view" id="v-{v}">')
    j = s.find('<section class="view"', i + 10)
    j = j if j > 0 else s.index('<div class="scrim"', i)
    s = s[:i] + STYLE_RE.sub(r'\1', s[i:j]) + s[j:]

# ---------- 3ג1. צבעי ברירת המחדל של תגיות הסטטוס (רק אם לא נשמר צבע בעורך) מהפלטה של הסקיל ----------
sub1("F_COL={idea:'#A9B1C2',todo:'#579BFC',doing:'#FDAB3D',review:'#A25DDC',scheduled:'#00A9C7',done:'#00C875'};",
     "F_COL={idea:'#8B91A9',todo:'#3F5499',doing:'#F2911C',review:'#6A55A8',scheduled:'#2B727C',done:'#2E8566'};")

# ---------- 3ג1ב. צבעי תגיות שנשמרו בגרסאות הקודמות לא דורסים את הסקיל ----------
# v21 קורא וכותב רק statusColors21. statusColors הישן נשאר במסד בלי שינוי ובלי השפעה.
sub1("function stColor(st){return (UI().statusColors||{})[st]", "function stColor(st){return (UI().statusColors21||{})[st]")
s = s.replace("statusLabels:lab,statusColors:col}", "statusLabels:lab,statusColors21:col}")
assert s.count("statusColors21:col}") == 2 and "statusColors:col" not in s

# ---------- 3ג2. צבעי הערוצים בלוח (CH_COL ומקרא הלוח) מהפלטה של הסקיל ----------
sub1("const CH_COL={video:'#E89A2C',post:'#5B6BD6',weekly:'#2A4F95',newsletter:'#1C86A3',site:'#7B4AA8',brand:'#7B4AA8',data:'#4C5B53',admin:'#88958D',event:'#16294D'};",
     "const CH_COL={video:'#F2911C',post:'#6476B6',weekly:'#3F5499',newsletter:'#4A8BAA',site:'#A9865C',brand:'#A9865C',data:'#2E8566',admin:'#626A88',event:'#141A33'};")
for a, z in [('#2A4F95"></i>פוסט פרשה', '#3F5499"></i>פוסט פרשה'), ('#E89A2C"></i>סרטון', '#F2911C"></i>סרטון'), ('#5B6BD6"></i>פוסט<', '#6476B6"></i>פוסט<'),
             ('#1C86A3"></i>ניוזלטר', '#4A8BAA"></i>ניוזלטר'), ('#7B4AA8"></i>אתר ומותג', '#A9865C"></i>אתר ומותג'), ('#123D2B"></i>אירוע', '#141A33"></i>אירוע')]:
    sub1(a, z)

# ---------- 3ד. עיגולי פעולות מהירות בכל מסך (יומן ההחלטות), עם הפעולות של אותו מסך ----------
def circles(name, buttons):
    qa = ''.join(f'<button class="qa{" ai ai-mode" if ai else ""}" type="button" {attr}><span class="qi" data-icon="{ic}"></span>{lbl}</button>'
                 for attr, ic, lbl, ai in buttons)
    return (f'<section class="circles circles-page" data-circles="{name}" aria-label="פעולות מהירות">'
            '<button class="circles-hide" type="button" data-circles-hide data-icon="eyeOff" data-icon-class="ico-sm">הסתרה</button>'
            f'<div class="quick">{qa}</div></section>'
            '<button class="circles-show" type="button" data-circles-show hidden>הצגת הקיצורים</button>')
AI = ('data-pal="1"', 'sparkle', 'שאל את קלוד', True)
tasks_head_end = s.index('<p class="muted"', s.index('<section class="view" id="v-tasks">'))
s = s[:tasks_head_end] + circles('tasks', [('data-new="task"', 'check', 'משימה', False),
                                           ('data-proxy="estAll"', 'clock', 'הערכת זמנים', False), AI]) + s[tasks_head_end:]
sub1('<span><i style="background:var(--gold)"></i>היום</span>', '<span><i style="background:var(--royal)"></i>היום</span>')
sub1('<span><i style="background:color-mix(in srgb,var(--plum) 30%,transparent)"></i>יריד החסידות</span>', '<span><i style="background:var(--gold-100)"></i>יריד החסידות</span>')
gw = s.index('<div class="gwrap"', s.index('<section class="view" id="v-gantt">'))
s = s[:gw] + circles('gantt', [('data-new="project"', 'box', 'פרויקט', False), ('data-new="task"', 'check', 'משימה', False), AI]) + s[gw:]
ab = s.index('<div class="agban"', s.index('<section class="view" id="v-agents">'))
s = s[:ab] + circles('agents', [('data-proxy="promoBtn"', 'send', 'שלח הכול לתור', False), ('data-proxy="copyRun"', 'quote', 'העתק פקודה', False), AI]) + s[ab:]
pg = s.index('<div class="people"', s.index('<section class="view" id="v-people">'))
s = s[:pg] + circles('people', [('data-proxy="addPerson"', 'users', 'איש קשר', False), AI]) + s[pg:]
kan = s.index('<div class="kanban"', s.index('<section class="view" id="v-board">'))
s = s[:kan] + circles('board', [('data-new="content"', 'image', 'תוכן', False), ('data-new="project"', 'box', 'פרויקט', False), ('data-new="task"', 'check', 'משימה', False), AI]) + s[kan:]
cal_grid = s.index('<div class="calgrid">', s.index('<section class="view" id="v-calendar">'))
s = s[:cal_grid] + circles('calendar', [('data-new="content"', 'image', 'תוכן', False), ('data-new="task"', 'check', 'משימה', False), AI]) + s[cal_grid:]

# ---------- 3ה. תמונות מ-fal (החלטה 6.11): כריכה מאוירת, אייקון לסוכן, אייקון מצב ריק לכל רשימה ----------
# כריכה שנוצרה ב-fal (thumbArt) מוצגת כאיור מלא ולא כספר על רקע מטושטש
sub1("if(it.thumb)return {img:[it.thumb]};", "if(it.thumb)return {img:[it.thumb],art:!!it.thumbArt};")
sub1('return `<div class="cover photo${src.logo?\' haslogo\':\'\'}', 'return `<div class="cover photo${src.logo?\' haslogo\':\'\'}${src.art?\' art\':\'\'}')
# סוכן עם אייקון תלת-ממדי (agents/<id>.img) מציג אותו במקום האייקון הקווי
sub1('<span class="ic">${ICON[a.icon]}</span>',
     '<span class="ic${agCfg(a.id).img?\' has-img\':\'\'}">${agCfg(a.id).img?`<img src="${esc(agCfg(a.id).img)}" alt="">`:ICON[a.icon]}</span>')
# מצב ריק: אייקון ייעודי לכל רשימה (e-<id>), ואם עוד לא נוצר – האייקון הכללי של היום
sub1("const ic=IC[EMPTY_IC[k]||'tasks'];", "const ic=IC['e-'+k]||IC[EMPTY_IC[k]||'tasks'];")
sub1("upcoming:'calendar',dayPanel:'calendar'};", "upcoming:'calendar',dayPanel:'calendar',kanban:'tasks',calClean:'calendar'};")
icons = sorted((B / 'icons').glob('e-*.webp'))
if icons:
    js = 'Object.assign(window.MT_IMG=window.MT_IMG||{},{' + ','.join(f'"{p.stem}":"{uri(p)}"' for p in icons) + '});'
    v19s = s.index('<script>/* ===== v19:')
    s = s[:v19s] + '<script>' + js + '</script>\n' + s[v19s:]
# פקודת התור: אחרי הבקשות, שגרת התמונות
sub1("ועדכן את הכרטיס המתאים באוסף items.`;",
     "ועדכן את הכרטיס המתאים באוסף items. בסוף הרץ את שגרת התמונות של חדר הבקרה לפי הסקיל maayanotecha-staff-ui (references/fal-imagery.md, סעיף 4): כריכה ב-fal לכל כרטיס בלי thumb ובלי כריכת ספר אמיתית, ואייקון תלת-ממדי לכל סוכן בלי img. עד 12 תמונות בהרצה; אם יש יותר, רשום את הרשימה בפעילות וחכה לאישור.`;")

# ---------- 4. ds.js העדכני של הסקיל ----------
ds_old = re.search(r'<script>/\* מעיינותיך · ds\.js.*?</script>', s, flags=re.S)
assert ds_old
ds_new = (ref / 'ds.js').read_text(encoding='utf8')
s = s[:ds_old.start()] + '<script>' + ds_new + '</script>' + s[ds_old.end():]

# ---------- 5. v21.js אחרי v19.js ----------
v19 = re.search(r'<script>/\* ===== v19:.*?</script>', s, flags=re.S)
assert v19
s = s[:v19.end()] + '\n<script>' + (B / 'v21.js').read_text(encoding='utf8') + '</script>' + s[v19.end():]

OUT.write_text(s, encoding='utf8')
print(f'{OUT}: {len(s.encode()):,} bytes')
