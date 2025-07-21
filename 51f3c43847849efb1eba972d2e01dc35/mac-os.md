# Mac OS

McIntosh 운영 체제. 보통 *macOS*로 줄여서 부른다.

## 단축키

Finder에서 파일 선택 후 `cmd + option + c`로 파일 경로를 복사한다.\
vim에서 다운로드한 로그 파일을 연다고 할 때 터미널에서 경로를 찾아야 하는데,
대신 브라우저에서 다운로드 폴더를 열고, 단축키로 경로만 복사하는 식으로 사용한다.
이 과정을 더 줄일 수 있으면 좋을텐데.

## 환경 설정

System Settings(System Preferences)의 설정은 커맨드 라인에서 `defaults` 명령어로 변경할 수 있다.

예시로 키 반복 속도와 관련된 설정은 `defaults find keyrepeat`로 검색하여 확인한다.

```bash
$ defaults find keyrepeat
Found 3 keys in domain 'Apple Global Domain': {
    InitialKeyRepeat = 15;
    "InitialKeyRepeat_Level_Saved" = 0;
    KeyRepeat = 1;
}
Found 3 keys in domain 'com.apple.Accessibility': {
    KeyRepeatDelay = "0.25";
    KeyRepeatEnabled = 1;
    KeyRepeatInterval = "0.03333333299999999";
}
```

설정 앱에서 변경하는 값은 범위가 정해져 있는 반면에,
`defaults` 명령어로 변경하는 값은 제한이 없기 때문에 한계를 넘어설 수 있다.

---

