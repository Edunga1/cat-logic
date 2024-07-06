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

https://github.com/tmuxinator/tmuxinator

tmux session을 관리하는데 도움을 주는 도구.
파일로 tmux 설정을 저장하거나, 저장된 파일로 tmux 세션을 생성한다.

설정 파일을 `~/.config/tmuxinator/`에 저장하여 전역으로 사용하거나
프로젝트별로 `./.tmuxinator.yml`에 저장하여 사용할 수 있다.
개인 프로젝트는 코드베이스에 포함하는 것도 좋겠다.

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

