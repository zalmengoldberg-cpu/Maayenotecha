#!/bin/bash
# scripts/finish.sh <frames_dir> <out.mp4> [music.wav]
# Mixes music + SFX at the template's default cue times, encodes H.264, writes a contact sheet.
K="$(cd "$(dirname "$0")/.." && pwd)"; FR=$1; OUT=$2; MUS=${3:-$K/assets/music_25.3s.wav}; X=$K/assets/sfx
ffmpeg -v error -y -i "$MUS" -i $X/sfx_whoosh.mp3 -i $X/sfx_swirl.mp3 -i $X/sfx_click.mp3 -filter_complex "
[1:a]asplit=5[w1][w2][w3][w4][w5];[w1]adelay=4380|4380,volume=0.8[a1];[w5]adelay=5450|5450[a5];[w2]adelay=7080|7080,volume=0.6[a2];[w3]adelay=15630|15630,volume=0.7[a3];[w4]adelay=21630|21630,volume=0.9[a4];
[2:a]asplit=4[s1][s2][s3][s4];[s1]adelay=8000|8000,volume=0.55[b1];[s2]adelay=10140|10140,volume=0.55[b2];[s3]adelay=12280|12280,volume=0.55[b3];[s4]adelay=14410|14410,volume=0.55[b4];
[3:a]asplit=3[c1][c2][c3];[c1]adelay=5430|5430,volume=1.1[d1];[c2]adelay=6980|6980,volume=1.1[d2];[c3]adelay=18660|18660,volume=1.1[d3];[0:a]volume=0.85[m];
[m][a1][a5][a2][a3][a4][b1][b2][b3][b4][d1][d2][d3]amix=inputs=13:duration=first:normalize=0,alimiter=limit=0.95[o]" -map "[o]" -ar 48000 /tmp/_mix.wav
ffmpeg -v error -y -framerate 30 -i "$FR/f_%04d.jpg" -i /tmp/_mix.wav -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -movflags +faststart -c:a aac -b:a 192k -shortest "$OUT"
ffmpeg -v error -y -i "$OUT" -vf "fps=2,scale=135:-1,tile=13x4" "${OUT%.mp4}_contact.png"; echo "done: $OUT"
