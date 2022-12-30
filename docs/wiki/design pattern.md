<!--toc:start-->
- [MVC Pattern](#mvc-pattern)
  - [MVC 패턴의 목적과 이점](#mvc-패턴의-목적과-이점)
  - [Compound Pattern](#compound-pattern)
    - [Observer Pattern](#observer-pattern)
    - [Strategy Pattern](#strategy-pattern)
    - [Composite Pattern](#composite-pattern)
- [Iterator Pattern](#iterator-pattern)
<!--toc:end-->

# MVC Pattern

Model - View - Controller Pattern.

## MVC 패턴의 목적과 이점

MVC 패턴는 사용자 인터페이스와 시스템 로직을 분리하는 것을 목적으로 둔다.

분리함으로써 얻는 이점은 다른 환경에서 재사용 할 수 있는 코드가 생기는 것이다.

예를들어 C# 윈도우 어플리케이션에 종속되는 유저 인터페이스 관련 코드들과 시스템이 돌아가는데
필요한 코드(model)를 분리함으로써 다른 플랫폼으로 이식할 수 있다.

## Compound Pattern

MVC 패턴은 다른 디자인 패턴으로 이루어진 컴파운드 패턴이다.

### Observer Pattern

Model - View의 관계

유저 인터페이스와 시스템 로직을 분리할 수 있게 해주는 핵심 패턴으로 모델은 상태 변경이 일어나면
뷰에 상태 변경을 통보한다.

그러면 뷰는 모델에서 필요한 정보들을 가져와 사용자 화면을 업데이트 한다.

모델이 뷰에 통보할 때 상태 정보를 보내주는 push-model 보다
통보 후 뷰가 필요한 정보를 알아서 가져가는 pull-model이 더 선호된다.

### Strategy Pattern

View - Controller의 관계

Controller는 View에 대한 Behavior가 된다.

같은 View라고 하더라도 Controller를 변경함으로써 다르게 실행되도록 할 수 있다.

따라서 View에 Concrete Controller가 아닌 Interface Controller를 제공한다.

### Composite Pattern

View 내에서 Component들 간의 관계

일반적으로 사용자 인터페이스의 컴포넌트들은 컴포넌트 안에 컴포넌트로 표현한다.

이 컴포넌트들을 iterator를 통해 일관성있게 접근하여 업데이트 시킨다.

# Iterator Pattern

다양한 Collection을 일관적인 방법으로 순회할 수 있도록 함

![uml-iterator](../$images/dp-iterator.gif)

Java의 경우 ArrayList, Vector, LinkedList와 같은 컬렉션 클래스들은 java.util.Iterator를 구현하여
iterator() 메소드를 통해 iterator를 반환 해 준다.

일반 배열을 사용한 경우 Iterator 인터페이스를 구현한 Concrete Iterator를 만들어서 사용하면 된다.
