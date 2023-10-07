#!/bin/sh

echo "Removing all node_modules folders..."
find . -name 'node_modules' -exec rm -rf {} \;

echo "Removing all dist folders..."
find . -name 'dist' -exec rm -rf {} \;

echo "Removing all .eslintcache folders..."
find . -name '.eslintcache' -exec rm -rf {} \;

echo "Removing all .turbo files..."
find . -name '.turbo' -exec rm -rf {} \;

echo "Removing all .next files..."
find . -name '.next' -exec rm -rf {} \;

echo "Done."
