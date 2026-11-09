#!/bin/bash
# Prepare a talking-head (or any) clip for talk.html: crop to 9:16, 25fps JPG frames + WAV audio.
# usage: scripts/prepare_video.sh input.mp4 <name> [start_sec] [dur_sec]
# result: template/media/<name>/0000.jpg ... + template/media/<name>.wav ; prints the config snippet
set -e; K="$(cd "$(dirname "$0")/.." && pwd)"; IN=$1; N=$2; SS=${3:-0}; DU=${4:-}
O=$K/template/media/$N; mkdir -p $O; T=""; [ -n "$DU" ] && T="-t $DU"
ffmpeg -v error -y -ss $SS -i "$IN" $T -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=25" -q:v 3 -start_number 0 $O/%04d.jpg
ffmpeg -v error -y -ss $SS -i "$IN" $T -vn -ac 2 -ar 48000 $K/template/media/$N.wav || true
C=$(ls $O | wc -l); echo "\"video\": {\"dir\": \"media/$N\", \"fps\": 25, \"count\": $C}, \"voice\": \"template/media/$N.wav\""
