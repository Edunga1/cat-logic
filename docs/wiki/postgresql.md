---
created: 2024-03-20
---
# PostgreSQL

객체-관계형 데이터베이스 관리 시스템.

제대로 사용한 적은 없고, [Amazon Redshift](./amazon-redshift.md)를 통해서 쿼리 작성만 해보았다.

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
