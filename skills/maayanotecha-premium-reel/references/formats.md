# הפורמטים – מבנה, config, חומרים

כל הפורמטים טוענים `brand/brand.css` + `brand/brand.js`, ולכן חולקים פונט, כותרות מבריקות, רקעים, לוגואים, ספרים צפים, מערבולת ומסך סיום. שדות משותפים:
- `bug`: לוגו קטן למעלה – `"logo"` (מעיינותיך), `"yarid"` (צמאה–יריד החסידות, רק בתוכן של היריד), `null`.
- `end`: `{tag, cta, url}` – מסך סיום (לוגו כסוף + שורת מותג + קריאה לפעולה + כתובת). `url:""` מסתיר את הכתובת.
- `variant`: `background` (`stage`/`ribbon`/`glow`), `accentHue` (מעלות), `accent1`/`accent2` (צבעים), ושדות ייחודיים לפורמט.

## books – ספרים חדשים
**מבנה:** 0–2.3 "חדש!" + כותרת + מערבולת כל הכריכות שקורסת בהבזק → לכל ספר (`perBook`, ברירת מחדל 2.4 שנ'): כריכה צפה נכנסת, נדנוד תלת-ממדי, שם (מילה-מילה), מחבר, שורת תיאור, מונה `01 / 03` → כל הכריכות במניפה + `lineupText` → סיום.
```json
{"format":"books","eyebrow":"מעיינותיך","newTag":"חדש!","title":"על המדף",
 "books":[{"c":"slug","t":"שם","a":"מחבר","line":"שורה קצרה (לא חובה)"}],
 "perBook":2.4,"lineupText":"עכשיו בחנות","extraCovers":["slug"],"bug":null,
 "end":{"tag":"בית לספרות חסידית","cta":"...","url":"maynotechabooks.co.il"},
 "variant":{"background":"stage","enterFrom":"left|below","accentHue":0}}
```
**חומרים:** כריכות שקופות ב-`template/assets/covers/<slug>.png` (מהאתר, או כריכה שנמסרה – להסיר רקע אם צריך). 3–6 ספרים לסרטון.

## talk – אדם מדבר / ראיון
**מבנה:** וידאו (`frame:"full"` מלא עם הצללה תחתונה, או `"card"` – כרטיס מעוגל צף על במה עם השתקפות) · משפט פתיחה גדול (`hook`, לא חובה) · שם + תפקיד עם קו מבטא (`speaker`) · כתוביות מילה-מילה, מילות מפתח בצבע מבטא (`captions[].hl`) · כריכה צפה כשמוזכר ספר (`bookPops`) · סיום.
```json
{"format":"talk","video":{"dir":"media/rav1","fps":25,"count":1000},"voice":"template/media/rav1.wav",
 "hook":"משפט פתיחה (לא חובה)","speaker":{"name":"שם","role":"תפקיד","t0":0.3,"t1":3.4},
 "captions":[{"t0":3.5,"t1":5.1,"text":"מה שהדובר אומר","hl":["מילה"]}],
 "bookPops":[{"t":12,"c":"slug","title":"שם הספר","d":2.6}],"bug":"logo",
 "end":{...},"variant":{"frame":"full|card","background":"stage"}}
```
**חומרים:** `bash scripts/prepare_video.sh input.mp4 <name> [start] [dur]` (חיתוך 9:16, פריימים, אודיו). כתוביות: תמלול ב-fal (speech-to-text עם חותמות זמן), לחלק למשפטים של 2–5 מילים, **בנוסח המדויק** של הדובר; לאשר עם הלקוח. סאונד: `finish_simple.sh frames out.mp4 music.wav template/media/<name>.wav` (המוזיקה מונמכת מתחת לקול). לא לעוות את הדובר ב-AI.

## quote – רעיון / ציטוט / תוכן
**מבנה:** כותרת עליונה קטנה (`eyebrow`) · שורות גדולות שנחשפות מילה-מילה, כל בלוק `hold` שנ', מילים מודגשות בצבע · הספר שממנו זה לקוח צף עם "מתוך <שם>" ומחבר · סיום.
```json
{"format":"quote","eyebrow":"רעיון לשבת","lines":[{"text":"שורה\nשנייה","hold":2.6,"hl":["מילה"]}],
 "source":{"c":"slug","title":"שם הספר","author":"מחבר","prefix":"מתוך"},"bug":"logo",
 "end":{...},"variant":{"background":"ribbon","size":"l|m"}}
```
**חומרים:** ציטוט מדויק מהספר (מהטעימה באתר או ממה שהלקוח מסר). עד ~8 מילים לבלוק.

## reel – פרסומת לאתר / מעיין הספרן
ראה `recipe.md` (הסרטון המלא של ההשקה, ~25 שנ').

## בניית פורמט חדש (סרטון חופשי)
1. להעתיק את הפורמט הקרוב ביותר ל-`template/<name>.html` ולהוסיף `format:"<name>"` ב-config.
2. להשתמש רק ברכיבי `brand.js`:
   - `makeBackground` / `renderBackground`
   - `words` + `revealWords` (חשיפת מילים)
   - `makeBook` / `placeBook` (ספר צף)
   - `makeVortex` / `renderVortex` (מערבולת)
   - `makeLogo` / `renderLogo`, `makeBug`
   - `makeEnd` / `renderEnd`
   - `seqSrc` (וידאו כפריימים)
   - `renderGloss` (הברקה)
   - `applyVariant`
3. להגדיר `window.DURATION` ו-`render(t)` דטרמיניסטי: אין `setTimeout`, אין `Date`. כל מצב נגזר מ-`t`.
4. לא להמציא סגנון חדש. אותם צבעים, פונט, הברקה, רקעים ותנועות (out5/back/expo).
