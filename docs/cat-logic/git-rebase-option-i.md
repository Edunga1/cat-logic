---
id: page-89
time: 2019-03-25 22:39:38
tag: git
---

# `git rebase -i COMMIT`: Squashing

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
