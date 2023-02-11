# Testing

<!--toc:start-->
- [Testing](#testing)
- [Setup and Teardown](#setup-and-teardown)
  - [Transaction Start - Rollback](#transaction-start-rollback)
- [왜 유닛 테스트에서 의존성을 테스트하지 않는 것이 중요한가요?](#왜-유닛-테스트에서-의존성을-테스트하지-않는-것이-중요한가요)
- [유닛 테스트에서 상수를 사용하지 마세요.](#유닛-테스트에서-상수를-사용하지-마세요)
<!--toc:end-->

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

# 왜 유닛 테스트에서 의존성을 테스트하지 않는 것이 중요한가요?

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

# 유닛 테스트에서 상수를 사용하지 마세요.

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
