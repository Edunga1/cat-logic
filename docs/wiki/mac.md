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
