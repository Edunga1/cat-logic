---
created: 2025-06-08
---
# Vim Plugins

주로 사용하는 Vim 플러그인 모음.

## 내장 플러그인(Standard Plugin)

vim에 기본으로 포함된 플러그인. 별도 설치 없이도 기본 제공된다.
그래서 주의가 필요한 경우도 있다!

도움말은 `:h standard-plugin`.

### matchparen

괄호에 대한 매칭을 하이라이트한다. `:h matchparen`.

#### 용량이 큰 파일에서 느려지는 문제

이 플러그인의 문제는 큰 파일에서 매우 느려진다는 점이다.

[유사성 결과 JSON 파일](https://github.com/Edunga1/cat-logic/blob/main/sites/src/related-docs/similarity-result.json)을
열 때와 커서를 이동할 때 멈추는 현상이 초 단위로 소요되었다.

```text
FUNCTIONS SORTED ON TOTAL TIME
count  total (s)   self (s)  function
   28   3.302722   3.302551  <SNR>108_Highlight_Matching_Pair()
```

`108_Highlight_Matching_Pair`가 matchparen의 플러그인 함수로 보이는데, 가장 시간을 많이 소모했다.

```text
count  total (s)   self (s)
                              " Remove any previous match.
   28   0.000272   0.000101   call s:Remove_Matches()
                            
                              " Avoid that we remove the popup menu.
                              " Return when there are no colors (looks like the cursor jumps).
   28              0.000108   if pumvisible() || (&t_Co < 8 && !has("gui_running"))
                                return
   28              0.000009   endif
                            
                              " Get the character under the cursor and check if it's in 'matchpairs'.
   28              0.000078   let c_lnum = line('.')
   28              0.000058   let c_col = col('.')
   28              0.000022   let before = 0
                            
   28              0.002908   let text = getline(c_lnum)
   28              3.297441   let matches = matchlist(text, '\(.\)\=\%'.c_col.'c\(.\=\)')
```

프로파일 세부 사항을 보면 정규식 사용으로 추정되는 `matchlist` 함수가 원인으로 보인다.

커서 이동 중에 괄호를 만나면 하이라이트를 위해 짝이 맞는 괄호를 찾으면서 실행되어 느린것으로 보인다.
괄호가 아닌 문자에서는 느려지지 않는다.

`:NoMatchParen`으로 비활성화할 수 있다.

## 플러그인

플러그인 설치는 vim 디렉토리에 파일을 두어 `runtimepath`에 추가하는 방법을 사용하지만,
일반적으로 플러그인 매니저를 사용한다. 가장 유명한 것으로는 [vim-plug](https://github.com/junegunn/vim-plug)가 있다.

### chrisbra/csv.vim

![csv.vim sample](res/csv-vim-sample.png)

csv 파일의 highlighting, 열과 행에 대한 처리 도구를 제공한다.

newline이 포함되면 큰 따옴표로 묶어서 표현되기도 하는데, 인식 못하는 문제가 있다.

#### Features

`:DeleteColumn 2-4` 2~4열 제거. `:DeleteColumn 2` 2열만 제거

`:%ArrangeColumn` 명령으로 전체 열의 크기 일정하게 맞출 수 있다.
다만, 파일 내용에 공백 추가하여 수정하는 형태이므로 사용에 유의하자.\
Range `%`를 제외하면 현재 라인만 동작한다는데, 커서와 동일한 컬럼에 걸친 모든 곳을 처리하는지 여러개의 컬럼이 수정된다.

### tpope/vim-fugitive

Git wrapper 플러그인. Git을 사용하면 추천한다.
터미널 커맨드로 처리해도 좋지만, vim에서 바로 처리할 수 있어 접근성의 차원이 다르다.

https://github.com/tpope/vim-fugitive

#### `:Git <command>`

`:Git <command>`는 `git <command>`에 대응한다.

예를들어 `Git log`는 `git log`와 같은데, 객체와 상호작용할 수 있다.

커밋 해시에 커서를 두고 `<cr>` 누르면 해당 커밋의 변경 사항을 볼 수 있다. `o`는 분할 창에서, `O`는 새 탭에서 연다.

이렇듯 터미널에서 명령어를 일일이 실행하지 않고, 인터랙티브한 환경에서 동작하여 편리하다.

#### `:Git`

인자 없이 `:Git` 실행하면 현재 git status를 보여준다.

[Git Fugitive how to git add a visually selected chunk of code - stackexchange](https://vi.stackexchange.com/a/28251.md)

여기서 꽤 많은 일을 처리할 수 있는데, `g?` 입력하면 도움말을 볼 수 있다.

파일 경로에서 Enter 누르면 해당 파일의 Buffer를 연다.

원하는 라인만 stage 또는 unstage 하거나, discard 하고 싶다면:
1. 먼저 변경하려는 파일에서 `>` 눌러 변경 사항을 확인
2. 원하는 라인으로 이동해서 visual mode로 선택 후 실행
  * `s`: stage
  * `u`: unstage
  * `X`: discard

unsage 하려면 Staged 목록에서 보여지므로 이동하여 `u` 눌러야 한다.

`:Git` 입력하면 이렇게 표시된다:

```fugitive
Head: main
Merge: origin/main
Help: g?

Unstaged (1)
M docs/wiki/vim.md

Staged (1)
M docs/wiki/vim.md
```

#### `:Git mergetool`

`git mergetool`과 같다. merge conflicts 처리하는 용도로 사용하는데, fugitive는 충돌 지점을 quickfix로 보여준다.

quickfix로 충돌 지점을 점프하고, `GWrite`(`git add`와 같음)로 stage에 반영한다.

### rmagatti/auto-session

https://github.com/rmagatti/auto-session

자동으로 세션을 저장하고 복구해주는 neovim 플러그인.
`vi` 명령어로 인자 없이 열면 최근에 종료한 세션에서 다시 시작한다.
lua 스크립트에서 `require().setup` 해야해서, neovim만 가능할 듯 싶다.

세션 정보는 `stdpath('data')/sessions`에 저장된다.

세션 복구를 원치 않는다면 `vi -`와 같이 사용하자.
또는 복구 후에 `:SessionDelete`로 삭제하고 vim을 종료하면 다음 한 번은 복구하지 않는다.

#### Startify에 세션 목록 표시하기

Startify에서 시작 화면에서 auto-session이 저장한 세션을 보여주도록 연동해서 사용하고 있다.

```vim
function s:sessions()
  let path = stdpath('data').."/sessions/"
  let sessions = systemlist('ls '.path)
  return map(sessions, '{
        \ "line": substitute(v:val, "%", "/", "g"),
        \ "cmd": "SessionRestoreFromFile ".path.v:val
        \ }')
endfunction

let g:startify_lists = [
  \ { 'type': function('s:sessions'), 'header': ['   Sessions'] },
  \ { 'type': 'files',     'header': ['   MRU']            },
  \ { 'type': 'dir',       'header': ['   MRU '. getcwd()] },
  \ { 'type': 'bookmarks', 'header': ['   Bookmarks']      },
  \ { 'type': 'commands',  'header': ['   Commands']       },
  \ ]
```

그러면 Startify 시작화면이 다음과 같이 세션 목록을 보여준다.

```
[e]  <empty buffer>

Sessions

[0]  /home/dupark/dotfiles.vim
[1]  /home/dupark/workspace/cat-logic.vim
[2]  /home/dupark/workspace/game-cosmic-cat-conquest.vim

MRU

[3]  ~/workspace/cat-logic/docs/wiki/vim.md
[4]  ~/workspace/cat-logic/docs/wiki/machine-learning.md
[5]  ~/workspace/cat-logic/docs/wiki/book.md
[6]  ~/dotfiles/vim/.vimrc
[7]  ~/dotfiles/README.md
[8]  ~/dotfiles/vim/vim-include/vim-startify.vim
```

auto-session에서 세션 파일 명에 `%` 포함하고 있어서 이상하게 보이긴 한다.

### NERDTree - 파일 탐색기

Vim 파일 탐색기 플러그인. 디렉토리 구조를 트리로 보여준다. vim에서 인기있는 플러그인 중 하나.

플러그인 이름은 `scrooloose/nerdtree`.

아래는 자주 사용하는 기능.

| 명령어            | 설명                                    | 내 단축키                   |
|-------------------|-----------------------------------------|-----------------------------|
| `:NERDTreeToggle` | 트리 Toggle                             | `<leader>e`                 |
| `:NERDTree`       | 새 NERDTree 열기                        |                             |
| `:NERDTreeFind`   | 현재 파일로 트리 이동                   | `<leader>f`                 |
| `?`               | 도움말 Toggle                           | 아래 부터는 트리 내 Mapping |
| `R`               | 트리 전체 갱신                          |                             |
| `r`               | 커서 아래의 디렉토리 갱신               |                             |
| `CD`              | 트리를 CWD로 복구.                      |                             |
| `cd`              | 커서 아래 디렉토리로 CWD를 변경         |                             |

`CWD`는 `Current Working Directory`의 약자로 현재 작업 디렉토리를 의미한다.

`cd`의 경우 프로젝트 디렉토리를 변경하므로 사용할 일이 드물다.

