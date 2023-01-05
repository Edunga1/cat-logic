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
