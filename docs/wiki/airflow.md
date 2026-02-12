---
created: 2023-02-08
---
# Airflow

배치, 스케쥴링을 위한 워크플로우 관리 플랫폼.


참고 자료

- https://www.astronomer.io/docs/learn/dag-best-practices
- https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html

## 개념

### 데이터 주도

Airflow 작업은 cron 표현식을 통해 주기를 결정한다.\
cron은 해당 시각에 작업이 실행된다는 의미지만, Airflow는 스케줄 구간을 나눈다는 의미로 사용한다.\
현재 시간이 구간을 지나면, 그 구간에 대한 작업이 실행된다.

|                          |                                      |
|--------------------------|--------------------------------------|
| Status                   | success                              |
| Run ID                   | scheduled__2026-02-12T02:00:00+00:00 |
| Run type                 | scheduled                            |
| Run duration             | 00:00:30                             |
| Last scheduling decision | 2026-02-12, 11:21:36 KST             |
| Queued at                | 2026-02-12, 11:21:05 KST             |
| Started                  | 2026-02-12, 11:21:05 KST             |
| Ended                    | 2026-02-12, 11:21:36 KST             |
| Data interval start      | 2026-02-12, 11:00:00 KST             |
| Data interval end        | 2026-02-12, 11:10:00 KST             |
| Externally triggered     | False                                |
| Run config               | None                                 |

위 테이블은 Airflow Web UI에서 DAG 실행 기록을 나타낸다.\
Data Interval 11:00 ~ 11:10 구간의 시간 후인 11:21:05에 구간에 대한 작업이 실행되었다.

해당 구간의 데이터만 처리할 지는 개발자에 의해 결정된다.\
현재 시간을 기준으로 데이터를 쿼리해서 처리한다면 Airflow의 의도와 다르게 동작할 수 있다.\
그 이유는 다음에 실행된 기록을 보면 알 수 있다.

|                          |                                      |
|--------------------------|--------------------------------------|
| Status                   | success                              |
| Run ID                   | scheduled__2026-02-12T02:10:00+00:00 |
| Run type                 | scheduled                            |
| Run duration             | 00:00:30                             |
| Last scheduling decision | 2026-02-12, 11:22:07 KST             |
| Queued at                | 2026-02-12, 11:21:37 KST             |
| Started                  | 2026-02-12, 11:21:37 KST             |
| Ended                    | 2026-02-12, 11:22:07 KST             |
| Data interval start      | 2026-02-12, 11:10:00 KST             |
| Data interval end        | 2026-02-12, 11:20:00 KST             |
| Externally triggered     | False                                |
| Run config               | None                                 |

위 테이블은 11:10 ~ 11:20 구간에 대한 작업이 11:21:37에 실행된 것을 나타낸다.\
즉 이전 처리 시각인 11:21:05에서 겨우 30초 후에 다음 구간에 대한 작업이 실행됐다.\
만약 현재 시각을 기준으로 데이터를 쿼리해서 처리한다면, 겨우 30초 밖에 지나지 않았기 때문에 처리할 데이터가 거의 없을 것이다.

그래서 Airflow는 [Data Interval 변수를 제공한다](https://airflow.apache.org/docs/apache-airflow/stable/templates-ref.html#variables).\
데이터 구간의 시작(`{{ data_interval_start }}`)과 끝(`{{ data_interval_end }}`) 시각을 이용하여 해당 구간의 데이터만 처리하도록 코드를 작성해야 한다.

이는 멱등성과 직결된다.

## Airflow 연습

https://github.com/Edunga1/practice-airflow

docker-compose로 airflow 환경 구축하고 테스트할 수 있다.

[Airflow 공식 문서](https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html)에서 docker로 실행하는 방법을 잘 설명해놓았다.

## Airflow가 DAG 파일을 인식하는 방식

[Loading DAGs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html#loading-dags)

> When searching for DAGs inside the DAG_FOLDER, Airflow only considers Python files that contain the strings airflow and dag (case-insensitively) as an optimization.

`airflow`와 `dag` 문자열을 포함하는 파이썬 파일만 DAG 파일로 인식한다.

DAG 스크립트를 모듈화하여 DAG 생성을 분리한다면 DAG 파일을 인식하지 못할 수 있으니 주의해야 한다.

> To consider all Python files instead, disable the DAG_DISCOVERY_SAFE_MODE configuration flag.

모든 파이썬 파일을 DAG 파일로 인식할 수 있는 옵션도 있다고 한다.

## 다음 DAG 실행 시간

```sh
airflow dags next-execution <DAG_ID>
```

Paused 상태인 DAG는 다음 실행 시간을 알 수 없다.

Web UI에서 확인하는 방법은 없는 듯.
