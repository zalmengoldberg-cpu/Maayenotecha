# חדר הבקרה של מעיינותיך – המשך עבודה בצ'אט חדש

מסמך העברה מלא. מי שקורא אותו יכול להמשיך בדיוק מאותה נקודה, באותה שיטת עבודה, בלי לקרוא את ההיסטוריה.

**עוד שני מסמכים בתיקייה הזו:** `SETUP.md` – מה צריך לעשות כדי שהכול ירוץ לבד (fal לשגרת התמונות, התראות לטלפון, הסקיל, שיתוף). `SPEC_VS_DESIGN.md` – כל ההבדלים בין האפיון המקורי, מערכת העיצוב והדשבורד היום.
עודכן: 7.11.2026. בעלים: זלמן גולדברג (מפיק ומנהל השיווק).

---

## 0. קודם כול – כללי ברזל (מהעבודה עד עכשיו, לא לשבור)
1. **ריפו:** עובדים רק בענף `claude/design-system-platform-380hm7` של `zalmengoldberg-cpu/Maayenotecha`. **אסור לגעת ב-main, אסור לשנות את index.html של החנות, אסור לפתוח PR ל-main.** לא מצרפים ריפו נוסף.
2. **נתונים:** `dashboard/db/` הוא עותק מקומי לבדיקות בלבד. **אף פעם לא עושים commit לנתונים.** כתיבה למסד החי רק בפעולה שזלמן ביקש או אישר. תמיד עם `if_version`, ונוגעים רק בשדות של הפעולה.
3. **פרסום:**
   - רק לאותו קישור: https://claude.ai/artifact/CjnUchP5knm4L8EZAzWh4Z. המסד שייך לארטיפקט, וארטיפקט חדש = מסד ריק.
   - לפני פרסום מכל צ'אט שלא פרסם אותו: `Artifact read` לקישור.
   - **אף פעם לא מעבירים `capabilities`.** הן נשמרות לבד: db, user (profile), room, sample, assets.
   - אחרי כל פרסום: גיבוי ל-`dashboard/backups/vNN_published_<תאריך>.html`, ושורה ב-`dashboard/staff/PUBLISH.md`.
4. **לא מוחקים ולא מסתירים פונקציה בלי אישור.** מעבירים אותה למקום אחר ומתעדים.
5. **כשבקשה סותרת את האפיון או את מערכת העיצוב:** שואלים את זלמן עם שתי אפשרויות לבחירה (בחירה מרובה). אחר כך מתעדים: פונקציה ב-`dashboard/FUNCTIONAL_SPEC.md` סעיף 11, ומראה ב-`dashboard/DESIGN_SYSTEM.md`.
6. **עיצוב:** רק מהסקיל `maayanotecha-staff-ui`.
   - Rubik בלבד, בהיר בלבד.
   - **סגול רק ל"ממתין לאישור".**
   - הלוגו "ספרי אור החיים" לעולם לא בשימוש.
   - ערכי עיצוב מהדשבורד הישן (v20) לא דורסים את הסקיל.
7. **תמונות מ-fal:**
   - לא לכריכות ספרים אמיתיות, לא ללוגואים, ולא לאייקוני ממשק (אלה וקטורים ב-ds.js).
   - **לאנשים: רק אווטאר מאויר בתלת-ממד (מתכון E2), אף פעם לא צילום.** תמונה אמיתית שהועלתה קודמת לאווטאר.
8. **סגנון עבודה עם זלמן:**
   - עברית, **אמ;לק בהתחלה**, בלי חנופה. אומרים סתירות בגלוי.
   - תהליך: **בונים ← צילומי מסך (1440 ו-390) ← טבלת דיווח ← מחכים ל"תמשיך" ← מפרסמים ← מתעדים.** כשזלמן אומר "תעלה" או "תפרסם", מפרסמים.
   - **מייל:** כתובת המייל של זלמן לא נכנסת לקבצים בריפו.

