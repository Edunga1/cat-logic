# 개요

<!--toc:start-->
- [개요](#개요)
- [Robert C. Martin: Principles of Component Design.](#robert-c-martin-principles-of-component-design)
- [Robert C. Martin - Clean Architecture and Design](#robert-c-martin-clean-architecture-and-design)
<!--toc:end-->

# Robert C. Martin: Principles of Component Design.

https://amara.org/ko/videos/XJGyts0sfDVQ/info/robert-c-martin-principles-of-component-design/

너무 고마우신 분께서 한글자막까지 달아주셨다.

* Object Oriented의 장점은 현실 세계와 매핑하기 쉬운 것이 아니다.
* 가장 큰 혜택은 다형성이다.
* 순환 참조는 생산성을 떨어 뜨린다.
* 여러개의 DLL을 만들면 변경한 DLL만 다시 컴파일하는 장점이 있다. (속도)
* 지금은 성능이 좋아져서 하나로 모두 합쳐도 상관은 없다.
* 순환 참조는 관계있는 컴포넌트까지 다시 컴파일해야 한다.
* Dependency Inversion으로 순환 참조를 깰 수 있다. (다형성!)
* 안정적인 컴포넌트를 참조하고 추상화 하자.
* 불안정한 컴포넌트(구체적인)는 추상화 할 필요가 없다.
* 불안정한 컴포넌트의 변경은 내 컴포넌트도 변경의 위험에 있다.
* 데이터베이스는 상세하며, 구체적이므로 불안정하다. 그러나 변경이 잦다.
* 뷰(GUI)도 불안정하다. 쉽게 변경될 수 있어야 하므로 다른 컴포넌트가 뷰를 참조해선 안된다.
* 따라서 뷰를 테스트하는 것은 테스트 코드를 자주 수정케 한다.

# Robert C. Martin - Clean Architecture and Design

같은 분이 번역해 주시고, 마찬가지로 밥 아저씨의 [Clean Architecture and Design](https://amara.org/videos/0AtjY87egE3m/url/1216370/) 영상도 좋다.
2018년 처음 접했을 때 많은 생각을 들었다. 지금은 이 아키텍처 이야기로 책도 나오고 많이 언급된다.
왜 대부분 프로젝트의 구조가 같은지 의문에서 시작한다. 회사마다 관심있는 것은 다른데 왜 같은 구조를 가지는 것인가.
그에 반해 설계 도면은 어떤 건물을 말하는지 알기 쉽다고 한다.
