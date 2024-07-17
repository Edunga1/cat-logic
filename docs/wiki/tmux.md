---
created: 2024-07-06
---
# Tmux

Terminal Multiplexer. 여러개의 창을 하나의 터미널에서 관리할 수 있게 해준다.

https://github.com/tmux/tmux

**Preview:**

```bash
~/workspace/cat-logic main*                                                                          19:13:40
❯ ls
README.md docs      sites

~/workspace/cat-logic main*                                                                          19:13:41
❯






 ❐ cat  ↑ 11d 1h 22m  1 editor  2 cli  3 serv>  ↑ ◼◼◼◼◼◼◼◼◼◼ 100% | 19:13 | 28 Aug  park       ip-192-168-0-9
```

하단의 `1 editor`, `2 cli`, `3 serv`는 각각 창(Window)을 나타낸다.

새로운 프로젝트가 아닌 이상 `tmux` 명령어를 잘 사용하지 않는다.
기존 프로젝트는 `tmuxinator`로 파일로 관리하여 window 설정을 자동화하는 편이다.

## 특징

하나의 화면에서 여러개의 터미널을 제어할 수 있다.
터미널 앱을 종료하더라도 백그라운드로 실행된다.
언제든지 `tmux` 명령어로 tmux session에 연결할 수 있다.
이것은 사실상 tmux 세션 내에서 실행되는 모든 명령어가 백그라운드로 실행되는 것을 의미하기 때문에
오래 걸리는 프로세스를 실행하고, 앱이 종료되어도 프로세스는 유지되니 마음이 좀 놓인다.

- `tmux`: 새 세션을 생성하거나 생성된 세션에 attach 한다.
- `tmux new -s [NAME]`: 새 세션을 생성한다.

기본적으로 `C-b`키가 tmux shortcut의 시동키다.
나는 controll과 b 사이가 멀어서 `C-a`로 사용한다:

```
# ~/.tmux.conf.local
set -g prefix C-a
```

## Tmuxinator

tmux 설정을 파일로 관리하는 도구.

https://github.com/tmuxinator/tmuxinator

설정 파일을 `~/.config/tmuxinator/`에 저장하여 전역으로 사용하거나
프로젝트별로 `./.tmuxinator.yml`에 저장하여 사용할 수 있다.
개인 프로젝트는 코드베이스에 포함하는 것도 좋겠다.

`tmuxinator` 명령어를 제공한다. 명렁어가 길어서 `tmuxn`으로 alias를 만들어 사용하는 중.

### 지역적으로 사용할 경우

```yaml
project_name: my-project

windows:
  - editor: vi
  - cli:
  - server: npm run develop
```

```bash
$ tmuxinator  # or tmuxinator start
```

start 시 설정 이름을 생략하면 `./.tmuxinator.yml`을 찾는다.

### 전역적으로 사용할 경우

```yaml
name: my-project
root: ~/workspace/my-project

windows:
  - editor: vi
  - cli:
  - server: npm run develop
```

```bash
$ tmuxinator my-project  # or tmuxinator start my-project
```

start 시 설정 이름을 지정하면 `~/.config/tmuxinator/`에서 `name`을 찾는다.

### 내 사용 방법

주로, 각 프로젝트마다 `.tmuxinator.yml` 파일을 생성하는 지역적으로 사용한다.

`.git/info/exclude`에 `.tmuxinator.yml`을 추가하여 코드베이스에는 포함하지 않을 수 있다.

다음은 에디터와 터미널 용 창을 생성하는 템플릿이다.

```yaml
name: my-project

windows:
  - editor: vi
  - cli:
      layout: even-horizontal
      panes:
        -
        - npm run test-watch
```

두 번째 창은 빈 pane과 테스트 watch 모드나 서버와 같이 foreground 상주하는 명령어를 실행해 두는 창을 분할해 둔다.

[fasd](https://github.com/clvv/fasd)를 사용하므로,
터미널을 열고 `z my` 입력 후 `tmuxn`만 입력하면 개발 환경이 준비가 끝난다.

## 플러그인

Tmux 플러그인과 플러그인을 관리하는 매니저가 있다.

[TPM](https://github.com/tmux-plugins/tpm)은 Tmux Plugin Manager다.
사용하기 위해서 프로젝트를 Clone 받고, `.tmux.conf`에 설정을 추가해야 하는 과정이 번거롭다.

[Tmux Resurrect](https://github.com/tmux-plugins/tmux-resurrect)는 세션을 저장하고 복원하는 플러그인을 사용했었는데,
특별히 사용할 일이 없어서 제거했다.
