# Javascript

# 자바스크립트와 이벤트 루프

http://meetup.toast.com/posts/89
자바스크립트가 어떻게 싱글 스레드에서 UI, 비동기 처리를 하는지에 대해 설명하는 글.

https://vimeo.com/96425312
이벤트 루프에 대해서 설명하는 동영상.


# Douglas Crockford's Javascript The Good Parts - 권장하지 않는 것.

## Good Parts Reconsidered

![reconsidered slide 1](./res/js-good-parts-reconsidered-slide1.png)

- I stopped using **new** years ago.
- I have stopped using **Object.create**
- I have stopped using **this**
- I have stopped using **null**
- I have stopped using falsiness

### No prototypal pattern에 대한 이야기

더글라스 크락포드는 이전에 **new** 대신 **Object.create** 사용을 권장했었다.
그런데 **Object.create**도 사용하지 않기를 권장한다. 그 이유는 **this** 키워드를 사용을 권장하지 않기 때문.

보안적인 코드를 작성하기 위해서
페이스북의 FBJS, 구글의 Caja project, 마소의 Web Sandbox, 크락포드의 [ADSafe](http://www.adsafe.org/)와
같은 도구들이 있었다. 공통적으로 **this**의 단점
(*해석이 잘 안되는데, this는 글로벌 오브젝트를 가르키는데 글로벌 오브젝트를 찾기 위해서 느려진다는 거 같다.*)을 집었다.
그리고 **this**를 배제함으로써 더 쉬워졌다. 그리고 prototypal pattern가 쓸모 없어지면서 functional pattern에 집중하게 되었다.

### null, falsiness에 대한 이야기

자바스크립트에는 두 가지 [Bottom Type](https://en.wikipedia.org/wiki/Bottom_type)(값이 없는 타입)이 있다. **null**과 **undefined**.
**undefined** 하나만 사용하기로 했다. 더 많이 입력해야 하지만 문제없다. (ㅋ)

falsiness는 `false`를 나타내는 값들인데 대표적으로 빈 문자열 `''`, `0`, `NaN`, `undefined` 등이 있다.
falsiness는 좋은 아이디어지만 크락포드는 논리식에서 falsiness에 의존하지 않기로 했다. 가능한 명시적으로 비교해야 한다.

## Loops Reconsidered

![reconsidered slide 2](./res/js-good-parts-reconsidered-slide2.png)

- I don't use `for`
- I don't use `for in`
- ES6 will have proper tail calls.

## 요약

**new**, **Object.create**, **this**, prototyping 모두 사용하지 않는 것을 권장한다.
함수형 패러다임을 사용하는 것을 추천한다.

**null** 대신 **undefined** 사용하는 것을 권장하고, `''` 같은 falsy value를 사용하지 말고 명시적으로 비교문을 작성하자.

반복문은 `for` 구문보다 `Array.protoype.forEach`와 같은 배열 메서드를 이용하거나, 꼬리 재귀 함수를 사용하자.
오브젝트를 순회하고 싶다면 `Object.keys(obj)`로 키를 배열화하여 사용한다.


# var foo = (bar = 1, bar + 1);

```javascript
var foo = (bar = 1, bar + 1);
console.log(bar); // 1
console.log(foo); // 2
```

`bar = 1` 이후 `bar + 1`의 반환.

`Array.prototype.reduce` 같은 메서드에서 유용하다.


# [AngularJS](./angularjs.md)

Angular가 아닌 AngularJS에 대한 이야기.
이제는 사용하지 않지만 [스타일가이드](https://github.com/johnpapa/angular-styleguide/)의 철학은 한 번 읽어볼만 하다.

# Visual Studio Code에서 타입 힌팅 사용하기

Javascript 개발을 하다보면 이런 문구를 많이 만나게 된다:

`Uncaught SyntaxError: Invalid or unexpected token`\
`Uncaught TypeError: arg1.trim is not a function`


```javascript
function foo(arg1) {
    var str = arg1.trim(); // Uncaught TypeError ...
}
```

이럴때면 [정적 타입](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C%ED%98%95_%EC%B2%B4%EA%B3%84) 언어의 IDE가 제공하는
타입힌트가 그리워진다.

Visual Studio Code(또는 [LSP](./language-server-protocol.md)를 사용하는 에디터라면)에서
**JSDoc** 활용하면 에디터에서 타입 힌트를 제공받을 수 있다.

## 기본 지원

VSCode는 기본적인 타입 추론 기능을 제공한다:

![vscode intellisense](./res/vscode-intellisense-example.png)

변수 `foo`가 문자열 타입인 것을 알 수 있기 때문에 `split()` 메서드가 자동 완성 목록에 나타난다.

하지만 매개변수라면?

![vscode intellisense](./res/vscode-intellisense-example2.png)

**Object** 또한 힌트를 제대로 받을 수 없다.

![vscode intellisense](./res/vscode-intellisense-example3.png)

## JSDoc을 이용하여 타입 추론

JSDoc은 자바스크립트의 문서화하기 위한 주석 포맷이다.

ref. http://usejsdoc.org/about-getting-started.html

### 오브젝트와 매개변수 힌팅

타입이 `Object` 인 매개변수의 힌트를 얻어 본다.
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
}
```

![vscode intellisense](./res/vscode-intellisense-example4.png)

`foo`, `bar` 모두 타입을 알 수 있다.

함수의 반환값이라면 `@return`을 사용하면 된다:

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

func(). // foo, bar 타입 힌트를 확인할 수 있다.
```

### Generic Type

매개변수를 그대로 반환하는 간단한 함수가 있다고 하면:

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

매개변수와 리턴 타입이 똑같이 출력 된다:

![vscode intellisense](./res/vscode-intellisense-example5.png)

#### Promise

Promise 또한 Generic을 사용함으로 다음과 같이 표현할 수 있다:

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
    result. // result가 문자열인 것을 알 수 있다.
});
```

# JSDoc 파라미터 상수 정의하기 + VSCode Rename Symbol!

상수(또는 predefined parameter)를 인자로 받도록 JSDoc 정의하자.

```javascript
/**
 * @property {'new'|'associate'|'regular'|'sc'|'vip'} memberGrade
 */
function something(memberGrade) {/* ... */}
```

VSCode Intellisense가 함수 인자 추천해 줄 때 상수 목록도 보여줘서 유용하다.

심지어 VSCode의 **Rename Symbol** 기능도 잘 동작한다.

JSDoc의 type에 커서를 두고 Rename Symbol(`F2`)으로 변경해도 되고,

```javascript
something('regular');
```

함수 호출 코드에서 값에 커서를 두고 Rename Symbol해도 JSDoc과 참조하는 모든 코드를 변경한다.
