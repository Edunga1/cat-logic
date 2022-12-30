# 개요

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
