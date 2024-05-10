# Kotlin Programming Language

오픈 소스, 정적 타입 언어로 JVM, 안드로이드, JavaScript, WASM, Native를 대상으로 한다.[^1]

[^1]: https://kotlinlang.org/docs/faq.html

## Features

### Scope Functions

https://kotlinlang.org/docs/scope-functions.html


e.g. `run`
```kotlin
val totalPrice = item.run { price * amount }
```

scope functions는 모두 같은 일을 한다.
context object를 어떻게 접근하는 지, 반환 값은 무엇인지에 따라 의미론적으로 맞게 골라서 사용하면 좋다.
예를들어, context object로 추가 로직을 처리하고, 특별히 반환할 것이 없으면 `also`.
context object의 상태로 계산하여 반환하고 싶으면 `let`을 사용하면 의미가 맞다.

어떤 함수를 사용할 지 시나리오를 공식 문서에서 설명한다:  https://kotlinlang.org/docs/scope-functions.html#function-selection

처음 kotlin을 접하는 개발자와 함께 일하면 이 부분에서 유독 많이 이야기하게 된다.
같은 일을 하는 함수가 많이 있으니 말이다. 언제, 어떤 scope function을 사용할 지 계속 이야기한다.
너무 목매지 않는 편이 현명하다.

---

다른 언어로 개발할 때면 scope function이 매우 그리워진다.
특히 웹 개발과 같이 null check가 잦으면 더욱 그렇다.

```typescript
if (foo?.bar?.baz != null) {
  foo.bar.baz.something1()
  foo.bar.baz.something2()
}
```

위 코드처럼 이미 체크된 변수를 다시 사용해야 할 때 scope function가 빛을 발한다.

```kotlin
foo?.bar?.baz?.run {
  something1()
  something2()
}
```

변수이름이 길어질수록 줄바꿈도 생기고 코드도 길어져서 읽기 어려워지는데, scope function은 획기적으로 줄여준다.
계산 결과를 담아야 하는 경우가 생기면 담을 변수를 미리 선언하여 초기화 할 필요가 있으니 더욱 답답해진다.

### 예외 처리

Java와 달리 Kotlin은 checked exception을 지원하지 않는다.
checked exception은 예외 처리를 강제하는 기능이다.

https://kotlinlang.org/docs/exceptions.html#checked-exceptions

코틀린의 공식 문서에 Checked Exception에 대한 언급이 있다:

> Bruce Eckel says this about checked exceptions:
> 
> > Examination of small programs leads to the conclusion that requiring exception specifications could both enhance developer productivity and enhance code quality, but experience with large software projects suggests a different result – decreased productivity and little or no increase in code quality.

작은 프로그램에서는 코드 품질과 생산성을 높일 수 있었지만, 대규모 프로젝트에서는 생산성이 감소하고 코드 품질 또한 적거나 증가하지 않았다고.

## Testing

