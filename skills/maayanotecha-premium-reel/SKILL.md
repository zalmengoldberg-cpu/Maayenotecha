---
name: maayanotecha-premium-reel
description: הפקת רילס פרסומי פרימיום בסגנון "פרסומת אפל" לאתר מעיינותיך (maynotechabooks.co.il) ולקמפיין השקת האתר / יריד החסידות. סרטון 9:16 של כ-25 שנ' שנבנה מקוד HTML מונפש עם צילומי מסך אמיתיים מהאתר, מעיין הספרן AI, מערבולת ספרים, טעימה מהספר ושוטים קולנועיים של AI. השתמש בכל בקשה ל"סרטון/רילס לאתר מעיינותיך", "עוד סרטון לקמפיין", "סרטון בסגנון של סרטון ההשקה", "פרסומת אפל למעיינותיך", "סרטון למעיין הספרן". כל סרטון חדש חייב להיות באותו מיתוג אבל שונה – לפי מטריצת הווריאציות.
---

# רילס פרימיום – מעיינותיך (קמפיין השקת האתר)

הסקיל הזה הוא ה"מתכון" של סרטון ההשקה (גרסה 17). הוא מאפשר להפיק כל פעם סרטון חדש:
אותה שפה עיצובית ואותו קמפיין, אבל תוכן, סדר, קצב ונגיעות ויזואליות אחרים.

## מבנה החבילה
```
template/reel.html        הסרטון כציר זמן דטרמיניסטי: render(t) מצייר כל פריים. קורא window.CONFIG
template/assets/          לוגואים בגווני הסרטון, רקעים, לולאת ribbon, כריכות, צילומי מסך מהאתר, טעימה מהספר
template/fonts/           Heebo-Latin. לשים כאן את קובצי Fontbit (Sayeeda Book, Philosof Black) מחבילת המותג – לא בריפו
template/footage/         ids.txt/segs.txt של צילומי היריד בדרייב; seg/ ו-grid/ נבנים ע"י prepare_footage.sh
assets/ai-shots/          שוטים קולנועיים שנוצרו בהייגספילד (מגדל→אולם, רחפן בכניסה, צלילה מהאולם לטלפון)
assets/sfx/ + music       אפקטי סאונד (fal) ומוזיקה מקורית (fal / ElevenLabs Music) 25.3 שנ'
scripts/                  prepare_footage.sh · stills.js · render.js · finish.sh
references/               design-system · recipe (ציר זמן + מפת קוד) · variations · ai-generation · lessons
examples/                 config-launch.json (גרסת ההשקה) + דוגמאות לסרטונים שונים
```

## חובה לקרוא לפני עבודה
1. `references/lessons.md` – כל ההערות של הלקוח לאורך הפקת הסרטון הראשון. אסור לחזור על הטעויות.
2. `references/design-system.md` – כללי העיצוב (לא משנים).
3. `references/variations.md` – איך להבטיח שהסרטון החדש שונה מהקודמים.
4. `references/recipe.md` – מבנה הסרטון ומה כל קטע בקוד.

## זרימת עבודה
1. **בריף בשאלה אחת מרוכזת** (רק מה שחסר): מסר אחד · קהל · פיצ'ר מרכזי (מעיין הספרן / טעימה / קטגוריה / ספר מסוים / יריד) · קריאה לפעולה · אורך.
2. **בחירת וריאציה**: פתח את `references/variations.md`, בדוק ב-`examples/` ובתיקיית `video/` מה כבר נעשה, ובחר שילוב שלא נעשה (הוק, פלטה, סדר קטעים, שאלות, ספר לטעימה, זווית קטגוריות). כתוב את הבחירה בתסריט.
3. **תסריט**: טבלת סצנות לפי שניות (ראה recipe). כל כיתוב חייב להיות ניתן לקריאה בלי סאונד.
4. **תוכן אמיתי בלבד**: שאלות שנשאלו בפועל את מעיין הספרן באתר (Playwright, ראה recipe §איסוף), הספרים מהתשובות שלו, כריכות וצילומי מסך מהאתר. לא ממציאים ספרים, ציטוטים או מספרים.
5. **config.json**: העתק `examples/config-launch.json` ושנה טקסטים, `qa`, `categories`, `covers`, `hookShots`, `variant`. שינויי תזמון/מבנה (SEGS, WARP) – בקובץ עותק של reel.html (ראה recipe).
6. **AI (אופציונלי, להקפצת רמה)**: שוט הוק / מעבר חדש בהייגספילד (MiniMax H3 ≈10 קרדיטים ל-5 שנ', עם start+end frame), רקעים/מוזיקה/אפקטים ב-fal. מחירים ופרומפטים: `references/ai-generation.md`. לבדוק יתרה ולהציג עלות לפני הוצאה גדולה.
7. **בדיקת פריימים**: `node scripts/stills.js config.json preview 0.2 2.5 4.6 5.2 6.9 9 12 16 19.5 23` – להסתכל על כל תמונה: טקסט חתוך בקצה, עברית הפוכה, אלמנט שמופיע מוקדם, הבהוב במעבר.
8. **רינדור**: `node scripts/render.js config.json frames 25.25` ואז `bash scripts/finish.sh frames out.mp4`. לבדוק את `out_contact.png`.
9. **בדיקת ויראליות (חינם)**: הייגספילד Virality Predictor על 16 השניות הראשונות. הבדלים של עד ~0.02 בציון לשנייה הם רעש. ראה ai-generation.
10. **מסירה**: `video/maayanotecha_<נושא>_reel_9x16_vN_<yyyymmdd>.mp4`, commit + push, ולהציע גרסה איטית (WARP) אם יש הרבה טקסט.

## הרצה מהירה
```bash
cd skills/maayanotecha-premium-reel
cp <brand-kit>/assets/fonts/fontbit/FbSayeedaBook-*.otf <brand-kit>/assets/fonts/fontbit/FbPhilosof-Black.otf template/fonts/
bash scripts/prepare_footage.sh                 # צילומי היריד + פריימים של שוטי ה-AI
(cd template && python3 -m http.server 8765 &)  # השרת חייב לרוץ מתוך template/
node scripts/stills.js examples/config-launch.json preview 1 5 9 20
node scripts/render.js examples/config-launch.json frames 25.25
bash scripts/finish.sh frames out.mp4
```
