"""בונה את עותק ההדגמה של חדר הבקרה ("סטודיו אופק") מהגרסה המאושרת.
   1:1 עם הדשבורד; מוחלפים רק הפרטים: שמות, מותג, תחום, נתונים, והחיבור לקלוד (מסד מקומי בדפדפן).
   תמונות: רק מה שכבר נוצר (אווטארים, כריכות, אייקונים, רקעים, שעון חול ומד). בלי יצירה חדשה.
   הרצה: python3 demo/build_demo.py  →  demo/opk-demo.html"""
import re, json, base64, pathlib
B = pathlib.Path(__file__).resolve().parent
ST = B.parent / 'staff'
s = (ST / 'v21.html').read_text(encoding='utf8')
def uri(p, mt='image/webp'): return f'data:{mt};base64,' + base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def sub1(a, b, cnt=1):
    global s
    assert s.count(a) >= 1, a[:80]
    s = s.replace(a, b) if cnt == 0 else s.replace(a, b, cnt)

# ---- 1. תמונות: מה שקשור למותג מוחלף; השאר נשאר כמו שהוא ----
WORD = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 72"><g fill="none" stroke="#F2911C" stroke-width="3" stroke-linecap="round">'
        '<path d="M14 50a22 22 0 0 1 44 0"/><path d="M36 18v6M18 26l4 4M54 26l-4 4M8 50h56"/></g>'
        '<text x="232" y="52" text-anchor="end" font-family="Rubik,Heebo,Arial" font-weight="800" font-size="40" fill="#FFFFFF">אופק</text>'
        '<text x="232" y="68" text-anchor="end" font-family="Rubik,Heebo,Arial" font-size="12" fill="#C9CDE0" letter-spacing="2">סטודיו לתוכן</text></svg>')
WORD_URI = 'data:image/svg+xml;base64,' + base64.b64encode(WORD.encode()).decode()
WORD_MOB = WORD.replace('#FFFFFF', '#141A33').replace('#C9CDE0', '#626A88')
WORD_MOB_URI = 'data:image/svg+xml;base64,' + base64.b64encode(WORD_MOB.encode()).decode()
s, n = re.subn(r'(<img class="sb-logo-full" src=")data:[^"]+(" alt=")מעיינותיך(")', lambda m: m.group(1) + WORD_URI + m.group(2) + 'סטודיו אופק' + m.group(3), s); assert n == 1
s, n = re.subn(r'(<button class="topbar-logo" id="mobMenu"[^>]*><img src=")data:[^"]+(" alt=")מעיינותיך(")', lambda m: m.group(1) + WORD_MOB_URI + m.group(2) + 'סטודיו אופק' + m.group(3), s); assert n == 1
# הלוגו "תובנה" של הפוסט השבועי – לא בהדגמה
s, n = re.subn(r"if\(it\.channel==='weekly'\|\|it\.id==='weekly'\)return \{img:\['data:[^']+'\],logo:1\};", '', s); assert n == 1
# אייקון "אתר" – גלובוס במקום סמל המותג
GLOBE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#3F5499" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18"/></svg>'
s, n = re.subn(r"const SITE_ICON='data:[^']+'", "const SITE_ICON='data:image/svg+xml;base64," + base64.b64encode(GLOBE.encode()).decode() + "'", s); assert n == 1
# הרקעים וכל נכס /_blob/ → קבצים מוטמעים (ההדגמה עומדת בפני עצמה)
W = json.loads((ST / 'walls' / 'walls.json').read_text())
WALLJS = 'window.__W={' + ','.join(f'{k}:"{uri(ST / "walls" / f"wall-{k}.webp")}"' for k in W) + '};'
for k, u in W.items(): s = s.replace(f'"{u}"', f'__W.{k}')
assert '/_blob/' not in s, 'blob left'
# כריכות מקומיות של ספרים אמיתיים – מנוטרלות (ההדגמה לא מציגה ספרים של אף אחד)
sub1("const m=(it.title||'').match(/פרשת\\s+([^\\s·]+(?:\\s(?:שרה|לך|תשא))?)/);if(m&&PAR_T[m[1]])return {k:'פרשת '+m[1],h:PAR_T[m[1]]};", "")
for pat in ["/תניא|פיצול אישיות|tanya/", "/החדשים/", "/קמפיין|סרטונים ליריד/"]:
    sub1(pat, "/__demo_none__/")
s, n = re.subn(r"if\(it\.kind==='event'&&/יריד/\.test\(t\)\)return \{img:\['img/[^']+'\],logo:1\};", '', s); assert n == 1

