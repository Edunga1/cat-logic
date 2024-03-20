---
created: 2024-02-24
---
# Amazon Redshift

Amazon Redshift는 PostgreSQL을 기반으로 한다.

https://docs.aws.amazon.com/redshift/latest/dg/c_redshift-and-postgres-sql.html

> Amazon Redshift is based on PostgreSQL. Amazon Redshift and PostgreSQL have a number of very important differences that you must be aware of as you design and develop your data warehouse applications.

다만, 몇 가지 중요한 차이점이 있다고 한다.

---

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
