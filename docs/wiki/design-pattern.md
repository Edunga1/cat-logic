<!--toc:start-->
- [MVC Pattern](#mvc-pattern)
  - [MVC 패턴의 목적과 이점](#mvc-패턴의-목적과-이점)
  - [Compound Pattern](#compound-pattern)
    - [1. Observer Pattern](#1-observer-pattern)
    - [2. Strategy Pattern](#2-strategy-pattern)
    - [3. Composite Pattern](#3-composite-pattern)
- [Iterator Pattern](#iterator-pattern)
- [Repository Pattern](#repository-pattern)
  - [Generic Repository vs. Specific Repository](#generic-repository-vs-specific-repository)
- [state pattern and state machine](#state-pattern-and-state-machine)
  - [state pattern](#state-pattern)
  - [state machine](#state-machine)
    - [구현체](#구현체)
      - [Spring](#spring)
      - [Pytohn](#pytohn)
  - [references](#references)
<!--toc:end-->

# MVC Pattern

Model - View - Controller Pattern.

## MVC 패턴의 목적과 이점

MVC 패턴는 사용자 인터페이스와 시스템 로직을 분리하는 것을 목적으로 둔다.

분리함으로써 얻는 이점은 다른 환경에서 재사용 할 수 있는 코드가 생기는 것이다.

예를들어 C# 윈도우 어플리케이션에 종속되는 유저 인터페이스 관련 코드들과 시스템이 돌아가는데
필요한 코드(model)를 분리함으로써 다른 플랫폼으로 이식할 수 있다.

## Compound Pattern

MVC 패턴은 다른 디자인 패턴으로 이루어진 컴파운드 패턴이다.

### 1. Observer Pattern

Model - View의 관계

유저 인터페이스와 시스템 로직을 분리할 수 있게 해주는 핵심 패턴으로 모델은 상태 변경이 일어나면
뷰에 상태 변경을 통보한다.

그러면 뷰는 모델에서 필요한 정보들을 가져와 사용자 화면을 업데이트 한다.

모델이 뷰에 통보할 때 상태 정보를 보내주는 push-model 보다
통보 후 뷰가 필요한 정보를 알아서 가져가는 pull-model이 더 선호된다.

### 2. Strategy Pattern

View - Controller의 관계

Controller는 View에 대한 Behavior가 된다.

같은 View라고 하더라도 Controller를 변경함으로써 다르게 실행되도록 할 수 있다.

따라서 View에 Concrete Controller가 아닌 Interface Controller를 제공한다.

### 3. Composite Pattern

View 내에서 Component들 간의 관계

일반적으로 사용자 인터페이스의 컴포넌트들은 컴포넌트 안에 컴포넌트로 표현한다.

이 컴포넌트들을 iterator를 통해 일관성있게 접근하여 업데이트 시킨다.

# Iterator Pattern

다양한 Collection을 일관적인 방법으로 순회할 수 있도록 함

![uml-iterator](../$images/dp-iterator.gif)

Java의 경우 ArrayList, Vector, LinkedList와 같은 컬렉션 클래스들은 java.util.Iterator를 구현하여
iterator() 메소드를 통해 iterator를 반환 해 준다.

일반 배열을 사용한 경우 Iterator 인터페이스를 구현한 Concrete Iterator를 만들어서 사용하면 된다.

# Repository Pattern

도메인 로직에서 저장소에 접근하기 위해서 쿼리를 전송하는 것은 좋지 않다. 특정 데이터베이스에 종속된다.
RDBMS도 MySQL, MsSQL, Oracle 다 쿼리 스펙이 다르다. 그래서 데이터 소스(DB)와 커뮤니케이션할 추상 레이어를 둔다.
데이터베이스의 변경 여지가 있기 때문에 추상화하기도 한다. MySQL -> MsSQL 전환, RDBMS -> NoSQL로의 전환도 언젠가 할지도 모른다.

물론 DB 전환을 염두하고 추상화하지 말라는 뉘앙스의 글도 있다: ["Database Abstraction Layers Must Die!"라는 글을 읽고](c9875c187a06ca42d069474cd880a901.md)

아무튼. Repository Pattern은 데이터의 중앙화와 API의 일관성을 유지하고 중복 코드를 제거해 준다.

<a href="https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff649690(v=pandp.10)">MSDN의 Repository Pattern</a>을 번역한 글:<br>
http://vandbt.tistory.com/27

개념적인 글이라서 코드가 있는 MSDN 글과 보면 좋다:<br>
https://docs.microsoft.com/ko-kr/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application

UnitOfWork 패턴까지 이어지는 글이다.

Repository Pattern에는 두 종류가 있다. Generic Repository와 Specific Repository

코드 중복을 제거하고 일관성 유지를 강조하는 Generic Repository와 유연성을 강조하는 Specific Repository.

## Generic Repository vs. Specific Repository

https://stackoverflow.com/questions/1230571/advantage-of-creating-a-generic-repository-vs-specific-repository-for-each-obje

* 점수를 많이 받은 답은 **Specific Repository를 더 선호한다**. 그 이유는 아래와 같다.
* 모든 엔티티가 저장소를 가지는 것은 아니기 때문이다.
* 하지만 베이스 레포지토리 (abstract class)는 사용한다.
* a repository is a part of the domain being modeled, and that domain is not generic. Not every entity can be deleted, not every entity can be added, not every entity has a repository<br>
레포지토리는 모델링 되는 도메인의 일부분이며, 그 도메인은 generic 하지 않다. 모든 엔티티가 삭제되거나 추가되는 것이 아니며, 모든 엔티티가 레파지토리를 가지는 것은 아니다.

**Generic Repository?**

* Repository를 규격화 한다.
* `Repository<User>`, `Repository<Comment>` 처럼 Entity 클래스를 Generic Type으로 받는다.
* 장점으로 모든 Repository는 일관된 인터페이스를 가진다.

**Specific Repository?**

* Repository를 테이블마다 구현한다.
  * UserRepository, CommentRepository
* CRUD 뿐만 아니라 테이블별 각각 다른 메소드를 구현할 수 있다.
  * UserRepository.addUser, CommentRepository.deleteShortComment 처럼..
* 코드 양은 많아 지겠지만 Generic 보다 더 유연할 듯하다.

**생각해 본 것들:**

**대표적으로 C#의 Entity Framework. 대부분 DB 프레임워크는 어노테이션을 이용한다.**

```csharp
public class Blog
{
    [Key]
    public int PrimaryTrackingKey { get; set; }
    public string Title { get; set; }
    public string BloggerName { get; set;}
    public virtual ICollection<Post> Posts { get; set; }
}
```

내가 위 코드를 동작케 한다면 다음과 같은 규칙을 가질 것이다:

1. 프로퍼티 이름 = 테이블 컬럼 이름
1. `[Key]` 어노테이션은 Primary Key가 되는데, 데이터베이스 PK, Unique, Auto increment 속성을 가진다.
1. 언어의 타입 int, string 등을 데이터베이스 타입에 적절히 매핑해야 함

만약 어노테이션을 사용하지 않고, 자바스크립트로 구현한다면?

1. 프로퍼티 이름 = 테이블 컬럼 이름은 가능
1. PK가 될 컬럼(프로퍼티)는 어떻게?
1. 타입은 어떻게 하나.

위 문제를 해결하기 위해서 static 변수에 pk, type 등 정보를 저장해야 할 거 같다.

**Specific Repository를 구현한다면 어노테이션 없이도 복잡하지 않게 구현할 수 있을 거 같다.**

각 메서드에서 쿼리를 만들 거고(쿼리 빌더를 쓰던간에), 어노테이션 없는 Entity 클래스도 만들 수 있다!

# state pattern and state machine

공통점은 많은 상태들 사이에서 같은 이벤트가 발생했을 때 다음 상태로 전이하는 것이다.

다른 점은 어디에 집중하느냐 인데, state pattern은 이벤트에 따른 행동에, state machine은 상태 관리라고 생각한다.

## state pattern

* behavior의 구현에서 다음 상태를 결정하기 때문에, dynamic target 상태를 가진다.
* OOP로 구현하면 각 상태에 해당하는 concrete class가 존재한다.
* 따라서 많은 상태와 행동이 있으면 관리하기 어렵다.

## state machine

* 상태와 이벤트 조합으로 다음 상태(target)로 변화하는 transition을 한 곳에서 관리한다. 그래서 추적하기 쉽다.
* OOP로 구현하면 모든 상태를 관리하는 state machine로 일반화 했기 때문에 좀 더 간단하다.
* 하지만 일반화 했기 때문에 이벤트마다 달라지는 부분을 구현하기에 까다롭다.

### 구현체

#### Spring

https://docs.spring.io/spring-statemachine/docs/1.1.1.RELEASE/reference/htmlsingle/

빌더 패턴으로 상태와 이벤트와 다음 상태를 구성한다.

상태와 하위 상태까지 구성 가능하다.

#### Pytohn

https://github.com/pytransitions/transitions

## references

https://stackoverflow.com/questions/19859531/what-is-the-difference-between-a-state-machine-and-the-implementation-of-the-sta

답변자 말로는, state pattern은 분산된 구조이고, state machine은 모놀리틱 구조라 한다.