# ---- 2. החיבור לקלוד → מסד מקומי בדפדפן ----
assert s.count('window.claude') == 2
s = s.replace('window.claude', 'window.__demo')
s = s.replace('הדשבורד נפתח מחוץ לקלוד', 'ההדגמה לא הצליחה לטעון')
# ---- 3. התחום: פוסט הפרשה → פוסט שבועי, יריד → כנס ----
s, n = re.subn(r'const PARASHOT=\[[^;]*\];', 'const PARASHOT=window.DEMO_PARASHOT;', s); assert n == 1
s, n = re.subn(r'const PAR_T=\{[^}]*\};', 'const PAR_T={};', s); assert n == 1
s, n = re.subn(r'const SYS=`[^`]*`;', "const SYS=`אתה עוזר השיווק של סטודיו אופק (סטודיו לתוכן ושיווק). כתוב בעברית פשוטה, משפטים קצרים, בלי אימוג'י. אל תמציא שמות לקוחות, מוצרים, תאריכים או מחירים. כל תוכן עובר אישור של אברהם שטרן. היום ${iso(TODAY)}.`;", s); assert n == 1
REPL = [
    ("label:'פרשת '+par[1]", "label:'נושא השבוע: '+par[1]"),
    ("'פוסט פרשת '+", "'פוסט שבועי: '+"),
    ('/פרשת\\s+\\S+/', '/פוסט שבועי: .+/'),
    ('פוסט פרשה', 'פוסט שבועי'), ('פרשת שבוע', 'נושא השבוע'), ('דקה לשבת', 'טיפ לסוף השבוע'),
    ('לא ממציא שמות ספרים, מחברים, תאריכים או מחירים', 'לא ממציא שמות לקוחות, מוצרים, תאריכים או מחירים'),
    ('לא משתמש בלוגו "ספרי אור החיים"', 'לא משתמש בלוגו הישן'),
    ('יריד החסידות', 'כנס השיווק השנתי'), ('ליריד', 'לכנס'), ('היריד', 'הכנס'), ('יריד', 'כנס'),
    ('מעיינותיך', 'סטודיו אופק'),
    ('מענדי בלוי', 'אברהם שטרן'), ('מענדי', 'אברהם'),
    ('Zalmen Goldberg', 'Daniel Levi'), ('Zalmen', 'Daniel'), ('זלמן', 'דניאל'),
    ('קלוד', 'אטלס'),
]
for a, b in REPL: s = s.replace(a, b)
# קישור החיבור לפרויקט – בהדגמה אין
s = s.replace('https://claude.ai/artifact/CjnUchP5knm4L8EZAzWh4Z', 'https://example.com/control-room')

# ---- 4. נתוני ההדגמה + סביבת ההדגמה, לפני כל הקוד של הדף ----
data = (B / 'demo_data.js').read_text(encoding='utf8')
LA = ST / 'live-assets'; AV = ST / 'avatars'
IM = {}
for k, f in [('zalmen','zalmen'), ('mendy','mendy'), ('ben','ben'), ('kaplan','kaplan'), ('social','tzama-social'), ('claude','claude')]: IM['AV_' + k] = uri(AV / f'{f}.webp')
for k in ['brand', 'ga', 'newsletter', 'site', 'workspace']: IM['CV_' + k] = uri(LA / f'cover-{k}.webp')
for k in ['weekly', 'creative', 'media', 'newsletter', 'site', 'data']: IM['AG_' + k] = uri(LA / f'agent-{k}.webp')
for k in IM: data = data.replace(f"'__IMG_{k}__'", f"__IM.{k}")
data = 'window.__IM=' + json.dumps(IM) + ';' + data
assert '__IMG_' not in data
rt = (B / 'demo_runtime.js').read_text(encoding='utf8')
# כפתור איפוס במסך ההגדרות
extra = r'''<script>document.addEventListener('click',e=>{if(e.target.closest('[data-demoreset]'))window.DEMO_RESET()});
new MutationObserver(()=>{const h=document.querySelector('#setPanel:not([hidden]) .setp-in');if(h&&!h.querySelector('[data-demoreset]')){h.insertAdjacentHTML('beforeend','<section class="st-sec"><h3>הדגמה</h3><p>כל הנתונים בדויים ונשמרים רק בדפדפן הזה.</p><div class="st-btns"><button type="button" class="st-b ghost" data-demoreset="1">איפוס נתוני ההדגמה</button></div></section>')}}).observe(document.body,{childList:true,subtree:true});</script>'''
first_script = s.index('<script')
s = s[:first_script] + '<script>' + WALLJS + data + '</script><script>' + rt + '</script>' + s[first_script:]
s = s.replace('</body>', extra + '</body>') if '</body>' in s else s + extra

# ---- 5. בדיקה: לא נשאר שום פרט אמיתי ----
chk = re.sub(r'data:[a-z/+]+;base64,[A-Za-z0-9+/=]+', '', s)
for bad in ['מעיינותיך', 'מענדי', 'זלמן', 'Zalmen', 'צמאה', 'קלוד', 'יריד', 'פרשת', 'חסידות', 'תניא', 'קפלן', 'בן סגל', 'CjnUchP5', 'Goldberg', 'maynotecha', 'tzama']:
    assert bad not in chk, bad
out = B / 'opk-demo.html'
out.write_text(s, encoding='utf8')
print(out, f'{len(s.encode()):,} bytes')
