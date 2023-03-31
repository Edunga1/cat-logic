# Kotlin

# Features

## Scope Functions

https://kotlinlang.org/docs/scope-functions.html


e.g. `run`
```kotlin
val totalPrice = item.run { price * amount }
```

scope functions 모두 같은 일을 한다.
context object를 어떻게 접근하는 지, 반환 값은 무엇인지에 따라 적절하게 골라서 사용하면 좋다.
예를들어, context object로 추가 로직을 처리하고, 특별히 반환할 것이 없으면 `also`.
context object의 상태로 계산하여 반환하고 싶으면 `let`을 사용하면 의미가 맞다.

어떤 함수를 사용할 지 시나리오를 공식 문서에서 설명한다:  https://kotlinlang.org/docs/scope-functions.html#function-selection


# Testing

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

## Kotest Specs

https://kotest.io/docs/framework/testing-styles.html

테스트 레이아웃을 다양한 스타일로 표현할 수 있다.
내가 자주 사용하는 스타일은 `DescribeSpec`.

Kotest의 Style은 모두 Kotlin DSL로 구성되어 있어 직관적인 구조를 가진다.

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


# [Language Server](./language-server-protocol.md)

https://github.com/fwcd/kotlin-language-server

2022-11-29 아직 퍼포먼스가 안나온다. 자주 끊기고, 느리다.
ref. https://www.reddit.com/r/neovim/comments/yf0v86/kotlin_language_server_very_slow/

# ranges

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

## Hierarchy

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

# Kotlin DSL

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
