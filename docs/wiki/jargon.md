# 개발 용어

## Business Rule, Business Logic, Logic

아키텍처에 대한 이야기가 나오면 위 단어들이 빠지지 않는다.

위 단어들이 무엇을 의미하고 왜 **분리하여** 알아야 하는지 알아본다.

### Business Logic

비즈니스 로직은 말 그대로 비즈니스와 관계되어 있다.

'출금' 기능을 구현한다고 하면 다음 처럼 구현할 수 있을 것이다:

```javascript
if (amount <= balance) {            // 잔고가 충분하면
    balance -= amount;              // 잔고 감소
    let sql = 'update...';          // 데이터베이스 잔고 업데이트 쿼리
    query(sql, balance);            // 쿼리 전송
} else {
    alert('not enough balance.');   // 충분하지 않으면 사용자에게 알림
}
```

기능을 동작시키기 위한 모든 코드가 비지니스 로직이 된다.

### Logic

그럼 일반 로직은 무엇인가?

위 예시 코드에는 나타나지 않은 DB에 연결하거나, Server를 실행 시키는 등

시스템이 동작하기 위한 코드들이다. 따라서 비즈니스와 별개로 반드시 필요한 코드다.

### Business Rule

비즈니스 로직이 구현에 가깝다면 비즈니스 룰은 말 그대로 원칙이다.

위 예시 코드에서 '잔고가 충분하면', '잔고 감소', '사용자에게 알림'과 같이 자연어로 표현 가능하다.

클라이언트가 제시한 비즈니스 규칙을 개발자가 비즈니스 로직으로 구현할 수 있다.

비즈니스 로직이 비즈니스 룰을 설명 할 수도 있다.

### 비즈니스 규칙과 비즈니스 로직을 왜 분리하여 알아야 할까? (feat. Clean Architecture)

아키텍처를 설계하면 유지보수의 문제에 직면하게 된다.
좋은 아키텍처는 좋은 유지보수성을 나타낸다.

어느날 클라이언트가 '잔고가 없어도 사용자에게 알리지 않게 해주세요.'라고 말했다 치자.
문제는

**비즈니스 룰과 관련된 코드**: '잔고가 충분하면', '잔고 감소', '사용자에게 알림'

**그렇지 않은 코드**: '데이터베이스 잔고 업데이트 쿼리', '쿼리 전송'

위 코드들이 서로 섞여 있어서 가독성이 그렇게 좋지 않다는 것이다.
따라서 어떤 코드를 변경해야 사용자에 대한 알림이 가지 않는지, 그리고 해당 코드는 몇 줄에 걸쳐 나타나는지 분석해야 한다.
쿼리 수정을 할 때도 이런 문제는 발생한다.

[Clean Architecture](https://blog.coderifleman.com/2017/12/18/the-clean-architecture/?utm_medium=social&utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4)는
비즈니스를 규칙을 명시적으로 작성하고 비즈니스 로직과 계층을 분리하고, 비즈니스 로직을 작게 만들도록 한다.

계층을 분리함으로써 의존성을 분리하여 테스트하기 쉽게 한다. 잘 분리된 코드는 분석하기도 쉽다.

## 테스트와 관련된 용어들

### Test Double

Stub, Mock, Fake 등 테스트 도구들을 통칭하는 말.

### Test Stub

결과가 정해진 기능(function).

항상 같은 결과만 나오게 한다거나, 특정 인자에는 특정 결과만 반환하도록 한다.

NodeJS에는 SinonJS가 그 역할을 한다.

### Mock Object

오브젝트를 흉내내는 것.

의존하는 모듈이 사이드이펙트를 가지거나, 아직 구현이 안되어서 로직을 흉내내어 동작케하는 것.

예:

* 모듈이 데이터베이스를 업데이트하면 안되므로 모듈의 로직을 흉내내어 메모리에만 올려둔다.
* 네트워크 요청이 필요한 경우 실제로 발생시키지 않고 해당 인자를 기반하여 결과를 반환한다.
* 의존하는 모듈이 아직 구현 되지 않아서 임시로 흉내내어 사용한다.

## Debounce

비슷한 단어: Throttle

debounce는 클라이언트에서는 사용자 입력의 노이즈를 제거하는 용어로 주로 사용된다.
보통 서버 요청할 때 버튼이 두 번 눌러져서 요청이 두 번 발생하는 동시 요청 문제가 흔하다.
서버에서 동시 호출에 대한 방어 로직을 구현하는 것과 별개로, 클라이언트에서도 debounce를 이용한 UI 문제를 해결해 볼 수 있다.

kotlin은 Flow의 operator로 `debounce()`를 [제공](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/debounce.html)한다.

```kotlin
flow {
    emit(1)
    delay(90)
    emit(2)
    delay(90)
    emit(3)
    delay(1010)
    emit(4)
    delay(1010)
    emit(5)
}.debounce(1000)

// 3, 4, 5
```

첫 번째 값을 가져오고, 새 값이 설정한 시간 이내로 발생한 거라면 제거한다.

ReactiveX에서도 debounce operator를 [제공](https://reactivex.io/documentation/operators/debounce.html)한다.

> only emit an item from an Observable if a particular timespan has passed without it emitting another item

RX 구현체에선 `debounce`, `throttle` 함께 많이 사용하는 것으로 보인다.

> Language-Specific Information:
> - RxClojure
> - RxCpp
> - RxGroovy debounce throttleWithTimeout
> - RxJava 1․x debounce throttleWithTimeout
> - RxJava 2․x debounce throttleWithTimeout
> - RxJS debounce debounceWithSelector throttleWithTimeout
> - RxKotlin debounce throttleWithTimeout
> - RxNET Throttle
> - RxPHP throttle
> - RxPY debounce throttle_with_selector throttle_with_timeout
> - Rxrb
> - RxScala debounce throttleWithTimeout
> - RxSwift debounce throttle
