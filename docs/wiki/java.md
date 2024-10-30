# Java Programming Language

## 개념

### Servlet Container (Web Container)

https://en.wikipedia.org/wiki/Web_container

> A web container (also known as a servlet container;[1] and compare "webcontainer"[2]) is the component of a web server that interacts with Jakarta Servlets.

웹 컨테이너는 웹 서버의 컴포넌트로, Servlet을 실행하는 역할을 한다. 서블릿 컨테이너라고도 한다.

톰캣 서버도 Servlet Container이다.

Spring Boot에서 제공하는 `TomcatServletWebServerFactory`를 사용하면 쉽게 컨테이너를 만들고, 시작할 수 있다.

```java
public class Application {
  public static void main(String[] args} {
    ServletWebServerFactory factory = new TomcatServletWebServerFactory();
    WebServer server = factory.getWebServer();
    server.start();
  }
}
```

ref. [TomcatServletWebServerFactory](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/web/embedded/tomcat/TomcatServletWebServerFactory.html)
ref. [WebServer](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/web/server/WebServer.html)

## Jakarta EE (a.k.a. Java EE)

https://www.samsungsds.com/kr/insights/java_jakarta.html

EE는 Enterprise Edition의 줄임말이다.

명칭을 Java EE -> Jakarta EE 명칭을 변경하면서, 오픈소스로 전환했다.

기업(enterise)용 애플리케이션을 개발 및 실행하기 위한 기술과 환경을 제공한다.

### 포함하는 기술

https://jakarta.ee/specifications/platform/8/platform-spec-8.html#a84

#### HTTP

클라이언트 사이드 API를 `java.net`으로 제공한다. 서버 사이드는 Jakarta Servlet, Jakarta Server Pages,Jakarta Server Faces 등에서 제공한다.

ref. https://reflectoring.io/comparison-of-java-http-clients/

```java
HttpClient client = HttpClient.newBuilder()
  .version(Version.HTTP_2)
  .followRedirects(Redirect.NORMAL)
  .build();

HttpRequest request = HttpRequest.newBuilder()
 .uri(new URI(URLConstants.URL))
 .GET()
 .header(URLConstants.API_KEY_NAME, URLConstants.API_KEY_VALUE)
 .timeout(Duration.ofSeconds(10))
 .build();


client.sendAsync(request, BodyHandlers.ofString())
  .thenApply(HttpResponse::body)
  .thenAccept(System.out::println)
  .join();
```

#### JNDI (Java Naming and Directory Interface)

> JNDI는 디렉터리 서비스에서 제공하는 데이터 및 객체를 발견하고 참고하기 위한 자바 API다.

```java
ds = new DriverManagerDataSource("jdbc:h2:mem:mydb");
```

#### JTA (Java Transaction API)

`javax.transaction` 패키지로 제공한다.