- 반복 시작 속도(설정 앱 최소치는 15): `defaults write -g InitialKeyRepeat -int 10`
- 입력 반복 속도(설정 앱 최소치는 2): `defaults write -g KeyRepeat -int 1`
    - [입력 반복 속도 질문](https://apple.stackexchange.com/questions/10467/how-to-increase-keyboard-key-repeat-rate-on-os-x)을 참조했다.
    2(30ms) -> 1(15ms)로 변경하면 매우 빨라져서 쾌적하지만, 커서 이동 정확도가 떨어진다.

## Automator

automator.app은 애플이 제공하는 자동화 도구이다.

운영체제에 내장되어 있다.

이 블로그에서 처음 알게 되었다:\
https://interfacecraft.online/posts/blog/2025/how-i-automated-my-computer-life-with-macos-folder-actions/

### Folder Action

폴더에 파일이 추가되면 실행되는 워크플로우이다.
예를들어 특정 폴더에 이미지 파일을 추가하면, 자동으로 WebP로 변환하는 워크플로우를 만들 수 있다.

워크플로우 생성은 `File -> New`로 `Folder Action`을 선택한다.
`Folder Action receives files and folders added to`에서 액션을 실행할 폴더를 선택한다.

만들어둔 워크플로우는 재사용할 수 있다.

![folder action attachment](./res/mac-os-workflow-folder-action-attachment.png)

아무 폴더나 선택하여 `우클릭 -> Services -> Folder Action Setup` 메뉴에서 관리한다.

#### WebP 변환 워크플로우

폴더에 이미지를 넣으면 WebP로 변환하여, 다운로드 폴더에 저장하는 워크플로우를 만든다.

WebP 변환을 위해서 `cwebp` 명령어가 필요하다: `brew install webp`

1. `Get Specified Finder Items` 액션을 추가
2. `Run Shell Script` 액션을 추가
    `Pass Input`은 `as arguments`로 설정한다.
3. 스크립트를 작성한다. `USERNAME`을 사용자 이름으로 변경.
    ```bash
    for f in "$@"; do
        /opt/homebrew/bin/cwebp -q 70 "$f" -o "/Users/USERNAME/Downloads/$(date +"%Y_%m_%d_%I_%M_%p_%s").webp";
        rm -f "$f"
    done
    ```


이제 이미지 파일을 폴더에 넣으면, WebP로 변환되어 다운로드 폴더에 저장된다.
항상 삭제하기 때문에, WebP의 성공 여부와 관계 없이 원본 파일은 삭제되는 것을 유의.

## Homebrew - 맥용 패키지 관리자

https://brew.sh/

Homebrew로 맥에서 어플리케이션(패키지)을 설치하는 도구이다.
정확히는 Linux 또한 지원한다. linuxbrew로 구분한다.

설치할 수 있는 앱은 크게 2가지로 나뉜다. MacOS 전용 앱과 터미널에서 사용할 수 있는 앱이다.
전자는 `brew cask install`로 설치하고, 후자는 `brew install`로 설치한다.

`brew install wget`과 같이 사용하며, 이건 `wget`을 설치하는 명령어이다.
`wget`를 Homebrew에서는 `formula`라고 부른다:

> Homebrew formulae are simple Ruby scripts

`brew info formula`로 패키지를 확인할 수 있다.

```bash
$ brew info mysql
==> mysql: stable 8.1.0 (bottled)
Open source relational database management system
https://dev.mysql.com/doc/refman/8.0/en/
Conflicts with:
  mariadb (because mysql, mariadb, and percona install the same binaries)
  percona-server (because mysql, mariadb, and percona install the same binaries)
/opt/homebrew/Cellar/mysql/8.1.0 (325 files, 308.4MB) *
  Poured from bottle using the formulae.brew.sh API on 2023-09-20 at 16:33:49
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/m/mysql.rb
License: GPL-2.0-only with Universal-FOSS-exception-1.0
==> Dependencies
Build: bison ✘, cmake ✘, pkg-config ✔
Required: icu4c ✔, libevent ✔, libfido2 ✔, lz4 ✔, openssl@3 ✔, protobuf@21 ✔, zlib ✔, zstd ✔
==> Caveats
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default
```

패키지 출처 사이트, 패키지 버전, 의존성, 설치 시 주의사항 등이 포함되어 있다.

패키지의 버전 관리를 제공하지 않는다.
이전에는 `versions` 명령어로 이전 버전을 설치할 수 있었지만, 현재는 최신 버전만 제공한다.
또는 `node@18` 과 같이 Homebrew에서 명시적으로 버전을 제공하는 경우만 설치할 수 있다.

### 동작 원리

패키지는 공용 저장소인 [homebrew-core](https://github.com/Homebrew/homebrew-core)에서 관리한다.
Ruby 스크립트로 설치 정보를 명세한다.

`brew tap <repo>`로 다른 저장소를 추가하여 공용 저장소에 없는 패키지를 설치할 수 있다.

재밌는 점은 Homebrew의 수많은 패키지가 파일으로 관리되고 있는데,
패키지가 새롭게 추가 되거나 업데이트 되면 Git commit이 발생하는 것이다.
그래서 공용 저장소의 커밋 수는 2023년 6월 기준 37만개가 넘는다.
가장 활발한 저장소 중 하나일 것이다.

[PR](https://github.com/Homebrew/homebrew-core/pulls)을 올리면 Hoembrew 메인테이너 또는 멤버가 리뷰하고 자동화 테스트를 통과하면 봇이 자동으로 머지한다.

### Brewfile

`Brewfile`은 패키지를 관리하는 파일이다.

`brew bundle dump`로 현재 설치된 패키지를 `Brewfile`에 저장할 수 있다.

```bash
$ brew bundle dump
$ cat Brewfile
tap "homebrew/bundle"
tap "homebrew/core"
tap "spring-io/tap"
tap "universal-ctags/universal-ctags"
brew "xz"
brew "zstd"
brew "bzip2"
brew "krb5"
brew "libtirpc"
brew "libnsl"
brew "pcre2"
brew "sqlite"
brew "util-linux"
```

단, 자동 생성하면 의존성의 의존성까지 모두 저장되어 불편하다.
나같은 경우는 직접 파일을 생성하여 관리한다: https://github.com/Edunga1/dotfiles/blob/main/Brewfile

## `ngrok`을 이용하여 맥에서 Remote Login 하기

공인 IP없이 맥북에 ssh로 접속하기 위해선 중계자가 필수다.
`ngrok`이 `hole punching`을 통해서 서버와 클라이언트를 연결하는지는 모르겠지만, 쉽게 로그인 할 수 있게 도와준다.

여기에서 ngrok으로 어떤 일들이 가능한지 알 수 있다:\
https://ngrok.com/product

Homebrew로 ngrok을 설치할 수 있다.

```bash
$ brew cask install ngrok
```

### 1. 맥북(서버)에서 SSH 리모트 로그인 허용

먼저, 서버가 되는 맥북은 ssh 연결을 허용해야 한다.
`System Preference` -> `Sharing`에서 `Remote Login`을 체크하면,
초록불이 들어오면서 `Remote Login: On`으로 변경된다.
그리고 `Allow access for`에서 외부 연결에서 사용할 계정을 추가하거나 모두 허용하면 된다.

### 2. `ngrok`을 이용하여 맥북(서버) forwarding

접속하려는 기기든 서버가 되는 맥북이든 공유기를 사용하여 Private Network 내에 있을 것이기 때문에,
공인 IP를 가진 누군가를 통해서 연결해야 한다.

처음 설치했다면, ngrok 서비스에 로그인이 필요할 수 있다.
일단 진행해보고 인증받으라고 한다면, 로그인 페이지로 들어가서:\
https://dashboard.ngrok.com/user/login

로그인하면, 인증 방법이 나온다. `ngrok authtoken ...`이 나오는 부분을 찾으면 된다.

ssh port를 ngrok을 통해서 forwarding 되도록 한다.
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

만약 위에서 ssh remote login 옵션을 허용하지 않았으면 에러가 발생한다.

### 3. 클라이언트에서 접속하기

`ssh` 명령어로 접속할 수 있다.

```bash
$ ssh username@0.tcp.ngrok.io -p18844
```

`username`은 1번에서 sharing에 허용한 사용자 이름을 입력하면 된다.

`18844`는 포트 번호인데, `ngroc tcp 22` 명령으로 포트번호를 확인할 수 있다.

```bash
...
Forwarding                    tcp://0.tcp.ngrok.io:18844 -> localhost:22
...
```

## Secretive - SSH Key를 Secure Enclave에 저장하는 앱

https://github.com/maxgoedjen/secretive

설치:
```bash
brew install secretive
```

![main](https://github.com/maxgoedjen/secretive/raw/main/.github/readme/app-light.png)

[Secure Enclave](https://support.apple.com/ko-kr/guide/security/sec59b0b31ff/web)는 메인 프로세서와 별도로 격리되어 저장되는 추가적인 보안 계층을 제공한다.

맥북 프로의 경우 T1 칩에 Secure Enclave가 내장되어 있어, 2016년 이후에 출시된 T1, T2 칩을 제공하는 모델에서만 사용할 수 있다.
자세한 동작 원리는 모르지만, 메인 프로세서와 격리된 메모리 영역에 데이터를 저장해서 더 안전하다고 한다.

Secretive는 SSH Key를 Secure Enclave에 저장하는 앱이다.
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

### Multiple Hosts 사용하기

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

## `arch` - 아키텍처 출력 또는 특정 아키텍처로 실행하는 명령어

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

## `open` - 파일 및 디렉토리를 여는 명령어

`open .`로 현재 폴더를 열거나, `open README.md`로 특정 파일을 연다.

`-a "Application Name"` 옵션으로 어플리케이션을 열 수 있다.

다음은 구글 크롬을 다른 프로파일로 여는 예시:

```bash
open -n -a "Google Chrome" --args --profile-directory="Profile 2"
```

- `-n`: 새로운 인스턴스를 생성한다. 이게 없으면 기존에 열려있는 크롬으로 스위칭만 한다.
- `-a "Google Chrome"`: 어플리케이션 이름으로 실행하는 옵션.
- `--args`: 이 옵션의 인자는 실행하는 어플리케이션으로 전달된다.
- `--profile-directory`: 따라서 이 옵션은 구글 크롬에서 지원하는 옵션.
  - 프로파일 위치는 `~/Library/Application\ Support/Google/Chrome` 여기서 확인할 수 있다.

회사 어플리케이션을 테스트하기 위해서 프로파일 2개 이상 만들어두고 사용하는데,
매번 여는 것이 불편해서 다음과 같이 명령어로 만들어 두고 사용하고 있다:

```
#!/bin/bash

open -n -a "Google Chrome" --args --profile-directory="Profile 1"
open -n -a "Google Chrome" --args --profile-directory="Profile 2"
```

명령어는 `~/bin/devchrome`과 같이 저장했다.
이제 `devchrome`만 입력하면 2개 크롬이 함께 열린다.

`-a` 옵션은 문자열을 받는데, `-b`는 번들 식별자를 사용한다: `open -b com.google.Chrome`

번들 ID를 알려면: `osascript -e 'id of app "Google Chrome"'`

`--args` 옵션은 어플리케이션에 전달할 인자로 보인다.
`--profile-directory`에 사용할 값은 `~/Library/Application Support/Google/Chrome/`에서 찾을 수 있다.
문제는 프로파일 이름을 한글로 바꾸면 경로에서는 확인되는데, `--profile-directory`에는 인식이 안된다.
`Profile 6` 등 기본 이름의 폴더가 있으니 그걸 찾아서 사용해야 한다.

## displayplacer - 멀티 모니터 설정 관리 도구

https://github.com/jakehilborn/displayplacer

`displayplacer` 명령어로 모니터 해상도와 배열을 변경한다.

내 경우 아침마다 맥북을 열면 오른쪽과 왼쪽 모니터의 배열이 변경되어 다시 설정에서 정렬해야 문제가 있었다.

`displayplacer list`를 입력하면 조합 가능한 목록을 보여주고, 현재 설정값을 보여준다:

```bash
$ displayplacer list
Persistent screen id: 364EA7DB-CF15-4E52-95AC-E3162BC3D207
Contextual screen id: 2
Serial screen id: s828000585
Type: 27 inch external screen
Resolution: 1440x2560
Hertz: 60
Color Depth: 8
Scaling: off
Origin: (0,0) - main display
Rotation: 270
Enabled: true
Resolutions for rotation 270:
  mode 0: res:600x800 hz:75 color_depth:8
  # ... 많아서 생략 ...
  mode 65: res:600x960 hz:60 color_depth:8 scaling:on
  mode 66: res:768x1024 hz:60 color_depth:8
  mode 67: res:720x1280 hz:60 color_depth:8
  mode 68: res:720x1280 hz:60 color_depth:8
  mode 69: res:900x1600 hz:60 color_depth:8
  mode 70: res:1200x1600 hz:60 color_depth:8
  mode 71: res:1080x1920 hz:60 color_depth:8
  mode 72: res:1080x1920 hz:60 color_depth:8
  mode 73: res:1200x1920 hz:60 color_depth:8

Execute the command below to set your screens to the current arrangement. If screen ids are switching, please run `displayplacer --help` for info on using contextual or serial ids instead of persistent ids.

displayplacer "id:364EA7DB-CF15-4E52-95AC-E3162BC3D207 res:1440x2560 hz:60 color_depth:8 enabled:true scaling:off origin:(0,0) degree:270" "id:37D8832A-2D66-02CA-B9F7-8F30A301B230 res:1512x982 hz:120 color_depth:8 enabled:true scaling:on origin:(1440,758) degree:0" "id:5E23DF76-B6A9-4F07-A6A5-F748C75B6E0C res:1440x2560 hz:60 color_depth:8 enabled:true scaling:off origin:(-1440,0) degree:90"
```

마지막 줄이 현재 설정된 값을 적용할 수 있는 명령어인데, 복사해두고 아침마다 입력하여 배열을 복구하고 있다.

## 불편한 점

### 웹 링크와 크롬 프로필 문제

Incognito 모드 창이나 다른 프로필 창이 필요해서 여러개의 크롬 창을 사용하는 경우가 있다.
이때 이메일이나 슬랙 등 브라우저 외부에서 링크를 클릭하면, 원치않는 창에서 열리는 문제가 있다.

검색해 보면 링크는 항상 가장 마지막에 사용된 창에서 열린다고 한다.
사용해 보면 그렇지만은 않은 게, 듀얼 모니터로 각 창을 띄워두고 마지막 포커스를 기본 프로필 창으로 둬도 링크는 엉뚱한 창에서 열린다.

[레딧 글](https://www.reddit.com/r/MacOS/comments/136uodg/open_links_in_different_chrome_profiles/)에 따르면 [Velja](https://apps.apple.com/us/app/velja/id1607635845) 앱이 이 문제를 해결해준다고.
다만 유료 앱이다.

브라우저를 선택할 수 있도록 하는 무료 앱인 [browserosaurus](https://github.com/will-stone/browserosaurus)는 크롬 프로필은 지원하지 않는다.
프로젝트의 [이슈 #56](https://github.com/will-stone/browserosaurus/issues/56)을 보면, 프로필 선택을 지원하려다가 최종 미지원하는 것으로 최종 결정되었다.
어쟀든 browserosaurus는 맥의 기본 브라우저를 browserosaurus로 변경하면 링크를 열 때 선택할 수 창이 뜨는 아이디어로 동작한다.
