#!/bin/bash
# One-time setup after installing the skill (the package is compressed to fit the 30MB skill limit):
# extracts the liquid-glass ribbon loop into frames used by every format.
K="$(cd "$(dirname "$0")/.." && pwd)"; R=$K/template/assets/ribbon; mkdir -p $R
[ -f $R/r_0149.jpg ] || ffmpeg -v error -y -i $K/template/assets/ribbon.mp4 -q:v 3 -start_number 0 $R/r_%04d.jpg
echo "ribbon frames: $(ls $R | wc -l)"
