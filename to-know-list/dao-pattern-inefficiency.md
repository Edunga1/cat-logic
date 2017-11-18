# Dao 패턴의 비효율성?

관심사 분리, 의존 역전 원칙을 Dao 패턴에 적용하면 어떻게 되나?

https://stackoverflow.com/questions/8049627/dao-and-dependency-injection-advice

```java
public interface GenericDAO <T, K extends Serializable> {
    List<T> getAll(Class<T> typeClass);
    T findByKey(Class<T> typeClass, K id);
    void update(T object);
    void remove(T object);
    void insert(T object);
}
```

Dao 계층을 만들어 위처럼 해결한다고 하자.
그러나 단순히 CRUD로 나눈다고 모든 도메인에 적용할 수는 없다.
예를들어 [페이징이 필요한 게시판](https://okky.kr/article/59922)의 경우는?

집계 함수가 필요하다면 어떻게 해야하나.

일관된 인터페이스를 유지하면서도 다양한 도메인에 대응할 수 있는 방법은 무엇일까.
