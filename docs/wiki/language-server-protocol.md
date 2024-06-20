# Language Server Protocol

Microsoft에서 만든 IDE나 에디터와 언어 서버가 통신하기 위한 프로토콜이다.

https://microsoft.github.io/language-server-protocol

프로토콜이기 때문에 위 저장소는 프로토콜 사양을 정의한다.

웹 사이트로 배포하고 있으니 방문해서 보는 편이 보기 좋다.\
https://microsoft.github.io/language-server-protocol/specifications/specification-current

이전에는 vim에서 파이썬 개발을 위해 설정한다면,
[jedi](https://github.com/davidhalter/jedi) 또는 [rope](https://github.com/python-rope/rope) 결정하고,
[ycm](https://github.com/ycm-core/YouCompleteMe) 등 completion 도구를 선택했다.
언어마다 플러그인이 다르기도 했기 때문에 ycm 같은 통합 도구의 인기가 많았으나, 무겁기도 하고 일반적인 IDE와 비교했을 때 기능도 부족했다.

LSP는 클라이언트와 서버만 선택하면 개발 설정 경험을 언어 공통적으로 가져갈 수 있어서 편리하다.

VSCode가 대표적인 LSP 클라이언트다.

vim에서는 [coc.nvim](https://github.com/neoclide/coc.nvim) 또는 [nvim 내장](https://github.com/neovim/nvim-lspconfig)된 것을 사용하면 된다.
개인적으로는 coc.nvim 사용하다가 nvim으로 갈아탔는데, 더 쾌적하다. 다만 이것저것 설치할 플러그인이 많아서 처음 구성하기가 가따롭다. 반면에 coc.nvim은 설정이 편리하고, 플러그인 하나가 language server 설치 관리자 기능을 포함하고 있어서 처음 설정이 매우 편리하다.

## 역사

생각보다 오래되지 않았다. Microsoft가 [Visual Studio Code](https://code.visualstudio.com/)를 위해서 만들었다[^1].
VSCode가 2015년에 첫 릴리즈가 나왔다고 하니 지금 2023년 기준 8년이 된다.
최초 발표 후 짧은 시간에 널리 퍼졌다. 이제 언어 지원을 하는 도구는 대부분 LSP를 사용한다.

[^1]: LSP was originally developed for Microsoft Visual Studio Code and is now an open standard. [Wikipedia](https://en.wikipedia.org/wiki/Language_Server_Protocol)
