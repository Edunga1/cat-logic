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

## WSL + Vim 호환성

아직 제대로 사용해보지 않았다. 검색해 본 내용만 정리해 둔다.

Reddit에서 [Godot을 WSL에서 설치하는 방법?](https://www.reddit.com/r/godot/comments/1cph9n7/how_to_install_godot_on_wsl2/)이라는
질문에 대한 답변에서, [그러지 말라고 한다](https://www.reddit.com/r/godot/comments/1cph9n7/comment/l3knvb3/).

프로젝트를 WSL 안에 두고 사용해도 문제가 없다는 [답변](https://www.reddit.com/r/godot/comments/1cph9n7/comment/limqgpv/)도 있다.
유니티 프로젝트를 WSL 안에 두고 사용 시도를 했었는데, 잘 안되었던 것으로 기억한다.

[Gist](https://gist.github.com/lucasecdb/2baf6d328a10d7fea9ec085d868923a0)에는
WSL에서 [vim](/docs/wiki/vim.md) godot [lsp](/docs/wiki/language-server-protocol.md)를 사용하는 방법이 나와 있다.
Neovim에서 Godot LSP가 제대로 동작하지 않아서 워크플로우를 작성했다고 한다.

## GDScript

GDScript는 Godot Engine이 제공하는 스크립트 언어이다.

https://docs.godotengine.org/en/stable/getting_started/step_by_step/scripting_languages.html#gdscript

> GDScript looks like Python as you structure your code blocks using indentations, but it doesn't work the same way in practice. It's inspired by multiple languages, including Squirrel, Lua, and Python.

파이썬과 유사한 문법을 가지지만, 같은 방식으로 동작하지 않으며 Squirrel, Lua, Python에 영감을 받았다고 한다.

엔진과 커뮤니케이션하기 위한 지원이 포함되어 있는 듯.
`$`는 `get_node()`의 단축어인데, `$AnimatedSprite2D.play()`는 `get_node("AnimatedSprite2D").play()`와 같다.[^1]
유니티의 컴포넌트 개념을 Godot에서는 노드로 표현하는데, 이 노드를 식별하기 위해 사용한다.

[^1]: https://docs.godotengine.org/en/stable/getting_started/first_2d_game/03.coding_the_player.html
