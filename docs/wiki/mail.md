---
created: 2023-01-04
---
# Mail

메일 관리방법.

## Gmail

### `+` 주소(variant address)를 사용하는 경우 필터적용 방법

**상황**

sentry에 중요한 알림과 그렇지 알림을 구분하고자 한다.

* Sentry에는 프로젝트별 알림 이메일 설정할 수 있고, 중요한 알림은 `user@gmail.com`, 덜 중요한 알림은 `user+silent@gmail.com`로 적용했다.
* Gmail에서 중요한 프로젝트의 알림만 inbox에 노출시키고, 나머지는 보관처리 하도록 필터를 구성하였음

| 설정        | 일치                                                  | 작업                           |
|-------------|-------------------------------------------------------|--------------------------------|
| 중요한 알림 | `from:(@md.getsentry.com) to:("user"@gmail.com)`      | 라벨 적용, 받은편지함 건너뛰기 |
| 그 외 알림  | `from:(@md.getsentry.com) to:(user+silent@gmail.com)` | 라벨 적용                      |

중요한 알림은 `"user"` 큰 따옴표로 묶었는데, 이렇게하지 않으면 `user+silent`도 검색된다.
