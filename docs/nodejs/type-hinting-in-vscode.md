# Visual Studio Code에서 타입 힌팅 사용하기

**NodeJS**, 웹 개발 등 **Javascript**로 개발을 하다보면
[정적 타입](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C%ED%98%95_%EC%B2%B4%EA%B3%84) 언어가
그렇게나 그리울 수가 없습니다.

자바스크립트를 하는 여러분은 거의 매일

`Uncaught SyntaxError: Invalid or unexpected token`

`Uncaught TypeError: arg1.trim is not a function`

위와같은 문구를 마주치실 겁니다.

```javascript
function foo(arg1) {
    // ...

    var str = arg1.trim(); // Uncaught TypeError ...
}
```

단지 위처럼 간단한 코드임에도 불구한데 말이에요!

이 글에서는 **Visual Studio Code**에서 **JSDoc**을 이용하여 **타입 추론** 기능을 사용 해봅니다.

## 기본 지원

VSCode는 기본적인 타입 추론 기능을 제공합니다:

<img src="../_images/vscode-intellisense-example.png">

변수 `foo` 가 문자열 타입인 것을 알 수 있기 때문에 `split()` 메서드가 자동 완성 목록에 나타납니다. 하지만 **매개변수(parameter)** 라면 어떨까요?

<img src="../_images/vscode-intellisense-example2.png">

**Object** 또한 힌트를 제대로 받을 수 없습니다.

<img src="../_images/vscode-intellisense-example3.png">

## JSDoc을 이용하여 타입 추론

먼저 이 방법은 **약속**에 의한 타입 추론 방법임을 강조합니다.

**JSDoc**은 자바스크립트의 **문서화**를 위한 주석 포맷입니다. 자세한 내용은 다음을 참조 하세요:

http://usejsdoc.org/about-getting-started.html

### 오브젝트와 매개변수 힌팅

타입이 `Object` 인 매개변수의 힌트를 얻어 봅시다.
```javascript
{
    foo: 'foo',
    bar: 95
}
```

```javascript
/**
 * @param {{foo: string, bar: number}} obj
 */
function func(obj) {
    var foo = obj.foo;
    var bar = obj.bar;

    // foo. 까지만 타이핑하면 문자열에 대한 메서드 목록이 출력된다!
}
```

<img src="../_images/vscode-intellisense-example4.png">

`bar` 타입이 `number` 인 것과 프로퍼티 `foo`, `bar`가 출력됩니다!

함수의 매개변수가 아닌 반환값이라면 `@return`을 사용하면 됩니다:

```javascript
/**
 * @return {{foo: string, bar: number}}
 */
function func() {
    const obj = {};
    obj.foo = 'foo';
    obj.bar = 95;

    return obj;
}

func(). // 여기까지만 타이핑하면 프로퍼티 foo, bar가 존재함을 알 수 있다!
```

### Generic Type 힌팅

매개변수를 그대로 반환하는 간단한 함수가 있습니다:

```javascript
function func(arg) {
    return arg;
}
```

위처럼 매개변수 타입에 따라 반환값이 결정되는 경우입니다:

```javascript
/**
 * @template T
 */

/**
 * @param {T} arg
 * @return {T}
 */
function func(arg) {
    return arg;
}
```

매개변수와 리턴 타입이 똑같이 출력 됩니다:

<img src="../_images/vscode-intellisense-example5.png">

#### Promise

Promise 또한 Generic Type을 사용함으로 다음과 같이 표현할 수 있습니다:

```javascript
/**
 * @return {Promise<string>}
 */
function func() {
    // ... 구현 부분 생략 ...
    // 문자열을 넘겨주는 Promise
    return promise;
}

func().then(function (result) {
    result. // result가 문자열인 것을 알 수 있다!
});
```

## 마치며...

우리는 스크립트 언어의 동적 타이핑으로 생산성과 다른 이점을 얻었지만
또한 많은 이점들을 잃어 고통받습니다.
자바스크립트의 생태계가 커질수록 타입스크립트의 인기도 그만큼 증가하고 있죠.

완벽하지는 않지만 JSDoc을 이용하면 문서화를 자동화하고 타입 힌트도 받을 수 있습니다.
