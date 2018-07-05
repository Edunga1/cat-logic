# 테이블 이름 컨벤션

## `camelCase` vs. `snake_case`

현재 작업하고 있는 프로젝트는 테이블 이름이 `snake_case`다.
스타일이야 약속에 따라 결정하면 되는 것이고, 가독성이야 익숙해지면 별 차이 없다고 생각하지만..

일단 `snake_case`는 좀 구식 같다.

NodeJS에서 컬럼 이름들을 사용해야 하는데 Javascript는 `camelCase`를 따르고 있어 함께 보면 어색하다.

클래스 스타일을 따라서 테이블은 클래스명, 컬럼은 멤버 변수로 보려고 한다.

## 테이블 이름: 단수 vs. 복수

다만 테이블 이름은 단수로 지어야 하나 복수로 지어야 하나?

코드에서 리스트(배열) 이름을 지을때는 항상 복수형을 사용한다.
왠만하면 ~List 라는 이름을 사용하지 않는데,
그 이유는 비지니스 로직을 자연어처럼 구성하면 더 가독성이 좋기 때문이다. (외국인들은 복수형이 익숙하다는데..)

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

규칙이 깨지는 느낌을 받는다. 헷갈릴 수 있는 여지가 있다.

*어 테이블 이름을 Orders로 지었으니 OrdersDetails 였던가?*
