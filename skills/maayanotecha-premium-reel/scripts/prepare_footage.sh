#!/bin/bash
# Builds template/footage/seg + grid from the shots chosen in footage/segs.txt and footage/grid.txt
# (run scripts/pick_footage.py first for fresh shots), plus frames of the AI shots (H1,H2,DV).
#   --clip <C00xx> <start> <dur> <name>   export one fair clip as media/<name> (for a 'footage' hook in any format)
# Needs network access to drive.usercontent.google.com.
set -e; K="$(cd "$(dirname "$0")/.." && pwd)"; F=$K/template/footage; mkdir -p $F/seg $F/grid $F/raw; cd $F
dl(){ id=$(grep "^$1 " ids.txt | cut -d' ' -f2); f=raw/$1.MP4; [ -f $f ] || curl -sSL -o $f "https://drive.usercontent.google.com/download?id=$id&export=download&confirm=t"; echo $F/$f; }
if [ "$1" = "--clip" ]; then f=$(dl $2); bash $K/scripts/prepare_video.sh "$f" "$5" "$3" "$4"; exit; fi
rm -f seg/[A-G]_*.jpg seg/[IJK]_*.jpg grid/*.jpg
while read key clip ss du; do f=$(dl $clip); ffmpeg -v error -y -ss $ss -i $f -t $du -vf scale=1920:1080 -q:v 3 -start_number 0 seg/${key}_%03d.jpg; done < segs.txt
i=0; while read clip ss; do f=$(dl $clip)
  ffmpeg -v error -y -ss $ss -i $f -t 1.6 -vf "scale=-2:360,crop=270:360,scale=360:480" -q:v 4 -start_number 0 grid/g${i}_%03d.jpg; i=$((i+1)); done < grid.txt
A=$K/assets/ai-shots
for p in "H1 hook_crane_tower" "H2 hook_fpv_entrance" "DV dive_hall_to_phone"; do set -- $p
  ffmpeg -v error -y -i $A/$2.mp4 -vf "fps=25,scale=1080:1920" -q:v 2 -start_number 0 seg/${1}_%03d.jpg; done
echo "footage ready: $(ls seg | wc -l) seg frames, $(ls grid | wc -l) grid frames (raw clips cached in footage/raw)"
