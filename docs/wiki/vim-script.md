---
created: 2026-10-22
---
# Vimscript

> Vimscript is like regex, you don't learn it, just use it.
>
> Vimscript는 정규식 같아요. 배우는 게 아니라 그냥 쓰는 거예요.

Vim은 Vimscript라는 자체 스크립트를 제공한다. 암묵적인 규칙이 많아서 배우기 꽤 어렵다.
위 인용문은 [Reddit](https://www.reddit.com/r/neovim/comments/l1mne8/learning_vimscript_vs_lua/)에서 공감되어 가져왔다.

## matchfuzzy()

fuzzy search 함수.

`:h matchfuzzy()`

```vim
:echo matchfuzzy(['red apple', 'yellow banana'], 'ra')  " ['red apple']
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
