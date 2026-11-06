# שגרת התמונות היומית – מה עושים ב-claude.ai

המשימה המתוזמנת "שגרת התמונות של חדר הבקרה" כבר קיימת (כל יום 05:47 שעון ישראל), אבל בלי הקונקטור של fal. בלי fal היא נעצרת בלי לעשות כלום.

**הדרך הקצרה:** ב-claude.ai, ברשימת המשימות המתוזמנות, פותחים את "שגרת התמונות של חדר הבקרה" ומוסיפים לה את הקונקטור **fal**.

**אם אין שם אפשרות להוסיף קונקטור:** יוצרים משימה מתוזמנת חדשה ב-claude.ai (כל יום, בבוקר), מסמנים בה את הקונקטור **fal**, ומדביקים את הפרומפט שלמטה. אחר כך מוחקים את הישנה (או מבקשים מקלוד למחוק את `trig_01XaCccra5iCavzLMycHhMhZ`).

---

## הפרומפט

שגרת התמונות היומית של "חדר הבקרה של מעיינותיך" (החלטה של זלמן, 6.11.2026). הנוהל המלא: הסקיל maayanotecha-staff-ui, references/fal-imagery.md סעיף 4. אם הסקיל לא זמין, פעל לפי מה שכתוב כאן.

הארטיפקט: https://claude.ai/artifact/CjnUchP5knm4L8EZAzWh4Z. לא מפרסמים את הדף עצמו ולא משנים בו קוד. רק מעלים נכסים ומעדכנים שדות תמונה במסד.

1. ArtifactData list על items ועל agents.
2. כרטיס צריך כריכה אם: kind הוא project, content או task; אין לו thumb; channel אינו weekly והמזהה אינו weekly (לפוסט השבועי יש לוגו "תובנה" מובנה); והכותרת או המזהה לא תואמים ל-/תניא|פיצול אישיות|tanya|החדשים|קמפיין|סרטונים ליריד/. אירועים (event) ופריטים קבועים (recurring) לא מקבלים תמונה.
   סוכן צריך אייקון אם אין לו img. הסוכנים: weekly, creative, media, newsletter, site, data. אם אין מסמך בשמו באוסף agents, הוא צריך אייקון.
3. אם אין מה לייצר: עוצרים בלי לכתוב כלום.
4. אם יש יותר מ-12: לא מייצרים. כותבים באוסף activity מסמך אחד {who:'claude', text:'מחכות N תמונות לאישור: <רשימה>', at:<ISO>} ועוצרים.
5. ייצור ב-fal עם google/nano-banana-2.1:
   - כריכה (מתכון A, 16:9, 2K): "Premium 3D visualization render in the style of a high-end x-ray anatomy illustration, but the subject is [אובייקט אחד מזכוכית שמתאר את הכרטיס לפי הכותרת, הערוץ וההערות] made of translucent frosted glass with visible inner structure. Inner core glows warm amber gold (#F2911C); the glass refracts soft royal blue (#3F5499) and periwinkle tones. Soft diffused studio lighting, subsurface scattering, calm and elegant, not busy. The subject sits in the center of the frame with generous empty space around it. Seamless solid background pale cool gray #ECEEF3, edges fade into the same flat gray, no horizon, no floor line. Absolutely no text, no letters, no symbols, no logos, no people."
   - אייקון לסוכן (מתכון B, 1:1, 1K): "Premium 3D icon render of a single [החפץ של התחום של הסוכן], made of translucent frosted glass with subtle inner structure. Inner core glows warm amber (#F2911C); the glass refracts royal blue (#3F5499), turquoise (#4A8BAA) and soft purple (#6A55A8). Soft diffused studio light, gentle subsurface scattering, slight three-quarter view, centered, object fills 70% of the frame. Seamless flat pure white background, no floor, no shadow. Minimal, elegant, not busy. No text, no numbers, no letters, no logos."
6. בדיקה: inspect_images לכל תמונה. אין טקסט, אין אנשים, אין עיוותים. תמונה שנכשלה מריצים שוב פעם אחת.
7. שמירה: ה-preview ש-inspect_images שומר מקומית. כריכה כ-WebP. אייקון: מסירים את הרקע הלבן, חותכים לריבוע ומקטינים ל-192×192 WebP. מעלים עם Artifact publish: url של הארטיפקט, asset:true, file_paths.
8. חיבור (ArtifactData batch, עם if_version לכל מסמך קיים): לכרטיס {thumb:<url>, thumbArt:true, thumbSrc:{endpoint, recipe, subject}}; לסוכן set או update {img:<url>, imgSrc:{...}}; ומסמך activity אחד {who:'claude', text:'יצר N תמונות: ...', at}. לא נוגעים בשום שדה אחר.
9. אם fal או הארטיפקט לא זמינים: עוצרים בלי לכתוב למסד.
