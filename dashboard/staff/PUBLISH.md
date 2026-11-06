# פרסום v21 – רשימת צעדים
עושים את זה **רק מסשן של claude.ai** (עם כלי Artifact, ArtifactData ו-fal), ורק אחרי אישור של זלמן.

1. **קוראים את הגרסה החיה:** `Artifact` read על https://claude.ai/artifact/CjnUchP5knm4L8EZAzWh4Z, ושומרים עותק (`dashboard/backups/v20_published_<תאריך>.html`).
2. **מפרסמים:** `Artifact` publish של `dashboard/staff/v21.html` עם `url` של הקישור הזה. **בלי** `capabilities` (נשארות db, user, room, sample, assets).
3. **בודקים בארטיפקט החי:** אין שגיאות, הנוכחות עובדת, "שאל את קלוד" עונה, כריכות `img/` נטענות, צבעי התגיות מהסקיל.
4. **מוחקים מהמסד את כרטיסי הפרשות העתידיות** (החלטה 6.11): `items/par-vayetze`, `items/par-vayishlach`, `items/par-vayeshev`, `items/par-miketz`. קודם קוראים כל אחד, ומוחקים **רק** אם הסטטוס `todo` ואין בו שלב שסומן כבוצע, הערות או קישורים שנוספו. אחרת עוצרים ושואלים את זלמן.
5. **מריצים את שגרת התמונות** לפי `references/fal-imagery.md` סעיף 4 (עד 12 לבד; מעל – רשימה ואישור).
6. **יוצרים משימה מתוזמנת יומית** לשגרת התמונות (החלטה 6.11), עם הנוסח של סעיף 4.
7. **מעלים מחדש את הסקיל** `maayanotecha-staff-ui.zip` ל-claude.ai, כדי שכל סשן יכיר את השגרה.

## סטטוס (6.11.2026)
- [x] 1. גרסה חיה נקראה ונשמרה: `backups/v20_published_2026-11-06.html` (זהה ל-`v20_out.html`).
- [x] 2. v21 פורסם לאותו קישור (גרסה 21). היכולות נשמרו: assets, db, room, sample, user.
- [ ] 3. בדיקה בארטיפקט החי – זלמן (נוכחות, "שאל את קלוד", תמונות `img/`).
- [x] 4. נמחקו `par-vayetze`, `par-vayeshev`, `par-miketz`. **`par-vayishlach` לא נמחק:** סומן "תקוע" ב-4.11, מחכה להחלטה של זלמן.
- [x] 5. שגרת התמונות רצה: 5 כריכות (brand, ga, newsletter, site, workspace) ו-6 אייקוני סוכנים, הועלו כנכסים (`staff/live-assets/`) וחוברו במסד; רשומה ב-activity.
- [~] 6. משימה מתוזמנת נוצרה (`trig_01XaCccra5iCavzLMycHhMhZ`, כל יום 05:47 שעון ישראל), **בלי קונקטור fal** – צריך להוסיף אותו ב-claude.ai (ראו `ROUTINE_PROMPT.md`).
- [ ] 7. העלאת `maayanotecha-staff-ui.zip` ל-claude.ai – זלמן.

## גרסה 23 (6.11.2026) — פורסמה
- אותו קישור: https://claude.ai/artifact/CjnUchP5knm4L8EZAzWh4Z (הרשאות לא שונו: db, user, room, assets, sample).
- נכסים שהועלו לפני הפרסום: 8 רקעים (`staff/walls/walls.json`) ו-6 אווטארים; במסד: `people/<id>.avatar`.
- גיבוי: `dashboard/backups/v23_published_2026-11-06.html`.

