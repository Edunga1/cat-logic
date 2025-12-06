# Testing

테스트 작성 방법. 비-프로그래밍 테스트 관련된 내용도 포함한다.

## Setup and Teardown

각 테스트를 실행하기 전/후 할 일을 각각 **Setup** **Teardown**이라 한다.

### Transaction Start - Rollback

데이터베이스를 Mocking 하지 않고 테스트용 데이터베이스를 띄운다고 가정한다.

일반적으로 테스트는

1. DB에 데이터를 입력 - 이러한 데이터가 주어졌을 때 (GIVEN)
2. API, 함수를 실행 - 테스트하고자 하는 기능 실행 (WHEN)
3. 데이터의 변경/반환 확인 (THEN)

위 과정을 거친다.

테스트를 하면서 사용한 데이터를 다시 제거하지 않으면, 다음 테스트에 영향을 미치게 된다.
이를 해결하기 위해서 Setup에서 `TRANSACTION START`, Teardown에서 `ROLLBACK` 하면
DB 상태를 다시 복구할 수 있다.

트랜잭션을 사용하지 않고, `DELETE FROM` DDL을 통하여 데이터를 삭제할 수도 있으나,
테스트를 중간에 멈췄을 때 상태를 복구할 수 없다.
또, 트랜잭션은 최소한의 안정장치가 될 수 있을 거 같다.
잘못 입력한 데이터베이스 URL을 대응할 수 있지 않을까.

Django는 테스트 시 데이터 삭제 여부에 대한 옵션이 있다:<br>
https://docs.djangoproject.com/en/2.2/topics/testing/advanced/#django-db-connection-creation

