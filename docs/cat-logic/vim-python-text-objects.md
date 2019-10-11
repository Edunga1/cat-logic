---
id: page-85
time: 2019-10-11 16:42:37
tags: vim, python
---
# Vim에서 python text object 사용하기

`viw`로 단어를, `vip`로 문단을 선택할 수 있다.
파이썬의 함수와 메서드 그리고 클래스를 선택하려면 어떻게 해야할까?

추정할 수 있는건, 언어마다 달라지는 특성을 플러그인의 도움 없이 모두 지원할 수 없을 거 같다.
파이썬은 들여쓰기로 함수 블럭을 결정하고, 자바스크립트는 중괄호로 나타낸다.
또 파이썬에서는 함수, 메서드, 클래스에 Decorator를 추가한다.

파이썬에서 이런 기능을 제공하고,
`Expand/Shrink Selection` 기능을 구성하는 방법에 대해서 알아본다.

## [vim-pythonsense](https://github.com/jeetsukumaran/vim-pythonsense)

처음엔 [vim-textobj-python](https://github.com/bps/vim-textobj-python)을
사용해보다가, 제대로 동작하지 않아서 옮겼다.

**vim-pythonsense** 플러그인은 파이썬의 Text Object를 제공한다.
뿐만 아니라 Text Object로 점프하는 기능도 제공하는데,
나는 이 기능은 막았다.

설정을 통해 키 매핑을 비활성화 할 수 있다:

```sh
let g:is_pythonsense_suppress_motion_keymaps = 0
let g:is_pythonsense_suppress_keymaps = 0
let g:is_pythonsense_alternate_motion_keymaps = 0
```

## [terryma/vim-expand-region](https://github.com/terryma/vim-expand-region)

Expand Selection, Shrink Selection 기능을 제공하는 플러그인.

VSCode, Intellij 에서도 이 기능이 있다.

`+` 키를 누르면 단어 -> 문자열 -> 괄호 -> 한 줄 -> 함수 -> 클래스 순서로
점진적으로 Selection 한다. `-` 키는 그 반대로 동작한다.

`vim-textobj-python` 플러그인이 없으면, 함수, 클래스 레벨에서 제대로 동작하지 않는다.

별다른 설정을 하지 않으면, 첫 레벨부터 렉이 있어서,
다음과 같이 설정하여 사용하고 있다:

```sh
call expand_region#custom_text_objects('python', {
  \ 'af' :1,
  \ 'if' :1,
  \ 'ac' :1,
  \ 'ic' :1,
  \ })
```
