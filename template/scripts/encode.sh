#!/bin/bash
# usage: scripts/encode.sh frames_dir music.wav out.mp4
ffmpeg -v error -y -framerate 30 -i "$1/f_%04d.jpg" -i "$2" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -movflags +faststart -c:a aac -b:a 192k -shortest "$3"
ffmpeg -v error -y -i "$3" -vf "fps=2,scale=135:-1,tile=13x4" "${3%.mp4}_contact.png"
echo "done: $3 (+ contact sheet)"
