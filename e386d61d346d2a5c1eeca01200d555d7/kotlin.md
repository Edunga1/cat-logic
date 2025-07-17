---
created: 2022-11-29
---
# Kotlin Programming Language

오픈 소스, 정적 타입 언어로 JVM, 안드로이드, JavaScript, WASM, Native를 대상으로 한다.[^1]

[^1]: https://kotlinlang.org/docs/faq.html

## 시작하기

[IntelliJ IDEA](/docs/wiki/jetbrains.md#intellij)를 사용하는 것이 좋지만.

직접 컴파일하고 실행해 보려면 kotlin compiler를 설치해야 한다.
OSX는 `brew install kotlin`으로 설치하면 간단.
`kotlinc`와 `kotlin` 그리고 `kotlinc-jvm` 등 플랫폼 별 명령어가 제공된다.

```kotlin
fun main() {
    println("Hello, World!")
}
```

`hello.kt` 파일로 저장했다면.

```bash
$ kotlinc hello.kt -include-runtime -d hello.jar
```

`kotlinc`로 jar 파일을 생성한다.

```bash
$ java -jar hello.jar
Hello, World!
```

`java`로 실행한다.

```bash
$ kotlinc hello.kt
$ kotlin HelloKt.class
Hello, World!
```

인자를 생략하면 `HelloKt.class` 파일이 생성되고, `kotlin`으로 실행할 수도 있다.

## Features

### Scope Functions

https://kotlinlang.org/docs/scope-functions.html

```kotlin
// run
val totalPrice = item.run { price * amount }

// apply
item?.apply {
  decreaseQuantity()
  updatePrice(100)
}
```

scope functions는 lambda 함수 내에서 context object를 액세스하는 함수이다.

`let`, `run`, `with`, `apply`, `also`가 있는데,
context object를 `it` 또는 `this` 중 어느 것으로 접근할 것인지
그리고 반환 값은 Lambda Result 또는 Context Object 중 어느 것인지 따라서 선택한다.

예를들어 context object로 추가 로직을 처리하고, 특별히 반환할 것이 없으면 `also`.
context object의 상태로 계산하여 반환하고 싶으면 `let`이 적합하다.

어느 scope function을 사용할 지는 [공식 문서](https://kotlinlang.org/docs/scope-functions.html#function-selection)에서 설명하고 있으니 참고하자.

처음 kotlin을 접하는 개발자와 함께 일하면 scope function으로 리뷰가 많이 오간다.
어떤 scope function을 사용하던 구현이 가능할 수 있는 경우가 많다보니 갑론을박이 이어진다.
너무 목매지 않는 편이 현명한데, 세심한 개발자라면 올바른 scope function을 사용하는 것이 리뷰하는 입장에서 도움이 된다.

예를들어 `let` 대신 `also`를 사용했다면, lambda에서 계산이 이루어지지 않는다는 것을 직관적으로 알 수 있다.

---

다른 언어로 개발할 때면 scope function이 매우 그리워진다.
특히 javascript 같이 null check가 잦으면 더욱 그렇다.

```typescript
if (foo?.bar?.baz != null) {
  foo.bar.baz.something1()
  foo.bar.baz.something2()
}
```

위 코드처럼 이미 체크된 변수를 다시 사용해야 할 때 scope function가 빛을 발한다.

```kotlin
foo?.bar?.baz?.apply {
  something1()
  something2()
}
```

변수이름이 길어질수록 줄바꿈도 생기고 코드도 길어져서 읽기 어려워지는데, scope function은 획기적으로 줄여준다.

### 예외 처리

Java와 달리 Kotlin은 checked exception을 지원하지 않는다.
checked exception은 예외 처리를 강제하는 기능이다.

https://kotlinlang.org/docs/exceptions.html#checked-exceptions

코틀린의 공식 문서에 Checked Exception에 대한 언급이 있다:

> Bruce Eckel says this about checked exceptions:
>
> > Examination of small programs leads to the conclusion that requiring exception specifications could both enhance developer productivity and enhance code quality, but experience with large software projects suggests a different result – decreased productivity and little or no increase in code quality.

작은 프로그램에서는 코드 품질과 생산성을 높일 수 있었지만, 대규모 프로젝트에서는 생산성이 감소하고 코드 품질 또한 적거나 증가하지 않았다고.

### Destructuring declarations

객체를 여러개의 변수로 분리하는 기능이다

```kotlin
val (name, age) = person
```

https://kotlinlang.org/docs/destructuring-declarations.html

모든 객체가 가능한 것은 아니고, `componentN` 함수를 제공하는 객체만 가능하다.(`component1`, `component2` 등)
data class는 기본적으로 `componentN` 함수를 제공한다. data class의 생성자 순서에 따라 `componentN` 함수가 생성된다.

refactor project는 [reactor-kotlin-extensions](https://github.com/reactor/reactor-kotlin-extension)를 사용하면 `Tuples`의 `componentN` 함수를 사용할 수 있다.
`Tuples`는 `zipWhen` 등에서 주로 사용하고, `it.t1` `it.t2` 등으로 접근하게 되는데 가독성이 떨어지는데 destructuring declarations를 사용하면 가독성이 개선된다.

```kotlin
Mono.just("Hello, ")
    .zipWhen { Mono.just("World!") }
    .map { it.t1 + it.t2 }
    .block()
```

```kotlin
import reactor.kotlin.core.util.function.component1
import reactor.kotlin.core.util.function.component2

Mono.just("Hello, ")
    .zipWhen { Mono.just("World!") }
    .map { (hello, world) -> hello + world }  // it.t1, it.t2 대신 destructuring declarations 사용
    .block()
```

다만 확장 함수로 `componentN` 함수를 제공하고 있어서, `import reactor.kotlin.core.util.function.component1` import 구문을 직접 추가해야 한다.
IntelliJ 2024 버전 기준으로는 아직 자동 import 기능이 없다.

## Testing

test framework: [Kotest](https://github.com/kotest/kotest)
mocking: [MockK](https://github.com/mockk/mockk)

junit + mockito 대신 Kotest + MockK를 사용하자.
kotlin의 타입 관련 문제가 해결되고, [Kotlin DSL](#kotlin-dsl)을 이용한 유려한 코드 작성을 도와준다.

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

추가 내용은 [테스팅 문서](/docs/wiki/testing.md#better-specs)에 기술했다.

### Kotest

https://kotest.io/docs/framework/testing-styles.html

Kotest는 테스트 레이아웃을 다양한 스타일로 표현할 수 있다.
내가 자주 사용하는 스타일은 `DescribeSpec`.

Kotest의 Style은 모두 Kotlin DSL로 구성되어 있어 직관적인 구조를 가진다.

IntelliJ 사용한다면 [플러그인](https://plugins.jetbrains.com/plugin/14080-kotest)은 반드시 설치하자.
JUnit처럼 테스트 파일에서 테스트를 실행하거나, 테스트 레이아웃을 위한 별도 창을 제공한다.

테스트 레이아웃이나 코틀린에 어울리는 코드 작성가 가능한 점은 장점이지만, **IDE 통합은 부족하다**.
실패한 테스트를 클릭하면 해당 지점으로 이동하는 네비게이션이 작동하지 않는 경우가 많다.
때문에 [고통 스럽다는 이슈](https://github.com/kotest/kotest-intellij-plugin/issues/367)도 있다.

[Kotest 플러그인](https://github.com/kotest/kotest-intellij-plugin)의 IDE 업데이트에 대한 지원도 부족하다.
테스트 네비게이션이나, 특정 테스트만 실행하는 기능이 IDE 업데이트에 따라 동작하지 않는 문제가 빈번하게 발생한다.
가장 불만인 지점인데, 항상 파일 내 모든 테스트를 실행해야만 한다.
이 문제는 IntelliJ 2025 버전에서 지속되고 있다. 2024 버전 어느 시점부터 발생했던 거 같다.

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

#### IntelliJ 타이핑 렉 문제

400줄 정도되는 테스트 파일에서 타이핑하면 버벅이는 문제가 있다.

```kotlin
class MyTest : DescribeSpec({
  describe("My Test") {
    // ...
  }
})
```

위와 같이 lambda 표현식으로 작성하면 현상이 발생한다.
다음과 같이 init 블록을 사용하면 버벅임이 없다.

```kotlin
class MyTest : DescribeSpec() {
  init {
    describe("My Test") {
      // ...
    }
  }
}
```

lambda가 원인인 것은 [깃허브 이슈](https://github.com/kotest/kotest-intellij-plugin/issues/184)에서 확인했다.
[댓글에 init block vs lambda 비교한 동영상](https://youtrack.jetbrains.com/issue/IDEA-295228/Slow-typing-performance-when-using-Kotest-plugin#focus=Comments-27-6461505.0-0)이 첨부되어 있다.

### MockK

Kotlin Mocking 라이브러리.

https://github.com/mockk/mockk

다음 검증 함수는 테스트를 위해 Mock 객체를 잘 사용했는지 확인한다:

- `confirmVerified`는 모든 stubbing이 모두 검증(`verify()`) 되었는지 확인한다. 모두 검증하지 않으면 실패한다.
- `checkUnnecessaryStub`는 모든 stubbing이 한 번 이상 사용되었는지 확인한다.

불필요한 stubbing은 테스트 코드를 복잡하게 만드는데,
이런 검증 함수를 사용하면 불필요한 stubbing을 찾아내고, 명확한 테스트 코드를 작성할 수 있다.
전역 설정을 통해 before/after 시점에 검증하면 좋다.

`clearAllMocks`를 before에, `confirmVerified`를 after에 넣어야 한다.
둘 다 after 시점에 한다면 `confirmVerified`의 실패로 인해 `clearAllMocks`가 실행되지 않는다.
이는 다음 테스트에 영향을 주는 문제가 발생한다.

After의 실패가 Before에 영향을 주지 않기 때문에 다음과 같이 분리한다.

```kotlin
// Better
class ProjectConfig : AbstractProjectConfig() {
    override fun extensions(): List<Extension> = listOf(BeforeContainerListener, AfterContainerListener)
}

private val BeforeContainerListener = object : BeforeContainerListener {
    override suspend fun beforeContainer(testCase: TestCase) {
        clearAllMocks()
    }
}

private val AfterContainerListener = object : AfterContainerListener {
    override suspend fun afterContainer(testCase: TestCase, result: TestResult) {
        checkUnnecessaryStub()
    }
}
```

다음은 `checkUnnecessaryStub`의 실패로 인해 `clearAllMocks`가 실행되지 않는 문제가 있다.
정상적인 테스트가 실패할 수 있어서 리포트 확인에 방해가 된다.

```kotlin
// Bad
class ProjectConfig : AbstractProjectConfig() {
    override fun extensions(): List<Extension> = listOf(BeforeContainerListener, AfterContainerListener)
}

private val AfterContainerListener = object : AfterContainerListener {
    override suspend fun afterContainer(testCase: TestCase, result: TestResult) {
        checkUnnecessaryStub()
        clearAllMocks()
    }
}
```

## Kotlin Language Server Protocol

Kotlin [LSP](./language-server-protocol.md)는 현재 2개의 구현체가 있다.

- [Kotlin/kotlin-lsp](https://github.com/Kotlin/kotlin-lsp/)
- [fwcd/kotlin-language-server](https://github.com/fwcd/kotlin-language-server) (unofficial)

fwcd/kotlin-language-server는 unofficial 버전이다. \
2019년부터 개발이 시작되었으나, 25년까지도 퍼포먼스가 좋지않아서 운영 레벨에서 사용하기 어렵다. \
ref. https://www.reddit.com/r/neovim/comments/yf0v86/kotlin_language_server_very_slow/

kotlin-lsp의 등장으로 [fwcd/kotlin-language-server는 유지보수 중단을 고려](https://github.com/fwcd/kotlin-language-server/commit/ee0553144068676c218255526a1303725e64b0d5)하고 있다.

### 내역

- 2025-05-20 JetBrains에서 [공식 Kotlin LSP](https://github.com/Kotlin/kotlin-lsp/releases/tag/idea%2F252.16512.17)를 공개했다!
- 2025-05-22 kotlin-lsp는 [KotlinConf 2025 Keynote](https://youtu.be/F5NaqGF9oT4?si=PkUm35Z1mhCO37LP&t=3764)에서 소개되었다.
- 2025-05-23 [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig/pull/3867)에 Kotlin LSP 설정이 추가되었다.
- 2025-05-31 [mason](https://github.com/mason-org/mason-registry/pull/10300)에 Kotlin LSP 패키지가 추가되었다.

7월 14일 기준, kotlin-lsp의 마지막 배포는 아직도 5월 말에 [릴리즈](https://github.com/Kotlin/kotlin-lsp/blob/main/RELEASES.md)된 버전에 머물러 있다.
[이슈 문의](https://github.com/Kotlin/kotlin-lsp/issues/57)에 따르면, LSP 지원을 개선하기 위한 대규모 인프라 작업이 있었다고 한다.
지금은 마무리 단계이고, 다음부터는 2주 주기로 릴리즈할 예정이라고 한다.

### kls_database.db 파일

fwcd/kotlin-language-server는 프로젝트 루트에 `kls_database.db` 파일을 생성한다.

저장소에 [상수로 정의](https://github.com/fwcd/kotlin-language-server/blob/8c40b4fb846086e5cbdea6bc1c11aeba19c7bf52/shared/src/main/kotlin/org/javacs/kt/database/DatabaseService.kt#L30)되어 있다.
이 정보 말고는 어떤 용도로 사용하는지 설명하지 않기 때문에 LSP를 사용하면서 어떤 용도인지 알기 어렵다.
`.gitignore`에 추가하자.

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