[Transactional Annotations: Spring vs. JTA](https://www.baeldung.com/spring-vs-jta-transactional)
스프링이 제공하는 `org.springframework.transaction.annotation.Transactional`. JTA가 제공하는 `javax.transaction.Transactional`. 두 개를 비교하는 글.

Spring Framework 4.0부터 JTA 1.2를 지원해서 Spring에서 JTA Transactional을 사용할 수 있다고 한다.

#### Jakarta Persistence API (JPA, Java Persistence API)

##### JPA Repository

JPA를 이용해서 어떤 방법으로 데이터를 가져오는지 알아본다.

쿼리를 실행하는데 @Query, **Query Method**. 크게 두 가지 방법을 사용하는 거 같다.

###### Query Methods

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods

```kotlin
@Repository
interface FooRepository: JpaRepository<Foo, Int> {
  fun findAll(): List<Foo>
}
```

메서드 이름이 쿼리를 대신한다. `type`이라는 컬럼으로 조건을 걸고 싶으면
`fun findAllByType(type: String)` 형태가 된다.

###### @Query

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query

```sql
SELECT
  f
FROM Foo f
WHERE
  type = :type
```

SQL과 비슷해 보이지만, JPQL라는 이름을 사용한다. 메서드 이름은 직접 정해줄 수 있다.
`:type`이 인자를 의미한다.  항상 alias를 사용해야 하고, `SELECT *` 를 Alias 이름으로 대체한다.

Query Method 마찬가지지만, 컬럼 정보는 Entity를 참조한다.

인자로 `nativeQuery = true`를 넘겨주면 JPQL 대신 SQL을 사용할 수 있다.

###### Query By Example (QBE)

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#query-by-example

```java
// 검색 할 데이터 준비
Person person = new Person();
person.setFirstname("Dave");

// 쿼리
personRepository.findAll(Example.of(person));
```

사용해보진 않았다. Entity 인스턴스가 쿼리 용도로 사용한다. 복잡한 쿼리의 경우 가독성이 떨어진다.

##### QueryDSL

http://www.querydsl.com/static/querydsl/4.1.3/reference/html_single/#d0e321

```java
QCustomer customer = QCustomer.customer;
Customer bob = queryFactory.selectFrom(customer)
  .where(customer.firstName.eq("Bob"))
  .fetchOne();
```

Query Methods, JPQL, QBE는 JPA 내장되어 있지만 QueryDSL은 그렇지 않다.

사용 방법은 python의 [sqlalchemy](https://www.sqlalchemy.org/)나 node의 [knexjs](http://knexjs.org/)와 비슷하다.
다른 ORM이나 Query Builder도 사용 방법은 비슷하지 않을까.

knexjs:

```javascript
knex('users').where({ first_name: 'Test', last_name:  'User' }).select('id')
```

sqlalcehmy:

```python
session.query(User).filter(User.name == 'Edwardo').all()
```

sqlalchemy의 경우 python의 연산자 오버로딩을 힘입어 높은 가독성을 가진다.
numpy와 같은 [python](./python.md) 라이브러리도 같은 이유에서 사용하기 편리한 인터페이스를 가졌다.

##### querydsl-sql

http://querydsl.com/static/querydsl/latest/reference/html/ch02s03.html

native query의 대안. Union 등 제공하지 않는 쿼리는 이 솔루션의 사용을 고려할 수 있다.
다만 JPA를 사용하지 않아서 좀 불편하다.

https://youtu.be/zMAX7g6rO_Y?t=1169

영상에서도 설명하는데, 실제로도 해보면 사용하기 매우 번거롭다.
local db로부터 q-class를 생성해야 한다. 이 것 때문에 배포 전략을 다시 변경해야 할 수도 있다.
querydsl-jpa가 entity로부터 생성한 q-class를 함께 사용할 수 없다.

###### infobip-spring-data-querydsl

https://github.com/infobip/infobip-spring-data-querydsl

또다른 native query의 대안. Union 쿼리 등 동작하는 것을 확인했다.

###### JPA 기본 메서드는 다른 method의 위임 용으로만 사용해야 한다.

https://github.com/infobip/infobip-spring-data-querydsl

> In production code persistence layer (SQL) shouldn't leak to service layer. See [this answer](https://stackoverflow.com/a/26563841/607767) by Oliver Drotbohm (Spring Data Project Lead @ Pivotal) on how to approach encapsulating persistence logic.

persistence layer (SQL) 코드가 서비스에 노출되지 말아야 한다고 한다. Spring Data Project Lead 개발자가 stackoverflow에서 답변함.

Stackoverflow Post: https://stackoverflow.com/questions/26543612/should-i-use-java-8-default-methods-for-manually-implemented-spring-data-reposit/26563841#26563841

> Default methods should only be used to delegate calls to other repository methods. Default methods - by definition - cannot access any state of an instance (as an interface has none). They only can delegate to other interface methods or call static ones of other classes.

*다른 메서드의 위임 용도로만 기본 메서드를 사용해야 합니다.*

## 중첩 클래스(Nested Classes)

> Terminology: Nested classes are divided into two categories: non-static and static. Non-static nested classes are called inner classes. Nested classes that are declared static are called static nested classes.

중첩 클래스에는 두 가지 종류가 있다. static이 아닌 중첩 클래스는 **inner class**, static으로 선언된 중첩 클래스는 **static nested class**.\
따라서 static이면서 inner class는 없다.

## JPA

### DB에 쿼리하는 방법

[**Query Methods**](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods)

```java
public interface UserRepository extends Repository<User, Long> {
  List<User> findByEmailAddressAndLastname(String emailAddress, String lastname);
}
```

간단한 쿼리를 작성하는데 적합하다. 메서드 이름으로 쿼리를 작성한다.

> Although getting a query derived from the method name is quite convenient, one might face the situation in which either the method name parser does not support the keyword one wants to use or the method name would get unnecessarily ugly. So you can either use JPA named queries through a naming convention (see Using JPA Named Queries for more information) or rather annotate your query method with @Query

길어지면 보기 어려울 수 있으므로 Named Query 또는 `@Query`를 사용을 권장한다.

[`@Query`](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query)

```java
@Query("SELECT u FROM User u WHERE u.status = 1")
Collection<User> findAllActiveUsers();
```

[**Querydsl**](http://querydsl.com/static/querydsl/latest/reference/html/)

```java
QCustomer customer = QCustomer.customer;
Customer bob = queryFactory.selectFrom(customer)
  .where(customer.firstName.eq("Bob"))
  .fetchOne();
```

[Spring Data Querydsl Extension](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#core.extensions.querydsl)을 사용하면 `Predicate`를 이용할 수 있다:

```java
Predicate predicate = user.firstname.equalsIgnoreCase("dave")
  and(user.lastname.startsWithIgnoreCase("mathews"));

userRepository.findAll(predicate);
```

### JPA와 MyBatis

[.net에서 java로 건너와 (i)mybatis만 쓰다가 JPA란걸 해보고 있는데 큰 장점이 와닿지가 않습니다. - 한국 스프링 사용자 모임](https://www.facebook.com/groups/springkorea/permalink/2803698513075093/)

> .net에서 java로 건너와 (i)mybatis만 쓰다가 JPA란걸 해보고 있는데 큰 장점이 와닿지가 않습니다. 익숙치 않아서 그럴것이지만 특히 집계(group by)하는 것은 @Query에 직접 쿼리문을 작성해 줘야 하고 select결과에 따라 별도의 class를 생성해야하는불편함(?)이 있는 것 같아요(다른 방법이 있으면 헬프미) 실무에서 jpa를 많이 사용하나요? 삽질하면서 많이 배울거라 생각하지만 너무 많은 시행착오를 겪는 것 같아요. Jpa나 querydsl 쉽고 잘 쓰는 방법이 있을까요?

덧글 중

> 사실 처음 쓰시면 장점을 크게 못 느끼시는게 맞습니다.
>
> 더군다나 java 계열은 LINQ 도 없어서 ORM 주제에 쿼리 비슷한 JPQL 같은걸 써야 하는데, django 나 RoR 의 ORM 에 비하면 구려터진건 사실이죠.
>
> 제가 느끼는 JPA 의 장점은 데이터베이스 자체를 추상화한다는 점인것 같습니다. 그 덕분에 데이터를 다루는 로직의 이식성이 크게 높아져서 시스템 확장에 유리한것 같아요. MSA 가 화두인 시대에 잘 어울리는것 같기도 하고요. 물론 Object 를 2차원 테이블로 옮기고 또 반대로 바꾸는게 완벽하진 않기 때문에 복잡한 객체관계를 다룰땐 ORM 이란것이 plain SQL 보단 많이 별로인게 사실이죠.
>
> JPA 는 만능이 아닙니다. 제 경험상으론 데이터 조회와 주기적 업데이트가 많은 어플리케이션 (admin) 에는 MyBatis 가 좋았고, 짧은 트랜잭션 동안 여러 테이블(entity)를 업데이트 해야하는 일반 어플리케이션에는 ORM 이 더 좋았습니다.

데이터베이스 추상화의 장점은 테스트에서 더욱 두드러진다.
운영에서는 MySQL, 테스트에서는 H2 In-Memory DB를 사용해도 특별히 작업없이 사용할 수 있다.

### Trouble Shooting

#### Warning: 'Model' domain type or valid projection interface expected here

[Could any one tell me the real reason of spring-data projection in my case?](https://stackoverflow.com/questions/44131207/could-any-one-tell-me-the-real-reason-of-spring-data-projection-in-my-case/56991872#56991872)

JPQL 사용했지만, 쿼리 메서드에서 사용하는 키워드가 포함된 경우 이런 경고 메시지가 출력된다.

키워드는 `By` 였는데, `Using` 으로 대체해서 사용하여 해결했다.

### 토비의 봄 TV - 백기선님

https://www.youtube.com/live/xEqGW7Adqt8

[16:00](https://youtu.be/xEqGW7Adqt8?t=960)
- 트랜잭션 작업(전) - 비동기 처리 - 트랜잭션 작업(후) 이렇게 되어 있을 때 전, 후 작업의 트랜잭션이 이어지지 않는다.
- RDB를 비동기처리 지원하지 않는다.
- ADBC라는 비동기 지원을 위한 기술이 드래프트되어 있다. 3년 이상.

[20:35](https://youtu.be/xEqGW7Adqt8?t=1235)
- NodeJS처럼 모든 것을 비동기로 처리하고 싶다. 쓰레드는 코어 수 만큼.

[38:35](https://youtu.be/xEqGW7Adqt8?t=2315)
- 어노테이션에 대한 내용
- 어노테이션이 의도를 파악하기 어렵다.

### 토비의 봄 TV - 김영한님

https://www.youtube.com/watch?v=00qwDr_3MC4

[1:35:04](https://youtu.be/00qwDr_3MC4?t=5704)
- AOP 프록시를 사용했다. 프록시 패턴.
- 여기에도 RDB와 Webflux 비동기 처리 이슈에 대해 다룬다.

## Reference

https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html
