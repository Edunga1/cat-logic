---
id: page-97
time: 2020-01-21 19:55:36
tags: kotlin, spring
---
# Spring JPA Repository

쿼리를 실행하는데 @Query, **Query Method**. 크게 두 가지 방법을 사용하는 거 같다.

## Query Method

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
