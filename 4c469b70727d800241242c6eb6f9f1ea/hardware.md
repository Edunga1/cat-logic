# Hardware

## RISC-V

https://news.hada.io/topic?id=3447

> M1은 RISC-V의 상승을 예고한다

RISC-V는 cpu 아키텍처이다. arm과 같다. 다만 오픈소스이고, 보조프로세서 확장에 강점이 있다.

cpu가 범용 프로세서로서 더 이상 성능 개선이 어렵게 되었다.
gpu, tpu 처럼 그래픽, 머신러닝의 텐서 계산에 최적화된 보조 프로세서가 등장하면서 cpu는 메모리 관리 등 컨트롤러 역할을 하고 복잡한 계산은 이런 보조프로세서에 맡기는 추세다.
보조 프로세서는 cpu외 통신을 통해 cpu의 기능을 사용하는데, RISC-V는 적은 코어 명령어셋과 보조 프로세서가 사용할 확장 명령어어 세트를 가지도록 구성한다.

---

https://ko.m.wikipedia.org/wiki/축소_명령어_집합_컴퓨터

> 축소 명령어 집합 컴퓨터
> (Reduced Instruction Set Computer, RISC, 리스크)는 CPU 명령어의 개수를 줄여 명령어 해석시간을 줄임으로서 명령어 실행속도를 빠르게 한 방식...

---

> Apple, 임베디드 코어의 일부를 Arm ISA에서 벗어나 RISC-V로 변경하게 될 것

첫 번째 글 이후로 애플이 RISC-V로 전환한다는 계획을 발표했다.
