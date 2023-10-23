---
created: 2023-10-08
---
# Canvas

HTML Canvas.

## Coroutine

게임 엔진이나 프레임워크 없이 순수하게 Canvas 앱을 만들다 보면 페인포인트가 있다.
특히 객체 제어에 대한 부분이다.

여러개의 객체를 관리한다고 가정하고, 어느 객체는 10초 후에 업데이트하고 싶다.
더 나아가서 객체를 특정 이벤트 후에 업데이트하고 싶다.
특정 객체만 sleep 시키고 싶지만 다른 객체는 계속 업데이트하고 싶다.

Unity의 경우 Coroutine을 이용하여 이러한 문제를 해결한다.

Unity의 [WaitForSeconds](https://docs.unity3d.com/ScriptReference/WaitForSeconds.html)는 X초 후에 그 다음 코드를 실행한다.

```csharp
void Start()
{
    StartCoroutine(waiter());
}

IEnumerator waiter()
{
    //Rotate 90 deg
    transform.Rotate(new Vector3(90, 0, 0), Space.World);

    //Wait for 4 seconds
    yield return new WaitForSeconds(4);

    //Rotate 40 deg
    transform.Rotate(new Vector3(40, 0, 0), Space.World);

    //Wait for 2 seconds
    yield return new WaitForSeconds(2);

    //Rotate 20 deg
    transform.Rotate(new Vector3(20, 0, 0), Space.World);
}
```

처음에는 90도 회전을 하고, 4초 후에 40도 회전을 하고, 2초 후에 20도 회전을 하는 [예시](https://stackoverflow.com/questions/30056471/how-to-make-the-script-wait-sleep-in-a-simple-way-in-unity)이다.

`yield` 구문에서 X초간 suspend 되고, 그 후 다음 코드를 실행하고 있어서 매우 직관적인 코드를 작성할 수 있다.
이러한 Coroutine은 `WaitForSeconds` 이외에도 프레임 기반이나 실제 시간 기반으로 suspend하는 등 여러가지가 있다.

이 방식을 비슷하게 구현해 보았다.

https://github.com/Edunga1/practice-canvas-coroutine

```javscript
*_update() {
  this.x += 1
  this.y += 1
  yield* waitForSeconds(1)
  this.y -= 1
  yield* waitForSeconds(2)
  this.x -= 1
  this.y += 1
  yield* waitForSeconds(1)
  this.y -= 1
  yield* waitForSeconds(3)
}
```
