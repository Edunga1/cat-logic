# Git

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

# 깃 커밋 해시 충돌에 관하여

갑자기 커밋 해시는 어떤 정보를 기반하여 만들어지는지 궁금했다.
커밋 해시는 커밋 `git commit` 할 때 생성되고,
주로 커밋 해시로 파일들을 특정 상태로 맞추는데 `git checkout` 사용한다.

그런데 커밋 할 때 해시가 충돌하지는 않을까? 싶어서 찾아봤다.

먼저, [git-scm](https://git-scm.com/book/ko/v1/Git-도구-리비전-조회하기)의 글
[SHA-1 해시 값에 대한 단상](https://git-scm.com/book/ko/v1/Git-%EB%8F%84%EA%B5%AC-%EB%A6%AC%EB%B9%84%EC%A0%84-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0#SHA-1-%ED%95%B4%EC%8B%9C-%EA%B0%92%EC%97%90-%EB%8C%80%ED%95%9C-%EB%8B%A8%EC%83%81)에서
걱정에 대한 현실적인 조언을 해 준다. 또 실제로 발생하면 어떤 일이 일어나는지 알려준다.

### https://www.facebook.com/iamprogrammer.io/posts/1379005945454259

그래도 운이 정말 나빠서, 해시 충돌이 나는 것이 우려된다면 리누스 토발즈도 이 이슈에 대해 언급했다.
아쉽게도 원글이 있던 google+가 종료되어 볼 수 없지만 예전에 올라온 나프다 게시글에 누군가 요약해 주었다.

사람이 소스코드의 변경을 지켜보고 있기 때문에 괜찮고, 또 대안은 있다고..

### https://stackoverflow.com/questions/9392365

사실 가장 먼저 본 글은 SO의 글이다.
[답변](https://stackoverflow.com/questions/9392365/how-would-git-handle-a-sha-1-collision-on-a-blob/34599081#34599081)에서,
기발하게도 해시 사이즈를 4-bit로 줄여서 실제로 재현했다. `push`, `clone` 할 때 에러가 난다.

### https://stackoverflow.com/questions/34764195

커밋 해시가 무엇으로 결정되는지 알려주는 SO 글. 부모 커밋, 커미터, 메시지 등.

### https://www.codentalks.com/t/topic/2973

> 뻘글) git 불안해서 못쓰겟음니다 -.-;

찾다가 나온 유머글 ㅎㅎ. [덧글에 있는 만화](https://www.codentalks.com/uploads/default/original/2X/9/98fa43031c7cfbf44c714ad5819ea504ef37e70c.jpg)처럼
걱정, 우려만 해서는 안되겠다.

### https://zariski.wordpress.com/2017/02/25/sha-1-%EC%B6%A9%EB%8F%8C/

sha1 충돌 이슈에 설명. 해시에 대한 기초 설명, 구글이 sha-1 충돌 재현에 대한 주변 설명.

### https://www.mathstat.dal.ca/~selinger/md5collision

이 글엔 실제로 다른 파일인데 같은 MD5 sum을 가진 예제를 제공한다.
근데 다운받아보면 실행도 안되고, 바이너리지만 열어보면 내용도 같아 보이는데.. 심지어 파일 크기도 같다 :(

# `git rebase -i`

https://meetup.toast.com/posts/39

여러개의 커밋을 묶는데, `git reset HEAD~#` 후 다시 커밋을 생성하는 방법도 있지만,
여러개의 커밋을 남겼을 경우, 메시지들이 사라진다는 단점이 있다.
애초에 일련의 과정이 아니라, 수동으로 처리하는 행동 자체에서 꺼림칙함을 느낀다.

위 글은 `git rebase -i`를 이용하여 어떤 커밋을 하나로 합칠지 알려준다.
하지만 정말 유용한 기능 하나가 빠져있는데, 커밋 순서를 정렬할 수 있는 것이다.
이는 `git rebase -i`하면 나오는 설명에도 나온다
`These lines can be re-ordered;`

각 커밋을 의미하는 라인을 다시 정렬하면 git history가 그렇게 바뀐다.

예를들어 A라는 작업과 B라는 작업이 있다.
A는 기능 하나를 추가하는 것이고, B는 A 작업을 하다보니 파일을 옮기고, 스타일을 바꾸는 작업들을 했다.

```bash
* 5d31146 (HEAD -> master) A2
* 90bb25a B
* b94056d A1
* 5fc47ec A
* 325da60 init
```

문제는 A 작업을 처리하기 위해서 3개의 커밋을 남겼는데, 그 사이에 B 작업이 껴 있을 때다.

이 때 `git rebase -i 325da60` 수정할 수 있는 화면이 뜬다.

```bash
pick 5fc47ec A
pick b94056d A1
pick 90bb25a B
pick 5d31146 A2

# Rebase 325da60..5d31146 onto 325da60 (4 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

내가 원하는 히스토리는

```
B
A
init
```

이런 순서다.

밑에 커밋이 위로 합쳐지므로, 다음과 같이 바꾼다.

```bash
pick 5fc47ec A
squash b94056d A1
squash 5d31146 A2
pick 90bb25a B

# Rebase 325da60..5d31146 onto 325da60 (4 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

B를 가장 밑으로 빼고, A1과 A2는 squash로 바꾼다. 이러면 A와 B만 남는다.

이제 저장하고 나오면..

```bash
# This is a combination of 3 commits.
# This is the 1st commit message:

A

# This is the commit message #2:

A1

# This is the commit message #3:

A2

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Mar 25 22:49:24 2019 +0900
#
# interactive rebase in progress; onto 325da60
# Last commands done (3 commands done):
#    squash b94056d A1
#    squash 5d31146 A2
# Next command to do (1 remaining command):
#    pick 90bb25a B
# You are currently rebasing branch 'master' on '325da60'.
#
# Changes to be committed:
#	modified:   README
#
```

A + A1 + A2에 대한 커밋 메시지를 작성하게 된다.

```bash
A

- 1
- 2
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Mar 25 22:49:24 2019 +0900
#
# interactive rebase in progress; onto 325da60
# Last commands done (3 commands done):
#    squash b94056d A1
#    squash 5d31146 A2
# Next command to do (1 remaining command):
#    pick 90bb25a B
# You are currently rebasing branch 'master' on '325da60'.
#
# Changes to be committed:
#	modified:   README
#
```

위처럼 커밋메시지를 작성하고, `log`를 보면 의도한대로 정리된 것을 볼 수 있다.

```bash
$ glog
* e3c5f82 (HEAD -> master) B
* aa6f7ef A
* 325da60 init
```

만약 A와 B가 같은 파일을 작업하게 되면, 당연하게도 conflict 발생한다.

# `git revert -m`

`-m`, `--mainline` 옵션은 merge commit을 되돌리는데 사용한다. merge는 2개의 커밋을 병합하는 것이므로, 둘 중 어느 상태로 돌릴 것인지 결정해야 한다.

> Usually you cannot revert a merge because you do not know which side of the merge should be considered the mainline. - `git revert --help`

따라서 사용법은 다음과 같다: `git revert -m 1` or `git revert -m 2`

revert는 새 커밋에 되돌리는 작업이 포함되므로 history로는 어떤 커밋을 선택했는지 알 수 없다.

친절하게도 커밋 메시지에 둘 중 어떤 커밋으로 되돌아가는지 알려준다:

```
Revert "Add a feature"

This reverts commit 5c54ea679164eaca0bab639667bfcebb88769e63, reversing
changes made to b73ce1b168428a561e2dbcac96f97defaffa0e36.
```

`5c54ea` 되돌려서 parent commit 중 하나인 `b73ce1`로 돌아간다. 물론 새로운 커밋이기 떄문에 hash는 별개다.

# `git log --graph`

TL;DR

- `--date-order` 로 그래프를 정렬하는데 힌트를 줄 수 있다.
- `--author-date-order` 로 작성자 및 날짜 정렬
- 옵션에 대한 정보: https://git-scm.com/docs/git-log#_commit_ordering
- 기본 값은 `--topo-order`로 보인다.

## `--date-order` 로 피라미드 그래프 방지하기

```bash
git log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold red)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(cyan)<%an>%C(reset)%C(bold yellow)%d%C(reset)' --all
```

git log를 그래프로 보기위해 이렇게 사용 중이다.

문제는 `staging -> master` 머지 커밋이 아래 이미지와 같이 피라미드로 보여진다.

![pyramid graph](res/git-log-graph-pyramid.png)

머지 커밋의 경우 2개의 부모를 가지고 있기 때문에, 두 부모 중 어느 것을 우선적으로 보여줄 지 힌트가 없다.
따라서 피라미드로 보여지는 것으로 추정한다.

`--date-order` 옵션을 추가하여, 시간 기준으로 보여주도록 옵션을 주면 완화된다:

```bash
git log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold red)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(cyan)<%an>%C(reset)%C(bold yellow)%d%C(reset)' --all --date-order
```

![with --date-order](res/git-log-graph-date-order.png)

### 옵션 설명

`git log --help` 에서 정렬과 관련된 내용을 확인하면 어떻게 정렬 방법에 대해서 설명하고 있다.

```bash
Commit Ordering
       By default, the commits are shown in reverse chronological order.

       --date-order
           Show no parents before all of its children are shown, but otherwise show commits in the commit timestamp order.

       --author-date-order
           Show no parents before all of its children are shown, but otherwise show commits in the author timestamp order.

       --topo-order
           Show no parents before all of its children are shown, and avoid showing commits on multiple lines of history intermixed.

           For example, in a commit history like this:

                   ---1----2----4----7
                       \              \
                        3----5----6----8---

           where the numbers denote the order of commit timestamps, git rev-list and friends with --date-order show the commits in the timestamp order: 8 7 6 5 4 3 2 1.

           With --topo-order, they would show 8 6 5 3 7 4 2 1 (or 8 7 4 2 6 5 3 1); some older commits are shown before newer ones in order to avoid showing the commits from two
           parallel development track mixed together.
```

`--topo-order`에 대한 내용을 보면

```bash
                   ---1----2----4----7
                       \              \
                        3----5----6----8---
```

위 그래프가 있을 때, 숫자는 시간 순서로 작성되었다고 하자.

- `--topo-order` 8 6 5 3 7 4 2 1 순서로 표기한다.
- `--date-order` 8 7 6 5 4 3 2 1 순서로 표기한다.

## `--date-order` 와 `--author-date-order` 비교

![--date-order and --author-date-order comparison](res/git-log-graph-author-date-order-comparison.png)

왼쪽이 `--date-order` 오른쪽이 `--author-date-order`이다.

# Troubleshooting

## Git commit 시 "Waiting for your editor to close the file..." 메시지와 함께 커밋이 안되는 문제

아직 해결하지 못했다.

`git commit -v`로 커밋 메시지 작성 후 `ww` 또는 `:wq`로 저장하여 나와도 커밋이 안된다.
약 3번 중 1번 꼴로 발생한다.

`nvim` 사용중이고, `git config --global core.editor` 설정해도 계속 발생한다.
Windows 10 WSL 2와 M2 맥북 모두에서 발생하고 있어서, 내 vim 설정 문제도 고려중인데.. 최근에는 플러그인 제거만 했다.

```bash
❯ g commit -v
hint: Waiting for your editor to close the file... error: There was a problem with the editor 'nvim'.
Please supply the message using either -m or -F option.
```

vim으로 작업하는 경우에는 발생하지 않는다. 오직 커밋 메시지 작성 시에만 발생한다.

**플러그인 문제?**

플러그인의 문제일 확률이 높아 보인다.
`.vimrc`를 임시로 제거해서, 거의 vanilla 상태로 테스트해보니 발생하지 않는다.

**연속으로 발생하는 경향**

`echo "a" >> a && git add -A && git commit -v` 반복하여 테스트하는데,
첫 라인을 띄워놓고 둘째 라인부터 메시지를 작성하면 발생할 확률이 높다.
또한 바로 다음 커밋에서도 같은 방식을 사용하면 거의 무조건 발생한다.
