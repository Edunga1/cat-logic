# NodeJS Test Tools

자바스크립트에서 사용할 수 있는 테스트 세트 3총사.

Framework - Library - Coverage Tool 한 세트로 사용한다.

## Mocha - Framework

테스트 구조를 제공한다.

설치 : ```npm install mocha --save-dev```

테스트 스크립트 실행 : ```mocha <PATH>```

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

설치 : ```npm install chai --save-dev```

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

테스트 시 ```coverage/``` 폴더가 생성되어 리포트 페이지(html)를 생성한다. 여기서 실제 모듈이 얼마나 호출 되었는지, 어디가 문맥상 접근하지 않았는지 알 수 있다.

설치 : ```npm install istanbul --save-dev```

Mocha와 함께 실행 : ```istanbul cover _mocha``` (```_mocha```인 이유는 Mocha의 프로세스 이름을 이용하기 때문)

별도의 코드는 없다.
