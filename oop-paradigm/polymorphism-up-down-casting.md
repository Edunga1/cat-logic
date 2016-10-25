# 다형성 - upcasting & downcasting

명시적 downcasting 한 객체를 다시 upcasting 해야하는 일이 생겼다.

이런 과정이 많이 생소했다. 사실 downcasting 자체가 오류처럼 느껴질 정도로 어색했다.

## upcasting

**Parent -> Child**
```java
Animal animal = new Cat();
```

다형성으로 자주 사용하던 방법이었다.

Strategy Pattern 또한 Behavior를 생성하는데 upcasting을 사용한다.

```java
public abstract class Duck {
    FlyBehavior flyBehavior;
    QuackBehavior quackBehavior;
}

public class MallardDuck extends Duck {
    public MallardDuck() {
        quackBehavior = new Quack();
        flyBehavior = new FlyWithWings();
    }
}
```

## downcasting

**Child -> Parent**
```java
Cat cat = (Cat)animal;
```

반면 다운캐스팅은 제법 생소했다. Cat에 있는 속성과 행동들이 Animal에 없는 거라면 어떻게 작동할 것인가?

C#에서는 형변환 하는데는 문제가 없지만 부모에 없는 속성과 행동은 null이다.

하지만 upcasting 했던 객체를 다시 downcasting 하는데는 문제 없다.
