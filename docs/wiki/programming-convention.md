---
created: 2023-01-07
---
# Programming Convention

소프트웨어 개발 컨벤션.

## Semantic Versioning

`9.12.3`과 같이 3개의 넘버링으로 소프트웨어 버전을 표현하는 방식이다.

`X.Y.Z`를 각각 major, minor, patch 버전이라 부른다.

https://semver.org/ 이런 사이트가 있지만 막상 버전 갱신하려면 헷갈린다.

가끔 관점을 다르게 볼 때 명확해지기도 하는데, 다음 코멘트가 이런 상황에 딱 들어맞다고 생각한다:

> Semver has its philosophy, but a pragmatic approach to versioning is:
> <upgrades may break API> . <downgrades may break API> . <fine either way>

쓰레드는 [리팩토링은 어떤 버전을 올려야 하나요?](https://users.rust-lang.org/t/semver-for-refactoring-change/81370/5)

## `X-` 접두사의 의미

HTTP 헤더 등 다양한 곳에서 `X-` 접두사로 표기한 정보를 볼 수 있다.

`X`는 `experimental` 혹은 `extension`의 약자라고 한다.
보통 비공식적(unofficial) 사양을 나타내는데 주로 사용한다.

HTTP 헤더는 `x-forwareded-for`가 있다.
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) 문서에 따르면 사실상의 표준이라고 한다.
표준화된 헤더는 `Forwarded`:

> The `X-Forwarded-For` (XFF) request header is a de-facto standard header for identifying the originating IP address of a client connecting to a web server through a proxy server.
>
> A standardized version of this header is the HTTP `Forwarded` header.

[Airflow](/docs/wiki/airflow.md)는 [docker-compose.yaml](https://github.com/apache/airflow/blob/2.10.2/docs/apache-airflow/howto/docker-compose/docker-compose.yaml#L47)을 제공해 주는데, 여기서도 `x-` 접두사를 사용한다.

```yaml
x-airflow-common:
  &airflow-common
  image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:|version|}
  environment:
    &airflow-common-env
    AIRFLOW__CORE__EXECUTOR: CeleryExecutor
    AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__BROKER_URL: redis://:@redis:6379/0
    AIRFLOW__CORE__FERNET_KEY: ''
    AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'
    AIRFLOW__CORE__LOAD_EXAMPLES: 'true'
    AIRFLOW__API__AUTH_BACKENDS: 'airflow.api.auth.backend.basic_auth,airflow.api.auth.backend.session'
```

다른 필드와 구분하기 위한 용도인 듯.

## ISO 8601 - 날짜, 시간 관련 커뮤니케이션 국제 표준

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

### python의 datetime.isoformat()은 ISO 8601을 위반한다.

https://stackoverflow.com/questions/19654578/python-utc-datetime-objects-iso-format-doesnt-include-z-zulu-or-zero-offset

> Python `datetime` objects don't have time zone info by default, and without it, Python actually violates the ISO 8601 specification ([if no time zone info is given, assumed to be local time](http://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators))

위키 중:

> Time zones in ISO 8601 are represented as local time (with the location unspecified), as UTC, or as an offset from UTC.

지정자를 생략하면 로컬 시각으로 간주된다고 한다.\
서버-클라이언트간 통신에서 로컬 시각을 사용하지 말고, 오프셋을 명시적으로 표기하는 편이 좋다.

## 이름 짓기

[Decima 엔진](https://en.wikipedia.org/wiki/Decima_(game_engine))은 2013년에 공개된 PS4 등 다양한 플랫폼에서 실행되는 게임을 위한 게임 엔진이다.
공식 홈페이지의 소개란에서는 이름 짓기의 중요성을 강조한다.

> We couldn't be too concerned before, too busy making games. Besides, everybody knows that Naming Things is the number one problem in software design. But we found a new partner, and they were adamant about Doing This Right. And you need to have a name. Otherwise you can't announce it.
>
> 이전에는 게임을 만들느라 너무 바빠서 신경 쓸 겨를이 없었습니다. 게다가 소프트웨어 디자인에서 네이밍이 가장 큰 문제라는 것은 누구나 알고 있는 사실입니다. 하지만 우리는 새로운 파트너를 찾았고, 그들은 이 일을 제대로 하겠다고 단호하게 말했습니다. 그리고 이름이 있어야 합니다. 그렇지 않으면 발표할 수 없습니다.  

## Architecture Decision Record (ADR)

소프트웨어 아키텍처에 대한 결정을 문서화하는 것.
프로그래밍 언어나 라이브러리 등 기술적 결정을 문서화하여 코드 베이스에 함께 저장한다.

다음 깃허브 저장소는 ADR의 예제를 모아두었다. \
https://github.com/joelparkerhenderson/architecture-decision-record

관련 글:

- [ADR을 써야하는 이유](https://news.hada.io/topic?id=2665)
- [ARCHITECTURE.md를 추가합시다](https://news.hada.io/topic?id=3700)

아직 직접 작성해본 적은 없다.

개인적인 생각으로는, ADR을 PR을 통해 코드베이스에 반영한다면 협업자와의 합의를 PR로 증명할 수 있을 듯.

꼭 아키텍처와 관련된 내용 뿐만 아니라, 코드 스타일 등 컨벤션에 대한 협의점을 문서화하는 데도 사용할 수 있을 것 같다.