test framework: [Kotest](https://github.com/kotest/kotest)
mocking: [MockK](https://github.com/mockk/mockk)

junit + mockito 대신 Kotest + MockK를 사용하자.
kotlin의 타입 관련 문제가 없고, kotlin DSL와 infix 함수로 테스트 코드의 가독성이 좋다.

e.g. assertion
```kotlin
name shouldBe "john doe"
3 + 5 shouldBe 8
```

e.g. mocking
```kotlin
every { obj.foo() } returns 'bar'
justRun { obj.bar() }  // Unit 반환하는 경우
```

### Better Specs

https://www.betterspecs.org/

정확한 역사는 잘 모르지만, Ruby 쪽 테스트 도구인 RSpec으로 작성된 테스트 코드 Best Practice 모음이다.
Kotest의 `DescribeSpec` 스타일을 사용하면 RSpec와 유사하게 작성할 수 있다.
테스트 코드 구조도 참고하면 도움이 많이 된다. 큰 구조는 `describe` `context` `it` 3개의 범위로 이루어진다.

e.g. 테스트 코드 예시
```kotlin
class BuyerSendingAddressServiceTest : DescribeSpec({
  describe("add 함수는") {
    beforeEach { /** 각 컨테이너 이전에 실행 할 코드. */ }
    /** 여기는 context 이전에 실행된다. */

    context("3과 5를 입력하면") {
      it("8을 반환한다.") {
        add(3, 5) shouldBe 8
      }
    }
  }
})
```

### Kotest

https://kotest.io/docs/framework/testing-styles.html

Kotest는 테스트 레이아웃을 다양한 스타일로 표현할 수 있다.
내가 자주 사용하는 스타일은 `DescribeSpec`.

Kotest의 Style은 모두 Kotlin DSL로 구성되어 있어 직관적인 구조를 가진다.

IntelliJ 사용한다면 [플러그인](https://plugins.jetbrains.com/plugin/14080-kotest)은 반드시 설치하자.
JUnit처럼 테스트 파일에서 테스트를 실행하거나, 테스트 레이아웃을 위한 별도 창을 제공한다.

#### IntelliJ + Kotest Integration

플러그인은 모듈로부터 테스트 파일을 만들 수 있는 기능도 제공한다.

![kotest creation 1](./res/kotest-test-creation1.png)

테스트를 만들 대상에 커서를 두고 `shift + cmd + t` 또는 컨텍스트 메뉴를 열고 `Create test`를 선택한다.

![kotest creation 2](./res/kotest-test-creation2.png)

*Testing Library*에서 Kotest를 선택하고, *Superclass*에서 원하는 스타일을 설정하고 확인을 누르면 다음 코드를 자동으로 생성한다.

```kotlin
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe

class WebClientConfigTest : DescribeSpec({

})
```

테스트를 자주 만드는데 매우 편리한 기능이다.

#### Rollback Test (test method callbacks)

https://kotest.io/docs/extensions/spring.html#test-method-callbacks

Kotest는 `@Transactional`을 테스트 클래스에 붙여도 트랜잭션을 시작하지 않는다.
before test method와 같은 콜백을 발생시키지 않기 때문이다.
그래서 `@DataJpaTest`는 `@Transactional`이 붙어있지만 이 설정 없이는 롤백하지 않는다.

Kotest는 콜백을 발생시키지 위한 설정을 `extensions`으로 제공한다:

```kotlin
class KotestProjectConfig : AbstractProjectConfig() {
    override fun extensions(): List<Extension> = listOf(SpringExtension)
}
```

`DescribeSpec` 기준 Test Case인 `it` 전후로 콜백이 발생한다.
`mode`를 `Root`로 설정하면 기준을 변경할 수 있다.

```kotlin
override fun extensions(): List<Extension> = listOf(SpringTestExtension(SpringTestLifecycleMode.Root))
```

`Root` 모드는 최상위의 노드를 기준으로 콜백을 실행한다.

```kotlin
@Transactional
class MyTest : DescribeSpec({
  describe("test1") { ... }
  describe("test2") { ... }
  describe("test3") { ... }
})
```

위 코드에서 `test1` `test2` `test3`에 대해서만 트랜잭션을 시작한다.

아쉬운 점은 2가지 모드로는 중첩된 구조를 지원하지 않는다는 것이다.

```kotlin
describe("foo method") {
  context("when something") {
    it("result should be 1") { ... }
    it("result should be 2") { ... }
  }
  context("when something else") {
    it("result should be 3") { ... }
    it("result should be 4") { ... }
  }
}
```

위 코드에서 `Root` 모드라면 `describe` 트랜잭션 하나만,\
`Test` 모드라면 `it` 4개에 대해서만 트랜잭션을 시작한다.

원하는 것은 `context` 기준으로 트랜잭션을 시작하는 것이다.

https://github.com/kotest/kotest/issues/2629 \
관련 문제로 Kotest 이슈에 문의한 내역이 있다. `BehaviorSpec`의 `Then`에서는 검증만 하는데, 격리가 된다는 내용.
답변은 이미 디자인되어 있는 상황이라 변경하기 어렵다고 한다.

`SpringTestExtension`을 잘 구현하면 가능할지도.

## [Language Server](./language-server-protocol.md)

https://github.com/fwcd/kotlin-language-server

2022-11-29 아직 퍼포먼스가 안나온다. 자주 끊기고, 느리다.
ref. https://www.reddit.com/r/neovim/comments/yf0v86/kotlin_language_server_very_slow/

## ranges

https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.ranges/

`IntRange`를 사용하면 다음과 같은 일을 할 수 있다.

범위 비교:
```kotlin
if (30 in 1..100) {
  // true
}
```

순회:
```kotlin
for (i in 1.rangeTo(100)) {
  // 1, 2, 3, 4, 5...100
}
```

Step 순회:
```kotlin
for (i in 1.rangeTo(100) step 5) {
  // 1, 6, 11...96
}
```

항상 end 값은 포함(inclusive)한다.

Char, Int, Long 등 비교할 수 있는 타입이라면 내장된 `Range` 클래스를 제공한다.

### Hierarchy

```
IntRange --|> IntProgression    --|> Iterable<Int>
         --|> ClosedRange<Int>  --|> Comparable<Int>
```

Iterable을 구현함으로써 순회할 수 있고, Comparable을 구현함으로써 범위를 비교할 수 있다.

응용하면 `LocalDate` 같은 것도 만들 수 있다:
https://www.netguru.com/blog/traversing-through-dates-with-kotlin-range-expressions

보통 순회, 비교 모두 당장 필요하지는 않을텐데,\
예를들면, 날짜 범위를 나타내는 클래스를 구현하고 싶다면 `ClosedRange<LocalDate>`만 구현해도 충분하다.
`Pair<LocalDate, LocalDate>` 보다는 좀 더 명확할 것이다.

## Kotlin DSL

https://kotlinlang.org/docs/type-safe-builders.html

> Type-safe builders allow creating Kotlin-based domain-specific languages (DSLs) suitable for building complex hierarchical data structures in a semi-declarative way.

Type-safe 빌더는 비 선언적인 방법으로, 복잡한 계층의 데이터 구조를 만드는데 적합한 Kotlin DSL을 만들 수 있습니다.

대표적인 예시인 [Kotr](https://ktor.io/docs/routing-in-ktor.html#define_route)의 route handler:

```kotlin
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.response.*

routing {
    route("/hello", HttpMethod.Get) {
        handle {
            call.respondText("Hello")
        }
    }
}
```

builder 유형의 모듈을 만드는데 유용한 방법이다.

위 코드에서 `routing` `route` `handle`는 각각 lambda 표현식을 받는 함수이다.
lambda 함수의 [this](https://kotlinlang.org/docs/this-expressions.html)를 정의함으로써 DSL을 만들 수 있다.

```kotlin
html {
 // ...
}
```

이런 표현을 가능케 하려면 다음과 같이 `html` 함수를 만든다:

```kotlin
fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()
    html.init()
    return html
}
```

`html {}`의 lambda 표현식의 this는 이제 `HTML` 객체가 된다.
`HTML` 클래스에 다시 lambda expression을 받도록 함수를 제공하면 중첩된 표현이 가능해진다:

```kotlin
class HTML {
    fun head(init: Head.() -> Unit): Head {
        val head = Head()
        head.init()
        children.add(head)
        return head
    }
    fun body(init: Body.() -> Unit): Body {
        val body = Body()
        body.init()
        children.add(body)
        return body
    }
}
```

```kotlin
html {
    head { ... }
    body { ... }
}
```

## Exposed

https://github.com/JetBrains/Exposed

Jetbrains에서 만든 ORM 라이브러리.

2023-07-18 [Kakao tech meet 2회](https://tech.kakao.com/2023/07/04/kakao-tech-meet-2/)의 세션 2, *Spring Batch 애플리케이션 성능 향상을 위한 주요 팁*에서 처음 알게 되었다.

DSL로 쿼리를 작성할 수 있고, [Union 쿼리](https://github.com/JetBrains/Exposed/wiki/DSL#union)도 지원한다.

Exposed issue에 [Spring with exposed or jpa?](https://github.com/JetBrains/Exposed/issues/1504)글이 있다.
Exposed를 사용했는데 JPA 대신 사용한 근거를 찾고싶다는 내용이다.

JPA와 QueryDSL을 많이 사용했다는 누군가 Kotlin + JPA를 사용하면서 불편한 4가지를 나열했다:

1. plugin 없이 동작하지 않음
2. Entity를 data class로 사용할 수 없음
3. Entity를 불변으로 사용할 수 없음. `val` 대신 `var`를 사용해야 함
4. 도메인 지향인 clean architecture로 개발하면 JPA의 강력한 기능을 사용할 수 없음. `spring-data-jpa`나 다른 ORM을 사용하면 더 쉽게 사용 가능

추가로 clean architecture로 개발하면 JPA의 영속 계층의 cache나 dirty-checking을 사용하기 어려웠다고 한다.

그래서 `spring-data-jpa` + `jooq`를 사용하다가, Exposed를 사용중이라고.

## Annotation Processing

QueryDSL의 QClass와 같이 annotation processing로 생성되는 모듈은 gradle 명령어로 생성할 수 있다: `gradle kaptKotlin`.

간편하게 프로젝트 빌드를 할 수도 있겠지만 불필요한 task가 포함되어 있고, 완성되지 않는 코드에 대해서 빌드하여 결국 실패할 것이므로,
소요시간도 짧은 `gradle kaptKotlin`을 사용하는 것이 좋다.
