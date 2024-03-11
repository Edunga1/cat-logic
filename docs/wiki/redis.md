---
created: 2023-05-19
---
# Redis

## SETNX, SET + NX 간단한 Locking System 구현

* https://redis.io/commands/setnx/#design-pattern-locking-with-codesetnxcode
* https://redis.io/commands/set/

`2.6.12`부터 `SETNX` Deprecated 되고, `set`에 `NX` 옵션이 추가되었다.

> SETNX is short for "SET if Not eXists".

`NX`는 `Not eXists`의 약자로, 해당 키가 존재하지 않을 때만 `SET`을 수행한다.

> The command SET resource-name anystring NX EX max-lock-time is a simple way to implement a locking system with Redis.

`SET resource-name anystring NX EX max-lock-time`와 같이 사용하는 것은 Redis에서 Locking System을 구현하는 간단한 방법이다.

`EX max-lock-time`으로 인해 초 단위로 만료 시간을 지정할 수 있다.
잘 설정되었다면 `"OK"`를 반환하고, 만료 시간이 지나기 전에 다시 호출하면 `nil`을 반환한다.

이 방식으로 간단한 분산 Locking System을 구현할 수 있다.

클라이언트에서 각자 포인트를 적립, 차감하는 로직이 있다고 가정하자.

Process:
- 각 클라이언는 위 명령어로 포인트를 처리하기 전에 Locking 한다: `SET point-user123 foo NX EX 60`
- 만약 Locking에 실패하면(`nil`을 반환하면) "다른 클라이언트에서 처리 중입니다."와 같은 메시지를 반환한다.
- Locking에 성공하면(`"OK"`를 반환하면) 포인트를 처리한다.
- 처리가 끝나면 `DEL point-user123`로 Locking을 해제한다.

설령 클라이언트가 처리 중에 비정상 종료되더라도 60초 후에는 Locking이 해제되기 때문에 무한정 Locking 되는 것을 피할 수 있다.

좀 더 견고하게 Unlocking 프로세스를 만들고 싶다면 `DEL` 명령어를 직접 사용하지 않고, 일련의 해제 프로세스를 호출하는 것이 좋다:

- `foo`와 같은 고정 문자열 대신, 랜덤한 문자열을 사용한다.
- 클라이언트은 포인트 처리 후 해제 프로세스에 위 문자열을 전달한다.
- 해제 프로세스는 전달 받은 문자열과 `GET` 명령어로 해당 키의 값을 비교한다.
- 같으면 `DEL` 명령어로 Locking을 해제한다.

각 클라이언트에서 직접 삭제하는 대신, 해제 프로세스에 위임하는 방법이다.\
이러면 다른 클라이언트가 `DEL` 명령어로 아무 배경없이 Locking 해제하는 것을 막을 수 있다.
Locking 처리한 클라이언트만 해제할 수 있는 일종의 보증 절차를 만드는 것이다.
