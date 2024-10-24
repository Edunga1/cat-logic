---
created: 2022-12-31
---
# VimWiki

개인 위키 Vim 플러그인.

https://github.com/vimwiki/vimwiki

VimWiki는 문서를 작성하는 플랫폼으로써 작동한다.

주로 마크다운 기반으로 작성한다.
VimWiki를 설치하고 경로를 설정한 후 마크다운 파일을 열면,
기본적으로 `filetype`을 `vimwiki`로 설정한다.
그러면 Markdown과 MediaWiki 문법을 지원하는 [LSP](./language-server-protocol.md)처럼 동작한다.

## 기능

**LSP로써의 VimWiki** \
내부 링크로 이동한다거나, 현재 문서를 참조하는 모든 문서를 검색하는 등 LSP와 같은 기능을 제공한다.
추가적인 동작도 하는데, 예를들어, 내부 링크에서 <cr>로 해당 문서로 이동하고, 웹 링크라면 브라우저로 연다.

**마크다운 도구로써의 VimWiki** \
HTML로 내보내거나, 위키 검색을 한다거나, 여러개의 위키를 관리할 수 있는 등 VimWiki 고유의 기능을 제공한다.
일반적인 코딩 작업에는 LSP로 대부분 해결할 수 있어서, Vim 플러그인을 추가로 설치하지 않는 반면에,
문서 작성을 하다보면 VimWiki가 제공하는 편리 기능들이 도움이 된다.

따라서 [Markdown](./markdown.md) LSP를 별도로 설치할 필요성은 없다.
하지만 둘 다 사용하면 vim-lsp의 공통 경험과 VimWiki의 향상된 기능을 사용할 수 있어서 좋다.
함께 사용하면서 기능이 충돌한다거나 등 문제는 없었다.

**Viewer로써의 VimWiki** \
`vimwiki`로 파일 타입이 변경되면서, 구문 강조는 VimWiki가 제공하는 것으로 변경된다.
그리고 VimWiki가 제공하는 기능 중에는 문서를 탐색하는 기능도 많아서, 뷰어로써 사용하는 것도 가능하다.
`conceallevel`로 불필요한 구문을 가리고 텍스트만 볼 수도 있는데, 이건 기본 vim 기능으로도 가능한 듯.
별도의 마크다운 뷰어를 사용하지 않고, 작성과 동시에 뷰어로 접근성을 높인다.

### 자주 사용하는 기능

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