## 1. קישורים ומצב נוכחי
| מה | איפה |
|---|---|
| **החדר החי** | https://claude.ai/artifact/CjnUchP5knm4L8EZAzWh4Z – **גרסה 25 (מאושרת ע"י זלמן)** |
| גיבוי גרסה 25 | `dashboard/backups/v25_published_2026-11-06.html` (ותגית מקומית `staff-ui-v25-approved`; דחיפת תגיות חסומה בשרת) |
| עותק הדגמה למכירה ("סטודיו אופק") | https://claude.ai/artifact/NBZNK82LW6oQ4ZcKVSTEsz · מקור: `dashboard/demo/` (נמשך בצ'אט נפרד: `handoff/product-launch/`) |
| אפיון (מקור אמת לפונקציות) | `dashboard/FUNCTIONAL_SPEC.md` – סעיף 11 = יומן כל ההחלטות |
| יומן העיצוב | `dashboard/DESIGN_SYSTEM.md` |
| הסקיל | `design-system/skill/maayanotecha-staff-ui/` (עותק זהה ב-`.claude/skills/`), zip ב-`maayanotecha-staff-ui.zip` |
| חיבור לפרויקט "מחולל השיווק והתוכן" | `handoff/content-project/CONTROL_ROOM.md` (+ zip). זלמן צריך להעלות לפרויקט ב-claude.ai |
| הוראות פרסום והיסטוריה | `dashboard/staff/PUBLISH.md` |

## 2. איך זה בנוי (חשוב לפני כל שינוי)
- **הבסיס:** `dashboard/backups/v20_out.html`, הדשבורד הישן עם כל הלוגיקה. לא עורכים אותו ישירות.
- **הבנייה:** `cd dashboard && python3 staff/build.py backups/v20_out.html staff/v21.html` (בערך 1.2MB). הסקריפט:
  - מסיר את ה-CSS הישן ומכניס את הסקיל (tokens, skin, `v21-reset.css`, components) ואחריו `v21.css`.
  - מחליף ב-ds.js את הגרסה של הסקיל.
  - מבצע תיקוני לוגיקה בטוחים עם `sub1(ישן, חדש)`. ההחלפה חייבת להתאים פעם אחת בדיוק, אחרת הבנייה נכשלת.
  - מטמיע תמונות כ-data URI: אייקוני מצב ריק `staff/icons/e-*.webp`, שעון החול השקוף `icons/hero-*-a.webp`, המד `icons/meter-gauge-a.webp`, הלוגו "תובנה" `icons/tovana.webp`, תמונות הרקעים הקטנות `walls/thumb-*.webp` וסמל האתר.
  - מוסיף את `staff/v21.js` אחרי סקריפט v19.
- **`staff/v21.js`:** כל התוספות (גרסאות v21–v25). רץ אחרי הקוד הישן ועוטף את `window.renderAll`.
  - שימו לב: רוב הפונקציות הישנות מוגדרות בתוך בלוק. **החלפה של `window.renderToday` וכדומה לא עובדת.** מתקנים אחרי `renderAll` (ב-`paintV21`/`paintV22`), או ב-`build.py` עם `sub1`.
  - מותר לקרוא לפונקציות הישנות שגלויות מבחוץ: `items, units, dayEvents, saveItem, setStep, toastUndo, toast, log, av, art, thumb, P, S, TODAY, iso, parse, fmt, rel, esc, STATUS, CHANNEL, KIND, URG, yarid, daysTo, inQueue, progress, isBlocked, fmtEst, sortUnits, uid, now, renderMiniCal`.
  - לא גלויות מבחוץ: `LS`, `dragger`, `stColor`, `saveLayout`, `updHidden`, `WALLS/NAMES` (במקומן יש `window.MT_WALLDATA`).