Spring에서 테스트에 `@Transactional` 사용하지 말 것을 설명하는 글도 있다:\
[Don’t Use @Transactional in Tests](https://dev.to/henrykeys/don-t-use-transactional-in-tests-40eb)

테스트에 `@Transactional`을 붙이면 위와 테스트를 트랜잭션으로 묶을 수 있다. 하지만 그러면서 발생하는 문제점도 있다.

* [false negative](https://ko.wikipedia.org/wiki/%EA%B1%B0%EC%A7%93_%EC%96%91%EC%84%B1%EA%B3%BC_%EA%B1%B0%EC%A7%93_%EC%9D%8C%EC%84%B1)으로 테스트를 망침
* 운영코드에는 버그가 있지만, 테스트에서 성공하는 것을 **false negative**라고 한다.
* 이는 개발자의 테스트에 대한 신뢰도 감소로 이어진다. 테스트를 덜 작성하게 될 것이다.
* 직접 테스트하지 않는 이상 발견할 수 없는 버그가 운영 코드에 포함된다.

글에서 설명하는 false negative 예제: 운영 코드에는 `@Transactional` 빠졌지만, 테스트에는 있어서 성공하고, 직접 호출하면 실패한다.

### 테스트에서의 @Transactional 사용에 대해 질문이 있습니다 - Toby vs ChatGPT (2)

https://youtu.be/-961J2c1YsM

- 영상의 [질문](https://www.inflearn.com/questions/792383/%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98-transactional-%EC%82%AC%EC%9A%A9%EC%97%90-%EB%8C%80%ED%95%B4-%EC%A7%88%EB%AC%B8%EC%9D%B4-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
- [09:50](https://youtu.be/-961J2c1YsM?t=590) Spring Annotation을 지원하지 않던 시절에도 AbstractTransactionalSpringContextTests 사용하면 @Transactional을 사용한 롤백 테스트와 같은 효과를 내는 방법이 있었다.
- [12:48](https://youtu.be/-961J2c1YsM?t=768) 질문 내용: 운영 코드가 트랜잭션 경계 밖에서 변경하는 잘못된 코드였는데, 테스트에서는 성공하는 문제.
- [17:00](https://youtu.be/-961J2c1YsM?t=1020) AfterEach에서 deleteAll해서 초기화하려니 일일이 작성해야 하는 점이 불편하다.
- [32:05](https://youtu.be/-961J2c1YsM?t=1925) 롤백 테스트가 없던 시절에도 dbunit이라는 도구로 일일이 테스트 수행 전에 테이블을 돌리는 처리를 했었다.
- [33:10](https://youtu.be/-961J2c1YsM?t=1990) @Transactional 테스트 지원은 혁신적이었고, 스프링 강의나 스프링 개발 팀에서도 사용을 추천하고 있다.
- [33:39](https://youtu.be/-961J2c1YsM?t=2019) 하지만 **트랜잭션 경계를 테스트 메소드로 확장해도 문제 없는 경우에만 유효하다**. 질문처럼 트랜잭션 경계를 제대로 설정하지 않은 코드도 정상적인 것처럼 보이는 문제가 있다.
- [35:23](https://youtu.be/-961J2c1YsM?t=2123) 초창기에는 DAO를 사용할 때 명시적인 트랜잭션 시작하지 않으면 에러가 발생했었다. spring-data-jpa repository는 알아서 트랜잭션을 만든다. 편리하지만 명시적이지 않아서 개인적으로 불편하다. 중첩 트랜잭션 구조인 경우 테스트의 트랜잭션이 이를 동작하게 만듦. 사전 점검하기 어려움.
- [39:40](https://youtu.be/-961J2c1YsM?t=2380) 질문처럼 detached 오브젝트의 자동 감지되지 않는 코드가 @Transactional 테스트에서는 정상 동작하게 보이거나, @Transactional이 동일 클래스의 메서드 사이의 호출에서 적용되지 않는 스프링 기본 프록시 AOP의 문제도 정상 동작하게 만든다.
- [40:50](https://youtu.be/-961J2c1YsM?t=2450) JPA save한 객체가 영속 컨텍스트에만 있다가, 롤백하면 사라지므로 테스트에서 반드시 flush 후에 검증해야 한다. 아니면 다시 쿼리로 조회하여 확인하는 검증이 필요하다.
- [43:04](https://youtu.be/-961J2c1YsM?t=2584) 이러한 단점들이 있음에도 불구하고, **@Transactional 테스트는 적극적으로 권장한다**. 병렬 테스트가 가능하고, 테스트 코드 작성이 빨라지므로 테스트를 적극적으로 작성하게 만든다. 테스트마다 테이블 clean up 하는 것은 어떤 테이블을 수정하는지 항상 생각해야하고 clean up 코드가 테스트 코드보다 많아지며, clean up을 빼먹으면 다른 테스트를 성공하게 만들기도 함.
- [44:38](https://youtu.be/-961J2c1YsM?t=2678) 대신 제대로 검증되지 않은 위의 문제들은 잘 인식해야 한다. **문제가 되는 테스트는 @Transactional 테스트 대신 직접 초기화하는 테스트를 작성**한다.
- [45:42](https://youtu.be/-961J2c1YsM?t=2742) 테스트를 잘 작성해도 애플리케이션 코드를 완벽하게 검증할 수 없다는 사실을 인식한다. 통합 테스트 외에 인수 테스트, e2e, http api 테스트도 진행한다.
- [47:15](https://youtu.be/-961J2c1YsM?t=2835) @Transactional 테스트의 문제점들은 코딩 가이드를 작성하고, 코드 리뷰에서도 인지한다. 정적 분석 도구를 사용하여 제한을 걸어두는 방법도 사용한다.
- [48:18](https://youtu.be/-961J2c1YsM?t=2898) 여러개의 트랜잭션을 검증하는 것은 테스트 경계가 바르게 설정되었는지 검증하는 문제인데, 이것은 테스트에서 검증할 수 없다. 중간에 에러가 발생해서 롤백되는지는 수동으로라도 테스트해본다.
- [50:23](https://youtu.be/-961J2c1YsM?t=3023) **DB를 직접 클리어하는 것은 추천하지 않는다**. 초기 데이터를 미리 입력해두고(유저 데이터를 30개 정도 미리 넣어둔다던지) 테스트에서 사용하는 방법이 어려워진다.
- [53:49](https://youtu.be/-961J2c1YsM?t=3229) [블로그 많이 쓰시는 분](https://jojoldu.tistory.com/)은 @Transactional 테스트를 반대하는 편. [JPA 강의 전문으로 하시는 분](https://www.youtube.com/@yhdev)은 찬성하는 편.
- [1:00:00](https://youtu.be/-961J2c1YsM?t=3600) 책: 생산성과 품질을 위한 단위 테스트 원칙과 패턴에서 매 테스트 시작 전에 DB 원상태로 돌리는 법을 가장 권장한다.

## Better Specs

https://www.betterspecs.org/

> Better Specs is a collection of best practices developers learned while testing apps that you can use to improve your coding skills, or simply for inspiration. Better Specs came to life at Lelylan (open source IoT cloud platform) and checking out its test suite may be of inspiration.

Better Specs는 테스트 작성에 대한 모범 사례(best practice) 모음이다.

사이트에서는 Rails의 RSpec을 사용한 예제지만, 테스트 패턴에 대한 이야기이므로 다른 언어/프레임워크에도 적용할 수 있다.

https://jakegoulding.com/presentations/rspec-structure/ \
이 슬라이드는 Better Specs의 구조를 요약한다.

### Single Expectation(단일 검증)

https://www.betterspecs.org/#single

```ruby
it { is_expected.to respond_with_content_type(:json) }
it { is_expected.to assign_to(:resource) }
```

한 번에 하나만 검증하는 것은 가독성, 테스트 실패 시 원인 파악이 쉽다는 장점이 있다.
하지만 DB 등 호출 비용이 큰 경우에는 여러 개를 한 번에 검증하는 것도 허용한다.

```ruby
it 'creates a resource' do
  expect(response).to respond_with_content_type(:json)
  expect(response).to assign_to(:resource)
end
```

관련 SO 질문이 있다: [Is it OK to have multiple asserts in a single unit test?](https://softwareengineering.stackexchange.com/q/7823)

답변 채택은 single expectation을 권장하고 테스트를 작성하다보면 결국 하나의 검증만 하게 될거라는 것.
하지만 더 많은 추천을 받은 답변은 multiple expectation을 하는 것이다.

[Arrange, Act, Assert](http://wiki.c2.com/?ArrangeActAssert)패턴에 따라, 동일한 동작에 대한 여러 검증을 볼 수 있어서 좋다는 것.
그러나 에러 문구가 상세하지 않다는 것은 인지하고 있어야 한다.

## 테스트 코드 작성

### 통합 테스트에서 Mocking

spring framework 환경에서 이야기다. django는 pytest의 fixture를 사용하면 편했다.

```kotlin
@SpringBootTest
@AutoConfigureMockMvc
class TalkTradeRequestControllerSendingAddressTest(
  private val mvc: MockMvc,
  private val userRepository: UserRepository,
  private val productClient: StaticProductClient,
) : DescribeSpec({
  describe("GET /users/:id/product") {
    lateinit var user: User

    beforeContainer {
      user = userRepository.save(/*..*/)
    }

    afterContainer {
      userRepository.deleteAll()
      productClient.clearTestData()
    }

    fun request(id: Long) = mvc.get("/users/$id/product") {
       contentType = MediaType.APPLICATION_JSON
    }

    context("상품이 있으면") {
      val product = Product(/*..*/)
      val subject by lazy { request(user.id) }

      productClient.putProduct(product)

      it("응답 코드는 200 OK.") {
        subject.andExpect { status { isOk() } }
      }
    }
  }
})

class StaticProductClient : ProductClient {
    private val products: MutableMap<Long, Product>

    fun putProduct(product: Product) { products[product.userId] = product }
    fun clearTestData() { products.clear() }

    override fun findProduct(userId: Long): Product? = products[userId]
}

@Configuration
class TestProductClientConfig {
    @Bean
    fun testProductClient(): ProductClient = StaticProductClient()
}
```

위 코드는 테스트용 클라이언트를 구현하는 방법이다.
이 방법은 불편한 부분이 있었는데, 테스트 데이터를 주입하는 `putProduct`와 같은 메서드를 구현해야 한다는 점이다.
그러면 마찬가지로 `clearTestData`와 같은 Teardown 메서드도 구현해야 한다.

```kotlin
@SpringBootTest
@AutoConfigureMockMvc
class TalkTradeRequestControllerSendingAddressTest(
  private val mvc: MockMvc,
  private val userRepository: UserRepository,
  // private val productClient: StaticProductClient,
  private val productClient: ProductClient,
) : DescribeSpec({
  describe("GET /users/:id/product") {
    lateinit var user: User

    beforeContainer {
      user = userRepository.save(/*..*/)
      clearAllMocks()
    }

    afterContainer {
      userRepository.deleteAll()
      // productClient.clearTestData()
    }

    fun request(id: Long) = mvc.get("/users/$id/product") {
      contentType = MediaType.APPLICATION_JSON
    }

    context("상품이 있으면") {
      val product = Product(/*..*/)
      val subject by lazy { request(user.id) }

      // productClient.putProduct(product)
      every { productClient.findProduct(any()) } returns product

      it("응답 코드는 200 OK.") {
        subject.andExpect { status { isOk() } }
      }
    }
  }
})

@Configuration
class TestProductClientConfig {
    @Bean
    fun testProductClient(): ProductClient = mockk(relaxed=true)
}
```

위 코드처럼 변경함으로써 편리한 부분이 있었다:

- `relaxed=true`로 한 이유는 반환을 확인하지 않는 경우, 굳이 mocking하지 않아도 된다. 호출 검증은 해야겠지만.
- 호출 검증(mockk `verify {}`)으로 쉽게 검증할 수 있다.
- `clearTestData` 구현하는 대신 mock 라이브러리의 초기화 함수`clearAllMocks()`로 Teardown을 할 수 있다.

### Creation Method

테스트 객체를 생성하는 메서드.

[xUnit Patterns](http://xunitpatterns.com/Creation%20Method.html)에서 다룬다.

> While it is possible (and often very desirable) to have Creation Methods that take no parameters whatsoever, many tests will require some customization of the created object. A [Parameterized Creation Method](http://xunitpatterns.com/Creation%20Method.html#Parameterized%20Creation%20Method) allows the test to pass in some attributes to be used in the creation of the object but we should pass only those attributes that are expected to affect (or those we want to demonstrate do not affect) the test's outcome as otherwise we could be headed down the slippery slope to [Obscure Tests](http://xunitpatterns.com/Obscure%20Test.html).

생성 함수(Creation Method)는 파라미터를 받지 않는 것이 좋다. \
파라미터를 받아야 하는 경우에는 테스트 결과에 영향을 주는 것만 전달해야 한다. \
그렇지 않으면 테스트가 모호해지는 Obscure Test로 이어질 수 있다.

복잡한 데이터 구조를 가지는 경우, 파라미터를 전달하면 보통 모호성이 발생한다.
예를 들어 `new Person("John", "Doe", 30, "New York")`와 같이 전달한다면, 30이라는 것이 나이를 의미하는지, 다른 의미인지 구현을 보지 않으면 알 수 없다.

`foo.reserve(): Boolean`과 같은 메서드가 있을 때, 테스트에서 반복되어 별개 함수로 분리할 수 있다.
이 경우에도 생성 함수와 비슷한 문제를 가지는데, `true/false`를 반환하도록 파라미터로 전달하는 버전과 각각 구분하여 반환하는 버전을 만들 수 있다.

```kotlin
// parameterized creation method
fun givenFooReserveReturns(value: Boolean) {
  every { foo.reserve() } returns value
}

// non-parameterized creation method
fun givenFooSuccessfullyReserves() {
  every { foo.reserve() } returns true
}
fun givenFooFailsToReserve() {
  every { foo.reserve() } returns false
}
```

코드가 더 많겠지만, 그래도 non-parameterized creation method 버전이 테스트에서는 보기 더 명확하다.

### 테스트에 로직을 넣지 마세요

테스트 코드에 로직을 넣으면 문제를 찾기 어렵다는 [Google Testing 블로그의 Don't put logic in your tests](https://testing.googleblog.com/2014/07/testing-on-toilet-dont-put-logic-in.html) 글.
2014년에 작성되엇다.

```java
@Test public void shouldNavigateToPhotosPage() {
  String baseUrl = "http://plus.google.com/";
  Navigator nav = new Navigator(baseUrl);
  nav.goToPhotosPage();
  assertEquals(baseUrl + "/u/0/photos", nav.getCurrentUrl());
}
```

위 테스트 코드에서 문제점을 바로 찾을 수 있을까?
잘못된 점은 `baaseUrl + "/u/0/photos"` 부분이다.

```java
@Test public void shouldNavigateToPhotosPage() {
  Navigator nav = new Navigator("http://plus.google.com/");
  nav.goToPhotosPage();
  assertEquals("http://plus.google.com//u/0/photos", nav.getCurrentUrl()); // Oops!
}
```

로직을 제거하면 명백해진다. 실제 slash가 두 개 들어가 있다.
이 테스트 코드가 실패하면 찾을 수 있지만, 통과하면 문제가 커진다.
운영 코드에 문제가 있음에도 테스트가 통과하기 때문이다.

> whereas production code describes a general strategy for computing outputs given inputs, tests are concrete examples of input/output pairs

운영 코드는 입력에 대한 출력을 계산하는 일반적인 전략을 설명하는 반면, 테스트는 입력/출력 쌍의 구체적인 예이다.

> When tests do need their own logic, such logic should often be moved out of the test bodies and into utilities and helper functions

테스트에 로직이 필요한 경우, 그러한 로직은 테스트 본문에서 유틸리티 및 헬퍼 함수로 이동해야 한다.

## A/B Test

다른 주제와 같은 분류가 아닌 거 같지만, 일단 여기에 둔다.

### VWO

[VWO](https://vwo.com/)는 테스트 및 최적화 플랫폼이다.

이 사이트는 A/B 테스트 기간 계산기를 웹으로 제공한다. \
https://vwo.com/tools/ab-test-duration-calculator/

현재 전환율, 목표로 하는 개선율, 조합 수, 일일 방문자 수, 테스트 대상 비율을 입력하면 적절한 테스트 기간을 산정해준다.

계산 식은 블로그에서 별도 공개했다: https://vwo.com/blog/ab-test-duration-calculator/

## Scraps

### 왜 유닛 테스트에서 의존성을 테스트하지 않는 것이 중요한가요?

[(Why) is it important that a unit test not test dependencies?](https://softwareengineering.stackexchange.com/questions/65477/why-is-it-important-that-a-unit-test-not-test-dependencies)

Stackexchange의 질문:
* 의존성을 테스트하지 말고, 검증 대상만 테스트하는 것이 중요하다고 한다.
* 내 생각은 의존성을 테스트하는 것을 피하기 위해서, Mocking/Stubbing 하는 것은 테스트의 복잡성을 증가 시킨다.

답변:
* 이건 단어 정의 문제다.
* 의존성까지 테스트하는 것은 Integration Test. unit test가 아니라 통합 테스트에 대해서 말한 것으로 보인다.
* 통합 테스트는 오래 걸리기 때문에 빌드 프로세스에 포함하지 않을 수도 있다.
* 우리 제품은.. 매 빌드마다 유닛 테스트를 돌리는데 몇 초가 걸리고, 매 check-in 마다 통합 테스트를 돌리는데 10분 정도가 걸리고, 매일 밤 완전(full)-통합 테스트를 돌리는데 4시간이 걸린다.

될 수 있다면 mock 객체를 전달하는 편이 낫다. 그렇지 않으면 의존성이 반환하는 다양한 경우를 모두 테스트하는 욕구에 빠진다. 의존성의 테스트에서 중복되는 문제도 있다.

### 유닛 테스트에서 상수를 사용하지 마세요.

[Don't use non-test constants in unit tests](https://dev.to/scottshipp/don-t-use-non-test-constants-in-unit-tests-3ej0)

> Tests will pass when the code is wrong
>
> More importantly, tests that reference production constants can cause a situation where the code is actually wrong but the unit test passes anyway.
>
> Consider the case where there's a misspelling in "Fizz" or even the wrong value, as here where it has the value "Buzz":
>
> public class FizzBuzz {
>    public static final String FIZZ = "Buzz";
>    // . . .
>
> The unit test will still pass, because the test is referencing against the same wrong `FizzBuzz.FIZZ` variable that the production code is referencing.

테스트가 프로덕션 상수를 참조하면, 실제로 코드가 잘못되어도 테스트는 통과할 수 있다.
`FizzBuzz.FIZZ` 변수를 참조하기 때문에 프로덕션 코드가 참조하는 것과 같은 잘못된 값으로 테스트가 통과할 수 있다.

덧글 중:

> There's a third one, readability. Like you say, re-use is good, and if done right you can argue it's readable. However, in a test you need to know EXACTLY what the test is doing right there and then.

가독성 측면에서도 상수를 테스트에서 사용하지 않는 것이 좋다고 한다.

### 유닛 테스트에서 "DAMP not DRY"는 무엇을 의미하나요?

SO 질문: https://stackoverflow.com/questions/6453235/what-does-damp-not-dry-mean-when-talking-about-unit-tests

- DAMP: Descriptive And Meaningful Phrases. 설명적이고 의미 있는 구문을 사용하는 것. 코드의 가독성을 높여준다.
- DRY: Don't Repeat Yourself. 반복하지 않는 것.

아래는 달린 답변에서 인용한 내용들이다.

> It's a balance, not a contradiction

테스트코드는 둘 사이에 균형을 잡아야 한다.

> **DAMP (Descriptive And Meaningful Phrases) promotes the readability of the code.**
>
> To maintain code, you first need to understand the code. To understand it, you have to read it. Consider for a moment how much time you spend reading code. It's a lot. DAMP increases maintainability by reducing the time necessary to read and understand the code.

코드를 유지보수하려면 먼저 코드를 이해해야 한다. 이해하려면 읽어야한다. 코드를 읽는데 얼마나 많은 시간을 할애하는지 생각해보자.
DAMP는 코드를 읽고 이해하는데 필요한 시간을 줄여 유지보수성을 높인다.

> So, why is duplication more acceptable in tests?

테스트는 동일한 항목을 반복하기 때문에 중복이 더 허용된다.

이 답변의 덧글이다:

> DRYing out test code has the potential to create an obscure test by introducing a [mystery guest](http://xunitpatterns.com/Obscure%20Test.html#Mystery%20Guest)

테스트 코드를 DRY하면, 모호한 테스트를 만들게 되어 mystery guest가 발생하게 된다.

mystery guest: 테스트를 읽는 사람이 Fixture와 Verification 로직이 테스트 메서드 외부에서 동작하여 이해할 수 없게 되는 것.

## 참고 자료

- [xUnit Test Patterns](http://xunitpatterns.com/)
    - 라이센스가 괜찮은지, [e-book](https://github.com/zhenguoli/software-development-ebooks-1/blob/master/%5BxUnit%20Test%20Patterns%20Refactoring%20Test%20Code%20(Addison-Wesley%20Signature%20Series%20(Fowler))%20Kindle%20Edition%20by%20Gerard%20Meszaros%20-%202007%5D.pdf)이 업로드되어 있다.

### systemd

[systemd](/docs/wiki/linux.md#systemd)는 fuzzing을 이용한 유닛테스트와 qemu 또는 systemd-nspawn 이용한 통합테스트를 사용한다.
프로젝트의 테스트 구조와 방법은 [docs/ARCHITECTURE.md](https://github.com/systemd/systemd/blob/main/docs/ARCHITECTURE.md#unit-tests)에 설명되어 있다.
