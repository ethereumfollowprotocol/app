#!/bin/sh

# Find all node_modules folders and remove them recursively
echo "Removing all node_modules folders..."
find . -name 'node_modules' -exec rm -rf {} \;

# Find all dist folders and remove them recursively
echo "Removing all dist folders..."
find . -name 'dist' -exec rm -rf {} \;

echo "Removing all .turbo folders..."
find . -name '.eslintcache' -exec rm -rf {} \;

echo "Removing all .turbo files..."
find . -name '.turbo' -exec rm -rf {} \;

rm -rf pnpm-out out

echo "Done."