- **`staff/v21-reset.css`:** skin.css מלביש כל `button` ו-`[role=button]`. כל רכיב חדש שהוא כפתור, או `div` עם `role=button`, **חייב** להיכנס לרשימה ב-reset, אחרת יקבל מסגרת של כפתור לבן.
- **`staff/v21.css`:** כל הפריסה והמראה, לפי סדר הגרסאות (v22 עד v22h).
- **נכסים בארטיפקט** (`/_blob/<id>`):
  - **רקעים:** `staff/walls/walls.json`.
  - **אווטארים:** zalmen `0f15bf10…`, mendy `f4e10f01…`, ben `ccb13eac…`, kaplan `6eb24157…`, tzama-social `d24327a9…`, claude `2c69a8ec…` (המזהים המלאים ב-`dashboard/kit/tests/prepare.py`).
  - **כריכות וסוכנים:** שמורים במסד, בשדות `thumb` ו-`img`.

## 3. המסד (collections) – מה יש ומה נוסף
- **items:** `kind` (project/content/task/event/recurring), `channel`, `status` (idea→todo→doing→review→scheduled→done), `owner`, `waitingOn`, `priority`, `start`, `due`, `publishAt`, `steps[] {t, done, doneAt, owner, due, est, estSrc, bg}`, `blocked {on, since, who, why}`, `links`, `notes`, `platforms`, `thumb`, `thumbArt`, `thumbSrc`, `claudeCan`, `parent`, `rule`.
  - **נוסף:** `remindAt` (`YYYY-MM-DDTHH:MM`, תזכורת) ו-`pushPlanned` (= remindAt שכבר קיבל התראה לטלפון).
- **people:** `name, role, color, initials, photo, uid`. **נוסף:** `avatar` ו-`avatarSrc`.
- **agents:** `<id>.img`, `_ui` (`statusLabels`, `statusColors21`), `_all`.
- **activity:** `{at, who, text, itemId}`.
- **inbox:** תור הבקשות לקלוד.
- **מצב חי ידוע:**
  - נמחקו par-vayetze, par-vayeshev ו-par-miketz.
  - par-vayishlach נשאר, מסומן תקוע. מחכה להחלטה של זלמן.
- **העדפות לכל צופה** (localStorage, לא במסד):
  - `mt-bg2-light/dark` (רקע; ברירת מחדל `ph-lake`).
  - `mt-open` (פתיחת כרטיס `center`/`side`).
  - `mt-def-v24`, `mt-defbg-v24` (המעבר החד-פעמי לברירות המחדל החדשות).
  - `mt-hero-meter` (glass/gauge/none).
  - `mt-brief-open`.
  - `mt-pref-kpis` (brief/card), `mt-pref-briefmode` (modal/inline), `mt-pref-rotate` (on/off).
  - `mt-layout-today2` (סידור והסתרה של כרטיסים).
  - `mt-rem-seen`.
  - `mt-staff-tour-v19b` (המדריך הושלם).

## 4. מה יש עכשיו בחדר (גרסה 25) – תקציר
- **ההירו בלי משבצת:**
  - ברכה, ושעון חול או מד מחוגה, או בלי. התמונות שקופות ומקבלות את צבעי הרקע.
  - מחליפים תצוגה בלחיצה על האובייקט. הסוללה והכיתובים מופיעים רק בריחוף או בנגיעה.
  - התראת תזכורת מופיעה ליד המדד.
- **כפתור "בריף בוקר/צהריים/ערב":** גלולת זכוכית.
  - נפתח כ**חלון מעל הכול** (ברירת מחדל), או בשורה – לפי ההגדרות.
  - כרטיסים מוצקים בצבע אחד לכל נושא, בסדר הזה: המדדים, צריך אותך, הפרויקטים, ממתין לאישור, יריד, הפוסט השבועי, קלוד ברקע, הלוח שלך.
- **עמודה צדדית:**
  - **"מה יש לנו היום":** פריט אחד בכל פעם, מתחלף במעבר רך.
  - **לוח עברי קטן:** פסים לתוכן ולמשימות, וחלונית ריחוף. בלי כפתור הוספה ובלי חיצים.
