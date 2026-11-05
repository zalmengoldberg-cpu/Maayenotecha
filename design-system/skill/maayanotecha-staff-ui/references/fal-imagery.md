# תמונות ואייקונים עם fal – מדריך הפקה

כשהפלטפורמה צריכה תמונה, איור או אייקון, מייצרים אותם עם **הקונקטור של fal**, בסגנון אחד שחוזר בכל המערכת.
כל המתכונים כאן נבדקו והפיקו את הנכסים שבסקיל (`assets/img`, `assets/avatars`, `assets/icons-3d`).

## 1. מה מייצרים ומה לא

| צורך | מקור | למה |
|---|---|---|
| אייקון ממשק קטן (כפתור, תפריט, שורה) | **לא fal.** הסט הקווי ב-`ds.js` (`data-icon`). חסר אייקון – מציירים SVG 24×24, קו 1.6, פינות מעוגלות, באותו סגנון | AI לא מייצר סט קווי עקבי |
| לוגו של רשת/שירות (פייסבוק, אינסטגרם, וואטסאפ, יוטיוב, ג'ימייל, גוגל ועוד) | **לא fal.** אייקון המותג האמיתי: `data-brand` (נמצא ב-`ds.js`). מותג שחסר – מ-Simple Icons (`https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/<slug>.svg`, רישיון CC0) | לוגו חייב להיות מדויק |
| לוגו מעיינותיך | **לא fal.** רק `assets/logos/*.svg` | אסור לצייר את הלוגו |
| כריכות ספרים | **לא fal.** רק כריכות אמיתיות (`assets/covers` או מה שהמשתמש מצרף) | שם, מחבר וטקסט עברי חייבים להיות אמיתיים |
| איור במה להירו / מסך פתיחה | **fal** – מתכון A | |
| איור חי שמשקף מצב (מדד, התקדמות, עומס) | **fal** – מתכון F: סט מצבים מיושר | |
| אייקון תלת-ממדי מזכוכית (מצב ריק, אריח אזור, אונבורדינג, כרטיס קידום) | **fal** – מתכון B | |
| תמונת אווירה לכרטיס כהה (עוזר AI, קידום) | **fal** – מתכון C | |
| טקסטורה/רקע (משי לסרגל, ערפל) | **fal** – מתכון D | |
| תמונת פרופיל | **אמיתית תמיד** כשמדובר באדם אמיתי. לנתוני הדגמה בלבד – **fal** מתכון E | לא מייצרים דמות של אדם אמיתי |

**כללים לכל תמונה:**
- מייצרים **רק למקום שהאפיון כבר הגדיר לו תמונה**. מקום שאין בו תמונה באפיון → הצעה בצ'אט, לא מייצרים.
- **אין טקסט** בתוך תמונה, לא עברית ולא אנגלית. טקסט תמיד ב-HTML מעל.
- צבעים רק מהפלטה: זהב `#F2911C`, כחול מלכותי `#3F5499`, טורקיז `#4A8BAA`, סגול `#6A55A8`, שזיף `#5E1542`, ניטרלי `#D1D4DD`.
- נושא אחד בכל תמונה. בלי עומס, בלי פילטרים, בלי "סגנון AI" נוצץ.
- לפני סבב של יותר מ-8 תמונות – שואלים את המשתמש. מחיר בודקים רק אם המשתמש שאל.

## 2. תהליך העבודה עם הקונקטור

1. **בחירת מודל:** `recommend_model` עם `operation: "text-to-image"` (ברירת המחדל שנבחרה כאן: `google/nano-banana-2.1`). להסרת רקע: `operation: "background-removal"` (נבחר: `fal-ai/birefnet/v2`).
2. **הרצה:** תמונה אחת – `run_model`. כמה תמונות – `submit_jobs` אחד (עד 8), ואז `wait_for_jobs`. את ה-`decision_id` מ-`recommend_model` מעבירים הלאה.
3. **בדיקה:** `inspect_images` (עד 4 בכל קריאה) – מסתכלים בפועל על כל תמונה: אין טקסט, אין עיוותים, הצבעים בפלטה, יש מקום ריק איפה שצריך. תמונה שלא עוברת – מתקנים את הפרומפט ומריצים רק אותה שוב.
4. **הסרת רקע** (אייקונים תלת-ממדיים): מריצים את מודל הסרת הרקע על ה-URL של התמונה, `output_format: "png"`.
5. **הכנסה לפרויקט:**
   - מורידים את הקובץ מה-URL שחזר, חותכים ומקטינים לגודל התצוגה פי 2 (אייקון 96px → 192px, תמונת פרופיל 44px → 176px, הירו → רוחב 1600–2000), ושומרים כ-WebP.
   - בארטיפקט: מטמיעים כ-data URI (`python3 scripts/bundle.py --img <קובץ>`), כי ארטיפקט לא טוען תמונות מאתרים חיצוניים.
   - בקוד של אתר אמיתי: שומרים את הקובץ בתיקיית הנכסים של הפרויקט. לא משאירים קישור ל-fal בקוד – הקישורים זמניים.
   - אם אי אפשר להוריד את הקובץ מהסביבה, `inspect_images` מחזיר תצוגה מקדימה עד 768px שאפשר להשתמש בה לגדלים קטנים (פרופיל, אייקון). לגדלים גדולים – מוסרים למשתמש את ה-URL המקורי.
6. **תיעוד:** לכל נכס שנוצר כותבים שורה בקובץ `assets-manifest.md` של הפרויקט: שם קובץ, איפה הוא בשימוש, endpoint, הפרומפט המלא, URL המקור. כך אפשר לייצר מחדש או וריאציה באותו סגנון.

## 3. המתכונים

### A · איור במה (הירו, מסך פתיחה, מצב ריק גדול)
```
Premium 3D visualization render in the style of a high-end x-ray anatomy illustration, but the subject is
[ONE OBJECT from the world of Jewish books: an open antique book / a scroll / an oil lamp / a spring of water]
made of translucent frosted glass with visible inner structure. [What happens: a gentle spring of luminous liquid
light rises from the book's gutter like a small fountain]. Inner core glows warm amber gold (#F2911C); the glass
refracts soft royal blue (#3F5499) and periwinkle tones. Soft diffused studio lighting, subsurface scattering,
calm and elegant, not busy. The subject sits in the left-center of the frame; the right third is completely empty.
Seamless solid background pale cool gray #ECEEF3, edges fade into the same flat gray, no horizon, no floor line.
Absolutely no text, no letters, no symbols, no logos, no people.
```
16:9, 2K. ב-RTL הטקסט יושב בצד הימני הריק. רקע הבמה ב-CSS (`--stage`) מותאם לרקע שיוצא בפועל – דוגמים אותו מהתמונה.

### B · אייקון תלת-ממדי מזכוכית
```
Premium 3D icon render of a single [OBJECT: closed shipping box / stack of three hardcover books / desk calendar
with blank pages / small delivery van / ...], made of translucent frosted glass with subtle inner structure.
Inner core glows warm amber (#F2911C); the glass refracts royal blue (#3F5499), turquoise (#4A8BAA) and soft
purple (#6A55A8). Soft diffused studio light, gentle subsurface scattering, slight three-quarter view, centered,
object fills 70% of the frame. Seamless flat pure white background, no floor, no shadow. Minimal, elegant,
not busy. No text, no numbers, no letters, no logos.
```
1:1, 1K → הסרת רקע → PNG/WebP שקוף. אותה זווית ותאורה לכל הסט, כדי שייראו כמשפחה.

### C · תמונת אווירה לכרטיס כהה
```
Abstract ethereal macro photograph: a single translucent flowing form of light, like [a slow flame merging with a
drop of water / soft silk petals], glowing warm amber and peach at its core, fading into deep plum (#5E1542) and
dark royal navy (#1E2A55) darkness. Extremely soft focus edges, fine film grain, dreamy, quiet, premium.
Subject centered slightly low, plenty of dark negative space at top. No text, no logos, no people, no faces.
```
4:5. המקום הריק למעלה הוא לכותרת.

### D · טקסטורה / רקע
```
Abstract 3D render of large smooth flowing fabric-like ribbon folds, matte graphite and deep midnight navy
(#141B33) surfaces with soft silver rim highlights, layered sculptural waves filling the whole frame,
low-contrast, dark, calm and luxurious, studio lighting from upper right. No text, no logos, no objects, no people.
```
16:9. תמיד מתחת לשכבת זכוכית או גרדיאנט, אף פעם לא לבד מאחורי טקסט.

### E · תמונת פרופיל לנתוני הדגמה בלבד
```
Photorealistic professional studio headshot of [a warm, friendly Orthodox Jewish man in his 50s with a full
salt-and-pepper beard, black fedora, dark suit and white shirt / a religious Jewish woman in her 40s with a neat
shoulder-length wig and a modest high-neck blouse / ...]. Soft diffused window light, head and shoulders centered,
looking at camera with a natural smile. Plain soft blue-grey seamless background (#C9D2E8).
Natural skin texture, editorial quality, no text.
```
1:1, 1K. חותכים ריבוע סביב הפנים (כולל כובע וזקן), 176px. מגוון גילאים ומראות שמתאים לקהל של מעיינותיך, לבוש צנוע ומכובד. **לעולם לא** לפי שם או תמונה של אדם אמיתי, ולא במקום תמונה של משתמש אמיתי – מי שאין לו תמונה מקבל `mono`.

### F · סט מצבים מיושר (איור חי שמשקף מצב – למשל שעון החול של "מדד העבודה")
אותו אובייקט בכמה מצבים, **מיושרים בדיוק** כדי שאפשר יהיה לעבור ביניהם ב-crossfade.
1. **מצב בסיס** – `text-to-image` לפי מתכון A, עם האובייקט והמצב הראשון:
```
Premium 3D visualization render in the style of a high-end medical x-ray anatomy illustration, but the subject is
an elegant classic hourglass made of translucent frosted glass with visible inner structure, two slim polished glass
end plates and three thin glass columns. Inside, the sand is made of fine luminous glowing particles, soft mint-green
and turquoise light (#4FD1B5, #4A8BAA). The top bulb is about 80% full, a thin delicate stream of glowing grains falls
through the narrow neck, and a small soft mound sits in the bottom bulb. [...המשך מתכון A: תאורה, מיקום, רקע #ECEEF3, בלי טקסט]
```
2. **כל מצב נוסף** – עריכה של תמונת הבסיס (`operation: "image-edit"`, נבחר: `google/nano-banana-2.1/edit`, `image_urls: [<בסיס>]`):
```
Edit this image. Keep the exact same hourglass, glass shape, columns, camera angle, framing, position, lighting and
background completely unchanged, pixel-aligned. Only change the sand inside: [the top bulb is now only HALF full ...],
and the sand and its soft inner glow are [warm amber gold (#F2911C)] instead of mint green.
Keep the thin glowing stream of grains falling through the neck. No text, no numbers.
```
3. **בדיקה**: `inspect_images` לכל המצבים זה לצד זה. האובייקט חייב לשבת באותו מקום בדיוק, וההבדל בין המצבים חייב להיות ברור גם בלי הצבע (כאן: כמות החול). מצב שלא שונה מספיק – עורכים שוב **מהתוצאה שלו**, עם הוראה חדה יותר ("only HALF full, the upper half of the top bulb is clear empty glass").
4. **צבעי מצבים**: רגוע `#4FD1B5` (מנטה), עמוס `#F2911C` (זהב), דחוף `#E2574C` (אלמוג). "Elegant and calm, not alarming" גם במצב הדחוף.

אובייקטים אחרים שמתאימים למתכון: נר שדולק עד הסוף, באר שמתמלאת, מעיין שזורם חלש/חזק – תמיד אובייקט אחד מעולם המותג, שמצבו נקרא במבט אחד.
