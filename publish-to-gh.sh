#!/bin/bash
set -ex

npm run build
cp -R .git _book
pushd _book
git checkout --orphan gh-pages
git add .
git commit -m "Publish"
git push -f origin gh-pages
popd
rm -rf _book
