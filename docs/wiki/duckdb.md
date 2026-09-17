---
created: 2026-09-17
---
# DuckDB

분석용 인프로세스 SQL 데이터베이스 관리 시스템.

> DuckDB is an analytical in-process SQL database management system

https://github.com/duckdb/duckdb

MacOS는 `brew install duckdb`로 설치 가능.
`duckdb` 명령어를 제공한다.

로컬에서 csv, json 등 포맷의 **다중 파일**을 한 번에 조회할 수 있는 편리성을 제공한다.
기존에는 SQLite나 python의 csv, pandas를 이용하여 파일을 순회 및 적재해야 했는데 그 과정이 생략된다.

다음과 같이 GLOB 패턴으로 하나로 합칠 수 있다:

```sql
SELECT * FROM '~/Downloads/extract-2026*.csv'
```

뷰로 만들면 파일 경로 명세는 한 번으로 줄일 수 있다:

```sql
CREATE VIEW items AS select * from '~/Downloads/extract-2026*.csv'
```

## DuckDB UI

`-ui` 옵션은 내장된 노트북을 호스팅한다. `duckdb -ui`:

![DuckDB UI](res/duckdb-ui.png)
