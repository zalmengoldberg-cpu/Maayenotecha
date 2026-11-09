# AI – הייגספילד ו-fal (מה עבד, מחירים, פרומפטים)

## עקרון
AI רק לתמונה ותנועה (שוטי הוק, מעברים, רקעים) ולסאונד. **טקסט עברי – רק HTML**. מסכי האתר – רק צילומי מסך אמיתיים.

## הייגספילד (חשבון Plus, 100 קרדיטים בהתחלה; נוצלו 40)
| שימוש | מודל | עלות (5 שנ') | הערות |
|---|---|---|---|
| שוט מפריים אמיתי / start+end | `minimax_h3` (9:16) | **10** | הכי משתלם. 1440×2560, ‏24fps |
| חלופה מהירה | `kling_4_0_flash` | 15 | |
| איכות גבוהה | `seedance_2_5` 720p / 1080p | 35 / 80 | יקר מדי לתקציב 100 |
| בדיקת ויראליות | `virality_predictor` | **0** | עד 16 שנ' בלבד. מחזיר hook/sustain/viral + ציון לשנייה |

**תהליך העלאה:** `media_upload` → `curl -X PUT -H "Content-Type: ..." -H "If-None-Match: *" --data-binary @file '<upload_url>'` → `media_confirm`. דורש גישה לרשת ל-`upload.higgsfield.ai`, ולתוצאות `d8j0ntlcm91z4.cloudfront.net`.
**תמיד** `get_cost:true` לפני הפקה, ולדווח יתרה (`balance`).

### פרומפטים שעבדו
- **הוק – מגדל→אולם** (start = פריים אמיתי של מגדל ספרים): "Cinematic crane shot. The camera starts close on the tall stack of dark blue hardcover books and rises smoothly and quickly upward along the tower, clearing its top to reveal a vast exhibition hall filled with hundreds of towers and tables of books and a large crowd of people browsing... no text added."
- **הוק – רחפן בכניסה**: "Fast FPV drone shot. The camera flies forward through the doorway into a huge book fair hall, gliding low and fast between towering stacks..."
- **מעבר – צלילה לטלפון** (start = מבט על מהשוט הקודם, end = פריים נקי של הטלפון מהתבנית): "Dramatic continuous camera move. Starting high above the vast crowded book fair hall, the camera dives steeply down and forward at accelerating speed, the hall lights stream past and the scene darkens around a glowing point of light, which resolves into a modern smartphone floating in a dark premium studio..." (הגרסה עם "black void" יצאה טובה יותר מגרסת "rush toward the tables").
- פריימים לתבנית: `ffmpeg -i shot.mp4 -vf "fps=25,scale=1080:1920" -q:v 2 -start_number 0 footage/seg/X1_%03d.jpg` ואז `segFrames:{"X1":125}` + `hookShots`.

### ויראליות – מה למדנו
- שוט קולנועי בשנייה 0 + כיתוב מהפריים הראשון העלו מעורבות בשנייה הראשונה מ-0.43 ל-0.47.
- הקשב יורד בתחילת קטע הספרן (הקלדה על רקע כהה) – כדאי שתנועה (מערבולת) תקדים טקסט.
- הבדלים של עד ~0.02 הם רעש (אותו קטע נתן 0.47 ו-0.46).

## fal
| שימוש | endpoint | הערות |
|---|---|---|
| רקעים / סטילס | `google/nano-banana-2.1` (9:16, 2K) | "Apple keynote", ‏"liquid glass ribbon", ‏"black void" – בלי טקסט |
| לולאת רקע | `alibaba/wan-3.0-prime/image-to-video` | אותה תמונה ב-start וב-end → לולאה. ‏$0.05/שנ' |
| מוזיקה | `elevenlabs/music/v2.5` + `composition_plan` | פתיחה עם אימפקט · groove מהיר אלגנטי · פסנתר עם נגיעה מזרחית · סיום עם אקורד וזנב. לחתוך כך שהמכות (כל 4 שנ') נופלות על החיתוכים |
| אפקטים | `elevenlabs/sound-effects/v3` | ווש+אימפקט 1.2 שנ', סחרור דפים 1.4 שנ', קליק UI 0.5 שנ' – פחות מסנט כל אחד |
