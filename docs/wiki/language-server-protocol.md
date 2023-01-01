# Language Server Protocol

https://microsoft.github.io/language-server-protocol

언어가 IDE 독립적으로 프로토콜을 통해 개발 기능을 제공한다.

예를 들어 vim에서 파이썬 개발을 위해 설정한다면, [jedi](https://github.com/davidhalter/jedi) 또는 [rope](https://github.com/python-rope/rope) 결정하고, [ycm](https://github.com/ycm-core/YouCompleteMe) 같은 completion 도구를 통해 사용했다.
언어마다 플러그인이 또 달랐기 때문에 ycm 같은 도구가 인기가 많았으나, 무겁기도 하고 일반적인 GUI IDE와 비교했을 때 기능도 부족하다.

LSP는 클라이언트와 서버만 선택하면 개발 설정 경험을 언어 공통적으로 가져갈 수 있어서 편리하다.

VSCode가 대표적인 LSP 클라이언트다.

vim에서는 [coc.nvim](https://github.com/neoclide/coc.nvim) 또는 [nvim 내장](https://github.com/neovim/nvim-lspconfig)된 것을 사용하면 된다.
개인적으로는 coc.nvim 사용하다가 nvim으로 갈아탔는데, 더 쾌적하다. 다만 이것저것 설치할 플러그인이 많아서 처음 구성하기가 가따롭다. 반면에 coc.nvim은 설정이 편리하고, 플러그인 하나가 language server 설치 관리자 기능을 포함하고 있어서 처음 설정이 매우 편리하다.
