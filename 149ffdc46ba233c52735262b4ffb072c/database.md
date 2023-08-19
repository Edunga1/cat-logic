# Database

## 설계

### 정규화 (Normalization)

데이터 중복을 최소화하는 작업

#### 제 1 정규화 (First Normal Form)

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

#### 제 2 정규화 (Second Normal Form)

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

#### 제 3 정규화 (Third Normal Form)

일반 필드가 일반 필드에 의존될 때 발생.

2 정규화와 마찬가지로 테이블로 분리하지만 차이 점은 기존 테이블에서 분리한 테이블을 참조하는 것

#### 역 정규화 (Denormalization)

특별한 경우 **편리를 위해서** 역정규화를 하기도 한다. 특히 제 3 정규화에서 역정규화를 하는데

예를 들면 Zip code의 경우 State + City에 의해 결정되는데
이를 저장 해 놓으면 서버에서 계산할 수 없는 부분이므로 저장 해 놓으면 단순히 Select 하는 것으로
Zip code를 얻을 수 있기 때문.

## 테이블 이름 컨벤션

### 단수 vs. 복수

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

## 데이터베이스는 큐가 아닙니다.

[시스템 설계 자료 모음](https://news.hada.io/topic?id=6686)에서
Message Queue Antipattern 단락의 [A Database Is Not a Queue](https://blog.codepath.com/2012/11/15/asynchronous-processing-in-web-applications-part-1-a-database-is-not-a-queue/) 글을 읽었다.

데이터베이스를 큐로 사용하면 안된다는 내용이지만, 다른 관점으로는 메시지 큐 서비스가 제공하는 기능은 무엇인지 말하는 내용이기도 하다.

### Why not a database?

웹 스택에 새로운 기술을 도입하는 것을 꺼리기 때문에 데이터베이스를 그냥 사용하고 싶은 유독을 받을 수도 있을거라고 한다.
이미 RDMBS를 사용하고 있을 것이므로, 백그라운드처리 용도로 사용하면 빠르게 끝났다고 생각하겠지만 거기엔 많은 제약 사항과 고려할 점이 있다.

먼저 consuming 방식이다. producer는 테이블에 명령을 쌓고 consumer는 주기적으로 데이터를 polling 하는 것으로 구현하게 된다. 중요한 task면 초 단위로, 그렇지 않으면 몇 분이나 몇 시간마다 할 것이다.
문제는 짧은 주기의 polling이 긴 주기의 polling에 영향을 받는 거다. 모든 polling의 합 만큼 짧은 주기의 polling이 지연된다. 즉각적으로 처리해야 하는 task의 실행을 보장하기 어려워 진다.

consumer가 많아지면 중복 처리를 막기 위해 읽기 lock을 걸 수 밖에 없다. 그러면 consumer간 경쟁하게 된다.
모두 처리하기 전까지는 계속 lock을 걸테고 그러면 다른 consumer는 처리할 수 없다. 처리가 늦으면 producer가 생산하는 명령은 무한정 쌓인다.

완료한 작업을 삭제하는데도 문제가 있다. task가 쌓이기만 하면 계속 커질것이므로 주기적으로 삭제해야 한다.
task 처리하면서 발생하는 업데이트 쿼리와 삭제 쿼리가 함께 자주 발생하는 것은 효율적인 방식은 아니다.

이런 문제들이 합쳐지면 scaling하기 어렵다.

### Redis를 사용하는 것은 어떨까?

redis를 사용하는 것은 어떻게 생각하는지 물어보는 덧글이 있다.
ruby 생태계에서는 [resque](https://github.com/resque/resque) 프로젝트가 있는데, 백그라운드 잡 관리용으로 redis를 사용하는 것이 흔하다고 한다.
다만 메시지 큐를 완전히 대체한다고 보긴 어렵고, 장기적으로 확장성, 잡 처리량, 메시지 처리 제어, 에러 핸들링에 놓치는 것이 있을 수 있다고 한다.

> I am really glad you brought this up. This is something I will covering in greater detail in my next post. In the ruby ecosystem, Redis is used very frequently as a job queue to some success with resque [https://github.com/defunkt/resque](https://github.com/defunkt/resque) but that doesn’t mean redis is a true replacement for a MQ by any stretch. And I think by trying to replace the need for a true MQ with Redis, depending on requirements you may be missing out on more then initially realized in terms of long term scalability, job throughput, message delivery control, robust error handling, etc.

## MySQL

### MySQL Docker Image
Official mysql image: https://hub.docker.com/_/mysql

공식 이미지는 시작 시 `docker-entrypoint-initdb.d/` 폴더에 sql, sh, gz 파일을 두면 자동으로 실행하는 구조로 되어있다.:

> it will execute files with extensions .sh, .sql and .sql.gz that are found in /docker-entrypoint-initdb.d

### 이미지 내에 데이터 포함하기

파일, 내용이 많으면 `docker-entrypoint-initdb.d/`에 두는 것만으로는 시작이 오래 걸린다.
이를 해결하기 위해서 데이터를 이미지 내에 포함할 수 있다. 대신 이미지 크기가 그만큼 늘어난다.
개인적으로는 이 방법으로 테이블만 생성하고, integration 테스트하는데 사용하고 있다.

```dockerfile
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

### Functional Key Parts

https://dev.mysql.com/doc/refman/8.0/en/create-index.html#create-index-functional-key-parts

> MySQL 8.0.13 and higher supports functional key parts that index expression values rather than column or column prefix values.

MySQL 8.0.13에서부터 인덱스 생성 시 함수를 사용할 수 있다.

예를들어 컬럼에만 인덱스를 걸면:

```sql
CREATE TABLE stats
(
    id         int auto_increment primary key,
    created_at datetime not null
);
CREATE INDEX idx_created_at ON stats (created_at);

EXPLAIN SELECT * FROM stats WHERE MONTH(created_at) = 1;
```

| | |
| :- | :- |
| **id** | 1 |
| **select\_type** | SIMPLE |
| **table** | stats |
| **partitions** | NULL |
| **type** | index |
| **possible\_keys** | NULL |
| **key** | idx\_created\_at |
| **key\_len** | 5 |
| **ref** | NULL |
| **rows** | 1 |
| **filtered** | 100 |
| **Extra** | Using where; Using index |

하지만 functional key parts를 사용하면:

```sql
CREATE TABLE stats
(
    id         int auto_increment primary key,
    created_at datetime not null
);
CREATE INDEX idx_created_at_month ON stats ((MONTH(created_at)));

EXPLAIN SELECT * FROM stats WHERE MONTH(created_at) = 1;
```

| | |
| :- | :- |
| **id** | 1 |
| **select\_type** | SIMPLE |
| **table** | stats |
| **partitions** | NULL |
| **type** | ref |
| **possible\_keys** | idx\_created\_at\_month |
| **key** | idx\_created\_at\_month |
| **key\_len** | 5 |
| **ref** | const |
| **rows** | 1 |
| **filtered** | 100 |
| **Extra** | NULL |

> Functional indexes are implemented as hidden virtual generated columns, which has these implications:

이 인덱스는 숨겨진 가상 컬럼으로 구현된다. 따라서 컬럼의 제약을 따른다:
- 테이블의 총 컬럼 수 제한에 포함된다. [Innodb의 경우 1017개](https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html).
- 해당 컬럼에서 사용 가능한 함수만 함수 인덱스에 사용 가능
- virtual column은 저장 공간을 차지하지 않지만, 인덱스는 차지한다.

### Secondary Indexes and Generated Columns

https://dev.mysql.com/doc/refman/8.0/en/create-table-secondary-indexes.html

Virtual Column은 MySQL 5.7에서 추가되었다.
Funcitonal Key Parts를 사용할 수 없었던 5.7에서는 Virtual Column을 이용하여 대체 사용할 수 있다.

```sql
CREATE TABLE jemp (
  c JSON,
  g INT GENERATED ALWAYS AS (c->"$.id"),
  INDEX i (g)
);
```

`GENERATED ALWAYS AS`를 사용하여 Virtual Column을 생성한다.
이 컬럼에 대해 정의한 인덱스를 "Virtual Column"라 한다.

## H2 Database

### `NumberFormatException: for input String: "..."` 에러

`UNION ALL` 쿼리로 3개의 테이블을 포함하고, 컬럼 하나가 integer 타입일 때 발생했다.

`CAST(foo as char)` 명시적으로 타입 캐스팅을 통해 통일하여 해결했다.

## SQLite의 알려지지 않은 이야기

https://news.hada.io/topic?id=4558

많은 개발 토픽이 담겨있다.

### 용어 및 단어

본문에 나오는 모르는 용어들을 검색해본다.

#### MC/DC Coverage

본문 중:
> 실제로 DO-178B의 프로세스를 따르기 시작했고, 그중 하나가 100% MCDC Test Coverage
> - MCDC(Modified Condition / Decision Coverage) [3] 는 테스트가 개별 분기를 적어도 한번 이상 통과해야 하는 것
> - SQLite 가 MCDC 100% 가 되는데 주당 60시간 기준으로 1년이 걸렸음. 정말 정말 어려웠음. 매일 12시간을 해야 했고 정말 피곤.
> - 90~95% 의 테스트 커버리지는 쉬운데 나머지 5%가 정말 어려움. 하지만 1년간 그렇게 해서 최종적으로 100%에 도달하자 Android 에서 버그리포트가 오지 않게 되었음
> - 그때부터 작동하기 시작했고, 큰 차이를 내었음. 그 이후 8~-9년동안 버그가 없었음.

> MCDC 100% 커버리지는 TH3 라고 부르고 공개하지 않음 (proprietary)

[MC/DC 커버리지 의미 아시는분?](https://www.sten.or.kr/bbs/board.php?bo_table=free&wr_id=24033)

> 전체 경우의 수의 테이블을 보고 위와 같은 식으로 A, B, C 각각의 개별조건식이 전체 조건식(D)에 영향을 주는 TC를 찾아내면 MC/DC 커버리지 100%를 충족하게 됩니다.

MC/DC Coverage는 expression에서 모든 branch를 커버하기 위한 Test Case를 만들기 위한 방법으로 보인다.

#### DO-127B

본문 중:
> 실제로 DO-178B의 프로세스를 따르기 시작했고, 그중 하나가 100% MCDC Test Coverage

[DO-178B - Wikipedia](https://ko.wikipedia.org/wiki/DO-178B)

> DO-178B (항공기 시스템과 장비 인증에 관한 소프트웨어 고려사항)는 RTCA 사에 의해 발표된 소프트웨어 개발 표준이다.

#### covering index

본문 중:
> 예를 들어서, 나는 Covering Index에 대해서는 전혀 몰랐는데, 독일에서 열린 PHP 컨퍼런스에 참석했을 때, MySQL의 David Axmark도 참여해서 강연을 했음
ㅤ→ 그 강연에서 MysQL 이 어떻게 Covering Index를 만들었는지 설명함
ㅤ→ DB의 인덱스에 여러개 컬럼이 있을때, 인덱스의 앞쪽 컬럼에 대해서만 쿼리하고 답이 나머지 컬럼에 있다면 DB는 원본 테이블 조회없이 인덱스만으로도 사용 가능해서 작업이 빨라짐
ㅤ→ 그래서 집으로 돌아오는 비행기에서 사람이 별로 없길래, 랩탑을 열고 대서양 상공에서 SQLite 의 커버링 인덱스를 구현했음

[CUBRID 커버링 인덱스(covering index) 이야기](https://www.cubrid.com/blog/3821500)

> 아래 예제-1)에서 SELECT 질의의 WHERE 조건에 사용된 컬럼 i와, SELECT 리스트로 주어진 컬럼 j는 모두 인덱스 idx를 구성하는 컬럼입니다. 이와 같은 경우에 CUBRID는 SELECT 질의를 수행할 때 커버링 인덱스를 스캔 하게 됩니다, 이는 하나의 인덱스가 SELECT 문이 요구하는 조건과 결과를 모두 포함하고 있기 때문에 가능한 일입니다.
>
> 예제-1)
> CREATE TABLE tbl (i INT, j INT);
> CREATE INDEX idx ON tbl(i, j);
> SELECT j FROM tbl WHERE i > 0;

#### Fossil

본문 중:
> Fossil 구축
> - Git 과 Mercurial 을 보고 요구사항을 정리한뒤 직접 버전관리 시스템을 개발하기로 함
> - 이제 Fossil 은 잘 동작해서, 자체 프로젝트가 되었음
> - 토발즈가 Linux Kernel 개발을 지원하기 위해 Git을 만들었기에, Linux Kernel 관련 일을 한다면 Git 이 완벽한 버전관리 시스템

[Fossile](https://www.fossil-scm.org/home/doc/trunk/www/index.wiki)

> **Quick Start**
> 
> 1. [Download](https://www.fossil-scm.org/home/uv/download.html) or install using a package manager or [compile from sources](https://www.fossil-scm.org/home/doc/trunk/www/build.wiki).
> 2. fossil init REPOSITORY-DIR/new-repository
> 3. fossil open REPOSITORY-DIR/new-repository
> 4. fossil add files-or-directories
> 5. fossil commit -m "commit message"
> 6. fossil ui

git 사용법과 흡사하다.

### 인상깊은 부분

> 90~95% 의 테스트 커버리지는 쉬운데 나머지 5%가 정말 어려움. 하지만 1년간 그렇게 해서 최종적으로 100%에 도달하자 Android 에서 버그리포트가 오지 않게 되었음

이게 정말 가능할까? 본문을 읽어보면 테스트 케에스에 진심으로 보이는데, 모든 branch도 100% 달성했을 가능성이 있다.
내 경우 새 기능을 추가할 때 별다른 노력 없이도 커버리지 90%에 근접했다.
나머지는 언어 특성으로 인해 테스트를 위해 코드를 재작성이 필요하거나, 너무 사소하다고 생각되는 부분이었다.
하지만 100% 달성에 노력하는 것은 매우 가치있는 일인 거 같다.
