# Sinon.JS

자바스크립트를 위한 테스트 spies, stubs, mocks.

## ```new Date()``` 조작하기

```javascript
var clock = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
clock.restore();
console.log(new Date()); // now
```

```useFakeTimers()```로부터 반환되는 객체의 ```restore()```를 호출하여 조작된 시간을 복구할 수 있다.

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

```clock1```을 바로 복구해도 돌아올 수 있다.

```javascript
var clock1 = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
var clock2 = sinon.useFakeTimers(new Date('2000-12-01 00:00:00'));
console.log(new Date()); // Fri Dec 01 2000 00:00:00 GMT+0900 (KST)
clock1.restore();
console.log(new Date()); // now
```
