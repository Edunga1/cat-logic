---
created: 2022-12-31
---
# Vimwiki

vim 기반 개인 위키 플러그인.

https://github.com/vimwiki/vimwiki

vimwiki는 문서를 작성하는 플랫폼으로써 사용한다.\
vimwiki와 관계없이 문서를 마크다운으로 작성하면,
vimwiki로 문서의 링크를 걸거나(markdown [LSP](./language-server-protocol.md)를 사용하기도 한다.) 이동한다.\
작업 중에는 기억나지 않는 것들을 `VWS`로 검색한다.

그래서 [cat-logic](./cat-logic.md)은 vimwiki, [gatsbyjs](./gatsbyjs.md), [markdown](./markdown.md)등 여러 플랫폼이 엮여있다.

## 자주 사용하는 기능

* `<leader>ww` wiki index 열기
* `<enter>` 문서 열기
* `<backspace>` 이전 문서로 돌아가기
* `:VWB` 현재 문서를 참조하는 모든 문서 검색 (location-list)
* `:VWS` 모든 문서 패턴 검색 (location-list). `VimwikiSearch`의 약자
    * 보통 다른 작업 영역에서 `<leader>ww`로 wiki index를 열고, `:VWS`로 검색하는 방식으로 사용한다.\
      다른 작업 영역에서는 `:VWS`가 동작하지 않기 때문에 index로 먼저 이동한다.
* `vah`로 현재 헤더, `vaH`로 하위 헤더까지 선택한다. `h`는 header를 선택하는 text object selector다.

## FileType

vimwiki 경로의 markdown 파일은 `.md` 확장자를 가지더라도 `vimwiki` 파일타입을 가진다(`set ft?`).
그래서 다른 경로의 마크다운 파일과 비교할 때 미묘하게 구문 강조가 다르거나 기능이 달라서 혼란스러울 수 있다.

`g:vimwiki_filetypes` 옵션으로 filetype을 수정할 수는 있으나 `vimwiki`, `markdown` 모두 가진다:
```vim
let g:vimwiki_filetypes = ['markdown']
```

지금은 큰 불편함이 없어서 그대로 사용하고 있지만,
마크다운 파일 타입을 사용하면 여러 플러그인에서 제공하는 광범위한 기능을 제공받을 수 있게된다.
예를들어, [Tagbar](https://github.com/preservim/tagbar)로 마크다운 문서 레이아웃을 확인할 수도 있다.

모든 마크다운 플러그인을 사용할 수 없는 것은 아니다.
[vim-markdown](https://github.com/preservim/vim-markdown)의 `:Toc`는 동작해서 마크다운 문서의 레이아웃을 볼 수 있다.

어쨋든 구문 강조나 vimwiki 외 플러그인과 통합되지 않는 부분과, vimwiki에서 자체 제공하는 여러 기능도 있을테니 선택에 고민이 되는 부분이다.
내용은 구문에 대한 것이지만 관련 논의도 vimwiki 이슈란에 등록되어 있다: https://github.com/vimwiki/vimwiki/issues/364
추천을 가장 많이 받은 덧글은 마크다운 파일 타입을 더 선호한다는 내용.

이 내용은 `<cr>`로 생성되는 Wiki Link `[[link]]`와 관련된 내용은 아니다.
링크는 `syntax` 옵션으로 마크다운 링크 `./some.md`로 생성되도록 설정할 수 있다:

```vim
let g:vimwiki_list = [
    \{
    \   'path': '~/workspace/cat-logic/docs/wiki',
    \   'syntax': 'markdown',
    \   'ext' : '.md',
    \   'diary_rel_path': '.',
    \}
\]
```

## 버그

### 강조체, 기울임체가 전체 글자에 적용되는 문제

한국어는 단어에 조사를 붙여쓰면서 어절이 된다:

```
**동해물.**과 백두산이
```

`ft=vimwiki`에서 위처럼 작성하면 `**` 이후 모든 글자가 볼드가 된다.
vim에서만 이상하게 보이지만, syntax highlighting이 망가져서 여간 불편한게 아니다.

`ft=markdown`에서는 괜찮다. vimwiki가 syntax highlighting 제공하면서 발생하는 문제다.

2022-12-02 릴리즈로 highlighting 적용 범위를 수정했다고 하는데 고쳐지지 않았다.

관련 이슈: https://github.com/vimwiki/vimwiki/issues/640

위 이슈는 일본어를 기준으로 문제를 다룬다.

2022.12.02 릴리즈: https://github.com/vimwiki/vimwiki/releases/tag/v2022.12.02

`#640` 이슈에 대한 수정을 처리했다고 기록되어 있다.
