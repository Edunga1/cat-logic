# Airflow

## Airflow 연습

https://github.com/Edunga1/practice-airflow

docker-compose로 airflow 환경 구축하고 테스트할 수 있다.

[Airflow 공식 문서](https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html)에서 docker로 실행하는 방법을 잘 설명해놓았다.

## airflow가 DAG 파일을 인식하는 방식

[Loading DAGs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html#loading-dags)

> When searching for DAGs inside the DAG_FOLDER, Airflow only considers Python files that contain the strings airflow and dag (case-insensitively) as an optimization.

`airflow`와 `dag` 문자열을 포함하는 파이썬 파일만 DAG 파일로 인식한다.

DAG 스크립트를 모듈화한다고 DAG 생성하는 부분을 중앙집중화한다면 DAG 파일을 인식하지 못할 수 있으니 주의해야 한다.

> To consider all Python files instead, disable the DAG_DISCOVERY_SAFE_MODE configuration flag.

모든 파이썬 파일을 DAG 파일로 인식할 수 있는 옵션도 있다고 한다.

## 다음 DAG 실행 시간

```sh
airflow dags next-execution <DAG_ID>
```

Paused 상태인 DAG는 다음 실행 시간을 알 수 없다.

Web UI에서 확인하는 방법은 없는 듯.
