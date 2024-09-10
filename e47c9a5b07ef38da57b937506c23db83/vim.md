# Vim

터미널 기반 텍스트 편집기.

[.vimrc](https://github.com/Edunga1/dotfiles/blob/master/vim/.vimrc)는 vim 설정 파일이다.
누구나 같은 설정 파일을 사용한다면 같은 환경을 재현할 수 있다.
vim은 사람마다 다른 형태를 가지면서도 복제하기 쉽다.

---

vim 보다 [neovim](https://github.com/neovim/neovim)을 사용중이다.
neovim은 vim의 fork라 호환성이 유지돼서 바로 넘어가더라도 큰 문제가 없다.
다만 설정을 조금 수정해야 하는데, neovim 메뉴얼 `:h nvim-from-vim`에 잘 설명되어 있다.
vim에서 제공하는 기능은 대부분 neovim에서도 사용할 수 있다. 다만 2023년 11월 기준으로 vim 9.0은 아직인 듯.

[Wikipedia](https://en.wikipedia.org/wiki/Vim_(text_editor)) 배포 내역을 보면,
8.0 이전까지는 배포가 느렸지만, 8.0부터는 모던 에디터들의 추세에 맞춰 팝업 Window와 비동기 I/O 등이 추가되었다.
이전에는 Bram이 대부분 혼자서 개발하느라 느렸던 것으로 알고있다.
[GitHub vim 저장소](https://github.com/vim/vim#sponsoring)를 보면 Bram은 직장에 복귀했다고 한다.
그래서 8.0 이후로는 다양한 사람들이 기여하고 있다.

2023-12-14\
왜 몰랐을까? Bram Moolenaar는 2023년 8월 5일에 생을 마감했다.\
공식 저장소는 그의 의지를 이어받아 우간다의 아이들을 돕기 위해 후원금을 받고있다.\
우간다에 대한 이야기는 `:h uganda`에서 확인할 수 있다.

vim의 가장 큰 특징은 개발자에게 에디터를 맞춰나간다는 점이다.
다른 에디터라면 버전업 될 때마다 설레임이 있겠지만, vim은 그 설레임이 나로부터 시작된다.
불필요한 기능을 제거하는 것이 아니라, 필요한 기능을 추가한다는 점은 vim만의 차별화된 특성이다.

---

vimscript라는 자체 스크립트를 제공하는데, 학습하기 꽤 어려운 언어이다.
[어떤 글](https://www.reddit.com/r/neovim/comments/l1mne8/learning_vimscript_vs_lua/)에서는 정규식에 빗대어, 학습하는 것이 아니라 그냥 사용하는 것이라고 한다:

> Vimscript is like regex, you don't learn it, just use it.

창시자인 Bram Moolenaar의 [23년 인터뷰 중](https://yozm.wishket.com/magazine/detail/2183/)에서 플러그인을 많이 사용하지 않는다고 한다:

> 사실 저는 배포판에 포함된 플러그인(matchit, termdebug 등)을 제외하고는 플러그인 자체를 많이 사용하지 않습니다. 필요한 기능이 있으면 간단한 것은 바로 만들거나 Vim 베이스에 추가하는 편입니다.

---

Vim 자체는 텍스트 편집기일 뿐이기 때문에, IDE처럼 사용하기 위해서는 플러그인이 필요하다.
자세한 사항은 아래의 [내장 Language Server Protocol 사용하기](#내장-language-server-protocol-사용하기)를 참고하자.

## Neovim

Neovim은 vim을 fork하고, vimscript와 더불어 lua도 지원하며, 더 확장된 기능을 제공한다.

https://github.com/neovim/neovim

검색해보면 neovim 커뮤니티에서는 vim에 대한 불만이 많이 보인다. :0\
아무래도 원작자인 Bram의 방향성과 상충되어서가 아닐까. 잘 모르겠다.

neovim으로 이전한 이유는 [LSP](./language-server-protocol.md)를 사용하기 위함이었다.
neovim은 LSP를 자체적으로 제공한다. 바닐라 vim은 [coc.nvim](https://github.com/neoclide/coc.nvim)을 사용해야 한다.
coc.nvim은 자체 플러그인 기능으로 편리하게 다양한 언어 서버를 설치할 수 있어서 편리하지만, neovim 자체 기능 보다는 느리다.
솔직하게 말하면 답답할 정도.

개인적으로는 Lua를 [Ultima Online](./game.md#ultima-online)의 스크립트 언어로 사용한 경험을 비추어 보았을 때,
딱히 생산성이나 편의성이 높지는 않았다. 다만 vimscript 보다는 학습 곡선이 낮다.

vim에서 사용하는 변수, 옵션, 함수를 lua 스크립트에서도 사용할 수 있다.
그래서 `.vimrc` 내용을 lua로 이전할 수 있는데, 나는 그냥 vimscript로 사용중이다.

lua 스크립트로만 초기화할 수 있는 부분이 있다. neovim 전용 플러그인들이다.
neovim에 맞춰진 플러그인은 ~.nvim 이라는 접미사를 붙이는 것이 관례인데,
이런 플러그인들은 lua 스크립트로 include해서 직접 초기화하는 방식을 사용하기도 한다.
[nvim-lsp](https://github.com/neovim/nvim-lspconfig)를 보면 `require'lspconfig'.pyright.setup{}` 처럼 사용한다.
어쨌든 대부분 설정들은 lua나 vimscript 모두 제공하므로 취향껏 사용하면 된다.

vim과 다른점은 `:h vim-differences`에서 확인하자.

### Lua 가이드

https://github.com/nanotee/nvim-lua-guide#modules

* 내 custom lua 파일을 가져올 때 lua/ 내에서 찾는다.
  * runtimepath간 이름 충돌이 발생할 수 있다.

`init.vim` 대신 `init.lua`에서 설정을 명세할 수 있다.

vim 함수를 `:call Foo()`로 호출하는 것처럼, lua 함수도 `:lua Foo()`로 호출할 수 있다.
예를들어 LSP에 설정된 코드 액션 매핑이 있는데:

```lua
vim.keymap.set('n', '<space>ca', vim.lsp.buf.code_action, bufopts)
```

직접 호출하려면 `:lua vim.lsp.buf.code_action()`로 호출한다.

### 내장 Language Server Protocol 사용하기

Noevim은 자체적으로 [Language Server Protocol](./language-server-protocol.md)을 제공한다.

Vim을 IDE처럼 사용하기 위해서는 몇 가지 플러그인이 필요하다.

[.vimrc](https://github.com/Edunga1/dotfiles/blob/master/vim/.vimrc#L28-L33)에 다음 플러그인을 추가한다.

```
Plug 'neovim/nvim-lspconfig'
Plug 'williamboman/mason.nvim'
Plug 'williamboman/mason-lspconfig.nvim'
Plug 'jose-elias-alvarez/null-ls.nvim'
```

각 플러그인의 역할은 다음과 같다:

- [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig): LSP 설정할 수 있다. 이것만 필수사항.
- [mason & mason-lspconfig](https://github.com/williamboman/mason.nvim): language server와 개발 도구를 관리한다. 직접 executable 설치해야 하는 수고를 덜 수 있다.
- [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim): diagnostic, linter, code action을 사용할 수 있게한다. 아쉽게도 23년에 개발 중단되었다. 그러나 여전히 사용할만하다.

lua init 파일에서 다음과 같이 설정한다:

```lua
-- null-ls 설정은 생략
require("mason").setup()
require("mason-lspconfig").setup()
require'lspconfig'.tsserver.setup{}
```

Language Server를 설치한다: `:MasonInstall typescript-language-server`\
`:Mason` 명령으로 대화형 UI를 통해 목록을 확인하고 설치할 수 있다.

![mason example](res/nvim-mason-example.png)

이제 설치한 language server가 지원하는 파일을 열면 자동으로 LSP가 활성화된다.\
`:LspInfo`로 현재 활성화된 LSP 목록을 확인할 수 있다.

---

* [nvim-lspconfig/server_configurations.md](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md)에서 설정 가능한 language server 목록을 확인할 수 있다.
* [null-js/BUILTIN_CONFIG](https://github.com/jose-elias-alvarez/null-ls.nvim/blob/main/doc/BUILTIN_CONFIG.md) 제공하는 lsp 도구 목록

## 도움말 `:help`

vim 도움말. 명령어, 함수, 변수 등 키워드로 도움말을 제공한다.
기능이 많으므로 도움말을 보는 방법은 필수적으로 알아둬야 한다.

`:h help`는 도움말에 대한 도움말이다.
도움말 창이 뜨면 노말 모드처럼 탐색하면 된다.

설치한 플러그인의 도움말도 여기서 제공하므로 같은 경험을 준다.

`:h KEYWORD`와 같이 사용한다.
키워드 전체를 입력하지 않아도 된다.
키워드 일부만 입력해도 가장 근접한 키워드를 찾는다.
예를들어 `:h usr_12.txt` 대신 `:h 12.txt`만 입력해도 된다.

### 도움말 탐색하기

도움말은 다른 도움말에 대한 링크를 포함한다.

링크는 색상이 강조되어 표기된다.
키워드에 커서를 위치시키고 `CTRL-]`를 누르면 해당 섹션으로 이동한다.

일반 텍스트도 `CTRL-]`로 이동할 수 있는데,
`CTRL-]`의 기능은 단순히 키워드의 정의를 찾는 기능이기 때문이다.

### 명령어 조합에 관한 팁

`:h usr_12.txt`는 유용한 명령어 조합에 대한 팁이 담긴 메뉴얼이다.

`:h 12.4`는 모든 줄을 역정렬하는 방법을 설명한다.

`:global/^/move 0`로 전체 줄을 역정렬할 수 있다. `move 0`가 이동할 줄 번호를 의미하므로, `move 10`이면 10번째 아래의 모든 줄만 역정렬한다.

## 내 사용 사례

### 파일 검색

[fzf.vim](https://github.com/junegunn/fzf.vim)이 제공하는 기능 몇가지를 사용한다.

1. ctrl + p

```vim
nnoremap <expr> <C-p> (len(system('git rev-parse')) ? ':Files' : ':GFiles --exclude-standard --others --cached')."\<cr>"
```

이 방법은 별도 검색창이 출력되고, interactive하게 파일 이름을 검색한다.

2. `:Rg` or `:Ag`

각각 [ripgrep](https://github.com/BurntSushi/ripgrep), [the_silver_searcher를](https://github.com/ggreer/the_silver_searcher) 사용한다.
따라서 각 도구 설치가 필요하다.

보통 `:Rg wiki`와 같은 방법으로 명령어를 통해서 1차 검색하고 검색창에서 추가 필터링한다.
이 방법은 파일 내용도 함께 검색한다.

두 도구 차이점은 모르겠다. 검색 결과는 조금 다르다.

## 내장 기능

### quickfix & location list

`:h quickfix` `:h location-list`

파일 위치를 목록으로 관리한다.
quickfix는 모든 창에서, location-list는 현재 창에서만 유지한다는 점이 다르다.

ref. https://freshman.tech/vim-quickfix-and-location-list/

목록에 나타난 코드를 한꺼번에 수정할 수 있는데, 동시에 여러 파일을 수정하는 용도로 사용한다.

#### commands

* `cnext`: 다음 지점으로.
* `cprevious`: 이전 지점으로.
* `copen`: 목록을 연다.

location-list의 명령어는 prefix `c` -> `l` 바꾸면 대응한다.

#### grep

e.g. `:vimgrep /myfunc/ **/*.c`

`:h vimgrep` `:grep` `:lgrep`(location-list)

패턴을 검색하고 결과를 quickfix 목록으로 만든다.

#### `cdo`, `ldo` 검색된 모든 entry에 명령어 적용

`cdo s/foo/bar` `ldo s/foo/bar`

quickfix, location-list 검색 결과에 명령어를 적용한다.

grep으로 검색하고, cdo로 적용, 예시:
1. `:vimgrep foo **/*.md` 모든 `md` 파일에서 `foo` 검색한다.
2. `:copen` 검색 결과 확인하고.
3. `cdo s/foo/bar` 검색 결과에서 `foo` -> `bar` 대체한다.

`:cdo s/foo/bar | update`

`| update`를 사용하면 수정과 함께 저장한다.

#### `cfdo`, `lfdo` 검색된 모든 파일에 명령어 적용

`:cfdo %s/foo/bar` or `:ldo %s/foo/bar`

`cdo`와 차이점은 파일 모든 내용에 대해서 적용한다는 점이 다르다. 검색 목록에서 보이지 않는 라인도 적용되니 주의.

#### `bufdo` 모든 buffer 파일에 명령어 적용

`:bufdo %s/foo/bar`

모든 buffer에 대해서 적용하므로 `:buffers`등 명령어로 적용 대상을 잘 확인하자.

#### User Function

사용자 함수에 대한 메뉴얼은 `:help userfunc`에서 설명한다.

```vim
function! MyFunction() abort
  echo "Hello World!"
endfunction
```

위 함수는 `:call MyFunction()`으로 호출할 수 있다.

`function!`의 `!`는 함수가 이미 존재하면 덮어쓴다는 의미다.
`function`은 함수가 이미 존재하면 에러가 발생한다.
`:help E122`에서 설명한다.

`abort`는 에러가 발생하면 함수를 거기서 종료한다. `:help func-abort`에서 설명한다.

---

```vim
function s:MyFunction()
  echo "Hello World!"
endfunction
```

`s:`를 붙이면 local function이 된다.
함수는 정의된 스크립트에서만 호출할 수 있다. 즉, `call MyFunction()`로 호출할 수 없다.
vim은 많은 플러그인을 통해 함수가 정의되어 이름 충돌할 수 있으므로 local function을 사용하는 것이 좋다.

### Fuzzy 매칭: `matchfuzzy()`

`:h matchfuzzy()`

```vim
:echo matchfuzzy(['red apple', 'yello banana'], 'ra')  " ['red apple']
```

dictionary를 검색할 수도 있다:

```vim
let s:lst = [
  \ {'name': 'john', 'age': 20},
  \ {'name': 'jane', 'age': 30},
  \ {'name': 'joe', 'age': 40},
  \ {'name': 'jill', 'age': 50},
  \]

echo s:lst->matchfuzzy('je', {'key': 'name'})
" [{'age': 40, 'name': 'joe'}, {'age': 30, 'name': 'jane'}]
```

fuzzy search하는 함수.

### `:make` and `makeprg`

`:make` 명령은 `makeprg`에 설정한 것을 실행한다.
출력이 quickfix 양식이면 quckfix과 연동할 수 있다!

#### build integration - How to Do 90% of What Plugins Do

https://youtu.be/XA2WjJbmmoM?t=3062

영상 52분의 build integration 주제에서 설명한다.
vim 내에서 테스트를 실행하고, 실패한 테스트가 있으면 quickfix를 통해 실패 지점으로 네비게이션할 수 있다.

영상 일련 과정:

1. `makeprg` 설정한다.: `set makeprg=bundle\ exec\ rspec\ -f\ QuckfixFormatter`
2. `:make` 명령으로 `rspec` 테스트 실행한다.
3. 테스트 실패한 지점을 quickfix로 보여준다.

`rspec`명령에 `--format QuckfixFormatter` 옵션으로 quickfix에서 사용할 수 있는 양식으로 출력된다.

![rspec formatter](res/rspec-formatter.png)

다만 기본 제공되는 것은 아니고, 플러그인 같아 보인다. 문서에는 `QuickfixFormatter`에 대한 내용이 없다.

ref. python traceback을 quickfix와 연동할 수 없냐는 질문: [Quickfix support for Python tracebacks](https://vi.stackexchange.com/questions/5110/quickfix-support-for-python-tracebacks)

### matchit

`:h matchit`

`%`로 짝에 맞는 문자열로 커서를 이동한다.

괄호의 경우 `{`에서 사용하면 반대편 `}`으로 이동한다.
HTML 태그의 경우 `<div>`에서 사용하면 `</div>`로 이동한다.
그 외 xml, latex 등 다양한 언어를 지원한다고 한다.

이전에는 없었던 기능인가 보다.
[matchit.zip](https://github.com/vim-scripts/matchit.zip/)이라는 플러그인으로 제공되기도 했다.
내 경우 다른 사람이 사용하던 `.vimrc`로 시작했는데, matchit.zip이 포함되어 있었다.

### 터미널 에뮬레이터

vim에서 터미널을 실행할 수 있다. `:terminal` 명령어로 실행하면 `Terminal-mode`로 전환한다.

`:h terminal`

터미널 모드의 매핑은 `tmap`으로 설정한다. `:h mapmode-t`.

다른 모드와 달리 커서가 동작하지 않고, 키 입력이 터미널로 전달되는데, `CTRL-\ CTRL-N`으로 normal 모드로 전환할 수 있다.
이건 터미널 모드 뿐만 아니라 아무 모드에서나 normal 모드로 전환하는 단축키다. `:h t_CTRL-\_CTRL-N`.

나는 불편해서 `<leader>esc`로 normal 모드로 전환하는 매핑을 추가했다.

```vim
tnoremap <leader><esc> <c-\><c-n>
```

터미널 모드에서만 동작하게 `tnoremap`으로 설정했다.

---

`:terminal ls`와 같이 시작 명령어를 지정할 수 있다.\
나는 markdown 파일 작업 중 `:terminal mdcat %`으로 현재 파일의 preview 보는 용도로 사용한다.\
[mdcat](https://github.com/swsnr/mdcat)은 markdown용 cat이다.

### 자동 서식: `formatoptions`

vim으로 커밋 메시지를 작성할 때, 자동으로 줄바꿈 되는 것을 경험했다면 이 옵션이 사용된 것이다.(아마도 vim 기본 설정으로 보인다.)

- `:h formatoptions`
- `:h fo-tables`

`formatoptions`는 어떤 자동 서식을 적용할 지 옵션을 가지고있다. `:set formatoptions?`로 확인하자.

Git 커밋메시지의 파일 타입은 `ft=gitcommit`이며, 옵션을 확인해보면 `formatoptions=jtln`이다.\
이 중 `t`가 자동 줄바꿈 한다고 `:h fo-tables`에서 설명한다. `textwidth` 옵션 만큼 길어지면 자동 줄바꿈한다.\
비활성화는 `t` 옵션을 제거하거나(`set formatoptions-=t`) `textwidth`를 0으로 설정하면 된다(`set textwidth=0`).

## 구문 강조

`:h syntax`

`syntax on`으로 구문 강조를 활성화한다. vim은 기본적으로 언어별 문법 강조를 제공한다.\
그 목록은 메뉴얼에서 확인할 수 있다. `ft-<LANGUAGE>-syntax` 이름으로 언어별 메뉴얼이 제공된다.\
예를들어 `:h ft-python-syntax`로 파이썬 문법 강조에 대한 메뉴얼을 확인할 수 있다.

neovim은 [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) 플러그인으로 언어별 요소를 분석하여 더 정교하게 구문을 분석한다.
**하지만 기본 `colorscheme`으로는 정교한 구문 강조를 지원하지 않는다**.\
[tresitter wiki의 gallery](https://github.com/nvim-treesitter/nvim-treesitter/wiki/Gallery)에서 treesitter를 지원하는 `colorscheme`을 설치하자.

## 레지스터(Registers)

레지스터는 텍스트를 저장하는 공간이다.

`:h registers`

레지스터는 크게 두 가지로 구분할 수 있다.
사용자가 직접 사용하는 레지스터와 vim이 제공하는 읽기 전용 레지스터다.

사용자 레지스터는 원하는 텍스트를 저장하고, 읽는 용도로 사용한다.
`"ayy`로 현재 라인을 `a` 레지스터에 저장하고, `"ap`로 붙여넣기한다.

직접 사용하는 방식 외에도 매크로의 녹화와 재생 또한 레지스터를 사용한다.
응용하면 텍스트로 명령어를 저장하고, 매크로로 실행할 수 있다.

vim이 제공하는 읽기 전용 레지스터는 클립보드, 마지막 삭제된 텍스트 등 다양한 트리거에 의해 저장된다.
자주 사용하는 특수 레지스터는 알아두면 좋다.

1. `+` 클립보드 레지스터. 정확히는 selection register. 클립보드가 활성되지 않으면 unnamed register와 같다.
2. `"` unnamed register. d, c, s, x 등으로 삭제된 내용이 저장된다.
3. `_` black hole register. 읽는 용도로 사용하지 않는다. 덮어쓸 때 삭제된 내용을 저장하지 않는 용도로 쓴다.
    * e.g. `"_dd` 현재 라인을 삭제하지만 unnamed register에 저장하지 않는다.

`let @`을 사용하면 직접 register에 값을 할당할 수 있다.
예를들어, `+` register에 클립보드를 연결했다면, 다음은 클립보드에 현재 파일 경로를 복사한다.

```vim
:let @+=expand('%')
```

## Variables

### `path`

`:find` 검색 범위를 결정한다.
`:find foo` 파일이나 디렉토리를 검색하고 연다,
<cr> 대신 <tab>으로 모든 결과를 가져오자.

https://youtu.be/GyPXYF6jgwk?t=325
netrw, find 사용법

`set path+=**` `**`를 추가하면 현재 폴더 내 모든 범위를 검색한다.
`**` 사용하기 전과 비교해보면 검색 수가 달라지는 것을 알 수 있다.
`.gitignore`의 무시한 파일, `node_modules` 같이 무거운 폴더도 검색된다.

## Text Objects

텍스트 오브젝트는 vim에서 선택 및 조작할 수 있는 텍스트 단위를 말한다.

`:h text-objects`

`w`는 단어, `s`는 문장, `p`는 문단 등이 있다.
선택하는 명령어와 조합하여 `viw`, `vis`, `vip`와 같이 사용할 수 있다.
각각 단어, 문장, 문단을 선택한다.

`w`는 문자와 숫자, underscore로 이루어진 문자열을 말한다.
`W`는 공백을 제외한 연속되는 문자열을 말한다. (`:h word`, `:h WORD` 참고)

`s`entence는 마침표, 느낌표, 물음표로 끝나는 문장을 말한다.
`p`aragraph는 빈 줄로 구분된 문단을 말한다.

`t`는 tag를 말한다(`:tag-blocks`).
HTML 또는 XML 태그를 선택한다.

몇 가지 텍스트 오브젝트만 알아두면 빠르게 텍스트를 편집하거나 네비게이션할 수 있다.
또 플러그인을 통해 사용자 정의 텍스트 오브젝트를 만들 수 있다.

[nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects)는
언어마다 표현 방식이 다른 함수, 변수, 클래스 등 다양한 텍스트 오브젝트를 일반화하여 제공하는 플러그인이다.

## Plugin 만들기

`:h write-plugin` nvim의 사용자 메뉴얼 플러그인 작성 섹션.

### 프로젝트 구조

```bash
.
│   # 폴더 내의 모든 파일을 자동으로 로드한다.
├── autoload
│   └── vimwiki_link
│       └── base.vim
│   # 파일 타입에 따라 자동으로 로드한다.
└── ftplugin
    │   # `vimwiki/script.vim`과 `vimwiki.vim` 파일 모두
    │   # vimwiki 파일 타입인 버퍼를 열면 자동으로 로드한다.
    ├── vimwiki
    │   └── script.vim
    └── vimwiki.vim
```

### `autoload`

`:h autoload`

`autoload/vimwiki_link/base.vim` 파일이 있으면 `vimwiki_link#base#Function()` 함수 이름으로 정의한다.

```vim
# autoload/vimwiki_link/base.vim
function! vimwiki_link#base#follow_link() abort
  # ...
endfunction
```

폴더 및 파일 이름이 네임스페이스가 된다. 만약 다른 네임스페이스로 선언하면 에러가 발생한다.

### `ftplugin`

- `:h ftplugin`
- `:h ftplugin-name`

`ftplugin/` 디렉토리 아래에 `filetype.vim` 파일 타입을 이름으로 만들면, 파일 타입에 따라 자동 로드된다.
디렉토리나 파일 이름의 prefix로 파일 타입을 지정해도 된다:

> The generic names for the filetype plugins are:
>
> 	ftplugin/<filetype>.vim
> 	ftplugin/<filetype>_<name>.vim
> 	ftplugin/<filetype>/<name>.vim

```vim
" ftplugin/vimwiki.vim
command! -buffer VimwikiSmartLink call vimwiki_link#base#follow_link()

nnoremap <silent><script><buffer> <Plug>VimwikiSmartLink :VimwikiSmartLink<CR>
nnoremap <CR><CR> <Plug>VimwikiSmartLink
```

보통 파일 타입에 맞는 명령어를 정의하거나 매핑을 생성하고
`autoload`의 함수를 호출하는 구조로 많이 사용하는 거 같다.

nvim이라면 `~/.config/nvim/ftplugin` 디렉토리에 파일을 만들면 된다.

### `<Plug>` `<SID>`

`:h using-<Plug>`

> Both <SID> and <Plug> are used to avoid that mappings of typed keys interfere
> with mappings that are only to be used from other mappings.

매핑할 때 사용하는 특수 키 이름이다. 매핑 충돌을 피하기 위한 대책이다.
이 특수 키로 먼저 매핑하고, 실제 키에 매핑한다.

예를들어 vimwiki에는 다음과 같은 코드가 있다:

```vim
nnoremap <silent><script><buffer> <Plug>VimwikiFollowLink :VimwikiFollowLink<CR>

" ... 중간 생략

" map_key는 최종적으로 :map 같은 명령어를 실행한다.
call vimwiki#u#map_key('n', '<CR>', '<Plug>VimwikiFollowLink')
```

## Plugins

사용중인 플러그인.

### 내장 플러그인(Standard Plugin)

vim에 기본으로 포함된 플러그인. 별도 설치 없이도 기본 제공된다.
그래서 주의가 필요한 경우도 있다!

도움말은 `:h standard-plugin`.

#### matchparen

괄호에 대한 매칭을 하이라이트한다. `:h matchparen`.

##### 용량이 큰 파일에서 느려지는 문제

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

`:NoMatchParen`으로 비활성화할 수 있다. 이제 괄호를 만나더라도 기능이 꺼져있어 속도 저하는 없다.

---

파일 열거나 닫을 때 느린 문제는 아직 처리하지 못했다.
`:LspStop`, `:TSDisable` 사용하면 빠르게 닫히는 것은 확인해서, 자연스럽게 처리하는 방법을 찾고 있다.

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

## 용어

### pager: `-- More --`로 출력되는 화면

`-- More --`로 프롬프트가 출력되면 pager 화면을 보고있는 것이다.

`:let`이나 `:highlight` 등 명령어는 pager로 출력된다:

```vim
Special        xxx ctermfg=224 guifg=Orange
SpecialChar    xxx links to Special
Delimiter      xxx links to Special
SpecialComment xxx links to Special
Debug          xxx links to Special
DiagnosticError xxx ctermfg=1 guifg=Red
DiagnosticWarn xxx ctermfg=3 guifg=Orange
DiagnosticInfo xxx ctermfg=4 guifg=LightBlue
DiagnosticHint xxx ctermfg=7 guifg=LightGrey
-- More -- SPACE/d/j: screen/page/line down, b/u/k: up, q: quit
```

`:h pager`로 pager 설명을 확인하자.

pager는 다른 화면과 달라서 처음 만나면 당혹스럽다.\
`q`를 입력하면 빠져나오고 j, k로 스크롤한다.

`g<`를 입력하면 마지막 *page* 화면을 볼 수 있다.
pager 화면은 아니므로 스크롤 할 수 없다. 마지막 pager의 스크롤 위치에서 보여준다.

---

검색 기능이 없어서 불편하다 :(

하지만 `:redir`을 통한 출력 전환으로 레지스터로 저장하고, 붙여넣는 방법으로 대체할 수 있다.

```vim
:redir @a    " a 레지스터에 출력을 전환
:highlight   " pager로 출력되는 명령어 실행
G<CR>        " 맨 아래로 이동하고 빠져나오자. 보여진 만큼만 저장된다.
:redir end   " 출력 전환 종료
"ap          " a 레지스터 내용 커서 위치에 붙여넣기
```

[How can I perform a search when vim displays content using "more" pager?](https://vi.stackexchange.com/q/5729)\
질문에서 얻은 정보다.

덧글에 pipeline을 통한 짧은 버전도 있다:

```vim
redir @a | sil highlight | redir end   " @a 전환, 명령(silently), 전환 종료
"ap                                    " a 레지스터 붙여넣기
```

명령어로 만들어둬도 좋겠다:

```vim
command! -nargs=1 -complete=command Redir redir @a | sil <args> | redir end | echo "Saved to @a"
```

이렇게 사용할 수 있다:

- `:Redir highlight`
- `:Redir let`

## Tips

### mapping 시 `:...<cr>` vs `<cmd>...<cr>`

* `nnoremap [w :lprevious<cr>`
* `nnoremap [w <cmd>lprevious<cr>`

두 코드 모두 `[w` 단축키에 `lprevious<cr>` 명령을 매핑한다.

`:h <cmd>`
> The <Cmd> pseudokey begins a "command mapping", which executes the command
> directly (without changing modes).  Where you might use ":...<CR>" in the
> {rhs} of a mapping, you can instead use "<Cmd>...<CR>".

`<cmd>`는 모드 변경없이 명령을 실행한다고 되어있다.

두 방식을 비교해보면, `:...<cr>`는 실행한 명령어가 입력창에 남아있다.
반면에 `<cmd>...<cr>`는 남아있지 않다.

### 프로파일링 하기

이유없이 느려진다면 프로파일링 해보자.

아래 함수 내용을 직접 실행하거나, 번거로우니 함수 자체를 정의해두고 `:call StartProfiling()` 호출하자.
느려지게 만드는 액션을 하고 `:profile stop` 또는 vim에서 나가면, `vim-profiling.log` 파일이 생성된다.

```vim
function! StartProfiling()
  :profile start vim-profiling.log
  :profile file *
  :profile func *
  echo 'profiling is started. log file: vim-profiling.log'
endfunction
```

### text object 개선하기

vim에서 기본적으로 `viw`로 단어를, `vip`로 문단을 선택할 수 있다.
더 나아가서 각 언어에 맞게 함수, 클래스를 선택할 수 있는 방법이 있다.

[Python](./python.md)은 들여쓰기로, [Javscript](./javascript.md)는 중괄호로 함수를 표현한다.
이렇게 언어마다 달라지는 부분을 표현하기 위해서 저마다 설정이 필요하다.

파이썬에 맞는 text object를 제공하거나,
Selection을 점진적으로 확장/축소하는 기능을 제공하는 플러그인이 있다.

#### vim-pythonsense

[vim-pythonsense](https://github.com/jeetsukumaran/vim-pythonsense)

[vim-textobj-python](https://github.com/bps/vim-textobj-python) 이건 제대로 동작하지 않았다.

**vim-pythonsense** 플러그인은 파이썬의 Text Object를 제공한다.
뿐만 아니라 Text Object로 점프하는 기능도 제공하는데,
나는 이 기능은 막았다.

설정을 통해 키 매핑을 비활성화 할 수 있다:

```vim
let g:is_pythonsense_suppress_motion_keymaps = 0
let g:is_pythonsense_suppress_keymaps = 0
let g:is_pythonsense_alternate_motion_keymaps = 0
```

#### vim-expand-region

[terryma/vim-expand-region](https://github.com/terryma/vim-expand-region)

Expand Selection, Shrink Selection 기능을 제공하는 플러그인.

VSCode, Intellij 에서도 이 기능이 있다.

`+` 키를 누르면 단어 -> 문자열 -> 괄호 -> 한 줄 -> 함수 -> 클래스 순서로
점진적으로 Selection 한다. `-` 키는 그 반대로 동작한다.

`vim-textobj-python` 플러그인이 없으면, 함수, 클래스 레벨에서 제대로 동작하지 않는다.

별다른 설정을 하지 않으면, 첫 레벨부터 렉이 있어서,
다음과 같이 설정하여 사용하고 있다:

```vim
call expand_region#custom_text_objects('python', {
  \ 'af' :1,
  \ 'if' :1,
  \ 'ac' :1,
  \ 'ic' :1,
  \ })
```

### `command` 대신 `command!`를 사용하자.

`.vimrc`를 리로드하면 이미 정의된 command라고 에러가 나는 경우가 있다:

```bash
Error detected while processing /home/pair/.vimrc:
line  375:
E174: Command already exists: add ! to replace it
```

해결하기 위해선 힌트 그대로, `!` 만 붙여주면 된다. 그러면 replace 하므로 에러가 발생하지 않는다.

다음과 같은 구문이 있으면

```bash
command TestCore call <SID>run_test_core()
```

다음과 같이 변경해주면 된다.

```bash
command! TestCore call <SID>run_test_core()
```

### 옵션이 어느 파일에서 변경되었는지 알려면 `:verbose`

`:verbose set filetype?`

파일 타입을 어느 파일에서 결정했는지 알려면 위처럼 사용하면 된다.

뒤에 물음표는 꼭 붙이자. `filetype`처럼 값을 받는 옵션이 아닌 `hlsearch`처럼 on/off 하는 형태라면 `verbose`가 무시되고 옵션 변경을 한다.
다시 `verbose`로 확인하더라도 방금 명령어로 변경했기 때문에 제대로된 출처를 알 수 없다.

### 플러그인 설치되어 있는지 확인하기

특정 플러그인을 설정하기 위해서, 설치되어 있는지 확인해야 할 때가 있다.\
설치 여부를 판단하지 않으면 vim 실행 시 에러 문구가 출력되어 번거롭다.

vim 기능으로는 제공하지 않는다.

Package Manager로 [vim-plug](https://github.com/junegunn/vim-plug)를 사용한다면 `plugs` 변수를 확인하는 방법이 유효하다.

```vim
if !has_key(plugs, 'sonokai')
  " 'sonokai' not installed
  finish
endif

" do something with 'sonokai'
```

`plugs`는 dictionary로 플러그인 이름을 key로 가지고 있다:

```vim
" echo plugs로 구조를 확인할 수 있다.
{'sonokai': {'uri': 'https://git::@github.com/sainnhe/sonokai.git', 'dir': '/home/dupark/.local/share/nvim/plugged/sonokai/', 'frozen': 0, 'branch': ''}}
```

## 문제 해결

### Typescript filetype 문제

typescript language server에서 JSX 문법을 확인하지 못한다면 파일 타입을 확인해보자.
`:set ft?`로 확인했을 때 `typescriptreact`가 아니라 `typescript`면 문제가 있다.

`:set filetype=typescriptreact`로 변경하면 JSX의 하이라이팅이나 타입 체크가 정상적으로 동작한다.

`.vimrc`에 filetype을 변경하도록 설정하자:
```vim
" set filetypes as typescriptreact
autocmd BufNewFile,BufRead *.tsx,*.jsx set filetype=typescriptreact
```

ref. https://github.com/peitalin/vim-jsx-typescript#vim-jsx-typescript
> Changelog: filetypes were updated from typescript.tsx to typescriptreact Please set filetypes as typescriptreact, not typescript.tsx as in prior versions in your .vimrc if you have any issues

ref. https://github.com/leafgarland/typescript-vim/issues/158#issuecomment-589954199
> This brings a new problem. Typescript language server excepts from a typescript file to not have JSX in it. Which means that <> is considered a type assertion, JSX is not recognized as JSX but as regular Typescript syntax and the list goes on.

### colorscheme 플러그인이 점점 느려지게 만드는 현상

2023-04-14

vimwiki로 문서 수정할 때, `<cr>` *엔터를 꾹 누르고 있으면 점점 느려지는* 문제.\
vimwiki가 키보드 엔터 시 함수 호출이 많다. 그래서 더욱 돋보이는 듯 하다.

```
FUNCTIONS SORTED ON TOTAL TIME
count  total (s)   self (s)  function
    4   1.671452   0.000150  <SNR>199_CR()
    4   1.669305   0.000430  vimwiki#lst#kbd_cr()
    4   1.667958   0.000952  <SNR>211_cr_on_empty_line()
    1   0.261215   0.000028  vimwiki#u#count_exe()
    1   0.261187   0.000350  vimwiki#lst#kbd_o()
    5   0.093622   0.009607  <SNR>211_get_corresponding_item()
   16   0.087560   0.002484  airline#check_mode()
```

프로파일링 해보니, 엔터가 입력될 때 마다 거의 초단위로 시간이 소요되었다.

결론은 colorscheme 옵션을 제거하면 괜찮다. 프로파일링으로는 딱히 힌트를 얻지 못했다.
`soliarized`로 사용하고 있었다:

```vim
colorscheme solarized
```

플러그인을 하나씩 제외하면서 테스트하는 것으로 원인을 찾을 수 있었다.
기본 테마도 나름 볼만하다 :|

`:echo g:colors_name`로 현재 colorscheme을 알 수 있다. 변수를 찾을 수 없으면 사용하지 않는 것.

colorscheme을 제외하고 재현하면 간헐적으로 느려지긴 한다. 하지만 곧바로 복구된다. colorscheme을 사용할 때는 한 번 느려지면 다시 vim 실행하기 전까지는 복구되지 않는다.

2023-12-11

`vim-colors-solarized` 플러그인 문제가 아니었다.

최근에 treesitter 구문 강조를 위해서 `sonokai` colorscheme 플러그인을 설치했는데, 마찬가지로 느려지는 문제가 발생한다.

2024-02-22

드디어 원인을 찾았다!

정확한 증상 발생 시점은 `.vimrc`에서 `color <theme>`을 설정하면 느려지는 문제였다.\
vim 실행 후 직접 `:color <theme>` 명령어로 설정하면 느려지지 않는다.\
`.virmc` 내에서도 특정 코드 후에 `color <theme>`을 설정하면 느려지는 문제가 발생한다.

원인이 되는 코드는 extra whitespace를 강조하는 코드였다:

```vim
autocmd ColorScheme *
  \ highlight SpecialKey guibg=#424242 ctermfg=236 ctermbg=234 |
  \ highlight ExtraWhitespace ctermbg=red guibg=red |
  \ match ExtraWhitespace /\s\+$/ |
  \ autocmd BufWinEnter * match ExtraWhitespace /\s\+$/ |
  \ autocmd InsertEnter * match ExtraWhitespace /\s\+\%#\@<!$/ |
  \ autocmd InsertLeave * match ExtraWhitespace /\s\+$/ |
  \ autocmd BufWinLeave * call clearmatches()
```

이 코드는 줄 끝에 불필요한 공백을 찾아서 강조한다.
내가 처음 vim을 접할 때 전임자의 vim 설정에서 가져온 건데 유용하게 사용하고 있는 거다.
하지만 이 코드 이후에 `color <theme>`을 설정하면 느려지는 문제가 발생한다.

colorscheme 명령을 전체 설정의 앞부분에서 실행하도록 위치를 옮겼다.\
dotfiles 저장소에도 반영했다: https://github.com/Edunga1/dotfiles/commit/bc4efcceab5695b671c68d14912f1d85e7b0e048

### Ubuntu에 설치한 vim이 시작 시 `.vimrc`에서 많은 에러가 발생하는 현상

askubuntu 질문: [vi, getting multiple "Sorry, the command is not available in this version..." after reinstall](https://askubuntu.com/questions/284957/vi-getting-multiple-sorry-the-command-is-not-available-in-this-version-af)

올바른 vim 버전인지 확인하자. vim.tiny로 설치되었을 수 있다:
```bash
$ readlink -f `which vim`
/usr/bin/vim.tiny
```

ubuntu에서는 풀 버전의 vim을 설치하지 않는다고 한다. `/usr/bin/vim.basic`을 가르켜야 한다.
최근에는 neovim을 사용하고 있어서 이 편이 더 좋을지도.

## 관련 기사

2023년 8월. "Vim은 제 인생에서 매우 중요한 부분입니다” Vim 창시자 인터뷰\
https://yozm.wishket.com/magazine/detail/2183/

외부 플러그인을 사용하기 보다는, 직접 구현하거나 vim 베이스에 포함한다는 이야기.
협업자들과 커뮤니케이션하는 방식. 그리고 젊은 개발자들에게 여유를 가지고 개발하라는 조언을 했다.
