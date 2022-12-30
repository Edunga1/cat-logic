<!--toc:start-->
- [Database](#database)
  - [정규화 (Normalization)](#정규화-normalization)
    - [제 1 정규화 (First Normal Form)](#제-1-정규화-first-normal-form)
    - [제 2 정규화 (Second Normal Form)](#제-2-정규화-second-normal-form)
    - [제 3 정규화 (Third Normal Form)](#제-3-정규화-third-normal-form)
    - [역 정규화 (Denormalization)](#역-정규화-denormalization)
- [테이블 이름 컨벤션](#테이블-이름-컨벤션)
  - [테이블 이름: 단수 vs. 복수](#테이블-이름-단수-vs-복수)
<!--toc:end-->

# Database

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
