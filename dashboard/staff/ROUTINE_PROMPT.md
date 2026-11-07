# שגרת התמונות היומית – מה עושים ב-claude.ai

המשימה המתוזמנת "שגרת התמונות של חדר הבקרה" כבר קיימת (כל יום 05:47 שעון ישראל), אבל בלי הקונקטור של fal. בלי fal היא נעצרת בלי לעשות כלום.

**הדרך הקצרה:** ב-claude.ai, ברשימת המשימות המתוזמנות, פותחים את "שגרת התמונות של חדר הבקרה" ומוסיפים לה את הקונקטור **fal**.

**אם אין שם אפשרות להוסיף קונקטור:** יוצרים משימה מתוזמנת חדשה ב-claude.ai (כל יום, בבוקר), מסמנים בה את הקונקטור **fal**, ומדביקים את הפרומפט שלמטה. אחר כך מוחקים את הישנה (או מבקשים מקלוד למחוק את `trig_01XaCccra5iCavzLMycHhMhZ`).

---

## הפרומפט

שגרת התמונות היומית של "חדר הבקרה של מעיינותיך" (החלטה של זלמן, 6.11.2026). הנוהל המלא: הסקיל maayanotecha-staff-ui, references/fal-imagery.md סעיף 4 ומתכון E2. אם הסקיל לא זמין, פעל לפי מה שכתוב כאן.

הארטיפקט: https://claude.ai/artifact/CjnUchP5knm4L8EZAzWh4Z. לא מפרסמים את הדף עצמו ולא משנים בו קוד. רק מעלים נכסים ומעדכנים שדות תמונה במסד.

1. ArtifactData list על items (query.limit 1000), על agents ועל people.
2. מה צריך תמונה:
   - כרטיס צריך כריכה אם: kind הוא project, content או task; אין לו thumb; channel אינו weekly והמזהה אינו weekly (לפוסט השבועי יש לוגו "תובנה" מובנה); והכותרת או המזהה לא תואמים ל-/תניא|פיצול אישיות|tanya|החדשים|קמפיין|סרטונים ליריד/. אירועים (event), פריטים קבועים (recurring) ותזכורות (יש להן remindAt ואין להן channel) לא מקבלים תמונה.
   - סוכן צריך אייקון אם אין לו img. הסוכנים: weekly, creative, media, newsletter, site, data. אם אין מסמך בשמו באוסף agents, הוא צריך אייקון.
   - אדם צריך אווטאר אם אין לו avatar ואין לו photo (חוץ מ-claude, שיש לו להבה).
3. אם אין מה לייצר: עוצרים בלי לכתוב כלום, ומסיימים במילים "אין תמונות חדשות".
4. אם יש יותר מ-12: לא מייצרים. כותבים באוסף activity מסמך אחד {who:'claude', text:'מחכות N תמונות לאישור: <רשימה>', at:<ISO>}, ומסיימים בהודעה קצרה לזלמן.
5. אם כלי fal לא זמינים בסשן (גם לא דרך ToolSearch): לא כותבים למסד. מסיימים בהודעה: "שגרת התמונות לא יכלה לרוץ: fal לא מחובר למשימה. מחכות N תמונות: <רשימה>".
6. ייצור ב-fal עם google/nano-banana-2.1 (submit_jobs, ואז wait_for_jobs):
   - כריכה (מתכון A, 16:9, 2K): "Premium 3D visualization render in the style of a high-end x-ray anatomy illustration, but the subject is [אובייקט אחד מזכוכית שמתאר את הכרטיס לפי הכותרת, הערוץ וההערות] made of translucent frosted glass with visible inner structure. Inner core glows warm amber gold (#F2911C); the glass refracts soft royal blue (#3F5499) and periwinkle tones. Soft diffused studio lighting, subsurface scattering, calm and elegant, not busy. The subject sits in the center of the frame with generous empty space around it. Seamless solid background pale cool gray #ECEEF3, edges fade into the same flat gray, no horizon, no floor line. Absolutely no text, no letters, no symbols, no logos, no people."
   - אייקון לסוכן (מתכון B, 1:1, 1K): "Premium 3D icon render of a single [החפץ של התחום של הסוכן], made of translucent frosted glass with subtle inner structure. Inner core glows warm amber (#F2911C); the glass refracts royal blue (#3F5499), turquoise (#4A8BAA) and soft purple (#6A55A8). Soft diffused studio light, gentle subsurface scattering, slight three-quarter view, centered, object fills 70% of the frame. Seamless flat pure white background, no floor, no shadow. Minimal, elegant, not busy. No text, no numbers, no letters, no logos."
   - אווטאר לאדם (מתכון E2, 1:1, 1K): "Premium stylized 3D character avatar icon, soft clay-like Pixar style render (clearly illustrated, not a photograph), head and shoulders, slight three-quarter view, friendly calm expression: [תיאור לפי התפקיד ולפי לשון הזכר/נקבה שבתפקיד בלבד, לא לפי השם; לבוש צנוע; לגבר דתי: זקן וכיפה או כובע; פרט קטן מהתפקיד]. Soft diffused studio light, gentle subsurface scattering. Centered, face fills the middle of the frame. Seamless flat solid background in a soft light tint of [הצבע של האדם]. No text, no letters, no logos." אף פעם לא צילום מציאותי.
7. בדיקה: inspect_images לכל תמונה. אין טקסט, אין עיוותים, ובכריכות ובאייקונים אין אנשים. תמונה שנכשלה מריצים שוב פעם אחת.
8. שמירה: מורידים את הקובץ המלא מ-v3b.fal.media עם curl. אם ההורדה חסומה, משתמשים בתצוגה המקדימה ש-inspect_images שומר.
   - כריכה: WebP ברוחב 1280.
   - אייקון: מסירים את הרקע הלבן (מודל רקע ריבועי לפי פיקסלים בהירים ולא רוויים, ואלפא לפי המרחק מהרקע), חותכים לריבוע ומקטינים ל-192×192 WebP.
   - אווטאר: חותכים ריבוע סביב הפנים (17%–83% ברוחב, 2%–68% בגובה) ומקטינים ל-192×192 WebP.
   מעלים עם Artifact publish: url של הארטיפקט, asset:true, file_paths.
9. חיבור (ArtifactData batch, עם if_version לכל מסמך קיים):
   - לכרטיס: {thumb:<url>, thumbArt:true, thumbSrc:{endpoint, recipe, subject}}.
   - לסוכן: set או update {img:<url>, imgSrc:{...}}.
   - לאדם: update {avatar:<url>, avatarSrc:{endpoint, recipe:'E2'}}.
   - ומסמך activity אחד: {who:'claude', text:'יצר N תמונות: ...', at}.
   לא נוגעים בשום שדה אחר.
10. סיום: הודעה קצרה בעברית, כמה תמונות נוצרו ולמה.
