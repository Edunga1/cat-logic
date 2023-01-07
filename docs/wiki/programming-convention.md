# Programming Convention

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
