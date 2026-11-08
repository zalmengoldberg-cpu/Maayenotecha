# סרטון ההדמיה של חדר הבקרה (7.11.2026)
סרטון של כ-2.5 דקות לצוות מעיינותיך: מה החדר נותן, איך משתמשים, וזרימת העבודה עם קלוד. מצולם מתוך העותק המקומי (`kit/tests/srv`, המסד המקומי מ-`dashboard/db`).

הפקה מחדש (אחרי `python3 kit/tests/prepare.py`), מתוך `dashboard/kit/tests`:
```
node ../video/rec.js /tmp/fr
cd /tmp/fr && ffmpeg -f concat -safe 0 -i list.txt -vf "fps=30,scale=1600:900:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -crf 18 -movflags +faststart demo.mp4
```
- צילום דרך CDP screencast (JPEG 92) ולא הקלטת הווידאו של Playwright, שהאיכות שלה נמוכה.
- הגופן Rubik נטען מקבצים מקומיים (הסקיל maayanotecha-media), והשעה קבועה ל-8:40 בבוקר ("בוקר טוב", "בריף בוקר").
- הסרטון כולל נתונים אמיתיים מהמסד. הוא מיועד לשיתוף פנימי בלבד.
