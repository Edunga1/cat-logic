---
created: 2023-01-07
---
# Entity Component System (ECS)

**실제 코드를 본 적이 없어서 정리하는 것에 그침**

https://en.wikipedia.org/wiki/Entity_component_system

주로 게임에서 사용하는 구조적 패턴. 데이터 지향적이라고 한다:
> An ECS comprises *entities* composed from *components* of data

ESC는 데이터의 구성요소로 이루어진 엔티티로 구성됩니다.

> ... This eliminates the ambiguity problems of deep and wide inheritance hierarchies often found in [Object Oriented Programming](https://en.m.wikipedia.org/wiki/Object-oriented_programming)
 techniques that are difficult to understand, maintain, and extend.

엔티티의 동작은 이해, 유지보수, 확장하기 어렵게하는 객체지향 프로그래밍에서 주로 발견되는 깊고 광범위한 상속 계층의 모호성 문제를 없앱니다.

## 참조

[Unreal Rust 공개 ](https://news.hada.io/topic?id=7345)

> Rust 게임엔진인 Bevy의 Entity Component System(ECS)을 사용

ECS 주제를 추가한 계기.

https://velog.io/@cedongne/Unity-새로운-컴포넌트-시스템-ECS와-Entity

Unity 3D가 ECS를 사용하고 있는 줄 알았는데 아니었다. 21년 기준으로 전환을 진행하고 있다고 한다.

