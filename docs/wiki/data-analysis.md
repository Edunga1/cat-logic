# Data analysis

# 이중차분법

이중차분(difference in differences, DID)은 두 집단의 difference를 difference한 두 시기로 비교해보는 것이다.

## 게임 데이터로 인과 추론 분석하기

https://youtu.be/sbUaqX4mX00

한국 R 컨퍼런스에서 NC소프트, 게임 데이터로 인과 추론 분석 발표 내용.

![difference-in-difference](../$images/data-analysis-difference-in-difference.png)

이중차분법은 말 그대로 차분을 두 번하는 것.

e.g.) 이벤트 쿠폰의 효과를 검증하고 싶다.

* 쿠폰이 지급된 집단의 지급 전, 후를 비교하면 이벤트 후에 있었던 모든 환경에 영향을 받는다.(C-A)
* 쿠폰을 지급받은 집단의 전과 후, 쿠폰 미지급 집단의 시간상 전과 후의 차이를 각각 구하고, 집단간 차이를 구하면{(C-A) - (D-B)} 시간에 따른 환경을 무시하고 비교할 수 있다.