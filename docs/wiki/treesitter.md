---
created: 2024-09-23
---
# Treesitter

https://tree-sitter.github.io/tree-sitter/

[nvim](/docs/wiki/vim.md)에서 플러그인으로 사용하고 있다.
문법 강조나 Text Object 확장을 제공한다.

## Query

Treesitter의 표현식은 Scheme을 통해 정의되며, `.scm` 확장자를 가진다.

> ... The default names for the query files use the `.scm` file. We chose this extension because it commonly used for files written in [Scheme](https://en.wikipedia.org/wiki/Scheme_%28programming_language%29), a popular dialect of Lisp, and these query files use a Lisp-like syntax.
>
> Alternatively, you can think of .scm as an acronym for “Source Code Matching”.
>
> [Queries](https://tree-sitter.github.io/tree-sitter/syntax-highlighting#queries) 중에서

nvim에서 treesitter textobject 쿼리를 추가하려면 `<nvim-config>/queries/<language>/textobjects.scm`을 생성하거나,
nvim-treesitter의 `:TSEditQuery textobjects` 명령어를 통해 내장된 쿼리를 수정한다.

다음은 javascript에서 Object의 key를 `@property`로, value를 `@value`로 지정하는 쿼리이다.

```Scheme
((pair
  key: (property_identifier) @property
  value: (_) @value)
)
```

내 설정 기준으로 `~/.config/nvim/queries/javascript/textobjects.scm`에 저장하였다.

이제 nvim-treesitter 플러그인 설정에 다음을 추가한다.

```lua
require'nvim-treesitter.configs'.setup {
  textobjects = {
    select = {
      enable = true,
      lookahead = true,
      keymaps = {
        ["ap"] = "@property",
        ["av"] = "@value",
      },
    }
  }
}
```

이제 `vap`로 `key`를 선택하고, `vav`로 `'value'`를 선택할 수 있다.

```javascript
const obj = {
  key: 'value'
}
```

nvim-treesitter-textobjects 플러그인에서 미리 제공하는 쿼리를 활용할 수도 있다. 이 편이 편리하다.

다음은 javascript, typescript에서 공통으로 사용하는 ecma 쿼리다.

https://github.com/nvim-treesitter/nvim-treesitter-textobjects/blob/master/queries/ecma/textobjects.scm

Object에 대한 쿼리는 다음과 같이 정의되어 있다.

```Scheme
(object
  (pair
    key: (_) @assignment.lhs
    value: (_) @assignment.inner @assignment.rhs) @assignment.outer)
```

`@assignment.lhs`로 key를 선택하고, `@assignment.rhs`로 value를 선택할 수 있다.
`@assignment.outer`로 key, value 모두 선택한다.

주의할 점은 다음과 같이 다른 문맥에서 같은 이름을 사용하고 있어서, 커서 위치에 따라 선택되는 대상이 달라진다.

```Scheme
(lexical_declaration
  (variable_declarator
    name: (_) @assignment.lhs
    value: (_) @assignment.inner @assignment.rhs)) @assignment.outer
```

커서 위치가 변수 선언문에 있으면 `@assignment.lhs`로 변수명을 선택하고 `@assignment.rhs`로 변수값을 선택하게 된다.
