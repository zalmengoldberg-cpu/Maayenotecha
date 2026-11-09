#!/bin/bash
# Builds template/footage/seg + footage/grid: real fair clips (from the shared Drive folder "יריד")
# and the AI shots (assets/ai-shots/*.mp4 -> H1,H2,DV frame sequences).
# Needs network access to drive.usercontent.google.com for the fair clips.
set -e; K="$(cd "$(dirname "$0")/.." && pwd)"; F=$K/template/footage; mkdir -p $F/seg $F/grid $F/raw; cd $F
dl(){ id=$(grep "^$1 " ids.txt | cut -d' ' -f2); f=raw/$1.MP4; [ -f $f ] || curl -sSL -o $f "https://drive.usercontent.google.com/download?id=$id&export=download&confirm=t"; echo $f; }
while read key clip ss du; do f=$(dl $clip); ffmpeg -v error -y -ss $ss -i $f -t $du -vf scale=1920:1080 -q:v 3 -start_number 0 seg/${key}_%03d.jpg; done < segs.txt
i=0; for spec in "C0078 3" "C0080 1" "C0081 2" "C0077 30" "C0093 10" "C0010 1" "C0076 15" "C0088 3" "C0089 20" "C0092 12" "C0098 8" "C0012 4"; do set -- $spec; f=$(dl $1)
  ffmpeg -v error -y -ss $2 -i $f -t 1.6 -vf "scale=-2:360,crop=270:360,scale=360:480" -q:v 4 -start_number 0 grid/g${i}_%03d.jpg; i=$((i+1)); done
A=$K/assets/ai-shots
for p in "H1 hook_crane_tower" "H2 hook_fpv_entrance" "DV dive_hall_to_phone"; do set -- $p
  ffmpeg -v error -y -i $A/$2.mp4 -vf "fps=25,scale=1080:1920" -q:v 2 -start_number 0 seg/${1}_%03d.jpg; done
echo "footage ready: $(ls seg | wc -l) seg frames, $(ls grid | wc -l) grid frames"
