---
created: 2023-01-11
---
# Linux

오픈소스 기반의 운영체제.

이 문서 레벨은 아주 낮다.
[Realtime Linux](https://news.hada.io/topic?id=16860) 라던가,
[리눅스 커널](https://news.hada.io/topic?id=4080) 같은 것은 모른다.
리눅스와 관련된 아티클을 읽으면서 흥미로운 내용을 정리하는 수준으로 작성한다.

## systemd

pid 1번으로 실행되는 프로세스. 0번이 있기 때문에 2번째로 실행되는 프로세스다.

유닉스 기반 시스템에는 [init](https://ko.m.wikipedia.org/wiki/Init) 이라는 모든 프로세스의 부모이자 시작을 관리하는 프로세스가 있는데, 이를 대체한다고 한다.
[위키](https://ko.m.wikipedia.org/wiki/Init)에는 systemd가 init의 대안이라고 나와있다.

소스코드는 깃허브에 공개되어 있다: https://github.com/systemd/systemd

저장소에서 인상적인 점은 [ARCHITECTURE.md](https://github.com/systemd/systemd/blob/main/docs/ARCHITECTURE.md) 파일의 내용이다.
이 파일은 폴더 구조와 테스트 방법 등 처음 프로젝트를 접하는 사람을 위한 내용을 담고 있다. linux의 핵심적인 프로세스의 저장소이고, 설명을 잘하고 있어서 본보기로 삼아서 볼만하다고 생각한다.

**전체 레이아웃**

```bash
.
├── src
│   ├── basic
│   ├── fundamental
│   ├── libsystemd
│   ├── shared
│   ... 4 shared folders
│   ├── ask-password
│   ├── backlight
│   ├── battery-check
│   ├── binfmt
│   ├── boot
│   ... many components
```

* `src/` 폴더 내에 모든 소스코드가 위치한다.
* 많은 폴더가 있지만 크게 2분류인데, 각 컴포넌트에서 공유되는 4개의 폴더와 그 외 폴더로 나눌 수 있다. 4개 폴더는 공유 코드라 부른다.
  * `src/basic/`와 `src/fundamental/`의 코드는 다른 모든 코드로부터 사용되는 초석인 코드이다.
  * `src/libsystemd/`는 `libsystemd.so` 공유 라이브러리를 구현하는 코드인데, 위 코드를 사용한다.
  * `src/shared/`는 공유 라이브러리로 expose되는 컴포넌트들에서 사용되는 유틸리티와 코드를 제공한다.
* 위 공유 코드들은 다른 코드들의 초석이 되므로 외부의 코드를 사용할 수 없는데, 공유 코드간에도 의존 방향이 존재한다.
  * `fundermental` <- `basic` <- `libsystemd` <- `shared`
  * 즉 `fundermental`은 자체 내부 코드만 사용할 수 있고, 다른 모든 공유 코드도 사용할 수 없다.
  * `shared`는 안쪽의 3개 공유 코드를 사용할 수 있다. 하지만 그 외부는 사용할 수 없다.
* `src/core/`는 systemd 서비스 매니저의 메인 로직을 구현한다.
* `src/core/bpf/`는 PID 1에서 사용된다.
* `src/udev/`는 [udev](https://ko.wikipedia.org/wiki/Udev) 데몬 및 CLI 도구를 구현한다.

**유닛 테스트**

* 유닛 테스트 코드는 `src/test/`에 위치한다.
* 각 테스트 파일은 해당 모듈을 실행할 수 있도록 독립적으로 컴파일된다.
* 대부분 테스트는 어떤 유저로든 실행할 수 있지만, 몇몇 테스트는 권한이 필요하며, 필요한 권한을 명확하게 로깅 시도한다.
* 테스트들은 독립적(self-contained)이며 일반적으로 side-effect 없이 호스트에서 실행된다.
* 이상적으로 `src/basic`과 `src/shared`는 `src/test/`내에 대응하는 테스트가 있어야 한다.
* Fuzzer는 외부 입력으로부터 실행하는 유닛테스트의 일종이다.
* `test/fuzz/`(src 외부의 test 폴더)는 fuzzer를 위한 입력 데이터가 있다.
  * 해당 폴더에는 leak, crash를 일으켰던 입력 샘플같은 실제 입력 예시를 가지고 있는 것으로 보인다.
* `test/fuzz/*/` 폴더는 짧고, 의미있는 이름을 사용해야 한다.

**통합 테스트**

* `src/TEST-*` 패턴으로 위치하며, 프로젝트가 제공하는 실행 파일, 라이브러리, 데몬의 시스템 레벨 테스트를 구현한다.
* 실행하기 위한 권한이 필요하며, 호스트에서 직접 실행하면 안전하지 않다. 따라서 기본적으로 이미지를 빌드하여 `qemu` 또는 `systemd-nspawn`을 통해 테스트를 실행한다.
  * 이는 유닛테스트와 대비된다. side-effect가 발생하는 것으로 보인다.
* 대부분은 `qemu` 보다 더 빠른 `systemd-nspawn`를 통해서 실행될 수 있어야 한다.

## Debian

### dpkg - Debian package manager

`apt`로 패키지를 제공하지 않고 `.deb` 파일로 설치해야 한다면 `dpkg`를 사용한다.

ripgrep의 설치 예시:

```bash
$ curl -LO https://github.com/BurntSushi/ripgrep/releases/download/12.1.1/ripgrep_12.1.1_amd64.deb
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   648  100   648    0     0   2197      0 --:--:-- --:--:-- --:--:--  2204
100 1416k  100 1416k    0     0   687k      0  0:00:02  0:00:02 --:--:-- 1138k

$ sudo dpkg -i ripgrep_12.1.1_amd64.deb
[sudo] password for pair:
Selecting previously unselected package ripgrep.
(Reading database ... 214762 files and directories currently installed.)
Preparing to unpack ripgrep_12.1.1_amd64.deb ...
Unpacking ripgrep (12.1.1) ...
Setting up ripgrep (12.1.1) ...
Processing triggers for man-db (2.6.7.1-1ubuntu1) ...

$ rg
error: The following required arguments were not provided:
    <PATTERN>

USAGE:

    rg [OPTIONS] PATTERN [PATH ...]
    rg [OPTIONS] [-e PATTERN ...] [-f PATTERNFILE ...] [PATH ...]
    rg [OPTIONS] --files [PATH ...]
    rg [OPTIONS] --type-list
    command | rg [OPTIONS] PATTERN

For more information try --help
```

### 2024 데비안 컨퍼런스가 한국에서 열린다

https://news.hada.io/topic?id=12440

다음은 데비안 메일링 리스트 내용:\
https://lists.debian.org/debconf-announce/2023/12/msg00000.html

한국의 부산, 포루투갈의 아베이루, 영국의 버밍엄, 프랑스의 브레스트가 후보지였다.

각 지역에 대한 소개 페이지가 있는데, 부산은 다음과 같다:\
https://wiki.debian.org/DebConf/24/Bids/Korea

인상 깊은 점이 몇 개 있는데. 아마도 한국 관계자분이 작성하신 듯.

> Payment is easy in Korea.
> - Credit cards are accepted virtually everywhere. No cash required.
> - No additional tips or tax. You pay exactly as much as the written prices, which include all of tax and service fees.

팁과 세금이 없다는 점. 표기된 가격 그대로 지불하면 된단다.

> It's safe and convenient metropolis.
> - One of the lowest crime rate
> - Well-lit streets and many shops open late at night.
> - Its public transportation is excellent and easy to use.

안전하다고 한다. 범죄율이 가장 낮은 곳 중 하나이고, 늦게까지 영업하며, 대중교통이 편리하단다.

음식에 대한 설명도 있다.

> Partake in timeless classics such as Bibimbap, a harmonious blend of rice, fresh vegetables, and savory sauces, or savor the fermented richness of Kimchi, a ubiquitous side dish that imparts a piquant zest to any meal. Revel in the crispiness of Jeon, savory pancakes abundant with vegetables, or luxuriate in the comforting warmth of Sundubu Jjigae, a spicy tofu stew.

이제는 외국인도 익숙할만한 비빔밥도 있고, 순두부찌개에 대한 내용이 있어서 재밌다.

위치는 부산 부경대학교이다. 허락만 된다면 구경해보고 싶다.

---

25번째 데비안 컨퍼런스는 2024년 7월 28일부터 8월 4일까지 부산에서 열린다!

아래 사이트에서 더 자세한 정보를 확인할 수 있다:\
https://debconf24.debconf.org/
