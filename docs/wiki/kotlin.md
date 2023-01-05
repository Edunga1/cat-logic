# Kotlin

<!--toc:start-->
- [Kotlin](#kotlin)
- [Features](#features)
  - [Scope Functions](#scope-functions)
- [Testing](#testing)
  - [Kotest Specs](#kotest-specs)
    - [Better Specs](#better-specs)
- [[Language Server](language-server-protocol)](#language-serverlanguage-server-protocol)
<!--toc:end-->

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


# [Language Server](language-server-protocol)

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
