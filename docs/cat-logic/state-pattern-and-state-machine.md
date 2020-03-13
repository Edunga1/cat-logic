---
id: 8bae7bf35ca024af0ae3264db9c0ad74
time: 2020-03-13 18:16:39
tags: design pattern
---

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