- **"על סדר היום"** (גם בסרגל): עמוד מלא בסגנון My Day.
  - רקע חד, כרטיס תאריך, משימות שקופות.
  - הצעות לצרף משימות להיום.
  - "7 הימים הקרובים", עם גרירה בין ימים.
- **תזכורות:** כרטיס שמתחלף, "+ תזכורת", התראה בדף, והתראה לטלפון (ראו סעיף 5).
- **תחתית:** "מה כבר נעשה" ו"קלוד יכול בינתיים", בכרטיסים קומפקטיים.
- **שורות:** תמונת פרויקט, אווטאר עם אייקון פלטפורמה בפינה, ואייקונים של רשתות חברתיות.
- **גרירה בעכבר ובמגע:**
  - קנבן: מעדכן סטטוס ותיוגים.
  - משימות: מעביר בין עליי / קלוד ברקע / מחכה ל...
  - לוח שנה: לחיצה על מספר התאריך מוסיפה.
- **הגדרות בסרגל:** רקעים (13), תצוגה, מה מופיע בדף הבית, מדריך.
- **דף הבית:** בלי שטחים ריקים (masonry, שורות של 4px).
- **ברירות מחדל:** רקע "אגם בערפל", כרטיסים נפתחים במרכז.
- **אנשים:** אווטארים מאוירים מ-fal. **רקעים:** 8 רקעים חדים מ-fal.

## 5. משימות מתוזמנות (claude.ai)
| שם | מזהה | מתי | מצב |
|---|---|---|---|
| שגרת התמונות של חדר הבקרה | `trig_01XaCccra5iCavzLMycHhMhZ` | כל יום 05:47 | רצה, אבל **בלי הקונקטור fal**. כשיופיע משהו חדש היא תעצור ותודיע (ראו `SETUP.md` סעיף 1). ההוראות עודכנו ב-7.11: כוללות אווטארים, ומורידות תמונות בגודל מלא |
| התראות תזכורות לטלפון – חדר הבקרה | `trig_01MV1JNVSY9GF3Fu8r2hcLwX` | כל שעה עגולה, א׳–ה׳ 06–22, שישי עד 15, לא בשבת | נוצרה בלי קונקטורים. אם לא תצליח לקבוע התראות בזמן המדויק, היא שולחת התראה אחת בכל שעה ("בשעה הקרובה"). לדיוק: להוסיף לה את Claude_Code_Remote. **עוד לא נבדקה בריצה אמיתית** |
| פוסט פרשה שבועי – דקה לשבת | `trig_018fk6epnWxKUiW5ksXBpJEG` | רביעי 11:53 | פעילה (שייכת לפרויקט התוכן) |
| Dashboard queue runner | `trig_01LFVG1G7zZxHdpaaDdh8uxe` | כל יום 07:39 | **כבויה.** נוצרה מצ'אט אחר ב-7.11, עם כל הקונקטורים. מטפלת בתור הבקשות. להפעיל או לא – החלטה של זלמן (`SETUP.md` סעיף 3) |

## 6. סביבת הענן
- סביבה: "Default Cloud Environment". מותרות בה **v3b.fal.media ו-v3.fal.media**, כדי להוריד תמונות fal בגודל מלא (נוסף ב-6.11).
- **fal:** המודל `google/nano-banana-2.1`. המתכונים ב-`references/fal-imagery.md` של הסקיל: A כריכה, B אייקון, E2 אווטאר, F סט מצבים.
- **הסרת רקע:** בכלי `dashboard/kit/matte.py`, מקומית.
- **שרת מקומי חסום.** הבדיקות מגישות קבצים מתוך Playwright (`kit/tests/srvlib.js`).

