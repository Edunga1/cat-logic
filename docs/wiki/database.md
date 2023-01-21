# Database

<!--toc:start-->
- [Database](#database)
- [설계](#설계)
  - [정규화 (Normalization)](#정규화-normalization)
    - [제 1 정규화 (First Normal Form)](#제-1-정규화-first-normal-form)
    - [제 2 정규화 (Second Normal Form)](#제-2-정규화-second-normal-form)
    - [제 3 정규화 (Third Normal Form)](#제-3-정규화-third-normal-form)
    - [역 정규화 (Denormalization)](#역-정규화-denormalization)
- [테이블 이름 컨벤션](#테이블-이름-컨벤션)
  - [단수 vs. 복수](#단수-vs-복수)
- [데이터베이스는 큐가 아닙니다.](#데이터베이스는-큐가-아닙니다)
  - [Why not a database?](#why-not-a-database)
  - [Redis를 사용하는 것은 어떨까?](#redis를-사용하는-것은-어떨까)
- [MySQL Docker Image](#mysql-docker-image)
  - [이미지 내에 데이터 포함하기](#이미지-내에-데이터-포함하기)
- [H2 Database](#h2-database)
  - [`NumberFormatException: for input String: "..."` 에러](#numberformatexception-for-input-string-에러)
<!--toc:end-->

# 설계

## 정규화 (Normalization)

데이터 중복을 최소화하는 작업

### 제 1 정규화 (First Normal Form)

inflexible 부분을 제거하는 것이 목적

```
------------------------------------------------------------------------
| name | email           | email2             | email...               |
------------------------------------------------------------------------
| john | apple@gmail.com | banana@hanmail.net |                        |
| paul | cat@gmail.com   | null               |                        |
------------------------------------------------------------------------
```

사용자에 대한 이메일 목록을 관리하고자 할 때, 테이블이 하나라면 **이메일이 추가**되면 컬럼이 늘어나게 된다.

또한 paul은 하나의 이메일을 가지지만 여러개의 메일을 가진 john에 의해 빈 필드를 가져야만 한다.

이 문제를 1:N or N:N 관계로 분리하여 해결하는 것이 제 1 정규화.

### 제 2 정규화 (Second Normal Form)

**Composite Key**를 사용할 때 일반 필드가 Composite Key 중 **일부분**에 의존할 때 문제가 발생한다.

```
-----------------------------------------------------------------------
| Cours  | Date      | CourseTitle      | Room | Capacity | Available |
-----------------------------------------------------------------------
| SQL101 | 3/1/2013  | SQL Fundamentals | 4A   | 12       | 4         |
| DB202  | 3/1/2013  | Database Design  | 7B   | 14       | 7         |
| SQL101 | 4/14/2013 | SQL Fundamentals | 7B   | 14       | 10        |
| SQL101 | 5/28/2013 | SQL Fundamentals | 12A  | 8        | 8         |
| CS200  | 4/15/2012 | C Programming    | 4A   | 12       | 11        |
-----------------------------------------------------------------------
```

Cours + Date가 **Composite primary key**라고 할 때

CourseTitle은 Course에 **의존된다.**

CourseTitle을 Course를 FK, PK로 한 테이블로 분리하여 해결하는 것이 제 2 정규화.

### 제 3 정규화 (Third Normal Form)

일반 필드가 일반 필드에 의존될 때 발생.

2 정규화와 마찬가지로 테이블로 분리하지만 차이 점은 기존 테이블에서 분리한 테이블을 참조하는 것

### 역 정규화 (Denormalization)

특별한 경우 **편리를 위해서** 역정규화를 하기도 한다. 특히 제 3 정규화에서 역정규화를 하는데

예를 들면 Zip code의 경우 State + City에 의해 결정되는데
이를 저장 해 놓으면 서버에서 계산할 수 없는 부분이므로 저장 해 놓으면 단순히 Select 하는 것으로
Zip code를 얻을 수 있기 때문.

# 테이블 이름 컨벤션

## 단수 vs. 복수

테이블 이름은 단수로 지어야 하나 복수로 지어야 하나?

보통 코드에서 리스트인 변수 이름을 지을때는 항상 복수형을 사용한다.
왠만하면 ~List 라는 이름을 사용하지 않는다.

https://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names

링크를 보면 단수, 복수 모두 비등한데. 1200여개의 점수를 얻은 두 번째 답변이 와닿는다.
총 6가지 이유를 가지고 설득하는데 특히 와닿았던 건..

> Reason 1 (Concept). You can think of bag containing apples like "AppleBag", it doesn't matter if contains 0, 1 or a million apples, it is always the same bag. Tables are just that, containers, the table name must describe what it contains, not how much data it contains. Additionally, the plural concept is more about a spoken language one (actually to determine whether there is one or more).

테이블 이름은 내용(row)을 담고있는 컨테이너를 의미하도록 컨셉을 잡는다.
따라서 *Apple*을 가진 테이블 *AppleBag*과 같이 이름지을 수 있다.
*Apple*을 0, 1, 수백만개를 표현할 수 있으므로 적절하다.

정말로 *Apples*라는 테이블 이름에 내용(*Apple*)이 0개면 이상하지 싶다.

> Reason 2. (Convenience). it is easier come out with singular names, than with plural ones. Objects can have irregular plurals or not plural at all, but will always have a singular one (with few exceptions like News).

모든 단어가 단수와 복수를 구분하지 않기 때문이라는데 이 이유가 가장 와닿는다.
복수형으로 표현한다면 *News*를 표현하는 테이블 이름은 어떻게 지어야 하나?

> Reason 3. (Aesthetic and Order). Specially in master-detail scenarios, this reads better, aligns better by name, and have more logical order (Master first, Detail second)

이 이유도 정말 와닿는다.

부모 테이블과 상세 테이블 관계로 나타낼 때 보통 테이블 이름으로 그 관계를 나타낸다.

단수로 나타내면:

* *Order*
* *OrderDetail*

하지만 복수로 나타내면:

* *Orders*
* *OrderDetails*

규칙이 깨지는 느낌을 받는다. *테이블 이름을 Orders로 지었으니 OrdersDetails 였던가?*

# 데이터베이스는 큐가 아닙니다.

[시스템 설계 자료 모음](https://news.hada.io/topic?id=6686)에서
Message Queue Antipattern 단락의 [A Database Is Not a Queue](https://blog.codepath.com/2012/11/15/asynchronous-processing-in-web-applications-part-1-a-database-is-not-a-queue/) 글을 읽었다.

데이터베이스를 큐로 사용하면 안된다는 내용이지만, 다른 관점으로는 메시지 큐 서비스가 제공하는 기능은 무엇인지 말하는 내용이기도 하다.

## Why not a database?

웹 스택에 새로운 기술을 도입하는 것을 꺼리기 때문에 데이터베이스를 그냥 사용하고 싶은 유독을 받을 수도 있을거라고 한다.
이미 RDMBS를 사용하고 있을 것이므로, 백그라운드처리 용도로 사용하면 빠르게 끝났다고 생각하겠지만 거기엔 많은 제약 사항과 고려할 점이 있다.

먼저 consuming 방식이다. producer는 테이블에 명령을 쌓고 consumer는 주기적으로 데이터를 polling 하는 것으로 구현하게 된다. 중요한 task면 초 단위로, 그렇지 않으면 몇 분이나 몇 시간마다 할 것이다.
문제는 짧은 주기의 polling이 긴 주기의 polling에 영향을 받는 거다. 모든 polling의 합 만큼 짧은 주기의 polling이 지연된다. 즉각적으로 처리해야 하는 task의 실행을 보장하기 어려워 진다.

consumer가 많아지면 중복 처리를 막기 위해 읽기 lock을 걸 수 밖에 없다. 그러면 consumer간 경쟁하게 된다.
모두 처리하기 전까지는 계속 lock을 걸테고 그러면 다른 consumer는 처리할 수 없다. 처리가 늦으면 producer가 생산하는 명령은 무한정 쌓인다.

완료한 작업을 삭제하는데도 문제가 있다. task가 쌓이기만 하면 계속 커질것이므로 주기적으로 삭제해야 한다.
task 처리하면서 발생하는 업데이트 쿼리와 삭제 쿼리가 함께 자주 발생하는 것은 효율적인 방식은 아니다.

이런 문제들이 합쳐지면 scaling하기 어렵다.

## Redis를 사용하는 것은 어떨까?

redis를 사용하는 것은 어떻게 생각하는지 물어보는 덧글이 있다.
ruby 생태계에서는 [resque](https://github.com/resque/resque) 프로젝트가 있는데, 백그라운드 잡 관리용으로 redis를 사용하는 것이 흔하다고 한다.
다만 메시지 큐를 완전히 대체한다고 보긴 어렵고, 장기적으로 확장성, 잡 처리량, 메시지 처리 제어, 에러 핸들링에 놓치는 것이 있을 수 있다고 한다.

> I am really glad you brought this up. This is something I will covering in greater detail in my next post. In the ruby ecosystem, Redis is used very frequently as a job queue to some success with resque [https://github.com/defunkt/resque](https://github.com/defunkt/resque) but that doesn’t mean redis is a true replacement for a MQ by any stretch. And I think by trying to replace the need for a true MQ with Redis, depending on requirements you may be missing out on more then initially realized in terms of long term scalability, job throughput, message delivery control, robust error handling, etc.

# MySQL Docker Image

Official mysql image: https://hub.docker.com/_/mysql

공식 이미지는 시작 시 `docker-entrypoint-initdb.d/` 폴더에 sql, sh, gz 파일을 두면 자동으로 실행하는 구조로 되어있다.:

> it will execute files with extensions .sh, .sql and .sql.gz that are found in /docker-entrypoint-initdb.d

## 이미지 내에 데이터 포함하기

파일, 내용이 많으면 `docker-entrypoint-initdb.d/`에 두는 것만으로는 시작이 오래 걸린다.
이를 해결하기 위해서 데이터를 이미지 내에 포함할 수 있다. 대신 이미지 크기가 그만큼 늘어난다.
개인적으로는 이 방법으로 테이블만 생성하고, integration 테스트하는데 사용하고 있다.

```
FROM mysql:5.6 AS builder

RUN ["sed", "-i", "s/exec \"$@\"/echo \"not running $@\"/", "/usr/local/bin/docker-entrypoint.sh"]

ENV MYSQL_ROOT_PASSWORD=0000 \
    MYSQL_DATABASE=test_quicket \
    MYSQL_USER=testuser \
    MYSQL_PASSWORD=testpassword

COPY schema /docker-entrypoint-initdb.d

RUN ["/usr/local/bin/docker-entrypoint.sh", "mysqld", "--datadir", "/initialized-db"]

FROM mysql:5.6

ENV TZ=Asia/Seoul

COPY --from=builder /initialized-db /var/lib/mysql
```

* multi-stage build 이용하여 builder stage에서 설정 및 sql 파일을 복사하고 부트스트래핑 스크립트를 직접 실행한다.
* main stage에서 builder의 DB 데이터를 COPY하고 실행한다.

# H2 Database

## `NumberFormatException: for input String: "..."` 에러

`UNION ALL` 쿼리로 3개의 테이블을 포함하고, 컬럼 하나가 integer 타입일 때 발생했다.

`CAST(foo as char)` 명시적으로 타입 캐스팅을 통해 통일하여 해결했다.
