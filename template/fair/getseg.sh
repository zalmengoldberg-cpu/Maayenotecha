#!/bin/bash
# Re-creates the fair-footage frames used by the hook (fair/seg + fair/grid) from the shared Drive folder "יריד".
# Needs network access to drive.usercontent.google.com.   usage: bash fair/getseg.sh
cd "$(dirname "$0")"; mkdir -p seg grid raw
while read key clip ss du; do
  id=$(grep "^$clip " ids.txt | cut -d' ' -f2); f=raw/$clip.MP4
  [ -f $f ] || curl -sSL -o $f "https://drive.usercontent.google.com/download?id=$id&export=download&confirm=t"
  ffmpeg -v error -y -ss $ss -i $f -t $du -vf "scale=1920:1080" -q:v 3 -start_number 0 seg/${key}_%03d.jpg; echo "seg $key"
done < segs.txt
i=0; for spec in "C0078 3" "C0080 1" "C0081 2" "C0077 30" "C0093 10" "C0010 1" "C0076 15" "C0088 3" "C0089 20" "C0092 12" "C0098 8" "C0012 4"; do set -- $spec
  id=$(grep "^$1 " ids.txt | cut -d' ' -f2); f=raw/$1.MP4
  [ -f $f ] || curl -sSL -o $f "https://drive.usercontent.google.com/download?id=$id&export=download&confirm=t"
  ffmpeg -v error -y -ss $2 -i $f -t 1.6 -vf "scale=-2:360,crop=270:360,scale=360:480" -q:v 4 -start_number 0 grid/g${i}_%03d.jpg; i=$((i+1)); done
