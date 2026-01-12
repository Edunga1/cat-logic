#!/bin/bash

if ! command -v lychee &> /dev/null
then
    echo "Install lychee with 'brew install lychee'"
    exit
fi

lychee ./docs/wiki/**/*.md --root-dir $(pwd) --offline --include-fragments
