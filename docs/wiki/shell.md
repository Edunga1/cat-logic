# Shell 명령어

<!--toc:start-->
- [Shell 명령어](#shell-명령어)
- [`set -ex`](#set-ex)
- [`sed` - 파일 특정 라인만 읽기](#sed-파일-특정-라인만-읽기)
- [`nohup` - 멈추지 않고 명령어 실행하기](#nohup-멈추지-않고-명령어-실행하기)
  - [로그를 실시간으로 확인할 수 있는가?](#로그를-실시간으로-확인할-수-있는가)
  - [터미널을 꺼도 동작하고 있는가?](#터미널을-꺼도-동작하고-있는가)
  - [`nohup`으로 실행한 프로세스를 어떻게 찾아서 끌 수 있는가?](#nohup으로-실행한-프로세스를-어떻게-찾아서-끌-수-있는가)
    - [`ps aux`로 찾아보자](#ps-aux로-찾아보자)
    - [background로 띄운 경우 좀 더 알기 쉬움](#background로-띄운-경우-좀-더-알기-쉬움)
    - [좀 더 똑똑한 방법](#좀-더-똑똑한-방법)
- [.bash**rc** rc의 의미?](#bashrc-rc의-의미)
<!--toc:end-->

# `set -ex`

도커파일이나 스크립트를 보면 `set -ex` 구문이 많이 보인다.

* `-e`: 각 라인의 명령어가 실행될 때 리턴값이 실패를 의미하면 종료한다.
* `-x`: 실행하는 명령어를 출력한다.

디버깅용으로 유용하다 함.

# `sed` - 파일 특정 라인만 읽기

https://unix.stackexchange.com/questions/288521/with-the-linux-cat-command-how-do-i-show-only-certain-lines-by-number

`cat`은 전체라인만 읽지만 `sed -n -e 1,3p -e 10p`은 1~3, 10 라인 읽을 수 있다.

sed, grep, awk 를 이용한 특정 라인 범위 내에서 특정 단어를 포함한 라인으로 좁히고 특정 형태로 출력하도록 조합할 수 있다:

```bash
sed -n -e 1,5446p data.txt | grep false | awk '{print $1}'
```

보통 `sed`는 파일 내용을 수정하고 백업을 만드는데 사용했는데..

`-n`: 입력된 행을 표준 출력으로 보낸다.<br>
`-e`: 여러개의 범위를 지정하려면 `-e`로 구분한다. `sed -n 1,3p data.txt` 이렇게 하나의 범위라면 `-e`는 생략해도 된다.

# `nohup` - 멈추지 않고 명령어 실행하기

`nohup`은 no hangup의 줄임말. 터미널을 종료해도 중지 시그널을 무시하고 진행한다.

---

`nohup` 명령어로 스크립트를 실행하면,
세션이 끊어져도 스크립트가 진행된다는 것만 알았지,
실제로 사용해 본적이 없어서 간단한 예제로 정리.

사용하기 전에 가졌던 의문 3가지

1. 로그를 실시간으로 확인할 수 있는가?
1. 터미널을 꺼도 동작하고 있는가?
1. `nohup`으로 실행한 프로세스를 어떻게 찾아서 끌 수 있는가?

사용방법:

```bash
$ nohup COMMAND
```

*COMMAND* 에 환경변수를 전달하려면:

```bash
$ FOO='foo' nohup COMMAND
```

## 로그를 실시간으로 확인할 수 있는가?

가능 했다. 스크립트의 출력이 `nohup.out`에 저장되고 있었다.
`tail -F nohup.out` 으로 계속 로그를 실시간으로 확인할 수 있다.

## 터미널을 꺼도 동작하고 있는가?

그냥 `&` 없이 실행하면 foregorund로 돈다. `nohup`만 사용한다고해서
background로 빠지지 않는다. 이 상태에서 `ctrl + c`로 빠져나오면
**해당 스크립트가 종료된다.** 그러나 `tmux` 기준으로 윈도우를 닫으면
(터미널을 끈 것과 같은 상황?) 스크립트가 종료되지 않고, 계속 진행된다.

foreground로 돌리면 의미가 줄기 때문에, 보통 `nohup COMMAND &`로
background로 바로 빠져나가는 방식을 사용하는 거 같다.

ref. https://www.cyberciti.biz/tips/nohup-execute-commands-after-you-exit-from-a-shell-prompt.html

## `nohup`으로 실행한 프로세스를 어떻게 찾아서 끌 수 있는가?

### `ps aux`로 찾아보자

*X.* `ps aux | grep nohup` 결과는 없다.

*O.* `ps aux | grep COMMAND` 결과는 있다!

예를 들어 `nohup ./tick.sh`로 실행한 경우 `ps aux | grep tick` 검색하면:

```bash
bash alleb 33723 0.0 0.0 4283996 1252 ?? S 11:16AM 0:00.29 /bin/bash ./tick.sh
```

PID를 알 수 있으므로 `kill -9 33723`으로 종료 가능.

### background로 띄운 경우 좀 더 알기 쉬움

```bash
~/workspace/nohup-test
❯ nohup ./tick.sh &
[1] 10809
appending output to nohup.out

~/workspace/nohup-test
❯ kill -9 10809
[1]  + 10809 killed     nohup ./tick.sh
```

`&`으로 background로 돌리면 PID가 바로 노출되므로, 알 수 있다.
그런데 이걸 기억하고 있을 수는 없잖아?

### 좀 더 똑똑한 방법

```bash
nohup my_command > my.log 2>&1 &
echo $! > save_pid.txt
```

`$!`은 background로 돌린 PID를 저장하고 있으므로 `nohup` 실행 후
`$!`를 파일로 저장하면, 터미널이 종료되어 PID를 찾을 수 없어도, 파일로 남는다.

이렇게 종료할 수 있다: ``kill -9 `cat save_pid.txt` ``

ref. https://stackoverflow.com/questions/17385794/how-to-get-the-process-id-to-kill-a-nohup-process/17389526

# .bash**rc** rc의 의미?

**r**un **c**ommands.

https://superuser.com/questions/173165/what-does-the-rc-in-bashrc-etc-mean<br>
https://en.wikipedia.org/wiki/RUNCOM

`.bashrc`, `.npmrc` 등 자주 보여서 찾아봤다.
