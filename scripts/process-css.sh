#!/usr/bin/env bash

set -eou pipefail

echo "CSS size before processing:"
du -h .next/static/css/*.css
TOTAL_SIZE=$(du -h .next/static/css/*.css | awk '{s+=$1} END {print s}')
echo "Total size: ${TOTAL_SIZE}K"

echo -e "\nProcessing CSS files..."

FILENAMES=$(ls -1 .next/static/css/*.css)
echo $FILENAMES

for FILENAME in $FILENAMES; do
  echo "Processing $FILENAME"
  lightningcss --minify --bundle --targets ">= 100%" $FILENAME -o $FILENAME
done

echo -e "\nCSS size after processing:"
du -h .next/static/css/*.css
TOTAL_SIZE=$(du -h .next/static/css/*.css | awk '{s+=$1} END {print s}')
echo "Total size: ${TOTAL_SIZE}K"
