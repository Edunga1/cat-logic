# Windows Subsystem for Linux (WSL)

줄여서 WSL. 윈도우10부터 리눅스를 실행할 수 있다.

# vim 설정

## clipboard 공유

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

다른 플랫폼 설정에 섞이지 않도록 예외처리 하자:
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

# http 관련 명령어가 동작하지 않는 문제

`curl` `wget` `docker pull`  `npm install` 등 명령어가 일체 먹히지 않는다.
`git` 등 간접적으로 http를 사용하는 명렁어도 동작하지 않는다.

https://github.com/microsoft/WSL/issues/4285#issuecomment-522201021

1. `/etc/wsl.conf` 파일을 만들고 아래 내용을 추가한다.

```conf
[network]
generateResolvConf = false
```

2. window에서 `wsl --shutdown` 실행하고 다시 wsl을 실행한다.
3. `/etc/resolv.conf` 파일을 만들거나, 존재한다면 내용을 아래와 같이 수정하고 2번을 반복한다.

```conf
nameserver 8.8.8.8
```

# Ubuntu 버전 업그레이드

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
