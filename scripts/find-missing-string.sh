#!/bin/bash

# 디렉토리를 지정하지 않았을 경우 현재 디렉토리를 사용
DIR=${1:-docs/wiki/}
# 검색할 문자열
WORD='created:'

# md 파일들을 순회
find "$DIR" -type f -name "*.md" | while read file; do
  # 파일에 문자열로 시작하는 줄이 있는지 확인
  if ! grep -q "^$WORD" "$file"; then
    echo "No '$WORD' found in: $file"
  fi
done
