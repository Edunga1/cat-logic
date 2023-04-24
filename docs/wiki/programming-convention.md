# Programming Convention

# Semantic Versioning

`9.12.3`과 같이 3개의 넘버링으로 소프트웨어 버전을 표현하는 방식이다.

`X.Y.Z`를 각각 major, minor, patch 버전이라 부른다.

https://semver.org/ 이런 사이트가 있지만 막상 버전 갱신하려면 헷갈린다.

가끔 관점을 다르게 볼 때 명확해지기도 하는데, 다음 코멘트가 이런 상황에 딱 들어맞다고 생각한다:

> Semver has its philosophy, but a pragmatic approach to versioning is:
> <upgrades may break API> . <downgrades may break API> . <fine either way>

쓰레드는 [리팩토링은 어떤 버전을 올려야 하나요?](https://users.rust-lang.org/t/semver-for-refactoring-change/81370/5)

# `X-` prefix?

`experimental` 혹은 `extension`의 약자라고 한다.
보통 비공식적(unofficial) 사양을 나타내는데 주로 사용한다.

HTTP에는 `x-forwareded-for`처럼 `x`를 prefix로 하는 헤더가 많다.

docker-compose.yml 명세할 때 사용자 정의 영역으로 구분하기 위해서도 쓴다.

다음은 [airflow Github](https://github.com/apache/airflow/blob/main/docs/apache-airflow/howto/docker-compose/docker-compose.yaml#L44)에서 제공하는 docker-compose.yml 예시:
```yaml
x-airflow-common:
  &airflow-common
  image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.0.2}
  environment:
    &airflow-common-env
    AIRFLOW__CORE__EXECUTOR: CeleryExecutor
    AIRFLOW__CORE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__BROKER_URL: redis://:@redis:6379/0
    AIRFLOW__CORE__FERNET_KEY: ''
    AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'
    AIRFLOW__CORE__LOAD_EXAMPLES: 'true'
    AIRFLOW__API__AUTH_BACKEND: 'airflow.api.auth.backend.basic_auth'

services:
  # ...
```

# ISO 8601 - 날짜, 시간 관련 커뮤니케이션 국제 표준

포맷 간단 요약: https://www.cryptosys.net/pki/manpki/pki_iso8601datetime.html

**특징**

* 타임존을 표기할 수 있다. `+hh:mm` 가 붙는다: `"2020-07-10T02:41:29.477+07:00"`
  * [표준 시간대 지정자](https://ko.wikipedia.org/wiki/ISO_8601#%ED%91%9C%EC%A4%80_%EC%8B%9C%EA%B0%84%EB%8C%80_%EC%A7%80%EC%A0%95%EC%9E%90(time_zone_designator))라고 한다.
* Z 문자가 붙으면 UTC를 의미한다.
* `"2020-01-01T10:00:00+09:00"` 는 UTC `"2020-01-01T01:00:00Z"` 와 같다.
  * 9시간으로 offset이 포함되어 있다는 의미다.
* django는 json response 시 datetime 타입을 자동으로 iso 양식으로 변환한다.
* node도 toJSON() 을 구현한 것을 보면 자동으로 iso 양식으로 변환될 것이다.
* 시간대 지정자를 표기하지 않으면 local time을 의미한다.

사용하려면:
* [javascript](./javascript.md)의 경우 `new Date().toJSON()`: `"2020-07-10T02:42:55.338Z"`
* [python](./python.md)의 경우 `datetime.now().isoformat()`: `'2020-07-10T02:43:36.933276'`

[python](./python.md)의 경우 시간대 지정자 `Z`가 생략되었다.

## python의 datetime.isoformat()은 ISO 8601을 위반한다.

https://stackoverflow.com/questions/19654578/python-utc-datetime-objects-iso-format-doesnt-include-z-zulu-or-zero-offset

> Python `datetime` objects don't have time zone info by default, and without it, Python actually violates the ISO 8601 specification ([if no time zone info is given, assumed to be local time](http://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators))

위키 중:

> Time zones in ISO 8601 are represented as local time (with the location unspecified), as UTC, or as an offset from UTC.

지정자를 생략하면 로컬 시각으로 간주된다고 한다.\
서버-클라이언트간 통신에서 로컬 시각을 사용하지 말고, 오프셋을 명시적으로 표기하는 편이 좋다.
