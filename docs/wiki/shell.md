# Shell 명령어

# `man` - 명령어 매뉴얼

어떤 명령이든 `man COMMAND`로 메뉴얼을 확인하자. 내장 명령어라면 대부분 제공한다.

[tldr](https://github.com/tldr-pages/tldr) 도구도 좋다.
브라우저로 검색할 필요 없이 `tldr COMMAND`로 간단한 사용 예제도 볼 수 있다.

Bash에 대한 내용도 `man bash`로 알 수 있다. `if [ -e file ]`에서 `-e`를 모르겠다면 메뉴얼에서 확인할 수 있다.

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

## stdout은 `nohup.out`에 저장된다.

stdout은 `nohup.out`에 저장된다.
명령어가 실행중이라면 `tail -F nohup.out`으로 실시간으로 확인할 수 있다.

## Background Job으로 실행하자.

그냥 `&` 없이 실행하면 foregorund로 돈다. `nohup`만 사용한다고해서 background로 전환되지 않는다.
이 상태에서 `ctrl + c`로 빠져나오면 **스크립트가 종료**된다.

`nohup COMMAND &`로 백그라운드 잡으로 실행하자.

ref. https://www.cyberciti.biz/tips/nohup-execute-commands-after-you-exit-from-a-shell-prompt.html

## `nohup`으로 실행한 프로세스를 종료하는 방법

### `ps aux`로 찾아보자

*X.* `ps aux | grep nohup` 결과는 없다.

*O.* `ps aux | grep COMMAND` 결과는 있다!

예를 들어 `nohup ./tick.sh`로 실행한 경우 `ps aux | grep tick` 검색하면:

```bash
bash alleb 33723 0.0 0.0 4283996 1252 ?? S 11:16AM 0:00.29 /bin/bash ./tick.sh
```

PID를 알 수 있으므로 `kill -9 33723`으로 종료할 수 있다.

### background로 띄운 경우 좀 더 알기 쉽다.

```bash
~/workspace/nohup-test
❯ nohup ./tick.sh &
[1] 10809
appending output to nohup.out

~/workspace/nohup-test
❯ kill -9 10809
[1]  + 10809 killed     nohup ./tick.sh
```

Background Job으로 실행하면 PID가 바로 출력되어 알 수 있다.

### 좀 더 똑똑한 방법

백그라운드로 전환 시 출력되는 PID를 파일로 저장하자.

```bash
nohup my_command > my.log 2>&1 &
echo $! > save_pid.txt
```

`$!`은 background로 돌린 PID를 저장하고 있다.\
터미널이 종료되어 PID를 찾을 수 없어도 파일로 남아있으니 안심이다.

파일의 PID를 읽어들여 종료할 수 있다:
```bash
kill -9 `cat save_pid.txt`
```

ref. https://stackoverflow.com/questions/17385794/how-to-get-the-process-id-to-kill-a-nohup-process/17389526

# .bash**rc** rc의 의미?

Run Commands.

https://superuser.com/questions/173165/what-does-the-rc-in-bashrc-etc-mean<br>
https://en.wikipedia.org/wiki/RUNCOM

`.bashrc`, `.npmrc` 등 자주 보여서 찾아봤다.

# `ping` 명령어

```bash
ping 123.123.123.123
ping www.google.com
```

네트워크 진단 도구. [포트 번호를 받지 않는다. ICMP 메시지를 이용한다.](./network.md)

호스트 전송 실패 예시:
```bash
❯ ping 123.123.123.123
PING 123.123.123.123 (123.123.123.123): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
Request timeout for icmp_seq 3
```

호스트 응답 성공 예시:
```bash
❯ ping www.google.com
PING www.google.com (142.250.199.100): 56 data bytes
64 bytes from 142.250.199.100: icmp_seq=0 ttl=112 time=61.641 ms
64 bytes from 142.250.199.100: icmp_seq=1 ttl=112 time=68.523 ms
64 bytes from 142.250.199.100: icmp_seq=2 ttl=112 time=70.667 ms
64 bytes from 142.250.199.100: icmp_seq=3 ttl=112 time=67.562 ms
```

# readlink

```bash
$ readlink -f `which node`
/home/linuxbrew/.linuxbrew/Cellar/node/19.9.0/bin/node
```

심볼릭 링크를 따라가서 실제 경로를 알 수 있다.

# Tools

## marker - the terminal command palette

![marker sample](res/cli-marker-sample.png)

https://github.com/pindexis/marker

CTRL + SPACE 입력하면 저장한 명령어나 히스토리를 선택할 수 있다.
자주 사용하지만 너무 긴 명령어를 기록하는데 사용한다.
자주 히스토리에서 찾아서 입력하는 명령을 등록해서 사용하면 유용하다.

* `marker mark` - 명령어를 북마크한다.
* `marker remove` - 북마크를 삭제한다.

## Tmuxinator

https://github.com/tmuxinator/tmuxinator

설정 파일을 `~/.config/tmuxinator/`에 저장하여 전역으로 사용하거나
프로젝트별로 `./.tmuxinator.yml`에 저장하여 사용할 수 있다.
개인 프로젝트는 코드베이스에 포함하는 것도 좋겠다.

### 지역적으로 사용할 경우

```yaml
project_name: my-project

windows:
  - editor: vi
  - cli:
  - server: npm run develop
```

```bash
$ tmuxinator  # or tmuxinator start
```

start 시 설정 이름을 생략하면 `./.tmuxinator.yml`을 찾는다.

### 전역적으로 사용할 경우

```yaml
name: my-project
root: ~/workspace/my-project

windows:
  - editor: vi
  - cli:
  - server: npm run develop
```

```bash
$ tmuxinator my-project  # or tmuxinator start my-project
```

start 시 설정 이름을 지정하면 `~/.config/tmuxinator/`에서 `name`을 찾는다.

# parameter fallback (default value)

```
echo ${VARIABLE:-word}
```

`$VARIABLE`이 null 또는 unset 상태면 `word`를 반환한다.

oh-my-zsh의 사용 예시:

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

`$ZSH_CUSTOM`이 없으면 `~/.oh-my-zsh/custom`을 사용한다는 의미.

ref. https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
