<!--toc:start-->
- [명령어 자동완성하기](#명령어-자동완성하기)
  - [Windows](#windows)
  - [OSX](#osx)
- [Git ssh](#git-ssh)
<!--toc:end-->

# 명령어 자동완성하기

서버 터미널에서 `git chec`까지만 타이핑하고 tab 키를 누르면 checkout이 자동 완성 되었다.

심지어 브랜치 이름도 자동 완성된다.

어떻게 그렇게 되는가 찾아보니 터미널 도구를 설치해야 하더라.

여기에 각 OS에 맞게 잘 나와있다.

[https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion](https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion)

## Windows

그냥 git bash for windows 기본 기능으로 지원한다.

## OSX

위 링크데로 Homebrew로 깔아도 안돼서 더 찾아보니..

[https://git-scm.com/book/en/v1/Git-Basics-Tips-and-Tricks](https://git-scm.com/book/en/v1/Git-Basics-Tips-and-Tricks)

git-scm에 다른 방법이 나와있다.

요약하면 git-completion 라는 스크립트를 받아서 .bash_profile 에 등록하면 된다.

# Git ssh

맥에서 Git을 사용하다 보면 특별한 경우가 아닌 이상 한 번 로그인하면 다시 로그인하는 일은 없다.

keychain으로 비밀번호를 관리하는게 아닌가 싶다.

다른 환경에서는 매번 로그인 과정이 필요했다.  

이 때는 github에 ssh public key를 등록하면 된다.

[https://help.github.com/articles/generating-an-ssh-key/](https://help.github.com/articles/generating-an-ssh-key/)

자동 로그인만으로 끝나면 좋겠지만

프로젝트를 `git clone http://....` 로 받았다면 이미 remote url은 http로 되어 있기 때문에

```
git@github.com:<USERNAME>/<REPOSITORY>.git
```

위와 같은 형태로 변경해야 한다.

그렇지 않으면 fetch 등 remote url에 접근할 수 없다.