## 7. בדיקות (חובה לפני כל דיווח ופרסום)
ראו `dashboard/kit/tests/README.md`. בקצרה:
```
cd dashboard && python3 kit/tests/prepare.py && cd kit/tests
for h in today tasks calendar board gantt people agents; do for w in 1440 390; do node shotv.js $PWD/v21_mock.html $PWD/o.png $w 900 "#$h"; done; done
node sec8.js $PWD/v21_mock.html ; node t23.js $PWD/v21_mock.html ; node agx.js ; node bm.js ; node e1.js
```
- **בסשן חדש:** קודם מורידים את המסד החי ל-`dashboard/db/<collection>/<id>.json` (ArtifactData list על items, people, activity, inbox, agents). הקבצים האלה לא נכנסים ל-commit.
- **אחרי שינוי שצריך להגיע גם להדגמה:** `python3 dashboard/demo/build_demo.py`, ואז מפרסמים מחדש לקישור של ההדגמה. הבנייה נכשלת אם נשאר בקוד פרט אמיתי.

## 8. פתוח / מחכה לזלמן
1. **פרשת וישלח במסד:** למחוק או להשאיר? כרגע מסומנת תקועה.
2. **להעלות את הסקיל:** את `maayanotecha-staff-ui.zip` ל-claude.ai, תחת Settings ← Skills.
3. **פרויקט "מחולל השיווק והתוכן":** להעלות את `handoff/content-project/CONTROL_ROOM.md`, ולהוסיף לפרומפט של "פוסט פרשה שבועי" את השורה: "בסוף, עדכן את חדר הבקרה לפי CONTROL_ROOM.md סעיף 1".
4. **לשתף את החדר:** עם מענדי ובן, דרך Share.
5. **קונקטורים למשימות המתוזמנות:** fal לשגרת התמונות, ו-Claude_Code_Remote להתראות לטלפון.
6. **ההתראות לטלפון:** לבדוק שהן מגיעות. הדרך: להוסיף תזכורת לעוד שעה, ולוודא שהתראות push של Claude מופעלות בטלפון.
7. **"ורשימות" בגרירה:** כרגע הבנתי את זה כנתיבי המשימות. אם התכוונת לרשימה אחרת, צריך לברר.
8. **רווח מעל השורה התחתונה בדף הבית:** "מה כבר נעשה" ו"קלוד יכול בינתיים" נשארו בשורה אחת לכל הרוחב בתחתית. אפשר לשחרר אותם כדי שימלאו חורים, אבל אז הם כבר לא יהיו בהכרח למטה.

9. **הפעלה באפליקציה ובדומיין של זלמן (החלטה פתוחה, 7.11):**
   - **א.** קישור מתת-דומיין לחדר הקיים: מהיר, אבל נשאר ב-claude.ai.
   - **ב.** מעבר מלא ל-Firebase:
     - שכבת חיבור שמחליפה את `window.claude`. היום הקוד ניגש אליו רק בשני מקומות, ו-`S.db` כבר בנוי בצורה של Firestore.
     - Auth עם רשימת צוות סגורה, Storage לתמונות.
     - Cloud Functions ל-Claude API, ל-fal ולתזכורות.
     - PWA עם web push.
     - תת-דומיין כמו `app.maynotechabooks.co.il`, בלי לגעת בחנות.
   - ההמלצה הייתה ב׳, כי היא גם הבסיס למוצר למכירה.

## 9. מפת קבצים מהירה
```
dashboard/
  backups/v20_out.html            ← בסיס הלוגיקה (לא עורכים)
  backups/v2x_published_*.html    ← גיבויים של מה שפורסם
  staff/build.py                  ← הבנייה
  staff/v21.js / v21.css / v21-reset.css  ← כל העבודה החדשה
  staff/v21.html                  ← התוצר (מה שמפרסמים)
  staff/icons/ walls/ avatars/ live-assets/  ← תמונות
  staff/PUBLISH.md · ROUTINE_PROMPT.md
  kit/mock.py · kit/matte.py · kit/tests/
  FUNCTIONAL_SPEC.md · DESIGN_SYSTEM.md · CLAUDE_CODE_BRIEF.md · STAFF_UI_HANDOFF.md
  demo/                           ← עותק ההדגמה "סטודיו אופק"
design-system/skill/maayanotecha-staff-ui/   ← הסקיל
handoff/content-project/ · handoff/product-launch/ · handoff/control-room/
```
