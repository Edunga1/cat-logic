#!/bin/bash

# 지정된 디렉토리 내의 모든 md 파일을 검색하여 front matter에 특정 문자열이 있는지 확인합니다.
# Usage: ./find-missing-front-matter.sh [directory path]
# Example: ./find-missing-front-matter.sh docs/wiki/

# 디렉토리를 지정하지 않았을 경우 현재 디렉토리를 사용
DIR=${1:-docs/wiki/}
# 검색할 문자열
WORD='created:'

# md 파일들을 순회
find "$DIR" -type f -name "*.md" | while read file; do
  # 파일의 front matter 부분에서 문자열로 시작하는 줄이 있는지 확인
  if ! awk -v word="$WORD" '
    /^---$/ {f=1; next}
    f && /^---$/ {f=0}
    f && $0 ~ word {found=1}
    END {exit !found}
  ' "$file"; then
    echo "No '$WORD' found in front matter of: $file"
  fi
done
