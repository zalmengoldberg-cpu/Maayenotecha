# בדיקות חדר הבקרה (Playwright)
Chromium ו-Playwright מותקנים מראש בסביבת הענן (`require('playwright')`).

**הכנה (בכל סשן חדש), מתוך `dashboard/`:**
```
python3 kit/tests/prepare.py
cd kit/tests
```
`dashboard/db/` (המסד המקומי לבדיקות) לא נשמר בריפו – בסשן חדש מורידים אותו מהמסד החי: `ArtifactData list` על items, people, activity, inbox, agents, ושומרים ל-`dashboard/db/<collection>/<id>.json`.

**הבדיקות (כולן צריכות לסיים ב-`errors []`):**
| קובץ | מה בודק | הרצה |
|---|---|---|
| shotv.js | שגיאות וגלילה הצידה למסך אחד | `for h in today tasks calendar board gantt people agents; do for w in 1440 390; do node shotv.js $PWD/v21_mock.html $PWD/out-$h-$w.png $w 900 "#$h"; done; done` |
| sec8.js | הבדיקה המקיפה (סעיף 8 באפיון): פתרון, סגירה בלחיצה בחוץ, כרטיס, חיפוש, סידור/הסתרה/החזרה, גאנט, הצגה כמשתמש אחר | `node sec8.js $PWD/v21_mock.html` |
| t23.js | גרירה בקנבן ובנתיבי המשימות, הוספה מלוח השנה | `node t23.js $PWD/v21_mock.html` |
| t24.js | גרירת אירוע בלוח השנה, פתיחת כרטיס מהקנבן | `node t24.js $PWD/v21_mock.html` |
| agx.js | "על סדר היום": גרירה בין ימים, צירוף הצעה, כרטיס מעל העמוד (משתמש ב-srvlib) | `node agx.js` |
| bm.js | הבריף כחלון: הבא/הקודם, לחיצה בחוץ, חצים, Esc, מצב "בשורה" | `node bm.js` |
| bc.js | לחיצות מתוך כרטיסי הבריף | `node bc.js` |
| e1.js | תזכורת + התראה, ריחוף בלוח הקטן, הגדרות (רקע, מד, מדדים, הסתרת כרטיס) | `node e1.js` |
| d24.js | ברירות מחדל (רקע אגם, פתיחה במרכז) ו"על סדר היום" בסרגל | `node d24.js` |
| demo1.js | עותק ההדגמה (`dashboard/demo/opk-demo.html`): טעינה, שמות, שמירה, אין שאריות אמיתיות | `node demo1.js` |
| fold.js | צילום מסך של מה שרואים בלי גלילה | `node fold.js $PWD/v21_mock.html out.png 1440 900 [glass|gauge|none]` |

`srvlib.js` מגיש את `srv/` בכתובת `http://mock.local/` בתוך Playwright (בלי שרת מקומי – שרת מקומי חסום בסביבה), כדי שקבצי `/_blob/...` ייטענו כמו בארטיפקט.
