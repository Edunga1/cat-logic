# Vimwiki

# 버그

## 강조체, 기울임체가 단어 일부분에만 적용할 수 없는 문제

한국어는 단어에 조사를 붙여쓰면서 어절이 된다:

```text
**동해물**과 백두산이
```

vimwiki에서 위처럼 작성하면 `**` 이후 모든 글자가 볼드가 된다.\
vim에서만 이상하게 보이지만, syntax highlighting이 망가져서 여간 불편한게 아니다.

vimwiki가 syntax highlighting 제공하면서 발생하는 문제다.
위키 문서는 filetype이 `vimwiki`로 고정된다(`set ft?`로 확인).

2022-12-02 릴리즈로 highlighting 적용 범위를 수정했다고 하는데 고쳐지지 않았다.

관련 이슈: https://github.com/vimwiki/vimwiki/issues/640

위 이슈는 일본어를 기준으로 문제를 다룬다.

2022.12.02 릴리즈: https://github.com/vimwiki/vimwiki/releases/tag/v2022.12.02

`#640` 이슈에 대한 수정을 처리했다고 기록되어 있다.

