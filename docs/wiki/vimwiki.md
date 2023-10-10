# Vimwiki

vim 기반 개인 위키 플러그인.

https://github.com/vimwiki/vimwiki

vimwiki 이전에는 [GitBook](https://github.com/GitbookIO/gitbook)을 사용했다.
오픈소스이며 pdf, epub 등 전자책 변환을 제공하고, 정적 사이트 생성을 제공하고 SEO, Analytics 등 다양한 플러그인이 있는 생태계도 구비되어 있었다.
하지만 2018년, 기존 버전을 중단하고 저장소도 멈췄다. 새로운 버전은 일부 유료로 제공되고, 클로즈드 소스로 전환되었다.
더 이상 사용할 이유가 없어진 것이다.

## 자주 사용하는 기능

* `<leader>ww` wiki index 열기
* `<enter>` 문서 열기
* `<backspace>` 이전 문서로 돌아가기
* `:VWB` 현재 문서를 참조하는 모든 문서 검색 (location-list)

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

```text
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
