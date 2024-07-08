# Physics

## 2D 도형 충돌

제대로 알기 전에는 도형을 잘 추상화해서 어떤 형태든 추상 형태로 계산할 수 있을 거라고 생각했다.
하지만 아래 강의를 보니 아닌 거 같다. 원이면 반지름, 선이면 가까운 지점 등 가지는 요소가 다른만큼 각자 다르게 계산되어야 한다.

[unity3d](./unity3d.md)의 경우 게임 엔진 차원에서 제공하기 때문에 더 자세하게 구현되어 있다.
[2D Physics Engine from Scratch (JS)](#2D Physics Engine from Scratch (JS))의 구현과 비교해보면 재밌다.

### 2D Physics Engine from Scratch (JS)

https://www.youtube.com/playlist?list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_

이 유튜브 재생목록이 step by step으로 잘 설명한다. [javascript](./javascript.md) 및 canvas로 구현한다.
나는 8번 Collision Response에서 10번 Adding the Walls까지 봤는데, 앞부분이 쉽다면 중간부터 봐도 무방해 보인다.

[GitHub에 소스코드](https://github.com/danielszabo88/mocorgo)도 공개되어 있다.

8번부터만 봐도 핵심요소는 다 포함하는 듯하다.
속도 velocity, 질량 mass, 탄성 elasticity, 마찰 friction, 가속도 acceleration

매 프레임마다 다음 순서로 계산한다:
1. `intersection` 충돌 여부 확인
2. `penetration depth resolution` 겹침 해결
3. `collision resolution` 충돌 계산

1에서 작용하지 않은 것으로 판단하면 2, 3을 진행하지 않는다.\
2에서 다음 프레임까지의 Delta Time 및 속도에 따라 겹치는 정도가 다르다. 팅겨내기 전에 표면으로 돌려보내기 위한 계산이다.\
3에서 물체 충돌 후 반작용을 위한 계산을 한다.

[다음](https://edunga1.github.io/canvas-collision-simulation/)은 내 구현 결과이다.
동그라미를 드래그해서 움직이면 다른 동그라미와 충돌한다.

<iframe src="https://edunga1.github.io/canvas-collision-simulation/" width="100%" height="300px"></iframe>

동그라미 업데이트 순서가 작은 것 -> 큰 것 순서로 이루어진다.
이 순서에 의한 문제점이 있다.
아무 동그라미나 드래그해서 다른 2개의 동그라미를 충돌시키면 항상 작은 동그라미가 밀려난다.
즉, A를 드래그해서 B -> C 순서로 충돌시키나 C -> B 순서로 충돌시키나 항상 B가 밀려난다.
업데이트 순서가 반대였으면 항상 C만 밀려났을 것이다.

## Movement

Unity 기준.

[What's the best way to move to a target?](https://forum.unity.com/threads/whats-the-best-way-to-move-to-a-target.224126/)

간단하게 구현하면 다음과 같이 할 수 있다:

```csharp
transform.position += (target.position - transform.position).normalized * Time.deltaTime;
```

normalized로 vector 정규화하면 방향만 남고 크기는 1인 단위 벡터가 된다.
여기에 deltaTime을 곱해주면 게임 엔진의 프레임을 고려한 속도가 된다.

이 방법은 두 오브젝트가 서로를 향해 이동할 때 문제가 있다.
서로를 넘어가는 시점부터 둘 다 같은 방향으로 이동하게 된다.

부드러운 이동을 위해서는 다음과 같이 할 수 있다:

```csharp
transform.position = Vector3.Lerp(transform.position, target.position, Time.deltaTime);
```

Lerp는 선형보간(Linear Interpolation)으로, 두 지점 사이의 중간 지점을 계산한다.
마찬가지로 deltaTime을 곱해주므로 프레임을 고려하며, 가속도가 적용되기 때문에 부드러운 이동이 가능하다.

게임 케릭터를 구현을 위해 위 로직을 사용하면 어색하다.
가속도가 없고 목표 지점을 넘어가지 않는 `MoveTowards`를 사용하는 것이 좋다.

```csharp
transform.position = Vector3.MoveTowards(transform.position, target.position, Time.deltaTime * speed);
```

케릭터의 속도 `speed`를 고려하는 방식이다.

references:
* [Khan Academy - 벡터 크기와 정규화](https://ko.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/vector-magnitude-normalization)
* [Unity 3D Vector의 선형보간 Lerp 정확한 사용법](https://iygames.tistory.com/6)
