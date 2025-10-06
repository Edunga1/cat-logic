---
created: 2024-03-20
---
# PostgreSQL

객체-관계형 데이터베이스 관리 시스템.

제대로 사용한 적은 없고, [Amazon Redshift](./amazon-redshift.md)를 통해서 쿼리 작성만 해보았다.

## 샌드박스 환경

도커로 Postgres를 실행해보자.

```sh
$ docker run -it --rm --name some-postgres -e POSTGRES_PASSWORD=password postgres
```

`POSTGRES_PASSWORD`는 필수 환경 변수이다. 컨테이너 내에서 접속할 거라 외울 필요는 없다.

이제 `psql`로 접속한다.

```sh
$ docker exec -ti some-postgres psql -U postgres
psql (16.2 (Debian 16.2-1.pgdg120+2))
Type "help" for help.

postgres=# help
You are using psql, the command-line interface to PostgreSQL.
Type:  \copyright for distribution terms
       \h for help with SQL commands
       \? for help with psql commands
       \g or terminate with semicolon to execute query
       \q to quit
```

### 기본 명령어

`\l` : 데이터베이스 목록

```sh
postgres=# \l
                                                      List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 postgres  | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 template0 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/postgres          +
           |          |          |                 |            |            |            |           | postgres=CTc/postgres
 template1 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/postgres          +
           |          |          |                 |            |            |            |           | postgres=CTc/postgres
(3 rows)
```

`\c` : 데이터베이스 접속\
`\d` : 테이블, 뷰, 시퀀스 목록

```sh
postgres=# \c postgres
You are now connected to database "postgres" as user "postgres".
postgres=# \d
Did not find any relations.
```

아무 테이블도 없다. 테이블을 만들어보자.

ChatGPT에 부탁해서 학생 테이블 생성 쿼리를 받았다.

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    gender VARCHAR(10)
);
```

```sh
postgres=# CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    gender VARCHAR(10)
);
CREATE TABLE
postgres=# \d
               List of relations
 Schema |      Name       |   Type   |  Owner
--------+-----------------+----------+----------
 public | students        | table    | postgres
 public | students_id_seq | sequence | postgres
(2 rows)
```

이제 `\d`로 테이블이 생성되었음을 확인할 수 있다.

```sh
postgres=# select * from students;
 id | name | age | gender
----+------+-----+--------
(0 rows)
```

이제 기본적인 쿼리는 다른 SQL과 비슷하므로 사용하는데 큰 어려움은 없다.

## MySQL 쿼리 차이점

MySQL과 다르게, group by로 aggregation 시 aggregation function을 사용하지 않는 컬럼을 select에 포함할 수 없다.

이를 해결하기 위해서, 모든 값을 보고싶다면 `listagg`를 사용하자. MySQL의 `group_concat`와 비슷하다.\
아무 값이나 보고 싶다면 `any_value`를 사용하자. MySQL의 그냥 컬럼을 select하는 것과 비슷하다.

```sql
select
  family,
  listagg(name, ', ') as names,
  any_value(age) as age
from users
group by family;
```

날짜 차이를 구할때는 `-` 연산자를 사용하면 human readable한 값으로 출력된다.

```sql
select TIMESTAMP '2024-02-01 11:55:30' - TIMESTAMP '2024-01-30 04:11:05' as diff;
      diff
-----------------
 2 days 07:44:25
(1 row)
```

---

group by, where 절 등에서 `DATE_FORMAT()` 사용한다면, PostgreSQL에서는 `DATE_TRUNC`를 고려하자.
지정한 단위로 날짜를 잘라준다. 예를 들어 `MONTH`가 기준이라면 일자 아래는 가장 작은 값으로 변경된다.

```sql
postgres=# select NOW(), DATE_TRUNC('YEAR', NOW());
              now              |       date_trunc
-------------------------------+------------------------
 2024-12-16 08:39:44.096672+00 | 2024-01-01 00:00:00+00
(1 row)

postgres=# select NOW(), DATE_TRUNC('MONTH', NOW());
              now              |       date_trunc
-------------------------------+------------------------
 2024-12-16 08:39:20.209035+00 | 2024-12-01 00:00:00+00
(1 row)

postgres=# select NOW(), DATE_TRUNC('HOUR', NOW());
              now              |       date_trunc
-------------------------------+------------------------
 2024-12-16 08:39:47.338668+00 | 2024-12-16 08:00:00+00
(1 row)
```

`DATE_FORMAT()`과 같은 기능이 필요하다면 `TO_CHAR()`를 사용한다.

```sql
postgres=# select TO_CHAR(NOW(), 'YYYY-MM-DD HH24:MI:SS');
       to_char
---------------------
 2024-12-16 08:45:27
(1 row)
```

MySQL의 포맷과 다르다.
