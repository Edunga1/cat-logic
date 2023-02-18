# Java

# Jakarta EE (a.k.a. Java EE)

https://www.samsungsds.com/kr/insights/java_jakarta.html

EE는 Enterprise Edition의 줄임말이다.

명칭을 Java EE -> Jakarta EE 명칭을 변경하면서, 오픈소스로 전환했다.

기업(enterise)용 애플리케이션을 개발 및 실행하기 위한 기술과 환경을 제공한다.

## 포함하는 기술

https://jakarta.ee/specifications/platform/8/platform-spec-8.html#a84

### HTTP

클라이언트 사이드 API를 `java.net`으로 제공한다. 서버 사이드는 Jakarta Servlet, Jakarta Server Pages,Jakarta Server Faces 등에서 제공한다.

ref. https://reflectoring.io/comparison-of-java-http-clients/
```
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
  .join();java
```

### JNDI (Java Naming and Directory Interface)

> JNDI는 디렉터리 서비스에서 제공하는 데이터 및 객체를 발견하고 참고하기 위한 자바 API다.

```java
ds = new DriverManagerDataSource("jdbc:h2:mem:mydb");
```

### JTA (Java Transaction API)

`javax.transaction` 패키지로 제공한다.

[Transactional Annotations: Spring vs. JTA](https://www.baeldung.com/spring-vs-jta-transactional)
스프링이 제공하는 `org.springframework.transaction.annotation.Transactional`. JTA가 제공하는 `javax.transaction.Transactional`. 두 개를 비교하는 글.

Spring Framework 4.0부터 JTA 1.2를 지원해서 Spring에서 JTA Transactional을 사용할 수 있다고 한다.

### Jakarta Persistence API (JPA, Java Persistence API)

#### JPA Repository

JPA를 이용해서 어떤 방법으로 데이터를 가져오는지 알아본다.

쿼리를 실행하는데 @Query, **Query Method**. 크게 두 가지 방법을 사용하는 거 같다.

##### Query Methods

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods

```kotlin
@Repository
interface FooRepository: JpaRepository<Foo, Int> {
  fun findAll(): List<Foo>
}
```

메서드 이름이 쿼리를 대신한다. `type`이라는 컬럼으로 조건을 걸고 싶으면
`fun findAllByType(type: String)` 형태가 된다.

##### @Query

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

##### Query By Example (QBE)

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
numpy와 같은 [python](python.md) 라이브러리도 같은 이유에서 사용하기 편리한 인터페이스를 가졌다.

###### querydsl-sql

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

#### JPA 기본 메서드는 다른 method의 위임 용으로만 사용해야 한다.

https://github.com/infobip/infobip-spring-data-querydsl

> In production code persistence layer (SQL) shouldn't leak to service layer. See [this answer](https://stackoverflow.com/a/26563841/607767) by Oliver Drotbohm (Spring Data Project Lead @ Pivotal) on how to approach encapsulating persistence logic.

persistence layer (SQL) 코드가 서비스에 노출되지 말아야 한다고 한다. Spring Data Project Lead 개발자가 stackoverflow에서 답변함.

Stackoverflow Post: https://stackoverflow.com/questions/26543612/should-i-use-java-8-default-methods-for-manually-implemented-spring-data-reposit/26563841#26563841

> Default methods should only be used to delegate calls to other repository methods. Default methods - by definition - cannot access any state of an instance (as an interface has none). They only can delegate to other interface methods or call static ones of other classes.

*다른 메서드의 위임 용도로만 기본 메서드를 사용해야 합니다.*
