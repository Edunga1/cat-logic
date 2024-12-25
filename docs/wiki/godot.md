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

윈도우에서 설치 시 `godot.exe` 바이너리를 제공한다.
프로젝트 내에서 `godot.exe`를 입력하면 프로젝트를 실행한다.

CLI에 대한 정보는: https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html

## 튜토리얼

공식 사이트에서 [간단한 2D 닷지 게임](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html)을 만드는 과정을 소개한다.
1시간 정도 소요된다. 에셋만 다운로드 받으면 바로 시작할 수 있다.
애니메이션, 사운드, 물리학, 스크립트 등 기본적인 기능을 다룬다.

실습하여 내 저장소에 업로드하였다. 추가로 GitHub Actions를 이용하여 빌드하고, GitHub Pages로 배포한다.\
https://github.com/Edunga1/godot-start-2d-game

## 외부 에디터 사용

### WSL 호환성

Reddit에서 [Godot을 WSL에서 설치하는 방법?](https://www.reddit.com/r/godot/comments/1cph9n7/how_to_install_godot_on_wsl2/)이라는
질문에 대한 답변에서, [그러지 말라고 한다](https://www.reddit.com/r/godot/comments/1cph9n7/comment/l3knvb3/).

프로젝트를 WSL 안에 두고 사용해도 문제가 없다는 [답변](https://www.reddit.com/r/godot/comments/1cph9n7/comment/limqgpv/)도 있다.
유니티 프로젝트를 WSL 안에 두고 사용 시도를 했었는데, 잘 안되었던 것으로 기억한다.

#### Language Server Protocol

[공식 문서](https://docs.godotengine.org/en/stable/tutorials/editor/external_editor.html)에서는 외부 에디터를 사용하는 방법으로 소개하고 있다.

Godot 에디터에서 `6005` 포트로 Langueage Server를 실행하고, 외부 에디터에서 LSP를 사용하는 구조이다.
참고로 [nvim-lspconfig의 gdscript 기본설정](https://github.com/neovim/nvim-lspconfig/blob/16666f1bc40f69ce05eb1883fd8c0d076284d8a5/lua/lspconfig/configs/gdscript.lua)도 `6005` 포트에 연결하도록 기본 설정되어 있다.

Windows 10 + WSL2 환경에서, 공식 문서에 따라 Godot에서 LSP를 활성화하고, Vim LSP 설정하였지만 윈도우 앱에서 오픈한 포트에 연결하지 못했다.
윈도우 포트 정보에서는 확인되지만, WSL에서는 포트를 찾지 못했다. 아마도 WSL 이슈인 것 같다.

**Windows 11 업그레이드하면서 다시 시도했고, 동작했다**.
WSL에서 포트 정보를 찾을 수 없는데도 잘 동작한다.
이전과 다른 점은 `winget`으로 Godot을 설치했다는 점인데, 관계가 있을지는 모르겠다.
어쨌든 LSP가 잘 동작해서, Vim에서도 타입과 함수 정보를 볼 수 있다.

정리하면:

- Godot에서 LSP를 활성화하고
- Vim에서 nvim-lspconfig로 `gdscript` [설정만 했다](https://github.com/Edunga1/dotfiles/commit/9dbb085adc52f09a6f3592447dbd7ad01c9b37c9).

### 성가신 외부 파일 수정 팝업 끄기

외부 에디터에서 파일을 수정하고 Godot 앱으로 돌아오면 수정된 파일을 다시 가져올 지, 버릴지 물어본다.
수정할 때 마다 팝업이 떠서 불편한데, 설정을 통해 항상 수정 파일을 다시 가져오도록 할 수 있다.

Editor -> Editor Settings -> Text Editor -> Behavior -> Files에서 `Auto reload Scripts on External Change`를 체크하면 된다.

## GDScript

GDScript는 Godot Engine이 제공하는 스크립트 언어이다.

https://docs.godotengine.org/en/stable/getting_started/step_by_step/scripting_languages.html#gdscript

> GDScript looks like Python as you structure your code blocks using indentations, but it doesn't work the same way in practice. It's inspired by multiple languages, including Squirrel, Lua, and Python.

파이썬과 유사한 문법을 가지지만, 같은 방식으로 동작하지 않으며 Squirrel, Lua, Python에 영감을 받았다고 한다.
python과 같이 `self`를 지원하지만, 함수 시그니처에서 `self`를 명시적으로 사용하지 않아도 된다.

`owner`는 부모 노드를 가리킨다. scene에서 노드를 추가할 일이 많기 때문에, 부모 노드를 참조할 일이 많다.

엔진과 커뮤니케이션하기 위한 지원이 포함되어 있는 듯.
`$`는 `get_node()`의 단축어인데, `$AnimatedSprite2D.play()`는 `get_node("AnimatedSprite2D").play()`와 같다.[^1]
유니티의 컴포넌트 개념을 Godot에서는 노드로 표현하는데, 이 노드를 식별하기 위해 사용한다.

[^1]: https://docs.godotengine.org/en/stable/getting_started/first_2d_game/03.coding_the_player.html

## 디자인 패턴

### Signal

공식 문서 [Using Signals](https://docs.godotengine.org/en/stable/getting_started/step_by_step/signals.html)를 참조하자.

Signal은 Godot 버전의 옵저버 패턴이다.[^2]
Godot은 이를 내장하고 있다.

[^2]: `... As mentioned in the introduction, signals are Godot's version of the observer pattern.`

부모 노드 -> 자식 노드로 커뮤니케이션은 자식 노드를 직접 참조하면 되는 반면에, \
자식 노드 -> 부모 노드로 커뮤니케이션은 signal을 일반적으로 사용한다.(또 다른 방법은 `owner`를 사용하는 것이다.)

자식 노드에서는 `signal`을 선언하고, observer에 `emit()`을 통해 notification 한다.

```gd
singal hit

func _process(delta):
  if is_colliding():
    emit_signal("hit")
```

observer가 되는 노드에서는 `connect()`를 통해 observer를 등록하거나, tscn 파일에서 observer 노드의 트리거 될 함수를 설정한다.

```gd
func _on_Enemy_hit():
  queue_free()
```

`owner`를 사용하면 다음과 같이 사용할 수 있다.

```gd
func _process(delta):
  if is_colliding():
    owner.on_hit()
```

다만 이 방식은 부모 노드가 `on_hit` 함수를 가지고 있어야 한다.
안전한 처리를 위해서 ready 함수에서 부모 노드의 검증을 할 수 있다.

```gd
func _ready():
  if not owner.has_method("on_hit"):
    push_error("Owner node must have 'on_hit' method")
```

예외 처리가 필요하지만 이 방식의 이점은 부모 노드에 자식 노드를 추가하는 것만으로도 효과를 볼 수 있다는 점이다.

## 웹 빌드

빌드를 위해선 다음의 순서로 진행한다. 4.3 버전 기준이다.

1. **Export Templates** 설치
2. Web Preset 생성 (export_presets.cfg)
3. Export

1, 2는 한 번만 진행한다.

Export Templates는 빌드를 위한 도구를 설치하는 과정이다.
프로젝트 레벨이 아닌 Godot 엔진 레벨에서 설치하는 것으로 보인다.
Editor -> Manage Export Templates...에서 `Download and Install` 버튼을 클릭하기만 하면 설치된다.
CLI로 설치할 수 있는지는 모르겠다.

Web Preset은 빌드 설정을 저장한다.
웹, 데스크탑, AOS, IOS 등 플랫폼 별로 Preset을 만들면 export_presets.cfg에 설정이 저장된다.

이제 에디터나 `godot.exe` 또는 `godot` cli로 export할 수 있다.
다음은 CLI로 빌드하는 방법. WSL 및 godot.exe를 binary로 사용하고 있다.

```bash
$ mkdir -p build/web
$ godot.exe --export-release "HTML5" ./build/web/index.html
```

godot.exe는 윈도우 앱 기반이라 그런지, Godot 엔진이 시작되고 빌드 후 종료된다.

이제 `build/web/index.html`을 서빙하면 실행된다.
`live-server build/web` 등 도구로 확인한다.

---

아래는 쓰레드를 사용한 고성능 웹 빌드에 대한 내용인데, 내 경우는 해당 기능을 사용하지 않는지 문제가 없다.

기본적으로 웹 빌드하면 쓰레드 사용으로 SharedArrayBuffer와 이를 위한 CrossOriginIsolation의 활성화가 필요하다.
하지만 github pages 등 대부분 호스팅 사이트에서는 이를 지원하지 않는다.
이를 비활성화할 수 있는 방법이 있다고 한다.

[Godot 4.3 will FINALLY fix web builds, no SharedArrayBuffers required!](https://forum.godotengine.org/t/godot-4-3-will-finally-fix-web-builds-no-sharedarraybuffers-required/38885)\
이 글에서는 `THREADS_ENABLED`를 추가하면서 더 이상 SharedArrayBuffer가 필요하지 않다고 한다.

이 [godot-ci](https://github.com/yet-another-lucas/plumbing-adventure/blob/main/.github/workflows/ci.yml) workflow를 사용한 프로젝트는 관련된 설정은 보이지 않지만, 웹에서 잘 동작한다.
아마도 Base Workflows에서 이미 설정되어 있는 듯.

## 참고

### Node간 커뮤니케이션 방법

https://www.reddit.com/r/godot/comments/11x8mpj/best_way_to_handle_communication_between_nodes/ \
노드간 커뮤니케이션하는 가장 좋은 방법을 묻는 레딧 글이다.

https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fou927127ybc41.png \
이 이미지는 Scene Tree에서 논리적인 흐름 방향의 개요를 설명한다.

부모는 자식 노드의 함수를 호출하고, 자식은 부모를 signal을 통해 호출한다.
형제 노드간에는 signal을 통해 통신한다.

### Build Containers

https://github.com/godotengine/build-containers

고도에서 공식으로 제공하는 빌드 컨테이너.
[podman](/docs/wiki/podman.md)을 필요로하며, 가상화 환경에서 빌드를 제공하여 복잡한 구성을 생략할 수 있다.
다만 WSL2에서 제대로 사용할 수 없었다. podman 설치부터 애로사항이 있다.

---

https://github.com/abarichello/godot-ci

GitHub 또는 GitLab에서 CI로 제공하는 도커 이미지 및 CI 설정 예제.

앱 빌드의 경우 GitHub Actions를 사용할 수 없는지, GitLab을 통해 사용하도록 예제가 구성되어 있다.
이 방법도 성공하지는 못했다. 예제에서 설정 수정이 조금 더 필요했다.
Actions는 GitHub에서 트리거 되기전에 진행하기 어려운데, [act](https://github.com/nektos/act)를 통해 로컬에서 테스트할 수 있다.
다만, 완벽하게 재현되지 않는지, 실제 트리거 되었을 때와 에러 내용이 달랐다.
