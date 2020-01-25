---
id: page-81
time: 2019-08-27 15:55:09
tags: testing
---
# Testing

## Setup and Teardown

각 테스트를 실행하기 전/후 할 일을 각각 **Setup** **Teardown** 이라한다.

### Transaction Start - Rollback

데이터베이스를 Mocking 하지 않고 테스트용 데이터베이스를 띄워서한다고 가정한다.

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
