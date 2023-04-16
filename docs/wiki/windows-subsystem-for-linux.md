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
