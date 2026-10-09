#!/bin/bash
# Run inside the frontend folder:  bash install-fonts.sh
mkdir -p public/fonts .tmp-vazir
[ -f Vazir-Bold.ttf ] && cp Vazir-Bold.ttf public/fonts/
ZIP=$(ls vazir-font*.zip 2>/dev/null | head -1)
if [ -n "$ZIP" ]; then
  unzip -o -q "$ZIP" -d .tmp-vazir
  for n in Regular Medium Bold; do for e in woff2 woff ttf; do f=$(find .tmp-vazir -name "Vazir-$n.$e" | head -1); [ -n "$f" ] && cp "$f" public/fonts/; done; done
  for e in woff2 woff ttf; do f=$(find .tmp-vazir -name "Vazir.$e" | head -1); [ -n "$f" ] && cp "$f" "public/fonts/Vazir-Regular.$e"; done
fi
rm -rf .tmp-vazir
echo "Fonts in public/fonts:"; ls public/fonts
