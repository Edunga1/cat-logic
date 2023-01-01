# Spring Framework

# JPA Repository

JPA를 이용해서 어떤 방법으로 데이터를 가져오는지 알아본다.

쿼리를 실행하는데 @Query, **Query Method**. 크게 두 가지 방법을 사용하는 거 같다.

## Query Methods

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods

```kotlin
@Repository
interface FooRepository: JpaRepository<Foo, Int> {
  fun findAll(): List<Foo>
}
```

메서드 이름이 쿼리를 대신한다. `type`이라는 컬럼으로 조건을 걸고 싶으면
`fun findAllByType(type: String)` 형태가 된다.

## @Query

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

## Query By Example (QBE)

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#query-by-example

```java
// 검색 할 데이터 준비
Person person = new Person();                         
person.setFirstname("Dave");                          

// 쿼리
personRepository.findAll(Example.of(person));
```

사용해보진 않았다. Entity 인스턴스가 쿼리 용도로 사용한다. 복잡한 쿼리의 경우 가독성이 떨어진다.

## QueryDSL

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
이건 numpy와 같은 라이브러리를 써보면 확실히 그 편리함이 느껴진다.
