# 터미널에서 Git 명령어 자동 완성

서버 터미널에서 `git chec` 까지만 타이핑하고 tab 키를 누르면 checkout이 자동 완성 되었다.

심지어 브랜치 이름도 자동 완성된다.

어떻게 그렇게 되는가 찾아보니 터미널 도구를 설치해야 하더라.

여기에 각 OS에 맞게 잘 나와있다.

[https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion](https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion)

## Windows

그냥 git bash for windows 기본 기능으로 지원한다.

## Mac

위 링크데로 Homebrew로 깔아도 안돼서 더 찾아보니..

[https://git-scm.com/book/en/v1/Git-Basics-Tips-and-Tricks](https://git-scm.com/book/en/v1/Git-Basics-Tips-and-Tricks)

git-scm에 다른 방법이 나와있다.

요약하면 git-completion 라는 스크립트를 받아서 .bash_profile 에 등록하면 된다.
