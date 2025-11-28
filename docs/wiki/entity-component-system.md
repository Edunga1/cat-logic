---
created: 2023-01-07
---
# Entity Component System (ECS)

게임 개발에서 주로 사용되는 아키텍처 패턴. 줄여서 ECS라고 부른다.

데이터 지향적인 설계(Data-Oriented Design, DOD)를 따른다.

https://en.wikipedia.org/wiki/Entity_component_system

> An ECS comprises *entities* composed from *components* of data

ESC는 데이터의 구성요소로 이루어진 엔티티로 구성됩니다.

> ... This eliminates the ambiguity problems of deep and wide inheritance hierarchies often found in [Object Oriented Programming](https://en.m.wikipedia.org/wiki/Object-oriented_programming)
 techniques that are difficult to understand, maintain, and extend.

... 엔티티의 동작은 이해, 유지보수, 확장하기 어렵게하는 객체지향 프로그래밍에서 주로 발견되는 깊고 광범위한 상속 계층의 모호성 문제를 없앱니다.

python에는 [esper](https://github.com/benmoran56/esper)라는 ECS 라이브러리가 있다.
하나의 파일로 구성되어 있을 정도로 단순하다.

## 구성 요소

- Entity: 고유 식별자(ID)로 구성된 객체. 컴포넌트의 집합이다.
- Component: 데이터만 포함하는 객체. 엔티티에 부착된다.
- System: 특정 컴포넌트 집합에 대해 동작하는 로직.

여기에 없는 Entity Manager(또는 World)가 엔티티와 컴포넌트를 관리한다.
즉, 동적으로 엔티티와 컴포넌트를 관리하고, 중앙 집중화된 접근을 제공한다.

System은 절차적 방식으로 로직을 구현한다.

### 예제 코드

Gemini 3.0을 통해 만든 간단한 예제 코드.

```python
# 1. Components (데이터만 존재)
class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Pos({self.x}, {self.y})"

class Velocity:
    def __init__(self, dx, dy):
        self.dx = dx
        self.dy = dy

class Name:
    def __init__(self, name):
        self.name = name

# 2. Entity Manager (엔티티와 컴포넌트를 관리하는 간단한 월드)
class World:
    def __init__(self):
        self.entities = 0
        # 컴포넌트 타입별로 데이터를 저장 (예: {Position: {entity_id: instance}})
        self.components = {}

    def create_entity(self):
        self.entities += 1
        return self.entities # 단순히 ID만 반환

    def add_component(self, entity, component):
        component_type = type(component)

        if component_type not in self.components:
            self.components[component_type] = {}

        self.components[component_type][entity] = component

    def get_components(self, component_type):
        return self.components.get(component_type, {})

# 3. System (로직만 존재)
class MovementSystem:
    def update(self, world):
        print("--- 이동 시스템 가동 ---")
        # 위치와 속도 컴포넌트를 모두 가져옴
        positions = world.get_components(Position)
        velocities = world.get_components(Velocity)

        # 두 컴포넌트를 모두 가진 엔티티를 찾아서 처리
        for entity, velocity in velocities.items():
            if entity in positions:
                position = positions[entity]

                # 로직 수행: 위치 업데이트
                position.x += velocity.dx
                position.y += velocity.dy

                print(f"엔티티 {entity} 이동됨 -> {position}")

# --- 실행 ---

# 월드 생성
game_world = World()

# 엔티티 1: 플레이어 (이름, 위치, 속도 있음 -> 움직임 O)
player = game_world.create_entity()
game_world.add_component(player, Name("Player 1"))
game_world.add_component(player, Position(0, 0))
game_world.add_component(player, Velocity(1, 0)) # x축으로 1씩 이동

# 엔티티 2: 바위 (이름, 위치 있음, 속도 없음 -> 움직임 X)
rock = game_world.create_entity()
game_world.add_component(rock, Name("Big Rock"))
game_world.add_component(rock, Position(10, 10))

# 시스템 가동
movement_system = MovementSystem()

# 게임 루프 (3프레임만 실행해봄)
for i in range(3):
    print(f"\n[Frame {i+1}]")
    movement_system.update(game_world)
```

실행 결과.

```
[Frame 1]
--- 이동 시스템 가동 ---
엔티티 1 이동됨 -> Pos(1, 0)

[Frame 2]
--- 이동 시스템 가동 ---
엔티티 1 이동됨 -> Pos(2, 0)

[Frame 3]
--- 이동 시스템 가동 ---
엔티티 1 이동됨 -> Pos(3, 0)
```

## 참조

[Unreal Rust 공개 ](https://news.hada.io/topic?id=7345)

> Rust 게임엔진인 Bevy의 Entity Component System(ECS)을 사용

이 주제를 추가하게 된 계기가 된 글.

https://velog.io/@cedongne/Unity-새로운-컴포넌트-시스템-ECS와-Entity

Unity 3D가 ECS를 사용하고 있는 줄 알았는데 아니었다. 21년 기준으로 전환을 진행하고 있다고 한다.

