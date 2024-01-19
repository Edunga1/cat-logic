---
created: 2023-04-13
---
# C#

[Unity 3D](./unity3d.md) 또는 [Ultima Online](./game.md)으로 C# 사용했다.

## Event

C#에서 옵저버 패턴과 유사한 기능을 하는 event가 있다.

이벤트 정의:
```csharp
public delegate void PositionEvent(Vector3 position);
public event PositionEvent onPositionChanged;
```

delegate는 함수를 표현하는 방법이다.

이벤트 등록:
```csharp
onPositionChanged += SyncPosition;
```

`SyncPosition`은 `PositionEvent`와 인터페이스가 같은 함수이어야 한다.
`+` 연산자를 사용하여 이벤트에 함수를 등록한다.

이벤트 발생:
```csharp
onPositionChanged(new Vector3(0, 0, 0));
```

이제 등록된 `SyncPosition`이 호출된다.

## events or an observer interface? Pros/cons?

https://stackoverflow.com/questions/550785

첫 번째 답변은 이벤트를 사용함에 있어서 특징에 대해서 설명한다:
> Less maintenance
> 적은 유지보수
>
> The pattern is built into the language so everybody knows how to use it
> 패턴이 언어에 내장되어 있기 때문에, 누구나 사용하는 방법에 대해 알고 있습니다.

두 번째 답변:
> Hmm, events can be used to implement the Observer pattern. In fact, using events can be regarded as another implementation of the observer-pattern imho.
> 내 의견으로는, event를 이용하여 옵저버 패턴을 구현할 수 있습니다. 사실은, event를 사용하는 것은 옵저버 패턴을 구현했다고 볼 수 있습니다.

두 번째 답변의 덧글 중:
> Absolutely. This is a bit like asking, "Should I implement the iterator pattern or use foreach and IEnumerable?
> 이건 이렇게 묻는 것과 같습니다. "이터레이터 패턴을 구현해야 하나요? 아니면 foreach와 IEnumrable을 사용해야 하나요?"
