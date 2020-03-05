---
id: page-94
time: 2019-08-24 23:36:34
tags: vim
---
# Vim

## command mode

`ctrl + f` 누르면 normal mode 처럼 편집할 수 있다.
이것은 NERDTree의 파일명 수정이나 파일 생성 시에도 동작한다.
매번 파일 이름 수정할 때 마다 단어 단위로 이동할 수 없어서 불편했는데, `ctrl + f`를 눌러 `hjkl` `wb` 등으로 이동하자.

## vim variables

### path

`:find` 검색 범위를 결정한다.
`:find foo` 엔터 시 파일이나 디렉토리를 검색하고 여는데,
탭을 누르면 목록에서 선택할 수 있다.

`set path+=**` `**`로 설정하면 현재 폴더 내 모든 범위를 검색한다.
`**` 사용하기 전과 비교해보면 검색 수가 달라지는 것을 알 수 있다.
문제는 `.gitignore` 내 파일도 검색하기 때문에 `node_modules` 도 검색된다.
그냥 silver searcher (ag) 를 사용하는 것이 좋아 보인다.

### wildmenu

`:` 커맨드라인 모드에서 탭으로 검색하여 자동 완성되는 내용들이
상태바의 목록으로 나타난다.

`:set wildmenu` 활성화 한다.<br>
`:set nowildmenu` 비활성화 한다.

### `:[line]pu[t] [x]`

도움말(`:h pu`)에 잘 나와있다.

line에 x 레지스터의 내용을 붙여 넣는다. 레지스터를 생략하면 nunamed(`0`) 레지스터가 결정된다.

`:3pu`는 3번 라인에 무명 레지스터에 저장된 값을 붙여넣는 예시.

