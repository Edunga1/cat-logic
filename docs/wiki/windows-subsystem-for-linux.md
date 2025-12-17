---
created: 2022-11-30
---
# Windows Subsystem for Linux (WSL)

줄여서 WSL. 윈도우 10부터 리눅스를 실행할 수 있다.

배포판은 여러 가지가 있는데, 나는 Ubuntu를 사용한다.

```bash
PS > wsl --list --online
The following is a list of valid distributions that can be installed.
Install using 'wsl.exe --install <Distro>'.

NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Debian                          Debian GNU/Linux
kali-linux                      Kali Linux Rolling
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
Ubuntu-24.04                    Ubuntu 24.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
openSUSE-Leap-15.6              openSUSE Leap 15.6
SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
openSUSE-Tumbleweed             openSUSE Tumbleweed
```

WSL 버전은 1, 2 두 가지가 있다.
대부분 글은 WSL2를 기준으로 작성되어 있다.
[마이크로소프트의 공식 문서에서는 WSL2를 권장](https://learn.microsoft.com/ko-kr/windows/wsl/compare-versions)한다.

WSL2는 `Windows 11 또는 Windows 10, 버전 1903, 빌드 18362` 이상에서 사용할 수 있다.
[1903 버전은 2019년 5월에 출시](https://learn.microsoft.com/ko-kr/lifecycle/announcements/windows-10-1903-end-of-servicing)되었다.

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

[win32yank.exe](https://github.com/equalsraf/win32yank) 실행파일이 필요하다.
저장소 Release 페이지에서 다운로드 후 `PATH`에 추가한다.

```bash
$ curl -sLo/tmp/win32yank.zip https://github.com/equalsraf/win32yank/releases/download/v0.0.4/win32yank-x64.zip
$ unzip -p /tmp/win32yank.zip win32yank.exe > /tmp/win32yank.exe
$ mv /tmp/win32yank.exe ~/bin  # 나는 ~/bin을 $PATH에 추가했다.
```

---

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

18.04 -> 20.04로 업그레이드했다. 이슈가 하나 있었는데, WSL보다는 ubuntu 이슈라 봐도 될 듯.

업그레이드를 위해선 `sudo do-release-upgrade -d` 명령어만 입력하면 되는데..

문제는 **설치된 패키지들을 모두 최신 버전으로 업데이트** 해야 된다.

명령어를 통해서 모든 패키지를 업데이트하자:

- `sudo apt update`
- `sudo apt upgrade`
- `sudo apt dist-upgrade`

패키지 업데이트 도중 개인 패키지 저장소인 PPA(Personal Package Archive)를 추가한 적이 있고, 이 PPA가 사라졌으면 에러가 난다.
404로 출력된다. 따라서 업데이트 하지 않도록 PPA를 제거해야 했다.

나는 `CMake`를 PPA를 통해서 설치했었는데. 이 PPA가 사라져서 에러가 발생했다.

```bash
Ubuntu 18.04 ppa.launchpad.net/george-edison55/cmake-3.x/ubuntu bionic Release 404 Not Found [IP: 91.189.95.83 80]
```

제거하기 위해 2가지 방법이 있다.

- 파일을 지운다: `sudo rm /etc/apt/sources.list.d/george-edison55-ubuntu-cmake-3_x-bionic.list`
- 명령어를 통해 지운다: `sudo add-apt-repository --remove ppa:whatever/ppa`

문제는 PPA 이름을 알아야 하는데, 에러 메시지에 출력되지 않는다. 패키지 이름만 포함될 뿐이다. 그냥 에러 메시지로 검색해서 지우는게 속편하다...

이제 `sudo do-release-upgrade -d` 하면 되는데..

```rust
Checking for a new Ubuntu release
You have not rebooted after updating a package which requires a reboot. Please reboot before upgrading.
```

업그레이드 후에는 리붓 해야한다... :(

## Clipboard에서 이미지 붙여넣기

Powershell 명령어를 통해서 클립보드에 있는 이미지를 파일로 저장할 수 있다.

```bash
powershell.exe -NoProfile -Command "(Get-Clipboard -Format Image).Save('sample.png')"
```

Linux 계열인 경우 `xclip` 명령어를 통해서 [생성할 수 있다고 하는데](https://unix.stackexchange.com/a/145134), WSL에서는 동작하지 않는다.

```bash
# image/png 타입이 누락되어 있다.
$ xclip -selection clipboard -t TARGETS -o
TIMESTAMP
TARGETS
UTF8_STRING
TEXT

# 실패한다.
$ xclip -selection clipboard -t image/png -o > /tmp/clipboard.png
Error: target image/png not available
```

## 문제점

[MacOS](./mac-os.md)와 다르게 문제점들이 좀 있다.
대부분 네트워크와 파일 시스템 관련 문제들이다. 발생하면 매우 답답한 문제들인데, 해결될 기미가 보이지 않는다.
만약 WSL 사용을 포기한다면 이 문제들이 큰 이유가 될 것이다.

운영체제 지식이 부족해서 정확한 원인을 알기 어렵다.
특히 윈도우와 리눅스 두 환경을 고려해야 하다보니 관련된 정보를 찾기가 어렵다.

### 윈도우 앱이 오픈한 포트에 WSL에서 접근할 수 없는 문제

윈도우에서 실행한 앱이 포트를 열었을 때, WSL에서 접근할 수 없다.

https://github.com/microsoft/WSL/issues/4619

위 이슈는 이 문제를 2019년에 리포트한 것이다. 하지만 아직도 뚜렷한 해결책이 없다.
수 많은 댓글들이 해결 방법을 제시하고 있지만, 상황에 따라 해결되지 않는 경우가 많아 보인다.

내 경우는 Godot Engine이 6005, 6006 포트를 LSP 서버로 사용하는데, WSL에서 접근할 수 없다.
이외에도 몇몇 앱에서 여는 포트에 접근하지 못했던 기억이 있다.

몇 가지 확인 방법들.

- `Resource Monitor` 윈도우 앱에서, Network 탭 -> Listening Ports에서 모든 포트를 확인할 수 있다.
    - WSL에서 오픈한 포트와 윈도우 앱에서 오픈한 포트는 모두 여기서 확인할 수 있다.
- `cmd`에서 `netstat -ano | find "LISTEN"` 명령어로도 모든 포트를 확인할 수 있다.
    - WSL에서 오픈한 포트와 윈도우 앱에서 오픈한 포트는 모두 여기서 확인할 수 있다.
- WSL에서 `lsof -i` 명령어로 열린 포트를 확인한다.
    - **WSL에서 오픈한 포트만 확인할 수 있다.** 윈도우 앱에서 열린 포트는 노출되지 않는다.
    - 이 명령어로 해결 방법에 대한 검증을 하고있다.
- 방화벽에서 inbound/outbound rule을 확인하라는 글도 있으나, 동작하지 않는다.

### 윈도우 마운트 경로에서 git 명령어가 느려지는 문제

`git status` 등 명령어가 `/mnt` 경로에서 매우 느린 문제이다.

https://github.com/microsoft/WSL/issues/4197

2019년 리포트된 이슈인데, 2024년에도 오픈되어 있다.
대안은 `git.exe`를 설치하고 사용하는 것이다. 즉 두 벌의 binary를 사용하는 것.
하지만 매우 번거롭다. 설정 파일이 분리되며, `git` 명령어를 사용하기 위해선 별도 스크립트를 작성해야 한다.

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

### 해결된 듯한 문제

WSL 버전이 업그레이드되면서 자연스레 해결된 것으로 보이는 것들.

#### http 관련 명령어가 동작하지 않는 문제

아래는 이전에 해결했던 기록이다.
이제 더 이상 발생하지 않는데, `/etc/resolv.conf` 파일은 WSL이 자동으로 생성하고 관리하는 것으로 보인다.

---

`curl` `wget` `docker pull`  `npm install` 등 명령어가 일체 먹히지 않는다.
`git` 등 간접적으로 http를 사용하는 명령어도 동작하지 않는다.

https://github.com/microsoft/WSL/issues/4285#issuecomment-522201021

1. `/etc/wsl.conf` 파일을 만들고 아래 내용을 추가한다.

```
[network]
generateResolvConf = false
```

2. Windows에서 `wsl --shutdown` 실행하고 다시 wsl을 실행한다.
3. `/etc/resolv.conf` 파일을 만들거나, 존재한다면 내용을 아래와 같이 수정하고 2번을 반복한다.

```
nameserver 8.8.8.8
```
