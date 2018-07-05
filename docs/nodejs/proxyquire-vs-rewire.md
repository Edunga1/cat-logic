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

proxyquire는 require를 대신하므로 nodejs의 require의 [관련 이슈](proxyquire-module-import-order.md)를 알아야 한다.
