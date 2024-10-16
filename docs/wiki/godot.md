---
created: 2024-09-17
---
# Godot Engine

Godot은 오픈소스 게임 엔진이다.

Scene 저장 시 스크립트가 자동 포매팅된다.
Godot 에디터 설정이 Tab 및 4칸이 기본 설정인데,
`Editor` > `Editor Settings` > `Text Editor` > `Indent`에서 변경할 수 있다.
다른 에디터의 기본 값과 다르면 불편하므로 변경하는 편이 좋다.

에디터의 인상적인 부분은 먼저, 가볍다는 것이다.

설치부터 portable 형태로 제공된다. 다운 받으면 추가적으로 다운로드 받을 것이 없다(Unity와는 다르다).
용량은 약 120MB 정도이다. 적은 용량만큼 에디터의 반응 속도도 빠르다.

Scene 파일인 `.tscn`은 사람이 읽을 수 있는 형태로 저장된다.
변경되는 부분만 저장하므로 복잡하지 않다.
변경 여부는 에디터 내에서도 `3 Changes`와 같이 표시된다.
이러한 점은 에디터 없이도 개발할 수 있게 해줄 것이다.

2D 튜토리얼은 [간단한 닷지 게임](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html)을 만드는 것이다.
1시간 정도 소요될 거 같다. 에셋만 다운로드 받으면 바로 시작할 수 있다.

## 외부 에디터 사용

### WSL 호환성

Reddit에서 [Godot을 WSL에서 설치하는 방법?](https://www.reddit.com/r/godot/comments/1cph9n7/how_to_install_godot_on_wsl2/)이라는
질문에 대한 답변에서, [그러지 말라고 한다](https://www.reddit.com/r/godot/comments/1cph9n7/comment/l3knvb3/).

프로젝트를 WSL 안에 두고 사용해도 문제가 없다는 [답변](https://www.reddit.com/r/godot/comments/1cph9n7/comment/limqgpv/)도 있다.
유니티 프로젝트를 WSL 안에 두고 사용 시도를 했었는데, 잘 안되었던 것으로 기억한다.

#### Language Server Protocol

[Gist](https://gist.github.com/lucasecdb/2baf6d328a10d7fea9ec085d868923a0)에는
WSL에서 [vim](/docs/wiki/vim.md) godot [lsp](/docs/wiki/language-server-protocol.md)를 사용하는 방법이 나와 있다.
Neovim에서 Godot LSP가 제대로 동작하지 않아서 워크플로우를 작성했다고 한다.

설명이 너무 장황해서 이 방법을 사용하지는 않았다.
공식 문서의 가이드를 따라보기로 했는데..

---

[공식 문서](https://docs.godotengine.org/en/stable/tutorials/editor/external_editor.html)는 자체 제공하는 에디터와 구분하여,
외부 에디터를 사용하는 방법으로 소개한다.

Godot 앱에서 `6005` 포트로 Langueage Server를 실행하고, 외부 에디터에서 LSP를 사용하도록 가이드한다.
[nvim-lspconfig의 gdscript 설정](https://github.com/neovim/nvim-lspconfig/blob/16666f1bc40f69ce05eb1883fd8c0d076284d8a5/lua/lspconfig/configs/gdscript.lua)에서도 `6005` 포트에 연결하도록 기본 설정되어 있다.

Windows 10 + WSL2 환경에서, 공식 문서에 따라 Godot에서 LSP를 활성화하고, Vim LSP 설정하였지만 윈도우 앱에서 오픈한 포트에 연결하지 못했다.
윈도우 포트 정보에서는 확인되지만, WSL에서는 포트를 찾지 못했다. 아마도 WSL 이슈인 것 같다.

Windows 11 업그레이드하면서 다시 시도했는데.. 잘 된다.
Windows 10 일 때와 마찬가지로 WSL에서는 포트 정보를 찾을 수 없는데도 잘 동작한다.
이전 환경과 다른 점은 `winget`으로 Godot을 설치했다는 점이다. 관계가 있을지는 모르겠다.
어쨌든 LSP가 잘 동작해서, Vim에서도 타입과 함수 정보를 볼 수 있다.

정리하면 Godot에서 LSP를 활성화하고, Vim에서 nvim-lspconfig로 `gdscript` 설정만 했다:\
https://github.com/Edunga1/dotfiles/blob/main/vim/lua/lsp/servers/gdscript.lua

### 성가신 외부 파일 수정 팝업 끄기

외부 에디터에서 파일을 수정하고 Godot 앱으로 돌아오면 수정된 파일을 다시 가져올 지, 버릴지 물어본다.
수정할 때 마다 팝업이 떠서 불편한데, 설정을 통해 항상 수정 파일을 다시 가져오도록 할 수 있다.

Editor -> Editor Settings -> Text Editor -> Behavior -> Files에서 `Auto reload Scripts on External Change`를 체크하면 된다.

## GDScript

GDScript는 Godot Engine이 제공하는 스크립트 언어이다.

https://docs.godotengine.org/en/stable/getting_started/step_by_step/scripting_languages.html#gdscript

> GDScript looks like Python as you structure your code blocks using indentations, but it doesn't work the same way in practice. It's inspired by multiple languages, including Squirrel, Lua, and Python.

파이썬과 유사한 문법을 가지지만, 같은 방식으로 동작하지 않으며 Squirrel, Lua, Python에 영감을 받았다고 한다.

엔진과 커뮤니케이션하기 위한 지원이 포함되어 있는 듯.
`$`는 `get_node()`의 단축어인데, `$AnimatedSprite2D.play()`는 `get_node("AnimatedSprite2D").play()`와 같다.[^1]
유니티의 컴포넌트 개념을 Godot에서는 노드로 표현하는데, 이 노드를 식별하기 위해 사용한다.

[^1]: https://docs.godotengine.org/en/stable/getting_started/first_2d_game/03.coding_the_player.html
