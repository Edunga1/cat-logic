# 개요

node.js로 개발을 하고있지 않아서.. 내용이 2016년 정도에 머물러 있다.

지금은 [Jest](https://github.com/facebook/jest)를 사용하고 있다.
이거 하나면 대부분 가능하더라.

<!--toc:start-->
- [NodeJS Test Tools](#nodejs-test-tools)
  - [Mocha - Framework](#mocha-framework)
  - [Chai - Library](#chai-library)
  - [Istanbul - Coverage Tool](#istanbul-coverage-tool)
- [Proxyquire](#proxyquire)
  - [proxyquire 모듈 로드 순서 문제](#proxyquire-모듈-로드-순서-문제)
    - [`require('proxyquire').noPreserveCache()` 사용하기](#requireproxyquirenopreservecache-사용하기)
- [Proxyquire vs. rewire](#proxyquire-vs-rewire)
  - [어떤 차이가 있을까?](#어떤-차이가-있을까)
    - [rewire: 테스트 대상 내에 선언한 변수를 가로채어 바꾼다.](#rewire-테스트-대상-내에-선언한-변수를-가로채어-바꾼다)
    - [proxyquire: 테스트 대상이 `require`하는 모듈을 바꿔서 보내준다.](#proxyquire-테스트-대상이-require하는-모듈을-바꿔서-보내준다)
  - [rewire 제한사항](#rewire-제한사항)
- [Sinon.JS](#sinonjs)
  - [`new Date()` 조작하기](#new-date-조작하기)
<!--toc:end-->

# NodeJS Test Tools

Framework - Library - Coverage Tool 한 세트로 사용한다.

## Mocha - Framework

테스트 구조를 제공한다.

설치 : `npm install mocha --save-dev`

테스트 스크립트 실행 : `mocha <PATH>`

```javascript
describe('어떤 테스트를 할 것인지 대략적인 설명', function () {

    beforeEach(function () {
        // 매 it() 마다 실행 할 코드
    });

    it('테스트 단위 별 설명', function () {
        // 여기에 Assertion 코드를 둔다.
    });
});
```

## Chai - Library

Assertion 라이브러리. 값 비교에 사용한다.

설치 : `npm install chai --save-dev`

```javascript
describe('어떤 테스트를 할 것인지 대략적인 설명', function () {

    it('테스트 단위 별 설명', function () {
        // 여기에 Assertion 코드를 둔다.
        var foo = 'foo';
        expect(foo).to.equal('foo'); // 통과
        expect(foo).to.equal('bar'); // 값이 다르므로 통과하지 못함
    });
});
```

## Istanbul - Coverage Tool

코드 커버리지. 내 **테스트 코드**가 **모듈의 어디까지 테스트하는지 측정**하는데 사용한다.

테스트 시 `coverage/` 폴더가 생성되어 리포트 페이지(html)를 생성한다. 여기서 실제 모듈이 얼마나 호출 되었는지, 어디가 문맥상 접근하지 않았는지 알 수 있다.

설치 : `npm install istanbul --save-dev`

Mocha와 함께 실행 : `istanbul cover _mocha` (`_mocha`인 이유는 Mocha의 프로세스 이름을 이용하기 때문)

별도의 코드는 없다.

# Proxyquire

https://github.com/thlorenz/proxyquire

## proxyquire 모듈 로드 순서 문제

```bash
src/
    router/
        auth.js
    find-basic-member.js
    app.js
test/
    test.js
```

`app.js` -> `auth.js` -> `find-basic-member.js` 이와같은 모듈 의존 관계가 있다.

테스트 대상은 `app.js`.
Mocking 대상은 `auth.js`가 사용하는 `find-basic-member.js`

사용 방법:

```javascript
proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
const app = require('../src/app'); // app uses mock find-basic-member
```

위 코드가 Mocking 이 되는 이유는
`app.js` -> `auth.js`의 `require('../find-basic-member')`를 호출하더라도
`proxyrequire`에 의해 캐시된 모듈을 이용하기 때문이다.

nodejs `require` 또한 캐시된 정보를 사용하기 때문에 여러번 `require` 해도 실제 파일을 읽는건 한 번 뿐이다.

*Forcing proxyquire to reload modules* 단락 참고: https://github.com/thlorenz/proxyquire

다음과 같이 호출 순서를 변경하면 동작하지 않는다:

```javascript
const app = require('../src/app'); // app uses original find-basic-member
proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
```

`proxyquire`가 `app.js` -> `auth.js`의 `require('../find-basic-member')`를 사용한다.

### `require('proxyquire').noPreserveCache()` 사용하기

위의 예제처럼 사용한 경우 `proxyquire()` 이후에 로드하는 모듈은 모두 Mock Module을 사용한다.

따라서 명확하게 Mock Module 의존을 주입할 필요가 있다.

`noPreserveCache()`는 캐시된 모듈을 사용하지 않고 다시 모듈을 로드한다.

`proxyquire()`의 반환은 Mock Module 이다. 이를 이용해 의존성을 직접 주입한다.

```javascript
const mockAuth = proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
const mockApp = proxyquire('../src/app', {
    './router/auth': mockAuth
});
```

의존의 의존을 모두 명시한다.

# Proxyquire vs. rewire

테스트 할 때 Dependency Injection 하는데 사용하는 도구 2가지 비교.

rewire: https://github.com/jhnns/rewire

rewire는 *monkey-patching* 도구라고 설명하고 있다.

proxyquire: https://github.com/thlorenz/proxyquire

proxyquire는 의존 모듈을 덮어 쓴다고 설명하고 있다. *overriding dependencies*

## 어떤 차이가 있을까?

### rewire: 테스트 대상 내에 선언한 변수를 가로채어 바꾼다.

```javascript
// app.js
var foo = 1;
module.exports = () => console.log(foo);
```

```javascript
// test.js
const rewire = require('rewire');
const app = rewire('./app');  // 테스트 대상

app.__set__('foo', 2);

app();  // 2
```

### proxyquire: 테스트 대상이 `require`하는 모듈을 바꿔서 보내준다.

```javascript
// bar.js
module.exports = 1;
```

```javascript
// app.js
const bar = require('./bar');
module.exports = () => console.log(foo);
```

```javascript
// test.js
const proxyquire = require('proxyquire');
// 테스트 대상 및 의존 모듈 mocking
const app = proxyquire('./app', {
    './bar': 2
});

app();  // 2
```

## rewire 제한사항

rewire는 `const`로 선언된 변수는 변경할 수 없었다. 따라서 의존 모듈을 `const`에 할당하면 stub 할 수 없다.
이 문제 때문에 일단 proxyquire를 사용하고 있다.

# Sinon.JS

자바스크립트를 위한 테스트 spies, stubs, mocks.

## `new Date()` 조작하기

```javascript
var clock = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
clock.restore();
console.log(new Date()); // now
```

`useFakeTimers()`로부터 반환되는 객체의 `restore()`를 호출하여 조작된 시간을 복구할 수 있다.

주의할 점은 복구하지 않고 다시 조작하는 경우.

```javascript
var clock1 = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
var clock2 = sinon.useFakeTimers(new Date('2000-12-01 00:00:00'));
console.log(new Date()); // Fri Dec 01 2000 00:00:00 GMT+0900 (KST)
clock2.restore();
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
clock1.restore();
console.log(new Date()); // now
```

나중에 조작한 시간을 복구해도 이전에 조작한 시간이 남아 있다.

`clock1`을 바로 복구해도 돌아올 수 있다.

```javascript
var clock1 = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
var clock2 = sinon.useFakeTimers(new Date('2000-12-01 00:00:00'));
console.log(new Date()); // Fri Dec 01 2000 00:00:00 GMT+0900 (KST)
clock1.restore();
console.log(new Date()); // now
```
