# Iterator Pattern

다양한 Collection을 일관적인 방법으로 순회할 수 있도록 함

![uml-iterator](../_images/dp-iterator.gif)

Java의 경우 ArrayList, Vector, LinkedList와 같은 컬렉션 클래스들은 java.util.Iterator를 구현하여
iterator() 메소드를 통해 iterator를 반환 해 준다.

일반 배열을 사용한 경우 Iterator 인터페이스를 구현한 Concrete Iterator를 만들어서 사용하면 된다.
