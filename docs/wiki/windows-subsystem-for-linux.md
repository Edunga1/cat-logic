---
created: 2022-11-30
---
# Windows Subsystem for Linux (WSL)

줄여서 WSL. 윈도우10부터 리눅스를 실행할 수 있다.

## vim 설정

### clipboard 공유

vim register와 wsl 환경에서 클립보드를 공유하려면 vim 설정에 다음과 같이 추가한다:

```vim
let g:clipboard = {
  \   'name': 'win32yank-wsl',
  \   'copy': {
  \      '+': 'win32yank.exe -i --crlf',
  \      '*': 'win32yank.exe -i --crlf',
  \    },
  \   'paste': {
  \      '+': 'win32yank.exe -o --lf',
  \      '*': 'win32yank.exe -o --lf',
  \   },
  \   'cache_enabled': 0,
  \ }
```

win32yank.exe 실행파일 필요.

다음은 [MacOS](./mac-os.md) 등 다른 환경에서 동작하지 않도록, WSL 확인하는 함수이다.

```vim
function! s:IsWSL()
  if has("unix") && filereadable("/proc/version")
    let lines = readfile("/proc/version")
    if lines[0] =~ "Microsoft"
      return 1
    endif
  endif
  return 0
endfunction

if !s:IsWSL()
  finish
endif
```

ref. https://github.com/Edunga1/dotfiles/blob/master/vim/vim-include/_wsl.vim

## Ubuntu 버전 업그레이드

18.04 -> 20.04로 업그레이드했다. 이슈가 하나 있었는데, WSL 보다는 ubuntu 이슈라 봐도 될 듯.

업그레이드를 위해선 `sudo do-release-upgrade -d` 명령어만 입력하면 되는데..

문제는 **설치된 패키지들을 모두 최신 버전으로 업데이트** 해야 된다.

명령어를 통해서 모든 패키지를 업데이트하자:

- `sudo apt update`
- `sudo apt upgrade`
- `sudo apt dist-upgrade`

패키지 업데이트 도중 개인 패키지 저장소인 PPA(Personal Package Archive)를 추가한 적이 있고, 이 PPA가 사라졌으면 에러가 난다.
404로 출력된다. 따라서 업데이트 하지 않도록 PPA를 제거해야 했다.

나는 `CMake`를 PPA를 통해서 설치 했었는데. 이 PPA가 사라져서 에러가 발생했다.

```bash
Ubuntu 18.04 ppa.launchpad.net/george-edison55/cmake-3.x/ubuntu bionic Release 404 Not Found [IP: 91.189.95.83 80]
```

제거하기 위해 2가지 방법이 있다.

- 파일을 지운다: `sudo rm /etc/apt/sources.list.d/george-edison55-ubuntu-cmake-3_x-bionic.list`
- 명령어를 통해 지운다: `sudo add-apt-repository --remove ppa:whatever/ppa`

문제는 PPA 이름을 알아야 하는데, 에러 메시지에 출력되지 않는다. 패키지 이름만 포함될 뿐이다. 그냥 에러메시지로 검색해서 지우는게 속편하다...

이제 `sudo do-release-upgrade -d` 하면 되는데..

```rust
Checking for a new Ubuntu release
You have not rebooted after updating a package which requires a reboot. Please reboot before upgrading.
```

업그레이드 후에는 리붓 해야한다... :(

## 문제점

[MacOS](./mac-os.md)와 다르게 문제점들이 좀 있다.
[Jetbrains IDE](./jetbrains.md)가 WSL 경로에서 프로젝트를 실행을 잘 지원하지 못한다거나
WSL 내 git 바이너리가 윈도우 마운트 경로(`/mnt/c/...`로 접근한다)에서 느린 문제 등 매끄럽지 못한 부분이 있다.

운영체제 지식이 부족해서 정확한 원인을 알기 어렵다.
특히 윈도우와 리눅스 두 환경을 고려해야 하다보니 관련된 정보를 찾기가 어렵다.

### http 관련 명령어가 동작하지 않는 문제

`curl` `wget` `docker pull`  `npm install` 등 명령어가 일체 먹히지 않는다.
`git` 등 간접적으로 http를 사용하는 명렁어도 동작하지 않는다.

https://github.com/microsoft/WSL/issues/4285#issuecomment-522201021

1. `/etc/wsl.conf` 파일을 만들고 아래 내용을 추가한다.

```
[network]
generateResolvConf = false
```

2. window에서 `wsl --shutdown` 실행하고 다시 wsl을 실행한다.
3. `/etc/resolv.conf` 파일을 만들거나, 존재한다면 내용을 아래와 같이 수정하고 2번을 반복한다.

```
nameserver 8.8.8.8
```

### 클립보드를 읽어서 이미지를 생성할 수 없는 문제(해결하지 못함)

`xclip` 명령어로 클립보드를 읽어서 파일로 저장할 수 있다. 하지만 WSL에서는 그게 안된다.

```bash
$ xclip -selection clipboard -t image/png -out > "image.png"
Error: target image/png not available
```

원인은 클립보드와 관련되어 있는 것 같다.
개인용 지식 관리 도구인 [Dendron이라는 저장소의 이슈](https://github.com/dendronhq/dendron/issues/2310)에서 같은 문제를 겪은 사람이 있었다.

> Then, when I tried to paste the image, it said no image on clipboard. That is because the image is on my windows clipboard, not in the ubuntu instance.

ubuntu의 클립보드에는 이미지가 없기 때문이라고 한다.

이건 알려진 문제점이다. 클립보드가 공유되지 않기 때문에 WSL에서는 powershell을 통해서 읽어야 한다:

```bash
$ powershell.exe Get-Clipboard
hello world
```

powershell 클립보드 접근을 통해서 이미지를 만드는 몇가지 예제를 찾았지만, 동작하지는 않았다:

```bash
$ powershell.exe -Command "(Get-Clipboard -Format image).Save('foo.png')"
```

ChatGPT에도 물어봤는데, 다음과 같이 말한다:

> WSL(Windows Subsystem for Linux)에서 윈도우의 클립보드에 복사된 이미지를 파일로 생성하려면 몇 가지 단계를 따라야 합니다.
>
> 먼저, 복사된 이미지 데이터를 얻으려면 PowerShell의 Get-Clipboard 명령을 사용할 수 있습니다. 그러나 이 명령은 텍스트 데이터만 WSL로 전달할 수 있으므로, 이미지 데이터를 먼저 Base64로 인코딩해야 합니다.
> ... 생략

C# 스크립트를 작성하고, powershell을 통해서 실행하는 절차를 설명하는데, 복잡한 방법이라 판단해서 보류했다.
