# proxyquire 모듈 로드 순서 문제

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

테스트하고자 하는 모듈은 `app.js`.

테스트 코드에서 DB에 접근하는 `find-basic-member.js`를 Mocking 하기 위해서
`auth.js`에서 사용하는 `find-basic-member.js`을 Mocking 한다:

```javascript
proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
const app = require('../src/app'); // app uses mock find-basic-member
```

의존 관계를 지정해 주지 않았는데도 `app.js`는 Mock 오브젝트를 사용하는 점은 마음에 들지 않는다.

위 코드가 Mocking 이 되는 이유는
`app.js` -> `auth.js`의 `require('../find-basic-member')`를 호출하더라도
`proxyrequire`에 의해 캐시된 모듈을 이용하기 때문이다.

참고로 nodejs `require` 또한 캐시된 정보를 사용하기 때문에 여러번 `require` 해도 실제 파일을 읽는건 한 번 뿐이다.

>*Forcing proxyquire to reload modules* 단락 참고
>
>https://github.com/thlorenz/proxyquire

다음과 같이 호출 순서를 변경하면 동작하지 않는다 :

```javascript
const app = require('../src/app'); // app uses original find-basic-member
proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
```

`proxyquire`가 `app.js` -> `auth.js`의 `require('../find-basic-member')`를 사용한다.

## `require('proxyquire').noPreserveCache()` 사용하기

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
