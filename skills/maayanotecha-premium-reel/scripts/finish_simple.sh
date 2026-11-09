#!/bin/bash
# For books / talk / quote formats. usage: scripts/finish_simple.sh <frames> <out.mp4> [music.wav] [voice.wav]
# With a voice track the music is ducked to a soft bed. A whoosh hits at the end card (last 3.4s).
K="$(cd "$(dirname "$0")/.." && pwd)"; FR=$1; OUT=$2; MUS=${3:-$K/assets/music_25.3s.mp3}; VO=$4; X=$K/assets/sfx
N=$(ls $FR | wc -l); D=$(python3 -c "print($N/30)"); TE=$(python3 -c "print(int(max(0,$N/30-3.5)*1000))"); HK=${HOOK_MS:-0}
if [ -n "$VO" ]; then
  ffmpeg -v error -y -i "$VO" -stream_loop -1 -i "$MUS" -i $X/sfx_whoosh.mp3 -filter_complex "[1:a]volume=0.16,atrim=0:$D[m];[2:a]adelay=$TE|$TE,volume=0.7[w];[0:a]adelay=$HK|$HK,volume=1.0[v];[v][m][w]amix=inputs=3:duration=longest:normalize=0,atrim=0:$D,afade=t=out:st=$(python3 -c "print($D-0.8)"):d=0.8,alimiter=limit=0.95[o]" -map "[o]" -ar 48000 /tmp/_mix.wav
else
  ffmpeg -v error -y -stream_loop -1 -i "$MUS" -i $X/sfx_whoosh.mp3 -filter_complex "[0:a]atrim=0:$D,volume=0.85[m];[1:a]adelay=$TE|$TE,volume=0.8[w];[m][w]amix=inputs=2:duration=first:normalize=0,afade=t=out:st=$(python3 -c "print($D-0.8)"):d=0.8,alimiter=limit=0.95[o]" -map "[o]" -ar 48000 /tmp/_mix.wav
fi
ffmpeg -v error -y -framerate 30 -i "$FR/f_%04d.jpg" -i /tmp/_mix.wav -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -movflags +faststart -c:a aac -b:a 192k -shortest "$OUT"
ffmpeg -v error -y -i "$OUT" -vf "fps=2,scale=135:-1,tile=12x4" "${OUT%.mp4}_contact.png"; echo "done: $OUT ($D s)"
