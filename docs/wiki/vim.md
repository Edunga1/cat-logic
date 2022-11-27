# 개요

vim 보다 [neovim](https://github.com/neovim/neovim).

My [.vimrc](https://github.com/Edunga1/dotfiles/blob/master/vim/.vimrc)

# quickfix & location list

`:h quickfix` `:h location-list`

파일 지점을 목록화하고 이동한다.
quickfix는 모든 창에서 지점을 공유하고, location list는 현재 창에서만 관리한다.

ref. https://freshman.tech/vim-quickfix-and-location-list/

## commands

* `cnext`: 다음 지점으로.
* `cprevious`: 이전 지점으로.
* `copen`: 목록을 연다.

location-list의 명령어는 prefix `c` -> `l` 바꾸면 대응한다.

## grep

`:h vimgrep` `:grep` `:lgrep`(location-list)

패턴을 검색한다. quickfix를 사용한다.
`vimgrep`을 internal grep, `grep`을 external grep으로 메뉴얼에서 설명한다.

e.g. `:vimgrep /myfunc/ **/*.c`

# variables

## `path`

`:find` 검색 범위를 결정한다.
`:find foo` 파일이나 디렉토리를 검색하고 연다,
<cr> 대신 <tab>으로 모든 결과를 가져오자.

https://youtu.be/GyPXYF6jgwk?t=325
netrw, find 사용법

`set path+=**` `**`를 추가하면 현재 폴더 내 모든 범위를 검색한다.
`**` 사용하기 전과 비교해보면 검색 수가 달라지는 것을 알 수 있다.
`.gitignore`의 무시한 파일, `node_modules` 같이 무거운 폴더도 검색된다.
