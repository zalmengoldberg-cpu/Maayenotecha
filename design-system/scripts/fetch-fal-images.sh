#!/usr/bin/env bash
# מוריד את האיורים המקוריים ב-2K מ-fal ומחליף את התצוגות המקדימות (768px) ב-assets/img.
# להריץ ממחשב עם גישה ל-fal.media:  bash design-system/scripts/fetch-fal-images.sh
set -euo pipefail
cd "$(dirname "$0")/../assets/img"
get(){ curl -fsSL "$1" -o "$2.tmp" && mv "$2.tmp" "$2" && echo "✓ $2"; }
get "https://v3b.fal.media/files/b/0ab1458a/jNxza-vEAZhBqg-OrivsP_vhVUVod2.png" hero-wellspring.png
get "https://v3b.fal.media/files/b/0ab1458a/v_6peiQ9ZvA9rvQYUAVhY_unFvo78z.jpg" assistant-flame.jpg
get "https://v3b.fal.media/files/b/0ab1458a/7jmsUyv_AapEMrkcB1eyn_pnVueL9i.jpg" silk-waves.jpg
if command -v cwebp >/dev/null; then
  cwebp -q 86 hero-wellspring.png -o hero-wellspring.webp && cwebp -q 84 assistant-flame.jpg -o assistant-flame.webp && cwebp -q 80 silk-waves.jpg -o silk-waves.webp
  rm -f hero-wellspring.png assistant-flame.jpg silk-waves.jpg
fi
