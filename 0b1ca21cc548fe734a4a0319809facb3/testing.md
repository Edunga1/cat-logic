# Testing

# Setup and Teardown

각 테스트를 실행하기 전/후 할 일을 각각 **Setup** **Teardown** 이라한다.

## Transaction Start - Rollback

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
* 운영코드에는 버그가 있지만, 테스트에서 성공하는 것을 **false negative** 라고한다.
* 이는 개발자의 테스트에 대한 신뢰도 감소로 이어진다. 테스트를 덜 작성하게 될 것이다.
* 직접 테스트하지 않는 이상 발견할 수 없는 버그가 운영 코드에 포함된다.

글에서 설명하는 false negative 예제: 운영 코드에는 `@Transactional` 빠졌지만, 테스트에는 있어서 성공하고, 직접 호출하면 실패한다.


# Better Specs

https://www.betterspecs.org/

> Better Specs is a collection of best practices developers learned while testing apps that you can use to improve your coding skills, or simply for inspiration. Better Specs came to life at Lelylan (open source IoT cloud platform) and checking out its test suite may be of inspiration.

Better Specs는 테스트 작성에 대한 모범 사례(best practice) 모음이다.

사이트에서 소개하는 예시는 Rails의 RSpec을 사용하지만, 다른 언어/프레임워크에서도 적용하는 것을 목표로 한다.

## Single Expectation(단일 검증)

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

# 테스트 코드 작성

## 통합 테스트에서도 mocking하면 편리하다.

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
    
    fun requset(id: Long) = mvc.get("/users/$id/product") {
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

mocking 방식 사용하기 전에는 위와같이 테스트용 클라이언트를 만들어서 주입하고,
통합 테스트 클래스에서 **테스트용 클라이언트**를 주입받아서 운영 코드에서 반환받을 데이터를 넣어주는 형태로 사용했다.

이 방법은 불편한 부분이 있었는데, 필요한 메서드마다 데이터를 넣는 메서드`put~`의 구현이 필요하고,
Repository의 `deleteAll`과 같이 데이터를 제거하는 메서드`clearTestData`를 만들 필요가 있었다는 점이다.

유닛 테스트에서도 마찬가지로 mockito나 mockk를 사용하지 않는다면 이런 불편함이 있을 것이다.

그래서 통합테스트에서도 mock 객체를 주입하였다.

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
    
    fun requset(id: Long) = mvc.get("/users/$id/product") {
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

- `relaxed=true`로 한 이유는 `null` 반환하는 메서드인 경우 굳이 mocking 하지 않아도 되서 편하기 때문이다. 더 제한하고 싶다면 사용하지 않아도 좋아 보인다.
- 호출 검증(mockk `verify {}`)도 가능해져서, 불필요하게 마지막 호출 정보를 `StaticProductClient`에 저장한다거나 할 필요가 없다.
- `clearTestData` 구현하는 대신 mock 라이브러리의 초기화 함수`clearAllMocks()`를 사용할 수 있다.
- 테스트마다 초기화함수 호출하지 않고, global tear down hook에서 초기화 함수를 호출하면 편하다.

# A/B Test

다른 주제와 같은 분류가 아닌 거 같지만, 일단 여기에 둔다.

## VWO

[VWO](https://vwo.com/)는 테스트 및 최적화 플랫폼이다.

이 사이트에 A/B 테스트 기간 계산기라는 페이지가 있다: https://vwo.com/tools/ab-test-duration-calculator/

현재 전환율, 목표로 하는 개선율, 조합 수, 일일 방문자 수, 테스트 대상 비율을 입력하면
얼마동안 테스트를 진행하면 좋을지 계산해주는 페이지다.

계산 식은 블로그에서 시트로 공개하고 있다: https://vwo.com/blog/ab-test-duration-calculator/

# Scraps

## 왜 유닛 테스트에서 의존성을 테스트하지 않는 것이 중요한가요?

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

## 유닛 테스트에서 상수를 사용하지 마세요.

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

## 유닛 테스트에서 "DAMP not DRY"는 무엇을 의미하나요?

SO 질문: https://stackoverflow.com/questions/6453235/what-does-damp-not-dry-mean-when-talking-about-unit-tests

- DAMP: Descriptive And Meaningful Phrases. 설명적이고 의미 있는 구문을 사용하는 것. 코드의 가독성을 높여준다.
- DRY: Don't Repeat Yourself. 반복하지 않는 것.

답변 중:

> It's a balance, not a contradiction

테스트코드는 둘 사이에 균형을 잡아야 한다.

> **DAMP (Descriptive And Meaningful Phrases) promotes the readability of the code.**
>
> To maintain code, you first need to understand the code. To understand it, you have to read it. Consider for a moment how much time you spend reading code. It's a lot. DAMP increases maintainability by reducing the time necessary to read and understand the code.

코드를 유지보수하려면 먼저 코드를 이해해야 한다. 이해하려면 읽어야한다. 코드를 읽는데 얼마나 많은 시간을 할애하는지 생각해보자.
DAMP는 코드를 읽고 이해하는데 필요한 시간을 줄여 유지보수성을 높인다.

> So, why is duplication more acceptable in tests?

테스트는 동일한 항목을 반복하기 때문에 중복이 더 허용된다.

답변의 덧글 중:

> DRYing out test code has the potential to create an obscure test by introducing a [mystery guest](http://xunitpatterns.com/Obscure%20Test.html#Mystery%20Guest)

테스트 코드를 DRY하면, 모호한 테스트를 만들게 되어 mystery guest가 발생하게 된다.

mystery guest: 테스트를 읽는 사람이 Fixture와 Verification 로직이 테스트 메서드 외부에서 동작하여 이해할 수 없게 되는 것.
