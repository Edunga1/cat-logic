# Architecture

# Robert C. Martin - Clean Architecture and Design

[Clean Architecture and Design](https://amara.org/videos/0AtjY87egE3m/url/1216370/)

2018년 처음 접했을 때 많은 생각을 들었다. 지금은 이 아키텍처 이야기로 책도 나오고 많이 언급된다.
왜 대부분 프로젝트의 구조가 같은지 의문에서 시작한다. 회사마다 관심있는 것은 다른데 왜 같은 구조를 가지는 것인가.
그에 반해 설계 도면은 어떤 건물을 말하는지 알기 쉽다고 한다.

# JUnit A Cook's Tour

https://curlunit.sourceforge.net/doc/cookstour/cookstour.htm

JUnit에 대해서 분석하고 테스트 프레임워크를 어떻게 구축하는지 설명하는 글.
바닥부터 여러 패턴을 적용하고 빌드업하는 글이라 구조를 이해하기 좋다.

**signature pollution**

> The canonical form of collecting parameter requires us to pass the collecting parameter to each method. If we followed this advice, each of the testing methods would require a parameter for the TestResult. This results in a "pollution" of these method signatures. As a benevolent side effect of using exceptions to signal failures we can avoid this signature pollution.

테스트 결과를 수집하기 위해서 각 테스트 메서드에서 수집할 파라미터를 전달 받아야 한다. 이런 이유로 테스트 메서드가 변경되는 것을 signature pollution이라고 한다.

내용은, 테스트 결과를 수집하기 위해서 테스트 메서드를 통해 `TestResult` 객체를 전달하고 전달하하는 대신, 사이드 이펙트지만(하지만 자비로운) Exception으로 실패를 잡음으로써 시그니처 오염을 막겠다고 한다.

비슷한, 피할 수 없는 시그니처 오염의 예로, 비동기처리가 아닐까.
[Javascript](javascript)의 Promise, async function은 사용하는 함수도 Promise나 async function이어야 한다.
[Spring](spring) WebFlux의 `Mono`도 마찬가지다. `block()`을 사용할 수 없기 때문에 계속 전파된다.
[Kotlin](kotlin)의 경우 `runBlocking`으로 언제든지 끝맺을 수 있어서 좋았다.

# Entity Component System (ECS)

**실제 코드를 본 적이 없어서 정리하는 것에 그침**

https://en.wikipedia.org/wiki/Entity_component_system

주로 게임에서 사용하는 구조적 패턴. 데이터 지향적이라고 한다:
> An ECS comprises *entities* composed from components* of data

ESC는 데이터의 구성요소로 이루어진 엔티티로 구성됩니다.

> ... This eliminates the ambiguity problems of deep and wide inheritance hierarchies often found in [Object Oriented Programming](https://en.m.wikipedia.org/wiki/Object-oriented_programming)
 techniques that are difficult to understand, maintain, and extend.

엔티티의 동작은 이해, 유지보수, 확장하기 어렵게하는 객체지향 프로그래밍에서 주로 발견되는 깊고 광범위한 상속 계층의 모호성 문제를 없앱니다.

## 참조

[Unreal Rust 공개 ](https://news.hada.io/topic?id=7345)

> Rust 게임엔진인 Bevy의 Entity Component System(ECS)을 사용

ECS 주제를 추가한 계기.

https://velog.io/@cedongne/Unity-새로운-컴포넌트-시스템-ECS와-Entity

Unity 3D가 ECS를 사용하고 있는 줄 알았는데 아니었다. 21년 기준으로 전환을 진행하고 있다고 한다.

# wine은 어떻게 동작하는가?

https://news.hada.io/topic?id=7661

* 에뮬레이터 방식은 아님. 에뮬레이터는 느리다.
* 윈도우 실행 파일을 읽고, 실행
* 시스템 호출은 라이브러리나 실행 파일에 포함되지 않고 os에서 제공한다. 따라서 커널에서 실행되어야 한다.
* wine의 system dispatcher가 리눅스에서 윈도우 혹은 그 반대로 호출할 수 있도록 스택을 변환한다.
  * 리눅스 → 윈도우 변환은 왜 필요할까? posix에서 윈도우 프로그램을 실행하는 것인데 그 반대로 변환해야 하는 경우가 있는지?