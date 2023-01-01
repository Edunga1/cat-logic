# Physics

# 2D 도형 충돌

제대로 알기 전에는 도형을 잘 추상화해서 어떤 형태든 추상 형태로 계산할 수 있을 거라고 생각했다.
하지만 아래 강의를 보니 아닌 거 같다. 원이면 반지름, 선이면 가까운 지점 등 가지는 요소가 다른만큼 각자 다르게 계산되어야 한다.

[unity3d](unity3d)의 경우 게임 엔진 차원에서 제공하기 때문에 더 자세하게 구현되어 있다.
[2D Physics Engine from Scratch (JS)](#2D Physics Engine from Scratch (JS))의 구현과 비교해보면 재밌다.

## 2D Physics Engine from Scratch (JS)

https://www.youtube.com/playlist?list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_

이 유튜브 재생목록이 step by step으로 잘 설명한다. [javascript](javascript) 및 canvas로 구현한다.
나는 8번 Collision Response에서 10번 Adding the Walls까지 봤는데, 앞부분이 쉽다면 중간부터 봐도 무방해 보인다.

[GitHub에 소스코드](https://github.com/danielszabo88/mocorgo)도 공개되어 있다.

8번부터만 봐도 핵심요소는 다 포함하는 듯하다.
속도 velocity, 질량 mass, 탄성 elasticity, 마찰 friction, 가속도 acceleration

매 프레임마다 다음 순서로 계산한다:
1. `intersection` 충돌 여부 확인
2. `penetration depth resolution` 겹침 해결
3. `collision resolution` 충돌 계산

1에서 작용하지 않은 것으로 판단하면 2, 3을 진행하지 않는다.
2에서 다음 프레임까지의 Delta Time 및 속도에 따라 겹치는 정도가 다르다. 팅겨내기 전에 표면으로 돌려보내기 위한 계산이다.
3에서 물체 충돌 후 반작용을 위한 계산을 한다.
