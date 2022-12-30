# 개요

# 개발도구

vim 기본 설정으로는 텍스트에디터 역할밖에 못한다.

최소한 pyright는 사용하자.

nvim-lspconfig, null-ls 이용하여 다음과 같이 설정, 사용하고 있다.

```lua
-- vim 설정 파일의 일부분
server = require 'lspconfig'.pyright,
sources = {
    null_ls.builtins.diagnostics.pylint,
    null_ls.builtins.diagnostics.mypy.with {
        extra_args = { '--ignore-missing-imports' }
    },
    null_ls.builtins.formatting.autopep8,
    null_ls.builtins.formatting.isort,
},
```

## pyright

https://github.com/microsoft/pyright

[language server](language-server-protocol) for python.

## pylint

https://github.com/PyCQA/pylint
정적 분석 도구.
