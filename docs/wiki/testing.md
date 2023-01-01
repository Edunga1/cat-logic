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
