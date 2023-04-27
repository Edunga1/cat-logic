# Mac OS

# `ngrok`을 이용하여 맥에서 Remote Login 하기

공인 IP없이 맥북에 ssh로 접속하기 위해선 중계자가 필수적이다.
`ngrok`이 `hole punching`을 통해서 서버와 클라이언트를 연결하는지는 모르겠지만,
`ngrok`을 사용하면 쉽게 해결할 수 있다.

## 1. 맥북(서버)에서 SSH 리모트 로그인 허용

먼저, 서버가 되는 맥북은 ssh 연결을 허용해야 한다.
`System Preference` -> `Sharing`에서 `Remote Login`을 체크하면,
초록불이 들어오면서 `Remote Login: On`으로 상태가 출력된다.
그리고 `Allow access for`에서 외부 연결에서 사용할 계정을 추가하거나 모두 허용하면 된다.

## 2. `ngrok`을 이용하여 맥북(서버) forwading

접속하려는 PC든 서버가되는 맥북이든 공유기를 사용하여 Private Network 내에 있을거기 때문에,
공인 IP를 가진 누군가를 통해서 연결해야 한다. `ngrok`은 그런 일을 도와준다.
무료고 유용하다.

여기에서 어떤 일들이 가능한지 알 수 있다:<br>
https://ngrok.com/product

맥북(서버)만 설치하면 된다. Homebrew로 쉽게 설치할 수 있다.
```bash
$ brew cask install ngrok
```

처음 설치했다면, ngrok 서비스에 로그인이 필요할 수 있다.
일단 진행해보고 인증받으라고 한다면, 로그인 페이지로 들어가서:<br>
https://dashboard.ngrok.com/user/login

로그인하면, 인증 방법이 나온다. `ngrok authtoken ...`이 나오는 부분을 찾으면 된다.

설치 했으면 ssh port를 ngrok을 통해서 forwarding 되도록 한다.
```bash
$ ngrok tcp 22
ngrok by @inconshreveable

Session Status                online
Account                       username (Plan: Free)
Version                       2.3.25
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    tcp://0.tcp.ngrok.io:18844 -> localhost:22

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

위 화면이 나오면 성공이다.

만약 위에서 ssh remote login 옵션을 허용하지 않았으면 에러가 난다.

## 3. 클라이언트에서 접속하기

`ssh` 명령어로 접속할 수 있다.

```bash
$ ssh username@0.tcp.ngrok.io -p18844
```

`username`은 1번에서 sharing에 허용한 사용자 이름을 입력하면 된다.
`$ whoami` 명령어로도 알 수 있지만.

`18844`는 포트 번호인데, `$ ngroc tcp 22` 출력되는 화면에서 포트번호를 확인할 수 있다.
```bash
...
Forwarding                    tcp://0.tcp.ngrok.io:18844 -> localhost:22
...
```

# Secretive - SSH Key를 Secure Enclave에 저장하는 앱

https://github.com/maxgoedjen/secretive

설치:
```bash
brew install secretive
```

![main](https://github.com/maxgoedjen/secretive/raw/main/.github/readme/app-light.png)

[Secure Enclave](https://support.apple.com/ko-kr/guide/security/sec59b0b31ff/web)는 메인 프로세서와 별도로 격리되어 저장되는 추가적인 보안 계층을 제공한다.

맥북 프로의 경우 T1 칩에 Secure Enclave가 내장되어 있어, 2016년 이후에 출시된 T1, T2 칩을 제공하는 모델에서만 사용할 수 있다.
자세한 동작 원리는 모르지만, 메인 프로세서와 격리된 메모리 영역에 데이터를 저장해서 더 안전하다고 한다.

Secretive는 SSH Key를 Secure Encalve에 저장하는 앱이다.
SSH Key는 앱에서 직접 생성해주는데, 비대칭 암호화 방식의 경우 ECDSA를 사용하고, **개인키는 Secure Enclave에 저장하면서 사용자에게 보여주지 않는다.**

개인키를 보여주지 않는 특징과 함께 수정할 수도 없다.

개발하면서 더 이상 키를 확인할 이유는 왠만하면 없기 때문에 하드디스크 `~/.ssh`에 저장하기 보다는 Secure Enclave에 저장해 둔다면 보안상 더 좋아 보인다.

나같은 경우 GitHub, BitBucket 등에서 사용하는 키를 Secretive로 생성 및 관리하고 있다.

설치하고 `~/.ssh/config`에 아래 내용을 추가해야 한다.

```bash
Host *
  IdentityAgent /Users/johndoe/Library/Containers/com.maxgoedjen.Secretive.SecretAgent/Data/socket.ssh
```

`man ssh_config`에 `IdentityAgent`에 대해 설명되어 있다.
ssh 연결이 발생하면 설정으로 인해 Secretive가 동작하나 보다.

SSH Key에 접근이 필요하면 Touch ID로 인증하거나 알림 배지로 노티를 받거나 설정할 수 있다. 이 기능 때문에 더 안전하다고 느낀다.
인증 방식을 변경하고 싶다면 키를 다시 생성해야 한다. 위에서 언급한 수정할 수 없는 특징 때문이다.
[관련 이슈](https://github.com/maxgoedjen/secretive/issues/424#issuecomment-1465047137)

## Multiple Hosts 사용하기

회사에서 GitHub 개인 계정과 회사 계정을 ssh config로 분리하여 사용하고 있었다:

```bash
Host github.com-edunga
  HostName github.com
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_github_edunga
```

개인 프로젝트의 remote url을 `git@github.com-edunga`로 설정하고 있다.
Secretive 사용하면서 `IdentityFile`만 제외하면 Secretive와 함께 동작한다.

```bash
Host github.com-edunga
  HostName github.com
  User git
  PreferredAuthentications publickey
```

# `arch` 명령어

다른 명령어를 특정 아키텍처 모드로 실행한다.

e.g.

```bash
arch -x86_64 <COMMAND>
```

예를들어 m2 맥북에서 `uname -m`로 확인하면 아키텍처가 `arm64` 이지만:

```bash
❯ uname -m
arm64
```

`arch -x86_64`로 확인하면 `x86_64` 아키텍처로 나온다:

```bash
❯ arch -x86_64 uname -m
x86_64
```

대부분 명령어들이 현재 아키텍처에 따라 적절한 바이너리를 선택하는데, arm64 용 바이너리를 못찾아서 에러가 나는 경우가 있다.
x86_64 아키텍처 바이너리와 호환할 수 있는 경우도 있어서 `arch`로 모드를 변경하여 실행하는 용도로 사용하는 듯 하다.

인자 없이 사용하는 경우 현재 아키텍처를 출력한다:

```bash
❯ arch
arm64
```

`-<ARCHITECTURE>` 옵션은 macos에서만 가능하다. linux에서는 옵션 없이 `arch`만 제공한다.
